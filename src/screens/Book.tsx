import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import bookCover from '../assets/images/MCP Book.png'

const styles = `
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
`

const BOOK = {
  title: 'The MCP Standard',
  subtitle: 'A Developer\u2019s Guide to Building Universal AI Tools with the Model Context Protocol',
  author: 'Srinivasan Sekar',
  foreword: 'Angie Jones',
  forewordTitle: 'VP of Engineering, AI Tools & Enablement, Block',
  publisher: 'Apress',
  date: 'February 2026',
  pages: 285,
  isbn: '979-8-8688-2364-0',
  springerUrl: 'https://link.springer.com/book/10.1007/979-8-8688-2364-0',
  oreillyUrl: 'https://www.oreilly.com/library/view/the-mcp-standard/9798868823640/',
  amazonUrl: 'https://www.amazon.com/MCP-Standard-Developers-Building-Universal/dp/B0G2WVSXC6',
}

const LEARNINGS = [
  'Build production-ready MCP servers in TypeScript from the ground up',
  'Understand the complete protocol architecture \u2014 Host, Client, and Server roles',
  'Implement Tools, Resources, and Prompts with schema design using Zod',
  'Apply multi-layered security strategies including threat analysis and client-side hardening',
  'Design decoupled, scalable AI systems independent of specific model vendors',
]

const Book = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='min-h-screen bg-black text-white overflow-hidden'>
      <style>{styles}</style>

      {/* Navigation */}
      <nav className='fixed top-0 left-0 right-0 z-50 px-6 py-4'>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          <Link
            to='/'
            className='flex items-center gap-2 text-white/60 hover:text-white transition-colors'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
            </svg>
            <span className='text-sm font-medium'>Back</span>
          </Link>
          <div className='text-sm text-white/40 font-mono'>BOOK</div>
        </div>
      </nav>

      {/* Ambient background */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 -left-32 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl' />
        <div className='absolute bottom-1/4 -right-32 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl' />
      </div>

      {/* Main Content */}
      <div className='relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-16'>
        {/* Hero: Cover + Details */}
        <div
          className={`flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16 mb-16 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ animation: isLoaded ? 'fade-in-up 0.8s ease-out forwards' : 'none' }}
        >
          {/* Book Cover */}
          <div className='flex-shrink-0'>
            <div
              className='relative'
              style={{ animation: isLoaded ? 'float 6s ease-in-out infinite' : 'none' }}
            >
              <div className='absolute -inset-4 bg-white/5 rounded-2xl blur-2xl' />
              <img
                src={bookCover}
                alt={BOOK.title}
                className='relative w-64 sm:w-72 rounded-lg shadow-2xl shadow-black/50'
              />
            </div>
          </div>

          {/* Details */}
          <div className='flex-1 text-center lg:text-left'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 leading-tight'>
              {BOOK.title}
            </h1>
            <p className='text-lg sm:text-xl text-gray-400 mb-6 leading-relaxed max-w-xl'>
              {BOOK.subtitle}
            </p>

            <div className='mb-6'>
              <p className='text-white/70 text-sm'>
                by <span className='text-white font-medium'>{BOOK.author}</span>
              </p>
              <p className='text-white/50 text-sm mt-1'>
                Foreword by <span className='text-white/70'>{BOOK.foreword}</span>
                <span className='text-white/40'> — {BOOK.forewordTitle}</span>
              </p>
            </div>

            {/* Stats */}
            <div className='flex flex-wrap justify-center lg:justify-start gap-4 mb-8'>
              {[
                { label: 'Publisher', value: BOOK.publisher },
                { label: 'Pages', value: String(BOOK.pages) },
                { label: 'Released', value: BOOK.date },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className='px-4 py-3 rounded-xl bg-white/5 border border-white/[0.06]'
                >
                  <p className='text-white font-semibold text-sm'>{stat.value}</p>
                  <p className='text-white/40 text-xs uppercase tracking-wider mt-0.5'>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-wrap justify-center lg:justify-start gap-3'>
              <a
                href={BOOK.springerUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='bg-amber-600/80 hover:bg-amber-600 px-6 py-3 rounded-lg transition-all duration-200 inline-flex items-center gap-2 font-medium text-sm'
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
                </svg>
                Get on Springer
              </a>
              <a
                href={BOOK.amazonUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-6 py-3 rounded-lg transition-all duration-200 inline-flex items-center gap-2 font-medium text-sm text-white/90'
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z' />
                </svg>
                Buy on Amazon
              </a>
              <a
                href={BOOK.oreillyUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-6 py-3 rounded-lg transition-all duration-200 inline-flex items-center gap-2 font-medium text-sm text-white/90'
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                </svg>
                Read on O'Reilly
              </a>
            </div>
          </div>
        </div>

        {/* What You'll Learn */}
        <div
          className={`transition-opacity duration-700 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ animation: isLoaded ? 'fade-in-up 0.8s ease-out 0.3s both' : 'none' }}
        >
          <h2 className='text-2xl font-heading font-bold text-white mb-6'>
            What You'll Learn
          </h2>
          <div className='bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 sm:p-8'>
            <ul className='space-y-4'>
              {LEARNINGS.map((item, i) => (
                <li key={i} className='flex items-start gap-3'>
                  <svg className='w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                  <span className='text-gray-300 leading-relaxed'>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ISBN */}
        <div
          className={`mt-12 text-center transition-opacity duration-700 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ animation: isLoaded ? 'fade-in-up 0.8s ease-out 0.5s both' : 'none' }}
        >
          <p className='text-white/20 text-xs font-mono tracking-wider'>
            ISBN {BOOK.isbn}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Book
