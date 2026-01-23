import { HashnodeService, BlogPost as HashnodeBlogPost } from './hashnode'
import { blogs as externalBlogs } from '../portfolio/blogs'

export interface UnifiedBlogPost {
  id: string
  title: string
  brief?: string
  slug?: string
  publishedAt?: string
  coverImage?: {
    url: string
  }
  tags: string[]
  readTimeInMinutes?: number
  url: string
  content?: {
    html: string
    markdown: string
  }
  source: 'hashnode' | 'external'
  platform?: string
}

export class UnifiedBlogService {
  static async getAllBlogs(): Promise<UnifiedBlogPost[]> {
    try {
      // Fetch Hashnode posts
      const hashnodePosts = await HashnodeService.getAllPosts()
      
      // Convert Hashnode posts to unified format
      const unifiedHashnodePosts: UnifiedBlogPost[] = hashnodePosts.map(post => ({
        id: post.id,
        title: post.title,
        brief: post.brief,
        slug: post.slug,
        publishedAt: post.publishedAt,
        coverImage: post.coverImage,
        tags: post.tags.map(tag => tag.name),
        readTimeInMinutes: post.readTimeInMinutes,
        url: `/blog/${post.slug}`, // Internal route for Hashnode posts
        content: post.content,
        source: 'hashnode' as const,
        platform: 'Personal Blog'
      }))

      // Convert external posts to unified format (remove duplicates)
      const uniqueExternalBlogs = externalBlogs.filter((post, index, self) =>
        index === self.findIndex(p => p.source === post.source && p.title === post.title)
      )
      
      const unifiedExternalPosts: UnifiedBlogPost[] = uniqueExternalBlogs.map((post, index) => {
        // Extract platform from URL
        let platform = 'External'
        if (post.source.includes('testproject.io')) platform = 'TestProject'
        else if (post.source.includes('applitools.com')) platform = 'Applitools'
        else if (post.source.includes('lambdatest.com')) platform = 'TestMu AI'

        return {
          id: `external-${index}`,
          title: post.title,
          tags: post.tags.split(', '),
          url: post.source, // External URL
          source: 'external' as const,
          platform
        }
      })

      // Combine and sort by date (Hashnode posts first, then external)
      const allPosts = [...unifiedHashnodePosts, ...unifiedExternalPosts]
      
      // Sort Hashnode posts by date, keep external posts at the end
      return allPosts.sort((a, b) => {
        if (a.source === 'hashnode' && b.source === 'hashnode') {
          return new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime()
        }
        if (a.source === 'hashnode' && b.source === 'external') return -1
        if (a.source === 'external' && b.source === 'hashnode') return 1
        return 0
      })
    } catch (error) {
      console.error('Failed to fetch unified blogs:', error)
      // Fallback to external blogs only (remove duplicates)
      const uniqueExternalBlogs = externalBlogs.filter((post, index, self) =>
        index === self.findIndex(p => p.source === post.source && p.title === post.title)
      )
      
      return uniqueExternalBlogs.map((post, index) => {
        let platform = 'External'
        if (post.source.includes('testproject.io')) platform = 'TestProject'
        else if (post.source.includes('applitools.com')) platform = 'Applitools'
        else if (post.source.includes('lambdatest.com')) platform = 'TestMu AI'

        return {
          id: `external-${index}`,
          title: post.title,
          tags: post.tags.split(', '),
          url: post.source,
          source: 'external' as const,
          platform
        }
      })
    }
  }

  static async getRecentBlogs(limit = 6): Promise<UnifiedBlogPost[]> {
    const allBlogs = await this.getAllBlogs()
    return allBlogs.slice(0, limit)
  }
}