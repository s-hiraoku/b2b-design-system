/**
 * TodoItem component - Task 4.2
 * Individual todo with inline editing, deletion, and accessibility
 */

import React, { useState, useRef, useEffect } from 'react';
import { Todo, TodoInput } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, input: Partial<TodoInput>) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

function TodoItem({ todo, onUpdate, onDelete, onToggle }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editData, setEditData] = useState<TodoInput>({
    title: todo.title,
    description: todo.description,
    dueDate: todo.dueDate
  });

  const editInputRef = useRef<HTMLInputElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management for editing
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  // Focus management for delete confirmation
  useEffect(() => {
    if (showDeleteConfirm && deleteButtonRef.current) {
      deleteButtonRef.current.focus();
    }
  }, [showDeleteConfirm]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate
    });
  };

  const handleSave = () => {
    if (editData.title.trim()) {
      onUpdate(todo.id, {
        title: editData.title.trim(),
        description: editData.description?.trim() || undefined,
        dueDate: editData.dueDate
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate
    });
  };

  const handleDelete = () => {
    onDelete(todo.id);
    setShowDeleteConfirm(false);
  };

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isEditing) {
      if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        handleSave();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleCancel();
      }
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const formatDateForInput = (date: Date | undefined): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const parseDateFromInput = (dateString: string): Date | undefined => {
    if (!dateString) return undefined;
    const date = new Date(dateString + 'T00:00:00');
    return isNaN(date.getTime()) ? undefined : date;
  };

  // Determine due date status
  const getDueDateStatus = () => {
    if (!todo.dueDate) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dueDate = new Date(todo.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    
    if (dueDate < today) return 'overdue';
    if (dueDate.getTime() === today.getTime()) return 'today';
    
    // Check if due within next 3 days
    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);
    
    if (dueDate <= threeDaysFromNow) return 'soon';
    
    return 'future';
  };

  const dueDateStatus = getDueDateStatus();
  const dueDateClass = dueDateStatus ? `todo-item__due-date--${dueDateStatus}` : '';

  return (
    <div 
      ref={itemRef}
      className={`todo-item ${todo.completed ? 'todo-item--completed' : 'todo-item--active'}`}
      data-testid="todo-item"
    >
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div 
          className="todo-item__delete-confirm"
          role="dialog"
          aria-labelledby="delete-confirm-title"
          aria-describedby="delete-confirm-message"
          aria-modal="true"
        >
          <div className="todo-item__delete-confirm-content">
            <h3 id="delete-confirm-title" className="todo-item__delete-confirm-title">
              Delete Todo
            </h3>
            <p id="delete-confirm-message" className="todo-item__delete-confirm-message">
              Are you sure you want to delete "{todo.title}"? This action cannot be undone.
            </p>
            <div className="todo-item__delete-confirm-actions">
              <button
                ref={deleteButtonRef}
                type="button"
                onClick={handleDelete}
                className="todo-item__button todo-item__button--danger"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="todo-item__button todo-item__button--secondary"
              >
                Cancel
              </button>
            </div>
          </div>
          <div 
            className="todo-item__delete-confirm-backdrop"
            onClick={() => setShowDeleteConfirm(false)}
          />
        </div>
      )}

      {/* Main Todo Content */}
      <div className="todo-item__content">
        {/* Completion Checkbox */}
        <div className="todo-item__checkbox-wrapper">
          <input
            type="checkbox"
            id={`todo-checkbox-${todo.id}`}
            checked={todo.completed}
            onChange={handleToggle}
            className="todo-item__checkbox"
            aria-describedby={`todo-title-${todo.id}`}
          />
          <label 
            htmlFor={`todo-checkbox-${todo.id}`}
            className="todo-item__checkbox-label"
          >
            <span className="sr-only">
              {todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
            </span>
          </label>
        </div>

        {/* Todo Details */}
        <div className="todo-item__details">
          {isEditing ? (
            // Edit Mode
            <div className="todo-item__edit" onKeyDown={handleKeyDown}>
              <div className="todo-item__edit-field">
                <label 
                  htmlFor={`edit-title-${todo.id}`}
                  className="sr-only"
                >
                  Edit todo title
                </label>
                <input
                  ref={editInputRef}
                  type="text"
                  id={`edit-title-${todo.id}`}
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="todo-item__edit-input"
                  maxLength={200}
                  required
                />
              </div>

              <div className="todo-item__edit-field">
                <label 
                  htmlFor={`edit-description-${todo.id}`}
                  className="sr-only"
                >
                  Edit todo description
                </label>
                <textarea
                  id={`edit-description-${todo.id}`}
                  value={editData.description || ''}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  className="todo-item__edit-textarea"
                  rows={2}
                  maxLength={1000}
                  placeholder="Description (optional)"
                />
              </div>

              <div className="todo-item__edit-field">
                <label 
                  htmlFor={`edit-due-date-${todo.id}`}
                  className="sr-only"
                >
                  Edit due date
                </label>
                <input
                  type="date"
                  id={`edit-due-date-${todo.id}`}
                  value={formatDateForInput(editData.dueDate)}
                  onChange={(e) => setEditData({ 
                    ...editData, 
                    dueDate: parseDateFromInput(e.target.value) 
                  })}
                  className="todo-item__edit-date"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="todo-item__edit-actions">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!editData.title.trim()}
                  className="todo-item__button todo-item__button--primary"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="todo-item__button todo-item__button--secondary"
                >
                  Cancel
                </button>
              </div>
              
              <p className="todo-item__edit-help">
                Press Ctrl+Enter to save, or Escape to cancel
              </p>
            </div>
          ) : (
            // View Mode
            <div className="todo-item__view">
              <h3 
                id={`todo-title-${todo.id}`}
                className="todo-item__title"
              >
                {todo.title}
              </h3>

              {todo.description && (
                <p className="todo-item__description">
                  {todo.description}
                </p>
              )}

              <div className="todo-item__metadata">
                <span className="todo-item__created">
                  Created: {formatDate(todo.createdAt)}
                </span>

                {todo.dueDate && (
                  <span className={`todo-item__due-date ${dueDateClass}`}>
                    Due: {formatDate(todo.dueDate)}
                    {dueDateStatus === 'overdue' && ' (Overdue)'}
                    {dueDateStatus === 'today' && ' (Today)'}
                    {dueDateStatus === 'soon' && ' (Soon)'}
                  </span>
                )}

                {todo.completed && todo.completedAt && (
                  <span className="todo-item__completed">
                    Completed: {formatDate(todo.completedAt)}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {!isEditing && (
          <div className="todo-item__actions">
            <button
              type="button"
              onClick={handleEdit}
              className="todo-item__button todo-item__button--edit"
              aria-label={`Edit todo: ${todo.title}`}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="todo-item__button todo-item__button--delete"
              aria-label={`Delete todo: ${todo.title}`}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Status Indicator for Screen Readers */}
      <div className="sr-only">
        Todo: {todo.title}
        {todo.description && `, Description: ${todo.description}`}
        {todo.dueDate && `, Due: ${formatDate(todo.dueDate)}`}
        {dueDateStatus === 'overdue' && ', Overdue'}
        {dueDateStatus === 'today' && ', Due today'}
        {dueDateStatus === 'soon' && ', Due soon'}
        , Status: {todo.completed ? 'Completed' : 'Active'}
        {todo.completed && todo.completedAt && `, Completed on ${formatDate(todo.completedAt)}`}
      </div>
    </div>
  );
}

export default TodoItem;