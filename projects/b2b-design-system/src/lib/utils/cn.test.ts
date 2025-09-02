import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn utility function', () => {
  describe('Red Phase - Basic functionality tests', () => {
    it('should combine multiple string classes', () => {
      // Arrange
      const class1 = 'px-2';
      const class2 = 'py-1';
      const class3 = 'bg-blue-500';
      
      // Act
      const result = cn(class1, class2, class3);
      
      // Assert
      expect(result).toBe('px-2 py-1 bg-blue-500');
    });

    it('should handle empty inputs gracefully', () => {
      // Arrange & Act
      const result = cn();
      
      // Assert
      expect(result).toBe('');
    });

    it('should filter out falsy values', () => {
      // Arrange
      const validClass = 'px-2';
      const falsyValues = [null, undefined, false, 0, ''];
      
      // Act
      const result = cn(validClass, ...falsyValues, 'py-1');
      
      // Assert
      expect(result).toBe('px-2 py-1');
    });

    it('should handle conditional classes with objects', () => {
      // Arrange
      const baseClass = 'px-2 py-1';
      const isActive = true;
      const isDisabled = false;
      
      // Act
      const result = cn(baseClass, {
        'bg-blue-500': isActive,
        'bg-gray-300': isDisabled,
        'text-white': isActive,
      });
      
      // Assert
      expect(result).toBe('px-2 py-1 bg-blue-500 text-white');
    });

    it('should handle arrays of classes', () => {
      // Arrange
      const classArray = ['px-2', 'py-1'];
      const additionalClass = 'bg-blue-500';
      
      // Act
      const result = cn(classArray, additionalClass);
      
      // Assert
      expect(result).toBe('px-2 py-1 bg-blue-500');
    });
  });

  describe('Green Phase - Tailwind-specific merging', () => {
    it('should merge conflicting Tailwind classes with later ones taking precedence', () => {
      // Arrange
      const earlierPadding = 'px-2';
      const laterPadding = 'px-4';
      const otherClasses = 'py-1 bg-blue-500';
      
      // Act
      const result = cn(earlierPadding, otherClasses, laterPadding);
      
      // Assert
      expect(result).toBe('py-1 bg-blue-500 px-4');
    });

    it('should merge multiple conflicting properties correctly', () => {
      // Arrange
      const initialClasses = 'px-2 py-1 bg-red-500';
      const overrideClasses = 'px-4 bg-blue-500';
      
      // Act
      const result = cn(initialClasses, overrideClasses);
      
      // Assert
      expect(result).toBe('py-1 px-4 bg-blue-500');
    });

    it('should handle responsive and state variants in merging', () => {
      // Arrange
      const baseClasses = 'p-2 hover:bg-gray-100';
      const responsiveClasses = 'md:p-4 hover:bg-blue-100';
      
      // Act
      const result = cn(baseClasses, responsiveClasses);
      
      // Assert
      expect(result).toBe('p-2 md:p-4 hover:bg-blue-100');
    });

    it('should preserve non-conflicting classes during merge', () => {
      // Arrange
      const classes1 = 'px-2 text-white font-bold';
      const classes2 = 'py-4 bg-blue-500';
      
      // Act
      const result = cn(classes1, classes2);
      
      // Assert
      expect(result).toBe('px-2 text-white font-bold py-4 bg-blue-500');
    });
  });

  describe('Refactor Phase - Complex scenarios and edge cases', () => {
    it('should handle deeply nested conditional logic', () => {
      // Arrange
      const baseClass = 'button';
      const variant = 'primary';
      const size = 'large';
      const isLoading = true;
      const isDisabled = false;
      
      // Act
      const result = cn(
        baseClass,
        {
          'btn-primary': variant === 'primary',
          'btn-secondary': variant === 'secondary',
        },
        {
          'btn-sm': size === 'small',
          'btn-lg': size === 'large',
        },
        isLoading && 'btn-loading',
        isDisabled && 'btn-disabled'
      );
      
      // Assert
      expect(result).toBe('button btn-primary btn-lg btn-loading');
    });

    it('should handle enterprise B2B component patterns', () => {
      // Arrange
      const isEnterprise = true;
      const hasPermissions = true;
      const role = 'admin';
      
      // Act
      const result = cn(
        'base-component',
        {
          'enterprise-styling': isEnterprise,
          'standard-styling': !isEnterprise,
        },
        hasPermissions && 'has-permissions',
        {
          'role-admin': role === 'admin',
          'role-user': role === 'user',
          'role-manager': role === 'manager',
        }
      );
      
      // Assert
      expect(result).toBe('base-component enterprise-styling has-permissions role-admin');
    });

    it('should handle accessibility-focused class combinations', () => {
      // Arrange
      const isFocused = true;
      const isHighContrast = false;
      const hasError = true;
      
      // Act
      const result = cn(
        'form-input',
        'focus-visible:outline-none focus-visible:ring-2',
        {
          'focus-visible:ring-blue-500': isFocused && !hasError,
          'focus-visible:ring-red-500': isFocused && hasError,
        },
        {
          'high-contrast': isHighContrast,
          'border-red-500': hasError,
          'border-gray-300': !hasError,
        }
      );
      
      // Assert
      expect(result).toBe('form-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 border-red-500');
    });

    it('should maintain performance with large numbers of classes', () => {
      // Arrange
      const manyClasses = Array.from({ length: 100 }, (_, i) => `class-${i}`);
      const conditionalClasses = Array.from({ length: 50 }, (_, i) => ({
        [`conditional-${i}`]: i % 2 === 0,
      }));
      
      // Act
      const startTime = performance.now();
      const result = cn(...manyClasses, ...conditionalClasses);
      const endTime = performance.now();
      
      // Assert
      expect(result).toContain('class-0');
      expect(result).toContain('conditional-0');
      expect(endTime - startTime).toBeLessThan(10); // Should execute quickly
    });

    it('should handle complex component variant patterns', () => {
      // Arrange
      const variant = 'outline';
      const size = 'large';
      const intent = 'danger';
      const isLoading = false;
      const isFullWidth = true;
      
      // Act
      const result = cn(
        // Base classes
        'inline-flex items-center justify-center font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        
        // Variant classes
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
          'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
        },
        
        // Size classes
        {
          'h-9 px-3 text-sm': size === 'small',
          'h-10 px-4 py-2': size === 'medium',
          'h-11 px-8 text-base': size === 'large',
        },
        
        // Intent classes (override variant colors)
        {
          'border-red-500 text-red-600 hover:bg-red-50': variant === 'outline' && intent === 'danger',
          'border-green-500 text-green-600 hover:bg-green-50': variant === 'outline' && intent === 'success',
        },
        
        // State classes
        isLoading && 'cursor-not-allowed',
        isFullWidth && 'w-full'
      );
      
      // Assert
      expect(result).toContain('inline-flex');
      expect(result).toContain('border-red-500'); // Intent should override variant
      expect(result).toContain('h-11'); // Large size
      expect(result).toContain('w-full'); // Full width
      expect(result).not.toContain('cursor-not-allowed'); // Loading is false
    });
  });

  describe('TDD Quality Assurance', () => {
    it('should be consistent with repeated calls', () => {
      // Arrange
      const classes = ['px-2', 'py-1', { 'bg-blue-500': true }];
      
      // Act
      const result1 = cn(...classes);
      const result2 = cn(...classes);
      
      // Assert
      expect(result1).toBe(result2);
    });

    it('should handle undefined and null gracefully in complex scenarios', () => {
      // Arrange
      const validClass = 'px-2';
      const undefinedValue = undefined;
      const nullValue = null;
      const conditionalClass = false && 'hidden-class';
      
      // Act
      const result = cn(
        validClass,
        undefinedValue,
        nullValue,
        conditionalClass,
        'py-1'
      );
      
      // Assert
      expect(result).toBe('px-2 py-1');
    });

    it('should maintain type safety with TypeScript', () => {
      // Arrange
      const stringClass: string = 'px-2';
      const objectClass: Record<string, boolean> = { 'py-1': true };
      const arrayClass: string[] = ['bg-blue-500'];
      
      // Act
      const result = cn(stringClass, objectClass, arrayClass);
      
      // Assert
      expect(result).toBe('px-2 py-1 bg-blue-500');
      expect(typeof result).toBe('string');
    });
  });
});