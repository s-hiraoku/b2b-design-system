# Code Generation Guidelines for TODO App

## Primary Code Generation Directive

**ALL CODE IMPLEMENTATION MUST BE GENERATED IN `projects/todo-app/src/` DIRECTORY**

Never create implementation files in `.kiro/specs/todo-app/` - this directory is only for specifications and documentation.

## Code Generation Workflow

### 1. Test-First Generation
Every piece of code MUST be generated with tests first, following the TDD Red-Green-Refactor cycle:

```typescript
// Step 1: Generate failing test first
describe('useTodos', () => {
  it('should add todo with generated ID and timestamps', async () => {
    const { result } = renderHook(() => useTodos());
    const todoInput: TodoInput = { title: 'Test Todo' };

    await act(async () => {
      await result.current.addTodo(todoInput);
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0]).toMatchObject({
      title: 'Test Todo',
      id: expect.any(String),
      createdAt: expect.any(Date)
    });
  });
});

// Step 2: Generate minimal implementation to pass test
export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const addTodo = async (todoInput: TodoInput) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      ...todoInput,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTodos(prev => [...prev, newTodo]);
  };

  return { todos, addTodo, /* other methods */ };
};

// Step 3: Refactor for production quality while keeping tests green
export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { saveToStorage } = useLocalStorage<Todo[]>(STORAGE_KEY, []);

  const addTodo = useCallback(async (todoInput: TodoInput) => {
    try {
      setLoading(true);
      setError(null);
      
      const validationErrors = validateTodoInput(todoInput);
      if (Object.keys(validationErrors).length > 0) {
        throw new Error('Validation failed');
      }

      const newTodo: Todo = {
        id: crypto.randomUUID(),
        ...todoInput,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      await saveToStorage(updatedTodos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [todos, saveToStorage]);

  return { 
    todos, 
    addTodo, 
    loading, 
    error,
    // ... other methods
  };
};
```

### 2. TypeScript-First Generation
Always generate TypeScript interfaces and types before implementation:

```typescript
// Generate types first
interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

interface TodoInput {
  title: string;
  description?: string;
  dueDate?: Date;
}

interface UseTodosReturn {
  todos: Todo[];
  addTodo: (todoData: TodoInput) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

// Then generate implementation
export const useTodos = (): UseTodosReturn => {
  // Implementation follows the interface contract
};
```

## Component Generation Patterns

### React Component Template
```typescript
// File: projects/todo-app/src/components/features/TodoForm/TodoForm.tsx

import React, { useState, useCallback } from 'react';
import { TodoInput } from '@/types/todo';
import { validateTodoInput } from '@/utils/validation';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import styles from './TodoForm.module.css';

export interface TodoFormProps {
  onAdd: (todoData: TodoInput) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export const TodoForm: React.FC<TodoFormProps> = ({ 
  onAdd, 
  loading = false, 
  error = null 
}) => {
  const [formData, setFormData] = useState<TodoInput>({
    title: '',
    description: ''
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleInputChange = useCallback((field: keyof TodoInput, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error for field
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [validationErrors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateTodoInput(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await onAdd(formData);
      setFormData({ title: '', description: '' });
      setValidationErrors({});
    } catch (err) {
      // Error handling managed by parent
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.field}>
        <Input
          id="todo-title"
          label="Title"
          value={formData.title}
          onChange={(value) => handleInputChange('title', value)}
          error={validationErrors.title}
          required
          maxLength={200}
          aria-describedby={validationErrors.title ? 'title-error' : undefined}
        />
      </div>

      <div className={styles.field}>
        <Input
          id="todo-description"
          label="Description"
          value={formData.description || ''}
          onChange={(value) => handleInputChange('description', value)}
          error={validationErrors.description}
          multiline
          maxLength={1000}
          aria-describedby={validationErrors.description ? 'description-error' : undefined}
        />
      </div>

      <div className={styles.actions}>
        <Button
          type="submit"
          variant="primary"
          disabled={loading || !formData.title.trim()}
          loading={loading}
          aria-describedby={error ? 'form-error' : undefined}
        >
          Add Todo
        </Button>
      </div>

      {error && (
        <div
          id="form-error"
          role="alert"
          className={styles.errorMessage}
          aria-live="polite"
        >
          {error}
        </div>
      )}
    </form>
  );
};

// Default export for easier imports
export default TodoForm;
```

