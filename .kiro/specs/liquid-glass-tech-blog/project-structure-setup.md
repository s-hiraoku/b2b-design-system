# Project Structure Setup - Liquid Glass Tech Blog

## Critical Implementation Directory Requirements

**⚠️ IMPORTANT: ALL CODE IMPLEMENTATION MUST BE CREATED IN THE `projects/liquid-glass-tech-blog/` DIRECTORY STRUCTURE**

**NEVER** create implementation files in `.kiro/specs/` directory - that is ONLY for specifications.

## Required Project Directory Structure

```
projects/liquid-glass-tech-blog/
├── src/
│   ├── app/                        # Next.js 15 App Router
│   │   ├── layout.tsx              # Root layout with theme provider
│   │   ├── page.tsx                # Homepage with featured articles
│   │   ├── blog/
│   │   │   ├── page.tsx            # Blog listing page
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Individual blog post
│   │   ├── showcase/
│   │   │   ├── page.tsx            # Effect showcase gallery
│   │   │   └── [effectName]/
│   │   │       └── page.tsx        # Individual effect demo
│   │   ├── admin/
│   │   │   ├── layout.tsx          # Admin-only layout with auth
│   │   │   ├── page.tsx            # Admin dashboard
│   │   │   └── editor/
│   │   │       └── page.tsx        # Real-time effect editor
│   │   └── api/
│   │       ├── ai/
│   │       │   └── generate-image/
│   │       │       └── route.ts    # AI image generation endpoint
│   │       ├── weather/
│   │       │   └── route.ts        # Weather data endpoint
│   │       └── auth/
│   │           └── route.ts        # Admin authentication
│   ├── components/
│   │   ├── liquid-glass/           # Core glassmorphism components
│   │   │   ├── LiquidGlassCard.tsx
│   │   │   ├── ParticleSystem.tsx
│   │   │   ├── EffectEditor.tsx
│   │   │   ├── SeasonalThemeProvider.tsx
│   │   │   └── index.ts            # Component exports
│   │   ├── blog/                   # Blog-specific components
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── ArticleContent.tsx
│   │   │   ├── EyeCatchImage.tsx
│   │   │   ├── TagCloud.tsx
│   │   │   └── SearchBar.tsx
│   │   ├── showcase/               # Effect demonstration components
│   │   │   ├── EffectGallery.tsx
│   │   │   ├── EffectDemo.tsx
│   │   │   ├── CodePreview.tsx
│   │   │   └── LiveEditor.tsx
│   │   ├── admin/                  # Admin interface components
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── EffectEditor.tsx
│   │   │   ├── ImageGenerator.tsx
│   │   │   └── ThemeCustomizer.tsx
│   │   ├── layout/                 # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   └── ui/                     # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       ├── Loading.tsx
│   │       └── ErrorBoundary.tsx
│   ├── lib/
│   │   ├── theme/                  # Seasonal theme management
│   │   │   ├── seasonalTheme.ts
│   │   │   ├── themeConfig.ts
│   │   │   ├── weatherIntegration.ts
│   │   │   └── colorPalettes.ts
│   │   ├── ai/                     # AI image generation services
│   │   │   ├── dalleService.ts
│   │   │   ├── leonardoService.ts
│   │   │   ├── imageProcessor.ts
│   │   │   └── aiServiceManager.ts
│   │   ├── mdx/                    # MDX content processing
│   │   │   ├── mdxProcessor.ts
│   │   │   ├── customComponents.tsx
│   │   │   ├── syntaxHighlight.ts
│   │   │   └── contentValidator.ts
│   │   ├── performance/            # Performance monitoring
│   │   │   ├── performanceMonitor.ts
│   │   │   ├── metricsCollector.ts
│   │   │   ├── fpsTracker.ts
│   │   │   └── memoryProfiler.ts
│   │   ├── weather/                # Weather API integration
│   │   │   ├── weatherService.ts
│   │   │   ├── locationDetector.ts
│   │   │   └── weatherCache.ts
│   │   ├── auth/                   # Authentication system
│   │   │   ├── adminAuth.ts
│   │   │   ├── sessionManager.ts
│   │   │   └── permissions.ts
│   │   ├── storage/                # Data persistence
│   │   │   ├── localStorage.ts
│   │   │   ├── contentStore.ts
│   │   │   └── imageStore.ts
│   │   └── utils/                  # General utilities
│   │       ├── animation.ts
│   │       ├── deviceDetection.ts
│   │       ├── colorUtils.ts
│   │       ├── dateUtils.ts
│   │       └── constants.ts
│   ├── styles/
│   │   ├── globals.css             # Global styles and CSS variables
│   │   ├── liquid-glass.css        # Liquid glass effect styles
│   │   ├── seasonal-themes.css     # Seasonal theme definitions
│   │   ├── animations.css          # Custom animations and keyframes
│   │   └── components/             # Component-specific styles
│   │       ├── blog.css
│   │       ├── showcase.css
│   │       └── admin.css
│   ├── types/
│   │   ├── liquid-glass.ts         # Liquid glass effect types
│   │   ├── content.ts              # Blog and content types
│   │   ├── seasonal.ts             # Theme and weather types
│   │   ├── performance.ts          # Performance monitoring types
│   │   ├── ai.ts                   # AI service types
│   │   └── index.ts                # Type exports
│   ├── hooks/                      # Custom React hooks
│   │   ├── useSeasonalTheme.ts
│   │   ├── useLiquidGlass.ts
│   │   ├── usePerformanceMonitor.ts
│   │   ├── useAIImageGeneration.ts
│   │   ├── useWeatherData.ts
│   │   └── useLocalStorage.ts
│   ├── content/                    # Static content and MDX files
│   │   ├── blog/
│   │   │   ├── 2024/
│   │   │   │   ├── 01-introduction-to-liquid-glass.mdx
│   │   │   │   ├── 02-seasonal-theming-techniques.mdx
│   │   │   │   └── 03-gpu-accelerated-effects.mdx
│   │   │   └── index.ts            # Blog post metadata
│   │   └── showcase/
│   │       ├── basic-glassmorphism.mdx
│   │       ├── seasonal-particles.mdx
│   │       └── advanced-interactions.mdx
│   └── tests/                      # Test files (TDD structure)
│       ├── setup/
│       │   ├── vitest.setup.ts
│       │   ├── playwright.config.ts
│       │   └── test-utils.tsx
│       ├── components/
│       │   ├── liquid-glass/
│       │   │   ├── LiquidGlassCard.test.tsx
│       │   │   ├── ParticleSystem.test.tsx
│       │   │   ├── EffectEditor.test.tsx
│       │   │   └── SeasonalThemeProvider.test.tsx
│       │   ├── blog/
│       │   │   ├── ArticleCard.test.tsx
│       │   │   ├── ArticleContent.test.tsx
│       │   │   └── EyeCatchImage.test.tsx
│       │   └── ui/
│       │       ├── Button.test.tsx
│       │       ├── Modal.test.tsx
│       │       └── ErrorBoundary.test.tsx
│       ├── hooks/
│       │   ├── useSeasonalTheme.test.ts
│       │   ├── useLiquidGlass.test.ts
│       │   └── usePerformanceMonitor.test.ts
│       ├── lib/
│       │   ├── theme/
│       │   │   ├── seasonalTheme.test.ts
│       │   │   └── weatherIntegration.test.ts
│       │   ├── ai/
│       │   │   ├── dalleService.test.ts
│       │   │   ├── leonardoService.test.ts
│       │   │   └── aiServiceManager.test.ts
│       │   └── performance/
│       │       ├── performanceMonitor.test.ts
│       │       └── fpsTracker.test.ts
│       ├── integration/
│       │   ├── blog-workflow.test.tsx
│       │   ├── admin-editor.test.tsx
│       │   ├── seasonal-theme.test.tsx
│       │   └── performance-integration.test.tsx
│       ├── e2e/                    # Playwright E2E tests
│       │   ├── blog-navigation.spec.ts
│       │   ├── effect-showcase.spec.ts
│       │   ├── admin-authentication.spec.ts
│       │   ├── seasonal-transitions.spec.ts
│       │   └── performance-benchmarks.spec.ts
│       ├── performance/            # Performance test suites
│       │   ├── animation-benchmarks.test.ts
│       │   ├── memory-leak-detection.test.ts
│       │   └── core-web-vitals.test.ts
│       ├── accessibility/          # Accessibility test suites
│       │   ├── wcag-compliance.test.ts
│       │   ├── keyboard-navigation.test.ts
│       │   └── screen-reader.test.ts
│       ├── visual/                 # Visual regression tests
│       │   ├── liquid-glass-effects.test.ts
│       │   ├── seasonal-themes.test.ts
│       │   └── responsive-design.test.ts
│       ├── mocks/                  # Test mocks and fixtures
│       │   ├── weatherApi.ts
│       │   ├── aiServices.ts
│       │   ├── localStorage.ts
│       │   └── performanceApi.ts
│       └── fixtures/               # Test data fixtures
│           ├── blogPosts.ts
│           ├── weatherData.ts
│           ├── aiResponses.ts
│           └── performanceMetrics.ts
├── public/                         # Static assets
│   ├── images/
│   │   ├── placeholders/
│   │   │   ├── spring-default.webp
│   │   │   ├── summer-default.webp
│   │   │   ├── autumn-default.webp
│   │   │   └── winter-default.webp
│   │   ├── showcase/
│   │   │   └── effect-previews/
│   │   └── icons/
│   │       ├── seasons/
│   │       └── ui/
│   ├── fonts/                      # Custom fonts
│   └── manifest.json               # PWA manifest
├── docs/                          # Project documentation
│   ├── api/                       # API documentation
│   ├── components/                # Component documentation
│   ├── development/               # Development guides
│   └── deployment/                # Deployment guides
├── package.json                   # Project dependencies
├── package-lock.json              # Dependency lock file
├── next.config.js                 # Next.js configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── vitest.config.ts               # Vitest test configuration
├── playwright.config.ts           # Playwright E2E configuration
├── .env.local                     # Environment variables
├── .env.example                   # Environment variables template
├── .eslintrc.json                 # ESLint configuration
├── .prettierrc                    # Prettier configuration
├── .gitignore                     # Git ignore rules
└── README.md                      # Project documentation
```

