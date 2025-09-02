import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '../src/components/typography/Label';
import React from 'react';

const meta: Meta<typeof Label> = {
  title: 'Typography/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An enterprise form label component with WCAG 2.1 AA compliance, proper form control association, and professional B2B styling for accessible form interfaces.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'enterprise'],
      description: 'Visual variant of the label component',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant for different form densities',
    },
    weight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight of the label text',
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'muted', 'error', 'success', 'warning'],
      description: 'Color variant for different states',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the associated field is required',
    },
    optional: {
      control: { type: 'boolean' },
      description: 'Whether the field is explicitly optional',
    },
    htmlFor: {
      control: { type: 'text' },
      description: 'ID of the associated form control',
    },
    children: {
      control: { type: 'text' },
      description: 'Label content',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

// Basic Examples
export const Default: Story = {
  args: {
    children: 'Email Address',
    htmlFor: 'email',
  },
};

export const Required: Story = {
  args: {
    children: 'Password',
    htmlFor: 'password',
    required: true,
  },
};

export const Optional: Story = {
  args: {
    children: 'Middle Name',
    htmlFor: 'middleName',
    optional: true,
  },
};

export const Enterprise: Story = {
  args: {
    children: 'Company Registration Number',
    htmlFor: 'regNumber',
    variant: 'enterprise',
    required: true,
  },
};

// Size Variants
export const SizeVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different size variants for various form densities and layouts.',
      },
    },
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <Label size="large" htmlFor="large-input" weight="semibold">
          Large Label
        </Label>
        <input 
          id="large-input" 
          type="text" 
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Large form input"
        />
      </div>
      
      <div>
        <Label size="medium" htmlFor="medium-input">
          Medium Label (Default)
        </Label>
        <input 
          id="medium-input" 
          type="text" 
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Standard form input"
        />
      </div>
      
      <div>
        <Label size="small" htmlFor="small-input">
          Small Label
        </Label>
        <input 
          id="small-input" 
          type="text" 
          className="mt-1 w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
          placeholder="Compact form input"
        />
      </div>
    </div>
  ),
};

// Weight Variants
export const WeightVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different font weights for emphasis and visual hierarchy.',
      },
    },
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <Label weight="bold" htmlFor="bold-input">
          Bold Weight Label
        </Label>
        <input 
          id="bold-input" 
          type="text" 
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="For high emphasis fields"
        />
      </div>
      
      <div>
        <Label weight="semibold" htmlFor="semibold-input">
          Semibold Weight Label
        </Label>
        <input 
          id="semibold-input" 
          type="text" 
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="For important fields"
        />
      </div>
      
      <div>
        <Label weight="medium" htmlFor="medium-input">
          Medium Weight Label (Default)
        </Label>
        <input 
          id="medium-input" 
          type="text" 
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Standard emphasis"
        />
      </div>
      
      <div>
        <Label weight="normal" htmlFor="normal-input">
          Normal Weight Label
        </Label>
        <input 
          id="normal-input" 
          type="text" 
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Minimal emphasis"
        />
      </div>
    </div>
  ),
};

// Color Variants
export const ColorVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different color variants for various form states and contexts.',
      },
    },
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <Label color="default" htmlFor="default-input">
          Default Color Label
        </Label>
        <input 
          id="default-input" 
          type="text" 
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Standard state"
        />
      </div>
      
      <div>
        <Label color="muted" htmlFor="muted-input">
          Muted Color Label
        </Label>
        <input 
          id="muted-input" 
          type="text" 
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Secondary information"
        />
      </div>
      
      <div>
        <Label color="success" htmlFor="success-input" weight="medium">
          Success State Label
        </Label>
        <input 
          id="success-input" 
          type="text" 
          className="mt-2 w-full px-3 py-2 border border-green-300 rounded-md bg-green-50"
          placeholder="Validation passed"
        />
      </div>
      
      <div>
        <Label color="warning" htmlFor="warning-input" weight="medium">
          Warning State Label
        </Label>
        <input 
          id="warning-input" 
          type="text" 
          className="mt-2 w-full px-3 py-2 border border-yellow-300 rounded-md bg-yellow-50"
          placeholder="Needs attention"
        />
      </div>
      
      <div>
        <Label color="error" htmlFor="error-input" weight="medium">
          Error State Label
        </Label>
        <input 
          id="error-input" 
          type="text" 
          className="mt-2 w-full px-3 py-2 border border-red-300 rounded-md bg-red-50"
          placeholder="Validation failed"
        />
      </div>
    </div>
  ),
};

