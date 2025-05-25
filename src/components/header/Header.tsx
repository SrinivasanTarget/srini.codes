import React from 'react'

const Header = () => {
  const linkClassName = 'text-custom-gray-light hover:text-custom-highlight px-3 py-2 rounded-md text-base font-inter'
  return (
    <header className='sticky top-0 z-50 w-full bg-custom-black'>
      <div className='container mx-auto flex flex-wrap p-5 flex-col lg:flex-row items-center'>
        <a className='flex title-font font-medium items-center text-custom-gray-light mb-4 md:mb-0' href='#'>
          <span className='ml-3 text-xl font-sign'>&lt; Srinivasan Sekar /&gt;</span>
        </a>
        <nav className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
          <a href='#about' className={linkClassName}>
            About
          </a>
          <a href='#projects' className={linkClassName}>
            Projects
          </a>
          <a href='#blogs' className={linkClassName}>
            Blogs
          </a>
          <a href='#talks' className={linkClassName}>
            Talks
          </a>
          <a href='#workshops' className={linkClassName}>
            Workshops
          </a>
          <a href='#contact' className={linkClassName}>
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
