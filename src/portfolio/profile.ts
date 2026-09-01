/**
 * Plain-text profile facts, the same ones rendered on the homepage hero and
 * About section and published in public/llms.txt. The WebMCP tools expose
 * this so agents (including the site's own voice assistant) learn about
 * Srinivasan from the website itself rather than from a model's memory.
 *
 * Keep in sync with the About section in components/ModernPortfolio.tsx.
 */
export const profile = {
  name: 'Srinivasan Sekar',
  shortName: 'Srini',
  headline: 'Open Source Advocate, International Speaker & Technical Author',
  role: 'Director of Engineering',
  company: 'TestMu AI',
  basedIn: 'Bangalore, India',
  roles: ['Open Source Advocate', 'International Speaker', 'Technical Author'],
  website: 'https://srini.codes',
  about: [
    'Srinivasan Sekar is a passionate technologist and leader in software testing and automation. As Director of Engineering at TestMu AI, he drives innovation in cloud-based testing platforms serving millions of developers worldwide.',
    'His open source journey began with Appium, where he became a core maintainer and helped architect Appium 2.0. He created plugins like Device Farm, Wait Plugin, and Gestures Plugin used by millions globally. Recently, he pioneered Model Context Protocol (MCP) servers for mobile automation, bridging AI and testing workflows.',
    'He has written two Apress books on the Model Context Protocol: The MCP Standard, on building universal AI tools with MCP, and Breaking the Model Context Protocol, on the attacks and defenses that decide whether MCP-powered systems hold up in production.',
    'As an international speaker he has presented at 25+ conferences including SeleniumConf, AppiumConf, FOSDEM, and Agile India, sharing insights on mobile automation and testing innovation.',
  ],
  highlights: [
    'Author of "The MCP Standard" (Apress, February 2026): a developer\'s guide to building universal AI tools with the Model Context Protocol',
    'Co-author of "Breaking the Model Context Protocol: Agentic Attacks and Defenses for MCP-Powered AI Systems" (Apress, August 2026), written with Thejes Sree Satheesh Kumar',
    'Creator and maintainer of AppiumTestDistribution (ATD), winner of the LambdaTest Delta Award',
    'Core maintainer of Appium; helped architect Appium 2.0',
    'International conference speaker: 34+ talks across 12 countries and 16 cities, plus 18 virtual conferences',
    'Featured in The New Stack, DevOps.com, Security Boulevard, Techstrong AI, and The Indian Express',
  ],
  topics: [
    'Model Context Protocol (MCP)',
    'MCP Security and Agentic AI Red Teaming',
    'AI Agents and Autonomous Testing',
    'Mobile Test Automation (Appium)',
    'Open Source Software',
    'Developer Tooling',
    'Security Testing with AI',
  ],
  social: {
    github: 'https://github.com/SrinivasanTarget',
    twitter: 'https://twitter.com/srinivasanskr',
    linkedin: 'https://www.linkedin.com/in/srinivasan-sekar/',
  },
}

/** Public pages of the site, mirrored from public/llms.txt. */
export const sitePages = [
  { path: '/', title: 'Home', description: 'Portfolio homepage with projects, talks, podcast, and citations' },
  { path: '/book', title: 'Books', description: 'The MCP Standard and Breaking the Model Context Protocol, both from Apress' },
  { path: '/blog', title: 'Blog', description: 'Technical articles on AI, MCP, testing, and open source' },
  { path: '/conferences', title: 'Conferences', description: 'Speaking history with an interactive globe visualization' },
  { path: '/presentations', title: 'Presentations', description: 'Workshop slides and presentation decks from conferences' },
  { path: '/contact', title: 'Contact', description: 'Get in touch: email, social profiles, and a downloadable contact card' },
] as const

export type SitePath = (typeof sitePages)[number]['path']
