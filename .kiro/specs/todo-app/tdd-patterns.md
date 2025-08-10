# TDD Patterns and Guidelines for TODO App

## Test-Driven Development Methodology

This document establishes the TDD patterns and practices for the TODO app implementation, following the t-wada methodology with strict Red-Green-Refactor cycles.

## TDD Cycle Enforcement

### Red Phase: Failing Test Creation
```typescript
// Example: Red Phase - Create failing test first
describe('TodoForm', () => {
  it('should add new todo when form is submitted with valid data', () => {
    const mockOnAdd = jest.fn();
    const todoData = { title: 'Test Todo', description: 'Test Description' };

    render(<TodoForm onAdd={mockOnAdd} />);
    
    // Arrange: Set up form inputs
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: todoData.title }
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: todoData.description }
    });

    // Act: Submit form
    fireEvent.click(screen.getByRole('button', { name: /add todo/i }));

    // Assert: Verify expected behavior (will fail initially)
    expect(mockOnAdd).toHaveBeenCalledWith(todoData);
    expect(screen.getByDisplayValue('')).toBeInTheDocument(); // Form reset
  });
});
```

### Green Phase: Minimal Implementation
```typescript
// Example: Green Phase - Minimal code to make test pass
export const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        aria-label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        aria-label="Description" 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};
```

### Refactor Phase: Code Improvement
```typescript
// Example: Refactor Phase - Improve while maintaining green tests
export const TodoForm: React.FC<TodoFormProps> = ({ onAdd, loading, error }) => {
  const [formData, setFormData] = useState<TodoInput>({ 
    title: '', 
    description: '' 
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleInputChange = useCallback((field: keyof TodoInput, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error on change
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const validateForm = (): boolean => {
    const newErrors = validateTodoInput(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await onAdd(formData);
      setFormData({ title: '', description: '' });
    } catch (error) {
      // Error handling managed by parent component
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        id="todo-title"
        label="Title"
        value={formData.title}
        onChange={(value) => handleInputChange('title', value)}
        error={errors.title}
        required
        maxLength={200}
        aria-describedby={errors.title ? 'title-error' : undefined}
      />
      
      <Input
        id="todo-description"
        label="Description" 
        value={formData.description}
        onChange={(value) => handleInputChange('description', value)}
        error={errors.description}
        multiline
        maxLength={1000}
        aria-describedby={errors.description ? 'description-error' : undefined}
      />

      <Button 
        type="submit" 
        disabled={loading || !formData.title.trim()}
        loading={loading}
      >
        Add Todo
      </Button>

      {error && (
        <div role="alert" className="error-message">
          {error}
        </div>
      )}
    </form>
  );
};
```

## Test Structure Patterns

### AAA (Arrange-Act-Assert) Pattern
```typescript
describe('useTodos hook', () => {
  it('should add todo with generated ID and timestamps', async () => {
    // Arrange: Set up test data and mocks
    const mockStorage = createMockLocalStorage();
    const todoInput: TodoInput = {
      title: 'Test Todo',
      description: 'Test Description'
    };

    const { result } = renderHook(() => useTodos(), {
      wrapper: ({ children }) => (
        <LocalStorageProvider value={mockStorage}>
          {children}
        </LocalStorageProvider>
      )
    });

    // Act: Execute the behavior being tested
    await act(async () => {
      await result.current.addTodo(todoInput);
    });

    // Assert: Verify the expected outcomes
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0]).toMatchObject({
      title: todoInput.title,
      description: todoInput.description,
      completed: false,
      id: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    });
    
    expect(mockStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEY,
      expect.stringContaining(todoInput.title)
    );
  });
});
```

### Given-When-Then BDD Pattern (Alternative)
```typescript
describe('TodoItem component', () => {
  describe('completion toggle behavior', () => {
    it('should toggle todo completion state when checkbox is clicked', async () => {
      // Given: A todo item exists in uncompleted state
      const mockTodo: Todo = createMockTodo({ completed: false });
      const mockOnToggle = jest.fn();

      render(<TodoItem todo={mockTodo} onToggle={mockOnToggle} />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      // When: User clicks the checkbox
      await user.click(checkbox);

      // Then: Toggle function should be called with correct ID
      expect(mockOnToggle).toHaveBeenCalledWith(mockTodo.id);
    });
  });
});
```

## Test Naming Conventions

### Descriptive Test Names
```typescript
// Good: Descriptive test names that explain behavior
describe('TodoFilter component', () => {
  it('should display all todos when "all" filter is selected', () => {});
  it('should display only completed todos when "completed" filter is selected', () => {});
  it('should display only active todos when "active" filter is selected', () => {});
  it('should update task counts when todos are added or modified', () => {});
  it('should highlight active filter button visually', () => {});
  it('should support keyboard navigation between filter options', () => {});
});

// Bad: Vague or implementation-focused test names
describe('TodoFilter component', () => {
  it('should work', () => {});
  it('should call setFilter', () => {});
  it('should render buttons', () => {});
});
```

