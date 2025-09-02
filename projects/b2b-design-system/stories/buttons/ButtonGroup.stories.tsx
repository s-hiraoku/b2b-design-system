import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from '../../src/components/buttons/ButtonGroup';
import { Button } from '../../src/components/buttons/Button';
import { IconButton } from '../../src/components/buttons/IconButton';
import { userEvent, within, expect } from '@storybook/test';

// Mock icons for demonstrations
const SaveIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-1v2a1 1 0 01-1.447.894L10 16.618l-2.553 1.276A1 1 0 016 17v-2H5a2 2 0 01-2-2V5zm5 1a1 1 0 011 1v1h1a1 1 0 110 2H9v1a1 1 0 11-2 0V9H6a1 1 0 110-2h1V6a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
  </svg>
);

const SkipIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
  </svg>
);

const meta = {
  title: 'Buttons/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# ButtonGroup Component

Groups related buttons with unified styling and enhanced B2B functionality:

- **Unified styling** with consistent sizing and variants
- **Keyboard navigation** with arrow key support
- **Connected appearance** option for seamless UI
- **Horizontal and vertical** orientations
- **Enterprise-focused** design patterns
- **ARIA group semantics** for accessibility

## B2B Use Cases

- **Toolbars**: Document editing, data manipulation
- **Form actions**: Save, cancel, submit workflows  
- **Data filters**: Toggle states, view options
- **Media controls**: Play, pause, skip functionality
- **Pagination**: Previous, current page, next

## Best Practices

- Group logically related actions together
- Use consistent button variants within groups
- Provide clear visual hierarchy for primary actions
- Consider connected styling for toggle-like behaviors
        `,
      },
    },
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation of the button group',
    },
    attached: {
      control: { type: 'boolean' },
      description: 'Whether buttons should have connected appearance',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Consistent size applied to all buttons in group',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'outline', 'ghost', 'enterprise'],
      description: 'Consistent variant applied to all buttons in group',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable all buttons in the group',
    },
  },
  args: {
    orientation: 'horizontal',
    attached: false,
    disabled: false,
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </ButtonGroup>
  ),
};

export const Horizontal: Story = {
  render: (args) => (
    <ButtonGroup {...args} orientation="horizontal">
      <Button>Save</Button>
      <Button>Cancel</Button>
      <Button>Reset</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <ButtonGroup {...args} orientation="vertical">
      <Button>Top</Button>
      <Button>Middle</Button>
      <Button>Bottom</Button>
    </ButtonGroup>
  ),
};

export const Attached: Story = {
  render: (args) => (
    <ButtonGroup {...args} attached>
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Connected appearance creates a seamless button group with shared borders.',
      },
    },
  },
};

// Variants
export const PrimaryGroup: Story = {
  render: (args) => (
    <ButtonGroup {...args} variant="primary">
      <Button>Save</Button>
      <Button>Publish</Button>
      <Button>Archive</Button>
    </ButtonGroup>
  ),
};

export const SecondaryGroup: Story = {
  render: (args) => (
    <ButtonGroup {...args} variant="secondary">
      <Button>Draft</Button>
      <Button>Preview</Button>
      <Button>Schedule</Button>
    </ButtonGroup>
  ),
};

export const EnterpriseGroup: Story = {
  render: (args) => (
    <ButtonGroup {...args} variant="enterprise">
      <Button>Admin</Button>
      <Button>Settings</Button>
      <Button>Security</Button>
    </ButtonGroup>
  ),
};

// Sizes
export const SizeVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Small</h4>
        <ButtonGroup size="small">
          <Button>Small</Button>
          <Button>Group</Button>
          <Button>Buttons</Button>
        </ButtonGroup>
      </div>
      <div>
        <h4 className="font-medium mb-2">Medium (Default)</h4>
        <ButtonGroup size="medium">
          <Button>Medium</Button>
          <Button>Group</Button>
          <Button>Buttons</Button>
        </ButtonGroup>
      </div>
      <div>
        <h4 className="font-medium mb-2">Large</h4>
        <ButtonGroup size="large">
          <Button>Large</Button>
          <Button>Group</Button>
          <Button>Buttons</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Size variants applied consistently to all buttons in the group.',
      },
    },
  },
};

// Icon Button Groups
export const IconButtonGroup: Story = {
  render: () => (
    <ButtonGroup attached>
      <IconButton variant="outline" aria-label="Save document">
        <SaveIcon />
      </IconButton>
      <IconButton variant="outline" aria-label="Edit document">
        <EditIcon />
      </IconButton>
      <IconButton variant="outline" aria-label="Delete document">
        <DeleteIcon />
      </IconButton>
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon buttons work seamlessly within ButtonGroup for compact toolbars.',
      },
    },
  },
};

// B2B Use Cases
export const DocumentToolbar: Story = {
  render: () => (
    <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900">Document Editor</h3>
      <div className="flex items-center gap-4">
        <ButtonGroup attached variant="outline">
          <IconButton aria-label="Save document">
            <SaveIcon />
          </IconButton>
          <IconButton aria-label="Edit document">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="Delete document">
            <DeleteIcon />
          </IconButton>
        </ButtonGroup>
        <div className="w-px h-8 bg-gray-300" />
        <ButtonGroup>
          <Button variant="secondary">Draft</Button>
          <Button variant="primary">Publish</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Professional document editor toolbar combining icon actions and text buttons.',
      },
    },
  },
};

export const DataFilterControls: Story = {
  render: () => (
    <div className="space-y-4 p-6 border rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900">Data Filters</h3>
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Range
          </label>
          <ButtonGroup attached size="small">
            <Button variant="primary">Today</Button>
            <Button>This Week</Button>
            <Button>This Month</Button>
            <Button>Custom</Button>
          </ButtonGroup>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <ButtonGroup attached size="small">
            <Button variant="secondary">Active</Button>
            <Button>Pending</Button>
            <Button>Inactive</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Data filtering interface with toggle-style button groups for state selection.',
      },
    },
  },
};

export const MediaControls: Story = {
  render: () => (
    <div className="space-y-4 p-6 bg-white border rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900">Media Player</h3>
      <div className="flex items-center justify-center">
        <ButtonGroup attached>
          <IconButton variant="outline" size="large" aria-label="Play media">
            <PlayIcon />
          </IconButton>
          <IconButton variant="outline" size="large" aria-label="Pause media">
            <PauseIcon />
          </IconButton>
          <IconButton variant="outline" size="large" aria-label="Skip forward">
            <SkipIcon />
          </IconButton>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Media control interface with connected icon buttons for seamless interaction.',
      },
    },
  },
};

export const FormActionButtons: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Employee Form</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option>Engineering</option>
              <option>Marketing</option>
              <option>Sales</option>
            </select>
          </div>
          <div className="flex justify-end pt-4">
            <ButtonGroup>
              <Button variant="outline">Cancel</Button>
              <Button variant="secondary">Save Draft</Button>
              <Button variant="primary">Submit</Button>
            </ButtonGroup>
          </div>
        </form>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Standard form with action buttons showing proper hierarchy and spacing.',
      },
    },
  },
};

export const PaginationControls: Story = {
  render: () => (
    <div className="space-y-4 p-6 border rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900">Table Pagination</h3>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">
          Showing 1-10 of 247 results
        </span>
        <ButtonGroup attached>
          <Button variant="outline" disabled>Previous</Button>
          <Button variant="primary">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">...</Button>
          <Button variant="outline">25</Button>
          <Button variant="outline">Next</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pagination controls with connected buttons showing current page state.',
      },
    },
  },
};

// States
export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-4">
      <ButtonGroup>
        <Button loading>Processing</Button>
        <Button>Cancel</Button>
      </ButtonGroup>
      <ButtonGroup variant="primary">
        <Button>Save</Button>
        <Button loading>Publishing</Button>
        <Button>Schedule</Button>
      </ButtonGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button groups with individual loading states for async operations.',
      },
    },
  },
};

export const DisabledGroup: Story = {
  render: () => (
    <ButtonGroup disabled>
      <Button>Disabled</Button>
      <Button>Group</Button>
      <Button>Buttons</Button>
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Entire button group can be disabled for form or workflow states.',
      },
    },
  },
};

// Accessibility Examples
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Keyboard Navigation Demo</h3>
        <p className="text-sm text-gray-600 mb-4">
          Use Tab to focus the group, then Arrow keys to navigate between buttons
        </p>
        <ButtonGroup>
          <Button>First Button</Button>
          <Button>Second Button</Button>
          <Button>Third Button</Button>
          <Button>Fourth Button</Button>
        </ButtonGroup>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Vertical Navigation</h4>
        <p className="text-sm text-gray-600 mb-4">
          Use Up/Down arrows for vertical button groups
        </p>
        <ButtonGroup orientation="vertical">
          <Button>Top Button</Button>
          <Button>Middle Button</Button>
          <Button>Bottom Button</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Keyboard navigation examples showing horizontal and vertical arrow key support.',
      },
    },
  },
};

// Testing Example
export const TestingInteraction: Story = {
  render: () => (
    <ButtonGroup>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </ButtonGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find all buttons in the group
    const buttons = canvas.getAllByRole('button');
    
    // Test that all buttons are present
    await expect(buttons).toHaveLength(3);
    
    // Test clicking buttons
    await userEvent.click(buttons[0]);
    await userEvent.click(buttons[1]);
    
    // Test keyboard navigation
    buttons[0].focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(buttons[1]).toHaveFocus();
    
    await userEvent.keyboard('{ArrowRight}');
    await expect(buttons[2]).toHaveFocus();
    
    // Test wrap-around navigation
    await userEvent.keyboard('{ArrowRight}');
    await expect(buttons[0]).toHaveFocus();
  },
  parameters: {
    docs: {
      description: {
        story: 'Automated testing example showing button group interaction and keyboard navigation.',
      },
    },
  },
};

// Advanced B2B Scenarios
export const ConditionalFiltering: Story = {
  render: () => {
    const [selectedFilters, setSelectedFilters] = React.useState<string[]>(['active']);
    
    const toggleFilter = (filter: string) => {
      setSelectedFilters(prev => 
        prev.includes(filter) 
          ? prev.filter(f => f !== filter)
          : [...prev, filter]
      );
    };

    return (
      <div className="space-y-6 p-6 bg-white border rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900">Advanced Data Filtering</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employee Status
            </label>
            <ButtonGroup attached size="small">
              <Button 
                variant={selectedFilters.includes('active') ? 'primary' : 'outline'}
                onClick={() => toggleFilter('active')}
              >
                Active (142)
              </Button>
              <Button 
                variant={selectedFilters.includes('inactive') ? 'primary' : 'outline'}
                onClick={() => toggleFilter('inactive')}
              >
                Inactive (23)
              </Button>
              <Button 
                variant={selectedFilters.includes('pending') ? 'primary' : 'outline'}
                onClick={() => toggleFilter('pending')}
              >
                Pending (8)
              </Button>
            </ButtonGroup>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department Filter
            </label>
            <ButtonGroup attached size="small">
              <Button variant="outline">Engineering (45)</Button>
              <Button variant="primary">Marketing (23)</Button>
              <Button variant="outline">Sales (38)</Button>
              <Button variant="outline">HR (12)</Button>
              <Button variant="outline">Finance (15)</Button>
            </ButtonGroup>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Actions
            </label>
            <ButtonGroup>
              <Button variant="secondary" size="small">Export Selected</Button>
              <Button variant="outline" size="small">Clear Filters</Button>
              <Button variant="primary" size="small">Apply Filters</Button>
            </ButtonGroup>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Active Filters:</strong> {selectedFilters.join(', ') || 'None'}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Showing filtered results based on selected criteria
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Advanced filtering interface with stateful button groups, toggle states, and conditional styling for enterprise data management.',
      },
    },
  },
};

export const WorkflowStepIndicator: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(2);
    const steps = [
      { id: 1, label: 'Requirements', completed: true },
      { id: 2, label: 'Design', completed: false, current: true },
      { id: 3, label: 'Development', completed: false },
      { id: 4, label: 'Testing', completed: false },
      { id: 5, label: 'Deployment', completed: false },
    ];

    return (
      <div className="space-y-6 p-6 bg-white border rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900">Project Workflow Progress</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Current Project: E-commerce Platform Redesign</h4>
            <ButtonGroup attached>
              {steps.map((step) => {
                let variant: 'primary' | 'secondary' | 'outline' = 'outline';
                if (step.completed) variant = 'secondary';
                if (step.current) variant = 'primary';
                
                return (
                  <Button 
                    key={step.id}
                    variant={variant}
                    size="small"
                    onClick={() => setCurrentStep(step.id)}
                    className={step.completed ? 'opacity-75' : ''}
                  >
                    {step.completed && (
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    )}
                    {step.label}
                  </Button>
                );
              })}
            </ButtonGroup>
          </div>
          
          <div className="flex justify-between items-center">
            <ButtonGroup>
              <Button 
                variant="outline" 
                size="small"
                disabled={currentStep === 1}
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              >
                Previous Step
              </Button>
              <Button 
                variant="primary" 
                size="small"
                disabled={currentStep === steps.length}
                onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
              >
                Next Step
              </Button>
            </ButtonGroup>
            
            <ButtonGroup size="small">
              <Button variant="secondary">Save Progress</Button>
              <Button variant="outline">View Timeline</Button>
            </ButtonGroup>
          </div>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-lg">
          <h5 className="font-medium text-blue-900 mb-2">
            Step {currentStep}: {steps.find(s => s.id === currentStep)?.label}
          </h5>
          <p className="text-sm text-blue-800">
            {currentStep === 1 && 'Gathering requirements and defining project scope.'}
            {currentStep === 2 && 'Creating wireframes, mockups, and design specifications.'}
            {currentStep === 3 && 'Implementing frontend and backend functionality.'}
            {currentStep === 4 && 'Quality assurance testing and bug fixes.'}
            {currentStep === 5 && 'Production deployment and go-live activities.'}
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive workflow step indicator using ButtonGroup for project progression, with step navigation and status visualization.',
      },
    },
  },
};

// Comprehensive Example
export const ComprehensiveDemo: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <h3 className="text-2xl font-bold text-gray-900">ButtonGroup Showcase</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Horizontal Groups</h4>
          
          <div>
            <p className="text-sm text-gray-600 mb-2">Default separated</p>
            <ButtonGroup>
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-2">Connected primary</p>
            <ButtonGroup attached variant="primary">
              <Button>Save</Button>
              <Button>Publish</Button>
              <Button>Archive</Button>
            </ButtonGroup>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-2">Enterprise icons</p>
            <ButtonGroup attached variant="enterprise">
              <IconButton aria-label="Save">
                <SaveIcon />
              </IconButton>
              <IconButton aria-label="Edit">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </ButtonGroup>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Vertical Groups</h4>
          
          <div>
            <p className="text-sm text-gray-600 mb-2">Vertical stack</p>
            <ButtonGroup orientation="vertical">
              <Button>First</Button>
              <Button>Second</Button>
              <Button>Third</Button>
            </ButtonGroup>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-2">Connected vertical</p>
            <ButtonGroup orientation="vertical" attached variant="secondary">
              <Button>Top</Button>
              <Button>Middle</Button>
              <Button>Bottom</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive demonstration of all ButtonGroup features and configurations.',
      },
    },
  },
};