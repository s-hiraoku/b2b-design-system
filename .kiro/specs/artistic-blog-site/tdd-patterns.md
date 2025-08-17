# TDD Patterns for Artistic Blog Site

## Japanese Aesthetic TDD Framework

This document establishes Test-Driven Development patterns specifically for implementing Japanese aesthetic principles (Ma, Wabi-sabi, Kanso) with modern animation libraries.

## Project Context for Serena MCP

### Core Technologies
- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript 5.x with strict mode
- **Styling**: Tailwind CSS 4 + Custom Japanese design tokens
- **Animation Libraries**: Framer Motion, GSAP, React Spring, Lottie, Anime.js
- **3D Engine**: Three.js with WebXR support
- **Testing**: Jest + React Testing Library + Playwright
- **Image Processing**: IIIF-compliant image handling

### Japanese Aesthetic Implementation Strategy

#### 1. Ma (間) - Negative Space Testing Patterns

```typescript
// Ma spacing system test pattern
describe('MaSpacing Component', () => {
  test('should calculate ma spacing based on content density', () => {
    const { getByTestId } = render(
      <MaSpacing density="minimal" content="short text">
        <div data-testid="content">Test content</div>
      </MaSpacing>
    );
    
    const element = getByTestId('content');
    expect(element).toHaveStyle({
      margin: 'var(--ma-minimal)',
      padding: 'var(--ma-breathing-room)'
    });
  });

  test('should adjust ma spacing responsively', () => {
    const { container } = render(
      <MaSpacing responsive density="comfortable">
        Content
      </MaSpacing>
    );
    
    expect(container.firstChild).toHaveClass('ma-responsive');
    // Test CSS custom properties for different breakpoints
  });
});
```

#### 2. Wabi-Sabi Animation Testing Patterns

```typescript
// Wabi-sabi imperfection animation test pattern
describe('WabiSabiAnimation Component', () => {
  test('should apply organic animation variations', async () => {
    const { getByTestId } = render(
      <WabiSabiAnimation 
        imperfectionLevel={0.3}
        data-testid="wabi-element"
      >
        <div>Content</div>
      </WabiSabiAnimation>
    );
    
    const element = getByTestId('wabi-element');
    
    // Test that animation includes random variations
    await waitFor(() => {
      const transform = getComputedStyle(element).transform;
      expect(transform).toMatch(/translate\(\d+\.?\d*px, \d+\.?\d*px\)/);
    });
  });

  test('should respect motion preferences', () => {
    // Mock prefers-reduced-motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    const { getByTestId } = render(
      <WabiSabiAnimation data-testid="reduced-motion">
        Content
      </WabiSabiAnimation>
    );

    const element = getByTestId('reduced-motion');
    expect(element).toHaveAttribute('data-motion-reduced', 'true');
  });
});
```

#### 3. Kanso Minimalism Testing Patterns

```typescript
// Kanso minimalist design test pattern
describe('KansoLayout Component', () => {
  test('should progressively disclose content', () => {
    const { getByTestId, queryByTestId } = render(
      <KansoLayout mode="minimal">
        <KansoLayout.Essential data-testid="essential">
          Essential content
        </KansoLayout.Essential>
        <KansoLayout.Secondary data-testid="secondary">
          Secondary content
        </KansoLayout.Secondary>
      </KansoLayout>
    );

    expect(getByTestId('essential')).toBeVisible();
    expect(queryByTestId('secondary')).not.toBeInTheDocument();
  });

  test('should maintain content hierarchy', () => {
    const { container } = render(
      <KansoLayout>
        <h1>Primary</h1>
        <h2>Secondary</h2>
        <p>Content</p>
      </KansoLayout>
    );

    const headings = container.querySelectorAll('h1, h2');
    expect(headings).toHaveLength(2);
    
    // Test visual hierarchy through CSS
    const h1 = container.querySelector('h1');
    const h2 = container.querySelector('h2');
    
    expect(getComputedStyle(h1).fontSize).not.toBe(
      getComputedStyle(h2).fontSize
    );
  });
});
```

