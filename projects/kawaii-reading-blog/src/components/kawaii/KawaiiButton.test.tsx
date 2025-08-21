import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { KawaiiButton } from './KawaiiButton'

describe('KawaiiButton', () => {
  describe('Rendering and Basic Props', () => {
    it('should_render_button_with_children_when_basic_props_provided', () => {
      // Arrange
      const buttonText = 'Click me!'
      
      // Act
      render(
        <KawaiiButton variant="primary" data-testid="kawaii-button">
          {buttonText}
        </KawaiiButton>
      )
      
      // Assert
      const button = screen.getByRole('button', { name: buttonText })
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent(buttonText)
    })

    it('should_render_primary_variant_with_correct_styles_when_variant_prop_given', () => {
      // Arrange & Act
      render(
        <KawaiiButton variant="primary" data-testid="primary-button">
          Primary Button
        </KawaiiButton>
      )
      
      // Assert
      const button = screen.getByTestId('primary-button')
      expect(button).toHaveClass('kawaii-btn-primary')
    })

    it('should_render_secondary_variant_with_correct_styles_when_variant_prop_given', () => {
      // Arrange & Act
      render(
        <KawaiiButton variant="secondary" data-testid="secondary-button">
          Secondary Button
        </KawaiiButton>
      )
      
      // Assert
      const button = screen.getByTestId('secondary-button')
      expect(button).toHaveClass('kawaii-btn-secondary')
    })

    it('should_render_accent_variant_with_correct_styles_when_variant_prop_given', () => {
      // Arrange & Act
      render(
        <KawaiiButton variant="accent" data-testid="accent-button">
          Accent Button
        </KawaiiButton>
      )
      
      // Assert
      const button = screen.getByTestId('accent-button')
      expect(button).toHaveClass('kawaii-btn-accent')
    })
  })

  describe('Size Variants', () => {
    it('should_render_medium_size_by_default_when_no_size_prop_provided', () => {
      // Arrange & Act
      render(
        <KawaiiButton variant="primary" data-testid="default-size-button">
          Default Size
        </KawaiiButton>
      )
      
      // Assert
      const button = screen.getByTestId('default-size-button')
      expect(button).toHaveClass('kawaii-btn-md')
    })

    it('should_render_small_size_with_correct_styles_when_size_sm_provided', () => {
      // Arrange & Act
      render(
        <KawaiiButton variant="primary" size="sm" data-testid="small-button">
          Small Button
        </KawaiiButton>
      )
      
      // Assert
      const button = screen.getByTestId('small-button')
      expect(button).toHaveClass('kawaii-btn-sm')
    })

    it('should_render_large_size_with_correct_styles_when_size_lg_provided', () => {
      // Arrange & Act
      render(
        <KawaiiButton variant="primary" size="lg" data-testid="large-button">
          Large Button
        </KawaiiButton>
      )
      
      // Assert
      const button = screen.getByTestId('large-button')
      expect(button).toHaveClass('kawaii-btn-lg')
    })
  })

  describe('Interactive States', () => {
    it('should_be_enabled_by_default_when_no_disabled_prop_provided', () => {
      // Arrange & Act
      render(
        <KawaiiButton variant="primary" data-testid="enabled-button">
          Enabled Button
        </KawaiiButton>
      )
      
      // Assert
      const button = screen.getByTestId('enabled-button')
      expect(button).not.toBeDisabled()
    })

    it('should_be_disabled_when_disabled_prop_is_true', () => {
      // Arrange & Act
      render(
        <KawaiiButton variant="primary" disabled data-testid="disabled-button">
          Disabled Button
        </KawaiiButton>
      )
      
      // Assert
      const button = screen.getByTestId('disabled-button')
      expect(button).toBeDisabled()
      expect(button).toHaveClass('kawaii-btn-disabled')
    })

    it('should_show_loading_state_when_loading_prop_is_true', () => {
      // Arrange & Act
      render(
        <KawaiiButton variant="primary" loading data-testid="loading-button">
          Loading Button
        </KawaiiButton>
      )
      
      // Assert
      const button = screen.getByTestId('loading-button')
      expect(button).toHaveClass('kawaii-btn-loading')
      expect(button).toBeDisabled()
    })
  })

  describe('Event Handling', () => {
    it('should_call_onClick_handler_when_button_is_clicked', async () => {
      // Arrange
      const user = userEvent.setup()
      const handleClick = vi.fn()
      
      render(
        <KawaiiButton variant="primary" onClick={handleClick} data-testid="clickable-button">
          Click Me
        </KawaiiButton>
      )
      
      // Act
      const button = screen.getByTestId('clickable-button')
      await user.click(button)
      
      // Assert
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should_not_call_onClick_handler_when_button_is_disabled', async () => {
      // Arrange
      const user = userEvent.setup()
      const handleClick = vi.fn()
      
      render(
        <KawaiiButton 
          variant="primary" 
          disabled 
          onClick={handleClick} 
          data-testid="disabled-clickable-button"
        >
          Disabled Click
        </KawaiiButton>
      )
      
      // Act
      const button = screen.getByTestId('disabled-clickable-button')
      await user.click(button)
      
      // Assert
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('should_not_call_onClick_handler_when_button_is_loading', async () => {
      // Arrange
      const user = userEvent.setup()
      const handleClick = vi.fn()
      
      render(
        <KawaiiButton 
          variant="primary" 
          loading 
          onClick={handleClick} 
          data-testid="loading-clickable-button"
        >
          Loading Click
        </KawaiiButton>
      )
      
      // Act
      const button = screen.getByTestId('loading-clickable-button')
      await user.click(button)
      
      // Assert
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Hover Animation', () => {
    it('should_have_hover_effect_enabled_by_default_when_no_hoverEffect_prop_provided', () => {
      // Arrange & Act
      render(
        <KawaiiButton variant="primary" data-testid="hover-button">
          Hover Me
        </KawaiiButton>
      )
      
      // Assert
      const button = screen.getByTestId('hover-button')
      expect(button).toHaveClass('kawaii-btn-hoverable')
    })

    it('should_disable_hover_effect_when_hoverEffect_prop_is_false', () => {
      // Arrange & Act
      render(
        <KawaiiButton variant="primary" hoverEffect={false} data-testid="no-hover-button">
          No Hover
        </KawaiiButton>
      )
      
      // Assert
      const button = screen.getByTestId('no-hover-button')
      expect(button).not.toHaveClass('kawaii-btn-hoverable')
    })
  })

  describe('Accessibility', () => {
    it('should_have_button_role_for_screen_readers', () => {
      // Arrange & Act
      render(
        <KawaiiButton variant="primary">
          Accessible Button
        </KawaiiButton>
      )
      
      // Assert
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should_be_keyboard_focusable_when_not_disabled', () => {
      // Arrange & Act
      render(
        <KawaiiButton variant="primary" data-testid="focusable-button">
          Focus Me
        </KawaiiButton>
      )
      
      // Assert
      const button = screen.getByTestId('focusable-button')
      expect(button).toHaveAttribute('tabIndex', '0')
    })

    it('should_not_be_keyboard_focusable_when_disabled', () => {
      // Arrange & Act
      render(
        <KawaiiButton variant="primary" disabled data-testid="non-focusable-button">
          Cannot Focus
        </KawaiiButton>
      )
      
      // Assert
      const button = screen.getByTestId('non-focusable-button')
      expect(button).toHaveAttribute('tabIndex', '-1')
    })
  })
})