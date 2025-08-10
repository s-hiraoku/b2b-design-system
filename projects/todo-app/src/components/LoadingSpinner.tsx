/**
 * LoadingSpinner component
 * Accessible loading indicator with customizable size and text
 */


interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  inline?: boolean;
  className?: string;
}

function LoadingSpinner({ 
  size = 'medium', 
  text = 'Loading...', 
  inline = false,
  className = ''
}: LoadingSpinnerProps) {
  const spinnerClasses = [
    'loading-spinner',
    `loading-spinner--${size}`,
    inline ? 'loading-spinner--inline' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={spinnerClasses}
      role="status"
      aria-label={text}
    >
      <div 
        className="loading-spinner__icon"
        aria-hidden="true"
      >
        <svg 
          className="loading-spinner__svg"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="loading-spinner__track"
            cx="12"
            cy="12"
            r="10"
            strokeWidth="2"
            fill="none"
          />
          <circle
            className="loading-spinner__progress"
            cx="12"
            cy="12"
            r="10"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {!inline && (
        <span className="loading-spinner__text">
          {text}
        </span>
      )}
      
      {/* For screen readers */}
      <span className="sr-only">
        {text}
      </span>
    </div>
  );
}

export default LoadingSpinner;