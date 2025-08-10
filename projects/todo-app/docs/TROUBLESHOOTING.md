# Troubleshooting Guide

Based on the current testing results (68% pass rate with 58 failed tests out of 181 total), this guide addresses known issues and provides solutions for common problems.

## Current Testing Status

### Test Results Summary
- **Total Tests**: 181
- **Passing Tests**: 123 (68%)
- **Failing Tests**: 58 (32%)
- **Test Suites**: 13 total (5 failed, 8 passed)

### Critical Issues Identified

The test failures indicate several areas requiring attention:

1. **Form Validation Issues**: Tests failing for form submission and validation
2. **Date Handling Problems**: Date input processing inconsistencies
3. **Component Integration**: Integration between components not working as expected
4. **TypeScript Configuration**: ES Module import warnings

## Common Issues and Solutions

### 1. Form Submission Failures

**Symptoms:**
- Form submissions not triggering onSubmit callbacks
- Validation errors not displaying correctly
- Form data not being processed

**Root Cause:**
Form event handling and validation integration issues.

**Solution:**
```typescript
// In TodoForm component, ensure proper form handling
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  // Ensure validation runs before submission
  const validation = validateTodoInput(formData);
  if (!validation.isValid) {
    setErrors(validation.errors);
    return;
  }
  
  // Clear errors before submission
  setErrors([]);
  onSubmit(formData);
};
```

**Quick Fix:**
1. Check that form elements have proper `name` attributes
2. Verify `onSubmit` prop is passed correctly
3. Ensure form validation is not blocking submission

### 2. Date Input Processing Issues

**Symptoms:**
- Date inputs not converting to proper Date objects
- Timezone offset problems
- Date validation failing

**Root Cause:**
HTML date inputs return strings in YYYY-MM-DD format, but the app expects Date objects.

**Solution:**
```typescript
// Proper date handling in form
const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const dateString = e.target.value;
  if (dateString) {
    // Convert HTML date input (YYYY-MM-DD) to Date object
    const date = new Date(dateString + 'T00:00:00.000Z');
    setFormData(prev => ({ ...prev, dueDate: date }));
  } else {
    setFormData(prev => ({ ...prev, dueDate: undefined }));
  }
};
```

**Quick Fix:**
1. Always convert date strings to Date objects in form handlers
2. Use UTC dates to avoid timezone issues
3. Handle empty date inputs gracefully

### 3. TypeScript ES Module Warnings

**Symptoms:**
```
TS151001: If you have issues related to imports, you should consider setting `esModuleInterop` to `true`
```

**Solution:**
Update `tsconfig.json`:
```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    // ... other options
  }
}
```

### 4. Component Integration Issues

**Symptoms:**
- Props not being passed correctly between components
- State updates not reflecting in child components
- Event handlers not being called

**Solution:**
Verify prop drilling and ensure proper TypeScript interfaces:
```typescript
// Ensure consistent prop interfaces
interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, input: Partial<TodoInput>) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  filter: FilterType;
  loading?: boolean;
}

// Pass all required props
<TodoList
  todos={filteredTodos}
  onUpdate={updateTodo}
  onDelete={deleteTodo}
  onToggle={toggleTodo}
  filter={filter}
  loading={loading}
/>
```

### 5. LocalStorage Errors

**Symptoms:**
- Data not persisting between sessions
- "QuotaExceededError" in browser console
- Data corruption warnings

**Solutions:**

#### Quota Exceeded
```typescript
const handleStorageError = (error: DOMException) => {
  if (error.name === 'QuotaExceededError') {
    // Clear old data or warn user
    const oldData = localStorage.getItem('todo-app-backup');
    if (oldData) {
      localStorage.removeItem('todo-app-backup');
      return true; // Retry
    }
    
    // Notify user
    setError({
      message: 'Storage quota exceeded. Please delete some todos.',
      type: 'storage',
      timestamp: new Date()
    });
  }
  return false;
};
```

#### Data Corruption
```typescript
const validateStoredData = (data: any): data is Todo[] => {
  if (!Array.isArray(data)) return false;
  
  return data.every(item => 
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.completed === 'boolean'
  );
};
```

## Performance Issues

### 1. Slow Rendering with Large Todo Lists

**Symptoms:**
- UI becomes sluggish with 100+ todos
- Scrolling performance issues
- Input lag in forms

