/**
 * Form Testing Utilities
 * Comprehensive utilities for testing form interactions and submissions
 */

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

/**
 * Form interaction utilities
 */
export class FormTestingUtils {
  private user: UserEvent;

  constructor() {
    this.user = userEvent.setup();
  }

  /**
   * Fill form fields with proper async handling
   */
  async fillFormFields(formData: {
    title?: string;
    description?: string;
    dueDate?: string;
  }): Promise<void> {
    if (formData.title !== undefined) {
      const titleInput = screen.getByLabelText(/title/i);
      await this.user.clear(titleInput);
      if (formData.title) {
        await this.user.type(titleInput, formData.title);
      }
    }

    if (formData.description !== undefined) {
      const descriptionInput = screen.getByLabelText(/description/i);
      await this.user.clear(descriptionInput);
      if (formData.description) {
        await this.user.type(descriptionInput, formData.description);
      }
    }

    if (formData.dueDate !== undefined) {
      const dueDateInput = screen.getByLabelText(/due date/i);
      await this.user.clear(dueDateInput);
      if (formData.dueDate) {
        await this.user.type(dueDateInput, formData.dueDate);
      }
    }
  }

  /**
   * Submit form with proper async handling
   */
  async submitForm(buttonText: string = 'Add Todo'): Promise<void> {
    const submitButton = screen.getByRole('button', { name: buttonText });
    await this.user.click(submitButton);
  }

  /**
   * Fill and submit form in one action
   */
  async fillAndSubmitForm(
    formData: {
      title?: string;
      description?: string;
      dueDate?: string;
    },
    buttonText: string = 'Add Todo'
  ): Promise<void> {
    await this.fillFormFields(formData);
    await this.submitForm(buttonText);
  }

  /**
   * Validate form submission with expected data
   */
  async expectFormSubmission(
    mockOnSubmit: jest.Mock,
    expectedData: {
      title: string;
      description?: string;
      dueDate?: Date;
    }
  ): Promise<void> {
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    const submittedData = mockOnSubmit.mock.calls[0][0];
    
    expect(submittedData.title).toBe(expectedData.title);
    
    if (expectedData.description !== undefined) {
      expect(submittedData.description).toBe(expectedData.description);
    }
    
    if (expectedData.dueDate) {
      expect(submittedData.dueDate).toEqual(expectedData.dueDate);
    }
  }

  /**
   * Validate form validation error display
   */
  async expectValidationError(errorText: string | RegExp): Promise<void> {
    await waitFor(() => {
      expect(screen.getByText(errorText)).toBeInTheDocument();
    }, { timeout: 3000 });
  }

  /**
   * Validate no form submission occurred
   */
  expectNoFormSubmission(mockOnSubmit: jest.Mock): void {
    expect(mockOnSubmit).not.toHaveBeenCalled();
  }

  /**
   * Check form field values
   */
  expectFormFieldValues(expectedValues: {
    title?: string;
    description?: string;
    dueDate?: string;
  }): void {
    if (expectedValues.title !== undefined) {
      expect(screen.getByDisplayValue(expectedValues.title)).toBeInTheDocument();
    }
    
    if (expectedValues.description !== undefined) {
      expect(screen.getByDisplayValue(expectedValues.description)).toBeInTheDocument();
    }
    
    if (expectedValues.dueDate !== undefined) {
      expect(screen.getByDisplayValue(expectedValues.dueDate)).toBeInTheDocument();
    }
  }

  /**
   * Validate form accessibility
   */
  validateFormAccessibility(): void {
    // Check for proper form structure
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();

    // Check for proper labeling
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByRole('button', { name: /add todo/i })).toBeInTheDocument();
  }

  /**
   * Check form reset functionality
   */
  async expectFormReset(): Promise<void> {
    await waitFor(() => {
      const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
      const descriptionInput = screen.getByLabelText(/description/i) as HTMLTextAreaElement;
      const dueDateInput = screen.getByLabelText(/due date/i) as HTMLInputElement;

      expect(titleInput.value).toBe('');
      expect(descriptionInput.value).toBe('');
      expect(dueDateInput.value).toBe('');
    });
  }
}

/**
 * Date input utilities for consistent date handling
 */
export class DateInputUtils {
  /**
   * Convert Date to input[type="date"] value format (YYYY-MM-DD)
   */
  static toDateInputValue(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  /**
   * Convert input[type="date"] value to Date at midnight UTC
   */
  static fromDateInputValue(dateString: string): Date {
    return new Date(`${dateString}T00:00:00.000Z`);
  }

  /**
   * Get today's date as input[type="date"] value
   */
  static getTodayInputValue(): string {
    return this.toDateInputValue(new Date());
  }

  /**
   * Get tomorrow's date as input[type="date"] value
   */
  static getTomorrowInputValue(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return this.toDateInputValue(tomorrow);
  }

  /**
   * Get yesterday's date as input[type="date"] value
   */
  static getYesterdayInputValue(): string {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return this.toDateInputValue(yesterday);
  }
}

/**
 * Mock utilities for form testing
 */
export class FormMockUtils {
  /**
   * Create a properly typed onSubmit mock
   */
  static createOnSubmitMock(): jest.Mock {
    return jest.fn();
  }

  /**
   * Create a mock that simulates async form submission
   */
  static createAsyncOnSubmitMock(delay: number = 100): jest.Mock {
    return jest.fn().mockImplementation(async (data) => {
      await new Promise(resolve => setTimeout(resolve, delay));
      return data;
    });
  }

  /**
   * Create a mock that simulates form submission error
   */
  static createErrorOnSubmitMock(errorMessage: string = 'Submission failed'): jest.Mock {
    return jest.fn().mockRejectedValue(new Error(errorMessage));
  }
}

/**
 * Validation testing utilities
 */
export class ValidationTestUtils {
  /**
   * Test required field validation
   */
  static async testRequiredFieldValidation(
    formUtils: FormTestingUtils,
    fieldName: keyof { title: string; description: string; dueDate: string },
    errorMessage: string | RegExp
  ): Promise<void> {
    const mockOnSubmit = FormMockUtils.createOnSubmitMock();
    
    // Try to submit form with empty required field
    await formUtils.fillAndSubmitForm({ [fieldName]: '' });
    
    // Should show validation error
    await formUtils.expectValidationError(errorMessage);
    
    // Should not call onSubmit
    formUtils.expectNoFormSubmission(mockOnSubmit);
  }

  /**
   * Test field character limits
   */
  static async testFieldCharacterLimit(
    formUtils: FormTestingUtils,
    fieldName: keyof { title: string; description: string },
    limit: number,
    errorMessage: string | RegExp
  ): Promise<void> {
    const longText = 'a'.repeat(limit + 1);
    
    await formUtils.fillFormFields({ [fieldName]: longText });
    await formUtils.submitForm();
    
    await formUtils.expectValidationError(errorMessage);
  }
}

/**
 * Export convenience function to create form testing utils
 */
export const createFormTestingUtils = (): FormTestingUtils => {
  return new FormTestingUtils();
};

/**
 * Common form test scenarios
 */
export const commonFormScenarios = {
  validSubmission: {
    title: 'Valid Todo Title',
    description: 'Valid todo description',
    dueDate: DateInputUtils.getTomorrowInputValue()
  },
  
  minimalValidSubmission: {
    title: 'Minimal Todo',
    description: '',
    dueDate: ''
  },
  
  invalidSubmission: {
    title: '', // Invalid: empty title
    description: 'Description without title',
    dueDate: DateInputUtils.getTodayInputValue()
  }
};