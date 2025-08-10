/**
 * Core Todo type definitions
 * TDD GREEN Phase: Minimal implementation to pass tests
 */

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  completedAt?: Date;
}

export interface TodoInput {
  title: string;
  description?: string;
  dueDate?: Date;
}

export type FilterType = 'all' | 'active' | 'completed';