/**
 * TodoFilter component - Task 4.3
 * Accessible filter tabs with keyboard navigation and stats display
 * Refactored into focused sub-components for better maintainability
 */

import { FilterType } from '../types/todo';
import { FilterStats } from '../hooks/useFilter';
import ProgressDisplay from './ProgressDisplay';
import FilterTabs from './FilterTabs';
import AccessibilityWrapper from './AccessibilityWrapper';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: FilterStats;
}

function TodoFilter({ currentFilter, onFilterChange, stats }: TodoFilterProps) {
  return (
    <div className="todo-filter">
      <ProgressDisplay stats={stats} />
      <FilterTabs 
        currentFilter={currentFilter} 
        onFilterChange={onFilterChange} 
        stats={stats} 
      />
      <AccessibilityWrapper 
        currentFilter={currentFilter} 
        stats={stats} 
      />
    </div>
  );
}

export default TodoFilter;