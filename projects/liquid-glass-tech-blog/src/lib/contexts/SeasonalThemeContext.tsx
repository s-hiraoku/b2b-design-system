'use client'

/**
 * Seasonal Theme Context Provider
 * Manages global seasonal theme state with auto-detection and transitions
 */

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import type { 
  SeasonalTheme, 
  TimeOfDay, 
  WeatherCondition, 
  SeasonalThemeContext as SeasonalThemeContextType,
  SeasonalThemeConfig,
  WeatherData
} from '@/lib/types/glass'
import { 
  getCurrentSeason, 
  getCurrentTimeOfDay, 
  resolveThemeConfig,
  fetchWeatherData
} from '@/lib/themes/seasonalThemes'

interface SeasonalThemeProviderProps {
  children: ReactNode
  /** Initial season override */
  initialSeason?: SeasonalTheme
  /** Enable automatic time-of-day detection */
  autoDetectTime?: boolean
  /** Enable weather API integration */
  enableWeatherAPI?: boolean
  /** Enable smooth transitions between themes */
  enableTransitions?: boolean
  /** Enable particle effects */
  enableParticles?: boolean
  /** Location for weather detection */
  location?: { lat: number; lon: number }
}

const DEFAULT_CONTEXT: SeasonalThemeContextType = {
  season: 'spring',
  timeOfDay: 'day',
  weather: 'clear',
  autoDetect: true,
  transitions: true,
  particlesEnabled: true
}

const SeasonalThemeContext = createContext<{
  context: SeasonalThemeContextType
  themeConfig: SeasonalThemeConfig
  updateSeason: (season: SeasonalTheme) => void
  updateTimeOfDay: (timeOfDay: TimeOfDay) => void
  updateWeather: (weather: WeatherCondition) => void
  toggleAutoDetect: () => void
  toggleTransitions: () => void
  toggleParticles: () => void
  refreshWeather: () => Promise<void>
}>({
  context: DEFAULT_CONTEXT,
  themeConfig: {
    primary: 'rgba(52, 211, 153, 0.15)',
    secondary: 'rgba(167, 243, 208, 0.1)',
    accent: 'rgba(16, 185, 129, 0.2)'
  },
  updateSeason: () => {},
  updateTimeOfDay: () => {},
  updateWeather: () => {},
  toggleAutoDetect: () => {},
  toggleTransitions: () => {},
  toggleParticles: () => {},
  refreshWeather: async () => {}
})

