import { useEffect } from 'react'

const SITE_URL = 'https://srini.codes'
const SITE_NAME = 'Srinivasan Sekar'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

interface SEOOptions {
  title: string
  description: string
  /** Canonical path starting with '/', e.g. '/conferences' */
  path: string
  /** Open Graph type; 'website' unless the page is an article or book */
  type?: 'website' | 'article' | 'book' | 'profile'
  /** Absolute URL of a page-specific share image */
  image?: string
  /** Pixel size of the share image; defaults to the site-wide og-image */
  imageWidth?: number
  imageHeight?: number
}

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const setCanonical = (url: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', url)
}

/**
 * Keeps document.title, description, canonical URL, and social share tags in
 * sync with the current route. The static tags in index.html only describe
 * the homepage, so every routed screen must call this.
 */
export const useSEO = ({
  title,
  description,
  path,
  type = 'website',
  image,
  imageWidth = 1200,
  imageHeight = 1085,
}: SEOOptions) => {
  useEffect(() => {
    const url = `${SITE_URL}${path}`
    const img = image || DEFAULT_IMAGE

    document.title = title
    setCanonical(url)
    setMeta('name', 'title', title)
    setMeta('name', 'description', description)

    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:image', img)
    setMeta('property', 'og:image:width', String(imageWidth))
    setMeta('property', 'og:image:height', String(imageHeight))
    setMeta('property', 'og:site_name', SITE_NAME)

    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:url', url)
    setMeta('name', 'twitter:image', img)
  }, [title, description, path, type, image, imageWidth, imageHeight])
}

interface ArticleJsonLd {
  title: string
  description: string
  slug: string
  publishedAt?: string
  image?: string
}

/**
 * Injects schema.org Article structured data for a blog post. Pass null while
 * the post is loading; the script tag is removed when the page unmounts.
 */
export const useArticleJsonLd = (article: ArticleJsonLd | null) => {
  useEffect(() => {
    const ID = 'article-jsonld'
    document.getElementById(ID)?.remove()
    if (!article) return

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = ID
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      image: article.image || DEFAULT_IMAGE,
      datePublished: article.publishedAt,
      url: `${SITE_URL}/blog/${article.slug}`,
      mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
      author: { '@id': `${SITE_URL}/#person` },
      publisher: { '@id': `${SITE_URL}/#person` },
    })
    document.head.appendChild(script)

    return () => document.getElementById(ID)?.remove()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article?.title, article?.description, article?.slug, article?.publishedAt, article?.image])
}
