import React from 'react'
import Projects from '../containers/projects/Projects'
import Blogs from '../containers/blogs/Blogs'
import Conferences from '../containers/conferences/conferences'
import Workshops from '../containers/workshops/Workshops'
import AboutMe from '../containers/aboutme/AboutMe' // Added import
import heroImage from '../assets/images/SrinivasanSekar.webp' // Added import

export default function Home() {
  return (
    <main className="pt-36 md:pt-24 lg:pt-20"> {/* Added padding-top to account for sticky header */}
      {/* Hero Section */}
      <section id="top" className="py-20 text-center bg-custom-black text-custom-gray-light">
        <div className="container mx-auto">
          <img 
            src={heroImage} 
            alt="Srinivasan Sekar" 
            className="w-48 h-48 rounded-full mx-auto mb-8 border-4 border-custom-highlight" 
          />
          <h1 className="text-5xl font-bold font-sign mb-4">Srinivasan Sekar</h1>
          <p className="text-2xl font-inter mb-6">Director of Engineering at LambdaTest</p>
          <div className="text-lg font-lora">
            <p>Open Source Maintainer (Appium) | Conference Speaker | Blogger</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-custom-black">
        <AboutMe />
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-custom-black">
        <Projects />
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="py-16 bg-custom-black">
        <Blogs />
      </section>

      {/* Talks Section */}
      <section id="talks" className="py-16 bg-custom-black">
        <Conferences />
      </section>

      {/* Workshops Section */}
      <section id="workshops" className="py-16 bg-custom-black">
        <Workshops />
      </section>

      {/* Contact Section (Placeholder) */}
      <section id="contact" className="py-16 text-center bg-custom-black">
        <h2 className="text-3xl font-bold text-custom-gray-light mb-8">Contact</h2>
        <p className="text-custom-gray-medium">
          {/* Contact form or information will be added later */}
          Feel free to reach out! (Further details TBC)
        </p>
      </section>
    </main>
  )
}
