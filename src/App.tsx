import React, { Suspense, useEffect } from 'react'
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
import ReactGA from 'react-ga4'
ReactGA.initialize('G-HD011R827H')

function App() {
  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname + window.location.search,
    })
  }, [])
  return (
    <BrowserRouter>
      <div className='bg-gradient-to-tr from-gray-700 via-gray-900 to-black'>
        <ScrollUp>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/opensource' element={<OpenSource />}></Route>
              <Route path='/blogs' element={<BlogScreen />}></Route>
              <Route path='/talks' element={<Talks />}></Route>
              <Route path='/feeds' element={<Tweets />}></Route>
              <Route path='/workshop' element={<Workshop />}></Route>
              <Route path='/aboutme' element={<About />}></Route>
            </Routes>
          </Suspense>

          <AboutMe />
          <ScrollToTop />
          <Footer />
        </ScrollUp>
      </div>
    </BrowserRouter>
  )
}

export default App
