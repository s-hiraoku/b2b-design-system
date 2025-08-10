/**
 * Test Environment Configuration
 * Centralized test environment setup and management
 */

import { resetTestDataCounters } from './test-data-factory';
import { GlobalMockRegistry } from './mock-management';

/**
 * Test environment manager for comprehensive setup and cleanup
 */
export class TestEnvironmentManager {
  private static instance: TestEnvironmentManager;
  private setupCallbacks: (() => void | Promise<void>)[] = [];
  private cleanupCallbacks: (() => void | Promise<void>)[] = [];

  static getInstance(): TestEnvironmentManager {
    if (!TestEnvironmentManager.instance) {
      TestEnvironmentManager.instance = new TestEnvironmentManager();
    }
    return TestEnvironmentManager.instance;
  }

  /**
   * Register setup callback to run before each test
   */
  registerSetup(callback: () => void | Promise<void>): void {
    this.setupCallbacks.push(callback);
  }

  /**
   * Register cleanup callback to run after each test
   */
  registerCleanup(callback: () => void | Promise<void>): void {
    this.cleanupCallbacks.push(callback);
  }

  /**
   * Run all setup callbacks
   */
  async runSetup(): Promise<void> {
    for (const callback of this.setupCallbacks) {
      await callback();
    }
  }

  /**
   * Run all cleanup callbacks
   */
  async runCleanup(): Promise<void> {
    for (const callback of this.cleanupCallbacks) {
      await callback();
    }
  }

  /**
   * Reset test environment to initial state
   */
  async resetEnvironment(): Promise<void> {
    // Reset all test data counters
    resetTestDataCounters();
    
    // Clear all mocks
    GlobalMockRegistry.clearAll();
    
    // Clear jest mocks
    jest.clearAllMocks();
    
    // Reset modules (optional, use with caution)
    // jest.resetModules();
    
    // Run registered cleanup callbacks
    await this.runCleanup();
    
    // Run registered setup callbacks for fresh state
    await this.runSetup();
  }
}

/**
 * Test configuration constants
 */
export const TestConfig = {
  // Default timeouts
  DEFAULT_TIMEOUT: 5000,
  ASYNC_TIMEOUT: 10000,
  HOOK_TIMEOUT: 3000,
  
  // Date constants for consistent testing
  TEST_BASE_DATE: '2025-08-09T12:00:00.000Z',
  TEST_DUE_DATE: '2025-08-10T00:00:00.000Z',
  
  // Mock data constants
  MAX_TITLE_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  
  // Test IDs and selectors
  TEST_IDS: {
    todoForm: 'todo-form',
    todoItem: 'todo-item',
    todoList: 'todo-list',
    todoFilter: 'todo-filter',
  },
  
  // Error messages for testing
  ERROR_MESSAGES: {
    REQUIRED_TITLE: 'Title is required',
    TITLE_TOO_LONG: 'Title must be less than 100 characters',
    DESCRIPTION_TOO_LONG: 'Description must be less than 500 characters',
    INVALID_DATE: 'Due date must be in the future',
    STORAGE_ERROR: 'Failed to save todo',
    NETWORK_ERROR: 'Network error occurred',
  },
  
  // Success messages for testing
  SUCCESS_MESSAGES: {
    TODO_ADDED: 'Todo added successfully',
    TODO_UPDATED: 'Todo updated successfully',
    TODO_DELETED: 'Todo deleted successfully',
  }
} as const;

/**
 * Test utilities for environment management
 */
export const testEnvironment = {
  /**
   * Setup test environment with common configuration
   */
  setup: async (): Promise<void> => {
    const manager = TestEnvironmentManager.getInstance();
    await manager.runSetup();
  },
  
  /**
   * Cleanup test environment
   */
  cleanup: async (): Promise<void> => {
    const manager = TestEnvironmentManager.getInstance();
    await manager.runCleanup();
  },
  
  /**
   * Reset test environment completely
   */
  reset: async (): Promise<void> => {
    const manager = TestEnvironmentManager.getInstance();
    await manager.resetEnvironment();
  },
  
  /**
   * Configure test timeout for specific test
   */
  setTimeout: (timeout: number): void => {
    jest.setTimeout(timeout);
  },
  
  /**
   * Enable fake timers for testing
   */
  useFakeTimers: (): void => {
    jest.useFakeTimers();
  },
  
  /**
   * Disable fake timers
   */
  useRealTimers: (): void => {
    jest.useRealTimers();
  },
  
  /**
   * Create test-specific localStorage
   */
  createIsolatedStorage: (): Storage => {
    const storage: Record<string, string> = {};
    return {
      getItem: jest.fn((key: string) => storage[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        storage[key] = value;
      }),
      removeItem: jest.fn((key: string) => {
        delete storage[key];
      }),
      clear: jest.fn(() => {
        Object.keys(storage).forEach(key => delete storage[key]);
      }),
      get length() {
        return Object.keys(storage).length;
      },
      key: jest.fn((index: number) => {
        const keys = Object.keys(storage);
        return keys[index] || null;
      })
    } as Storage;
  }
};

/**
 * Test debugging utilities
 */
export const testDebug = {
  /**
   * Log test state for debugging
   */
  logTestState: (description: string, state: any): void => {
    if (process.env.DEBUG_TESTS) {
      console.log(`[TEST DEBUG] ${description}:`, JSON.stringify(state, null, 2));
    }
  },
  
  /**
   * Log DOM state for debugging
   */
  logDOMState: (container: HTMLElement): void => {
    if (process.env.DEBUG_TESTS) {
      console.log('[TEST DEBUG] DOM State:', container.innerHTML);
    }
  },
  
  /**
   * Log mock call history
   */
  logMockCalls: (mockName: string, mock: jest.Mock): void => {
    if (process.env.DEBUG_TESTS) {
      console.log(`[TEST DEBUG] ${mockName} calls:`, mock.mock.calls);
    }
  }
};

/**
 * Export singleton instance
 */
export const testEnvironmentManager = TestEnvironmentManager.getInstance();