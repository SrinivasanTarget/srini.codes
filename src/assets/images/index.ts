// Import all project logo images with explicit URL imports
import appium from './appium.webp?url'
import selenium from './selenium.webp?url'
import webdriverio from './webdriverio.webp?url'
import ATD from './ATD.webp?url'
import DeviceFarmLogo from './DeviceFarm-Logo.jpg?url'
import AppiumWait2 from './AppiumWait2.webp?url'
import GesturesPlugin from './GesturesPlugin.jpg?url'
import taiko from './taiko.png?url'

// Create a mapping object for easy access
export const projectImages = {
  'appium.webp': appium,
  'selenium.webp': selenium,
  'webdriverio.webp': webdriverio,
  'ATD.webp': ATD,
  'DeviceFarm-Logo.jpg': DeviceFarmLogo,
  'AppiumWait2.webp': AppiumWait2,
  'GesturesPlugin.jpg': GesturesPlugin,
  'taiko.png': taiko,
}

// Type for the image keys
export type ProjectImageKey = keyof typeof projectImages