export function SeasonalThemeProvider({
  children,
  initialSeason,
  autoDetectTime = true,
  enableWeatherAPI = false,
  enableTransitions = true,
  enableParticles = true,
  location
}: SeasonalThemeProviderProps) {
  const [context, setContext] = useState<SeasonalThemeContextType>({
    ...DEFAULT_CONTEXT,
    season: initialSeason || getCurrentSeason(),
    timeOfDay: getCurrentTimeOfDay(),
    autoDetect: autoDetectTime,
    transitions: enableTransitions,
    particlesEnabled: enableParticles
  })

  const [themeConfig, setThemeConfig] = useState<SeasonalThemeConfig>(() => 
    resolveThemeConfig(context.season, context.timeOfDay, context.weather)
  )

  // Auto-detect time of day changes
  useEffect(() => {
    if (!context.autoDetect) return

    const updateTime = () => {
      const newTimeOfDay = getCurrentTimeOfDay()
      if (newTimeOfDay !== context.timeOfDay) {
        setContext(prev => ({ ...prev, timeOfDay: newTimeOfDay }))
      }
    }

    // Check every minute for time changes
    const interval = setInterval(updateTime, 60000)
    
    // Also check immediately
    updateTime()

    return () => clearInterval(interval)
  }, [context.autoDetect, context.timeOfDay])

  // Auto-detect seasonal changes
  useEffect(() => {
    if (!context.autoDetect) return

    const updateSeason = () => {
      const newSeason = getCurrentSeason()
      if (newSeason !== context.season) {
        setContext(prev => ({ ...prev, season: newSeason }))
      }
    }

    // Check daily for season changes
    const interval = setInterval(updateSeason, 86400000) // 24 hours
    
    // Also check immediately
    updateSeason()

    return () => clearInterval(interval)
  }, [context.autoDetect, context.season])

  // Update theme configuration when context changes
  useEffect(() => {
    const newThemeConfig = resolveThemeConfig(context.season, context.timeOfDay, context.weather)
    setThemeConfig(newThemeConfig)
  }, [context.season, context.timeOfDay, context.weather])

  // Weather API integration
  const refreshWeather = useCallback(async () => {
    if (!enableWeatherAPI) return

    try {
      const weatherData = await fetchWeatherData(location)
      setContext(prev => ({
        ...prev,
        weather: weatherData.condition,
        // Update season and time if auto-detect is enabled
        ...(prev.autoDetect ? {
          season: weatherData.season,
          timeOfDay: weatherData.timeOfDay
        } : {})
      }))
    } catch (error) {
      console.warn('Failed to fetch weather data:', error)
    }
  }, [enableWeatherAPI, location])

  // Fetch weather data on mount and periodically
  useEffect(() => {
    if (enableWeatherAPI) {
      refreshWeather()
      
      // Refresh weather every 30 minutes
      const interval = setInterval(refreshWeather, 1800000)
      return () => clearInterval(interval)
    }
  }, [enableWeatherAPI, refreshWeather])

  // Persist theme preferences to localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('seasonalThemePreferences')
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences)
        setContext(prev => ({
          ...prev,
          ...preferences,
          // Don't override auto-detected values if auto-detect is enabled
          ...(prev.autoDetect ? {} : {
            season: preferences.season,
            timeOfDay: preferences.timeOfDay
          })
        }))
      } catch (error) {
        console.warn('Failed to parse saved theme preferences:', error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('seasonalThemePreferences', JSON.stringify({
      season: context.season,
      timeOfDay: context.timeOfDay,
      weather: context.weather,
      autoDetect: context.autoDetect,
      transitions: context.transitions,
      particlesEnabled: context.particlesEnabled
    }))
  }, [context])

  // Context update functions
  const updateSeason = useCallback((season: SeasonalTheme) => {
    setContext(prev => ({ ...prev, season, autoDetect: false }))
  }, [])

  const updateTimeOfDay = useCallback((timeOfDay: TimeOfDay) => {
    setContext(prev => ({ ...prev, timeOfDay, autoDetect: false }))
  }, [])

  const updateWeather = useCallback((weather: WeatherCondition) => {
    setContext(prev => ({ ...prev, weather }))
  }, [])

  const toggleAutoDetect = useCallback(() => {
    setContext(prev => {
      const newAutoDetect = !prev.autoDetect
      return {
        ...prev,
        autoDetect: newAutoDetect,
        // Reset to current values if enabling auto-detect
        ...(newAutoDetect ? {
          season: getCurrentSeason(),
          timeOfDay: getCurrentTimeOfDay()
        } : {})
      }
    })
  }, [])

  const toggleTransitions = useCallback(() => {
    setContext(prev => ({ ...prev, transitions: !prev.transitions }))
  }, [])

  const toggleParticles = useCallback(() => {
    setContext(prev => ({ ...prev, particlesEnabled: !prev.particlesEnabled }))
  }, [])

  return (
    <SeasonalThemeContext.Provider
      value={{
        context,
        themeConfig,
        updateSeason,
        updateTimeOfDay,
        updateWeather,
        toggleAutoDetect,
        toggleTransitions,
        toggleParticles,
        refreshWeather
      }}
    >
      {children}
    </SeasonalThemeContext.Provider>
  )
}

/**
 * Hook to access seasonal theme context
 */
export function useSeasonalTheme() {
  const contextValue = useContext(SeasonalThemeContext)
  
  if (!contextValue) {
    throw new Error('useSeasonalTheme must be used within a SeasonalThemeProvider')
  }
  
  return contextValue
}

/**
 * Hook to access current theme configuration
 */
export function useThemeConfig() {
  const { themeConfig } = useSeasonalTheme()
  return themeConfig
}

/**
 * Hook to access seasonal context state only
 */
export function useSeasonalContext() {
  const { context } = useSeasonalTheme()
  return context
}