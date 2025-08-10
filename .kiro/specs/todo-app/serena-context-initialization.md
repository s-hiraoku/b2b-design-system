# Serena MCP Context Initialization - TODO App

## Project Overview

**Project Name**: TODO App (TODOアプリ)
**Type**: Modern React TypeScript Single Page Application  
**Architecture**: Component-based React with Custom Hooks
**Primary Language**: TypeScript 5+ with React 18+
**Development Mode**: Test-Driven Development (TDD)
**Implementation Target**: `projects/todo-app/src/`

## Technology Stack Context

### Core Framework Stack
- **React**: 18.3.0+ (Concurrent Features, Automatic Batching)
- **TypeScript**: 5.0+ (Strict mode, Advanced type features)
- **Vite**: 5.0+ (ESM-native, Ultra-fast HMR)
- **Build Target**: Modern ES2022+ browsers

### Testing & Quality Stack
- **Test Framework**: Vitest (Jest-compatible, Vite-optimized)
- **Component Testing**: React Testing Library
- **Test Structure**: AAA Pattern (Arrange-Act-Assert)
- **Coverage Requirements**: 95% line, 90% branch, 95% function
- **Accessibility Testing**: @testing-library/jest-dom + axe-core

### Development Environment
- **Package Manager**: npm
- **Code Quality**: ESLint + Prettier
- **Type Safety**: TypeScript strict mode
- **Dev Server**: Vite dev server with HMR

## TDD Standards and Patterns

### Test-Driven Development Approach
- **Methodology**: Red-Green-Refactor cycle (t-wada methodology)
- **Test Framework**: Vitest + React Testing Library
- **Test Structure**: AAA (Arrange-Act-Assert) pattern
- **Naming Conventions**: Descriptive test names with "should" statements
- **Test Organization**: Co-located test files (*.test.ts, *.test.tsx)

### TDD Quality Standards
- **Coverage Requirements**: 
  - Line Coverage: 95%+
  - Branch Coverage: 90%+
  - Function Coverage: 95%+
- **Test Quality**: Each test should be isolated, deterministic, and fast
- **Test Data**: Use factory functions and mock data generators
- **Mocking Strategy**: Jest mocks for external dependencies, MSW for API calls

### TDD Patterns
```typescript
// Red Phase: Create failing test
describe('TodoForm', () => {
  it('should add new todo when form is submitted with valid data', () => {
    // Test implementation that initially fails
  });
});

// Green Phase: Minimal implementation to pass
const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  // Minimal code to make test pass
};

// Refactor Phase: Improve code quality while keeping tests green
const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  // Refactored, clean implementation
};
```

## Architecture and Design Patterns

### Component Architecture
```
TodoApp (Root Container)
├── TodoForm (Task Creation)
├── TodoFilter (Filter Controls)  
├── TodoList (Task Display Container)
│   └── TodoItem[] (Individual Tasks)
└── ErrorBoundary (Error Handling)
```

### State Management Patterns
- **Custom Hooks**: Primary state management approach
- **React State**: Local component state with useState/useReducer
- **Data Flow**: Unidirectional data flow (props down, events up)
- **Persistence**: LocalStorage integration through custom hooks

### Key Custom Hooks
```typescript
// useTodos - Main task management
interface UseTodosReturn {
  todos: Todo[];
  addTodo: (todoData: TodoInput) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

// useLocalStorage - Data persistence  
interface UseLocalStorageReturn<T> {
  data: T;
  setData: (value: T | ((prev: T) => T)) => void;
  loading: boolean;
  error: string | null;
}

// useFilter - Task filtering
interface UseFilterReturn {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  filteredTodos: Todo[];
  taskCounts: TaskCounts;
}
```

## Data Models and Types

### Core Type Definitions
```typescript
// Main Todo entity
interface Todo {
  id: string; // UUID v4
  title: string; // Required, max 200 chars
  description?: string; // Optional, max 1000 chars
  completed: boolean; // Default false
  dueDate?: Date; // Optional due date
  createdAt: Date; // Auto-generated
  updatedAt: Date; // Auto-updated
  completedAt?: Date; // Set when completed
}

// Task input for creation
interface TodoInput {
  title: string;
  description?: string;
  dueDate?: Date;
}

// Filter types
type FilterType = 'all' | 'active' | 'completed';

// Task statistics
interface TaskCounts {
  all: number;
  active: number;
  completed: number;
}
```

