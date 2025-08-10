/**
 * TDD RED Phase: Type Definition Tests
 * These tests define the expected structure and behavior of our Todo types
 */

import { Todo, TodoInput, FilterType } from './todo';

describe('Todo Types', () => {
  describe('Todo interface', () => {
    it('should have all required properties with correct types', () => {
      // This test will fail until we implement the Todo interface
      const mockTodo: Todo = {
        id: 'test-id',
        title: 'Test task',
        description: 'Test description',
        completed: false,
        createdAt: new Date(),
        dueDate: new Date()
      };

      expect(typeof mockTodo.id).toBe('string');
      expect(typeof mockTodo.title).toBe('string');
      expect(typeof mockTodo.description).toBe('string');
      expect(typeof mockTodo.completed).toBe('boolean');
      expect(mockTodo.createdAt).toBeInstanceOf(Date);
      expect(mockTodo.dueDate).toBeInstanceOf(Date);
    });

    it('should allow optional description and dueDate', () => {
      const minimalTodo: Todo = {
        id: 'test-id',
        title: 'Test task',
        completed: false,
        createdAt: new Date()
      };

      expect(minimalTodo.description).toBeUndefined();
      expect(minimalTodo.dueDate).toBeUndefined();
    });
  });

  describe('TodoInput interface', () => {
    it('should have required title and optional fields', () => {
      const todoInput: TodoInput = {
        title: 'New task'
      };

      expect(typeof todoInput.title).toBe('string');
    });

    it('should support all optional fields', () => {
      const fullTodoInput: TodoInput = {
        title: 'New task',
        description: 'Task description',
        dueDate: new Date()
      };

      expect(typeof fullTodoInput.title).toBe('string');
      expect(typeof fullTodoInput.description).toBe('string');
      expect(fullTodoInput.dueDate).toBeInstanceOf(Date);
    });
  });

  describe('FilterType', () => {
    it('should support all filter values', () => {
      const allFilter: FilterType = 'all';
      const activeFilter: FilterType = 'active';
      const completedFilter: FilterType = 'completed';

      expect(allFilter).toBe('all');
      expect(activeFilter).toBe('active');
      expect(completedFilter).toBe('completed');
    });
  });
});