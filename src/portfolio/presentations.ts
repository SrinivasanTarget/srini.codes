export interface Presentation {
  title: string
  event: string
  /** Site-relative URL of the slide deck */
  url: string
  tags: string[]
}

/** Slide decks hosted under public/presentations, newest first. */
export const presentations: Presentation[] = [
  {
    title: 'Testing the Agents That Look You in the Eye',
    event: 'TestMu Conference 2026',
    url: '/presentations/testing-video-agents.html',
    tags: ['Video Agents', 'AI Testing', 'Real-time'],
  },
  {
    title: 'AI Agent Frameworks - The Landscape',
    event: 'Hands-on Workshop',
    url: '/presentations/ai-agent-frameworks.html',
    tags: ['AI Agents', 'LangChain', 'MCP'],
  },
  {
    title: 'Advanced Appium Workshop with MCP-Powered Development Tools',
    event: 'Selenium Conf 2026',
    url: '/presentations/advanced-appium-workshop.html',
    tags: ['Appium', 'MCP', 'Workshop'],
  },
]
