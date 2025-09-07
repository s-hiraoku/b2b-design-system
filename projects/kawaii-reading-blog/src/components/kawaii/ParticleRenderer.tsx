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
  // Get particle shape based on type (keeping emoji for optimal 60FPS performance)
  const getParticleShape = (type: Particle['type']) => {
    switch (type) {
      case 'heart':
        return '💖'  // Using kawaii-style sparkling heart
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
      {/* Render kawaii particles (emoji optimized for performance) */}
      <div className="relative drop-shadow-sm">
        {getParticleShape(particle.type)}
      </div>
    </motion.div>
  )
})

ParticleElement.displayName = 'ParticleElement'

export default ParticleRenderer