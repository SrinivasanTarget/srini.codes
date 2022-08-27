import React from 'react'
import Greeting from '../components/greeting/Greeting'

const About = () => {
  return (
    <div>
      <Greeting
        url={new URL('../assets/images/smilie.webp', import.meta.url).href}
        isName={false}
        description={"Hi, I'm Srini"}
        subdescription={
          "I'm an Open Source Contributor, international conference speaker, workshop instructor, and community organizer 🚀"
        }
        isSocial={true}
      />
    </div>
  )
}

export default About
