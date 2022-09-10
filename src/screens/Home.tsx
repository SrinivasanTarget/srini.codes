import React, { lazy, Suspense } from 'react'
import Greeting from '../components/greeting/Greeting'

const Projects = lazy(() => import('../containers/projects/Projects'))
const Blogs = lazy(() => import('../containers/blogs/Blogs'))
const Conferences = lazy(() => import('../containers/conferences/conferences'))
const Feeds = lazy(() => import('../components/feeds/Feeds'))

export default function Home() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}></Suspense>
      <Greeting
        url={new URL('../assets/images/figma.webp', import.meta.url).href}
        isName={true}
        description={'I assist businesses in developing and shipping high-quality software. 🚀'}
        subdescription={'Quality Analyst @ Thoughtworks'}
        isSocial={true}
      />
      <Projects />
      <Blogs />
      <Conferences />
      <Feeds />
    </div>
  )
}
