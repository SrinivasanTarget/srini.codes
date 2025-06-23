import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { HashnodeService, BlogPost as BlogPostType } from '../services/hashnode'
import BlogNavigation from '../components/navigation/BlogNavigation'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPostType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (slug) {
      loadPost(slug)
    }
  }, [slug])

  const loadPost = async (postSlug: string) => {
    try {
      setLoading(true)
      const postData = await HashnodeService.getPostBySlug(postSlug)
      setPost(postData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blog post')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-black text-white'>
        <BlogNavigation />
        <div className='max-w-4xl mx-auto px-6 py-20 pt-32'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4'></div>
            <p className='text-gray-400'>Loading blog post...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className='min-h-screen bg-black text-white'>
        <BlogNavigation />
        <div className='max-w-4xl mx-auto px-6 py-20 pt-32'>
          <div className='text-center'>
            <div className='text-red-400 text-6xl mb-4'>⚠️</div>
            <h1 className='text-2xl font-bold mb-4'>Blog Post Not Found</h1>
            <p className='text-gray-400 mb-6'>{error || 'The requested blog post could not be found.'}</p>
            <Link
              to='/blog'
              className='bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors duration-200 inline-block'
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-black text-white'>
      <BlogNavigation />
      
      {/* Breadcrumb Navigation */}
      <div className='border-b border-gray-800 pt-20'>
        <div className='max-w-4xl mx-auto px-6 py-4'>
          <Link
            to='/blog'
            className='inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200'
          >
            ← Back to Blog
          </Link>
        </div>
      </div>

      {/* Cover Image */}
      {post.coverImage && (
        <div className='aspect-video max-h-96 overflow-hidden'>
          <img
            src={post.coverImage.url}
            alt={post.title}
            className='w-full h-full object-cover'
          />
        </div>
      )}

      {/* Article Content */}
      <article className='max-w-4xl mx-auto px-6 py-12'>
        {/* Header */}
        <header className='mb-12'>
          <div className='flex flex-wrap gap-2 mb-4'>
            {post.tags.map((tag) => (
              <span
                key={tag.slug}
                className='bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm'
              >
                {tag.name}
              </span>
            ))}
          </div>
          
          <h1 className='text-4xl md:text-5xl font-heading font-bold mb-6 text-white leading-tight'>
            {post.title}
          </h1>
          
          <div className='flex items-center justify-between text-gray-400 mb-6'>
            <time dateTime={post.publishedAt} className='text-lg'>
              {formatDate(post.publishedAt)}
            </time>
            <span className='text-lg'>{post.readTimeInMinutes} min read</span>
          </div>
          
          {post.brief && (
            <p className='text-xl text-gray-300 leading-relaxed'>
              {post.brief}
            </p>
          )}
        </header>

        {/* Content */}
        <div 
          className='prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-headings:font-heading
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
            prose-strong:text-white
            prose-code:text-blue-300 prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700
            prose-blockquote:border-l-blue-400 prose-blockquote:text-gray-300
            prose-ul:text-gray-300 prose-ol:text-gray-300
            prose-li:text-gray-300'
          dangerouslySetInnerHTML={{ __html: post.content.html }}
        />

        {/* Footer */}
        <footer className='mt-16 pt-8 border-t border-gray-800'>
          <div className='flex items-center justify-between'>
            <Link
              to='/blog'
              className='bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors duration-200'
            >
              ← Back to Blog
            </Link>
            
            <a
              href={post.url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-400 hover:text-blue-300 transition-colors duration-200'
            >
              View on Hashnode →
            </a>
          </div>
        </footer>
      </article>
    </div>
  )
}