/**
 * App component - Task 3.1
 * Main application wrapper with error boundary and global providers
 */

import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import TodoApp from './TodoApp';

function App() {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Handle global errors - could integrate with error tracking service
    console.error('Global error caught:', error, errorInfo);
  };

  return (
    <ErrorBoundary onError={handleError}>
      <div className="app" data-testid="app">
        <TodoApp />
      </div>
    </ErrorBoundary>
  );
}

export default App;