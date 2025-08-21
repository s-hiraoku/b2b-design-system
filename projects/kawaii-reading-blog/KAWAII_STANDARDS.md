# Kawaii Reading Blog - Coding Standards & Guidelines

## Kawaii Development Philosophy

### Core Principles
The kawaii-reading-blog embodies the Japanese concept of "kawaii" (cute/adorable) through thoughtful design, delightful animations, and user-centric experiences. Every component must evoke joy while maintaining professional functionality and accessibility standards.

### Design Aesthetics
- **Softness**: Rounded corners, gentle shadows, flowing animations
- **Playfulness**: Subtle bounce effects, cheerful color transitions
- **Approachability**: Friendly error messages, encouraging feedback
- **Harmony**: Balanced layouts with breathing room (Ma - 間)

## TypeScript Coding Standards

### Strict Configuration Requirements
```typescript
// tsconfig.json - Mandatory strict settings
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### Kawaii-Specific Type Definitions
```typescript
// types/kawaii.ts - Core kawaii type system
export type KawaiiVariant = 'primary' | 'secondary' | 'accent' | 'neutral';
export type KawaiiSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type KawaiiAnimation = 'bounce' | 'float' | 'wiggle' | 'pulse' | 'none';

export interface KawaiiColorPalette {
  readonly 50: string;   // Lightest shade
  readonly 100: string;
  readonly 200: string;
  readonly 300: string;
  readonly 400: string;
  readonly 500: string;  // Base color
  readonly 600: string;
  readonly 700: string;
  readonly 800: string;
  readonly 900: string;  // Darkest shade
}

export interface KawaiiComponentProps {
  /** Kawaii visual variant affecting colors and styling */
  variant?: KawaiiVariant;
  /** Size preset for consistent spacing and typography */
  size?: KawaiiSize;
  /** Animation preset for delightful interactions */
  animation?: KawaiiAnimation;
  /** Additional CSS classes for customization */
  className?: string;
  /** Test identifier for reliable testing */
  'data-testid'?: string;
  /** Accessibility label for screen readers */
  'aria-label'?: string;
}

export interface KawaiiAnimationConfig {
  /** Animation duration in milliseconds (max 500ms) */
  duration: number;
  /** CSS easing function for smooth transitions */
  easing: string;
  /** Delay before animation starts */
  delay?: number;
  /** Number of animation iterations */
  repeat?: number | 'infinite';
  /** Whether animation respects reduced motion preference */
  respectsReducedMotion: boolean;
}
```

### Component Architecture Patterns

#### Base Kawaii Component Template
```typescript
// components/kawaii/BaseKawaiiComponent.tsx
import { forwardRef, useMemo } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { KawaiiComponentProps, KawaiiAnimationConfig } from '@/types/kawaii';

interface BaseKawaiiComponentProps extends KawaiiComponentProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const BaseKawaiiComponent = forwardRef<
  HTMLDivElement,
  BaseKawaiiComponentProps
