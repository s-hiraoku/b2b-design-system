import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Enterprise-focused link variants using CVA
const linkVariants = cva(
  // Base classes - optimized for accessibility and B2B navigation
  'underline underline-offset-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
  {
    variants: {
      variant: {
        default: 'text-blue-600 hover:text-blue-700',
        primary: 'text-blue-600 hover:text-blue-700',
        secondary: 'text-gray-600 hover:text-gray-700',
        muted: 'text-gray-500 hover:text-gray-600',
        enterprise: [
          'enterprise-link text-slate-700 hover:text-slate-800'
        ],
      },
      size: {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  /**
   * Whether the link is disabled
   */
  disabled?: boolean;
  /**
   * Whether the link is loading
   */
  loading?: boolean;
  /**
   * Whether this is an external link
   */
  external?: boolean;
  /**
   * Link content
   */
  children: React.ReactNode;
}

/**
 * Enterprise Link Component
 * 
 * A navigation link component with:
 * - WCAG 2.1 AA compliance
 * - Proper focus management
 * - External link security
 * - Loading states
 * - Enterprise B2B styling
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant, size, disabled, loading, external, className, children, onClick, ...props }, ref) => {
    const isDisabled = disabled || loading;

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    const externalProps = external
      ? {
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {};

    return (
      <a
        ref={ref}
        className={`${linkVariants({ variant, size })} ${
          isDisabled ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''
        } ${className || ''}`}
        onClick={handleClick}
        aria-disabled={isDisabled ? 'true' : undefined}
        aria-busy={loading ? 'true' : undefined}
        {...externalProps}
        {...props}
      >
        {children}
        {external && (
          <span className="ml-1 inline-block" aria-label="opens in new tab">
            ↗
          </span>
        )}
      </a>
    );
  }
);

Link.displayName = 'Link';