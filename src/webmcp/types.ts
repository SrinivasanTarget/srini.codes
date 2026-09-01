/**
 * WebMCP (Web Model Context Protocol) API types.
 *
 * Mirrors the W3C Web Machine Learning CG draft (webmachinelearning.github.io/webmcp):
 *
 *   partial interface Document { readonly attribute ModelContext modelContext; }
 *   interface ModelContext : EventTarget {
 *     Promise<undefined> registerTool(ModelContextTool tool, optional ModelContextRegisterToolOptions options);
 *     Promise<sequence<RegisteredTool>> getTools(optional ModelContextGetToolOptions options);
 *     Promise<DOMString> executeTool(RegisteredTool tool, optional object inputObject, optional ModelContextExecuteToolOptions options);
 *     attribute EventHandler ontoolchange;
 *   }
 *
 * Chrome 149 exposed the getter as navigator.modelContext (origin trial);
 * the May 2026 draft moved it to document.modelContext, which Chrome 150+
 * and the polyfill in ./modelContext.ts use. Both are typed here.
 */

export interface JsonSchema {
  type?: string
  properties?: Record<string, unknown>
  required?: readonly string[]
  [keyword: string]: unknown
}

export interface ToolAnnotations {
  /** The tool only reads state; it never mutates the page or the world. */
  readOnlyHint?: boolean
  /** The tool may return content from untrusted sources. */
  untrustedContentHint?: boolean
}

export interface ToolExecuteCallbackOptions {
  /** Aborted when the agent cancels the call. */
  signal: AbortSignal
}

export type ToolInput = Record<string, unknown>

export type ToolExecuteCallback = (
  input: ToolInput,
  options: ToolExecuteCallbackOptions
) => unknown | Promise<unknown>

/** MCP-style tool result; the shape agents in the wild expect back. */
export interface ToolResult {
  content: Array<{ type: 'text'; text: string }>
  isError?: boolean
}

export interface ModelContextTool {
  /** 1-128 chars of ASCII letters, digits, '_', '-' or '.' */
  name: string
  title?: string
  description: string
  inputSchema?: JsonSchema
  execute: ToolExecuteCallback
  annotations?: ToolAnnotations
}

export interface ModelContextRegisterToolOptions {
  /** Aborting the signal unregisters the tool. */
  signal?: AbortSignal
  /** Secure origins allowed to call this tool from other documents. */
  exposedTo?: string[]
}

export interface ModelContextGetToolOptions {
  fromOrigins?: string[]
}

export interface ModelContextExecuteToolOptions {
  signal?: AbortSignal
}

export interface RegisteredTool {
  name: string
  title?: string
  description: string
  /** Deep copy of the registered schema; Chromium builds may hand back JSON text. */
  inputSchema?: JsonSchema | string
  window: Window
  origin: string
  annotations?: ToolAnnotations
}

export interface ModelContext extends EventTarget {
  registerTool(tool: ModelContextTool, options?: ModelContextRegisterToolOptions): Promise<void>
  getTools(options?: ModelContextGetToolOptions): Promise<RegisteredTool[]>
  /**
   * Runs a discovered tool in the document that registered it and resolves
   * with the stringified result. Optional because Chrome 149 shipped
   * registerTool before executeTool.
   */
  executeTool?(
    tool: RegisteredTool,
    input?: ToolInput | string,
    options?: ModelContextExecuteToolOptions
  ): Promise<string | null>
  ontoolchange: ((this: ModelContext, ev: Event) => unknown) | null
}

declare global {
  interface Document {
    /** Native WebMCP (current draft) or the polyfill installed by ensureModelContext(). */
    modelContext?: ModelContext
  }
  interface Navigator {
    /** Chrome 149 origin-trial location of the same object. */
    modelContext?: ModelContext
  }
}
