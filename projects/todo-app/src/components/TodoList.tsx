/**
 * TodoList component - Task 4.1
 * Accessible list with sorting and empty state handling
 */

import { useState, useMemo } from 'react';
import { Todo, TodoInput, FilterType } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, input: Partial<TodoInput>) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  filter: FilterType;
  loading?: boolean;
}

type SortOption = 'created' | 'dueDate' | 'title' | 'status';
type SortDirection = 'asc' | 'desc';

function TodoList({ 
  todos, 
  onUpdate, 
  onDelete, 
  onToggle, 
  filter,
  loading = false
}: TodoListProps) {
  const [sortBy, setSortBy] = useState<SortOption>('created');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Sort todos based on current sort settings
  const sortedTodos = useMemo(() => {
    const sorted = [...todos].sort((a, b) => {
      let compareValue = 0;

      switch (sortBy) {
        case 'created':
          compareValue = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'dueDate':
          // Handle undefined due dates (put them at the end)
          if (!a.dueDate && !b.dueDate) compareValue = 0;
          else if (!a.dueDate) compareValue = 1;
          else if (!b.dueDate) compareValue = -1;
          else compareValue = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case 'title':
          compareValue = a.title.toLowerCase().localeCompare(b.title.toLowerCase());
          break;
        case 'status':
          // Active todos first, then completed
          compareValue = (a.completed ? 1 : 0) - (b.completed ? 1 : 0);
          break;
        default:
          compareValue = 0;
      }

      return sortDirection === 'desc' ? -compareValue : compareValue;
    });

    return sorted;
  }, [todos, sortBy, sortDirection]);

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      // Toggle direction if same option
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new option with default direction
      setSortBy(option);
      setSortDirection(option === 'created' ? 'desc' : 'asc');
    }
  };

  const getSortIcon = (option: SortOption) => {
    if (sortBy !== option) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const getSortButtonAriaLabel = (option: SortOption) => {
    const optionLabels = {
      created: 'creation date',
      dueDate: 'due date',
      title: 'title',
      status: 'completion status'
    };
    
    if (sortBy === option) {
      return `Sort by ${optionLabels[option]}, currently ${sortDirection === 'asc' ? 'ascending' : 'descending'}. Click to reverse order.`;
    }
    
    return `Sort by ${optionLabels[option]}`;
  };

  // Get empty state message based on filter
  const getEmptyStateMessage = () => {
    switch (filter) {
      case 'active':
        return {
          title: 'No active todos',
          message: 'Great job! You don\'t have any pending tasks.',
          suggestion: 'Add a new todo above to get started.'
        };
      case 'completed':
        return {
          title: 'No completed todos',
          message: 'You haven\'t completed any tasks yet.',
          suggestion: 'Mark tasks as complete by clicking the checkbox next to them.'
        };
      default:
        return {
          title: 'No todos yet',
          message: 'Your todo list is empty.',
          suggestion: 'Add your first todo using the form above.'
        };
    }
  };

  if (loading) {
    return (
      <div 
        className="todo-list__loading"
        role="status"
        aria-label="Loading todos"
      >
        <span className="todo-list__loading-spinner" aria-hidden="true" />
        <span className="sr-only">Loading your todos...</span>
      </div>
    );
  }

  if (sortedTodos.length === 0) {
    const emptyState = getEmptyStateMessage();
    
    return (
      <div 
        className="todo-list__empty"
        role="status"
        aria-labelledby="empty-title"
        aria-describedby="empty-message"
      >
        <div className="todo-list__empty-content">
          <h3 id="empty-title" className="todo-list__empty-title">
            {emptyState.title}
          </h3>
          <p id="empty-message" className="todo-list__empty-message">
            {emptyState.message}
          </p>
          <p className="todo-list__empty-suggestion">
            {emptyState.suggestion}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {/* Sort Controls */}
      <div 
        className="todo-list__sort"
        role="toolbar"
        aria-label="Sort todos"
      >
        <span className="todo-list__sort-label">Sort by:</span>
        
        {(['created', 'title', 'dueDate', 'status'] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleSort(option)}
            className={`todo-list__sort-button ${
              sortBy === option ? 'todo-list__sort-button--active' : ''
            }`}
            aria-label={getSortButtonAriaLabel(option)}
          >
            <span className="todo-list__sort-text">
              {option === 'created' && 'Date'}
              {option === 'title' && 'Title'}
              {option === 'dueDate' && 'Due Date'}
              {option === 'status' && 'Status'}
            </span>
            <span className="todo-list__sort-icon" aria-hidden="true">
              {getSortIcon(option)}
            </span>
          </button>
        ))}
      </div>

      {/* Todo List */}
      <div
        role="list"
        aria-label={`${sortedTodos.length} ${filter === 'all' ? '' : filter + ' '}todo${sortedTodos.length === 1 ? '' : 's'}`}
        className="todo-list__items"
      >
        {sortedTodos.map((todo) => (
          <div
            key={todo.id}
            role="listitem"
            className="todo-list__item"
          >
            <TodoItem
              todo={todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          </div>
        ))}
      </div>

      {/* List Summary for Screen Readers */}
      <div className="sr-only" role="status" aria-live="polite">
        Showing {sortedTodos.length} {filter === 'all' ? '' : filter + ' '}
        todo{sortedTodos.length === 1 ? '' : 's'}, sorted by{' '}
        {sortBy === 'created' && 'creation date'}
        {sortBy === 'title' && 'title'}
        {sortBy === 'dueDate' && 'due date'}
        {sortBy === 'status' && 'completion status'}
        {' '}{sortDirection === 'asc' ? 'ascending' : 'descending'}
      </div>
    </div>
  );
}

export default TodoList;