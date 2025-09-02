import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectField,
} from './Select';

expect.extend(toHaveNoViolations);

describe('Select Component - Core TDD Tests', () => {
  describe('Basic Rendering', () => {
    it('should render a select trigger with default props', () => {
      render(
        <Select>
          <SelectTrigger data-testid="select-trigger">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute('role', 'combobox');
    });

    it('should render with different size variants', () => {
      render(
        <div>
          <Select>
            <SelectTrigger size="sm" data-testid="select-small">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger size="lg" data-testid="select-large">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );

      const smallSelect = screen.getByTestId('select-small');
      const largeSelect = screen.getByTestId('select-large');
      
      expect(smallSelect).toHaveClass('h-8');
      expect(largeSelect).toHaveClass('h-11');
    });

    it('should render with different style variants', () => {
      render(
        <div>
          <Select>
            <SelectTrigger variant="outline" data-testid="select-outline">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger variant="filled" data-testid="select-filled">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );

      const outlineSelect = screen.getByTestId('select-outline');
      const filledSelect = screen.getByTestId('select-filled');
      
      expect(outlineSelect).toHaveClass('border-2');
      expect(filledSelect).toHaveClass('bg-muted');
    });

    it('should render with status variants', () => {
      render(
        <div>
          <Select>
            <SelectTrigger status="error" data-testid="select-error">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger status="success" data-testid="select-success">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );

      const errorSelect = screen.getByTestId('select-error');
      const successSelect = screen.getByTestId('select-success');
      
      expect(errorSelect).toHaveClass('border-destructive');
      expect(successSelect).toHaveClass('border-success');
    });
  });

  describe('SelectField Enhanced Component', () => {
    it('should render with label and helper text', () => {
      render(
        <SelectField
          label="Choose Option"
          helperText="Select one of the available options"
          data-testid="select-field"
        >
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectField>
      );

      expect(screen.getByText('Choose Option')).toBeInTheDocument();
      expect(screen.getByText('Select one of the available options')).toBeInTheDocument();
    });

    it('should display error message when in error state', () => {
      render(
        <SelectField
          label="Choose Option"
          error="This field is required"
          data-testid="select-field"
        >
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectField>
      );

      const errorMessage = screen.getByText('This field is required');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveAttribute('role', 'alert');
      expect(errorMessage).toHaveClass('text-destructive');
    });

    it('should show required indicator when required', () => {
      render(
        <SelectField
          label="Choose Option"
          required
          data-testid="select-field"
        >
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectField>
      );

      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('should link error message with aria-describedby', () => {
      render(
        <SelectField
          label="Choose Option"
          error="This field is required"
          data-testid="select-field"
        >
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectField>
      );

      const trigger = screen.getByTestId('select-field');
      const errorMessage = screen.getByText('This field is required');
      
      expect(trigger).toHaveAttribute('aria-describedby', errorMessage.id);
    });
  });

  describe('Disabled State', () => {
    it('should handle disabled state', () => {
      render(
        <Select disabled>
          <SelectTrigger data-testid="select-trigger">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toBeDisabled();
      expect(trigger).toHaveClass('disabled:cursor-not-allowed');
    });
  });

  describe('Accessibility Requirements', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <Select>
          <SelectTrigger data-testid="select-trigger">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveAttribute('role', 'combobox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('should support screen reader announcements', () => {
      render(
        <SelectField
          label="Status"
          error="Please select a status"
        >
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectField>
      );

      const errorMessage = screen.getByText('Please select a status');
      expect(errorMessage).toHaveAttribute('aria-live', 'polite');
    });

    it('should have no accessibility violations for SelectField', async () => {
      const { container } = render(
        <SelectField
          label="Choose Option"
          helperText="Select one of the available options"
          placeholder="Select an option..."
        >
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectField>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Enterprise B2B Requirements', () => {
    it('should render with enterprise-specific styling', () => {
      render(
        <Select>
          <SelectTrigger variant="outline" className="enterprise-select" data-testid="select-trigger">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveClass('enterprise-select', 'border-2');
    });

    it('should support high-contrast theme', () => {
      render(
        <div className="high-contrast">
          <Select>
            <SelectTrigger status="error" data-testid="select-trigger">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveClass('border-destructive');
    });

    it('should support dense layouts for data-heavy interfaces', () => {
      render(
        <Select>
          <SelectTrigger size="sm" data-testid="select-trigger">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1" size="sm">Item 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveClass('h-8');
    });
  });

  describe('Performance and Edge Cases', () => {
    it('should handle empty state gracefully', () => {
      render(
        <Select>
          <SelectTrigger data-testid="select-trigger">
            <SelectValue placeholder="No options available" />
          </SelectTrigger>
          <SelectContent>
            {/* No options */}
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toBeInTheDocument();
    });

    it('should maintain type safety with TypeScript', () => {
      // This test ensures TypeScript compilation succeeds with proper types
      const TestComponent = () => (
        <SelectField
          label="Test Select"
          placeholder="Choose option"
          onValueChange={(value: string) => {
            // Type-safe value handling
            expect(typeof value).toBe('string');
          }}
        >
          <SelectItem value="test">Test Option</SelectItem>
        </SelectField>
      );

      render(<TestComponent />);
      expect(screen.getByText('Test Select')).toBeInTheDocument();
    });

    it('should handle large option lists efficiently', () => {
      const options = Array.from({ length: 100 }, (_, i) => ({
        value: `option-${i}`,
        label: `Option ${i + 1}`,
      }));
      
      render(
        <Select>
          <SelectTrigger data-testid="select-trigger">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toBeInTheDocument();
    });
  });
});