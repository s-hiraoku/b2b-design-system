/**
 * TDD RED Phase: LocalStorage utilities tests
 */

import { 
  saveTodos, 
  loadTodos, 
  clearTodos, 
  isStorageAvailable,
  migrateStorageData,
  StorageResult
} from './storage';
import { Todo, TodoInput } from '../types/todo';
import { StorageData } from '../types/storage';

describe('Storage utilities', () => {
  const mockTodo: Todo = {
    id: 'test-id',
    title: 'Test task',
    description: 'Test description',
    completed: false,
    createdAt: new Date('2024-01-01'),
    dueDate: new Date('2024-12-31')
  };

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('isStorageAvailable', () => {
    it('should return true when localStorage is available', () => {
      expect(isStorageAvailable()).toBe(true);
    });
  });

  describe('saveTodos', () => {
    it('should save todos to localStorage successfully', async () => {
      const todos = [mockTodo];
      const result = await saveTodos(todos);
      
      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should save empty todos array', async () => {
      const result = await saveTodos([]);
      
      expect(result.success).toBe(true);
    });

    it('should handle localStorage errors', async () => {
      // Mock localStorage setItem to throw error
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = jest.fn(() => {
        throw new Error('Storage full');
      });

      const result = await saveTodos([mockTodo]);
      
      expect(result.success).toBe(false);
      expect(result.error?.type).toBe('storage');
      expect(result.error?.message).toContain('Storage full');
      
      // Restore original method
      localStorage.setItem = originalSetItem;
    });
  });

  describe('loadTodos', () => {
    it('should load todos from localStorage successfully', async () => {
      const todos = [mockTodo];
      await saveTodos(todos);
      
      const result = await loadTodos();
      
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.data?.[0].title).toBe('Test task');
    });

    it('should return empty array when no data exists', async () => {
      const result = await loadTodos();
      
      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });

    it('should handle corrupted data gracefully', async () => {
      // Put invalid JSON in localStorage
      localStorage.setItem('todo-app-todos', 'invalid json');
      
      const result = await loadTodos();
      
      expect(result.success).toBe(false);
      expect(result.error?.type).toBe('storage');
    });

    it('should handle localStorage getItem errors', async () => {
      const originalGetItem = localStorage.getItem;
      localStorage.getItem = jest.fn(() => {
        throw new Error('Access denied');
      });

      const result = await loadTodos();
      
      expect(result.success).toBe(false);
      expect(result.error?.type).toBe('storage');
      
      localStorage.getItem = originalGetItem;
    });
  });

  describe('clearTodos', () => {
    it('should clear all todos from localStorage', async () => {
      await saveTodos([mockTodo]);
      
      const result = await clearTodos();
      
      expect(result.success).toBe(true);
      
      const loadResult = await loadTodos();
      expect(loadResult.data).toEqual([]);
    });

    it('should handle localStorage removeItem errors', async () => {
      const originalRemoveItem = localStorage.removeItem;
      localStorage.removeItem = jest.fn(() => {
        throw new Error('Cannot remove');
      });

      const result = await clearTodos();
      
      expect(result.success).toBe(false);
      expect(result.error?.type).toBe('storage');
      
      localStorage.removeItem = originalRemoveItem;
    });
  });

  describe('migrateStorageData', () => {
    it('should migrate data from older version', async () => {
      // Simulate old data format (version 0)
      const oldData = {
        todos: [mockTodo],
        // No version field
      };
      localStorage.setItem('todo-app-todos', JSON.stringify(oldData));
      
      const result = await migrateStorageData();
      
      expect(result.success).toBe(true);
      
      const loadResult = await loadTodos();
      expect(loadResult.data).toHaveLength(1);
    });

    it('should handle migration errors', async () => {
      localStorage.setItem('todo-app-todos', 'completely invalid data');
      
      const result = await migrateStorageData();
      
      expect(result.success).toBe(false);
      expect(result.error?.type).toBe('storage');
    });
  });
});