import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { LiquidGlassCard } from './LiquidGlassCard'
import type { GlassVariant, SeasonalTheme } from '@/lib/types/glass'

// Mock performance.now for consistent testing
const mockPerformanceNow = vi.fn(() => 1000)
Object.defineProperty(global.performance, 'now', {
  value: mockPerformanceNow,
})

describe('LiquidGlassCard', () => {
  beforeEach(() => {
    // Reset performance mock
    mockPerformanceNow.mockReturnValue(1000)
    
    // Reset matchMedia to default (no reduced motion)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false, // Default to no reduced motion for all tests unless specifically overridden
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('should render children content', () => {
      render(
        <LiquidGlassCard data-testid="glass-card">
          <p>Test Content</p>
        </LiquidGlassCard>
      )
      
      expect(screen.getByText('Test Content')).toBeInTheDocument()
      expect(screen.getByTestId('glass-card')).toBeInTheDocument()
    })

    it('should apply default medium variant styles', () => {
      render(
        <LiquidGlassCard data-testid="glass-card">
          <p>Content</p>
        </LiquidGlassCard>
      )
      
      const card = screen.getByTestId('glass-card')
      
      // Check CSS custom properties are set
      expect(card).toHaveStyle('--glass-blur: 16px')
      expect(card).toHaveStyle('--glass-opacity: 0.1')
      expect(card).toHaveStyle('--glass-saturation: 1.8')
      expect(card).toHaveStyle('--glass-brightness: 1.1')
    })

    it('should apply correct backdrop-filter styles', () => {
      render(
        <LiquidGlassCard data-testid="glass-card">
          <p>Content</p>
        </LiquidGlassCard>
      )
      
      const card = screen.getByTestId('glass-card')
      
      // Check that backdrop-filter support is detected
      expect(card).toHaveClass('backdrop-supported')
      expect(card).toHaveAttribute('data-backdrop-supported', 'true')
      
      // Note: backdrop-filter may not appear in DOM style attribute in JSDOM testing environment
      // But the component should still have the necessary classes and data attributes
      expect(card).toHaveStyle('--glass-blur: 16px')
      expect(card).toHaveStyle('background-color: rgba(255, 255, 255, 0.1)')
    })
  })

  describe('Glass Variants', () => {
    const variants: Array<{ variant: GlassVariant; expectedBlur: number; expectedOpacity: number }> = [
      { variant: 'subtle', expectedBlur: 8, expectedOpacity: 0.05 },
      { variant: 'medium', expectedBlur: 16, expectedOpacity: 0.1 },
      { variant: 'intense', expectedBlur: 24, expectedOpacity: 0.15 },
      { variant: 'dark', expectedBlur: 16, expectedOpacity: 0.1 },
    ]

    variants.forEach(({ variant, expectedBlur, expectedOpacity }) => {
      it(`should apply ${variant} variant styles correctly`, () => {
        render(
          <LiquidGlassCard variant={variant} data-testid="glass-card">
            <p>Content</p>
          </LiquidGlassCard>
        )
        
        const card = screen.getByTestId('glass-card')
        expect(card).toHaveStyle(`--glass-blur: ${expectedBlur}px`)
        expect(card).toHaveStyle(`--glass-opacity: ${expectedOpacity}`)
      })
    })

    it('should apply dark variant with reduced brightness', () => {
      render(
        <LiquidGlassCard variant="dark" data-testid="glass-card">
          <p>Content</p>
        </LiquidGlassCard>
      )
      
      const card = screen.getByTestId('glass-card')
      expect(card).toHaveStyle('--glass-brightness: 0.9')
    })
  })

  describe('Seasonal Themes', () => {
    const themes: Array<{ theme: SeasonalTheme; expectedPrimary: string }> = [
      { theme: 'spring', expectedPrimary: 'rgba(52, 211, 153, 0.15)' },
      { theme: 'summer', expectedPrimary: 'rgba(251, 191, 36, 0.15)' },
      { theme: 'autumn', expectedPrimary: 'rgba(251, 146, 60, 0.15)' },
      { theme: 'winter', expectedPrimary: 'rgba(147, 197, 253, 0.15)' },
    ]

    themes.forEach(({ theme, expectedPrimary }) => {
      it(`should apply ${theme} theme colors`, () => {
        render(
          <LiquidGlassCard theme={theme} data-testid="glass-card">
            <p>Content</p>
          </LiquidGlassCard>
        )
        
        const card = screen.getByTestId('glass-card')
        expect(card).toHaveStyle(`--glass-theme-primary: ${expectedPrimary}`)
      })
    })
  })

  describe('Interactive Features', () => {
    it('should handle mouse interactions when interactive=true', async () => {
      render(
        <LiquidGlassCard interactive data-testid="glass-card">
          <p>Content</p>
        </LiquidGlassCard>
      )
      
      const card = screen.getByTestId('glass-card')
      
      // Mouse enter should add hover effects
      fireEvent.mouseEnter(card)
      await waitFor(() => {
        expect(card).toHaveClass('glass-interactive')
      })

      // Mouse move should update transform
      // Mock getBoundingClientRect for predictable calculations
      const mockRect = {
        left: 0,
        top: 0,
        width: 200,
        height: 100,
        right: 200,
        bottom: 100,
      }
      card.getBoundingClientRect = vi.fn(() => mockRect as DOMRect)
      
      fireEvent.mouseMove(card, { clientX: 150, clientY: 75 })
      await waitFor(() => {
        // With clientX=150, clientY=75, center at (100,50)
        // x = ((150-100)/200)*100 = 25, clamped and scaled by 0.1 = 2.5px
        // y = ((75-50)/100)*100 = 25, clamped and scaled by 0.1 = 2.5px
        expect(card).toHaveStyle('transform: translate3d(2.5px, 2.5px, 0)')
      })

      // Mouse leave should reset transform
      fireEvent.mouseLeave(card)
      await waitFor(() => {
        expect(card).toHaveStyle('transform: translate3d(0px, 0px, 0)')
      })
    })

    it('should not apply interactive effects when interactive=false', () => {
      render(
        <LiquidGlassCard interactive={false} data-testid="glass-card">
          <p>Content</p>
        </LiquidGlassCard>
      )
      
      const card = screen.getByTestId('glass-card')
      
      fireEvent.mouseMove(card, { clientX: 100, clientY: 50 })
      expect(card).not.toHaveClass('glass-interactive')
    })
  })

  describe('Animation Features', () => {
    it('should apply animation classes when animated=true', () => {
      render(
        <LiquidGlassCard animated data-testid="glass-card">
          <p>Content</p>
        </LiquidGlassCard>
      )
      
      const card = screen.getByTestId('glass-card')
      expect(card).toHaveClass('glass-animated')
    })

    it('should not apply animation when animated=false', () => {
      render(
        <LiquidGlassCard animated={false} data-testid="glass-card">
          <p>Content</p>
        </LiquidGlassCard>
      )
      
      const card = screen.getByTestId('glass-card')
      expect(card).not.toHaveClass('glass-animated')
    })
  })

  describe('Custom Effects', () => {
    it('should override default styles with custom effect config', () => {
      const customEffect = {
        blur: 32,
        opacity: 0.25,
        saturation: 2.5,
        brightness: 1.3,
      }

      render(
        <LiquidGlassCard effect={customEffect} data-testid="glass-card">
          <p>Content</p>
        </LiquidGlassCard>
      )
      
      const card = screen.getByTestId('glass-card')
      expect(card).toHaveStyle('--glass-blur: 32px')
      expect(card).toHaveStyle('--glass-opacity: 0.25')
      expect(card).toHaveStyle('--glass-saturation: 2.5')
      expect(card).toHaveStyle('--glass-brightness: 1.3')
    })

    it('should merge partial custom effects with defaults', () => {
      const partialEffect = {
        blur: 40,
        opacity: 0.2,
      }

      render(
        <LiquidGlassCard effect={partialEffect} data-testid="glass-card">
          <p>Content</p>
        </LiquidGlassCard>
      )
      
      const card = screen.getByTestId('glass-card')
      expect(card).toHaveStyle('--glass-blur: 40px')
      expect(card).toHaveStyle('--glass-opacity: 0.2')
      // Should keep default values for other properties
      expect(card).toHaveStyle('--glass-saturation: 1.8')
      expect(card).toHaveStyle('--glass-brightness: 1.1')
    })
  })

  describe('Accessibility', () => {
    it('should be keyboard focusable when interactive', () => {
      render(
        <LiquidGlassCard interactive data-testid="glass-card" tabIndex={0}>
          <p>Content</p>
        </LiquidGlassCard>
      )
      
      const card = screen.getByTestId('glass-card')
      expect(card).toHaveAttribute('tabIndex', '0')
      
      card.focus()
      expect(card).toHaveFocus()
    })

    it('should respect reduced motion preferences', () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      })

      render(
        <LiquidGlassCard animated data-testid="glass-card">
          <p>Content</p>
        </LiquidGlassCard>
      )
      
      const card = screen.getByTestId('glass-card')
      expect(card).toHaveClass('motion-reduced')
    })
  })

  describe('Performance', () => {
    it('should detect backdrop-filter support', () => {
      render(
        <LiquidGlassCard data-testid="glass-card">
          <p>Content</p>
        </LiquidGlassCard>
      )
      
      const card = screen.getByTestId('glass-card')
      expect(card).toHaveClass('backdrop-supported')
    })

    it('should apply fallback styles when backdrop-filter is not supported', () => {
      // Mock CSS.supports to return false
      const originalSupports = window.CSS.supports
      window.CSS.supports = vi.fn().mockReturnValue(false)

      render(
        <LiquidGlassCard data-testid="glass-card">
          <p>Content</p>
        </LiquidGlassCard>
      )
      
      const card = screen.getByTestId('glass-card')
      expect(card).toHaveClass('backdrop-fallback')
      expect(card).toHaveStyle('background-color: rgba(255, 255, 255, 0.9)')

      // Restore original
      window.CSS.supports = originalSupports
    })

    it('should use transform3d for GPU acceleration', async () => {
      // Mock no reduced motion for this test
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: false, // Explicitly no reduced motion
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      })

      render(
        <LiquidGlassCard interactive data-testid="glass-card">
          <p>Content</p>
        </LiquidGlassCard>
      )
      
      const card = screen.getByTestId('glass-card')
      
      // Verify no reduced motion
      expect(card).toHaveAttribute('data-reduced-motion', 'false')
      
      // Mock getBoundingClientRect for predictable calculations
      const mockRect = {
        left: 0,
        top: 0,
        width: 200,
        height: 100,
        right: 200,
        bottom: 100,
      }
      card.getBoundingClientRect = vi.fn(() => mockRect as DOMRect)
      
      fireEvent.mouseEnter(card)
      fireEvent.mouseMove(card, { clientX: 150, clientY: 75 })
      
      await waitFor(() => {
        // Should use translate3d for hardware acceleration when reduced motion is disabled
        expect(card).toHaveStyle('transform: translate3d(2.5px, 2.5px, 0)')
      })
    })

    it('should measure and report performance metrics', async () => {
      const onPerformanceMetrics = vi.fn()
      
      render(
        <LiquidGlassCard 
          data-testid="glass-card"
          onPerformanceMetrics={onPerformanceMetrics}
        >
          <p>Content</p>
        </LiquidGlassCard>
      )
      
      await waitFor(() => {
        expect(onPerformanceMetrics).toHaveBeenCalledWith({
          renderTime: expect.any(Number),
          animationFrames: 0,
          gpuAccelerated: true,
          backdropSupported: true,
        })
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle invalid effect values gracefully', () => {
      const invalidEffect = {
        blur: -10, // Invalid: negative blur
        opacity: 2, // Invalid: opacity > 1
        saturation: -1, // Invalid: negative saturation
      }

      render(
        <LiquidGlassCard effect={invalidEffect} data-testid="glass-card">
          <p>Content</p>
        </LiquidGlassCard>
      )
      
      const card = screen.getByTestId('glass-card')
      // Should clamp to valid ranges
      expect(card).toHaveStyle('--glass-blur: 0px')
      expect(card).toHaveStyle('--glass-opacity: 1')
      expect(card).toHaveStyle('--glass-saturation: 0')
    })

    it('should render without crashing when missing required props', () => {
      expect(() => {
        render(
          <LiquidGlassCard data-testid="glass-card">
            <p>Content</p>
          </LiquidGlassCard>
        )
      }).not.toThrow()
    })
  })

  describe('Custom Styling', () => {
    it('should merge custom className with default classes', () => {
      render(
        <LiquidGlassCard className="custom-class" data-testid="glass-card">
          <p>Content</p>
        </LiquidGlassCard>
      )
      
      const card = screen.getByTestId('glass-card')
      expect(card).toHaveClass('custom-class')
      expect(card).toHaveClass('liquid-glass-card')
    })

    it('should pass through additional HTML props', () => {
      render(
        <LiquidGlassCard 
          data-testid="glass-card"
          id="custom-id"
          role="banner"
          aria-label="Glass card container"
        >
          <p>Content</p>
        </LiquidGlassCard>
      )
      
      const card = screen.getByTestId('glass-card')
      expect(card).toHaveAttribute('id', 'custom-id')
      expect(card).toHaveAttribute('role', 'banner')
      expect(card).toHaveAttribute('aria-label', 'Glass card container')
    })
  })
})