// Required and Optional States
export const RequiredOptionalStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Required and optional field indicators for clear user guidance.',
      },
    },
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="required-field" required>
          Required Field
        </Label>
        <input 
          id="required-field" 
          type="text" 
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="This field is required"
          required
        />
        <p className="mt-1 text-sm text-gray-500">
          Asterisk indicates this field is required for form submission.
        </p>
      </div>
      
      <div>
        <Label htmlFor="optional-field" optional>
          Optional Field
        </Label>
        <input 
          id="optional-field" 
          type="text" 
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="This field is optional"
        />
        <p className="mt-1 text-sm text-gray-500">
          Explicitly marked as optional for user clarity.
        </p>
      </div>
      
      <div>
        <Label htmlFor="standard-field">
          Standard Field
        </Label>
        <input 
          id="standard-field" 
          type="text" 
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="No explicit indicator"
        />
        <p className="mt-1 text-sm text-gray-500">
          No indicator means users should refer to form instructions.
        </p>
      </div>
    </div>
  ),
};

// Form Association Examples
export const FormAssociationExamples: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Proper form control association for accessibility and usability.',
      },
    },
  },
  render: () => (
    <div className="space-y-6">
      <fieldset className="border border-gray-200 rounded-md p-4">
        <legend className="text-lg font-semibold px-2">Personal Information</legend>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="firstName" required>
              First Name
            </Label>
            <input 
              id="firstName" 
              type="text" 
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter first name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="lastName" required>
              Last Name
            </Label>
            <input 
              id="lastName" 
              type="text" 
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter last name"
              required
            />
          </div>
        </div>
        
        <div className="mt-4">
          <Label htmlFor="email" required color="default">
            Email Address
          </Label>
          <input 
            id="email" 
            type="email" 
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="your.email@company.com"
            required
          />
        </div>
        
        <div className="mt-4">
          <Label htmlFor="phone" optional>
            Phone Number
          </Label>
          <input 
            id="phone" 
            type="tel" 
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </fieldset>
      
      <fieldset className="border border-gray-200 rounded-md p-4">
        <legend className="text-lg font-semibold px-2">Preferences</legend>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-center">
            <input 
              id="newsletter" 
              type="checkbox" 
              className="mr-3"
            />
            <Label htmlFor="newsletter" className="mb-0">
              Subscribe to newsletter
            </Label>
          </div>
          
          <div className="flex items-center">
            <input 
              id="notifications" 
              type="checkbox" 
              className="mr-3"
            />
            <Label htmlFor="notifications" className="mb-0">
              Enable notifications
            </Label>
          </div>
        </div>
      </fieldset>
    </div>
  ),
};

