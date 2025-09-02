import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxGroup, useCheckboxGroup } from '../src/components/forms/Checkbox';
import React from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A checkbox component built with Radix UI, providing enterprise-grade functionality for B2B applications with comprehensive accessibility support, indeterminate state, and group management.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Size variant of the checkbox component',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'filled', 'ghost'],
      description: 'Visual variant of the checkbox component',
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
      description: 'Whether the checkbox is disabled',
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is in indeterminate state',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the checkbox',
    },
    description: {
      control: { type: 'text' },
      description: 'Description text displayed below the label',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text displayed below the checkbox',
    },
    error: {
      control: { type: 'text' },
      description: 'Error message displayed when validation fails',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Basic Examples
export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
    description: 'I agree to the terms and conditions of service',
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const Required: Story = {
  args: {
    label: 'I consent to data processing',
    description: 'This consent is required to proceed',
    required: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Send notifications',
    description: 'Receive email notifications about updates',
    helperText: 'You can change this setting anytime in your profile',
  },
};

// Size Variants
export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Checkbox components in different sizes for various UI densities.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <Checkbox
        label="Small Checkbox"
        description="Small size for compact layouts"
        size="sm"
      />
      
      <Checkbox
        label="Default Checkbox"
        description="Default size for normal layouts"
        size="default"
      />
      
      <Checkbox
        label="Large Checkbox"
        description="Large size for accessibility"
        size="lg"
      />
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
      <Checkbox
        label="Default Variant"
        description="Standard checkbox styling"
        variant="default"
      />
      
      <Checkbox
        label="Outline Variant"
        description="Outlined checkbox with border"
        variant="outline"
      />
      
      <Checkbox
        label="Filled Variant"
        description="Filled background checkbox"
        variant="filled"
      />
      
      <Checkbox
        label="Ghost Variant"
        description="Minimal ghost styling"
        variant="ghost"
      />
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
      <Checkbox
        label="Default Status"
        description="Normal state with no validation"
        status="default"
        helperText="Everything looks good"
      />
      
      <Checkbox
        label="Success Status"
        description="Validation passed successfully"
        status="success"
        helperText="Great choice!"
      />
      
      <Checkbox
        label="Warning Status"
        description="Please review this option"
        status="warning"
        helperText="This action cannot be undone"
      />
      
      <Checkbox
        label="Error Status"
        description="This field has validation errors"
        error="This field is required"
      />
    </div>
  ),
};

// Interactive States
export const InteractiveStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different interactive states including indeterminate.',
      },
    },
  },
  render: () => {
    const [checked, setChecked] = React.useState(false);
    const [indeterminate, setIndeterminate] = React.useState(true);
    
    return (
      <div className="space-y-4">
        <Checkbox
          label="Unchecked State"
          description="Click to check this option"
          checked={false}
        />
        
        <Checkbox
          label="Checked State"
          description="This option is selected"
          checked={true}
        />
        
        <Checkbox
          label="Indeterminate State"
          description="Partially selected state"
          indeterminate={true}
        />
        
        <Checkbox
          label="Disabled Unchecked"
          description="Cannot be interacted with"
          disabled={true}
          checked={false}
        />
        
        <Checkbox
          label="Disabled Checked"
          description="Cannot be interacted with"
          disabled={true}
          checked={true}
        />
        
        <Checkbox
          label="Interactive Example"
          description="Toggle between states"
          checked={checked}
          indeterminate={indeterminate}
          onCheckedChange={(value) => {
            setIndeterminate(false);
            setChecked(value === true);
          }}
          helperText={`Current state: ${indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked'}`}
        />
      </div>
    );
  },
};

