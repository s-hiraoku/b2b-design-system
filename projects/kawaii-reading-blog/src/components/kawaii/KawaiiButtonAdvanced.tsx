import React, { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { KawaiiButtonProps } from '@/types/kawaii'
import { 
  getButtonVariantClasses, 
  getButtonSizeClasses, 
  getButtonStateClasses 
} from '@/lib/kawaii-theme'
import { kawaiiPresets, animationUtils } from '@/lib/kawaii-animations'
import { useParticles } from '@/hooks/useParticles'
import ParticleRenderer from './ParticleRenderer'

interface KawaiiButtonAdvancedProps extends KawaiiButtonProps {
  particleEffect?: 'hearts' | 'sparkles' | 'stars' | 'none'
  soundEffect?: boolean
  pulseEffect?: boolean
  glowEffect?: boolean
}

/**
 * KawaiiButtonAdvanced - Enhanced button with particle effects and advanced animations
 * Builds upon the TDD foundation with production-ready kawaii features
 */
export const KawaiiButtonAdvanced: React.FC<KawaiiButtonAdvancedProps> = ({
  variant,
  size = 'md',
  children,
  className = '',
  disabled = false,
  loading = false,
  onClick,
  hoverEffect = true,
  animationDelay = 0,
  particleEffect = 'none',
  soundEffect = false,
  pulseEffect = false,
  glowEffect = false,
  'data-testid': testId
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const {
    particles,
    createHeartBurst,
    createSparkleEffect,
    createStarEffect
  } = useParticles({
    disabled: particleEffect === 'none' || disabled || loading
  })

  // Generate semantic class names for testing
  const semanticClasses = [
    `kawaii-btn-advanced-${variant}`,
    `kawaii-btn-${size}`,
    disabled && 'kawaii-btn-disabled',
    loading && 'kawaii-btn-loading',
    hoverEffect && 'kawaii-btn-hoverable',
    pulseEffect && 'kawaii-btn-pulse',
    glowEffect && 'kawaii-btn-glow'
  ].filter(Boolean)

  // Generate styling classes
  const variantClasses = getButtonVariantClasses(variant)
  const sizeClasses = getButtonSizeClasses(size)
  const stateClasses = getButtonStateClasses(disabled, loading)

  // Enhanced styling classes
  const effectClasses = [
    glowEffect && 'shadow-lg hover:shadow-xl',
    pulseEffect && 'animate-pulse',
    'transform transition-all duration-200 ease-out'
  ].filter(Boolean).join(' ')

  // Combine all classes
  const allClasses = [
    ...semanticClasses,
    variantClasses,
    sizeClasses,
    stateClasses,
    effectClasses,
    className
  ].filter(Boolean).join(' ')

  // Handle particle effects on click
  const triggerParticleEffect = useCallback(() => {
    if (!buttonRef.current || particleEffect === 'none') return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    switch (particleEffect) {
      case 'hearts':
        createHeartBurst(centerX, centerY)
        break
      case 'sparkles':
        createSparkleEffect(centerX, centerY)
        break
      case 'stars':
        createStarEffect(centerX, centerY)
        break
    }
  }, [particleEffect, createHeartBurst, createSparkleEffect, createStarEffect])

  // Enhanced click handler with effects
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      event.preventDefault()
      return
    }

    // Trigger particle effect
    triggerParticleEffect()

    // Trigger sound effect (could be implemented with Web Audio API)
    if (soundEffect && 'vibrate' in navigator) {
      // Simple haptic feedback on supported devices
      navigator.vibrate(50)
    }

    onClick?.(event)
  }, [disabled, loading, triggerParticleEffect, soundEffect, onClick])

  // Animation variants respecting reduced motion
  const buttonVariants = animationUtils.respectsReducedMotion() 
    ? { rest: {}, hover: {}, tap: {} }
    : kawaiiPresets.buttonBounce

  return (
    <>
      <motion.button
        ref={buttonRef}
        type="button"
        className={allClasses}
        disabled={disabled || loading}
        onClick={handleClick}
        data-testid={testId}
        variants={buttonVariants}
        initial="rest"
        whileHover={hoverEffect && !disabled && !loading ? "hover" : "rest"}
        whileTap={!disabled && !loading ? "tap" : "rest"}
        style={{
          animationDelay: animationDelay > 0 ? `${animationDelay}ms` : undefined,
          willChange: 'transform'
        }}
        // Accessibility attributes
        aria-disabled={disabled || loading}
        tabIndex={(disabled || loading) ? -1 : 0}
        role="button"
      >
        {loading && (
          <motion.span
            className="inline-block w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
            data-testid="loading-spinner"
          />
        )}

        <motion.span
          className="relative z-10"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.02 },
            tap: { scale: 0.98 }
          }}
        >
          {children}
        </motion.span>

        {/* Glow effect overlay */}
        {glowEffect && !disabled && !loading && (
          <motion.div
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white to-transparent opacity-0 pointer-events-none"
            variants={{
              rest: { opacity: 0, x: '-100%' },
              hover: { 
                opacity: 0.2, 
                x: '100%',
                transition: { duration: 0.6, ease: 'easeInOut' }
              }
            }}
            style={{ 
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
            }}
          />
        )}
      </motion.button>

      {/* Particle renderer */}
      {particles.length > 0 && (
        <ParticleRenderer particles={particles} data-testid="button-particles" />
      )}
    </>
  )
}

export default KawaiiButtonAdvanced