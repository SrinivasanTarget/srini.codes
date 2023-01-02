import React from 'react'
import Home from './screens/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Workshop from './screens/Workshop'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import AboutMe from './containers/aboutme/AboutMe'
import ScrollToTop from './components/scroll/ScrollToTop'
import OpenSource from './screens/OpenSource'
import BlogScreen from './screens/BlogScreen'
import Talks from './screens/Talks'
import Tweets from './screens/Tweets'
import About from './screens/About'
import ScrollUp from './components/scroll/ScrollUp'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <BrowserRouter>
      <div className='bg-gradient-to-tr from-gray-700 via-gray-900 to-black'>
        <ScrollUp>
          <Header />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/opensource' element={<OpenSource />}></Route>
            <Route path='/blogs' element={<BlogScreen />}></Route>
            <Route path='/talks' element={<Talks />}></Route>
            <Route path='/feeds' element={<Tweets />}></Route>
            <Route path='/workshop' element={<Workshop />}></Route>
            <Route path='/aboutme' element={<About />}></Route>
          </Routes>
          <AboutMe />
          <ScrollToTop />
          <Footer />
        </ScrollUp>
        <Analytics mode={'production'} />
      </div>
    </BrowserRouter>
  )
}

export default App
