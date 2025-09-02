import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// Icon button variants using CVA - extends base button functionality for icon-only use
const iconButtonVariants = cva(
  [
    // Base classes - inherits from Button but optimized for icon-only interaction
    'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
    'active:scale-[0.98] hover:shadow-sm',
    // Icon-specific enhancements
    'aspect-square', // Essential for professional icon button appearance
    'shrink-0', // Prevent icon distortion in flex layouts
    // High contrast mode support for accessibility
    '@media (prefers-contrast: high) border-2'
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-white border border-gray-300 text-gray-900',
          'hover:bg-gray-50 hover:border-gray-400',
          'focus-visible:ring-blue-500'
        ],
        primary: [
          'btn-primary bg-blue-600 text-white border border-blue-600',
          'hover:bg-blue-700 hover:border-blue-700',
          'focus-visible:ring-blue-300'
        ],
        secondary: [
          'bg-gray-100 text-gray-900 border border-gray-200',
          'hover:bg-gray-200 hover:border-gray-300',
          'focus-visible:ring-gray-300'
        ],
        outline: [
          'bg-transparent border border-gray-300 text-gray-900',
          'hover:bg-gray-50 hover:border-gray-400',
          'focus-visible:ring-blue-500'
        ],
        ghost: [
          'bg-transparent border-transparent text-gray-900',
          'hover:bg-gray-100',
          'focus-visible:ring-blue-500'
        ],
        enterprise: [
          'enterprise-button bg-slate-800 text-white border border-slate-800',
          'hover:bg-slate-700 hover:border-slate-700',
          'focus-visible:ring-slate-300'
        ],
      },
      size: {
        small: 'icon-button-small h-8 w-8 text-sm',
        medium: 'h-10 w-10 text-sm',
        large: 'icon-button-large h-12 w-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
);

export interface IconButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  /**
   * Loading state - shows loading indicator and disables interaction
   */
  loading?: boolean;
  /**
   * Icon content - should be an SVG or icon component
   */
  children: React.ReactNode;
  /**
   * Required aria-label for accessibility
   * Icon buttons must have accessible labels for screen readers
   */
  'aria-label': string;
}

/**
 * IconButton Component
 * 
 * A square icon-only button component with:
 * - WCAG 2.1 AA compliance with required aria-label
 * - Multiple sizes maintaining square aspect ratio
 * - All button variants (primary, secondary, outline, ghost, enterprise)
 * - Professional B2B appearance
 * - Tooltip integration support via aria-describedby
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant, size, loading = false, disabled, className, children, ...props }, ref) => {
    const isDisabled = disabled || loading;
    
    return (
      <button
        ref={ref}
        className={cn(iconButtonVariants({ variant, size }), className)}
        disabled={isDisabled}
        aria-busy={loading ? 'true' : undefined}
        aria-disabled={isDisabled ? 'true' : undefined}
        {...props}
      >
        {loading && (
          <span 
            className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"
            aria-hidden="true"
          />
        )}
        {!loading && children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';