import type {
  JsonSchema,
  ModelContext,
  ModelContextExecuteToolOptions,
  ModelContextRegisterToolOptions,
  ModelContextTool,
  RegisteredTool,
  ToolInput,
} from './types'

export type ModelContextImplementation = 'native' | 'polyfill'

const TOOL_NAME = /^[A-Za-z0-9_.-]{1,128}$/

/**
 * Spec-shaped in-page implementation of ModelContext used when the browser
 * has no native WebMCP. It only serves agents running inside this document
 * (the site's own voice assistant, or extensions that read
 * document.modelContext), which is the same-origin default the spec grants.
 */
class ModelContextPolyfill extends EventTarget implements ModelContext {
  private readonly tools = new Map<string, ModelContextTool>()
  ontoolchange: ((this: ModelContext, ev: Event) => unknown) | null = null

  async registerTool(tool: ModelContextTool, options: ModelContextRegisterToolOptions = {}) {
    if (typeof tool?.name !== 'string' || !TOOL_NAME.test(tool.name)) {
      throw new TypeError(`WebMCP: invalid tool name "${tool?.name}"`)
    }
    if (typeof tool.description !== 'string' || !tool.description) {
      throw new TypeError(`WebMCP: tool "${tool.name}" needs a description`)
    }
    if (typeof tool.execute !== 'function') {
      throw new TypeError(`WebMCP: tool "${tool.name}" needs an execute callback`)
    }
    if (options.signal?.aborted) return

    // Schemas are serialised at registration time, like the spec's
    // "serialize a JavaScript value to a JSON string" step, so later
    // mutations by the page do not leak into what agents were told.
    const inputSchema = tool.inputSchema
      ? (JSON.parse(JSON.stringify(tool.inputSchema)) as JsonSchema)
      : undefined
    const stored: ModelContextTool = { ...tool, inputSchema }
    this.tools.set(tool.name, stored)
    options.signal?.addEventListener(
      'abort',
      () => {
        if (this.tools.get(tool.name) === stored) {
          this.tools.delete(tool.name)
          this.notify()
        }
      },
      { once: true }
    )
    this.notify()
  }

  // Same-origin only, so the fromOrigins filter has nothing to narrow.
  async getTools(): Promise<RegisteredTool[]> {
    return [...this.tools.values()]
      .map((tool) => ({
        name: tool.name,
        title: tool.title,
        description: tool.description,
        inputSchema: tool.inputSchema
          ? (JSON.parse(JSON.stringify(tool.inputSchema)) as JsonSchema)
          : undefined,
        annotations: tool.annotations ? { ...tool.annotations } : undefined,
        window,
        origin: location.origin,
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }

  async executeTool(
    registered: RegisteredTool,
    input: ToolInput | string = {},
    options: ModelContextExecuteToolOptions = {}
  ): Promise<string | null> {
    const tool = this.tools.get(registered.name)
    if (!tool) throw new DOMException(`WebMCP: no tool named "${registered.name}"`, 'NotFoundError')
    const args: ToolInput = typeof input === 'string' ? JSON.parse(input || '{}') : { ...input }
    const controller = new AbortController()
    options.signal?.addEventListener('abort', () => controller.abort(), { once: true })
    const result = await tool.execute(args, { signal: controller.signal })
    if (result === undefined) return null
    return typeof result === 'string' ? result : JSON.stringify(result)
  }

  private notify() {
    // Spec queues the toolchange task; deferring also coalesces bursts of
    // registrations made in one tick.
    queueMicrotask(() => {
      const event = new Event('toolchange')
      this.ontoolchange?.call(this, event)
      this.dispatchEvent(event)
    })
  }
}

let installed: { context: ModelContext; implementation: ModelContextImplementation } | null = null

/**
 * Returns the page's ModelContext, preferring the browser's native WebMCP
 * (document.modelContext in the current draft, navigator.modelContext in
 * the Chrome 149 origin trial) and otherwise installing the polyfill on
 * document.modelContext so any in-page agent finds it at the spec location.
 */
export function ensureModelContext() {
  if (installed) return installed
  if (typeof document === 'undefined') {
    throw new Error('WebMCP is only available in a browser document')
  }
  const native = document.modelContext ?? navigator.modelContext
  if (native && typeof native.registerTool === 'function') {
    installed = { context: native, implementation: 'native' }
    return installed
  }
  const polyfill = new ModelContextPolyfill()
  try {
    Object.defineProperty(document, 'modelContext', {
      value: polyfill,
      configurable: true,
      enumerable: true,
    })
  } catch {
    // A read-only accessor without a native object: keep using the instance directly.
  }
  installed = { context: polyfill, implementation: 'polyfill' }
  return installed
}

/** Parses the inputSchema of a discovered tool, which Chromium may return as JSON text. */
export function toolInputSchema(tool: RegisteredTool): JsonSchema {
  const schema = tool.inputSchema
  if (!schema) return { type: 'object', properties: {} }
  if (typeof schema === 'string') {
    try {
      return JSON.parse(schema) as JsonSchema
    } catch {
      return { type: 'object', properties: {} }
    }
  }
  return schema
}

/**
 * Executes a discovered tool through the ModelContext and returns the parsed
 * result. Handles the two argument encodings seen in the wild (spec: object,
 * early Chromium: JSON string) and the stringified return value.
 */
export async function executeRegisteredTool(
  context: ModelContext,
  tool: RegisteredTool,
  args: ToolInput,
  signal?: AbortSignal
): Promise<unknown> {
  if (typeof context.executeTool !== 'function') {
    throw new Error('This ModelContext cannot execute tools (no executeTool)')
  }
  let raw: string | null
  try {
    raw = await context.executeTool(tool, args, { signal })
  } catch (error) {
    if (!(error instanceof TypeError)) throw error
    raw = await context.executeTool(tool, JSON.stringify(args), { signal })
  }
  if (raw === null || raw === undefined) return null
  try {
    return JSON.parse(raw)
  } catch {
    return raw
  }
}
