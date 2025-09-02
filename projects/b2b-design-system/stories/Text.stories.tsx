import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../src/components/typography/Text';
import React from 'react';

const meta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible text component with professional typography scale, WCAG 2.1 AA compliance, and enterprise B2B styling optimized for readability and accessibility.',
      },
    },
  },
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['p', 'span', 'div', 'strong', 'em'],
      description: 'HTML element to render as',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'enterprise'],
      description: 'Visual variant of the text component',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'Size variant for different text scales',
    },
    weight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight of the text',
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'muted', 'primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Color variant for different contexts',
    },
    truncate: {
      control: { type: 'boolean' },
      description: 'Whether to truncate long text with ellipsis',
    },
    children: {
      control: { type: 'text' },
      description: 'Text content',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Text>;

// Basic Examples
export const Default: Story = {
  args: {
    children: 'This is the default text component with professional typography and enterprise-focused styling.',
  },
};

export const Enterprise: Story = {
  args: {
    children: 'Enterprise variant text with specialized B2B styling for professional applications.',
    variant: 'enterprise',
  },
};

export const Paragraph: Story = {
  args: {
    as: 'p',
    children: 'This is a paragraph element with proper semantic meaning and professional styling for body text.',
  },
};

// Element Types
export const ElementTypes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different HTML elements with consistent styling for semantic correctness.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <Text as="p">
        Paragraph element - Used for body text and longer content blocks.
      </Text>
      
      <Text as="span">
        Span element - Inline text for shorter phrases and labels.
      </Text>
      
      <Text as="div">
        Div element - Block-level text container for flexible layouts.
      </Text>
      
      <Text as="strong" weight="semibold">
        Strong element - Semantically important text with emphasis.
      </Text>
      
      <Text as="em" className="italic">
        Em element - Emphasized text with semantic meaning.
      </Text>
    </div>
  ),
};

// Size Variants
export const SizeVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different size variants for establishing text hierarchy.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <Text size="xlarge" weight="medium">
        Extra Large Text - For prominent content and introductory text.
      </Text>
      
      <Text size="large" weight="medium">
        Large Text - For section introductions and important information.
      </Text>
      
      <Text size="medium">
        Medium Text (Default) - Standard body text for most content.
      </Text>
      
      <Text size="small">
        Small Text - For captions, metadata, and secondary information.
      </Text>
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
    <div className="space-y-4">
      <Text weight="bold" size="large">
        Bold Weight - For strong emphasis and attention-grabbing text.
      </Text>
      
      <Text weight="semibold" size="large">
        Semibold Weight - For moderate emphasis and subheadings.
      </Text>
      
      <Text weight="medium" size="large">
        Medium Weight - For subtle emphasis and labels.
      </Text>
      
      <Text weight="normal" size="large">
        Normal Weight (Default) - For standard body text and paragraphs.
      </Text>
    </div>
  ),
};

// Color Variants
export const ColorVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different color variants for various contexts and states.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <Text color="default" weight="medium">
        Default Color - Standard text color for primary content.
      </Text>
      
      <Text color="muted">
        Muted Color - For secondary information and helper text.
      </Text>
      
      <Text color="primary" weight="medium">
        Primary Color - For brand-related content and important links.
      </Text>
      
      <Text color="secondary">
        Secondary Color - For less prominent but still important information.
      </Text>
      
      <Text color="success" weight="medium">
        Success Color - For positive feedback and success states.
      </Text>
      
      <Text color="warning" weight="medium">
        Warning Color - For cautionary information and warnings.
      </Text>
      
      <Text color="danger" weight="medium">
        Danger Color - For error messages and critical information.
      </Text>
    </div>
  ),
};

