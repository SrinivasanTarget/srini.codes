import React from 'react'

type blog = {
  source: string
  title: string
}

export default function BlogCard({ blog }: { blog: blog }) {
  return (
    <div className='col-span-4 mb-5 font-lora text-custom-gray-light transition-transform duration-300 ease-in-out hover:scale-105'>
      {/* Retaining the gradient border as a highlight feature */}
      <div className='p-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl'>
        {/* Changed inner background to custom-black */}
        <div className='p-0.5 bg-custom-black rounded-xl skew-x-1 rotate-1 h-full'> {/* Ensure h-full for consistent height if inner content varies */}
          <a href={blog.source} target='_blank' rel='noreferrer' className="block h-full"> {/* Ensure link covers the card */}
            <blockquote className="h-full flex flex-col justify-between"> {/* Make blockquote flex container */}
              {/* Title styling, ensure it's readable. h-32 might need adjustment for responsiveness. */}
              <p className='text-xl p-3 mb-1 h-32 overflow-hidden'>{blog.title}</p>
              {/* "Read blog" link styling */}
              <div className='inline-flex items-center text-center px-3 pb-2 text-custom-highlight hover:text-custom-gray-light'>
                <span>Read blog</span>
                <span>
                  <svg
                    className='transform rotate-[235deg] ml-1' // Added margin for spacing
                    width='20' // Slightly reduced size
                    height='20' // Slightly reduced size
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
                </span>
              </div>
            </blockquote>
          </a>
        </div>
      </div>
    </div>
  )
}
