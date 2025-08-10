/**
 * TDD RED Phase: Storage Type Tests
 */

import { StorageData, TodoError, ErrorType } from './storage';
import { Todo } from './todo';

describe('Storage Types', () => {
  describe('StorageData interface', () => {
    it('should contain todos array and version', () => {
      const mockTodo: Todo = {
        id: 'test-id',
        title: 'Test task',
        completed: false,
        createdAt: new Date()
      };

      const storageData: StorageData = {
        todos: [mockTodo],
        version: 1,
        lastModified: new Date()
      };

      expect(Array.isArray(storageData.todos)).toBe(true);
      expect(typeof storageData.version).toBe('number');
      expect(storageData.lastModified).toBeInstanceOf(Date);
    });

    it('should allow empty todos array', () => {
      const emptyStorage: StorageData = {
        todos: [],
        version: 1,
        lastModified: new Date()
      };

      expect(emptyStorage.todos).toHaveLength(0);
    });
  });

  describe('TodoError interface', () => {
    it('should have message, type and optional details', () => {
      const error: TodoError = {
        message: 'Storage error',
        type: 'storage',
        timestamp: new Date()
      };

      expect(typeof error.message).toBe('string');
      expect(typeof error.type).toBe('string');
      expect(error.timestamp).toBeInstanceOf(Date);
    });

    it('should support optional details', () => {
      const detailedError: TodoError = {
        message: 'Validation error',
        type: 'validation',
        timestamp: new Date(),
        details: { field: 'title', value: '' }
      };

      expect(detailedError.details).toBeDefined();
      expect(detailedError.details?.field).toBe('title');
    });
  });

  describe('ErrorType', () => {
    it('should support all error types', () => {
      const validationError: ErrorType = 'validation';
      const storageError: ErrorType = 'storage';
      const networkError: ErrorType = 'network';

      expect(validationError).toBe('validation');
      expect(storageError).toBe('storage');
      expect(networkError).toBe('network');
    });
  });
});