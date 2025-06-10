import React, { useState, useEffect } from 'react'
import { projects } from '../portfolio/projects'
import { conferences } from '../portfolio/conferences'
import { blogs } from '../portfolio/blogs'
import heroImage from '../assets/images/profile_sai.webp'
import lambdaTestLogo from '../assets/images/LambdaTest-logo1.png'
import backgroundImage from '../assets/images/background1.png'

// Import project images
import appiumImg from '../assets/images/appium.webp'
import seleniumImg from '../assets/images/selenium.webp'
import webdriverioImg from '../assets/images/webdriverio.webp'
import ATDImg from '../assets/images/ATD.webp'
import DeviceFarmImg from '../assets/images/DeviceFarm-Logo.jpg'
import AppiumWaitImg from '../assets/images/AppiumWait2.webp'
import GesturesPluginImg from '../assets/images/GesturesPlugin.jpg'
import taikoImg from '../assets/images/taiko.png'
import mcpWdaLogoImg from '../assets/images/mcp-wdalogo.png'

// Create mapping for project images
const projectImageMap: Record<string, string> = {
  'appium.webp': appiumImg,
  'selenium.webp': seleniumImg,
  'webdriverio.webp': webdriverioImg,
  'ATD.webp': ATDImg,
  'DeviceFarm-Logo.jpg': DeviceFarmImg,
  'AppiumWait2.webp': AppiumWaitImg,
  'GesturesPlugin.jpg': GesturesPluginImg,
  'taiko.png': taikoImg,
  'mcp-wdalogo.png': mcpWdaLogoImg,
}

