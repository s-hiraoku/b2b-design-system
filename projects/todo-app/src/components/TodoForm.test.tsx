/**
 * TodoForm Component Tests
 * Comprehensive test suite for TodoForm component functionality
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';
import TodoForm from './TodoForm';

// Helper to create dates that match component behavior
const createLocalDate = (dateString: string) => new Date(dateString + 'T00:00:00');

const mockOnSubmit = jest.fn().mockResolvedValue(undefined);

describe('TodoForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockOnSubmit.mockResolvedValue(undefined);
  });

  describe('Rendering', () => {
    it('renders all form fields', () => {
      render(<TodoForm onSubmit={mockOnSubmit} />);

      expect(screen.getByLabelText(/Title/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Description/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Due Date/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Add Todo' })).toBeInTheDocument();
    });

    it('renders custom submit button text', () => {
      render(
        <TodoForm 
          onSubmit={mockOnSubmit} 
          submitButtonText="Create Task"
        />
      );

      expect(screen.getByRole('button', { name: 'Create Task' })).toBeInTheDocument();
    });

    it('renders with initial values', () => {
      const initialValues = {
        title: 'Initial Title',
        description: 'Initial Description',
        dueDate: new Date('2025-12-25')
      };

      render(
        <TodoForm 
          onSubmit={mockOnSubmit} 
          initialValues={initialValues}
        />
      );

      expect(screen.getByDisplayValue('Initial Title')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Initial Description')).toBeInTheDocument();
      expect(screen.getByDisplayValue('2025-12-25')).toBeInTheDocument();
    });

    it('renders disabled state', () => {
      render(<TodoForm onSubmit={mockOnSubmit} disabled />);

      const titleInput = screen.getByLabelText(/Title/);
      const descriptionInput = screen.getByLabelText(/Description/);
      const dueDateInput = screen.getByLabelText(/Due Date/);
      const submitButton = screen.getByRole('button', { name: 'Add Todo' });

      expect(titleInput).toBeDisabled();
      expect(descriptionInput).toBeDisabled();
      expect(dueDateInput).toBeDisabled();
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Form Validation', () => {
    it('shows validation error for empty title', async () => {
      const user = userEvent.setup();
      
      render(<TodoForm onSubmit={mockOnSubmit} />);

      const submitButton = screen.getByRole('button', { name: 'Add Todo' });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Please fix the following errors/)).toBeInTheDocument();
        expect(screen.getByText(/Title is required/)).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('shows validation error for title too long', async () => {
      const user = userEvent.setup();
      
      render(<TodoForm onSubmit={mockOnSubmit} />);

      const titleInput = screen.getByLabelText(/Title/) as HTMLInputElement;
      const longTitle = 'a'.repeat(201); // Exceeds 200 char limit
      
      // Remove maxLength temporarily to test validation
      titleInput.removeAttribute('maxLength');
      
      await user.type(titleInput, longTitle);
      await user.click(screen.getByRole('button', { name: 'Add Todo' }));

      await waitFor(() => {
        expect(screen.getByText(/Title must be 200 characters or less/)).toBeInTheDocument();
      });
    });

    it('shows validation error for description too long', async () => {
      const user = userEvent.setup();
      
      render(<TodoForm onSubmit={mockOnSubmit} />);

      const titleInput = screen.getByLabelText(/Title/);
      const descriptionInput = screen.getByLabelText(/Description/) as HTMLTextAreaElement;
      const longDescription = 'a'.repeat(1001); // Exceeds 1000 char limit
      
      // Remove maxLength temporarily to test validation
      descriptionInput.removeAttribute('maxLength');
      
      await user.type(titleInput, 'Valid Title');
      await user.type(descriptionInput, longDescription);
      await user.click(screen.getByRole('button', { name: 'Add Todo' }));

      await waitFor(() => {
        expect(screen.getByText(/Description must be 1000 characters or less/)).toBeInTheDocument();
      });
    });

    it('clears errors on input change', async () => {
      const user = userEvent.setup();
      
      render(<TodoForm onSubmit={mockOnSubmit} />);

      // Trigger validation error
      await user.click(screen.getByRole('button', { name: 'Add Todo' }));
      
      await waitFor(() => {
        expect(screen.getByText(/Title is required/)).toBeInTheDocument();
      });

      // Start typing to clear errors
      const titleInput = screen.getByLabelText(/Title/);
      await user.type(titleInput, 'Valid Title');

      // Wait for debounced validation
      await waitFor(() => {
        expect(screen.queryByText(/Please fix the following errors/)).not.toBeInTheDocument();
      }, { timeout: 500 });
    });
  });

  describe('Form Submission', () => {
    it('submits valid form data', async () => {
      const user = userEvent.setup();
      
      render(<TodoForm onSubmit={mockOnSubmit} />);

      const titleInput = screen.getByLabelText(/Title/);
      const descriptionInput = screen.getByLabelText(/Description/);
      const dueDateInput = screen.getByLabelText(/Due Date/);

      await user.type(titleInput, 'Test Todo');
      await user.type(descriptionInput, 'Test description');
      await user.type(dueDateInput, '2025-12-25');

      await user.click(screen.getByRole('button', { name: 'Add Todo' }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          title: 'Test Todo',
          description: 'Test description',
          dueDate: createLocalDate('2025-12-25')
        });
      });
    });

    it('submits with minimal data (title only)', async () => {
      const user = userEvent.setup();
      
      render(<TodoForm onSubmit={mockOnSubmit} />);

      const titleInput = screen.getByLabelText(/Title/);
      await user.type(titleInput, 'Test Todo');

      await user.click(screen.getByRole('button', { name: 'Add Todo' }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          title: 'Test Todo',
          description: undefined,
          dueDate: undefined
        });
      });
    });

    it('trims whitespace from inputs', async () => {
      const user = userEvent.setup();
      
      render(<TodoForm onSubmit={mockOnSubmit} />);

      const titleInput = screen.getByLabelText(/Title/);
      const descriptionInput = screen.getByLabelText(/Description/);

      await user.type(titleInput, '  Test Todo  ');
      await user.type(descriptionInput, '  Test description  ');

      await user.click(screen.getByRole('button', { name: 'Add Todo' }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          title: 'Test Todo',
          description: 'Test description',
          dueDate: undefined
        });
      });
    });

    it('resets form after successful submission', async () => {
      const user = userEvent.setup();
      mockOnSubmit.mockResolvedValue(undefined);
      
      render(<TodoForm onSubmit={mockOnSubmit} />);

      const titleInput = screen.getByLabelText(/Title/);
      const descriptionInput = screen.getByLabelText(/Description/);

      await user.type(titleInput, 'Test Todo');
      await user.type(descriptionInput, 'Test description');

      await user.click(screen.getByRole('button', { name: 'Add Todo' }));

      await waitFor(() => {
        expect(titleInput).toHaveValue('');
        expect(descriptionInput).toHaveValue('');
      });
    });

    it('shows loading state during submission', async () => {
      const user = userEvent.setup();
      let resolveSubmit: () => void;
      const submitPromise = new Promise<void>((resolve) => {
        resolveSubmit = resolve;
      });
      mockOnSubmit.mockReturnValue(submitPromise);
      
      render(<TodoForm onSubmit={mockOnSubmit} />);

      const titleInput = screen.getByLabelText(/Title/);
      await user.type(titleInput, 'Test Todo');

      await user.click(screen.getByRole('button', { name: 'Add Todo' }));

      expect(screen.getByText('Adding...')).toBeInTheDocument();
      expect(screen.getByText(/Adding your todo, please wait/)).toBeInTheDocument();

      await act(async () => {
        resolveSubmit!();
        await submitPromise;
      });
    });

    it('prevents rapid successive submissions', async () => {
      const user = userEvent.setup();
      
      render(<TodoForm onSubmit={mockOnSubmit} />);

      const titleInput = screen.getByLabelText(/Title/);
      const submitButton = screen.getByRole('button', { name: 'Add Todo' });

      await user.type(titleInput, 'Test Todo');

      // Submit twice quickly
      await user.click(submitButton);
      await user.click(submitButton);

      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    it('handles submission errors', async () => {
      const user = userEvent.setup();
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      mockOnSubmit.mockRejectedValue(new Error('Submission failed'));
      
      render(<TodoForm onSubmit={mockOnSubmit} />);

      const titleInput = screen.getByLabelText(/Title/);
      await user.type(titleInput, 'Test Todo');

      await user.click(screen.getByRole('button', { name: 'Add Todo' }));

      await waitFor(() => {
        expect(screen.getByText(/Failed to add todo. Please try again./)).toBeInTheDocument();
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Character Counters', () => {
    it('shows title character counter', async () => {
      const user = userEvent.setup();
      
      render(<TodoForm onSubmit={mockOnSubmit} />);

      expect(screen.getByText('0/200')).toBeInTheDocument();

      const titleInput = screen.getByLabelText(/Title/);
      await user.type(titleInput, 'Test');

      expect(screen.getByText('4/200')).toBeInTheDocument();
    });

    it('shows description character counter', async () => {
      const user = userEvent.setup();
      
      render(<TodoForm onSubmit={mockOnSubmit} />);

      expect(screen.getByText('0/1000')).toBeInTheDocument();

      const descriptionInput = screen.getByLabelText(/Description/);
      await user.type(descriptionInput, 'Test description');

      expect(screen.getByText('16/1000')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper form labels', () => {
      render(<TodoForm onSubmit={mockOnSubmit} />);

      const titleInput = screen.getByLabelText(/Title \*/);
      const descriptionInput = screen.getByLabelText(/Description/);
      const dueDateInput = screen.getByLabelText(/Due Date/);

      expect(titleInput).toBeInTheDocument();
      expect(descriptionInput).toBeInTheDocument();
      expect(dueDateInput).toBeInTheDocument();
    });

    it('has proper ARIA attributes', () => {
      render(<TodoForm onSubmit={mockOnSubmit} />);

      const titleInput = screen.getByLabelText(/Title/);
      expect(titleInput).toHaveAttribute('aria-describedby', 'title-help title-counter');
      expect(titleInput).toHaveAttribute('aria-invalid', 'false');

      const descriptionInput = screen.getByLabelText(/Description/);
      expect(descriptionInput).toHaveAttribute('aria-describedby', 'description-help description-counter');
    });

    it('announces errors to screen readers', async () => {
      const user = userEvent.setup();
      
      render(<TodoForm onSubmit={mockOnSubmit} />);

      await user.click(screen.getByRole('button', { name: 'Add Todo' }));

      await waitFor(() => {
        const errorRegion = screen.getByRole('alert');
        expect(errorRegion).toBeInTheDocument();
        expect(errorRegion).toHaveAttribute('aria-labelledby', 'error-heading');
      });
    });

    it('focuses first error field on validation failure', async () => {
      const user = userEvent.setup();
      
      render(<TodoForm onSubmit={mockOnSubmit} />);

      await user.click(screen.getByRole('button', { name: 'Add Todo' }));

      await waitFor(() => {
        const titleInput = screen.getByLabelText(/Title/);
        expect(titleInput).toHaveFocus();
      });
    });
  });

  describe('Date Handling', () => {
    it('enforces minimum date (today)', () => {
      render(<TodoForm onSubmit={mockOnSubmit} />);

      const dueDateInput = screen.getByLabelText(/Due Date/);
      const today = new Date().toISOString().split('T')[0];
      
      expect(dueDateInput).toHaveAttribute('min', today);
    });

    it('handles date input correctly', async () => {
      const user = userEvent.setup();
      
      render(<TodoForm onSubmit={mockOnSubmit} />);

      const titleInput = screen.getByLabelText(/Title/);
      const dueDateInput = screen.getByLabelText(/Due Date/);

      await user.type(titleInput, 'Test Todo');
      await user.type(dueDateInput, '2025-12-25');

      await user.click(screen.getByRole('button', { name: 'Add Todo' }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          title: 'Test Todo',
          description: undefined,
          dueDate: createLocalDate('2025-12-25')
        });
      });
    });

    it('handles clearing date input', async () => {
      const user = userEvent.setup();
      
      render(<TodoForm onSubmit={mockOnSubmit} />);

      const titleInput = screen.getByLabelText(/Title/);
      const dueDateInput = screen.getByLabelText(/Due Date/);

      await user.type(titleInput, 'Test Todo');
      await user.type(dueDateInput, '2025-12-25');
      await user.clear(dueDateInput);

      await user.click(screen.getByRole('button', { name: 'Add Todo' }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          title: 'Test Todo',
          description: undefined,
          dueDate: undefined
        });
      });
    });
  });
});