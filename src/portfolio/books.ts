import breakingMcpCover from '../assets/images/breaking-mcp-book.webp'
import mcpStandardCover from '../assets/images/MCP-Book.webp'

export interface BookLink {
  label: string
  url: string
  /** Picks the inline icon rendered next to the label */
  icon: 'book' | 'cart' | 'external'
  /** Renders as the filled primary button; at most one per book */
  primary?: boolean
}

export interface Book {
  /** Anchor id on /book, e.g. #the-mcp-standard */
  slug: string
  title: string
  subtitle: string
  authors: string[]
  foreword?: { name: string; title: string }
  publisher: string
  /** Human-readable release, e.g. 'August 2026' */
  date: string
  pages?: number
  /** ISBN of the edition the Springer page resolves to */
  isbn: string
  printIsbn?: string
  cover: string
  /** Short lead paragraphs shown under the hero */
  blurb: string[]
  learnings: string[]
  audience?: string
  links: BookLink[]
}

/** Newest first: the first entry is what the site-wide banner promotes. */
export const books: Book[] = [
  {
    slug: 'breaking-the-model-context-protocol',
    title: 'Breaking the Model Context Protocol',
    subtitle:
      'Agentic Attacks and Defenses for MCP-Powered AI Systems',
    authors: ['Thejes Sree Satheesh Kumar', 'Srinivasan Sekar'],
    foreword: {
      name: 'Angie Jones',
      title: 'VP of Engineering, AI Tools & Enablement, Block',
    },
    publisher: 'Apress',
    date: 'August 2026',
    isbn: '979-8-8688-2968-0',
    printIsbn: '979-8-8688-2967-3',
    cover: breakingMcpCover,
    blurb: [
      'As AI agents plug into more tools and internal systems, the Model Context Protocol is becoming a core part of how modern platforms work, and with it comes a fast-growing attack surface where probabilistic models touch real APIs, data, and networks.',
      'The book maps today’s MCP trust boundaries, explains why traditional security assumptions stop holding when the “client” is an LLM, and works through real attack stories and hands-on labs before turning to the defenses that hold up in production.',
    ],
    learnings: [
      'Map MCP trust boundaries and see why traditional security assumptions break when the client is an LLM',
      'Run hands-on labs covering tool poisoning, signature cloaking, and sampling-based abuse',
      'Trace environment-level attacks: DNS rebinding, malicious MCP servers, and confused-deputy chains',
      'Contain over-permissioned tools with schemas, contracts, and least-privilege design',
      'Stand up monitoring and continuous red-team testing for MCP-powered agents',
    ],
    audience:
      'Security engineers, AI platform teams, red-teamers, DevSecOps practitioners, MCP implementers, agent-framework developers, and technical leaders responsible for securing AI-driven systems.',
    links: [
      {
        label: 'Read on Springer',
        url: 'https://link.springer.com/book/10.1007/979-8-8688-2968-0',
        icon: 'book',
        primary: true,
      },
      {
        label: 'Buy on Amazon',
        url: 'https://www.amazon.com/Breaking-Model-Context-Protocol-MCP%E2%80%91Powered/dp/B0H2L3V8VH',
        icon: 'cart',
      },
    ],
  },
  {
    slug: 'the-mcp-standard',
    title: 'The MCP Standard',
    subtitle:
      'A Developer’s Guide to Building Universal AI Tools with the Model Context Protocol',
    authors: ['Srinivasan Sekar'],
    foreword: {
      name: 'Angie Jones',
      title: 'VP of Engineering, AI Tools & Enablement, Block',
    },
    publisher: 'Apress',
    date: 'February 2026',
    pages: 285,
    isbn: '979-8-8688-2364-0',
    cover: mcpStandardCover,
    blurb: [
      'A ground-up guide to the Model Context Protocol: the architecture behind Hosts, Clients, and Servers, and how to build production-ready MCP servers that any model vendor can talk to.',
    ],
    learnings: [
      'Build production-ready MCP servers in TypeScript from the ground up',
      'Understand the complete protocol architecture: Host, Client, and Server roles',
      'Implement Tools, Resources, and Prompts with schema design using Zod',
      'Apply multi-layered security strategies including threat analysis and client-side hardening',
      'Design decoupled, scalable AI systems independent of specific model vendors',
    ],
    links: [
      {
        label: 'Get on Springer',
        url: 'https://link.springer.com/book/10.1007/979-8-8688-2364-0',
        icon: 'book',
        primary: true,
      },
      {
        label: 'Buy on Amazon',
        url: 'https://www.amazon.com/MCP-Standard-Developers-Building-Universal/dp/B0G2WVSXC6',
        icon: 'cart',
      },
      {
        label: 'Read on O’Reilly',
        url: 'https://www.oreilly.com/library/view/the-mcp-standard/9798868823640/',
        icon: 'external',
      },
    ],
  },
]

export const latestBook = books[0]
