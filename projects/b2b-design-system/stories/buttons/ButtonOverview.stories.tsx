import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../src/components/buttons/Button';
import { IconButton } from '../../src/components/buttons/IconButton';
import { ButtonGroup } from '../../src/components/buttons/ButtonGroup';
import { FloatingActionButton } from '../../src/components/buttons/FloatingActionButton';

// Mock icons for demonstrations
const PlusIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
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

const meta = {
  title: 'Buttons/Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# B2B Design System Button Components

Comprehensive overview of all button components in the B2B Design System, showcasing their capabilities and integration patterns for enterprise applications.

## Component Family

- **Button**: Primary text-based actions with comprehensive variants
- **IconButton**: Icon-only actions for compact interfaces  
- **ButtonGroup**: Grouped related actions with unified styling
- **FloatingActionButton**: Prominent floating actions for primary workflows

## Enterprise Focus

All button components are designed specifically for B2B applications with:
- WCAG 2.1 AA accessibility compliance
- Professional enterprise styling
- High-contrast mode support
- Keyboard navigation
- Loading and disabled states
- TypeScript strict mode support

## Usage Patterns

This overview demonstrates real-world B2B integration patterns, showing how components work together to create cohesive enterprise interfaces.
        `,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Component Family Overview
export const ComponentFamily: Story = {
  render: () => (
    <div className="space-y-12 p-8 bg-gray-50 min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">B2B Button Component Family</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Enterprise-grade button components designed for professional B2B applications with 
          accessibility, consistency, and user experience at the forefront.
        </p>
      </div>

      {/* Button Component */}
      <section className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Button Component</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="enterprise">Enterprise</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Sizes</h3>
            <div className="flex items-center gap-4">
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">States</h3>
            <div className="flex items-center gap-4">
              <Button>Normal</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </div>
      </section>

      {/* IconButton Component */}
      <section className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">IconButton Component</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Variants</h3>
            <div className="flex items-center gap-3">
              <IconButton variant="default" aria-label="Default icon">
                <PlusIcon />
              </IconButton>
              <IconButton variant="primary" aria-label="Primary icon">
                <PlusIcon />
              </IconButton>
              <IconButton variant="secondary" aria-label="Secondary icon">
                <EditIcon />
              </IconButton>
              <IconButton variant="outline" aria-label="Outline icon">
                <SettingsIcon />
              </IconButton>
              <IconButton variant="ghost" aria-label="Ghost icon">
                <DeleteIcon />
              </IconButton>
              <IconButton variant="enterprise" aria-label="Enterprise icon">
                <SettingsIcon />
              </IconButton>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Sizes</h3>
            <div className="flex items-center gap-3">
              <IconButton size="small" aria-label="Small icon">
                <PlusIcon />
              </IconButton>
              <IconButton size="medium" aria-label="Medium icon">
                <PlusIcon />
              </IconButton>
              <IconButton size="large" aria-label="Large icon">
                <PlusIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </section>

      {/* ButtonGroup Component */}
      <section className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">ButtonGroup Component</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Horizontal Groups</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-2">Separated</p>
                <ButtonGroup>
                  <Button>First</Button>
                  <Button>Second</Button>
                  <Button>Third</Button>
                </ButtonGroup>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Attached Primary</p>
                <ButtonGroup attached variant="primary">
                  <Button>Save</Button>
                  <Button>Publish</Button>
                  <Button>Archive</Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Icon Button Groups</h3>
            <ButtonGroup attached variant="outline">
              <IconButton aria-label="Add item">
                <PlusIcon />
              </IconButton>
              <IconButton aria-label="Edit item">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="Settings">
                <SettingsIcon />
              </IconButton>
              <IconButton aria-label="Delete item">
                <DeleteIcon />
              </IconButton>
            </ButtonGroup>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Vertical Groups</h3>
            <ButtonGroup orientation="vertical" attached variant="secondary">
              <Button>Top</Button>
              <Button>Middle</Button>
              <Button>Bottom</Button>
            </ButtonGroup>
          </div>
        </div>
      </section>

      {/* FloatingActionButton Component */}
      <section className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">FloatingActionButton Component</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Variants & Colors</h3>
            <div className="relative h-32 bg-gray-50 rounded-lg p-4">
              <FloatingActionButton 
                color="primary" 
                position="absolute" 
                className="top-4 left-4"
                aria-label="Primary FAB"
              >
                <PlusIcon />
              </FloatingActionButton>
              
              <FloatingActionButton 
                color="secondary" 
                position="absolute" 
                className="top-4 left-20"
                aria-label="Secondary FAB"
              >
                <EditIcon />
              </FloatingActionButton>
              
              <FloatingActionButton 
                color="enterprise" 
                position="absolute" 
                className="top-4 left-36"
                aria-label="Enterprise FAB"
              >
                <SettingsIcon />
              </FloatingActionButton>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Extended Variant</h3>
            <div className="relative h-24 bg-gray-50 rounded-lg p-4">
              <FloatingActionButton 
                variant="extended"
                color="primary"
                position="absolute" 
                className="top-4 left-4"
                aria-label="Create new item"
              >
                <PlusIcon />
                <span>Create New</span>
              </FloatingActionButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive overview showcasing all button components and their key features.',
      },
    },
  },
};

// Enterprise Dashboard Integration
export const EnterpriseDashboard: Story = {
  render: () => (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Enterprise Dashboard</h1>
          <div className="flex items-center gap-4">
            <ButtonGroup size="small">
              <Button variant="outline">Export</Button>
              <Button variant="secondary">Settings</Button>
            </ButtonGroup>
            <Button variant="primary">New Report</Button>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: 'Total Revenue', value: '$2.4M', change: '+12%', color: 'green' },
            { title: 'Active Users', value: '12.4K', change: '+8%', color: 'blue' },
            { title: 'Conversion Rate', value: '3.2%', change: '-2%', color: 'red' },
            { title: 'Support Tickets', value: '156', change: '+5%', color: 'yellow' },
          ].map((kpi, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">{kpi.title}</h3>
                <IconButton variant="ghost" size="small" aria-label={`${kpi.title} options`}>
                  <SettingsIcon />
                </IconButton>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-gray-900">{kpi.value}</span>
                <span className={`text-sm font-medium ${
                  kpi.color === 'green' ? 'text-green-600' : 
                  kpi.color === 'red' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {kpi.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
              <div className="flex items-center gap-3">
                <ButtonGroup attached size="small">
                  <Button variant="primary">All</Button>
                  <Button variant="outline">Pending</Button>
                  <Button variant="outline">Completed</Button>
                </ButtonGroup>
                
                <ButtonGroup size="small">
                  <IconButton variant="outline" aria-label="Filter transactions">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.739z" clipRule="evenodd" />
                    </svg>
                  </IconButton>
                  <IconButton variant="outline" aria-label="Sort transactions">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                    </svg>
                  </IconButton>
                </ButtonGroup>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { id: 'TXN-001', customer: 'Acme Corp', amount: '$5,400', status: 'completed' },
                  { id: 'TXN-002', customer: 'TechStart Inc', amount: '$2,100', status: 'pending' },
                  { id: 'TXN-003', customer: 'Global Solutions', amount: '$8,900', status: 'completed' },
                ].map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {transaction.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        transaction.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ButtonGroup size="small">
                        <IconButton variant="ghost" aria-label="View transaction">
                          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        </IconButton>
                        <IconButton variant="ghost" aria-label="Edit transaction">
                          <EditIcon />
                        </IconButton>
                        <IconButton variant="ghost" aria-label="More options">
                          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                          </svg>
                        </IconButton>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Floating Actions */}
        <div className="relative">
          <FloatingActionButton 
            position="fixed"
            className="bottom-6 right-6"
            aria-label="Create new transaction"
          >
            <PlusIcon />
          </FloatingActionButton>
          
          <FloatingActionButton 
            variant="extended"
            color="secondary"
            position="fixed"
            className="bottom-6 right-24"
            aria-label="Generate report"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zm4.03 6.28a.75.75 0 00-1.06-1.06L6 8.44l-.72-.72a.75.75 0 10-1.06 1.06L5.44 10l1.22 1.22a.75.75 0 001.06 0L10 8.94l2.28 2.28a.75.75 0 001.06-1.06L11.06 8l2.28-2.28a.75.75 0 00-1.06-1.06L10 6.94 8.28 8.22z" clipRule="evenodd" />
            </svg>
            <span>Export</span>
          </FloatingActionButton>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete enterprise dashboard integration showing all button components working together in a realistic B2B interface.',
      },
    },
  },
};

