import React from 'react'
import NavigationArrow from '../../components/navigationArrow/NavigationArrow'
import { conferences } from '../../portfolio/conferences'

export default function Conferences() {
  return (
    <div className='relative mx-10vw pb-16' id='opensource'>
      <div className='relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-4 mx-auto max-w-7xl'>
        <div className='col-span-full flex flex-col space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0 mb-16'>
          <div className='space-y-2 lg:space-y-0  pl-2'>
            <h2 className='leading-tight text-3xl md:text-4xl text-white'>Conferences</h2>
            <p className='leading-tight text-3xl md:text-4xl text-gray-400'>
              I love sharing my knowledge in conferences
            </p>
          </div>
          <NavigationArrow arrow={{ link: 'talks', context: 'See all conferences' }} />
        </div>
      </div>
      <div className='relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl gap-5 p-3'>
        {conferences.slice(0, 2).map((conference, i) => {
          return (
            <div key={i} className='col-span-full lg:col-span-6'>
              <div className='p-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-secondary text-primary flex h-full w-full flex-col justify-between rounded-xl text-white'>
                <div className='p-0.5 bg-gray-800 rounded-xl'>
                  <div className='lg:p-16 p-6'>
                    <div className='-mr-4 mb-12 flex flex-wrap'>
                      {conference.tags.map((tag, i) => {
                        return (
                          <div
                            key={i}
                            className='text-primary mb-4 mr-4 rounded-full px-6 py-1 bg-gradient-to-r from-gray-800 via-gray-900 to-black'
                          >
                            {tag}
                          </div>
                        )
                      })}
                    </div>
                    <span className='max-w-full text-lg text-secondary mb-10 pb-7 prose text-gray-400'>
                      {conference.title}
                    </span>
                    <h3 className='text-2xl md:text-3xl mb-5 mt-5'>{conference.description}</h3>
                  </div>
                  <a
                    className='text-primary inline-flex items-center text-left font-lora focus:outline-none cursor-pointer transition'
                    href={conference.url}
                    aria-label='Conference'
                  >
                    <span className='text-xl font-medium'>
                      <span className='hidden md:inline lg:pl-16 pl-6'>check this talk</span>
                      <span className='md:hidden lg:pl-16 pl-6'>Read more</span>
                    </span>
                    <div className='relative inline-flex h-14 w-14 flex-none items-center justify-center p-1'>
                      <div className='absolute text-gray-200'>
                        <svg
                          className='transform rotate-[270deg] text-gray-400'
                          width='40'
                          height='40'
                          viewBox='0 0 32 32'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M15.101 5.5V23.1094L9.40108 17.4095L8.14807 18.6619L15.9862 26.5L23.852 18.6342L22.5996 17.3817L16.8725 23.1094V5.5H15.101Z'
                            fill='currentColor'
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='h-56 lg:h-64'></div>
    </div>
  )
}
