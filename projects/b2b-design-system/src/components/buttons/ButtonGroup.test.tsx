import React from 'react';
import { vi } from 'vitest';
import { render, screen, setupUserEvent } from '../../tests/utils/test-utils';
import { expectNoAccessibilityViolations } from '../../tests/setup/test-setup';
import { ButtonGroup } from './ButtonGroup';
import { Button } from './Button';

describe('ButtonGroup Component - TDD Cycle 2', () => {
  const user = setupUserEvent();

  describe('RED PHASE: Basic Rendering and Layout', () => {
    it('should render a group of buttons with unified styling', () => {
      // Arrange: Button group with multiple buttons
      render(
        <ButtonGroup>
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </ButtonGroup>
      );

      // Assert: All buttons should be rendered
      expect(screen.getByRole('button', { name: 'First' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Second' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Third' })).toBeInTheDocument();
    });

    it('should render with horizontal orientation by default', () => {
      // Arrange: Default button group
      render(
        <ButtonGroup>
          <Button>Left</Button>
          <Button>Right</Button>
        </ButtonGroup>
      );

      // Assert: Should have horizontal layout classes
      const group = screen.getByRole('group');
      expect(group).toHaveClass('flex-row');
    });

    it('should render with vertical orientation when specified', () => {
      // Arrange: Vertical button group
      render(
        <ButtonGroup orientation="vertical">
          <Button>Top</Button>
          <Button>Bottom</Button>
        </ButtonGroup>
      );

      // Assert: Should have vertical layout classes
      const group = screen.getByRole('group');
      expect(group).toHaveClass('flex-col');
    });

    it('should maintain size consistency across grouped buttons', () => {
      // Arrange: Button group with consistent size
      render(
        <ButtonGroup size="large">
          <Button>First</Button>
          <Button>Second</Button>
        </ButtonGroup>
      );

      // Assert: All buttons should inherit the group size
      const firstButton = screen.getByRole('button', { name: 'First' });
      const secondButton = screen.getByRole('button', { name: 'Second' });
      expect(firstButton).toHaveClass('btn-large');
      expect(secondButton).toHaveClass('btn-large');
    });
  });

  describe('Connected Appearance', () => {
    it('should apply first button styling to the first button', () => {
      // Arrange: Button group with connected appearance
      render(
        <ButtonGroup attached>
          <Button>First</Button>
          <Button>Middle</Button>
          <Button>Last</Button>
        </ButtonGroup>
      );

      // Assert: First button should have first styling
      const firstButton = screen.getByRole('button', { name: 'First' });
      expect(firstButton).toHaveClass('button-group-first');
    });

    it('should apply middle button styling to middle buttons', () => {
      // Arrange: Button group with multiple middle buttons
      render(
        <ButtonGroup attached>
          <Button>First</Button>
          <Button>Middle 1</Button>
          <Button>Middle 2</Button>
          <Button>Last</Button>
        </ButtonGroup>
      );

      // Assert: Middle buttons should have middle styling
      const middleButton1 = screen.getByRole('button', { name: 'Middle 1' });
      const middleButton2 = screen.getByRole('button', { name: 'Middle 2' });
      expect(middleButton1).toHaveClass('button-group-middle');
      expect(middleButton2).toHaveClass('button-group-middle');
    });

    it('should apply last button styling to the last button', () => {
      // Arrange: Button group with last button
      render(
        <ButtonGroup attached>
          <Button>First</Button>
          <Button>Last</Button>
        </ButtonGroup>
      );

      // Assert: Last button should have last styling
      const lastButton = screen.getByRole('button', { name: 'Last' });
      expect(lastButton).toHaveClass('button-group-last');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should support keyboard navigation between buttons with arrow keys', async () => {
      // Arrange: Setup button group with focus management
      const handleFirstClick = vi.fn();
      const handleSecondClick = vi.fn();

      render(
        <ButtonGroup>
          <Button onClick={handleFirstClick}>First</Button>
          <Button onClick={handleSecondClick}>Second</Button>
        </ButtonGroup>
      );

      // Act: Focus first button and navigate with arrow key
      const firstButton = screen.getByRole('button', { name: 'First' });
      const secondButton = screen.getByRole('button', { name: 'Second' });
      
      firstButton.focus();
      await user.keyboard('{ArrowRight}');

      // Assert: Second button should receive focus
      expect(secondButton).toHaveFocus();
    });

    it('should wrap focus when navigating beyond last button', async () => {
      // Arrange: Button group with focus wrapping
      render(
        <ButtonGroup>
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Last</Button>
        </ButtonGroup>
      );

      // Act: Focus last button and press right arrow
      const firstButton = screen.getByRole('button', { name: 'First' });
      const lastButton = screen.getByRole('button', { name: 'Last' });
      
      lastButton.focus();
      await user.keyboard('{ArrowRight}');

      // Assert: Focus should wrap to first button
      expect(firstButton).toHaveFocus();
    });

    it('should handle vertical navigation for vertical orientation', async () => {
      // Arrange: Vertical button group
      render(
        <ButtonGroup orientation="vertical">
          <Button>Top</Button>
          <Button>Bottom</Button>
        </ButtonGroup>
      );

      // Act: Focus first button and press down arrow
      const topButton = screen.getByRole('button', { name: 'Top' });
      const bottomButton = screen.getByRole('button', { name: 'Bottom' });
      
      topButton.focus();
      await user.keyboard('{ArrowDown}');

      // Assert: Bottom button should receive focus
      expect(bottomButton).toHaveFocus();
    });
  });

  describe('Accessibility Requirements', () => {
    it('should have proper group role and accessible label', () => {
      // Arrange: Button group with accessible label
      const groupLabel = 'Text formatting options';

      render(
        <ButtonGroup aria-label={groupLabel}>
          <Button>Bold</Button>
          <Button>Italic</Button>
          <Button>Underline</Button>
        </ButtonGroup>
      );

      // Assert: Should have proper group role and label
      const group = screen.getByRole('group', { name: groupLabel });
      expect(group).toBeInTheDocument();
      expect(group).toHaveAttribute('aria-label', groupLabel);
    });

    it('should support radio button group behavior', () => {
      // Arrange: Radio-style button group
      render(
        <ButtonGroup role="radiogroup" aria-label="Text alignment">
          <Button role="radio" aria-checked="true">Left</Button>
          <Button role="radio" aria-checked="false">Center</Button>
          <Button role="radio" aria-checked="false">Right</Button>
        </ButtonGroup>
      );

      // Assert: Should have radio group role
      const group = screen.getByRole('radiogroup', { name: 'Text alignment' });
      expect(group).toBeInTheDocument();
      
      // Assert: Radio buttons should have proper states
      const leftButton = screen.getByRole('radio', { name: 'Left' });
      expect(leftButton).toHaveAttribute('aria-checked', 'true');
    });

    it('should have no accessibility violations', async () => {
      // Arrange: Render button group for accessibility testing
      const { container } = render(
        <ButtonGroup aria-label="Formatting toolbar">
          <Button>Format 1</Button>
          <Button>Format 2</Button>
          <Button>Format 3</Button>
        </ButtonGroup>
      );

      // Assert: Should pass accessibility audit
      await expectNoAccessibilityViolations(container);
    });
  });

  describe('Enterprise B2B Requirements', () => {
    it('should maintain consistent enterprise styling across buttons', () => {
      // Arrange: Enterprise button group
      render(
        <ButtonGroup variant="enterprise">
          <Button>Action 1</Button>
          <Button>Action 2</Button>
        </ButtonGroup>
      );

      // Assert: All buttons should have enterprise styling
      const firstButton = screen.getByRole('button', { name: 'Action 1' });
      const secondButton = screen.getByRole('button', { name: 'Action 2' });
      expect(firstButton).toHaveEnterpriseClass('button');
      expect(secondButton).toHaveEnterpriseClass('button');
    });

    it('should support disabled state for entire group', () => {
      // Arrange: Disabled button group
      render(
        <ButtonGroup disabled>
          <Button>Action 1</Button>
          <Button>Action 2</Button>
        </ButtonGroup>
      );

      // Assert: All buttons should be disabled
      const firstButton = screen.getByRole('button', { name: 'Action 1' });
      const secondButton = screen.getByRole('button', { name: 'Action 2' });
      expect(firstButton).toBeDisabled();
      expect(secondButton).toBeDisabled();
    });
  });
});