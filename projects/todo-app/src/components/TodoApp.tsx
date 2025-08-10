/**
 * TodoApp component - Task 3.2
 * Main container integrating all todo functionality
 */

import { useTodos } from '../hooks/useTodos';
import { useFilter } from '../hooks/useFilter';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';

function TodoApp() {
  const {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearAllTodos
  } = useTodos();

  const {
    filter,
    setFilter,
    filteredTodos,
    stats
  } = useFilter(todos);

  return (
    <div className="todo-app" data-testid="todo-app">
      <header className="todo-app__header">
        <h1 className="todo-app__title">
          Todo App
        </h1>
        <p className="todo-app__subtitle">
          Stay organized and get things done
        </p>
      </header>

      <main className="todo-app__main">
        {/* Error Display */}
        {error && (
          <ErrorMessage 
            error={error}
            onDismiss={() => {/* Error will be cleared by next successful operation */}}
          />
        )}

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Todo Form */}
        <section 
          className="todo-app__form-section"
          aria-labelledby="add-todo-heading"
        >
          <h2 id="add-todo-heading" className="todo-app__section-title">
            Add New Todo
          </h2>
          <TodoForm 
            onSubmit={addTodo}
            disabled={loading}
          />
        </section>

        {/* Todo Filter */}
        <section 
          className="todo-app__filter-section"
          aria-labelledby="filter-heading"
        >
          <h2 id="filter-heading" className="todo-app__section-title sr-only">
            Filter Todos
          </h2>
          <TodoFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            stats={stats}
          />
        </section>

        {/* Todo List */}
        <section 
          className="todo-app__list-section"
          aria-labelledby="todo-list-heading"
        >
          <h2 id="todo-list-heading" className="todo-app__section-title sr-only">
            Todo List
          </h2>
          <TodoList
            todos={filteredTodos}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            filter={filter}
            loading={loading}
          />
        </section>

        {/* Clear All Button (only show when there are todos) */}
        {todos.length > 0 && (
          <section className="todo-app__actions">
            <button
              type="button"
              onClick={clearAllTodos}
              className="todo-app__clear-button"
              disabled={loading}
              aria-describedby="clear-all-description"
            >
              Clear All Todos
            </button>
            <p id="clear-all-description" className="sr-only">
              This will permanently delete all your todos
            </p>
          </section>
        )}
      </main>

      <footer className="todo-app__footer">
        <p className="todo-app__footer-text">
          Built with React, TypeScript, and accessibility in mind
        </p>
      </footer>
    </div>
  );
}

export default TodoApp;