# TDD Patterns & Standards - Liquid Glass Tech Blog

## TDD Methodology Framework

### Red-Green-Refactor Cycle Enforcement
This project mandates strict adherence to Test-Driven Development using the Red-Green-Refactor methodology:

1. **RED PHASE**: Write failing tests that describe the desired behavior
2. **GREEN PHASE**: Write minimal code to make tests pass
3. **REFACTOR PHASE**: Improve code quality while maintaining test coverage

## TDD Standards & Requirements

### Test Coverage Requirements
- **Line Coverage**: 95% minimum
- **Branch Coverage**: 90% minimum  
- **Function Coverage**: 95% minimum
- **Integration Coverage**: 85% minimum
- **E2E Scenario Coverage**: All critical user paths

### Test Framework Configuration
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup/vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 95,
        functions: 95,
        branches: 90,
        statements: 95
      }
    }
  }
});
```

## TDD-Specific Testing Patterns

### 1. Component TDD Structure (AAA Pattern)

**Template Pattern for Visual Components:**
```typescript
describe('LiquidGlassCard', () => {
  // ARRANGE: Test setup and data preparation
  const defaultProps: LiquidGlassProps = {
    blur: 15,
    opacity: 0.1,
    saturation: 1.8,
    children: <div>Test content</div>
  };

  // ACT & ASSERT: Behavior verification
  it('should apply backdrop-filter styles when blur prop is provided', () => {
    render(<LiquidGlassCard {...defaultProps} />);
    
    const card = screen.getByTestId('liquid-glass-card');
    expect(card).toHaveStyle({
      backdropFilter: 'blur(15px) saturate(180%)'
    });
  });

  it('should respond to seasonal theme changes', () => {
    const { rerender } = render(
      <SeasonalThemeProvider season="spring">
        <LiquidGlassCard {...defaultProps} seasonalTheme />
      </SeasonalThemeProvider>
    );

    expect(screen.getByTestId('liquid-glass-card')).toHaveClass('spring-theme');

    rerender(
      <SeasonalThemeProvider season="winter">
        <LiquidGlassCard {...defaultProps} seasonalTheme />
      </SeasonalThemeProvider>
    );

    expect(screen.getByTestId('liquid-glass-card')).toHaveClass('winter-theme');
  });
});
```

### 2. Hook TDD Structure (Given-When-Then)

**Template Pattern for Custom Hooks:**
```typescript
describe('useSeasonalTheme', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Mock weather API
    vi.mocked(fetchWeatherData).mockResolvedValue({
      condition: 'clear',
      temperature: 20
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should determine spring season for March dates', async () => {
    // GIVEN: Current date is in March
    vi.setSystemTime(new Date('2024-03-15'));
    
    // WHEN: Hook is initialized
    const { result } = renderHook(() => useSeasonalTheme());
    
    // THEN: Season should be spring
    await waitFor(() => {
      expect(result.current.season).toBe('spring');
      expect(result.current.colors.primary).toBe('#FFB7C5'); // Cherry blossom
    });
  });

  it('should adapt theme based on weather conditions', async () => {
    // GIVEN: Rainy weather in summer
    vi.mocked(fetchWeatherData).mockResolvedValue({
      condition: 'rain',
      temperature: 25
    });

    // WHEN: Hook fetches weather data
    const { result } = renderHook(() => useSeasonalTheme());
    
    // THEN: Theme should reflect rainy summer
    await waitFor(() => {
      expect(result.current.particleEffect).toBe('rain');
      expect(result.current.colors.primary).toContain('blue');
    });
  });
});
```

### 3. Integration TDD Structure

**Template Pattern for API Integration:**
```typescript
describe('AI Image Generation Integration', () => {
  const mockImagePrompt = 'liquid glass effect with spring theme';
  
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('DALL-E 3 Primary Service', () => {
    it('should generate eye-catch image with correct prompt', async () => {
      // ARRANGE: Mock successful API response
      fetchMock.mockResponseOnce(JSON.stringify({
        data: [{ url: 'https://example.com/generated-image.png' }]
      }));

      // ACT: Generate image
      const result = await generateEyeCatchImage(mockImagePrompt, 'dalle3');

      // ASSERT: Correct API call and response
      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.openai.com/v1/images/generations',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
          }),
          body: JSON.stringify({
            prompt: mockImagePrompt,
            size: '768x432',
            quality: 'hd'
          })
        })
      );
      
      expect(result).toEqual({
        url: 'https://example.com/generated-image.png',
        provider: 'dalle3',
        status: 'success'
      });
    });

    it('should fallback to Leonardo AI when DALL-E fails', async () => {
      // ARRANGE: Mock DALL-E failure, Leonardo success
      fetchMock
        .mockRejectOnce(new Error('DALL-E API Error'))
        .mockResponseOnce(JSON.stringify({
          generations: [{ url: 'https://leonardo.com/image.png' }]
        }));

      // ACT: Attempt image generation
      const result = await generateEyeCatchImage(mockImagePrompt);

      // ASSERT: Fallback was triggered
      expect(result.provider).toBe('leonardo');
      expect(result.status).toBe('success');
    });
  });
});
```

## Performance Testing Patterns

### GPU Acceleration Testing
```typescript
describe('Performance - GPU Acceleration', () => {
  let performanceMonitor: PerformanceMonitor;

  beforeEach(() => {
    performanceMonitor = new PerformanceMonitor();
    performanceMonitor.start();
  });

  afterEach(() => {
    performanceMonitor.stop();
  });

  it('should maintain 60fps during particle animations', async () => {
    // ARRANGE: High particle count scenario
    render(<ParticleSystem particleCount={1000} season="winter" />);
    
    // ACT: Run animation for 5 seconds
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 5000));
    });

    // ASSERT: Performance metrics
    const metrics = performanceMonitor.getMetrics();
    expect(metrics.averageFPS).toBeGreaterThanOrEqual(58); // Allow 2fps tolerance
    expect(metrics.maxFrameTime).toBeLessThan(16.67); // 60fps = 16.67ms per frame
  });

  it('should use GPU acceleration for transform operations', () => {
    render(<LiquidGlassCard interactive />);
    
    const card = screen.getByTestId('liquid-glass-card');
    
    // Check for GPU acceleration properties
    expect(card).toHaveStyle({
      transform: 'translate3d(0, 0, 0)', // Forces GPU layer
      willChange: 'transform, opacity'
    });
  });
});
```

### Memory Leak Testing
```typescript
describe('Memory Management', () => {
  it('should cleanup particle systems on unmount', () => {
    const { unmount } = render(
      <ParticleSystem particleCount={500} season="autumn" />
    );

    // Get initial memory usage
    const initialMemory = performance.memory?.usedJSHeapSize || 0;

    // Unmount and force garbage collection
    unmount();
    if (global.gc) global.gc(); // Force GC in Node.js test environment

    // Verify memory cleanup
    const finalMemory = performance.memory?.usedJSHeapSize || 0;
    const memoryDiff = finalMemory - initialMemory;
    
    // Should not increase memory significantly
    expect(memoryDiff).toBeLessThan(1024 * 1024); // Less than 1MB difference
  });
});
```

## E2E Testing Patterns (Playwright)

### Visual Regression Testing
```typescript
// tests/e2e/visual-effects.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Liquid Glass Visual Effects', () => {
  test('should render consistent glassmorphism effects', async ({ page }) => {
    await page.goto('/showcase/liquid-glass-demo');
    
    // Wait for effects to load
    await page.waitForSelector('[data-testid="liquid-glass-card"]');
    await page.waitForTimeout(1000); // Allow animations to settle

    // Take screenshot for visual comparison
    await expect(page.locator('[data-testid="liquid-glass-card"]')).toHaveScreenshot('liquid-glass-effect.png');
  });

  test('should adapt to seasonal theme changes', async ({ page }) => {
    await page.goto('/admin/theme-editor');
    
    // Login as admin (assuming auth is set up)
    await page.fill('[data-testid="admin-email"]', 'admin@test.com');
    await page.fill('[data-testid="admin-password"]', 'testpassword');
    await page.click('[data-testid="login-button"]');

    // Change season to winter
    await page.selectOption('[data-testid="season-selector"]', 'winter');
    await page.waitForTimeout(2000); // Allow theme transition

    // Verify winter theme is applied
    await expect(page.locator('[data-testid="theme-preview"]')).toHaveScreenshot('winter-theme.png');
  });
});
```

### Accessibility Testing
```typescript
test.describe('Accessibility Compliance', () => {
  test('should meet WCAG 2.1 AA standards', async ({ page }) => {
    await page.goto('/');
    
    // Run axe-core accessibility tests
    const results = await page.evaluate(() => {
      return new Promise((resolve) => {
        // @ts-ignore - axe-core injected in test setup
        axe.run().then(resolve);
      });
    });

    expect(results.violations).toHaveLength(0);
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/blog');
    
    // Navigate using keyboard
    await page.keyboard.press('Tab');
    let focusedElement = page.locator(':focus');
    await expect(focusedElement).toHaveAttribute('data-testid', 'main-nav-link');

    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/blog\/.+/);
  });
});
```

## Test Utilities & Helpers

### Custom Test Renderers
```typescript
// tests/utils/custom-renderers.tsx
export function renderWithTheme(
  component: React.ReactElement,
  theme: SeasonalTheme = 'spring'
) {
  return render(
    <SeasonalThemeProvider initialSeason={theme}>
      <QueryClient client={testQueryClient}>
        {component}
      </QueryClient>
    </SeasonalThemeProvider>
  );
}

