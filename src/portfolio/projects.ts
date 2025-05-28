import { type ProjectImageKey } from '../assets/images'

const projects: Array<{
  title: string
  description: string
  source: string
  imgSource: ProjectImageKey
}> = [
  // Kept and potentially updated items
  {
    // Appium (no change from analysis)
    title: 'Appium',
    description:
      'cross-platform test automation tool for native, hybrid, and mobile web and desktop apps.',
    source: 'https://github.com/appium/java-client', // This is specific, could be https://github.com/appium/appium
    imgSource: 'appium.webp',
  },
  {
    // Selenium (no change from analysis)
    title: 'Selenium',
    description: 'Browser automation tool that can be used to test web applications.',
    source: 'https://github.com/SeleniumHQ/selenium',
    imgSource: 'selenium.webp',
  },
  {
    // WebdriverIO (title case updated)
    title: 'WebdriverIO', // << Updated from 'webdriverio'
    description:
      'Test automation framework that allows you to run tests based on the Webdriver protocol and Appium.',
    source: 'https://github.com/webdriverio/webdriverio',
    imgSource: 'webdriverio.webp',
  },
  {
    // Appium Test Distribution (no change from analysis)
    title: 'Appium Test Distribution',
    description: 'A tool for running android and iOS appium tests in parallel across devices.',
    source: 'https://github.com/AppiumTestDistribution/AppiumTestDistribution',
    imgSource: 'ATD.webp',
  },
  {
    // Appium Device Farm (no change from analysis)
    title: 'Appium Device Farm',
    description:
      'Appium 2.0 plugin designed to manage and create driver sessions on available devices.',
    source: 'https://github.com/AppiumTestDistribution/appium-device-farm',
    imgSource: 'DeviceFarm-Logo.jpg',
  },
  {
    // Appium Wait Plugin (no change from analysis)
    title: 'Appium Wait Plugin',
    description: 'Appium plugin designed to wait for element to be present.',
    source: 'https://github.com/AppiumTestDistribution/appium-wait-plugin',
    imgSource: 'AppiumWait2.webp',
  },
  {
    // Appium Gestures Plugin (no change from analysis)
    title: 'Appium Gestures Plugin',
    description: 'Appium plugin designed to perform gestures using W3C Actions.',
    source: 'https://github.com/AppiumTestDistribution/appium-gestures-plugin',
    imgSource: 'GesturesPlugin.jpg',
  },
  // Added Taiko
  {
    title: 'Taiko',
    description:
      'Taiko is a free and open source browser automation tool built by the team behind Gauge.',
    source: 'https://github.com/getgauge/taiko',
    imgSource: 'taiko.png',
  },
  // MCP WebDriverAgent Server - REMOVED
  // MCP Appium Gestures Server - REMOVED
  // Angular Testing Library - REMOVED
]

export { projects }
