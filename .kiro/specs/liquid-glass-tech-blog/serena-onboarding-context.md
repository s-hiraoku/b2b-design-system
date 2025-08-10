# Serena MCP Onboarding Context - Liquid Glass Tech Blog

## Project Overview

**Project Name:** Liquid Glass Tech Blog  
**Type:** Technical Blog Platform  
**Architecture:** Next.js 15 App Router + React 19 Server Components  
**Primary Language:** TypeScript 5.x  
**Development Mode:** Test-Driven Development (TDD)

## Project Identity & Purpose

### Core Mission
The Liquid Glass Tech Blog is a sophisticated technical blog platform specializing in Liquid Glass/Glassmorphism design techniques. It serves as both an educational resource and a showcase platform for advanced UI effects and modern web development practices.

### Target Audience
- UI/UX designers seeking advanced effect implementation knowledge
- Frontend developers learning modern CSS and animation techniques
- Design engineers building component libraries
- Design enthusiasts exploring cutting-edge visual effects

### Unique Value Proposition
- **Dynamic Seasonal Themes**: Weather API integration for real-time theme adaptation
- **AI-Generated Eye-Catch Images**: Multi-provider AI image generation (DALL-E 3 + Leonardo AI)
- **Admin-Only Effect Editor**: Real-time Liquid Glass effect customization with live preview
- **GPU-Accelerated Particle Effects**: 60fps seasonal particle systems with performance monitoring

## Technical Architecture

### Framework Stack
- **Frontend:** Next.js 15 (App Router) + React 19 with TypeScript 5.x
- **Styling:** Tailwind CSS 4 + Custom CSS-in-JS for advanced effects
- **Animation:** Framer Motion + Custom CSS transforms with GPU acceleration
- **Content:** MDX + Custom JSX components for interactive demonstrations
- **Testing:** Vitest + React Testing Library + Playwright for E2E testing
- **AI Services:** OpenAI DALL-E 3 (primary) + Leonardo AI (fallback)
- **Weather Data:** OpenWeatherMap API for seasonal theme triggers

### Performance Requirements
- **Core Web Vitals Compliance:** LCP < 2.5s, INP < 200ms, CLS < 0.1
- **GPU Acceleration:** 60fps animations with hardware acceleration
- **Progressive Enhancement:** Graceful degradation for older browsers
- **Accessibility:** WCAG 2.1 AA compliance with keyboard navigation

## Project Structure & Organization

### Key Directories
```
projects/liquid-glass-tech-blog/
├── src/
│   ├── components/liquid-glass/     # Core glassmorphism effects
│   │   ├── LiquidGlassCard.tsx     # Primary component
│   │   ├── ParticleSystem.tsx      # Seasonal particles
│   │   ├── EffectEditor.tsx        # Admin effect editor
│   │   └── ThemeProvider.tsx       # Seasonal theme context
│   ├── lib/
│   │   ├── theme/                  # Seasonal theme management
│   │   ├── ai/                     # AI image generation services
│   │   ├── mdx/                    # MDX processing engine
│   │   ├── performance/            # Performance monitoring
│   │   └── weather/                # Weather API integration
│   ├── pages/
│   │   ├── api/                    # API routes for AI & weather
│   │   ├── admin/                  # Admin-only editor interface
│   │   ├── blog/                   # Blog post pages
│   │   └── showcase/               # Effect demonstrations
│   ├── types/
│   │   ├── liquid-glass.ts         # Effect type definitions
│   │   ├── content.ts              # Content management types
│   │   ├── seasonal.ts             # Theme and weather types
│   │   └── performance.ts          # Performance monitoring types
│   └── tests/
│       ├── components/             # Component unit tests
│       ├── integration/            # Integration tests
│       ├── e2e/                    # Playwright E2E tests
│       └── performance/            # Performance benchmarks
```

## Development Standards & Patterns

### TDD Methodology
- **Mandatory Test-First Development:** ALL code must be developed using strict TDD approach
- **Red-Green-Refactor Cycles:** Enforced through automated tooling
- **Coverage Requirements:** 95% line coverage, 90% branch coverage, 95% function coverage
- **Testing Framework:** Vitest for unit/integration, Playwright for E2E

### Naming Conventions
- **Components:** PascalCase (e.g., `LiquidGlassCard`, `SeasonalThemeProvider`)
- **Hooks:** camelCase with `use` prefix (e.g., `useSeasonalTheme`, `useLiquidGlass`)
- **Types:** PascalCase with descriptive suffixes (e.g., `LiquidGlassProps`, `SeasonalThemeConfig`)
- **Files:** camelCase for utilities, PascalCase for components
- **CSS Classes:** kebab-case with semantic prefixes (e.g., `liquid-glass-card`, `seasonal-spring`)

### Component Patterns
- **Composition over Inheritance:** Use React composition patterns
- **Props Interface Design:** Explicit type definitions with JSDoc comments
- **Performance Optimization:** React.memo, useMemo, useCallback for expensive operations
- **Error Boundaries:** Graceful fallbacks for effect failures
- **Accessibility First:** ARIA labels, keyboard navigation, screen reader support

