# Coding Standards & Conventions - Artistic Blog Site

## Japanese Aesthetic Implementation Standards

This document establishes coding standards and conventions for implementing the artistic blog site with authentic Japanese aesthetic principles and modern web technologies.

## TypeScript Configuration Standards

### Strict Type Safety Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "esModuleInterop": true,
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
      "@/aesthetics/*": ["./src/aesthetics/*"],
      "@/animations/*": ["./src/animations/*"],
      "@/japanese/*": ["./src/japanese/*"],
      "@/iiif/*": ["./src/iiif/*"],
      "@/three/*": ["./src/three/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Type Definitions for Japanese Aesthetics

```typescript
// src/types/japanese-aesthetics.ts

/** 
 * Ma (間) - Negative space and timing principles
 */
export type MaDensity = 'minimal' | 'comfortable' | 'generous' | 'expansive';

export interface MaSpacingConfig {
  density: MaDensity;
  responsive: boolean;
  direction: 'horizontal' | 'vertical' | 'both';
  contextual: boolean;
}

export interface MaTimingConfig {
  pause: number; // in milliseconds
  breath: number; // breathing room duration
  anticipation: number; // pre-animation timing
}

/**
 * Wabi-sabi (侘寂) - Beauty in imperfection
 */
export type ImperfectionLevel = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5;

export interface WabiSabiConfig {
  imperfectionLevel: ImperfectionLevel;
  organicVariation: boolean;
  temporalEffects: boolean;
  asymmetry: boolean;
  weathering: boolean;
}

export interface WabiSabiTransform {
  translateX: number;
  translateY: number;
  rotate: number;
  scale: number;
  opacity: number;
}

/**
 * Kanso (簡素) - Simplicity and minimalism
 */
export type KansoLevel = 'essential' | 'minimal' | 'clean' | 'sparse';

export interface KansoConfig {
  level: KansoLevel;
  progressiveDisclosure: boolean;
  visualNoise: 'none' | 'subtle' | 'moderate';
  contentHierarchy: 'strict' | 'flexible';
}

/**
 * Japanese Seasonal Themes
 */
export type JapaneseSeason = 'spring' | 'summer' | 'autumn' | 'winter';

export interface SeasonalTheme {
  season: JapaneseSeason;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  culturalElements: string[];
}

/**
 * Animation Performance Requirements
 */
export interface AnimationPerformance {
  targetFPS: 60;
  maxMemoryUsage: number; // in MB
  deviceOptimization: boolean;
  motionPreferences: boolean;
}
```

## Component Architecture Standards

### Japanese Aesthetic Component Structure

```typescript
// Base aesthetic component interface
export interface JapaneseAestheticComponent {
  ma?: MaSpacingConfig;
  wabiSabi?: WabiSabiConfig;
  kanso?: KansoConfig;
  seasonal?: boolean;
  culturalContext?: string;
}

// Example component implementation
interface MaLayoutProps extends JapaneseAestheticComponent {
  children: React.ReactNode;
  element?: keyof HTMLElementTagNameMap;
  className?: string;
  testId?: string;
}

export const MaLayout: React.FC<MaLayoutProps> = ({
  children,
  ma = { density: 'comfortable', responsive: true, direction: 'both', contextual: true },
  element: Element = 'div',
  className = '',
  testId,
  ...props
}) => {
  const spacingClasses = useMaSpacing(ma);
  const combinedClassName = `${spacingClasses} ${className}`.trim();

  return (
    <Element 
      className={combinedClassName}
      data-testid={testId}
      data-ma-density={ma.density}
      {...props}
    >
      {children}
    </Element>
  );
};
```

## File Organization Standards

### Directory Structure

```
src/
├── aesthetics/          # Japanese aesthetic implementations
│   ├── ma/             # Ma (spacing) related components
│   ├── wabi-sabi/      # Wabi-sabi animation components
│   ├── kanso/          # Kanso minimalism components
│   └── seasonal/       # Seasonal theme components
├── animations/         # Animation library integrations
│   ├── framer-motion/  # Framer Motion specific components
│   ├── gsap/          # GSAP animations
│   ├── react-spring/  # React Spring components
│   ├── lottie/        # Lottie animations
│   └── orchestrator/  # Animation coordination
├── components/         # Reusable UI components
│   ├── layout/        # Layout components
│   ├── gallery/       # Gallery and art display
│   ├── forms/         # Form components
│   └── navigation/    # Navigation components
├── japanese/          # Japanese cultural implementations
│   ├── colors/        # Traditional color palettes
│   ├── typography/    # Japanese typography
│   ├── patterns/      # Traditional patterns
│   └── calendar/      # Japanese seasonal calendar
├── iiif/             # IIIF image handling
│   ├── viewer/        # IIIF image viewers
│   ├── manifest/      # Manifest handling
│   └── deep-zoom/     # Deep zoom functionality
├── three/            # Three.js 3D components
│   ├── gallery/       # Virtual gallery scenes
│   ├── webxr/        # WebXR/VR functionality
│   └── optimization/ # Performance optimization
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
└── test/             # Testing utilities and helpers
```

### File Naming Conventions

1. **Components**: PascalCase with descriptive names
   - `MaSpacingLayout.tsx`
   - `WabiSabiAnimation.tsx`
   - `KansoCard.tsx`
   - `SeasonalThemeProvider.tsx`

2. **Hooks**: camelCase starting with 'use'
   - `useMaSpacing.ts`
   - `useWabiSabiVariation.ts`
   - `useJapaneseSeason.ts`

3. **Utilities**: camelCase with clear purpose
   - `calculateMaSpacing.ts`
   - `generateWabiSabiTransform.ts`
   - `japaneseColorPalette.ts`

4. **Types**: kebab-case with descriptive names
   - `japanese-aesthetics.ts`
   - `animation-performance.ts`
   - `iiif-manifest.ts`

## Code Style Guidelines

### ESLint Configuration

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "@typescript-eslint/recommended-requiring-type-checking"
  ],
  "plugins": ["@typescript-eslint", "japanese-aesthetics"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/prefer-readonly": "error",
    "japanese-aesthetics/ma-spacing-consistency": "error",
    "japanese-aesthetics/wabi-sabi-bounds": "warn",
    "japanese-aesthetics/kanso-simplicity": "warn",
    "prefer-const": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "arrow-body-style": ["error", "as-needed"],
    "prefer-template": "error"
  },
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

### Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "quoteProps": "as-needed"
}
```

## Japanese Cultural Implementation Standards

### Color Palette Standards

```typescript
// src/japanese/colors/traditional-colors.ts

/**
 * Traditional Japanese color palette with cultural significance
 * All colors include cultural context and seasonal associations
 */
export const JapaneseColors = {
  // Spring Colors (春の色)
  spring: {
    sakuraPink: {
      hex: '#FFB6C1',
      rgb: 'rgb(255, 182, 193)',
      cultural: 'Cherry blossom pink - symbol of renewal and beauty',
      season: 'spring',
      cssVar: '--color-sakura-pink'
    },
    wakamidori: {
      hex: '#98FB98',
      rgb: 'rgb(152, 251, 152)',
      cultural: 'Young green - fresh growth and new beginnings',
      season: 'spring',
      cssVar: '--color-wakamidori'
    }
  },
  
  // Summer Colors (夏の色)
  summer: {
    natsuMidori: {
      hex: '#228B22',
      rgb: 'rgb(34, 139, 34)',
      cultural: 'Summer green - lush vegetation and growth',
      season: 'summer',
      cssVar: '--color-natsu-midori'
    },
    ajisaiPurple: {
      hex: '#9370DB',
      rgb: 'rgb(147, 112, 219)',
      cultural: 'Hydrangea purple - rainy season beauty',
      season: 'summer',
      cssVar: '--color-ajisai-purple'
    }
  },
  
  // Autumn Colors (秋の色)
  autumn: {
    momijiRed: {
      hex: '#DC143C',
      rgb: 'rgb(220, 20, 60)',
      cultural: 'Maple red - autumn foliage and transience',
      season: 'autumn',
      cssVar: '--color-momiji-red'
    },
    ginkgoYellow: {
      hex: '#FFD700',
      rgb: 'rgb(255, 215, 0)',
      cultural: 'Ginkgo yellow - autumn transformation',
      season: 'autumn',
      cssVar: '--color-ginkgo-yellow'
    }
  },
  
  // Winter Colors (冬の色)
  winter: {
    yukiShiro: {
      hex: '#FFFAFA',
      rgb: 'rgb(255, 250, 250)',
      cultural: 'Snow white - purity and silence',
      season: 'winter',
      cssVar: '--color-yuki-shiro'
    },
    fujiPurple: {
      hex: '#B0C4DE',
      rgb: 'rgb(176, 196, 222)',
      cultural: 'Wisteria purple - quiet elegance',
      season: 'winter',
      cssVar: '--color-fuji-purple'
    }
  }
} as const;

