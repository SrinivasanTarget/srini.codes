import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { conferences } from '../portfolio/conferences'
import { UnifiedBlogService, UnifiedBlogPost } from '../services/unifiedBlog'
import { EnhancedProjectsService, EnhancedProjectData } from '../services/enhancedProjects'
import UnifiedBlogCard from './blogcard/UnifiedBlogCard'
import SimpleProjectCard from './project/SimpleProjectCard'
import heroImage from '../assets/images/ProfilePic.png'

const ModernPortfolio = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [recentBlogs, setRecentBlogs] = useState<UnifiedBlogPost[]>([])
  const [blogsLoading, setBlogsLoading] = useState(true)
  const [enhancedProjects, setEnhancedProjects] = useState<EnhancedProjectData[]>([])
  const [projectsLoading, setProjectsLoading] = useState(true)

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
    }
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
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <div className='text-2xl font-signature text-blue-400 tracking-wide'>
                Srinivasan Sekar
              </div>
            </div>
            <div className='hidden md:flex space-x-8'>
              {['About', 'Achievements', 'Projects', 'Talks', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className='hover:text-blue-400 transition-colors duration-200 font-medium'
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('blogs')}
                className='hover:text-blue-400 transition-colors duration-200 font-medium'
              >
                Latest Blogs
              </button>
              <Link
                to='/blog'
                className='hover:text-blue-400 transition-colors duration-200 font-medium'
              >
                All Blogs
              </Link>
            </div>
            <div className='md:hidden'>
              <button className='text-white hover:text-blue-400'>
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id='hero'
        className='min-h-screen flex items-center justify-center relative overflow-hidden'
      >
        {/* Background with code pattern */}
        <div className='absolute inset-0 bg-gradient-to-br from-blue-900/25 via-gray-900/40 to-black'></div>

        {/* Code background text */}
        <div className='absolute inset-0 opacity-10 font-mono text-xs text-blue-300 overflow-hidden'>
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

        <div className='relative z-10 flex items-center justify-center w-full max-w-7xl mx-auto px-6'>
          <div className='grid lg:grid-cols-2 gap-12 items-center w-full'>
            {/* Left side - Profile Image */}
            <div className='relative flex justify-center lg:justify-end'>
              {/* Subtle AI background text */}
              <div className='absolute -top-10 left-10 text-[80px] font-bold text-gray-500/[0.08] select-none font-mono transform rotate-12'>
                GenAI
              </div>
              <div className='absolute bottom-10 right-10 text-[60px] font-bold text-gray-500/[0.12] select-none font-mono transform -rotate-12'>
                MCPs
              </div>
              <div className='absolute top-32 -left-10 text-[55px] font-bold text-gray-500/[0.10] select-none font-mono transform rotate-45'>
                LLMs
              </div>

              {/* Geometric shapes */}
              <div className='absolute top-10 right-10 w-20 h-20 border-4 border-purple-500/30 rotate-45'></div>
              <div className='absolute bottom-20 left-5 w-16 h-16 bg-blue-500/20 rotate-12'></div>

              {/* AI symbols */}
              {/* <div className='absolute -top-5 -left-5 text-6xl text-purple-500/40 font-mono'>
                🤖
              </div> */}
              <div className='absolute -bottom-5 -right-5 text-6xl text-purple-500/40 font-mono'>
                ⚡
              </div>

              {/* Main profile image - Circular */}
              <div className='relative w-80 h-80 rounded-full overflow-hidden shadow-2xl'>
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
            <div className='text-left lg:text-left'>
              <h1 className='text-5xl lg:text-7xl font-heading font-bold mb-4 text-white leading-tight'>
                Srinivasan
                <br />
                <span className='text-blue-400'>Sekar</span>
              </h1>

              <div className='mb-6'>
                <span className='text-blue-400 font-mono text-lg'>
                  {'Director of Engineering @LambdaTest'}
                </span>
              </div>

              <div className='mb-6 space-y-2'>
                <div className='flex flex-wrap gap-4 text-sm'>
                  <span className='bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full'>
                    Open Source Advocate
                  </span>
                  <span className='bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full'>
                    International Speaker
                  </span>
                  <span className='bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full'>
                    Technical Author
                  </span>
                </div>
              </div>

              <div className='flex flex-wrap gap-4'>
                <a
                  href='https://github.com/srinivasanTarget'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2'
                >
                  <span>GitHub</span>
                </a>
                <a
                  href='https://twitter.com/srinivasanskr'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2'
                >
                  <span>Twitter</span>
                </a>
                <a
                  href='https://www.linkedin.com/in/srinivasan-sekar/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2'
                >
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 bg-gray-900/30'>
        <div className='max-w-6xl mx-auto px-6'>
          <div className='grid md:grid-cols-4 gap-8 text-center'>
            <div className='bg-gray-800/30 p-6 rounded-xl border border-gray-700'>
              <div className='text-3xl font-bold text-blue-400 mb-2'>25+</div>
              <div className='text-gray-300'>Conference Talks</div>
            </div>
            <div className='bg-gray-800/30 p-6 rounded-xl border border-gray-700'>
              <div className='text-3xl font-bold text-blue-400 mb-2'>10+</div>
              <div className='text-gray-300'>Technical Articles</div>
            </div>
            <div className='bg-gray-800/30 p-6 rounded-xl border border-gray-700'>
              <div className='text-3xl font-bold text-blue-400 mb-2'>∞</div>
              <div className='text-gray-300'>Open Source Projects</div>
            </div>
            <div className='bg-gray-800/30 p-6 rounded-xl border border-gray-700'>
              <div className='text-3xl font-bold text-blue-400 mb-2'>13+</div>
              <div className='text-gray-300'>Years in Testing</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id='about' className='py-20 bg-gray-900/50'>
        <div className='max-w-6xl mx-auto px-6'>
          <h2 className='text-4xl font-heading font-bold text-center mb-16 text-white'>About Me</h2>
          <div className='max-w-4xl mx-auto'>
            <p className='text-xl text-gray-200 mb-6 leading-relaxed font-medium'>
              I&apos;m a passionate technologist and leader in software testing and automation. As{' '}
              <span className='modern-highlight'>Director of Engineering at LambdaTest</span>, I
              drive innovation in cloud-based testing platforms serving millions of developers
              worldwide.
            </p>
            <p className='text-xl text-gray-200 mb-6 leading-relaxed font-medium'>
              My open source journey began with <span className='modern-highlight'>Appium</span>,
              where I became a core maintainer and helped architect Appium 2.0. I&apos;ve created
              plugins like{' '}
              <span className='modern-highlight'>
                Device Farm, Wait Plugin, and Gestures Plugin
              </span>{' '}
              used by thousands globally. Recently, I pioneered{' '}
              <span className='modern-highlight'>Model Context Protocol (MCP) servers</span> for
              mobile automation, bridging AI and testing workflows.
            </p>
            <p className='text-xl text-gray-200 mb-6 leading-relaxed font-medium'>
              As an <span className='modern-highlight'>international speaker</span>, I&apos;ve
              presented at <span className='modern-highlight'>25+ conferences</span> including
              SeleniumConf, AppiumConf, FOSDEM, and Agile India, sharing insights on mobile
              automation and testing innovation.
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
          <h2 className='text-4xl font-heading font-bold text-center mb-8 text-white'>
            Open Source Contributions
          </h2>
          <p className='text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto'>
            Key contributions to testing and automation ecosystem
          </p>

          {projectsLoading ? (
            <div className='text-center py-12'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4'></div>
              <p className='text-gray-400'>Loading projects...</p>
            </div>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
              {enhancedProjects.map((project, index) => (
                <SimpleProjectCard key={index} project={project} />
              ))}
            </div>
          )}
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
            Latest Writings
          </h2>
          <p className='text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto'>
            Recent articles from my personal blog and guest posts on leading tech platforms
          </p>

          {blogsLoading ? (
            <div className='text-center py-12'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4'></div>
              <p className='text-gray-400'>Loading latest articles...</p>
            </div>
          ) : (
            <>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
                {recentBlogs.map((blog) => (
                  <UnifiedBlogCard key={blog.id} post={blog} />
                ))}
              </div>
              <div className='text-center'>
                <Link
                  to='/blog'
                  className='bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 inline-flex items-center space-x-2'
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
      <section id='contact' className='py-20'>
        <div className='max-w-4xl mx-auto px-6 text-center'>
          <h2 className='text-4xl font-heading font-bold mb-8 text-white'>Let&apos;s Connect</h2>
          <p className='text-xl text-gray-300 mb-12'>
            Interested in collaboration, speaking opportunities, or just want to chat about testing
            and automation?
          </p>
          <div className='flex flex-wrap justify-center gap-6'>
            <a
              href='mailto:srinivasan.sekar1995@gmail.com'
              className='bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full transition-all duration-200 transform hover:scale-105'
            >
              Email Me
            </a>
            <a
              href='https://twitter.com/srinivasanskr'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-full transition-colors duration-200'
            >
              Twitter
            </a>
            <a
              href='https://github.com/srinivasanTarget'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-full transition-colors duration-200'
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-8 border-t border-gray-800'>
        <div className='max-w-7xl mx-auto px-6 text-center'>
          <p className='text-gray-400'>© 2025 Srinivasan Sekar. Built with React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  )
}

export default ModernPortfolio