// Enterprise B2B Examples
export const EnterpriseExamples: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Enterprise-focused examples with business-specific forms and styling.',
      },
    },
  },
  render: () => (
    <div className="space-y-8 p-6 bg-gray-50 rounded-lg">
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Registration Form</h3>
        
        <div className="space-y-6 p-6 bg-white rounded border">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="empId" variant="enterprise" required>
                Employee ID
              </Label>
              <input 
                id="empId" 
                type="text" 
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="EMP-2024-001"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="department" variant="enterprise" required>
                Department
              </Label>
              <select 
                id="department" 
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Department</option>
                <option value="engineering">Engineering</option>
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
                <option value="hr">Human Resources</option>
              </select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="jobTitle" variant="enterprise" required>
              Job Title
            </Label>
            <input 
              id="jobTitle" 
              type="text" 
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Senior Software Engineer"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="manager" variant="enterprise" optional>
              Direct Manager
            </Label>
            <input 
              id="manager" 
              type="text" 
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Search for manager..."
            />
          </div>
        </div>
      </section>
      
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Access Request</h3>
        
        <div className="space-y-6 p-6 bg-white rounded border">
          <div>
            <Label htmlFor="accessLevel" variant="enterprise" required weight="semibold">
              Access Level
            </Label>
            <select 
              id="accessLevel" 
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Access Level</option>
              <option value="read">Read Only</option>
              <option value="write">Read/Write</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="justification" variant="enterprise" required>
              Business Justification
            </Label>
            <textarea 
              id="justification" 
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={4}
              placeholder="Explain why this access is needed for your role..."
              required
            />
          </div>
          
          <div>
            <Label htmlFor="duration" variant="enterprise" optional>
              Access Duration
            </Label>
            <input 
              id="duration" 
              type="date" 
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <p className="mt-1 text-sm text-gray-500">
              Leave blank for permanent access
            </p>
          </div>
        </div>
      </section>
      
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Validation States</h3>
        
        <div className="space-y-6 p-6 bg-white rounded border">
          <div>
            <Label htmlFor="validField" color="success" weight="medium">
              Successfully Validated Field
            </Label>
            <input 
              id="validField" 
              type="text" 
              value="john.doe@company.com"
              className="mt-2 w-full px-3 py-2 border border-green-300 rounded-md bg-green-50"
              readOnly
            />
            <p className="mt-1 text-sm text-green-600">✓ Email format is valid</p>
          </div>
          
          <div>
            <Label htmlFor="warningField" color="warning" weight="medium">
              Field with Warning
            </Label>
            <input 
              id="warningField" 
              type="password" 
              className="mt-2 w-full px-3 py-2 border border-yellow-300 rounded-md bg-yellow-50"
              placeholder="Enter password"
            />
            <p className="mt-1 text-sm text-yellow-600">⚠ Password should be at least 8 characters</p>
          </div>
          
          <div>
            <Label htmlFor="errorField" color="error" weight="medium" required>
              Field with Error
            </Label>
            <input 
              id="errorField" 
              type="text" 
              className="mt-2 w-full px-3 py-2 border border-red-300 rounded-md bg-red-50"
              placeholder="This field has an error"
            />
            <p className="mt-1 text-sm text-red-600">✗ This field is required</p>
          </div>
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
        story: 'Demonstrates accessibility features including proper association and ARIA attributes.',
      },
    },
  },
  render: () => (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 rounded-md">
        <h4 className="font-medium text-blue-900">Accessibility Features:</h4>
        <ul className="text-sm text-blue-800 mt-2 list-disc list-inside">
          <li>Proper form control association via htmlFor attribute</li>
          <li>Required field indication with aria-required</li>
          <li>Visual and programmatic required indicators</li>
          <li>WCAG 2.1 AA color contrast compliance</li>
          <li>Screen reader friendly markup</li>
          <li>Keyboard navigation support</li>
        </ul>
      </div>
      
      <form className="space-y-4 p-4 border border-gray-200 rounded">
        <div>
          <Label htmlFor="accessible-email" required>
            Email Address
          </Label>
          <input 
            id="accessible-email" 
            type="email" 
            aria-describedby="email-help"
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
            required
          />
          <p id="email-help" className="mt-1 text-sm text-gray-500">
            We'll use this to send you important account updates
          </p>
        </div>
        
        <div>
          <Label htmlFor="accessible-password" required>
            Password
          </Label>
          <input 
            id="accessible-password" 
            type="password" 
            aria-describedby="password-help"
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Create a secure password"
            required
          />
          <p id="password-help" className="mt-1 text-sm text-gray-500">
            Must be at least 8 characters with mixed case and numbers
          </p>
        </div>
        
        <fieldset>
          <legend className="text-sm font-medium text-gray-700 mb-2">Contact Preferences</legend>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <input 
                id="contact-email" 
                type="checkbox" 
                className="mr-3"
                aria-describedby="contact-email-desc"
              />
              <Label htmlFor="contact-email" className="mb-0">
                Email notifications
              </Label>
            </div>
            <p id="contact-email-desc" className="text-sm text-gray-500 ml-6">
              Receive updates and announcements via email
            </p>
            
            <div className="flex items-center">
              <input 
                id="contact-sms" 
                type="checkbox" 
                className="mr-3"
                aria-describedby="contact-sms-desc"
              />
              <Label htmlFor="contact-sms" className="mb-0">
                SMS notifications
              </Label>
            </div>
            <p id="contact-sms-desc" className="text-sm text-gray-500 ml-6">
              Receive critical alerts via text message
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  ),
};