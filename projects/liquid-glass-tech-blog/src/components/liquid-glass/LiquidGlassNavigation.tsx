'use client'

/**
 * LiquidGlassNavigation - Responsive navigation with liquid glass effects
 * Optimized for accessibility and interactive states
 */

import React, { useState, useCallback } from 'react'
import { LiquidGlassContainer } from './LiquidGlassContainer'
import { useSeasonalTheme } from '@/lib/contexts/SeasonalThemeContext'
import { cn } from '@/lib/utils/classNames'
import type { LiquidGlassProps } from '@/lib/types/glass'

export interface NavigationItem {
  id: string
  label: string
  href: string
  icon?: React.ReactNode
  active?: boolean
  disabled?: boolean
}

export interface LiquidGlassNavigationProps extends Omit<LiquidGlassProps, 'children'> {
  /** Navigation items */
  items: NavigationItem[]
  /** Navigation orientation */
  orientation?: 'horizontal' | 'vertical'
  /** Logo or brand element */
  logo?: React.ReactNode
  /** Additional actions (e.g., theme toggle, search) */
  actions?: React.ReactNode
  /** Mobile menu trigger */
  mobileMenuTrigger?: React.ReactNode
  /** Show mobile menu */
  showMobileMenu?: boolean
  /** Mobile menu toggle handler */
  onMobileMenuToggle?: (show: boolean) => void
  /** Navigation item click handler */
  onItemClick?: (item: NavigationItem) => void
  /** Enable sticky positioning */
  sticky?: boolean
  /** Navigation size */
  size?: 'sm' | 'md' | 'lg'
  /** Compact mode (reduced padding) */
  compact?: boolean
}

const SIZE_CLASSES = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-3 px-6 text-base',
  lg: 'py-4 px-8 text-lg'
}

const ITEM_SIZE_CLASSES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
}

