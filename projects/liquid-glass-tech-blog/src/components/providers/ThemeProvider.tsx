'use client'

import { ReactNode } from 'react'
import { SeasonalThemeProvider } from '@/lib/contexts/SeasonalThemeContext'

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <SeasonalThemeProvider
      autoDetectTime={true}
      enableTransitions={true}
      enableParticles={true}
    >
      {children}
    </SeasonalThemeProvider>
  )
}