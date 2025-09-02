import React from 'react';
import { render, screen } from '../../tests/utils/test-utils';
import { expectNoAccessibilityViolations } from '../../tests/setup/test-setup';
import { Label } from './Label';

describe('Label Component - TDD Cycle', () => {
  describe('Basic Rendering', () => {
    it('should render a label element', () => {
      // Arrange: Basic label rendering test
      const labelText = 'Form Label';

      // Act: Render the label
      render(<Label>{labelText}</Label>);

      // Assert: Should render as label element
      expect(screen.getByText(labelText)).toBeInTheDocument();
      expect(screen.getByText(labelText).tagName).toBe('LABEL');
    });

    it('should associate with form field using htmlFor', () => {
      // Arrange: Test htmlFor association
      const labelText = 'Email Address';
      const fieldId = 'email-field';

      // Act: Render label with htmlFor
      render(<Label htmlFor={fieldId}>{labelText}</Label>);

      // Assert: Should have proper for attribute
      const label = screen.getByText(labelText);
      expect(label).toHaveAttribute('for', fieldId);
    });

    it('should render with different size variants', () => {
      // Arrange: Test size variants
      const labelText = 'Large Label';

      // Act: Render label with large size
      render(<Label size="large">{labelText}</Label>);

      // Assert: Should have large size classes
      const label = screen.getByText(labelText);
      expect(label).toHaveClass('text-base'); // Large maps to text-base
    });
  });

  describe('Component Variants', () => {
    it('should apply weight variant classes', () => {
      // Arrange: Test weight variant
      const labelText = 'Bold Label';

      // Act: Render label with semibold weight
      render(<Label weight="semibold">{labelText}</Label>);

      // Assert: Should have semibold weight class
      const label = screen.getByText(labelText);
      expect(label).toHaveClass('font-semibold');
    });

    it('should apply color variant classes', () => {
      // Arrange: Test color variant
      const labelText = 'Error Label';

      // Act: Render label with error color
      render(<Label color="error">{labelText}</Label>);

      // Assert: Should have error color class
      const label = screen.getByText(labelText);
      expect(label).toHaveClass('text-red-600');
    });

    it('should render required indicator', () => {
      // Arrange: Test required prop
      const labelText = 'Required Field';

      // Act: Render required label
      render(<Label required>{labelText}</Label>);

      // Assert: Should show required indicator
      const label = screen.getByText(labelText);
      expect(label).toContainHTML('*');
      expect(label).toHaveAttribute('aria-required', 'true');
    });

    it('should render optional indicator', () => {
      // Arrange: Test optional prop
      const labelText = 'Optional Field';

      // Act: Render optional label
      render(<Label optional>{labelText}</Label>);

      // Assert: Should show optional indicator
      const label = screen.getByText(labelText);
      expect(label).toContainHTML('(optional)');
    });
  });

  describe('Accessibility Requirements', () => {
    it('should have no accessibility violations', async () => {
      // Arrange: Render label for accessibility testing
      const { container } = render(<Label>Accessible Label</Label>);

      // Assert: Should pass accessibility audit
      await expectNoAccessibilityViolations(container);
    });

    it('should properly associate with form controls', () => {
      // Arrange: Test form control association
      const labelText = 'Username';
      const fieldId = 'username-input';

      // Act: Render associated label and input
      render(
        <div>
          <Label htmlFor={fieldId}>{labelText}</Label>
          <input id={fieldId} type="text" />
        </div>
      );

      // Assert: Label should be associated with input
      const label = screen.getByText(labelText);
      const input = screen.getByRole('textbox');
      expect(label).toHaveAttribute('for', fieldId);
      expect(input).toHaveAttribute('id', fieldId);
    });

    it('should have proper ARIA attributes when required', () => {
      // Arrange: Test ARIA attributes for required fields
      const labelText = 'Required Username';

      // Act: Render required label
      render(<Label required>{labelText}</Label>);

      // Assert: Should have proper ARIA attributes
      const label = screen.getByText(labelText);
      expect(label).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Enterprise B2B Requirements', () => {
    it('should render with enterprise-specific styling', () => {
      // Arrange: Test enterprise variant
      const labelText = 'Enterprise Label';

      // Act: Render with enterprise variant
      render(<Label variant="enterprise">{labelText}</Label>);

      // Assert: Should have enterprise classes
      const label = screen.getByText(labelText);
      expect(label).toHaveEnterpriseClass('label');
    });

    it('should support professional form styling', () => {
      // Arrange: Test professional styling
      const labelText = 'Professional Label';

      // Act: Render with default professional styling
      render(<Label>{labelText}</Label>);

      // Assert: Should have professional typography
      const label = screen.getByText(labelText);
      expect(label).toHaveClass('font-medium'); // Professional weight
      expect(label).toHaveClass('text-gray-900'); // Professional color
    });

    it('should maintain proper spacing for forms', () => {
      // Arrange: Test form spacing
      const labelText = 'Form Label';

      // Act: Render label with default spacing
      render(<Label>{labelText}</Label>);

      // Assert: Should have proper margin for form layouts
      const label = screen.getByText(labelText);
      expect(label).toHaveClass('mb-2'); // Standard form spacing
    });
  });
});