// Checkbox Group Examples
export const CheckboxGroups: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Grouped checkboxes for multiple selections.',
      },
    },
  },
  render: () => (
    <div className="space-y-6">
      <CheckboxGroup
        label="Select your preferences"
        description="Choose one or more notification preferences"
        helperText="You can change these settings anytime"
      >
        <Checkbox label="Email notifications" description="Receive updates via email" />
        <Checkbox label="SMS notifications" description="Get text message alerts" />
        <Checkbox label="Push notifications" description="Browser push notifications" />
        <Checkbox label="Weekly digest" description="Summary of weekly activity" />
      </CheckboxGroup>
      
      <CheckboxGroup
        label="Required permissions"
        description="These permissions are required for the application to work"
        required
        error="Please accept all required permissions"
      >
        <Checkbox label="Access to location" description="Required for location-based features" required />
        <Checkbox label="Camera access" description="For profile pictures and document scanning" required />
        <Checkbox label="Storage access" description="To save your data locally" required />
      </CheckboxGroup>
    </div>
  ),
};

// Advanced Hook Example
export const HookExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Using the useCheckboxGroup hook for complex validation scenarios.',
      },
    },
  },
  render: () => {
    const permissions = useCheckboxGroup({
      defaultValue: ['read'],
      required: true,
      minSelected: 1,
      maxSelected: 3,
    });
    
    const features = useCheckboxGroup({
      maxSelected: 2,
    });

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">User Permissions (1-3 required)</h3>
          <div className="space-y-2 mb-2">
            <Checkbox
              label="Read Access"
              description="View data and reports"
              {...permissions.getCheckboxProps('read')}
            />
            <Checkbox
              label="Write Access"
              description="Create and edit data"
              {...permissions.getCheckboxProps('write')}
            />
            <Checkbox
              label="Admin Access"
              description="Full system administration"
              {...permissions.getCheckboxProps('admin')}
            />
            <Checkbox
              label="Super Admin"
              description="Ultimate system control"
              {...permissions.getCheckboxProps('super')}
            />
          </div>
          
          <button
            onClick={permissions.validate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Validate Permissions
          </button>
          
          {permissions.errors.length > 0 && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
              {permissions.errors.map((error, index) => (
                <p key={index} className="text-red-600 text-sm">{error}</p>
              ))}
            </div>
          )}
          
          <div className="mt-2 p-2 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">
              Selected: {permissions.value.join(', ') || 'none'}
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Optional Features (max 2)</h3>
          <div className="space-y-2 mb-2">
            <Checkbox
              label="Dark Mode"
              description="Enable dark theme"
              {...features.getCheckboxProps('dark')}
            />
            <Checkbox
              label="Beta Features"
              description="Access experimental features"
              {...features.getCheckboxProps('beta')}
            />
            <Checkbox
              label="Advanced Analytics"
              description="Detailed usage statistics"
              {...features.getCheckboxProps('analytics')}
            />
          </div>
          
          <button
            onClick={features.validate}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Validate Features
          </button>
          
          {features.errors.length > 0 && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
              {features.errors.map((error, index) => (
                <p key={index} className="text-red-600 text-sm">{error}</p>
              ))}
            </div>
          )}
          
          <div className="mt-2 p-2 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">
              Selected: {features.value.join(', ') || 'none'}
            </p>
          </div>
        </div>
      </div>
    );
  },
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
      <h3 className="text-lg font-semibold text-gray-900">Employee Onboarding Checklist</h3>
      
      <CheckboxGroup
        label="Required Documents"
        description="Please confirm you have received and reviewed all required documents"
        required
      >
        <Checkbox
          label="Employee Handbook"
          description="Company policies and procedures (PDF, 45 pages)"
          variant="outline"
        />
        <Checkbox
          label="Benefits Package Overview"
          description="Health insurance, 401k, and other benefits information"
          variant="outline"
        />
        <Checkbox
          label="IT Security Guidelines"
          description="Cybersecurity policies and acceptable use policy"
          variant="outline"
          required
        />
        <Checkbox
          label="Emergency Contact Form"
          description="Updated emergency contact information on file"
          variant="outline"
          required
        />
      </CheckboxGroup>
      
      <CheckboxGroup
        label="System Access Requests"
        description="Select the systems you need access to (requires manager approval)"
      >
        <Checkbox
          label="CRM System (Salesforce)"
          description="Customer relationship management - Sales team only"
          size="sm"
        />
        <Checkbox
          label="Financial Reports (QuickBooks)"
          description="Accounting and financial data - Finance team only"
          size="sm"
        />
        <Checkbox
          label="HR Information System"
          description="Employee data and payroll - HR team only"
          size="sm"
        />
        <Checkbox
          label="Project Management (Jira)"
          description="Development and project tracking - All teams"
          size="sm"
          checked={true}
        />
      </CheckboxGroup>
      
      <CheckboxGroup
        label="Training Modules"
        description="Complete mandatory training within 30 days"
      >
        <Checkbox
          label="Workplace Safety Training"
          description="OSHA compliance and safety procedures"
          status="success"
          checked={true}
          disabled={true}
        />
        <Checkbox
          label="Diversity & Inclusion Training"
          description="Cultural awareness and inclusive workplace practices"
          indeterminate={true}
        />
        <Checkbox
          label="Data Privacy & GDPR Compliance"
          description="Data protection regulations and best practices"
          status="warning"
          helperText="Due in 5 days"
        />
        <Checkbox
          label="Anti-Harassment Training"
          description="Workplace conduct and reporting procedures"
          status="error"
          error="Overdue - Complete immediately"
        />
      </CheckboxGroup>
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
          <li>Full keyboard navigation support (Tab, Space, Enter)</li>
          <li>Proper ARIA attributes for screen readers</li>
          <li>Focus management and visual indicators</li>
          <li>Required field announcements</li>
          <li>Error state announcements with aria-live regions</li>
          <li>Group relationships with proper labeling</li>
        </ul>
      </div>
      
      <CheckboxGroup
        label="Accessibility Features Demo"
        description="Try using keyboard navigation (Tab to focus, Space to toggle)"
        helperText="All checkboxes are fully accessible to assistive technologies"
      >
        <Checkbox
          label="Screen Reader Compatible"
          description="Properly announced with role and state information"
        />
        <Checkbox
          label="Keyboard Navigable"
          description="Full keyboard support with focus management"
        />
        <Checkbox
          label="High Contrast Support"
          description="Maintains visibility in high contrast modes"
        />
        <Checkbox
          label="Error Announcements"
          description="Validation errors are announced to screen readers"
          error="This field has an error for demonstration"
        />
      </CheckboxGroup>
    </div>
  ),
};

