/**
 * Test Data Factory
 * Standardized test data generation for consistent testing
 */

import { Todo, TodoInput } from '../../types/todo';

// Counters for unique data generation
let todoCounter = 0;
let dateCounter = 0;

/**
 * Reset counters for fresh test data in each test
 */
export const resetTestDataCounters = (): void => {
  todoCounter = 0;
  dateCounter = 0;
};

/**
 * Create a unique test Todo
 */
export const createTestTodo = (overrides: Partial<Todo> = {}): Todo => {
  todoCounter++;
  const baseDate = new Date('2025-08-09T12:00:00.000Z');
  
  return {
    id: `test-todo-${todoCounter.toString().padStart(3, '0')}`,
    title: `Test Todo ${todoCounter}`,
    description: `Test description for todo ${todoCounter}`,
    completed: false,
    createdAt: new Date(baseDate.getTime() + (todoCounter * 1000)),
    updatedAt: new Date(baseDate.getTime() + (todoCounter * 1000)),
    dueDate: new Date(baseDate.getTime() + (todoCounter * 24 * 60 * 60 * 1000)), // Next day
    ...overrides
  };
};

/**
 * Create a unique test TodoInput
 */
export const createTestTodoInput = (overrides: Partial<TodoInput> = {}): TodoInput => {
  todoCounter++;
  const baseDate = new Date('2025-08-09T12:00:00.000Z');
  
  return {
    title: `Test Todo Input ${todoCounter}`,
    description: `Test description for input ${todoCounter}`,
    dueDate: new Date(baseDate.getTime() + (todoCounter * 24 * 60 * 60 * 1000)),
    ...overrides
  };
};

/**
 * Create multiple test todos
 */
export const createTestTodos = (count: number, baseOverrides: Partial<Todo> = {}): Todo[] => {
  return Array.from({ length: count }, (_, index) => 
    createTestTodo({
      ...baseOverrides,
      title: `${baseOverrides.title || 'Test Todo'} ${todoCounter + index + 1}`
    })
  );
};

/**
 * Create test date with offset
 */
export const createTestDate = (offsetDays: number = 0): Date => {
  dateCounter++;
  const baseDate = new Date('2025-08-09T12:00:00.000Z');
  return new Date(baseDate.getTime() + (offsetDays * 24 * 60 * 60 * 1000));
};

/**
 * Create completed todo
 */
export const createCompletedTodo = (overrides: Partial<Todo> = {}): Todo => {
  return createTestTodo({
    completed: true,
    updatedAt: new Date(),
    ...overrides
  });
};

/**
 * Create overdue todo
 */
export const createOverdueTodo = (overrides: Partial<Todo> = {}): Todo => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  return createTestTodo({
    dueDate: yesterday,
    ...overrides
  });
};

/**
 * Create todo with minimal data
 */
export const createMinimalTodo = (overrides: Partial<Todo> = {}): Todo => {
  return createTestTodo({
    description: undefined,
    dueDate: undefined,
    ...overrides
  });
};

/**
 * Create todo input with minimal data
 */
export const createMinimalTodoInput = (overrides: Partial<TodoInput> = {}): TodoInput => {
  return {
    title: `Minimal Todo ${++todoCounter}`,
    ...overrides
  };
};

/**
 * Common test data sets
 */
export const testDataSets = {
  // Mixed todo statuses
  mixedTodos: (): Todo[] => [
    createTestTodo({ title: 'Active Todo 1' }),
    createCompletedTodo({ title: 'Completed Todo 1' }),
    createOverdueTodo({ title: 'Overdue Todo 1' }),
    createTestTodo({ title: 'Active Todo 2', description: undefined }),
    createCompletedTodo({ title: 'Completed Todo 2', dueDate: undefined })
  ],
  
  // All completed todos
  completedTodos: (): Todo[] => [
    createCompletedTodo({ title: 'Completed Task 1' }),
    createCompletedTodo({ title: 'Completed Task 2' }),
    createCompletedTodo({ title: 'Completed Task 3' })
  ],
  
  // All active todos
  activeTodos: (): Todo[] => [
    createTestTodo({ title: 'Active Task 1' }),
    createTestTodo({ title: 'Active Task 2' }),
    createTestTodo({ title: 'Active Task 3' })
  ],
  
  // Todos with various due dates
  dueDateTodos: (): Todo[] => [
    createTestTodo({ 
      title: 'Due Today', 
      dueDate: new Date() 
    }),
    createTestTodo({ 
      title: 'Due Tomorrow', 
      dueDate: createTestDate(1) 
    }),
    createOverdueTodo({ 
      title: 'Overdue Task' 
    }),
    createTestTodo({ 
      title: 'No Due Date', 
      dueDate: undefined 
    })
  ]
};

/**
 * Form data generators for testing
 */
export const testFormData = {
  validTodoForm: () => ({
    title: 'Test Todo Form',
    description: 'Test description from form',
    dueDate: '2025-08-10' // ISO date string for input[type="date"]
  }),
  
  minimalTodoForm: () => ({
    title: 'Minimal Form Todo',
    description: '',
    dueDate: ''
  }),
  
  invalidTodoForm: () => ({
    title: '', // Invalid: empty title
    description: 'Description without title',
    dueDate: '2025-08-10'
  })
};