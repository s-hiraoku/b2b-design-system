import React from 'react'
import { KawaiiCardProps } from '@/types/kawaii'
import { 
  getCardVariantClasses, 
  getCardSizeClasses, 
  getCardInteractionClasses 
} from '@/lib/kawaii-theme'

export const KawaiiCard: React.FC<KawaiiCardProps> = ({
  title,
  description,
  image,
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  hoverable = true,
  clickable = false,
  onClick,
  'data-testid': testId
}) => {
  // Generate semantic class names for testing
  const semanticClasses = [
    'kawaii-card',
    `kawaii-card-${variant}`,
    `kawaii-card-${size}`,
    hoverable && 'kawaii-card-hoverable',
    clickable && 'kawaii-card-clickable'
  ].filter(Boolean)

  // Generate actual styling classes using theme utilities
  const variantClasses = getCardVariantClasses(variant)
  const sizeClasses = getCardSizeClasses(size)
  const interactionClasses = getCardInteractionClasses(hoverable, clickable)

  // Combine all classes
  const allClasses = [
    ...semanticClasses,
    variantClasses,
    sizeClasses,
    interactionClasses,
    className
  ].filter(Boolean).join(' ')

  // Memoized event handlers for performance
  const handleClick = React.useCallback(() => {
    if (clickable && onClick) {
      onClick()
    }
  }, [clickable, onClick])

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    if (clickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      handleClick()
    }
  }, [clickable, handleClick])

  // Conditional accessibility properties
  const accessibilityProps = React.useMemo(() => {
    if (clickable) {
      return {
        role: 'button',
        tabIndex: 0,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        'aria-pressed': false
      }
    }
    return {}
  }, [clickable, handleClick, handleKeyDown])

  return (
    <div
      className={allClasses}
      data-testid={testId}
      {...accessibilityProps}
    >
      {image && (
        <div className="kawaii-card-image-container mb-4 overflow-hidden rounded-lg">
          <img
            src={image.src}
            alt={image.alt}
            loading={image.loading || 'lazy'}
            className="kawaii-card-image w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
      )}
      
      <div className="kawaii-card-body">
        {title && (
          <h3 className="kawaii-card-title text-lg font-semibold text-gray-800 mb-2">
            {title}
          </h3>
        )}
        
        {description && (
          <p className="kawaii-card-description text-gray-600 text-sm mb-3 leading-relaxed">
            {description}
          </p>
        )}
        
        {children && (
          <div className="kawaii-card-content">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}