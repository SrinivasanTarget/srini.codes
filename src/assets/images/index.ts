// Import all project logo images
import appium from './appium.webp'
import selenium from './selenium.webp'
import webdriverio from './webdriverio.webp'
import ATD from './ATD.webp'
import DeviceFarmLogo from './DeviceFarm-Logo.jpg'
import AppiumWait2 from './AppiumWait2.webp'
import GesturesPlugin from './GesturesPlugin.jpg'
import taiko from './taiko.png'

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
