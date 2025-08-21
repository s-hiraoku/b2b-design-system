import { useState, useCallback, useRef, useEffect } from 'react'
import { particleConfigs, type ParticleConfig, animationUtils } from '@/lib/kawaii-animations'

export interface Particle {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
  rotation: number
  rotationSpeed: number
  lifetime: number
  maxLifetime: number
  type: 'heart' | 'sparkle' | 'star' | 'custom'
}

export interface UseParticlesOptions {
  config?: Partial<ParticleConfig>
  autoCleanup?: boolean
  maxParticles?: number
  disabled?: boolean
}

/**
 * useParticles - Custom hook for kawaii particle animations
 * Optimized for 60FPS performance with RAF-based animation loop
 */
export const useParticles = (options: UseParticlesOptions = {}) => {
  const {
    config = particleConfigs.hearts,
    autoCleanup = true,
    maxParticles = 50,
    disabled = false
  } = options

  const [particles, setParticles] = useState<Particle[]>([])
  const animationFrameRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const particleIdCounter = useRef<number>(0)

  // Respect reduced motion preferences - with fallback for test environment
  const respectsReducedMotion = typeof window !== 'undefined' 
    ? animationUtils.respectsReducedMotion()
    : false
  const shouldAnimate = !disabled && !respectsReducedMotion

  /**
   * Creates a new particle with kawaii properties
   */
  const createParticle = useCallback((
    x: number, 
    y: number, 
    type: Particle['type'] = 'heart'
  ): Particle => {
    const particleConfig = { ...particleConfigs.hearts, ...config }
    
    return {
      id: `particle-${particleIdCounter.current++}`,
      x,
      y,
      vx: animationUtils.randomBetween(-particleConfig.speed.max, particleConfig.speed.max),
      vy: animationUtils.randomBetween(-particleConfig.speed.max, -particleConfig.speed.min),
      size: animationUtils.randomBetween(particleConfig.size.min, particleConfig.size.max),
      color: particleConfig.colors[Math.floor(Math.random() * particleConfig.colors.length)],
      opacity: 1,
      rotation: 0,
      rotationSpeed: animationUtils.randomBetween(-180, 180), // degrees per second
      lifetime: 0,
      maxLifetime: particleConfig.lifetime,
      type
    }
  }, [config])

  /**
   * Updates particle physics with optimized calculations
   */
  const updateParticle = useCallback((particle: Particle, deltaTime: number): Particle => {
    const particleConfig = { ...particleConfigs.hearts, ...config }
    
    // Physics updates
    const newVy = particle.vy + particleConfig.gravity * deltaTime * 0.001
    const newX = particle.x + particle.vx * deltaTime * 0.1
    const newY = particle.y + newVy * deltaTime * 0.1
    
    // Rotation update
    const newRotation = particle.rotation + particle.rotationSpeed * deltaTime * 0.001
    
    // Lifetime and opacity calculation
    const newLifetime = particle.lifetime + deltaTime
    const lifeRatio = newLifetime / particle.maxLifetime
    const newOpacity = Math.max(0, 1 - lifeRatio)

    return {
      ...particle,
      x: newX,
      y: newY,
      vy: newVy,
      rotation: newRotation,
      lifetime: newLifetime,
      opacity: newOpacity
    }
  }, [config])

  /**
   * Animation loop using requestAnimationFrame for 60FPS performance
   */
  const animate = useCallback((currentTime: number) => {
    if (!shouldAnimate) return

    const deltaTime = currentTime - lastTimeRef.current
    lastTimeRef.current = currentTime

    setParticles(prevParticles => {
      if (prevParticles.length === 0) return prevParticles

      const updatedParticles = prevParticles
        .map(particle => updateParticle(particle, deltaTime))
        .filter(particle => {
          // Remove particles that are out of bounds or expired
          const expired = particle.lifetime >= particle.maxLifetime
          const outOfBounds = particle.y > window.innerHeight + 100 || 
                             particle.x < -100 || 
                             particle.x > window.innerWidth + 100
          
          return !expired && !outOfBounds
        })

      // Continue animation if particles exist
      if (updatedParticles.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }

      return updatedParticles
    })
  }, [shouldAnimate, updateParticle])

  /**
   * Starts the animation loop
   */
  const startAnimation = useCallback(() => {
    if (!shouldAnimate || animationFrameRef.current) return
    
    lastTimeRef.current = performance.now()
    animationFrameRef.current = requestAnimationFrame(animate)
  }, [shouldAnimate, animate])

  /**
   * Stops the animation loop
   */
  const stopAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = undefined
    }
  }, [])

  /**
   * Spawns particles at specified coordinates
   */
  const spawnParticles = useCallback((
    x: number, 
    y: number, 
    count?: number, 
    type: Particle['type'] = 'heart'
  ) => {
    if (!shouldAnimate) return

    const particleConfig = { ...particleConfigs.hearts, ...config }
    const spawnCount = count ?? particleConfig.count

    const newParticles = Array.from({ length: spawnCount }, () => 
      createParticle(
        x + animationUtils.randomBetween(-20, 20), // Add some spawn spread
        y + animationUtils.randomBetween(-10, 10),
        type
      )
    )

    setParticles(prevParticles => {
      const combined = [...prevParticles, ...newParticles]
      
      // Limit total particles for performance
      const limited = combined.length > maxParticles 
        ? combined.slice(-maxParticles)
        : combined

      // Start animation if not already running
      if (limited.length > 0 && !animationFrameRef.current) {
        startAnimation()
      }

      return limited
    })
  }, [shouldAnimate, config, maxParticles, createParticle, startAnimation])

  /**
   * Clears all particles
   */
  const clearParticles = useCallback(() => {
    setParticles([])
    stopAnimation()
  }, [stopAnimation])

  /**
   * Creates heart particles for like animations
   */
  const createHeartBurst = useCallback((x: number, y: number) => {
    spawnParticles(x, y, undefined, 'heart')
  }, [spawnParticles])

  /**
   * Creates sparkle particles for achievements
   */
  const createSparkleEffect = useCallback((x: number, y: number) => {
    spawnParticles(x, y, particleConfigs.sparkles.count, 'sparkle')
  }, [spawnParticles])

  /**
   * Creates star particles for special events
   */
  const createStarEffect = useCallback((x: number, y: number) => {
    spawnParticles(x, y, particleConfigs.stars.count, 'star')
  }, [spawnParticles])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAnimation()
    }
  }, [stopAnimation])

  // Auto cleanup when no particles remain
  useEffect(() => {
    if (autoCleanup && particles.length === 0) {
      stopAnimation()
    }
  }, [particles.length, autoCleanup, stopAnimation])

  return {
    particles,
    spawnParticles,
    clearParticles,
    createHeartBurst,
    createSparkleEffect,
    createStarEffect,
    isAnimating: !!animationFrameRef.current,
    particleCount: particles.length
  }
}

export default useParticles