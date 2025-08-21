import { renderHook, act, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { useParticles } from './useParticles'

// Mock requestAnimationFrame and cancelAnimationFrame
const mockRequestAnimationFrame = vi.fn()
const mockCancelAnimationFrame = vi.fn()

global.requestAnimationFrame = mockRequestAnimationFrame
global.cancelAnimationFrame = mockCancelAnimationFrame
global.performance = { now: vi.fn(() => Date.now()) } as any
global.window = {
  innerWidth: 1024,
  innerHeight: 768,
  matchMedia: vi.fn(() => ({
    matches: false
  }))
} as any

describe('useParticles', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockRequestAnimationFrame.mockImplementation((callback) => {
      setTimeout(callback, 16) // Simulate 60FPS
      return 1
    })
  })

  describe('Initialization', () => {
    it('initializes with empty particles array', () => {
      const { result } = renderHook(() => useParticles())
      
      expect(result.current.particles).toEqual([])
      expect(result.current.particleCount).toBe(0)
      expect(result.current.isAnimating).toBe(false)
    })

    it('respects disabled option', () => {
      const { result } = renderHook(() => useParticles({ disabled: true }))
      
      act(() => {
        result.current.spawnParticles(100, 100, 5)
      })
      
      expect(result.current.particles).toEqual([])
      expect(result.current.particleCount).toBe(0)
    })

    it('respects reduced motion preference', () => {
      global.window.matchMedia = vi.fn(() => ({ matches: true }))
      
      const { result } = renderHook(() => useParticles())
      
      act(() => {
        result.current.spawnParticles(100, 100, 5)
      })
      
      expect(result.current.particles).toEqual([])
    })
  })

  describe('Particle Spawning', () => {
    it('spawns particles with correct properties', () => {
      const { result } = renderHook(() => useParticles())
      
      act(() => {
        result.current.spawnParticles(100, 100, 3, 'heart')
      })
      
      expect(result.current.particles).toHaveLength(3)
      expect(result.current.particleCount).toBe(3)
      
      const particle = result.current.particles[0]
      expect(particle.type).toBe('heart')
      expect(particle.x).toBeCloseTo(100, 0) // Within spawn spread
      expect(particle.y).toBeCloseTo(100, 0)
      expect(particle.lifetime).toBe(0)
      expect(particle.opacity).toBe(1)
    })

    it('respects maximum particle limit', () => {
      const { result } = renderHook(() => useParticles({ maxParticles: 5 }))
      
      act(() => {
        result.current.spawnParticles(100, 100, 3)
      })
      
      act(() => {
        result.current.spawnParticles(100, 100, 5)
      })
      
      // Should be limited to 5 particles
      expect(result.current.particles.length).toBeLessThanOrEqual(5)
    })

    it('uses default particle count from config', () => {
      const { result } = renderHook(() => useParticles({
        config: { count: 8 }
      }))
      
      act(() => {
        result.current.spawnParticles(100, 100) // No count specified
      })
      
      expect(result.current.particles).toHaveLength(8)
    })

    it('applies spawn spread to coordinates', () => {
      const { result } = renderHook(() => useParticles())
      
      act(() => {
        result.current.spawnParticles(100, 100, 10)
      })
      
      const particles = result.current.particles
      expect(particles.length).toBe(10)
      
      // All particles should be within spread range
      particles.forEach(particle => {
        expect(particle.x).toBeGreaterThanOrEqual(80) // 100 - 20
        expect(particle.x).toBeLessThanOrEqual(120)   // 100 + 20
        expect(particle.y).toBeGreaterThanOrEqual(90) // 100 - 10
        expect(particle.y).toBeLessThanOrEqual(110)   // 100 + 10
      })
    })
  })

  describe('Particle Types', () => {
    it('creates heart particles', () => {
      const { result } = renderHook(() => useParticles())
      
      act(() => {
        result.current.createHeartBurst(100, 100)
      })
      
      expect(result.current.particles.length).toBeGreaterThan(0)
      result.current.particles.forEach(particle => {
        expect(particle.type).toBe('heart')
      })
    })

    it('creates sparkle particles', () => {
      const { result } = renderHook(() => useParticles())
      
      act(() => {
        result.current.createSparkleEffect(100, 100)
      })
      
      expect(result.current.particles.length).toBeGreaterThan(0)
      result.current.particles.forEach(particle => {
        expect(particle.type).toBe('sparkle')
      })
    })

    it('creates star particles', () => {
      const { result } = renderHook(() => useParticles())
      
      act(() => {
        result.current.createStarEffect(100, 100)
      })
      
      expect(result.current.particles.length).toBeGreaterThan(0)
      result.current.particles.forEach(particle => {
        expect(particle.type).toBe('star')
      })
    })
  })

  describe('Particle Animation', () => {
    it('starts animation when particles are spawned', () => {
      const { result } = renderHook(() => useParticles())
      
      expect(result.current.isAnimating).toBe(false)
      
      act(() => {
        result.current.spawnParticles(100, 100, 1)
      })
      
      expect(mockRequestAnimationFrame).toHaveBeenCalled()
    })

    it('stops animation when no particles remain', async () => {
      const { result } = renderHook(() => useParticles({
        config: { lifetime: 10 } // Very short lifetime
      }))
      
      act(() => {
        result.current.spawnParticles(100, 100, 1)
      })
      
      // Wait for particles to expire
      await waitFor(() => {
        expect(result.current.particles).toHaveLength(0)
      }, { timeout: 100 })
      
      expect(result.current.isAnimating).toBe(false)
    })

    it('updates particle physics over time', async () => {
      const { result } = renderHook(() => useParticles())
      
      act(() => {
        result.current.spawnParticles(100, 100, 1)
      })
      
      const initialParticle = result.current.particles[0]
      const initialY = initialParticle.y
      
      // Simulate animation frame
      act(() => {
        mockRequestAnimationFrame.mock.calls[0][0](performance.now() + 16)
      })
      
      await waitFor(() => {
        const updatedParticle = result.current.particles[0]
        if (updatedParticle) {
          expect(updatedParticle.y).not.toBe(initialY) // Position should change
          expect(updatedParticle.lifetime).toBeGreaterThan(0) // Lifetime should increase
        }
      })
    })

    it('applies gravity to particles', async () => {
      const { result } = renderHook(() => useParticles({
        config: { gravity: 1 }
      }))
      
      act(() => {
        result.current.spawnParticles(100, 100, 1)
      })
      
      const initialParticle = result.current.particles[0]
      const initialVy = initialParticle.vy
      
      // Simulate multiple animation frames
      for (let i = 0; i < 3; i++) {
        act(() => {
          mockRequestAnimationFrame.mock.calls[i][0](performance.now() + (i + 1) * 16)
        })
      }
      
      await waitFor(() => {
        const updatedParticle = result.current.particles[0]
        if (updatedParticle) {
          expect(updatedParticle.vy).toBeGreaterThan(initialVy) // Velocity should increase due to gravity
        }
      })
    })

    it('fades particles over their lifetime', async () => {
      const { result } = renderHook(() => useParticles({
        config: { lifetime: 100 }
      }))
      
      act(() => {
        result.current.spawnParticles(100, 100, 1)
      })
      
      const initialParticle = result.current.particles[0]
      expect(initialParticle.opacity).toBe(1)
      
      // Simulate animation frames to age the particle
      for (let i = 0; i < 5; i++) {
        act(() => {
          mockRequestAnimationFrame.mock.calls[i][0](performance.now() + (i + 1) * 50)
        })
      }
      
      await waitFor(() => {
        const updatedParticle = result.current.particles[0]
        if (updatedParticle) {
          expect(updatedParticle.opacity).toBeLessThan(1)
        }
      })
    })
  })

  describe('Particle Cleanup', () => {
    it('removes expired particles', async () => {
      const { result } = renderHook(() => useParticles({
        config: { lifetime: 10 } // Very short lifetime
      }))
      
      act(() => {
        result.current.spawnParticles(100, 100, 3)
      })
      
      expect(result.current.particles).toHaveLength(3)
      
      // Wait for particles to expire
      await waitFor(() => {
        expect(result.current.particles).toHaveLength(0)
      }, { timeout: 200 })
    })

    it('removes out-of-bounds particles', async () => {
      const { result } = renderHook(() => useParticles({
        config: { 
          speed: { min: 100, max: 200 }, // Fast particles
          gravity: 10 // Strong gravity
        }
      }))
      
      act(() => {
        result.current.spawnParticles(100, 100, 2)
      })
      
      expect(result.current.particles).toHaveLength(2)
      
      // Simulate many animation frames to move particles out of bounds
      for (let i = 0; i < 50; i++) {
        act(() => {
          mockRequestAnimationFrame.mock.calls[i % mockRequestAnimationFrame.mock.calls.length][0](
            performance.now() + (i + 1) * 16
          )
        })
      }
      
      await waitFor(() => {
        expect(result.current.particles.length).toBeLessThan(2)
      }, { timeout: 1000 })
    })

    it('clears all particles when requested', () => {
      const { result } = renderHook(() => useParticles())
      
      act(() => {
        result.current.spawnParticles(100, 100, 5)
      })
      
      expect(result.current.particles).toHaveLength(5)
      
      act(() => {
        result.current.clearParticles()
      })
      
      expect(result.current.particles).toHaveLength(0)
      expect(result.current.isAnimating).toBe(false)
    })
  })

  describe('Performance', () => {
    it('handles large numbers of particles efficiently', () => {
      const { result } = renderHook(() => useParticles({ maxParticles: 100 }))
      
      act(() => {
        result.current.spawnParticles(100, 100, 50)
        result.current.spawnParticles(200, 200, 50)
      })
      
      expect(result.current.particles.length).toBeLessThanOrEqual(100)
      expect(result.current.particleCount).toBeLessThanOrEqual(100)
    })

    it('cancels animation frame on cleanup', () => {
      const { result, unmount } = renderHook(() => useParticles())
      
      act(() => {
        result.current.spawnParticles(100, 100, 1)
      })
      
      unmount()
      
      expect(mockCancelAnimationFrame).toHaveBeenCalled()
    })

    it('reuses animation loop efficiently', () => {
      const { result } = renderHook(() => useParticles())
      
      // Spawn particles multiple times
      act(() => {
        result.current.spawnParticles(100, 100, 1)
      })
      
      const firstCallCount = mockRequestAnimationFrame.mock.calls.length
      
      act(() => {
        result.current.spawnParticles(200, 200, 1)
      })
      
      // Should not start multiple animation loops
      expect(mockRequestAnimationFrame.mock.calls.length).toBe(firstCallCount)
    })
  })

  describe('Configuration Options', () => {
    it('applies custom particle configuration', () => {
      const customConfig = {
        count: 15,
        colors: ['#ff0000', '#00ff00'],
        size: { min: 10, max: 20 },
        speed: { min: 1, max: 3 },
        gravity: 0.8,
        lifetime: 3000
      }
      
      const { result } = renderHook(() => useParticles({ config: customConfig }))
      
      act(() => {
        result.current.spawnParticles(100, 100)
      })
      
      expect(result.current.particles).toHaveLength(15)
      
      const particle = result.current.particles[0]
      expect(customConfig.colors).toContain(particle.color)
      expect(particle.size).toBeGreaterThanOrEqual(10)
      expect(particle.size).toBeLessThanOrEqual(20)
      expect(particle.maxLifetime).toBe(3000)
    })

    it('handles auto cleanup option', async () => {
      const { result } = renderHook(() => useParticles({ 
        autoCleanup: true,
        config: { lifetime: 10 }
      }))
      
      act(() => {
        result.current.spawnParticles(100, 100, 1)
      })
      
      expect(result.current.isAnimating).toBe(true)
      
      // Wait for particles to expire and auto cleanup
      await waitFor(() => {
        expect(result.current.particles).toHaveLength(0)
        expect(result.current.isAnimating).toBe(false)
      }, { timeout: 200 })
    })
  })
})