const ModernPortfolio = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const roles = [
    'Blogger',
    'Open source contributor',
    'Mentor',
    'Conference Speaker',
    'Community Organizer',
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [roles.length])

  const achievements = [
    {
      icon: '🏆',
      title: 'Open Source Maintainer',
      description:
        'Core maintainer of Appium - the leading mobile automation framework used by millions',
      highlight: 'Appium Core Team',
    },
    {
      icon: '🎤',
      title: 'International Speaker',
      description:
        '25+ conference talks across SeleniumConf, AppiumConf, QuestForQuality, Belgrade Test Conference, AutomationGuild, TestμConf, Nordic Testing Days, Agile India',
      highlight: '25+ Global Talks',
    },
    {
      icon: '📝',
      title: 'Technical Author',
      description: 'Published 10+ technical articles on Applitools, TestProject blogs',
      highlight: '10+ Publications',
    },
    {
      icon: '🚀',
      title: 'Director of Engineering',
      description: 'Leading engineering teams at LambdaTest - cloud testing platform',
      highlight: 'LambdaTest Leadership',
    },
    {
      icon: '🔧',
      title: 'Plugin Architect',
      description: 'Created Appium Device Farm, Wait Plugin, Gestures Plugin for Appium 2.0',
      highlight: 'Appium 2.0 Pioneer',
    },
    {
      icon: '🌟',
      title: 'Community Impact',
      description: 'Contributor to Selenium, WebDriverIO, Taiko, Angular Testing Library projects',
      highlight: 'Multi-Project Contributor',
    },
    {
      icon: '🎯',
      title: 'Testing Innovation',
      description:
        'Pioneered container-based testing and Kubernetes manifest testing in the testing community',
      highlight: 'DevOps Testing Leader',
    },
    {
      icon: '🏅',
      title: 'Conference Recognition',
      description:
        'Featured speaker at XConf Singapore, SeleniumConf, AppiumConf, AgileIndia, TestμConf, etc',
      highlight: 'Industry Recognition',
    },
    {
      icon: '💡',
      title: 'Thought Leadership',
      description:
        'Advocate for ethical testing, bias reduction, and inclusive practices in the testing community',
      highlight: 'Ethics Champion',
    },
    {
      icon: '🧠',
      title: 'MCP Pioneer',
      description:
        'Created Model Context Protocol servers for WebDriverAgent and Appium Gestures - enabling AI integration with mobile automation',
      highlight: 'AI + Testing Innovation',
    },
  ]

  const skills = [
    'Mobile Test Automation',
    'Model Context Protocol (MCP)',
    'AI Integration',
    'Appium',
    'Selenium',
    'WebDriverIO',
    'JavaScript/TypeScript',
    'Java',
    'Python',
    'Docker',
    'Kubernetes',
    'CI/CD',
    'DevOps',
    'API Testing',
    'Performance Testing',
    'Cloud Testing',
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false) // Close mobile menu after navigation
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className='bg-black text-white'>
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
        }`}
      >
        <div className='max-w-7xl mx-auto px-6 py-4'>
          {/* Desktop Navigation */}
          <div className='hidden md:flex justify-center items-center'>
            <div className='flex space-x-12'>
              {[
                { label: 'Home', section: 'hero' },
                { label: 'Skills', section: 'about' },
                { label: 'Open Source', section: 'projects' },
                { label: 'Conferences', section: 'talks' },
                { label: 'Workshops', section: 'achievements' },
                { label: 'Blogs', section: 'blogs' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.section)}
                  className='hover:text-blue-400 transition-colors duration-200 font-medium text-white'
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className='md:hidden flex justify-between items-center'>
            <div className='text-white font-bold text-xl'>SK</div>
            <button
              onClick={toggleMobileMenu}
              className='text-white p-2 rounded-md hover:bg-gray-800 transition-colors duration-200'
              aria-label='Toggle mobile menu'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className='md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-b border-gray-800'>
              <div className='px-6 py-4 space-y-4'>
                {[
                  { label: 'Home', section: 'hero' },
                  { label: 'Skills', section: 'about' },
                  { label: 'Open Source', section: 'projects' },
                  { label: 'Conferences', section: 'talks' },
                  { label: 'Workshops', section: 'achievements' },
                  { label: 'Blogs', section: 'blogs' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.section)}
                    className='block w-full text-left py-2 px-4 text-white hover:text-blue-400 hover:bg-gray-800/50 rounded-md transition-all duration-200 font-medium'
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id='hero'
        className='min-h-screen flex items-center justify-center relative overflow-hidden'
      >
        {/* Purple Gradient Background - Same as Reference */}
        <div
          className='absolute inset-0'
          style={{
            background:
              'linear-gradient(135deg, rgb(17, 15, 31) 50%, rgb(19, 7, 96) 80%, rgb(38, 29, 96) 100%)',
          }}
        ></div>

        {/* Background pattern */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-20 left-20 w-32 h-32 border border-purple-400/30 rotate-45'></div>
          <div className='absolute top-40 right-32 w-24 h-24 border border-blue-400/30 rotate-12'></div>
          <div className='absolute bottom-32 left-32 w-20 h-20 border border-purple-400/30 -rotate-12'></div>
          <div className='absolute bottom-20 right-20 w-28 h-28 border border-blue-400/30 rotate-45'></div>
        </div>

        {/* Background Image - Subtle Integration */}
        <div
          className='absolute inset-0 opacity-5 bg-cover bg-center bg-no-repeat mix-blend-overlay'
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        ></div>

        {/* Code background text */}
        <div className='absolute inset-0 opacity-10 font-mono text-xs text-purple-300 overflow-hidden'>
          <div className='absolute top-20 left-10 transform rotate-12'>
            <pre>{`$base_url = 'https://url-of-
smseagle/index.php/http_api/send_sms';
$params = array(
  'access_token' => '00059OjCOlMH8F2BP8',
  'to'    => '1234567',
  'message' => 'my message',
);
$data = '?'.http_build_query($params);
$ret = fopen($base_url.$data,'r');
$result = fread($ret,1024);
fclose($ret);
if (substr($result,0,2) == "OK") {
  echo "Message has been sent successfully!";
} else {
  echo "Send message failed!";
}`}</pre>
          </div>

          <div className='absolute top-40 right-10 transform -rotate-6'>
            <pre>{`const appium = require('appium');
const driver = await appium.remote({
  platformName: 'Android',
  deviceName: 'emulator',
  app: '/path/to/app.apk'
});

