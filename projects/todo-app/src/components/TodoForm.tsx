/**
 * TodoForm component - Task 3.3
 * Accessible form with real-time validation and error handling
 */

import React, { useState, useRef } from 'react';
import { TodoInput } from '../types/todo';
import { validateTodoInput } from '../utils/validation';

interface TodoFormProps {
  onSubmit: (todo: TodoInput) => void;
  disabled?: boolean;
  initialValues?: Partial<TodoInput>;
  submitButtonText?: string;
}

function TodoForm({ 
  onSubmit, 
  disabled = false,
  initialValues = {},
  submitButtonText = 'Add Todo'
}: TodoFormProps) {
  const [formData, setFormData] = useState<TodoInput>({
    title: initialValues.title || '',
    description: initialValues.description || '',
    dueDate: initialValues.dueDate
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitAttempt, setLastSubmitAttempt] = useState<number>(0);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Real-time validation
  const validateForm = (data: TodoInput = formData): boolean => {
    const validation = validateTodoInput(data);
    setErrors(validation.errors);
    return validation.isValid;
  };

  const handleInputChange = (
    field: keyof TodoInput,
    value: string | Date | undefined
  ) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    
    // Clear errors on input change (debounced validation)
    if (errors.length > 0) {
      setTimeout(() => validateForm(updatedData), 300);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent rapid successive submissions
    const now = Date.now();
    if (now - lastSubmitAttempt < 1000) {
      return;
    }
    setLastSubmitAttempt(now);

    // Validate form
    if (!validateForm()) {
      // Focus first input with error
      titleInputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      // Format due date properly
      const todoData: TodoInput = {
        title: formData.title.trim(),
        description: formData.description?.trim() || undefined,
        dueDate: formData.dueDate
      };

      await onSubmit(todoData);

      // Reset form on successful submission
      setFormData({
        title: '',
        description: '',
        dueDate: undefined
      });
      setErrors([]);

      // Focus back to title input for better UX
      titleInputRef.current?.focus();

    } catch (error) {
      console.error('Error submitting todo:', error);
      setErrors(['Failed to add todo. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateForInput = (date: Date | undefined): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const parseDateFromInput = (dateString: string): Date | undefined => {
    if (!dateString) return undefined;
    const date = new Date(dateString + 'T00:00:00');
    return isNaN(date.getTime()) ? undefined : date;
  };

  const isFormDisabled = disabled || isSubmitting;

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit}
      className="todo-form"
      noValidate
      aria-labelledby="todo-form-heading"
    >
      {/* Error Display */}
      {errors.length > 0 && (
        <div 
          className="todo-form__errors"
          role="alert"
          aria-labelledby="error-heading"
        >
          <h3 id="error-heading" className="todo-form__error-heading">
            Please fix the following errors:
          </h3>
          <ul className="todo-form__error-list">
            {errors.map((error, index) => (
              <li key={index} className="todo-form__error-item">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Title Field */}
      <div className="todo-form__field">
        <label 
          htmlFor="todo-title"
          className="todo-form__label"
        >
          Title *
        </label>
        <input
          ref={titleInputRef}
          type="text"
          id="todo-title"
          name="title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          disabled={isFormDisabled}
          required
          maxLength={200}
          className="todo-form__input"
          aria-describedby="title-help title-counter"
          aria-invalid={errors.some(error => error.includes('title') || error.includes('Title'))}
          placeholder="Enter todo title"
        />
        <div className="todo-form__field-help">
          <span id="title-help" className="todo-form__help-text">
            Brief description of the task (required)
          </span>
          <span id="title-counter" className="todo-form__counter">
            {formData.title.length}/200
          </span>
        </div>
      </div>

      {/* Description Field */}
      <div className="todo-form__field">
        <label 
          htmlFor="todo-description"
          className="todo-form__label"
        >
          Description
        </label>
        <textarea
          id="todo-description"
          name="description"
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          disabled={isFormDisabled}
          maxLength={1000}
          rows={3}
          className="todo-form__textarea"
          aria-describedby="description-help description-counter"
          placeholder="Additional details (optional)"
        />
        <div className="todo-form__field-help">
          <span id="description-help" className="todo-form__help-text">
            Optional additional details about the task
          </span>
          <span id="description-counter" className="todo-form__counter">
            {(formData.description || '').length}/1000
          </span>
        </div>
      </div>

      {/* Due Date Field */}
      <div className="todo-form__field">
        <label 
          htmlFor="todo-due-date"
          className="todo-form__label"
        >
          Due Date
        </label>
        <input
          type="date"
          id="todo-due-date"
          name="dueDate"
          value={formatDateForInput(formData.dueDate)}
          onChange={(e) => handleInputChange('dueDate', parseDateFromInput(e.target.value))}
          disabled={isFormDisabled}
          min={new Date().toISOString().split('T')[0]}
          className="todo-form__input todo-form__input--date"
          aria-describedby="due-date-help"
        />
        <span id="due-date-help" className="todo-form__help-text">
          Optional deadline for the task
        </span>
      </div>

      {/* Submit Button */}
      <div className="todo-form__actions">
        <button
          type="submit"
          disabled={isFormDisabled}
          className="todo-form__submit"
          aria-describedby="submit-help"
        >
          {isSubmitting ? (
            <>
              <span className="todo-form__loading-spinner" aria-hidden="true" />
              Adding...
            </>
          ) : (
            submitButtonText
          )}
        </button>
        <span id="submit-help" className="sr-only">
          {isSubmitting ? 'Adding your todo, please wait' : 'Click to add the todo to your list'}
        </span>
      </div>

      {/* Form Status for Screen Readers */}
      {isSubmitting && (
        <div 
          className="sr-only" 
          role="status" 
          aria-live="polite"
        >
          Adding todo, please wait...
        </div>
      )}
    </form>
  );
}

export default TodoForm;