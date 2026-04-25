import { useEffect, useState, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'

interface Video {
  title: string
  event: string
  url: string
  tags: string[]
  year: number
}

const VIDEOS: Video[] = [
  {
    title: 'Test Inside Containers: Dockerize Appium Tests',
    event: 'SeleniumConf Austin 2017',
    url: 'https://youtu.be/jGW6ycW_tTQ',
    tags: ['Docker', 'Appium', 'Mobile'],
    year: 2017,
  },
  {
    title: 'Future of Mobile Automation Testing',
    event: 'FOSDEM 2017',
    url: 'https://video.fosdem.org/2017/H.2213/mobile_testing_with_appium.mp4',
    tags: ['Appium', 'Mobile', 'Open Source'],
    year: 2017,
  },
  {
    title: 'Addressing unconscious bias and ethics in testing',
    event: 'XConf Singapore 2023',
    url: 'https://youtu.be/QMr30Za_-vM',
    tags: ['Ethics', 'Testing'],
    year: 2023,
  },
  {
    title: 'Elevate your testing game: Building Appium 2.0 plugin Live',
    event: 'TestMu Conf 2023',
    url: 'https://www.youtube.com/watch?v=b6yWXfLpazc',
    tags: ['Appium', 'Plugins'],
    year: 2023,
  },
  {
    title: 'Unveiling the Power of Web Performance Metrics',
    event: 'Spartans Summit 2024',
    url: 'https://www.youtube.com/watch?v=uo_lX1pUv9o',
    tags: ['Performance', 'Web'],
    year: 2024,
  },
  {
    title: 'Beyond DOM: Leveraging Open-Source LLMs in an AI-Powered Appium Plugin',
    event: 'SeleniumConf Valencia 2025',
    url: 'https://youtu.be/lugEm6j1Nl8',
    tags: ['AI', 'Appium', 'LLM'],
    year: 2025,
  },
  {
    title: 'Building and Testing AI-Agent Powered LLM Applications',
    event: 'Spartans Summit 2025',
    url: 'https://www.youtube.com/watch?v=9mHfvGN7FwU',
    tags: ['AI', 'LLM', 'Agents'],
    year: 2025,
  },
  {
    title: "What's it like to maintain an award-winning open source tool?",
    event: 'Thoughtworks Podcast',
    url: 'https://www.thoughtworks.com/insights/podcasts/technology-podcasts/whats-like-maintain-award-winning-open-source-tool',
    tags: ['Open Source', 'Podcast'],
    year: 2023,
  },
]

/**
 * Extract a YouTube video ID from a URL.
 * Returns null for non-YouTube URLs.
 */
function getYouTubeId(url: string): string | null {
  // youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (shortMatch) return shortMatch[1]

  // youtube.com/watch?v=VIDEO_ID
  const longMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/)
  if (longMatch) return longMatch[1]

  return null
}

function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

/** Collect all unique tags from the video list */
function getAllTags(videos: Video[]): string[] {
  const tagSet = new Set<string>()
  videos.forEach((v) => v.tags.forEach((t) => tagSet.add(t)))
  return Array.from(tagSet).sort()
}

const ALL_TAGS = getAllTags(VIDEOS)

