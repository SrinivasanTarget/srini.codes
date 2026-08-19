import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ModernPortfolio from './components/ModernPortfolio'
import { Analytics } from '@vercel/analytics/react'

// Route-level code splitting keeps heavy dependencies (three.js, the globe,
// syntax highlighting) out of the initial homepage bundle.
const BlogList = lazy(() => import('./screens/BlogList'))
const BlogPost = lazy(() => import('./screens/BlogPost'))
const Contact = lazy(() => import('./screens/Contact'))
const Conferences = lazy(() => import('./screens/Conferences'))
const Book = lazy(() => import('./screens/Book'))
const Presentations = lazy(() => import('./screens/Presentations'))

function App() {
  return (
    <div className='bg-black min-h-screen'>
      <Router>
        <Suspense fallback={<div className='min-h-screen bg-black' />}>
          <Routes>
            <Route path="/" element={<ModernPortfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/conferences" element={<Conferences />} />
            <Route path="/book" element={<Book />} />
            <Route path="/presentations" element={<Presentations />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </Suspense>
      </Router>
      <Analytics mode={'production'} />
    </div>
  )
}

export default App
