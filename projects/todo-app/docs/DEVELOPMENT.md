# Development Guide

## Getting Started

### Prerequisites

- **Node.js**: Version 16.0.0 or higher
- **npm**: Version 8.0.0 or higher (or yarn 1.22.0+)
- **Git**: Version 2.25.0 or higher
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

### Development Environment Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Application**
   Navigate to http://localhost:5173 in your browser

### Development Scripts

```bash
# Development server with hot reload
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

### File Organization

```
src/
├── components/              # React components
│   ├── App.tsx             # Main app wrapper with error boundary
│   ├── TodoApp.tsx         # Core application container
│   ├── TodoForm.tsx        # Todo creation/editing form
│   ├── TodoList.tsx        # Todo list with filtering/sorting
│   ├── TodoItem.tsx        # Individual todo item
│   ├── TodoFilter.tsx      # Filter controls and stats
│   ├── ErrorBoundary.tsx   # Global error handling
│   ├── ErrorMessage.tsx    # Error display component
│   └── LoadingSpinner.tsx  # Loading state indicator
├── hooks/                  # Custom React hooks
│   ├── useLocalStorage.ts  # localStorage management
│   ├── useTodos.ts         # Todo CRUD operations
│   └── useFilter.ts        # Todo filtering logic
├── types/                  # TypeScript type definitions
│   ├── todo.ts             # Todo-related types
│   └── storage.ts          # Storage and error types
├── utils/                  # Utility functions
│   ├── constants.ts        # Application constants
│   ├── validation.ts       # Input validation functions
│   └── storage.ts          # Storage utility functions
├── styles/                 # CSS files
│   ├── index.css          # Main stylesheet entry
│   ├── variables.css      # CSS custom properties
│   ├── reset.css          # CSS reset
│   ├── base.css           # Base styles
│   ├── utilities.css      # Utility classes
│   ├── layout.css         # Layout styles
│   ├── responsive.css     # Media queries
│   └── components/        # Component-specific styles
└── tests/                 # Test utilities and setup
    └── setup.ts           # Test configuration
```

### Naming Conventions

#### Files and Directories
- **Components**: PascalCase (e.g., `TodoForm.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useTodos.ts`)
- **Utilities**: camelCase (e.g., `validation.ts`)
- **Types**: camelCase (e.g., `todo.ts`)
- **Constants**: SCREAMING_SNAKE_CASE for values, camelCase for files

#### Code
- **Variables**: camelCase (e.g., `todoItem`)
- **Functions**: camelCase (e.g., `validateTodoInput`)
- **Components**: PascalCase (e.g., `TodoForm`)
- **Interfaces**: PascalCase (e.g., `TodoInput`)
- **Types**: PascalCase (e.g., `FilterType`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `MAX_TITLE_LENGTH`)

## Development Workflow

### 1. Feature Development Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/todo-categories
   ```

2. **Write Tests First (TDD Approach)**
   ```bash
   # Create test file
   touch src/hooks/useCategories.test.ts
   
   # Write failing tests
   npm run test:watch
   ```

3. **Implement Feature**
   - Write minimal implementation to pass tests
   - Refactor for quality and performance
   - Add comprehensive error handling

4. **Update Documentation**
   - Update relevant API documentation
   - Add usage examples
   - Update troubleshooting guide if needed

5. **Run Quality Checks**
   ```bash
   npm run lint
   npm run type-check
   npm run test:coverage
   ```

6. **Create Pull Request**
   ```bash
   git add .
   git commit -m "feat: add todo categories feature"
   git push origin feature/todo-categories
   ```

### 2. Test-Driven Development (TDD)

Following the Red-Green-Refactor cycle:

#### Red Phase: Write Failing Test
```typescript
// src/hooks/useTodos.test.ts
describe('useTodos', () => {
  it('should add a new todo', () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.addTodo({
        title: 'New Todo',
        description: 'Test description'
      });
    });
    
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].title).toBe('New Todo');
  });
});
```

#### Green Phase: Minimal Implementation
```typescript
// src/hooks/useTodos.ts
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const addTodo = useCallback((input: TodoInput) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: input.title,
      description: input.description,
      completed: false,
      createdAt: new Date()
    };
    
    setTodos(prev => [...prev, newTodo]);
  }, []);
  
  return { todos, addTodo };
}
```

