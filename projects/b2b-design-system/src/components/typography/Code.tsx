import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Enterprise-focused code variants using CVA
const codeVariants = cva(
  // Base classes - optimized for code readability and B2B documentation
  'font-mono bg-gray-100 text-gray-900 rounded border',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-900',
        enterprise: [
          'enterprise-code bg-slate-100 text-slate-900'
        ],
      },
      size: {
        small: 'text-xs px-1.5 py-0.5',
        medium: 'text-sm px-2 py-1',
        large: 'text-base px-2.5 py-1.5',
      },
      color: {
        default: 'text-gray-900',
        muted: 'text-gray-600',
        primary: 'text-blue-700',
        success: 'text-green-700',
        warning: 'text-yellow-700',
        error: 'text-red-600',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
      color: 'default',
    },
  }
);

const blockCodeVariants = cva(
  // Block code specific classes
  'font-mono bg-gray-50 text-gray-900 p-4 rounded-lg border overflow-x-auto',
  {
    variants: {
      variant: {
        default: 'bg-gray-50 text-gray-900',
        enterprise: [
          'enterprise-code bg-slate-50 text-slate-900'
        ],
      },
      size: {
        small: 'text-xs p-3',
        medium: 'text-sm p-4',
        large: 'text-base p-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
);

export interface CodeProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof codeVariants> {
  /**
   * Whether to render as block code (pre > code)
   */
  block?: boolean;
  /**
   * Programming language for syntax highlighting
   */
  language?: string;
  /**
   * Whether to show copy button
   */
  copyable?: boolean;
  /**
   * Whether to show line numbers (block code only)
   */
  lineNumbers?: boolean;
  /**
   * Lines to highlight (block code only)
   */
  highlightLines?: number[];
  /**
   * Code content
   */
  children: React.ReactNode;
}

/**
 * Enterprise Code Component
 * 
 * A code display component with:
 * - WCAG 2.1 AA compliance
 * - Inline and block code support
 * - Copy functionality
 * - Language-specific styling
 * - Line numbers and highlighting
 * - Enterprise B2B styling
 */
export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ 
    variant, 
    size, 
    color, 
    block, 
    language, 
    copyable, 
    lineNumbers, 
    highlightLines,
    className, 
    children, 
    ...props 
  }, ref) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(String(children));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

    const codeElement = (
      <code
        ref={ref as React.RefObject<HTMLElement>}
        className={`${block ? 'block' : codeVariants({ variant, size, color })} ${
          language ? `language-${language}` : ''
        } ${className || ''}`}
        data-language={language}
        data-highlight-lines={highlightLines?.join(',')}
        {...props}
      >
        {children}
      </code>
    );

    if (block) {
      return (
        <div className="relative">
          <pre
            className={`${blockCodeVariants({ variant, size })} ${className || ''}`}
            role="region"
            aria-label="Code block"
            {...(lineNumbers && { 'data-line-numbers': true })}
          >
            {codeElement}
          </pre>
          {copyable && (
            <button
              type="button"
              onClick={handleCopy}
              className="absolute top-2 right-2 px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Copy code"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      );
    }

    return (
      <span className="relative inline-block">
        {codeElement}
        {copyable && (
          <button
            type="button"
            onClick={handleCopy}
            className="ml-1 px-1 py-0.5 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Copy code"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </span>
    );
  }
);

Code.displayName = 'Code';