### LocalStorage Data Structure
```typescript
interface StorageData {
  version: string; // Schema version for migration
  todos: Todo[];
  lastModified: Date;
}
```

## Coding Standards and Conventions

### TypeScript Standards
- **Strict Mode**: All TypeScript strict flags enabled
- **Interface First**: Define interfaces before implementation
- **Generic Usage**: Leverage generics for reusable components
- **Type Guards**: Use type predicates for runtime type safety
- **No `any`**: Avoid any type, use unknown or proper types

### React Standards
- **Functional Components**: Use function components exclusively
- **Modern Hooks**: Leverage React 18+ features (useId, useDeferredValue)
- **Props Interface**: Every component must have a props interface
- **Ref Forwarding**: Use forwardRef for reusable components
- **Error Boundaries**: Wrap components in error boundaries

### File Organization Standards
```
projects/todo-app/src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── features/       # Feature-specific components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   ├── constants.ts    # App constants
│   ├── validation.ts   # Validation functions
│   └── storage.ts      # LocalStorage utilities
├── styles/             # CSS and styling
└── __tests__/          # Test files (when not co-located)
```

### Naming Conventions
- **Components**: PascalCase (TodoForm, TodoItem)
- **Hooks**: camelCase with "use" prefix (useTodos, useFilter)
- **Types**: PascalCase interfaces (Todo, TodoInput)
- **Constants**: SCREAMING_SNAKE_CASE (STORAGE_KEY, MAX_TITLE_LENGTH)
- **Functions**: camelCase (addTodo, validateTitle)

## Accessibility Standards (WCAG 2.1 AA)

### ARIA Implementation
- **Semantic HTML**: Use appropriate semantic elements
- **ARIA Labels**: All interactive elements have accessible names
- **Live Regions**: Dynamic content updates announced to screen readers
- **Landmarks**: Proper use of main, nav, section roles

### Keyboard Navigation
- **Tab Order**: Logical tab sequence through all interactive elements
- **Key Bindings**: Space/Enter for activation, Escape for cancel
- **Focus Management**: Clear visual focus indicators
- **Focus Trapping**: Modal dialogs trap focus appropriately

### Visual Accessibility
- **Color Contrast**: 4.5:1 minimum ratio for normal text
- **Color Independence**: Information not conveyed by color alone
- **Responsive Text**: Supports 200% zoom without horizontal scroll
- **Motion Sensitivity**: Reduced motion preference respected

## Error Handling Strategy

### Error Classification
```typescript
interface TodoError {
  type: 'VALIDATION_ERROR' | 'STORAGE_ERROR' | 'NETWORK_ERROR';
  message: string;
  field?: string;
}
```

### Error Handling Patterns
- **Form Validation**: Real-time validation with immediate feedback
- **Storage Errors**: Graceful degradation with user notification
- **Component Errors**: Error boundaries with recovery options
- **Async Errors**: Promise rejection handling with retry logic

### Error Recovery
- **Auto Retry**: Maximum 3 attempts with exponential backoff
- **Fallback Storage**: SessionStorage fallback if LocalStorage fails
- **Data Recovery**: Automatic data integrity checks and repair
- **User Communication**: Clear, actionable error messages

## Performance Optimization

### React Performance
- **React.memo**: Selective memoization for expensive components
- **useMemo**: Memoize expensive calculations (filtering, sorting)
- **useCallback**: Stable callback references for child components
- **Code Splitting**: Dynamic imports for large features (if needed)

### Bundle Optimization
- **Tree Shaking**: Eliminate unused code paths
- **Asset Optimization**: Optimized images and fonts
- **Chunk Splitting**: Separate vendor and app bundles
- **Bundle Analysis**: Regular bundle size monitoring

### LocalStorage Optimization
- **Debounced Updates**: Batch LocalStorage writes
- **JSON Optimization**: Efficient serialization/deserialization
- **Storage Monitoring**: Track storage usage and cleanup old data

