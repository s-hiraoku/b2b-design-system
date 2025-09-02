import React from 'react';
import { render, screen } from '../../tests/utils/test-utils';
import { expectNoAccessibilityViolations } from '../../tests/setup/test-setup';
import { Text } from './Text';

describe('Text Component - TDD Cycle', () => {
  describe('Basic Rendering', () => {
    it('should render a paragraph element by default', () => {
      // Arrange: Basic text rendering test
      const textContent = 'This is sample text content';

      // Act: Render the text
      render(<Text>{textContent}</Text>);

      // Assert: Should render as paragraph
      expect(screen.getByText(textContent)).toBeInTheDocument();
      expect(screen.getByText(textContent).tagName).toBe('P');
    });

    it('should render with different element types', () => {
      // Arrange: Test as prop
      const textContent = 'Span text content';

      // Act: Render text as span
      render(<Text as="span">{textContent}</Text>);

      // Assert: Should render as span element
      expect(screen.getByText(textContent).tagName).toBe('SPAN');
    });

    it('should render with various text sizes', () => {
      // Arrange: Test size variants with expected Tailwind classes
      const sizeMapping = {
        small: 'text-sm',
        medium: 'text-base', 
        large: 'text-lg',
        xlarge: 'text-xl'
      } as const;
      
      // Act & Assert: Test each size
      Object.entries(sizeMapping).forEach(([size, expectedClass]) => {
        const textContent = `${size} size text`;
        render(<Text size={size as keyof typeof sizeMapping}>{textContent}</Text>);
        const textElement = screen.getByText(textContent);
        expect(textElement).toHaveClass(expectedClass);
        // Also check custom size class (if we add it)
      });
    });
  });

  describe('Component Variants', () => {
    it('should apply weight variant classes', () => {
      // Arrange: Test weight variant
      const textContent = 'Bold text content';

      // Act: Render text with bold weight
      render(<Text weight="bold">{textContent}</Text>);

      // Assert: Should have bold weight class
      const textElement = screen.getByText(textContent);
      expect(textElement).toHaveClass('font-bold');
    });

    it('should apply color variant classes', () => {
      // Arrange: Test color variant
      const textContent = 'Muted text content';

      // Act: Render text with muted color
      render(<Text color="muted">{textContent}</Text>);

      // Assert: Should have muted color classes
      const textElement = screen.getByText(textContent);
      expect(textElement).toHaveClass('text-gray-500'); // Tailwind color class
    });

    it('should combine multiple variants', () => {
      // Arrange: Test multiple variants
      const textContent = 'Large bold primary text';

      // Act: Render text with multiple variants
      render(<Text size="large" weight="bold" color="primary">{textContent}</Text>);

      // Assert: Should have all variant classes
      const textElement = screen.getByText(textContent);
      expect(textElement).toHaveClass('font-bold'); // Weight class
      expect(textElement).toHaveClass('text-lg'); // Tailwind size class
      expect(textElement).toHaveClass('text-blue-600'); // Tailwind color class
    });

    it('should support truncation', () => {
      // Arrange: Test truncation
      const textContent = 'This is a very long text that should be truncated';

      // Act: Render truncated text
      render(<Text truncate>{textContent}</Text>);

      // Assert: Should have truncation classes
      const textElement = screen.getByText(textContent);
      expect(textElement).toHaveClass('truncate');
    });
  });

  describe('Accessibility Requirements', () => {
    it('should have no accessibility violations', async () => {
      // Arrange: Render text for accessibility testing
      const { container } = render(<Text>Accessible text content</Text>);

      // Assert: Should pass accessibility audit
      await expectNoAccessibilityViolations(container);
    });

    it('should maintain proper text contrast ratios', () => {
      // Arrange: Test contrast requirements
      const textContent = 'High contrast text';

      // Act: Render text with default styling
      render(<Text>{textContent}</Text>);

      // Assert: Should have proper contrast classes
      const textElement = screen.getByText(textContent);
      expect(textElement).toHaveClass('text-gray-900'); // High contrast color
    });

    it('should be screen reader friendly', () => {
      // Arrange: Test screen reader support
      const textContent = 'Screen reader friendly text';

      // Act: Render text
      render(<Text>{textContent}</Text>);

      // Assert: Should be accessible to screen readers
      const textElement = screen.getByText(textContent);
      expect(textElement).toBeInTheDocument();
      expect(textElement).not.toHaveAttribute('aria-hidden');
    });
  });

  describe('Enterprise B2B Requirements', () => {
    it('should render with enterprise-specific styling', () => {
      // Arrange: Test enterprise variant
      const textContent = 'Enterprise text content';

      // Act: Render with enterprise variant
      render(<Text variant="enterprise">{textContent}</Text>);

      // Assert: Should have enterprise classes
      const textElement = screen.getByText(textContent);
      expect(textElement).toHaveEnterpriseClass('text');
    });

    it('should support professional typography scale', () => {
      // Arrange: Test professional sizing
      const textContent = 'Professional text';

      // Act: Render with default professional styling
      render(<Text>{textContent}</Text>);

      // Assert: Should have professional typography classes
      const textElement = screen.getByText(textContent);
      // Check if the element has proper line height style
      expect(textElement.className).toContain('leading-relaxed'); // Professional line height
    });

    it('should maintain readability in business contexts', () => {
      // Arrange: Test business readability
      const longText = 'This is a longer business document text that needs to maintain excellent readability for professional users in various business contexts and environments.';

      // Act: Render business text
      render(<Text size="medium">{longText}</Text>);

      // Assert: Should have proper readability styling
      const textElement = screen.getByText(longText);
      expect(textElement.className).toContain('leading-relaxed');
    });
  });
});