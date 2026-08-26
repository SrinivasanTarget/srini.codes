// Post-build step: append blog post URLs (fetched from Hashnode) to the
// sitemap that Vite copied into build/. Network failures must never break
// the build; the static sitemap is a complete fallback on its own.
import { readFileSync, writeFileSync, existsSync } from 'fs'

const SITE_URL = 'https://srini.codes'
const SITEMAP_PATH = 'build/sitemap.xml'
const HASHNODE_API_URL = 'https://gql.hashnode.com/'
const PUBLICATION_HOST = 'blog.srini.codes'

const QUERY = `
  query GetPosts($host: String!, $first: Int!) {
    publication(host: $host) {
      posts(first: $first) {
        edges {
          node {
            slug
            publishedAt
          }
        }
      }
    }
  }
`

const fetchPosts = async () => {
  const res = await fetch(HASHNODE_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: QUERY, variables: { host: PUBLICATION_HOST, first: 50 } }),
    signal: AbortSignal.timeout(15000),
  })
  if (!res.ok) throw new Error(`Hashnode responded ${res.status}`)
  const json = await res.json()
  return json?.data?.publication?.posts?.edges?.map(e => e.node) ?? []
}

const main = async () => {
  if (!existsSync(SITEMAP_PATH)) {
    console.warn(`[sitemap] ${SITEMAP_PATH} not found; skipping`)
    return
  }
  const posts = await fetchPosts()
  if (posts.length === 0) {
    console.warn('[sitemap] no posts returned; keeping static sitemap')
    return
  }
  const entries = posts
    .map(p => {
      const lastmod = p.publishedAt ? `\n    <lastmod>${p.publishedAt.slice(0, 10)}</lastmod>` : ''
      return `  <url>\n    <loc>${SITE_URL}/blog/${p.slug}</loc>${lastmod}\n    <changefreq>yearly</changefreq>\n    <priority>0.6</priority>\n  </url>`
    })
    .join('\n')
  const sitemap = readFileSync(SITEMAP_PATH, 'utf8')
  writeFileSync(SITEMAP_PATH, sitemap.replace('</urlset>', `${entries}\n</urlset>`))
  console.log(`[sitemap] added ${posts.length} blog post URLs`)
}

main().catch(err => {
  console.warn(`[sitemap] skipped blog URLs: ${err.message}`)
})
