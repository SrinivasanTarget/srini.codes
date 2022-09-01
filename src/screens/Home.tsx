import React from 'react'
import Greeting from '../components/greeting/Greeting'
import Projects from '../containers/projects/Projects'
import Blogs from '../containers/blogs/Blogs'
import Conferences from '../containers/conferences/conferences'
import Feeds from '../components/feeds/Feeds'

export default function Home() {
  return (
    <div>
      <Greeting
        url={'https://srini.codes/static/media/figma.cd9955de461aa7bb3c1c.webp'}
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
