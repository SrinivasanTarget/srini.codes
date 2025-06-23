import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ModernPortfolio from './components/ModernPortfolio'
import BlogList from './screens/BlogList'
import BlogPost from './screens/BlogPost'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <div className='bg-black min-h-screen'>
      <Router>
        <Routes>
          <Route path="/" element={<ModernPortfolio />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </Router>
      <Analytics mode={'production'} />
    </div>
  )
}

export default App
