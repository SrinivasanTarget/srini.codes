import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync } from 'fs'
import { resolve } from 'path'
import postcss from './postcss.config.js'

/**
 * The homepage LCP element is the hero portrait, which the browser cannot
 * discover until React has mounted and rendered it. Emit a preload for the
 * hashed build asset so the fetch starts alongside the JS instead of after it.
 */
const preloadHero = () => ({
  name: 'preload-hero-image',
  enforce: 'post' as const,
  generateBundle(_options: unknown, bundle: Record<string, { fileName?: string }>) {
    const hero = Object.keys(bundle).find((f) => /ProfilePic-\w+\.webp$/.test(f))
    if (!hero) return
    const html = bundle['index.html'] as unknown as { source?: string } | undefined
    if (!html?.source) return
    html.source = html.source.replace(
      '</head>',
      `  <link rel="preload" as="image" href="/${hero}" fetchpriority="high" />\n  </head>`
    )
  },
})

/**
 * Serves the Vercel functions under api/ from the Vite dev server so the
 * voice assistant works with plain `npm run dev`. Each request loads the
 * matching api/<route>.ts through Vite's SSR pipeline (so edits hot-reload)
 * and invokes its exported HTTP-method handler with a Web-standard Request,
 * exactly the signature Vercel's Node runtime uses in production.
 */
const localApi = (env: Record<string, string>): Plugin => ({
  name: 'local-api',
  configureServer(server: ViteDevServer) {
    for (const [key, value] of Object.entries(env)) {
      if (/^(GEMINI_|VOICE_)/.test(key) && !process.env[key]) process.env[key] = value
    }
    server.middlewares.use(async (req, res, next) => {
      const url = new URL(req.url ?? '/', 'http://localhost')
      if (!url.pathname.startsWith('/api/')) return next()
      const file = resolve('api', `${url.pathname.slice('/api/'.length)}.ts`)
      if (!existsSync(file) || /\/_/.test(file.slice(resolve('api').length))) return next()
      try {
        const mod = await server.ssrLoadModule(file)
        const method = (req.method ?? 'GET').toUpperCase()
        const fn = mod[method] as ((request: Request) => Promise<Response>) | undefined
        if (typeof fn !== 'function') {
          res.statusCode = 405
          res.end()
          return
        }
        const chunks: Buffer[] = []
        for await (const chunk of req) chunks.push(chunk as Buffer)
        const headers = new Headers()
        for (const [name, value] of Object.entries(req.headers)) {
          if (typeof value === 'string') headers.set(name, value)
          else if (Array.isArray(value)) headers.set(name, value.join(', '))
        }
        const body = method === 'GET' || method === 'HEAD' ? undefined : Buffer.concat(chunks)
        const response = await fn(new Request(url, { method, headers, body }))
        res.statusCode = response.status
        response.headers.forEach((value, name) => res.setHeader(name, value))
        res.end(Buffer.from(await response.arrayBuffer()))
      } catch (error) {
        server.ssrFixStacktrace(error as Error)
        console.error(error)
        res.statusCode = 500
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify({ error: 'Local API handler crashed; see the terminal' }))
      }
    })
  },
})

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), preloadHero(), localApi(loadEnv(mode, process.cwd(), ''))],
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        // React and the router change only on dependency upgrades, while app
        // code changes on every content edit. Splitting them keeps the larger,
        // stabler half cached across deploys. Matched by path rather than by
        // package name so deep entries like react-dom/client are included.
        manualChunks(id: string) {
          if (/node_modules\/(react|react-dom|scheduler|react-router|react-router-dom)\//.test(id)) {
            return 'react-vendor'
          }
        },
      },
    },
  },
  css: { postcss },
}))
