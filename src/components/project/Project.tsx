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
  React.useEffect(() => {
    async function init() {
      try {
        const source = `${project.source}`.split('github.com/')
        const response = await fetch(`https://api.github.com/repos/${source[1]}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch stars: ${project.source}`)
        } else {
          const jsonResponse = await response.json()
          setCount(jsonResponse.stargazers_count)
          setForkCount(jsonResponse.forks)
          setLanguage(jsonResponse.language)
        }
      } catch (error) {
        throw new Error(`Failed to fetch repository: ${project.source}`)
      }
    }
    init()
  }, [])
  return (
    <div className='col-span-4 mb-5 text-white'>
      <div className='p-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl'>
        <div className='p-0.5 bg-gray-800 rounded-xl'>
          <a href={project.source} target='_blank' rel='noreferrer'>
            <img
              decoding='async'
              className='rounded-full h-24 md:w-24 p-2 mx-auto'
              src={new URL(`../../assets/images/${project.imgSource}`, import.meta.url).href}
              alt={project.title}
            />
            <div className='p-3 text-center leading-tight text-lg text-yellow-50'>
              {project.title}
            </div>
            <p className='text-lg p-3 font-lora h-28'>{project.description}</p>
            <div className='pl-3 flex flex-wrap'>
              <div className='mb-1 mr-2 px-2 py-1 text-sm rounded-lg bg-gradient-to-r from-gray-800 via-gray-800 to-black'>
                <div className='flex items-center'>
                  <svg
                    className='h-4 w-5 object-bottom'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' />
                  </svg>
                  Stars | {count}
                </div>
              </div>
              <div className='mb-1 mr-2 px-2 py-1 text-sm rounded-lg bg-gradient-to-r from-gray-800 via-gray-800 to-black'>
                <div className='flex items-center'>
                  <svg
                    className='h-4 w-5 object-bottom'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' />
                  </svg>
                  Forks | {forkCount}
                </div>
              </div>
              <div className='mb-1 mr-2 px-2 py-1 text-sm rounded-lg bg-gradient-to-r from-gray-800 via-gray-800 to-black'>
                {language}
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
