import { profile, sitePages, SitePath } from '../portfolio/profile'
import { books } from '../portfolio/books'
import { projects } from '../portfolio/projects'
import { conferences } from '../portfolio/conferences'
import { CONFERENCES, VIRTUAL_CONFERENCES, HOME } from '../screens/conferences/data'
import { presentations } from '../portfolio/presentations'
import { citations } from '../portfolio/citations'
import { podcast } from '../portfolio/podcast'
import { contact } from '../portfolio/contact'
import { UnifiedBlogService } from '../services/unifiedBlog'
import type { ModelContextTool, ToolResult } from './types'

const SITE_URL = profile.website

/** Wraps data in the MCP CallToolResult shape agents expect from a WebMCP tool. */
const text = (data: unknown): ToolResult => ({
  content: [{ type: 'text', text: typeof data === 'string' ? data : JSON.stringify(data) }],
})

const norm = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

const matches = (haystack: string, query?: string) => {
  if (!query) return true
  const hay = norm(haystack)
  return norm(query)
    .split(' ')
    .filter(Boolean)
    .every((token) => hay.includes(token))
}

interface Talk {
  conference: string
  year: string
  talk: string
  format: 'in-person' | 'virtual'
  city?: string
  country?: string
  tags?: string[]
  link?: string
}

/**
 * One talk list built from the speaker map (in-person, with geography), the
 * virtual list, and the homepage talk cards (tags and links). The three
 * sources describe the same events from different angles.
 */
const buildTalks = (): Talk[] => {
  const detailsFor = (conf: string, year: string, city?: string) => {
    const token = norm(conf).split(' ')[0]
    const candidates = conferences.filter(
      (c) => c.title.includes(year) && norm(c.title).includes(token)
    )
    return (city && candidates.find((c) => norm(c.title).includes(norm(city)))) || candidates[0]
  }
  const inPerson: Talk[] = CONFERENCES.map((c) => {
    const details = detailsFor(c.conf, c.year, c.city)
    return {
      conference: c.conf,
      year: c.year,
      talk: c.talk,
      format: 'in-person',
      city: c.city,
      country: c.country,
      tags: details?.tags,
      link: c.video || details?.url || undefined,
    }
  })
  const virtual: Talk[] = VIRTUAL_CONFERENCES.map((c) => {
    const details = detailsFor(c.conf, c.year)
    return {
      conference: c.conf,
      year: c.year,
      talk: c.talk,
      format: 'virtual',
      tags: details?.tags,
      link: c.video || details?.url || undefined,
    }
  })
  return [...inPerson, ...virtual].sort((a, b) => Number(b.year) - Number(a.year))
}

const talkStats = () => {
  const countries = new Set(CONFERENCES.map((c) => c.country))
  const cities = new Set(CONFERENCES.map((c) => c.city))
  return {
    inPersonTalks: CONFERENCES.length,
    virtualTalks: VIRTUAL_CONFERENCES.length,
    countries: countries.size,
    cities: cities.size,
    homeBase: `${HOME.city}, ${HOME.country}`,
  }
}

export interface SiteToolsOptions {
  /** Client-side navigation, so navigate_to_page keeps the SPA alive. */
  navigate: (path: SitePath) => void
}

/**
 * The WebMCP tools this site registers on document.modelContext. Everything
 * an agent can learn about Srinivasan comes from these, and they read the
 * same data modules the pages render, so the assistant's knowledge is
 * exactly what the website says.
 */
