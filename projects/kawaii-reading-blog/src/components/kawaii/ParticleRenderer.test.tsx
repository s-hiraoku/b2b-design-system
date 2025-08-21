import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import ParticleRenderer from './ParticleRenderer'
import type { Particle } from '../../hooks/useParticles'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, style, ...props }: any) => (
      <div {...props} style={style}>{children}</div>
    )
  }
}))

describe('ParticleRenderer', () => {
  const mockParticles: Particle[] = [
    {
      id: 'particle-1',
      x: 100,
      y: 200,
      vx: 1,
      vy: -2,
      size: 12,
      color: '#ff69b4',
      opacity: 0.8,
      rotation: 45,
      rotationSpeed: 90,
      lifetime: 500,
      maxLifetime: 2000,
      type: 'heart'
    },
    {
      id: 'particle-2',
      x: 150,
      y: 250,
      vx: -1,
      vy: -1.5,
      size: 8,
      color: '#ffd700',
      opacity: 0.6,
      rotation: 90,
      rotationSpeed: -120,
      lifetime: 800,
      maxLifetime: 1500,
      type: 'sparkle'
    },
    {
      id: 'particle-3',
      x: 200,
      y: 300,
      vx: 0.5,
      vy: -1,
      size: 10,
      color: '#a78bfa',
      opacity: 1,
      rotation: 0,
      rotationSpeed: 60,
      lifetime: 100,
      maxLifetime: 1800,
      type: 'star'
    }
  ]

  describe('Rendering', () => {
    it('renders particles correctly', () => {
      render(<ParticleRenderer particles={mockParticles} />)
      
      // Check if particle container is rendered
      expect(screen.getByTestId('particle-renderer')).toBeInTheDocument()
      
      // Check if all particles are rendered
      mockParticles.forEach(particle => {
        expect(screen.getByTestId(`particle-${particle.id}`)).toBeInTheDocument()
      })
    })

    it('renders empty container when no particles', () => {
      render(<ParticleRenderer particles={[]} />)
      
      const container = screen.getByTestId('particle-renderer')
      expect(container).toBeInTheDocument()
      expect(container.children).toHaveLength(0)
    })

    it('applies correct positioning styles', () => {
      render(<ParticleRenderer particles={mockParticles} />)
      
      const firstParticle = screen.getByTestId('particle-particle-1')
      expect(firstParticle).toHaveStyle({
        left: '100px',
        top: '200px'
      })
    })

    it('applies correct size and opacity', () => {
      render(<ParticleRenderer particles={mockParticles} />)
      
      const firstParticle = screen.getByTestId('particle-particle-1')
      expect(firstParticle).toHaveStyle({
        width: '12px',
        height: '12px',
        opacity: '0.8'
      })
    })
  })

  describe('Particle Types', () => {
    it('renders heart particles with correct emoji', () => {
      const heartParticles = [mockParticles[0]]
      render(<ParticleRenderer particles={heartParticles} />)
      
      expect(screen.getByText('💖')).toBeInTheDocument()
    })

    it('renders sparkle particles with correct emoji', () => {
      const sparkleParticles = [mockParticles[1]]
      render(<ParticleRenderer particles={sparkleParticles} />)
      
      expect(screen.getByText('✨')).toBeInTheDocument()
    })

    it('renders star particles with correct emoji', () => {
      const starParticles = [mockParticles[2]]
      render(<ParticleRenderer particles={starParticles} />)
      
      expect(screen.getByText('⭐')).toBeInTheDocument()
    })

    it('handles custom particle types', () => {
      const customParticle: Particle = {
        ...mockParticles[0],
        id: 'custom-particle',
        type: 'custom'
      }
      
      render(<ParticleRenderer particles={[customParticle]} />)
      
      expect(screen.getByTestId('particle-custom-particle')).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('handles large numbers of particles efficiently', () => {
      const manyParticles = Array.from({ length: 100 }, (_, index) => ({
        ...mockParticles[0],
        id: `particle-${index}`,
        x: Math.random() * 500,
        y: Math.random() * 500
      }))

      const startTime = performance.now()
      render(<ParticleRenderer particles={manyParticles} />)
      const endTime = performance.now()

      // Rendering should be fast
      expect(endTime - startTime).toBeLessThan(100)
      
      // All particles should be rendered
      expect(screen.getAllByTestId(/particle-particle-/)).toHaveLength(100)
    })

    it('updates efficiently when particles change', () => {
      const { rerender } = render(<ParticleRenderer particles={mockParticles} />)
      
      expect(screen.getAllByTestId(/particle-/)).toHaveLength(3)
      
      // Update with fewer particles
      const fewerParticles = mockParticles.slice(0, 1)
      rerender(<ParticleRenderer particles={fewerParticles} />)
      
      expect(screen.getAllByTestId(/particle-/)).toHaveLength(1)
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<ParticleRenderer particles={mockParticles} />)
      
      const container = screen.getByTestId('particle-renderer')
      expect(container).toHaveAttribute('aria-live', 'polite')
      expect(container).toHaveAttribute('aria-label', expect.stringContaining('particles'))
    })

    it('respects reduced motion preferences', () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn(() => ({
          matches: true, // prefers-reduced-motion: reduce
          addListener: vi.fn(),
          removeListener: vi.fn()
        }))
      })

      render(<ParticleRenderer particles={mockParticles} />)
      
      // Should still render particles but potentially without animations
      expect(screen.getByTestId('particle-renderer')).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('handles malformed particle data gracefully', () => {
      const malformedParticle = {
        ...mockParticles[0],
        x: null,
        y: undefined,
        size: 'invalid'
      } as any

      expect(() => {
        render(<ParticleRenderer particles={[malformedParticle]} />)
      }).not.toThrow()
    })

    it('handles undefined particles array', () => {
      expect(() => {
        render(<ParticleRenderer particles={undefined as any} />)
      }).not.toThrow()
    })

    it('handles null particles array', () => {
      expect(() => {
        render(<ParticleRenderer particles={null as any} />)
      }).not.toThrow()
    })
  })

  describe('Animation Integration', () => {
    it('applies rotation transforms correctly', () => {
      render(<ParticleRenderer particles={mockParticles} />)
      
      const firstParticle = screen.getByTestId('particle-particle-1')
      expect(firstParticle).toHaveStyle({
        transform: expect.stringContaining('rotate(45deg)')
      })
    })

    it('uses will-change for performance optimization', () => {
      render(<ParticleRenderer particles={mockParticles} />)
      
      const firstParticle = screen.getByTestId('particle-particle-1')
      expect(firstParticle).toHaveStyle({
        willChange: 'transform, opacity'
      })
    })
  })
})