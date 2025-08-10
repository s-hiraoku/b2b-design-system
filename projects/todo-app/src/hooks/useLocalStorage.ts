/**
 * useLocalStorage hook
 * TDD GREEN Phase: Minimal implementation to pass tests
 */

import { useState, useEffect, useCallback } from 'react';
import { TodoError } from '../types/storage';

type SetValue<T> = (value: T | ((prevValue: T) => T)) => void;

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>, boolean, TodoError | null] {
  const [value, setValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<TodoError | null>(null);

  // Load initial value from localStorage
  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item !== null) {
        const parsedValue = JSON.parse(item);
        setValue(parsedValue);
      }
    } catch (err) {
      setError({
        message: 'Failed to load data from localStorage',
        type: 'storage',
        timestamp: new Date(),
        details: { key, error: err instanceof Error ? err.message : 'Parse error' }
      });
    }
  }, [key]);

  const setStoredValue: SetValue<T> = useCallback((newValue) => {
    try {
      setError(null);
      setLoading(true);

      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);

      localStorage.setItem(key, JSON.stringify(valueToStore));
      setLoading(false);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Failed to save to localStorage',
        type: 'storage',
        timestamp: new Date(),
        details: { key, operation: 'setValue' }
      });
      setLoading(false);
    }
  }, [key, value]);

  return [value, setStoredValue, loading, error];
}