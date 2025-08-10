import React, { forwardRef } from 'react'
import { useLiquidGlass } from '@/lib/hooks/useLiquidGlass'
import { cn } from '@/lib/utils/classNames'
import type { LiquidGlassProps, PerformanceMetrics } from '@/lib/types/glass'

/**
 * LiquidGlassCard - Core glass morphism component with seasonal theming
 * 
 * Features:
 * - Multiple glass variants (subtle, medium, intense, dark)
 * - Seasonal theme support (spring, summer, autumn, winter)
 * - Interactive mouse effects with hardware acceleration
 * - Accessibility compliance (WCAG 2.1 AA)
 * - Performance monitoring and optimization
 * - Graceful fallback for unsupported browsers
 */
export interface LiquidGlassCardProps extends LiquidGlassProps {
  /** Callback for performance metrics reporting */
  onPerformanceMetrics?: (metrics: PerformanceMetrics) => void
  /** HTML element type (default: 'div') */
  as?: keyof JSX.IntrinsicElements
  /** Tab index for keyboard navigation */
  tabIndex?: number
  /** ARIA role for accessibility */
  role?: string
  /** ARIA label for screen readers */
  'aria-label'?: string
  /** Additional HTML attributes */
  [key: string]: any
}

export const LiquidGlassCard = forwardRef<HTMLElement, LiquidGlassCardProps>(
  (
    {
      variant = 'medium',
      effect,
      theme,
      interactive = false,
      animated = false,
      className = '',
      children,
      onPerformanceMetrics,
      as = 'div',
      tabIndex,
      role,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const {
      styles,
      classNames,
      eventHandlers,
      state: { reducedMotion, backdropSupported },
    } = useLiquidGlass({
      variant,
      effect,
      theme,
      interactive,
      animated,
      onPerformanceMetrics,
    })

    // Generate final CSS classes
    const finalClassNames = cn(
      classNames,
      className,
      // Variant-specific classes for CSS targeting
      `glass-variant-${variant}`,
      theme && `glass-theme-${theme}`,
      interactive && 'cursor-pointer',
      // Accessibility enhancements
      interactive && tabIndex !== undefined && 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
    )

    // Determine the HTML element to render
    const Element = as as any

    return (
      <Element
        ref={ref}
        className={finalClassNames}
        style={styles}
        {...eventHandlers}
        {...props}
        tabIndex={interactive ? tabIndex : undefined}
        role={role}
        aria-label={ariaLabel}
        // Add data attributes for testing and CSS targeting
        data-testid={props['data-testid']}
        data-glass-variant={variant}
        data-glass-theme={theme}
        data-glass-interactive={interactive}
        data-glass-animated={animated}
        data-backdrop-supported={backdropSupported}
        data-reduced-motion={reducedMotion}
      >
        {children}
      </Element>
    )
  }
)

LiquidGlassCard.displayName = 'LiquidGlassCard'

// Export type for external consumption
export type { LiquidGlassCardProps }