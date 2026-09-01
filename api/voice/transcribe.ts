/**
 * POST /api/voice/transcribe
 * Body: { audio: base64, mimeType: 'audio/wav' | ..., vocabulary?: string[] }
 * Reply: { text }
 *
 * Speech-to-text with Gemini 3.5 Transcribe. SMART mode drops filler words
 * and false starts so the question reaching the model is clean, and the
 * site's proper nouns are passed as custom vocabulary to bias recognition.
 */
import { AudioTranscriptionConfigMode, type GenerateContentResponse } from '@google/genai'
import { assertBrowserOrigin, handler, HttpError, json, rateLimit, readJson } from '../_lib/http'
import { gemini, isBadRequest, MODELS, withModelFallback } from '../_lib/gemini'

const MAX_BODY_BYTES = 3_000_000 // ~2.2 MB of audio once base64 is decoded
const MIME_TYPES = new Set(['audio/wav', 'audio/webm', 'audio/mp4', 'audio/ogg', 'audio/mpeg', 'audio/flac', 'audio/aac'])

interface Body {
  audio?: string
  mimeType?: string
  vocabulary?: unknown
}

/**
 * The dedicated transcription model answers with an `audioTranscription`
 * part rather than a plain text part, so `response.text` is empty for it.
 */
const transcriptOf = (response: GenerateContentResponse) =>
  (response.candidates?.[0]?.content?.parts ?? [])
    .map((part) => part.audioTranscription?.text ?? part.text ?? '')
    .join('')

export const POST = handler(async (request) => {
  assertBrowserOrigin(request)
  rateLimit(request, 20, 60_000)
  const body = await readJson<Body>(request, MAX_BODY_BYTES)

  const audio = typeof body.audio === 'string' ? body.audio : ''
  if (!audio || !/^[A-Za-z0-9+/=]+$/.test(audio)) throw new HttpError(400, 'audio must be base64')
  const mimeType = (body.mimeType ?? 'audio/wav').split(';')[0].trim().toLowerCase()
  if (!MIME_TYPES.has(mimeType)) throw new HttpError(400, `Unsupported audio type ${mimeType}`)
  const vocabulary = Array.isArray(body.vocabulary)
    ? body.vocabulary.filter((v): v is string => typeof v === 'string' && v.length <= 60).slice(0, 60)
    : []

  const ai = gemini()
  const audioPart = { inlineData: { mimeType, data: audio } }

  const text = await withModelFallback(MODELS.transcribe, async (model) => {
    if (model.includes('transcribe')) {
      // Dedicated STT model: audio only, with transcription settings.
      try {
        const response = await ai.models.generateContent({
          model,
          contents: [{ role: 'user', parts: [audioPart] }],
          config: {
            audioTranscriptionConfig: {
              mode: AudioTranscriptionConfigMode.SMART,
              customVocabulary: vocabulary,
            },
          },
        })
        return transcriptOf(response)
      } catch (error) {
        // An older preview may reject SMART mode or custom vocabulary; retry plain.
        if (!isBadRequest(error)) throw error
        const response = await ai.models.generateContent({
          model,
          contents: [{ role: 'user', parts: [audioPart] }],
        })
        return transcriptOf(response)
      }
    }
    // General multimodal fallback: needs an instruction.
    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          role: 'user',
          parts: [
            audioPart,
            {
              text:
                'Transcribe the speech in this audio verbatim, without filler words. Reply with the transcript only, or an empty string if there is no speech.' +
                (vocabulary.length ? ` Likely names and terms: ${vocabulary.join(', ')}.` : ''),
            },
          ],
        },
      ],
    })
    return transcriptOf(response)
  })

  return json({ text: text.trim() })
})
