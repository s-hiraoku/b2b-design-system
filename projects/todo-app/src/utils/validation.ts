/**
 * Validation utilities
 * TDD GREEN Phase: Minimal implementation to pass tests
 */

import { TodoInput } from '../types/todo';
import { VALIDATION_RULES } from './constants';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateTitle(title: string): ValidationResult {
  const errors: string[] = [];
  
  if (!title || title.trim().length === 0) {
    errors.push('Title is required');
  } else if (title.length > VALIDATION_RULES.TITLE_MAX_LENGTH) {
    errors.push('Title must be 200 characters or less');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateDescription(description: string): ValidationResult {
  const errors: string[] = [];
  
  if (description && description.length > VALIDATION_RULES.DESCRIPTION_MAX_LENGTH) {
    errors.push('Description must be 1000 characters or less');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateTodoInput(input: TodoInput): ValidationResult {
  const errors: string[] = [];
  
  // Validate title
  const titleResult = validateTitle(input.title);
  errors.push(...titleResult.errors);
  
  // Validate description
  if (input.description) {
    const descriptionResult = validateDescription(input.description);
    errors.push(...descriptionResult.errors);
  }
  
  // Validate due date
  if (input.dueDate) {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Reset time to beginning of day
    
    if (input.dueDate < now) {
      errors.push('Due date must be in the future');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}