// Performance Example
export const PerformanceExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Performance example with large datasets and efficient rendering.',
      },
    },
  },
  render: () => {
    const [filter, setFilter] = React.useState('');
    const allOptions = React.useMemo(() => 
      Array.from({ length: 100 }, (_, i) => ({
        id: `option-${i}`,
        label: `Option ${i + 1}`,
        description: `Description for option ${i + 1}`,
        category: i < 25 ? 'Category A' : i < 50 ? 'Category B' : i < 75 ? 'Category C' : 'Category D'
      })),
      []
    );
    
    const filteredOptions = React.useMemo(() =>
      allOptions.filter(option => 
        option.label.toLowerCase().includes(filter.toLowerCase()) ||
        option.description.toLowerCase().includes(filter.toLowerCase())
      ),
      [allOptions, filter]
    );
    
    return (
      <div className="space-y-4">
        <div>
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter Options (100 total)
          </label>
          <input
            id="filter"
            type="text"
            placeholder="Type to filter options..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-md p-4">
          <CheckboxGroup
            label={`Available Options (${filteredOptions.length} shown)`}
            description="Efficiently rendered large checkbox list with filtering"
          >
            {filteredOptions.map((option) => (
              <Checkbox
                key={option.id}
                label={option.label}
                description={option.description}
                size="sm"
              />
            ))}
          </CheckboxGroup>
        </div>
      </div>
    );
  },
};