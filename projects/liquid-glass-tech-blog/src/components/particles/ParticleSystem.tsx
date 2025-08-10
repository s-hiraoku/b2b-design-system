'use client'

/**
 * GPU-Accelerated Particle System for Seasonal Effects
 * Optimized for 60fps performance with hardware acceleration
 */

import React, { useEffect, useRef, useState, useMemo } from 'react'
import type { ParticleConfig } from '@/lib/types/glass'

interface ParticleSystemProps {
  config: ParticleConfig
  className?: string
  style?: React.CSSProperties
}

interface Particle {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  rotation: number
  rotationSpeed: number
  life: number
  maxLife: number
}

// Particle component optimized for GPU acceleration
const ParticleElement: React.FC<{
  particle: Particle
  type: ParticleConfig['type']
  color: string
}> = React.memo(({ particle, type, color }) => {
  
  const particleStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${particle.x}px`,
    top: `${particle.y}px`,
    width: `${particle.size}px`,
    height: `${particle.size}px`,
    opacity: particle.opacity,
    transform: `rotate(${particle.rotation}deg)`,
    willChange: 'transform, opacity',
    pointerEvents: 'none',
    transition: 'none' // Disable transitions for performance
  }

  // Render different particle types
  switch (type) {
    case 'sakura':
      return (
        <div
          style={{
            ...particleStyle,
            width: `${particle.size}px`,
            height: `${particle.size * 1.2}px`,
            background: `linear-gradient(135deg, ${color} 0%, ${color}DD 40%, ${color}AA 70%, ${color}77 100%)`,
            borderRadius: '0% 100% 0% 100%',
            transform: `rotate(${particle.rotation}deg)`,
            boxShadow: `0 0 ${particle.size * 0.4}px ${color}88, inset 0 1px 2px rgba(255,255,255,0.3)`,
            border: `0.5px solid ${color}CC`,
            position: 'relative',
          }}
        >
          {/* 花びらの中心線 */}
          <div
            style={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              width: '1px',
              height: '80%',
              background: `linear-gradient(to bottom, transparent 0%, ${color}DD 50%, transparent 100%)`,
              transform: 'translateX(-50%)',
            }}
          />
        </div>
      )

    case 'droplets':
      return (
        <div
          style={{
            ...particleStyle,
            background: `radial-gradient(circle, ${color} 30%, transparent 70%)`,
            borderRadius: '50% 50% 50% 80%',
            filter: 'blur(0.3px)'
          }}
        />
      )

    case 'leaves':
      return (
        <div
          style={{
            ...particleStyle,
            background: `linear-gradient(45deg, ${color} 0%, ${color}AA 50%, ${color}66 100%)`,
            borderRadius: '0 100% 0 100%',
            filter: 'blur(0.4px)'
          }}
        />
      )

    case 'snow':
      return (
        <div
          style={{
            ...particleStyle,
            background: `radial-gradient(circle, ${color} 40%, transparent 70%)`,
            borderRadius: '50%',
            boxShadow: `0 0 ${particle.size/2}px ${color}33`,
            filter: 'blur(0.2px)'
          }}
        />
      )

    default:
      return null
  }
})

ParticleElement.displayName = 'ParticleElement'

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  config,
  className = '',
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const [particles, setParticles] = useState<Particle[]>([])
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  

  // Initialize particles when config changes
  useEffect(() => {
    if (!config.enabled || config.count === 0) {
      setParticles([])
      return
    }

    // Use fallback size if container dimensions are not available
    const effectiveWidth = containerSize.width || window.innerWidth
    const effectiveHeight = containerSize.height || window.innerHeight
    
    if (effectiveWidth === 0 || effectiveHeight === 0) return

    const newParticles: Particle[] = []
    
    for (let i = 0; i < config.count; i++) {
      const size = config.size[0] + Math.random() * (config.size[1] - config.size[0])
      const speed = config.speed[0] + Math.random() * (config.speed[1] - config.speed[0])
      const opacity = config.opacity[0] + Math.random() * (config.opacity[1] - config.opacity[0])
      
      const startX = Math.random() * effectiveWidth
      const startY = -size // Start above screen
      
      newParticles.push({
        id: `particle-${i}`,
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * speed * 0.5, // Horizontal drift
        vy: speed,
        size,
        opacity,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4,
        life: 0,
        maxLife: config.animationDuration + Math.random() * 2000 // Add some variation
      })
    }
    
    setParticles(newParticles)
  }, [config.enabled, config.count, containerSize])

  // Update container size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setContainerSize({ width, height })
      }
    }

    // Initial size after a small delay to ensure DOM is ready
    const timer = setTimeout(updateSize, 100)
    updateSize()
    
    window.addEventListener('resize', updateSize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateSize)
    }
  }, [])


  // Simplified Animation loop
  useEffect(() => {
    if (!config.enabled || particles.length === 0) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      return
    }

    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      lastTime = currentTime

      setParticles(prevParticles => {
        return prevParticles.map(particle => {
          // Simple position update
          const newX = particle.x + particle.vx * deltaTime * 0.01
          const newY = particle.y + particle.vy * deltaTime * 0.01
          
          // Use current container size or fallback
          const currentWidth = containerSize.width || window.innerWidth
          const currentHeight = containerSize.height || window.innerHeight

          // Reset particle if it goes off screen
          if (newY > currentHeight + particle.size) {
            return {
              ...particle,
              x: Math.random() * currentWidth,
              y: -particle.size,
              vx: (Math.random() - 0.5) * (config.speed[0] + config.speed[1]) * 0.5,
              vy: config.speed[0] + Math.random() * (config.speed[1] - config.speed[0])
            }
          }

          return {
            ...particle,
            x: newX,
            y: newY
          }
        })
      })

      if (config.enabled) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [config.enabled, particles.length, containerSize])

  // Don't render if disabled
  if (!config.enabled) {
    return null
  }

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'visible',
    pointerEvents: 'none',
    ...style
  }

  return (
    <div
      ref={containerRef}
      className={`particle-system ${className}`}
      style={containerStyle}
      data-testid="particle-system"
      data-particle-type={config.type}
      data-particle-count={config.count}
    >
      {particles.map(particle => (
        <ParticleElement
          key={particle.id}
          particle={particle}
          type={config.type}
          color={config.color}
        />
      ))}
    </div>
  )
}

export default ParticleSystem