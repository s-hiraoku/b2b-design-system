import type { Meta, StoryObj } from '@storybook/react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectField,
  SelectLabel,
  SelectGroup,
  SelectSeparator,
} from '../src/components/forms/Select';

const meta: Meta<typeof SelectField> = {
  title: 'Forms/Select',
  component: SelectField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A select dropdown component built with Radix UI, providing enterprise-grade functionality for B2B applications with comprehensive accessibility support and customizable styling.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Size variant of the select component',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'filled', 'ghost'],
      description: 'Visual variant of the select component',
    },
    status: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning'],
      description: 'Status variant for validation states',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the field is required',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the select is disabled',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the select field',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text when no option is selected',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text displayed below the select',
    },
    error: {
      control: { type: 'text' },
      description: 'Error message displayed when validation fails',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SelectField>;

// Basic Examples
export const Default: Story = {
  args: {
    label: 'Choose Option',
    placeholder: 'Select an option...',
  },
  render: (args) => (
    <SelectField {...args}>
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
      <SelectItem value="option3">Option 3</SelectItem>
    </SelectField>
  ),
};

export const WithHelperText: Story = {
  args: {
    label: 'Department',
    placeholder: 'Select your department',
    helperText: 'Choose the department you belong to',
  },
  render: (args) => (
    <SelectField {...args}>
      <SelectItem value="engineering">Engineering</SelectItem>
      <SelectItem value="sales">Sales</SelectItem>
      <SelectItem value="marketing">Marketing</SelectItem>
      <SelectItem value="hr">Human Resources</SelectItem>
    </SelectField>
  ),
};

export const Required: Story = {
  args: {
    label: 'Priority Level',
    placeholder: 'Select priority...',
    required: true,
    helperText: 'This field is required for processing',
  },
  render: (args) => (
    <SelectField {...args}>
      <SelectItem value="low">Low Priority</SelectItem>
      <SelectItem value="medium">Medium Priority</SelectItem>
      <SelectItem value="high">High Priority</SelectItem>
      <SelectItem value="urgent">Urgent</SelectItem>
    </SelectField>
  ),
};

// Size Variants
export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Select components in different sizes for various UI densities.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <SelectField
        label="Small Size"
        placeholder="Select option..."
        size="sm"
      >
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectField>
      
      <SelectField
        label="Default Size"
        placeholder="Select option..."
        size="default"
      >
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectField>
      
      <SelectField
        label="Large Size"
        placeholder="Select option..."
        size="lg"
      >
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectField>
    </div>
  ),
};

// Visual Variants
export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different visual styles for various design requirements.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <SelectField
        label="Default Variant"
        placeholder="Select option..."
        variant="default"
      >
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectField>
      
      <SelectField
        label="Outline Variant"
        placeholder="Select option..."
        variant="outline"
      >
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectField>
      
      <SelectField
        label="Filled Variant"
        placeholder="Select option..."
        variant="filled"
      >
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectField>
      
      <SelectField
        label="Ghost Variant"
        placeholder="Select option..."
        variant="ghost"
      >
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectField>
    </div>
  ),
};

// Status States
export const StatusStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Status variants for validation and user feedback.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <SelectField
        label="Default Status"
        placeholder="Select option..."
        status="default"
        helperText="Normal state with no validation"
      >
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectField>
      
      <SelectField
        label="Success Status"
        placeholder="Select option..."
        status="success"
        helperText="Valid selection made"
      >
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectField>
      
      <SelectField
        label="Warning Status"
        placeholder="Select option..."
        status="warning"
        helperText="Please review your selection"
      >
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectField>
      
      <SelectField
        label="Error Status"
        placeholder="Select option..."
        error="This field is required"
      >
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectField>
    </div>
  ),
};

// Advanced Examples
export const GroupedOptions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Grouped options with separators for better organization.',
      },
    },
  },
  args: {
    label: 'Team Member',
    placeholder: 'Select a team member...',
    helperText: 'Choose from available team members by department',
  },
  render: (args) => (
    <SelectField {...args}>
      <SelectGroup>
        <SelectLabel>Engineering</SelectLabel>
        <SelectItem value="john-eng">John Smith</SelectItem>
        <SelectItem value="jane-eng">Jane Johnson</SelectItem>
        <SelectItem value="mike-eng">Mike Wilson</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Sales</SelectLabel>
        <SelectItem value="sarah-sales">Sarah Davis</SelectItem>
        <SelectItem value="tom-sales">Tom Brown</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Marketing</SelectLabel>
        <SelectItem value="lisa-marketing">Lisa Anderson</SelectItem>
        <SelectItem value="chris-marketing">Chris Taylor</SelectItem>
      </SelectGroup>
    </SelectField>
  ),
};

export const BusinessData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example with complex business data showing realistic B2B scenarios.',
      },
    },
  },
  args: {
    label: 'Business Unit',
    placeholder: 'Select business unit...',
    helperText: 'Choose the business unit for reporting',
  },
  render: (args) => (
    <SelectField {...args}>
      <SelectItem value="bu-north-america">North America Division (NAM001)</SelectItem>
      <SelectItem value="bu-europe">European Operations (EUR002)</SelectItem>
      <SelectItem value="bu-asia-pacific">Asia Pacific Region (APAC003)</SelectItem>
      <SelectItem value="bu-latin-america">Latin America Division (LATAM004)</SelectItem>
      <SelectItem value="bu-middle-east">Middle East & Africa (MEA005)</SelectItem>
    </SelectField>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    placeholder: 'Cannot select...',
    helperText: 'This select is currently disabled',
    disabled: true,
  },
  render: (args) => (
    <SelectField {...args}>
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
      <SelectItem value="option3">Option 3</SelectItem>
    </SelectField>
  ),
};

