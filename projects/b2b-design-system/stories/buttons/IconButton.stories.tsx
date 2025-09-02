import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '../../src/components/buttons/IconButton';
import { userEvent, within, expect } from '@storybook/test';

// Mock icons for demonstration
const SearchIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
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

const SettingsIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.205 1.251l-1.18 2.044a1 1 0 01-1.186.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.205-1.251l1.18-2.044a1 1 0 011.186-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" clipRule="evenodd" />
  </svg>
);

const meta = {
  title: 'Buttons/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# IconButton Component

A square icon-only button component designed for enterprise B2B applications with:

- **Required accessibility labels** for screen readers (aria-label)
- **Square aspect ratio** for professional appearance
- **Multiple variants** including enterprise-focused styles
- **Tooltip integration support** via aria-describedby
- **Perfect icon alignment** with optimized centering

## B2B Use Cases

- **Toolbars**: Edit, delete, settings actions
- **Data tables**: Row actions and controls
- **Navigation**: Menu toggles and breadcrumb actions
- **Forms**: Field actions like clear, visibility toggle

## Best Practices

- Always provide meaningful aria-label text
- Use consistent icon sizes within interface sections
- Group related icon buttons with proper spacing
- Consider tooltips for complex actions
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'outline', 'ghost', 'enterprise'],
      description: 'Visual variant of the icon button',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the icon button (maintains square aspect ratio)',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Shows loading spinner and disables interaction',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the icon button',
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Required accessible label for screen readers',
    },
  },
  args: {
    'aria-label': 'Search',
    variant: 'default',
    size: 'medium',
    loading: false,
    disabled: false,
    children: <SearchIcon />,
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Variants
export const Default: Story = {
  args: {
    'aria-label': 'Search',
    children: <SearchIcon />,
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    'aria-label': 'Add new item',
    children: <PlusIcon />,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    'aria-label': 'Edit item',
    children: <EditIcon />,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    'aria-label': 'Settings',
    children: <SettingsIcon />,
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    'aria-label': 'Menu',
    children: <MenuIcon />,
  },
};

export const Enterprise: Story = {
  args: {
    variant: 'enterprise',
    'aria-label': 'Admin settings',
    children: <SettingsIcon />,
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
      <IconButton size="small" aria-label="Small search">
        <SearchIcon />
      </IconButton>
      <IconButton size="medium" aria-label="Medium search">
        <SearchIcon />
      </IconButton>
      <IconButton size="large" aria-label="Large search">
        <SearchIcon />
      </IconButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available sizes maintaining perfect square aspect ratios and proper touch targets.',
      },
    },
  },
};

// States
export const Loading: Story = {
  args: {
    loading: true,
    'aria-label': 'Loading search',
    children: <SearchIcon />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state with accessible spinner. The icon is hidden while loading.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Search (disabled)',
    children: <SearchIcon />,
  },
};

// B2B Use Cases
export const ToolbarActions: Story = {
  render: () => (
    <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900">Document Toolbar</h3>
      <div className="flex items-center gap-2 p-2 bg-white rounded border">
        <IconButton variant="ghost" aria-label="Search documents">
          <SearchIcon />
        </IconButton>
        <div className="w-px h-6 bg-gray-300" />
        <IconButton variant="ghost" aria-label="Edit document">
          <EditIcon />
        </IconButton>
        <IconButton variant="ghost" aria-label="Document settings">
          <SettingsIcon />
        </IconButton>
        <div className="w-px h-6 bg-gray-300" />
        <IconButton variant="outline" aria-label="Delete document">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Professional toolbar with icon buttons for document management, including visual separators.',
      },
    },
  },
};

