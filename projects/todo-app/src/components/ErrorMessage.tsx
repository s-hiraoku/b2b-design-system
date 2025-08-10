/**
 * ErrorMessage component
 * Accessible error display with dismissal and recovery suggestions
 */

import { TodoError } from '../types/storage';

interface ErrorMessageProps {
  error: TodoError;
  onDismiss?: () => void;
  showDismiss?: boolean;
}

function ErrorMessage({ error, onDismiss, showDismiss = false }: ErrorMessageProps) {
  const getErrorIcon = () => {
    switch (error.type) {
      case 'storage':
        return '💾';
      case 'network':
        return '🌐';
      case 'validation':
        return '⚠️';
      default:
        return '❌';
    }
  };

  const getErrorSeverity = () => {
    switch (error.type) {
      case 'validation':
        return 'warning';
      case 'storage':
      case 'network':
        return 'error';
      default:
        return 'error';
    }
  };

  const getRecoveryAction = () => {
    switch (error.type) {
      case 'storage':
        return 'Try refreshing the page or clearing browser data if the problem persists.';
      case 'network':
        return 'Check your internet connection and try again.';
      case 'validation':
        return 'Please correct the highlighted fields and try again.';
      default:
        return 'Please try again or refresh the page.';
    }
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  return (
    <div 
      className={`error-message error-message--${getErrorSeverity()}`}
      role="alert"
      aria-labelledby="error-title"
      aria-describedby="error-description error-recovery"
    >
      <div className="error-message__content">
        <div className="error-message__header">
          <span className="error-message__icon" aria-hidden="true">
            {getErrorIcon()}
          </span>
          
          <h3 id="error-title" className="error-message__title">
            {error.type === 'validation' && 'Validation Error'}
            {error.type === 'storage' && 'Storage Error'}
            {error.type === 'network' && 'Network Error'}
            {error.type === 'unknown' && 'Unexpected Error'}
          </h3>

          {showDismiss && onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="error-message__dismiss"
              aria-label="Dismiss error message"
            >
              ✕
            </button>
          )}
        </div>

        <div className="error-message__body">
          <p id="error-description" className="error-message__description">
            {error.message}
          </p>

          <p id="error-recovery" className="error-message__recovery">
            {getRecoveryAction()}
          </p>

          {error.details && (
            <details className="error-message__details">
              <summary className="error-message__details-summary">
                Technical Details
              </summary>
              <div className="error-message__details-content">
                <pre className="error-message__details-data">
                  {JSON.stringify(error.details, null, 2)}
                </pre>
              </div>
            </details>
          )}

          <div className="error-message__meta">
            <span className="error-message__timestamp">
              Occurred at {formatTimestamp(error.timestamp)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;