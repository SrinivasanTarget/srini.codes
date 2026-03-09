import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import bookCover from '../assets/images/MCP Book.png'

const DISMISSED_KEY = 'book-banner-dismissed'

const BookBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(true)
  const location = useLocation()

  // Don't show on the book page itself
  const isBookPage = location.pathname === '/book'

  useEffect(() => {
    setDismissed(sessionStorage.getItem(DISMISSED_KEY) === 'true')
  }, [])

  if (dismissed || isBookPage) return null

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDismissed(true)
    sessionStorage.setItem(DISMISSED_KEY, 'true')
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-5 pointer-events-none'>
      <div className='max-w-2xl mx-auto pointer-events-auto'>
        <Link
          to='/book'
          className='flex items-center gap-4 sm:gap-5 px-4 sm:px-6 py-3.5 sm:py-4 rounded-2xl border border-white/[0.12] hover:border-white/20 transition-all duration-300 group'
          style={{
            background: 'rgba(30, 30, 30, 0.75)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            boxShadow: '0 -4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          <img
            src={bookCover}
            alt='The MCP Standard'
            className='w-12 sm:w-16 rounded-lg shadow-lg object-cover flex-shrink-0'
          />
          <div className='flex-1 min-w-0'>
            <p className='text-[10px] sm:text-xs text-accent-light/70 font-mono uppercase tracking-wider mb-0.5'>New Book</p>
            <p className='text-sm sm:text-lg text-white font-semibold truncate'>The MCP Standard</p>
            <p className='text-xs sm:text-sm text-gray-400 truncate hidden sm:block'>A Developer&apos;s Guide to MCP</p>
          </div>
          <span className='text-sm text-accent-light/80 group-hover:text-white font-medium whitespace-nowrap hidden md:inline'>
            Learn more →
          </span>
          <button
            onClick={handleDismiss}
            className='flex-shrink-0 p-1.5 sm:p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors duration-200'
            aria-label='Dismiss'
          >
            <svg className='w-4 h-4 sm:w-5 sm:h-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default BookBanner
