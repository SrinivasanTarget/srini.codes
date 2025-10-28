import React from 'react'
import { Video } from '../../portfolio/videos'

interface VideoCardProps {
  video: Video
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const handleVideoClick = () => {
    window.open(video.url, '_blank', 'noopener,noreferrer')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div 
      className='bg-gray-900/50 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer overflow-hidden'
      onClick={handleVideoClick}
    >
      {/* Video Thumbnail */}
      <div className='relative aspect-video overflow-hidden'>
        <img
          src={video.thumbnail}
          alt={video.title}
          className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
          onError={(e) => {
            // Fallback to a default thumbnail if the image fails to load
            const target = e.target as HTMLImageElement
            target.src = 'https://via.placeholder.com/640x360/1f2937/9ca3af?text=Video+Thumbnail'
          }}
        />
        
        {/* Play Button Overlay */}
        <div className='absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300'>
          <div className='w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg'>
            <svg className='w-6 h-6 text-white ml-1' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M8 5v14l11-7z'/>
            </svg>
          </div>
        </div>

        {/* Duration Badge */}
        {video.duration && (
          <div className='absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded'>
            {video.duration}
          </div>
        )}
      </div>

      {/* Video Content */}
      <div className='p-6'>
        {/* Tags */}
        <div className='flex flex-wrap gap-2 mb-4'>
          {video.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className='bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs'
            >
              {tag}
            </span>
          ))}
          {video.tags.length > 3 && (
            <span className='text-gray-500 text-xs px-2 py-1'>
              +{video.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Published Date */}
        <div className='text-gray-500 text-sm'>
          Published on {formatDate(video.publishedAt)}
        </div>
      </div>
    </div>
  )
}

export default VideoCard
