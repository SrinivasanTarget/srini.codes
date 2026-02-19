import React from 'react'
import { Link } from 'react-router-dom'
import { BlogPost } from '../../services/hashnode'

interface HashnodeBlogCardProps {
  post: BlogPost
}

export default function HashnodeBlogCard({ post }: HashnodeBlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

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
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag.slug}
              className='bg-white/10 text-gray-300 px-2 py-1 rounded text-xs'
            >
              {tag.name}
            </span>
          ))}
        </div>
        
        <h2 className='text-xl font-heading font-bold mb-3 text-white line-clamp-2'>
          {post.title}
        </h2>
        
        <p className='text-gray-400 mb-4 line-clamp-3'>
          {post.brief}
        </p>
        
        <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
          <span>{post.readTimeInMinutes} min read</span>
        </div>
        
        <Link
          to={`/blog/${post.slug}`}
          className='inline-flex items-center text-gray-300 hover:text-white transition-colors duration-200 font-medium'
        >
          Read Article →
        </Link>
      </div>
    </article>
  )
}