# Enhanced Test Environment Documentation

## Overview

This directory contains the enhanced test environment infrastructure for the TODO app, designed to support comprehensive testing with robust infrastructure, standardized utilities, and production-quality testing standards.

## Directory Structure

```
src/tests/
├── README.md                    # This documentation
├── setup.ts                     # Enhanced test setup with utilities
├── utilities/                   # Test utility libraries
│   ├── index.ts                 # Centralized exports
│   ├── test-data-factory.ts     # Standardized test data generation
│   ├── form-testing-utils.ts    # Form interaction utilities
│   ├── mock-management.ts       # Mock creation and management
│   ├── async-testing-utils.ts   # Async testing utilities
│   ├── test-environment.ts      # Environment management
│   └── __mocks__/
│       └── style-mock.js        # CSS import mocks
└── config/
    └── ci-test-config.js        # CI/CD configuration
```

## Key Features

### 1. Enhanced Test Infrastructure
- **UTC Timezone Consistency**: All tests run in UTC timezone for consistent date handling
- **Enhanced Mock System**: Centralized mock management with automatic cleanup
- **Improved Async Handling**: Proper `act()` wrapping and async utilities
- **Console Warning Suppression**: Clean test output without React warnings

### 2. Test Data Management
- **Data Factories**: Standardized test data generation with counters
- **Consistent UUIDs**: Predictable UUID generation for testing
- **Date Utilities**: UTC-based date handling with test-friendly formats
- **Test Scenarios**: Pre-built data sets for common testing scenarios

### 3. Form Testing Framework
- **Form Interaction Utils**: Comprehensive utilities for form testing
- **Async Form Handling**: Proper async/await patterns for form interactions
- **Validation Testing**: Built-in utilities for testing form validation
- **Date Input Handling**: Specialized utilities for date input testing

### 4. Mock Management System
- **Centralized Mocks**: Organized mock creation and management
- **Automatic Cleanup**: Registered mocks with automatic cleanup
- **Service Mocks**: Pre-built mocks for common services
- **Hook Mocks**: Specialized mocks for React hooks

### 5. Async Testing Utilities
- **Enhanced act() Wrapper**: Proper async operation handling
- **State Transition Testing**: Utilities for testing state changes
- **Hook Testing**: Specialized utilities for testing custom hooks
- **Timer Testing**: Utilities for testing debounced/throttled functions

## Usage Examples

### Basic Test Setup

```typescript
import { setupTest, cleanupTest, quick } from '@/tests/utilities';

describe('Component Tests', () => {
  beforeEach(setupTest);
  afterEach(cleanupTest);

  it('should render correctly', () => {
    const todo = quick.todo({ title: 'Test Todo' });
    // Test implementation
  });
});
```

### Form Testing

```typescript
import { createFormTestingUtils, testFormData } from '@/tests/utilities';

describe('TodoForm', () => {
  it('should submit form with valid data', async () => {
    const formUtils = createFormTestingUtils();
    const mockOnSubmit = jest.fn();
    
    render(<TodoForm onSubmit={mockOnSubmit} />);
    
    await formUtils.fillAndSubmitForm(testFormData.validTodoForm());
    
    await formUtils.expectFormSubmission(mockOnSubmit, {
      title: 'Test Todo Form',
      description: 'Test description from form',
      dueDate: new Date('2025-08-10T00:00:00.000Z')
    });
  });
});
```

### Hook Testing

```typescript
import { hookUtils, asyncUtils } from '@/tests/utilities';

describe('useTodos', () => {
  it('should load todos correctly', async () => {
    const { result } = await hookUtils.renderAsync(() => useTodos());
    
    await asyncUtils.waitForHookToLoad(result);
    
    expect(result.current.todos).toEqual([]);
    expect(result.current.loading).toBe(false);
  });
});
```

### Mock Creation

