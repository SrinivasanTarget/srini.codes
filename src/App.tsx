import React from 'react'
import ModernPortfolio from './components/ModernPortfolio'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <div className='bg-black min-h-screen'>
      <ModernPortfolio />
      <Analytics mode={'production'} />
    </div>
  )
}

export default App
