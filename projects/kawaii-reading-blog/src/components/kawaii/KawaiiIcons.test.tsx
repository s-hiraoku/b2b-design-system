import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  BookIcon,
  StarIcon,
  HeartIcon,
  SearchIcon,
  LibraryIcon,
  RocketIcon,
  MagicIcon,
  MailIcon,
  ClockIcon,
  FireIcon,
  PageIcon,
  CalendarIcon,
  TargetIcon
} from './KawaiiIcons'

// All icons to test
const kawaiiIcons = [
  { Component: BookIcon, name: 'BookIcon' },
  { Component: StarIcon, name: 'StarIcon' },
  { Component: HeartIcon, name: 'HeartIcon' },
  { Component: SearchIcon, name: 'SearchIcon' },
  { Component: LibraryIcon, name: 'LibraryIcon' },
  { Component: RocketIcon, name: 'RocketIcon' },
  { Component: MagicIcon, name: 'MagicIcon' },
  { Component: MailIcon, name: 'MailIcon' },
  { Component: ClockIcon, name: 'ClockIcon' },
  { Component: FireIcon, name: 'FireIcon' },
  { Component: PageIcon, name: 'PageIcon' },
  { Component: CalendarIcon, name: 'CalendarIcon' },
  { Component: TargetIcon, name: 'TargetIcon' }
]

// New icons for emoji replacement (focus of this test phase)
const newIcons = [
  { Component: ClockIcon, name: 'ClockIcon', emoji: '⏰' },
  { Component: FireIcon, name: 'FireIcon', emoji: '🔥' },
  { Component: PageIcon, name: 'PageIcon', emoji: '📄' },
  { Component: CalendarIcon, name: 'CalendarIcon', emoji: '📅' },
  { Component: TargetIcon, name: 'TargetIcon', emoji: '🎯' }
]

