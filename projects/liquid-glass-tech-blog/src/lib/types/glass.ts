/**
 * Core types for Liquid Glass effect system
 */

export type GlassVariant = 'subtle' | 'medium' | 'intense' | 'dark'

export type SeasonalTheme = 'spring' | 'summer' | 'autumn' | 'winter'

export type TimeOfDay = 'morning' | 'day' | 'evening' | 'night'

export type WeatherCondition = 'clear' | 'cloudy' | 'rainy' | 'snowy' | 'foggy' | 'windy'

export interface GlassEffectConfig {
  /** Blur intensity in pixels (0-120) */
  blur: number
  /** Background opacity (0-1) */
  opacity: number
  /** Color saturation multiplier (0-3) */
  saturation: number
  /** Brightness multiplier (0-3) */
  brightness: number
  /** Border opacity (0-1) */
  borderOpacity: number
  /** Border radius in pixels */
  borderRadius: number
}

export interface LiquidGlassProps {
  /** Predefined glass variant */
  variant?: GlassVariant
  /** Custom glass effect configuration */
  effect?: Partial<GlassEffectConfig>
  /** Seasonal theme to apply */
  theme?: SeasonalTheme
  /** Enable interactive mouse effects */
  interactive?: boolean
  /** Enable animation effects */
  animated?: boolean
  /** Custom CSS class names */
  className?: string
  /** Component children */
  children: React.ReactNode
  /** Additional props */
  [key: string]: any
}

export interface MousePosition {
  x: number
  y: number
}

export interface GlassStyles {
  backgroundColor: string
  backdropFilter: string
  border: string
  borderRadius: string
  transition?: string
  transform?: string
  boxShadow?: string
}

export interface PerformanceMetrics {
  renderTime: number
  animationFrames: number
  gpuAccelerated: boolean
  backdropSupported: boolean
}

// Seasonal theme configuration with time-of-day and weather variations
export interface SeasonalThemeConfig {
  primary: string
  secondary: string
  accent: string
  particles?: {
    type: 'sakura' | 'droplets' | 'leaves' | 'snow'
    color: string
    count: number
    size: [number, number] // min, max
    speed: [number, number] // min, max
  }
  timeVariations?: {
    [K in TimeOfDay]?: Partial<Omit<SeasonalThemeConfig, 'timeVariations' | 'weatherVariations'>>
  }
  weatherVariations?: {
    [K in WeatherCondition]?: Partial<Omit<SeasonalThemeConfig, 'timeVariations' | 'weatherVariations'>>
  }
}

// Enhanced theme context for seasonal management
export interface SeasonalThemeContext {
  season: SeasonalTheme
  timeOfDay: TimeOfDay
  weather: WeatherCondition
  autoDetect: boolean
  transitions: boolean
  particlesEnabled: boolean
}

// Particle system configuration
export interface ParticleConfig {
  enabled: boolean
  type: 'sakura' | 'droplets' | 'leaves' | 'snow'
  count: number
  color: string
  size: [number, number]
  speed: [number, number]
  opacity: [number, number]
  gpuAccelerated: boolean
  animationDuration: number
}

// Weather API integration types
export interface WeatherData {
  condition: WeatherCondition
  temperature: number
  season: SeasonalTheme
  timeOfDay: TimeOfDay
  location?: {
    lat: number
    lon: number
  }
}

// CSS Custom Properties for dynamic theming
export interface GlassCSSProperties extends React.CSSProperties {
  '--glass-blur'?: string
  '--glass-opacity'?: string
  '--glass-saturation'?: string
  '--glass-brightness'?: string
  '--glass-border-opacity'?: string
  '--glass-theme-primary'?: string
  '--glass-theme-secondary'?: string
  '--glass-theme-accent'?: string
  '--glass-particle-color'?: string
  '--glass-particle-count'?: string
  '--glass-transition-duration'?: string
  '--glass-time-modifier'?: string
  '--glass-weather-intensity'?: string
}