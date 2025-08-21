import { KawaiiTheme } from '@/types/kawaii'

export const kawaiiTheme: KawaiiTheme = {
  colors: {
    primary: {
      50: '#fef7f7',   // Lightest pink - backgrounds
      500: '#ef4444',  // Main pink - primary actions
      900: '#7f1d1d'   // Darkest pink - text on light backgrounds
    },
    secondary: {
      50: '#f0f9ff',   // Light sky blue - secondary backgrounds  
      500: '#0ea5e9',  // Main blue - secondary actions
      900: '#0c4a6e'   // Dark blue - high contrast text
    },
    accent: {
      50: '#f0fdf4',   // Light mint green - accent backgrounds
      500: '#10b981',  // Main mint green - accent actions
      900: '#064e3b'   // Dark green - high contrast text
    }
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem'
  },
  animations: {
    bounce: {
      duration: 300,
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    },
    fadeIn: {
      duration: 200,
      easing: 'ease-in-out'
    }
  }
}

// CSS class generation utilities
export const getButtonVariantClasses = (variant: 'primary' | 'secondary' | 'accent') => {
  const baseClasses = 'transition-all duration-300 font-medium rounded-lg focus:outline-none focus:ring-2'
  
  switch (variant) {
    case 'primary':
      return `${baseClasses} bg-pink-500 text-white hover:bg-pink-600 focus:ring-pink-300`
    case 'secondary':
      return `${baseClasses} bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-300`
    case 'accent':
      return `${baseClasses} bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-300`
  }
}

export const getButtonSizeClasses = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return 'px-3 py-1.5 text-sm'
    case 'md':
      return 'px-4 py-2 text-base'
    case 'lg':
      return 'px-6 py-3 text-lg'
  }
}

export const getButtonStateClasses = (disabled: boolean, loading: boolean) => {
  if (disabled || loading) {
    return 'opacity-50 cursor-not-allowed'
  }
  return 'cursor-pointer'
}

// Card styling utilities
export const getCardVariantClasses = (variant: 'primary' | 'secondary' | 'accent') => {
  const baseClasses = 'border-2 rounded-xl shadow-lg transition-all duration-300'
  
  switch (variant) {
    case 'primary':
      return `${baseClasses} bg-pink-50 border-pink-200 hover:shadow-pink-200/50`
    case 'secondary':
      return `${baseClasses} bg-sky-50 border-sky-200 hover:shadow-sky-200/50`
    case 'accent':
      return `${baseClasses} bg-emerald-50 border-emerald-200 hover:shadow-emerald-200/50`
  }
}

export const getCardSizeClasses = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return 'p-3 max-w-sm'
    case 'md':
      return 'p-4 max-w-md'
    case 'lg':
      return 'p-6 max-w-lg'
  }
}

export const getCardInteractionClasses = (hoverable: boolean, clickable: boolean) => {
  const classes = []
  
  if (hoverable) {
    classes.push('hover:scale-105 hover:-translate-y-1')
  }
  
  if (clickable) {
    classes.push('cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-300')
  }
  
  return classes.join(' ')
}