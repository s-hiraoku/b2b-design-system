/**
 * LiquidGlassCard Component Examples
 * Comprehensive showcase of all features and variations
 */

import React from 'react'
import { LiquidGlassCard } from './LiquidGlassCard'
import type { GlassVariant, SeasonalTheme } from '@/lib/types/glass'

// Import styles for proper rendering
import '../../styles/liquid-glass.css'

export default {
  title: 'Liquid Glass/LiquidGlassCard',
  component: LiquidGlassCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'gradient',
      values: [
        {
          name: 'gradient',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
        {
          name: 'light',
          value: '#f0f0f0',
        },
      ],
    },
  },
}

const Template = (args: any) => (
  <div style={{ padding: '2rem', minWidth: '300px' }}>
    <LiquidGlassCard {...args}>
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>
          Liquid Glass Card
        </h3>
        <p style={{ margin: '0', color: '#666', lineHeight: '1.5' }}>
          This is a beautiful glassmorphism card with backdrop filters, seasonal theming, 
          and interactive effects. Perfect for modern UI designs.
        </p>
      </div>
    </LiquidGlassCard>
  </div>
)

// Basic variants
export const Subtle = Template.bind({})
Subtle.args = {
  variant: 'subtle' as GlassVariant,
}

export const Medium = Template.bind({})
Medium.args = {
  variant: 'medium' as GlassVariant,
}

export const Intense = Template.bind({})
Intense.args = {
  variant: 'intense' as GlassVariant,
}

export const Dark = Template.bind({})
Dark.args = {
  variant: 'dark' as GlassVariant,
}

// Seasonal themes
export const SpringTheme = Template.bind({})
SpringTheme.args = {
  variant: 'medium' as GlassVariant,
  theme: 'spring' as SeasonalTheme,
}

export const SummerTheme = Template.bind({})
SummerTheme.args = {
  variant: 'medium' as GlassVariant,
  theme: 'summer' as SeasonalTheme,
}

export const AutumnTheme = Template.bind({})
AutumnTheme.args = {
  variant: 'medium' as GlassVariant,
  theme: 'autumn' as SeasonalTheme,
}

export const WinterTheme = Template.bind({})
WinterTheme.args = {
  variant: 'medium' as GlassVariant,
  theme: 'winter' as SeasonalTheme,
}

// Interactive features
export const Interactive = Template.bind({})
Interactive.args = {
  variant: 'medium' as GlassVariant,
  interactive: true,
  tabIndex: 0,
}

export const Animated = Template.bind({})
Animated.args = {
  variant: 'medium' as GlassVariant,
  animated: true,
}

export const InteractiveAnimated = Template.bind({})
InteractiveAnimated.args = {
  variant: 'medium' as GlassVariant,
  interactive: true,
  animated: true,
  tabIndex: 0,
}

// Custom effects
export const CustomEffect = Template.bind({})
CustomEffect.args = {
  effect: {
    blur: 32,
    opacity: 0.2,
    saturation: 2.5,
    brightness: 1.3,
    borderOpacity: 0.3,
  },
}

// Showcase grid
export const ShowcaseGrid = () => (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
    gap: '2rem', 
    padding: '2rem',
    maxWidth: '1200px'
  }}>
    {/* Variants */}
    {(['subtle', 'medium', 'intense', 'dark'] as GlassVariant[]).map(variant => (
      <LiquidGlassCard key={variant} variant={variant}>
        <div style={{ padding: '1.5rem', textAlign: 'center' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', textTransform: 'capitalize' }}>
            {variant} Variant
          </h4>
          <p style={{ margin: '0', fontSize: '0.9rem', opacity: 0.8 }}>
            Glassmorphism with {variant} intensity
          </p>
        </div>
      </LiquidGlassCard>
    ))}
    
    {/* Seasonal themes */}
    {(['spring', 'summer', 'autumn', 'winter'] as SeasonalTheme[]).map(theme => (
      <LiquidGlassCard key={theme} variant="medium" theme={theme}>
        <div style={{ padding: '1.5rem', textAlign: 'center' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', textTransform: 'capitalize' }}>
            {theme} Theme
          </h4>
          <p style={{ margin: '0', fontSize: '0.9rem', opacity: 0.8 }}>
            Seasonal color palette
          </p>
        </div>
      </LiquidGlassCard>
    ))}
    
    {/* Special features */}
    <LiquidGlassCard variant="medium" interactive animated tabIndex={0}>
      <div style={{ padding: '1.5rem', textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Interactive + Animated</h4>
        <p style={{ margin: '0', fontSize: '0.9rem', opacity: 0.8 }}>
          Hover and keyboard navigation
        </p>
      </div>
    </LiquidGlassCard>
    
    <LiquidGlassCard effect={{ blur: 40, opacity: 0.25, saturation: 3 }}>
      <div style={{ padding: '1.5rem', textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Custom Effect</h4>
        <p style={{ margin: '0', fontSize: '0.9rem', opacity: 0.8 }}>
          Extreme blur and saturation
        </p>
      </div>
    </LiquidGlassCard>
  </div>
)

// Performance monitoring example
export const WithPerformanceMetrics = () => {
  const [metrics, setMetrics] = React.useState<any>(null)
  
  return (
    <div style={{ padding: '2rem' }}>
      <LiquidGlassCard 
        variant="medium" 
        interactive 
        animated
        onPerformanceMetrics={setMetrics}
        tabIndex={0}
      >
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Performance Monitoring</h3>
          <p style={{ margin: '0 0 1rem 0' }}>
            This card reports performance metrics in real-time.
          </p>
          {metrics && (
            <div style={{ 
              background: 'rgba(0,0,0,0.1)', 
              padding: '1rem', 
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontFamily: 'monospace'
            }}>
              <div>Render Time: {metrics.renderTime?.toFixed(2)}ms</div>
              <div>Animation Frames: {metrics.animationFrames}</div>
              <div>GPU Accelerated: {metrics.gpuAccelerated ? 'Yes' : 'No'}</div>
              <div>Backdrop Supported: {metrics.backdropSupported ? 'Yes' : 'No'}</div>
            </div>
          )}
        </div>
      </LiquidGlassCard>
    </div>
  )
}