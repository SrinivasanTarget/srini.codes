/**
 * POST /api/voice/respond
 * Body:  { contents: Content[], tools: FunctionDeclaration[] }
 * Reply: { content: Content, functionCalls: [{ id?, name, args }], text }
 *
 * One step of the model loop. The browser owns the conversation and the
 * tools: it sends the WebMCP tools it discovered as Gemini function
 * declarations, gets back either function calls to run through
 * document.modelContext or the final answer, and calls again with the tool
 * results. This function holds the API key and the system prompt, nothing
 * else; it has no knowledge of Srinivasan of its own.
 */
import { ThinkingLevel, type Content, type FunctionDeclaration, type Part } from '@google/genai'
import { assertBrowserOrigin, handler, HttpError, json, rateLimit, readJson } from '../_lib/http'
import { gemini, isBadRequest, MODELS, withModelFallback } from '../_lib/gemini'

const MAX_BODY_BYTES = 400_000
const MAX_CONTENTS = 48
const MAX_TOOLS = 32
const NAME = /^[a-zA-Z_][a-zA-Z0-9_.:-]{0,127}$/

const SYSTEM_PROMPT = `You are the voice assistant on srini.codes, the personal website of Srinivasan Sekar (Srini).

You know nothing about Srinivasan on your own. Every fact you state must come from the tools this web page exposes to you through WebMCP; those tools read the website's own content.

Rules:
1. For any question about Srinivasan (his work, role, books, talks, projects, articles, press, podcast, contact details, background, expertise) call the relevant tool(s) first, then answer only from what they return. Never answer from memory or general knowledge, even if you think you know.
2. If the tools do not contain the answer, say plainly that the website does not cover it. Do not guess, infer dates, or invent details.
3. Only help with questions about Srinivasan and this website. For anything else, say in one sentence that you can only answer questions about Srinivasan and what is on this site.
4. Your reply is read aloud by text-to-speech. Use one to three short, natural sentences in plain prose: no markdown, bullet points, headings, URLs, code, emoji or spelled-out symbols. Say "the contact page" rather than reading a link. Read years and counts as words a person would say.
5. Refer to him as Srini or Srinivasan. Be warm and to the point.
6. If the user asks to open, show or go to a page, call navigate_to_page and then confirm in a few words.`

interface Body {
  contents?: unknown
  tools?: unknown
}

const isPart = (part: unknown): part is Part => !!part && typeof part === 'object'

const validateContents = (value: unknown): Content[] => {
  if (!Array.isArray(value) || value.length === 0) throw new HttpError(400, 'contents must be a non-empty array')
  if (value.length > MAX_CONTENTS) throw new HttpError(400, 'Conversation too long')
  return value.map((item) => {
    const { role, parts } = (item ?? {}) as { role?: unknown; parts?: unknown }
    if ((role !== 'user' && role !== 'model') || !Array.isArray(parts) || !parts.every(isPart)) {
      throw new HttpError(400, 'Malformed content item')
    }
    return { role, parts }
  })
}

const validateTools = (value: unknown): FunctionDeclaration[] => {
  if (!Array.isArray(value) || value.length === 0) throw new HttpError(400, 'tools must be a non-empty array')
  if (value.length > MAX_TOOLS) throw new HttpError(400, 'Too many tools')
  return value.map((item) => {
    const { name, description, parametersJsonSchema } = (item ?? {}) as Record<string, unknown>
    if (typeof name !== 'string' || !NAME.test(name)) throw new HttpError(400, 'Invalid tool name')
    if (typeof description !== 'string' || !description) throw new HttpError(400, `Tool ${name} needs a description`)
    return {
      name,
      description: description.slice(0, 2000),
      parametersJsonSchema:
        parametersJsonSchema && typeof parametersJsonSchema === 'object'
          ? parametersJsonSchema
          : { type: 'object', properties: {} },
    }
  })
}

export const POST = handler(async (request) => {
  assertBrowserOrigin(request)
  rateLimit(request, 40, 60_000)
  const body = await readJson<Body>(request, MAX_BODY_BYTES)
  const contents = validateContents(body.contents)
  const tools = validateTools(body.tools)

  const ai = gemini()
  const generate = (model: string, thinking: boolean) =>
    ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        tools: [{ functionDeclarations: tools }],
        temperature: 0.4,
        maxOutputTokens: 1024,
        ...(thinking ? { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } } : {}),
      },
    })

  const response = await withModelFallback(MODELS.respond, async (model) => {
    try {
      return await generate(model, true)
    } catch (error) {
      // Models without thinking levels reject the config; retry without it.
      if (!isBadRequest(error)) throw error
      return generate(model, false)
    }
  })

  const candidate = response.candidates?.[0]
  const content: Content = candidate?.content ?? { role: 'model', parts: [] }
  const parts = content.parts ?? []
  const functionCalls = parts
    .filter((part) => part.functionCall?.name)
    .map((part) => ({
      id: part.functionCall?.id,
      name: part.functionCall?.name as string,
      args: part.functionCall?.args ?? {},
    }))
  const text = parts
    .filter((part) => typeof part.text === 'string' && !part.thought)
    .map((part) => part.text)
    .join('')

  if (!functionCalls.length && !text) {
    const reason = candidate?.finishReason ?? response.promptFeedback?.blockReason
    throw new HttpError(502, reason ? `The model returned no answer (${reason})` : 'The model returned no answer')
  }

  return json({ content: { role: 'model', parts }, functionCalls, text })
})
