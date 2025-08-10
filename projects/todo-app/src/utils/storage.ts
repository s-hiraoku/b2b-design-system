/**
 * LocalStorage utilities
 * TDD GREEN Phase: Minimal implementation to pass tests
 */

import { Todo } from '../types/todo';
import { StorageData, TodoError } from '../types/storage';
import { STORAGE_KEYS, STORAGE_VERSION } from './constants';

export interface StorageResult<T = void> {
  success: boolean;
  data?: T;
  error?: TodoError;
}

export function isStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

export async function saveTodos(todos: Todo[]): Promise<StorageResult> {
  try {
    const storageData: StorageData = {
      todos,
      version: STORAGE_VERSION,
      lastModified: new Date()
    };
    
    const serializedData = JSON.stringify(storageData, (key, value) => {
      return value instanceof Date ? value.toISOString() : value;
    });
    
    localStorage.setItem(STORAGE_KEYS.TODOS, serializedData);
    
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'Unknown storage error',
        type: 'storage',
        timestamp: new Date(),
        details: { operation: 'save', todosCount: todos.length }
      }
    };
  }
}

export async function loadTodos(): Promise<StorageResult<Todo[]>> {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TODOS);
    
    if (!data) {
      return { success: true, data: [] };
    }
    
    let parsedData;
    try {
      parsedData = JSON.parse(data);
    } catch (parseError) {
      // Handle corrupted JSON data
      return {
        success: false,
        error: {
          message: 'Failed to parse stored data',
          type: 'storage',
          timestamp: new Date(),
          details: { operation: 'load', parseError: parseError instanceof Error ? parseError.message : 'Invalid JSON' }
        }
      };
    }
    
    // Handle migration from older versions
    const storageData: StorageData = parsedData.version
      ? parsedData
      : { todos: parsedData.todos || [], version: STORAGE_VERSION, lastModified: new Date() };
    
    // Deserialize dates
    const todos = storageData.todos.map(todo => ({
      ...todo,
      createdAt: new Date(todo.createdAt),
      dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
      completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined
    }));
    
    return { success: true, data: todos };
  } catch (error) {
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'Failed to load todos',
        type: 'storage',
        timestamp: new Date(),
        details: { operation: 'load' }
      }
    };
  }
}

export async function clearTodos(): Promise<StorageResult> {
  try {
    localStorage.removeItem(STORAGE_KEYS.TODOS);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'Failed to clear todos',
        type: 'storage',
        timestamp: new Date(),
        details: { operation: 'clear' }
      }
    };
  }
}

export async function migrateStorageData(): Promise<StorageResult> {
  try {
    const loadResult = await loadTodos();
    if (!loadResult.success) {
      return loadResult;
    }
    
    // If load was successful, save to ensure latest version format
    const saveResult = await saveTodos(loadResult.data || []);
    return saveResult;
  } catch (error) {
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'Migration failed',
        type: 'storage',
        timestamp: new Date(),
        details: { operation: 'migrate' }
      }
    };
  }
}