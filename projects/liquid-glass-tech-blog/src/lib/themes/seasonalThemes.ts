/**
 * Enhanced Seasonal Theme Engine with time-of-day and weather variations
 * Provides dynamic theming with GPU-accelerated particle effects
 */

import type { 
  SeasonalTheme, 
  TimeOfDay, 
  WeatherCondition, 
  SeasonalThemeConfig,
  ParticleConfig,
  WeatherData
} from '@/lib/types/glass'

// Comprehensive seasonal theme configurations
export const SEASONAL_THEMES: Record<SeasonalTheme, SeasonalThemeConfig> = {
  spring: {
    primary: 'rgba(52, 211, 153, 0.15)', // Emerald green
    secondary: 'rgba(167, 243, 208, 0.1)', // Light green
    accent: 'rgba(16, 185, 129, 0.2)', // Deep green
    particles: {
      type: 'sakura',
      color: '#FEE2E2', // Pink sakura petals
      count: 25,
      size: [4, 8],
      speed: [0.5, 1.5]
    },
    timeVariations: {
      morning: {
        primary: 'rgba(34, 197, 94, 0.18)', // Fresh morning green
        particles: {
          type: 'sakura',
          color: '#FED7E2',
          count: 35,
          size: [3, 6],
          speed: [0.3, 1.0]
        }
      },
      day: {
        primary: 'rgba(52, 211, 153, 0.15)',
        particles: {
          type: 'sakura',
          color: '#FEE2E2',
          count: 25,
          size: [4, 8],
          speed: [0.5, 1.5]
        }
      },
      evening: {
        primary: 'rgba(20, 184, 166, 0.17)',
        accent: 'rgba(5, 150, 105, 0.25)',
        particles: {
          type: 'sakura',
          color: '#FECACA',
          count: 20,
          size: [5, 9],
          speed: [0.4, 1.2]
        }
      },
      night: {
        primary: 'rgba(6, 95, 70, 0.2)',
        secondary: 'rgba(52, 211, 153, 0.08)',
        accent: 'rgba(4, 120, 87, 0.3)',
        particles: {
          type: 'sakura',
          color: '#FCA5A5',
          count: 15,
          size: [6, 10],
          speed: [0.2, 0.8]
        }
      }
    },
    weatherVariations: {
      rainy: {
        primary: 'rgba(71, 85, 105, 0.18)',
        particles: {
          type: 'droplets',
          color: '#E2E8F0',
          count: 40,
          size: [2, 4],
          speed: [2, 4]
        }
      },
      windy: {
        particles: {
          type: 'sakura',
          color: '#FEE2E2',
          count: 45,
          size: [4, 8],
          speed: [1.5, 3.5]
        }
      }
    }
  },

  summer: {
    primary: 'rgba(251, 191, 36, 0.15)', // Amber
    secondary: 'rgba(253, 230, 138, 0.1)', // Light amber
    accent: 'rgba(245, 158, 11, 0.2)', // Deep amber
    particles: {
      type: 'droplets',
      color: '#DBEAFE', // Water droplets
      count: 20,
      size: [3, 6],
      speed: [0.8, 2.0]
    },
    timeVariations: {
      morning: {
        primary: 'rgba(251, 191, 36, 0.12)',
        particles: {
          type: 'droplets',
          color: '#E0F2FE',
          count: 15,
          size: [2, 4],
          speed: [0.5, 1.2]
        }
      },
      day: {
        primary: 'rgba(251, 191, 36, 0.18)',
        accent: 'rgba(245, 158, 11, 0.25)',
        particles: {
          type: 'droplets',
          color: '#DBEAFE',
          count: 25,
          size: [3, 7],
          speed: [1.0, 2.5]
        }
      },
      evening: {
        primary: 'rgba(251, 146, 60, 0.16)',
        secondary: 'rgba(254, 215, 170, 0.12)',
        particles: {
          type: 'droplets',
          color: '#FED7AA',
          count: 18,
          size: [4, 8],
          speed: [0.6, 1.8]
        }
      },
      night: {
        primary: 'rgba(180, 83, 9, 0.14)',
        secondary: 'rgba(251, 191, 36, 0.08)',
        particles: {
          type: 'droplets',
          color: '#FEF3C7',
          count: 12,
          size: [5, 9],
          speed: [0.3, 1.0]
        }
      }
    },
    weatherVariations: {
      clear: {
        primary: 'rgba(251, 191, 36, 0.2)',
        particles: {
          type: 'droplets',
          color: '#FEF9C3',
          count: 30,
          size: [3, 6],
          speed: [1.2, 2.8]
        }
      },
      rainy: {
        primary: 'rgba(100, 116, 139, 0.16)',
        particles: {
          type: 'droplets',
          color: '#CBD5E1',
          count: 60,
          size: [2, 5],
          speed: [3, 6]
        }
      }
    }
  },

  autumn: {
    primary: 'rgba(251, 146, 60, 0.15)', // Orange
    secondary: 'rgba(254, 215, 170, 0.1)', // Light orange
    accent: 'rgba(234, 88, 12, 0.2)', // Deep orange
    particles: {
      type: 'leaves',
      color: '#FED7AA', // Falling leaves
      count: 30,
      size: [5, 10],
      speed: [0.4, 1.8]
    },
    timeVariations: {
      morning: {
        primary: 'rgba(251, 146, 60, 0.12)',
        particles: {
          type: 'leaves',
          color: '#FECACA',
          count: 25,
          size: [4, 8],
          speed: [0.3, 1.4]
        }
      },
      day: {
        primary: 'rgba(251, 146, 60, 0.18)',
        particles: {
          type: 'leaves',
          color: '#FED7AA',
          count: 35,
          size: [5, 11],
          speed: [0.5, 2.0]
        }
      },
      evening: {
        primary: 'rgba(194, 65, 12, 0.16)',
        secondary: 'rgba(251, 146, 60, 0.12)',
        particles: {
          type: 'leaves',
          color: '#FBBF24',
          count: 28,
          size: [6, 12],
          speed: [0.4, 1.6]
        }
      },
      night: {
        primary: 'rgba(124, 45, 18, 0.18)',
        secondary: 'rgba(194, 65, 12, 0.1)',
        particles: {
          type: 'leaves',
          color: '#D97706',
          count: 20,
          size: [7, 13],
          speed: [0.2, 1.0]
        }
      }
    },
    weatherVariations: {
      windy: {
        particles: {
          type: 'leaves',
          color: '#FED7AA',
          count: 50,
          size: [5, 10],
          speed: [1.8, 4.0]
        }
      },
      cloudy: {
        primary: 'rgba(156, 163, 175, 0.14)',
        particles: {
          type: 'leaves',
          color: '#F3F4F6',
          count: 20,
          size: [5, 10],
          speed: [0.3, 1.2]
        }
      }
    }
  },

  winter: {
    primary: 'rgba(147, 197, 253, 0.15)', // Blue
    secondary: 'rgba(219, 234, 254, 0.1)', // Light blue
    accent: 'rgba(59, 130, 246, 0.2)', // Deep blue
    particles: {
      type: 'snow',
      color: '#F8FAFC', // Snow crystals
      count: 35,
      size: [2, 6],
      speed: [0.3, 1.2]
    },
    timeVariations: {
      morning: {
        primary: 'rgba(147, 197, 253, 0.12)',
        particles: {
          type: 'snow',
          color: '#F1F5F9',
          count: 30,
          size: [2, 5],
          speed: [0.2, 1.0]
        }
      },
      day: {
        primary: 'rgba(147, 197, 253, 0.18)',
        particles: {
          type: 'snow',
          color: '#F8FAFC',
          count: 40,
          size: [3, 7],
          speed: [0.4, 1.5]
        }
      },
      evening: {
        primary: 'rgba(96, 165, 250, 0.16)',
        secondary: 'rgba(191, 219, 254, 0.12)',
        particles: {
          type: 'snow',
          color: '#E0F2FE',
          count: 32,
          size: [3, 8],
          speed: [0.3, 1.3]
        }
      },
      night: {
        primary: 'rgba(30, 58, 138, 0.2)',
        secondary: 'rgba(96, 165, 250, 0.08)',
        particles: {
          type: 'snow',
          color: '#DBEAFE',
          count: 25,
          size: [4, 9],
          speed: [0.2, 0.8]
        }
      }
    },
    weatherVariations: {
      snowy: {
        particles: {
          type: 'snow',
          color: '#F8FAFC',
          count: 60,
          size: [2, 6],
          speed: [0.8, 2.5]
        }
      },
      clear: {
        primary: 'rgba(147, 197, 253, 0.2)',
        particles: {
          type: 'snow',
          color: '#F0F9FF',
          count: 20,
          size: [2, 6],
          speed: [0.1, 0.8]
        }
      }
    }
  }
}

