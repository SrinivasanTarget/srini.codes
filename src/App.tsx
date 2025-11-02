import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ModernPortfolio from './components/ModernPortfolio'
import MinimalistPortfolio from './components/minimalist-portfolio/MinimalistPortfolio'
import Videos from './screens/Videos'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <div className='min-h-screen'>
      <Router>
        <Routes>
          <Route path="/" element={<MinimalistPortfolio />} />
          <Route path="/legacy" element={<ModernPortfolio />} />
          <Route path="/videos-legacy" element={<Videos />} />
        </Routes>
      </Router>
      <Analytics mode={'production'} />
    </div>
  )
}

export default App