## Quality Assurance Standards

### Test Coverage Requirements
- **Unit Tests**: All hooks, utilities, and pure functions
- **Component Tests**: User interaction and rendering behavior
- **Integration Tests**: Component interaction and data flow
- **Accessibility Tests**: Automated a11y testing with axe-core

### Code Quality Metrics
- **TypeScript Strict**: Zero TypeScript errors
- **ESLint**: Zero linting errors with strict rules
- **Test Coverage**: 95%+ line, 90%+ branch coverage
- **Performance**: Bundle size under 200KB, load time under 1s

### Review Standards
- **Code Reviews**: All changes reviewed for quality and standards
- **Accessibility Review**: Manual accessibility testing
- **Performance Review**: Regular performance auditing
- **Security Review**: Input validation and XSS protection

## Implementation Requirements Mapping

### REQ-1.0: Task Addition Feature
- **Component**: TodoForm with validation
- **Hook**: useTodos.addTodo()
- **Validation**: Real-time title validation
- **Storage**: LocalStorage persistence
- **Tests**: Form submission, validation, error handling

### REQ-2.0: Task Editing Feature  
- **Component**: TodoItem with inline editing
- **Hook**: useTodos.updateTodo()
- **UI**: Edit/save/cancel interaction pattern
- **Tests**: Edit mode toggle, save validation, cancel behavior

### REQ-3.0: Task Deletion Feature
- **Component**: TodoItem with delete confirmation
- **Hook**: useTodos.deleteTodo()
- **UI**: Confirmation dialog pattern
- **Tests**: Delete confirmation, storage cleanup

### REQ-4.0: Task Completion Toggle
- **Component**: TodoItem checkbox interaction
- **Hook**: useTodos.toggleTodo()
- **UI**: Visual completion state (strikethrough)
- **Tests**: Toggle behavior, visual feedback

### REQ-5.0: Task Filtering Feature
- **Component**: TodoFilter with filter controls
- **Hook**: useFilter with filtered results
- **UI**: Active filter indication
- **Tests**: Filter application, task counts

### REQ-6.0: Task List Display
- **Component**: TodoList with empty states
- **Logic**: Due date highlighting, sorting
- **UI**: Responsive list layout
- **Tests**: List rendering, empty states, date highlighting

### REQ-7.0: Responsive Design
- **CSS**: Mobile-first responsive layout
- **Breakpoints**: 768px mobile, 1024px desktop
- **Touch**: 44px minimum touch targets
- **Tests**: Responsive behavior testing

### REQ-8.0: Accessibility Support
- **ARIA**: Complete ARIA implementation  
- **Keyboard**: Full keyboard navigation
- **Screen Readers**: Screen reader compatibility
- **Tests**: Automated accessibility testing

### REQ-9.0: Data Persistence
- **Storage**: LocalStorage with error handling
- **Sync**: Automatic state synchronization
- **Migration**: Data format versioning
- **Tests**: Storage operations, error recovery

### REQ-10.0: Error Handling
- **Boundaries**: React error boundaries
- **Validation**: Input validation and feedback
- **Recovery**: Automatic error recovery
- **Tests**: Error scenarios, recovery behavior

## Development Workflow Integration

### TDD Workflow Integration
1. **Red Phase**: Write failing test first
2. **Green Phase**: Minimal implementation to pass
3. **Refactor Phase**: Clean code while maintaining tests
4. **Integration**: Continuous integration with test validation

### Code Generation Guidelines
- **Test First**: Always generate tests before implementation
- **Type Safety**: Generate TypeScript with strict typing
- **Accessibility**: Include ARIA attributes from start
- **Performance**: Consider performance implications in generated code

### Quality Gates
- **Pre-commit**: TypeScript compilation, linting, tests pass
- **Pre-merge**: Full test suite, coverage requirements met
- **Pre-deploy**: Performance tests, accessibility validation
- **Post-deploy**: Monitoring and error tracking

This comprehensive context provides Serena MCP with deep understanding of the TODO app project requirements, technical specifications, coding standards, and quality expectations. All subsequent code generation should adhere to these established patterns and requirements for consistent, high-quality implementation.