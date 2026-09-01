/**
 * The bridge between Gemini function calling and the page's WebMCP tools.
 *
 * Gemini never talks to the site directly: it only sees the function
 * declarations derived from document.modelContext.getTools(), and every call
 * it makes is executed through document.modelContext.executeTool(). The same
 * tools are what Chrome's own agent or a DevTools panel would discover.
 */
import { executeRegisteredTool, toolInputSchema } from '../webmcp/modelContext'
import type { JsonSchema, ModelContext, RegisteredTool, ToolInput } from '../webmcp/types'

/** Gemini FunctionDeclaration with a JSON Schema parameter description. */
export interface FunctionDeclaration {
  name: string
  description: string
  parametersJsonSchema: JsonSchema
}

/** A Gemini Content item; parts are passed through verbatim (thought signatures included). */
export interface GeminiContent {
  role: 'user' | 'model'
  parts: Array<Record<string, unknown>>
}

export interface FunctionCall {
  id?: string
  name: string
  args: ToolInput
}

const GEMINI_NAME = /^[a-zA-Z_][a-zA-Z0-9_.:-]{0,127}$/

/** Gemini function names must start with a letter or underscore; WebMCP names need not. */
const toFunctionName = (toolName: string) => {
  const cleaned = toolName.replace(/[^a-zA-Z0-9_.:-]/g, '_')
  return GEMINI_NAME.test(cleaned) ? cleaned : `tool_${cleaned}`
}

const cleanSchema = (schema: JsonSchema): JsonSchema => {
  const copy = JSON.parse(JSON.stringify(schema)) as JsonSchema
  delete copy.$schema
  if (!copy.type) copy.type = 'object'
  if (copy.type === 'object' && !copy.properties) copy.properties = {}
  return copy
}

export class ToolBridge {
  private byFunctionName = new Map<string, RegisteredTool>()
  readonly declarations: FunctionDeclaration[]

  constructor(private readonly context: ModelContext, tools: RegisteredTool[]) {
    this.declarations = tools.map((tool) => {
      const name = toFunctionName(tool.name)
      this.byFunctionName.set(name, tool)
      return {
        name,
        description: tool.description,
        parametersJsonSchema: cleanSchema(toolInputSchema(tool)),
      }
    })
  }

  static async discover(context: ModelContext): Promise<ToolBridge> {
    const tools = await context.getTools()
    return new ToolBridge(context, tools)
  }

  get size() {
    return this.declarations.length
  }

  /** Executes one model-requested call through WebMCP and shapes the FunctionResponse payload. */
  async call(call: FunctionCall, signal?: AbortSignal): Promise<Record<string, unknown>> {
    const tool = this.byFunctionName.get(call.name)
    if (!tool) return { error: `Unknown tool "${call.name}"` }
    try {
      const result = await executeRegisteredTool(this.context, tool, call.args ?? {}, signal)
      return toFunctionResponse(result)
    } catch (error) {
      return { error: error instanceof Error ? error.message : String(error) }
    }
  }
}

/**
 * WebMCP tools conventionally return MCP CallToolResult objects whose text
 * parts often carry JSON. Unwrap those so the model sees structured data
 * rather than a string of escaped JSON.
 */
export function toFunctionResponse(result: unknown): Record<string, unknown> {
  if (result && typeof result === 'object' && Array.isArray((result as { content?: unknown }).content)) {
    const { content, isError } = result as { content: Array<{ type?: string; text?: string }>; isError?: boolean }
    const texts = content
      .filter((part) => part && part.type === 'text' && typeof part.text === 'string')
      .map((part) => tryParse(part.text as string))
    const output = texts.length === 1 ? texts[0] : texts
    return isError ? { error: output } : { output }
  }
  if (typeof result === 'string') return { output: tryParse(result) }
  return { output: result ?? null }
}

const tryParse = (value: string): unknown => {
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}
