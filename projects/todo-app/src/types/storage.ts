/**
 * Storage-related type definitions
 * TDD GREEN Phase: Minimal implementation to pass tests
 */

import { Todo } from './todo';

export interface StorageData {
  todos: Todo[];
  version: number;
  lastModified: Date;
}

export interface TodoError {
  message: string;
  type: ErrorType;
  timestamp: Date;
  details?: Record<string, any>;
}

export type ErrorType = 'validation' | 'storage' | 'network' | 'unknown';