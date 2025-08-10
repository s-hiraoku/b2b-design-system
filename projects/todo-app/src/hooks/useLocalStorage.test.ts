/**
 * TDD RED Phase: useLocalStorage hook tests
 */

import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial value when no stored value exists', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial-value')
    );
    
    const [value, setValue, loading, error] = result.current;
    
    expect(value).toBe('initial-value');
    expect(loading).toBe(false);
    expect(error).toBeNull();
    expect(typeof setValue).toBe('function');
  });

  it('should return stored value when it exists', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));
    
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial-value')
    );
    
    const [value] = result.current;
    expect(value).toBe('stored-value');
  });

  it('should update value and localStorage when setValue is called', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial-value')
    );
    
    act(() => {
      const [, setValue] = result.current;
      setValue('new-value');
    });
    
    const [value] = result.current;
    expect(value).toBe('new-value');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'));
  });

  it('should handle function updater', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 10)
    );
    
    act(() => {
      const [, setValue] = result.current;
      setValue((prev) => prev + 5);
    });
    
    const [value] = result.current;
    expect(value).toBe(15);
  });

  it('should handle loading state correctly', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial-value')
    );
    
    act(() => {
      const [, setValue] = result.current;
      setValue('new-value');
    });
    
    // After operation completes, loading should be false
    const [, , loading] = result.current;
    expect(loading).toBe(false);
  });

  it('should handle localStorage errors gracefully', () => {
    // Mock localStorage.setItem to throw error
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = jest.fn(() => {
      throw new Error('Storage error');
    });

    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial-value')
    );
    
    act(() => {
      const [, setValue] = result.current;
      setValue('new-value');
    });
    
    const [, , , error] = result.current;
    expect(error).toBeDefined();
    expect(error?.message).toContain('Storage error');
    
    // Restore original method
    localStorage.setItem = originalSetItem;
  });

  it('should handle corrupted stored data', () => {
    localStorage.setItem('test-key', 'invalid json');
    
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial-value')
    );
    
    const [value, , , error] = result.current;
    expect(value).toBe('initial-value');
    expect(error).toBeDefined();
  });

  it('should clear error when successful operation occurs', () => {
    // First cause an error
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = jest.fn(() => {
      throw new Error('Storage error');
    });

    const { result, rerender } = renderHook(() => 
      useLocalStorage('test-key', 'initial-value')
    );
    
    act(() => {
      const [, setValue] = result.current;
      setValue('new-value');
    });
    
    expect(result.current[3]).toBeDefined(); // Error should exist
    
    // Restore localStorage and try again
    localStorage.setItem = originalSetItem;
    
    act(() => {
      const [, setValue] = result.current;
      setValue('another-value');
    });
    
    const [, , , error] = result.current;
    expect(error).toBeNull();
  });
});