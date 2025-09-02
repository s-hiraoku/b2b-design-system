import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// Enterprise-focused text variants using CVA
const textVariants = cva(
  // Base classes - optimized for enterprise readability
  'font-sans leading-relaxed contrast-more:font-medium',
  {
    variants: {
      variant: {
        default: '',
        enterprise: [
          'enterprise-text'
        ],
      },
      size: {
        small: 'text-small text-sm',
        medium: 'text-medium text-base',
        large: 'text-large text-lg',
        xlarge: 'text-xlarge text-xl',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      color: {
        default: 'text-gray-900',
        muted: 'text-muted text-gray-500',
        primary: 'text-primary text-blue-600',
        secondary: 'text-gray-700',
        success: 'text-green-600',
        warning: 'text-yellow-600',
        danger: 'text-red-600',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
      weight: 'normal',
      color: 'default',
    },
  }
);

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  /**
   * HTML element to render as
   */
  as?: 'p' | 'span' | 'div' | 'strong' | 'em';
  /**
   * Whether to truncate long text
   */
  truncate?: boolean;
  /**
   * Text content
   */
  children: React.ReactNode;
}

/**
 * Enterprise Text Component
 * 
 * A flexible text component with:
 * - WCAG 2.1 AA compliance
 * - Professional typography scale
 * - High contrast mode support
 * - Enterprise B2B styling
 * - Flexible HTML elements
 */
export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ as: Component = 'p', variant, size, weight, color, truncate, className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={`${textVariants({ variant, size, weight, color })} ${truncate ? 'truncate overflow-hidden whitespace-nowrap' : ''} ${className || ''}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';