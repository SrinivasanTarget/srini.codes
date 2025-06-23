import { projects } from '../portfolio/projects'

export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
}

export interface EnhancedProjectData {
  title: string
  description: string
  source: string
  imgSource: string
  githubData?: {
    stars: number
    forks: number
    language: string | null
    topics: string[]
    lastUpdated: string
    openIssues: number
  }
  category: 'mcp' | 'appium' | 'testing' | 'automation' | 'other'
  isContributor: boolean
  logo: string
}

export class EnhancedProjectsService {
  private static async makeRequest(endpoint: string): Promise<any> {
    try {
      const response = await fetch(`https://api.github.com${endpoint}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'srini.codes-portfolio'
        }
      })

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('GitHub API request failed:', error)
      throw error
    }
  }

  private static async getRepository(owner: string, repo: string): Promise<GitHubRepository> {
    return await this.makeRequest(`/repos/${owner}/${repo}`)
  }
  private static extractRepoInfo(url: string): { owner: string; repo: string } | null {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/)
    if (match) {
      return { owner: match[1], repo: match[2] }
    }
    return null
  }

  private static categorizeProject(title: string): 'mcp' | 'appium' | 'testing' | 'automation' | 'other' {
    const titleLower = title.toLowerCase()
    if (titleLower.includes('mcp')) return 'mcp'
    if (titleLower.includes('appium')) return 'appium'
    if (titleLower.includes('testing') || titleLower.includes('angular testing')) return 'testing'
    if (titleLower.includes('selenium') || titleLower.includes('webdriver')) return 'automation'
    return 'other'
  }

  private static getProjectLogo(title: string): string {
    const titleLower = title.toLowerCase()
    if (titleLower.includes('mcp')) return '🤖'
    if (titleLower.includes('appium')) return '📱'
    if (titleLower.includes('selenium')) return '🌐'
    if (titleLower.includes('webdriver')) return '⚡'
    if (titleLower.includes('angular')) return '🅰️'
    return '🔧'
  }

  private static isContributor(source: string): boolean {
    // Check if the project is owned by the user or if they're a contributor
    const contributorOrgs = ['AppiumTestDistribution']
    const ownedRepos = ['mcp-webdriveragent', 'mcp-appium-gestures']
    
    return contributorOrgs.some(org => source.includes(org)) || 
           ownedRepos.some(repo => source.includes(repo)) ||
           source.includes('srinivasanTarget')
  }

  static async getEnhancedProjects(): Promise<EnhancedProjectData[]> {
    const enhancedProjects: EnhancedProjectData[] = []

    for (const project of projects) {
      const repoInfo = this.extractRepoInfo(project.source)
      let githubData = undefined

      if (repoInfo) {
        try {
          const repo: GitHubRepository = await this.getRepository(repoInfo.owner, repoInfo.repo)
          githubData = {
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            topics: repo.topics || [],
            lastUpdated: repo.updated_at,
            openIssues: repo.open_issues_count
          }
        } catch (error) {
          console.warn(`Could not fetch GitHub data for ${project.title}:`, error)
        }
      }

      enhancedProjects.push({
        title: project.title,
        description: project.description,
        source: project.source,
        imgSource: project.imgSource,
        githubData,
        category: this.categorizeProject(project.title),
        isContributor: this.isContributor(project.source),
        logo: this.getProjectLogo(project.title)
      })
    }

    return enhancedProjects
  }

  static formatNumber(num: number): string {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  static getLanguageColor(language: string | null): string {
    const colors: Record<string, string> = {
      'JavaScript': '#f1e05a',
      'TypeScript': '#2b7489',
      'Python': '#3572A5',
      'Java': '#b07219',
      'Swift': '#ffac45',
      'Kotlin': '#F18E33',
      'Go': '#00ADD8',
      'Rust': '#dea584',
      'C++': '#f34b7d',
      'C#': '#239120',
      'Ruby': '#701516',
      'PHP': '#4F5D95',
      'Shell': '#89e051',
      'HTML': '#e34c26',
      'CSS': '#1572B6'
    }
    return colors[language || ''] || '#6b7280'
  }
}