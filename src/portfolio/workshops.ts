export interface Workshop {
  title: string
  track: 'ai' | 'automation' | 'platform'
  duration: string
  description: string
  subdescription: string
  audience: string
  techStack: string[]
  source: string
  location: string
  imageURL: string
}

const workshops: Workshop[] = [
  {
    title: 'Building AI Agents for Test Automation with MCP',
    track: 'ai',
    duration: '4 hours',
    description: 'From Model Context Protocol fundamentals to production-ready AI testing agents',
    subdescription:
      'Hands-on workshop covering MCP server architecture, tool design with Zod schemas, and building autonomous testing agents that interact with real devices. You\'ll build a working MCP server from scratch and connect it to Claude for automated mobile testing.',
    audience: 'QA Engineers & SDETs comfortable with TypeScript',
    techStack: ['TypeScript', 'MCP', 'Claude', 'Appium'],
    source: '',
    location: 'InPerson & Online',
    imageURL: 'rocket.webp',
  },
  {
    title: 'Advanced Appium 2.0: Architecture, Plugins & Beyond',
    track: 'platform',
    duration: '6 hours',
    description: 'Deep dive into Appium 2.0 internals, custom drivers, and plugin development',
    subdescription:
      'Learn Appium 2.0 architecture, how to build custom drivers and plugins for your specific needs, and the breaking changes from Appium 1.x. This workshop covers the lifecycle of an Appium command, W3C Actions API for gestures, and running distributed tests in parallel.',
    audience: 'Mobile testers with Appium experience',
    techStack: ['Java', 'TypeScript', 'Appium 2.0', 'WebDriver'],
    source: 'https://seleniumconf.com/#advanced-appium-20',
    location: 'InPerson',
    imageURL: 'trophy.webp',
  },
  {
    title: 'Build Your Own Appium Drivers and Plugins',
    track: 'platform',
    duration: '4 hours',
    description: 'Extend Appium 2.0 with custom drivers and plugins for your specific needs',
    subdescription:
      'Appium 2.0 allows its users to create their own drivers and plugins. Learn Appium 2.0 architecture, how to create custom drivers and plugins, and what breaking changes were introduced. This workshop also helps you understand Appium internals to contribute back to the codebase.',
    audience: 'Developers & advanced testers',
    techStack: ['TypeScript', 'Appium 2.0', 'Node.js'],
    source: 'https://confengine.com/conferences/appium-conf-2021/proposal/15762/build-your-own-appium-drivers-and-plugins',
    location: 'Online',
    imageURL: 'puzzle.webp',
  },
  {
    title: 'Testing Autonomous AI Agents: Evaluation & Guardrails',
    track: 'ai',
    duration: '3 hours',
    description: 'Strategies for testing non-deterministic AI systems with deterministic expectations',
    subdescription:
      'AI agents don\'t follow scripts — they make decisions. This workshop covers evaluation harness design, scoring rubrics for agent behavior, guardrail testing, and building confidence in systems that can\'t be fully predetermined. Practical exercises with real agent architectures.',
    audience: 'QA leads & engineers working with AI products',
    techStack: ['Python', 'TypeScript', 'LLM APIs', 'Evals'],
    source: '',
    location: 'InPerson & Online',
    imageURL: 'smilie.webp',
  },
  {
    title: 'Device Farm Setup: Open-Source Mobile Testing Infrastructure',
    track: 'automation',
    duration: '4 hours',
    description: 'Build your own private device cloud using Appium Device Farm plugin',
    subdescription:
      'Set up a production-grade device farm from scratch using the open-source Appium Device Farm plugin. Covers device management, parallel execution, session routing, and integration with CI/CD pipelines. Walk away with a working private device cloud.',
    audience: 'DevOps & test infrastructure engineers',
    techStack: ['TypeScript', 'Docker', 'Appium', 'Device Farm'],
    source: '',
    location: 'InPerson & Online',
    imageURL: 'thumbsup.webp',
  },
  {
    title: 'Mobile Gestures Automation with W3C Actions',
    track: 'automation',
    duration: '2 hours',
    description: 'Master complex mobile gestures using W3C Actions API and Appium Gestures Plugin',
    subdescription:
      'Learn to automate swipe, pinch, zoom, long press, drag-and-drop, and custom gesture sequences using the standardized W3C Actions API. Covers the Appium Gestures Plugin for simplified gesture commands and cross-platform compatibility.',
    audience: 'Mobile testers at any level',
    techStack: ['Java', 'Appium', 'W3C Actions', 'iOS', 'Android'],
    source: '',
    location: 'InPerson & Online',
    imageURL: 'fitness.webp',
  },
]

export { workshops }