export const DataTableActions: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Data Table Row Actions</h3>
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Role</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-3 text-sm text-gray-900">John Doe</td>
              <td className="px-4 py-3 text-sm text-gray-600">Administrator</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <IconButton size="small" variant="ghost" aria-label="Edit user">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" variant="ghost" aria-label="User settings">
                    <SettingsIcon />
                  </IconButton>
                  <IconButton size="small" variant="ghost" aria-label="Delete user">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm text-gray-900">Jane Smith</td>
              <td className="px-4 py-3 text-sm text-gray-600">Editor</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <IconButton size="small" variant="ghost" aria-label="Edit user">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" variant="ghost" aria-label="User settings">
                    <SettingsIcon />
                  </IconButton>
                  <IconButton size="small" variant="ghost" aria-label="Delete user">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon buttons in data table context with consistent sizing and spacing for row actions.',
      },
    },
  },
};

export const EnterpriseAdminPanel: Story = {
  render: () => (
    <div className="space-y-4 p-6 bg-slate-900 text-white rounded-lg">
      <h3 className="text-lg font-semibold">System Administration</h3>
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <IconButton variant="enterprise" size="large" aria-label="User management">
            <SearchIcon />
          </IconButton>
          <p className="text-sm mt-2">Users</p>
        </div>
        <div className="text-center">
          <IconButton variant="enterprise" size="large" aria-label="System settings">
            <SettingsIcon />
          </IconButton>
          <p className="text-sm mt-2">Settings</p>
        </div>
        <div className="text-center">
          <IconButton variant="enterprise" size="large" aria-label="Add new resource">
            <PlusIcon />
          </IconButton>
          <p className="text-sm mt-2">Add</p>
        </div>
        <div className="text-center">
          <IconButton variant="enterprise" size="large" aria-label="System menu">
            <MenuIcon />
          </IconButton>
          <p className="text-sm mt-2">Menu</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Enterprise admin interface with professional icon buttons and contextual labels.',
      },
    },
  },
};

// Interactive Examples
export const WithTooltips: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Tooltip Integration</h3>
      <p className="text-sm text-gray-600">
        IconButtons support tooltips via aria-describedby attribute
      </p>
      <div className="flex gap-3">
        <IconButton 
          variant="primary" 
          aria-label="Search documents"
          aria-describedby="search-tooltip"
          title="Search through all documents"
        >
          <SearchIcon />
        </IconButton>
        <IconButton 
          variant="secondary" 
          aria-label="Edit selected item"
          title="Edit the currently selected item"
        >
          <EditIcon />
        </IconButton>
        <IconButton 
          variant="outline" 
          aria-label="Delete selected item"
          title="Permanently delete the selected item"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'IconButtons with tooltip integration for enhanced user experience and accessibility.',
      },
    },
  },
};

// Accessibility Examples
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Keyboard Navigation</h3>
        <p className="text-sm text-gray-600 mb-4">
          Use Tab to navigate, Enter or Space to activate
        </p>
        <div className="flex gap-2">
          <IconButton variant="primary" aria-label="First action">
            <PlusIcon />
          </IconButton>
          <IconButton variant="secondary" aria-label="Second action">
            <EditIcon />
          </IconButton>
          <IconButton variant="outline" aria-label="Third action">
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Screen Reader Support</h3>
        <p className="text-sm text-gray-600 mb-4">
          All icon buttons have required aria-label attributes
        </p>
        <div className="flex gap-2">
          <IconButton variant="ghost" aria-label="Search through documents and files">
            <SearchIcon />
          </IconButton>
          <IconButton variant="ghost" aria-label="Edit the current document">
            <EditIcon />
          </IconButton>
          <IconButton variant="ghost" aria-label="Open document settings panel">
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features including proper ARIA labels and keyboard navigation support.',
      },
    },
  },
};

// Testing Example
export const TestingInteraction: Story = {
  args: {
    variant: 'primary',
    'aria-label': 'Test button',
    children: <PlusIcon />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByLabelText('Test button');

    // Test button is present and accessible
    await expect(button).toBeInTheDocument();
    await expect(button).toBeEnabled();

    // Test click interaction
    await userEvent.click(button);

    // Test keyboard interaction
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');
  },
  parameters: {
    docs: {
      description: {
        story: 'Automated testing example showing interaction testing with proper accessibility queries.',
      },
    },
  },
};

