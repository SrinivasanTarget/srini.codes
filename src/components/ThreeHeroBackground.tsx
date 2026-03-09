import React from 'react'
import './SpaceBackground.css'

interface ThreeHeroBackgroundProps {
  className?: string
}

const ThreeHeroBackground: React.FC<ThreeHeroBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`${className} space-bg`}>
      <div className='stars-layer stars-small' />
      <div className='stars-layer stars-medium' />
      <div className='stars-layer stars-large' />
    </div>
  )
}

export default ThreeHeroBackground
