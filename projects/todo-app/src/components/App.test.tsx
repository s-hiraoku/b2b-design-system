/**
 * App component tests
 * Basic smoke tests to verify component renders correctly
 */

import { render, screen } from '@testing-library/react';
import App from './App';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('App', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<App />);
    
    // Should render the main app container
    expect(screen.getByTestId('app')).toBeInTheDocument();
  });

  it('renders TodoApp component', () => {
    render(<App />);
    
    // Should render the todo app
    expect(screen.getByTestId('todo-app')).toBeInTheDocument();
  });

  it('displays app title', () => {
    render(<App />);
    
    // Should show the main title
    expect(screen.getByRole('heading', { name: /todo app/i })).toBeInTheDocument();
  });

  it('displays add todo form', () => {
    render(<App />);
    
    // Should show the form to add todos
    expect(screen.getByRole('textbox', { name: /title/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add todo/i })).toBeInTheDocument();
  });

  it('displays filter tabs', () => {
    render(<App />);
    
    // Should show filter options
    expect(screen.getByRole('tab', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /active/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /completed/i })).toBeInTheDocument();
  });
});