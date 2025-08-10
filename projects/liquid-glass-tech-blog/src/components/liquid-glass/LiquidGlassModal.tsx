'use client'

/**
 * LiquidGlassModal - Modal with backdrop blur and seasonal theming
 * Features accessibility, focus management, and smooth animations
 */

import React, { useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { LiquidGlassContainer } from './LiquidGlassContainer'
import { useSeasonalTheme } from '@/lib/contexts/SeasonalThemeContext'
import { cn } from '@/lib/utils/classNames'
import type { LiquidGlassProps } from '@/lib/types/glass'

export interface LiquidGlassModalProps extends Omit<LiquidGlassProps, 'children'> {
  /** Modal visibility */
  isOpen: boolean
  /** Close modal handler */
  onClose: () => void
  /** Modal title */
  title?: string
  /** Modal content */
  children: React.ReactNode
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Center modal content */
  centered?: boolean
  /** Allow closing on backdrop click */
  closeOnBackdropClick?: boolean
  /** Allow closing on escape key */
  closeOnEscape?: boolean
  /** Custom backdrop blur intensity */
  backdropBlur?: 'sm' | 'md' | 'lg' | 'xl'
  /** Modal z-index */
  zIndex?: number
  /** Custom portal container */
  portalContainer?: Element
  /** Focus element selector after open */
  initialFocus?: string
  /** Focus element selector after close */
  restoreFocus?: string
  /** Header content */
  header?: React.ReactNode
  /** Footer content */
  footer?: React.ReactNode
  /** Enable particles in modal */
  enableModalParticles?: boolean
}

const SIZE_CLASSES = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
  full: 'max-w-full mx-4'
}

const BACKDROP_BLUR_CLASSES = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl'
}

export const LiquidGlassModal: React.FC<LiquidGlassModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  centered = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  backdropBlur = 'md',
  zIndex = 50,
  portalContainer,
  initialFocus,
  restoreFocus,
  header,
  footer,
  enableModalParticles = false,
  variant = 'medium',
  className = '',
  ...glassProps
}) => {
  const { context } = useSeasonalTheme()
  const modalRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Handle escape key
  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (closeOnEscape && event.key === 'Escape') {
      onClose()
    }
  }, [closeOnEscape, onClose])

  // Handle backdrop click
  const handleBackdropClick = useCallback((event: React.MouseEvent) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose()
    }
  }, [closeOnBackdropClick, onClose])

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousFocusRef.current = document.activeElement as HTMLElement
      
      // Focus initial element or modal
      const focusElement = initialFocus 
        ? document.querySelector(initialFocus) as HTMLElement
        : modalRef.current?.querySelector('[autofocus], button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement
      
      if (focusElement) {
        focusElement.focus()
      } else {
        modalRef.current?.focus()
      }
    } else {
      // Restore focus
      const restoreElement = restoreFocus
        ? document.querySelector(restoreFocus) as HTMLElement
        : previousFocusRef.current
        
      if (restoreElement) {
        restoreElement.focus()
      }
    }
  }, [isOpen, initialFocus, restoreFocus])

  // Keyboard event listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, handleEscape])

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [isOpen])

  // Focus trap
  const handleTabKey = useCallback((event: React.KeyboardEvent) => {
    if (event.key !== 'Tab' || !modalRef.current) return

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus()
        event.preventDefault()
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus()
        event.preventDefault()
      }
    }
  }, [])

  if (!isOpen) return null

  const modalContent = (
    <div
      className={cn(
        'fixed inset-0 flex items-center justify-center p-4',
        `z-${zIndex}`,
        centered ? 'items-center' : 'items-start pt-16'
      )}
      style={{ zIndex }}
      data-testid="modal-overlay"
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className={cn(
          'fixed inset-0 transition-all duration-300',
          BACKDROP_BLUR_CLASSES[backdropBlur],
          'bg-black/20',
          // Seasonal backdrop colors
          context.season === 'spring' && 'bg-emerald-900/10',
          context.season === 'summer' && 'bg-amber-900/10',
          context.season === 'autumn' && 'bg-orange-900/10',
          context.season === 'winter' && 'bg-blue-900/10'
        )}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal */}
      <LiquidGlassContainer
        ref={modalRef}
        variant={variant}
        className={cn(
          'relative w-full transform transition-all duration-300',
          SIZE_CLASSES[size],
          'animate-in slide-in-from-bottom-4 fade-in-0 duration-300',
          'max-h-[90vh] overflow-hidden',
          className
        )}
        layout="block"
        padding="none"
        enableParticles={enableModalParticles}
        isolateBackdrop
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        tabIndex={-1}
        onKeyDown={handleTabKey}
        data-testid="liquid-glass-modal"
        {...glassProps}
      >
        {/* Header */}
        {(title || header) && (
          <div className="modal-header border-b border-white/10 p-6 pb-4">
            {header || (
              <div className="flex items-center justify-between">
                <h2 
                  id="modal-title" 
                  className="text-xl font-semibold text-white"
                >
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 focus:bg-white/15 focus:outline-none transition-colors"
                  aria-label="Close modal"
                  data-testid="modal-close-button"
                >
                  <svg 
                    className="w-5 h-5 text-white/70" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="modal-content overflow-y-auto flex-1 p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="modal-footer border-t border-white/10 p-6 pt-4">
            {footer}
          </div>
        )}
      </LiquidGlassContainer>
    </div>
  )

  // Use portal for modal
  const container = portalContainer || (typeof document !== 'undefined' ? document.body : null)
  
  return container ? createPortal(modalContent, container) : null
}

export default LiquidGlassModal