## Animation Library Testing Patterns

### Framer Motion TDD Patterns

```typescript
// Framer Motion component testing with nextFrame utility
import { frame } from 'framer-motion';

const nextFrame = () => new Promise<void>((resolve) => {
  frame.postRender(() => resolve());
});

describe('MotionComponent', () => {
  test('should animate opacity on mount', async () => {
    const { getByTestId } = render(
      <motion.div
        data-testid="animated-element"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    );

    const element = getByTestId('animated-element');
    
    // Wait for animation frame
    await nextFrame();
    
    expect(element).toHaveStyle('opacity: 1');
  });

  test('should handle layout animations', async () => {
    const { getByTestId, rerender } = render(
      <motion.div
        data-testid="layout-element"
        layout
        style={{ width: 100 }}
      />
    );

    rerender(
      <motion.div
        data-testid="layout-element"
        layout
        style={{ width: 200 }}
      />
    );

    await nextFrame();
    
    const element = getByTestId('layout-element');
    expect(element).toHaveStyle('width: 200px');
  });
});
```

### Performance Testing Patterns

```typescript
// Animation performance testing
describe('Animation Performance', () => {
  test('should maintain 60fps during animations', async () => {
    const frameCount = 60;
    const frameTimes: number[] = [];
    
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        frameTimes.push(entry.duration);
      });
    });
    
    observer.observe({ entryTypes: ['measure'] });
    
    const { getByTestId } = render(
      <motion.div
        data-testid="performance-test"
        animate={{ x: [0, 100, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    );

    // Allow animation to run for 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    observer.disconnect();
    
    // Calculate average frame time
    const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
    
    // 60fps = 16.67ms per frame
    expect(avgFrameTime).toBeLessThan(16.67);
  });
});
```

## Three.js 3D Testing Patterns

```typescript
// Three.js virtual gallery testing
describe('VirtualGallery Component', () => {
  test('should initialize Three.js scene', () => {
    const { container } = render(<VirtualGallery />);
    
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('data-engine', 'three');
  });

  test('should handle WebGL fallback', () => {
    // Mock WebGL not supported
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue(null);

    const { getByTestId } = render(
      <VirtualGallery fallback={<div data-testid="fallback">2D View</div>} />
    );

    expect(getByTestId('fallback')).toBeInTheDocument();
    
    // Restore original function
    HTMLCanvasElement.prototype.getContext = getContext;
  });

  test('should handle VR interactions', async () => {
    // Mock WebXR support
    Object.defineProperty(navigator, 'xr', {
      value: {
        isSessionSupported: jest.fn().mockResolvedValue(true),
        requestSession: jest.fn().mockResolvedValue({}),
      },
      configurable: true,
    });

    const { getByTestId } = render(<VirtualGallery />);
    
    const vrButton = getByTestId('vr-enter');
    fireEvent.click(vrButton);

    await waitFor(() => {
      expect(navigator.xr.requestSession).toHaveBeenCalledWith('immersive-vr');
    });
  });
});
```

## IIIF Image Testing Patterns

```typescript
// IIIF image handling testing
describe('IIIFImageViewer', () => {
  test('should load IIIF manifest', async () => {
    const mockManifest = {
      '@context': 'http://iiif.io/api/presentation/3/context.json',
      id: 'https://example.com/manifest.json',
      type: 'Manifest',
      items: [{
        id: 'https://example.com/canvas/1',
        type: 'Canvas',
        items: [{
          id: 'https://example.com/annotation/1',
          type: 'AnnotationPage',
          items: [{
            id: 'https://example.com/image/1',
            type: 'Annotation',
            body: {
              id: 'https://example.com/image.jpg',
              type: 'Image',
              service: [{
                id: 'https://example.com/iiif/image',
                type: 'ImageService3'
              }]
            }
          }]
        }]
      }]
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockManifest,
    });

    const { getByTestId } = render(
      <IIIFImageViewer 
        manifestUrl="https://example.com/manifest.json"
        data-testid="iiif-viewer"
      />
    );

    await waitFor(() => {
      const viewer = getByTestId('iiif-viewer');
      expect(viewer).toHaveAttribute('data-manifest-loaded', 'true');
    });
  });

  test('should support deep zoom functionality', async () => {
    const { getByTestId } = render(
      <IIIFImageViewer 
        manifestUrl="https://example.com/manifest.json"
        enableDeepZoom
        data-testid="zoom-viewer"
      />
    );

    const viewer = getByTestId('zoom-viewer');
    const zoomInButton = getByTestId('zoom-in');

    fireEvent.click(zoomInButton);

    await waitFor(() => {
      expect(viewer).toHaveAttribute('data-zoom-level', '2');
    });
  });
});
```