/**
 * Get current time of day based on hour
 */
export function getCurrentTimeOfDay(hour?: number): TimeOfDay {
  const currentHour = hour ?? new Date().getHours()
  
  if (currentHour >= 5 && currentHour < 10) return 'morning'
  if (currentHour >= 10 && currentHour < 17) return 'day'
  if (currentHour >= 17 && currentHour < 21) return 'evening'
  return 'night'
}

/**
 * Get current season based on month and hemisphere
 */
export function getCurrentSeason(month?: number, hemisphere: 'north' | 'south' = 'north'): SeasonalTheme {
  const currentMonth = month ?? new Date().getMonth()
  
  const northSeasons: SeasonalTheme[] = ['winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter']
  const southSeasons: SeasonalTheme[] = ['summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter', 'winter', 'winter', 'spring', 'spring', 'spring', 'summer']
  
  return hemisphere === 'north' ? northSeasons[currentMonth] : southSeasons[currentMonth]
}

/**
 * Resolve theme configuration with time-of-day and weather variations
 */
export function resolveThemeConfig(
  season: SeasonalTheme,
  timeOfDay: TimeOfDay,
  weather: WeatherCondition
): SeasonalThemeConfig {
  const baseTheme = SEASONAL_THEMES[season]
  
  // Apply time-of-day variation
  const timeVariation = baseTheme.timeVariations?.[timeOfDay]
  
  // Apply weather variation
  const weatherVariation = baseTheme.weatherVariations?.[weather]
  
  // Deep merge configurations with priority: weather > time > base
  return {
    ...baseTheme,
    ...timeVariation,
    ...weatherVariation,
    particles: {
      ...baseTheme.particles,
      ...timeVariation?.particles,
      ...weatherVariation?.particles
    }
  }
}

