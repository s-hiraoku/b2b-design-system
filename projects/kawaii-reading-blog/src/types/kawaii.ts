// Kawaii Design System Types
export type KawaiiVariant = 'primary' | 'secondary' | 'accent'
export type KawaiiSize = 'sm' | 'md' | 'lg'

export interface KawaiiAnimationConfig {
  duration: number
  delay?: number
  easing?: string
}

export interface KawaiiButtonProps {
  variant: KawaiiVariant
  size?: KawaiiSize
  children: React.ReactNode
  className?: string
  disabled?: boolean
  loading?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  'data-testid'?: string
  hoverEffect?: boolean
  animationDelay?: number
}

export interface KawaiiCardProps {
  title?: string
  description?: string
  image?: {
    src: string
    alt: string
    loading?: 'lazy' | 'eager'
  }
  children?: React.ReactNode
  className?: string
  variant?: KawaiiVariant
  size?: KawaiiSize
  hoverable?: boolean
  clickable?: boolean
  onClick?: () => void
  'data-testid'?: string
}

export interface KawaiiTheme {
  colors: {
    primary: {
      50: string
      500: string
      900: string
    }
    secondary: {
      50: string
      500: string
      900: string
    }
    accent: {
      50: string
      500: string
      900: string
    }
  }
  spacing: {
    sm: string
    md: string
    lg: string
  }
  animations: {
    bounce: KawaiiAnimationConfig
    fadeIn: KawaiiAnimationConfig
  }
}