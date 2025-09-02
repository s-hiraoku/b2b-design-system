import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../src/components/typography/Link';
import React from 'react';

const meta: Meta<typeof Link> = {
  title: 'Typography/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An enterprise navigation link component with WCAG 2.1 AA compliance, proper focus management, external link security, and professional B2B styling for accessible navigation.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'muted', 'enterprise'],
      description: 'Visual variant of the link component',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant for different text scales',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the link is disabled',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the link is in loading state',
    },
    external: {
      control: { type: 'boolean' },
      description: 'Whether this is an external link',
    },
    href: {
      control: { type: 'text' },
      description: 'URL destination',
    },
    children: {
      control: { type: 'text' },
      description: 'Link content',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Link>;

// Basic Examples
export const Default: Story = {
  args: {
    children: 'Default Link',
    href: '#',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Link',
    href: '#',
    variant: 'primary',
  },
};

export const External: Story = {
  args: {
    children: 'External Link',
    href: 'https://example.com',
    external: true,
  },
};

export const Enterprise: Story = {
  args: {
    children: 'Enterprise Dashboard',
    href: '#',
    variant: 'enterprise',
  },
};

// Variant Examples
export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different visual styles for various design contexts and hierarchies.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <Link href="#" variant="default">
          Default Variant
        </Link>
        <p className="text-sm text-gray-600 mt-1">Standard link styling for general navigation</p>
      </div>
      
      <div>
        <Link href="#" variant="primary">
          Primary Variant
        </Link>
        <p className="text-sm text-gray-600 mt-1">Emphasized links for primary actions</p>
      </div>
      
      <div>
        <Link href="#" variant="secondary">
          Secondary Variant
        </Link>
        <p className="text-sm text-gray-600 mt-1">Secondary navigation and supporting links</p>
      </div>
      
      <div>
        <Link href="#" variant="muted">
          Muted Variant
        </Link>
        <p className="text-sm text-gray-600 mt-1">Subtle links for metadata and footnotes</p>
      </div>
      
      <div>
        <Link href="#" variant="enterprise">
          Enterprise Variant
        </Link>
        <p className="text-sm text-gray-600 mt-1">Professional styling for B2B applications</p>
      </div>
    </div>
  ),
};

// Size Variants
export const SizeVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different size variants for various text scales and hierarchies.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <Link href="#" size="large" variant="primary">
          Large Link
        </Link>
        <p className="text-sm text-gray-600 mt-1">For prominent navigation and call-to-action links</p>
      </div>
      
      <div>
        <Link href="#" size="medium">
          Medium Link (Default)
        </Link>
        <p className="text-sm text-gray-600 mt-1">Standard size for most navigation contexts</p>
      </div>
      
      <div>
        <Link href="#" size="small">
          Small Link
        </Link>
        <p className="text-sm text-gray-600 mt-1">For compact layouts and secondary navigation</p>
      </div>
    </div>
  ),
};

// Interactive States
export const InteractiveStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different interactive states including disabled and loading states.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <Link href="#">
          Normal State Link
        </Link>
        <p className="text-sm text-gray-600 mt-1">Standard interactive link</p>
      </div>
      
      <div>
        <Link href="#" disabled>
          Disabled Link
        </Link>
        <p className="text-sm text-gray-600 mt-1">Non-interactive disabled state</p>
      </div>
      
      <div>
        <Link href="#" loading>
          Loading Link
        </Link>
        <p className="text-sm text-gray-600 mt-1">Loading state prevents interaction</p>
      </div>
      
      <div>
        <Link href="#" disabled loading>
          Disabled + Loading
        </Link>
        <p className="text-sm text-gray-600 mt-1">Combined disabled and loading states</p>
      </div>
    </div>
  ),
};