export const LargeDataset: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Select with a large number of options to demonstrate scrolling behavior.',
      },
    },
  },
  args: {
    label: 'Country',
    placeholder: 'Select country...',
    helperText: 'Choose from the list of countries',
  },
  render: (args) => (
    <SelectField {...args}>
      {[
        'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 
        'Spain', 'Italy', 'Netherlands', 'Belgium', 'Switzerland',
        'Austria', 'Sweden', 'Norway', 'Denmark', 'Finland',
        'Japan', 'South Korea', 'China', 'India', 'Australia',
        'New Zealand', 'Brazil', 'Argentina', 'Mexico', 'Chile',
        'South Africa', 'Nigeria', 'Egypt', 'Morocco', 'Kenya',
        'Singapore', 'Malaysia', 'Thailand', 'Philippines', 'Indonesia',
        'Vietnam', 'Hong Kong', 'Taiwan', 'Israel', 'Turkey'
      ].map((country) => (
        <SelectItem key={country.toLowerCase().replace(' ', '-')} value={country.toLowerCase().replace(' ', '-')}>
          {country}
        </SelectItem>
      ))}
    </SelectField>
  ),
};

// Enterprise B2B Examples
export const EnterpriseExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Enterprise-focused example with business-specific styling and functionality.',
      },
    },
  },
  render: () => (
    <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900">Enterprise User Management</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="User Role"
          placeholder="Select user role..."
          required
          variant="outline"
          size="default"
        >
          <SelectGroup>
            <SelectLabel>Administrative</SelectLabel>
            <SelectItem value="super-admin">Super Administrator</SelectItem>
            <SelectItem value="admin">Administrator</SelectItem>
            <SelectItem value="system-admin">System Administrator</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Management</SelectLabel>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="team-lead">Team Lead</SelectItem>
            <SelectItem value="supervisor">Supervisor</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Standard Users</SelectLabel>
            <SelectItem value="user">Standard User</SelectItem>
            <SelectItem value="guest">Guest User</SelectItem>
            <SelectItem value="contractor">Contractor</SelectItem>
          </SelectGroup>
        </SelectField>
        
        <SelectField
          label="Access Level"
          placeholder="Select access level..."
          required
          status="success"
          helperText="Access level configured successfully"
        >
          <SelectItem value="full">Full Access</SelectItem>
          <SelectItem value="limited">Limited Access</SelectItem>
          <SelectItem value="read-only">Read Only</SelectItem>
          <SelectItem value="restricted">Restricted</SelectItem>
        </SelectField>
        
        <SelectField
          label="Department"
          placeholder="Select department..."
          variant="filled"
          size="sm"
        >
          <SelectItem value="engineering">Engineering & Development</SelectItem>
          <SelectItem value="sales">Sales & Business Development</SelectItem>
          <SelectItem value="marketing">Marketing & Communications</SelectItem>
          <SelectItem value="finance">Finance & Accounting</SelectItem>
          <SelectItem value="hr">Human Resources</SelectItem>
          <SelectItem value="operations">Operations & Support</SelectItem>
        </SelectField>
        
        <SelectField
          label="Location"
          placeholder="Select location..."
          variant="ghost"
          size="sm"
        >
          <SelectItem value="hq-ny">HQ - New York</SelectItem>
          <SelectItem value="office-sf">Office - San Francisco</SelectItem>
          <SelectItem value="office-london">Office - London</SelectItem>
          <SelectItem value="office-tokyo">Office - Tokyo</SelectItem>
          <SelectItem value="remote">Remote</SelectItem>
        </SelectField>
      </div>
    </div>
  ),
};

// Accessibility Example
export const AccessibilityShowcase: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates accessibility features including proper ARIA attributes and keyboard navigation.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-md">
        <h4 className="font-medium text-blue-900">Accessibility Features:</h4>
        <ul className="text-sm text-blue-800 mt-2 list-disc list-inside">
          <li>Full keyboard navigation support (Tab, Enter, Arrow keys, Escape)</li>
          <li>Proper ARIA attributes for screen readers</li>
          <li>Focus management and visual indicators</li>
          <li>Required field announcements</li>
          <li>Error state announcements</li>
        </ul>
      </div>
      
      <SelectField
        label="Accessible Select Example"
        placeholder="Use keyboard to navigate..."
        required
        helperText="Try using Tab to focus, Enter to open, Arrow keys to navigate, Enter to select, Escape to close"
      >
        <SelectItem value="option1">First Option</SelectItem>
        <SelectItem value="option2">Second Option</SelectItem>
        <SelectItem value="option3">Third Option</SelectItem>
        <SelectItem value="option4">Fourth Option</SelectItem>
      </SelectField>
    </div>
  ),
};

// Component Composition Example
export const CompositionExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Advanced composition example showing how to use individual select components.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Custom Composed Select
        </label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose custom option..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Custom Group</SelectLabel>
              <SelectItem value="custom1">Custom Option 1</SelectItem>
              <SelectItem value="custom2">Custom Option 2</SelectItem>
              <SelectItem value="custom3">Custom Option 3</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <p className="text-sm text-gray-600">
        This example shows direct composition of Select components without the SelectField wrapper,
        giving you full control over layout and styling.
      </p>
    </div>
  ),
};