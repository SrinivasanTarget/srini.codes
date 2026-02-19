import React, { useEffect, useState, useCallback } from 'react'

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [delayedPosition, setDelayedPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile/touch device
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
    setIsVisible(true)
  }, [])

  const handleMouseDown = useCallback(() => setIsClicking(true), [])
  const handleMouseUp = useCallback(() => setIsClicking(false), [])
  const handleMouseLeave = useCallback(() => setIsVisible(false), [])
  const handleMouseEnter = useCallback(() => setIsVisible(true), [])

  useEffect(() => {
    if (isMobile) return

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isMobile, handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter])

  // Smooth delayed follower
  useEffect(() => {
    if (isMobile) return

    let animationId: number
    const animate = () => {
      setDelayedPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }))
      animationId = requestAnimationFrame(animate)
    }
    animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [position, isMobile])

  // Track hoverable elements
  useEffect(() => {
    if (isMobile) return

    const hoverables = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .cursor-pointer')

    const handleHoverStart = () => setIsHovering(true)
    const handleHoverEnd = () => setIsHovering(false)

    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart)
      el.addEventListener('mouseleave', handleHoverEnd)
    })

    return () => {
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart)
        el.removeEventListener('mouseleave', handleHoverEnd)
      })
    }
  }, [isMobile])

  // Don't render on mobile
  if (isMobile) return null

  return (
    <>
      {/* Main dot */}
      <div
        className='fixed pointer-events-none z-[9999] mix-blend-difference'
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          className='rounded-full bg-white'
          style={{
            width: isClicking ? '8px' : '10px',
            height: isClicking ? '8px' : '10px',
            transition: 'width 0.15s ease, height 0.15s ease',
          }}
        />
      </div>

      {/* Trailing ring */}
      <div
        className='fixed pointer-events-none z-[9998]'
        style={{
          left: delayedPosition.x,
          top: delayedPosition.y,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          className='rounded-full border-2 border-white/40'
          style={{
            width: isHovering ? '50px' : isClicking ? '30px' : '40px',
            height: isHovering ? '50px' : isClicking ? '30px' : '40px',
            transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
            borderColor: isHovering ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.3)',
          }}
        />
      </div>

      {/* Global style to hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}

export default CustomCursor