export type JapaneseColorKey = keyof typeof JapaneseColors;
export type SeasonalColors = typeof JapaneseColors[JapaneseColorKey];
```

### Typography Standards

```typescript
// src/japanese/typography/japanese-fonts.ts

export interface JapaneseFontConfig {
  family: string;
  weight: number | string;
  style: 'normal' | 'italic';
  writingMode?: 'horizontal-tb' | 'vertical-rl' | 'vertical-lr';
  textOrientation?: 'mixed' | 'upright' | 'sideways';
  culturalContext: string;
}

export const JapaneseFonts = {
  // Primary fonts for Japanese text
  notoSansJP: {
    family: 'Noto Sans JP',
    weight: 400,
    style: 'normal',
    culturalContext: 'Modern sans-serif suitable for web display'
  },
  notoSerifJP: {
    family: 'Noto Serif JP',
    weight: 400,
    style: 'normal',
    culturalContext: 'Traditional serif for formal content'
  },
  
  // Decorative fonts for artistic elements
  shipporiMincho: {
    family: 'Shippori Mincho',
    weight: 400,
    style: 'normal',
    culturalContext: 'Traditional mincho style for artistic headings'
  },
  
  // Vertical text configurations
  verticalJapanese: {
    family: 'Noto Sans JP',
    weight: 400,
    style: 'normal',
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
    culturalContext: 'Traditional vertical writing for cultural authenticity'
  }
} as const;
```

## Animation Standards

### Framer Motion Standards

```typescript
// src/animations/framer-motion/standards.ts

/**
 * Standard animation configurations following Japanese aesthetic principles
 */
export const JapaneseAnimationStandards = {
  // Ma-based timing
  maTimings: {
    minimal: { duration: 0.2, ease: 'easeOut' },
    comfortable: { duration: 0.4, ease: 'easeInOut' },
    generous: { duration: 0.8, ease: 'easeOut' },
    expansive: { duration: 1.2, ease: 'easeInOut' }
  },
  
  // Wabi-sabi organic variations
  wabiSabiEasing: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for organic feel
  
  // Kanso simplicity animations
  kansoTransitions: {
    fade: { opacity: [0, 1] },
    slideUp: { y: [20, 0], opacity: [0, 1] },
    scale: { scale: [0.95, 1], opacity: [0, 1] }
  }
};

// Performance-optimized motion components
export const MaMotion = {
  div: motion.div,
  span: motion.span,
  img: motion.img,
  // Add layoutDependency optimization
  withLayout: (Component: motion.ComponentType, dependency: unknown) =>
    React.forwardRef((props, ref) => (
      <Component ref={ref} layout layoutDependency={dependency} {...props} />
    ))
};
```

### Animation Performance Standards

```typescript
// src/animations/performance-standards.ts

export interface AnimationPerformanceMetrics {
  targetFPS: 60;
  maxDuration: number; // Maximum animation duration in ms
  maxConcurrentAnimations: number;
  memoryThreshold: number; // MB
  cpuThreshold: number; // Percentage
}

export const PerformanceStandards: AnimationPerformanceMetrics = {
  targetFPS: 60,
  maxDuration: 2000, // 2 seconds max
  maxConcurrentAnimations: 5,
  memoryThreshold: 100, // 100MB
  cpuThreshold: 70 // 70% CPU usage
};

