import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import VideoCard from '../components/videocard/VideoCard'
import { videos } from '../portfolio/videos'

const Videos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  // Get all unique tags
  const allTags = Array.from(new Set(videos.flatMap(video => video.tags))).sort()

  // Filter videos based on search term and selected tag, then sort by date (newest first)
  const filteredVideos = videos
    .filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTag = selectedTag === '' || video.tags.includes(selectedTag)
      return matchesSearch && matchesTag
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return (
    <div className='bg-black text-white min-h-screen'>
      {/* Navigation Header */}
      <nav className='bg-black/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            <Link 
              to="/" 
              className='text-white font-bold text-xl hover:text-blue-400 transition-colors duration-200'
            >
              SK
            </Link>
            <Link 
              to="/" 
              className='text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium'
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900'>
        <div className='max-w-7xl mx-auto px-6 text-center'>
          <h1 className='text-5xl md:text-6xl font-bold mb-6'>
            <span className='bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent'>
              Video Library
            </span>
          </h1>
          <p className='text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed'>
            Explore my collection of technical videos covering mobile automation, testing frameworks, 
            DevOps practices, and software engineering best practices.
          </p>
          <div className='text-blue-400 font-semibold'>
            {videos.length} Videos Available
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className='py-8 bg-gray-900/30'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
            {/* Search Bar */}
            <div className='relative flex-1 max-w-md'>
              <input
                type='text'
                placeholder='Search videos...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
              />
              <svg 
                className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400'
                fill='none' 
                stroke='currentColor' 
                viewBox='0 0 24 24'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
            </div>

            {/* Tag Filter */}
            <div className='flex flex-wrap gap-2'>
              <button
                onClick={() => setSelectedTag('')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTag === '' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedTag === tag 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className='mt-4 text-gray-400 text-sm'>
            {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''} found
            {searchTerm && ` for "${searchTerm}"`}
            {selectedTag && ` in "${selectedTag}"`}
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className='py-12'>
        <div className='max-w-7xl mx-auto px-6'>
          {filteredVideos.length > 0 ? (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {filteredVideos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <div className='text-center py-16'>
              <div className='text-6xl mb-4'>🎥</div>
              <h3 className='text-2xl font-bold text-white mb-2'>No videos found</h3>
              <p className='text-gray-400 mb-6'>
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedTag('')
                }}
                className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200'
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className='py-8 border-t border-gray-800 bg-gray-900/50'>
        <div className='max-w-7xl mx-auto px-6 text-center'>
          <p className='text-gray-400'>© 2025 Sai Krishna. Built with React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  )
}

export default Videos
