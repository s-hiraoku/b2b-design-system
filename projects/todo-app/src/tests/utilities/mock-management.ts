/**
 * Mock Management System
 * Centralized mock creation and management for consistent testing
 */

import { Todo, TodoInput } from '../../types/todo';
import { StorageResult } from '../../types/storage';

/**
 * Mock storage utilities
 */
export class MockStorageManager {
  private static instance: MockStorageManager;
  private mocks: Map<string, jest.Mock> = new Map();

  static getInstance(): MockStorageManager {
    if (!MockStorageManager.instance) {
      MockStorageManager.instance = new MockStorageManager();
    }
    return MockStorageManager.instance;
  }

  /**
   * Create localStorage mock with controlled behavior
   */
  createLocalStorageMock(initialData: Record<string, any> = {}): Storage {
    const storage: Record<string, string> = {};
    
    // Initialize with provided data
    Object.entries(initialData).forEach(([key, value]) => {
      storage[key] = JSON.stringify(value);
    });

    const mock = {
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
    };

    this.mocks.set('localStorage', mock as any);
    return mock as any;
  }

  /**
   * Get stored mock by name
   */
  getMock(name: string): jest.Mock | undefined {
    return this.mocks.get(name);
  }

  /**
   * Clear all mocks
   */
  clearAllMocks(): void {
    this.mocks.forEach(mock => mock.mockClear());
  }

  /**
   * Reset all mocks
   */
  resetAllMocks(): void {
    this.mocks.forEach(mock => mock.mockReset());
    this.mocks.clear();
  }
}

/**
 * Storage operation mocks
 */
export class StorageMockFactory {
  /**
   * Create successful storage operation mock
   */
  static createSuccessfulStorageMock<T>(data: T): jest.Mock<StorageResult<T>> {
    return jest.fn().mockResolvedValue({
      success: true,
      data,
      error: null
    });
  }

  /**
   * Create failed storage operation mock
   */
  static createFailedStorageMock<T>(error: string): jest.Mock<StorageResult<T>> {
    return jest.fn().mockResolvedValue({
      success: false,
      data: null,
      error
    });
  }

  /**
   * Create mock that throws an error
   */
  static createThrowingStorageMock<T>(error: Error): jest.Mock {
    return jest.fn().mockRejectedValue(error);
  }

  /**
   * Create mock for todo loading operations
   */
  static createTodoLoadMock(todos: Todo[]): jest.Mock<Promise<StorageResult<Todo[]>>> {
    return this.createSuccessfulStorageMock(todos);
  }

  /**
   * Create mock for todo save operations
   */
  static createTodoSaveMock(savedTodos: Todo[]): jest.Mock<Promise<StorageResult<Todo[]>>> {
    return this.createSuccessfulStorageMock(savedTodos);
  }
}

/**
 * Hook testing mocks
 */
export class HookMockFactory {
  /**
   * Create useTodos hook mock
   */
  static createUseTodosMock(overrides: {
    todos?: Todo[];
    loading?: boolean;
    error?: string | null;
    addTodo?: jest.Mock;
    updateTodo?: jest.Mock;
    deleteTodo?: jest.Mock;
    toggleTodo?: jest.Mock;
  } = {}) {
    return {
      todos: overrides.todos || [],
      loading: overrides.loading || false,
      error: overrides.error || null,
      addTodo: overrides.addTodo || jest.fn(),
      updateTodo: overrides.updateTodo || jest.fn(),
      deleteTodo: overrides.deleteTodo || jest.fn(),
      toggleTodo: overrides.toggleTodo || jest.fn()
    };
  }

  /**
   * Create useLocalStorage hook mock
   */
  static createUseLocalStorageMock<T>(value: T, setValue: jest.Mock = jest.fn()) {
    return [value, setValue];
  }

  /**
   * Create useFilter hook mock
   */
  static createUseFilterMock(overrides: {
    filter?: string;
    setFilter?: jest.Mock;
    filteredTodos?: Todo[];
  } = {}) {
    return {
      filter: overrides.filter || 'all',
      setFilter: overrides.setFilter || jest.fn(),
      filteredTodos: overrides.filteredTodos || []
    };
  }
}

/**
 * Component prop mocks
 */
export class ComponentMockFactory {
  /**
   * Create TodoForm onSubmit mock
   */
  static createTodoFormOnSubmitMock(): jest.Mock<void, [TodoInput]> {
    return jest.fn();
  }

  /**
   * Create TodoItem event handler mocks
   */
  static createTodoItemMocks() {
    return {
      onToggle: jest.fn(),
      onDelete: jest.fn(),
      onUpdate: jest.fn()
    };
  }

  /**
   * Create TodoList event handler mocks
   */
  static createTodoListMocks() {
    return {
      onToggleTodo: jest.fn(),
      onDeleteTodo: jest.fn(),
      onUpdateTodo: jest.fn()
    };
  }
}

/**
 * API/Service mocks
 */
export class ServiceMockFactory {
  /**
   * Create fetch API mock for external services
   */
  static createFetchMock(responses: { [url: string]: any }) {
    return jest.fn().mockImplementation((url: string) => {
      const response = responses[url];
      if (response) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(response),
          text: () => Promise.resolve(JSON.stringify(response))
        });
      }
      return Promise.reject(new Error(`No mock response for ${url}`));
    });
  }

  /**
   * Create timer mocks for testing async operations
   */
  static createTimerMocks() {
    return {
      setTimeout: jest.fn(),
      clearTimeout: jest.fn(),
      setInterval: jest.fn(),
      clearInterval: jest.fn()
    };
  }
}

/**
 * Global mock registry for easy cleanup
 */
export class GlobalMockRegistry {
  private static mocks: Set<jest.Mock> = new Set();

  /**
   * Register a mock for cleanup
   */
  static register(mock: jest.Mock): jest.Mock {
    this.mocks.add(mock);
    return mock;
  }

  /**
   * Clear all registered mocks
   */
  static clearAll(): void {
    this.mocks.forEach(mock => mock.mockClear());
  }

  /**
   * Reset all registered mocks
   */
  static resetAll(): void {
    this.mocks.forEach(mock => mock.mockReset());
    this.mocks.clear();
  }
}

/**
 * Mock helper functions for common scenarios
 */
export const mockHelpers = {
  /**
   * Create a mock that resolves after a delay
   */
  createDelayedMock: <T>(value: T, delay: number = 100): jest.Mock<Promise<T>> => {
    return jest.fn().mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(value), delay))
    );
  },

  /**
   * Create a mock that fails after a delay
   */
  createDelayedErrorMock: (error: Error, delay: number = 100): jest.Mock => {
    return jest.fn().mockImplementation(() => 
      new Promise((_, reject) => setTimeout(() => reject(error), delay))
    );
  },

  /**
   * Create a mock that succeeds on nth call
   */
  createNthSuccessMock: <T>(value: T, successOnCall: number = 2): jest.Mock<T> => {
    let callCount = 0;
    return jest.fn().mockImplementation(() => {
      callCount++;
      if (callCount === successOnCall) {
        return value;
      }
      throw new Error(`Mock failed on call ${callCount}`);
    });
  },

  /**
   * Create a mock with call counting
   */
  createCountingMock: <T>(value: T): { mock: jest.Mock<T>, getCallCount: () => number } => {
    let callCount = 0;
    const mock = jest.fn().mockImplementation(() => {
      callCount++;
      return value;
    });
    
    return {
      mock,
      getCallCount: () => callCount
    };
  }
};

/**
 * Export singleton instance for easy access
 */
export const mockManager = MockStorageManager.getInstance();