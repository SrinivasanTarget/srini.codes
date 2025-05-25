import React from 'react'
import Home from './screens/Home'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import ScrollToTop from './components/scroll/ScrollToTop'
// ScrollUp import removed
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <div className='bg-custom-black'>
      {/* ScrollUp tags removed */}
      <Header />
      <Home />
      <ScrollToTop />
      <Footer />
      <Analytics mode={'production'} />
    </div>
  )
}

export default App