// Advanced B2B Use Cases
export const WorkflowActions: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-white border rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900">Approval Workflow</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Budget Request #BR-2024-003</h4>
            <p className="text-sm text-gray-600">Marketing Team - Q1 Campaign Budget</p>
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full mt-2">
              Pending Approval
            </span>
          </div>
          <div className="flex gap-2">
            <IconButton variant="outline" size="small" aria-label="Approve budget request">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-600">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
            </IconButton>
            <IconButton variant="outline" size="small" aria-label="Reject budget request">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-600">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </IconButton>
            <IconButton variant="ghost" size="small" aria-label="Add comments to budget request">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.334a.75.75 0 001.28.53l3.58-3.579a78.3 78.3 0 001.14-.048c2.236 0 4.43-.18 6.57-.524C19.007 13.289 20 12.03 20 10.574V5.426c0-1.413-.993-2.67-2.43-2.902A78.3 78.3 0 0010 2z" clipRule="evenodd" />
              </svg>
            </IconButton>
            <IconButton variant="ghost" size="small" aria-label="View budget request details">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </IconButton>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Contract Amendment #CA-2024-012</h4>
            <p className="text-sm text-gray-600">Legal Department - Service Agreement Update</p>
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mt-2">
              Under Review
            </span>
          </div>
          <div className="flex gap-2">
            <IconButton variant="outline" size="small" aria-label="Approve contract amendment" disabled>
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-600">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
            </IconButton>
            <IconButton variant="outline" size="small" aria-label="Reject contract amendment" disabled>
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-600">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </IconButton>
            <IconButton variant="primary" size="small" loading aria-label="Processing contract review">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.334a.75.75 0 001.28.53l3.58-3.579a78.3 78.3 0 001.14-.048c2.236 0 4.43-.18 6.57-.524C19.007 13.289 20 12.03 20 10.574V5.426c0-1.413-.993-2.67-2.43-2.902A78.3 78.3 0 0010 2z" clipRule="evenodd" />
              </svg>
            </IconButton>
            <IconButton variant="ghost" size="small" aria-label="View contract amendment details">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Advanced workflow management with approval actions, status indicators, and contextual IconButton usage.',
      },
    },
  },
};

