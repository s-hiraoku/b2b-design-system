/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  theme: {
    extend: {
      // Kawaii color palette
      colors: {
        // Primary kawaii colors - soft pastels
        kawaii: {
          pink: {
            50: '#fdf2f8',
            100: '#fce7f3',
            200: '#fbcfe8',
            300: '#f9a8d4',
            400: '#f472b6',
            500: '#ec4899',  // Main kawaii pink
            600: '#db2777',
            700: '#be185d',
            800: '#9d174d',
            900: '#831843',
          },
          purple: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',  // Main kawaii purple
            600: '#9333ea',
            700: '#7c3aed',
            800: '#6d28d9',
            900: '#581c87',
          },
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',  // Main kawaii blue
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          },
          mint: {
            50: '#ecfdf5',
            100: '#d1fae5',
            200: '#a7f3d0',
            300: '#6ee7b7',
            400: '#34d399',
            500: '#10b981',  // Main kawaii mint
            600: '#059669',
            700: '#047857',
            800: '#065f46',
            900: '#064e3b',
          },
          peach: {
            50: '#fef7ed',
            100: '#fdedd4',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#f97316',  // Main kawaii peach
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
            900: '#7c2d12',
          },
          lavender: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',  // Main kawaii lavender
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          }
        },
        
        // Background gradients
        'kawaii-bg': 'linear-gradient(135deg, #fce7f3 0%, #f3e8ff 50%, #dbeafe 100%)',
        'kawaii-card': 'linear-gradient(135deg, #ffffff 0%, #fdf2f8 100%)',
      },

      // Kawaii typography
      fontFamily: {
        'kawaii-title': ['Comic Sans MS', 'cursive', 'system-ui'],
        'kawaii-body': ['Inter', 'system-ui', 'sans-serif'],
        'kawaii-mono': ['JetBrains Mono', 'monospace'],
      },

      // Kawaii spacing system
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },

      // Kawaii border radius
      borderRadius: {
        'kawaii': '1.5rem',
        'kawaii-lg': '2rem',
        'kawaii-xl': '2.5rem',
        'kawaii-2xl': '3rem',
      },

      // Kawaii shadows
      boxShadow: {
        'kawaii': '0 4px 6px -1px rgba(236, 72, 153, 0.1), 0 2px 4px -1px rgba(236, 72, 153, 0.06)',
        'kawaii-lg': '0 10px 15px -3px rgba(236, 72, 153, 0.1), 0 4px 6px -2px rgba(236, 72, 153, 0.05)',
        'kawaii-xl': '0 20px 25px -5px rgba(236, 72, 153, 0.1), 0 10px 10px -5px rgba(236, 72, 153, 0.04)',
        'kawaii-glow': '0 0 20px rgba(236, 72, 153, 0.3)',
        'kawaii-inner': 'inset 0 2px 4px 0 rgba(236, 72, 153, 0.06)',
      },

      // Kawaii animations
      animation: {
        'kawaii-bounce': 'kawaii-bounce 1s infinite',
        'kawaii-float': 'kawaii-float 3s ease-in-out infinite',
        'kawaii-wiggle': 'kawaii-wiggle 1s ease-in-out infinite',
        'kawaii-pulse': 'kawaii-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'kawaii-spin': 'kawaii-spin 3s linear infinite',
        'kawaii-heart': 'kawaii-heart 0.8s ease-in-out',
        'kawaii-sparkle': 'kawaii-sparkle 1.5s ease-in-out infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },

      // Kawaii keyframes
      keyframes: {
        'kawaii-bounce': {
          '0%, 100%': { 
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': { 
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        },
        'kawaii-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'kawaii-wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        'kawaii-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.8' }
        },
        'kawaii-spin': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' }
        },
        'kawaii-heart': {
          '0%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.2)' },
          '50%': { transform: 'scale(1.1)' },
          '75%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' }
        },
        'kawaii-sparkle': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center bottom'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': 'right center'
          }
        }
      },

      // Kawaii gradients
      backgroundImage: {
        'kawaii-gradient': 'linear-gradient(135deg, #fce7f3 0%, #f3e8ff 50%, #dbeafe 100%)',
        'kawaii-gradient-radial': 'radial-gradient(ellipse at center, #fce7f3 0%, #f3e8ff 50%, #dbeafe 100%)',
        'kawaii-card-gradient': 'linear-gradient(135deg, #ffffff 0%, #fdf2f8 100%)',
        'kawaii-button-gradient': 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
        'kawaii-success-gradient': 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
        'kawaii-warning-gradient': 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
      },

      // Kawaii transitions
      transitionTimingFunction: {
        'kawaii': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'kawaii-bounce': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'kawaii-gentle': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },

      // Kawaii transforms
      scale: {
        '102': '1.02',
        '103': '1.03',
        '108': '1.08',
      },

      // Kawaii backdrop filters
      backdropBlur: {
        'kawaii': '8px',
      },

      // Screen sizes for kawaii responsive design
      screens: {
        'kawaii-sm': '480px',
        'kawaii-md': '768px',
        'kawaii-lg': '1024px',
        'kawaii-xl': '1280px',
        'kawaii-2xl': '1536px',
      }
    },
  },
  
  plugins: [
    // Line clamp plugin for text truncation
    require('@tailwindcss/line-clamp'),
    
    // Custom kawaii utilities
    function({ addUtilities, theme }) {
      const kawaiiUtilities = {
        '.kawaii-text-gradient': {
          'background': 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.kawaii-border-gradient': {
          'border': '2px solid transparent',
          'background': 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #ec4899 0%, #a855f7 100%) border-box',
        },
        '.kawaii-glass': {
          'background': 'rgba(255, 255, 255, 0.25)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.18)',
        },
        '.kawaii-float-animation': {
          'animation': 'kawaii-float 3s ease-in-out infinite',
        },
        '.kawaii-hover-lift': {
          'transition': 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55), box-shadow 0.3s ease',
          '&:hover': {
            'transform': 'translateY(-5px) scale(1.02)',
            'box-shadow': '0 10px 25px -5px rgba(236, 72, 153, 0.2)',
          }
        },
        '.kawaii-scroll-smooth': {
          'scroll-behavior': 'smooth',
          'scroll-padding-top': '2rem',
        },
        '.kawaii-selection': {
          '&::selection': {
            'background-color': '#fce7f3',
            'color': '#be185d',
          }
        }
      }

      addUtilities(kawaiiUtilities)
    },
    
    // Custom kawaii components
    function({ addComponents, theme }) {
      const kawaiiComponents = {
        '.kawaii-btn': {
          'padding': theme('spacing.2') + ' ' + theme('spacing.4'),
          'border-radius': theme('borderRadius.kawaii'),
          'font-weight': theme('fontWeight.medium'),
          'transition': 'all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          'cursor': 'pointer',
          'display': 'inline-flex',
          'align-items': 'center',
          'justify-content': 'center',
          'position': 'relative',
          'overflow': 'hidden',
          '&:focus': {
            'outline': 'none',
            'box-shadow': '0 0 0 3px rgba(236, 72, 153, 0.3)',
          },
          '&:disabled': {
            'opacity': '0.5',
            'cursor': 'not-allowed',
          }
        },
        '.kawaii-card': {
          'background': theme('colors.white'),
          'border-radius': theme('borderRadius.kawaii-lg'),
          'box-shadow': theme('boxShadow.kawaii'),
          'border': '2px solid ' + theme('colors.kawaii.pink.100'),
          'padding': theme('spacing.6'),
          'transition': 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          '&:hover': {
            'transform': 'translateY(-2px)',
            'box-shadow': theme('boxShadow.kawaii-lg'),
            'border-color': theme('colors.kawaii.pink.200'),
          }
        },
        '.kawaii-input': {
          'width': '100%',
          'padding': theme('spacing.3'),
          'border': '2px solid ' + theme('colors.kawaii.pink.200'),
          'border-radius': theme('borderRadius.kawaii'),
          'background-color': theme('colors.white'),
          'transition': 'all 0.2s ease',
          '&:focus': {
            'outline': 'none',
            'border-color': theme('colors.kawaii.pink.400'),
            'box-shadow': '0 0 0 3px rgba(236, 72, 153, 0.1)',
          }
        }
      }

      addComponents(kawaiiComponents)
    }
  ],
  
  // Dark mode configuration
  darkMode: 'class',
}