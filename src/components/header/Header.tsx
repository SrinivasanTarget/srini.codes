import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const inactiveClassName = 'text-white block px-3 py-2 rounded-md text-base font-inter'
  const activeClassName = `${inactiveClassName} bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`
  return (
    <header>
      <div className='container mx-auto flex flex-wrap p-5 flex-col lg:flex-row items-center'>
        <a className='flex title-font font-medium items-center text-white mb-4 md:mb-0' href='/'>
          <span className='ml-3 text-xl font-sign'>&lt; Srinivasan Sekar /&gt;</span>
        </a>
        <div className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
          <NavLink
            to='/'
            className={({ isActive }) => (!isActive ? inactiveClassName : activeClassName)}
          >
            Home
          </NavLink>
          <NavLink
            to='opensource'
            className={({ isActive }) => (!isActive ? inactiveClassName : activeClassName)}
          >
            Open Source
          </NavLink>
          <NavLink
            to='blogs'
            className={({ isActive }) => (!isActive ? inactiveClassName : activeClassName)}
          >
            Blogs
          </NavLink>
          <NavLink
            to='talks'
            className={({ isActive }) => (!isActive ? inactiveClassName : activeClassName)}
          >
            Talks
          </NavLink>
          <NavLink
            to='feeds'
            className={({ isActive }) => (!isActive ? inactiveClassName : activeClassName)}
          >
            Feeds
          </NavLink>
          <NavLink
            to='workshop'
            className={({ isActive }) => (!isActive ? inactiveClassName : activeClassName)}
          >
            Workshops
          </NavLink>
          <NavLink
            to='aboutme'
            className={({ isActive }) => (!isActive ? inactiveClassName : activeClassName)}
          >
            About Me
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default Header