export const ProjectManagementToolbar: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-white border rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900">Project Management Interface</h3>
      
      <div className="space-y-4">
        {/* Main toolbar */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <h4 className="font-medium text-gray-900">Q1 Product Launch</h4>
            <div className="flex items-center gap-1">
              <IconButton variant="ghost" size="small" aria-label="Project settings">
                <SettingsIcon />
              </IconButton>
              <IconButton variant="ghost" size="small" aria-label="Share project">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.367A2.52 2.52 0 0113 4.5z" />
                </svg>
              </IconButton>
              <IconButton variant="ghost" size="small" aria-label="Project notifications">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z" clipRule="evenodd" />
                </svg>
              </IconButton>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <IconButton variant="outline" size="small" aria-label="Export project data">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v5.59l1.95-2.1a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0L6.2 7.27a.75.75 0 111.1-1.02l1.95 2.1V2.75A.75.75 0 0110 2z" clipRule="evenodd" />
                <path d="M5.273 4.5a1.25 1.25 0 00-1.205.918l-1.523 5.52c-.006.02-.01.041-.015.062H6a1 1 0 01.894.553l.448.894a1 1 0 00.894.553h3.438a1 1 0 00.86-.49l.606-1.02A1 1 0 0114 11h3.47a1.318 1.318 0 00-.015-.062l-1.523-5.52a1.25 1.25 0 00-1.205-.918h-.977a.75.75 0 010-1.5h.977a2.75 2.75 0 012.651 2.019l1.523 5.52c.066.239.099.485.099.732V15a2 2 0 01-2 2H3a2 2 0 01-2-2v-3.73c0-.246.033-.492.099-.732l1.523-5.52A2.75 2.75 0 015.273 3h.977a.75.75 0 010 1.5h-.977z" />
              </svg>
            </IconButton>
            <IconButton variant="primary" size="small" aria-label="Add new task">
              <PlusIcon />
            </IconButton>
            <IconButton variant="secondary" size="small" aria-label="Project menu">
              <MenuIcon />
            </IconButton>
          </div>
        </div>
        
        {/* Task list with individual actions */}
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
            <div className="flex items-center gap-3">
              <IconButton variant="ghost" size="small" aria-label="Mark task complete">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" className="w-4 h-4">
                  <circle cx="10" cy="10" r="7" strokeWidth="2" />
                </svg>
              </IconButton>
              <div>
                <p className="font-medium text-gray-900">Design system component audit</p>
                <p className="text-sm text-gray-600">Due: Tomorrow</p>
              </div>
            </div>
            <div className="flex gap-1">
              <IconButton variant="ghost" size="small" aria-label="Assign task">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                </svg>
              </IconButton>
              <IconButton variant="ghost" size="small" aria-label="Set task priority">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                </svg>
              </IconButton>
              <IconButton variant="ghost" size="small" aria-label="More task options">
                <MenuIcon />
              </IconButton>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
            <div className="flex items-center gap-3">
              <IconButton variant="ghost" size="small" aria-label="Mark task complete">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-600">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L7.53 10.53a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
              </IconButton>
              <div>
                <p className="font-medium text-gray-900 line-through">Set up development environment</p>
                <p className="text-sm text-gray-600">Completed yesterday</p>
              </div>
            </div>
            <div className="flex gap-1">
              <IconButton variant="ghost" size="small" aria-label="View task details">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </IconButton>
              <IconButton variant="ghost" size="small" aria-label="Archive completed task">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M2 3a1 1 0 00-1 1v1a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1H2z" />
                  <path fillRule="evenodd" d="M2 7.5h16l-.811 7.71a2 2 0 01-1.99 1.79H4.802a2 2 0 01-1.99-1.79L2 7.5zM7 10a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive project management interface with contextual IconButtons for task management, project actions, and workflow controls.',
      },
    },
  },
};

// All Variants Showcase
export const AllVariantsShowcase: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">All IconButton Variants</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Default Variants</h4>
          <div className="flex flex-wrap gap-3">
            <IconButton variant="default" aria-label="Default search">
              <SearchIcon />
            </IconButton>
            <IconButton variant="primary" aria-label="Primary add">
              <PlusIcon />
            </IconButton>
            <IconButton variant="secondary" aria-label="Secondary edit">
              <EditIcon />
            </IconButton>
            <IconButton variant="outline" aria-label="Outline settings">
              <SettingsIcon />
            </IconButton>
            <IconButton variant="ghost" aria-label="Ghost menu">
              <MenuIcon />
            </IconButton>
            <IconButton variant="enterprise" aria-label="Enterprise delete">
              <DeleteIcon />
            </IconButton>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Loading States</h4>
          <div className="flex flex-wrap gap-3">
            <IconButton variant="primary" loading aria-label="Loading add">
              <PlusIcon />
            </IconButton>
            <IconButton variant="secondary" loading aria-label="Loading edit">
              <EditIcon />
            </IconButton>
            <IconButton variant="outline" loading aria-label="Loading delete">
              <DeleteIcon />
            </IconButton>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Disabled States</h4>
          <div className="flex flex-wrap gap-3">
            <IconButton variant="primary" disabled aria-label="Disabled add">
              <PlusIcon />
            </IconButton>
            <IconButton variant="secondary" disabled aria-label="Disabled edit">
              <EditIcon />
            </IconButton>
            <IconButton variant="outline" disabled aria-label="Disabled delete">
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive showcase of all IconButton variants, states, and configurations.',
      },
    },
  },
};