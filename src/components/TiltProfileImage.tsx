import React, { useRef, useState, useCallback } from 'react'

interface TiltProfileImageProps {
  src: string
  alt: string
  className?: string
}

const TiltProfileImage: React.FC<TiltProfileImageProps> = ({ src, alt, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 })
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 12
    const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 12

    const glareX = ((e.clientX - rect.left) / rect.width) * 100
    const glareY = ((e.clientY - rect.top) / rect.height) * 100

    setTransform({ rotateX, rotateY, scale: 1.02 })
    setGlarePosition({ x: glareX, y: glareY })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 })
    setGlarePosition({ x: 50, y: 50 })
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Main image container - seamlessly blended */}
      <div
        className='relative w-full h-full transition-transform duration-200 ease-out'
        style={{
          transform: `
            rotateX(${transform.rotateX}deg)
            rotateY(${transform.rotateY}deg)
            scale(${transform.scale})
          `,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Profile image with edge fade */}
        <img
          src={src}
          alt={alt}
          className='w-full h-full object-cover'
          style={{
            objectPosition: '50% 30%',
            maskImage: `
              radial-gradient(
                ellipse 70% 70% at 50% 45%,
                black 40%,
                transparent 70%
              )
            `,
            WebkitMaskImage: `
              radial-gradient(
                ellipse 70% 70% at 50% 45%,
                black 40%,
                transparent 70%
              )
            `,
          }}
        />

        {/* Subtle glare on hover */}
        <div
          className='absolute inset-0 pointer-events-none transition-opacity duration-300'
          style={{
            background: `radial-gradient(
              circle at ${glarePosition.x}% ${glarePosition.y}%,
              rgba(255, 255, 255, 0.08) 0%,
              transparent 40%
            )`,
            opacity: isHovering ? 1 : 0,
            maskImage: `
              radial-gradient(
                ellipse 70% 70% at 50% 45%,
                black 40%,
                transparent 70%
              )
            `,
            WebkitMaskImage: `
              radial-gradient(
                ellipse 70% 70% at 50% 45%,
                black 40%,
                transparent 70%
              )
            `,
          }}
        />
      </div>
    </div>
  )
}

export default TiltProfileImage
