import { Variants, type AnimationControls } from 'framer-motion'

/**
 * Kawaii Animation Engine - Advanced animations for the kawaii reading blog
 * Based on best practices from Framer Motion and kawaii design patterns
 */

// Animation variants for consistent kawaii animations
export const kawaiiAnimations: Record<string, Variants> = {
  // Cute bounce effect inspired by Josh Comeau's "Boop" animation
  bounce: {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: -5,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 400,
        restDelta: 0.001
      }
    },
    tap: { 
      scale: 0.95, 
      rotate: 2,
      transition: { duration: 0.1 }
    }
  },

  // Fluffy floating effect for cards
  float: {
    rest: { y: 0, rotate: 0 },
    hover: {
      y: -8,
      rotate: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 300,
        restDelta: 0.001
      }
    }
  },

  // Page transition animations
  pageTransition: {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  },

  // Reading progress animations
  progressBar: {
    initial: { scaleX: 0, originX: 0 },
    animate: { 
      scaleX: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        restDelta: 0.001
      }
    }
  },

  // Book card hover animation
  bookCard: {
    rest: { 
      scale: 1, 
      rotateY: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    },
    hover: { 
      scale: 1.05,
      rotateY: 5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300
      }
    }
  },

  // Like button animation with heart effect
  likeButton: {
    rest: { scale: 1 },
    liked: {
      scale: [1, 1.3, 1],
      transition: {
        duration: 0.6,
        times: [0, 0.3, 1],
        type: "spring",
        damping: 10,
        stiffness: 400
      }
    }
  },

  // Modal animations
  modal: {
    initial: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50 
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
        restDelta: 0.001
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: { duration: 0.2 }
    }
  },

  // Stagger animations for lists
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  // Individual stagger items
  staggerItem: {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    }
  }
}

// Particle system configuration
export interface ParticleConfig {
  count: number
  colors: string[]
  size: { min: number; max: number }
  speed: { min: number; max: number }
  gravity: number
  lifetime: number
}

// Default kawaii particle configs
export const particleConfigs: Record<string, ParticleConfig> = {
  hearts: {
    count: 12,
    colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ff6b9d'],
    size: { min: 8, max: 16 },
    speed: { min: 2, max: 5 },
    gravity: 0.5,
    lifetime: 2000
  },
  sparkles: {
    count: 20,
    colors: ['#ffd700', '#ffed4e', '#fbbf24', '#f59e0b'],
    size: { min: 4, max: 8 },
    speed: { min: 1, max: 3 },
    gravity: 0.2,
    lifetime: 1500
  },
  stars: {
    count: 15,
    colors: ['#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9'],
    size: { min: 6, max: 12 },
    speed: { min: 1.5, max: 4 },
    gravity: 0.3,
    lifetime: 1800
  }
}

// Animation timing functions for 60FPS performance
export const timingFunctions = {
  // Optimized for kawaii bouncy feel
  kawaiiEase: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  smoothEase: "cubic-bezier(0.4, 0, 0.2, 1)",
  bounceEase: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  gentleEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
}

// Performance optimization for 60FPS animations
export const performanceConfig = {
  // Use will-change for frequently animated elements
  willChange: "transform, opacity",
  
  // Prefer transform over layout-triggering properties
  preferredProperties: [
    'transform', 'opacity', 'filter', 'backdrop-filter'
  ],
  
  // Reduced motion preferences
  reducedMotion: {
    duration: 0.01,
    ease: "linear"
  }
}

// Utility functions for animation control
export const animationUtils = {
  /**
   * Creates optimized spring configuration for kawaii animations
   */
  createKawaiiSpring: (stiffness = 300, damping = 20) => ({
    type: "spring" as const,
    stiffness,
    damping,
    restDelta: 0.001,
    restSpeed: 0.001
  }),

  /**
   * Generates random values for particle animations
   */
  randomBetween: (min: number, max: number) => Math.random() * (max - min) + min,

  /**
   * Respects user's reduced motion preferences
   */
  respectsReducedMotion: () => 
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,

  /**
   * Creates stagger configuration for list animations
   */
  createStagger: (duration = 0.1, delayChildren = 0.2) => ({
    staggerChildren: duration,
    delayChildren
  })
}

// Export animation presets for common kawaii patterns
export const kawaiiPresets: Record<string, Variants> = {
  // Book interaction animations
  bookHover: kawaiiAnimations.bookCard,
  bookFloat: kawaiiAnimations.float,
  
  // Button interactions
  buttonBounce: kawaiiAnimations.bounce,
  likeAnimation: kawaiiAnimations.likeButton,
  
  // Page transitions
  pageEnter: kawaiiAnimations.pageTransition,
  modalSlide: kawaiiAnimations.modal,
  
  // List animations
  listStagger: kawaiiAnimations.stagger,
  itemAppear: kawaiiAnimations.staggerItem,
  
  // Progress indicators
  progressFill: kawaiiAnimations.progressBar
}

export default kawaiiAnimations