// External Links
export const ExternalLinks: Story = {
  parameters: {
    docs: {
      description: {
        story: 'External links with proper security attributes and visual indicators.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <Link href="https://example.com" external>
          Standard External Link
        </Link>
        <p className="text-sm text-gray-600 mt-1">Opens in new tab with security attributes</p>
      </div>
      
      <div>
        <Link href="https://docs.example.com" external variant="primary">
          Documentation
        </Link>
        <p className="text-sm text-gray-600 mt-1">External documentation link</p>
      </div>
      
      <div>
        <Link href="https://support.example.com" external variant="secondary">
          Support Center
        </Link>
        <p className="text-sm text-gray-600 mt-1">External support resource</p>
      </div>
      
      <div>
        <Link href="https://api.example.com" external variant="enterprise" size="small">
          API Reference
        </Link>
        <p className="text-sm text-gray-600 mt-1">Technical external resource</p>
      </div>
    </div>
  ),
};

// Navigation Examples
export const NavigationExamples: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Common navigation patterns and link hierarchies for web applications.',
      },
    },
  },
  render: () => (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary Navigation</h3>
        <nav className="flex space-x-6">
          <Link href="#" variant="primary">Dashboard</Link>
          <Link href="#" variant="default">Projects</Link>
          <Link href="#" variant="default">Team</Link>
          <Link href="#" variant="default">Settings</Link>
        </nav>
      </section>
      
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Breadcrumb Navigation</h3>
        <nav className="flex items-center space-x-2 text-sm">
          <Link href="#" variant="muted" size="small">Home</Link>
          <span className="text-gray-400">/</span>
          <Link href="#" variant="muted" size="small">Projects</Link>
          <span className="text-gray-400">/</span>
          <Link href="#" variant="secondary" size="small">Design System</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900">Typography</span>
        </nav>
      </section>
      
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Footer Links</h3>
        <footer className="grid grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Product</h4>
            <div className="space-y-1">
              <Link href="#" variant="muted" size="small">Features</Link>
              <Link href="#" variant="muted" size="small">Pricing</Link>
              <Link href="#" variant="muted" size="small">Documentation</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Company</h4>
            <div className="space-y-1">
              <Link href="#" variant="muted" size="small">About</Link>
              <Link href="#" variant="muted" size="small">Careers</Link>
              <Link href="#" variant="muted" size="small">Contact</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Legal</h4>
            <div className="space-y-1">
              <Link href="#" variant="muted" size="small">Privacy</Link>
              <Link href="#" variant="muted" size="small">Terms</Link>
              <Link href="#" variant="muted" size="small">Security</Link>
            </div>
          </div>
        </footer>
      </section>
    </div>
  ),
};

// Enterprise B2B Examples
export const EnterpriseExamples: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Enterprise-focused examples with business-specific navigation and styling.',
      },
    },
  },
  render: () => (
    <div className="space-y-8 p-6 bg-gray-50 rounded-lg">
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Dashboard Links</h3>
        <div className="p-4 bg-white rounded border">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Reports</h4>
              <div className="space-y-2">
                <Link href="#" variant="enterprise" size="medium">
                  Q4 Financial Report
                </Link>
                <Link href="#" variant="enterprise" size="medium">
                  Revenue Analytics
                </Link>
                <Link href="#" variant="enterprise" size="medium">
                  Expense Breakdown
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">External Resources</h4>
              <div className="space-y-2">
                <Link href="https://accounting.example.com" external variant="enterprise" size="medium">
                  Accounting System
                </Link>
                <Link href="https://crm.example.com" external variant="enterprise" size="medium">
                  CRM Platform
                </Link>
                <Link href="https://compliance.example.com" external variant="secondary" size="medium">
                  Compliance Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Administration</h3>
        <div className="p-4 bg-white rounded border">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">User Management</h4>
              <div className="flex flex-wrap gap-3">
                <Link href="#" variant="primary" size="small">Add User</Link>
                <Link href="#" variant="secondary" size="small">User Directory</Link>
                <Link href="#" variant="secondary" size="small">Permissions</Link>
                <Link href="#" variant="muted" size="small">Audit Log</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">System Settings</h4>
              <div className="flex flex-wrap gap-3">
                <Link href="#" variant="enterprise" size="small">Configuration</Link>
                <Link href="#" variant="enterprise" size="small">Security Policies</Link>
                <Link href="#" variant="secondary" size="small">Backup Settings</Link>
                <Link href="#" variant="muted" size="small">System Logs</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">External Integrations</h4>
              <div className="flex flex-wrap gap-3">
                <Link href="https://sso.example.com" external variant="enterprise" size="small">
                  SSO Provider
                </Link>
                <Link href="https://api.example.com" external variant="secondary" size="small">
                  API Gateway
                </Link>
                <Link href="https://monitoring.example.com" external variant="muted" size="small">
                  System Monitor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Management</h3>
        <div className="p-4 bg-white rounded border">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Link href="#" variant="primary" size="medium">
                Project Alpha - Q1 Initiative
              </Link>
              <div className="flex space-x-2">
                <Link href="#" variant="secondary" size="small">View</Link>
                <Link href="#" variant="muted" size="small">Edit</Link>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Link href="#" variant="enterprise" size="medium">
                Project Beta - Customer Portal
              </Link>
              <div className="flex space-x-2">
                <Link href="#" variant="secondary" size="small">View</Link>
                <Link href="#" variant="muted" size="small" disabled>Edit</Link>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Link href="#" variant="secondary" size="medium" loading>
                Project Gamma - Loading...
              </Link>
              <div className="flex space-x-2">
                <Link href="#" variant="muted" size="small" disabled>View</Link>
                <Link href="#" variant="muted" size="small" disabled>Edit</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  ),
};

