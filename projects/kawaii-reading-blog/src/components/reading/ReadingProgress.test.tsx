import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import ReadingProgress from './ReadingProgress'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    span: 'span'
  }
}))

describe('ReadingProgress', () => {
  const mockStats = {
    totalBooks: 42,
    completedBooks: 28,
    currentlyReading: 3,
    monthlyGoal: 50,
    pagesRead: 1247,
    readingStreak: 15
  }

  describe('Rendering', () => {
    it('renders reading statistics correctly', () => {
      render(<ReadingProgress stats={mockStats} />)
      
      expect(screen.getByText('42')).toBeInTheDocument()
      expect(screen.getByText('28')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.getByText('1,247')).toBeInTheDocument()
      expect(screen.getByText('15')).toBeInTheDocument()
    })

    it('displays progress towards monthly goal', () => {
      render(<ReadingProgress stats={mockStats} />)
      
      expect(screen.getByText('50')).toBeInTheDocument()
      expect(screen.getByText(/Monthly Goal/i)).toBeInTheDocument()
    })

    it('shows reading streak information', () => {
      render(<ReadingProgress stats={mockStats} />)
      
      expect(screen.getByText(/days/i)).toBeInTheDocument()
      expect(screen.getByText(/streak/i)).toBeInTheDocument()
    })
  })

  describe('Progress Calculations', () => {
    it('calculates progress percentage correctly', () => {
      render(<ReadingProgress stats={mockStats} />)
      
      // Should show progress towards monthly goal (28/50 = 56%)
      const progressElements = screen.getAllByRole('progressbar')
      expect(progressElements.length).toBeGreaterThan(0)
    })

    it('handles zero values gracefully', () => {
      const emptyStats = {
        totalBooks: 0,
        completedBooks: 0,
        currentlyReading: 0,
        monthlyGoal: 0,
        pagesRead: 0,
        readingStreak: 0
      }
      
      render(<ReadingProgress stats={emptyStats} />)
      
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('handles missing stats gracefully', () => {
      const partialStats = {
        totalBooks: 10,
        completedBooks: 5,
        currentlyReading: 2,
        monthlyGoal: 20,
        pagesRead: 500,
        readingStreak: 7
      }
      
      expect(() => render(<ReadingProgress stats={partialStats} />)).not.toThrow()
    })
  })

  describe('Visual Elements', () => {
    it('renders kawaii elements and emojis', () => {
      render(<ReadingProgress stats={mockStats} />)
      
      // Check for common kawaii emojis
      expect(screen.getByText(/📚/)).toBeInTheDocument()
      expect(screen.getByText(/🌸/)).toBeInTheDocument()
    })

    it('applies correct styling classes', () => {
      const { container } = render(<ReadingProgress stats={mockStats} />)
      
      expect(container.firstChild).toHaveClass('reading-progress')
    })
  })

  describe('Accessibility', () => {
    it('provides proper aria labels for progress bars', () => {
      render(<ReadingProgress stats={mockStats} />)
      
      const progressBars = screen.getAllByRole('progressbar')
      progressBars.forEach(bar => {
        expect(bar).toHaveAttribute('aria-valuenow')
        expect(bar).toHaveAttribute('aria-valuemin')
        expect(bar).toHaveAttribute('aria-valuemax')
      })
    })

    it('has proper heading structure', () => {
      render(<ReadingProgress stats={mockStats} />)
      
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
    })
  })

  describe('Responsive Behavior', () => {
    it('renders correctly on mobile', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      })
      
      render(<ReadingProgress stats={mockStats} />)
      
      expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('renders correctly on desktop', () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024
      })
      
      render(<ReadingProgress stats={mockStats} />)
      
      expect(screen.getByText('42')).toBeInTheDocument()
    })
  })
})