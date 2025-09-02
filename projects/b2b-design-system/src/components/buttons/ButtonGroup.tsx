import React, { cloneElement, isValidElement, useCallback, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// Button group variants using CVA for consistent layout and styling
const buttonGroupVariants = cva(
  [
    // Base classes - flex container for button layout
    'inline-flex',
    'focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-blue-500',
    'rounded-md' // Group-level border radius
  ],
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
      attached: {
        true: '', // Connected styling applied to children
        false: 'gap-1', // Separate buttons with gap
      }
    },
    defaultVariants: {
      orientation: 'horizontal',
      attached: false,
    },
  }
);

export interface ButtonGroupProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {
  /**
   * Button elements to group together
   */
  children: React.ReactNode;
  /**
   * Consistent size applied to all buttons in the group
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Consistent variant applied to all buttons in the group
   */
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'enterprise';
  /**
   * Disable all buttons in the group
   */
  disabled?: boolean;
}

/**
 * ButtonGroup Component
 * 
 * Groups related buttons with:
 * - Unified styling and consistent sizing
 * - Horizontal and vertical orientations  
 * - Connected appearance option for seamless UI
 * - Keyboard navigation support with arrow keys
 * - Proper ARIA group semantics for accessibility
 * - Enterprise B2B professional appearance
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ 
    orientation = 'horizontal', 
    attached = false, 
    size, 
    variant, 
    disabled, 
    className, 
    children, 
    ...props 
  }, ref) => {
    const groupRef = useRef<HTMLDivElement>(null);

    // Handle keyboard navigation between buttons
    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
      const isVertical = orientation === 'vertical';
      const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
      const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';

      if (![nextKey, prevKey].includes(event.key)) return;

      event.preventDefault();
      
      const buttons = groupRef.current?.querySelectorAll('button:not(:disabled)') as NodeListOf<HTMLButtonElement>;
      if (!buttons || buttons.length === 0) return;

      const currentIndex = Array.from(buttons).findIndex(button => button === document.activeElement);
      let nextIndex;

      if (event.key === nextKey) {
        nextIndex = currentIndex === buttons.length - 1 ? 0 : currentIndex + 1;
      } else {
        nextIndex = currentIndex === 0 ? buttons.length - 1 : currentIndex - 1;
      }

      buttons[nextIndex]?.focus();
    }, [orientation]);

    // Enhanced children with group-level styling and behavior
    const enhancedChildren = React.Children.map(children, (child, index) => {
      if (!isValidElement(child)) return child;

      const totalChildren = React.Children.count(children);
      const position = getButtonPosition(index, totalChildren);
      const positionClasses = getPositionClasses(position, attached, orientation);

      // Merge group-level props with individual button props
      const buttonProps = {
        ...child.props,
        className: cn(child.props.className, positionClasses),
        ...(size && { size }),
        ...(variant && { variant }),
        ...(disabled && { disabled: true }),
      };

      return cloneElement(child, buttonProps);
    });

    // Helper function to determine button position in group
    function getButtonPosition(index: number, total: number): 'first' | 'middle' | 'last' | 'only' {
      if (total === 1) return 'only';
      if (index === 0) return 'first';
      if (index === total - 1) return 'last';
      return 'middle';
    }

    // Helper function to generate position-specific CSS classes
    function getPositionClasses(
      position: 'first' | 'middle' | 'last' | 'only', 
      isAttached: boolean, 
      dir: 'horizontal' | 'vertical'
    ): string {
      if (!isAttached) return '';

      const baseClass = `button-group-${position}`;
      
      // Generate border radius and overlap classes based on orientation and position
      const radiusClass = dir === 'vertical' 
        ? position === 'first' ? 'rounded-b-none' : position === 'last' ? 'rounded-t-none' : 'rounded-none'
        : position === 'first' ? 'rounded-r-none' : position === 'last' ? 'rounded-l-none' : 'rounded-none';
      
      const borderClass = position !== 'first' && position !== 'only'
        ? dir === 'vertical' ? 'border-t-0' : 'border-l-0'
        : '';

      return cn(baseClass, radiusClass, borderClass);
    }

    return (
      <div
        ref={ref || groupRef}
        role="group"
        className={cn(buttonGroupVariants({ orientation, attached }), className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {enhancedChildren}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';