// Accessibility Showcase
export const AccessibilityShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Accessibility Features</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          All button components are built with WCAG 2.1 AA compliance, featuring proper ARIA attributes, 
          keyboard navigation, screen reader support, and high contrast mode compatibility.
        </p>
      </div>

      {/* Keyboard Navigation */}
      <section className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Keyboard Navigation</h2>
        <div className="space-y-4">
          <p className="text-gray-600">Use Tab to navigate between buttons, Enter or Space to activate.</p>
          
          <div className="space-y-3">
            <div>
              <h3 className="font-medium mb-2">Single Buttons</h3>
              <div className="flex gap-3">
                <Button variant="primary">First Button</Button>
                <Button variant="secondary">Second Button</Button>
                <Button variant="outline">Third Button</Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Button Groups (Arrow Key Navigation)</h3>
              <ButtonGroup>
                <Button>Group Button 1</Button>
                <Button>Group Button 2</Button>
                <Button>Group Button 3</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </section>

      {/* Screen Reader Support */}
      <section className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Screen Reader Support</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            All buttons include proper ARIA attributes and meaningful labels for assistive technologies.
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Icon Buttons with aria-label</h3>
              <div className="flex gap-2">
                <IconButton variant="primary" aria-label="Create new document">
                  <PlusIcon />
                </IconButton>
                <IconButton variant="secondary" aria-label="Edit existing document">
                  <EditIcon />
                </IconButton>
                <IconButton variant="outline" aria-label="Open document settings">
                  <SettingsIcon />
                </IconButton>
                <IconButton variant="ghost" aria-label="Delete document permanently">
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Loading States with aria-busy</h3>
              <div className="flex gap-3">
                <Button loading>Processing Order</Button>
                <IconButton loading variant="primary" aria-label="Saving document">
                  <PlusIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High Contrast Mode */}
      <section className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">High Contrast Mode</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            All buttons automatically adapt to system high contrast preferences with enhanced borders.
          </p>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-900 text-white rounded-lg">
              <h3 className="font-medium mb-3 text-white">Dark Background Testing</h3>
              <div className="flex gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="enterprise">Enterprise</Button>
              </div>
            </div>
            
            <div className="p-4 border-2 border-gray-900 rounded-lg">
              <h3 className="font-medium mb-3">High Contrast Simulation</h3>
              <div className="flex gap-3">
                <IconButton variant="primary" aria-label="Primary action">
                  <PlusIcon />
                </IconButton>
                <IconButton variant="secondary" aria-label="Secondary action">
                  <EditIcon />
                </IconButton>
                <IconButton variant="outline" aria-label="Outline action">
                  <SettingsIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Indicators */}
      <section className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Focus Indicators</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            Prominent focus rings ensure keyboard users can easily identify focused elements.
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Standard Focus Rings</h3>
              <div className="flex gap-3">
                <Button variant="primary" className="focus:ring-4">Focus Me</Button>
                <Button variant="secondary" className="focus:ring-4">Tab Here</Button>
                <Button variant="outline" className="focus:ring-4">And Here</Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Button Groups Focus Management</h3>
              <ButtonGroup>
                <Button className="focus:ring-4">First</Button>
                <Button className="focus:ring-4">Second</Button>
                <Button className="focus:ring-4">Third</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive demonstration of accessibility features across all button components.',
      },
    },
  },
};

