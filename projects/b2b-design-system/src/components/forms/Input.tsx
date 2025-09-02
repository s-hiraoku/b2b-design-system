import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// Enterprise-focused input variants using CVA
const inputVariants = cva(
  // Base classes - optimized for enterprise accessibility and usability
  [
    'flex w-full rounded-md border bg-white px-3 py-2 text-sm',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
    'transition-all duration-200',
    // High contrast mode support
    '@media (prefers-contrast: high) border-2'
  ],
  {
    variants: {
      variant: {
        default: [
          'border-gray-300 text-gray-900',
          'focus-visible:ring-blue-500 focus-visible:border-blue-500',
          'hover:border-gray-400'
        ],
        error: [
          'input-error border-red-500 text-gray-900',
          'focus-visible:ring-red-500 focus-visible:border-red-500',
          'hover:border-red-600'
        ],
        enterprise: [
          'enterprise-input border-slate-400 text-gray-900',
          'focus-visible:ring-slate-500 focus-visible:border-slate-500',
          'hover:border-slate-500'
        ],
      },
      size: {
        small: 'h-8 px-2 text-xs',
        medium: 'h-10 px-3 text-sm',
        large: 'input-large h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  /**
   * Error message to display below the input
   */
  error?: string;
  /**
   * Suggestions for autocomplete (enterprise feature)
   */
  suggestions?: string[];
}

// Generate unique ID for accessibility
let inputIdCounter = 0;
const generateInputId = () => `input-${++inputIdCounter}`;

/**
 * Enterprise Input Component
 * 
 * A highly accessible, enterprise-focused input component with:
 * - WCAG 2.1 AA compliance
 * - Error handling with proper ARIA attributes
 * - Helper text support
 * - High contrast mode support
 * - Enterprise theming
 * - Future autocomplete/suggestions support
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant, size, helperText, error, suggestions, className, id, ...props }, ref) => {
    // Use provided ID or generate a unique one
    const inputId = id || React.useMemo(() => generateInputId(), []);
    const helperTextId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    
    // Determine effective variant (error overrides others)
    const effectiveVariant = error ? 'error' : variant;
    
    // Build aria-describedby
    const describedByIds = React.useMemo(() => {
      const ids: string[] = [];
      if (helperText) ids.push(helperTextId);
      if (error) ids.push(errorId);
      return ids;
    }, [helperText, error, helperTextId, errorId]);
    
    const ariaDescribedBy = describedByIds.length > 0 ? describedByIds.join(' ') : undefined;
    
    return (
      <div className="w-full">
        <input
          ref={ref}
          id={inputId}
          className={cn(inputVariants({ variant: effectiveVariant, size }), className)}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={ariaDescribedBy}
          {...props}
        />
        
        {helperText && !error && (
          <p id={helperTextId} className="mt-2 text-xs text-gray-600">
            {helperText}
          </p>
        )}
        
        {error && (
          <p id={errorId} role="alert" className="mt-2 text-xs font-medium text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';