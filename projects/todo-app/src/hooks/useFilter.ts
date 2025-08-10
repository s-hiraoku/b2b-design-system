/**
 * useFilter hook - Task 2.3
 * Filtering logic with performance optimization using useMemo
 */

import { useMemo, useState } from 'react';
import { Todo, FilterType } from '../types/todo';

export interface FilterStats {
  all: number;
  active: number;
  completed: number;
}

export interface UseFilterReturn {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  filteredTodos: Todo[];
  stats: FilterStats;
}

export function useFilter(todos: Todo[]): UseFilterReturn {
  const [filter, setFilter] = useState<FilterType>('all');

  // Calculate stats using useMemo for performance optimization
  const stats = useMemo((): FilterStats => {
    const completedCount = todos.filter(todo => todo.completed).length;
    const activeCount = todos.length - completedCount;
    
    return {
      all: todos.length,
      active: activeCount,
      completed: completedCount
    };
  }, [todos]);

  // Filter todos based on current filter type
  const filteredTodos = useMemo((): Todo[] => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'all':
      default:
        return todos;
    }
  }, [todos, filter]);

  return {
    filter,
    setFilter,
    filteredTodos,
    stats
  };
}