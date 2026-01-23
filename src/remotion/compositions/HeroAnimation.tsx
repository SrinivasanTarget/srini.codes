import React from 'react'
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import FloatingCode from '../components/FloatingCode'
import ParticleField from '../components/ParticleField'
import { COLORS, TECH_ICONS } from '../constants'

const HeroAnimation: React.FC = () => {
  const frame = useCurrentFrame()

  // Animated gradient background
  const gradientRotation = interpolate(frame, [0, 300], [0, 360], {
    extrapolateRight: 'clamp',
  })

  // Grid lines animation
  const gridOpacity = interpolate(frame, [0, 30, 270, 300], [0, 0.1, 0.1, 0], {
    extrapolateRight: 'clamp',
  })

  // Tech icons orbiting
  const orbitAngle = interpolate(frame, [0, 300], [0, Math.PI * 2], {
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill
      style={{
        background: '#000000',
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(
              ellipse at 30% 30%,
              rgba(59, 130, 246, 0.15) 0%,
              transparent 50%
            ),
            radial-gradient(
              ellipse at 70% 70%,
              rgba(139, 92, 246, 0.1) 0%,
              transparent 50%
            )
          `,
          transform: `rotate(${gradientRotation}deg)`,
          transformOrigin: 'center',
        }}
      />

      {/* Subtle grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, ${gridOpacity}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, ${gridOpacity}) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating code snippets */}
      <FloatingCode seed={123} />

      {/* Particle field */}
      <ParticleField particleCount={25} seed={456} />

      {/* Orbiting tech icons */}
      {TECH_ICONS.map((icon, i) => {
        const iconAngle = orbitAngle + (i * Math.PI * 2) / TECH_ICONS.length
        const radius = 300
        const x = Math.cos(iconAngle) * radius
        const y = Math.sin(iconAngle) * radius * 0.4 // Elliptical orbit

        const opacity = interpolate(
          frame,
          [0, 50, 250, 300],
          [0, 0.6, 0.6, 0],
          { extrapolateRight: 'clamp' }
        )

        return (
          <div
            key={icon}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              fontSize: '18px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 'bold',
              color: i % 2 === 0 ? COLORS.blue : COLORS.purple,
              opacity,
              textShadow: `0 0 15px ${i % 2 === 0 ? COLORS.blueGlow : COLORS.purpleGlow}`,
              padding: '8px 12px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              border: `1px solid rgba(255, 255, 255, 0.1)`,
            }}
          >
            {icon}
          </div>
        )
      })}

      {/* Central glow effect */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '400px',
          height: '400px',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${COLORS.blueGlow} 0%, transparent 70%)`,
          opacity: interpolate(frame, [0, 150, 300], [0.3, 0.6, 0.3], {
            extrapolateRight: 'clamp',
          }),
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  )
}

export default HeroAnimation
