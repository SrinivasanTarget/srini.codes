import React from 'react'
import { Timeline } from 'react-twitter-widgets'

export default function Feeds() {
  return (
    <div className='relative mx-10vw' id='feeds'>
      <div className='relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl'>
        <div className='col-span-full flex flex-col space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0'>
          <h1 className='text-amber-100 text-5xl decoration-4 p-4'>
            <span className='inline-flex'>Feeds</span>
          </h1>
        </div>
      </div>
      <div className='relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl mb-24 lg:mb-64'>
        <div className='col-span-full lg:col-span-9 lg:col-start-10 p-3'>
          <div className='mb-12 lg:mb-0'>
            <img
              loading='lazy'
              decoding='async'
              src={
                new URL(`../../assets/images/he_sitting_with_notebook.webp`, import.meta.url).href
              }
              className='lg:h-auto lg:w-full h-80 w-96 object-contain'
              alt='he_sitting_with_notebook'
            />
          </div>
        </div>
        <div className='col-span-full lg:col-span-9 lg:col-start-1 lg:row-start-1 p-3'>
          <Timeline
            dataSource={{ sourceType: 'profile', screenName: 'srinivasanskr' }}
            options={{ theme: 'dark', width: '800', height: '600' }}
          />
        </div>
      </div>
    </div>
  )
}
