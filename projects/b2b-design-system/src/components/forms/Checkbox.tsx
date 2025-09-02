import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '../../lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

const checkboxVariants = cva(
  'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
  {
    variants: {
      size: {
        sm: 'h-3 w-3',
        default: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
      variant: {
        default: 'border-primary',
        outline: 'border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground',
        filled: 'border-input bg-muted hover:bg-muted/80',
        ghost: 'border-transparent bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      status: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-success focus-visible:ring-success',
        warning: 'border-warning focus-visible:ring-warning',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
      status: 'default',
    },
  }
);

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  indeterminate?: boolean;
  'data-testid'?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ 
  className, 
  size, 
  variant, 
  status, 
  label, 
  description, 
  error, 
  helperText, 
  required, 
  indeterminate,
  'data-testid': dataTestId,
  ...props 
}, ref) => {
  const checkboxId = React.useId();
  const errorId = error ? `${checkboxId}-error` : undefined;
  const helperTextId = helperText ? `${checkboxId}-helper` : undefined;
  const descriptionId = description ? `${checkboxId}-description` : undefined;
  
  const computedStatus = error ? 'error' : status;

  const CheckboxComponent = (
    <CheckboxPrimitive.Root
      ref={ref}
      id={checkboxId}
      className={cn(checkboxVariants({ size, variant, status: computedStatus }), className)}
      aria-describedby={cn(
        errorId && errorId,
        helperTextId && helperTextId,
        descriptionId && descriptionId
      )}
      aria-labelledby={label ? `${checkboxId}-label` : undefined}
      data-testid={dataTestId}
      {...props}
      checked={indeterminate ? 'indeterminate' : props.checked}
    >
      <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
        {indeterminate ? (
          <Minus className={cn(
            size === 'sm' ? 'h-2 w-2' : 
            size === 'lg' ? 'h-3 w-3' : 'h-3 w-3'
          )} />
        ) : (
          <Check className={cn(
            size === 'sm' ? 'h-2 w-2' : 
            size === 'lg' ? 'h-3 w-3' : 'h-3 w-3'
          )} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  // If no label is provided, return just the checkbox
  if (!label) {
    return CheckboxComponent;
  }

  return (
    <div className="space-y-1">
      <div className="flex items-start space-x-2">
        {CheckboxComponent}
        <div className="grid gap-1.5 leading-none">
          <label
            id={`${checkboxId}-label`}
            htmlFor={checkboxId}
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              error && 'text-destructive'
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
          {description && (
            <p
              id={descriptionId}
              className="text-xs text-muted-foreground"
            >
              {description}
            </p>
          )}
        </div>
      </div>
      
      {helperText && !error && (
        <p 
          id={helperTextId}
          className="text-xs text-muted-foreground pl-6"
        >
          {helperText}
        </p>
      )}
      
      {error && (
        <p 
          id={errorId}
          className="text-xs text-destructive pl-6"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// Checkbox Group Component for managing multiple related checkboxes
interface CheckboxGroupProps {
  label?: string;
  description?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

const CheckboxGroup = React.forwardRef<
  HTMLDivElement,
  CheckboxGroupProps
>(({ 
  label, 
  description, 
  error, 
  helperText, 
  required, 
  children, 
  className,
  'data-testid': dataTestId,
  ...props 
}, ref) => {
  const groupId = React.useId();
  const errorId = error ? `${groupId}-error` : undefined;
  const helperTextId = helperText ? `${groupId}-helper` : undefined;
  const descriptionId = description ? `${groupId}-description` : undefined;

  return (
    <div 
      ref={ref}
      className={cn('space-y-2', className)}
      data-testid={dataTestId}
      {...props}
    >
      {label && (
        <div className="space-y-1">
          <label 
            className={cn(
              'text-sm font-medium leading-none',
              error && 'text-destructive'
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
          {description && (
            <p
              id={descriptionId}
              className="text-xs text-muted-foreground"
            >
              {description}
            </p>
          )}
        </div>
      )}
      
      <div 
        className="space-y-2"
        role="group"
        aria-describedby={cn(
          errorId && errorId,
          helperTextId && helperTextId,
          descriptionId && descriptionId
        )}
      >
        {children}
      </div>
      
      {helperText && !error && (
        <p 
          id={helperTextId}
          className="text-xs text-muted-foreground"
        >
          {helperText}
        </p>
      )}
      
      {error && (
        <p 
          id={errorId}
          className="text-xs text-destructive"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
});

CheckboxGroup.displayName = 'CheckboxGroup';

// Hook for managing checkbox groups with validation
interface UseCheckboxGroupOptions {
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  required?: boolean;
  minSelected?: number;
  maxSelected?: number;
}

export const useCheckboxGroup = ({
  defaultValue = [],
  value: controlledValue,
  onValueChange,
  required = false,
  minSelected = 0,
  maxSelected,
}: UseCheckboxGroupOptions = {}) => {
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue);
  const [errors, setErrors] = React.useState<string[]>([]);

  const value = controlledValue ?? internalValue;

  const setValue = React.useCallback((newValue: string[]) => {
    if (!controlledValue) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  }, [controlledValue, onValueChange]);

  const toggle = React.useCallback((itemValue: string) => {
    const newValue = value.includes(itemValue)
      ? value.filter(v => v !== itemValue)
      : [...value, itemValue];
    setValue(newValue);
  }, [value, setValue]);

  const validate = React.useCallback(() => {
    const newErrors: string[] = [];

    if (required && value.length === 0) {
      newErrors.push('At least one option must be selected');
    }

    if (minSelected && value.length < minSelected) {
      newErrors.push(`At least ${minSelected} option${minSelected > 1 ? 's' : ''} must be selected`);
    }

    if (maxSelected && value.length > maxSelected) {
      newErrors.push(`At most ${maxSelected} option${maxSelected > 1 ? 's' : ''} can be selected`);
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  }, [value, required, minSelected, maxSelected]);

  return {
    value,
    setValue,
    toggle,
    errors,
    validate,
    isValid: errors.length === 0,
    getCheckboxProps: (itemValue: string) => ({
      checked: value.includes(itemValue),
      onCheckedChange: () => toggle(itemValue),
    }),
  };
};

export { 
  Checkbox, 
  CheckboxGroup,
  type CheckboxProps,
  type CheckboxGroupProps,
};