## Cultural Authenticity Testing

```typescript
// Japanese cultural authenticity testing
describe('Cultural Authenticity', () => {
  test('should use authentic Japanese color palettes', () => {
    const { container } = render(
      <JapaneseThemeProvider season="autumn">
        <div className="seasonal-bg">Content</div>
      </JapaneseThemeProvider>
    );

    const element = container.querySelector('.seasonal-bg');
    const bgColor = getComputedStyle(element).backgroundColor;
    
    // Test for autumn colors (momiji red, ginkgo yellow)
    expect(['rgb(220, 20, 60)', 'rgb(255, 215, 0)']).toContainEqual(bgColor);
  });

  test('should respect Japanese typography principles', () => {
    const { container } = render(
      <VerticalText direction="right-to-left">
        縦書きテキスト
      </VerticalText>
    );

    const textElement = container.firstChild;
    expect(textElement).toHaveStyle({
      writingMode: 'vertical-rl',
      textOrientation: 'mixed'
    });
  });
});
```

## Accessibility Testing Patterns

```typescript
// Japanese-aware accessibility testing
describe('Accessibility', () => {
  test('should provide Japanese screen reader support', () => {
    const { getByRole } = render(
      <ArtworkCard
        title="桜の絵"
        titleEn="Cherry Blossom Painting"
        artist="田中太郎"
        artistEn="Taro Tanaka"
      />
    );

    const card = getByRole('article');
    expect(card).toHaveAttribute('aria-label', '桜の絵 by 田中太郎');
    expect(card).toHaveAttribute('aria-labelledby', expect.stringContaining('title'));
  });

  test('should support keyboard navigation for Japanese input', () => {
    const { getByLabelText } = render(
      <SearchForm />
    );

    const searchInput = getByLabelText('作品を検索');
    
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    fireEvent.change(searchInput, { target: { value: 'さくら' } });

    expect(searchInput).toHaveValue('さくら');
  });
});
```

## Performance Benchmarks

```typescript
// Performance benchmarks for animations
describe('Performance Benchmarks', () => {
  test('should meet Core Web Vitals targets', async () => {
    const { container } = render(<HomePage />);
    
    // Test First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcp) {
        expect(fcp.startTime).toBeLessThan(2000); // < 2 seconds
      }
    });
    
    fcpObserver.observe({ entryTypes: ['paint'] });
    
    // Test Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      expect(lastEntry.startTime).toBeLessThan(2500); // < 2.5 seconds
    });
    
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    fcpObserver.disconnect();
    lcpObserver.disconnect();
  });
});
```

## Jest Configuration for Japanese Aesthetics

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(ts|tsx)',
    '<rootDir>/src/**/*.(test|spec).(ts|tsx)',
  ],
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!src/**/*.stories.(ts|tsx)',
    '!src/**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  // Custom matchers for Japanese aesthetics
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/src/test/japanese-matchers.ts'
  ],
};
```

## Custom Jest Matchers

```typescript
// src/test/japanese-matchers.ts
import { expect } from '@jest/globals';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveMaSpacing(): R;
      toShowWabiSabiVariation(): R;
      toFollowKansoMinimalism(): R;
      toRespectJapaneseSeasons(): R;
    }
  }
}