### Custom Hook Template
```typescript
// File: projects/todo-app/src/hooks/useTodos.ts

import { useState, useCallback, useEffect } from 'react';
import { Todo, TodoInput } from '@/types/todo';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { validateTodoInput } from '@/utils/validation';
import { STORAGE_KEY } from '@/utils/constants';

export interface UseTodosReturn {
  todos: Todo[];
  addTodo: (todoData: TodoInput) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { data: storedTodos, setData: saveToStorage, loading: storageLoading } = 
    useLocalStorage<Todo[]>(STORAGE_KEY, []);

  // Load todos from storage on mount
  useEffect(() => {
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, [storedTodos]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const addTodo = useCallback(async (todoData: TodoInput): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Validate input
      const validationErrors = validateTodoInput(todoData);
      if (Object.keys(validationErrors).length > 0) {
        throw new Error('Invalid todo data');
      }

      // Create new todo
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        ...todoData,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Update state and storage
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      await saveToStorage(updatedTodos);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add todo';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [todos, saveToStorage]);

  const updateTodo = useCallback(async (id: string, updates: Partial<Todo>): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const todoIndex = todos.findIndex(todo => todo.id === id);
      if (todoIndex === -1) {
        throw new Error('Todo not found');
      }

      const updatedTodo = {
        ...todos[todoIndex],
        ...updates,
        updatedAt: new Date()
      };

      const updatedTodos = [...todos];
      updatedTodos[todoIndex] = updatedTodo;

      setTodos(updatedTodos);
      await saveToStorage(updatedTodos);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update todo';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [todos, saveToStorage]);

  const deleteTodo = useCallback(async (id: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
      await saveToStorage(updatedTodos);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete todo';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [todos, saveToStorage]);

  const toggleTodo = useCallback(async (id: string): Promise<void> => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const updates: Partial<Todo> = {
      completed: !todo.completed,
      completedAt: !todo.completed ? new Date() : undefined
    };

    await updateTodo(id, updates);
  }, [todos, updateTodo]);

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    loading: loading || storageLoading,
    error,
    clearError
  };
};
```

## Testing Generation Patterns

### Component Test Template
```typescript
// File: projects/todo-app/src/components/features/TodoForm/TodoForm.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { TodoForm } from './TodoForm';
import type { TodoFormProps } from './TodoForm';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Test setup
const user = userEvent.setup();

const defaultProps: TodoFormProps = {
  onAdd: jest.fn(),
  loading: false,
  error: null
};

const renderTodoForm = (props: Partial<TodoFormProps> = {}) => {
  return render(<TodoForm {...defaultProps} {...props} />);
};

describe('TodoForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render form with title and description inputs', () => {
      renderTodoForm();

      expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /add todo/i })).toBeInTheDocument();
    });

    it('should render error message when error prop is provided', () => {
      const errorMessage = 'Something went wrong';
      renderTodoForm({ error: errorMessage });

      expect(screen.getByRole('alert')).toHaveTextContent(errorMessage);
    });

    it('should disable submit button when loading', () => {
      renderTodoForm({ loading: true });

      expect(screen.getByRole('button', { name: /add todo/i })).toBeDisabled();
    });
  });

  describe('user interactions', () => {
    it('should call onAdd with form data when form is submitted', async () => {
      const mockOnAdd = jest.fn().mockResolvedValue(undefined);
      renderTodoForm({ onAdd: mockOnAdd });

      const titleInput = screen.getByLabelText(/title/i);
      const descriptionInput = screen.getByLabelText(/description/i);
      const submitButton = screen.getByRole('button', { name: /add todo/i });

      await user.type(titleInput, 'Test Todo');
      await user.type(descriptionInput, 'Test Description');
      await user.click(submitButton);

      expect(mockOnAdd).toHaveBeenCalledWith({
        title: 'Test Todo',
        description: 'Test Description'
      });
    });

    it('should reset form after successful submission', async () => {
      const mockOnAdd = jest.fn().mockResolvedValue(undefined);
      renderTodoForm({ onAdd: mockOnAdd });

      const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
      const descriptionInput = screen.getByLabelText(/description/i) as HTMLInputElement;

      await user.type(titleInput, 'Test Todo');
      await user.type(descriptionInput, 'Test Description');
      await user.click(screen.getByRole('button', { name: /add todo/i }));

      await waitFor(() => {
        expect(titleInput.value).toBe('');
        expect(descriptionInput.value).toBe('');
      });
    });

    it('should show validation error for empty title', async () => {
      const mockOnAdd = jest.fn();
      renderTodoForm({ onAdd: mockOnAdd });

      const submitButton = screen.getByRole('button', { name: /add todo/i });
      await user.click(submitButton);

      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
      expect(mockOnAdd).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should meet WCAG 2.1 AA accessibility standards', async () => {
      const { container } = renderTodoForm();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should support keyboard navigation', async () => {
      renderTodoForm();

      const titleInput = screen.getByLabelText(/title/i);
      const descriptionInput = screen.getByLabelText(/description/i);
      const submitButton = screen.getByRole('button', { name: /add todo/i });

      // Test tab navigation
      titleInput.focus();
      expect(titleInput).toHaveFocus();

      await user.tab();
      expect(descriptionInput).toHaveFocus();

      await user.tab();
      expect(submitButton).toHaveFocus();
    });

    it('should announce errors to screen readers', () => {
      const errorMessage = 'Validation failed';
      renderTodoForm({ error: errorMessage });

      const errorElement = screen.getByRole('alert');
      expect(errorElement).toHaveAttribute('aria-live', 'polite');
      expect(errorElement).toHaveTextContent(errorMessage);
    });
  });

  describe('form validation', () => {
    it('should disable submit button when title is empty', () => {
      renderTodoForm();

      const submitButton = screen.getByRole('button', { name: /add todo/i });
      expect(submitButton).toBeDisabled();
    });

    it('should enable submit button when title has content', async () => {
      renderTodoForm();

      const titleInput = screen.getByLabelText(/title/i);
      const submitButton = screen.getByRole('button', { name: /add todo/i });

      await user.type(titleInput, 'Test Todo');
      expect(submitButton).toBeEnabled();
    });

    it('should respect maximum character limits', async () => {
      renderTodoForm();

      const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
      expect(titleInput).toHaveAttribute('maxLength', '200');

      const descriptionInput = screen.getByLabelText(/description/i) as HTMLTextAreaElement;
      expect(descriptionInput).toHaveAttribute('maxLength', '1000');
    });
  });
});
```