### Effect Implementation Standards
- **GPU Acceleration:** Use `transform3d()` and `will-change` for animations
- **CSS Variables:** Dynamic styling with CSS custom properties
- **Backdrop Filters:** Progressive enhancement with fallbacks
- **Seasonal Adaptation:** Dynamic theme switching based on date/weather
- **Performance Monitoring:** Real-time FPS and memory usage tracking

## Core Feature Implementations

### 1. Liquid Glass Effects System
**Primary Component:** `LiquidGlassCard`
- **Variants:** subtle, medium, intense opacity levels
- **Props:** blur, opacity, saturation, interactive, seasonalTheme
- **GPU Acceleration:** backdrop-filter with transform3d optimization
- **Browser Compatibility:** Progressive enhancement with solid color fallbacks

### 2. Seasonal Theme Engine
**Core Hook:** `useSeasonalTheme`
- **Season Detection:** Date-based calculation with 3-day transition periods
- **Time of Day:** Dynamic color gradients based on current hour
- **Weather Integration:** Real-time weather data affects particle density and colors
- **Theme Storage:** localStorage persistence with system preference detection

### 3. AI Eye-Catch Image System
**Service Integration:** Multi-provider AI image generation
- **Primary:** OpenAI DALL-E 3 for high-quality technical imagery
- **Fallback:** Leonardo AI for artistic alternatives
- **Image Processing:** Automatic WebP conversion and optimization
- **CDN Integration:** Cloudinary for global distribution

### 4. Admin Effect Editor
**Real-time Editor:** Live Liquid Glass effect customization
- **Authentication:** Admin-only access with secure session management
- **Live Preview:** Real-time effect parameter adjustment
- **Export System:** CSS code generation for implemented effects
- **Version Control:** Effect history and rollback capabilities

### 5. Performance Monitoring
**Metrics Collection:** Comprehensive performance tracking
- **Core Web Vitals:** LCP, FID, CLS automated monitoring
- **Animation Performance:** FPS tracking with performance degradation alerts
- **Memory Usage:** Particle system memory leak detection
- **User Experience:** Interaction timing and error rate monitoring

## Quality Assurance Framework

### Testing Strategy
- **Unit Tests:** Individual component functionality and edge cases
- **Integration Tests:** Component interaction and data flow validation
- **E2E Tests:** Complete user workflows and cross-browser compatibility
- **Performance Tests:** Animation smoothness and memory leak detection
- **Accessibility Tests:** WCAG compliance and keyboard navigation

### Code Quality Standards
- **TypeScript:** Strict mode with comprehensive type coverage
- **ESLint:** Custom rules for effect performance and accessibility
- **Prettier:** Consistent code formatting across all files
- **Husky:** Pre-commit hooks for testing and linting
- **SonarQube:** Code quality metrics and technical debt tracking

### Security Considerations
- **Input Sanitization:** MDX content validation and XSS prevention
- **API Security:** Rate limiting and authentication for AI services
- **Content Security Policy:** Strict CSP for external resource loading
- **Admin Authentication:** Secure session management for editor access

## Integration Points & External Services

### AI Image Generation
- **OpenAI DALL-E 3:** Primary image generation service
- **Leonardo AI:** Fallback service for artistic styles
- **Image Optimization:** Automatic WebP conversion and CDN distribution
- **Error Handling:** Graceful degradation with default placeholder images

### Weather API Integration
- **OpenWeatherMap:** Real-time weather data for theme adaptation
- **Location Detection:** IP-based location with user privacy considerations
- **Caching Strategy:** Weather data caching to minimize API calls
- **Fallback Themes:** Default seasonal themes when API unavailable

### Content Management
- **MDX Processing:** Custom JSX component integration
- **Syntax Highlighting:** Code block enhancement for technical content
- **Interactive Demos:** Live code examples with effect previews
- **Content Validation:** Automated content quality checks

## Memory Context for Serena MCP

### Key Symbols to Remember
- `LiquidGlassCard` - Primary effect component with seasonal theming
- `useSeasonalTheme` - Core hook for dynamic theme management
- `ParticleSystem` - GPU-accelerated seasonal particle effects
- `EffectEditor` - Admin-only real-time effect customization
- `AIImageGenerator` - Multi-provider image generation service
- `PerformanceMonitor` - Comprehensive performance tracking system

### Common Patterns to Apply
- TDD-first development with comprehensive test coverage
- GPU-accelerated animations with performance monitoring
- Progressive enhancement for browser compatibility
- Semantic TypeScript with comprehensive JSDoc documentation
- Accessibility-first development with WCAG 2.1 AA compliance
- Dynamic theming with seasonal and time-based adaptations

### Quality Gates to Enforce
- 95% line coverage, 90% branch coverage, 95% function coverage
- Core Web Vitals compliance (LCP < 2.5s, INP < 200ms, CLS < 0.1)
- 60fps animation performance with GPU acceleration
- WCAG 2.1 AA accessibility compliance
- Cross-browser compatibility (Chrome 76+, Firefox 103+, Safari 14+)

This context provides Serena MCP with comprehensive understanding of the Liquid Glass Tech Blog project architecture, development standards, and implementation patterns necessary for intelligent, context-aware code generation throughout the development lifecycle.