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
export const useSEO = ({ title, description, path, type = 'website', image }: SEOOptions) => {
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
    setMeta('property', 'og:site_name', SITE_NAME)

    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:url', url)
    setMeta('name', 'twitter:image', img)
  }, [title, description, path, type, image])
}