### Test Organization Structure
```typescript
describe('TodoList component', () => {
  // Group related tests in nested describe blocks
  describe('rendering behavior', () => {
    it('should render empty state message when no todos exist', () => {});
    it('should render todo items when todos are provided', () => {});
    it('should apply correct CSS classes for different todo states', () => {});
  });

  describe('user interactions', () => {
    it('should call onToggle when todo checkbox is clicked', () => {});
    it('should call onDelete when delete button is clicked', () => {});
    it('should call onEdit when edit button is clicked', () => {});
  });

  describe('accessibility features', () => {
    it('should provide proper ARIA labels for screen readers', () => {});
    it('should support keyboard navigation through todo items', () => {});
    it('should announce dynamic content changes to screen readers', () => {});
  });

  describe('error handling', () => {
    it('should display error message when loading fails', () => {});
    it('should recover gracefully from render errors', () => {});
  });
});
```

## Mock and Test Data Patterns

### Test Data Factories
```typescript
// Test data factory for consistent mock data creation
export const createMockTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: uuid(),
  title: 'Default Test Todo',
  description: 'Default test description',
  completed: false,
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-01T00:00:00Z'),
  ...overrides
});

export const createMockTodos = (count: number, overrides?: Partial<Todo>): Todo[] =>
  Array.from({ length: count }, (_, index) => 
    createMockTodo({
      title: `Test Todo ${index + 1}`,
      ...overrides
    })
  );

// Usage in tests
const completedTodo = createMockTodo({ completed: true, completedAt: new Date() });
const overdueTask = createMockTodo({ 
  dueDate: new Date(Date.now() - 86400000) // Yesterday
});
```

### Mock Patterns
```typescript
// LocalStorage mock
export const createMockLocalStorage = () => {
  let store: Record<string, string> = {};
  
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
};

// Date mock for predictable timestamps
export const mockDate = (fixedDate: string) => {
  const mockNow = new Date(fixedDate);
  jest.spyOn(global, 'Date').mockImplementation(() => mockNow);
  Date.now = jest.fn(() => mockNow.getTime());
};
```

## Test Coverage Requirements

### Coverage Targets
- **Line Coverage**: 95% minimum
- **Branch Coverage**: 90% minimum  
- **Function Coverage**: 95% minimum
- **Statement Coverage**: 95% minimum

### Coverage Configuration
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        global: {
          lines: 95,
          branches: 90,
          functions: 95,
          statements: 95
        }
      },
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/__tests__/**',
        'src/types/**',
        '**/*.d.ts'
      ]
    }
  }
});
```

## Testing Tools and Setup

### Test Environment Setup
```typescript
// src/__tests__/setup.ts
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  localStorage.clear();
});

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));
```

### Testing Utilities
```typescript
// Custom render function with providers
export const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return (
      <ErrorBoundary>
        <LocalStorageProvider value={createMockLocalStorage()}>
          {children}
        </LocalStorageProvider>
      </ErrorBoundary>
    );
  };

  return render(ui, { wrapper: AllTheProviders, ...options });
};

// User event setup for modern testing
export const user = userEvent.setup();

// Accessibility testing helper
export const checkAccessibility = async (container: HTMLElement) => {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
};
```

## Accessibility Testing Patterns

### Automated A11y Testing
```typescript
describe('TodoForm accessibility', () => {
  it('should meet WCAG 2.1 AA accessibility standards', async () => {
    const { container } = render(<TodoForm onAdd={jest.fn()} />);
    
    // Run axe-core accessibility tests
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should provide proper form labels and descriptions', () => {
    render(<TodoForm onAdd={jest.fn()} />);
    
    // Test form accessibility
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    
    // Test ARIA attributes
    const titleInput = screen.getByLabelText(/title/i);
    expect(titleInput).toHaveAttribute('aria-required', 'true');
  });

  it('should support keyboard navigation', async () => {
    render(<TodoForm onAdd={jest.fn()} />);
    
    // Test Tab navigation
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole('button', { name: /add todo/i });

    titleInput.focus();
    expect(titleInput).toHaveFocus();

    await user.tab();
    expect(descriptionInput).toHaveFocus();

    await user.tab();
    expect(submitButton).toHaveFocus();
  });
});
```

## Integration Testing Patterns

### Component Integration Tests
```typescript
describe('TodoApp integration', () => {
  it('should complete full todo workflow from creation to deletion', async () => {
    // Render the complete application
    render(<TodoApp />);

    // Add a new todo
    const titleInput = screen.getByLabelText(/title/i);
    const addButton = screen.getByRole('button', { name: /add todo/i });

    await user.type(titleInput, 'Integration test todo');
    await user.click(addButton);

    // Verify todo appears in list
    expect(screen.getByText('Integration test todo')).toBeInTheDocument();

    // Toggle completion
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    // Verify completion state
    expect(checkbox).toBeChecked();
    expect(screen.getByText('Integration test todo')).toHaveStyle({
      textDecoration: 'line-through'
    });

    // Delete todo
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    // Confirm deletion
    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    await user.click(confirmButton);

    // Verify todo is removed
    expect(screen.queryByText('Integration test todo')).not.toBeInTheDocument();
  });
});
```

This comprehensive TDD patterns guide ensures consistent, high-quality test-driven development for the TODO app implementation. All code generation should follow these patterns to maintain the strict TDD approach required by the project.