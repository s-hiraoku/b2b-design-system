import type { Meta, StoryObj } from '@storybook/react';
import { FloatingActionButton } from '../../src/components/buttons/FloatingActionButton';
import { userEvent, within, expect } from '@storybook/test';

// Mock icons for demonstration
const PlusIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.334a.75.75 0 001.28.53l3.58-3.579a78.3 78.3 0 001.14-.048c2.236 0 4.43-.18 6.57-.524C19.007 13.289 20 12.03 20 10.574V5.426c0-1.413-.993-2.67-2.43-2.902A78.3 78.3 0 0010 2z" clipRule="evenodd" />
  </svg>
);

const UploadIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.828V13a1 1 0 102 0V9.828l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5h-2C7.163 18 2 12.837 2 5.5v-2z" clipRule="evenodd" />
  </svg>
);

const meta = {
  title: 'Buttons/FloatingActionButton',
  component: FloatingActionButton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# FloatingActionButton (FAB) Component

A circular floating button for primary actions in B2B applications with:

- **Circular design** with perfect icon centering and proportions
- **Fixed and absolute positioning** with smart default placement
- **Extended variant** supporting icon + text combinations
- **High z-index layering** for proper content overlay
- **Enterprise color schemes** for professional interfaces
- **Enhanced elevation** with hover and focus effects

## B2B Use Cases

- **Primary actions**: Create new records, add items, compose messages
- **Dashboard shortcuts**: Quick access to key functionality
- **Data entry**: Add rows to tables, create new entries
- **Communication**: Initiate calls, send messages, start chats
- **File operations**: Upload documents, create folders

## Best Practices

- Use sparingly (typically 1 per page/section)
- Position for thumb accessibility on mobile
- Provide clear, action-oriented labels
- Consider page context for placement
- Use extended variant when text clarifies action
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'extended'],
      description: 'Button variant - default circular or extended with text',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the FAB (maintains circular proportions)',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'enterprise'],
      description: 'Color scheme for the FAB',
    },
    position: {
      control: { type: 'select' },
      options: ['fixed', 'absolute'],
      description: 'Positioning type for the FAB',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Shows loading spinner and disables interaction',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the FAB',
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Required accessible label for screen readers',
    },
  },
  args: {
    'aria-label': 'Add new item',
    variant: 'default',
    size: 'medium',
    color: 'primary',
    position: 'fixed',
    loading: false,
    disabled: false,
    children: <PlusIcon />,
    className: 'bottom-6 right-6', // Default positioning for stories
  },
} satisfies Meta<typeof FloatingActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples (with relative positioning for Storybook)
export const Default: Story = {
  args: {
    'aria-label': 'Add new item',
    children: <PlusIcon />,
    position: 'absolute',
    className: 'bottom-4 right-4',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Default circular FAB with primary color and medium size.',
      },
    },
  },
};

export const Extended: Story = {
  args: {
    variant: 'extended',
    'aria-label': 'Create new document',
    children: (
      <>
        <PlusIcon />
        <span>Create</span>
      </>
    ),
    position: 'absolute',
    className: 'bottom-4 right-4',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Extended FAB variant with icon and text for clearer action context.',
      },
    },
  },
};

// Size Variants
export const Sizes: Story = {
  render: () => (
    <div className="relative h-48 bg-gray-50 rounded-lg p-8">
      <FloatingActionButton 
        size="small" 
        position="absolute"
        className="bottom-4 left-4"
        aria-label="Small add button"
      >
        <PlusIcon />
      </FloatingActionButton>
      
      <FloatingActionButton 
        size="medium" 
        position="absolute"
        className="bottom-4 left-20"
        aria-label="Medium add button"
      >
        <PlusIcon />
      </FloatingActionButton>
      
      <FloatingActionButton 
        size="large" 
        position="absolute"
        className="bottom-4 left-40"
        aria-label="Large add button"
      >
        <PlusIcon />
      </FloatingActionButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available FAB sizes maintaining perfect circular proportions.',
      },
    },
  },
};

