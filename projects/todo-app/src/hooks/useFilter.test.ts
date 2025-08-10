/**
 * useFilter hook tests
 * TDD approach with comprehensive test coverage
 */

import { renderHook, act } from '@testing-library/react';
import { useFilter } from './useFilter';
import { Todo } from '../types/todo';

// Test data
const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Active Todo 1',
    completed: false,
    createdAt: new Date('2024-01-01'),
    description: 'Description 1'
  },
  {
    id: '2',
    title: 'Active Todo 2',
    completed: false,
    createdAt: new Date('2024-01-02')
  },
  {
    id: '3',
    title: 'Completed Todo 1',
    completed: true,
    createdAt: new Date('2024-01-03'),
    completedAt: new Date('2024-01-04')
  },
  {
    id: '4',
    title: 'Completed Todo 2',
    completed: true,
    createdAt: new Date('2024-01-04'),
    completedAt: new Date('2024-01-05')
  }
];

describe('useFilter', () => {
  describe('initial state', () => {
    it('should initialize with "all" filter', () => {
      const { result } = renderHook(() => useFilter(mockTodos));
      
      expect(result.current.filter).toBe('all');
    });

    it('should return all todos when filter is "all"', () => {
      const { result } = renderHook(() => useFilter(mockTodos));
      
      expect(result.current.filteredTodos).toEqual(mockTodos);
      expect(result.current.filteredTodos).toHaveLength(4);
    });
  });

  describe('filtering functionality', () => {
    it('should filter active todos correctly', () => {
      const { result } = renderHook(() => useFilter(mockTodos));
      
      act(() => {
        result.current.setFilter('active');
      });
      
      expect(result.current.filter).toBe('active');
      expect(result.current.filteredTodos).toHaveLength(2);
      expect(result.current.filteredTodos.every(todo => !todo.completed)).toBe(true);
      expect(result.current.filteredTodos.map(t => t.id)).toEqual(['1', '2']);
    });

    it('should filter completed todos correctly', () => {
      const { result } = renderHook(() => useFilter(mockTodos));
      
      act(() => {
        result.current.setFilter('completed');
      });
      
      expect(result.current.filter).toBe('completed');
      expect(result.current.filteredTodos).toHaveLength(2);
      expect(result.current.filteredTodos.every(todo => todo.completed)).toBe(true);
      expect(result.current.filteredTodos.map(t => t.id)).toEqual(['3', '4']);
    });

    it('should return all todos when filter is "all"', () => {
      const { result } = renderHook(() => useFilter(mockTodos));
      
      act(() => {
        result.current.setFilter('completed');
      });
      
      act(() => {
        result.current.setFilter('all');
      });
      
      expect(result.current.filter).toBe('all');
      expect(result.current.filteredTodos).toEqual(mockTodos);
      expect(result.current.filteredTodos).toHaveLength(4);
    });
  });

  describe('stats calculation', () => {
    it('should calculate correct stats for mixed todos', () => {
      const { result } = renderHook(() => useFilter(mockTodos));
      
      expect(result.current.stats).toEqual({
        all: 4,
        active: 2,
        completed: 2
      });
    });

    it('should calculate correct stats for all active todos', () => {
      const allActiveTodos = mockTodos.map(todo => ({ ...todo, completed: false }));
      const { result } = renderHook(() => useFilter(allActiveTodos));
      
      expect(result.current.stats).toEqual({
        all: 4,
        active: 4,
        completed: 0
      });
    });

    it('should calculate correct stats for all completed todos', () => {
      const allCompletedTodos = mockTodos.map(todo => ({ 
        ...todo, 
        completed: true,
        completedAt: new Date()
      }));
      const { result } = renderHook(() => useFilter(allCompletedTodos));
      
      expect(result.current.stats).toEqual({
        all: 4,
        active: 0,
        completed: 4
      });
    });

    it('should calculate correct stats for empty todos array', () => {
      const { result } = renderHook(() => useFilter([]));
      
      expect(result.current.stats).toEqual({
        all: 0,
        active: 0,
        completed: 0
      });
    });
  });

  describe('performance optimization', () => {
    it('should maintain filter state between re-renders', () => {
      const { result, rerender } = renderHook(
        ({ todos }) => useFilter(todos),
        { initialProps: { todos: mockTodos } }
      );
      
      act(() => {
        result.current.setFilter('active');
      });
      
      // Re-render with same todos
      rerender({ todos: mockTodos });
      
      expect(result.current.filter).toBe('active');
      expect(result.current.filteredTodos).toHaveLength(2);
    });

    it('should recalculate when todos array changes', () => {
      const { result, rerender } = renderHook(
        ({ todos }) => useFilter(todos),
        { initialProps: { todos: mockTodos } }
      );
      
      expect(result.current.stats.all).toBe(4);
      
      // Add a new todo
      const newTodos = [...mockTodos, {
        id: '5',
        title: 'New Todo',
        completed: false,
        createdAt: new Date()
      }];
      
      rerender({ todos: newTodos });
      
      expect(result.current.stats.all).toBe(5);
      expect(result.current.stats.active).toBe(3);
    });
  });

  describe('edge cases', () => {
    it('should handle empty todos array gracefully', () => {
      const { result } = renderHook(() => useFilter([]));
      
      expect(result.current.filteredTodos).toEqual([]);
      expect(result.current.stats).toEqual({
        all: 0,
        active: 0,
        completed: 0
      });
    });

    it('should handle filter changes with empty todos', () => {
      const { result } = renderHook(() => useFilter([]));
      
      act(() => {
        result.current.setFilter('active');
      });
      
      expect(result.current.filteredTodos).toEqual([]);
      expect(result.current.filter).toBe('active');
    });

    it('should handle todos without completion dates', () => {
      const todosWithoutDates = mockTodos.map(todo => {
        const { completedAt, ...todoWithoutDate } = todo;
        return todoWithoutDate;
      });
      
      const { result } = renderHook(() => useFilter(todosWithoutDates));
      
      expect(result.current.stats).toEqual({
        all: 4,
        active: 2,
        completed: 2
      });
    });
  });
});