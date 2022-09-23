import React from 'react'
import Greeting from '../components/greeting/Greeting'
import Projects from '../containers/projects/Projects'
import Blogs from '../containers/blogs/Blogs'
import Conferences from '../containers/conferences/conferences'
import Workshops from '../containers/workshops/Workshops'

export default function Home() {
  return (
    <div>
      <Greeting
        url={
          new URL(
            'https://images.ctfassets.net/57ehn7fu4651/1LZxMgK7B2p0PiAvrhp7bJ/e3ed5e6a2da545c9bd421ae42d5cd83e/figma.jpeg?fl=progressive&h=500&w=600',
            import.meta.url,
          ).href
        }
        isName={true}
        description={'I assist businesses in developing and shipping high-quality software. 🚀'}
        subdescription={'Quality Analyst @ Thoughtworks'}
        isSocial={true}
      />
      <Projects />
      <Blogs />
      <Conferences />
      <Workshops />
    </div>
  )
}
