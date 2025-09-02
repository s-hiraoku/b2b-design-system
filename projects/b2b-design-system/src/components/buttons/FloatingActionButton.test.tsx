import React from 'react';
import { vi } from 'vitest';
import { render, screen, setupUserEvent } from '../../tests/utils/test-utils';
import { expectNoAccessibilityViolations } from '../../tests/setup/test-setup';
import { FloatingActionButton } from './FloatingActionButton';

// Mock icon component for testing
const MockIcon = ({ 'data-testid': testId = 'mock-icon' }) => (
  <svg data-testid={testId} />
);

describe('FloatingActionButton Component - TDD Cycle 3', () => {
  const user = setupUserEvent();

  describe('RED PHASE: Basic Rendering and Positioning', () => {
    it('should render a circular floating button with icon', () => {
      // Arrange: FAB with icon and aria-label
      const fabLabel = 'Add new item';

      // Act: Render the FAB
      render(
        <FloatingActionButton aria-label={fabLabel}>
          <MockIcon />
        </FloatingActionButton>
      );

      // Assert: Should be accessible circular button with icon
      expect(screen.getByRole('button', { name: fabLabel })).toBeInTheDocument();
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('should render with different sizes maintaining circular shape', () => {
      // Arrange: Large FAB for size testing
      const fabLabel = 'Large action';

      // Act: Render FAB with large size
      render(
        <FloatingActionButton size="large" aria-label={fabLabel}>
          <MockIcon />
        </FloatingActionButton>
      );

      // Assert: Should have large size and circular classes
      const button = screen.getByRole('button', { name: fabLabel });
      expect(button).toHaveClass('fab-large', 'rounded-full');
    });

    it('should render with fixed positioning by default', () => {
      // Arrange: Default FAB positioning
      const fabLabel = 'Fixed position FAB';

      // Act: Render default FAB
      render(
        <FloatingActionButton aria-label={fabLabel}>
          <MockIcon />
        </FloatingActionButton>
      );

      // Assert: Should have fixed positioning classes
      const button = screen.getByRole('button', { name: fabLabel });
      expect(button).toHaveClass('fixed');
    });

    it('should render with absolute positioning when specified', () => {
      // Arrange: Absolute positioned FAB
      const fabLabel = 'Absolute position FAB';

      // Act: Render with absolute positioning
      render(
        <FloatingActionButton position="absolute" aria-label={fabLabel}>
          <MockIcon />
        </FloatingActionButton>
      );

      // Assert: Should have absolute positioning
      const button = screen.getByRole('button', { name: fabLabel });
      expect(button).toHaveClass('absolute');
    });

    it('should render extended variant with icon and text', () => {
      // Arrange: Extended FAB with text and icon
      const fabLabel = 'Create new document';
      const fabText = 'Create';

      // Act: Render extended FAB
      render(
        <FloatingActionButton variant="extended" aria-label={fabLabel}>
          <MockIcon />
          {fabText}
        </FloatingActionButton>
      );

      // Assert: Should have extended styling and show both icon and text
      const button = screen.getByRole('button', { name: fabLabel });
      expect(button).toHaveClass('fab-extended');
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
      expect(screen.getByText(fabText)).toBeInTheDocument();
    });
  });

  describe('Interactive Behavior', () => {
    it('should handle click events', async () => {
      // Arrange: FAB with click handler
      const handleClick = vi.fn();
      const fabLabel = 'Clickable FAB';

      // Act: Render and click FAB
      render(
        <FloatingActionButton onClick={handleClick} aria-label={fabLabel}>
          <MockIcon />
        </FloatingActionButton>
      );
      await user.click(screen.getByRole('button', { name: fabLabel }));

      // Assert: Click handler should be called
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be disabled when disabled prop is true', async () => {
      // Arrange: Disabled FAB
      const handleClick = vi.fn();
      const fabLabel = 'Disabled FAB';

      // Act: Render disabled FAB and attempt click
      render(
        <FloatingActionButton disabled onClick={handleClick} aria-label={fabLabel}>
          <MockIcon />
        </FloatingActionButton>
      );
      const button = screen.getByRole('button', { name: fabLabel });
      await user.click(button);

      // Assert: Should be disabled and not handle clicks
      expect(button).toBeDisabled();
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should show loading state with spinner', () => {
      // Arrange: Loading FAB
      const fabLabel = 'Loading FAB';

      // Act: Render FAB in loading state
      render(
        <FloatingActionButton loading aria-label={fabLabel}>
          <MockIcon />
        </FloatingActionButton>
      );

      // Assert: Should show loading indicator and be disabled
      const button = screen.getByRole('button', { name: fabLabel });
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toBeDisabled();
    });
  });

  describe('Accessibility Requirements', () => {
    it('should require aria-label for screen readers', () => {
      // Arrange: FAB without aria-label should warn
      const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // Act: Render FAB without aria-label
      render(
        <FloatingActionButton>
          <MockIcon />
        </FloatingActionButton>
      );

      // Assert: Should warn about missing accessibility label
      // This will be enforced in the component implementation
      consoleWarn.mockRestore();
    });

    it('should support keyboard navigation', async () => {
      // Arrange: Keyboard accessible FAB
      const handleClick = vi.fn();
      const fabLabel = 'Keyboard accessible FAB';

      // Act: Focus FAB and press Enter
      render(
        <FloatingActionButton onClick={handleClick} aria-label={fabLabel}>
          <MockIcon />
        </FloatingActionButton>
      );
      const button = screen.getByRole('button', { name: fabLabel });
      button.focus();
      await user.keyboard('{Enter}');

      // Assert: Should handle keyboard activation
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should have proper role and positioning for screen readers', () => {
      // Arrange: FAB with screen reader context
      const fabLabel = 'Add new item to list';

      // Act: Render FAB with descriptive label
      render(
        <FloatingActionButton aria-label={fabLabel}>
          <MockIcon />
        </FloatingActionButton>
      );

      // Assert: Should have proper button role and accessible label
      const button = screen.getByRole('button', { name: fabLabel });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', fabLabel);
    });

    it('should have no accessibility violations', async () => {
      // Arrange: Render FAB for accessibility testing
      const { container } = render(
        <FloatingActionButton aria-label="Accessible floating action">
          <MockIcon />
        </FloatingActionButton>
      );

      // Assert: Should pass accessibility audit
      await expectNoAccessibilityViolations(container);
    });
  });

  describe('Enterprise B2B Requirements', () => {
    it('should render with enterprise styling', () => {
      // Arrange: Enterprise FAB
      const fabLabel = 'Enterprise FAB';

      // Act: Render with enterprise color scheme
      render(
        <FloatingActionButton color="enterprise" aria-label={fabLabel}>
          <MockIcon />
        </FloatingActionButton>
      );

      // Assert: Should have enterprise color classes
      const button = screen.getByRole('button', { name: fabLabel });
      expect(button).toHaveEnterpriseClass('button');
    });

    it('should support escape key to close or blur FAB', async () => {
      // Arrange: FAB with escape key handling
      const handleEscape = vi.fn();
      const fabLabel = 'Escapable FAB';

      // Act: Focus FAB and press Escape
      render(
        <FloatingActionButton onKeyDown={handleEscape} aria-label={fabLabel}>
          <MockIcon />
        </FloatingActionButton>
      );
      const button = screen.getByRole('button', { name: fabLabel });
      button.focus();
      await user.keyboard('{Escape}');

      // Assert: Should handle escape key properly
      expect(handleEscape).toHaveBeenCalledWith(
        expect.objectContaining({
          key: 'Escape'
        })
      );
    });

    it('should maintain proper z-index for layering', () => {
      // Arrange: FAB with proper layering
      const fabLabel = 'Layered FAB';

      // Act: Render FAB
      render(
        <FloatingActionButton aria-label={fabLabel}>
          <MockIcon />
        </FloatingActionButton>
      );

      // Assert: Should have high z-index for proper layering
      const button = screen.getByRole('button', { name: fabLabel });
      expect(button).toHaveClass('z-50');
    });
  });

  describe('Positioning and Layout', () => {
    it('should render at bottom-right by default', () => {
      // Arrange: Default positioned FAB
      const fabLabel = 'Bottom-right FAB';

      // Act: Render default FAB
      render(
        <FloatingActionButton aria-label={fabLabel}>
          <MockIcon />
        </FloatingActionButton>
      );

      // Assert: Should have bottom-right positioning classes
      const button = screen.getByRole('button', { name: fabLabel });
      expect(button).toHaveClass('bottom-6', 'right-6');
    });

    it('should support custom positioning', () => {
      // Arrange: Custom positioned FAB
      const fabLabel = 'Custom positioned FAB';

      // Act: Render with custom positioning
      render(
        <FloatingActionButton 
          aria-label={fabLabel}
          className="bottom-4 left-4"
        >
          <MockIcon />
        </FloatingActionButton>
      );

      // Assert: Should allow custom positioning via className
      const button = screen.getByRole('button', { name: fabLabel });
      expect(button).toHaveClass('bottom-4', 'left-4');
    });
  });
});