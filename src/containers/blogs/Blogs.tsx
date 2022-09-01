import React from 'react'
import BlogCard from '../../components/blogcard/BlogCard'
import { blogs } from '../../portfolio/blogs'
import NavigationArrow from '../../components/navigationArrow/NavigationArrow'

export default function Blogs() {
  return (
    <div className='relative mx-10vw pb-16' id='blogs'>
      <div className='relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-4 mx-auto max-w-7xl'>
        <div className='col-span-full flex flex-col space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0 mb-16'>
          <div className='space-y-2 lg:space-y-0  pl-2'>
            <h2 className='leading-tight text-3xl md:text-4xl text-white'>Blogs</h2>
            <p className='leading-tight text-3xl md:text-4xl text-gray-400'>
              Find the latest of my writing here
            </p>
          </div>
          <NavigationArrow arrow={{ link: 'blogs', context: 'See all blogs' }} />
        </div>
      </div>
      <div className='relative grid grid-cols-4 gap-x-5 md:grid-cols-8 lg:grid-cols-12 mx-auto max-w-7xl p-3'>
        {blogs.slice(0, 6).map((blog, i) => {
          return <BlogCard key={i} blog={{ source: blog.source, title: blog.title }} />
        })}
      </div>
      <div className='h-56 lg:h-64'></div>
    </div>
  )
}