// Truncation
export const TruncationExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Text truncation with ellipsis for constrained layouts.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <div className="w-64 p-4 border border-gray-200 rounded">
        <Text weight="medium" className="mb-2">Normal text (no truncation):</Text>
        <Text>
          This is a very long piece of text that will wrap naturally to multiple lines when it exceeds the container width.
        </Text>
      </div>
      
      <div className="w-64 p-4 border border-gray-200 rounded">
        <Text weight="medium" className="mb-2">Truncated text:</Text>
        <Text truncate>
          This is a very long piece of text that will be truncated with an ellipsis when it exceeds the container width.
        </Text>
      </div>
      
      <div className="w-48 p-4 border border-gray-200 rounded">
        <Text weight="medium" className="mb-2">Narrower container:</Text>
        <Text truncate size="small">
          Even in smaller containers, text truncation works effectively.
        </Text>
      </div>
    </div>
  ),
};

// Enterprise B2B Examples
export const EnterpriseExamples: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Enterprise-focused examples with business-specific content and styling.',
      },
    },
  },
  render: () => (
    <div className="space-y-8 p-6 bg-gray-50 rounded-lg">
      <section>
        <Text as="div" size="xlarge" weight="semibold" color="default">
          Financial Summary Report
        </Text>
        <Text color="muted" className="mt-1">
          Quarterly performance analysis for stakeholder review
        </Text>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded border">
            <Text weight="medium" color="secondary">Revenue</Text>
            <Text size="large" weight="bold" color="success" className="mt-1">
              $2.4M
            </Text>
            <Text size="small" color="muted">
              +12.5% from last quarter
            </Text>
          </div>
          
          <div className="p-4 bg-white rounded border">
            <Text weight="medium" color="secondary">Expenses</Text>
            <Text size="large" weight="bold" color="danger" className="mt-1">
              $1.8M
            </Text>
            <Text size="small" color="muted">
              +3.2% from last quarter
            </Text>
          </div>
        </div>
      </section>
      
      <section>
        <Text as="div" size="large" weight="semibold" variant="enterprise">
          Key Performance Indicators
        </Text>
        
        <div className="mt-4 space-y-3">
          <div className="flex justify-between items-center">
            <Text weight="medium">Customer Satisfaction</Text>
            <Text weight="semibold" color="success">94.2%</Text>
          </div>
          
          <div className="flex justify-between items-center">
            <Text weight="medium">System Uptime</Text>
            <Text weight="semibold" color="success">99.9%</Text>
          </div>
          
          <div className="flex justify-between items-center">
            <Text weight="medium">Response Time</Text>
            <Text weight="semibold" color="warning">125ms</Text>
          </div>
          
          <Text size="small" color="muted">
            * Metrics updated in real-time. Historical data available in detailed reports.
          </Text>
        </div>
      </section>
      
      <section>
        <Text as="div" size="medium" weight="semibold">
          Project Status Updates
        </Text>
        
        <div className="mt-4 space-y-4">
          <div className="p-3 border border-green-200 bg-green-50 rounded">
            <Text weight="semibold" color="success">Project Alpha - Complete</Text>
            <Text size="small" color="secondary" className="mt-1">
              All deliverables met on schedule. Client approval received.
            </Text>
          </div>
          
          <div className="p-3 border border-blue-200 bg-blue-50 rounded">
            <Text weight="semibold" color="primary">Project Beta - In Progress</Text>
            <Text size="small" color="secondary" className="mt-1">
              75% complete. On track for Q1 delivery milestone.
            </Text>
          </div>
          
          <div className="p-3 border border-yellow-200 bg-yellow-50 rounded">
            <Text weight="semibold" color="warning">Project Gamma - At Risk</Text>
            <Text size="small" color="secondary" className="mt-1">
              Resource constraints identified. Mitigation plan in development.
            </Text>
          </div>
        </div>
      </section>
    </div>
  ),
};

