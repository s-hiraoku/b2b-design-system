/**
 * TodoFilter Component Tests
 * Comprehensive test suite for TodoFilter component functionality
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoFilter from './TodoFilter';

const mockOnFilterChange = jest.fn();

const mockStats = {
  all: 10,
  active: 6,
  completed: 4
};

describe('TodoFilter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders all filter buttons', () => {
      render(
        <TodoFilter
          currentFilter="all"
          onFilterChange={mockOnFilterChange}
          stats={mockStats}
        />
      );

      expect(screen.getByRole('tab', { name: /All.*10/ })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /Active.*6/ })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /Completed.*4/ })).toBeInTheDocument();
    });

    it('highlights current filter', () => {
      render(
        <TodoFilter
          currentFilter="active"
          onFilterChange={mockOnFilterChange}
          stats={mockStats}
        />
      );

      const activeButton = screen.getByRole('tab', { name: /Active.*6/ });
      expect(activeButton).toHaveClass('todo-filter__tab--active');
      
      const allButton = screen.getByRole('tab', { name: /All.*10/ });
      expect(allButton).not.toHaveClass('todo-filter__tab--active');
    });

    it('renders with zero counts', () => {
      const zeroStats = { all: 0, active: 0, completed: 0 };
      
      render(
        <TodoFilter
          currentFilter="all"
          onFilterChange={mockOnFilterChange}
          stats={zeroStats}
        />
      );

      expect(screen.getByRole('tab', { name: /All.*0/ })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /Active.*0/ })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /Completed.*0/ })).toBeInTheDocument();
    });


  });

  describe('Interactions', () => {
    it('calls onFilterChange when filter is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoFilter
          currentFilter="all"
          onFilterChange={mockOnFilterChange}
          stats={mockStats}
        />
      );

      await user.click(screen.getByRole('tab', { name: /Active.*6/ }));
      expect(mockOnFilterChange).toHaveBeenCalledWith('active');

      await user.click(screen.getByRole('tab', { name: /Completed.*4/ }));
      expect(mockOnFilterChange).toHaveBeenCalledWith('completed');

      await user.click(screen.getByRole('tab', { name: /All.*10/ }));
      expect(mockOnFilterChange).toHaveBeenCalledWith('all');
    });

    it('calls onFilterChange even when current filter is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoFilter
          currentFilter="active"
          onFilterChange={mockOnFilterChange}
          stats={mockStats}
        />
      );

      await user.click(screen.getByRole('tab', { name: /Active.*6/ }));
      expect(mockOnFilterChange).toHaveBeenCalledWith('active');
    });

  });

  describe('Keyboard Navigation', () => {
    it('supports keyboard navigation - only active tab is focusable', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoFilter
          currentFilter="all"
          onFilterChange={mockOnFilterChange}
          stats={mockStats}
        />
      );

      const allTab = screen.getByRole('tab', { name: /All.*10/ });
      const activeTab = screen.getByRole('tab', { name: /Active.*6/ });

      // Only the active tab (all) should be focusable via tab
      await user.tab();
      expect(allTab).toHaveFocus();

      // Other tabs should not be directly focusable via tab
      expect(activeTab).toHaveAttribute('tabIndex', '-1');
      expect(allTab).toHaveAttribute('tabIndex', '0');
    });

    it('activates filter on Enter key', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoFilter
          currentFilter="all"
          onFilterChange={mockOnFilterChange}
          stats={mockStats}
        />
      );

      const activeButton = screen.getByRole('tab', { name: /Active.*6/ });
      activeButton.focus();

      await user.keyboard('{Enter}');
      expect(mockOnFilterChange).toHaveBeenCalledWith('active');
    });

    it('activates filter on Space key', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoFilter
          currentFilter="all"
          onFilterChange={mockOnFilterChange}
          stats={mockStats}
        />
      );

      const completedButton = screen.getByRole('tab', { name: /Completed.*4/ });
      completedButton.focus();

      await user.keyboard(' ');
      expect(mockOnFilterChange).toHaveBeenCalledWith('completed');
    });

    it('supports arrow key navigation', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoFilter
          currentFilter="all"
          onFilterChange={mockOnFilterChange}
          stats={mockStats}
        />
      );

      const allButton = screen.getByRole('tab', { name: /All.*10/ });
      const activeButton = screen.getByRole('tab', { name: /Active.*6/ });
      const completedButton = screen.getByRole('tab', { name: /Completed.*4/ });

      allButton.focus();

      await user.keyboard('{ArrowRight}');
      expect(activeButton).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      expect(completedButton).toHaveFocus();

      await user.keyboard('{ArrowLeft}');
      expect(activeButton).toHaveFocus();

      await user.keyboard('{ArrowLeft}');
      expect(allButton).toHaveFocus();
    });

    it('wraps around at boundaries with arrow keys', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoFilter
          currentFilter="all"
          onFilterChange={mockOnFilterChange}
          stats={mockStats}
        />
      );

      const allButton = screen.getByRole('tab', { name: /All.*10/ });
      const completedButton = screen.getByRole('tab', { name: /Completed.*4/ });

      allButton.focus();

      // Go left from first item should wrap to last
      await user.keyboard('{ArrowLeft}');
      expect(completedButton).toHaveFocus();

      // Go right from last item should wrap to first
      await user.keyboard('{ArrowRight}');
      expect(allButton).toHaveFocus();
    });

    it('supports Home and End keys', async () => {
      const user = userEvent.setup();
      
      render(
        <TodoFilter
          currentFilter="active"
          onFilterChange={mockOnFilterChange}
          stats={mockStats}
        />
      );

      const allButton = screen.getByRole('tab', { name: /All.*10/ });
      const activeButton = screen.getByRole('tab', { name: /Active.*6/ });
      const completedButton = screen.getByRole('tab', { name: /Completed.*4/ });

      activeButton.focus();

      await user.keyboard('{Home}');
      expect(allButton).toHaveFocus();

      await user.keyboard('{End}');
      expect(completedButton).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <TodoFilter
          currentFilter="active"
          onFilterChange={mockOnFilterChange}
          stats={mockStats}
        />
      );

      expect(screen.getByRole('tablist', { name: 'Filter todos' })).toBeInTheDocument();
      
      const activeTab = screen.getByRole('tab', { name: /Active.*6/ });
      expect(activeTab).toHaveAttribute('aria-selected', 'true');
      
      const allTab = screen.getByRole('tab', { name: /All.*10/ });
      expect(allTab).toHaveAttribute('aria-selected', 'false');
    });

    it('announces filter changes to screen readers', () => {
      render(
        <TodoFilter
          currentFilter="active"
          onFilterChange={mockOnFilterChange}
          stats={mockStats}
        />
      );

      expect(screen.getByText(/6 active, 4 completed/)).toBeInTheDocument();
    });

    it('has descriptive button labels', () => {
      render(
        <TodoFilter
          currentFilter="all"
          onFilterChange={mockOnFilterChange}
          stats={mockStats}
        />
      );

      expect(screen.getByLabelText('10 total todos')).toBeInTheDocument();
      expect(screen.getByLabelText('6 active todos')).toBeInTheDocument();
      expect(screen.getByLabelText('4 completed todos')).toBeInTheDocument();
    });

    it('uses appropriate text for singular/plural counts', () => {
      const singleStats = { all: 1, active: 1, completed: 1 };
      
      render(
        <TodoFilter
          currentFilter="all"
          onFilterChange={mockOnFilterChange}
          stats={singleStats}
        />
      );

      expect(screen.getByLabelText('1 total todo')).toBeInTheDocument();
      expect(screen.getByLabelText('1 active todo')).toBeInTheDocument();
      expect(screen.getByLabelText('1 completed todo')).toBeInTheDocument();
    });

    it('has proper keyboard focus indicators', () => {
      render(
        <TodoFilter
          currentFilter="all"
          onFilterChange={mockOnFilterChange}
          stats={mockStats}
        />
      );

      const tabs = screen.getAllByRole('tab');
      tabs.forEach(tab => {
        expect(tab).toHaveClass('todo-filter__tab');
      });
    });
  });

  describe('Visual States', () => {
    it('applies correct CSS classes for active filter', () => {
      render(
        <TodoFilter
          currentFilter="completed"
          onFilterChange={mockOnFilterChange}
          stats={mockStats}
        />
      );

      const completedButton = screen.getByRole('tab', { name: /Completed.*4/ });
      expect(completedButton).toHaveClass('todo-filter__tab--active');
    });


  });

  describe('Count Display', () => {
    it('displays counts correctly', () => {
      render(
        <TodoFilter
          currentFilter="all"
          onFilterChange={mockOnFilterChange}
          stats={mockStats}
        />
      );

      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('6')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
    });

    it('handles large numbers correctly', () => {
      const largeStats = { all: 1234, active: 999, completed: 235 };
      
      render(
        <TodoFilter
          currentFilter="all"
          onFilterChange={mockOnFilterChange}
          stats={largeStats}
        />
      );

      expect(screen.getByText('1234')).toBeInTheDocument();
      expect(screen.getByText('999')).toBeInTheDocument();
      expect(screen.getByText('235')).toBeInTheDocument();
    });

    it('updates counts reactively', () => {
      const { rerender } = render(
        <TodoFilter
          currentFilter="all"
          onFilterChange={mockOnFilterChange}
          stats={mockStats}
        />
      );

      expect(screen.getByText('10')).toBeInTheDocument();

      const updatedStats = { all: 15, active: 8, completed: 7 };
      rerender(
        <TodoFilter
          currentFilter="all"
          onFilterChange={mockOnFilterChange}
          stats={updatedStats}
        />
      );

      expect(screen.getByText('15')).toBeInTheDocument();
      expect(screen.getByText('8')).toBeInTheDocument();
      expect(screen.getByText('7')).toBeInTheDocument();
    });
  });
});