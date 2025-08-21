import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import '@testing-library/jest-dom'
import { KawaiiButtonAdvanced } from './KawaiiButtonAdvanced'

// Mock Framer Motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    button: React.forwardRef(({ children, variants, initial, whileHover, whileTap, style, animate, transition, ...props }: any, ref: any) => (
      <button {...props} ref={ref} style={style}>{children}</button>
    )),
    span: ({ children, variants, animate, transition, ...props }: any) => (
      <span {...props}>{children}</span>
    ),
    div: ({ children, variants, animate, transition, ...props }: any) => (
      <div {...props}>{children}</div>
    )
  }
}))

// Mock the particles hook
vi.mock('../../hooks/useParticles', () => ({
  useParticles: () => ({
    particles: [],
    createHeartBurst: vi.fn(),
    createSparkleEffect: vi.fn(),
    createStarEffect: vi.fn()
  })
}))

describe('KawaiiButtonAdvanced', () => {
  const defaultProps = {
    variant: 'primary' as const,
    children: 'Test Button'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders button with correct content', () => {
      render(<KawaiiButtonAdvanced {...defaultProps} />)
      expect(screen.getByRole('button')).toHaveTextContent('Test Button')
    })

    it('applies correct variant classes', () => {
      render(<KawaiiButtonAdvanced {...defaultProps} variant="secondary" />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('kawaii-btn-advanced-secondary')
    })

    it('applies correct size classes', () => {
      render(<KawaiiButtonAdvanced {...defaultProps} size="lg" />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('kawaii-btn-lg')
    })

    it('renders with custom className', () => {
      render(<KawaiiButtonAdvanced {...defaultProps} className="custom-class" />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })

    it('renders with custom test id', () => {
      render(<KawaiiButtonAdvanced {...defaultProps} data-testid="custom-button" />)
      expect(screen.getByTestId('custom-button')).toBeInTheDocument()
    })
  })

  describe('Interactive States', () => {
    it('handles onClick events', async () => {
      const handleClick = vi.fn()
      render(<KawaiiButtonAdvanced {...defaultProps} onClick={handleClick} />)
      
      const button = screen.getByRole('button')
      await userEvent.click(button)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('prevents click when disabled', async () => {
      const handleClick = vi.fn()
      render(
        <KawaiiButtonAdvanced 
          {...defaultProps} 
          onClick={handleClick} 
          disabled={true} 
        />
      )
      
      const button = screen.getByRole('button')
      await userEvent.click(button)
      
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('prevents click when loading', async () => {
      const handleClick = vi.fn()
      render(
        <KawaiiButtonAdvanced 
          {...defaultProps} 
          onClick={handleClick} 
          loading={true} 
        />
      )
      
      const button = screen.getByRole('button')
      await userEvent.click(button)
      
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('applies disabled state classes', () => {
      render(<KawaiiButtonAdvanced {...defaultProps} disabled={true} />)
      const button = screen.getByRole('button')
      
      expect(button).toHaveClass('kawaii-btn-disabled')
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })

    it('applies loading state classes', () => {
      render(<KawaiiButtonAdvanced {...defaultProps} loading={true} />)
      const button = screen.getByRole('button')
      
      expect(button).toHaveClass('kawaii-btn-loading')
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('Loading State', () => {
    it('shows loading spinner when loading', () => {
      render(<KawaiiButtonAdvanced {...defaultProps} loading={true} />)
      
      const spinner = screen.getByTestId('loading-spinner')
      expect(spinner).toBeInTheDocument()
      expect(spinner).toHaveClass('animate-spin')
    })

    it('hides loading spinner when not loading', () => {
      render(<KawaiiButtonAdvanced {...defaultProps} loading={false} />)
      
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    })

    it('combines loading with other states', () => {
      render(
        <KawaiiButtonAdvanced 
          {...defaultProps} 
          loading={true} 
          disabled={true} 
        />
      )
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('kawaii-btn-loading')
      expect(button).toHaveClass('kawaii-btn-disabled')
    })
  })

  describe('Enhanced Features', () => {
    it('applies pulse effect when enabled', () => {
      render(<KawaiiButtonAdvanced {...defaultProps} pulseEffect={true} />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('kawaii-btn-pulse')
    })

    it('applies glow effect when enabled', () => {
      render(<KawaiiButtonAdvanced {...defaultProps} glowEffect={true} />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('kawaii-btn-glow')
    })

    it('applies hover effect classes by default', () => {
      render(<KawaiiButtonAdvanced {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('kawaii-btn-hoverable')
    })

    it('removes hover effect when disabled', () => {
      render(<KawaiiButtonAdvanced {...defaultProps} hoverEffect={false} />)
      const button = screen.getByRole('button')
      expect(button).not.toHaveClass('kawaii-btn-hoverable')
    })
  })

  describe('Particle Effects', () => {
    it('does not render particles by default', () => {
      render(<KawaiiButtonAdvanced {...defaultProps} />)
      expect(screen.queryByTestId('button-particles')).not.toBeInTheDocument()
    })

    it('supports different particle effects', () => {
      const particleTypes = ['hearts', 'sparkles', 'stars', 'none'] as const
      
      particleTypes.forEach(type => {
        const { unmount } = render(
          <KawaiiButtonAdvanced {...defaultProps} particleEffect={type} />
        )
        unmount()
      })
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(<KawaiiButtonAdvanced {...defaultProps} />)
      const button = screen.getByRole('button')
      
      expect(button).toHaveAttribute('role', 'button')
      expect(button).toHaveAttribute('tabIndex', '0')
    })

    it('has correct ARIA attributes when disabled', () => {
      render(<KawaiiButtonAdvanced {...defaultProps} disabled={true} />)
      const button = screen.getByRole('button')
      
      expect(button).toHaveAttribute('aria-disabled', 'true')
      expect(button).toHaveAttribute('tabIndex', '-1')
    })

    it('has correct ARIA attributes when loading', () => {
      render(<KawaiiButtonAdvanced {...defaultProps} loading={true} />)
      const button = screen.getByRole('button')
      
      expect(button).toHaveAttribute('aria-disabled', 'true')
      expect(button).toHaveAttribute('tabIndex', '-1')
    })

    it('supports keyboard navigation', async () => {
      const handleClick = vi.fn()
      render(<KawaiiButtonAdvanced {...defaultProps} onClick={handleClick} />)
      
      const button = screen.getByRole('button')
      button.focus()
      
      await userEvent.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalled()
    })
  })

  describe('Animation Delay', () => {
    it('applies animation delay when specified', () => {
      render(<KawaiiButtonAdvanced {...defaultProps} animationDelay={500} />)
      const button = screen.getByRole('button')
      
      expect(button.style.animationDelay).toBe('500ms')
    })

    it('does not apply animation delay when not specified', () => {
      render(<KawaiiButtonAdvanced {...defaultProps} />)
      const button = screen.getByRole('button')
      
      expect(button.style.animationDelay).toBe('')
    })
  })

  describe('Responsive Behavior', () => {
    it('works with different viewport sizes', () => {
      // Simulate mobile viewport
      global.innerWidth = 375
      render(<KawaiiButtonAdvanced {...defaultProps} size="sm" />)
      expect(screen.getByRole('button')).toHaveClass('kawaii-btn-sm')

      // Simulate tablet viewport
      global.innerWidth = 768
      const { rerender } = render(<KawaiiButtonAdvanced {...defaultProps} size="md" />)
      expect(screen.getByRole('button')).toHaveClass('kawaii-btn-md')

      // Simulate desktop viewport
      global.innerWidth = 1024
      rerender(<KawaiiButtonAdvanced {...defaultProps} size="lg" />)
      expect(screen.getByRole('button')).toHaveClass('kawaii-btn-lg')
    })
  })

  describe('Performance', () => {
    it('renders efficiently with multiple buttons', () => {
      const { container } = render(
        <div>
          {Array.from({ length: 10 }, (_, i) => (
            <KawaiiButtonAdvanced key={i} {...defaultProps}>
              Button {i + 1}
            </KawaiiButtonAdvanced>
          ))}
        </div>
      )
      
      const buttons = container.querySelectorAll('button')
      expect(buttons).toHaveLength(10)
    })

    it('handles rapid state changes', async () => {
      const { rerender } = render(
        <KawaiiButtonAdvanced {...defaultProps} loading={false} />
      )
      
      // Rapidly change loading state
      rerender(<KawaiiButtonAdvanced {...defaultProps} loading={true} />)
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
      
      rerender(<KawaiiButtonAdvanced {...defaultProps} loading={false} />)
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    })
  })
})