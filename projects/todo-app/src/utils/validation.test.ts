/**
 * TDD RED Phase: Validation utilities tests
 */

import { validateTodoInput, validateTitle, validateDescription, ValidationResult } from './validation';
import { TodoInput } from '../types/todo';

describe('Validation utilities', () => {
  describe('validateTitle', () => {
    it('should return valid result for non-empty title', () => {
      const result = validateTitle('Valid title');
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should return invalid result for empty title', () => {
      const result = validateTitle('');
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title is required');
    });

    it('should return invalid result for whitespace-only title', () => {
      const result = validateTitle('   ');
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title is required');
    });

    it('should return invalid result for title exceeding max length', () => {
      const longTitle = 'a'.repeat(201);
      const result = validateTitle(longTitle);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title must be 200 characters or less');
    });
  });

  describe('validateDescription', () => {
    it('should return valid result for valid description', () => {
      const result = validateDescription('Valid description');
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should return valid result for empty description', () => {
      const result = validateDescription('');
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should return invalid result for description exceeding max length', () => {
      const longDescription = 'a'.repeat(1001);
      const result = validateDescription(longDescription);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Description must be 1000 characters or less');
    });
  });

  describe('validateTodoInput', () => {
    it('should return valid result for valid todo input', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7); // 7 days from now
      
      const input: TodoInput = {
        title: 'Valid task',
        description: 'Valid description',
        dueDate: futureDate
      };
      
      const result = validateTodoInput(input);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should return invalid result for invalid title', () => {
      const input: TodoInput = {
        title: '',
        description: 'Valid description'
      };
      
      const result = validateTodoInput(input);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title is required');
    });

    it('should return invalid result for past due date', () => {
      const pastDate = new Date('2020-01-01');
      const input: TodoInput = {
        title: 'Valid task',
        dueDate: pastDate
      };
      
      const result = validateTodoInput(input);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Due date must be in the future');
    });

    it('should accumulate multiple validation errors', () => {
      const input: TodoInput = {
        title: '',
        description: 'a'.repeat(1001),
        dueDate: new Date('2020-01-01')
      };
      
      const result = validateTodoInput(input);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title is required');
      expect(result.errors).toContain('Description must be 1000 characters or less');
      expect(result.errors).toContain('Due date must be in the future');
    });
  });
});