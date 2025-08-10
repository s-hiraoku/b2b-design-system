/**
 * Liquid Glass Components - Export barrel
 */

// Core components
export { LiquidGlassCard } from './LiquidGlassCard'
export type { LiquidGlassCardProps } from './LiquidGlassCard'

// Advanced components
export { LiquidGlassContainer } from './LiquidGlassContainer'
export type { LiquidGlassContainerProps } from './LiquidGlassContainer'

export { LiquidGlassNavigation } from './LiquidGlassNavigation'
export type { LiquidGlassNavigationProps, NavigationItem } from './LiquidGlassNavigation'

export { LiquidGlassModal } from './LiquidGlassModal'
export type { LiquidGlassModalProps } from './LiquidGlassModal'

// Particle system
export { default as ParticleSystem } from '@/components/particles/ParticleSystem'

// Contexts
export { SeasonalThemeProvider, useSeasonalTheme, useThemeConfig, useSeasonalContext } from '@/lib/contexts/SeasonalThemeContext'

// Theme utilities
export { 
  getCurrentSeason, 
  getCurrentTimeOfDay, 
  resolveThemeConfig,
  createParticleConfig,
  generateSeasonalCSSProperties,
  SEASONAL_THEMES
} from '@/lib/themes/seasonalThemes'

// Re-export types for convenience
export type {
  GlassVariant,
  SeasonalTheme,
  TimeOfDay,
  WeatherCondition,
  GlassEffectConfig,
  LiquidGlassProps,
  MousePosition,
  GlassStyles,
  PerformanceMetrics,
  GlassCSSProperties,
  SeasonalThemeConfig,
  SeasonalThemeContext,
  ParticleConfig,
  WeatherData,
} from '@/lib/types/glass'