import { clsx, type ClassValue } from 'clsx'

/**
 * Utility function to merge CSS class names
 * Combines clsx with custom logic for component styling
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/**
 * Clamp a number value within a specified range
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Check if a CSS property is supported by the browser
 */
export function isCSSPropertySupported(property: string, value?: string): boolean {
  if (typeof window === 'undefined' || !window.CSS || !window.CSS.supports) {
    return false
  }
  
  try {
    if (value) {
      return window.CSS.supports(property, value)
    }
    return window.CSS.supports(property)
  } catch {
    return false
  }
}

/**
 * Check if backdrop-filter is supported
 */
export function isBackdropFilterSupported(): boolean {
  return isCSSPropertySupported('backdrop-filter', 'blur(1px)')
}

/**
 * Convert a number to CSS pixel value
 */
export function px(value: number): string {
  return `${value}px`
}

/**
 * Generate CSS variables object from glass config
 */
export function generateCSSVariables(config: Record<string, any>): React.CSSProperties {
  const variables: React.CSSProperties = {}
  
  Object.entries(config).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      variables[`--glass-${key}` as keyof React.CSSProperties] = typeof value === 'number' && key !== 'saturation' && key !== 'brightness' && key !== 'opacity' && key !== 'borderOpacity' 
        ? px(value) 
        : String(value)
    }
  })
  
  return variables
}