/**
 * Create particle configuration from theme
 */
export function createParticleConfig(
  themeConfig: SeasonalThemeConfig,
  options: {
    enabled?: boolean
    gpuAccelerated?: boolean
    reducedMotion?: boolean
  } = {}
): ParticleConfig {
  const { enabled = true, gpuAccelerated = true, reducedMotion = false } = options
  
  if (!enabled || reducedMotion || !themeConfig.particles) {
    return {
      enabled: false,
      type: 'sakura',
      count: 0,
      color: '#FFFFFF',
      size: [0, 0],
      speed: [0, 0],
      opacity: [0, 0],
      gpuAccelerated: false,
      animationDuration: 0
    }
  }
  
  const particles = themeConfig.particles
  
  return {
    enabled: true,
    type: particles.type,
    count: particles.count,
    color: particles.color,
    size: particles.size,
    speed: particles.speed,
    opacity: [0.3, 0.8], // Default opacity range
    gpuAccelerated,
    animationDuration: 8000 // 8 second animation cycle
  }
}

/**
 * Generate CSS custom properties for seasonal theme
 */
export function generateSeasonalCSSProperties(
  themeConfig: SeasonalThemeConfig,
  particleConfig: ParticleConfig
): Record<string, string> {
  return {
    '--glass-theme-primary': themeConfig.primary,
    '--glass-theme-secondary': themeConfig.secondary,
    '--glass-theme-accent': themeConfig.accent,
    '--glass-particle-color': particleConfig.color,
    '--glass-particle-count': particleConfig.count.toString(),
    '--glass-transition-duration': '0.6s',
    '--glass-time-modifier': '1.0',
    '--glass-weather-intensity': '1.0'
  }
}

/**
 * Mock weather API integration (can be replaced with real API)
 */
export async function fetchWeatherData(location?: { lat: number; lon: number }): Promise<WeatherData> {
  // Mock implementation - replace with real weather API
  const mockConditions: WeatherCondition[] = ['clear', 'cloudy', 'rainy', 'snowy', 'foggy', 'windy']
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    condition: mockConditions[Math.floor(Math.random() * mockConditions.length)],
    temperature: Math.floor(Math.random() * 40 - 10), // -10 to 30°C
    season: getCurrentSeason(),
    timeOfDay: getCurrentTimeOfDay(),
    location
  }
}

/**
 * Determine weather condition from temperature and season
 */
export function deriveWeatherFromTemperature(temperature: number, season: SeasonalTheme): WeatherCondition {
  if (season === 'winter' && temperature < 0) return 'snowy'
  if (temperature > 25 && season === 'summer') return 'clear'
  if (temperature < 10) return 'cloudy'
  
  // Default to clear for moderate temperatures
  return 'clear'
}