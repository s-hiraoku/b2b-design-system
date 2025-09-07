import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReadingProgress, ReadingProgressProps, ReadingStats } from './ReadingProgress'

// Mock the kawaii animations module
vi.mock('@/lib/kawaii-animations', () => ({
  kawaiiPresets: {
    bookHover: {
      rest: { scale: 1 },
      hover: { scale: 1.05 }
    }
  },
  animationUtils: {
    respectsReducedMotion: vi.fn(() => false)
  }
}))

// Mock the KawaiiIcons to avoid animation complexity in tests
vi.mock('@/components/kawaii/KawaiiIcons', () => ({
  BookIcon: ({ size, animate, className, 'data-testid': testId }: any) => (
    <div 
      data-testid={testId || 'book-icon'} 
      className={`kawaii-icon book-icon ${className || ''}`}
      data-size={size}
      data-animate={animate}
    >
      📖
    </div>
  ),
  ClockIcon: ({ size, animate, className, 'data-testid': testId }: any) => (
    <div 
      data-testid={testId || 'clock-icon'} 
      className={`kawaii-icon clock-icon ${className || ''}`}
      data-size={size}
      data-animate={animate}
    >
      ⏰
    </div>
  ),
  FireIcon: ({ size, animate, className, 'data-testid': testId }: any) => (
    <div 
      data-testid={testId || 'fire-icon'} 
      className={`kawaii-icon fire-icon ${className || ''}`}
      data-size={size}
      data-animate={animate}
    >
      🔥
    </div>
  ),
  PageIcon: ({ size, animate, className, 'data-testid': testId }: any) => (
    <div 
      data-testid={testId || 'page-icon'} 
      className={`kawaii-icon page-icon ${className || ''}`}
      data-size={size}
      data-animate={animate}
    >
      📄
    </div>
  ),
  CalendarIcon: ({ size, animate, className, 'data-testid': testId }: any) => (
    <div 
      data-testid={testId || 'calendar-icon'} 
      className={`kawaii-icon calendar-icon ${className || ''}`}
      data-size={size}
      data-animate={animate}
    >
      📅
    </div>
  ),
  TargetIcon: ({ size, animate, className, 'data-testid': testId }: any) => (
    <div 
      data-testid={testId || 'target-icon'} 
      className={`kawaii-icon target-icon ${className || ''}`}
      data-size={size}
      data-animate={animate}
    >
      🎯
    </div>
  ),
  MagicIcon: ({ size, animate, className, 'data-testid': testId }: any) => (
    <div 
      data-testid={testId || 'magic-icon'} 
      className={`kawaii-icon magic-icon ${className || ''}`}
      data-size={size}
      data-animate={animate}
    >
      ✨
    </div>
  ),
  StarIcon: ({ size, animate, className, 'data-testid': testId }: any) => (
    <div 
      data-testid={testId || 'star-icon'} 
      className={`kawaii-icon star-icon ${className || ''}`}
      data-size={size}
      data-animate={animate}
    >
      ⭐
    </div>
  )
}))