```typescript
import { 
  StorageMockFactory, 
  ComponentMockFactory, 
  mockHelpers 
} from '@/tests/utilities';

describe('Storage Operations', () => {
  it('should handle storage success', async () => {
    const storageMock = StorageMockFactory.createTodoLoadMock([
      createTestTodo({ title: 'Test Todo' })
    ]);
    
    // Use mock in test
  });
});
```

### Async Testing

```typescript
import { AsyncTestingUtils } from '@/tests/utilities';

describe('Async Operations', () => {
  it('should handle state transitions', async () => {
    const { result } = renderHook(() => useTodos());
    
    await AsyncTestingUtils.testStateTransition(
      result,
      () => result.current.addTodo({ title: 'New Todo' }),
      [
        {
          description: 'Should start loading',
          condition: (state) => state.loading === true
        },
        {
          description: 'Should finish with new todo',
          condition: (state) => state.todos.length === 1 && !state.loading
        }
      ]
    );
  });
});
```

## Test Data Factories

### Creating Test Data

```typescript
import { 
  createTestTodo, 
  createTestTodoInput, 
  testDataSets,
  DateInputUtils
} from '@/tests/utilities';

// Create individual test data
const todo = createTestTodo({ title: 'Custom Title' });
const todoInput = createTestTodoInput({ title: 'Input Title' });

// Use pre-built data sets
const mixedTodos = testDataSets.mixedTodos();
const completedTodos = testDataSets.completedTodos();

// Date utilities
const tomorrow = DateInputUtils.getTomorrowInputValue();
const dateObject = DateInputUtils.fromDateInputValue('2025-08-10');
```

## Configuration

### Jest Configuration
Enhanced Jest configuration with:
- UTC timezone handling
- CSS import mocking
- Improved async handling
- Coverage thresholds
- Error suppression

### CI/CD Integration
Specialized configuration for CI environments:
- Quality gates enforcement
- Performance monitoring
- Enhanced reporting
- Retry mechanisms

### Environment Variables
- `DEBUG_TESTS`: Enable debug logging
- `CI`: Enable CI-specific behavior
- `LOG_LEVEL`: Set logging level

## Best Practices

### 1. Test Organization
- Use `setupTest` and `cleanupTest` for consistent setup
- Group related tests in describe blocks
- Use descriptive test names that explain the expected behavior

### 2. Data Management
- Always use test data factories for consistency
- Reset counters between test suites
- Use isolated storage for each test

### 3. Async Handling
- Always wrap async operations with proper `act()`
- Use `waitFor` for assertions that need to wait
- Set appropriate timeouts for async operations

### 4. Mock Management
- Register mocks with GlobalMockRegistry for automatic cleanup
- Use specific mocks for each test scenario
- Clear mocks between tests

### 5. Form Testing
- Use FormTestingUtils for consistent form interactions
- Test both success and error scenarios
- Validate accessibility in form tests

## Troubleshooting

### Common Issues

1. **Act Warnings**: Use `AsyncTestingUtils.actAsync()` for proper wrapping
2. **Date Issues**: Ensure UTC timezone and use DateInputUtils
3. **Mock Cleanup**: Use GlobalMockRegistry for automatic cleanup
4. **Async Timeouts**: Increase timeout for slow operations

### Debugging

Enable debug mode:
```bash
DEBUG_TESTS=true npm test
```

This will enable detailed logging for:
- Test state changes
- DOM state snapshots
- Mock call history
- Performance metrics

## Performance Considerations

- Tests are optimized for parallel execution
- Mock management reduces memory usage
- Automatic cleanup prevents memory leaks
- CI configuration optimizes for build performance

## Quality Gates

The test environment enforces:
- 95% test success rate minimum
- Coverage thresholds (95% lines, 90% branches, 95% functions, 95% statements)
- Performance thresholds for test duration
- Memory usage monitoring

## Contributing

When adding new test utilities:
1. Follow the established patterns
2. Add comprehensive documentation
3. Include usage examples
4. Export through utilities/index.ts
5. Add cleanup mechanisms where needed