import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ensureModelContext } from './modelContext'
import { buildSiteTools } from './siteTools'

/**
 * Registers the site's WebMCP tools on document.modelContext for the
 * lifetime of the app. Rendered once inside the Router so navigate_to_page
 * can use client-side routing. Registration is tied to an AbortController,
 * the spec's way to unregister, so StrictMode's mount/unmount/mount leaves
 * exactly one copy of each tool.
 */
export default function SiteTools() {
  const navigate = useNavigate()
  const navigateRef = useRef(navigate)
  navigateRef.current = navigate

  useEffect(() => {
    let context
    try {
      context = ensureModelContext().context
    } catch (error) {
      console.warn('WebMCP unavailable:', error)
      return
    }
    const controller = new AbortController()
    const tools = buildSiteTools({ navigate: (path) => navigateRef.current(path) })
    for (const tool of tools) {
      context.registerTool(tool, { signal: controller.signal }).catch((error) => {
        console.warn(`WebMCP: could not register ${tool.name}`, error)
      })
    }
    return () => controller.abort()
  }, [])

  return null
}
