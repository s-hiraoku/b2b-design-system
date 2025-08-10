/**
 * useTodos hook
 * TDD GREEN Phase: Minimal implementation to pass tests
 */

import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoInput } from '../types/todo';
import { TodoError } from '../types/storage';
import { validateTodoInput } from '../utils/validation';
import { saveTodos, loadTodos } from '../utils/storage';

export interface UseTodosReturn {
  todos: Todo[];
  loading: boolean;
  error: TodoError | null;
  addTodo: (input: TodoInput) => void;
  updateTodo: (id: string, input: Partial<TodoInput>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  clearAllTodos: () => void;
}

export function useTodos(): UseTodosReturn {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<TodoError | null>(null);

  // Load todos from localStorage on mount
  useEffect(() => {
    const loadInitialTodos = async () => {
      setLoading(true);
      const result = await loadTodos();
      
      if (result.success) {
        setTodos(result.data || []);
        setError(null);
      } else {
        setError(result.error || null);
      }
      
      setLoading(false);
    };
    
    loadInitialTodos();
  }, []);

  // Save todos whenever the todos array changes
  const saveTodosToStorage = useCallback(async (todosToSave: Todo[]) => {
    const result = await saveTodos(todosToSave);
    
    if (!result.success) {
      setError(result.error || null);
    } else {
      setError(null);
    }
  }, []);

  const addTodo = useCallback(async (input: TodoInput) => {
    // Validate input
    const validation = validateTodoInput(input);
    if (!validation.isValid) {
      setError({
        message: validation.errors.join(', '),
        type: 'validation',
        timestamp: new Date(),
        details: { input, errors: validation.errors }
      });
      return;
    }

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: input.title,
      description: input.description,
      completed: false,
      createdAt: new Date(),
      dueDate: input.dueDate
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    await saveTodosToStorage(updatedTodos);
  }, [todos, saveTodosToStorage]);

  const updateTodo = useCallback(async (id: string, input: Partial<TodoInput>) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      setError({
        message: 'Todo not found',
        type: 'validation',
        timestamp: new Date(),
        details: { id }
      });
      return;
    }

    // Create updated todo input for validation
    const currentTodo = todos[todoIndex];
    const updatedInput: TodoInput = {
      title: input.title ?? currentTodo.title,
      description: input.description ?? currentTodo.description,
      dueDate: input.dueDate ?? currentTodo.dueDate
    };

    // Validate updated input
    const validation = validateTodoInput(updatedInput);
    if (!validation.isValid) {
      setError({
        message: validation.errors.join(', '),
        type: 'validation',
        timestamp: new Date(),
        details: { id, input, errors: validation.errors }
      });
      return;
    }

    const updatedTodos = [...todos];
    updatedTodos[todoIndex] = {
      ...currentTodo,
      ...input
    };

    setTodos(updatedTodos);
    await saveTodosToStorage(updatedTodos);
  }, [todos, saveTodosToStorage]);

  const deleteTodo = useCallback(async (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    await saveTodosToStorage(updatedTodos);
  }, [todos, saveTodosToStorage]);

  const toggleTodo = useCallback(async (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
          completedAt: !todo.completed ? new Date() : undefined
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
    await saveTodosToStorage(updatedTodos);
  }, [todos, saveTodosToStorage]);

  const clearAllTodos = useCallback(async () => {
    setTodos([]);
    await saveTodosToStorage([]);
  }, [saveTodosToStorage]);

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearAllTodos
  };
}