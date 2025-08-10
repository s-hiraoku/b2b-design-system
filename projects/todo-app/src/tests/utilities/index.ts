/**
 * Test Utilities Index
 * Centralized export of all testing utilities
 */

// Core testing utilities
export * from './test-data-factory';
export * from './form-testing-utils';
export * from './mock-management';
export * from './async-testing-utils';
export * from './test-environment';

// Re-export commonly used testing library functions with enhanced types
export {
  render,
  screen,
  waitFor,
  fireEvent,
  cleanup,
  within,
  getByRole,
  queryByRole,
  findByRole,
  getAllByRole,
  queryAllByRole,
  findAllByRole,
  getByLabelText,
  queryByLabelText,
  findByLabelText,
  getAllByLabelText,
  queryAllByLabelText,
  findAllByLabelText,
  getByText,
  queryByText,
  findByText,
  getAllByText,
  queryAllByText,
  findAllByText,
  getByDisplayValue,
  queryByDisplayValue,
  findByDisplayValue,
  getAllByDisplayValue,
  queryAllByDisplayValue,
  findAllByDisplayValue,
  getByTestId,
  queryByTestId,
  findByTestId,
  getAllByTestId,
  queryAllByTestId,
  findAllByTestId
} from '@testing-library/react';

export {
  renderHook,
  act
} from '@testing-library/react';

export { default as userEvent } from '@testing-library/user-event';

// Type definitions for enhanced testing
export interface TestComponentProps {
  [key: string]: any;
}

export interface TestHookProps {
  [key: string]: any;
}

export interface MockConfig {
  returnValue?: any;
  implementation?: (...args: any[]) => any;
  mockResolvedValue?: any;
  mockRejectedValue?: any;
}

/**
 * Common test setup function that can be used across all test files
 */
export const setupTest = () => {
  // Reset all mocks before each test
  jest.clearAllMocks();
  
  // Reset test data counters
  const { resetTestDataCounters } = require('./test-data-factory');
  resetTestDataCounters();
  
  // Clear mock registry
  const { GlobalMockRegistry } = require('./mock-management');
  GlobalMockRegistry.clearAll();
};

/**
 * Common test cleanup function
 */
export const cleanupTest = () => {
  // Cleanup DOM
  cleanup();
  
  // Clear any remaining timers
  jest.clearAllTimers();
  
  // Restore real timers if fake timers were used
  if (jest.isMockFunction(setTimeout)) {
    jest.useRealTimers();
  }
};

/**
 * Enhanced expect matchers for better test assertions
 */
export const customMatchers = {
  /**
   * Check if element is accessible (has proper ARIA attributes)
   */
  toBeAccessible: (element: HTMLElement) => {
    const hasAriaLabel = element.getAttribute('aria-label');
    const hasAriaLabelledBy = element.getAttribute('aria-labelledby');
    const hasAriaDescribedBy = element.getAttribute('aria-describedby');
    const hasId = element.id;
    
    const isAccessible = hasAriaLabel || hasAriaLabelledBy || hasAriaDescribedBy || hasId;
    
    return {
      message: () => 
        isAccessible 
          ? `Expected element not to be accessible`
          : `Expected element to be accessible (have aria-label, aria-labelledby, aria-describedby, or id)`,
      pass: isAccessible
    };
  },
  
  /**
   * Check if form is valid according to HTML5 validation
   */
  toBeValidForm: (form: HTMLFormElement) => {
    const isValid = form.checkValidity();
    return {
      message: () =>
        isValid
          ? `Expected form not to be valid`
          : `Expected form to be valid`,
      pass: isValid
    };
  },
  
  /**
   * Check if mock was called with partial object
   */
  toHaveBeenCalledWithPartialObject: (mock: jest.Mock, expectedPartial: any) => {
    const calls = mock.mock.calls;
    const matchingCall = calls.find(call => {
      const arg = call[0];
      return Object.keys(expectedPartial).every(key => 
        arg && arg[key] === expectedPartial[key]
      );
    });
    
    return {
      message: () =>
        matchingCall
          ? `Expected mock not to have been called with partial object ${JSON.stringify(expectedPartial)}`
          : `Expected mock to have been called with partial object ${JSON.stringify(expectedPartial)}`,
      pass: !!matchingCall
    };
  }
};

/**
 * Test suite helpers for consistent test organization
 */
export const testSuite = {
  /**
   * Create describe block with automatic setup/cleanup
   */
  describe: (name: string, fn: () => void) => {
    describe(name, () => {
      beforeEach(setupTest);
      afterEach(cleanupTest);
      fn();
    });
  },
  
  /**
   * Create test with timeout and automatic error handling
   */
  test: (name: string, fn: () => void | Promise<void>, timeout = 5000) => {
    test(name, async () => {
      try {
        await fn();
      } catch (error) {
        // Enhanced error reporting
        console.error(`Test "${name}" failed:`, error);
        throw error;
      }
    }, timeout);
  },
  
  /**
   * Create integration test with enhanced setup
   */
  integrationTest: (name: string, fn: () => void | Promise<void>, timeout = 10000) => {
    test(name, async () => {
      // Setup integration test environment
      const { testEnvironment } = require('./test-environment');
      await testEnvironment.setup();
      
      try {
        await fn();
      } finally {
        await testEnvironment.cleanup();
      }
    }, timeout);
  }
};

/**
 * Quick access to commonly used utilities
 */
export const quick = {
  // Quick form testing
  form: () => require('./form-testing-utils').createFormTestingUtils(),
  
  // Quick data creation
  todo: (overrides = {}) => require('./test-data-factory').createTestTodo(overrides),
  todoInput: (overrides = {}) => require('./test-data-factory').createTestTodoInput(overrides),
  
  // Quick mock creation
  onSubmit: () => require('./mock-management').ComponentMockFactory.createTodoFormOnSubmitMock(),
  localStorage: (data = {}) => require('./mock-management').MockStorageManager.getInstance().createLocalStorageMock(data),
  
  // Quick async utilities
  act: (fn: () => any) => require('./async-testing-utils').AsyncTestingUtils.actAsync(fn),
  waitFor: (condition: () => boolean, timeout = 3000) => 
    require('./async-testing-utils').AsyncTestingUtils.waitForCondition(
      condition,
      (result) => result,
      { timeout }
    )
};