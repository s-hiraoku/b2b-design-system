/**
 * TodoItem Component Tests
 * Comprehensive test suite for TodoItem component functionality
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo';

// Mock functions
const mockOnUpdate = jest.fn();
const mockOnDelete = jest.fn();
const mockOnToggle = jest.fn();

// Test data
const mockTodo: Todo = {
  id: '1',
  title: 'Test Todo',
  description: 'Test description',
  completed: false,
  createdAt: new Date('2024-01-15T10:00:00Z'),
  dueDate: new Date('2024-01-20T10:00:00Z')
};

const completedTodo: Todo = {
  ...mockTodo,
  completed: true,
  completedAt: new Date('2024-01-16T10:00:00Z')
};

const overdueTodo: Todo = {
  ...mockTodo,
  dueDate: new Date('2024-01-10T10:00:00Z') // Past date
};

const todayDueTodo: Todo = {
  ...mockTodo,
  dueDate: new Date() // Today
};

describe('TodoItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Display', () => {
    it('renders todo item correctly', () => {
      render(
        <TodoItem
          todo={mockTodo}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      expect(screen.getByText('Test Todo')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('shows completion status correctly', () => {
      render(
        <TodoItem
          todo={completedTodo}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('displays due date correctly', () => {
      render(
        <TodoItem
          todo={mockTodo}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      const dueDateElements = screen.getAllByText(/Due:/);
      const visibleDueDate = dueDateElements.find(el => !el.closest('.sr-only'));
      expect(visibleDueDate).toBeInTheDocument();
    });

    it('shows overdue status', () => {
      render(
        <TodoItem
          todo={overdueTodo}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      const overdueElements = screen.getAllByText(/Overdue/);
      const visibleOverdue = overdueElements.find(el => !el.closest('.sr-only'));
      expect(visibleOverdue).toBeInTheDocument();
    });

    it('shows today due status', () => {
      render(
        <TodoItem
          todo={todayDueTodo}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      expect(screen.getByText(/Today/)).toBeInTheDocument();
    });

    it('handles todo without description', () => {
      const todoWithoutDescription = { ...mockTodo, description: undefined };
      render(
        <TodoItem
          todo={todoWithoutDescription}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      expect(screen.getByText('Test Todo')).toBeInTheDocument();
      expect(screen.queryByText('Test description')).not.toBeInTheDocument();
    });

    it('handles todo without due date', () => {
      const todoWithoutDueDate = { ...mockTodo, dueDate: undefined };
      render(
        <TodoItem
          todo={todoWithoutDueDate}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      expect(screen.queryByText(/Due:/)).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onToggle when checkbox is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoItem
          todo={mockTodo}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      expect(mockOnToggle).toHaveBeenCalledWith('1');
    });

    it('enters edit mode when edit button is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoItem
          todo={mockTodo}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      const editButton = screen.getByText('Edit');
      await user.click(editButton);

      expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test description')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('exits edit mode when cancel is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoItem
          todo={mockTodo}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      // Enter edit mode
      await user.click(screen.getByText('Edit'));
      
      // Cancel edit
      await user.click(screen.getByText('Cancel'));

      expect(screen.getByText('Test Todo')).toBeInTheDocument();
      expect(screen.queryByDisplayValue('Test Todo')).not.toBeInTheDocument();
    });

    it('saves changes when save button is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoItem
          todo={mockTodo}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      // Enter edit mode
      await user.click(screen.getByText('Edit'));
      
      // Edit title
      const titleInput = screen.getByDisplayValue('Test Todo');
      await user.clear(titleInput);
      await user.type(titleInput, 'Updated Todo');
      
      // Save changes
      await user.click(screen.getByText('Save'));

      expect(mockOnUpdate).toHaveBeenCalledWith('1', {
        title: 'Updated Todo',
        description: 'Test description',
        dueDate: mockTodo.dueDate
      });
    });

    it('shows delete confirmation when delete is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoItem
          todo={mockTodo}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      await user.click(screen.getByText('Delete'));

      expect(screen.getByText('Delete Todo')).toBeInTheDocument();
      expect(screen.getByText(/Are you sure you want to delete "Test Todo"/)).toBeInTheDocument();
    });

    it('calls onDelete when delete is confirmed', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoItem
          todo={mockTodo}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      await user.click(screen.getByText('Delete'));
      
      // Confirm deletion
      const confirmButton = screen.getByRole('button', { name: 'Delete' });
      await user.click(confirmButton);

      expect(mockOnDelete).toHaveBeenCalledWith('1');
    });

    it('cancels delete when cancel is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoItem
          todo={mockTodo}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      await user.click(screen.getByText('Delete'));
      await user.click(screen.getByRole('button', { name: 'Cancel' }));

      expect(screen.queryByText('Delete Todo')).not.toBeInTheDocument();
      expect(mockOnDelete).not.toHaveBeenCalled();
    });
  });

  describe('Keyboard Navigation', () => {
    it('saves on Ctrl+Enter in edit mode', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoItem
          todo={mockTodo}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      // Enter edit mode
      await user.click(screen.getByText('Edit'));
      
      // Edit title and press Ctrl+Enter
      const titleInput = screen.getByDisplayValue('Test Todo');
      await user.clear(titleInput);
      await user.type(titleInput, 'Updated Todo');
      
      await act(async () => {
        fireEvent.keyDown(titleInput, { key: 'Enter', ctrlKey: true });
      });

      expect(mockOnUpdate).toHaveBeenCalledWith('1', {
        title: 'Updated Todo',
        description: 'Test description',
        dueDate: mockTodo.dueDate
      });
    });

    it('cancels on Escape in edit mode', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoItem
          todo={mockTodo}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      // Enter edit mode
      await user.click(screen.getByText('Edit'));
      
      // Press escape
      const titleInput = screen.getByDisplayValue('Test Todo');
      await act(async () => {
        fireEvent.keyDown(titleInput, { key: 'Escape' });
      });

      expect(screen.getByText('Test Todo')).toBeInTheDocument();
      expect(screen.queryByDisplayValue('Test Todo')).not.toBeInTheDocument();
    });
  });

  describe('Validation', () => {
    it('does not save empty title', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoItem
          todo={mockTodo}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      // Enter edit mode
      await user.click(screen.getByText('Edit'));
      
      // Clear title
      const titleInput = screen.getByDisplayValue('Test Todo');
      await user.clear(titleInput);
      
      // Try to save
      await user.click(screen.getByText('Save'));

      expect(mockOnUpdate).not.toHaveBeenCalled();
    });

    it('disables save button when title is empty', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoItem
          todo={mockTodo}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      // Enter edit mode
      await user.click(screen.getByText('Edit'));
      
      // Clear title
      const titleInput = screen.getByDisplayValue('Test Todo');
      await user.clear(titleInput);

      const saveButton = screen.getByText('Save');
      expect(saveButton).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(
        <TodoItem
          todo={mockTodo}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      const checkbox = screen.getByRole('checkbox');
      const editButton = screen.getByLabelText('Edit todo: Test Todo');
      const deleteButton = screen.getByLabelText('Delete todo: Test Todo');

      expect(checkbox).toBeInTheDocument();
      expect(editButton).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();
    });

    it('has proper screen reader content', () => {
      render(
        <TodoItem
          todo={mockTodo}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      // Screen reader content should include todo details
      const srContent = screen.getByText(/Todo: Test Todo/);
      expect(srContent).toBeInTheDocument();
    });

    it('has proper focus management in edit mode', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoItem
          todo={mockTodo}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      await user.click(screen.getByText('Edit'));

      await waitFor(() => {
        const titleInput = screen.getByDisplayValue('Test Todo');
        expect(titleInput).toHaveFocus();
      });
    });
  });

  describe('Date Handling', () => {
    it('handles date input changes correctly', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoItem
          todo={mockTodo}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      // Enter edit mode
      await user.click(screen.getByText('Edit'));
      
      // Find and change date input
      const dateInput = screen.getByDisplayValue('2024-01-20');
      await user.clear(dateInput);
      await user.type(dateInput, '2024-01-25');
      
      // Save changes
      await user.click(screen.getByText('Save'));

      expect(mockOnUpdate).toHaveBeenCalledWith('1', {
        title: 'Test Todo',
        description: 'Test description',
        dueDate: new Date('2024-01-25T00:00:00')
      });
    });

    it('handles clearing due date', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoItem
          todo={mockTodo}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      );

      // Enter edit mode
      await user.click(screen.getByText('Edit'));
      
      // Clear date
      const dateInput = screen.getByDisplayValue('2024-01-20');
      await user.clear(dateInput);
      
      // Save changes
      await user.click(screen.getByText('Save'));

      expect(mockOnUpdate).toHaveBeenCalledWith('1', {
        title: 'Test Todo',
        description: 'Test description',
        dueDate: undefined
      });
    });
  });
});