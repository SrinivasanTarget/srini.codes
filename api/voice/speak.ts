/**
 * POST /api/voice/speak
 * Body:  { text, voice? }
 * Reply: { audio: base64 PCM (16-bit LE mono), sampleRate, mimeType }
 *
 * Text-to-speech with Gemini 3.1 Flash TTS. The model returns raw PCM at
 * 24 kHz; the browser turns it into an AudioBuffer and plays it.
 */
import { Modality } from '@google/genai'
import { assertBrowserOrigin, handler, HttpError, json, rateLimit, readJson } from '../_lib/http'
import { DEFAULT_VOICE, gemini, MODELS, VOICES, withModelFallback } from '../_lib/gemini'

const MAX_BODY_BYTES = 20_000
const MAX_TEXT_CHARS = 1_200

interface Body {
  text?: unknown
  voice?: unknown
}

export const POST = handler(async (request) => {
  assertBrowserOrigin(request)
  rateLimit(request, 40, 60_000)
  const body = await readJson<Body>(request, MAX_BODY_BYTES)

  const text = typeof body.text === 'string' ? body.text.trim() : ''
  if (!text) throw new HttpError(400, 'text is required')
  if (text.length > MAX_TEXT_CHARS) throw new HttpError(400, `text must be at most ${MAX_TEXT_CHARS} characters`)
  const voice = typeof body.voice === 'string' && VOICES.includes(body.voice) ? body.voice : DEFAULT_VOICE

  const ai = gemini()
  const audio = await withModelFallback(MODELS.speak, async (model) => {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: `Say this warmly and clearly, at a natural conversational pace: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } },
      },
    })
    const part = response.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data)
    if (!part?.inlineData?.data) throw new HttpError(502, 'The speech model returned no audio')
    return part.inlineData
  })

  const mimeType = audio.mimeType ?? 'audio/L16;codec=pcm;rate=24000'
  const sampleRate = Number(/rate=(\d+)/.exec(mimeType)?.[1] ?? 24000)
  return json({ audio: audio.data, sampleRate, mimeType })
})
