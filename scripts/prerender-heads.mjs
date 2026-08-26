// Post-build step: write a copy of build/index.html for each static route
// with that route's head metadata (title, description, canonical, Open
// Graph, Twitter) baked in, so crawlers that don't execute JavaScript see
// the right tags. Static hosts serve build/<route>/index.html for /<route>
// before any SPA fallback applies. Route metadata comes from
// src/seo/routes.json, the same source the useSEO hook uses at runtime.
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const SITE_URL = 'https://srini.codes'
const BUILD_DIR = 'build'
const DEFAULTS = {
  image: `${SITE_URL}/og-image.png`,
  imageWidth: 1200,
  imageHeight: 1085,
  imageAlt: 'Portrait of Srinivasan Sekar',
}

const routes = JSON.parse(readFileSync('src/seo/routes.json', 'utf8'))
const template = readFileSync(join(BUILD_DIR, 'index.html'), 'utf8')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

const setTag = (html, pattern, replacement) => {
  if (!pattern.test(html)) throw new Error(`prerender: tag not found: ${pattern}`)
  return html.replace(pattern, replacement)
}

const renderRoute = (meta) => {
  const url = `${SITE_URL}${meta.path}`
  const title = esc(meta.title)
  const desc = esc(meta.description)
  const type = meta.type || 'website'
  const image = meta.image || DEFAULTS.image
  const imageWidth = meta.imageWidth || DEFAULTS.imageWidth
  const imageHeight = meta.imageHeight || DEFAULTS.imageHeight
  const imageAlt = esc(meta.imageAlt || DEFAULTS.imageAlt)

  let html = template
  html = setTag(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`)
  html = setTag(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`)
  const metas = [
    ['name', 'title', title],
    ['name', 'description', desc],
    ['property', 'og:type', type],
    ['property', 'og:url', url],
    ['property', 'og:title', title],
    ['property', 'og:description', desc],
    ['property', 'og:image', image],
    ['property', 'og:image:width', String(imageWidth)],
    ['property', 'og:image:height', String(imageHeight)],
    ['property', 'og:image:alt', imageAlt],
    ['name', 'twitter:url', url],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', desc],
    ['name', 'twitter:image', image],
    ['name', 'twitter:image:alt', imageAlt],
  ]
  for (const [attr, key, value] of metas) {
    html = setTag(
      html,
      new RegExp(`<meta ${attr}="${key.replace(/[.:]/g, '\\$&')}" content="[^"]*" />`),
      `<meta ${attr}="${key}" content="${value}" />`
    )
  }
  return html
}

let count = 0
for (const meta of Object.values(routes)) {
  if (meta.path === '/') continue // build/index.html already carries homepage meta
  const dir = join(BUILD_DIR, meta.path.slice(1))
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), renderRoute(meta))
  count++
}
console.log(`[prerender] wrote head-correct index.html for ${count} routes`)
