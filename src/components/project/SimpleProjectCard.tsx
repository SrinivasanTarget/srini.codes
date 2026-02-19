import React from 'react'
import { EnhancedProjectData } from '../../services/enhancedProjects'

interface SimpleProjectCardProps {
  project: EnhancedProjectData
}

export default function SimpleProjectCard({ project }: SimpleProjectCardProps) {
  const getShortDescription = (description: string): string => {
    // Extract the first sentence or limit to ~60 characters
    const firstSentence = description.split('.')[0]
    if (firstSentence.length > 60) {
      return firstSentence.substring(0, 60) + '...'
    }
    return firstSentence + '.'
  }

  return (
    <a
      href={project.source}
      target='_blank'
      rel='noopener noreferrer'
      className='group block bg-gray-900/30 rounded-xl p-6 border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105 hover:bg-gray-900/50'
    >
      {/* Project Logo/Image */}
      <div className='flex justify-center mb-4'>
        <div className='relative w-16 h-16 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center'>
          <img
            src={`/assets/images/${project.imgSource}`}
            alt={project.title}
            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
            onError={(e) => {
              // Fallback to emoji logo if image fails
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement!
              parent.innerHTML = `<div class="text-2xl">${project.logo}</div>`
            }}
          />
        </div>
      </div>

      {/* Project Title */}
      <h3 className='text-lg font-heading font-bold text-white text-center mb-2 group-hover:text-white transition-colors duration-200'>
        {project.title}
      </h3>

      {/* Short Description */}
      <p className='text-sm text-gray-400 text-center leading-relaxed'>
        {getShortDescription(project.description)}
      </p>

      {/* GitHub Stats (minimal) */}
      {project.githubData && (
        <div className='flex justify-center items-center space-x-4 mt-3 text-xs text-gray-500'>
          <div className='flex items-center space-x-1'>
            <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
            </svg>
            <span>{project.githubData.stars > 1000 ? `${(project.githubData.stars / 1000).toFixed(1)}k` : project.githubData.stars}</span>
          </div>
          {project.githubData.language && (
            <span>{project.githubData.language}</span>
          )}
        </div>
      )}
    </a>
  )
}