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
    title: "Appium 2.0 - What's New and Migration Guide",
    description:
      'Learn about the new features in Appium 2.0 and how to migrate your existing Appium tests to the new version.',
    url: 'https://www.youtube.com/watch?v=kkJabDETi70',
    thumbnail: 'https://img.youtube.com/vi/kkJabDETi70/maxresdefault.jpg',
    duration: '45:30',
    publishedAt: '2023-05-15',
    tags: ['Appium', 'Mobile Testing', 'Automation', 'Testing'],
  },
  {
    id: '2',
    title: 'Appium Conference 2023 - Advanced Mobile Automation Techniques',
    description:
      'Deep dive into advanced mobile automation techniques presented at Appium Conference 2023.',
    url: 'https://www.youtube.com/watch?v=9mHfvGN7FwU',
    thumbnail: 'https://img.youtube.com/vi/9mHfvGN7FwU/maxresdefault.jpg',
    duration: '39:44',
    publishedAt: '2023-09-20',
    tags: ['Appium', 'Conference', 'Mobile Testing', 'Automation'],
  },
  {
    id: '3',
    title: 'Building Scalable Mobile Test Frameworks',
    description:
      'How to build scalable and maintainable mobile test automation frameworks using Appium and best practices.',
    url: 'https://www.youtube.com/watch?v=tGTJ_g2egXs',
    thumbnail: 'https://img.youtube.com/vi/tGTJ_g2egXs/maxresdefault.jpg',
    duration: '52:15',
    publishedAt: '2023-11-10',
    tags: ['Appium', 'Framework', 'Testing', 'Architecture'],
  },
  {
    id: '4',
    title: 'Appium Device Farm - Distributed Mobile Testing',
    description:
      'Learn how to set up and use Appium Device Farm for distributed mobile testing across multiple devices.',
    url: 'https://www.youtube.com/watch?v=JpYpLM--atE',
    thumbnail: 'https://img.youtube.com/vi/JpYpLM--atE/maxresdefault.jpg',
    duration: '41:20',
    publishedAt: '2024-01-05',
    tags: ['Appium', 'Device Farm', 'Mobile Testing', 'Distributed Testing'],
  },
  {
    id: '5',
    title: 'Mobile Test Automation with Appium',
    description:
      'Learn how to automate mobile applications using Appium framework with practical examples and best practices.',
    url: 'https://www.youtube.com/watch?v=aqys1ZOjgVk',
    thumbnail: 'https://img.youtube.com/vi/aqys1ZOjgVk/maxresdefault.jpg',
    duration: '35:50',
    publishedAt: '2024-02-12',
    tags: ['Appium', 'Mobile Testing', 'Automation', 'Testing'],
  },
  {
    id: '6',
    title: 'Appium Gestures Plugin - Advanced Mobile Interactions',
    description:
      'Deep dive into Appium Gestures Plugin for advanced mobile interactions and touch gestures automation.',
    url: 'https://www.youtube.com/watch?v=b6yWXfLpazc',
    thumbnail: 'https://img.youtube.com/vi/b6yWXfLpazc/maxresdefault.jpg',
    duration: '48:30',
    publishedAt: '2024-03-18',
    tags: ['Appium', 'Gestures', 'Mobile Testing', 'Plugin'],
  },
  {
    id: '7',
    title: 'Selenium Conference 2024 - Mobile Testing Strategies',
    description:
      'Presentation at Selenium Conference 2024 about effective mobile testing strategies using Appium and Selenium.',
    url: 'https://www.youtube.com/watch?v=vk4LL59-tVU',
    thumbnail: 'https://img.youtube.com/vi/vk4LL59-tVU/maxresdefault.jpg',
    duration: '39:46',
    publishedAt: '2024-04-22',
    tags: ['Selenium', 'Conference', 'Appium', 'Mobile Testing'],
  },
  {
    id: '8',
    title: 'Appium Wait Plugin - Efficient Test Synchronization',
    description:
      'How to use Appium Wait Plugin for efficient test synchronization and reduced flakiness in mobile tests.',
    url: 'https://www.youtube.com/watch?v=DWoqcZc3D5Y',
    thumbnail: 'https://img.youtube.com/vi/DWoqcZc3D5Y/maxresdefault.jpg',
    duration: '42:15',
    publishedAt: '2024-05-10',
    tags: ['Appium', 'Wait Plugin', 'Test Synchronization', 'Mobile Testing'],
  },
  {
    id: '9',
    title: 'Beyond DOM: Leveraging Open-Source LLMs in an AI-Powered Appium Plugin',
    description:
      'Sri Sekar & Sai Krishna present how to leverage open-source LLMs in an AI-powered Appium plugin for advanced mobile testing capabilities.',
    url: 'https://www.youtube.com/watch?v=f5s6goLje0E',
    thumbnail: 'https://img.youtube.com/vi/f5s6goLje0E/maxresdefault.jpg',
    duration: '45:30',
    publishedAt: '2024-06-05',
    tags: ['Appium', 'AI', 'LLM', 'Plugin', 'Mobile Testing'],
  },
  {
    id: '10',
    title: 'New Video',
    description: 'Mobile testing and automation content.',
    url: 'https://www.youtube.com/watch?v=_MPp7DDueUI',
    thumbnail: 'https://img.youtube.com/vi/_MPp7DDueUI/maxresdefault.jpg',
    publishedAt: '2024-10-28',
    tags: ['Appium', 'Mobile Testing', 'Automation'],
  },
  {
    id: '11',
    title: 'New Video',
    description: 'Mobile testing and automation content.',
    url: 'https://www.youtube.com/watch?v=Mh80FseDxTI',
    thumbnail: 'https://img.youtube.com/vi/Mh80FseDxTI/maxresdefault.jpg',
    publishedAt: '2024-10-28',
    tags: ['Appium', 'Mobile Testing', 'Automation'],
  },
  {
    id: '12',
    title: 'New Video',
    description: 'Mobile testing and automation content.',
    url: 'https://www.youtube.com/watch?v=VrPrYtVyRyw',
    thumbnail: 'https://img.youtube.com/vi/VrPrYtVyRyw/maxresdefault.jpg',
    publishedAt: '2024-10-28',
    tags: ['Appium', 'Mobile Testing', 'Automation'],
  },
  {
    id: '13',
    title: 'New Video',
    description: 'Mobile testing and automation content.',
    url: 'https://www.youtube.com/watch?v=UqxTXkhjjYQ',
    thumbnail: 'https://img.youtube.com/vi/UqxTXkhjjYQ/maxresdefault.jpg',
    publishedAt: '2024-10-28',
    tags: ['Appium', 'Mobile Testing', 'Automation'],
  },
  {
    id: '14',
    title: 'New Video',
    description: 'Mobile testing and automation content.',
    url: 'https://www.youtube.com/watch?v=gMPMBenIjCE',
    thumbnail: 'https://img.youtube.com/vi/gMPMBenIjCE/maxresdefault.jpg',
    publishedAt: '2024-10-28',
    tags: ['Appium', 'Mobile Testing', 'Automation'],
  },
  {
    id: '15',
    title: 'New Short',
    description: 'Quick mobile testing tip.',
    url: 'https://www.youtube.com/shorts/FGSD7sbfYoc',
    thumbnail: 'https://img.youtube.com/vi/FGSD7sbfYoc/maxresdefault.jpg',
    publishedAt: '2024-10-28',
    tags: ['Appium', 'Shorts', 'Mobile Testing'],
  },
  {
    id: '16',
    title: 'New Short',
    description: 'Quick mobile testing tip.',
    url: 'https://www.youtube.com/shorts/glWOVOyCgxM',
    thumbnail: 'https://img.youtube.com/vi/glWOVOyCgxM/maxresdefault.jpg',
    publishedAt: '2024-10-28',
    tags: ['Appium', 'Shorts', 'Mobile Testing'],
  },
  {
    id: '17',
    title: 'New Short',
    description: 'Quick mobile testing tip.',
    url: 'https://www.youtube.com/shorts/L4YNC0ogPx0',
    thumbnail: 'https://img.youtube.com/vi/L4YNC0ogPx0/maxresdefault.jpg',
    publishedAt: '2024-10-28',
    tags: ['Appium', 'Shorts', 'Mobile Testing'],
  },
  {
    id: '18',
    title: 'New Video',
    description: 'Shared video link.',
    url: 'https://www.youtube.com/watch?v=qcoKFS6VI0A',
    thumbnail: 'https://img.youtube.com/vi/qcoKFS6VI0A/maxresdefault.jpg',
    publishedAt: '2025-11-01',
    tags: ['YouTube', 'Video'],
  },
  {
    id: '19',
    title: 'New Video',
    description: 'Shared video link.',
    url: 'https://www.youtube.com/watch?v=lugEm6j1Nl8',
    thumbnail: 'https://img.youtube.com/vi/lugEm6j1Nl8/maxresdefault.jpg',
    publishedAt: '2025-11-01',
    tags: ['YouTube', 'Video'],
  }
]
