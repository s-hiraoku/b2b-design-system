import React from 'react';
import { vi } from 'vitest';
import { render, screen, setupUserEvent } from '../../tests/utils/test-utils';
import { expectNoAccessibilityViolations } from '../../tests/setup/test-setup';
import { Input } from './Input';

describe('Input Component - TDD Cycle 2', () => {
  const user = setupUserEvent();

  describe('Basic Rendering and Props', () => {
    it('should render an input element with default props', () => {
      // Arrange: Basic input rendering test
      const placeholder = 'Enter text...';

      // Act: Render the input
      render(<Input placeholder={placeholder} />);

      // Assert: Input should be in document
      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should render with different input types', () => {
      // Arrange: Test various input types
      const { rerender } = render(<Input type="email" data-testid="input" />);
      
      // Act & Assert: Email type
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'email');
      
      // Act: Change to password type
      rerender(<Input type="password" data-testid="input" />);
      
      // Assert: Password type
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'password');
    });

    it('should render with size variations', () => {
      // Arrange: Test size prop
      const placeholder = 'Large input';

      // Act: Render input with large size
      render(<Input size="large" placeholder={placeholder} />);

      // Assert: Input should have large size classes
      const input = screen.getByPlaceholderText(placeholder);
      expect(input).toHaveClass('input-large');
    });

    it('should render with variant styling', () => {
      // Arrange: Test variant prop
      const placeholder = 'Error input';

      // Act: Render input with error variant
      render(<Input variant="error" placeholder={placeholder} />);

      // Assert: Input should have error styling classes
      const input = screen.getByPlaceholderText(placeholder);
      expect(input).toHaveClass('input-error');
    });
  });

  describe('Interactive Behavior', () => {
    it('should handle value changes', async () => {
      // Arrange: Setup controlled input
      const handleChange = vi.fn();
      const placeholder = 'Type here...';

      // Act: Render and type in input
      render(<Input placeholder={placeholder} onChange={handleChange} />);
      const input = screen.getByPlaceholderText(placeholder);
      await user.type(input, 'test value');

      // Assert: Change handler should be called for each character
      expect(handleChange).toHaveBeenCalledTimes(10); // 'test value' = 10 chars
    });

    it('should be disabled when disabled prop is true', async () => {
      // Arrange: Setup disabled input
      const handleChange = vi.fn();
      const placeholder = 'Disabled input';

      // Act: Render disabled input and attempt typing
      render(<Input disabled placeholder={placeholder} onChange={handleChange} />);
      const input = screen.getByPlaceholderText(placeholder);
      await user.type(input, 'should not work');

      // Assert: Input should be disabled and typing should not work
      expect(input).toBeDisabled();
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('should handle focus and blur events', async () => {
      // Arrange: Setup focus/blur handlers
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      const placeholder = 'Focus test';

      // Act: Render input with focus handlers
      render(<Input placeholder={placeholder} onFocus={handleFocus} onBlur={handleBlur} />);
      const input = screen.getByPlaceholderText(placeholder);
      
      await user.click(input);
      await user.tab();

      // Assert: Focus and blur handlers should be called
      expect(handleFocus).toHaveBeenCalledTimes(1);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Label and Helper Text', () => {
    it('should render with associated label', () => {
      // Arrange: Input with label
      const labelText = 'Username';
      const inputId = 'username';

      // Act: Render input with label
      render(
        <>
          <Input id={inputId} />
          <label htmlFor={inputId}>{labelText}</label>
        </>
      );

      // Assert: Label should be associated with input
      expect(screen.getByLabelText(labelText)).toBeInTheDocument();
    });

    it('should display helper text when provided', () => {
      // Arrange: Input with helper text
      const helperText = 'Enter your email address';
      const placeholder = 'Email';

      // Act: Render input with helper text prop
      render(<Input placeholder={placeholder} helperText={helperText} />);

      // Assert: Helper text should be displayed
      expect(screen.getByText(helperText)).toBeInTheDocument();
    });

    it('should display error message when in error state', () => {
      // Arrange: Input with error
      const errorMessage = 'This field is required';
      const placeholder = 'Required field';

      // Act: Render input with error
      render(<Input placeholder={placeholder} error={errorMessage} />);

      // Assert: Error message should be displayed
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toHaveAttribute('role', 'alert');
    });
  });

  describe('Accessibility Requirements', () => {
    it('should have proper ARIA attributes', () => {
      // Arrange: Input with accessibility attributes
      const ariaLabel = 'Search input';
      const placeholder = 'Search...';

      // Act: Render input with aria-label
      render(<Input placeholder={placeholder} aria-label={ariaLabel} />);

      // Assert: Should have proper ARIA attributes
      const input = screen.getByPlaceholderText(placeholder);
      expect(input).toHaveAttribute('aria-label', ariaLabel);
    });

    it('should be keyboard accessible', async () => {
      // Arrange: Setup keyboard navigation test
      const placeholder = 'Keyboard test';

      // Act: Render input and navigate with keyboard
      render(<Input placeholder={placeholder} />);
      const input = screen.getByPlaceholderText(placeholder);
      
      await user.tab();

      // Assert: Input should be focused
      expect(input).toHaveFocus();
    });

    it('should have no accessibility violations', async () => {
      // Arrange: Render input for accessibility testing
      const { container } = render(<Input placeholder="Accessible input" />);

      // Assert: Should pass accessibility audit
      await expectNoAccessibilityViolations(container);
    });

    it('should link error message with aria-describedby', () => {
      // Arrange: Input with error
      const errorMessage = 'Invalid email format';
      const placeholder = 'Email';

      // Act: Render input with error
      render(<Input placeholder={placeholder} error={errorMessage} />);

      // Assert: Input should be described by error message
      const input = screen.getByPlaceholderText(placeholder);
      const errorElement = screen.getByText(errorMessage);
      
      expect(input).toHaveAttribute('aria-describedby');
      expect(input.getAttribute('aria-describedby')).toBe(errorElement.id);
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Enterprise B2B Requirements', () => {
    it('should render with enterprise-specific styling', () => {
      // Arrange: Test enterprise variant
      const placeholder = 'Enterprise Input';

      // Act: Render with enterprise variant
      render(<Input variant="enterprise" placeholder={placeholder} />);

      // Assert: Should have enterprise classes
      const input = screen.getByPlaceholderText(placeholder);
      expect(input).toHaveEnterpriseClass('input');
    });

    it('should support high-contrast theme', () => {
      // Arrange: Test high-contrast support
      const placeholder = 'High Contrast Input';

      // Act: Render in high-contrast theme
      render(<Input placeholder={placeholder} />, { theme: 'high-contrast' });

      // Assert: Should be rendered appropriately
      const input = screen.getByPlaceholderText(placeholder);
      expect(input).toBeInTheDocument();
      // Additional high-contrast assertions would go here
    });

    it('should handle large datasets in suggestions/autocomplete', () => {
      // Arrange: Test enterprise-scale autocomplete
      const placeholder = 'Search employees...';
      const suggestions = Array.from({ length: 1000 }, (_, i) => `Employee ${i}`);

      // Act: Render input with large suggestion list (will be implemented)
      render(<Input placeholder={placeholder} suggestions={suggestions} />);

      // Assert: Input should be rendered (suggestions functionality will be added)
      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    });
  });
});