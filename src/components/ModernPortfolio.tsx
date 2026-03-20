import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { conferences } from '../portfolio/conferences'
import { UnifiedBlogService, UnifiedBlogPost } from '../services/unifiedBlog'
import { EnhancedProjectsService, EnhancedProjectData } from '../services/enhancedProjects'
import UnifiedBlogCard from './blogcard/UnifiedBlogCard'
import SimpleProjectCard from './project/SimpleProjectCard'
import heroImage from '../assets/images/ProfilePic.webp'
import TiltProfileImage from './TiltProfileImage'
import testmuLogo from '../assets/images/TestMu AI White Logo 512px.svg'
import ThreeHeroBackground from './ThreeHeroBackground'
import BookBanner from './BookBanner'

// Animated role cycling component
const ROLES = [
  { label: 'Open Source Advocate', icon: '⌘' },
  { label: 'International Speaker', icon: '◉' },
  { label: 'Technical Author', icon: '✦' },
]

const RoleCycler: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const cycleRole = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % ROLES.length)
      setIsTransitioning(false)
    }, 400)
  }, [])

  useEffect(() => {
    const interval = setInterval(cycleRole, 3000)
    return () => clearInterval(interval)
  }, [cycleRole])

  const role = ROLES[currentIndex]

  return (
    <div className='h-8 sm:h-9 overflow-hidden relative flex items-center justify-center lg:justify-start'>
      <div
        className={`flex items-center gap-2.5 transition-all duration-400 ease-out ${
          isTransitioning
            ? 'opacity-0 -translate-y-3'
            : 'opacity-100 translate-y-0'
        }`}
        style={{ transitionDuration: '400ms', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <span className='text-accent-light/50 text-sm'>{role.icon}</span>
        <span className='text-sm sm:text-base text-white/70 font-medium tracking-wide'>
          {role.label}
        </span>
        <span className='w-1.5 h-1.5 rounded-full bg-accent-light/40 animate-pulse' />
      </div>
    </div>
  )
}

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
        '.section-animate, .stagger-animate, .title-animate'
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
      const blogs = await UnifiedBlogService.getRecentBlogs(3)
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className='bg-black text-white'>
      {/* Book Announcement */}
      <BookBanner />

      {/* Navigation */}
      <nav
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'glass-nav' : 'bg-transparent'
        }`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <div className='text-2xl sm:text-3xl font-signature text-accent-light' style={{ WebkitFontSmoothing: 'antialiased' }}>
                Srinivasan Sekar
              </div>
            </div>
            <div className='hidden md:flex space-x-6 lg:space-x-8'>
              {['About', 'Projects', 'Talks'].map((item) => (
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
                Blogs
              </button>
              <Link
                to='/contact'
                className='nav-link font-medium'
              >
                Contact
              </Link>
              <Link
                to='/conferences'
                className='nav-link font-medium'
              >
                Speaker Map
              </Link>
              <Link
                to='/book'
                className='nav-link font-medium'
              >
                Book
              </Link>
            </div>
            {/* Mobile menu button */}
            <div className='md:hidden'>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className='text-white hover:text-gray-300 p-2 touch-target'
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
            mobileMenuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='px-4 py-4 space-y-1'>
            {['About', 'Projects', 'Talks'].map((item) => (
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
              to='/contact'
              onClick={() => setMobileMenuOpen(false)}
              className='mobile-nav-link block w-full text-left py-3 px-4 text-white rounded-lg transition-all duration-200 touch-target'
            >
              Contact
            </Link>
            <Link
              to='/conferences'
              onClick={() => setMobileMenuOpen(false)}
              className='mobile-nav-link block w-full text-left py-3 px-4 text-white rounded-lg transition-all duration-200 touch-target'
            >
              Speaker Map
            </Link>
            <Link
              to='/book'
              onClick={() => setMobileMenuOpen(false)}
              className='mobile-nav-link block w-full text-left py-3 px-4 text-white rounded-lg transition-all duration-200 touch-target'
            >
              Book
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id='hero'
        className='min-h-[calc(100vh-6rem)] flex items-center justify-center relative overflow-hidden'
      >
        {/* Three.js Particle Background */}
        <ThreeHeroBackground className='absolute inset-0 z-0' />

        {/* Overlay gradient for better text readability */}
        <div className='absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40 z-[1]'></div>

        <div className='relative z-20 flex items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='grid lg:grid-cols-2 gap-8 sm:gap-12 items-center w-full'>
            {/* Left side - Profile Image */}
            <div className='relative flex justify-center lg:justify-end order-1 lg:order-1'>
              {/* Main profile image - seamlessly blended with background */}
              <TiltProfileImage
                src={heroImage}
                alt='Srinivasan Sekar'
                className='w-64 sm:w-72 md:w-80 lg:w-96 h-64 sm:h-72 md:h-80 lg:h-96'
              />
            </div>

            {/* Right side - Content */}
            <div className='text-center lg:text-left order-2 lg:order-2'>
              <h1 className='text-4xl sm:text-5xl lg:text-7xl font-heading font-bold mb-4 text-white leading-tight'>
                Srinivasan
                <br />
                <span className='text-accent-light'>Sekar</span>
              </h1>

              <div className='mb-6'>
                <span className='text-white font-mono text-base sm:text-lg inline-flex items-center gap-2'>
                  Director of Engineering at <img src={testmuLogo} alt='TestMu AI' className='inline h-4 sm:h-5' />
                </span>
              </div>

              <div className='mb-6'>
                <RoleCycler />
              </div>

              <div className='flex flex-wrap justify-center lg:justify-start gap-3'>
                <a
                  href='https://github.com/srinivasanTarget'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center justify-center w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-accent/30 hover:bg-accent/[0.06] transition-all duration-300'
                  aria-label='GitHub'
                >
                  <svg className='w-[18px] h-[18px] text-gray-400 group-hover:text-white transition-colors duration-300' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' />
                  </svg>
                </a>
                <a
                  href='https://twitter.com/srinivasanskr'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center justify-center w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-accent/30 hover:bg-accent/[0.06] transition-all duration-300'
                  aria-label='Twitter'
                >
                  <svg className='w-[18px] h-[18px] text-gray-400 group-hover:text-white transition-colors duration-300' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                  </svg>
                </a>
                <a
                  href='https://www.linkedin.com/in/srinivasan-sekar/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center justify-center w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-accent/30 hover:bg-accent/[0.06] transition-all duration-300'
                  aria-label='LinkedIn'
                >
                  <svg className='w-[18px] h-[18px] text-gray-400 group-hover:text-white transition-colors duration-300' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
                    <rect x='2' y='9' width='4' height='12' />
                    <circle cx='4' cy='4' r='2' />
                  </svg>
                </a>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* About Section */}
      <section id='about' className='py-20 sm:py-28 lg:py-36 glass-section'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6'>
          <h2 className='text-3xl sm:text-4xl font-heading font-bold text-center mb-10 sm:mb-16 text-white title-animate'>
            About Me
          </h2>
          <div className='max-w-4xl mx-auto glass-card p-6 sm:p-8 lg:p-10 rounded-2xl section-animate'>
            <p className='text-base sm:text-lg lg:text-xl text-gray-200 mb-6 leading-relaxed font-medium'>
              I&apos;m a passionate technologist and leader in software testing and automation. As{' '}
              <span className='modern-highlight inline-flex items-center gap-1.5'>Director of Engineering at <img src={testmuLogo} alt='TestMu AI' className='inline h-4' /></span>, I
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

      {/* Projects Section */}
      <section id='projects' className='py-20 sm:py-28 lg:py-36 glass-section'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <h2 className='text-3xl sm:text-4xl font-heading font-bold text-center mb-6 sm:mb-8 text-white title-animate'>
            Open Source Contributions
          </h2>
          <p className='text-base sm:text-lg lg:text-xl text-gray-300 text-center mb-12 sm:mb-16 max-w-3xl mx-auto section-animate'>
            Key contributions to testing and automation ecosystem
          </p>

          {projectsLoading ? (
            <div className='text-center py-12'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto mb-4'></div>
              <p className='text-gray-400'>Loading projects...</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 stagger-animate'>
              {enhancedProjects.map((project, index) => (
                <SimpleProjectCard key={index} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Talks Section */}
      <section id='talks' className='py-20 sm:py-28 lg:py-36'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <h2 className='text-3xl sm:text-4xl font-heading font-bold text-center mb-10 sm:mb-16 text-white title-animate'>
            Conference Talks & Presentations
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 stagger-animate'>
            {conferences.slice(0, 4).map((conference, index) => (
              <div key={index} className='glass-card-hover p-5 sm:p-6 rounded-xl'>
                <div className='flex flex-wrap gap-2 mb-3'>
                  {conference.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className='glass-pill text-gray-300 px-2.5 py-1 rounded-md text-xs'
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
                    className='inline-flex items-center text-gray-300 hover:text-white transition-colors duration-200 touch-target'
                  >
                    Watch Talk →
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className='text-center mt-8 sm:mt-12'>
            <Link
              to='/conferences'
              className='glass-button bg-accent-hover/80 hover:bg-accent-hover px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-200 inline-flex items-center space-x-2 touch-target'
            >
              <span>View All Talks</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section id='blogs' className='py-20 sm:py-28 lg:py-36 glass-section'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <h2 className='text-3xl sm:text-4xl font-heading font-bold text-center mb-10 sm:mb-16 text-white title-animate'>
            Latest Writings
          </h2>
          <p className='text-base sm:text-lg lg:text-xl text-gray-300 text-center mb-8 sm:mb-12 max-w-3xl mx-auto section-animate'>
            Recent articles from my personal blog and guest posts on leading tech platforms
          </p>

          {blogsLoading ? (
            <div className='text-center py-12'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto mb-4'></div>
              <p className='text-gray-400'>Loading latest articles...</p>
            </div>
          ) : (
            <>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-8 sm:mb-12 stagger-animate'>
                {recentBlogs.map((blog) => (
                  <UnifiedBlogCard key={blog.id} post={blog} />
                ))}
              </div>
              <div className='text-center'>
                <Link
                  to='/blog'
                  className='glass-button bg-accent-hover/80 hover:bg-accent-hover px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-200 inline-flex items-center space-x-2 touch-target'
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
      <section id='contact' className='py-20 sm:py-28 lg:py-36 glass-section'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 text-center'>
          <h2 className='text-3xl sm:text-4xl font-heading font-bold mb-6 sm:mb-8 text-white title-animate'>
            Let&apos;s Connect
          </h2>
          <div className='glass-card rounded-2xl p-8 sm:p-12 max-w-2xl mx-auto'>
            <p className='text-base sm:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-10 section-animate'>
              Interested in collaboration, speaking opportunities, or just want to chat about testing
              and automation?
            </p>
            <div className='flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 section-animate'>
            <a
              href='mailto:srinivasan.sekar1990@gmail.com'
              className='glass-button bg-accent-hover/80 hover:bg-accent-hover p-3 sm:p-4 rounded-full transition-all duration-200 touch-target'
              aria-label='Email Me'
            >
              <svg className='w-6 h-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                <rect x='3' y='5' width='18' height='14' rx='2' />
                <polyline points='3 7 12 13 21 7' />
              </svg>
            </a>
            <a
              href='https://twitter.com/srinivasanskr'
              target='_blank'
              rel='noopener noreferrer'
              className='glass-button p-3 sm:p-4 rounded-full transition-colors duration-200 touch-target'
              aria-label='Twitter'
            >
              <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
              </svg>
            </a>
            <a
              href='https://github.com/srinivasanTarget'
              target='_blank'
              rel='noopener noreferrer'
              className='glass-button p-3 sm:p-4 rounded-full transition-colors duration-200 touch-target'
              aria-label='GitHub'
            >
              <svg className='w-6 h-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' />
              </svg>
            </a>
          </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-6 sm:py-8 glass-section'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 text-center'>
          <p className='text-gray-500 text-sm sm:text-base'>
            © 2026 Srinivasan Sekar
          </p>
        </div>
      </footer>
    </div>
  )
}

export default ModernPortfolio
