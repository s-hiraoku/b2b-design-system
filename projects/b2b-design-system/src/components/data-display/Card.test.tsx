import React from 'react';
import { vi } from 'vitest';
import { render, screen, setupUserEvent } from '../../tests/utils/test-utils';
import { expectNoAccessibilityViolations } from '../../tests/setup/test-setup';
import { Card, CardHeader, CardContent, CardFooter } from './Card';

describe('Card Component - TDD Cycle 3', () => {
  const user = setupUserEvent();

  describe('Basic Card Rendering', () => {
    it('should render a card element with default props', () => {
      // Arrange: Basic card rendering test
      const cardContent = 'This is card content';

      // Act: Render the card
      render(<Card>{cardContent}</Card>);

      // Assert: Card should be in document
      expect(screen.getByText(cardContent)).toBeInTheDocument();
    });

    it('should render with different variants', () => {
      // Arrange: Test variant prop
      const cardContent = 'Enterprise card';

      // Act: Render card with enterprise variant
      render(<Card variant="enterprise">{cardContent}</Card>);

      // Assert: Card should have enterprise styling classes
      const cardElement = screen.getByText(cardContent).closest('[class*="enterprise"]');
      expect(cardElement).toBeInTheDocument();
    });

    it('should render with different sizes', () => {
      // Arrange: Test size prop
      const cardContent = 'Large card';

      // Act: Render card with large size
      render(<Card size="large">{cardContent}</Card>);

      // Assert: Card should have large size classes
      const cardElement = screen.getByText(cardContent).closest('[class*="large"]');
      expect(cardElement).toBeInTheDocument();
    });

    it('should render as different HTML elements when specified', () => {
      // Arrange: Test asChild prop with different elements
      const cardContent = 'Article card';

      // Act: Render card as article element
      render(<Card as="article">{cardContent}</Card>);

      // Assert: Should render as article
      expect(screen.getByRole('article')).toBeInTheDocument();
      expect(screen.getByRole('article')).toHaveTextContent(cardContent);
    });
  });

  describe('Card Composition', () => {
    it('should render card with header, content, and footer', () => {
      // Arrange: Card composition test
      const headerText = 'Card Header';
      const contentText = 'Card Content';
      const footerText = 'Card Footer';

      // Act: Render composed card
      render(
        <Card>
          <CardHeader>{headerText}</CardHeader>
          <CardContent>{contentText}</CardContent>
          <CardFooter>{footerText}</CardFooter>
        </Card>
      );

      // Assert: All parts should be present
      expect(screen.getByText(headerText)).toBeInTheDocument();
      expect(screen.getByText(contentText)).toBeInTheDocument();
      expect(screen.getByText(footerText)).toBeInTheDocument();
    });

    it('should render card header with proper semantic structure', () => {
      // Arrange: Header semantics test
      const headerText = 'Important Card Title';

      // Act: Render card with header
      render(
        <Card>
          <CardHeader>
            <h2>{headerText}</h2>
          </CardHeader>
          <CardContent>Content here</CardContent>
        </Card>
      );

      // Assert: Header should contain heading
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(headerText);
    });

    it('should render card content with proper spacing', () => {
      // Arrange: Content spacing test
      const contentText = 'This is the main content area';

      // Act: Render card with content
      render(
        <Card>
          <CardContent>{contentText}</CardContent>
        </Card>
      );

      // Assert: Content should have proper classes
      const contentElement = screen.getByText(contentText);
      expect(contentElement).toHaveClass('card-content');
    });
  });

  describe('Interactive Behavior', () => {
    it('should handle click events when clickable', async () => {
      // Arrange: Setup clickable card
      const handleClick = vi.fn();
      const cardContent = 'Clickable card';

      // Act: Render and click the card
      render(<Card clickable onClick={handleClick}>{cardContent}</Card>);
      await user.click(screen.getByText(cardContent));

      // Assert: Click handler should be called
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be keyboard accessible when clickable', async () => {
      // Arrange: Setup keyboard accessible card
      const handleClick = vi.fn();
      const cardContent = 'Keyboard accessible card';

      // Act: Render card and interact with keyboard
      render(<Card clickable onClick={handleClick}>{cardContent}</Card>);
      const cardElement = screen.getByText(cardContent).closest('[tabindex]');
      
      if (cardElement) {
        cardElement.focus();
        await user.keyboard('{Enter}');
      }

      // Assert: Click handler should be called via keyboard
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should show hover effects when hoverable', () => {
      // Arrange: Test hover effects
      const cardContent = 'Hoverable card';

      // Act: Render hoverable card
      render(<Card hoverable>{cardContent}</Card>);

      // Assert: Card should have hover classes
      const cardElement = screen.getByText(cardContent).closest('[class*="hover"]');
      expect(cardElement).toBeInTheDocument();
    });
  });

  describe('Loading and Error States', () => {
    it('should display loading state', () => {
      // Arrange: Loading card test
      const loadingText = 'Loading...';

      // Act: Render loading card
      render(<Card loading loadingText={loadingText}>Content</Card>);

      // Assert: Loading text should be displayed
      expect(screen.getByText(loadingText)).toBeInTheDocument();
      expect(screen.getByText(loadingText)).toHaveAttribute('aria-live', 'polite');
    });

    it('should display error state', () => {
      // Arrange: Error card test
      const errorMessage = 'Failed to load data';

      // Act: Render error card
      render(<Card error errorMessage={errorMessage}>Content</Card>);

      // Assert: Error message should be displayed
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toHaveAttribute('role', 'alert');
    });
  });

  describe('Accessibility Requirements', () => {
    it('should have proper ARIA attributes when clickable', () => {
      // Arrange: Clickable card accessibility test
      const cardContent = 'Accessible clickable card';

      // Act: Render clickable card
      render(<Card clickable>{cardContent}</Card>);

      // Assert: Should have proper ARIA attributes
      const cardElement = screen.getByText(cardContent).closest('[role]');
      expect(cardElement).toHaveAttribute('role', 'button');
      expect(cardElement).toHaveAttribute('tabindex', '0');
    });

    it('should have no accessibility violations', async () => {
      // Arrange: Render card for accessibility testing
      const { container } = render(
        <Card>
          <CardHeader>Accessible Card</CardHeader>
          <CardContent>This card follows accessibility guidelines</CardContent>
          <CardFooter>Footer content</CardFooter>
        </Card>
      );

      // Assert: Should pass accessibility audit
      await expectNoAccessibilityViolations(container);
    });

    it('should support screen reader descriptions', () => {
      // Arrange: Screen reader support test
      const cardContent = 'Card with description';
      const description = 'This card contains important information';

      // Act: Render card with description
      render(
        <Card aria-label={description}>
          {cardContent}
        </Card>
      );

      // Assert: Should have proper aria-label
      const cardElement = screen.getByLabelText(description);
      expect(cardElement).toHaveTextContent(cardContent);
    });
  });

  describe('Enterprise B2B Requirements', () => {
    it('should render with enterprise-specific styling', () => {
      // Arrange: Test enterprise variant
      const cardContent = 'Enterprise Dashboard Card';

      // Act: Render with enterprise variant
      render(<Card variant="enterprise">{cardContent}</Card>);

      // Assert: Should have enterprise classes
      const cardElement = screen.getByText(cardContent);
      expect(cardElement).toHaveEnterpriseClass('card');
    });

    it('should support dense layouts for data-heavy interfaces', () => {
      // Arrange: Test compact variant
      const cardContent = 'Compact data card';

      // Act: Render with compact variant
      render(<Card variant="compact">{cardContent}</Card>);

      // Assert: Should have compact styling
      const cardElement = screen.getByText(cardContent).closest('[class*="compact"]');
      expect(cardElement).toBeInTheDocument();
    });

    it('should handle high-contrast themes', () => {
      // Arrange: Test high-contrast support
      const cardContent = 'High contrast card';

      // Act: Render in high-contrast theme
      render(<Card>{cardContent}</Card>, { theme: 'high-contrast' });

      // Assert: Should be rendered appropriately
      expect(screen.getByText(cardContent)).toBeInTheDocument();
    });

    it('should support status indicators for business data', () => {
      // Arrange: Test status indicators
      const cardContent = 'Status card';
      const status = 'success';

      // Act: Render card with status
      render(<Card status={status}>{cardContent}</Card>);

      // Assert: Should have status styling
      const cardElement = screen.getByText(cardContent).closest('[class*="success"]');
      expect(cardElement).toBeInTheDocument();
    });
  });
});