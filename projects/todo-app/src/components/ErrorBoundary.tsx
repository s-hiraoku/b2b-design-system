/**
 * ErrorBoundary component - Task 3.1
 * Comprehensive error handling with recovery mechanisms
 */

import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasError: false,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorId: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Report to error monitoring service (if configured)
    this.reportError(error, errorInfo);
  }

  private reportError = (error: Error, errorInfo: ErrorInfo) => {
    // In a real application, you would send this to an error monitoring service
    // like Sentry, Bugsnag, or CloudWatch
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // For now, just log to console
    console.error('Error Report:', errorReport);
    
    // Store error in localStorage for debugging
    try {
      const existingErrors = JSON.parse(localStorage.getItem('todo-app-errors') || '[]');
      existingErrors.push(errorReport);
      
      // Keep only last 10 errors to prevent storage overflow
      const recentErrors = existingErrors.slice(-10);
      localStorage.setItem('todo-app-errors', JSON.stringify(recentErrors));
    } catch (storageError) {
      console.error('Failed to store error report:', storageError);
    }
  };

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      errorId: ''
    });
  };

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          className="error-boundary"
          role="alert"
          aria-labelledby="error-title"
          aria-describedby="error-description"
        >
          <div className="error-boundary__content">
            <h1 id="error-title" className="error-boundary__title">
              Something went wrong
            </h1>
            
            <p id="error-description" className="error-boundary__description">
              We're sorry, but something unexpected happened. You can try to reload the page or continue using the app.
            </p>

            <div className="error-boundary__actions">
              <button
                onClick={this.handleRetry}
                className="error-boundary__button error-boundary__button--primary"
                type="button"
                aria-describedby="retry-description"
              >
                Try Again
              </button>
              
              <button
                onClick={this.handleReload}
                className="error-boundary__button error-boundary__button--secondary"
                type="button"
                aria-describedby="reload-description"
              >
                Reload Page
              </button>
            </div>

            <div className="error-boundary__help">
              <p className="error-boundary__help-text">
                If this problem persists, please try clearing your browser data or contact support.
              </p>
              
              <details className="error-boundary__details">
                <summary className="error-boundary__details-summary">
                  Technical Details (for developers)
                </summary>
                
                <div className="error-boundary__details-content">
                  <p><strong>Error ID:</strong> {this.state.errorId}</p>
                  
                  {this.state.error && (
                    <>
                      <p><strong>Error Message:</strong> {this.state.error.message}</p>
                      
                      {this.state.error.stack && (
                        <pre className="error-boundary__stack">
                          <code>{this.state.error.stack}</code>
                        </pre>
                      )}
                    </>
                  )}

                  {this.state.errorInfo?.componentStack && (
                    <>
                      <p><strong>Component Stack:</strong></p>
                      <pre className="error-boundary__stack">
                        <code>{this.state.errorInfo.componentStack}</code>
                      </pre>
                    </>
                  )}
                </div>
              </details>
            </div>
          </div>

          {/* Hidden descriptions for screen readers */}
          <div className="sr-only">
            <p id="retry-description">
              Attempts to recover from the error without reloading the page
            </p>
            <p id="reload-description">
              Reloads the entire page to start fresh
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;