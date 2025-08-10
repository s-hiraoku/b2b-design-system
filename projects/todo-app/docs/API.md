# API Documentation

## Custom Hooks API

### useTodos Hook

Complete todo management with localStorage persistence and error handling.

#### Import
```typescript
import { useTodos } from '../hooks/useTodos';
```

#### Usage
```typescript
const {
  todos,
  loading,
  error,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  clearAllTodos
} = useTodos();
```

#### Return Type
```typescript
interface UseTodosReturn {
  todos: Todo[];
  loading: boolean;
  error: TodoError | null;
  addTodo: (input: TodoInput) => void;
  updateTodo: (id: string, input: Partial<TodoInput>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  clearAllTodos: () => void;
}
```

#### State Properties

##### `todos: Todo[]`
Array of all todo items currently stored.

**Example:**
```typescript
const { todos } = useTodos();

console.log(todos);
// [
//   {
//     id: "123e4567-e89b-12d3-a456-426614174000",
//     title: "Buy groceries",
//     description: "Milk, bread, eggs",
//     completed: false,
//     createdAt: new Date("2024-01-15T10:00:00.000Z"),
//     dueDate: new Date("2024-01-16T18:00:00.000Z")
//   }
// ]
```

##### `loading: boolean`
Indicates if any async operation is in progress.

**Use cases:**
- Initial data loading
- Save operations
- Bulk operations

**Example:**
```typescript
const { loading } = useTodos();

if (loading) {
  return <LoadingSpinner />;
}
```

##### `error: TodoError | null`
Current error state, if any.

**Error Types:**
- `validation` - Input validation errors
- `storage` - localStorage operation errors
- `network` - Network-related errors (future use)
- `unknown` - Unexpected errors

**Example:**
```typescript
const { error } = useTodos();

if (error) {
  return <ErrorMessage error={error} />;
}
```

#### Methods

##### `addTodo(input: TodoInput): void`
Creates a new todo item.

**Parameters:**
```typescript
interface TodoInput {
  title: string;        // Required, max 200 chars
  description?: string; // Optional, max 1000 chars
  dueDate?: Date;      // Optional, must be future date
}
```

**Behavior:**
- Validates input using `validateTodoInput`
- Generates UUID for new todo
- Sets `completed: false` and `createdAt: new Date()`
- Auto-saves to localStorage
- Updates error state on validation failure

**Example:**
```typescript
const { addTodo } = useTodos();

const handleSubmit = async () => {
  addTodo({
    title: "Complete project",
    description: "Finish the todo app implementation",
    dueDate: new Date("2024-01-20T17:00:00.000Z")
  });
};
```

##### `updateTodo(id: string, input: Partial<TodoInput>): void`
Updates an existing todo item.

**Parameters:**
- `id: string` - UUID of the todo to update
- `input: Partial<TodoInput>` - Fields to update

**Behavior:**
- Validates the todo exists
- Validates the updated input
- Merges changes with existing todo
- Auto-saves to localStorage
- Sets error state if todo not found or validation fails

**Example:**
```typescript
const { updateTodo } = useTodos();

const handleEdit = () => {
  updateTodo("123e4567-e89b-12d3-a456-426614174000", {
    title: "Updated title",
    description: "Updated description"
  });
};
```

##### `deleteTodo(id: string): void`
Removes a todo item.

**Parameters:**
- `id: string` - UUID of the todo to delete

**Behavior:**
- Filters out the todo with matching ID
- Auto-saves updated list to localStorage
- No error if todo doesn't exist (idempotent)

**Example:**
```typescript
const { deleteTodo } = useTodos();

const handleDelete = () => {
  deleteTodo("123e4567-e89b-12d3-a456-426614174000");
};
```

##### `toggleTodo(id: string): void`
Toggles the completion status of a todo.

**Parameters:**
- `id: string` - UUID of the todo to toggle

**Behavior:**
- Flips `completed` boolean
- Sets `completedAt` to current date when completing
- Clears `completedAt` when uncompleting
- Auto-saves to localStorage

**Example:**
```typescript
const { toggleTodo } = useTodos();

const handleToggle = () => {
  toggleTodo("123e4567-e89b-12d3-a456-426614174000");
};
```

##### `clearAllTodos(): void`
Removes all todo items.

**Behavior:**
- Sets todos array to empty
- Clears localStorage
- Useful for bulk operations or data reset

**Example:**
```typescript
const { clearAllTodos } = useTodos();

const handleClearAll = () => {
  if (confirm("Are you sure you want to delete all todos?")) {
    clearAllTodos();
  }
};
```

### useFilter Hook

Manages todo filtering with derived statistics.

#### Import
```typescript
import { useFilter } from '../hooks/useFilter';
```

