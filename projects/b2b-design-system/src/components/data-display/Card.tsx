import React from 'react';
import { cn } from '../../lib/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'enterprise' | 'compact';
  size?: 'small' | 'medium' | 'large';
  clickable?: boolean;
  hoverable?: boolean;
  loading?: boolean;
  loadingText?: string;
  error?: boolean;
  errorMessage?: string;
  status?: 'success' | 'warning' | 'error' | 'info';
  as?: 'div' | 'article' | 'section';
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLElement, CardProps>(
  ({ 
    variant = 'default', 
    size = 'medium', 
    clickable = false,
    hoverable = false,
    loading = false,
    loadingText = 'Loading...',
    error = false,
    errorMessage,
    status,
    as: Element = 'div',
    className,
    children,
    onClick,
    ...props 
  }, ref) => {
    // Minimal implementation to pass tests
    const baseClasses = 'bg-white border border-gray-200 rounded-lg shadow-sm';
    
    const variantClasses = {
      default: 'bg-white',
      enterprise: 'enterprise-card bg-slate-50 border-slate-200',
      compact: 'compact-card p-3'
    };
    
    const sizeClasses = {
      small: 'p-3',
      medium: 'p-4',
      large: 'large-card p-6'
    };
    
    const statusClasses = status ? {
      success: 'success-card border-green-200 bg-green-50',
      warning: 'warning-card border-yellow-200 bg-yellow-50',
      error: 'error-card border-red-200 bg-red-50',
      info: 'info-card border-blue-200 bg-blue-50'
    }[status] : '';
    
    const interactiveClasses = cn(
      clickable && 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500',
      hoverable && 'hover-card transition-shadow hover:shadow-md'
    );
    
    const classes = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      statusClasses,
      interactiveClasses,
      className
    );
    
    const handleClick = (e: React.MouseEvent) => {
      if (clickable && onClick) {
        onClick(e as any);
      }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (clickable && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        if (onClick) {
          onClick(e as any);
        }
      }
    };
    
    if (loading) {
      return (
        <Element ref={ref as any} className={classes} {...props}>
          <div aria-live="polite">{loadingText}</div>
        </Element>
      );
    }
    
    if (error && errorMessage) {
      return (
        <Element ref={ref as any} className={classes} {...props}>
          <div role="alert">{errorMessage}</div>
        </Element>
      );
    }
    
    return (
      <Element
        ref={ref as any}
        className={classes}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </Element>
    );
  }
);

Card.displayName = 'Card';

// Card composition components
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('card-header mb-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('card-content', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('card-footer mt-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';