import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import type { 
  GlassEffectConfig, 
  GlassVariant, 
  SeasonalTheme, 
  MousePosition, 
  GlassStyles,
  GlassCSSProperties,
  PerformanceMetrics 
} from '@/lib/types/glass'
import { clamp, isBackdropFilterSupported, generateCSSVariables } from '@/lib/utils/classNames'

// Glass variant configurations
const GLASS_VARIANTS: Record<GlassVariant, GlassEffectConfig> = {
  subtle: {
    blur: 8,
    opacity: 0.05,
    saturation: 1.5,
    brightness: 1.05,
    borderOpacity: 0.15,
    borderRadius: 16,
  },
  medium: {
    blur: 16,
    opacity: 0.1,
    saturation: 1.8,
    brightness: 1.1,
    borderOpacity: 0.2,
    borderRadius: 16,
  },
  intense: {
    blur: 24,
    opacity: 0.15,
    saturation: 2.0,
    brightness: 1.2,
    borderOpacity: 0.25,
    borderRadius: 16,
  },
  dark: {
    blur: 16,
    opacity: 0.1,
    saturation: 1.8,
    brightness: 0.9,
    borderOpacity: 0.15,
    borderRadius: 16,
  },
}

// Seasonal theme color configurations
const SEASONAL_THEMES: Record<SeasonalTheme, { primary: string; secondary: string; accent: string }> = {
  spring: {
    primary: 'rgba(52, 211, 153, 0.15)',
    secondary: 'rgba(167, 243, 208, 0.1)',
    accent: 'rgba(16, 185, 129, 0.2)',
  },
  summer: {
    primary: 'rgba(251, 191, 36, 0.15)',
    secondary: 'rgba(253, 230, 138, 0.1)',
    accent: 'rgba(245, 158, 11, 0.2)',
  },
  autumn: {
    primary: 'rgba(251, 146, 60, 0.15)',
    secondary: 'rgba(254, 215, 170, 0.1)',
    accent: 'rgba(234, 88, 12, 0.2)',
  },
  winter: {
    primary: 'rgba(147, 197, 253, 0.15)',
    secondary: 'rgba(219, 234, 254, 0.1)',
    accent: 'rgba(59, 130, 246, 0.2)',
  },
}

interface UseLiquidGlassOptions {
  variant?: GlassVariant
  effect?: Partial<GlassEffectConfig>
  theme?: SeasonalTheme
  interactive?: boolean
  animated?: boolean
  onPerformanceMetrics?: (metrics: PerformanceMetrics) => void
}

export function useLiquidGlass({
  variant = 'medium',
  effect,
  theme,
  interactive = false,
  animated = false,
  onPerformanceMetrics,
}: UseLiquidGlassOptions = {}) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [backdropSupported, setBackdropSupported] = useState(true)
  const startTimeRef = useRef<number>(performance.now())
  const animationFrameCountRef = useRef<number>(0)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler)
    } else {
      mediaQuery.addListener(handler) // Fallback for older browsers
    }
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler)
      } else {
        mediaQuery.removeListener(handler) // Fallback for older browsers
      }
    }
  }, [])

  // Check for backdrop-filter support
  useEffect(() => {
    setBackdropSupported(isBackdropFilterSupported())
  }, [])

  // Report performance metrics
  useEffect(() => {
    if (onPerformanceMetrics) {
      const renderTime = performance.now() - startTimeRef.current
      onPerformanceMetrics({
        renderTime,
        animationFrames: animationFrameCountRef.current,
        gpuAccelerated: true, // Always true for transform3d
        backdropSupported,
      })
    }
  }, [backdropSupported, onPerformanceMetrics])

  // Mouse event handlers
  const handleMouseEnter = useCallback(() => {
    if (interactive) {
      setIsHovered(true)
    }
  }, [interactive])

  const handleMouseLeave = useCallback(() => {
    if (interactive) {
      setIsHovered(false)
      setMousePosition({ x: 0, y: 0 })
    }
  }, [interactive])

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (interactive && !reducedMotion) {
        const rect = event.currentTarget.getBoundingClientRect()
        // Avoid division by zero and provide sane defaults
        const width = rect.width || 100
        const height = rect.height || 100
        const centerX = rect.left + width / 2
        const centerY = rect.top + height / 2
        
        const x = ((event.clientX - centerX) / width) * 100
        const y = ((event.clientY - centerY) / height) * 100
        
        // Clamp values to prevent extreme transforms
        setMousePosition({ 
          x: clamp(x, -50, 50), 
          y: clamp(y, -50, 50) 
        })
        animationFrameCountRef.current++
      }
    },
    [interactive, reducedMotion]
  )

  // Generate final glass configuration
  const glassConfig = useMemo(() => {
    const baseConfig = GLASS_VARIANTS[variant]
    const mergedConfig = { ...baseConfig, ...effect }
    
    // Clamp values to valid ranges
    return {
      blur: clamp(mergedConfig.blur, 0, 120),
      opacity: clamp(mergedConfig.opacity, 0, 1),
      saturation: clamp(mergedConfig.saturation, 0, 3),
      brightness: clamp(mergedConfig.brightness, 0, 3),
      borderOpacity: clamp(mergedConfig.borderOpacity, 0, 1),
      borderRadius: clamp(mergedConfig.borderRadius, 0, 50),
    }
  }, [variant, effect])

  // Generate CSS styles
  const styles = useMemo((): GlassCSSProperties => {
    const baseStyles: GlassCSSProperties = {
      ...generateCSSVariables(glassConfig),
      backgroundColor: backdropSupported
        ? `rgba(255, 255, 255, ${glassConfig.opacity})`
        : `rgba(255, 255, 255, 0.9)`,
      border: `1px solid rgba(255, 255, 255, ${glassConfig.borderOpacity})`,
      borderRadius: `${glassConfig.borderRadius}px`,
    }

    // Add backdrop-filter only if supported
    if (backdropSupported) {
      const backdropValue = `blur(${glassConfig.blur}px) saturate(${glassConfig.saturation}) brightness(${glassConfig.brightness})`
      // Use camelCase version for React compatibility
      baseStyles.backdropFilter = backdropValue
      // Also add as webkit prefixed version for broader support
      ;(baseStyles as any).WebkitBackdropFilter = backdropValue
    }

    // Add theme colors if specified
    if (theme) {
      const themeColors = SEASONAL_THEMES[theme]
      baseStyles['--glass-theme-primary'] = themeColors.primary
      baseStyles['--glass-theme-secondary'] = themeColors.secondary
      baseStyles['--glass-theme-accent'] = themeColors.accent
    }

    // Add interactive transform
    if (interactive && !reducedMotion) {
      baseStyles.transform = `translate3d(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px, 0)`
      baseStyles.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }

    return baseStyles
  }, [glassConfig, theme, interactive, mousePosition, reducedMotion, backdropSupported])

  // Generate CSS classes
  const classNames = useMemo(() => {
    const classes = ['liquid-glass-card']
    
    if (interactive) classes.push('glass-interactive')
    if (animated && !reducedMotion) classes.push('glass-animated')
    if (reducedMotion) classes.push('motion-reduced')
    if (backdropSupported) classes.push('backdrop-supported')
    else classes.push('backdrop-fallback')
    
    return classes.join(' ')
  }, [interactive, animated, reducedMotion, backdropSupported])

  return {
    styles,
    classNames,
    eventHandlers: interactive
      ? {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          onMouseMove: handleMouseMove,
        }
      : {},
    state: {
      mousePosition,
      isHovered,
      reducedMotion,
      backdropSupported,
    },
  }
}