// Performance & Best Practices
export const PerformanceBestPractices: Story = {
  render: () => (
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Performance & Best Practices</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Demonstrating optimal usage patterns, performance considerations, and B2B best practices 
          for button components in enterprise applications.
        </p>
      </div>

      {/* Performance Example */}
      <section className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Performance Optimization</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            Efficient rendering of multiple button instances with proper memoization and event handling.
          </p>
          
          <div className="grid grid-cols-10 gap-2 max-h-40 overflow-auto">
            {Array.from({ length: 50 }, (_, i) => (
              <Button 
                key={i} 
                size="small" 
                variant={i % 2 === 0 ? 'primary' : 'secondary'}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Design Patterns */}
      <section className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">B2B Design Patterns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Hierarchy Pattern */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Visual Hierarchy</h3>
            <div className="space-y-3">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Primary action only</p>
                <Button variant="primary">Complete Purchase</Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Primary + Secondary</p>
                <div className="flex gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button variant="primary">Save Changes</Button>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Full hierarchy</p>
                <div className="flex gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button variant="secondary">Save Draft</Button>
                  <Button variant="primary">Publish</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Guidelines */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Usage Guidelines</h3>
            <div className="space-y-3">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-800 mb-1">✓ Do</p>
                <p className="text-sm text-green-700">Use consistent sizing within sections</p>
                <div className="flex gap-2 mt-2">
                  <Button size="small" variant="outline">View</Button>
                  <Button size="small" variant="primary">Edit</Button>
                </div>
              </div>
              
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm font-medium text-red-800 mb-1">✗ Avoid</p>
                <p className="text-sm text-red-700">Mixing sizes inappropriately</p>
                <div className="flex gap-2 items-center mt-2">
                  <Button size="large" variant="outline">View</Button>
                  <Button size="small" variant="primary">Edit</Button>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800 mb-1">💡 Tip</p>
                <p className="text-sm text-blue-700">Use ButtonGroup for related actions</p>
                <ButtonGroup size="small" className="mt-2">
                  <Button variant="outline">View</Button>
                  <Button variant="primary">Edit</Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loading States Best Practices */}
      <section className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Loading States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Form Submission</h3>
            <div className="space-y-3 p-4 border rounded-lg">
              <input 
                type="text" 
                placeholder="Enter your name" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <div className="flex gap-2">
                <Button variant="outline">Cancel</Button>
                <Button loading variant="primary">Submitting...</Button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Async Actions</h3>
            <div className="space-y-3 p-4 border rounded-lg">
              <p className="text-sm text-gray-600">Processing document...</p>
              <div className="flex gap-2">
                <IconButton loading variant="primary" aria-label="Processing upload">
                  <PlusIcon />
                </IconButton>
                <Button loading variant="secondary">Generating Report</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Patterns */}
      <section className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Enterprise Patterns</h2>
        <div className="space-y-6">
          
          {/* Data Table Actions */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Data Table Integration</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Project Alpha</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <ButtonGroup size="small">
                        <IconButton variant="ghost" aria-label="View project">
                          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        </IconButton>
                        <IconButton variant="ghost" aria-label="Edit project">
                          <EditIcon />
                        </IconButton>
                        <IconButton variant="ghost" aria-label="Project settings">
                          <SettingsIcon />
                        </IconButton>
                      </ButtonGroup>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Workflow Actions */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Workflow Controls</h3>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium">Document Review Process</h4>
                  <p className="text-sm text-gray-600">3 of 5 steps completed</p>
                </div>
                <ButtonGroup size="small">
                  <Button variant="outline">Previous</Button>
                  <Button variant="primary">Continue</Button>
                </ButtonGroup>
              </div>
              
              <ButtonGroup attached size="small">
                <Button variant="secondary">Draft</Button>
                <Button variant="secondary">Review</Button>
                <Button variant="primary">Approve</Button>
                <Button variant="outline">Publish</Button>
                <Button variant="outline">Archive</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Performance optimization examples and B2B best practices for enterprise button usage.',
      },
    },
  },
};