import React from 'react'
// NavigationArrow import removed
import { conferences } from '../../portfolio/conferences'
// Note: This component defines its own card layout, different from ConferenceCard.tsx.
// The task is to remove router dependencies and update NavigationArrow usage.
// Styling of these custom cards will be adjusted for the theme.

export default function Conferences() {
  // Displaying a subset of conferences.
  const conferencesToShow = conferences.slice(0, 2);

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8' id='talks'> {/* Updated id and container class */}
      <div className='text-center mb-12 md:mb-16'> {/* Centered title */}
        <h2 className='leading-tight text-3xl md:text-4xl font-bold text-custom-highlight'>Conference Talks</h2>
        <p className='leading-tight text-lg md:text-xl text-custom-gray-medium mt-2'>
          I love sharing my knowledge through conferences and meetups.
        </p>
        {/* NavigationArrow removed as "See all conferences" requires new state logic */}
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10'> {/* Grid for custom conference cards */}
        {conferencesToShow.map((conference, i) => {
          return (
            <div key={i} className='col-span-1'> {/* Each card takes one column in the new grid */}
              {/* Card with gradient border - kept gradient as highlight */}
              <div className='p-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                              flex flex-col justify-between rounded-xl h-full text-custom-gray-light'>
                {/* Inner card content with themed background */}
                <div className='bg-custom-black rounded-xl h-full flex flex-col justify-between'>
                  <div className='p-6 md:p-8'> {/* Adjusted padding */}
                    <div className='mb-6 flex flex-wrap'> {/* Adjusted margin */}
                      {conference.tags.map((tag, k) => {
                        return (
                          <div
                            key={k}
                            className='text-custom-gray-light mb-2 mr-2 rounded-full px-4 py-1 text-sm bg-custom-gray-dark' // Themed tags
                          >
                            {tag}
                          </div>
                        )
                      })}
                    </div>
                    {/* Conference Title - using description as title as per original structure here */}
                    <p className='max-w-full text-lg text-custom-gray-medium mb-4'> 
                      {conference.title} {/* This was the original "title" span */}
                    </p>
                    {/* Conference Description - using title as main heading as per original structure */}
                    <h3 className='text-xl md:text-2xl font-semibold text-custom-gray-light mb-4 min-h-[5rem]'> {/* Adjusted text size and color */}
                      {conference.description} {/* This was the original h3 content */}
                    </h3>
                  </div>
                  <a
                    className='group inline-flex items-center text-left font-lora focus:outline-none cursor-pointer transition 
                               px-6 py-4 md:px-8 text-custom-highlight hover:text-pink-500' // Themed link
                    href={conference.url}
                    target='_blank' // Added target blank for external links
                    rel='noopener noreferrer' // Added rel for security
                    aria-label={`Read more about ${conference.title}`} // Improved aria-label
                  >
                    <span className='text-lg font-medium'>
                      <span className='hidden md:inline'>Check this talk</span>
                      <span className='md:hidden'>Read more</span>
                    </span>
                    <div className='relative inline-flex h-10 w-10 flex-none items-center justify-center p-1 ml-2'> {/* Adjusted size and margin */}
                      <div className='absolute text-custom-gray-medium group-hover:text-custom-highlight transition-colors duration-300'>
                        <svg
                          className='transform rotate-[270deg]' // SVG kept as is
                          width='32' // Adjusted size
                          height='32' // Adjusted size
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
      {/* Removed the large spacer div */}
    </div>
  )
}
