import React, { lazy, Suspense, useState, useEffect } from 'react'
import { ANIMATION_CONFIG } from './constants'

// Lazy load the Player to reduce initial bundle size
const Player = lazy(() =>
  import('@remotion/player').then((module) => ({ default: module.Player }))
)

// Lazy load the composition
const HeroAnimation = lazy(() => import('./compositions/HeroAnimation'))

interface HeroVideoBackgroundProps {
  className?: string
}

const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({ className = '' }) => {
  const [shouldRender, setShouldRender] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(motionQuery.matches)

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    motionQuery.addEventListener('change', handleMotionChange)

    // Check if mobile device (for performance)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Delay rendering to prioritize initial page load
    const timer = setTimeout(() => {
      setShouldRender(true)
    }, 100)

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange)
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timer)
    }
  }, [])

  // Don't render video on mobile or when reduced motion is preferred
  if (prefersReducedMotion || isMobile || !shouldRender) {
    return (
      <div
        className={`${className} bg-gradient-to-br from-amber-900/20 via-gray-900/30 to-black`}
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 30% 30%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, rgba(234, 179, 8, 0.08) 0%, transparent 50%)
          `,
        }}
      />
    )
  }

  return (
    <div className={className}>
      <Suspense
        fallback={
          <div className='absolute inset-0 bg-gradient-to-br from-amber-900/20 via-gray-900/30 to-black' />
        }
      >
        <Player
          component={HeroAnimation}
          durationInFrames={ANIMATION_CONFIG.durationInFrames}
          fps={ANIMATION_CONFIG.fps}
          compositionWidth={ANIMATION_CONFIG.width}
          compositionHeight={ANIMATION_CONFIG.height}
          loop
          autoPlay
          style={{
            width: '100%',
            height: '100%',
          }}
          controls={false}
        />
      </Suspense>
    </div>
  )
}

export default HeroVideoBackground