// Color Variants
export const Colors: Story = {
  render: () => (
    <div className="relative h-48 bg-gray-50 rounded-lg p-8">
      <FloatingActionButton 
        color="primary" 
        position="absolute"
        className="bottom-4 left-4"
        aria-label="Primary action"
      >
        <PlusIcon />
      </FloatingActionButton>
      
      <FloatingActionButton 
        color="secondary" 
        position="absolute"
        className="bottom-4 left-20"
        aria-label="Secondary action"
      >
        <EditIcon />
      </FloatingActionButton>
      
      <FloatingActionButton 
        color="enterprise" 
        position="absolute"
        className="bottom-4 left-40"
        aria-label="Enterprise action"
      >
        <UploadIcon />
      </FloatingActionButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available color schemes for different B2B interface contexts.',
      },
    },
  },
};

// States
export const Loading: Story = {
  args: {
    loading: true,
    'aria-label': 'Creating new item',
    children: <PlusIcon />,
    position: 'absolute',
    className: 'bottom-4 right-4',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Loading state with accessible spinner. Icon is hidden while loading.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Add new item (unavailable)',
    children: <PlusIcon />,
    position: 'absolute',
    className: 'bottom-4 right-4',
  },
  parameters: {
    layout: 'centered',
  },
};

// B2B Use Cases
export const DashboardFAB: Story = {
  render: () => (
    <div className="relative bg-white rounded-lg border h-96 p-6 overflow-hidden">
      {/* Mock dashboard content */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Sales Dashboard</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900">Revenue</h3>
            <p className="text-2xl font-bold text-blue-600">$125,430</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-900">Orders</h3>
            <p className="text-2xl font-bold text-green-600">1,234</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
      
      {/* FAB for quick actions */}
      <FloatingActionButton 
        position="absolute"
        className="bottom-6 right-6"
        aria-label="Create new sale"
      >
        <PlusIcon />
      </FloatingActionButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'FAB positioned on a dashboard for quick access to primary creation action.',
      },
    },
  },
};

export const DataTableFAB: Story = {
  render: () => (
    <div className="relative bg-white rounded-lg border h-96 p-6 overflow-hidden">
      {/* Mock data table */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Employee Directory</h2>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Department</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-2 text-sm text-gray-900">John Doe</td>
              <td className="px-4 py-2 text-sm text-gray-600">Engineering</td>
              <td className="px-4 py-2 text-sm text-gray-600">Senior Developer</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-gray-900">Jane Smith</td>
              <td className="px-4 py-2 text-sm text-gray-600">Marketing</td>
              <td className="px-4 py-2 text-sm text-gray-600">Manager</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* FAB for adding new employee */}
      <FloatingActionButton 
        variant="extended"
        position="absolute"
        className="bottom-6 right-6"
        aria-label="Add new employee"
      >
        <PlusIcon />
        <span>Add Employee</span>
      </FloatingActionButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Extended FAB on data table for adding new records with clear text label.',
      },
    },
  },
};

export const CommunicationFABs: Story = {
  render: () => (
    <div className="relative bg-white rounded-lg border h-96 p-6 overflow-hidden">
      {/* Mock communication interface */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Customer Support</h2>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-900 font-medium">Ticket #1234</p>
            <p className="text-sm text-gray-600">Login issue reported by user</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-900 font-medium">Ticket #1235</p>
            <p className="text-sm text-gray-600">Feature request for dashboard</p>
          </div>
        </div>
      </div>
      
      {/* Multiple FABs for different communication methods */}
      <FloatingActionButton 
        position="absolute"
        className="bottom-6 right-6"
        aria-label="Start new chat"
      >
        <ChatIcon />
      </FloatingActionButton>
      
      <FloatingActionButton 
        color="secondary"
        position="absolute"
        className="bottom-6 right-24"
        aria-label="Send email"
      >
        <EmailIcon />
      </FloatingActionButton>
      
      <FloatingActionButton 
        color="enterprise"
        position="absolute"
        className="bottom-24 right-6"
        aria-label="Make phone call"
      >
        <PhoneIcon />
      </FloatingActionButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple FABs for different communication methods in customer support interface.',
      },
    },
  },
};

