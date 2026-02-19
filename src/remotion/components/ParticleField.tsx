import React from 'react'
import { interpolate, useCurrentFrame } from 'remotion'
import { COLORS } from '../constants'

interface ParticleFieldProps {
  particleCount?: number
  seed?: number
}

const ParticleField: React.FC<ParticleFieldProps> = ({ particleCount = 30, seed = 42 }) => {
  const frame = useCurrentFrame()

  // Generate deterministic random values based on seed
  const random = (min: number, max: number, offset = 0) => {
    const x = Math.sin(seed + offset) * 10000
    return min + (x - Math.floor(x)) * (max - min)
  }

  const particles = Array.from({ length: particleCount }, (_, i) => {
    const startX = random(0, 100, i)
    const startY = random(0, 100, i + 100)
    const size = random(2, 6, i + 200)
    const speed = random(0.5, 2, i + 300)
    const isAmber = random(0, 1, i + 400) > 0.4
    const delay = random(0, 100, i + 500)

    // Circular floating animation
    const angle = interpolate(
      frame + delay,
      [0, 300],
      [0, Math.PI * 2 * speed],
      { extrapolateRight: 'clamp' }
    )

    const radius = random(10, 40, i + 600)
    const xOffset = Math.cos(angle) * radius
    const yOffset = Math.sin(angle) * radius

    const opacity = interpolate(
      frame,
      [0, 30, 270, 300],
      [0, random(0.3, 0.7, i + 700), random(0.3, 0.7, i + 700), 0],
      { extrapolateRight: 'clamp' }
    )

    const scale = interpolate(
      frame + delay,
      [0, 150, 300],
      [0.5, 1.2, 0.5],
      { extrapolateRight: 'clamp' }
    )

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${startX}%`,
          top: `${startY}%`,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: isAmber
            ? `radial-gradient(circle, ${COLORS.amber}, transparent)`
            : `radial-gradient(circle, ${COLORS.gold}, transparent)`,
          transform: `translate(${xOffset}px, ${yOffset}px) scale(${scale})`,
          opacity,
          boxShadow: `0 0 ${size * 3}px ${isAmber ? COLORS.amberGlow : COLORS.goldGlow}`,
          pointerEvents: 'none',
        }}
      />
    )
  })

  return <>{particles}</>
}

export default ParticleField
