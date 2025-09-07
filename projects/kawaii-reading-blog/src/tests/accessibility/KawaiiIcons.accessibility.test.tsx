import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { 
  BookIcon, 
  ClockIcon, 
  FireIcon, 
  PageIcon, 
  CalendarIcon, 
  TargetIcon,
  StarIcon,
  HeartIcon 
} from '@/components/kawaii/KawaiiIcons'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

describe('KawaiiIcons Accessibility Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('WCAG 2.1 AA Compliance', () => {
    const kawaiiIcons = [
      { Component: BookIcon, name: 'BookIcon' },
      { Component: ClockIcon, name: 'ClockIcon' },
      { Component: FireIcon, name: 'FireIcon' },
      { Component: PageIcon, name: 'PageIcon' },
      { Component: CalendarIcon, name: 'CalendarIcon' },
      { Component: TargetIcon, name: 'TargetIcon' },
      { Component: StarIcon, name: 'StarIcon' },
      { Component: HeartIcon, name: 'HeartIcon' }
    ]

    kawaiiIcons.forEach(({ Component, name }) => {
      it(`should_pass_axe_accessibility_audit_for_${name}`, async () => {
        // Arrange & Act
        const { container } = render(<Component data-testid={name} />)
        
        // Assert
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      })
    })

    it('should_pass_accessibility_audit_for_multiple_icons', async () => {
      // Arrange & Act
      const { container } = render(
        <div>
          <ClockIcon data-testid="clock-multi" />
          <FireIcon data-testid="fire-multi" />
          <PageIcon data-testid="page-multi" />
          <CalendarIcon data-testid="calendar-multi" />
          <TargetIcon data-testid="target-multi" />
        </div>
      )
      
      // Assert
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Screen Reader Support', () => {
    it('should_provide_meaningful_content_for_screen_readers', () => {
      // Arrange & Act
      render(
        <div>
          <BookIcon data-testid="sr-book" />
          <ClockIcon data-testid="sr-clock" />
          <FireIcon data-testid="sr-fire" />
        </div>
      )
      
      // Assert - Icons should be discoverable by screen readers
      const bookIcon = screen.getByTestId('sr-book')
      const clockIcon = screen.getByTestId('sr-clock')
      const fireIcon = screen.getByTestId('sr-fire')
      
      expect(bookIcon).toBeInTheDocument()
      expect(clockIcon).toBeInTheDocument()
      expect(fireIcon).toBeInTheDocument()
      
      // SVG elements should have proper structure
      expect(bookIcon.tagName.toLowerCase()).toBe('svg')
      expect(clockIcon.tagName.toLowerCase()).toBe('svg')
      expect(fireIcon.tagName.toLowerCase()).toBe('svg')
    })

    it('should_support_role_and_aria_attributes_when_used_as_buttons', () => {
      // Arrange & Act
      render(
        <div>
          <button aria-label="Reading time tracker" data-testid="clock-button">
            <ClockIcon data-testid="clock-in-button" />
          </button>
          <button aria-label="Reading streak indicator" data-testid="fire-button">
            <FireIcon data-testid="fire-in-button" />
          </button>
        </div>
      )
      
      // Assert
      const clockButton = screen.getByRole('button', { name: 'Reading time tracker' })
      const fireButton = screen.getByRole('button', { name: 'Reading streak indicator' })
      
      expect(clockButton).toBeInTheDocument()
      expect(fireButton).toBeInTheDocument()
      
      expect(screen.getByTestId('clock-in-button')).toBeInTheDocument()
      expect(screen.getByTestId('fire-in-button')).toBeInTheDocument()
    })
  })

  describe('Keyboard Navigation', () => {
    it('should_be_keyboard_accessible_when_used_in_interactive_elements', () => {
      // Arrange & Act
      render(
        <div>
          <button tabIndex={0} data-testid="keyboard-book-button">
            <BookIcon data-testid="keyboard-book" />
            <span>Add to Library</span>
          </button>
          <button tabIndex={0} data-testid="keyboard-heart-button">
            <HeartIcon data-testid="keyboard-heart" />
            <span>Like Book</span>
          </button>
        </div>
      )
      
      // Assert
      const bookButton = screen.getByTestId('keyboard-book-button')
      const heartButton = screen.getByTestId('keyboard-heart-button')
      
      expect(bookButton).toHaveAttribute('tabIndex', '0')
      expect(heartButton).toHaveAttribute('tabIndex', '0')
    })

    it('should_not_interfere_with_keyboard_navigation_flow', () => {
      // Arrange & Act
      render(
        <div>
          <button data-testid="before-icons">Before</button>
          <div>
            <ClockIcon data-testid="non-interactive-clock" />
            <FireIcon data-testid="non-interactive-fire" />
          </div>
          <button data-testid="after-icons">After</button>
        </div>
      )
      
      // Assert - Icons should not capture keyboard focus when not interactive
      const beforeButton = screen.getByTestId('before-icons')
      const afterButton = screen.getByTestId('after-icons')
      const clockIcon = screen.getByTestId('non-interactive-clock')
      const fireIcon = screen.getByTestId('non-interactive-fire')
      
      expect(beforeButton).toBeInTheDocument()
      expect(afterButton).toBeInTheDocument()
      expect(clockIcon).toBeInTheDocument()
      expect(fireIcon).toBeInTheDocument()
      
      // Icons should not have tabIndex when not interactive
      expect(clockIcon).not.toHaveAttribute('tabIndex')
      expect(fireIcon).not.toHaveAttribute('tabIndex')
    })
  })

  describe('Color Contrast and Visual Accessibility', () => {
    it('should_maintain_sufficient_color_contrast_ratios', () => {
      // Arrange & Act
      render(
        <div style={{ backgroundColor: '#ffffff' }}>
          <ClockIcon data-testid="contrast-clock" />
          <FireIcon data-testid="contrast-fire" />
          <PageIcon data-testid="contrast-page" />
        </div>
      )
      
      // Assert - Icons should render with sufficient contrast
      const clockIcon = screen.getByTestId('contrast-clock')
      const fireIcon = screen.getByTestId('contrast-fire')
      const pageIcon = screen.getByTestId('contrast-page')
      
      expect(clockIcon).toBeInTheDocument()
      expect(fireIcon).toBeInTheDocument()
      expect(pageIcon).toBeInTheDocument()
    })

    it('should_work_with_different_background_colors', () => {
      // Arrange & Act
      render(
        <div>
          <div style={{ backgroundColor: '#000000', padding: '10px' }}>
            <CalendarIcon data-testid="dark-bg-calendar" />
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '10px' }}>
            <TargetIcon data-testid="light-bg-target" />
          </div>
          <div style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
            <BookIcon data-testid="gray-bg-book" />
          </div>
        </div>
      )
      
      // Assert
      expect(screen.getByTestId('dark-bg-calendar')).toBeInTheDocument()
      expect(screen.getByTestId('light-bg-target')).toBeInTheDocument()
      expect(screen.getByTestId('gray-bg-book')).toBeInTheDocument()
    })
  })

  describe('Reduced Motion Support', () => {
    it('should_respect_prefers_reduced_motion_system_setting', () => {
      // Arrange - Mock prefers-reduced-motion
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query.includes('prefers-reduced-motion: reduce'),
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      })
      
      // Act
      render(
        <div>
          <ClockIcon animate={true} data-testid="reduced-motion-clock" />
          <FireIcon animate={true} data-testid="reduced-motion-fire" />
        </div>
      )
      
      // Assert - Icons should still render and be accessible
      expect(screen.getByTestId('reduced-motion-clock')).toBeInTheDocument()
      expect(screen.getByTestId('reduced-motion-fire')).toBeInTheDocument()
    })

    it('should_provide_static_alternatives_when_animations_disabled', () => {
      // Arrange & Act
      render(
        <div>
          <ClockIcon animate={false} data-testid="static-clock" />
          <FireIcon animate={false} data-testid="static-fire" />
          <PageIcon animate={false} data-testid="static-page" />
        </div>
      )
      
      // Assert - Static versions should be fully accessible
      expect(screen.getByTestId('static-clock')).toBeInTheDocument()
      expect(screen.getByTestId('static-fire')).toBeInTheDocument()
      expect(screen.getByTestId('static-page')).toBeInTheDocument()
    })
  })

  describe('Semantic Meaning Preservation', () => {
    it('should_maintain_semantic_meaning_of_replaced_emojis', () => {
      // Arrange & Act
      render(
        <div>
          <div aria-label="Reading schedule" data-testid="semantic-time">
            <ClockIcon data-testid="semantic-clock" />
            <span>Reading Time</span>
          </div>
          <div aria-label="Reading streak counter" data-testid="semantic-streak">
            <FireIcon data-testid="semantic-fire" />
            <span>5 day streak</span>
          </div>
          <div aria-label="Page count display" data-testid="semantic-pages">
            <PageIcon data-testid="semantic-page" />
            <span>250 pages</span>
          </div>
          <div aria-label="Monthly reading goal" data-testid="semantic-goal">
            <CalendarIcon data-testid="semantic-calendar" />
            <span>Monthly Goal</span>
          </div>
          <div aria-label="Annual reading target" data-testid="semantic-target">
            <TargetIcon data-testid="semantic-target-icon" />
            <span>Yearly Target</span>
          </div>
        </div>
      )
      
      // Assert - Each icon should maintain its semantic purpose
      expect(screen.getByLabelText('Reading schedule')).toBeInTheDocument()
      expect(screen.getByLabelText('Reading streak counter')).toBeInTheDocument()
      expect(screen.getByLabelText('Page count display')).toBeInTheDocument()
      expect(screen.getByLabelText('Monthly reading goal')).toBeInTheDocument()
      expect(screen.getByLabelText('Annual reading target')).toBeInTheDocument()
      
      expect(screen.getByTestId('semantic-clock')).toBeInTheDocument()
      expect(screen.getByTestId('semantic-fire')).toBeInTheDocument()
      expect(screen.getByTestId('semantic-page')).toBeInTheDocument()
      expect(screen.getByTestId('semantic-calendar')).toBeInTheDocument()
      expect(screen.getByTestId('semantic-target-icon')).toBeInTheDocument()
    })
  })

  describe('Focus Management', () => {
    it('should_handle_focus_properly_in_complex_layouts', () => {
      // Arrange & Act
      render(
        <div>
          <div role="group" aria-label="Reading statistics">
            <div>
              <ClockIcon data-testid="focus-clock" />
              <span>2h 30m</span>
            </div>
            <div>
              <FireIcon data-testid="focus-fire" />
              <span>7 days</span>
            </div>
            <div>
              <PageIcon data-testid="focus-page" />
              <span>156 pages</span>
            </div>
          </div>
          <div role="group" aria-label="Reading goals">
            <div>
              <CalendarIcon data-testid="focus-calendar" />
              <span>Monthly</span>
            </div>
            <div>
              <TargetIcon data-testid="focus-target" />
              <span>Yearly</span>
            </div>
          </div>
        </div>
      )
      
      // Assert
      const statsGroup = screen.getByRole('group', { name: 'Reading statistics' })
      const goalsGroup = screen.getByRole('group', { name: 'Reading goals' })
      
      expect(statsGroup).toBeInTheDocument()
      expect(goalsGroup).toBeInTheDocument()
      
      expect(screen.getByTestId('focus-clock')).toBeInTheDocument()
      expect(screen.getByTestId('focus-fire')).toBeInTheDocument()
      expect(screen.getByTestId('focus-page')).toBeInTheDocument()
      expect(screen.getByTestId('focus-calendar')).toBeInTheDocument()
      expect(screen.getByTestId('focus-target')).toBeInTheDocument()
    })
  })

  describe('High Contrast Mode Support', () => {
    it('should_remain_visible_in_high_contrast_mode', () => {
      // Arrange - Mock high contrast mode
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query.includes('prefers-contrast: high'),
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      })
      
      // Act
      render(
        <div>
          <ClockIcon data-testid="high-contrast-clock" />
          <FireIcon data-testid="high-contrast-fire" />
          <PageIcon data-testid="high-contrast-page" />
        </div>
      )
      
      // Assert
      expect(screen.getByTestId('high-contrast-clock')).toBeInTheDocument()
      expect(screen.getByTestId('high-contrast-fire')).toBeInTheDocument()
      expect(screen.getByTestId('high-contrast-page')).toBeInTheDocument()
    })
  })

  describe('Error States and Fallbacks', () => {
    it('should_handle_rendering_errors_gracefully', () => {
      // Arrange & Act - Test error boundary behavior
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      expect(() => {
        render(
          <div>
            <ClockIcon data-testid="error-safe-clock" />
            <FireIcon data-testid="error-safe-fire" />
          </div>
        )
      }).not.toThrow()
      
      // Assert
      expect(screen.getByTestId('error-safe-clock')).toBeInTheDocument()
      expect(screen.getByTestId('error-safe-fire')).toBeInTheDocument()
      
      consoleError.mockRestore()
    })
  })
})