import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../src/components/buttons/Button';
import { userEvent, within, expect } from '@storybook/test';

const meta = {
  title: 'Buttons/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Enterprise Button Component

A highly accessible, enterprise-focused button component with comprehensive B2B functionality including:

- **WCAG 2.1 AA compliance** with proper focus indicators
- **High contrast mode support** for accessibility
- **Enterprise theming** with professional B2B variants
- **Loading states** with accessible loading indicators
- **Keyboard navigation** support (Enter, Space)

## Best Practices for B2B Applications

- Use \`primary\` variant for main CTAs (max 1 per view)
- Use \`enterprise\` variant for admin/professional interfaces
- Always provide meaningful button text for screen readers
- Utilize loading states for async operations
- Group related actions using ButtonGroup component
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'enterprise'],
      description: 'Visual variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the button',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Shows loading spinner and disables interaction',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the button',
    },
    children: {
      control: { type: 'text' },
      description: 'Button content',
    },
  },
  args: {
    children: 'Button',
    variant: 'default',
    size: 'medium',
    loading: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Enterprise: Story = {
  args: {
    variant: 'enterprise',
    children: 'Enterprise Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Professional enterprise variant for B2B admin interfaces and corporate applications.',
      },
    },
  },
};

// Size Variants
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button sizes with consistent proportions and accessibility targets.',
      },
    },
  },
};

// States
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state with accessible spinner and proper ARIA attributes for screen readers.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

// B2B Enterprise Use Cases
export const DashboardActions: Story = {
  render: () => (
    <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900">Dashboard Actions</h3>
      <div className="flex gap-3">
        <Button variant="primary">Create Report</Button>
        <Button variant="secondary">Export Data</Button>
        <Button variant="default">Refresh</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common B2B dashboard action buttons with proper hierarchy and visual emphasis.',
      },
    },
  },
};

export const FormActions: Story = {
  render: () => (
    <div className="space-y-4 p-6 border rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900">Form Actions</h3>
      <div className="flex justify-end gap-3">
        <Button variant="default">Cancel</Button>
        <Button variant="primary">Save Changes</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Standard form action buttons with proper semantic ordering and visual hierarchy.',
      },
    },
  },
};

export const EnterpriseAdminPanel: Story = {
  render: () => (
    <div className="space-y-4 p-6 bg-slate-900 text-white rounded-lg">
      <h3 className="text-lg font-semibold">Admin Panel</h3>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="enterprise">User Management</Button>
        <Button variant="enterprise">System Settings</Button>
        <Button variant="enterprise">Audit Logs</Button>
        <Button variant="enterprise">Security Config</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Enterprise admin interface with professional styling and appropriate contrast.',
      },
    },
  },
};

// Interactive Examples
export const InteractiveExample: Story = {
  render: () => {
    const handleClick = () => {
      alert('Button clicked! In a real app, this would perform the intended action.');
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Demo</h3>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="primary" onClick={handleClick}>
            Primary Action
          </Button>
          <Button variant="secondary" onClick={handleClick}>
            Secondary Action
          </Button>
          <Button variant="enterprise" onClick={handleClick}>
            Enterprise Action
          </Button>
          <Button variant="default" onClick={handleClick}>
            Default Action
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive buttons with click handlers demonstrating real-world usage patterns.',
      },
    },
  },
};

// Accessibility Examples
export const AccessibilityFeatures: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Keyboard Navigation</h3>
        <p className="text-sm text-gray-600 mb-4">
          Use Tab to navigate, Enter or Space to activate
        </p>
        <div className="flex gap-3">
          <Button variant="primary">First Button</Button>
          <Button variant="secondary">Second Button</Button>
          <Button variant="default">Third Button</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Loading State</h3>
        <p className="text-sm text-gray-600 mb-4">
          Loading buttons are announced properly to screen readers
        </p>
        <Button loading variant="primary">
          Processing...
        </Button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">High Contrast Support</h3>
        <p className="text-sm text-gray-600 mb-4">
          Buttons adapt to system high contrast preferences
        </p>
        <div className="flex gap-3">
          <Button variant="primary">High Contrast</Button>
          <Button variant="default">Accessible</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features including keyboard navigation, loading states, and high contrast support.',
      },
    },
  },
};

// Testing Examples
export const TestingInteractions: Story = {
  args: {
    variant: 'primary',
    children: 'Click me',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test button is present and clickable
    await expect(button).toBeInTheDocument();
    await expect(button).toBeEnabled();

    // Test button click interaction
    await userEvent.click(button);

    // Test keyboard interaction
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');
  },
  parameters: {
    docs: {
      description: {
        story: 'Automated testing example showing interaction testing with Storybook play functions.',
      },
    },
  },
};

// Performance Example
export const PerformanceExample: Story = {
  render: () => {
    const buttons = Array.from({ length: 50 }, (_, i) => (
      <Button key={i} variant={i % 2 === 0 ? 'primary' : 'secondary'} size="small">
        Button {i + 1}
      </Button>
    ));

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Performance Test - 50 Buttons</h3>
        <p className="text-sm text-gray-600">
          Demonstrating efficient rendering of multiple button instances
        </p>
        <div className="grid grid-cols-10 gap-2 max-h-60 overflow-auto">
          {buttons}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance example showing efficient rendering of many button instances.',
      },
    },
  },
};