**Solutions:**

#### Implement Virtual Scrolling
```typescript
import { FixedSizeList as List } from 'react-window';

const TodoListVirtualized = ({ todos, ...props }) => (
  <List
    height={400}
    itemCount={todos.length}
    itemSize={80}
    itemData={{ todos, ...props }}
  >
    {TodoItemRenderer}
  </List>
);
```

#### Optimize React Re-renders
```typescript
// Memoize TodoItem component
const TodoItem = React.memo<TodoItemProps>(({ todo, onUpdate, onDelete, onToggle }) => {
  // Component implementation
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.todo.id === nextProps.todo.id &&
         prevProps.todo.completed === nextProps.todo.completed &&
         prevProps.todo.title === nextProps.todo.title;
});
```

### 2. Memory Leaks

**Symptoms:**
- Increasing memory usage over time
- Browser becomes unresponsive
- "Maximum call stack exceeded" errors

**Solutions:**

#### Proper Cleanup
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    // Cleanup old error logs
    cleanupErrorLogs();
  }, 60000);

  return () => {
    clearInterval(interval);
  };
}, []);
```

#### Event Listener Cleanup
```typescript
useEffect(() => {
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === STORAGE_CONFIG.TODOS_KEY) {
      loadTodos();
    }
  };

  window.addEventListener('storage', handleStorageChange);
  
  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
}, []);
```

## Accessibility Issues

### 1. Screen Reader Navigation

**Symptoms:**
- Screen readers not announcing changes
- Focus management issues
- Missing ARIA labels

**Solutions:**

#### Live Regions
```typescript
// Add live region for todo updates
<div aria-live="polite" aria-atomic="true" className="sr-only">
  {lastAction && `${lastAction.type}: ${lastAction.message}`}
</div>
```

#### Focus Management
```typescript
const TodoItem = ({ todo }) => {
  const editButtonRef = useRef<HTMLButtonElement>(null);
  
  const handleSave = () => {
    // Save todo
    // Return focus to edit button
    editButtonRef.current?.focus();
  };
  
  return (
    <div>
      <button ref={editButtonRef} onClick={handleEdit}>
        Edit
      </button>
    </div>
  );
};
```

### 2. Keyboard Navigation

**Symptoms:**
- Tab order not logical
- Escape key not working
- Enter key not activating buttons

**Solutions:**

#### Proper Tab Order
```tsx
<div>
  <input tabIndex={1} />
  <button tabIndex={2}>Save</button>
  <button tabIndex={3}>Cancel</button>
</div>
```

#### Keyboard Event Handling
```typescript
const handleKeyDown = (e: React.KeyboardEvent) => {
  switch (e.key) {
    case 'Escape':
      cancelEdit();
      break;
    case 'Enter':
      if (e.ctrlKey) {
        saveAndContinue();
      } else {
        save();
      }
      break;
    case 'ArrowDown':
      focusNext();
      e.preventDefault();
      break;
    case 'ArrowUp':
      focusPrevious();
      e.preventDefault();
      break;
  }
};
```

## Browser Compatibility Issues

### 1. Safari Date Input Issues

**Symptoms:**
- Date inputs not working in Safari
- Date formatting differences

**Solutions:**

#### Feature Detection
```typescript
const supportsDateInput = (() => {
  const input = document.createElement('input');
  input.type = 'date';
  return input.type === 'date';
})();

// Fallback for browsers without date input support
const DateInput = ({ value, onChange, ...props }) => {
  if (supportsDateInput) {
    return <input type="date" value={value} onChange={onChange} {...props} />;
  }
  
  // Custom date picker fallback
  return <CustomDatePicker value={value} onChange={onChange} {...props} />;
};
```

### 2. Internet Explorer Support

**Symptoms:**
- App not loading in IE
- CSS Grid not working
- Modern JavaScript features failing

**Solutions:**

#### Polyfills
```typescript
// In main.tsx
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Feature detection
if (!window.crypto?.randomUUID) {
  // UUID v4 polyfill
  window.crypto.randomUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
}
```

## Development Issues

### 1. Hot Module Replacement Not Working

**Symptoms:**
- Changes require full page reload
- Development server becomes unresponsive

**Solutions:**

#### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false // Disable error overlay if causing issues
    }
  }
});
```

### 2. Build Failures