>(({
  variant = 'primary',
  size = 'md',
  animation = 'bounce',
  className = '',
  children,
  onClick,
  disabled = false,
  'data-testid': testId,
  'aria-label': ariaLabel
}, ref) => {
  const prefersReducedMotion = useReducedMotion();
  
  const animationConfig = useMemo((): KawaiiAnimationConfig => ({
    duration: prefersReducedMotion ? 0 : 250,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    respectsReducedMotion: true
  }), [prefersReducedMotion]);

  const variantClasses = useMemo(() => ({
    primary: 'bg-gradient-to-r from-pink-400 to-pink-500 text-white',
    secondary: 'bg-gradient-to-r from-blue-400 to-blue-500 text-white',
    accent: 'bg-gradient-to-r from-purple-400 to-pink-400 text-white',
    neutral: 'bg-neutral-100 text-neutral-800'
  }), []);

  const sizeClasses = useMemo(() => ({
    xs: 'text-xs px-2 py-1',
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
    xl: 'text-xl px-8 py-4'
  }), []);

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        ref={ref}
        className={cn(
          'rounded-xl font-medium transition-all duration-200',
          'shadow-soft hover:shadow-medium active:shadow-soft',
          'focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'cursor-pointer select-none',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        onClick={disabled ? undefined : onClick}
        data-testid={testId}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        whileHover={
          disabled || prefersReducedMotion 
            ? {} 
            : { scale: 1.02, y: -1 }
        }
        whileTap={
          disabled || prefersReducedMotion 
            ? {} 
            : { scale: 0.98 }
        }
        transition={{
          duration: animationConfig.duration / 1000,
          ease: [0.68, -0.55, 0.265, 1.55]
        }}
      >
        {children}
      </motion.div>
    </LazyMotion>
  );
});

BaseKawaiiComponent.displayName = 'BaseKawaiiComponent';
```

#### Kawaii Hook Pattern
```typescript
// hooks/useKawaiiAnimation.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';
import type { KawaiiAnimationConfig } from '@/types/kawaii';

export interface UseKawaiiAnimationOptions {
  /** Animation configuration object */
  config: KawaiiAnimationConfig;
  /** Whether animation should auto-start */
  autoStart?: boolean;
  /** Callback when animation completes */
  onComplete?: () => void;
}

export const useKawaiiAnimation = ({
  config,
  autoStart = false,
  onComplete
}: UseKawaiiAnimationOptions) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationId, setAnimationId] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const onCompleteRef = useRef(onComplete);

  // Update callback ref
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const startAnimation = useCallback(() => {
    if (prefersReducedMotion) {
      // Skip animation but still call completion callback
      onCompleteRef.current?.();
      return;
    }

    setIsAnimating(true);
    
    const id = window.setTimeout(() => {
      setIsAnimating(false);
      setAnimationId(null);
      onCompleteRef.current?.();
    }, config.duration);

    setAnimationId(id);
  }, [config.duration, prefersReducedMotion]);

  const stopAnimation = useCallback(() => {
    if (animationId !== null) {
      clearTimeout(animationId);
      setAnimationId(null);
      setIsAnimating(false);
    }
  }, [animationId]);

  // Auto-start animation if requested
  useEffect(() => {
    if (autoStart) {
      startAnimation();
    }
  }, [autoStart, startAnimation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationId !== null) {
        clearTimeout(animationId);
      }
    };
  }, [animationId]);

  return {
    isAnimating,
    startAnimation,
    stopAnimation,
    prefersReducedMotion
  };
};
```

## Performance Standards

### Animation Performance Requirements
```typescript
// lib/performance/kawaii-performance.ts
export const KAWAII_PERFORMANCE_STANDARDS = {
  /** Minimum frame rate for all animations */
  MIN_FRAME_RATE: 60,
  /** Maximum animation duration for micro-interactions */
  MAX_ANIMATION_DURATION: 500,
  /** Maximum bundle size increase per kawaii component */
  MAX_BUNDLE_INCREASE: 10000, // 10KB
  /** Maximum memory usage for particle systems */
  MAX_PARTICLE_MEMORY: 50000000, // 50MB
} as const;

export class KawaiiPerformanceMonitor {
  private frameCount = 0;
  private lastFrameTime = 0;
  private monitoring = false;

  startMonitoring(): void {
    this.monitoring = true;
    this.frameCount = 0;
    this.lastFrameTime = performance.now();
    this.measureFrameRate();
  }

  stopMonitoring(): number {
    this.monitoring = false;
    const duration = (performance.now() - this.lastFrameTime) / 1000;
    return this.frameCount / duration; // Average FPS
  }

  private measureFrameRate = (): void => {
    if (!this.monitoring) return;
    
    this.frameCount++;
    requestAnimationFrame(this.measureFrameRate);
  };

  validatePerformance(frameRate: number): boolean {
    return frameRate >= KAWAII_PERFORMANCE_STANDARDS.MIN_FRAME_RATE;
  }
}
```

### Bundle Optimization Guidelines
```typescript
// lib/optimization/bundle-optimization.ts
import { lazy, ComponentType } from 'react';
import type { KawaiiComponentProps } from '@/types/kawaii';

// Lazy load heavy kawaii components
export const lazyKawaiiComponent = <T extends KawaiiComponentProps>(
  componentImport: () => Promise<{ default: ComponentType<T> }>
) => {
  return lazy(componentImport);
};

// Example usage
export const KawaiiAnimatedBackground = lazyKawaiiComponent(
  () => import('@/components/kawaii/KawaiiAnimatedBackground')
);

