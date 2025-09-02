import React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Theme Provider for testing (will be implemented with actual theme system)
interface MockThemeProviderProps {
  theme?: 'light' | 'dark' | 'high-contrast';
  children: React.ReactNode;
}

const MockThemeProvider: React.FC<MockThemeProviderProps> = ({ 
  theme = 'light', 
  children 
}) => {
  return (
    <div data-theme={theme} className={theme === 'dark' ? 'dark' : ''}>
      {children}
    </div>
  );
};

// Toast Provider mock for testing (will be implemented with actual toast system)
const MockToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div data-testid="toast-provider">{children}</div>;
};

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: 'light' | 'dark' | 'high-contrast';
  initialState?: any;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    theme = 'light',
    initialState,
    ...renderOptions
  }: CustomRenderOptions = {}
): RenderResult => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <MockThemeProvider theme={theme}>
      <MockToastProvider>
        {children}
      </MockToastProvider>
    </MockThemeProvider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// User event setup with default options
export const setupUserEvent = (options?: Parameters<typeof userEvent.setup>[0]) => {
  return userEvent.setup({
    delay: null, // No delay for faster tests
    ...options,
  });
};

// Screen reader testing utilities
export const announceToScreenReader = (message: string) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  // Clean up after test
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 100);
};

// Keyboard navigation testing
export const simulateKeyboardNavigation = async (user: ReturnType<typeof userEvent.setup>) => {
  // Tab through focusable elements
  await user.tab();
  return document.activeElement;
};

export const simulateKeyboardAction = async (
  user: ReturnType<typeof userEvent.setup>,
  key: string,
  element?: Element
) => {
  if (element) {
    element.focus();
  }
  await user.keyboard(`{${key}}`);
};

// Viewport and responsive testing
export const setViewport = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  
  // Trigger resize event
  window.dispatchEvent(new Event('resize'));
};

export const VIEWPORT_SIZES = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1920, height: 1080 },
  wide: { width: 2560, height: 1440 },
};

// Mock data generators with enterprise focus
export const createMockEnterpriseUser = (overrides: any = {}) => ({
  id: 'user-123',
  name: 'John Enterprise',
  email: 'john@company.com',
  role: 'manager',
  department: 'Engineering',
  permissions: ['read', 'write'],
  status: 'active',
  lastLogin: new Date(),
  avatar: 'https://avatars.example.com/john.jpg',
  ...overrides,
});

export const createMockDataTableRow = (index: number, overrides: any = {}) => ({
  id: `row-${index}`,
  name: `Item ${index}`,
  category: ['Category A', 'Category B', 'Category C'][index % 3],
  value: Math.floor(Math.random() * 1000),
  status: ['active', 'inactive', 'pending'][index % 3],
  createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
  updatedAt: new Date(),
  ...overrides,
});

export const createMockFormData = (overrides: any = {}) => ({
  name: 'Test Name',
  email: 'test@company.com',
  department: 'Engineering',
  role: 'user',
  permissions: ['read'],
  ...overrides,
});

// Performance testing utilities
export const waitForPerformanceMark = (name: string): Promise<PerformanceEntry> => {
  return new Promise((resolve) => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      for (const entry of entries) {
        if (entry.name === name) {
          observer.disconnect();
          resolve(entry);
          break;
        }
      }
    });
    observer.observe({ entryTypes: ['mark'] });
  });
};

export const measureAsyncOperation = async <T extends unknown>(
  operation: () => Promise<T>
): Promise<{ result: T; duration: number }> => {
  const start = performance.now();
  const result = await operation();
  const duration = performance.now() - start;
  return { result, duration };
};

// Data table testing utilities
export const createLargeDataset = (size: number) => {
  return Array.from({ length: size }, (_, index) => createMockDataTableRow(index));
};

export const simulateDataTableInteraction = async (
  user: ReturnType<typeof userEvent.setup>,
  action: 'sort' | 'filter' | 'select' | 'paginate',
  target?: string
) => {
  switch (action) {
    case 'sort':
      const sortButton = document.querySelector(`[data-testid="sort-${target}"]`);
      if (sortButton) await user.click(sortButton);
      break;
    case 'filter':
      const filterInput = document.querySelector(`[data-testid="filter-${target}"]`);
      if (filterInput) {
        await user.clear(filterInput);
        await user.type(filterInput, target || 'test');
      }
      break;
    case 'select':
      const checkbox = document.querySelector(`[data-testid="select-${target}"]`);
      if (checkbox) await user.click(checkbox);
      break;
    case 'paginate':
      const paginationButton = document.querySelector(`[data-testid="page-${target}"]`);
      if (paginationButton) await user.click(paginationButton);
      break;
  }
};

// Form testing utilities
export const fillForm = async (
  user: ReturnType<typeof userEvent.setup>,
  formData: Record<string, string>
) => {
  for (const [field, value] of Object.entries(formData)) {
    const input = document.querySelector(`[name="${field}"]`) as HTMLInputElement;
    if (input) {
      await user.clear(input);
      await user.type(input, value);
    }
  }
};

export const submitForm = async (user: ReturnType<typeof userEvent.setup>, formId?: string) => {
  const form = formId 
    ? document.querySelector(`#${formId}`) 
    : document.querySelector('form');
  
  if (form) {
    const submitButton = form.querySelector('button[type="submit"]') || 
                         form.querySelector('[data-testid="submit"]');
    if (submitButton) {
      await user.click(submitButton);
    }
  }
};

// Accessibility testing utilities
export const checkFocusManagement = async (
  user: ReturnType<typeof userEvent.setup>
): Promise<Element[]> => {
  const focusableElements: Element[] = [];
  
  // Tab through all focusable elements
  let currentElement = document.activeElement;
  const startElement = currentElement;
  
  do {
    await user.tab();
    currentElement = document.activeElement;
    if (currentElement && currentElement !== startElement) {
      focusableElements.push(currentElement);
    }
  } while (currentElement !== startElement && focusableElements.length < 50);
  
  return focusableElements;
};

export const checkAriaLabels = (container: Element) => {
  const elementsNeedingLabels = container.querySelectorAll(
    'button, input, select, textarea, [role="button"], [role="checkbox"], [role="radio"]'
  );
  
  const unlabeledElements: Element[] = [];
  
  elementsNeedingLabels.forEach((element) => {
    const hasLabel = element.getAttribute('aria-label') ||
                     element.getAttribute('aria-labelledby') ||
                     element.querySelector('label');
    
    if (!hasLabel) {
      unlabeledElements.push(element);
    }
  });
  
  return unlabeledElements;
};

// Chart testing utilities
export const createMockChartData = (points: number = 10) => {
  return Array.from({ length: points }, (_, index) => ({
    name: `Point ${index + 1}`,
    value: Math.floor(Math.random() * 100) + 10,
    category: `Category ${(index % 3) + 1}`,
    date: new Date(Date.now() - (points - index) * 24 * 60 * 60 * 1000),
  }));
};

export const simulateChartInteraction = async (
  user: ReturnType<typeof userEvent.setup>,
  action: 'hover' | 'click' | 'zoom',
  target: string
) => {
  const element = document.querySelector(`[data-testid="${target}"]`);
  if (element) {
    switch (action) {
      case 'hover':
        await user.hover(element);
        break;
      case 'click':
        await user.click(element);
        break;
      case 'zoom':
        // Simulate mouse wheel for zoom
        element.dispatchEvent(new WheelEvent('wheel', { deltaY: -100 }));
        break;
    }
  }
};

// Export everything for easy importing
export * from '@testing-library/react';
export { userEvent };
export { renderWithProviders as render };