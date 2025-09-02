import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Checkbox, CheckboxGroup, useCheckboxGroup } from './Checkbox';

expect.extend(toHaveNoViolations);

describe('Checkbox Component - TDD Cycle 5', () => {
  describe('Basic Rendering and Props', () => {
    it('should render a checkbox input with default props', () => {
      render(<Checkbox data-testid="checkbox" />);

      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute('type', 'button');
      expect(checkbox).toHaveAttribute('role', 'checkbox');
      expect(checkbox).toHaveAttribute('aria-checked', 'false');
    });

    it('should render with label and description', () => {
      render(
        <Checkbox
          label="Accept terms"
          description="I agree to the terms and conditions"
          data-testid="checkbox"
        />
      );

      expect(screen.getByText('Accept terms')).toBeInTheDocument();
      expect(screen.getByText('I agree to the terms and conditions')).toBeInTheDocument();
    });

    it('should render with different size variants', () => {
      render(
        <div>
          <Checkbox size="sm" data-testid="checkbox-small" />
          <Checkbox size="default" data-testid="checkbox-default" />
          <Checkbox size="lg" data-testid="checkbox-large" />
        </div>
      );

      const smallCheckbox = screen.getByTestId('checkbox-small');
      const defaultCheckbox = screen.getByTestId('checkbox-default');
      const largeCheckbox = screen.getByTestId('checkbox-large');
      
      expect(smallCheckbox).toHaveClass('h-3', 'w-3');
      expect(defaultCheckbox).toHaveClass('h-4', 'w-4');
      expect(largeCheckbox).toHaveClass('h-5', 'w-5');
    });

    it('should render with different variants', () => {
      render(
        <div>
          <Checkbox variant="default" data-testid="checkbox-default" />
          <Checkbox variant="outline" data-testid="checkbox-outline" />
          <Checkbox variant="filled" data-testid="checkbox-filled" />
          <Checkbox variant="ghost" data-testid="checkbox-ghost" />
        </div>
      );

      const outlineCheckbox = screen.getByTestId('checkbox-outline');
      const filledCheckbox = screen.getByTestId('checkbox-filled');
      const ghostCheckbox = screen.getByTestId('checkbox-ghost');
      
      expect(outlineCheckbox).toHaveClass('border-2');
      expect(filledCheckbox).toHaveClass('bg-muted');
      expect(ghostCheckbox).toHaveClass('border-transparent');
    });

    it('should render with status variants', () => {
      render(
        <div>
          <Checkbox status="error" data-testid="checkbox-error" />
          <Checkbox status="success" data-testid="checkbox-success" />
          <Checkbox status="warning" data-testid="checkbox-warning" />
        </div>
      );

      const errorCheckbox = screen.getByTestId('checkbox-error');
      const successCheckbox = screen.getByTestId('checkbox-success');
      const warningCheckbox = screen.getByTestId('checkbox-warning');
      
      expect(errorCheckbox).toHaveClass('border-destructive');
      expect(successCheckbox).toHaveClass('border-success');
      expect(warningCheckbox).toHaveClass('border-warning');
    });
  });

  describe('Interactive Behavior', () => {
    it('should handle checked state changes', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <Checkbox
          label="Test checkbox"
          onCheckedChange={handleChange}
          data-testid="checkbox"
        />
      );

      const checkbox = screen.getByTestId('checkbox');
      
      // Initially unchecked
      expect(checkbox).toHaveAttribute('aria-checked', 'false');
      
      // Click to check
      await user.click(checkbox);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('should handle controlled checked state', () => {
      const { rerender } = render(
        <Checkbox
          checked={false}
          label="Controlled checkbox"
          data-testid="checkbox"
        />
      );

      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveAttribute('aria-checked', 'false');

      rerender(
        <Checkbox
          checked={true}
          label="Controlled checkbox"
          data-testid="checkbox"
        />
      );

      expect(checkbox).toHaveAttribute('aria-checked', 'true');
    });

    it('should handle indeterminate state', () => {
      render(
        <Checkbox
          indeterminate={true}
          label="Indeterminate checkbox"
          data-testid="checkbox"
        />
      );

      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
    });

    it('should handle disabled state', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <Checkbox
          disabled
          label="Disabled checkbox"
          onCheckedChange={handleChange}
          data-testid="checkbox"
        />
      );

      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toBeDisabled();
      
      await user.click(checkbox);
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <Checkbox
          label="Keyboard test"
          onCheckedChange={handleChange}
          data-testid="checkbox"
        />
      );

      const checkbox = screen.getByTestId('checkbox');
      
      // Focus and activate with Space key
      checkbox.focus();
      await user.keyboard(' ');
      
      expect(handleChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Form Integration', () => {
    it('should display required indicator when required', () => {
      render(
        <Checkbox
          label="Required field"
          required
          data-testid="checkbox"
        />
      );

      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('should display helper text when provided', () => {
      render(
        <Checkbox
          label="Test checkbox"
          helperText="This is helper text"
          data-testid="checkbox"
        />
      );

      expect(screen.getByText('This is helper text')).toBeInTheDocument();
    });

    it('should display error message when in error state', () => {
      render(
        <Checkbox
          label="Test checkbox"
          error="This field is required"
          data-testid="checkbox"
        />
      );

      const errorMessage = screen.getByText('This field is required');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveAttribute('role', 'alert');
      expect(errorMessage).toHaveClass('text-destructive');
    });

    it('should link error message with aria-describedby', () => {
      render(
        <Checkbox
          label="Test checkbox"
          error="This field is required"
          data-testid="checkbox"
        />
      );

      const checkbox = screen.getByTestId('checkbox');
      const errorMessage = screen.getByText('This field is required');
      
      expect(checkbox).toHaveAttribute('aria-describedby', expect.stringContaining(errorMessage.id));
    });
  });

  describe('CheckboxGroup Component', () => {
    it('should render checkbox group with label', () => {
      render(
        <CheckboxGroup
          label="Select options"
          description="Choose one or more options"
          data-testid="checkbox-group"
        >
          <Checkbox label="Option 1" />
          <Checkbox label="Option 2" />
          <Checkbox label="Option 3" />
        </CheckboxGroup>
      );

      expect(screen.getByText('Select options')).toBeInTheDocument();
      expect(screen.getByText('Choose one or more options')).toBeInTheDocument();
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    it('should have proper group role and ARIA attributes', () => {
      render(
        <CheckboxGroup
          label="Test group"
          data-testid="checkbox-group"
        >
          <Checkbox label="Option 1" />
        </CheckboxGroup>
      );

      const group = screen.getByRole('group');
      expect(group).toBeInTheDocument();
    });

    it('should display group error message', () => {
      render(
        <CheckboxGroup
          label="Test group"
          error="Please select at least one option"
          data-testid="checkbox-group"
        >
          <Checkbox label="Option 1" />
        </CheckboxGroup>
      );

      const errorMessage = screen.getByText('Please select at least one option');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });
  });

  describe('useCheckboxGroup Hook', () => {
    const TestComponent = ({ 
      options = ['option1', 'option2', 'option3'], 
      ...hookOptions 
    }) => {
      const { value, toggle, errors, validate, getCheckboxProps } = useCheckboxGroup(hookOptions);
      
      return (
        <div>
          <div data-testid="selected-values">{JSON.stringify(value)}</div>
          <div data-testid="errors">{JSON.stringify(errors)}</div>
          <button onClick={validate} data-testid="validate-button">Validate</button>
          {options.map((option) => (
            <div key={option}>
              <Checkbox
                label={option}
                data-testid={`checkbox-${option}`}
                {...getCheckboxProps(option)}
              />
            </div>
          ))}
        </div>
      );
    };

    it('should handle default value', () => {
      render(<TestComponent defaultValue={['option1', 'option2']} />);
      
      const selectedValues = screen.getByTestId('selected-values');
      expect(selectedValues).toHaveTextContent('["option1","option2"]');
    });

    it('should toggle values correctly', async () => {
      const user = userEvent.setup();
      
      render(<TestComponent />);
      
      const checkbox1 = screen.getByTestId('checkbox-option1');
      const selectedValues = screen.getByTestId('selected-values');
      
      // Initially empty
      expect(selectedValues).toHaveTextContent('[]');
      
      // Toggle on
      await user.click(checkbox1);
      expect(selectedValues).toHaveTextContent('["option1"]');
      
      // Toggle off
      await user.click(checkbox1);
      expect(selectedValues).toHaveTextContent('[]');
    });

    it('should validate required selections', async () => {
      const user = userEvent.setup();
      
      render(<TestComponent required={true} />);
      
      const validateButton = screen.getByTestId('validate-button');
      const errors = screen.getByTestId('errors');
      
      // Validate without selection
      await user.click(validateButton);
      expect(errors).toHaveTextContent('["At least one option must be selected"]');
      
      // Select option and validate again
      const checkbox1 = screen.getByTestId('checkbox-option1');
      await user.click(checkbox1);
      await user.click(validateButton);
      expect(errors).toHaveTextContent('[]');
    });

    it('should validate minimum selection count', async () => {
      const user = userEvent.setup();
      
      render(<TestComponent minSelected={2} />);
      
      const validateButton = screen.getByTestId('validate-button');
      const errors = screen.getByTestId('errors');
      const checkbox1 = screen.getByTestId('checkbox-option1');
      const checkbox2 = screen.getByTestId('checkbox-option2');
      
      // Select one option
      await user.click(checkbox1);
      await user.click(validateButton);
      expect(errors).toHaveTextContent('["At least 2 options must be selected"]');
      
      // Select second option
      await user.click(checkbox2);
      await user.click(validateButton);
      expect(errors).toHaveTextContent('[]');
    });

    it('should validate maximum selection count', async () => {
      const user = userEvent.setup();
      
      render(<TestComponent maxSelected={2} />);
      
      const validateButton = screen.getByTestId('validate-button');
      const errors = screen.getByTestId('errors');
      const checkbox1 = screen.getByTestId('checkbox-option1');
      const checkbox2 = screen.getByTestId('checkbox-option2');
      const checkbox3 = screen.getByTestId('checkbox-option3');
      
      // Select three options
      await user.click(checkbox1);
      await user.click(checkbox2);
      await user.click(checkbox3);
      await user.click(validateButton);
      expect(errors).toHaveTextContent('["At most 2 options can be selected"]');
    });
  });

  describe('Accessibility Requirements', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <Checkbox
          label="Test checkbox"
          description="Test description"
          data-testid="checkbox"
        />
      );

      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveAttribute('role', 'checkbox');
      expect(checkbox).toHaveAttribute('aria-checked', 'false');
    });

    it('should have no accessibility violations for basic checkbox', async () => {
      const { container } = render(
        <Checkbox
          label="Accept terms"
          description="I agree to the terms and conditions"
        />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations for checkbox group', async () => {
      const { container } = render(
        <CheckboxGroup
          label="Select preferences"
          description="Choose your preferences"
        >
          <Checkbox label="Email notifications" />
          <Checkbox label="SMS notifications" />
          <Checkbox label="Push notifications" />
        </CheckboxGroup>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should support screen reader announcements', () => {
      render(
        <Checkbox
          label="Test checkbox"
          error="Please check this box"
          data-testid="checkbox"
        />
      );

      const errorMessage = screen.getByText('Please check this box');
      expect(errorMessage).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Enterprise B2B Requirements', () => {
    it('should render with enterprise-specific styling', () => {
      render(
        <Checkbox
          variant="outline"
          className="enterprise-checkbox"
          label="Enterprise checkbox"
          data-testid="checkbox"
        />
      );

      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveClass('enterprise-checkbox', 'border-2');
    });

    it('should support high-contrast theme', () => {
      render(
        <div className="high-contrast">
          <Checkbox
            status="error"
            label="High contrast checkbox"
            data-testid="checkbox"
          />
        </div>
      );

      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveClass('border-destructive');
    });

    it('should handle complex business data scenarios', () => {
      const permissions = [
        { id: 'read', label: 'Read Access', description: 'View data and reports' },
        { id: 'write', label: 'Write Access', description: 'Create and edit data' },
        { id: 'admin', label: 'Admin Access', description: 'Full system administration' },
      ];
      
      render(
        <CheckboxGroup
          label="User Permissions"
          description="Select the permissions for this user role"
        >
          {permissions.map((permission) => (
            <Checkbox
              key={permission.id}
              label={permission.label}
              description={permission.description}
              data-testid={`checkbox-${permission.id}`}
            />
          ))}
        </CheckboxGroup>
      );

      expect(screen.getByText('Read Access')).toBeInTheDocument();
      expect(screen.getByText('Write Access')).toBeInTheDocument();
      expect(screen.getByText('Admin Access')).toBeInTheDocument();
      expect(screen.getByText('View data and reports')).toBeInTheDocument();
    });

    it('should support dense layouts for data-heavy interfaces', () => {
      render(
        <CheckboxGroup label="Compact Options">
          {Array.from({ length: 10 }, (_, i) => (
            <Checkbox
              key={i}
              size="sm"
              label={`Option ${i + 1}`}
              data-testid={`checkbox-${i}`}
            />
          ))}
        </CheckboxGroup>
      );

      const firstCheckbox = screen.getByTestId('checkbox-0');
      expect(firstCheckbox).toHaveClass('h-3', 'w-3');
    });
  });

  describe('Performance and Edge Cases', () => {
    it('should handle empty state gracefully', () => {
      render(<CheckboxGroup label="Empty group" />);
      
      expect(screen.getByText('Empty group')).toBeInTheDocument();
    });

    it('should handle large numbers of checkboxes efficiently', () => {
      const options = Array.from({ length: 100 }, (_, i) => ({
        id: `option-${i}`,
        label: `Option ${i + 1}`,
      }));
      
      render(
        <CheckboxGroup label="Large group">
          {options.map((option) => (
            <Checkbox
              key={option.id}
              label={option.label}
              data-testid={`checkbox-${option.id}`}
            />
          ))}
        </CheckboxGroup>
      );

      expect(screen.getByTestId('checkbox-option-0')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-option-99')).toBeInTheDocument();
    });

    it('should maintain type safety with TypeScript', () => {
      // This test ensures TypeScript compilation succeeds with proper types
      const TestComponent = () => {
        const handleChange = (checked: boolean | 'indeterminate') => {
          expect(['boolean', 'string']).toContain(typeof checked);
        };

        return (
          <Checkbox
            label="Type safe checkbox"
            onCheckedChange={handleChange}
          />
        );
      };

      render(<TestComponent />);
      expect(screen.getByText('Type safe checkbox')).toBeInTheDocument();
    });

    it('should handle rapid state changes', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <Checkbox
          label="Rapid test"
          onCheckedChange={handleChange}
          data-testid="checkbox"
        />
      );

      const checkbox = screen.getByTestId('checkbox');
      
      // Rapid clicks
      await user.click(checkbox);
      await user.click(checkbox);
      await user.click(checkbox);
      
      expect(handleChange).toHaveBeenCalledTimes(3);
    });
  });
});