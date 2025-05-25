import React from 'react'
import BlogCard from '../../components/blogcard/BlogCard'
import { blogs } from '../../portfolio/blogs'
// NavigationArrow import removed as it's not used for now
// import NavigationArrow from '../../components/navigationArrow/NavigationArrow'

export default function Blogs() {
  // Displaying a subset of blogs initially. Full "show all" functionality would require state.
  const blogsToShow = blogs.slice(0, 6);

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8' id='blogs'> {/* Use standard container, id matches nav */}
      <div className='text-center mb-12 md:mb-16'> {/* Centered title */}
        <h2 className='leading-tight text-3xl md:text-4xl font-bold text-custom-highlight'>My Writings</h2>
        <p className='leading-tight text-lg md:text-xl text-custom-gray-medium mt-2'>
          Find the latest of my thoughts and explorations here.
        </p>
      </div>
      {/* Grid for blog cards - ensure BlogCard's col-span-4 works with this grid or adjust */}
      {/* BlogCard has 'col-span-4'. For a 12-col grid, this means 3 cards per row.
          For an 8-col grid (md), this means 2 cards per row.
          For a 4-col grid (sm), this means 1 card per row. This should adapt well. */}
      <div className='grid grid-cols-1 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 md:gap-8'>
        {blogsToShow.map((blog, i) => {
          // BlogCard itself is col-span-4, so it will take up 1/3 of lg, 1/2 of md, full on sm
          return <BlogCard key={i} blog={{ source: blog.source, title: blog.title }} />
        })}
      </div>
      {/* Removed the NavigationArrow for "See all blogs" as it requires new state logic for a single-page app. */}
      {/* Removed the large spacer div; section padding in Home.tsx should handle this. */}
    </div>
  )
}