// Performance monitoring hook
export const useAnimationPerformance = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      // Monitor frame timing and memory usage
      const entries = list.getEntries();
      // Implementation details...
    });
    
    observer.observe({ entryTypes: ['measure', 'navigation'] });
    
    return () => observer.disconnect();
  }, []);
  
  return metrics;
};
```

## Testing Standards

### Test File Organization

```
src/
├── components/
│   ├── MaLayout/
│   │   ├── MaLayout.tsx
│   │   ├── MaLayout.test.tsx
│   │   ├── MaLayout.stories.tsx
│   │   └── index.ts
│   └── WabiSabiAnimation/
│       ├── WabiSabiAnimation.tsx
│       ├── WabiSabiAnimation.test.tsx
│       ├── WabiSabiAnimation.stories.tsx
│       └── index.ts
```

### Test Naming Conventions

```typescript
// Component tests
describe('MaLayout Component', () => {
  describe('Spacing Calculations', () => {
    test('should apply minimal ma spacing correctly', () => {});
    test('should handle responsive ma spacing', () => {});
  });
  
  describe('Cultural Authenticity', () => {
    test('should follow traditional ma principles', () => {});
    test('should respect seasonal context', () => {});
  });
  
  describe('Performance', () => {
    test('should not trigger unnecessary re-renders', () => {});
    test('should maintain 60fps during animations', () => {});
  });
});
```

## Documentation Standards

### Component Documentation Template

```typescript
/**
 * MaLayout - Spacing layout component following Japanese Ma principles
 * 
 * Ma (間) represents the purposeful use of negative space and timing in Japanese aesthetics.
 * This component applies traditional spacing principles to modern web layouts.
 * 
 * @example
 * ```tsx
 * <MaLayout ma={{ density: 'comfortable', responsive: true }}>
 *   <p>Content with authentic Japanese spacing</p>
 * </MaLayout>
 * ```
 * 
 * @example Seasonal context
 * ```tsx
 * <SeasonalThemeProvider season="autumn">
 *   <MaLayout ma={{ density: 'generous', contextual: true }}>
 *     <h1>Autumn themed content with contextual spacing</h1>
 *   </MaLayout>
 * </SeasonalThemeProvider>
 * ```
 * 
 * @cultural-context
 * Ma is fundamental to Japanese aesthetics, representing the beauty found in emptiness
 * and the rhythm created by the interplay of filled and empty spaces.
 * 
 * @performance
 * - Uses CSS custom properties for efficient spacing calculations
 * - Implements responsive spacing with minimal JavaScript overhead
 * - Supports layout animations with layoutDependency optimization
 * 
 * @accessibility
 * - Maintains proper spacing for screen readers
 * - Supports high contrast mode
 * - Preserves semantic HTML structure
 */
export const MaLayout: React.FC<MaLayoutProps> = ({ ... }) => {
  // Implementation
};
```

## Commit Message Standards

### Conventional Commit Format with Japanese Context

```
<type>[optional scope]: <description> [Japanese context]

[optional body]

[optional footer(s)]
```

Examples:
```
feat(aesthetics): implement Ma spacing system 間の原理に基づく

Add traditional Japanese spacing principles with responsive design
- Density levels: minimal, comfortable, generous, expansive
- Cultural authenticity maintained through CSS custom properties
- Performance optimized with minimal re-renders

Closes #123
```

```
test(wabi-sabi): add organic animation variation tests 侘寂テスト

Comprehensive test suite for Wabi-sabi animation principles
- Imperfection level variations (0.1-0.5)
- Motion preference respect
- Performance benchmarks for organic transforms

Coverage: 95% lines, 90% branches
```

## Code Review Standards

### Review Checklist

#### Japanese Aesthetic Implementation
- [ ] Cultural authenticity verified with research sources
- [ ] Ma spacing follows traditional principles
- [ ] Wabi-sabi variations feel organic and natural
- [ ] Kanso simplicity maintained without over-engineering
- [ ] Seasonal themes respect Japanese cultural calendar

#### Performance Requirements
- [ ] Animations maintain 60fps on target devices
- [ ] Memory usage stays within 100MB threshold
- [ ] CPU usage remains below 70% during peak animation
- [ ] Bundle size impact minimized with code splitting
- [ ] Core Web Vitals targets maintained

#### Accessibility Standards
- [ ] WCAG 2.1 AA compliance verified
- [ ] Screen reader compatibility tested
- [ ] Keyboard navigation functional
- [ ] High contrast mode supported
- [ ] Motion preferences respected

#### Testing Requirements
- [ ] 95% line coverage achieved
- [ ] 90% branch coverage achieved
- [ ] Cultural authenticity tests included
- [ ] Performance benchmarks passing
- [ ] Cross-browser compatibility verified

## Performance Monitoring

### Continuous Performance Testing

```typescript
// src/test/performance-monitoring.ts

export const performanceThresholds = {
  firstContentfulPaint: 2000, // 2 seconds
  largestContentfulPaint: 2500, // 2.5 seconds
  cumulativeLayoutShift: 0.1,
  firstInputDelay: 100, // 100ms
  animationFrameRate: 60 // FPS
};

export const monitorPerformance = () => {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      // Log performance metrics
      // Alert on threshold violations
      // Report to analytics
    });
  });
  
  observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
};
```

These coding standards ensure authentic Japanese aesthetic implementation while maintaining modern web development best practices and performance requirements.