export interface Citation {
  title: string
  source: string
  url: string
  /** Accent colour used by the homepage carousel */
  color: string
  thumbnail: string
}

/** Press coverage and articles that quote or feature Srinivasan. */
export const citations: Citation[] = [
  {
    title: 'Better Context Will Always Beat a Better Model',
    source: 'The New Stack',
    url: 'https://thenewstack.io/better-context-will-always-beat-a-better-model/',
    color: '#1d9bf0',
    thumbnail: 'https://cdn.thenewstack.io/media/2026/01/5d7625ac-blendingin.jpg',
  },
  {
    title: 'Ready or Not, AI Is Rewriting the Rules for Software Testing',
    source: 'DevOps.com',
    url: 'https://devops.com/ready-or-not-ai-is-rewriting-the-rules-for-software-testing/',
    color: '#f97316',
    thumbnail: '',
  },
  {
    title: "The CISO's Guide to Model Context Protocol (MCP)",
    source: 'Security Boulevard',
    url: 'https://securityboulevard.com/2025/10/the-cisos-guide-to-model-context-protocol-mcp/',
    color: '#ef4444',
    thumbnail: 'https://securityboulevard.com/wp-content/uploads/2025/10/770-330-2025-10-23T132954.417.png',
  },
  {
    title: "It's Time to Build APIs for AI, Not Just for Developers",
    source: 'The New Stack',
    url: 'https://thenewstack.io/its-time-to-build-apis-for-ai-not-just-for-developers/',
    color: '#1d9bf0',
    thumbnail: 'https://cdn.thenewstack.io/media/2025/10/35c6b952-agent.jpg',
  },
  {
    title: 'Architecting for Agent-to-Agent Communication and AI Protocols',
    source: 'Techstrong AI',
    url: 'https://techstrong.ai/features/architecting-for-agent-to-agent-communication-and-ai-protocols/',
    color: '#a855f7',
    thumbnail: 'https://techstrong.ai/wp-content/uploads/2024/10/AIOps.jpg',
  },
  {
    title: 'AI Agents Inherit the API Sprawl Problem',
    source: 'InfoSec Relations',
    url: 'https://infosecrelations.com/ai-agents-inherit-the-api-sprawl-problem/',
    color: '#22c55e',
    thumbnail: '',
  },
  {
    title: 'Interview with Indian Express',
    source: 'The Indian Express · March 28, 2026',
    url: '/assets/indian_express_28th_march.pdf',
    color: '#ff6b00',
    thumbnail: 'https://images.indianexpress.com/2026/03/AI-detection-human-and-AI-writing.jpg',
  },
]
