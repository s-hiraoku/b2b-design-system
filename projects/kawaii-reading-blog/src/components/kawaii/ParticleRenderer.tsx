import React from 'react'
import { motion } from 'framer-motion'
import { type Particle } from '@/hooks/useParticles'

interface ParticleRendererProps {
  particles: Particle[]
  className?: string
  'data-testid'?: string
}

/**
 * ParticleRenderer - Renders kawaii particles with optimal performance
 * Uses absolute positioning and GPU acceleration for smooth 60FPS animations
 */
export const ParticleRenderer: React.FC<ParticleRendererProps> = ({
  particles,
  className = '',
  'data-testid': testId = 'particle-renderer'
}) => {
  if (particles.length === 0) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-50 ${className}`}
      data-testid={testId}
      style={{
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}
    >
      {particles.map((particle) => (
        <ParticleElement
          key={particle.id}
          particle={particle}
        />
      ))}
    </div>
  )
}

interface ParticleElementProps {
  particle: Particle
}

const ParticleElement: React.FC<ParticleElementProps> = React.memo(({ particle }) => {
  // Get particle shape based on type
  const getParticleShape = (type: Particle['type']) => {
    switch (type) {
      case 'heart':
        return '❤️'
      case 'sparkle':
        return '✨'
      case 'star':
        return '⭐'
      default:
        return '•'
    }
  }

  return (
    <motion.div
      className="absolute"
      style={{
        x: particle.x,
        y: particle.y,
        rotate: particle.rotation,
        opacity: particle.opacity,
        fontSize: particle.size,
        color: particle.color,
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden'
      }}
      initial={false}
      animate={{
        x: particle.x,
        y: particle.y,
        rotate: particle.rotation,
        opacity: particle.opacity
      }}
      transition={{
        type: 'tween',
        duration: 0.016, // 60FPS frame time
        ease: 'linear'
      }}
      data-testid={`particle-${particle.id}`}
    >
      {/* Render different shapes based on particle type */}
      {particle.type === 'heart' && (
        <div className="relative">
          <svg
            width={particle.size}
            height={particle.size}
            viewBox="0 0 24 24"
            fill="none"
            className="drop-shadow-sm"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={particle.color}
            />
          </svg>
        </div>
      )}

      {particle.type === 'sparkle' && (
        <div className="relative">
          <svg
            width={particle.size}
            height={particle.size}
            viewBox="0 0 24 24"
            fill="none"
            className="drop-shadow-sm animate-pulse"
          >
            <path
              d="M12 0l3.5 8.5L24 12l-8.5 3.5L12 24l-3.5-8.5L0 12l8.5-3.5L12 0z"
              fill={particle.color}
            />
            <path
              d="M12 4l1.5 4L18 12l-4.5 1.5L12 20l-1.5-4L6 12l4.5-1.5L12 4z"
              fill="rgba(255, 255, 255, 0.8)"
            />
          </svg>
        </div>
      )}

      {particle.type === 'star' && (
        <div className="relative">
          <svg
            width={particle.size}
            height={particle.size}
            viewBox="0 0 24 24"
            fill="none"
            className="drop-shadow-sm"
          >
            <path
              d="M12 2l2.09 6.26L20 10.3l-5.91 2.04L12 22l-2.09-9.66L4 10.3l5.91-2.04L12 2z"
              fill={particle.color}
            />
            <path
              d="M12 4l1.5 4.5L18 10l-4.5 1.5L12 20l-1.5-8.5L6 10l4.5-1.5L12 4z"
              fill="rgba(255, 255, 255, 0.6)"
            />
          </svg>
        </div>
      )}

      {particle.type === 'custom' && (
        <div
          className="rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size / 2}px ${particle.color}40`
          }}
        />
      )}
    </motion.div>
  )
})

ParticleElement.displayName = 'ParticleElement'

export default ParticleRenderer