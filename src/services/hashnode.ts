/** A post as it appears in list views: no body, just card metadata. */
export interface BlogPostSummary {
  id: string
  title: string
  brief: string
  slug: string
  publishedAt: string
  coverImage?: {
    url: string
  }
  tags: Array<{
    name: string
    slug: string
  }>
  readTimeInMinutes: number
  url: string
}

/** A single post with its body, fetched only when a post is opened. */
export interface BlogPost extends BlogPostSummary {
  content: {
    html: string
    markdown: string
  }
}

export interface HashnodeResponse {
  data: {
    publication: {
      posts: {
        edges: Array<{
          node: BlogPostSummary
        }>
        pageInfo: {
          hasNextPage: boolean
          endCursor: string
        }
      }
    }
  }
}

const HASHNODE_API_URL = 'https://gql.hashnode.com/'

// Replace with your actual Hashnode publication host
const PUBLICATION_HOST = 'blog.srini.codes'

// List views render title, brief, cover and tags only. Asking for
// `content` here pulls every post's full body as both HTML and markdown,
// which is orders of magnitude larger than everything actually rendered.
const POSTS_LIST_QUERY = `
  query GetPosts($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      posts(first: $first, after: $after) {
        edges {
          node {
            id
            title
            brief
            slug
            publishedAt
            coverImage {
              url
            }
            tags {
              name
              slug
            }
            readTimeInMinutes
            url
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`

const POST_BY_SLUG_QUERY = `
  query GetPostBySlug($host: String!, $slug: String!) {
    publication(host: $host) {
      post(slug: $slug) {
        id
        title
        brief
        slug
        publishedAt
        coverImage {
          url
        }
        tags {
          name
          slug
        }
        readTimeInMinutes
        url
        content {
          html
          markdown
        }
      }
    }
  }
`

export class HashnodeService {
  private static async makeRequest(query: string, variables: Record<string, any>) {
    try {
      const response = await fetch(HASHNODE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.errors) {
        throw new Error(`GraphQL error: ${data.errors[0].message}`)
      }

      return data
    } catch (error) {
      console.error('Hashnode API request failed:', error)
      throw error
    }
  }

  static async getPosts(first = 10, after?: string): Promise<{
    posts: BlogPostSummary[]
    hasNextPage: boolean
    endCursor: string
  }> {
    const data: HashnodeResponse = await this.makeRequest(POSTS_LIST_QUERY, {
      host: PUBLICATION_HOST,
      first,
      after,
    })

    const posts = data.data.publication.posts.edges.map(edge => edge.node)
    const { hasNextPage, endCursor } = data.data.publication.posts.pageInfo

    return {
      posts,
      hasNextPage,
      endCursor,
    }
  }

  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const data = await this.makeRequest(POST_BY_SLUG_QUERY, {
      host: PUBLICATION_HOST,
      slug,
    })

    return data.data.publication.post
  }

  /**
   * Walks the publication's pages. Pagination is inherently serial (each page
   * needs the previous cursor), so `limit` lets callers that only need the
   * first few posts stop after a single request instead of fetching the
   * entire archive.
   */
  static async getAllPosts(limit?: number): Promise<BlogPostSummary[]> {
    const allPosts: BlogPostSummary[] = []
    const pageSize = limit ? Math.min(limit, 20) : 20
    let hasNextPage = true
    let after: string | undefined

    while (hasNextPage) {
      const result = await this.getPosts(pageSize, after)
      allPosts.push(...result.posts)
      if (limit && allPosts.length >= limit) break
      hasNextPage = result.hasNextPage
      after = result.endCursor
    }

    return limit ? allPosts.slice(0, limit) : allPosts
  }
}