#### Refactor Phase: Improve Implementation
```typescript
// Add error handling, validation, persistence
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<TodoError | null>(null);
  
  const addTodo = useCallback(async (input: TodoInput) => {
    // Validation
    const validation = validateTodoInput(input);
    if (!validation.isValid) {
      setError(createValidationError(validation.errors));
      return;
    }
    
    setLoading(true);
    try {
      const newTodo = createTodo(input);
      const updatedTodos = [...todos, newTodo];
      
      setTodos(updatedTodos);
      await saveTodos(updatedTodos);
      setError(null);
    } catch (err) {
      setError(createStorageError(err));
    } finally {
      setLoading(false);
    }
  }, [todos]);
  
  return { todos, loading, error, addTodo };
}
```

### 3. Code Quality Standards

#### TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

#### ESLint Rules
```json
// .eslintrc.json
{
  "extends": [
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "react/prop-types": "off",
    "jsx-a11y/no-autofocus": "warn"
  }
}
```

#### Component Standards
```typescript
// Good component structure
interface TodoFormProps {
  onSubmit: (input: TodoInput) => void;
  initialValues?: Partial<TodoInput>;
  disabled?: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  initialValues = {},
  disabled = false
}) => {
  // State management
  const [formData, setFormData] = useState<TodoInput>({
    title: '',
    description: '',
    ...initialValues
  });
  
  // Event handlers
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  }, [formData, onSubmit]);
  
  // Render
  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {/* Form implementation */}
    </form>
  );
};

export default TodoForm;
```

### 4. Testing Strategy

#### Test File Structure
```typescript
// Component.test.tsx
describe('ComponentName', () => {
  // Test utilities
  const defaultProps = { /* default props */ };
  
  const renderComponent = (props = {}) => {
    return render(<ComponentName {...defaultProps} {...props} />);
  };
  
  beforeEach(() => {
    // Setup before each test
  });
  
  afterEach(() => {
    // Cleanup after each test
  });
  
  describe('Rendering', () => {
    it('should render correctly with default props', () => {
      // Test implementation
    });
  });
  
  describe('User Interactions', () => {
    it('should handle form submission', () => {
      // Test implementation
    });
  });
  
  describe('Error Handling', () => {
    it('should display error message on failure', () => {
      // Test implementation
    });
  });
});
```

#### Testing Utilities
```typescript
// tests/test-utils.tsx
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

// Custom render with providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, {
    // Add providers here if needed
    ...options
  });
};

export * from '@testing-library/react';
export { customRender as render };

// Mock helpers
export const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

export const setupMocks = () => {
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage
  });
  
  // Mock crypto.randomUUID
  Object.defineProperty(global, 'crypto', {
    value: { randomUUID: jest.fn(() => 'mock-uuid-123') }
  });
};
```

## Debugging

### 1. Development Tools

#### React Developer Tools
- Install browser extension
- Inspect component props and state
- Profile component performance

#### Browser DevTools
```javascript
// Debug localStorage in console
console.log('Todos:', JSON.parse(localStorage.getItem('todos') || '[]'));

// Debug errors
console.log('Errors:', JSON.parse(localStorage.getItem('todo-app-errors') || '[]'));

// Clear all data
Object.keys(localStorage)
  .filter(key => key.includes('todo'))
  .forEach(key => localStorage.removeItem(key));
```

#### VSCode Configuration
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

### 2. Common Debugging Scenarios

#### Component Not Re-rendering
```typescript
// Check if dependencies are correct
useEffect(() => {
  console.log('Effect running with todos:', todos);
}, [todos]); // Ensure todos is in dependency array

// Check if state is being updated correctly
const addTodo = useCallback((input: TodoInput) => {
  console.log('Adding todo:', input);
  setTodos(prev => {
    const newTodos = [...prev, newTodo];
    console.log('New todos array:', newTodos);
    return newTodos;
  });
}, []);
```

#### Form Not Submitting
```typescript
// Add debugging to form handlers
const handleSubmit = (e: React.FormEvent) => {
  console.log('Form submit triggered');
  e.preventDefault();
  
  console.log('Form data:', formData);
  
  const validation = validateTodoInput(formData);
  console.log('Validation result:', validation);
  
  if (validation.isValid) {
    console.log('Calling onSubmit');
    onSubmit(formData);
  }
};
```

#### LocalStorage Issues
```typescript
// Debug storage operations
const saveData = async (data: any) => {
  try {
    console.log('Saving data:', data);
    const serialized = JSON.stringify(data);
    console.log('Serialized length:', serialized.length);
    
    localStorage.setItem(key, serialized);
    console.log('Save successful');
  } catch (error) {
    console.error('Save failed:', error);
    
    // Check quota
    console.log('Storage used:', JSON.stringify(localStorage).length);
  }
};
```

