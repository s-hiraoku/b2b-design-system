/**
 * Application constants
 */

export const STORAGE_KEYS = {
  TODOS: 'todo-app-todos',
  VERSION: 'todo-app-version'
} as const;

export const VALIDATION_RULES = {
  TITLE_MIN_LENGTH: 1,
  TITLE_MAX_LENGTH: 200,
  DESCRIPTION_MAX_LENGTH: 1000
} as const;

export const STORAGE_VERSION = 1;