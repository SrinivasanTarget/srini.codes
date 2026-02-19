import React from 'react'
import { Link } from 'react-router-dom'
import { UnifiedBlogPost } from '../../services/unifiedBlog'
import testmuLogo from '../../assets/images/TestMu AI White Logo 512px.svg'

interface UnifiedBlogCardProps {
  post: UnifiedBlogPost
}

export default function UnifiedBlogCard({ post }: UnifiedBlogCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getPlatformColor = (platform?: string) => {
    switch (platform) {
      case 'TestMu AI':
        return 'bg-yellow-600/20 text-yellow-300'
      case 'Applitools':
        return 'bg-green-600/20 text-green-300'
      case 'TestProject':
        return 'bg-orange-600/20 text-orange-300'
      case 'Personal Blog':
        return 'bg-white/10 text-gray-300'
      default:
        return 'bg-gray-600/20 text-gray-300'
    }
  }

  const isExternal = post.source === 'external'

  return (
    <article className='bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105'>
      {post.coverImage && (
        <div className='aspect-video overflow-hidden'>
          <img
            src={post.coverImage.url}
            alt={post.title}
            className='w-full h-full object-cover hover:scale-110 transition-transform duration-500'
          />
        </div>
      )}
      
      <div className='p-6'>
        <div className='flex flex-wrap gap-2 mb-3'>
          {post.platform && (
            <span className={`px-2 py-1 rounded text-xs font-medium inline-flex items-center ${getPlatformColor(post.platform)}`}>
              {post.platform === 'TestMu AI' ? (
                <img src={testmuLogo} alt='TestMu AI' className='h-3' />
              ) : (
                post.platform
              )}
            </span>
          )}
          {post.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className='bg-white/10 text-gray-300 px-2 py-1 rounded text-xs'
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h2 className='text-xl font-heading font-bold mb-3 text-white line-clamp-2'>
          {post.title}
        </h2>
        
        {post.brief && (
          <p className='text-gray-400 mb-4 line-clamp-3'>
            {post.brief}
          </p>
        )}
        
        <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          )}
          {post.readTimeInMinutes && (
            <span>{post.readTimeInMinutes} min read</span>
          )}
        </div>
        
        {isExternal ? (
          <a
            href={post.url}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center text-gray-300 hover:text-white transition-colors duration-200 font-medium'
          >
            Read Article
            <svg className='ml-1 w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
            </svg>
          </a>
        ) : (
          <Link
            to={post.url}
            className='inline-flex items-center text-gray-300 hover:text-white transition-colors duration-200 font-medium'
          >
            Read Article →
          </Link>
        )}
      </div>
    </article>
  )
}