## File Generation Templates

### Directory Creation Pattern
```typescript
// When generating new feature components, create this structure:
projects/todo-app/src/components/features/[FeatureName]/
├── [FeatureName].tsx           // Main component
├── [FeatureName].test.tsx      // Component tests  
├── [FeatureName].module.css    // Component styles
└── index.ts                    // Re-exports

// Example for TodoItem:
projects/todo-app/src/components/features/TodoItem/
├── TodoItem.tsx
├── TodoItem.test.tsx
├── TodoItem.module.css
└── index.ts
```

### Index File Template
```typescript
// File: projects/todo-app/src/components/features/TodoItem/index.ts
export { TodoItem } from './TodoItem';
export type { TodoItemProps } from './TodoItem';
```

### CSS Module Template
```css
/* File: projects/todo-app/src/components/features/TodoForm/TodoForm.module.css */

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-surface);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.errorMessage {
  color: var(--color-error);
  font-size: var(--font-size-sm);
  padding: 0.75rem;
  background: var(--color-error-surface);
  border-radius: var(--border-radius-sm);
  border-left: 3px solid var(--color-error);
}

/* Responsive design */
@media (max-width: 768px) {
  .form {
    padding: 0.75rem;
    gap: 0.75rem;
  }
  
  .actions {
    justify-content: stretch;
  }
  
  .actions button {
    flex: 1;
  }
}

/* Accessibility improvements */
.form:focus-within {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .errorMessage {
    border-width: 2px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .form * {
    transition: none;
  }
}
```

## Quality Standards for Generated Code

### Code Quality Checklist
- ✅ TypeScript strict mode compliance (no `any` types)
- ✅ React functional components with proper props interfaces
- ✅ Comprehensive test coverage (95%+ line coverage)
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ Responsive design implementation
- ✅ Error boundary integration
- ✅ LocalStorage error handling
- ✅ Performance optimization (React.memo, useMemo, useCallback)
- ✅ Proper ARIA attributes and semantic HTML
- ✅ CSS modules for component styling
- ✅ Mobile-first responsive approach

### Performance Considerations
```typescript
// Use React.memo for expensive components
export const TodoItem = React.memo<TodoItemProps>(({ todo, onToggle, onEdit, onDelete }) => {
  // Component implementation
}, (prevProps, nextProps) => {
  // Custom comparison for optimization
  return prevProps.todo.id === nextProps.todo.id &&
         prevProps.todo.completed === nextProps.todo.completed &&
         prevProps.todo.updatedAt === nextProps.todo.updatedAt;
});

// Use useMemo for expensive calculations
const filteredTodos = useMemo(() => {
  return todos.filter(todo => {
    switch (filter) {
      case 'active': return !todo.completed;
      case 'completed': return todo.completed;
      default: return true;
    }
  }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}, [todos, filter]);

// Use useCallback for stable function references
const handleToggle = useCallback((id: string) => {
  onToggle(id);
}, [onToggle]);
```

This comprehensive code generation guide ensures all generated code meets the high standards required for the TODO app implementation. Every piece of generated code should follow these patterns for consistency, quality, and maintainability.