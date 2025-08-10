'use client'

/**
 * LiquidGlassContainer - Advanced container with seasonal theming and particle effects
 * Supports complex layouts with integrated particle systems
 */

import React, { forwardRef, useMemo } from 'react'
import { useLiquidGlass } from '@/lib/hooks/useLiquidGlass'
import { useSeasonalTheme } from '@/lib/contexts/SeasonalThemeContext'
import { createParticleConfig, generateSeasonalCSSProperties } from '@/lib/themes/seasonalThemes'
import { ParticleSystem } from '@/components/particles/ParticleSystem'
import { cn } from '@/lib/utils/classNames'
import type { LiquidGlassProps, PerformanceMetrics } from '@/lib/types/glass'

export interface LiquidGlassContainerProps extends LiquidGlassProps {
  /** Enable particle effects overlay */
  enableParticles?: boolean
  /** Particle intensity multiplier (0-2) */
  particleIntensity?: number
  /** Container layout type */
  layout?: 'flex' | 'grid' | 'block'
  /** Container alignment */
  align?: 'start' | 'center' | 'end' | 'stretch'
  /** Container justify content */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  /** Container gap between children */
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  /** Container padding */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  /** Performance metrics callback */
  onPerformanceMetrics?: (metrics: PerformanceMetrics) => void
  /** Minimum height */
  minHeight?: string | number
  /** Maximum height */
  maxHeight?: string | number
  /** Enable backdrop blur isolation */
  isolateBackdrop?: boolean
}

const GAP_CLASSES = {
  none: '',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8'
}

const PADDING_CLASSES = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-12'
}

const ALIGN_CLASSES = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch'
}

const JUSTIFY_CLASSES = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly'
}

export const LiquidGlassContainer = forwardRef<HTMLElement, LiquidGlassContainerProps>(
  (
    {
      variant = 'medium',
      effect,
      theme,
      interactive = false,
      animated = false,
      enableParticles = true,
      particleIntensity = 1.0,
      layout = 'flex',
      align = 'start',
      justify = 'start',
      gap = 'md',
      padding = 'md',
      className = '',
      children,
      onPerformanceMetrics,
      as = 'div',
      minHeight,
      maxHeight,
      isolateBackdrop = false,
      ...props
    },
    ref
  ) => {
    // Get seasonal theme context
    const { themeConfig, context } = useSeasonalTheme()
    
    // Use seasonal theme if no explicit theme provided
    const effectiveTheme = theme || context.season

    // Generate particle configuration
    const particleConfig = useMemo(() => {
      const config = createParticleConfig(themeConfig, {
        enabled: enableParticles && context.particlesEnabled,
        gpuAccelerated: true,
        reducedMotion: false // Will be handled by useLiquidGlass
      })
      
      // Apply intensity multiplier
      if (config.enabled) {
        config.count = Math.round(config.count * particleIntensity)
        config.speed = [
          config.speed[0] * particleIntensity,
          config.speed[1] * particleIntensity
        ]
      }
      
      return config
    }, [themeConfig, enableParticles, context.particlesEnabled, particleIntensity])

    // Apply seasonal theme modifications to effect
    const seasonalEffect = useMemo(() => {
      if (effect) return effect

      // Generate subtle effect modifications based on season
      const baseEffect = {}
      
      // Seasonal adjustments
      switch (context.season) {
        case 'spring':
          return { ...baseEffect, saturation: 1.9, brightness: 1.15 }
        case 'summer':
          return { ...baseEffect, saturation: 2.1, brightness: 1.2 }
        case 'autumn':
          return { ...baseEffect, saturation: 1.7, brightness: 1.05 }
        case 'winter':
          return { ...baseEffect, saturation: 1.6, brightness: 1.1 }
        default:
          return baseEffect
      }
    }, [effect, context.season])

    const {
      styles,
      classNames,
      eventHandlers,
      state: { reducedMotion, backdropSupported },
    } = useLiquidGlass({
      variant,
      effect: seasonalEffect,
      theme: effectiveTheme,
      interactive,
      animated,
      onPerformanceMetrics,
    })

    // Generate seasonal CSS properties
    const seasonalCSSProperties = useMemo(() => 
      generateSeasonalCSSProperties(themeConfig, particleConfig),
    [themeConfig, particleConfig])

    // Merge all styles
    const finalStyles = useMemo(() => ({
      ...styles,
      ...seasonalCSSProperties,
      ...(minHeight && { minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }),
      ...(maxHeight && { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }),
      ...(isolateBackdrop && backdropSupported && {
        isolation: 'isolate',
        transform: 'translateZ(0)' // Force layer creation
      })
    }), [styles, seasonalCSSProperties, minHeight, maxHeight, isolateBackdrop, backdropSupported])

    // Generate layout classes
    const layoutClasses = useMemo(() => {
      const classes = []
      
      if (layout === 'flex') {
        classes.push('flex', ALIGN_CLASSES[align], JUSTIFY_CLASSES[justify])
      } else if (layout === 'grid') {
        classes.push('grid')
      } else {
        classes.push('block')
      }
      
      classes.push(GAP_CLASSES[gap], PADDING_CLASSES[padding])
      
      return classes.join(' ')
    }, [layout, align, justify, gap, padding])

    // Generate final CSS classes
    const finalClassNames = cn(
      classNames,
      layoutClasses,
      className,
      'liquid-glass-container',
      `glass-theme-${effectiveTheme}`,
      `glass-layout-${layout}`,
      context.transitions && 'transition-all duration-500 ease-in-out',
      isolateBackdrop && 'isolate',
      'relative overflow-hidden'
    )

    // Determine the HTML element to render
    const Element = as as any

    return (
      <Element
        ref={ref}
        className={finalClassNames}
        style={finalStyles}
        {...eventHandlers}
        {...props}
        // Enhanced data attributes for testing and CSS targeting
        data-testid={props['data-testid']}
        data-glass-variant={variant}
        data-glass-theme={effectiveTheme}
        data-glass-season={context.season}
        data-glass-time={context.timeOfDay}
        data-glass-weather={context.weather}
        data-glass-interactive={interactive}
        data-glass-animated={animated}
        data-glass-particles={particleConfig.enabled}
        data-backdrop-supported={backdropSupported}
        data-reduced-motion={reducedMotion}
        data-layout={layout}
      >
        {/* Particle system overlay */}
        {particleConfig.enabled && !reducedMotion && (
          <ParticleSystem
            config={particleConfig}
            className="particle-overlay"
          />
        )}
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </Element>
    )
  }
)

LiquidGlassContainer.displayName = 'LiquidGlassContainer'

export type { LiquidGlassContainerProps }