export const DocumentManagementFAB: Story = {
  render: () => (
    <div className="relative bg-white rounded-lg border h-96 p-6 overflow-hidden">
      {/* Mock file explorer */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Document Library</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <div className="w-8 h-8 bg-blue-200 rounded mx-auto mb-2"></div>
            <p className="text-xs text-gray-600">Report.pdf</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <div className="w-8 h-8 bg-green-200 rounded mx-auto mb-2"></div>
            <p className="text-xs text-gray-600">Proposal.docx</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <div className="w-8 h-8 bg-red-200 rounded mx-auto mb-2"></div>
            <p className="text-xs text-gray-600">Budget.xlsx</p>
          </div>
        </div>
      </div>
      
      {/* FAB for file upload */}
      <FloatingActionButton 
        color="enterprise"
        position="absolute"
        className="bottom-6 right-6"
        aria-label="Upload new document"
      >
        <UploadIcon />
      </FloatingActionButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'FAB for document upload in enterprise file management system.',
      },
    },
  },
};

// Positioning Examples
export const PositioningVariations: Story = {
  render: () => (
    <div className="relative bg-gray-50 rounded-lg h-96 p-4 overflow-hidden">
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold text-gray-900">FAB Positioning Examples</h3>
        <p className="text-sm text-gray-600 mt-2">Various positions for different interface layouts</p>
      </div>
      
      {/* Bottom right (most common) */}
      <FloatingActionButton 
        position="absolute"
        className="bottom-4 right-4"
        aria-label="Bottom right action"
      >
        <PlusIcon />
      </FloatingActionButton>
      
      {/* Bottom left */}
      <FloatingActionButton 
        color="secondary"
        position="absolute"
        className="bottom-4 left-4"
        aria-label="Bottom left action"
      >
        <EditIcon />
      </FloatingActionButton>
      
      {/* Top right */}
      <FloatingActionButton 
        color="enterprise"
        size="small"
        position="absolute"
        className="top-4 right-4"
        aria-label="Top right action"
      >
        <UploadIcon />
      </FloatingActionButton>
      
      {/* Center right */}
      <FloatingActionButton 
        variant="extended"
        color="secondary"
        position="absolute"
        className="top-1/2 right-4 -translate-y-1/2"
        aria-label="Center right action"
      >
        <ChatIcon />
        <span>Chat</span>
      </FloatingActionButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different positioning strategies for various B2B interface layouts.',
      },
    },
  },
};

// Interactive Examples
export const InteractiveDemo: Story = {
  render: () => {
    const handleFABClick = (action: string) => {
      alert(`${action} action triggered! In a real app, this would navigate to the ${action.toLowerCase()} interface.`);
    };

    return (
      <div className="relative bg-white rounded-lg border h-96 p-6 overflow-hidden">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Interactive FAB Demo</h2>
          <p className="text-gray-600">Click any FAB to see interaction feedback</p>
          
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium">Recent Activity</h3>
              <p className="text-sm text-gray-600 mt-1">No recent activity to display</p>
            </div>
          </div>
        </div>
        
        {/* Interactive FABs */}
        <FloatingActionButton 
          position="absolute"
          className="bottom-6 right-6"
          aria-label="Create new item"
          onClick={() => handleFABClick('Create')}
        >
          <PlusIcon />
        </FloatingActionButton>
        
        <FloatingActionButton 
          variant="extended"
          color="secondary"
          position="absolute"
          className="bottom-6 right-24"
          aria-label="Upload files"
          onClick={() => handleFABClick('Upload')}
        >
          <UploadIcon />
          <span>Upload</span>
        </FloatingActionButton>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive FABs with click handlers demonstrating real-world usage patterns.',
      },
    },
  },
};

