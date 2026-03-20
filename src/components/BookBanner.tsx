import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const BookBanner: React.FC = () => {
  const location = useLocation()

  // Don't show on the book page itself
  if (location.pathname === '/book') return null

  return (
    <div
      className='w-full border-b border-white/[0.08]'
      style={{
        background: 'rgba(212, 149, 106, 0.1)',
      }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-center gap-2 sm:gap-3'>
        <Link
          to='/book'
          className='flex items-center gap-2 sm:gap-3 group'
        >
          <span className='text-[10px] sm:text-xs text-accent-light/70 font-mono uppercase tracking-wider'>New Book</span>
          <span className='hidden sm:inline text-white/30'>|</span>
          <span className='text-xs sm:text-sm text-white/90 font-medium'>The MCP Standard</span>
          <span className='text-xs sm:text-sm text-accent-light/70 group-hover:text-white transition-colors duration-200'>
            →
          </span>
        </Link>
      </div>
    </div>
  )
}

export default BookBanner