// Content Links
export const ContentLinks: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Links within content and text for in-line navigation and references.',
      },
    },
  },
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <article className="prose">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Enterprise Security Guidelines</h3>
        
        <p className="text-gray-700 mb-4">
          All employees must follow our{' '}
          <Link href="#" variant="primary" size="medium">security policies</Link>{' '}
          when accessing corporate systems. For detailed information, please refer to the{' '}
          <Link href="https://security.example.com" external variant="secondary">
            Security Handbook
          </Link>{' '}
          available on our corporate portal.
        </p>
        
        <p className="text-gray-700 mb-4">
          Password requirements are outlined in{' '}
          <Link href="#" variant="enterprise">Section 3.2</Link>{' '}
          of the handbook. For technical support, contact the{' '}
          <Link href="#" variant="primary">IT Helpdesk</Link>{' '}
          or submit a ticket through our{' '}
          <Link href="https://helpdesk.example.com" external variant="secondary">
            Service Portal
          </Link>.
        </p>
        
        <div className="p-4 bg-blue-50 rounded-md mt-6">
          <h4 className="font-medium text-blue-900 mb-2">Related Resources:</h4>
          <div className="space-y-1">
            <div>
              <Link href="#" variant="primary" size="small">Employee Onboarding Guide</Link>
            </div>
            <div>
              <Link href="https://training.example.com" external variant="secondary" size="small">
                Security Training Portal
              </Link>
            </div>
            <div>
              <Link href="#" variant="muted" size="small">Compliance Checklist</Link>
            </div>
          </div>
        </div>
      </article>
      
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">API Documentation</h3>
        
        <p className="text-gray-700 mb-4">
          The Authentication API provides secure access to our platform. 
          Start with the{' '}
          <Link href="#" variant="primary">Quick Start Guide</Link>{' '}
          or explore the{' '}
          <Link href="https://api.example.com/docs" external variant="enterprise">
            complete API reference
          </Link>.
        </p>
        
        <div className="bg-gray-100 rounded-md p-4">
          <code className="text-sm">
            GET /api/v1/auth/token<br/>
            Authorization: Bearer {'{'}token{'}'}
          </code>
          
          <p className="text-sm text-gray-600 mt-2">
            See the{' '}
            <Link href="#" variant="secondary" size="small">authentication flow</Link>{' '}
            for implementation details.
          </p>
        </div>
      </section>
    </div>
  ),
};

// Accessibility Showcase
export const AccessibilityShowcase: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates accessibility features including proper focus management and ARIA attributes.',
      },
    },
  },
  render: () => (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 rounded-md">
        <h4 className="font-medium text-blue-900">Accessibility Features:</h4>
        <ul className="text-sm text-blue-800 mt-2 list-disc list-inside">
          <li>Proper focus indicators with ring-offset</li>
          <li>External link security (noopener, noreferrer)</li>
          <li>Disabled state with aria-disabled</li>
          <li>Loading state with aria-busy</li>
          <li>Keyboard navigation support</li>
          <li>Screen reader friendly external link indicators</li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Focus Management</h4>
          <div className="space-x-4">
            <Link href="#" variant="primary">
              Focusable Link
            </Link>
            <Link href="#" variant="secondary">
              Another Link
            </Link>
            <Link href="#" variant="muted" disabled>
              Disabled Link
            </Link>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Tab through these links to see focus indicators
          </p>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2">External Link Security</h4>
          <div className="space-y-2">
            <div>
              <Link href="https://example.com" external variant="primary">
                Secure External Link
              </Link>
              <p className="text-sm text-gray-600">
                Opens in new tab with rel="noopener noreferrer"
              </p>
            </div>
            
            <div>
              <Link href="https://malicious.example.com" external variant="secondary">
                Protected External Link
              </Link>
              <p className="text-sm text-gray-600">
                Automatically secured against window.opener attacks
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2">State Announcements</h4>
          <div className="space-y-2">
            <div>
              <Link href="#" loading>
                Loading Link
              </Link>
              <p className="text-sm text-gray-600">
                Announced as "busy" to screen readers
              </p>
            </div>
            
            <div>
              <Link href="#" disabled>
                Disabled Link
              </Link>
              <p className="text-sm text-gray-600">
                Announced as "disabled" to screen readers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};