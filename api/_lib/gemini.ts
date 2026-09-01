import { GoogleGenAI } from '@google/genai'
import { HttpError } from './http'

/**
 * Model line-up. Each stage of the pipeline uses the model built for it:
 *   - respond:    Gemini 3.7 Flash, the current Flash workhorse with function calling
 *   - transcribe: Gemini 3.5 Transcribe, the dedicated speech-to-text model
 *   - speak:      Gemini 3.1 Flash TTS, the current text-to-speech model
 * Lists are tried in order so a renamed or retired preview id degrades to
 * the next best model instead of taking the assistant down. Override any of
 * them with the GEMINI_* environment variables in .env.example.
 */
const fromEnv = (name: string, fallback: string[]) => {
  const value = process.env[name]?.trim()
  return value ? [value, ...fallback.filter((m) => m !== value)] : fallback
}

export const MODELS = {
  respond: fromEnv('GEMINI_TEXT_MODEL', ['gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-3.5-flash']),
  transcribe: fromEnv('GEMINI_STT_MODEL', [
    'gemini-3.5-transcribe',
    'gemini-3.5-transcribe-preview',
    'gemini-3.7-flash',
  ]),
  speak: fromEnv('GEMINI_TTS_MODEL', ['gemini-3.1-flash-tts-preview', 'gemini-2.5-flash-preview-tts']),
}

export const DEFAULT_VOICE = process.env.GEMINI_TTS_VOICE?.trim() || 'Charon'

/** The 30 prebuilt Gemini TTS voices. */
export const VOICES = [
  'Achernar', 'Achird', 'Algenib', 'Algieba', 'Alnilam', 'Aoede', 'Autonoe', 'Callirrhoe',
  'Charon', 'Despina', 'Enceladus', 'Erinome', 'Fenrir', 'Gacrux', 'Iapetus', 'Kore',
  'Laomedeia', 'Leda', 'Orus', 'Pulcherrima', 'Puck', 'Rasalgethi', 'Sadachbia', 'Sadaltager',
  'Schedar', 'Sulafat', 'Umbriel', 'Vindemiatrix', 'Zephyr', 'Zubenelgenubi',
]

let client: GoogleGenAI | null = null

export function gemini(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY?.trim()
  if (!apiKey) {
    throw new HttpError(503, 'The voice assistant is not configured on this deployment (GEMINI_API_KEY is missing)')
  }
  client ??= new GoogleGenAI({ apiKey })
  return client
}

const statusOf = (error: unknown) => (error as { status?: number })?.status
const messageOf = (error: unknown) => (error instanceof Error ? error.message : String(error))

export const isNotFound = (error: unknown) =>
  statusOf(error) === 404 || /NOT_FOUND|not found|is not supported for/i.test(messageOf(error))

export const isBadRequest = (error: unknown) => statusOf(error) === 400

/** Runs `attempt` against each model in turn, moving on when a model id is unknown. */
export async function withModelFallback<T>(models: string[], attempt: (model: string) => Promise<T>): Promise<T> {
  let lastError: unknown
  for (const model of models) {
    try {
      return await attempt(model)
    } catch (error) {
      lastError = error
      if (!isNotFound(error)) throw error
      console.warn(`[voice] model ${model} unavailable, trying next:`, messageOf(error))
    }
  }
  throw lastError
}
