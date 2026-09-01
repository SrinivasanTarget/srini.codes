/**
 * Orchestrates one spoken turn:
 *
 *   microphone → /api/voice/transcribe (Gemini 3.5 Transcribe)
 *              → /api/voice/respond   (Gemini 3.7 Flash, function calling)
 *                  ↕ every function call runs through WebMCP on this page
 *              → /api/voice/speak     (Gemini 3.1 Flash TTS)
 *              → speakers
 *
 * The model loop lives here in the browser on purpose: the server is a thin
 * proxy that holds the API key, and the only path from the model to the
 * site's content is document.modelContext.
 */
import { ensureModelContext } from '../webmcp/modelContext'
import { siteVocabulary } from '../webmcp/siteTools'
import { ToolBridge, type FunctionCall, type GeminiContent } from './bridge'
import type { RecordedAudio } from './audio'

const MAX_TOOL_ROUNDS = 6
const MAX_HISTORY_ITEMS = 16

export class VoiceApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
  }
}

async function post<T>(path: string, body: unknown, signal?: AbortSignal): Promise<T> {
  let response: Response
  try {
    response = await fetch(path, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      signal,
    })
  } catch (error) {
    if (signal?.aborted) throw error
    throw new VoiceApiError('Could not reach the voice service. Check your connection.', 0)
  }
  const contentType = response.headers.get('content-type') ?? ''
  if (!response.ok) {
    let message = `Voice service error (${response.status})`
    if (contentType.includes('application/json')) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null
      if (data?.error) message = data.error
    } else if (response.status === 404) {
      message = 'The voice API is not deployed on this host.'
    }
    throw new VoiceApiError(message, response.status)
  }
  return (await response.json()) as T
}

export async function transcribe(audio: RecordedAudio, signal?: AbortSignal): Promise<string> {
  const { text } = await post<{ text: string }>(
    '/api/voice/transcribe',
    { audio: audio.base64, mimeType: audio.mimeType, vocabulary: siteVocabulary() },
    signal
  )
  return text.trim()
}

export interface AnswerResult {
  text: string
  /** Conversation state to carry into the next turn */
  history: GeminiContent[]
  toolCalls: FunctionCall[]
}

interface RespondResponse {
  content: GeminiContent
  functionCalls: FunctionCall[]
  text: string
}

/**
 * Runs the model until it produces a spoken answer, executing every
 * function call it requests through WebMCP in between.
 */
export async function answer(
  question: string,
  history: GeminiContent[],
  onToolCall?: (call: FunctionCall) => void,
  signal?: AbortSignal
): Promise<AnswerResult> {
  const { context } = ensureModelContext()
  const bridge = await ToolBridge.discover(context)
  if (bridge.size === 0) {
    throw new Error('No WebMCP tools are registered on this page, so there is nothing to answer from.')
  }

  const contents: GeminiContent[] = [...trimHistory(history), { role: 'user', parts: [{ text: question }] }]
  const toolCalls: FunctionCall[] = []

  for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
    const reply = await post<RespondResponse>(
      '/api/voice/respond',
      { contents, tools: bridge.declarations },
      signal
    )
    // Keep the model's content verbatim: Gemini 3 validates the thought
    // signatures attached to function-call parts on the next request.
    contents.push(reply.content)

    if (!reply.functionCalls?.length) {
      const text = reply.text?.trim() || "I couldn't find that on the site."
      return { text, history: contents, toolCalls }
    }

    const parts: Array<Record<string, unknown>> = []
    for (const call of reply.functionCalls) {
      onToolCall?.(call)
      toolCalls.push(call)
      const response = await bridge.call(call, signal)
      const part: Record<string, unknown> = { functionResponse: { name: call.name, response } }
      if (call.id) (part.functionResponse as Record<string, unknown>).id = call.id
      parts.push(part)
    }
    contents.push({ role: 'user', parts })
  }
  throw new Error('The assistant made too many tool calls without answering.')
}

export async function synthesize(
  text: string,
  signal?: AbortSignal
): Promise<{ audio: string; sampleRate: number }> {
  return post('/api/voice/speak', { text }, signal)
}

/**
 * Keeps recent turns while never cutting between a function call and its
 * response: the history only ever starts at a plain user message.
 */
function trimHistory(history: GeminiContent[]): GeminiContent[] {
  if (history.length <= MAX_HISTORY_ITEMS) return history
  const isUserText = (item: GeminiContent) =>
    item.role === 'user' && item.parts.some((part) => typeof part.text === 'string')
  for (let i = history.length - MAX_HISTORY_ITEMS; i < history.length; i++) {
    if (isUserText(history[i])) return history.slice(i)
  }
  return []
}
