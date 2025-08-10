# TODO App Implementation Structure

## Target Implementation Directory: `projects/todo-app/`

All code implementation MUST be created in the `projects/todo-app/` directory structure. The `.kiro/specs/todo-app/` directory is ONLY for specifications and documentation.

## Planned Directory Structure

```
projects/todo-app/
├── package.json                 # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite build configuration
├── eslint.config.js            # ESLint configuration
├── prettier.config.js          # Prettier configuration  
├── index.html                  # Entry HTML file
├── README.md                   # Project documentation
└── src/
    ├── main.tsx                # Application entry point
    ├── App.tsx                 # Root App component
    ├── App.test.tsx            # App component tests
    ├── components/             # React components
    │   ├── ui/                 # Reusable UI components
    │   │   ├── Button/         # Button component
    │   │   │   ├── Button.tsx
    │   │   │   ├── Button.test.tsx
    │   │   │   └── Button.module.css
    │   │   ├── Input/          # Input component
    │   │   │   ├── Input.tsx
    │   │   │   ├── Input.test.tsx
    │   │   │   └── Input.module.css
    │   │   └── Modal/          # Modal component
    │   │       ├── Modal.tsx
    │   │       ├── Modal.test.tsx
    │   │       └── Modal.module.css
    │   └── features/           # Feature-specific components
    │       ├── TodoApp/        # Main application container
    │       │   ├── TodoApp.tsx
    │       │   ├── TodoApp.test.tsx
    │       │   └── TodoApp.module.css
    │       ├── TodoForm/       # Task creation form
    │       │   ├── TodoForm.tsx
    │       │   ├── TodoForm.test.tsx
    │       │   └── TodoForm.module.css
    │       ├── TodoList/       # Task list display
    │       │   ├── TodoList.tsx
    │       │   ├── TodoList.test.tsx
    │       │   └── TodoList.module.css
    │       ├── TodoItem/       # Individual task component
    │       │   ├── TodoItem.tsx
    │       │   ├── TodoItem.test.tsx
    │       │   └── TodoItem.module.css
    │       └── TodoFilter/     # Filter controls
    │           ├── TodoFilter.tsx
    │           ├── TodoFilter.test.tsx
    │           └── TodoFilter.module.css
    ├── hooks/                  # Custom React hooks
    │   ├── useTodos.ts         # Main task management hook
    │   ├── useTodos.test.ts    # useTodos tests
    │   ├── useLocalStorage.ts  # LocalStorage persistence hook
    │   ├── useLocalStorage.test.ts  # useLocalStorage tests
    │   ├── useFilter.ts        # Task filtering hook
    │   └── useFilter.test.ts   # useFilter tests
    ├── types/                  # TypeScript type definitions
    │   ├── todo.ts             # Todo-related types
    │   ├── storage.ts          # Storage-related types
    │   └── index.ts            # Type exports
    ├── utils/                  # Utility functions
    │   ├── constants.ts        # Application constants
    │   ├── validation.ts       # Data validation functions
    │   ├── validation.test.ts  # Validation tests
    │   ├── storage.ts          # LocalStorage utilities
    │   ├── storage.test.ts     # Storage tests
    │   ├── dateUtils.ts        # Date utility functions
    │   └── dateUtils.test.ts   # Date utility tests
    ├── styles/                 # CSS and styling
    │   ├── globals.css         # Global styles
    │   ├── variables.css       # CSS custom properties
    │   ├── reset.css           # CSS reset/normalize
    │   └── responsive.css      # Responsive design utilities
    └── __tests__/              # Test utilities and setup
        ├── setup.ts            # Test setup configuration
        ├── mocks/              # Test mocks
        │   ├── localStorage.ts # LocalStorage mock
        │   └── handlers.ts     # MSW API handlers
        └── factories/          # Test data factories
            └── todoFactory.ts  # Todo data factory
```

## Component Organization Principles

### Feature-based Organization
- Each major feature has its own directory under `components/features/`
- Co-located tests and styles with each component
- Clear separation between reusable UI components and feature components

### Test Co-location
- Test files are placed alongside source files with `.test.ts` or `.test.tsx` extensions
- Test utilities and mocks are centralized in `__tests__/` directory
- Each component/hook has its own dedicated test file

### CSS Modules Strategy
- Each component has its own CSS module file
- Global styles are centralized in `styles/` directory
- CSS custom properties for theming and consistency

## File Naming Conventions

### Components
- **Component Files**: PascalCase (TodoForm.tsx, TodoItem.tsx)
- **Test Files**: Component name + `.test.tsx` (TodoForm.test.tsx)
- **Style Files**: Component name + `.module.css` (TodoForm.module.css)

### Hooks
- **Hook Files**: camelCase with "use" prefix (useTodos.ts, useFilter.ts)
- **Test Files**: Hook name + `.test.ts` (useTodos.test.ts)

### Utilities
- **Utility Files**: camelCase descriptive names (validation.ts, storage.ts)
- **Test Files**: Utility name + `.test.ts` (validation.test.ts)

### Types
- **Type Files**: camelCase descriptive names (todo.ts, storage.ts)
- **Index Files**: Re-export types for easier imports

## Import/Export Patterns

### Absolute Imports Configuration
```typescript
// tsconfig.json paths configuration
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/components/*": ["components/*"],
      "@/hooks/*": ["hooks/*"],
      "@/types/*": ["types/*"],
      "@/utils/*": ["utils/*"],
      "@/styles/*": ["styles/*"]
    }
  }
}
```

### Import Examples
```typescript
// Component imports
import { TodoForm } from '@/components/features/TodoForm/TodoForm';
import { Button } from '@/components/ui/Button/Button';

// Hook imports
import { useTodos } from '@/hooks/useTodos';
import { useFilter } from '@/hooks/useFilter';

// Type imports
import type { Todo, TodoInput } from '@/types/todo';
import type { FilterType } from '@/types';

// Utility imports
import { validateTodo } from '@/utils/validation';
import { STORAGE_KEY } from '@/utils/constants';
```

### Export Patterns
```typescript
// Named exports for components
export const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  // Component implementation
};

// Default export for pages/main components
export default TodoApp;

// Re-exports from index files
export { TodoForm } from './TodoForm';
export { TodoList } from './TodoList';
export { TodoItem } from './TodoItem';
```

## Development Scripts Structure

### package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint src --ext ts,tsx --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write src",
    "format:check": "prettier --check src"
  }
}
```

## Configuration Files Structure

### TypeScript Configuration
- **tsconfig.json**: Main TypeScript configuration with strict mode
- **Absolute imports**: Path mapping for clean imports
- **Type checking**: Strict type checking enabled

### Build Configuration
- **vite.config.ts**: Vite configuration with React plugin
- **Development server**: Hot module replacement configuration
- **Build optimization**: Production build settings

### Code Quality Configuration
- **eslint.config.js**: ESLint rules for TypeScript and React
- **prettier.config.js**: Code formatting rules
- **Test configuration**: Vitest setup with React Testing Library

## Testing Structure

### Test Organization
- **Unit Tests**: Individual component and hook testing
- **Integration Tests**: Component interaction testing
- **Accessibility Tests**: Automated a11y testing with axe-core
- **Coverage Reports**: Comprehensive coverage reporting

### Test Utilities
- **Test Setup**: Global test configuration and setup
- **Mocks**: LocalStorage, Date, and other external dependency mocks
- **Factories**: Test data generation utilities
- **Custom Matchers**: Extended Jest/Vitest matchers for React testing

This implementation structure provides clear organization, maintainability, and scalability for the TODO app project. All code generation should follow this structure for consistency and optimal developer experience.