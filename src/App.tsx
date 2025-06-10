import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ModernPortfolio from './components/ModernPortfolio'
import Videos from './screens/Videos'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <div className='bg-black min-h-screen'>
      <Router>
        <Routes>
          <Route path="/" element={<ModernPortfolio />} />
          <Route path="/videos" element={<Videos />} />
        </Routes>
      </Router>
      <Analytics mode={'production'} />
    </div>
  )
}

export default App