const Videos = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = setTimeout(() => setIsLoaded(true), 50)
    return () => clearTimeout(timer)
  }, [])

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.section-animate, .stagger-animate')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const filteredVideos = useMemo(() => {
    return VIDEOS.filter((video) => {
      const matchesSearch =
        search === '' ||
        video.title.toLowerCase().includes(search.toLowerCase()) ||
        video.event.toLowerCase().includes(search.toLowerCase())
      const matchesTag = activeTag === null || video.tags.includes(activeTag)
      return matchesSearch && matchesTag
    })
  }, [search, activeTag])

  return (
    <div className='min-h-screen bg-black text-white overflow-hidden'>
      {/* Ambient background */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 -left-32 w-96 h-96 bg-[#d4956a]/[0.04] rounded-full blur-3xl' />
        <div className='absolute bottom-1/3 -right-32 w-96 h-96 bg-[#d4956a]/[0.03] rounded-full blur-3xl' />
      </div>

      {/* Navigation */}
      <nav className='fixed top-0 left-0 right-0 z-50 px-6 py-4 glass-nav'>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          <Link
            to='/'
            className='flex items-center gap-2 text-white/60 hover:text-white transition-colors'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
            <span className='text-sm font-medium'>Back</span>
          </Link>
          <div className='text-sm text-white/40 font-mono'>VIDEOS</div>
        </div>
      </nav>

      {/* Main Content */}
      <div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16'>
        {/* Header */}
        <div
          className={`mb-10 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <h1 className='text-4xl sm:text-5xl font-heading font-bold mb-3'>
            <span className='title-animate visible text-gradient'>Videos & Talks</span>
          </h1>
          <p className='text-white/50 text-base sm:text-lg max-w-2xl'>
            Conference talks, workshops, and podcasts on test automation, Appium, AI, and open source.
          </p>
        </div>

        {/* Search */}
        <div
          className={`mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className='relative max-w-md'>
            <svg
              className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
            <input
              type='text'
              placeholder='Search by title or event...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full pl-11 pr-4 py-3 rounded-xl glass-input text-sm text-white placeholder-white/30 focus:ring-0'
            />
          </div>
        </div>

        {/* Tag Filters */}
        <div
          className={`flex flex-wrap gap-2 mb-10 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <button
            onClick={() => setActiveTag(null)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              activeTag === null
                ? 'bg-[#d4956a] text-white border border-[#d4956a]'
                : 'glass-pill text-white/60 hover:text-white'
            }`}
          >
            All
          </button>
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeTag === tag
                  ? 'bg-[#d4956a] text-white border border-[#d4956a]'
                  : 'glass-pill text-white/60 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div
          ref={gridRef}
          className={`section-animate ${isLoaded ? 'visible' : ''}`}
        >
          {filteredVideos.length === 0 ? (
            <div className='text-center py-20'>
              <svg
                className='w-16 h-16 mx-auto mb-4 text-white/10'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1}
                  d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
                />
              </svg>
              <h2 className='text-xl font-bold mb-2 text-white/60'>No videos found</h2>
              <p className='text-white/30 text-sm'>Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animate visible'>
              {filteredVideos.map((video, i) => {
                const ytId = getYouTubeId(video.url)
                const isYouTube = ytId !== null

                return (
                  <a
                    key={i}
                    href={video.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group glass-card-hover rounded-2xl overflow-hidden block'
                  >
                    {/* Thumbnail */}
                    <div className='relative aspect-video overflow-hidden bg-white/[0.03]'>
                      {isYouTube ? (
                        <img
                          src={getYouTubeThumbnail(ytId)}
                          alt={video.title}
                          className='w-full h-full object-cover transition-all duration-500 group-hover:scale-105 saturate-[0.7] group-hover:saturate-100'
                          loading='lazy'
                        />
                      ) : (
                        <div className='w-full h-full bg-gradient-to-br from-[#d4956a]/20 via-[#d4956a]/10 to-black flex items-center justify-center'>
                          <div className='w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300'>
                            <svg
                              className='w-7 h-7 text-white/80 ml-1'
                              fill='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path d='M8 5v14l11-7z' />
                            </svg>
                          </div>
                        </div>
                      )}

                      {/* Play overlay for YouTube videos */}
                      {isYouTube && (
                        <div className='absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                          <div className='w-14 h-14 rounded-full bg-[#d4956a]/90 flex items-center justify-center shadow-lg shadow-black/30 scale-90 group-hover:scale-100 transition-transform duration-300'>
                            <svg
                              className='w-6 h-6 text-white ml-0.5'
                              fill='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path d='M8 5v14l11-7z' />
                            </svg>
                          </div>
                        </div>
                      )}

                      {/* Year badge */}
                      <div className='absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-xs font-mono text-white/70'>
                        {video.year}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className='p-5'>
                      <p className='text-xs text-[#e8b898] font-medium mb-2 uppercase tracking-wider'>
                        {video.event}
                      </p>
                      <h3 className='text-sm sm:text-base font-semibold text-white/90 group-hover:text-white leading-snug mb-3 line-clamp-2 transition-colors duration-200'>
                        {video.title}
                      </h3>
                      <div className='flex flex-wrap gap-1.5'>
                        {video.tags.map((tag) => (
                          <span
                            key={tag}
                            className='px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/[0.06] text-white/50 border border-white/[0.06]'
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          )}
        </div>

        {/* Results count */}
        {filteredVideos.length > 0 && (
          <div
            className={`mt-8 text-center transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <p className='text-white/20 text-xs font-mono tracking-wider'>
              {filteredVideos.length} of {VIDEOS.length} videos
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Videos
