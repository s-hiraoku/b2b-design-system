import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { KawaiiButton, KawaiiCard } from '@/components/kawaii'

describe('Kawaii Design System Integration', () => {
  it('should_integrate_button_and_card_components_successfully', () => {
    // Arrange & Act
    render(
      <KawaiiCard 
        title="Reading Progress"
        description="Track your reading journey with kawaii style!"
        variant="primary"
        data-testid="reading-card"
      >
        <KawaiiButton 
          variant="secondary" 
          size="sm"
          data-testid="progress-button"
        >
          Update Progress
        </KawaiiButton>
      </KawaiiCard>
    )
    
    // Assert
    const card = screen.getByTestId('reading-card')
    const button = screen.getByTestId('progress-button')
    
    expect(card).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(card).toContainElement(button)
    
    // Verify styling classes are applied correctly
    expect(card).toHaveClass('kawaii-card-primary')
    expect(button).toHaveClass('kawaii-btn-secondary', 'kawaii-btn-sm')
  })

  it('should_handle_nested_interaction_with_event_propagation', async () => {
    // Arrange
    const user = userEvent.setup()
    const cardClickHandler = vi.fn()
    const buttonClickHandler = vi.fn()
    
    render(
      <KawaiiCard 
        clickable
        onClick={cardClickHandler}
        data-testid="clickable-card"
      >
        <KawaiiButton 
          variant="primary"
          onClick={buttonClickHandler}
          data-testid="nested-button"
        >
          Click Me
        </KawaiiButton>
      </KawaiiCard>
    )
    
    // Act - Click button
    const button = screen.getByTestId('nested-button')
    await user.click(button)
    
    // Assert - Both handlers are called due to event bubbling (this is expected DOM behavior)
    expect(buttonClickHandler).toHaveBeenCalledTimes(1)
    expect(cardClickHandler).toHaveBeenCalledTimes(1)
  })

  it('should_only_trigger_card_click_when_card_area_clicked_directly', async () => {
    // Arrange
    const user = userEvent.setup()
    const cardClickHandler = vi.fn()
    const buttonClickHandler = vi.fn()
    
    render(
      <KawaiiCard 
        title="Click the card, not the button"
        clickable
        onClick={cardClickHandler}
        data-testid="clickable-card"
      >
        <KawaiiButton 
          variant="primary"
          onClick={buttonClickHandler}
          data-testid="nested-button"
        >
          Don't click me
        </KawaiiButton>
      </KawaiiCard>
    )
    
    // Act - Click card title (not the button)
    const cardTitle = screen.getByText('Click the card, not the button')
    await user.click(cardTitle)
    
    // Assert - Only card handler should be called
    expect(cardClickHandler).toHaveBeenCalledTimes(1)
    expect(buttonClickHandler).not.toHaveBeenCalled()
  })

  it('should_maintain_accessibility_when_components_are_nested', () => {
    // Arrange & Act
    render(
      <KawaiiCard 
        title="Accessible Card"
        clickable
        data-testid="accessible-card"
      >
        <KawaiiButton 
          variant="accent"
          data-testid="accessible-button"
        >
          Accessible Action
        </KawaiiButton>
      </KawaiiCard>
    )
    
    // Assert
    const card = screen.getByTestId('accessible-card')
    const button = screen.getByTestId('accessible-button')
    const heading = screen.getByRole('heading', { name: 'Accessible Card' })
    
    // Check accessibility attributes
    expect(card).toHaveAttribute('role', 'button')
    expect(card).toHaveAttribute('tabIndex', '0')
    expect(button).toHaveAttribute('role', 'button')
    expect(button).toHaveAttribute('tabIndex', '0')
    expect(heading).toBeInTheDocument()
  })

  it('should_apply_consistent_theming_across_components', () => {
    // Arrange & Act
    render(
      <div>
        <KawaiiCard variant="primary" data-testid="primary-card">
          <KawaiiButton variant="primary" data-testid="primary-button">
            Primary Theme
          </KawaiiButton>
        </KawaiiCard>
        
        <KawaiiCard variant="secondary" data-testid="secondary-card">
          <KawaiiButton variant="secondary" data-testid="secondary-button">
            Secondary Theme
          </KawaiiButton>
        </KawaiiCard>
        
        <KawaiiCard variant="accent" data-testid="accent-card">
          <KawaiiButton variant="accent" data-testid="accent-button">
            Accent Theme
          </KawaiiButton>
        </KawaiiCard>
      </div>
    )
    
    // Assert - Check that each variant applies consistent theming
    expect(screen.getByTestId('primary-card')).toHaveClass('kawaii-card-primary')
    expect(screen.getByTestId('primary-button')).toHaveClass('kawaii-btn-primary')
    
    expect(screen.getByTestId('secondary-card')).toHaveClass('kawaii-card-secondary')
    expect(screen.getByTestId('secondary-button')).toHaveClass('kawaii-btn-secondary')
    
    expect(screen.getByTestId('accent-card')).toHaveClass('kawaii-card-accent')
    expect(screen.getByTestId('accent-button')).toHaveClass('kawaii-btn-accent')
  })
})