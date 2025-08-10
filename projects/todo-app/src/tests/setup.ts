import '@testing-library/jest-dom';

/**
 * Enhanced Test Environment Setup
 * Comprehensive test infrastructure for TODO app testing
 */

// Set timezone to UTC for consistent date handling
process.env.TZ = 'UTC';

// Enhanced localStorage mock with actual storage behavior
const localStorageData: Record<string, string> = {};

const localStorageMock = {
  getItem: jest.fn((key: string) => localStorageData[key] || null),
  setItem: jest.fn((key: string, value: string) => {
    localStorageData[key] = value;
  }),
  removeItem: jest.fn((key: string) => {
    delete localStorageData[key];
  }),
  clear: jest.fn(() => {
    Object.keys(localStorageData).forEach(key => delete localStorageData[key]);
  }),
  get length() {
    return Object.keys(localStorageData).length;
  },
  key: jest.fn((index: number) => {
    const keys = Object.keys(localStorageData);
    return keys[index] || null;
  })
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
});

// Enhanced crypto mock for consistent UUID generation
let uuidCounter = 0;
Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => {
      uuidCounter++;
      return `test-uuid-${uuidCounter.toString().padStart(4, '0')}`;
    }
  },
  writable: true
});

// Mock Date for consistent testing
const mockDate = new Date('2025-08-09T12:00:00.000Z');
const originalDate = Date;

// Enhanced console warnings suppression for cleaner test output
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  // Suppress React act warnings for cleaner test output
  console.error = (...args: any[]) => {
    if (
      args[0]?.includes?.('Warning: `ReactDOMTestUtils.act` is deprecated') ||
      args[0]?.includes?.('Warning: An update to TestComponent inside a test was not wrapped in act')
    ) {
      return;
    }
    originalError.apply(console, args);
  };
  
  console.warn = (...args: any[]) => {
    if (args[0]?.includes?.('act')) {
      return;
    }
    originalWarn.apply(console, args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

// Global test utilities
global.testUtils = {
  // Reset all mocks and state
  resetTestEnvironment: () => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    localStorageMock.clear();
    uuidCounter = 0;
  },
  
  // Mock date utilities
  mockCurrentDate: (date: string | Date) => {
    const targetDate = typeof date === 'string' ? new Date(date) : date;
    jest.spyOn(global, 'Date').mockImplementation(((...args: any[]) => {
      if (args.length === 0) {
        return new originalDate(targetDate);
      }
      return new originalDate(...args);
    }) as any);
  },
  
  restoreDate: () => {
    jest.restoreAllMocks();
  },
  
  // Form testing utilities
  getFormData: (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const data: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    return data;
  },
  
  // Accessibility testing helpers
  expectAccessibleForm: (container: HTMLElement) => {
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
    
    // Check for proper labeling
    const inputs = form?.querySelectorAll('input, textarea, select');
    inputs?.forEach(input => {
      const id = input.getAttribute('id');
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledBy = input.getAttribute('aria-labelledby');
      
      expect(
        id || ariaLabel || ariaLabelledBy
      ).toBeTruthy();
    });
  }
};

// Enhanced beforeEach setup
beforeEach(() => {
  // Clear all mocks
  jest.clearAllMocks();
  
  // Reset localStorage
  localStorageMock.clear();
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
  
  // Reset UUID counter
  uuidCounter = 0;
  
  // Reset Date
  global.Date = originalDate as any;
});

// Enhanced afterEach cleanup
afterEach(() => {
  // Only cleanup timers if fake timers are being used
  try {
    if ((global as any).__jestTimers && (global as any).__jestTimers.isFake) {
      jest.runOnlyPendingTimers();
    }
    jest.useRealTimers();
  } catch (error) {
    // Ignore timer cleanup errors
  }
});