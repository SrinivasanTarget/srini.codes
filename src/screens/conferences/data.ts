// Conference data and the geometry derived from it. Kept free of three.js
// so the page shell can render this without pulling in the WebGL bundle.

// Conference data with coordinates
export const CONFERENCES = [
  { city: 'London', country: 'UK', lat: 51.5074, lng: -0.1278, conf: 'AppiumConf', year: '2019', talk: 'Life Cycle of an Appium Command' },
  { city: 'Austin', country: 'USA', lat: 30.2672, lng: -97.7431, conf: 'SeleniumConf', year: '2017', talk: 'Dockerize Appium Tests: Test Inside Containers', video: 'https://youtu.be/jGW6ycW_tTQ' },
  { city: 'Chicago', country: 'USA', lat: 41.8781, lng: -87.6298, conf: 'SeleniumConf', year: '2023', talk: 'Clean Code Practices for Test Automation' },
  { city: 'Colombo', country: 'Sri Lanka', lat: 6.9271, lng: 79.8612, conf: 'SLASSCOM', year: '2019', talk: 'Shift Left for Better End-User Experience' },
  { city: 'Dublin', country: 'Ireland', lat: 53.3498, lng: -6.2603, conf: 'Quest for Quality', year: '2018', talk: 'On Demand Private Appium Device Cloud using ATD' },
  { city: 'Tallinn', country: 'Estonia', lat: 59.4370, lng: 24.7536, conf: 'Nordic Testing Days', year: '2025', talk: 'Advanced Appium Workshop' },
  { city: 'Barcelona', country: 'Spain', lat: 41.3851, lng: 2.1734, conf: 'SeleniumConf', year: '2018', talk: 'Next Level Front-end Testing with DevTools & WebDriver' },
  { city: 'Belgrade', country: 'Serbia', lat: 44.7866, lng: 20.4489, conf: 'Belgrade Test Conference', year: '2018', talk: 'On Demand Private Appium Device Cloud' },
  { city: 'Vilnius', country: 'Lithuania', lat: 54.6872, lng: 25.2797, conf: 'TestCon Europe', year: '2025', talk: 'Testing Agentic AI Applications: Beyond Traditional QA' },
  { city: 'Budapest', country: 'Hungary', lat: 47.4979, lng: 19.0402, conf: 'HUSTEF', year: '2024', talk: 'Mobile App Crashes in Production: Lessons Learned' },
  { city: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, conf: 'XConf', year: '2023', talk: 'Addressing Unconscious Bias & Ethics in Testing', video: 'https://youtu.be/QMr30Za_-vM' },
  { city: 'Brussels', country: 'Belgium', lat: 50.8503, lng: 4.3517, conf: 'FOSDEM', year: '2017', talk: 'Future of Mobile Automation Testing, Appium Steals It', video: 'https://video.fosdem.org/2017/H.2213/mobile_testing_with_appium.mp4' },
  { city: 'Bangalore', country: 'India', lat: 12.9716, lng: 77.5946, conf: 'SeleniumConf & AppiumConf', year: '2018', talk: 'Code Once Test Anywhere: Appium Device Cloud using ATD' },
  { city: 'Chennai', country: 'India', lat: 13.0827, lng: 80.2707, conf: 'TechXpresso - IDFC First Bank', year: '2026', talk: 'Testing Autonomous AI Agents: Beyond Traditional QA' },
  { city: 'Goa', country: 'India', lat: 15.2993, lng: 74.1240, conf: 'NullCon', year: '2026', talk: 'Hacking with AI: MCP for Security Testing' },
  { city: 'Valencia', country: 'Spain', lat: 39.4699, lng: -0.3763, conf: 'SeleniumConf & AppiumConf', year: '2025', talk: 'Advanced Appium 2.0 Workshop', video: 'https://youtu.be/lugEm6j1Nl8' },
]

// Online/virtual conferences
export const VIRTUAL_CONFERENCES = [
  { conf: 'Automation Guild', year: '2026', talk: 'Testing Autonomous AI Agents' },
  { conf: 'TestMu Conf', year: '2025', talk: 'Mastering Appium 3 & QA for AI Agents' },
  { conf: 'Spartans Summit', year: '2025', talk: 'Building & Testing AI-Agent Powered LLM Apps', video: 'https://www.youtube.com/watch?v=9mHfvGN7FwU' },
  { conf: 'SeleniumConf', year: '2024', talk: 'Harnessing Open-Source: Building a Device Farm' },
  { conf: 'AppiumConf', year: '2024', talk: 'The Performance Paradox: Mobile App Optimisation' },
  { conf: 'Spartans Summit', year: '2024', talk: 'Web Performance Metrics for Testers', video: 'https://www.youtube.com/watch?v=uo_lX1pUv9o' },
  { conf: 'TestMu Conf', year: '2023', talk: 'Building Appium 2.0 Plugin Live', video: 'https://www.youtube.com/watch?v=b6yWXfLpazc' },
  { conf: 'SeleniumConf', year: '2022', talk: 'Build Your Own Appium 2.0 Driver' },
  { conf: 'TestMu Conf', year: '2022', talk: 'Appium: Endgame & What\'s Next?' },
  { conf: 'Automation Guild', year: '2022', talk: 'Testing Containers & k8s Manifests' },
  { conf: 'Worqference', year: '2022', talk: 'Automate Mobile Gestures Using Appium' },
  { conf: 'Agile India', year: '2022', talk: 'Speed Matters: Client Side Performance' },
  { conf: 'VodQA', year: '2022', talk: 'Build Appium 2.0 Plugins Workshop' },
  { conf: 'AppiumConf', year: '2021', talk: 'Build Your Own Appium Plugin' },
  { conf: 'Agile India', year: '2021', talk: 'Testing Service Mesh & k8s Manifests' },
  { conf: 'Automation Guild', year: '2021', talk: 'Consumer Driven Contracts' },
  { conf: 'Future of Testing: Mobile', year: '2021', talk: 'Appium 2.0: What\'s Next' },
  { conf: 'SeleniumConf', year: '2020', talk: 'Advanced Appium Workshop' },
]

// Home base (India - Bangalore)
export const HOME = { city: 'Bangalore', country: 'India', lat: 12.9716, lng: 77.5946 }

// Chips and card navigation walk the talks in chronological order
export const TIMELINE = [...CONFERENCES].sort(
  (a, b) => Number(a.year) - Number(b.year) || a.city.localeCompare(b.city)
)

export const VIRTUAL_YEARS = [...new Set(VIRTUAL_CONFERENCES.map(vc => vc.year))].sort(
  (a, b) => Number(b) - Number(a)
)

// Generate arcs from home to each conference
export const ROUTE_ARCS = CONFERENCES.map((conf, i) => ({
  startLat: HOME.lat,
  startLng: HOME.lng,
  endLat: conf.lat,
  endLng: conf.lng,
  color: [`rgba(245, 158, 11, 0.8)`, `rgba(234, 179, 8, 0.4)`],
  conf: conf.conf,
  city: conf.city,
  index: i,
}))

// Points for all locations
export const pointsData = [
  { ...HOME, size: 0.8, color: '#10b981', label: 'Home Base' },
  ...CONFERENCES.map(c => ({ ...c, size: 0.5, color: '#f59e0b', label: c.conf }))
]

export type Conference = (typeof CONFERENCES)[number]

// Flight animation timings, shared by the globe and the shell's transitions.
export const FLIGHT_TIME = 1500
export const FLIGHT_ARC_REL_LEN = 0.4

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
