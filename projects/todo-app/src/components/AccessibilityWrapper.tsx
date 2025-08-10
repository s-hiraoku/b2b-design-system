/**
 * AccessibilityWrapper component
 * Provides screen reader support and keyboard help for TodoFilter
 */

import { FilterType } from '../types/todo';
import { FilterStats } from '../hooks/useFilter';

interface AccessibilityWrapperProps {
  currentFilter: FilterType;
  stats: FilterStats;
}

function AccessibilityWrapper({ currentFilter, stats }: AccessibilityWrapperProps) {
  const filters: Array<{
    key: FilterType;
    description: string;
  }> = [
    { key: 'all', description: 'Show all todos' },
    { key: 'active', description: 'Show incomplete todos' },
    { key: 'completed', description: 'Show completed todos' }
  ];

  return (
    <>
      {/* Tab Panels (Hidden - content is managed by parent) */}
      {filters.map((filter) => (
        <div
          key={`panel-${filter.key}`}
          id={`todo-panel-${filter.key}`}
          role="tabpanel"
          tabIndex={-1}
          aria-labelledby={`filter-${filter.key}`}
          className="sr-only"
        >
          {filter.description}
        </div>
      ))}

      {/* Summary for Screen Readers */}
      <div 
        className="sr-only" 
        role="status" 
        aria-live="polite"
        aria-atomic="true"
      >
        {stats.all === 0 
          ? 'No todos in your list'
          : `${stats.all} total todo${stats.all === 1 ? '' : 's'}: ${stats.active} active, ${stats.completed} completed`
        }
        {currentFilter !== 'all' && 
          `. Currently showing ${currentFilter} todos.`
        }
      </div>

      {/* Keyboard Navigation Help */}
      <div className="todo-filter__help">
        <details className="todo-filter__help-details">
          <summary className="todo-filter__help-summary">
            Keyboard Navigation Help
          </summary>
          <div className="todo-filter__help-content">
            <ul>
              <li><kbd>←</kbd> / <kbd>→</kbd> Navigate between filter tabs</li>
              <li><kbd>Home</kbd> / <kbd>End</kbd> Jump to first/last tab</li>
              <li><kbd>Enter</kbd> / <kbd>Space</kbd> Activate selected filter</li>
            </ul>
          </div>
        </details>
      </div>
    </>
  );
}

export default AccessibilityWrapper;