// Accessibility Examples
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Accessibility Features</h3>
        <p className="text-sm text-gray-600 mb-4">
          FABs include proper ARIA labels and keyboard support
        </p>
      </div>
      
      <div className="relative bg-gray-50 rounded-lg h-64 p-4">
        <div className="p-4">
          <h4 className="font-medium mb-2">Keyboard Navigation</h4>
          <p className="text-sm text-gray-600 mb-4">
            Use Tab to focus, Enter or Space to activate
          </p>
        </div>
        
        <FloatingActionButton 
          position="absolute"
          className="bottom-4 right-4"
          aria-label="Create new customer record with detailed information form"
        >
          <PlusIcon />
        </FloatingActionButton>
      </div>
      
      <div className="relative bg-gray-50 rounded-lg h-64 p-4">
        <div className="p-4">
          <h4 className="font-medium mb-2">Screen Reader Support</h4>
          <p className="text-sm text-gray-600 mb-4">
            Extended FABs provide additional context
          </p>
        </div>
        
        <FloatingActionButton 
          variant="extended"
          color="enterprise"
          position="absolute"
          className="bottom-4 right-4"
          aria-label="Upload new document to company repository"
        >
          <UploadIcon />
          <span>Upload Document</span>
        </FloatingActionButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features including comprehensive ARIA labels and keyboard support.',
      },
    },
  },
};

// Testing Example
export const TestingInteraction: Story = {
  args: {
    variant: 'extended',
    'aria-label': 'Test FAB',
    children: (
      <>
        <PlusIcon />
        <span>Test</span>
      </>
    ),
    position: 'absolute',
    className: 'bottom-4 right-4',
  },
  parameters: {
    layout: 'centered',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fab = canvas.getByLabelText('Test FAB');

    // Test FAB is present and accessible
    await expect(fab).toBeInTheDocument();
    await expect(fab).toBeEnabled();

    // Test click interaction
    await userEvent.click(fab);

    // Test keyboard interaction
    fab.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard('{Space}');
  },
};

// Performance Example
export const PerformanceExample: Story = {
  render: () => {
    const fabs = Array.from({ length: 8 }, (_, i) => {
      const positions = [
        'bottom-4 right-4',
        'bottom-4 left-4',
        'top-4 right-4',
        'top-4 left-4',
        'bottom-4 right-24',
        'bottom-4 left-24',
        'top-4 right-24',
        'top-4 left-24',
      ];

      return (
        <FloatingActionButton
          key={i}
          size="small"
          color={i % 2 === 0 ? 'primary' : 'secondary'}
          position="absolute"
          className={positions[i]}
          aria-label={`Performance test FAB ${i + 1}`}
        >
          <PlusIcon />
        </FloatingActionButton>
      );
    });

    return (
      <div className="relative bg-gray-50 rounded-lg h-96 p-4">
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold">Performance Test - 8 FABs</h3>
          <p className="text-sm text-gray-600 mt-2">
            Multiple FABs demonstrating efficient rendering
          </p>
        </div>
        {fabs}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance example with multiple FAB instances to test rendering efficiency.',
      },
    },
  },
};

