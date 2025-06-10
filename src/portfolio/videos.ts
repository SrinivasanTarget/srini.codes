export interface Video {
  id: string
  title: string
  description: string
  url: string
  thumbnail: string
  duration?: string
  publishedAt: string
  tags: string[]
}

export const videos: Video[] = [
  {
    id: '1',
    title: 'Mobile Test Automation with Appium',
    description: 'Learn how to automate mobile applications using Appium framework with practical examples and best practices.',
    url: 'https://www.youtube.com/watch?v=aqys1ZOjgVk',
    thumbnail: 'https://img.youtube.com/vi/aqys1ZOjgVk/maxresdefault.jpg',
    duration: '45:30',
    publishedAt: '2024-01-15',
    tags: ['Appium', 'Mobile Testing', 'Automation', 'Testing']
  },
  {
    id: '2',
    title: 'Advanced Selenium WebDriver Techniques',
    description: 'Deep dive into advanced Selenium WebDriver techniques for robust web automation testing.',
    url: 'https://www.youtube.com/watch?v=example2',
    thumbnail: 'https://img.youtube.com/vi/example2/maxresdefault.jpg',
    duration: '38:45',
    publishedAt: '2024-02-20',
    tags: ['Selenium', 'WebDriver', 'Web Testing', 'Automation']
  },
  {
    id: '3',
    title: 'Building Test Frameworks with TypeScript',
    description: 'How to build scalable and maintainable test automation frameworks using TypeScript.',
    url: 'https://www.youtube.com/watch?v=example3',
    thumbnail: 'https://img.youtube.com/vi/example3/maxresdefault.jpg',
    duration: '52:15',
    publishedAt: '2024-03-10',
    tags: ['TypeScript', 'Framework', 'Testing', 'Architecture']
  },
  {
    id: '4',
    title: 'CI/CD for Test Automation',
    description: 'Implementing continuous integration and deployment pipelines for test automation projects.',
    url: 'https://www.youtube.com/watch?v=example4',
    thumbnail: 'https://img.youtube.com/vi/example4/maxresdefault.jpg',
    duration: '41:20',
    publishedAt: '2024-04-05',
    tags: ['CI/CD', 'DevOps', 'Automation', 'Pipeline']
  },
  {
    id: '5',
    title: 'API Testing with REST Assured',
    description: 'Complete guide to API testing using REST Assured framework with real-world examples.',
    url: 'https://www.youtube.com/watch?v=example5',
    thumbnail: 'https://img.youtube.com/vi/example5/maxresdefault.jpg',
    duration: '35:50',
    publishedAt: '2024-05-12',
    tags: ['API Testing', 'REST Assured', 'Java', 'Testing']
  },
  {
    id: '6',
    title: 'Docker for Test Automation',
    description: 'Containerizing test automation environments using Docker for consistent and scalable testing.',
    url: 'https://www.youtube.com/watch?v=example6',
    thumbnail: 'https://img.youtube.com/vi/example6/maxresdefault.jpg',
    duration: '48:30',
    publishedAt: '2024-06-18',
    tags: ['Docker', 'Containerization', 'Testing', 'DevOps']
  }
]