export function buildSiteTools({ navigate }: SiteToolsOptions): ModelContextTool[] {
  const readOnly = { readOnlyHint: true }

  return [
    {
      name: 'get_profile',
      title: 'About Srinivasan Sekar',
      description:
        'Who Srinivasan Sekar (Srini) is: current role and employer, where he is based, biography, career highlights, expertise topics and social profiles. Call this first for any general question about him.',
      inputSchema: { type: 'object', properties: {} },
      annotations: readOnly,
      execute: () => text(profile),
    },
    {
      name: 'list_books',
      title: 'Books by Srinivasan',
      description:
        'The books Srinivasan has written or co-written: titles, subtitles, co-authors, publisher, publication date, ISBN, what readers learn, intended audience and where to buy or read them.',
      inputSchema: { type: 'object', properties: {} },
      annotations: readOnly,
      execute: () =>
        text(
          books.map((book) => ({
            title: book.title,
            subtitle: book.subtitle,
            authors: book.authors,
            foreword: book.foreword,
            publisher: book.publisher,
            published: book.date,
            pages: book.pages,
            isbn: book.isbn,
            summary: book.blurb,
            whatYouLearn: book.learnings,
            audience: book.audience,
            links: book.links.map((l) => ({ label: l.label, url: l.url })),
            page: `${SITE_URL}/book#${book.slug}`,
          }))
        ),
    },
    {
      name: 'list_projects',
      title: 'Open source projects',
      description:
        'Open source projects Srinivasan created, maintains or contributes to (Appium, AppiumTestDistribution, MCP servers, plugins and more) with a short description and repository link. Optional keyword filter.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Keyword to match against project names and descriptions' },
        },
      },
      annotations: readOnly,
      execute: ({ query }) =>
        text(
          projects
            .filter((p) => matches(`${p.title} ${p.description}`, query as string | undefined))
            .map((p) => ({ name: p.title, description: p.description, repository: p.source }))
        ),
    },
    {
      name: 'search_talks',
      title: 'Conference talks',
      description:
        'Search Srinivasan\'s conference talks and workshops: conference name, year, talk title, city and country for in-person events, and virtual events. Returns matching talks plus overall speaking statistics. Use it for "where has he spoken", "talks about X", "talks in 2025", etc.',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Keywords matched against conference, talk title, city, country and tags (e.g. "Appium", "Spain", "security")',
          },
          year: { type: 'string', description: 'Four-digit year to filter by, e.g. "2025"' },
          format: {
            type: 'string',
            enum: ['in-person', 'virtual', 'all'],
            description: 'Restrict to in-person or virtual events. Defaults to all.',
          },
        },
      },
      annotations: readOnly,
      execute: ({ query, year, format }) => {
        const wanted = (format as string | undefined) ?? 'all'
        const talks = buildTalks().filter((t) => {
          if (wanted !== 'all' && t.format !== wanted) return false
          if (year && t.year !== String(year)) return false
          const hay = [t.conference, t.talk, t.city, t.country, t.year, ...(t.tags ?? [])].join(' ')
          return matches(hay, query as string | undefined)
        })
        return text({ stats: talkStats(), results: talks.length, talks: talks.slice(0, 40) })
      },
    },
    {
      name: 'list_blog_posts',
      title: 'Blog posts',
      description:
        'Articles Srinivasan has written, on his own blog and on partner sites (TestMu AI, Applitools): title, summary, date, tags and URL. Optional keyword filter and result limit.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Keyword to match against titles, summaries and tags' },
          limit: { type: 'integer', minimum: 1, maximum: 20, description: 'Maximum posts to return (default 8)' },
        },
      },
      annotations: readOnly,
      execute: async ({ query, limit }) => {
        const max = Math.min(Math.max(Number(limit) || 8, 1), 20)
        const posts = await UnifiedBlogService.getAllBlogs(30)
        const hits = posts
          .filter((p) => matches(`${p.title} ${p.brief ?? ''} ${p.tags.join(' ')}`, query as string | undefined))
          .slice(0, max)
          .map((p) => ({
            title: p.title,
            summary: p.brief,
            published: p.publishedAt?.slice(0, 10),
            tags: p.tags,
            platform: p.platform,
            url: p.url.startsWith('/') ? `${SITE_URL}${p.url}` : p.url,
          }))
        return text({ results: hits.length, posts: hits })
      },
    },
    {
      name: 'list_presentations',
      title: 'Slide decks',
      description: 'Workshop slides and presentation decks published on the site, with the event each was given at.',
      inputSchema: { type: 'object', properties: {} },
      annotations: readOnly,
      execute: () =>
        text(presentations.map((p) => ({ title: p.title, event: p.event, tags: p.tags, slides: `${SITE_URL}${p.url}` }))),
    },
    {
      name: 'get_press_and_podcast',
      title: 'Press and podcast',
      description:
        'Press coverage and articles that quote or feature Srinivasan (The New Stack, DevOps.com, Security Boulevard, The Indian Express and others) and the podcast episode he appeared on.',
      inputSchema: { type: 'object', properties: {} },
      annotations: readOnly,
      execute: () =>
        text({
          press: citations.map((c) => ({
            title: c.title,
            outlet: c.source,
            url: c.url.startsWith('/') ? `${SITE_URL}${c.url}` : c.url,
          })),
          podcast,
        }),
    },
    {
      name: 'get_contact_info',
      title: 'Contact details',
      description:
        'How to reach Srinivasan: email, website, LinkedIn, X/Twitter and GitHub, plus what the contact page offers (save-to-contacts card, share link).',
      inputSchema: { type: 'object', properties: {} },
      annotations: readOnly,
      // The phone number on the contact card is deliberately left out so the
      // assistant never reads it aloud; the page itself still shows it.
      execute: () =>
        text({
          name: contact.name,
          title: `${contact.title}, ${contact.company}`,
          email: contact.email,
          website: contact.website,
          linkedin: `https://www.linkedin.com/in/${contact.linkedin}`,
          twitter: `https://twitter.com/${contact.twitter}`,
          github: `https://github.com/${contact.github}`,
          contactPage: `${SITE_URL}/contact`,
          contactPageOffers: ['Save contact card (vCard)', 'WhatsApp message', 'Share link'],
        }),
    },
    {
      name: 'get_site_map',
      title: 'Site map',
      description: 'The pages of srini.codes and what each one contains.',
      inputSchema: { type: 'object', properties: {} },
      annotations: readOnly,
      execute: () => text(sitePages.map((p) => ({ ...p, url: `${SITE_URL}${p.path}` }))),
    },
    {
      name: 'navigate_to_page',
      title: 'Open a page',
      description:
        'Navigate the visitor\'s browser to one of the site\'s pages. Use when the user asks to open, show or go to the books, blog, conferences, presentations, contact or home page.',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            enum: sitePages.map((p) => p.path),
            description: 'Path of the page to open',
          },
        },
        required: ['path'],
      },
      annotations: { readOnlyHint: false },
      execute: ({ path }) => {
        const page = sitePages.find((p) => p.path === path)
        if (!page) {
          return { ...text(`Unknown page "${String(path)}"`), isError: true }
        }
        navigate(page.path)
        return text(`Opened the ${page.title} page (${SITE_URL}${page.path}).`)
      },
    },
  ]
}

/**
 * Proper nouns from the site content, sent to speech-to-text as custom
 * vocabulary so "Appium" is not heard as "opium".
 */
export function siteVocabulary(): string[] {
  const terms = new Set<string>([
    profile.name,
    profile.shortName,
    profile.company,
    'Appium',
    'AppiumTestDistribution',
    'Model Context Protocol',
    'MCP',
    'WebMCP',
    'Apress',
    'Selenium',
    'WebdriverIO',
    ...books.map((b) => b.title),
    ...projects.map((p) => p.title),
    ...CONFERENCES.map((c) => c.conf),
    ...VIRTUAL_CONFERENCES.map((c) => c.conf),
  ])
  return [...terms].slice(0, 60)
}