export function renderWithPerformanceMonitoring(
  component: React.ReactElement
) {
  const performanceMonitor = new PerformanceMonitor();
  
  return {
    ...render(
      <PerformanceProvider monitor={performanceMonitor}>
        {component}
      </PerformanceProvider>
    ),
    performanceMonitor
  };
}
```

### Mock Factories
```typescript
// tests/factories/mockData.ts
export const createMockWeatherData = (overrides?: Partial<WeatherData>): WeatherData => ({
  condition: 'clear',
  temperature: 20,
  humidity: 60,
  windSpeed: 5,
  location: { lat: 35.6762, lon: 139.6503 }, // Tokyo
  ...overrides
});

export const createMockBlogPost = (overrides?: Partial<BlogPost>): BlogPost => ({
  id: 'test-post-1',
  title: 'Test Liquid Glass Tutorial',
  content: '# Test Content\n\nThis is test MDX content.',
  eyeCatchImage: {
    url: 'https://example.com/test-image.jpg',
    alt: 'Test eye-catch image',
    generatedBy: 'dalle3'
  },
  tags: ['liquid-glass', 'tutorial'],
  publishedAt: new Date('2024-01-01'),
  ...overrides
});
```

## TDD Quality Gates

### Pre-commit Hooks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm run test:coverage && npm run test:e2e:ci"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "vitest related --run --reporter=verbose"
    ]
  }
}
```

### Coverage Reporting
```typescript
// Coverage must pass all thresholds:
// - Lines: 95%
// - Functions: 95%
// - Branches: 90%
// - Statements: 95%

// Failed coverage will block commits and deployments
```

This TDD pattern guide ensures consistent, high-quality test development throughout the Liquid Glass Tech Blog implementation, maintaining the strict test-driven development methodology required by the project.