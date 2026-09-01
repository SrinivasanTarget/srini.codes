/**
 * Small helpers shared by the voice functions. Files under api/_lib are not
 * deployed as functions (Vercel skips underscore-prefixed paths).
 */

export class HttpError extends Error {
  constructor(readonly status: number, message: string) {
    super(message)
  }
}

export const json = (data: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...headers,
    },
  })

/** Reads and parses a JSON body, refusing anything over `maxBytes`. */
export async function readJson<T>(request: Request, maxBytes: number): Promise<T> {
  const declared = Number(request.headers.get('content-length') ?? 0)
  if (declared > maxBytes) throw new HttpError(413, 'Request body is too large')
  const text = await request.text()
  if (text.length > maxBytes) throw new HttpError(413, 'Request body is too large')
  try {
    return JSON.parse(text) as T
  } catch {
    throw new HttpError(400, 'Body must be JSON')
  }
}

const DEFAULT_ORIGINS = ['https://srini.codes', 'https://www.srini.codes']

const allowedOrigins = () =>
  (process.env.VOICE_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
    .concat(DEFAULT_ORIGINS)

/**
 * Only the site's own pages may call these functions. Browsers always send
 * an Origin header on fetch POSTs, so a missing one means a script or tool,
 * not a visitor. This is a hotlinking deterrent, not authentication; the
 * per-IP rate limit below bounds the cost of anyone who spoofs it.
 */
export function assertBrowserOrigin(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin) throw new HttpError(403, 'Missing Origin header')
  let host: string
  try {
    host = new URL(origin).hostname
  } catch {
    throw new HttpError(403, 'Invalid Origin header')
  }
  const isLocal = host === 'localhost' || host === '127.0.0.1'
  const isPreview = host.endsWith('.vercel.app')
  const isAllowed = allowedOrigins().some((allowed) => {
    try {
      return new URL(allowed).hostname === host
    } catch {
      return allowed === host
    }
  })
  if (!isLocal && !isPreview && !isAllowed) throw new HttpError(403, 'Origin not allowed')
}

export const clientIp = (request: Request) =>
  request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
  request.headers.get('x-real-ip') ||
  'unknown'

const buckets = new Map<string, number[]>()

/**
 * Sliding-window limit per client IP. State lives in the function instance,
 * so it is best-effort across cold starts and regions, which is enough to
 * keep a single abuser from running up the Gemini bill.
 */
export function rateLimit(request: Request, limit: number, windowMs: number) {
  const key = clientIp(request)
  const now = Date.now()
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs)
  if (recent.length >= limit) {
    throw new HttpError(429, 'Too many requests, please slow down')
  }
  recent.push(now)
  buckets.set(key, recent)
  if (buckets.size > 5000) {
    for (const [k, times] of buckets) {
      if (times.every((t) => now - t >= windowMs)) buckets.delete(k)
    }
  }
}

/** Wraps a handler so thrown HttpErrors become JSON responses and anything else a 500. */
export const handler =
  (fn: (request: Request) => Promise<Response>) =>
  async (request: Request): Promise<Response> => {
    try {
      return await fn(request)
    } catch (error) {
      if (error instanceof HttpError) return json({ error: error.message }, error.status)
      const status = (error as { status?: number }).status
      if (status === 429) return json({ error: 'The voice service is busy, please try again shortly' }, 429)
      console.error('[voice]', error)
      return json({ error: 'The voice service hit an unexpected error' }, 500)
    }
  }