export const LiquidGlassNavigation: React.FC<LiquidGlassNavigationProps> = ({
  items,
  orientation = 'horizontal',
  logo,
  actions,
  mobileMenuTrigger,
  showMobileMenu = false,
  onMobileMenuToggle,
  onItemClick,
  sticky = false,
  size = 'md',
  compact = false,
  variant = 'subtle',
  className = '',
  ...glassProps
}) => {
  const { context } = useSeasonalTheme()
  const [focusedItemId, setFocusedItemId] = useState<string | null>(null)

  // Handle item click
  const handleItemClick = useCallback((item: NavigationItem, event: React.MouseEvent) => {
    if (item.disabled) {
      event.preventDefault()
      return
    }
    
    onItemClick?.(item)
    
    // Close mobile menu on item click
    if (showMobileMenu) {
      onMobileMenuToggle?.(false)
    }
  }, [onItemClick, showMobileMenu, onMobileMenuToggle])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!items.length) return

    const currentIndex = focusedItemId ? items.findIndex(item => item.id === focusedItemId) : -1
    let nextIndex = currentIndex

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault()
        nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault()
        nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
        break
      case 'Home':
        event.preventDefault()
        nextIndex = 0
        break
      case 'End':
        event.preventDefault()
        nextIndex = items.length - 1
        break
      case 'Enter':
      case ' ':
        if (focusedItemId) {
          event.preventDefault()
          const item = items.find(item => item.id === focusedItemId)
          if (item && !item.disabled) {
            onItemClick?.(item)
          }
        }
        break
    }

    if (nextIndex !== currentIndex && nextIndex >= 0) {
      setFocusedItemId(items[nextIndex].id)
    }
  }, [items, focusedItemId, onItemClick])

  // Navigation item component
  const NavigationItem: React.FC<{ 
    item: NavigationItem
    isFocused: boolean 
    onFocus: () => void 
  }> = ({ item, isFocused, onFocus }) => {
    const itemClasses = cn(
      'navigation-item relative rounded-lg transition-all duration-200',
      ITEM_SIZE_CLASSES[size],
      compact && 'px-2 py-1',
      'hover:bg-white/10 focus:bg-white/15 focus:outline-none',
      'active:scale-95 active:bg-white/20',
      item.active && 'bg-white/15 font-medium',
      item.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      isFocused && 'ring-2 ring-blue-400 ring-opacity-50'
    )

    return (
      <a
        href={item.disabled ? undefined : item.href}
        className={itemClasses}
        onClick={(e) => handleItemClick(item, e)}
        onFocus={onFocus}
        tabIndex={item.disabled ? -1 : 0}
        role="menuitem"
        aria-current={item.active ? 'page' : undefined}
        aria-disabled={item.disabled}
        data-testid={`nav-item-${item.id}`}
      >
        {item.icon && (
          <span className="navigation-item-icon mr-2 flex-shrink-0">
            {item.icon}
          </span>
        )}
        <span className="navigation-item-label">
          {item.label}
        </span>
        
        {/* Active indicator */}
        {item.active && (
          <div 
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${context.season === 'spring' ? 'rgba(52, 211, 153, 0.1)' : 
                context.season === 'summer' ? 'rgba(251, 191, 36, 0.1)' :
                context.season === 'autumn' ? 'rgba(251, 146, 60, 0.1)' :
                'rgba(147, 197, 253, 0.1)'} 0%, transparent 100%)`
            }}
          />
        )}
      </a>
    )
  }

  const containerClasses = cn(
    'liquid-glass-navigation',
    SIZE_CLASSES[size],
    compact && 'py-2 px-4',
    sticky && 'sticky top-0 z-50',
    orientation === 'vertical' && 'flex-col',
    orientation === 'horizontal' && 'flex-row items-center',
    className
  )

  return (
    <>
      {/* Desktop Navigation */}
      <LiquidGlassContainer
        variant={variant}
        layout="flex"
        justify={orientation === 'horizontal' ? 'between' : 'start'}
        align="center"
        gap="md"
        padding="none"
        className={containerClasses}
        enableParticles={false} // Disable particles for navigation
        isolateBackdrop
        role="navigation"
        aria-label="Main navigation"
        onKeyDown={handleKeyDown}
        data-testid="liquid-glass-navigation"
        {...glassProps}
      >
        {/* Logo/Brand */}
        {logo && (
          <div className="navigation-logo flex-shrink-0">
            {logo}
          </div>
        )}

        {/* Navigation Items */}
        <nav 
          className={cn(
            'navigation-items',
            orientation === 'horizontal' ? 'flex flex-row space-x-1' : 'flex flex-col space-y-1',
            'md:flex', // Always show on desktop
            showMobileMenu ? 'flex' : 'hidden md:flex' // Toggle on mobile
          )}
          role="menubar"
          aria-orientation={orientation}
        >
          {items.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              isFocused={focusedItemId === item.id}
              onFocus={() => setFocusedItemId(item.id)}
            />
          ))}
        </nav>

        {/* Actions */}
        {actions && (
          <div className="navigation-actions flex items-center space-x-2 flex-shrink-0">
            {actions}
          </div>
        )}

        {/* Mobile Menu Trigger */}
        {mobileMenuTrigger && (
          <button
            className="mobile-menu-trigger md:hidden p-2 rounded-lg hover:bg-white/10 focus:bg-white/15 focus:outline-none transition-colors"
            onClick={() => onMobileMenuToggle?.(!showMobileMenu)}
            aria-expanded={showMobileMenu}
            aria-controls="mobile-navigation-menu"
            aria-label={showMobileMenu ? 'Close menu' : 'Open menu'}
            data-testid="mobile-menu-trigger"
          >
            {mobileMenuTrigger}
          </button>
        )}
      </LiquidGlassContainer>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <LiquidGlassContainer
          variant="medium"
          className="md:hidden absolute top-full left-0 right-0 z-40 shadow-lg"
          layout="flex"
          padding="md"
          enableParticles={false}
          id="mobile-navigation-menu"
          role="menu"
          data-testid="mobile-navigation-menu"
        >
          <nav className="flex flex-col space-y-2 w-full">
            {items.map((item) => (
              <NavigationItem
                key={`mobile-${item.id}`}
                item={item}
                isFocused={focusedItemId === item.id}
                onFocus={() => setFocusedItemId(item.id)}
              />
            ))}
          </nav>
        </LiquidGlassContainer>
      )}
    </>
  )
}

export default LiquidGlassNavigation