#### Usage
```typescript
const {
  filter,
  setFilter,
  filteredTodos,
  stats
} = useFilter(todos);
```

#### Parameters
- `todos: Todo[]` - Array of todos to filter

#### Return Type
```typescript
interface UseFilterReturn {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  filteredTodos: Todo[];
  stats: FilterStats;
}
```

#### Properties and Methods

##### `filter: FilterType`
Current active filter.

**Type:**
```typescript
type FilterType = 'all' | 'active' | 'completed';
```

##### `setFilter(filter: FilterType): void`
Changes the active filter.

**Example:**
```typescript
const { setFilter } = useFilter(todos);

// Show only active todos
setFilter('active');

// Show all todos
setFilter('all');

// Show completed todos
setFilter('completed');
```

##### `filteredTodos: Todo[]`
Todos filtered by current filter setting.

**Filtering Logic:**
- `'all'` - Returns all todos
- `'active'` - Returns todos where `completed === false`
- `'completed'` - Returns todos where `completed === true`

**Example:**
```typescript
const { filteredTodos, filter } = useFilter(todos);

console.log(filter); // "active"
console.log(filteredTodos); // Only incomplete todos
```

##### `stats: FilterStats`
Statistics about todos by category.

**Type:**
```typescript
interface FilterStats {
  all: number;       // Total number of todos
  active: number;    // Number of incomplete todos
  completed: number; // Number of completed todos
}
```

**Example:**
```typescript
const { stats } = useFilter(todos);

console.log(stats);
// {
//   all: 10,
//   active: 7,
//   completed: 3
// }
```

### useLocalStorage Hook

Generic localStorage hook with error handling.

#### Import
```typescript
import { useLocalStorage } from '../hooks/useLocalStorage';
```

#### Usage
```typescript
const [value, setValue, loading, error] = useLocalStorage<T>(key, defaultValue);
```

#### Parameters
- `key: string` - localStorage key
- `defaultValue: T` - Default value if no stored value exists

#### Return Type
```typescript
type UseLocalStorageReturn<T> = [
  T,                           // Current value
  (value: T) => Promise<void>, // Setter function
  boolean,                     // Loading state
  TodoError | null            // Error state
];
```

#### Example
```typescript
const [settings, setSettings, loading, error] = useLocalStorage('app-settings', {
  theme: 'light',
  language: 'en'
});

// Update settings
await setSettings({
  theme: 'dark',
  language: 'es'
});
```

## Utility Functions API

### Validation Functions

#### validateTodoInput(input: TodoInput): ValidationResult

Validates a complete todo input object.

**Parameters:**
```typescript
interface TodoInput {
  title: string;
  description?: string;
  dueDate?: Date;
}
```

**Returns:**
```typescript
interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
```

**Validation Rules:**
- **Title**: Required, max 200 characters
- **Description**: Optional, max 1000 characters
- **Due Date**: Optional, must be future date

**Example:**
```typescript
import { validateTodoInput } from '../utils/validation';

const input = {
  title: "Test todo",
  description: "A test todo item",
  dueDate: new Date("2024-01-20T10:00:00.000Z")
};

const result = validateTodoInput(input);

if (result.isValid) {
  // Input is valid
  console.log("Valid input");
} else {
  // Handle validation errors
  console.log("Errors:", result.errors);
}
```

#### validateTitle(title: string): ValidationResult

Validates only the title field.

**Example:**
```typescript
import { validateTitle } from '../utils/validation';

const result = validateTitle("My todo");
console.log(result); // { isValid: true, errors: [] }

const result2 = validateTitle("");
console.log(result2); // { isValid: false, errors: ["タイトルは必須です"] }
```

#### validateDescription(description: string): ValidationResult

Validates only the description field.

**Example:**
```typescript
import { validateDescription } from '../utils/validation';

const result = validateDescription("A short description");
console.log(result); // { isValid: true, errors: [] }

const longText = "a".repeat(1001);
const result2 = validateDescription(longText);
console.log(result2); // { isValid: false, errors: ["説明文は1000文字以内で入力してください"] }
```

### Storage Functions

#### saveTodos(todos: Todo[]): Promise<StorageResult<void>>

Saves todos to localStorage with error handling.

**Parameters:**
- `todos: Todo[]` - Array of todos to save

**Returns:**
```typescript
interface StorageResult<T> {
  success: boolean;
  data?: T;
  error?: TodoError;
}
```

**Example:**
```typescript
import { saveTodos } from '../utils/storage';

const todos = [
  {
    id: "123",
    title: "Test todo",
    completed: false,
    createdAt: new Date()
  }
];

const result = await saveTodos(todos);

if (result.success) {
  console.log("Todos saved successfully");
} else {
  console.error("Save failed:", result.error);
}
```

