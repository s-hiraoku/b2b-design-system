import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import '@testing-library/jest-dom'
import BookCard, { type Book } from './BookCard'

// Mock Framer Motion with proper prop filtering
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(({ children, variants, initial, animate, whileHover, whileTap, style, ...props }: any, ref: any) => (
      <div {...props} ref={ref} style={style}>{children}</div>
    )),
    img: ({ children, variants, initial, animate, onLoad, onError, ...props }: any) => (
      <img {...props} onLoad={onLoad} onError={onError}>{children}</img>
    ),
    button: React.forwardRef(({ children, variants, initial, whileHover, whileTap, style, ...props }: any, ref: any) => (
      <button {...props} ref={ref} style={style}>{children}</button>
    )),
    span: ({ children, variants, animate, transition, ...props }: any) => (
      <span {...props}>{children}</span>
    )
  }
}))

// Mock hooks and components
vi.mock('../../hooks/useParticles', () => ({
  useParticles: () => ({
    particles: [],
    createHeartBurst: vi.fn(),
    createSparkleEffect: vi.fn()
  })
}))

vi.mock('../kawaii/ParticleRenderer', () => ({
  default: ({ particles }: any) => 
    particles.length > 0 ? <div data-testid="book-card-particles" /> : null
}))

vi.mock('../kawaii/KawaiiButtonAdvanced', () => ({
  default: ({ children, onClick, particleEffect, variant, size, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  )
}))

describe('BookCard', () => {
  const mockBook: Book = {
    id: '1',
    title: 'Test Book',
    author: 'Test Author',
    coverUrl: 'https://example.com/cover.jpg',
    description: 'A test book description',
    pages: 250,
    rating: 4.5,
    genre: 'Fiction',
    publishedYear: 2023,
    isbn: '978-0123456789'
  }

  const defaultProps = {
    book: mockBook
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders book information correctly', () => {
      render(<BookCard {...defaultProps} />)
      
      expect(screen.getByText('Test Book')).toBeInTheDocument()
      expect(screen.getByText('Test Author')).toBeInTheDocument()
      expect(screen.getByText('A test book description')).toBeInTheDocument()
    })

    it('renders book metadata when available', () => {
      render(<BookCard {...defaultProps} />)
      
      expect(screen.getByText('📄 250p')).toBeInTheDocument()
      expect(screen.getByText('⭐ 4.5')).toBeInTheDocument()
      expect(screen.getByText('Fiction')).toBeInTheDocument()
    })

    it('renders without optional metadata', () => {
      const bookWithoutMetadata: Book = {
        id: '1',
        title: 'Simple Book',
        author: 'Simple Author',
        coverUrl: 'https://example.com/cover.jpg'
      }

      render(<BookCard book={bookWithoutMetadata} />)
      
      expect(screen.getByText('Simple Book')).toBeInTheDocument()
      expect(screen.getByText('Simple Author')).toBeInTheDocument()
      expect(screen.queryByText(/📄/)).not.toBeInTheDocument()
      expect(screen.queryByText(/⭐/)).not.toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(<BookCard {...defaultProps} className="custom-class" />)
      const card = screen.getByTestId('book-card')
      expect(card).toHaveClass('custom-class')
    })

    it('uses custom test id', () => {
      render(<BookCard {...defaultProps} data-testid="custom-book-card" />)
      expect(screen.getByTestId('custom-book-card')).toBeInTheDocument()
    })
  })

  describe('Size Variants', () => {
    it('applies small size classes', () => {
      render(<BookCard {...defaultProps} size="sm" />)
      const card = screen.getByTestId('book-card')
      expect(card).toHaveClass('w-40', 'h-60')
    })

    it('applies medium size classes (default)', () => {
      render(<BookCard {...defaultProps} size="md" />)
      const card = screen.getByTestId('book-card')
      expect(card).toHaveClass('w-48', 'h-72')
    })

    it('applies large size classes', () => {
      render(<BookCard {...defaultProps} size="lg" />)
      const card = screen.getByTestId('book-card')
      expect(card).toHaveClass('w-56', 'h-84')
    })
  })

  describe('Image Handling', () => {
    it('renders book cover image with correct attributes', () => {
      render(<BookCard {...defaultProps} />)
      
      const image = screen.getByAltText('Test Book by Test Author')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', mockBook.coverUrl)
      expect(image).toHaveAttribute('loading', 'lazy')
    })

    it('handles image load events', async () => {
      render(<BookCard {...defaultProps} />)
      
      const image = screen.getByAltText('Test Book by Test Author')
      fireEvent.load(image)
      
      // Image should be visible after loading
      expect(image).toBeInTheDocument()
    })

    it('handles image error with fallback', async () => {
      render(<BookCard {...defaultProps} />)
      
      const image = screen.getByAltText('Test Book by Test Author')
      fireEvent.error(image)
      
      // Should show fallback content
      await waitFor(() => {
        expect(screen.getByText('📚')).toBeInTheDocument()
        expect(screen.getByText('Test Book')).toBeInTheDocument()
      })
    })
  })

  describe('Reading Progress', () => {
    it('shows progress bar when reading progress > 0', () => {
      render(<BookCard {...defaultProps} readingProgress={65} showProgress={true} />)
      
      expect(screen.getByText('📖 65% complete')).toBeInTheDocument()
    })

    it('hides progress when showProgress is false', () => {
      render(<BookCard {...defaultProps} readingProgress={65} showProgress={false} />)
      
      expect(screen.queryByText(/% complete/)).not.toBeInTheDocument()
    })

    it('does not show progress when readingProgress is 0', () => {
      render(<BookCard {...defaultProps} readingProgress={0} showProgress={true} />)
      
      expect(screen.queryByText(/% complete/)).not.toBeInTheDocument()
    })

    it('handles progress values correctly', () => {
      const { rerender } = render(<BookCard {...defaultProps} readingProgress={25} />)
      expect(screen.getByText('📖 25% complete')).toBeInTheDocument()

      rerender(<BookCard {...defaultProps} readingProgress={100} />)
      expect(screen.getByText('📖 100% complete')).toBeInTheDocument()
    })
  })

  describe('Interactive Actions', () => {
    it('handles book card click to read', async () => {
      const onRead = vi.fn()
      render(<BookCard {...defaultProps} onRead={onRead} />)
      
      const card = screen.getByTestId('book-card')
      await userEvent.click(card)
      
      expect(onRead).toHaveBeenCalledWith(mockBook)
    })

    it('handles like button click', async () => {
      const onLike = vi.fn()
      render(<BookCard {...defaultProps} onLike={onLike} showActions={true} />)
      
      const likeButton = screen.getByTestId('like-button')
      await userEvent.click(likeButton)
      
      expect(onLike).toHaveBeenCalledWith(mockBook)
    })

    it('shows correct like button state', () => {
      const { rerender } = render(
        <BookCard {...defaultProps} isLiked={false} showActions={true} />
      )
      
      let likeButton = screen.getByTestId('like-button')
      expect(likeButton).toHaveTextContent('🤍')

      rerender(<BookCard {...defaultProps} isLiked={true} showActions={true} />)
      
      likeButton = screen.getByTestId('like-button')
      expect(likeButton).toHaveTextContent('❤️')
    })

    it('handles read button click', async () => {
      const onRead = vi.fn()
      render(<BookCard {...defaultProps} onRead={onRead} showActions={true} />)
      
      const readButton = screen.getByTestId('read-button')
      await userEvent.click(readButton)
      
      expect(onRead).toHaveBeenCalledWith(mockBook)
    })

    it('handles add to list button click', async () => {
      const onAddToList = vi.fn()
      render(<BookCard {...defaultProps} onAddToList={onAddToList} showActions={true} />)
      
      const addButton = screen.getByTestId('add-to-list-button')
      await userEvent.click(addButton)
      
      expect(onAddToList).toHaveBeenCalledWith(mockBook)
    })

    it('prevents event propagation on action buttons', async () => {
      const onRead = vi.fn()
      const onLike = vi.fn()
      
      render(
        <BookCard 
          {...defaultProps} 
          onRead={onRead} 
          onLike={onLike} 
          showActions={true} 
        />
      )
      
      const likeButton = screen.getByTestId('like-button')
      await userEvent.click(likeButton)
      
      // onRead should not be called when clicking like button
      expect(onLike).toHaveBeenCalledTimes(1)
      expect(onRead).not.toHaveBeenCalled()
    })
  })

  describe('Actions Visibility', () => {
    it('shows action buttons when showActions is true', () => {
      render(<BookCard {...defaultProps} showActions={true} />)
      
      expect(screen.getByTestId('like-button')).toBeInTheDocument()
      expect(screen.getByTestId('read-button')).toBeInTheDocument()
      expect(screen.getByTestId('add-to-list-button')).toBeInTheDocument()
    })

    it('hides action buttons when showActions is false', () => {
      render(<BookCard {...defaultProps} showActions={false} />)
      
      expect(screen.queryByTestId('like-button')).not.toBeInTheDocument()
      expect(screen.queryByTestId('read-button')).not.toBeInTheDocument()
      expect(screen.queryByTestId('add-to-list-button')).not.toBeInTheDocument()
    })

    it('shows actions by default', () => {
      render(<BookCard {...defaultProps} />)
      
      expect(screen.getByTestId('like-button')).toBeInTheDocument()
      expect(screen.getByTestId('read-button')).toBeInTheDocument()
      expect(screen.getByTestId('add-to-list-button')).toBeInTheDocument()
    })
  })

  describe('Text Truncation', () => {
    it('truncates long titles correctly', () => {
      const longTitleBook: Book = {
        ...mockBook,
        title: 'This is a very long book title that should be truncated to prevent layout issues'
      }

      render(<BookCard book={longTitleBook} />)
      const titleElement = screen.getByText(longTitleBook.title)
      expect(titleElement).toHaveClass('line-clamp-2')
    })

    it('truncates long author names correctly', () => {
      const longAuthorBook: Book = {
        ...mockBook,
        author: 'This is a very long author name that should be truncated'
      }

      render(<BookCard book={longAuthorBook} />)
      const authorElement = screen.getByText(longAuthorBook.author)
      expect(authorElement).toHaveClass('line-clamp-1')
    })

    it('truncates long descriptions correctly', () => {
      const longDescriptionBook: Book = {
        ...mockBook,
        description: 'This is a very long book description that goes on and on and should be truncated to maintain a clean card layout and prevent excessive text from breaking the design'
      }

      render(<BookCard book={longDescriptionBook} />)
      const descriptionElement = screen.getByText(longDescriptionBook.description)
      expect(descriptionElement).toHaveClass('line-clamp-2')
    })
  })

  describe('Accessibility', () => {
    it('has proper image alt text', () => {
      render(<BookCard {...defaultProps} />)
      
      const image = screen.getByAltText('Test Book by Test Author')
      expect(image).toBeInTheDocument()
    })

    it('has accessible button labels', () => {
      render(<BookCard {...defaultProps} showActions={true} />)
      
      const likeButton = screen.getByTestId('like-button')
      const readButton = screen.getByTestId('read-button')
      const addButton = screen.getByTestId('add-to-list-button')
      
      expect(likeButton).toBeInTheDocument()
      expect(readButton).toHaveTextContent('📖 Read')
      expect(addButton).toHaveTextContent('➕')
    })

    it('supports keyboard navigation', async () => {
      const onRead = vi.fn()
      render(<BookCard {...defaultProps} onRead={onRead} />)
      
      const card = screen.getByTestId('book-card')
      card.focus()
      
      await userEvent.keyboard('{Enter}')
      expect(onRead).toHaveBeenCalledWith(mockBook)
    })
  })

  describe('Performance', () => {
    it('renders efficiently with many cards', () => {
      const books = Array.from({ length: 20 }, (_, i) => ({
        ...mockBook,
        id: i.toString(),
        title: `Book ${i + 1}`
      }))

      const { container } = render(
        <div>
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )

      const cards = container.querySelectorAll('[data-testid="book-card"]')
      expect(cards).toHaveLength(20)
    })

    it('handles rapid prop changes efficiently', () => {
      const { rerender } = render(<BookCard {...defaultProps} isLiked={false} />)
      
      // Rapid state changes
      for (let i = 0; i < 10; i++) {
        rerender(<BookCard {...defaultProps} isLiked={i % 2 === 0} />)
      }

      expect(screen.getByTestId('book-card')).toBeInTheDocument()
    })
  })
})