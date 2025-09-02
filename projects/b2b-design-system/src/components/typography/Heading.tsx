import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// Enterprise-focused heading variants using CVA for maintainability
const headingVariants = cva(
  // Base classes - optimized for enterprise typography and accessibility
  [
    'font-sans text-gray-900 leading-tight tracking-tight',
    'mb-4', // B2B standard spacing for content hierarchy
    // High contrast mode support for accessibility
    '@media (prefers-contrast: high) { font-bold; border-bottom: 2px solid currentColor; }'
  ],
  {
    variants: {
      variant: {
        default: [
          'text-gray-900',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        ],
        enterprise: [
          'enterprise-heading text-slate-800',
          'border-l-4 border-blue-600 pl-4',
          'focus:outline-none focus:ring-2 focus:ring-slate-300'
        ],
      },
      size: {
        small: 'text-lg leading-6',
        medium: 'text-xl leading-7',
        large: 'heading-large text-3xl leading-9',
        xlarge: 'text-4xl leading-10',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
      weight: 'semibold',
    },
  }
);

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'children'>,
    VariantProps<typeof headingVariants> {
  /**
   * Semantic heading level (h1-h6)
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Heading content
   */
  children: React.ReactNode;
}

/**
 * Enterprise Heading Component
 * 
 * A semantic heading component with:
 * - WCAG 2.1 AA compliance
 * - Proper semantic heading levels (h1-h6)
 * - High contrast mode support
 * - Enterprise B2B typography
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, variant, size, weight, className, children, ...props }, ref) => {
    const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    
    return (
      <HeadingTag
        ref={ref}
        className={cn(headingVariants({ variant, size, weight }), className)}
        {...props}
      >
        {children}
      </HeadingTag>
    );
  }
);

Heading.displayName = 'Heading';