#### loadTodos(): Promise<StorageResult<Todo[]>>

Loads todos from localStorage with migration support.

**Returns:**
```typescript
StorageResult<Todo[]>
```

**Features:**
- Automatic data migration
- Corruption detection
- Default to empty array on failure

**Example:**
```typescript
import { loadTodos } from '../utils/storage';

const result = await loadTodos();

if (result.success) {
  const todos = result.data || [];
  console.log("Loaded todos:", todos);
} else {
  console.error("Load failed:", result.error);
}
```

## Component Props API

### TodoForm Props

```typescript
interface TodoFormProps {
  onSubmit: (input: TodoInput) => void;
  initialValues?: Partial<TodoInput>;
  disabled?: boolean;
  submitButtonText?: string;
}
```

**Example:**
```typescript
<TodoForm
  onSubmit={handleSubmit}
  initialValues={{
    title: "Edit this todo",
    description: "Existing description"
  }}
  disabled={loading}
  submitButtonText="Update Todo"
/>
```

### TodoList Props

```typescript
interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, input: Partial<TodoInput>) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  filter: FilterType;
  loading?: boolean;
}
```

**Example:**
```typescript
<TodoList
  todos={filteredTodos}
  onUpdate={updateTodo}
  onDelete={deleteTodo}
  onToggle={toggleTodo}
  filter={filter}
  loading={loading}
/>
```

### TodoItem Props

```typescript
interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, input: Partial<TodoInput>) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}
```

### TodoFilter Props

```typescript
interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: FilterStats;
}
```

**Example:**
```typescript
<TodoFilter
  currentFilter={filter}
  onFilterChange={setFilter}
  stats={stats}
/>
```

### ErrorBoundary Props

```typescript
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}
```

**Example:**
```typescript
<ErrorBoundary
  onError={(error, errorInfo) => {
    // Custom error handling
    console.error('App error:', error);
  }}
  fallback={<CustomErrorUI />}
>
  <App />
</ErrorBoundary>
```

## Constants API

### Validation Rules

```typescript
export const VALIDATION_RULES = {
  TITLE_MAX_LENGTH: 200,
  DESCRIPTION_MAX_LENGTH: 1000,
  MIN_DUE_DATE: new Date(), // Current date
} as const;
```

### Storage Configuration

```typescript
export const STORAGE_CONFIG = {
  TODOS_KEY: 'todos',
  VERSION_KEY: 'todos-version',
  ERROR_LOG_KEY: 'todo-app-errors',
  CURRENT_VERSION: 1,
  MAX_ERROR_LOGS: 10,
} as const;
```

### Filter Types

```typescript
export const FILTER_TYPES = {
  ALL: 'all' as const,
  ACTIVE: 'active' as const,
  COMPLETED: 'completed' as const,
} as const;
```

## Error Handling API

### TodoError Interface

```typescript
interface TodoError {
  message: string;
  type: 'validation' | 'storage' | 'network' | 'unknown';
  timestamp: Date;
  details?: any;
}
```

### Error Creation Helpers

```typescript
// Create validation error
const validationError = (message: string, details?: any): TodoError => ({
  message,
  type: 'validation',
  timestamp: new Date(),
  details
});

// Create storage error
const storageError = (message: string, details?: any): TodoError => ({
  message,
  type: 'storage',
  timestamp: new Date(),
  details
});
```

## Testing Utilities API

### Mock Functions

```typescript
// Mock localStorage
export const mockLocalStorage = () => {
  const storage = new Map();
  return {
    getItem: (key: string) => storage.get(key) || null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key),
    clear: () => storage.clear()
  };
};

// Mock Date
export const mockDate = (fixedDate: string) => {
  const mockedDate = new Date(fixedDate);
  jest.spyOn(global, 'Date').mockImplementation(() => mockedDate);
};

// Mock UUID
export const mockUUID = (fixedId: string) => {
  jest.spyOn(crypto, 'randomUUID').mockReturnValue(fixedId);
};
```

### Test Data Factories

```typescript
// Create test todo
export const createTestTodo = (overrides?: Partial<Todo>): Todo => ({
  id: '123e4567-e89b-12d3-a456-426614174000',
  title: 'Test Todo',
  description: 'Test description',
  completed: false,
  createdAt: new Date('2024-01-15T10:00:00.000Z'),
  dueDate: new Date('2024-01-20T10:00:00.000Z'),
  ...overrides
});

// Create test todo input
export const createTestTodoInput = (overrides?: Partial<TodoInput>): TodoInput => ({
  title: 'Test Todo',
  description: 'Test description',
  dueDate: new Date('2024-01-20T10:00:00.000Z'),
  ...overrides
});
```