// Content Examples
export const ContentExamples: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world content examples showcasing professional text formatting.',
      },
    },
  },
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <article>
        <Text size="large" weight="semibold" className="mb-3">
          Professional Email Template
        </Text>
        
        <Text className="mb-4">
          Dear Team,
        </Text>
        
        <Text className="mb-4">
          I hope this email finds you well. I wanted to provide an update on our quarterly 
          objectives and highlight some key achievements from our recent sprint cycle.
        </Text>
        
        <Text className="mb-4">
          Our development team has successfully completed the authentication module, 
          which represents a significant milestone in our roadmap. The implementation 
          includes enterprise-grade security features and comprehensive audit logging.
        </Text>
        
        <Text weight="medium" className="mb-2">
          Key Metrics:
        </Text>
        
        <Text as="div" className="mb-4">
          • Performance improved by 40% over previous quarter<br/>
          • Security compliance score: 98/100<br/>
          • Customer satisfaction rating: 4.8/5
        </Text>
        
        <Text className="mb-4">
          Please review the attached documents and provide feedback by Friday. 
          If you have any questions or concerns, don't hesitate to reach out.
        </Text>
        
        <Text>
          Best regards,<br/>
          <Text as="span" weight="medium">Sarah Johnson</Text><br/>
          <Text as="span" size="small" color="muted">Product Manager</Text>
        </Text>
      </article>
      
      <section>
        <Text size="large" weight="semibold" className="mb-3">
          Technical Documentation
        </Text>
        
        <Text className="mb-4">
          The Text component provides a flexible foundation for all textual content 
          in enterprise applications. It supports multiple HTML elements while 
          maintaining consistent styling and accessibility standards.
        </Text>
        
        <Text weight="medium" className="mb-2">
          Implementation Guidelines:
        </Text>
        
        <Text className="mb-4">
          When implementing the Text component, consider the semantic meaning of your 
          content. Use paragraph elements for body text, span elements for inline 
          content, and div elements when you need block-level styling without 
          semantic implications.
        </Text>
        
        <Text size="small" color="muted">
          Note: All text components automatically inherit responsive typography scaling 
          and high contrast mode support for optimal accessibility across different 
          viewing conditions.
        </Text>
      </section>
    </div>
  ),
};

// Accessibility Showcase
export const AccessibilityShowcase: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates accessibility features including proper contrast ratios and screen reader support.',
      },
    },
  },
  render: () => (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 rounded-md">
        <h4 className="font-medium text-blue-900">Accessibility Features:</h4>
        <ul className="text-sm text-blue-800 mt-2 list-disc list-inside">
          <li>WCAG 2.1 AA color contrast compliance (4.5:1 minimum)</li>
          <li>High contrast mode support with automatic adjustments</li>
          <li>Semantic HTML elements for proper document structure</li>
          <li>Screen reader friendly text rendering</li>
          <li>Responsive typography scaling</li>
          <li>Optimal line height for readability</li>
        </ul>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white border rounded">
          <Text weight="medium" className="mb-2">Standard Contrast</Text>
          <Text color="default">
            This text meets WCAG AA standards with a 4.5:1 contrast ratio 
            for optimal readability.
          </Text>
          <Text size="small" color="muted" className="mt-2">
            Muted text maintains 3:1 contrast for large text compliance.
          </Text>
        </div>
        
        <div className="p-4 bg-gray-900 border rounded">
          <Text weight="medium" className="mb-2 text-white">Dark Theme Contrast</Text>
          <Text className="text-gray-100">
            High contrast ratios are maintained across all color schemes 
            and themes.
          </Text>
          <Text size="small" className="mt-2 text-gray-300">
            Secondary text adjusts appropriately for dark backgrounds.
          </Text>
        </div>
      </div>
      
      <div>
        <Text weight="medium" className="mb-3">Screen Reader Test</Text>
        <Text>
          This content is optimized for screen readers with proper semantic 
          markup and clear, descriptive text that conveys meaning without 
          relying on visual formatting alone.
        </Text>
        
        <Text as="strong" weight="semibold" className="mt-4 block">
          Important information is properly emphasized
        </Text>
        
        <Text as="em" className="italic mt-2 block">
          Emphasized content uses semantic markup for assistive technologies
        </Text>
      </div>
    </div>
  ),
};