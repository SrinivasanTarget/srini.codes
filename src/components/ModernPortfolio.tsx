import React, { useState, useEffect } from 'react'
import { projects } from '../portfolio/projects'
import { conferences } from '../portfolio/conferences'
import { blogs } from '../portfolio/blogs'
import heroImage from '../assets/images/profile_sai.webp'
import lambdaTestLogo from '../assets/images/LambdaTest-logo1.png'
import backgroundImage from '../assets/images/background1.png'

const ModernPortfolio = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)

  const roles = ['Blogger', 'Open source contributor', 'Mentor', 'Conference Speaker', 'Community Organizer']

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
          <div className='flex justify-center items-center'>
            <div className='flex space-x-12'>
              {[
                { label: 'Home', section: 'hero' },
                { label: 'Skills', section: 'about' },
                { label: 'Open Source', section: 'projects' },
                { label: 'Conferences', section: 'talks' },
                { label: 'Workshops', section: 'achievements' },
                { label: 'Blogs', section: 'blogs' }
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
            background: 'linear-gradient(135deg, rgb(17, 15, 31) 50%, rgb(19, 7, 96) 80%, rgb(38, 29, 96) 100%)'
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

        {/* Large Hello Background Text */}
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none z-5'>
          <h1 
            className='text-[300px] lg:text-[400px] xl:text-[500px] font-bold leading-none bg-gradient-to-b from-purple-400/10 to-purple-800/10 bg-clip-text text-transparent select-none animate-fadeIn'
            style={{
              animationDelay: '350ms',
              animationFillMode: 'both'
            }}
          >
            Hello
          </h1>
        </div>

        {/* Social Media Icons - Right Side */}
        <div className='fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-4'>
          <a
            href='https://github.com/saikrishna321'
            target='_blank'
            rel='noopener noreferrer'
            className='w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg'
            style={{ backgroundColor: '#c2f900' }}
          >
            <svg className='w-6 h-6 text-black' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/>
            </svg>
          </a>
          <a
            href='https://twitter.com/saikrisv'
            target='_blank'
            rel='noopener noreferrer'
            className='w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg'
            style={{ backgroundColor: '#c2f900' }}
          >
            <svg className='w-6 h-6 text-black' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'/>
            </svg>
          </a>
          <a
            href='https://www.linkedin.com/in/saikrishna321/'
            target='_blank'
            rel='noopener noreferrer'
            className='w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg'
            style={{ backgroundColor: '#c2f900' }}
          >
            <svg className='w-6 h-6 text-black' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
            </svg>
          </a>
          <a
            href='mailto:srinivasan.sekar1995@gmail.com'
            className='w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg'
            style={{ backgroundColor: '#c2f900' }}
          >
            <svg className='w-6 h-6 text-black' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.98L12 10.09l9.384-6.269h.98c.904 0 1.636.732 1.636 1.636z'/>
            </svg>
          </a>
        </div>

        <div className='relative z-10 flex items-center justify-center w-full max-w-7xl mx-auto px-6'>
          <div className='grid lg:grid-cols-2 gap-12 items-center w-full'>
            {/* Left side - Content */}
            <div className='text-left lg:text-left order-2 lg:order-1'>
              <div className='mb-3'>
                <span 
                  style={{
                    color: '#d1d2e4',
                    fontFamily: '"Fira Sans", Sans-serif',
                    fontSize: '32px',
                    fontWeight: 400,
                    lineHeight: '1.3',
                    letterSpacing: '0px',
                    wordSpacing: '0px'
                  }}
                >
                  I'm
                </span>
              </div>

              <h2 
                className='mb-4'
                style={{
                  fontFamily: '"Fira Sans", Sans-serif',
                  fontSize: '72px',
                  fontWeight: 600,
                  lineHeight: '1.0',
                  letterSpacing: '-1px',
                  wordSpacing: '0px',
                  color: '#f9f6ee'
                }}
              >
                Sai Krishna
              </h2>

              <div className='mb-5'>
                <p 
                  className='mb-4'
                  style={{
                    color: '#d1d2e4',
                    fontFamily: '"Fira Sans", Sans-serif',
                    fontSize: '32px',
                    fontWeight: 400,
                    lineHeight: '1.3',
                    letterSpacing: '0px',
                    wordSpacing: '0px'
                  }}
                >
                  Director of Engineering at
                </p>
                <div className='flex items-center'>
                  <img 
                    src={lambdaTestLogo} 
                    alt='LambdaTest Logo' 
                    className='w-40 h-auto'
                  />
                </div>
              </div>

              <div className='mb-8'>
                <p 
                  style={{
                    color: '#d1d2e4',
                    fontFamily: '"Fira Sans", Sans-serif',
                    fontSize: '22px',
                    fontWeight: 400,
                    lineHeight: '1.4',
                    letterSpacing: '0px',
                    wordSpacing: '0px'
                  }}
                >
                  also a{' '}
                  <span className='text-purple-400 font-medium transition-all duration-500 ease-in-out'>
                    {roles[currentRoleIndex]}
                  </span>
                  <span className='text-purple-400 animate-pulse'>|</span>
                </p>
              </div>
            </div>

            {/* Right side - Profile Image */}
            <div className='relative flex justify-center lg:justify-start order-1 lg:order-2'>
              {/* Main profile image - Circular */}
              <div className='relative w-[450px] h-[450px] lg:w-[600px] lg:h-[600px] rounded-full overflow-hidden'>
                <img
                  src={heroImage}
                  alt='Sai Krishna'
                  className='w-full h-full object-cover'
                  style={{
                    objectPosition: '50% 30%',
                  }}
                />
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
              I&apos;m a passionate technologist and leader in the software testing and automation
              space. As <span className='relative inline-block bg-gradient-to-r from-blue-400/30 via-blue-400/40 to-blue-400/30 px-1 py-0.5 rounded-sm transform -skew-x-1'>Director of Engineering at LambdaTest</span>, I drive innovation in cloud-based
              testing platforms that serve <span className='relative inline-block bg-gradient-to-r from-blue-400/30 via-blue-400/40 to-blue-400/30 px-1 py-0.5 rounded-sm transform skew-x-1'>millions of developers worldwide</span>, enabling seamless
              cross-browser and mobile testing.
            </p>
            <p className='text-xl text-gray-200 mb-6 leading-relaxed font-medium'>
              My journey in open source began with contributing to <span className='relative inline-block bg-gradient-to-r from-blue-400/30 via-blue-400/40 to-blue-400/30 px-1 py-0.5 rounded-sm transform -skew-x-1'>Appium</span>, where I became a <span className='relative inline-block bg-gradient-to-r from-blue-400/30 via-blue-400/40 to-blue-400/30 px-1 py-0.5 rounded-sm transform skew-x-1'>core
              maintainer</span> and helped architect <span className='relative inline-block bg-gradient-to-r from-blue-400/30 via-blue-400/40 to-blue-400/30 px-1 py-0.5 rounded-sm transform -skew-x-1'>Appium 2.0</span>. I&apos;ve created multiple plugins
              including <span className='relative inline-block bg-gradient-to-r from-blue-400/30 via-blue-400/40 to-blue-400/30 px-1 py-0.5 rounded-sm transform skew-x-1'>Device Farm, Wait Plugin, and Gestures Plugin</span> that are used by thousands
              of developers globally. Recently, I&apos;ve pioneered <span className='relative inline-block bg-gradient-to-r from-blue-400/30 via-blue-400/40 to-blue-400/30 px-1 py-0.5 rounded-sm transform -skew-x-1'>Model Context Protocol (MCP)
              servers</span> for mobile automation, bridging AI and testing workflows.
            </p>
            <p className='text-xl text-gray-200 mb-6 leading-relaxed font-medium'>
              As an <span className='relative inline-block bg-gradient-to-r from-blue-400/30 via-blue-400/40 to-blue-400/30 px-1 py-0.5 rounded-sm transform skew-x-1'>international speaker</span>, I&apos;ve presented at <span className='relative inline-block bg-gradient-to-r from-blue-400/30 via-blue-400/40 to-blue-400/30 px-1 py-0.5 rounded-sm transform -skew-x-1'>25+ conferences</span> including
              SeleniumConf, AppiumConf, QuestForQuality, Belgrade Test Conference,
              AutomationGuild, TestμConf, Nordic Testing Days, and Agile India, sharing
              insights on mobile automation, clean code practices, and the future of testing.
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
            {projects.map((project, index) => (
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
                    src={project.imgSource.startsWith('http') ? project.imgSource : `/src/assets/images/${project.imgSource}`}
                    alt={project.title}
                    className='w-24 h-24 object-cover rounded-full hover:shadow-lg'
                  />
                </a>
              )
            ))}
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
