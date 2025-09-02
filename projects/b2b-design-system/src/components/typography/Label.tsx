import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Enterprise-focused label variants using CVA
const labelVariants = cva(
  // Base classes - optimized for form accessibility and B2B styling
  'font-medium text-gray-900 mb-2 block leading-normal',
  {
    variants: {
      variant: {
        default: '',
        enterprise: [
          'enterprise-label'
        ],
      },
      size: {
        small: 'text-sm',
        medium: 'text-sm',
        large: 'text-base',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      color: {
        default: 'text-gray-900',
        muted: 'text-gray-600',
        error: 'text-red-600',
        success: 'text-green-600',
        warning: 'text-yellow-600',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
      weight: 'medium',
      color: 'default',
    },
  }
);

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Whether the field is optional
   */
  optional?: boolean;
  /**
   * Label content
   */
  children: React.ReactNode;
}

/**
 * Enterprise Label Component
 * 
 * A form label component with:
 * - WCAG 2.1 AA compliance
 * - Proper form control association
 * - Required/optional indicators
 * - Enterprise B2B styling
 * - Professional typography
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ variant, size, weight, color, required, optional, className, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`${labelVariants({ variant, size, weight, color })} ${className || ''}`}
        aria-required={required ? 'true' : undefined}
        {...props}
      >
        {children}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
        {optional && (
          <span className="text-gray-500 ml-1 font-normal">
            (optional)
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';