export const KawaiiParticleSystem = lazyKawaiiComponent(
  () => import('@/components/kawaii/KawaiiParticleSystem')
);
```

## Accessibility Standards

### WCAG 2.1 AA Compliance
```typescript
// lib/accessibility/kawaii-accessibility.ts
export const KAWAII_ACCESSIBILITY_STANDARDS = {
  /** Minimum color contrast ratio for normal text */
  MIN_CONTRAST_NORMAL: 4.5,
  /** Minimum color contrast ratio for large text */
  MIN_CONTRAST_LARGE: 3.0,
  /** Maximum animation duration without controls */
  MAX_AUTO_ANIMATION: 5000,
  /** Minimum touch target size (CSS pixels) */
  MIN_TOUCH_TARGET: 44,
} as const;

export const validateColorContrast = (
  foreground: string, 
  background: string
): boolean => {
  // Implementation would calculate actual contrast ratio
  // This is a simplified version for demonstration
  const contrast = calculateContrastRatio(foreground, background);
  return contrast >= KAWAII_ACCESSIBILITY_STANDARDS.MIN_CONTRAST_NORMAL;
};

export const createAccessibleKawaiiProps = (
  baseProps: KawaiiComponentProps
): KawaiiComponentProps & { 
  'aria-label': string;
  role?: string;
  tabIndex?: number;
} => {
  return {
    ...baseProps,
    'aria-label': baseProps['aria-label'] || 'Kawaii interactive element',
    role: 'button',
    tabIndex: 0
  };
};
```

### Reduced Motion Support
```typescript
// hooks/useReducedMotion.ts
import { useEffect, useState } from 'react';

export const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
};
```

## Error Handling Standards

### Kawaii Error Messages
```typescript
// lib/errors/kawaii-errors.ts
export interface KawaiiError {
  type: 'validation' | 'network' | 'animation' | 'system';
  message: string;
  kawaiiMessage: string;
  recovery?: () => void;
  timestamp: number;
}

export const KAWAII_ERROR_MESSAGES = {
  validation: {
    required: '何か入力が足りないみたい... 🤔 確認してみてね！',
    email: 'メールアドレスの形式が違うかも... 📧 もう一度チェックしてね！',
    password: 'パスワードがちょっと短いかな... 🔐 もう少し長めにしてみて！'
  },
  network: {
    offline: 'インターネット接続が調子悪いみたい... 💔 少し待ってもう一度試してね！',
    timeout: 'ちょっと時間がかかりすぎてるかも... ⏰ もう一度試してみて！',
    server: 'サーバーでトラブルが発生してるみたい... 😅 少し後でまた来てくれる？'
  },
  animation: {
    performance: 'アニメーションが重くなってる... 🐌 設定でアニメーションを減らしてみて！',
    support: 'お使いのブラウザではこのアニメーションに対応してないみたい... 🌐'
  },
  system: {
    generic: '予期しない問題が発生しました... 😰 ページを更新してみてくれる？'
  }
} as const;

export const createKawaiiError = (
  type: KawaiiError['type'],
  technicalMessage: string,
  userMessageKey: string
): KawaiiError => {
  const kawaiiMessage = getNestedValue(KAWAII_ERROR_MESSAGES, userMessageKey) 
    || KAWAII_ERROR_MESSAGES.system.generic;
    
  return {
    type,
    message: technicalMessage,
    kawaiiMessage,
    timestamp: Date.now()
  };
};

// Helper function to get nested object values safely
const getNestedValue = (obj: any, path: string): string | undefined => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};
```

### Error Boundary Implementation
```typescript
// components/kawaii/KawaiiErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { KawaiiCard } from './KawaiiCard';
import { KawaiiButton } from './KawaiiButton';
import type { KawaiiError } from '@/lib/errors/kawaii-errors';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class KawaiiErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Kawaii Error Boundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
    
    // Send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // reportError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-50 to-blue-50">
          <KawaiiCard className="max-w-md w-full text-center">
            <div className="text-6xl mb-4">😅</div>
            <h2 className="text-xl font-semibold text-neutral-800 mb-2">
              おっと！問題が発生しました
            </h2>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              申し訳ございません。予期しない問題が発生しました。
              ページを再読み込みして、もう一度お試しください。
            </p>
            <KawaiiButton
              variant="primary"
              size="md"
              onClick={() => window.location.reload()}
              className="w-full"
              data-testid="kawaii-error-reload-button"
            >
              ページを再読み込み 🔄
            </KawaiiButton>
          </KawaiiCard>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## File Organization Standards

