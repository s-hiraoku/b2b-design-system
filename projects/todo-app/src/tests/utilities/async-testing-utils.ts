/**
 * Async Testing Utilities
 * Enhanced utilities for testing async operations and React components
 */

import { act, waitFor } from '@testing-library/react';
import { renderHook, RenderHookResult } from '@testing-library/react';

/**
 * Enhanced async testing utilities for React components and hooks
 */
export class AsyncTestingUtils {
  /**
   * Wrapper for act() that handles both sync and async operations
   */
  static async actAsync<T>(fn: () => T | Promise<T>): Promise<T> {
    let result: T;
    await act(async () => {
      result = await Promise.resolve(fn());
    });
    return result!;
  }

  /**
   * Wait for a hook to finish loading
   */
  static async waitForHookToLoad<T extends { loading: boolean }>(
    result: RenderHookResult<T, any>['result'],
    timeout: number = 5000
  ): Promise<void> {
    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout }
    );
  }

  /**
   * Wait for a specific condition with enhanced error handling
   */
  static async waitForCondition<T>(
    condition: () => T | Promise<T>,
    predicate: (value: T) => boolean,
    options: {
      timeout?: number;
      interval?: number;
      timeoutMessage?: string;
    } = {}
  ): Promise<T> {
    const { timeout = 5000, interval = 50, timeoutMessage } = options;
    
    return new Promise((resolve, reject) => {
      let timeoutId: NodeJS.Timeout;
      let intervalId: NodeJS.Timeout;

      const cleanup = () => {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      };

      const check = async () => {
        try {
          const value = await Promise.resolve(condition());
          if (predicate(value)) {
            cleanup();
            resolve(value);
          }
        } catch (error) {
          cleanup();
          reject(error);
        }
      };

      timeoutId = setTimeout(() => {
        cleanup();
        reject(new Error(timeoutMessage || `Condition not met within ${timeout}ms`));
      }, timeout);

      intervalId = setInterval(check, interval);
      check(); // Initial check
    });
  }

  /**
   * Wait for multiple async operations to complete
   */
  static async waitForAll<T>(
    operations: Promise<T>[],
    timeout: number = 5000
  ): Promise<T[]> {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Operations timed out after ${timeout}ms`)), timeout)
    );

    return Promise.race([
      Promise.all(operations),
      timeoutPromise
    ]);
  }

  /**
   * Retry an async operation with exponential backoff
   */
  static async retry<T>(
    operation: () => Promise<T>,
    options: {
      maxAttempts?: number;
      baseDelay?: number;
      maxDelay?: number;
      backoffFactor?: number;
    } = {}
  ): Promise<T> {
    const {
      maxAttempts = 3,
      baseDelay = 100,
      maxDelay = 5000,
      backoffFactor = 2
    } = options;

    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === maxAttempts) {
          throw lastError;
        }

        const delay = Math.min(baseDelay * Math.pow(backoffFactor, attempt - 1), maxDelay);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  }

  /**
   * Test async state transitions
   */
  static async testStateTransition<T>(
    hook: RenderHookResult<T, any>,
    action: () => void | Promise<void>,
    expectations: Array<{
      description: string;
      condition: (state: T) => boolean;
      timeout?: number;
    }>
  ): Promise<void> {
    for (let i = 0; i < expectations.length; i++) {
      const { description, condition, timeout = 3000 } = expectations[i];
      
      if (i === 0) {
        // Execute action before first expectation
        await this.actAsync(action);
      }

      try {
        await waitFor(
          () => {
            expect(condition(hook.result.current)).toBe(true);
          },
          { timeout }
        );
      } catch (error) {
        throw new Error(`State transition failed at step ${i + 1} (${description}): ${error}`);
      }
    }
  }
}

/**
 * Hook testing utilities with enhanced async support
 */
export class HookTestingUtils {
  /**
   * Render hook with automatic cleanup and act wrapping
   */
  static async renderAsyncHook<TResult, TProps>(
    hook: (props: TProps) => TResult,
    options?: {
      initialProps?: TProps;
      wrapper?: React.ComponentType;
    }
  ): Promise<RenderHookResult<TResult, TProps>> {
    let result: RenderHookResult<TResult, TProps>;
    
    await AsyncTestingUtils.actAsync(() => {
      result = renderHook(hook, options);
    });
    
    return result!;
  }

  /**
   * Update hook props with proper act wrapping
   */
  static async updateHookProps<TResult, TProps>(
    hook: RenderHookResult<TResult, TProps>,
    newProps: TProps
  ): Promise<void> {
    await AsyncTestingUtils.actAsync(() => {
      hook.rerender(newProps);
    });
  }

  /**
   * Test hook with multiple prop updates
   */
  static async testHookWithUpdates<TResult, TProps>(
    hook: (props: TProps) => TResult,
    updates: Array<{
      props: TProps;
      expectation: (result: TResult) => void;
      description?: string;
    }>,
    options?: {
      wrapper?: React.ComponentType;
    }
  ): Promise<void> {
    const { result, rerender } = await this.renderAsyncHook(hook, {
      initialProps: updates[0].props,
      ...options
    });

    for (let i = 0; i < updates.length; i++) {
      const { props, expectation, description = `Update ${i + 1}` } = updates[i];
      
      if (i > 0) {
        await AsyncTestingUtils.actAsync(() => {
          rerender(props);
        });
      }

      try {
        await waitFor(() => {
          expectation(result.current);
        });
      } catch (error) {
        throw new Error(`Hook test failed at ${description}: ${error}`);
      }
    }
  }
}

/**
 * Timer and animation testing utilities
 */
export class TimerTestingUtils {
  /**
   * Run timers with proper act wrapping
   */
  static async runAllTimersAsync(): Promise<void> {
    await AsyncTestingUtils.actAsync(() => {
      jest.runAllTimers();
    });
  }

  /**
   * Advance timers by time with proper act wrapping
   */
  static async advanceTimersAsync(time: number): Promise<void> {
    await AsyncTestingUtils.actAsync(() => {
      jest.advanceTimersByTime(time);
    });
  }

  /**
   * Run only pending timers with proper act wrapping
   */
  static async runOnlyPendingTimersAsync(): Promise<void> {
    await AsyncTestingUtils.actAsync(() => {
      jest.runOnlyPendingTimers();
    });
  }

  /**
   * Test debounced functions
   */
  static async testDebouncedFunction(
    debouncedFn: jest.Mock,
    delay: number,
    calls: number = 3
  ): Promise<void> {
    // Make multiple calls quickly
    for (let i = 0; i < calls; i++) {
      debouncedFn(`call-${i}`);
    }

    // Function should not be called yet
    expect(debouncedFn).toHaveBeenCalledTimes(calls);

    // Advance time by debounce delay
    await this.advanceTimersAsync(delay);

    // Function should be called once with the last arguments
    await waitFor(() => {
      expect(debouncedFn).toHaveBeenCalledWith(`call-${calls - 1}`);
    });
  }

  /**
   * Test throttled functions
   */
  static async testThrottledFunction(
    throttledFn: jest.Mock,
    delay: number,
    calls: number = 3
  ): Promise<void> {
    // Make multiple calls quickly
    for (let i = 0; i < calls; i++) {
      throttledFn(`call-${i}`);
      if (i < calls - 1) {
        await this.advanceTimersAsync(delay / 2);
      }
    }

    // Function should be called at throttled intervals
    await waitFor(() => {
      expect(throttledFn.mock.calls.length).toBeLessThan(calls);
      expect(throttledFn.mock.calls.length).toBeGreaterThan(0);
    });
  }
}

/**
 * Error testing utilities for async operations
 */
export class ErrorTestingUtils {
  /**
   * Test that an async operation throws an error
   */
  static async expectAsyncError<T>(
    operation: () => Promise<T>,
    expectedError?: string | RegExp | Error
  ): Promise<Error> {
    let caughtError: Error | null = null;

    try {
      await operation();
    } catch (error) {
      caughtError = error as Error;
    }

    expect(caughtError).not.toBeNull();

    if (expectedError) {
      if (typeof expectedError === 'string') {
        expect(caughtError!.message).toBe(expectedError);
      } else if (expectedError instanceof RegExp) {
        expect(caughtError!.message).toMatch(expectedError);
      } else if (expectedError instanceof Error) {
        expect(caughtError!.message).toBe(expectedError.message);
      }
    }

    return caughtError!;
  }

  /**
   * Test error boundaries with async errors
   */
  static async testErrorBoundary(
    errorComponent: React.ComponentType,
    expectedError: Error,
    expectation: () => void
  ): Promise<void> {
    // Mock console.error to avoid error output in tests
    const originalError = console.error;
    console.error = jest.fn();

    try {
      await AsyncTestingUtils.actAsync(() => {
        throw expectedError;
      });

      await waitFor(expectation);
    } finally {
      console.error = originalError;
    }
  }
}

/**
 * Export all utilities as a single namespace for easy importing
 */
export const asyncUtils = {
  act: AsyncTestingUtils.actAsync,
  waitForHookToLoad: AsyncTestingUtils.waitForHookToLoad,
  waitForCondition: AsyncTestingUtils.waitForCondition,
  waitForAll: AsyncTestingUtils.waitForAll,
  retry: AsyncTestingUtils.retry,
  testStateTransition: AsyncTestingUtils.testStateTransition,
};

export const hookUtils = {
  renderAsync: HookTestingUtils.renderAsyncHook,
  updateProps: HookTestingUtils.updateHookProps,
  testWithUpdates: HookTestingUtils.testHookWithUpdates,
};

export const timerUtils = {
  runAllAsync: TimerTestingUtils.runAllTimersAsync,
  advanceAsync: TimerTestingUtils.advanceTimersAsync,
  runPendingAsync: TimerTestingUtils.runOnlyPendingTimersAsync,
  testDebounced: TimerTestingUtils.testDebouncedFunction,
  testThrottled: TimerTestingUtils.testThrottledFunction,
};

export const errorUtils = {
  expectError: ErrorTestingUtils.expectAsyncError,
  testErrorBoundary: ErrorTestingUtils.testErrorBoundary,
};