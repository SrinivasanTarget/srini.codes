import React from 'react'
import { Link } from 'react-router-dom'

export default function BlogNavigation() {
  return (
    <nav className='fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-800'>
      <div className='max-w-7xl mx-auto px-6 py-4'>
        <div className='flex justify-between items-center'>
          <Link to='/' className='flex items-center'>
            <div className='text-2xl font-signature text-amber-400 tracking-wide'>
              Srinivasan Sekar
            </div>
          </Link>
          <div className='flex space-x-6'>
            <Link
              to='/'
              className='hover:text-white transition-colors duration-200 font-medium text-gray-300'
            >
              Home
            </Link>
            <Link
              to='/blog'
              className='hover:text-white transition-colors duration-200 font-medium text-white'
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}