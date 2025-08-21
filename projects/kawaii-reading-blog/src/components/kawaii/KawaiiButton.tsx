import React from 'react'
import { KawaiiButtonProps } from '@/types/kawaii'
import { 
  getButtonVariantClasses, 
  getButtonSizeClasses, 
  getButtonStateClasses 
} from '@/lib/kawaii-theme'

export const KawaiiButton: React.FC<KawaiiButtonProps> = ({
  variant,
  size = 'md',
  children,
  className = '',
  disabled = false,
  loading = false,
  onClick,
  hoverEffect = true,
  animationDelay = 0,
  'data-testid': testId
}) => {
  // Generate semantic class names for testing while using theme utilities for styling
  const semanticClasses = [
    `kawaii-btn-${variant}`,
    `kawaii-btn-${size}`,
    disabled && 'kawaii-btn-disabled',
    loading && 'kawaii-btn-loading',
    hoverEffect && 'kawaii-btn-hoverable'
  ].filter(Boolean)

  // Generate actual styling classes
  const variantClasses = getButtonVariantClasses(variant)
  const sizeClasses = getButtonSizeClasses(size)
  const stateClasses = getButtonStateClasses(disabled, loading)
  
  // Hover effect classes
  const hoverClasses = hoverEffect 
    ? 'transform hover:scale-105 hover:-translate-y-0.5 active:scale-95' 
    : ''

  // Animation delay style
  const animationStyle = animationDelay > 0 
    ? { animationDelay: `${animationDelay}ms` }
    : undefined

  // Combine all classes
  const allClasses = [
    ...semanticClasses,
    variantClasses,
    sizeClasses,
    stateClasses,
    hoverClasses,
    className
  ].filter(Boolean).join(' ')

  // Handle click events with proper type safety
  const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      event.preventDefault()
      return
    }
    onClick?.(event)
  }, [disabled, loading, onClick])

  // Determine accessibility attributes
  const accessibilityProps = {
    'aria-disabled': disabled || loading,
    tabIndex: (disabled || loading) ? -1 : 0,
    role: 'button'
  }

  return (
    <button
      type="button"
      className={allClasses}
      style={animationStyle}
      disabled={disabled || loading}
      onClick={handleClick}
      data-testid={testId}
      {...accessibilityProps}
    >
      {loading && (
        <span 
          className="inline-block w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  )
}