// Advanced B2B Integration Scenarios
export const MultiTenantInterface: Story = {
  render: () => {
    const [selectedTenant, setSelectedTenant] = React.useState('tenant-1');
    const [notifications, setNotifications] = React.useState(3);
    
    const tenants = {
      'tenant-1': { name: 'Acme Corp', color: 'primary' },
      'tenant-2': { name: 'TechStart Inc', color: 'secondary' },
      'tenant-3': { name: 'Enterprise Ltd', color: 'enterprise' }
    };

    return (
      <div className="space-y-6 max-w-6xl">
        <h3 className="text-2xl font-bold text-gray-900">Multi-Tenant B2B Platform</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Object.entries(tenants).map(([tenantId, tenant]) => (
            <div key={tenantId} className="relative bg-white border rounded-lg h-96 p-4 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">{tenant.name}</h4>
                <select 
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                  value={selectedTenant === tenantId ? tenantId : ''}
                  onChange={(e) => setSelectedTenant(e.target.value)}
                >
                  <option value="">Switch Tenant</option>
                  {Object.entries(tenants).map(([id, t]) => (
                    <option key={id} value={id}>{t.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Mock dashboard content */}
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Users</span>
                    <span className="font-medium">{Math.floor(Math.random() * 1000) + 100}</span>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Monthly Revenue</span>
                    <span className="font-medium">${(Math.random() * 100000 + 50000).toLocaleString()}</span>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Support Tickets</span>
                    <span className="font-medium">{Math.floor(Math.random() * 20) + 5}</span>
                  </div>
                </div>
              </div>
              
              {/* Tenant-specific FAB */}
              <FloatingActionButton
                color={tenant.color as any}
                position="absolute"
                className="bottom-4 right-4"
                aria-label={`Add new item for ${tenant.name}`}
              >
                <PlusIcon />
              </FloatingActionButton>
              
              {/* Notification FAB for active tenant */}
              {selectedTenant === tenantId && notifications > 0 && (
                <FloatingActionButton
                  color="secondary"
                  size="small"
                  position="absolute"
                  className="bottom-4 right-20"
                  aria-label={`View ${notifications} notifications for ${tenant.name}`}
                >
                  <div className="relative">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z" clipRule="evenodd" />
                    </svg>
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {notifications}
                    </span>
                  </div>
                </FloatingActionButton>
              )}
            </div>
          ))}
        </div>
        
        {/* Global actions */}
        <div className="relative bg-gray-900 text-white rounded-lg h-32 p-4">
          <h4 className="font-semibold mb-2">System Administration</h4>
          <p className="text-sm text-gray-300">Global settings and tenant management</p>
          
          <FloatingActionButton
            variant="extended"
            color="enterprise"
            position="absolute"
            className="bottom-4 right-4"
            aria-label="Add new tenant to platform"
          >
            <PlusIcon />
            <span>New Tenant</span>
          </FloatingActionButton>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-tenant B2B platform interface with tenant-specific FABs, notifications, and global administration actions.',
      },
    },
  },
};

export const AdvancedWorkflowFABs: Story = {
  render: () => {
    const [workflowStage, setWorkflowStage] = React.useState('review');
    const [fabsVisible, setFabsVisible] = React.useState(true);
    
    const stageConfig = {
      draft: { 
        title: 'Document Draft', 
        fabs: [{ icon: 'save', label: 'Save Draft', color: 'secondary' }] 
      },
      review: { 
        title: 'Under Review', 
        fabs: [
          { icon: 'approve', label: 'Approve', color: 'primary' },
          { icon: 'comment', label: 'Add Comment', color: 'secondary' },
          { icon: 'reject', label: 'Request Changes', color: 'enterprise' }
        ]
      },
      approved: { 
        title: 'Approved', 
        fabs: [{ icon: 'publish', label: 'Publish', color: 'primary' }] 
      }
    };

    return (
      <div className="space-y-6 max-w-4xl">
        <h3 className="text-2xl font-bold text-gray-900">Advanced Workflow FAB System</h3>
        
        <div className="flex gap-4 mb-6">
          <label className="flex items-center gap-2">
            <span className="text-sm font-medium">Workflow Stage:</span>
            <select 
              value={workflowStage} 
              onChange={(e) => setWorkflowStage(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="draft">Draft</option>
              <option value="review">Review</option>
              <option value="approved">Approved</option>
            </select>
          </label>
          
          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={fabsVisible} 
              onChange={(e) => setFabsVisible(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-medium">Show FABs</span>
          </label>
        </div>
        
        <div className="relative bg-white border rounded-lg h-96 p-6 overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">
                {stageConfig[workflowStage as keyof typeof stageConfig].title}
              </h4>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  workflowStage === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                  workflowStage === 'review' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {workflowStage.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="prose text-gray-600">
              <p>Marketing Campaign Proposal Q2 2024</p>
              <p className="text-sm">
                This document outlines the strategic marketing initiatives for the second quarter, 
                including budget allocation, target demographics, and expected ROI metrics.
              </p>
              
              {workflowStage === 'review' && (
                <div className="mt-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                  <p className="text-sm font-medium text-blue-800">Review Required</p>
                  <p className="text-sm text-blue-600 mt-1">
                    This document is awaiting approval from the marketing director and budget committee.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Stage-specific FABs */}
          {fabsVisible && stageConfig[workflowStage as keyof typeof stageConfig].fabs.map((fab, index) => {
            const positions = [
              'bottom-6 right-6',
              'bottom-6 right-24',
              'bottom-24 right-6'
            ];
            
            return (
              <FloatingActionButton
                key={fab.label}
                variant="extended"
                color={fab.color as any}
                position="absolute"
                className={positions[index] || 'bottom-6 right-6'}
                aria-label={fab.label}
                onClick={() => {
                  alert(`${fab.label} action triggered for ${workflowStage} stage`);
                }}
              >
                {fab.icon === 'save' && (
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-1v2a1 1 0 01-1.447.894L10 16.618l-2.553 1.276A1 1 0 016 17v-2H5a2 2 0 01-2-2V5zm5 1a1 1 0 011 1v1h1a1 1 0 110 2H9v1a1 1 0 11-2 0V9H6a1 1 0 110-2h1V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                )}
                {fab.icon === 'approve' && (
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                )}
                {fab.icon === 'comment' && (
                  <ChatIcon />
                )}
                {fab.icon === 'reject' && (
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                )}
                {fab.icon === 'publish' && (
                  <UploadIcon />
                )}
                <span>{fab.label}</span>
              </FloatingActionButton>
            );
          })}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Advanced workflow system with context-aware FABs that change based on document stage and user permissions.',
      },
    },
  },
};

// Real-world Context Example
export const RealWorldContext: Story = {
  render: () => (
    <div className="space-y-4 max-w-4xl">
      <h3 className="text-2xl font-bold text-gray-900">FAB in Business Context</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative bg-white border rounded-lg h-80 p-4">
          <h4 className="font-semibold mb-4">CRM Dashboard</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-sm">Active Leads</span>
              <span className="font-medium">247</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-sm">Opportunities</span>
              <span className="font-medium">89</span>
            </div>
          </div>
          
          <FloatingActionButton
            position="absolute"
            className="bottom-4 right-4"
            aria-label="Add new lead"
          >
            <PlusIcon />
          </FloatingActionButton>
        </div>
        
        <div className="relative bg-white border rounded-lg h-80 p-4">
          <h4 className="font-semibold mb-4">Project Management</h4>
          <div className="space-y-2">
            <div className="p-3 bg-blue-50 rounded text-sm">
              <strong>Sprint Planning</strong>
              <p className="text-gray-600">Due: Tomorrow</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded text-sm">
              <strong>Code Review</strong>
              <p className="text-gray-600">Due: Today</p>
            </div>
          </div>
          
          <FloatingActionButton
            variant="extended"
            color="enterprise"
            position="absolute"
            className="bottom-4 right-4"
            aria-label="Create new project"
          >
            <PlusIcon />
            <span>New Project</span>
          </FloatingActionButton>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world business application contexts showing appropriate FAB usage.',
      },
    },
  },
};