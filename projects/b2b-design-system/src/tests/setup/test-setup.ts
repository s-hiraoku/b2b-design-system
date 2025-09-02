import { beforeAll, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';

// Extend Jest matchers with accessibility testing
expect.extend(toHaveNoViolations);

// Global test setup
beforeAll(() => {
  // Configure global test environment
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });

  // Mock IntersectionObserver for virtualization tests
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  };

  // Mock ResizeObserver for responsive component tests
  global.ResizeObserver = class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  };

  // Mock missing DOM methods for Radix UI components
  HTMLElement.prototype.hasPointerCapture = HTMLElement.prototype.hasPointerCapture || (() => false);
  HTMLElement.prototype.setPointerCapture = HTMLElement.prototype.setPointerCapture || (() => {});
  HTMLElement.prototype.releasePointerCapture = HTMLElement.prototype.releasePointerCapture || (() => {});
  HTMLElement.prototype.scrollIntoView = HTMLElement.prototype.scrollIntoView || (() => {});

  // Mock console.warn and console.error for cleaner test output
  const originalWarn = console.warn;
  const originalError = console.error;

  console.warn = (...args) => {
    // Filter out known warnings we don't want to see in tests
    const message = args[0];
    if (
      typeof message === 'string' &&
      (message.includes('React.createElement: type is invalid') ||
       message.includes('Warning: Failed prop type'))
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };

  console.error = (...args) => {
    // Filter out known errors we don't want to see in tests
    const message = args[0];
    if (
      typeof message === 'string' &&
      message.includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.apply(console, args);
  };
});

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Global test utilities for accessibility
export const expectNoAccessibilityViolations = async (container: Element) => {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
};

// Performance testing utilities
export const measureRenderTime = (fn: () => void): number => {
  const start = performance.now();
  fn();
  return performance.now() - start;
};

export const expectRenderTimeUnder = (fn: () => void, maxTime: number) => {
  const renderTime = measureRenderTime(fn);
  expect(renderTime).toBeLessThan(maxTime);
};

// Memory testing utilities
export const measureMemoryUsage = (): number => {
  if ('memory' in performance) {
    return (performance as any).memory.usedJSHeapSize;
  }
  return 0;
};

// B2B-specific test constants
export const B2B_TEST_CONSTANTS = {
  ENTERPRISE_USER_COUNT: 10000,
  LARGE_DATASET_SIZE: 5000,
  PERFORMANCE_THRESHOLDS: {
    RENDER_TIME_MS: 16,
    BUNDLE_SIZE_KB: 50,
    MEMORY_USAGE_MB: 50,
  },
  ACCESSIBILITY_LEVELS: {
    WCAG_AA: 'WCAG 2.1 AA',
    SECTION_508: 'Section 508',
  },
  SUPPORTED_BROWSERS: [
    'Chrome 90+',
    'Firefox 88+',
    'Safari 14+',
    'Edge 90+',
  ],
};

// Global error boundary for test isolation
export class TestErrorBoundary extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TestErrorBoundary';
  }
}

// Test data generators for B2B scenarios
export const generateMockUsers = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `user-${index}`,
    name: `User ${index}`,
    email: `user${index}@enterprise.com`,
    role: index % 3 === 0 ? 'admin' : index % 3 === 1 ? 'manager' : 'user',
    department: ['Engineering', 'Sales', 'Marketing', 'HR'][index % 4],
    status: index % 5 === 0 ? 'inactive' : 'active',
    lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    permissions: [
      'read',
      ...(index % 3 === 0 ? ['write', 'admin'] : []),
      ...(index % 2 === 0 ? ['delete'] : []),
    ],
  }));
};

export const generateMockTableData = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    name: `Item ${index}`,
    category: ['Category A', 'Category B', 'Category C'][index % 3],
    value: Math.floor(Math.random() * 1000),
    date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
    status: ['active', 'inactive', 'pending'][index % 3],
    tags: ['tag1', 'tag2', 'tag3'].slice(0, (index % 3) + 1),
  }));
};

export const generateMockChartData = (points: number) => {
  return Array.from({ length: points }, (_, index) => ({
    name: `Point ${index}`,
    value: Math.floor(Math.random() * 100),
    category: `Category ${index % 5}`,
    date: new Date(Date.now() - (points - index) * 24 * 60 * 60 * 1000),
  }));
};

// TDD test patterns and utilities
export const TDD_PATTERNS = {
  AAA: {
    description: 'Arrange-Act-Assert pattern for component tests',
    template: `
    describe('ComponentName', () => {
      it('should demonstrate expected behavior', () => {
        // Arrange: Set up test data and dependencies
        const props = { /* test props */ };
        
        // Act: Perform the action being tested
        render(<Component {...props} />);
        
        // Assert: Verify the expected outcome
        expect(screen.getByRole('button')).toBeInTheDocument();
      });
    });
    `,
  },
  GIVEN_WHEN_THEN: {
    description: 'Given-When-Then pattern for B2B user stories',
    template: `
    describe('User Story', () => {
      it('should handle B2B workflow', async () => {
        // Given: Initial state and context
        const initialState = { /* setup */ };
        
        // When: User performs action
        await user.click(screen.getByRole('button'));
        
        // Then: System responds appropriately
        expect(screen.getByText('Success')).toBeInTheDocument();
      });
    });
    `,
  },
};

// Custom matchers for B2B testing
export const customMatchers = {
  toHaveEnterpriseClass: (received: Element, expectedClass: string) => {
    const hasClass = received.classList.contains(`enterprise-${expectedClass}`);
    return {
      message: () => `Expected element to have enterprise class: enterprise-${expectedClass}`,
      pass: hasClass,
    };
  },
  toBeAccessible: async (received: Element) => {
    const results = await axe(received);
    return {
      message: () => `Expected element to be accessible (WCAG 2.1 AA compliant)`,
      pass: results.violations.length === 0,
    };
  },
  toRenderWithinPerformanceBudget: (renderFn: () => void, maxTime: number = 16) => {
    const renderTime = measureRenderTime(renderFn);
    return {
      message: () => `Expected render time ${renderTime}ms to be under ${maxTime}ms`,
      pass: renderTime < maxTime,
    };
  },
};

// Add custom matchers to expect
expect.extend(customMatchers);

// Type augmentation for custom matchers
declare global {
  namespace Vi {
    interface Assertion<T = any> {
      toHaveEnterpriseClass(expectedClass: string): T;
      toBeAccessible(): Promise<T>;
      toRenderWithinPerformanceBudget(maxTime?: number): T;
    }
  }
}

export default {};