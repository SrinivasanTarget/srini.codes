import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ModernPortfolio from './components/ModernPortfolio'
import BlogList from './screens/BlogList'
import BlogPost from './screens/BlogPost'
import Contact from './screens/Contact'
import Conferences from './screens/Conferences'
import Book from './screens/Book'
import CustomCursor from './components/CustomCursor'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <div className='bg-black min-h-screen'>
      <CustomCursor />
      <Router>
        <Routes>
          <Route path="/" element={<ModernPortfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/conferences" element={<Conferences />} />
          <Route path="/book" element={<Book />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </Router>
      <Analytics mode={'production'} />
    </div>
  )
}

export default App