## Performance Optimization

### 1. React Performance

#### Component Memoization
```typescript
// Memo for expensive components
const TodoList = React.memo<TodoListProps>(({ todos, ...props }) => {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} {...props} />
      ))}
    </div>
  );
});

// Custom comparison for complex props
const areEqual = (prevProps: TodoItemProps, nextProps: TodoItemProps) => {
  return (
    prevProps.todo.id === nextProps.todo.id &&
    prevProps.todo.completed === nextProps.todo.completed &&
    prevProps.todo.title === nextProps.todo.title &&
    prevProps.todo.description === nextProps.todo.description
  );
};

const TodoItem = React.memo<TodoItemProps>(({ todo, ...props }) => {
  // Component implementation
}, areEqual);
```

#### Hook Optimization
```typescript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return todos.reduce((acc, todo) => {
    // Complex calculation
    return acc + calculateComplexValue(todo);
  }, 0);
}, [todos]);

// Stable callback references
const handleTodoToggle = useCallback((id: string) => {
  setTodos(prev => 
    prev.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    )
  );
}, []);
```

### 2. Bundle Optimization

#### Code Splitting
```typescript
// Lazy load large components
const TodoStatistics = lazy(() => import('./TodoStatistics'));

const TodoApp = () => {
  return (
    <div>
      {/* Main app */}
      <Suspense fallback={<LoadingSpinner />}>
        <TodoStatistics />
      </Suspense>
    </div>
  );
};
```

#### Tree Shaking
```typescript
// Import only what you need
import { format } from 'date-fns/format';
import { isValid } from 'date-fns/isValid';

// Instead of
// import * as dateFns from 'date-fns';
```

## Deployment

### 1. Production Build

```bash
# Build for production
npm run build

# Verify build output
ls -la dist/

# Test production build locally
npm run preview
```

### 2. Environment Configuration

```bash
# .env.production
VITE_APP_TITLE="Todo App"
VITE_APP_VERSION="1.0.0"
VITE_STORAGE_KEY="todos"
VITE_ENABLE_ERROR_REPORTING="true"
```

### 3. Static Hosting Deployment

#### Netlify
```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Vercel
```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### GitHub Pages
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install and Build
      run: |
        npm install
        npm run build
        
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## Contributing Guidelines

### 1. Code Contribution Process

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Follow coding standards
   - Write tests for new features
   - Update documentation

4. **Run Quality Checks**
   ```bash
   npm run lint
   npm run type-check
   npm run test
   npm run test:coverage
   ```

5. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create pull request on GitHub
   ```

### 2. Commit Message Convention

Follow conventional commits:

```bash
# Features
git commit -m "feat: add todo categories"
git commit -m "feat(ui): improve mobile responsiveness"

# Bug fixes
git commit -m "fix: resolve date input validation"
git commit -m "fix(storage): handle quota exceeded error"

# Documentation
git commit -m "docs: update API documentation"

# Refactoring
git commit -m "refactor: extract validation logic"

# Tests
git commit -m "test: add integration tests for todo list"

# Chores
git commit -m "chore: update dependencies"
```

### 3. Pull Request Guidelines

#### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added tests for new functionality
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
```

### 4. Code Review Criteria

#### Required Checks
- All tests passing
- TypeScript compilation successful
- ESLint rules satisfied
- Accessibility standards met
- Performance impact considered

#### Review Focus Areas
- Code clarity and maintainability
- Error handling completeness
- Test coverage adequacy
- Documentation accuracy
- Security considerations

## Maintenance

### 1. Regular Tasks

#### Weekly
- Update dependencies with security patches
- Review error logs and fix critical issues
- Run accessibility audit with axe-core
- Monitor bundle size and performance

#### Monthly
- Update all dependencies to latest versions
- Review and update documentation
- Analyze test coverage and add missing tests
- Performance profiling and optimization

#### Quarterly
- Security audit and penetration testing
- User experience review and improvements
- Technology stack evaluation and upgrades
- Backup and disaster recovery testing

### 2. Monitoring and Analytics

#### Error Tracking
```typescript
// Production error monitoring
const reportError = (error: Error, context: any) => {
  // Send to error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Integration with Sentry, Bugsnag, etc.
    errorTracker.captureException(error, {
      tags: { component: context.component },
      extra: context
    });
  }
};
```

#### Performance Monitoring
```typescript
// Track performance metrics
const trackPerformance = () => {
  if ('performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0];
    const metrics = {
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime
    };
    
    // Send metrics to analytics service
    analytics.track('performance_metrics', metrics);
  }
};
```