import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { conferences } from '../portfolio/conferences'
import { UnifiedBlogService, UnifiedBlogPost } from '../services/unifiedBlog'
import { EnhancedProjectsService, EnhancedProjectData } from '../services/enhancedProjects'
import UnifiedBlogCard from './blogcard/UnifiedBlogCard'
import SimpleProjectCard from './project/SimpleProjectCard'
import heroImage from '../assets/images/ProfilePic.png'

// Lazy load Remotion background for performance
const HeroVideoBackground = lazy(() => import('../remotion/HeroVideoBackground'))

// Custom hook for intersection observer animations
const useIntersectionAnimation = (dependencies: unknown[] = []) => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.05,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    // Small delay to ensure DOM is updated after data loads
    const timeoutId = setTimeout(() => {
      const animatedElements = document.querySelectorAll(
        '.section-animate, .stagger-animate, .slide-left, .slide-right, .scale-up, .blur-reveal, .title-animate'
      )
      animatedElements.forEach((el) => observer.observe(el))
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, dependencies)
}

const ModernPortfolio = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [recentBlogs, setRecentBlogs] = useState<UnifiedBlogPost[]>([])
  const [blogsLoading, setBlogsLoading] = useState(true)
  const [enhancedProjects, setEnhancedProjects] = useState<EnhancedProjectData[]>([])
  const [projectsLoading, setProjectsLoading] = useState(true)

  // Initialize intersection observer for animations - re-run when data loads
  useIntersectionAnimation([blogsLoading, projectsLoading])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    loadRecentBlogs()
    loadEnhancedProjects()
  }, [])

  const loadRecentBlogs = async () => {
    try {
      setBlogsLoading(true)
      const blogs = await UnifiedBlogService.getRecentBlogs(6)
      setRecentBlogs(blogs)
    } catch (error) {
      console.error('Failed to load recent blogs:', error)
    } finally {
      setBlogsLoading(false)
    }
  }

  const loadEnhancedProjects = async () => {
    try {
      setProjectsLoading(true)
      const projects = await EnhancedProjectsService.getEnhancedProjects()
      setEnhancedProjects(projects)
    } catch (error) {
      console.error('Failed to load enhanced projects:', error)
    } finally {
      setProjectsLoading(false)
    }
  }

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
        '25+ conference talks across SeleniumConf, AppiumConf, QuestForQuality, SLASSCOM, Belgrade Test Conference, AutomationGuild, FOSDEM, TestμConf, Nordic Testing Days, Agile India',
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
      description: 'Leading engineering teams at TestMu AI - AI-powered testing platform',
      highlight: 'TestMu AI Leadership',
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
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className='bg-black text-white'>
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'glass-nav' : 'bg-transparent'
        }`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <div className='text-xl sm:text-2xl font-signature text-blue-400 tracking-wide font-semibold' style={{ textShadow: 'none', WebkitFontSmoothing: 'antialiased' }}>
                Srinivasan Sekar
              </div>
            </div>
            <div className='hidden md:flex space-x-6 lg:space-x-8'>
              {['About', 'Achievements', 'Projects', 'Talks', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className='nav-link font-medium'
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('blogs')}
                className='nav-link font-medium'
              >
                Latest Blogs
              </button>
              <Link
                to='/blog'
                className='nav-link font-medium'
              >
                All Blogs
              </Link>
            </div>
            {/* Mobile menu button */}
            <div className='md:hidden'>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className='text-white hover:text-blue-400 p-2 touch-target'
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? (
                  <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                ) : (
                  <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div
          className={`md:hidden mobile-menu-panel overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='px-4 py-4 space-y-1'>
            {['About', 'Achievements', 'Projects', 'Talks', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className='mobile-nav-link block w-full text-left py-3 px-4 text-white rounded-lg transition-all duration-200 touch-target'
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('blogs')}
              className='mobile-nav-link block w-full text-left py-3 px-4 text-white rounded-lg transition-all duration-200 touch-target'
            >
              Latest Blogs
            </button>
            <Link
              to='/blog'
              onClick={() => setMobileMenuOpen(false)}
              className='mobile-nav-link block w-full text-left py-3 px-4 text-white rounded-lg transition-all duration-200 touch-target'
            >
              All Blogs
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id='hero'
        className='min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-0'
      >
        {/* Remotion Video Background */}
        <Suspense
          fallback={
            <div className='absolute inset-0 bg-gradient-to-br from-blue-900/25 via-gray-900/40 to-black' />
          }
        >
          <HeroVideoBackground className='absolute inset-0 z-0' />
        </Suspense>

        {/* Overlay gradient for better text readability */}
        <div className='absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/50 z-[1]'></div>

        {/* Code background text - hidden on mobile for performance */}
        <div className='absolute inset-0 opacity-10 font-mono text-xs text-blue-300 overflow-hidden hidden sm:block'>
          <div className='absolute top-20 left-10 transform rotate-12'>
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

          <div className='absolute top-40 right-10 transform -rotate-6'>
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

          <div className='absolute bottom-20 left-20 transform rotate-3'>
            <pre>{`// Appium 2.0 Plugin Development
export class DeviceFarmPlugin {
  async createSession(next, driver, jwpCaps) {
    const device = await this.allocateDevice();
    return await next(driver, jwpCaps);
  }
}`}</pre>
          </div>
        </div>

        <div className='relative z-20 flex items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='grid lg:grid-cols-2 gap-8 sm:gap-12 items-center w-full'>
            {/* Left side - Profile Image */}
            <div className='relative flex justify-center lg:justify-end order-1 lg:order-1'>
              {/* Subtle AI background text - hidden on small screens */}
              <div className='absolute -top-10 left-10 text-[50px] sm:text-[80px] font-bold text-gray-500/[0.08] select-none font-mono transform rotate-12 hidden sm:block'>
                GenAI
              </div>
              <div className='absolute bottom-10 right-10 text-[40px] sm:text-[60px] font-bold text-gray-500/[0.12] select-none font-mono transform -rotate-12 hidden sm:block'>
                MCPs
              </div>
              <div className='absolute top-32 -left-10 text-[35px] sm:text-[55px] font-bold text-gray-500/[0.10] select-none font-mono transform rotate-45 hidden md:block'>
                LLMs
              </div>

              {/* Geometric shapes - hidden on mobile */}
              <div className='absolute top-10 right-10 w-16 sm:w-20 h-16 sm:h-20 border-4 border-purple-500/30 rotate-45 hidden sm:block'></div>
              <div className='absolute bottom-20 left-5 w-12 sm:w-16 h-12 sm:h-16 bg-blue-500/20 rotate-12 hidden sm:block'></div>

              <div className='absolute -bottom-5 -right-5 text-4xl sm:text-6xl text-purple-500/40 font-mono hidden sm:block'>
                ⚡
              </div>

              {/* Main profile image - Circular with responsive sizing */}
              <div className='relative w-56 sm:w-64 md:w-72 lg:w-80 h-56 sm:h-64 md:h-72 lg:h-80 rounded-full overflow-hidden shadow-2xl'>
                <img
                  src={heroImage}
                  alt='Srinivasan Sekar'
                  className='w-full h-full object-cover hover:scale-110 transition-transform duration-500'
                  style={{
                    objectPosition: '50% 30%',
                  }}
                />

                {/* Subtle circular gradient overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent'></div>

                {/* Glowing ring effect */}
                <div className='absolute -inset-1 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-blue-500/50 rounded-full blur-sm -z-10'></div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className='text-center lg:text-left order-2 lg:order-2'>
              <h1 className='text-4xl sm:text-5xl lg:text-7xl font-heading font-bold mb-4 text-white leading-tight'>
                Srinivasan
                <br />
                <span className='text-blue-400'>Sekar</span>
              </h1>

              <div className='mb-6'>
                <span className='text-blue-400 font-mono text-base sm:text-lg'>
                  {'Director of Engineering @TestMu AI'}
                </span>
              </div>

              <div className='mb-6 space-y-2'>
                <div className='flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-4 text-xs sm:text-sm'>
                  <span className='glass-card px-3 py-1.5 rounded-full text-blue-300'>
                    Open Source Advocate
                  </span>
                  <span className='glass-card px-3 py-1.5 rounded-full text-blue-300'>
                    International Speaker
                  </span>
                  <span className='glass-card px-3 py-1.5 rounded-full text-blue-300'>
                    Technical Author
                  </span>
                </div>
              </div>

              <div className='flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4'>
                <a
                  href='https://github.com/srinivasanTarget'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='glass-button px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg flex items-center space-x-2 touch-target'
                >
                  <span>GitHub</span>
                </a>
                <a
                  href='https://twitter.com/srinivasanskr'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='glass-button px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg flex items-center space-x-2 touch-target'
                >
                  <span>Twitter</span>
                </a>
                <a
                  href='https://www.linkedin.com/in/srinivasan-sekar/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='glass-button px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg flex items-center space-x-2 touch-target'
                >
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-12 sm:py-16 bg-gray-900/30'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center stagger-animate'>
            <div className='glass-card-hover p-4 sm:p-6 rounded-xl'>
              <div className='text-2xl sm:text-3xl font-bold text-blue-400 mb-2'>25+</div>
              <div className='text-gray-300 text-sm sm:text-base'>Conference Talks</div>
            </div>
            <div className='glass-card-hover p-4 sm:p-6 rounded-xl'>
              <div className='text-2xl sm:text-3xl font-bold text-blue-400 mb-2'>10+</div>
              <div className='text-gray-300 text-sm sm:text-base'>Technical Articles</div>
            </div>
            <div className='glass-card-hover p-4 sm:p-6 rounded-xl'>
              <div className='text-2xl sm:text-3xl font-bold text-blue-400 mb-2'>∞</div>
              <div className='text-gray-300 text-sm sm:text-base'>Open Source Projects</div>
            </div>
            <div className='glass-card-hover p-4 sm:p-6 rounded-xl'>
              <div className='text-2xl sm:text-3xl font-bold text-blue-400 mb-2'>13+</div>
              <div className='text-gray-300 text-sm sm:text-base'>Years in Testing</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id='about' className='py-12 sm:py-16 lg:py-20 bg-gray-900/50'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6'>
          <h2 className='text-3xl sm:text-4xl font-heading font-bold text-center mb-10 sm:mb-16 text-white title-animate'>
            About Me
          </h2>
          <div className='max-w-4xl mx-auto glass-card p-6 sm:p-8 lg:p-10 rounded-2xl blur-reveal glow-on-enter'>
            <p className='text-base sm:text-lg lg:text-xl text-gray-200 mb-6 leading-relaxed font-medium'>
              I&apos;m a passionate technologist and leader in software testing and automation. As{' '}
              <span className='modern-highlight'>Director of Engineering at TestMu AI</span>, I
              drive innovation in cloud-based testing platforms serving millions of developers
              worldwide.
            </p>
            <p className='text-base sm:text-lg lg:text-xl text-gray-200 mb-6 leading-relaxed font-medium'>
              My open source journey began with <span className='modern-highlight'>Appium</span>,
              where I became a core maintainer and helped architect Appium 2.0. I&apos;ve created
              plugins like{' '}
              <span className='modern-highlight'>
                Device Farm, Wait Plugin, and Gestures Plugin
              </span>{' '}
              used by millions globally. Recently, I pioneered{' '}
              <span className='modern-highlight'>Model Context Protocol (MCP) servers</span> for
              mobile automation, bridging AI and testing workflows.
            </p>
            <p className='text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed font-medium'>
              As an <span className='modern-highlight'>international speaker</span>, I&apos;ve
              presented at <span className='modern-highlight'>25+ conferences</span> including
              SeleniumConf, AppiumConf, FOSDEM, and Agile India, sharing insights on mobile
              automation and testing innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id='achievements' className='py-12 sm:py-16 lg:py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <h2 className='text-3xl sm:text-4xl font-heading font-bold text-center mb-10 sm:mb-16 text-white title-animate'>
            Key Achievements
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 stagger-animate'>
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className='glass-card-hover glass-border-gradient p-6 sm:p-8 rounded-xl'
              >
                <div className='text-3xl sm:text-4xl mb-4'>{achievement.icon}</div>
                <h3 className='text-lg sm:text-xl font-heading font-bold mb-3 text-white'>
                  {achievement.title}
                </h3>
                <p className='text-gray-400 mb-4 text-sm sm:text-base'>{achievement.description}</p>
                <span className='inline-block bg-blue-600/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs sm:text-sm'>
                  {achievement.highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id='projects' className='py-12 sm:py-16 lg:py-20 bg-gray-900/50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <h2 className='text-3xl sm:text-4xl font-heading font-bold text-center mb-6 sm:mb-8 text-white title-animate'>
            Open Source Contributions
          </h2>
          <p className='text-base sm:text-lg lg:text-xl text-gray-300 text-center mb-10 sm:mb-16 max-w-3xl mx-auto section-animate'>
            Key contributions to testing and automation ecosystem
          </p>

          {projectsLoading ? (
            <div className='text-center py-12'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4'></div>
              <p className='text-gray-400'>Loading projects...</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 stagger-animate'>
              {enhancedProjects.map((project, index) => (
                <SimpleProjectCard key={index} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Talks Section */}
      <section id='talks' className='py-12 sm:py-16 lg:py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <h2 className='text-3xl sm:text-4xl font-heading font-bold text-center mb-10 sm:mb-16 text-white title-animate'>
            Conference Talks & Presentations
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 stagger-animate'>
            {conferences.slice(0, 8).map((conference, index) => (
              <div key={index} className='glass-card-hover p-5 sm:p-6 rounded-xl'>
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
                <h3 className='text-base sm:text-lg font-heading font-bold mb-2 text-white'>
                  {conference.title}
                </h3>
                <p className='text-gray-400 mb-4 text-sm sm:text-base'>{conference.description}</p>
                {conference.url && (
                  <a
                    href={conference.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 touch-target'
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
      <section id='blogs' className='py-12 sm:py-16 lg:py-20 bg-gray-900/50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <h2 className='text-3xl sm:text-4xl font-heading font-bold text-center mb-10 sm:mb-16 text-white title-animate'>
            Latest Writings
          </h2>
          <p className='text-base sm:text-lg lg:text-xl text-gray-300 text-center mb-8 sm:mb-12 max-w-3xl mx-auto section-animate'>
            Recent articles from my personal blog and guest posts on leading tech platforms
          </p>

          {blogsLoading ? (
            <div className='text-center py-12'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4'></div>
              <p className='text-gray-400'>Loading latest articles...</p>
            </div>
          ) : (
            <>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 stagger-animate'>
                {recentBlogs.map((blog) => (
                  <UnifiedBlogCard key={blog.id} post={blog} />
                ))}
              </div>
              <div className='text-center'>
                <Link
                  to='/blog'
                  className='glass-button bg-blue-600/80 hover:bg-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-200 inline-flex items-center space-x-2 touch-target'
                >
                  <span>View All Articles</span>
                  <span>→</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id='contact' className='py-12 sm:py-16 lg:py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 text-center'>
          <h2 className='text-3xl sm:text-4xl font-heading font-bold mb-6 sm:mb-8 text-white title-animate'>
            Let&apos;s Connect
          </h2>
          <p className='text-base sm:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-12 section-animate'>
            Interested in collaboration, speaking opportunities, or just want to chat about testing
            and automation?
          </p>
          <div className='flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 scale-up'>
            <a
              href='mailto:srinivasan.sekar1995@gmail.com'
              className='glass-button bg-blue-600/80 hover:bg-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-200 touch-target'
            >
              Email Me
            </a>
            <a
              href='https://twitter.com/srinivasanskr'
              target='_blank'
              rel='noopener noreferrer'
              className='glass-button px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-colors duration-200 touch-target'
            >
              Twitter
            </a>
            <a
              href='https://github.com/srinivasanTarget'
              target='_blank'
              rel='noopener noreferrer'
              className='glass-button px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-colors duration-200 touch-target'
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-6 sm:py-8 border-t border-white/10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 text-center'>
          <p className='text-gray-400 text-sm sm:text-base'>
            © 2025 Srinivasan Sekar. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default ModernPortfolio