**Symptoms:**
- TypeScript compilation errors
- Bundle size too large
- Missing dependencies

**Solutions:**

#### TypeScript Errors
```bash
# Clean build
rm -rf dist node_modules
npm install
npm run build
```

#### Bundle Analysis
```bash
# Analyze bundle size
npm install --save-dev rollup-plugin-analyzer
npm run build -- --analyze
```

## Testing Issues

### 1. Async Test Failures

**Symptoms:**
- Tests timing out
- "act" warnings in tests
- Promises not resolving

**Solutions:**

#### Proper Async Testing
```typescript
import { waitFor, act } from '@testing-library/react';

test('should add todo', async () => {
  const { getByLabelText, getByText } = render(<TodoApp />);
  
  const titleInput = getByLabelText(/title/i);
  const submitButton = getByText(/add todo/i);
  
  await act(async () => {
    fireEvent.change(titleInput, { target: { value: 'New Todo' } });
    fireEvent.click(submitButton);
  });
  
  await waitFor(() => {
    expect(getByText('New Todo')).toBeInTheDocument();
  });
});
```

### 2. Mock Issues

**Symptoms:**
- localStorage mocks not working
- Date mocks inconsistent
- Jest configuration errors

**Solutions:**

#### Proper Mocking Setup
```typescript
// In test setup file
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

// Mock crypto.randomUUID
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: jest.fn(() => 'mock-uuid-123')
  }
});
```

## Recovery Procedures

### 1. Data Recovery

If todos are lost:

1. **Check Browser Storage**
   ```javascript
   // In browser console
   console.log(localStorage.getItem('todos'));
   console.log(localStorage.getItem('todo-app-errors'));
   ```

2. **Manual Data Recovery**
   ```javascript
   // Restore from backup
   const backup = '[{"id":"123","title":"Backup todo","completed":false}]';
   localStorage.setItem('todos', backup);
   window.location.reload();
   ```

### 2. Application Reset

If the app is in an unrecoverable state:

1. **Clear All Data**
   ```javascript
   // In browser console
   Object.keys(localStorage)
     .filter(key => key.startsWith('todo'))
     .forEach(key => localStorage.removeItem(key));
   
   window.location.reload();
   ```

2. **Reset to Factory Defaults**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

## Getting Help

### 1. Debug Information Collection

When reporting issues, include:

```javascript
// Run in browser console
console.log('Debug Info:', {
  todos: localStorage.getItem('todos'),
  errors: localStorage.getItem('todo-app-errors'),
  userAgent: navigator.userAgent,
  timestamp: new Date().toISOString(),
  url: window.location.href
});
```

### 2. Issue Reporting

Include the following information:

1. **Browser and Version**: Chrome 119, Firefox 118, etc.
2. **Operating System**: Windows 11, macOS 14, Ubuntu 22.04
3. **Steps to Reproduce**: Detailed step-by-step instructions
4. **Expected Behavior**: What should happen
5. **Actual Behavior**: What actually happens
6. **Console Errors**: Any error messages in browser console
7. **Debug Information**: Output from debug info collection

### 3. Community Resources

- **GitHub Issues**: Report bugs and request features
- **Documentation**: Comprehensive API and architecture docs
- **Code Examples**: Working examples in the docs
- **Stack Overflow**: Tag questions with `todo-app-react`

### 4. Professional Support

For production deployments requiring professional support:

1. **Performance Consulting**: Optimization and scalability
2. **Custom Development**: Feature additions and modifications  
3. **Training**: Team training on codebase and architecture
4. **Code Review**: Professional code quality assessment

## Prevention Best Practices

### 1. Regular Maintenance

- **Update Dependencies**: Monthly dependency updates
- **Run Tests**: Before every commit and deployment
- **Monitor Performance**: Regular bundle size and performance checks
- **Review Error Logs**: Weekly error log analysis

### 2. Code Quality

- **TypeScript Strict Mode**: Always use strict type checking
- **ESLint Rules**: Enforce consistent code style
- **Test Coverage**: Maintain 95%+ test coverage
- **Accessibility Testing**: Regular a11y audit with axe-core

### 3. User Experience

- **Progressive Enhancement**: Ensure graceful degradation
- **Error Boundaries**: Catch and handle all errors gracefully
- **Loading States**: Provide feedback for all async operations
- **Offline Support**: Consider service worker implementation