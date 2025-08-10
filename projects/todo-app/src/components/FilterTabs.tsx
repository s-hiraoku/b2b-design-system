/**
 * FilterTabs component
 * Accessible filter tabs with keyboard navigation
 */

import { useRef } from 'react';
import { FilterType } from '../types/todo';
import { FilterStats } from '../hooks/useFilter';

interface FilterTabsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: FilterStats;
}

function FilterTabs({ currentFilter, onFilterChange, stats }: FilterTabsProps) {
  const filterRefs = useRef<{ [key in FilterType]: HTMLButtonElement | null }>({
    all: null,
    active: null,
    completed: null
  });

  const filters: Array<{
    key: FilterType;
    label: string;
    count: number;
    description: string;
  }> = [
    {
      key: 'all',
      label: 'All',
      count: stats.all,
      description: 'Show all todos'
    },
    {
      key: 'active',
      label: 'Active',
      count: stats.active,
      description: 'Show incomplete todos'
    },
    {
      key: 'completed',
      label: 'Completed',
      count: stats.completed,
      description: 'Show completed todos'
    }
  ];

  // Focus management for keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : filters.length - 1;
        break;
      case 'ArrowRight':
        e.preventDefault();
        newIndex = currentIndex < filters.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = filters.length - 1;
        break;
      default:
        return;
    }

    const targetFilter = filters[newIndex];
    if (targetFilter && filterRefs.current[targetFilter.key]) {
      filterRefs.current[targetFilter.key]?.focus();
    }
  };

  const handleFilterClick = (filter: FilterType) => {
    onFilterChange(filter);
  };

  return (
    <div 
      className="todo-filter__tabs"
      role="tablist"
      aria-label="Filter todos"
    >
      {filters.map((filter, index) => {
        const isActive = currentFilter === filter.key;
        
        return (
          <button
            key={filter.key}
            ref={(el) => (filterRefs.current[filter.key] = el)}
            type="button"
            role="tab"
            tabIndex={isActive ? 0 : -1}
            aria-selected={isActive}
            aria-controls={`todo-panel-${filter.key}`}
            onClick={() => handleFilterClick(filter.key)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`todo-filter__tab ${
              isActive ? 'todo-filter__tab--active' : ''
            }`}
            data-testid={`filter-${filter.key}`}
          >
            <span className="todo-filter__tab-label">
              {filter.label}
            </span>
            
            <span 
              className="todo-filter__tab-count"
              aria-label={`${filter.count} ${filter.key === 'all' ? 'total' : filter.key} todo${filter.count === 1 ? '' : 's'}`}
            >
              {filter.count}
            </span>

            {/* Active indicator for screen readers */}
            {isActive && (
              <span className="sr-only">
                (currently selected)
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default FilterTabs;