expect.extend({
  toHaveMaSpacing(received) {
    const style = getComputedStyle(received);
    const hasCustomMaProperties = 
      style.getPropertyValue('--ma-spacing') ||
      style.margin.includes('var(--ma-') ||
      style.padding.includes('var(--ma-');
    
    return {
      message: () => 
        hasCustomMaProperties
          ? `Expected element not to have Ma spacing`
          : `Expected element to have Ma spacing properties`,
      pass: hasCustomMaProperties,
    };
  },

  toShowWabiSabiVariation(received) {
    const transform = getComputedStyle(received).transform;
    const hasRandomTransform = transform !== 'none' && 
      transform.includes('translate') &&
      !transform.includes('translate(0px, 0px)');
    
    return {
      message: () => 
        hasRandomTransform
          ? `Expected element not to show Wabi-sabi variation`
          : `Expected element to show subtle Wabi-sabi transform variations`,
      pass: hasRandomTransform,
    };
  },

  toFollowKansoMinimalism(received) {
    const childCount = received.children.length;
    const hasMinimalStyling = getComputedStyle(received).boxShadow === 'none' &&
      getComputedStyle(received).border === 'none';
    
    return {
      message: () => 
        childCount <= 3 && hasMinimalStyling
          ? `Expected element not to follow Kanso minimalism`
          : `Expected element to follow Kanso minimalism (≤3 children, minimal styling)`,
      pass: childCount <= 3 && hasMinimalStyling,
    };
  },

  toRespectJapaneseSeasons(received) {
    const backgroundColor = getComputedStyle(received).backgroundColor;
    const seasonalColors = [
      'rgb(255, 182, 193)', // Spring pink
      'rgb(0, 128, 0)',     // Summer green
      'rgb(220, 20, 60)',   // Autumn red
      'rgb(176, 196, 222)', // Winter blue
    ];
    
    const hasSeasonalColor = seasonalColors.some(color => 
      backgroundColor.includes(color.replace(/rgb\(|\)/g, '').replace(/ /g, ''))
    );
    
    return {
      message: () => 
        hasSeasonalColor
          ? `Expected element not to use Japanese seasonal colors`
          : `Expected element to use authentic Japanese seasonal colors`,
      pass: hasSeasonalColor,
    };
  },
});
```

## TDD Workflow for Japanese Aesthetics

### Red-Green-Refactor Cycle for Ma (間)

1. **Red**: Write test for Ma spacing component
2. **Green**: Implement minimal Ma spacing logic
3. **Refactor**: Optimize for performance and cultural authenticity

### Example Ma Component TDD Cycle

```typescript
// Step 1: RED - Write failing test
test('should calculate Ma spacing based on content density', () => {
  const { container } = render(
    <MaSpacing density="minimal">Content</MaSpacing>
  );
  
  expect(container.firstChild).toHaveMaSpacing();
});

// Step 2: GREEN - Minimal implementation
const MaSpacing = ({ density, children }) => {
  const spacing = density === 'minimal' ? 'var(--ma-minimal)' : 'var(--ma-default)';
  
  return (
    <div style={{ margin: spacing, padding: spacing }}>
      {children}
    </div>
  );
};

// Step 3: REFACTOR - Enhance with responsive design
const MaSpacing = ({ density, responsive, children }) => {
  const getSpacingValue = useCallback((densityLevel) => {
    const spacingMap = {
      minimal: 'var(--ma-minimal)',
      comfortable: 'var(--ma-comfortable)',
      generous: 'var(--ma-generous)',
      expansive: 'var(--ma-expansive)'
    };
    return spacingMap[densityLevel] || spacingMap.comfortable;
  }, []);
  
  const spacingValue = getSpacingValue(density);
  const className = responsive ? 'ma-responsive' : '';
  
  return (
    <div 
      className={className}
      style={{ 
        margin: spacingValue, 
        padding: spacingValue,
        '--ma-spacing': spacingValue 
      }}
    >
      {children}
    </div>
  );
};
```

This TDD pattern document provides comprehensive testing strategies for implementing Japanese aesthetic principles with modern web technologies while maintaining 95%+ test coverage and cultural authenticity.