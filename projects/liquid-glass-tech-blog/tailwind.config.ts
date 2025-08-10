import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // 季節のグラデーションクラス
    'from-pink-200', 'via-sky-300', 'to-blue-400',
    'from-blue-400', 'via-cyan-300', 'to-blue-50',
    'from-red-400', 'via-orange-400', 'to-yellow-300',
    'from-slate-100', 'via-blue-100', 'to-cyan-200',
    'bg-gradient-to-br',
    'text-slate-800',
    'text-slate-700',
    // ボタンの追加スタイル
    'backdrop-blur-xl',
    'rounded-2xl',
    'hover:scale-105',
    'shadow-xl',
  ],
  theme: {
    extend: {
      // Liquid Glass specific color palette
      colors: {
        glass: {
          // Base glass colors with opacity variants
          white: 'rgba(255, 255, 255, var(--glass-opacity, 0.1))',
          black: 'rgba(0, 0, 0, var(--glass-opacity, 0.1))',
          // Seasonal theme colors
          spring: {
            primary: 'rgba(52, 211, 153, var(--glass-opacity, 0.15))',
            secondary: 'rgba(167, 243, 208, var(--glass-opacity, 0.1))',
            accent: 'rgba(16, 185, 129, var(--glass-opacity, 0.2))',
          },
          summer: {
            primary: 'rgba(251, 191, 36, var(--glass-opacity, 0.15))',
            secondary: 'rgba(253, 230, 138, var(--glass-opacity, 0.1))',
            accent: 'rgba(245, 158, 11, var(--glass-opacity, 0.2))',
          },
          autumn: {
            primary: 'rgba(251, 146, 60, var(--glass-opacity, 0.15))',
            secondary: 'rgba(254, 215, 170, var(--glass-opacity, 0.1))',
            accent: 'rgba(234, 88, 12, var(--glass-opacity, 0.2))',
          },
          winter: {
            primary: 'rgba(147, 197, 253, var(--glass-opacity, 0.15))',
            secondary: 'rgba(219, 234, 254, var(--glass-opacity, 0.1))',
            accent: 'rgba(59, 130, 246, var(--glass-opacity, 0.2))',
          },
        },
      },
      // Custom backdrop blur values for liquid glass effects
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
        '5xl': '96px',
        '6xl': '120px',
      },
      // Custom backdrop filter utilities
      backdropSaturate: {
        25: '.25',
        75: '.75',
        125: '1.25',
        150: '1.5',
        175: '1.75',
        200: '2',
      },
      backdropBrightness: {
        25: '.25',
        75: '.75',
        110: '1.1',
        125: '1.25',
        150: '1.5',
        175: '1.75',
        200: '2',
      },
      // Animation and transition utilities
      animation: {
        'glass-float': 'glass-float 6s ease-in-out infinite',
        'glass-pulse': 'glass-pulse 4s ease-in-out infinite',
        'glass-shimmer': 'glass-shimmer 3s ease-in-out infinite',
        'particle-float': 'particle-float 8s linear infinite',
      },
      keyframes: {
        'glass-float': {
          '0%, 100%': { transform: 'translateY(0px) rotateX(0deg)' },
          '50%': { transform: 'translateY(-10px) rotateX(5deg)' },
        },
        'glass-pulse': {
          '0%, 100%': { opacity: '0.1', transform: 'scale(1)' },
          '50%': { opacity: '0.2', transform: 'scale(1.02)' },
        },
        'glass-shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'particle-float': {
          '0%': { transform: 'translateY(100vh) rotate(0deg)' },
          '100%': { transform: 'translateY(-100vh) rotate(360deg)' },
        },
      },
      // Custom box shadows for depth
      boxShadow: {
        'glass-sm': '0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glass': '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glass-md': '0 8px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glass-lg': '0 16px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glass-xl': '0 24px 48px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      // Typography for glass text effects
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
      },
    },
  },
  plugins: [
    // Custom glass effect utilities
    function({ addUtilities, theme, addComponents }) {
      const glassVariants = {
        '.glass-subtle': {
          backgroundColor: theme('colors.glass.white'),
          backdropFilter: 'blur(8px) saturate(1.8) brightness(1.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: theme('borderRadius.xl'),
        },
        '.glass-medium': {
          backgroundColor: theme('colors.glass.white'),
          backdropFilter: 'blur(16px) saturate(1.8) brightness(1.1)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          borderRadius: theme('borderRadius.xl'),
        },
        '.glass-intense': {
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(24px) saturate(2) brightness(1.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: theme('borderRadius.xl'),
        },
        '.glass-dark': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(16px) saturate(1.8) brightness(0.9)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: theme('borderRadius.xl'),
        },
      };
      
      addComponents(glassVariants);
      
      addUtilities({
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.transform-3d': {
          transformStyle: 'preserve-3d',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
      });
    },
  ],
  // Dark mode support
  darkMode: 'class',
}

export default config