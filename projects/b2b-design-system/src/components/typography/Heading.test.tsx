import React from 'react';
import { render, screen } from '../../tests/utils/test-utils';
import { expectNoAccessibilityViolations } from '../../tests/setup/test-setup';
import { Heading } from './Heading';

describe('Heading Component - TDD Cycle', () => {
  describe('Basic Rendering', () => {
    it('should render a heading element with default h2 level', () => {
      // Arrange: Basic heading rendering test
      const headingText = 'Test Heading';

      // Act: Render the heading
      render(<Heading>{headingText}</Heading>);

      // Assert: Should render as h2 by default
      expect(screen.getByRole('heading', { level: 2, name: headingText })).toBeInTheDocument();
    });

    it('should render with specified semantic level', () => {
      // Arrange: Test level prop
      const headingText = 'Main Heading';

      // Act: Render heading with h1 level
      render(<Heading level={1}>{headingText}</Heading>);

      // Assert: Should render as h1
      expect(screen.getByRole('heading', { level: 1, name: headingText })).toBeInTheDocument();
    });

    it('should render all semantic levels h1 through h6', () => {
      // Arrange: Test all heading levels
      const levels = [1, 2, 3, 4, 5, 6] as const;
      
      // Act & Assert: Test each level
      levels.forEach(level => {
        const headingText = `Heading Level ${level}`;
        render(<Heading level={level}>{headingText}</Heading>);
        expect(screen.getByRole('heading', { level, name: headingText })).toBeInTheDocument();
      });
    });
  });

  describe('Component Variants', () => {
    it('should apply size variant classes', () => {
      // Arrange: Test size variant
      const headingText = 'Large Heading';

      // Act: Render heading with large size
      render(<Heading size="large">{headingText}</Heading>);

      // Assert: Should have large size classes
      const heading = screen.getByRole('heading', { name: headingText });
      expect(heading).toHaveClass('heading-large');
    });

    it('should apply weight variant classes', () => {
      // Arrange: Test weight variant
      const headingText = 'Bold Heading';

      // Act: Render heading with bold weight
      render(<Heading weight="bold">{headingText}</Heading>);

      // Assert: Should have bold weight classes
      const heading = screen.getByRole('heading', { name: headingText });
      expect(heading).toHaveClass('font-bold');
    });

    it('should combine size and weight variants', () => {
      // Arrange: Test multiple variants
      const headingText = 'Large Bold Heading';

      // Act: Render heading with size and weight
      render(<Heading size="large" weight="bold">{headingText}</Heading>);

      // Assert: Should have both variant classes
      const heading = screen.getByRole('heading', { name: headingText });
      expect(heading).toHaveClass('heading-large', 'font-bold');
    });
  });

  describe('Accessibility Requirements', () => {
    it('should have no accessibility violations', async () => {
      // Arrange: Render heading for accessibility testing
      const { container } = render(<Heading>Accessible Heading</Heading>);

      // Assert: Should pass accessibility audit
      await expectNoAccessibilityViolations(container);
    });

    it('should maintain semantic heading hierarchy', () => {
      // Arrange: Test semantic hierarchy
      const h1Text = 'Main Title';
      const h2Text = 'Section Title';
      const h3Text = 'Subsection Title';

      // Act: Render heading hierarchy
      render(
        <div>
          <Heading level={1}>{h1Text}</Heading>
          <Heading level={2}>{h2Text}</Heading>
          <Heading level={3}>{h3Text}</Heading>
        </div>
      );

      // Assert: All headings should be accessible with correct levels
      expect(screen.getByRole('heading', { level: 1, name: h1Text })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: h2Text })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: h3Text })).toBeInTheDocument();
    });
  });

  describe('Enterprise B2B Requirements', () => {
    it('should render with enterprise-specific classes', () => {
      // Arrange: Test enterprise styling
      const headingText = 'Enterprise Heading';

      // Act: Render with enterprise variant
      render(<Heading variant="enterprise">{headingText}</Heading>);

      // Assert: Should have enterprise classes
      const heading = screen.getByRole('heading', { name: headingText });
      expect(heading).toHaveEnterpriseClass('heading');
    });

    it('should support high-contrast theme', () => {
      // Arrange: Test high-contrast support
      const headingText = 'High Contrast Heading';

      // Act: Render in high-contrast theme
      render(<Heading>{headingText}</Heading>, { theme: 'high-contrast' });

      // Assert: Should have high-contrast compatible styling
      const heading = screen.getByRole('heading', { name: headingText });
      expect(heading).toBeInTheDocument();
      // Additional high-contrast assertions would go here
    });

    it('should apply proper spacing for B2B layouts', () => {
      // Arrange: Test B2B spacing
      const headingText = 'Spaced Heading';

      // Act: Render heading with default spacing
      render(<Heading>{headingText}</Heading>);

      // Assert: Should have appropriate margin classes for B2B layouts
      const heading = screen.getByRole('heading', { name: headingText });
      expect(heading).toHaveClass('mb-4'); // B2B standard spacing
    });
  });
});