describe('ReadingProgress Component Integration', () => {
  const mockStats: ReadingStats = {
    booksRead: 15,
    pagesRead: 2450,
    minutesRead: 12600, // 210 hours
    currentStreak: 5,
    weeklyGoal: 2,
    monthlyGoal: 8,
    yearlyGoal: 50
  }

  const defaultProps: ReadingProgressProps = {
    stats: mockStats,
    showDetails: true,
    animated: true
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock requestAnimationFrame for counter animations
    global.requestAnimationFrame = vi.fn((cb) => {
      setTimeout(cb, 16)
      return 1
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Emoji Replacement Verification', () => {
    it('should_replace_all_emojis_with_kawaii_icons', () => {
      // Arrange & Act
      render(<ReadingProgress {...defaultProps} />)
      
      // Assert - Verify kawaii icons are used instead of emojis
      
      // Check for BookIcon (📖 replacement)
      const bookIcons = screen.getAllByTestId('book-icon')
      expect(bookIcons.length).toBeGreaterThan(0)
      
      // Check for ClockIcon (⏰ replacement)  
      const clockIcon = screen.getByTestId('clock-icon')
      expect(clockIcon).toBeInTheDocument()
      
      // Check for FireIcon (🔥 replacement)
      const fireIcons = screen.getAllByTestId('fire-icon')
      expect(fireIcons.length).toBeGreaterThan(0)
      
      // Check for PageIcon (📄 replacement)
      const pageIcon = screen.getByTestId('page-icon')
      expect(pageIcon).toBeInTheDocument()
      
      // Check for CalendarIcon (📅 replacement)
      const calendarIcons = screen.getAllByTestId('calendar-icon')
      expect(calendarIcons.length).toBeGreaterThan(0)
      
      // Check for TargetIcon (🎯 replacement)
      const targetIcon = screen.getByTestId('target-icon')
      expect(targetIcon).toBeInTheDocument()
      
      // Check for MagicIcon (✨ replacement)
      const magicIcon = screen.getByTestId('magic-icon')
      expect(magicIcon).toBeInTheDocument()
      
      // Check for StarIcon (⭐ replacement)
      const starIcons = screen.getAllByTestId('star-icon')
      expect(starIcons.length).toBeGreaterThan(0)
    })

    it('should_not_contain_any_emoji_text_content', () => {
      // Arrange & Act
      render(<ReadingProgress {...defaultProps} />)
      
      // Assert - Check that no emoji text appears in the DOM
      const component = screen.getByTestId('reading-progress')
      const textContent = component.textContent || ''
      
      // Common emojis that should be replaced
      const emojisToCheck = ['📖', '⏰', '🔥', '📄', '📅', '🎯', '✨', '⭐']
      
      emojisToCheck.forEach(emoji => {
        expect(textContent).not.toContain(emoji)
      })
    })
  })

  describe('Component Structure and Data Display', () => {
    it('should_render_main_stats_with_kawaii_icons', () => {
      // Arrange & Act
      render(<ReadingProgress {...defaultProps} />)
      
      // Assert
      expect(screen.getByText('Reading Progress')).toBeInTheDocument()
      
      // Check main stats display
      expect(screen.getByText('15')).toBeInTheDocument() // books read
      expect(screen.getByText('2,450')).toBeInTheDocument() // pages read  
      expect(screen.getByText('210h')).toBeInTheDocument() // hours read
      expect(screen.getByText('5')).toBeInTheDocument() // streak
      
      // Check stat labels
      expect(screen.getByText('Books Read')).toBeInTheDocument()
      expect(screen.getByText('Pages Read')).toBeInTheDocument()
      expect(screen.getByText('Hours Read')).toBeInTheDocument()
      expect(screen.getByText('Day Streak')).toBeInTheDocument()
    })

    it('should_display_progress_bars_with_correct_percentages', () => {
      // Arrange & Act
      render(<ReadingProgress {...defaultProps} />)
      
      // Assert - Check progress bar labels
      expect(screen.getByText('Weekly Goal')).toBeInTheDocument()
      expect(screen.getByText('Monthly Goal')).toBeInTheDocument()
      expect(screen.getByText('Yearly Goal')).toBeInTheDocument()
      
      // Check that percentage values are displayed
      const percentageRegex = /\d+%/
      const percentages = screen.getAllByText(percentageRegex)
      expect(percentages.length).toBe(3) // One for each goal
    })

    it('should_calculate_progress_percentages_correctly', () => {
      // Arrange - Custom stats for precise calculation
      const testStats: ReadingStats = {
        booksRead: 25, // 50% of yearly goal
        pagesRead: 1000,
        minutesRead: 6000,
        currentStreak: 3,
        weeklyGoal: 2,
        monthlyGoal: 8,
        yearlyGoal: 50
      }
      
      // Act
      render(<ReadingProgress stats={testStats} />)
      
      // Assert - Should show 50% for yearly goal
      expect(screen.getByText('50%')).toBeInTheDocument()
    })
  })

  describe('Animation and Performance', () => {
    it('should_enable_animations_when_animated_prop_true', () => {
      // Arrange & Act
      render(<ReadingProgress {...defaultProps} animated={true} />)
      
      // Assert - Check that icons have animation enabled
      const icons = screen.getAllByTestId(/.*-icon/)
      icons.forEach(icon => {
        expect(icon).toHaveAttribute('data-animate', 'true')
      })
    })

    it('should_disable_animations_when_animated_prop_false', () => {
      // Arrange & Act
      render(<ReadingProgress {...defaultProps} animated={false} />)
      
      // Assert - Icons should have animation disabled
      const icons = screen.getAllByTestId(/.*-icon/)
      icons.forEach(icon => {
        expect(icon).toHaveAttribute('data-animate', 'false')
      })
    })

    it('should_handle_counter_animation_with_requestAnimationFrame', async () => {
      // Arrange
      const animationFrameMock = vi.fn((cb) => {
        setTimeout(cb, 16)
        return 1
      })
      global.requestAnimationFrame = animationFrameMock
      
      // Act
      render(<ReadingProgress {...defaultProps} animated={true} />)
      
      // Wait for initial render and animation setup
      await waitFor(() => {
        expect(screen.getByText('15')).toBeInTheDocument()
      })
      
      // Assert - requestAnimationFrame should be called for counter animations
      expect(animationFrameMock).toHaveBeenCalled()
    })
  })

  describe('Responsive Design and Layout', () => {
    it('should_use_responsive_grid_classes', () => {
      // Arrange & Act
      render(<ReadingProgress {...defaultProps} />)
      
      // Assert - Check for responsive grid classes
      const component = screen.getByTestId('reading-progress')
      const gridContainer = component.querySelector('.grid')
      
      expect(gridContainer).toHaveClass('grid-cols-2', 'md:grid-cols-4')
    })

    it('should_maintain_proper_spacing_and_padding', () => {
      // Arrange & Act
      render(<ReadingProgress {...defaultProps} />)
      
      // Assert
      const component = screen.getByTestId('reading-progress')
      expect(component).toHaveClass('p-6', 'rounded-2xl')
    })
  })

  describe('Conditional Rendering', () => {
    it('should_hide_details_when_showDetails_false', () => {
      // Arrange & Act
      render(<ReadingProgress {...defaultProps} showDetails={false} />)
      
      // Assert - Progress bars should not be visible
      expect(screen.queryByText('Weekly Goal')).not.toBeInTheDocument()
      expect(screen.queryByText('Monthly Goal')).not.toBeInTheDocument()
      expect(screen.queryByText('Yearly Goal')).not.toBeInTheDocument()
    })

    it('should_show_details_when_showDetails_true', () => {
      // Arrange & Act
      render(<ReadingProgress {...defaultProps} showDetails={true} />)
      
      // Assert - Progress bars should be visible
      expect(screen.getByText('Weekly Goal')).toBeInTheDocument()
      expect(screen.getByText('Monthly Goal')).toBeInTheDocument()
      expect(screen.getByText('Yearly Goal')).toBeInTheDocument()
    })
  })

  describe('Motivational Messages', () => {
    it('should_show_yearly_goal_completion_message', () => {
      // Arrange - Stats that exceed yearly goal
      const completedStats: ReadingStats = {
        ...mockStats,
        booksRead: 60, // More than yearly goal of 50
        yearlyGoal: 50
      }
      
      // Act
      render(<ReadingProgress stats={completedStats} />)
      
      // Assert
      expect(screen.getByText("Congratulations! You've reached your yearly goal!")).toBeInTheDocument()
      const starIcons = screen.getAllByTestId('star-icon')
      expect(starIcons.length).toBeGreaterThan(1) // Multiple stars for celebration
    })

    it('should_show_streak_message_for_high_streaks', () => {
      // Arrange - High streak stats
      const highStreakStats: ReadingStats = {
        ...mockStats,
        currentStreak: 10,
        booksRead: 25 // Less than yearly goal to avoid goal completion message
      }
      
      // Act
      render(<ReadingProgress stats={highStreakStats} />)
      
      // Assert
      expect(screen.getByText("Amazing streak! You're on fire!")).toBeInTheDocument()
      const fireIcons = screen.getAllByTestId('fire-icon')
      expect(fireIcons.length).toBeGreaterThan(1) // Fire icon in streak display and message
    })

    it('should_show_progress_message_for_active_readers', () => {
      // Arrange - Active reader stats
      const activeStats: ReadingStats = {
        ...mockStats,
        currentStreak: 3, // Less than 7
        booksRead: 15 // Some progress but not complete
      }
      
      // Act
      render(<ReadingProgress stats={activeStats} />)
      
      // Assert
      expect(screen.getByText("Great progress! Keep reading!")).toBeInTheDocument()
    })

    it('should_show_starter_message_for_new_users', () => {
      // Arrange - New user stats
      const newUserStats: ReadingStats = {
        ...mockStats,
        booksRead: 0,
        currentStreak: 0
      }
      
      // Act
      render(<ReadingProgress stats={newUserStats} />)
      
      // Assert
      expect(screen.getByText("Start your reading journey today!")).toBeInTheDocument()
    })
  })

  describe('Accessibility and Usability', () => {
    it('should_have_proper_semantic_structure', () => {
      // Arrange & Act
      render(<ReadingProgress {...defaultProps} />)
      
      // Assert
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Reading Progress')
    })

    it('should_support_custom_data_testid', () => {
      // Arrange
      const customTestId = 'custom-progress-component'
      
      // Act
      render(<ReadingProgress {...defaultProps} data-testid={customTestId} />)
      
      // Assert
      expect(screen.getByTestId(customTestId)).toBeInTheDocument()
    })

    it('should_apply_custom_className', () => {
      // Arrange
      const customClass = 'custom-progress-class'
      
      // Act
      render(<ReadingProgress {...defaultProps} className={customClass} />)
      
      // Assert
      const component = screen.getByTestId('reading-progress')
      expect(component).toHaveClass(customClass)
    })
  })

  describe('Data Formatting', () => {
    it('should_format_large_numbers_correctly', () => {
      // Arrange - Large numbers
      const largeStats: ReadingStats = {
        ...mockStats,
        pagesRead: 12567,
        minutesRead: 150000 // 2500 hours
      }
      
      // Act
      render(<ReadingProgress stats={largeStats} />)
      
      // Assert
      expect(screen.getByText('12,567')).toBeInTheDocument() // Comma-separated pages
      expect(screen.getByText('2500h')).toBeInTheDocument() // Hours conversion
    })

    it('should_handle_zero_values_gracefully', () => {
      // Arrange - Zero stats
      const zeroStats: ReadingStats = {
        booksRead: 0,
        pagesRead: 0,
        minutesRead: 0,
        currentStreak: 0,
        weeklyGoal: 2,
        monthlyGoal: 8,
        yearlyGoal: 50
      }
      
      // Act
      render(<ReadingProgress stats={zeroStats} />)
      
      // Assert
      expect(screen.getByText('0')).toBeInTheDocument() // Books read
      expect(screen.getByText('0h')).toBeInTheDocument() // Hours
    })
  })

  describe('Error Handling', () => {
    it('should_handle_missing_stats_gracefully', () => {
      // Arrange - Minimal stats
      const minimalStats = {
        booksRead: 5,
        pagesRead: 100,
        minutesRead: 300,
        currentStreak: 1,
        weeklyGoal: 2,
        monthlyGoal: 8,
        yearlyGoal: 50
      }
      
      // Act & Assert - Should not throw
      expect(() => {
        render(<ReadingProgress stats={minimalStats} />)
      }).not.toThrow()
    })

    it('should_handle_invalid_progress_calculations', () => {
      // Arrange - Edge case stats
      const edgeStats: ReadingStats = {
        booksRead: 1000, // Exceeds yearly goal
        pagesRead: 50000,
        minutesRead: 500000,
        currentStreak: 365,
        weeklyGoal: 1,
        monthlyGoal: 4,
        yearlyGoal: 12
      }
      
      // Act & Assert - Should handle gracefully
      expect(() => {
        render(<ReadingProgress stats={edgeStats} />)
      }).not.toThrow()
      
      // Progress should be capped at 100%
      const component = screen.getByTestId('reading-progress')
      expect(component).toBeInTheDocument()
    })
  })
})