### Component Structure
```
src/components/kawaii/
├── base/                    # Base kawaii components
│   ├── BaseKawaiiComponent.tsx
│   └── BaseKawaiiComponent.test.tsx
├── buttons/                 # Button variants
│   ├── KawaiiButton.tsx
│   ├── KawaiiFloatingActionButton.tsx
│   └── __tests__/
├── cards/                   # Card components
│   ├── KawaiiCard.tsx
│   ├── KawaiiBookCard.tsx
│   └── __tests__/
├── forms/                   # Form components
│   ├── KawaiiInput.tsx
│   ├── KawaiiTextarea.tsx
│   └── __tests__/
├── feedback/                # User feedback
│   ├── KawaiiToast.tsx
│   ├── KawaiiModal.tsx
│   └── __tests__/
├── animations/              # Animation components
│   ├── KawaiiParticleSystem.tsx
│   ├── KawaiiLoadingSpinner.tsx
│   └── __tests__/
└── layout/                  # Layout components
    ├── KawaiiHeader.tsx
    ├── KawaiiSidebar.tsx
    └── __tests__/
```

### Naming Conventions
- **Components**: PascalCase with "Kawaii" prefix (`KawaiiButton.tsx`)
- **Hooks**: camelCase with "use" prefix (`useKawaiiAnimation.ts`)
- **Utilities**: camelCase (`kawaiiColorHelpers.ts`)
- **Types**: PascalCase with descriptive names (`KawaiiComponentProps`)
- **Constants**: SCREAMING_SNAKE_CASE (`KAWAII_COLOR_PALETTE`)

## Code Quality Guidelines

### ESLint Configuration
```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "@typescript-eslint/recommended-requiring-type-checking"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/prefer-const": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/prop-types": "off",
    "kawaii/consistent-animation-duration": "warn",
    "kawaii/accessibility-labels": "error",
    "kawaii/performance-budget": "warn"
  }
}
```

### Prettier Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### Pre-commit Hooks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged && npm run type-check",
      "pre-push": "npm run test:coverage && npm run build"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "vitest related --run"
    ]
  }
}
```

## Documentation Standards

### Component Documentation Template
```typescript
/**
 * KawaiiButton - A delightful button component with kawaii aesthetics
 * 
 * Features:
 * - Soft pastel color gradients with accessibility compliance
 * - Bounce animation on hover (respects reduced motion preferences)
 * - Built-in loading state with kawaii spinner
 * - Full keyboard navigation support
 * - Touch-optimized for mobile devices
 * 
 * Performance:
 * - Maintains 60fps animations through GPU acceleration
 * - Lazy-loaded animations reduce initial bundle size
 * - Optimized for Core Web Vitals compliance
 * 
 * Accessibility:
 * - WCAG 2.1 AA compliant color contrast
 * - Proper ARIA labels and roles
 * - Keyboard navigation support
 * - Screen reader friendly
 * 
 * @example
 * ```tsx
 * // Primary kawaii button
 * <KawaiiButton variant="primary" onClick={handleClick}>
 *   Click me! ✨
 * </KawaiiButton>
 * 
 * // Loading state
 * <KawaiiButton loading disabled>
 *   Processing...
 * </KawaiiButton>
 * ```
 */
```

---

## Implementation Checklist

### For Every Kawaii Component:
- ✅ Follow TDD methodology (Red-Green-Refactor)
- ✅ Implement performance monitoring (60fps requirement)
- ✅ Include accessibility features (WCAG 2.1 AA)
- ✅ Support reduced motion preferences
- ✅ Add comprehensive test coverage (95%+)
- ✅ Document with examples and usage guidelines
- ✅ Validate with kawaii design principles
- ✅ Optimize for mobile-first experience

### Quality Gates:
- ✅ TypeScript strict mode compliance
- ✅ ESLint and Prettier validation
- ✅ Test coverage thresholds met
- ✅ Performance budget compliance
- ✅ Accessibility audit passed
- ✅ Visual regression testing approved
- ✅ Bundle size impact assessed

---

This comprehensive coding standards document ensures consistent, high-quality, and delightfully kawaii components while maintaining professional development practices and accessibility compliance.