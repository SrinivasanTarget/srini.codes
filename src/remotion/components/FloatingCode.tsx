import React from 'react'
import { interpolate, useCurrentFrame } from 'remotion'
import { CODE_SNIPPETS, COLORS } from '../constants'

interface FloatingCodeProps {
  seed: number
}

const FloatingCode: React.FC<FloatingCodeProps> = ({ seed }) => {
  const frame = useCurrentFrame()

  // Generate deterministic random values based on seed
  const random = (min: number, max: number, offset = 0) => {
    const x = Math.sin(seed + offset) * 10000
    return min + (x - Math.floor(x)) * (max - min)
  }

  const items = Array.from({ length: 15 }, (_, i) => {
    const startX = random(5, 95, i)
    const startY = random(5, 95, i + 100)
    const speed = random(0.3, 1, i + 200)
    const size = random(12, 24, i + 300)
    const rotation = random(-30, 30, i + 400)
    const snippet = CODE_SNIPPETS[Math.floor(random(0, CODE_SNIPPETS.length, i + 500))]
    const opacity = random(0.1, 0.4, i + 600)
    const isAmber = random(0, 1, i + 700) > 0.5

    // Floating animation
    const yOffset = interpolate(
      frame,
      [0, 150, 300],
      [0, -30 * speed, 0],
      { extrapolateRight: 'clamp' }
    )

    const xOffset = interpolate(
      frame,
      [0, 100, 200, 300],
      [0, 10 * speed, -10 * speed, 0],
      { extrapolateRight: 'clamp' }
    )

    const currentOpacity = interpolate(
      frame,
      [0, 50, 250, 300],
      [0, opacity, opacity, 0],
      { extrapolateRight: 'clamp' }
    )

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${startX}%`,
          top: `${startY}%`,
          transform: `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`,
          fontSize: `${size}px`,
          fontFamily: 'JetBrains Mono, monospace',
          color: isAmber ? COLORS.amber : COLORS.gold,
          opacity: currentOpacity,
          textShadow: `0 0 20px ${isAmber ? COLORS.amberGlow : COLORS.goldGlow}`,
          pointerEvents: 'none',
        }}
      >
        {snippet}
      </div>
    )
  })

  return <>{items}</>
}

export default FloatingCode
