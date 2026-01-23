import React, { useState, useEffect } from 'react'
import { UnifiedBlogService, UnifiedBlogPost } from '../services/unifiedBlog'
import UnifiedBlogCard from '../components/blogcard/UnifiedBlogCard'
import BlogNavigation from '../components/navigation/BlogNavigation'

export default function BlogList() {
  const [posts, setPosts] = useState<UnifiedBlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadAllPosts()
  }, [])

  const loadAllPosts = async () => {
    try {
      setLoading(true)
      const allPosts = await UnifiedBlogService.getAllBlogs()
      setPosts(allPosts)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blog posts')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-black text-white'>
        <BlogNavigation />
        <div className='max-w-7xl mx-auto px-6 py-20 pt-32'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4'></div>
            <p className='text-gray-400'>Loading blog posts...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen bg-black text-white'>
        <BlogNavigation />
        <div className='max-w-7xl mx-auto px-6 py-20 pt-32'>
          <div className='text-center'>
            <div className='text-red-400 text-6xl mb-4'>⚠️</div>
            <h1 className='text-2xl font-bold mb-4'>Error Loading Blog Posts</h1>
            <p className='text-gray-400 mb-6'>{error}</p>
            <button
              onClick={loadAllPosts}
              className='bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors duration-200'
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-black text-white'>
      <BlogNavigation />
      {/* Header */}
      <div className='bg-gradient-to-r from-blue-900/25 via-gray-900/40 to-black py-20 pt-32'>
        <div className='max-w-7xl mx-auto px-6 text-center'>
          <h1 className='text-5xl font-heading font-bold mb-6 text-white'>
            All My Writings
          </h1>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            A comprehensive collection of my technical articles, tutorials, and insights published
            on my personal blog and guest posts on platforms like TestMu AI, Applitools, and more.
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className='max-w-7xl mx-auto px-6 py-16'>
        {posts.length === 0 ? (
          <div className='text-center py-20'>
            <div className='text-gray-400 text-6xl mb-4'>📝</div>
            <h2 className='text-2xl font-bold mb-4'>No Blog Posts Found</h2>
            <p className='text-gray-400'>Check back later for new content!</p>
          </div>
        ) : (
          <>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {posts.map((post) => (
                <UnifiedBlogCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}