## Key Directory Configuration Notes

### Implementation Directory Enforcement
- **Specifications Location**: `.kiro/specs/liquid-glass-tech-blog/` (read-only documentation)
- **Implementation Location**: `projects/liquid-glass-tech-blog/` (all code goes here)
- **Build Output**: `projects/liquid-glass-tech-blog/.next/` (Next.js build artifacts)

### Testing Structure
- **Unit Tests**: Co-located with source files in `src/tests/`
- **Integration Tests**: Grouped by feature in `src/tests/integration/`
- **E2E Tests**: Browser automation in `src/tests/e2e/`
- **Performance Tests**: Benchmarking in `src/tests/performance/`

### Asset Organization
- **AI Generated Images**: `public/images/ai-generated/`
- **Static Assets**: `public/images/static/`
- **Optimized Images**: Auto-generated by Next.js in `.next/static/media/`

### Development Workflow Integration
- **Hot Reload**: All files in `src/` trigger hot reload
- **Type Checking**: TypeScript configuration covers entire `src/` directory
- **Testing**: Vitest watches all files in `src/` and `tests/`
- **Linting**: ESLint rules apply to all TypeScript/React files

## Configuration File Templates

### Next.js Configuration (next.config.js)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@resvg/resvg-js'],
  },
  images: {
    domains: ['oaidalleapiprodscus.blob.core.windows.net', 'cdn.leonardo.ai'],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    LEONARDO_API_KEY: process.env.LEONARDO_API_KEY,
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  },
};

module.exports = nextConfig;
```

### TypeScript Configuration (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

This structure ensures all implementation code is properly organized within the `projects/liquid-glass-tech-blog/` directory while maintaining clear separation from specifications and supporting comprehensive TDD workflows.