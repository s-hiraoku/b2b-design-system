/**
 * ProgressDisplay component
 * Shows todo completion progress with accessible progress bar
 */

import { FilterStats } from '../hooks/useFilter';

interface ProgressDisplayProps {
  stats: FilterStats;
}

function ProgressDisplay({ stats }: ProgressDisplayProps) {
  const getProgressPercentage = () => {
    if (stats.all === 0) return 0;
    return Math.round((stats.completed / stats.all) * 100);
  };

  const getProgressLabel = () => {
    const percentage = getProgressPercentage();
    if (percentage === 0) return 'No todos completed yet';
    if (percentage === 100) return 'All todos completed!';
    return `${percentage}% completed (${stats.completed} of ${stats.all})`;
  };

  return (
    <div 
      className="todo-filter__progress"
      aria-labelledby="progress-heading"
    >
      <h3 id="progress-heading" className="sr-only">
        Todo Progress
      </h3>
      
      <div className="todo-filter__progress-bar-container">
        <div 
          className="todo-filter__progress-bar"
          role="progressbar"
          aria-valuenow={getProgressPercentage()}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={getProgressLabel()}
        >
          <div 
            className="todo-filter__progress-fill"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      <div className="todo-filter__progress-text">
        <span className="todo-filter__progress-label">
          {getProgressLabel()}
        </span>
      </div>
    </div>
  );
}

export default ProgressDisplay;