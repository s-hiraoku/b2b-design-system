/**
 * TodoList Component Tests
 * Comprehensive test suite for TodoList component functionality
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList';
import { Todo } from '../types/todo';

// Mock TodoItem component
jest.mock('./TodoItem', () => {
  return function MockTodoItem({ todo, onUpdate, onDelete, onToggle }: any) {
    return (
      <div data-testid={`todo-item-${todo.id}`}>
        <span>{todo.title}</span>
        <button onClick={() => onUpdate(todo.id, { title: 'Updated' })}>Update</button>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
        <button onClick={() => onToggle(todo.id)}>Toggle</button>
      </div>
    );
  };
});

const mockOnUpdate = jest.fn();
const mockOnDelete = jest.fn();
const mockOnToggle = jest.fn();

// Test data
const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'First Todo',
    description: 'First description',
    completed: false,
    createdAt: new Date('2024-01-15T10:00:00Z'),
    dueDate: new Date('2024-01-20T10:00:00Z')
  },
  {
    id: '2',
    title: 'Second Todo',
    description: 'Second description',
    completed: true,
    createdAt: new Date('2024-01-16T10:00:00Z'),
    dueDate: new Date('2024-01-18T10:00:00Z'),
    completedAt: new Date('2024-01-17T10:00:00Z')
  },
  {
    id: '3',
    title: 'Third Todo',
    completed: false,
    createdAt: new Date('2024-01-17T10:00:00Z')
  }
];

describe('TodoList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders todo list with todos', () => {
      render(
        <TodoList
          todos={mockTodos}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
          filter="all"
        />
      );

      expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
      expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
      expect(screen.getByTestId('todo-item-3')).toBeInTheDocument();
      expect(screen.getByText('First Todo')).toBeInTheDocument();
      expect(screen.getByText('Second Todo')).toBeInTheDocument();
      expect(screen.getByText('Third Todo')).toBeInTheDocument();
    });

    it('renders loading state', () => {
      render(
        <TodoList
          todos={[]}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
          filter="all"
          loading={true}
        />
      );

      expect(screen.getByRole('status', { name: 'Loading todos' })).toBeInTheDocument();
      expect(screen.getByText(/Loading your todos/)).toBeInTheDocument();
    });

    it('renders empty state for all filter', () => {
      render(
        <TodoList
          todos={[]}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
          filter="all"
        />
      );

      expect(screen.getByText('No todos yet')).toBeInTheDocument();
      expect(screen.getByText('Your todo list is empty.')).toBeInTheDocument();
      expect(screen.getByText('Add your first todo using the form above.')).toBeInTheDocument();
    });

    it('renders empty state for active filter', () => {
      render(
        <TodoList
          todos={[]}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
          filter="active"
        />
      );

      expect(screen.getByText('No active todos')).toBeInTheDocument();
      expect(screen.getByText("Great job! You don't have any pending tasks.")).toBeInTheDocument();
      expect(screen.getByText('Add a new todo above to get started.')).toBeInTheDocument();
    });

    it('renders empty state for completed filter', () => {
      render(
        <TodoList
          todos={[]}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
          filter="completed"
        />
      );

      expect(screen.getByText('No completed todos')).toBeInTheDocument();
      expect(screen.getByText("You haven't completed any tasks yet.")).toBeInTheDocument();
      expect(screen.getByText('Mark tasks as complete by clicking the checkbox next to them.')).toBeInTheDocument();
    });

    it('renders sort controls', () => {
      render(
        <TodoList
          todos={mockTodos}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
          filter="all"
        />
      );

      expect(screen.getByText('Sort by:')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Due Date')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
    });
  });

  describe('Sorting', () => {
    it('sorts by creation date by default (descending)', () => {
      render(
        <TodoList
          todos={mockTodos}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
          filter="all"
        />
      );

      const todoItems = screen.getAllByTestId(/todo-item-/);
      expect(todoItems[0]).toHaveAttribute('data-testid', 'todo-item-3'); // Latest first
      expect(todoItems[1]).toHaveAttribute('data-testid', 'todo-item-2');
      expect(todoItems[2]).toHaveAttribute('data-testid', 'todo-item-1'); // Earliest last
    });

    it('sorts by title when title button is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoList
          todos={mockTodos}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
          filter="all"
        />
      );

      await user.click(screen.getByText('Title'));

      const todoItems = screen.getAllByTestId(/todo-item-/);
      expect(todoItems[0]).toHaveAttribute('data-testid', 'todo-item-1'); // "First Todo"
      expect(todoItems[1]).toHaveAttribute('data-testid', 'todo-item-2'); // "Second Todo"
      expect(todoItems[2]).toHaveAttribute('data-testid', 'todo-item-3'); // "Third Todo"
    });

    it('reverses sort order when same button is clicked twice', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoList
          todos={mockTodos}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
          filter="all"
        />
      );

      // Click title once (ascending)
      await user.click(screen.getByText('Title'));
      
      // Click title again (descending)
      await user.click(screen.getByText('Title'));

      const todoItems = screen.getAllByTestId(/todo-item-/);
      expect(todoItems[0]).toHaveAttribute('data-testid', 'todo-item-3'); // "Third Todo"
      expect(todoItems[1]).toHaveAttribute('data-testid', 'todo-item-2'); // "Second Todo"
      expect(todoItems[2]).toHaveAttribute('data-testid', 'todo-item-1'); // "First Todo"
    });

    it('sorts by due date correctly', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoList
          todos={mockTodos}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
          filter="all"
        />
      );

      await user.click(screen.getByText('Due Date'));

      const todoItems = screen.getAllByTestId(/todo-item-/);
      expect(todoItems[0]).toHaveAttribute('data-testid', 'todo-item-2'); // 2024-01-18
      expect(todoItems[1]).toHaveAttribute('data-testid', 'todo-item-1'); // 2024-01-20
      expect(todoItems[2]).toHaveAttribute('data-testid', 'todo-item-3'); // No due date (last)
    });

    it('sorts by status correctly', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoList
          todos={mockTodos}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
          filter="all"
        />
      );

      await user.click(screen.getByText('Status'));

      const todoItems = screen.getAllByTestId(/todo-item-/);
      // Active todos first, then completed
      expect(todoItems[0]).toHaveAttribute('data-testid', 'todo-item-1'); // active
      expect(todoItems[1]).toHaveAttribute('data-testid', 'todo-item-3'); // active
      expect(todoItems[2]).toHaveAttribute('data-testid', 'todo-item-2'); // completed
    });

    it('shows correct sort icons', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoList
          todos={mockTodos}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
          filter="all"
        />
      );

      // Default sort by date (descending)
      expect(screen.getByText('↓')).toBeInTheDocument();

      // Click title to sort ascending
      await user.click(screen.getByText('Title'));
      expect(screen.getByText('↑')).toBeInTheDocument();

      // Click title again to sort descending
      await user.click(screen.getByText('Title'));
      expect(screen.getByText('↓')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <TodoList
          todos={mockTodos}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
          filter="all"
        />
      );

      expect(screen.getByRole('toolbar', { name: 'Sort todos' })).toBeInTheDocument();
      expect(screen.getByRole('list')).toBeInTheDocument();
      
      // Check sort buttons specifically (they should have aria-labels)
      const sortButtons = screen.getAllByRole('button').filter(button => 
        button.classList.contains('todo-list__sort-button')
      );
      
      expect(sortButtons.length).toBeGreaterThan(0);
      sortButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-label');
      });
    });

    it('announces sort changes to screen readers', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoList
          todos={mockTodos}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
          filter="all"
        />
      );

      expect(screen.getByText(/Showing 3.*todos, sorted by creation date descending/)).toBeInTheDocument();

      await user.click(screen.getByText('Title'));

      expect(screen.getByText(/Showing 3.*todos, sorted by title ascending/)).toBeInTheDocument();
    });

    it('has proper aria-label for list based on filter', () => {
      const { rerender } = render(
        <TodoList
          todos={mockTodos}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
          filter="all"
        />
      );

      expect(screen.getByLabelText('3 todos')).toBeInTheDocument();

      rerender(
        <TodoList
          todos={mockTodos.filter(t => !t.completed)}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
          filter="active"
        />
      );

      expect(screen.getByLabelText('2 active todos')).toBeInTheDocument();

      rerender(
        <TodoList
          todos={mockTodos.filter(t => t.completed)}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
          filter="completed"
        />
      );

      expect(screen.getByLabelText('1 completed todo')).toBeInTheDocument();
    });

    it('has proper sort button aria-labels', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoList
          todos={mockTodos}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
          filter="all"
        />
      );

      // Check initial button labels
      expect(screen.getByLabelText(/Sort by creation date, currently descending/)).toBeInTheDocument();
      expect(screen.getByLabelText('Sort by title')).toBeInTheDocument();
      expect(screen.getByLabelText('Sort by due date')).toBeInTheDocument();
      expect(screen.getByLabelText('Sort by completion status')).toBeInTheDocument();

      // Click title to make it active
      await user.click(screen.getByText('Title'));

      expect(screen.getByLabelText(/Sort by title, currently ascending/)).toBeInTheDocument();
    });
  });

  describe('Event Handling', () => {
    it('passes events to TodoItem components', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoList
          todos={mockTodos}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
          filter="all"
        />
      );

      // Test update
      await user.click(screen.getAllByText('Update')[0]);
      expect(mockOnUpdate).toHaveBeenCalledWith('3', { title: 'Updated' }); // Third todo is first (sorted by date desc)

      // Test delete
      await user.click(screen.getAllByText('Delete')[0]);
      expect(mockOnDelete).toHaveBeenCalledWith('3');

      // Test toggle
      await user.click(screen.getAllByText('Toggle')[0]);
      expect(mockOnToggle).toHaveBeenCalledWith('3');
    });
  });

  describe('List Item Structure', () => {
    it('wraps each todo in proper list item', () => {
      render(
        <TodoList
          todos={mockTodos}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
          filter="all"
        />
      );

      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
      
      listItems.forEach(listItem => {
        expect(listItem).toHaveClass('todo-list__item');
      });
    });
  });

  describe('Empty State Handling', () => {
    it('shows appropriate empty state based on filter', () => {
      const emptyStates = [
        { filter: 'all' as const, title: 'No todos yet', message: 'Your todo list is empty.' },
        { filter: 'active' as const, title: 'No active todos', message: "Great job! You don't have any pending tasks." },
        { filter: 'completed' as const, title: 'No completed todos', message: "You haven't completed any tasks yet." }
      ];

      emptyStates.forEach(({ filter, title, message }) => {
        const { unmount } = render(
          <TodoList
            todos={[]}
            onUpdate={mockOnUpdate}
            onDelete={mockOnDelete}
            onToggle={mockOnToggle}
            filter={filter}
          />
        );

        expect(screen.getByRole('status')).toBeInTheDocument();
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(message)).toBeInTheDocument();

        unmount();
      });
    });
  });
});