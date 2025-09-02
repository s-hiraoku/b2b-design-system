import React from 'react';
import { vi } from 'vitest';
import { render, screen, setupUserEvent } from '../../tests/utils/test-utils';
import { expectNoAccessibilityViolations } from '../../tests/setup/test-setup';
import { Button } from './Button';

describe('Button Component - TDD Cycle 1', () => {
  const user = setupUserEvent();

  describe('Basic Rendering and Props', () => {
    it('should render a button element with default props', () => {
      // Arrange: Basic button rendering test
      const buttonText = 'Click me';

      // Act: Render the button
      render(<Button>{buttonText}</Button>);

      // Assert: Button should be in document
      expect(screen.getByRole('button', { name: buttonText })).toBeInTheDocument();
    });

    it('should render with custom variant classes', () => {
      // Arrange: Test variant prop
      const buttonText = 'Primary Button';

      // Act: Render button with primary variant
      render(<Button variant="primary">{buttonText}</Button>);

      // Assert: Button should have primary styling classes
      const button = screen.getByRole('button', { name: buttonText });
      expect(button).toHaveClass('btn-primary');
    });

    it('should render with size variations', () => {
      // Arrange: Test size prop
      const buttonText = 'Large Button';

      // Act: Render button with large size
      render(<Button size="large">{buttonText}</Button>);

      // Assert: Button should have large size classes
      const button = screen.getByRole('button', { name: buttonText });
      expect(button).toHaveClass('btn-large');
    });
  });

  describe('Interactive Behavior', () => {
    it('should handle click events', async () => {
      // Arrange: Setup click handler
      const handleClick = vi.fn();
      const buttonText = 'Clickable Button';

      // Act: Render and click the button
      render(<Button onClick={handleClick}>{buttonText}</Button>);
      await user.click(screen.getByRole('button', { name: buttonText }));

      // Assert: Click handler should be called
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be disabled when disabled prop is true', async () => {
      // Arrange: Setup disabled button
      const handleClick = vi.fn();
      const buttonText = 'Disabled Button';

      // Act: Render disabled button and attempt click
      render(<Button disabled onClick={handleClick}>{buttonText}</Button>);
      const button = screen.getByRole('button', { name: buttonText });
      await user.click(button);

      // Assert: Button should be disabled and click should not fire
      expect(button).toBeDisabled();
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility Requirements', () => {
    it('should be keyboard accessible with Enter key', async () => {
      // Arrange: Setup keyboard interaction
      const handleClick = vi.fn();
      const buttonText = 'Keyboard Button';

      // Act: Render, focus, and press Enter
      render(<Button onClick={handleClick}>{buttonText}</Button>);
      const button = screen.getByRole('button', { name: buttonText });
      button.focus();
      await user.keyboard('{Enter}');

      // Assert: Click handler should be called
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be keyboard accessible with Space key', async () => {
      // Arrange: Setup keyboard interaction
      const handleClick = vi.fn();
      const buttonText = 'Space Button';

      // Act: Render, focus, and press Space
      render(<Button onClick={handleClick}>{buttonText}</Button>);
      const button = screen.getByRole('button', { name: buttonText });
      button.focus();
      await user.keyboard('{ }');

      // Assert: Click handler should be called
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should have no accessibility violations', async () => {
      // Arrange: Render button for accessibility testing
      const { container } = render(<Button>Accessible Button</Button>);

      // Assert: Should pass accessibility audit
      await expectNoAccessibilityViolations(container);
    });

    it('should have proper ARIA attributes when loading', () => {
      // Arrange: Render loading button
      const buttonText = 'Loading Button';

      // Act: Render button in loading state
      render(<Button loading>{buttonText}</Button>);

      // Assert: Should have proper ARIA attributes
      const button = screen.getByRole('button', { name: buttonText });
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toBeDisabled();
    });
  });

  describe('Enterprise B2B Requirements', () => {
    it('should render with enterprise-specific classes', () => {
      // Arrange: Test enterprise styling
      const buttonText = 'Enterprise Button';

      // Act: Render with enterprise variant
      render(<Button variant="enterprise">{buttonText}</Button>);

      // Assert: Should have enterprise classes
      const button = screen.getByRole('button', { name: buttonText });
      expect(button).toHaveEnterpriseClass('button');
    });

    it('should support high-contrast theme', () => {
      // Arrange: Test high-contrast support
      const buttonText = 'High Contrast Button';

      // Act: Render in high-contrast theme
      render(<Button>{buttonText}</Button>, { theme: 'high-contrast' });

      // Assert: Should have high-contrast compatible styling
      const button = screen.getByRole('button', { name: buttonText });
      expect(button).toBeInTheDocument();
      // Additional high-contrast assertions would go here
    });
  });
});