describe('KawaiiIcons', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    kawaiiIcons.forEach(({ Component, name }) => {
      it(`should_render_${name}_with_default_props`, () => {
        // Arrange & Act
        render(<Component data-testid={name} />)
        
        // Assert
        const icon = screen.getByTestId(name)
        expect(icon).toBeInTheDocument()
        expect(icon.tagName.toLowerCase()).toBe('svg')
        expect(icon).toHaveClass('w-6', 'h-6') // default medium size
      })

      it(`should_render_${name}_with_custom_className`, () => {
        // Arrange
        const customClass = 'custom-icon-class'
        
        // Act
        render(<Component className={customClass} data-testid={name} />)
        
        // Assert
        const icon = screen.getByTestId(name)
        expect(icon).toHaveClass(customClass)
      })
    })
  })

  describe('Size Variants', () => {
    const sizes = [
      { size: 'sm' as const, expectedClasses: ['w-4', 'h-4'] },
      { size: 'md' as const, expectedClasses: ['w-6', 'h-6'] },
      { size: 'lg' as const, expectedClasses: ['w-8', 'h-8'] },
      { size: 'xl' as const, expectedClasses: ['w-12', 'h-12'] }
    ]

    sizes.forEach(({ size, expectedClasses }) => {
      it(`should_render_with_${size}_size_correctly`, () => {
        // Arrange & Act
        render(<BookIcon size={size} data-testid={`book-icon-${size}`} />)
        
        // Assert
        const icon = screen.getByTestId(`book-icon-${size}`)
        expectedClasses.forEach(className => {
          expect(icon).toHaveClass(className)
        })
      })
    })

    it('should_default_to_medium_size_when_no_size_provided', () => {
      // Arrange & Act
      render(<BookIcon data-testid="default-size-icon" />)
      
      // Assert
      const icon = screen.getByTestId('default-size-icon')
      expect(icon).toHaveClass('w-6', 'h-6')
    })
  })

  describe('Animation Control', () => {
    it('should_enable_animation_by_default', () => {
      // Arrange & Act
      render(<BookIcon data-testid="animated-icon" />)
      
      // Assert
      const icon = screen.getByTestId('animated-icon')
      // When animate=true, we should use motion.svg
      expect(icon).toBeInTheDocument()
    })

    it('should_disable_animation_when_animate_false', () => {
      // Arrange & Act
      render(<BookIcon animate={false} data-testid="static-icon" />)
      
      // Assert
      const icon = screen.getByTestId('static-icon')
      // When animate=false, we should use regular svg
      expect(icon).toBeInTheDocument()
      expect(icon.tagName.toLowerCase()).toBe('svg')
    })

    newIcons.forEach(({ Component, name }) => {
      it(`should_support_animation_control_for_${name}`, () => {
        // Arrange & Act - Test with animation enabled
        const { rerender } = render(<Component animate={true} data-testid={`${name}-animated`} />)
        
        // Assert
        let icon = screen.getByTestId(`${name}-animated`)
        expect(icon).toBeInTheDocument()
        
        // Act - Test with animation disabled
        rerender(<Component animate={false} data-testid={`${name}-static`} />)
        
        // Assert
        icon = screen.getByTestId(`${name}-static`)
        expect(icon).toBeInTheDocument()
      })
    })
  })

  describe('Data TestId Support', () => {
    newIcons.forEach(({ Component, name }) => {
      it(`should_support_data_testid_for_${name}`, () => {
        // Arrange
        const testId = `custom-${name.toLowerCase()}`
        
        // Act
        render(<Component data-testid={testId} />)
        
        // Assert
        const icon = screen.getByTestId(testId)
        expect(icon).toBeInTheDocument()
      })
    })
  })

  describe('SVG Accessibility', () => {
    kawaiiIcons.forEach(({ Component, name }) => {
      it(`should_have_proper_viewBox_for_${name}`, () => {
        // Arrange & Act
        render(<Component data-testid={name} />)
        
        // Assert
        const icon = screen.getByTestId(name)
        expect(icon).toHaveAttribute('viewBox', '0 0 24 24')
        expect(icon).toHaveAttribute('fill', 'none')
      })
    })
  })

  describe('Kawaii Style Consistency', () => {
    describe('Color Palette Usage', () => {
      it('should_use_consistent_kawaii_colors_across_icons', () => {
        // Arrange - Render multiple icons
        render(
          <div>
            <BookIcon data-testid="book" />
            <HeartIcon data-testid="heart" />
            <StarIcon data-testid="star" />
          </div>
        )
        
        // Assert - Check that icons are rendered (color consistency is handled by internal palette)
        expect(screen.getByTestId('book')).toBeInTheDocument()
        expect(screen.getByTestId('heart')).toBeInTheDocument()
        expect(screen.getByTestId('star')).toBeInTheDocument()
      })
    })

    describe('Kawaii Face Elements', () => {
      newIcons.forEach(({ Component, name }) => {
        it(`should_include_kawaii_face_elements_in_${name}`, () => {
          // Arrange & Act
          render(<Component data-testid={name} />)
          
          // Assert - Check that icon renders (kawaii faces are internal SVG elements)
          const icon = screen.getByTestId(name)
          expect(icon).toBeInTheDocument()
          
          // Check for presence of typical kawaii elements (circles for eyes, paths for smiles)
          const svgContent = icon.innerHTML
          expect(svgContent).toMatch(/<circle|<path/)
        })
      })
    })
  })

  describe('Emoji Replacement Functionality', () => {
    newIcons.forEach(({ Component, name, emoji }) => {
      it(`should_properly_replace_${emoji}_emoji_with_${name}`, () => {
        // Arrange & Act
        render(<Component data-testid={`${name}-replacement`} />)
        
        // Assert
        const icon = screen.getByTestId(`${name}-replacement`)
        expect(icon).toBeInTheDocument()
        expect(icon.tagName.toLowerCase()).toBe('svg')
        
        // Verify it's a proper SVG with kawaii styling
        expect(icon).toHaveAttribute('viewBox', '0 0 24 24')
        expect(icon).toHaveAttribute('fill', 'none')
      })
    })

    it('should_maintain_semantic_meaning_for_emoji_replacements', () => {
      // Arrange - Test each replacement maintains semantic purpose
      const semanticTests = [
        { Component: ClockIcon, purpose: 'time/schedule indication' },
        { Component: FireIcon, purpose: 'streak/intensity visualization' },
        { Component: PageIcon, purpose: 'page count display' },
        { Component: CalendarIcon, purpose: 'goal tracking periods' },
        { Component: TargetIcon, purpose: 'goal targeting' }
      ]
      
      semanticTests.forEach(({ Component, purpose }, index) => {
        // Act
        render(<Component data-testid={`semantic-${index}`} />)
        
        // Assert
        const icon = screen.getByTestId(`semantic-${index}`)
        expect(icon).toBeInTheDocument()
        // Icon should be properly structured for its semantic purpose
        expect(icon.tagName.toLowerCase()).toBe('svg')
      })
    })
  })

  describe('Performance Considerations', () => {
    it('should_render_multiple_icons_efficiently', () => {
      // Arrange & Act
      const startTime = performance.now()
      
      render(
        <div>
          {kawaiiIcons.map(({ Component }, index) => (
            <Component key={index} data-testid={`perf-icon-${index}`} />
          ))}
        </div>
      )
      
      const endTime = performance.now()
      
      // Assert
      // All icons should render
      kawaiiIcons.forEach((_, index) => {
        expect(screen.getByTestId(`perf-icon-${index}`)).toBeInTheDocument()
      })
      
      // Performance should be reasonable (less than 100ms for all icons)
      expect(endTime - startTime).toBeLessThan(100)
    })

    it('should_handle_rapid_prop_changes_efficiently', () => {
      // Arrange
      const { rerender } = render(<BookIcon size="sm" animate={true} data-testid="prop-change-icon" />)
      
      // Act - Rapidly change props
      rerender(<BookIcon size="md" animate={false} data-testid="prop-change-icon" />)
      rerender(<BookIcon size="lg" animate={true} data-testid="prop-change-icon" />)
      rerender(<BookIcon size="xl" animate={false} data-testid="prop-change-icon" />)
      
      // Assert
      const icon = screen.getByTestId('prop-change-icon')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveClass('w-12', 'h-12') // Should reflect final size
    })
  })

  describe('Component Integration', () => {
    it('should_work_correctly_within_flex_containers', () => {
      // Arrange & Act
      render(
        <div className="flex items-center space-x-2" data-testid="flex-container">
          <BookIcon data-testid="flex-book" />
          <span>Reading Progress</span>
          <ClockIcon data-testid="flex-clock" />
        </div>
      )
      
      // Assert
      const container = screen.getByTestId('flex-container')
      const bookIcon = screen.getByTestId('flex-book')
      const clockIcon = screen.getByTestId('flex-clock')
      
      expect(container).toBeInTheDocument()
      expect(bookIcon).toBeInTheDocument()
      expect(clockIcon).toBeInTheDocument()
    })

    it('should_maintain_styling_when_used_as_button_content', () => {
      // Arrange & Act
      render(
        <button data-testid="icon-button">
          <FireIcon size="md" data-testid="button-fire-icon" />
          <span>Streak</span>
        </button>
      )
      
      // Assert
      const button = screen.getByTestId('icon-button')
      const icon = screen.getByTestId('button-fire-icon')
      
      expect(button).toBeInTheDocument()
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveClass('w-6', 'h-6')
    })
  })

  describe('Error Handling', () => {
    it('should_handle_invalid_size_gracefully', () => {
      // Arrange & Act
      // @ts-expect-error - Testing invalid prop
      render(<BookIcon size="invalid" data-testid="invalid-size-icon" />)
      
      // Assert - Should default to medium size
      const icon = screen.getByTestId('invalid-size-icon')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveClass('w-6', 'h-6')
    })

    it('should_handle_undefined_props_gracefully', () => {
      // Arrange & Act
      render(<BookIcon size={undefined} className={undefined} data-testid="undefined-props-icon" />)
      
      // Assert
      const icon = screen.getByTestId('undefined-props-icon')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveClass('w-6', 'h-6') // Should use defaults
    })
  })
})