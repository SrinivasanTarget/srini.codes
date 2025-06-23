export interface BlogPost {
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
          node: BlogPost
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

const POSTS_QUERY = `
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
            content {
              html
              markdown
            }
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
    posts: BlogPost[]
    hasNextPage: boolean
    endCursor: string
  }> {
    const data: HashnodeResponse = await this.makeRequest(POSTS_QUERY, {
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

  static async getAllPosts(): Promise<BlogPost[]> {
    let allPosts: BlogPost[] = []
    let hasNextPage = true
    let after: string | undefined

    while (hasNextPage) {
      const result = await this.getPosts(20, after)
      allPosts = [...allPosts, ...result.posts]
      hasNextPage = result.hasNextPage
      after = result.endCursor
    }

    return allPosts
  }
}