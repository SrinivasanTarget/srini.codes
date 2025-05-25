import React from 'react'
import React from 'react'
import Home from './screens/Home'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import ScrollToTop from './components/scroll/ScrollToTop'
import ScrollUp from './components/scroll/ScrollUp'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <div className='bg-custom-black'>
      <ScrollUp>
        <Header />
        <Home />
        <ScrollToTop />
        <Footer />
      </ScrollUp>
      <Analytics mode={'production'} />
    </div>
  )
}

export default App
