import React from 'react';
import { vi } from 'vitest';
import { render, screen, setupUserEvent } from '../../tests/utils/test-utils';
import { expectNoAccessibilityViolations } from '../../tests/setup/test-setup';
import { IconButton } from './IconButton';

// Mock icon component for testing
const MockIcon = () => <svg data-testid="mock-icon" />;

describe('IconButton Component - TDD Cycle 1', () => {
  const user = setupUserEvent();

  describe('RED PHASE: Basic Rendering and Props', () => {
    it('should render an icon-only button with accessible label', () => {
      // Arrange: Icon button with aria-label
      const iconLabel = 'Save document';

      // Act: Render the icon button
      render(
        <IconButton aria-label={iconLabel}>
          <MockIcon />
        </IconButton>
      );

      // Assert: Button should be accessible and contain icon
      expect(screen.getByRole('button', { name: iconLabel })).toBeInTheDocument();
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('should render with different sizes', () => {
      // Arrange: Test size variants
      const iconLabel = 'Delete item';

      // Act: Render button with large size
      render(
        <IconButton size="large" aria-label={iconLabel}>
          <MockIcon />
        </IconButton>
      );

      // Assert: Button should have large size styling
      const button = screen.getByRole('button', { name: iconLabel });
      expect(button).toHaveClass('icon-button-large');
    });

    it('should render with different variants', () => {
      // Arrange: Test variant prop
      const iconLabel = 'Primary action';

      // Act: Render button with primary variant
      render(
        <IconButton variant="primary" aria-label={iconLabel}>
          <MockIcon />
        </IconButton>
      );

      // Assert: Button should have primary styling
      const button = screen.getByRole('button', { name: iconLabel });
      expect(button).toHaveClass('btn-primary');
    });
  });

  describe('Interactive Behavior', () => {
    it('should handle click events', async () => {
      // Arrange: Setup click handler
      const handleClick = vi.fn();
      const iconLabel = 'Clickable icon';

      // Act: Render and click the button
      render(
        <IconButton onClick={handleClick} aria-label={iconLabel}>
          <MockIcon />
        </IconButton>
      );
      await user.click(screen.getByRole('button', { name: iconLabel }));

      // Assert: Click handler should be called
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be disabled when disabled prop is true', async () => {
      // Arrange: Setup disabled button
      const handleClick = vi.fn();
      const iconLabel = 'Disabled icon';

      // Act: Render disabled button and attempt click
      render(
        <IconButton disabled onClick={handleClick} aria-label={iconLabel}>
          <MockIcon />
        </IconButton>
      );
      const button = screen.getByRole('button', { name: iconLabel });
      await user.click(button);

      // Assert: Button should be disabled and click should not fire
      expect(button).toBeDisabled();
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility Requirements', () => {
    it('should require aria-label for screen readers', () => {
      // Arrange: Icon button without aria-label should be flagged
      const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      // Act: Render without aria-label
      render(
        <IconButton>
          <MockIcon />
        </IconButton>
      );

      // Assert: Should warn about missing aria-label
      // This test will be implemented when we add the validation
      consoleWarn.mockRestore();
    });

    it('should support tooltip integration for additional context', () => {
      // Arrange: Icon button with tooltip
      const iconLabel = 'Settings';
      const tooltipText = 'Open application settings';

      // Act: Render with aria-describedby for tooltip
      render(
        <IconButton 
          aria-label={iconLabel}
          aria-describedby="tooltip-settings"
          title={tooltipText}
        >
          <MockIcon />
        </IconButton>
      );

      // Assert: Should have proper tooltip attributes
      const button = screen.getByRole('button', { name: iconLabel });
      expect(button).toHaveAttribute('aria-describedby', 'tooltip-settings');
      expect(button).toHaveAttribute('title', tooltipText);
    });

    it('should have no accessibility violations', async () => {
      // Arrange: Render icon button for accessibility testing
      const { container } = render(
        <IconButton aria-label="Accessible icon button">
          <MockIcon />
        </IconButton>
      );

      // Assert: Should pass accessibility audit
      await expectNoAccessibilityViolations(container);
    });
  });

  describe('Enterprise B2B Requirements', () => {
    it('should render with enterprise-specific classes', () => {
      // Arrange: Test enterprise styling
      const iconLabel = 'Enterprise action';

      // Act: Render with enterprise variant
      render(
        <IconButton variant="enterprise" aria-label={iconLabel}>
          <MockIcon />
        </IconButton>
      );

      // Assert: Should have enterprise classes
      const button = screen.getByRole('button', { name: iconLabel });
      expect(button).toHaveEnterpriseClass('button');
    });

    it('should maintain square aspect ratio for professional appearance', () => {
      // Arrange: Test square dimensions
      const iconLabel = 'Square icon button';

      // Act: Render icon button
      render(
        <IconButton aria-label={iconLabel}>
          <MockIcon />
        </IconButton>
      );

      // Assert: Should have equal width and height classes
      const button = screen.getByRole('button', { name: iconLabel });
      expect(button).toHaveClass('aspect-square');
    });
  });
});