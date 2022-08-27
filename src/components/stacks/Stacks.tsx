import React from 'react'

export default function Stacks() {
  return (
    <div className='relative mx-10vw' id='feeds'>
      <div className='relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl'>
        <div className='col-span-full flex flex-col space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0'>
          <h1 className='text-indigo-100 text-5xl decoration-4 p-4'>
            <span className='inline-flex'>My Stacks</span>
          </h1>
        </div>
      </div>
      <div className='relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl mb-24 lg:mb-64'>
        <div className='col-span-full lg:col-span-9 lg:col-start-10 p-3'>
          <div className='mb-12 lg:mb-0'>
            <img
              decoding='async'
              src={
                new URL('../../assets/images/he_sitting_with_notebook.webp', import.meta.url).href
              }
              className='h-auto w-full object-contain max-h-75vh'
              alt='he_sitting_with_notebook'
            />
          </div>
        </div>
        <div className='col-span-full lg:col-span-9 lg:col-start-1 lg:row-start-1 p-3'></div>
      </div>
    </div>
  )
}
