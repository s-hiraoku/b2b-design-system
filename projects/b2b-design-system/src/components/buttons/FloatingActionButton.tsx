import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// Floating Action Button variants using CVA for circular design
const fabVariants = cva(
  [
    // Base classes - circular floating button with elevation
    'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
    'active:scale-95 hover:shadow-lg',
    'shadow-lg hover:shadow-xl', // Enhanced elevation for floating effect
    'z-50', // High z-index for proper layering
    // High contrast mode support
    '@media (prefers-contrast: high) border-2'
  ],
  {
    variants: {
      variant: {
        default: 'rounded-full', // Circular by default
        extended: 'fab-extended rounded-full px-4 gap-2', // Extended with text
      },
      size: {
        small: 'h-12 w-12 text-sm',
        medium: 'h-14 w-14 text-base',
        large: 'fab-large h-16 w-16 text-lg',
      },
      color: {
        primary: [
          'bg-blue-600 text-white',
          'hover:bg-blue-700',
          'focus-visible:ring-blue-300'
        ],
        secondary: [
          'bg-gray-600 text-white',
          'hover:bg-gray-700',
          'focus-visible:ring-gray-300'
        ],
        enterprise: [
          'enterprise-button bg-slate-800 text-white',
          'hover:bg-slate-700',
          'focus-visible:ring-slate-300'
        ],
      },
      position: {
        fixed: 'fixed',
        absolute: 'absolute',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
      color: 'primary',
      position: 'fixed',
    },
  }
);

export interface FloatingActionButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fabVariants> {
  /**
   * Loading state - shows loading indicator and disables interaction
   */
  loading?: boolean;
  /**
   * Icon and optional text content for extended variant
   */
  children: React.ReactNode;
  /**
   * Required aria-label for accessibility
   * FABs must have accessible labels for screen readers
   */
  'aria-label': string;
}

/**
 * FloatingActionButton (FAB) Component
 * 
 * A circular floating button for primary actions with:
 * - WCAG 2.1 AA compliance with required aria-label
 * - Circular design with proper icon centering
 * - Multiple sizes maintaining circular proportions
 * - Extended variant supporting icon + text layout
 * - Fixed and absolute positioning options
 * - High z-index for proper layering above content
 * - Enterprise B2B color schemes
 * - Enhanced elevation and hover effects
 */
export const FloatingActionButton = React.forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  ({ variant, size, color, position, loading = false, disabled, className, children, ...props }, ref) => {
    const isDisabled = disabled || loading;
    
    // Apply default positioning if not explicitly overridden
    const hasCustomPositioning = className && (
      className.includes('bottom-') || className.includes('top-') || 
      className.includes('left-') || className.includes('right-')
    );
    const defaultPositioning = hasCustomPositioning ? '' : 'bottom-6 right-6';
    
    return (
      <button
        ref={ref}
        className={cn(fabVariants({ variant, size, color, position }), defaultPositioning, className)}
        disabled={isDisabled}
        aria-busy={loading ? 'true' : undefined}
        aria-disabled={isDisabled ? 'true' : undefined}
        {...props}
      >
        {loading && (
          <span 
            className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full"
            aria-hidden="true"
          />
        )}
        {!loading && children}
      </button>
    );
  }
);

FloatingActionButton.displayName = 'FloatingActionButton';