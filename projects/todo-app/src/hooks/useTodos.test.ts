/**
 * TDD RED Phase: useTodos hook tests
 */

import { renderHook, act } from '@testing-library/react';
import { useTodos } from './useTodos';
import { TodoInput } from '../types/todo';

describe('useTodos hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return empty todos array initially', async () => {
    const { result } = renderHook(() => useTodos());
    
    // Initially should be loading
    expect(result.current.loading).toBe(true);
    expect(result.current.todos).toEqual([]);
    
    // Wait for loading to complete using act and setTimeout
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    const { todos, loading, error } = result.current;
    expect(todos).toEqual([]);
    expect(loading).toBe(false);
    expect(error).toBeNull();
  });

  it('should add a new todo', () => {
    const { result } = renderHook(() => useTodos());
    
    const todoInput: TodoInput = {
      title: 'Test task',
      description: 'Test description'
    };
    
    act(() => {
      result.current.addTodo(todoInput);
    });
    
    const { todos } = result.current;
    expect(todos).toHaveLength(1);
    expect(todos[0].title).toBe('Test task');
    expect(todos[0].description).toBe('Test description');
    expect(todos[0].completed).toBe(false);
    expect(todos[0].id).toBeDefined();
    expect(todos[0].createdAt).toBeInstanceOf(Date);
  });

  it('should update an existing todo', () => {
    const { result } = renderHook(() => useTodos());
    
    const todoInput: TodoInput = {
      title: 'Original task'
    };
    
    act(() => {
      result.current.addTodo(todoInput);
    });
    
    const todoId = result.current.todos[0].id;
    
    act(() => {
      result.current.updateTodo(todoId, {
        title: 'Updated task',
        description: 'Updated description'
      });
    });
    
    const { todos } = result.current;
    expect(todos[0].title).toBe('Updated task');
    expect(todos[0].description).toBe('Updated description');
  });

  it('should delete a todo', () => {
    const { result } = renderHook(() => useTodos());
    
    const todoInput: TodoInput = {
      title: 'Test task'
    };
    
    act(() => {
      result.current.addTodo(todoInput);
    });
    
    const todoId = result.current.todos[0].id;
    
    act(() => {
      result.current.deleteTodo(todoId);
    });
    
    const { todos } = result.current;
    expect(todos).toHaveLength(0);
  });

  it('should toggle todo completion status', () => {
    const { result } = renderHook(() => useTodos());
    
    const todoInput: TodoInput = {
      title: 'Test task'
    };
    
    act(() => {
      result.current.addTodo(todoInput);
    });
    
    const todoId = result.current.todos[0].id;
    
    act(() => {
      result.current.toggleTodo(todoId);
    });
    
    const { todos } = result.current;
    expect(todos[0].completed).toBe(true);
    expect(todos[0].completedAt).toBeInstanceOf(Date);
    
    act(() => {
      result.current.toggleTodo(todoId);
    });
    
    expect(result.current.todos[0].completed).toBe(false);
    expect(result.current.todos[0].completedAt).toBeUndefined();
  });

  it('should clear all todos', async () => {
    const { result } = renderHook(() => useTodos());
    
    // Wait for initial load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    act(() => {
      result.current.addTodo({ title: 'Task 1' });
    });
    
    act(() => {
      result.current.addTodo({ title: 'Task 2' });
    });
    
    expect(result.current.todos).toHaveLength(2);
    
    act(() => {
      result.current.clearAllTodos();
    });
    
    const { todos } = result.current;
    expect(todos).toHaveLength(0);
  });

  it('should persist todos to localStorage', async () => {
    const { result } = renderHook(() => useTodos());
    
    // Wait for initial load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    const todoInput: TodoInput = {
      title: 'Persistent task'
    };
    
    act(() => {
      result.current.addTodo(todoInput);
    });
    
    // Verify data was saved to localStorage
    expect(localStorage.setItem).toHaveBeenCalled();
    
    // Create new hook instance to verify loading
    const { result: result2 } = renderHook(() => useTodos());
    
    // Wait for the second hook to load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result2.current.todos).toHaveLength(1);
    expect(result2.current.todos[0].title).toBe('Persistent task');
  });

  it('should handle validation errors when adding todo', () => {
    const { result } = renderHook(() => useTodos());
    
    const invalidTodoInput: TodoInput = {
      title: '' // Empty title should cause validation error
    };
    
    act(() => {
      result.current.addTodo(invalidTodoInput);
    });
    
    const { todos, error } = result.current;
    expect(todos).toHaveLength(0);
    expect(error).toBeDefined();
    expect(error?.type).toBe('validation');
  });

  it('should handle validation errors when updating todo', () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.addTodo({ title: 'Valid task' });
    });
    
    const todoId = result.current.todos[0].id;
    
    act(() => {
      result.current.updateTodo(todoId, {
        title: '' // Empty title should cause validation error
      });
    });
    
    const { todos, error } = result.current;
    expect(todos[0].title).toBe('Valid task'); // Should remain unchanged
    expect(error).toBeDefined();
    expect(error?.type).toBe('validation');
  });

  it('should handle storage errors gracefully', async () => {
    const { result } = renderHook(() => useTodos());
    
    // Wait for initial load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Mock localStorage.setItem to throw error after initial load
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = jest.fn(() => {
      throw new Error('Storage full');
    });

    await act(async () => {
      result.current.addTodo({ title: 'Test task' });
      // Wait for async operation to complete
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    const { todos, error } = result.current;
    expect(todos).toHaveLength(1); // Todo is still added to state
    expect(error).toBeDefined();
    expect(error?.type).toBe('storage');
    
    // Restore original method
    localStorage.setItem = originalSetItem;
  });

  it('should not update non-existent todo', () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.updateTodo('non-existent-id', { title: 'Updated' });
    });
    
    const { todos, error } = result.current;
    expect(todos).toHaveLength(0);
    expect(error).toBeDefined();
    expect(error?.message).toContain('Todo not found');
  });
});