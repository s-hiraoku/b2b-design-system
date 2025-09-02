import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// Enterprise-focused button variants using CVA for better maintainability
const buttonVariants = cva(
  // Base classes - optimized for enterprise accessibility and interaction
  [
    'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
    'active:scale-[0.98] hover:shadow-sm',
    // High contrast mode support
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
        enterprise: [
          'enterprise-button bg-slate-800 text-white border border-slate-800',
          'hover:bg-slate-700 hover:border-slate-700',
          'focus-visible:ring-slate-300'
        ],
      },
      size: {
        small: 'h-8 px-3 text-sm gap-1.5 min-w-[2rem]',
        medium: 'h-10 px-4 text-sm gap-2 min-w-[2.5rem]',
        large: 'btn-large h-12 px-6 text-base gap-2.5 min-w-[3rem]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
);

export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Loading state - shows loading indicator and disables interaction
   */
  loading?: boolean;
  /**
   * Button content
   */
  children: React.ReactNode;
}

/**
 * Enterprise Button Component
 * 
 * A highly accessible, enterprise-focused button component with:
 * - WCAG 2.1 AA compliance
 * - High contrast mode support  
 * - Keyboard navigation
 * - Loading states
 * - Enterprise theming
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, loading = false, disabled, className, children, ...props }, ref) => {
    const isDisabled = disabled || loading;
    
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isDisabled}
        aria-busy={loading ? 'true' : undefined}
        aria-disabled={isDisabled ? 'true' : undefined}
        {...props}
      >
        {loading && (
          <span 
            className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-1"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';