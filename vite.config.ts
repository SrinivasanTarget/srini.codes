import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), preloadHero()],
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
})