await driver.findElement('id', 'login-btn').click();
const result = await driver.getPageSource();
console.log('Test completed successfully!');`}</pre>
          </div>

          <div className='absolute bottom-20 left-20 transform rotate-6'>
            <pre>{`describe('Mobile Testing', () => {
  it('should login successfully', async () => {
    await driver.setValue('#username', 'testuser');
    await driver.setValue('#password', 'password');
    await driver.click('#login');
    
    const welcomeText = await driver.getText('.welcome');
    expect(welcomeText).toBe('Welcome!');
  });
});`}</pre>
          </div>
        </div>

        {/* Social Media Icons - Right Side */}
        <div className='fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-4'>
          <a
            href='https://github.com/saikrishna321'
            target='_blank'
            rel='noopener noreferrer'
            className='w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg'
            style={{ backgroundColor: '#c2f900' }}
          >
            <svg className='w-6 h-6 text-black' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
            </svg>
          </a>
          <a
            href='https://twitter.com/saikrisv'
            target='_blank'
            rel='noopener noreferrer'
            className='w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg'
            style={{ backgroundColor: '#c2f900' }}
          >
            <svg className='w-6 h-6 text-black' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
            </svg>
          </a>
          <a
            href='https://www.linkedin.com/in/sai-krishna-3755407b/'
            target='_blank'
            rel='noopener noreferrer'
            className='w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg'
            style={{ backgroundColor: '#c2f900' }}
          >
            <svg className='w-6 h-6 text-black' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
            </svg>
          </a>
          <a
            href='mailto:saidotkrishna@gmail.com'
            className='w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg'
            style={{ backgroundColor: '#c2f900' }}
          >
            <svg className='w-6 h-6 text-black' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.98L12 10.09l9.384-6.269h.98c.904 0 1.636.732 1.636 1.636z' />
            </svg>
          </a>
        </div>

        {/* Main Content Container */}
        <div className='relative z-10 w-full max-w-7xl mx-auto px-6 py-12'>
          <div className='flex flex-col lg:flex-row items-center justify-between min-h-[80vh] gap-1 lg:gap-0'>
            
            {/* Left side - Professional Profile Image */}
            <div className='flex-1 flex justify-center lg:justify-start order-1 lg:order-1 max-w-xl'>
              <div className='relative'>
                {/* Main Profile Image - Professional Size */}
                <div className='relative w-[25rem] h-[16.8rem] md:w-[20.4rem] md:h-[20.4rem] lg:w-96 lg:h-96 mx-auto'>
                  <div className='w-full h-full rounded-full overflow-hidden shadow-2xl border-0 border-white/10 backdrop-blur-sm'>
                    <img
                      src={heroImage}
                      alt='Sai Krishna'
                      className='w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500'
                      style={{
                        objectPosition: '50% 30%',
                      }}
                    />
                  </div>
                  
                  {/* Professional Tech Indicators */}
                  <div className='absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg'>
                    <span className='text-white font-bold text-xs'>JS</span>
                  </div>
                  <div className='absolute -bottom-3 -left-3 w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg'>
                    <span className='text-white font-bold text-xs'>AI</span>
                  </div>
          <div className='absolute top-1/4 -left-4 w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg'>
            <span className='text-white font-bold text-xs'>⚡</span>
          </div>
        </div>

                {/* Additional Animated Elements */}
                
                {/* Floating Tech Orbs with Trails */}
                <div className='absolute top-0 left-1/2 w-4 h-4 bg-blue-400 rounded-full blur-sm animate-orbit shadow-lg shadow-blue-400/50'></div>
                <div className='absolute bottom-0 right-1/2 w-3 h-3 bg-purple-400 rounded-full blur-sm animate-orbit-reverse shadow-lg shadow-purple-400/50'></div>
                <div className='absolute left-0 top-1/2 w-2 h-2 bg-cyan-400 rounded-full blur-sm animate-bounce shadow-lg shadow-cyan-400/50'></div>
                <div className='absolute right-0 bottom-1/2 w-3 h-3 bg-pink-400 rounded-full blur-sm animate-pulse shadow-lg shadow-pink-400/50'></div>

                {/* Additional Orbiting Elements */}
                <div className='absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-orbit-slow shadow-sm shadow-yellow-400/50'></div>
                <div className='absolute bottom-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-orbit-reverse-slow shadow-sm shadow-green-400/50'></div>
              </div>
            </div>

            {/* Right side - Text Content */}
            <div className='flex-1 text-center lg:text-left order-2 lg:order-2 max-w-2xl lg:-ml-16'>
              {/* Greeting */}
              <div className='mb-1'>
                <span className='text-2xl md:text-3xl lg:text-4xl text-gray-300 font-light tracking-wide'>
                  Hello, I&apos;m
                </span>
              </div>

              {/* Name */}
              <h1 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 leading-tight'>
                <span 
                  className='gradient-text'
                  style={{
                    background: 'linear-gradient(90deg, #8B5CF6, #3B82F6, #06B6D4, #3B82F6, #8B5CF6)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'gradient-shift 3s ease-in-out infinite'
                  }}
                >
                  Sai Krishna
                </span>
              </h1>

              {/* Title */}
              <div className='mb-1'>
                <h2 className='text-xl md:text-2xl lg:text-3xl text-white font-semibold mb-2'>
                  Director of Engineering
                </h2>
                <div className='flex justify-center lg:justify-start items-center mb-6'>
                  <span className='text-lg md:text-xl text-gray-300 mr-3'>at</span>
                  <img src={lambdaTestLogo} alt='LambdaTest Logo' className='w-32 md:w-40 h-auto' />
                </div>
              </div>

              {/* Dynamic Role */}
              <div className='mb-6'>
                <p className='text-lg md:text-xl lg:text-2xl text-gray-300'>
                  Also a{' '}
                  <span className='text-purple-400 font-semibold transition-all duration-500 ease-in-out bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>
                    {roles[currentRoleIndex]}
                  </span>
                  <span className='text-purple-400 animate-pulse ml-1'>|</span>
                </p>
              </div>

              {/* CTA Buttons */}
              <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                <button
                  onClick={() => scrollToSection('about')}
                  className='px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
                >
                  Learn More
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className='px-8 py-3 border-2 border-blue-400 text-blue-400 font-semibold rounded-full hover:bg-blue-400 hover:text-black transition-all duration-300 transform hover:scale-105'
                >
                  View Projects
                </button>
              </div>
            </div>

          </div>

          {/* Stats Section - Within Hero Section */}
          <div className='relative z-10 w-full max-w-4xl mx-auto pb-8'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
              <div className='bg-gray-800/30 p-6 rounded-full border border-gray-700 w-40 h-40 mx-auto flex flex-col items-center justify-center'>
                <div className='text-3xl font-bold text-blue-400 mb-2'>25+</div>
                <div className='text-gray-300 text-sm'>Conference Talks</div>
              </div>
              <div className='bg-gray-800/30 p-6 rounded-full border border-gray-700 w-40 h-40 mx-auto flex flex-col items-center justify-center'>
                <div className='text-3xl font-bold text-blue-400 mb-2'>10+</div>
                <div className='text-gray-300 text-sm'>Technical Articles</div>
              </div>
              <div className='bg-gray-800/30 p-6 rounded-full border border-gray-700 w-40 h-40 mx-auto flex flex-col items-center justify-center'>
                <div className='text-3xl font-bold text-blue-400 mb-2'>∞</div>
                <div className='text-gray-300 text-sm'>Open Source Projects</div>
              </div>
              <div className='bg-gray-800/30 p-6 rounded-full border border-gray-700 w-40 h-40 mx-auto flex flex-col items-center justify-center'>
                <div className='text-3xl font-bold text-blue-400 mb-2'>13+</div>
                <div className='text-gray-300'>Years in Testing</div>
              </div>
            </div>
          </div>

          {/* Gradient text animation styles */}
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes gradient-shift {
                0%, 100% {
                  background-position: 0% 50%;
                }
                50% {
                  background-position: 100% 50%;
                }
              }
              @keyframes float {
                0%, 100% {
                  transform: translateY(0px) rotate(0deg);
                }
                50% {
                  transform: translateY(-10px) rotate(2deg);
                }
              }
              @keyframes float-delayed {
                0%, 100% {
                  transform: translateY(0px) rotate(0deg);
                }
                50% {
                  transform: translateY(-15px) rotate(-2deg);
                }
              }
              @keyframes spin-slow {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
              @keyframes spin-reverse {
                from {
                  transform: rotate(360deg);
                }
                to {
                  transform: rotate(0deg);
                }
              }
              @keyframes orbit {
                0% {
                  transform: rotate(0deg) translateX(120px) rotate(0deg);
                }
                100% {
                  transform: rotate(360deg) translateX(120px) rotate(-360deg);
                }
              }
              @keyframes orbit-reverse {
                0% {
                  transform: rotate(360deg) translateX(100px) rotate(-360deg);
                }
                100% {
                  transform: rotate(0deg) translateX(100px) rotate(0deg);
                }
              }
              .animate-float {
                animation: float 6s ease-in-out infinite;
              }
              .animate-float-delayed {
                animation: float-delayed 8s ease-in-out infinite;
              }
              .animate-spin-slow {
                animation: spin-slow 20s linear infinite;
              }
              .animate-spin-reverse {
                animation: spin-reverse 15s linear infinite;
              }
              .animate-orbit {
                animation: orbit 25s linear infinite;
              }
              .animate-orbit-reverse {
                animation: orbit-reverse 30s linear infinite;
              }
              @keyframes orbit-slow {
                0% {
                  transform: rotate(0deg) translateX(80px) rotate(0deg);
                }
                100% {
                  transform: rotate(360deg) translateX(80px) rotate(-360deg);
                }
              }
              @keyframes orbit-reverse-slow {
                0% {
                  transform: rotate(360deg) translateX(70px) rotate(-360deg);
                }
                100% {
                  transform: rotate(0deg) translateX(70px) rotate(0deg);
                }
              }
              @keyframes pulse-slow {
                0%, 100% {
                  opacity: 0.4;
                }
                50% {
                  opacity: 0.8;
                }
              }
              @keyframes pulse-fast {
                0%, 100% {
                  opacity: 0.3;
                }
                50% {
                  opacity: 0.9;
                }
              }
              .animate-orbit-slow {
                animation: orbit-slow 35s linear infinite;
              }
              .animate-orbit-reverse-slow {
                animation: orbit-reverse-slow 40s linear infinite;
              }
              .animate-pulse-slow {
                animation: pulse-slow 4s ease-in-out infinite;
              }
              .animate-pulse-fast {
                animation: pulse-fast 2s ease-in-out infinite;
              }
            `
          }} />
        </div>

      </section>

      {/* About Section */}
      <section id='about' className='py-20 bg-gray-900/50'>
        <div className='max-w-6xl mx-auto px-6'>
          <h2 className='text-4xl font-heading font-bold text-center mb-16 text-white'>About Me</h2>
          <div className='max-w-4xl mx-auto'>
            <p className='text-xl text-gray-200 mb-6 leading-relaxed font-medium'>
              I&apos;m a passionate technologist and leader in the software testing and automation
              space. As{' '}
              <span className='relative inline-block bg-gradient-to-r from-blue-400/30 via-blue-400/40 to-blue-400/30 px-1 py-0.5 rounded-sm transform -skew-x-1'>
                Director of Engineering at LambdaTest
              </span>
              , I drive innovation in cloud-based testing platforms that serve{' '}
              <span className='relative inline-block bg-gradient-to-r from-blue-400/30 via-blue-400/40 to-blue-400/30 px-1 py-0.5 rounded-sm transform skew-x-1'>
                millions of developers worldwide
              </span>
              , enabling seamless cross-browser and mobile testing.
            </p>
            <p className='text-xl text-gray-200 mb-6 leading-relaxed font-medium'>
              My journey in open source began with contributing to{' '}
              <span className='relative inline-block bg-gradient-to-r from-blue-400/30 via-blue-400/40 to-blue-400/30 px-1 py-0.5 rounded-sm transform -skew-x-1'>
                Appium
              </span>
              , where I became a{' '}
              <span className='relative inline-block bg-gradient-to-r from-blue-400/30 via-blue-400/40 to-blue-400/30 px-1 py-0.5 rounded-sm transform skew-x-1'>
                core maintainer
              </span>{' '}
              and helped architect{' '}
              <span className='relative inline-block bg-gradient-to-r from-blue-400/30 via-blue-400/40 to-blue-400/30 px-1 py-0.5 rounded-sm transform -skew-x-1'>
                Appium 2.0
              </span>
              . I&apos;ve created multiple plugins including{' '}
              <span className='relative inline-block bg-gradient-to-r from-blue-400/30 via-blue-400/40 to-blue-400/30 px-1 py-0.5 rounded-sm transform skew-x-1'>
                Device Farm, Wait Plugin, and Gestures Plugin
              </span>{' '}
              that are used by thousands of developers globally. Recently, I&apos;ve pioneered{' '}
              <span className='relative inline-block bg-gradient-to-r from-blue-400/30 via-blue-400/40 to-blue-400/30 px-1 py-0.5 rounded-sm transform -skew-x-1'>
                Model Context Protocol (MCP) servers
              </span>{' '}
              for mobile automation, bridging AI and testing workflows.
            </p>
            <p className='text-xl text-gray-200 mb-6 leading-relaxed font-medium'>
              As an{' '}
              <span className='relative inline-block bg-gradient-to-r from-blue-400/30 via-blue-400/40 to-blue-400/30 px-1 py-0.5 rounded-sm transform skew-x-1'>
                international speaker
              </span>
              , I&apos;ve presented at{' '}
              <span className='relative inline-block bg-gradient-to-r from-blue-400/30 via-blue-400/40 to-blue-400/30 px-1 py-0.5 rounded-sm transform -skew-x-1'>
                25+ conferences
              </span>{' '}
              including SeleniumConf, AppiumConf, QuestForQuality, Belgrade Test Conference,
              AutomationGuild, TestμConf, Nordic Testing Days, and Agile India, sharing insights on
              mobile automation, clean code practices, and the future of testing.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id='achievements' className='py-20'>
        <div className='max-w-7xl mx-auto px-6'>
          <h2 className='text-4xl font-heading font-bold text-center mb-16 text-white'>
            Key Achievements
          </h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className='bg-gray-900/50 p-8 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105'
              >
                <div className='text-4xl mb-4'>{achievement.icon}</div>
                <h3 className='text-xl font-heading font-bold mb-3 text-white'>
                  {achievement.title}
                </h3>
                <p className='text-gray-400 mb-4'>{achievement.description}</p>
                <span className='inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm'>
                  {achievement.highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id='projects' className='py-20 bg-gray-900/50'>
        <div className='max-w-7xl mx-auto px-6'>
          <h2 className='text-4xl font-heading font-bold text-center mb-16 text-white'>
            Open Source Projects
          </h2>
          <div className='flex flex-wrap justify-center gap-8'>
            {projects.map(
              (project, index) =>
                project.imgSource && (
                  <a
                    key={index}
                    href={project.source}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='transition-all duration-300 hover:scale-110'
                    title={project.title}
                  >
                    <img
                      src={
                        project.imgSource.startsWith('http')
                          ? project.imgSource
                          : projectImageMap[project.imgSource] || ''
                      }
                      alt={project.title}
                      className={`w-24 h-24 ${
                        project.imgSource === 'mcp-wdalogo.png' ? 'object-contain' : 'object-cover'
                      } rounded-full hover:shadow-lg`}
                    />
                  </a>
                ),
            )}
          </div>
        </div>
      </section>

      {/* Talks Section */}
      <section id='talks' className='py-20'>
        <div className='max-w-7xl mx-auto px-6'>
          <h2 className='text-4xl font-heading font-bold text-center mb-16 text-white'>
            Conference Talks & Presentations
          </h2>
          <div className='grid md:grid-cols-2 gap-8'>
            {conferences.slice(0, 8).map((conference, index) => (
              <div
                key={index}
                className='bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-300'
              >
                <div className='flex flex-wrap gap-2 mb-3'>
                  {conference.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className='bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className='text-lg font-heading font-bold mb-2 text-white'>
                  {conference.title}
                </h3>
                <p className='text-gray-400 mb-4'>{conference.description}</p>
                {conference.url && (
                  <a
                    href={conference.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200'
                  >
                    Watch Talk →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section id='blogs' className='py-20 bg-gray-900/50'>
        <div className='max-w-7xl mx-auto px-6'>
          <h2 className='text-4xl font-heading font-bold text-center mb-16 text-white'>
            Technical Articles & Blogs
          </h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {blogs.map((blog, index) => (
              <div
                key={index}
                className='bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105'
              >
                <h3 className='text-lg font-heading font-bold mb-3 text-white line-clamp-2'>
                  {blog.title}
                </h3>
                <p className='text-blue-400 text-sm mb-4'>{blog.tags}</p>
                <a
                  href={blog.source}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200'
                >
                  Read Article →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-8 border-t border-gray-800'>
        <div className='max-w-7xl mx-auto px-6 text-center'>
          <p className='text-gray-400'>© 2025 Sai Krishna. Built with React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  )
}

export default ModernPortfolio
