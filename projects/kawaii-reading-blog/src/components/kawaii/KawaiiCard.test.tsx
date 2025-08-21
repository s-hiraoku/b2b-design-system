import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { KawaiiCard } from './KawaiiCard'

describe('KawaiiCard', () => {
  describe('Basic Rendering', () => {
    it('should_render_empty_card_when_no_content_provided', () => {
      // Arrange & Act
      render(<KawaiiCard data-testid="empty-card" />)
      
      // Assert
      const card = screen.getByTestId('empty-card')
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass('kawaii-card')
    })

    it('should_render_card_with_children_when_children_provided', () => {
      // Arrange
      const childContent = 'Card content'
      
      // Act
      render(
        <KawaiiCard data-testid="card-with-children">
          <div>{childContent}</div>
        </KawaiiCard>
      )
      
      // Assert
      const card = screen.getByTestId('card-with-children')
      expect(card).toBeInTheDocument()
      expect(screen.getByText(childContent)).toBeInTheDocument()
    })

    it('should_render_card_with_title_when_title_prop_provided', () => {
      // Arrange
      const cardTitle = 'Kawaii Card Title'
      
      // Act
      render(
        <KawaiiCard title={cardTitle} data-testid="card-with-title" />
      )
      
      // Assert
      const title = screen.getByRole('heading', { name: cardTitle })
      expect(title).toBeInTheDocument()
    })

    it('should_render_card_with_description_when_description_prop_provided', () => {
      // Arrange
      const cardDescription = 'This is a kawaii card description'
      
      // Act
      render(
        <KawaiiCard description={cardDescription} data-testid="card-with-description" />
      )
      
      // Assert
      const description = screen.getByText(cardDescription)
      expect(description).toBeInTheDocument()
    })

    it('should_render_card_with_image_when_image_prop_provided', () => {
      // Arrange
      const imageProps = {
        src: '/test-image.jpg',
        alt: 'Test kawaii image'
      }
      
      // Act
      render(
        <KawaiiCard image={imageProps} data-testid="card-with-image" />
      )
      
      // Assert
      const image = screen.getByRole('img', { name: imageProps.alt })
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', imageProps.src)
      expect(image).toHaveAttribute('alt', imageProps.alt)
    })
  })

  describe('Variant Styling', () => {
    it('should_render_primary_variant_by_default_when_no_variant_provided', () => {
      // Arrange & Act
      render(<KawaiiCard data-testid="default-variant-card" />)
      
      // Assert
      const card = screen.getByTestId('default-variant-card')
      expect(card).toHaveClass('kawaii-card-primary')
    })

    it('should_render_secondary_variant_when_variant_secondary_provided', () => {
      // Arrange & Act
      render(
        <KawaiiCard variant="secondary" data-testid="secondary-card" />
      )
      
      // Assert
      const card = screen.getByTestId('secondary-card')
      expect(card).toHaveClass('kawaii-card-secondary')
    })

    it('should_render_accent_variant_when_variant_accent_provided', () => {
      // Arrange & Act
      render(
        <KawaiiCard variant="accent" data-testid="accent-card" />
      )
      
      // Assert
      const card = screen.getByTestId('accent-card')
      expect(card).toHaveClass('kawaii-card-accent')
    })
  })

  describe('Size Variants', () => {
    it('should_render_medium_size_by_default_when_no_size_provided', () => {
      // Arrange & Act
      render(<KawaiiCard data-testid="default-size-card" />)
      
      // Assert
      const card = screen.getByTestId('default-size-card')
      expect(card).toHaveClass('kawaii-card-md')
    })

    it('should_render_small_size_when_size_sm_provided', () => {
      // Arrange & Act
      render(
        <KawaiiCard size="sm" data-testid="small-card" />
      )
      
      // Assert
      const card = screen.getByTestId('small-card')
      expect(card).toHaveClass('kawaii-card-sm')
    })

    it('should_render_large_size_when_size_lg_provided', () => {
      // Arrange & Act
      render(
        <KawaiiCard size="lg" data-testid="large-card" />
      )
      
      // Assert
      const card = screen.getByTestId('large-card')
      expect(card).toHaveClass('kawaii-card-lg')
    })
  })

  describe('Interactive Features', () => {
    it('should_be_hoverable_by_default_when_no_hoverable_prop_provided', () => {
      // Arrange & Act
      render(<KawaiiCard data-testid="hoverable-card" />)
      
      // Assert
      const card = screen.getByTestId('hoverable-card')
      expect(card).toHaveClass('kawaii-card-hoverable')
    })

    it('should_not_be_hoverable_when_hoverable_prop_is_false', () => {
      // Arrange & Act
      render(
        <KawaiiCard hoverable={false} data-testid="non-hoverable-card" />
      )
      
      // Assert
      const card = screen.getByTestId('non-hoverable-card')
      expect(card).not.toHaveClass('kawaii-card-hoverable')
    })

    it('should_be_clickable_when_clickable_prop_is_true', () => {
      // Arrange & Act
      render(
        <KawaiiCard clickable data-testid="clickable-card" />
      )
      
      // Assert
      const card = screen.getByTestId('clickable-card')
      expect(card).toHaveClass('kawaii-card-clickable')
      expect(card).toHaveAttribute('role', 'button')
      expect(card).toHaveAttribute('tabIndex', '0')
    })

    it('should_call_onClick_handler_when_clickable_card_is_clicked', async () => {
      // Arrange
      const user = userEvent.setup()
      const handleClick = vi.fn()
      
      render(
        <KawaiiCard 
          clickable 
          onClick={handleClick} 
          data-testid="clickable-card"
        />
      )
      
      // Act
      const card = screen.getByTestId('clickable-card')
      await user.click(card)
      
      // Assert
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should_handle_keyboard_interaction_when_clickable_card_receives_enter', async () => {
      // Arrange
      const user = userEvent.setup()
      const handleClick = vi.fn()
      
      render(
        <KawaiiCard 
          clickable 
          onClick={handleClick} 
          data-testid="keyboard-clickable-card"
        />
      )
      
      // Act
      const card = screen.getByTestId('keyboard-clickable-card')
      card.focus()
      await user.keyboard('{Enter}')
      
      // Assert
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should_handle_keyboard_interaction_when_clickable_card_receives_space', async () => {
      // Arrange
      const user = userEvent.setup()
      const handleClick = vi.fn()
      
      render(
        <KawaiiCard 
          clickable 
          onClick={handleClick} 
          data-testid="space-clickable-card"
        />
      )
      
      // Act
      const card = screen.getByTestId('space-clickable-card')
      card.focus()
      await user.keyboard(' ')
      
      // Assert
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Image Handling', () => {
    it('should_use_lazy_loading_by_default_when_image_provided', () => {
      // Arrange
      const imageProps = {
        src: '/lazy-image.jpg',
        alt: 'Lazy loaded image'
      }
      
      // Act
      render(
        <KawaiiCard image={imageProps} data-testid="lazy-image-card" />
      )
      
      // Assert
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('loading', 'lazy')
    })

    it('should_use_eager_loading_when_image_loading_eager_provided', () => {
      // Arrange
      const imageProps = {
        src: '/eager-image.jpg',
        alt: 'Eager loaded image',
        loading: 'eager' as const
      }
      
      // Act
      render(
        <KawaiiCard image={imageProps} data-testid="eager-image-card" />
      )
      
      // Assert
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('loading', 'eager')
    })
  })

  describe('Accessibility', () => {
    it('should_have_proper_heading_structure_when_title_provided', () => {
      // Arrange & Act
      render(
        <KawaiiCard title="Accessible Title" data-testid="accessible-card" />
      )
      
      // Assert
      const heading = screen.getByRole('heading')
      expect(heading).toHaveTextContent('Accessible Title')
    })

    it('should_not_be_keyboard_focusable_when_not_clickable', () => {
      // Arrange & Act
      render(<KawaiiCard data-testid="non-focusable-card" />)
      
      // Assert
      const card = screen.getByTestId('non-focusable-card')
      expect(card).not.toHaveAttribute('tabIndex')
      expect(card).not.toHaveAttribute('role', 'button')
    })

    it('should_have_image_alt_text_for_screen_readers_when_image_provided', () => {
      // Arrange
      const imageProps = {
        src: '/accessible-image.jpg',
        alt: 'Descriptive alt text for screen readers'
      }
      
      // Act
      render(
        <KawaiiCard image={imageProps} data-testid="accessible-image-card" />
      )
      
      // Assert
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('alt', imageProps.alt)
    })
  })
})