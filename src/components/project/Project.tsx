import React from 'react'
import { useState } from 'react'

type project = {
  source: string
  imgSource: string
  description: string
  title: string
}

export default function Project({ project }: { project: project }) {
  const [count, setCount] = useState(0)
  const [forkCount, setForkCount] = useState(0)
  const [language, setLanguage] = useState('')
  // TODO: Add error state for API fetch failures
  React.useEffect(() => {
    async function init() {
      try {
        const sourcePath = `${project.source}`.split('github.com/')[1]
        if (!sourcePath) {
          console.error(`Invalid GitHub source URL: ${project.source}`);
          return; // Skip if URL is not as expected
        }
        const response = await fetch(`https://api.github.com/repos/${sourcePath}`)
        if (!response.ok) {
          console.error(`Failed to fetch GitHub data for ${project.title} (${project.source}): ${response.status} ${response.statusText}`);
          // Consider setting an error state here to display in the UI
        } else {
          const jsonResponse = await response.json()
          setCount(jsonResponse.stargazers_count || 0)
          setForkCount(jsonResponse.forks_count || 0) // Ensure forks_count is used
          setLanguage(jsonResponse.language || 'N/A')
        }
      } catch (error) {
        console.error(`Exception while fetching GitHub repository ${project.title} (${project.source}):`, error);
        // Consider setting an error state here
      }
    }
    if (project.source.includes('github.com')) { // Only fetch if it's a github link
        init()
    }
  }, [project.source]) // Added project.source to dependency array

  return (
    <div className='col-span-4 mb-5 text-custom-gray-light transition-transform duration-300 ease-in-out hover:scale-105'>
      {/* Retaining the gradient border */}
      <div className='p-0.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 rounded-xl h-full'>
        {/* Changed inner background to custom-black */}
        <div className='p-0.5 bg-custom-black rounded-xl h-full flex flex-col'>
          <a href={project.source} target='_blank' rel='noreferrer' className="flex flex-col flex-grow p-3">
            <img
              decoding='async'
              loading='lazy' // Added lazy loading
              className='rounded-full h-20 w-20 md:h-24 md:w-24 p-1 mx-auto border-2 border-custom-gray-dark' // Adjusted size and added border
              src={new URL(`../../assets/images/${project.imgSource}`, import.meta.url).href}
              alt={`${project.title} logo`} // Improved alt text
            />
            <div className='mt-2 text-center leading-tight text-lg text-custom-highlight font-semibold'>
              {project.title}
            </div>
            {/* Adjusted description height and overflow */}
            <p className='text-sm p-2 font-lora min-h-[4.5rem] text-custom-gray-medium flex-grow text-center'> 
              {project.description}
            </p>
            {project.source.includes('github.com') && ( // Conditionally render stats
              <div className='px-1 pt-2 flex flex-wrap justify-center items-center text-xs text-custom-gray-medium'>
                <div className='mb-1 mr-2 px-2 py-1 rounded-md bg-custom-gray-dark flex items-center'>
                  <svg className='h-3.5 w-3.5 mr-1' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' />
                  </svg>
                  Stars: {count}
                </div>
                <div className='mb-1 mr-2 px-2 py-1 rounded-md bg-custom-gray-dark flex items-center'>
                  <svg className='h-3.5 w-3.5 mr-1' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                     {/* Fork icon (simplified) */}
                    <path d="M6 3v5M6 3l3.5 3.5M6 3L2.5 6.5M18 21v-5m0 5l3.5-3.5m-3.5 3.5L14.5 17.5M12 12c-3 0-6-3-6-6s3-6 6-6 6 3 6 6-3 6-6 6z"/>
                  </svg>
                  Forks: {forkCount}
                </div>
                {language !== 'N/A' && (
                  <div className='mb-1 px-2 py-1 rounded-md bg-custom-gray-dark'>
                    {language}
                  </div>
                )}
              </div>
            )}
          </a>
        </div>
      </div>
    </div>
  )
}
