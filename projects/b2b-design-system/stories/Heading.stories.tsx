import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '../src/components/typography/Heading';
import React from 'react';

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An enterprise heading component with semantic levels, WCAG 2.1 AA compliance, and B2B styling optimized for professional applications and high contrast accessibility.',
      },
    },
  },
  argTypes: {
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
      description: 'Semantic heading level (h1-h6)',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'enterprise'],
      description: 'Visual variant of the heading component',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'Size variant independent of semantic level',
    },
    weight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight of the heading',
    },
    children: {
      control: { type: 'text' },
      description: 'Heading content',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Heading>;

// Basic Examples
export const Default: Story = {
  args: {
    children: 'Default Heading',
    level: 2,
  },
};

export const H1: Story = {
  args: {
    children: 'Main Page Heading',
    level: 1,
    size: 'xlarge',
    weight: 'bold',
  },
};

export const Enterprise: Story = {
  args: {
    children: 'Enterprise Dashboard',
    level: 2,
    variant: 'enterprise',
    size: 'large',
  },
};

// Semantic Hierarchy
export const SemanticHierarchy: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Proper semantic heading hierarchy from h1 to h6 for accessibility and SEO.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <Heading level={1} size="xlarge" weight="bold">
        h1 - Main Page Title
      </Heading>
      <Heading level={2} size="large" weight="semibold">
        h2 - Section Heading
      </Heading>
      <Heading level={3} size="medium" weight="semibold">
        h3 - Subsection Heading
      </Heading>
      <Heading level={4} size="medium" weight="medium">
        h4 - Topic Heading
      </Heading>
      <Heading level={5} size="small" weight="medium">
        h5 - Subtopic Heading
      </Heading>
      <Heading level={6} size="small" weight="normal">
        h6 - Minor Heading
      </Heading>
    </div>
  ),
};

// Size Variants
export const SizeVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different size variants independent of semantic level for visual hierarchy.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <Heading level={2} size="xlarge" weight="bold">
        Extra Large Heading
      </Heading>
      <Heading level={2} size="large" weight="semibold">
        Large Heading
      </Heading>
      <Heading level={2} size="medium" weight="semibold">
        Medium Heading (Default)
      </Heading>
      <Heading level={2} size="small" weight="medium">
        Small Heading
      </Heading>
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
      <Heading level={2} weight="bold" size="large">
        Bold Weight
      </Heading>
      <Heading level={2} weight="semibold" size="large">
        Semibold Weight (Default)
      </Heading>
      <Heading level={2} weight="medium" size="large">
        Medium Weight
      </Heading>
      <Heading level={2} weight="normal" size="large">
        Normal Weight
      </Heading>
    </div>
  ),
};

// Visual Variants
export const VisualVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different visual styles for various design contexts.',
      },
    },
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <Heading level={2} variant="default" size="large">
          Default Variant
        </Heading>
        <p className="text-gray-600 mt-2">Clean, professional styling for general use</p>
      </div>
      
      <div>
        <Heading level={2} variant="enterprise" size="large">
          Enterprise Variant
        </Heading>
        <p className="text-gray-600 mt-2">Professional styling with accent border for B2B applications</p>
      </div>
    </div>
  ),
};

// Enterprise B2B Examples
export const EnterpriseExamples: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Enterprise-focused examples with business-specific styling and context.',
      },
    },
  },
  render: () => (
    <div className="space-y-8 p-6 bg-gray-50 rounded-lg">
      <div>
        <Heading level={1} variant="enterprise" size="xlarge" weight="bold">
          Financial Dashboard
        </Heading>
        <p className="text-gray-600 mt-2">Q4 2024 Performance Overview</p>
      </div>
      
      <div>
        <Heading level={2} variant="enterprise" size="large">
          Revenue Analytics
        </Heading>
        <p className="text-gray-700 mt-1">Year-over-year comparison and trends</p>
      </div>
      
      <div>
        <Heading level={3} variant="enterprise" size="medium">
          Key Performance Indicators
        </Heading>
        <p className="text-gray-700 mt-1">Monthly targets and achievements</p>
      </div>
      
      <div>
        <Heading level={4} size="medium" weight="semibold">
          Regional Performance
        </Heading>
        <p className="text-gray-600 mt-1">Breakdown by geographic region</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-white rounded border">
          <Heading level={5} size="small" weight="medium">
            North America
          </Heading>
          <p className="text-2xl font-bold text-green-600 mt-2">$2.4M</p>
          <p className="text-sm text-gray-500">+12% YoY</p>
        </div>
        
        <div className="p-4 bg-white rounded border">
          <Heading level={5} size="small" weight="medium">
            Europe
          </Heading>
          <p className="text-2xl font-bold text-blue-600 mt-2">$1.8M</p>
          <p className="text-sm text-gray-500">+8% YoY</p>
        </div>
      </div>
    </div>
  ),
};

// Accessibility Showcase
export const AccessibilityShowcase: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates accessibility features including proper semantic structure and high contrast support.',
      },
    },
  },
  render: () => (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 rounded-md">
        <h4 className="font-medium text-blue-900">Accessibility Features:</h4>
        <ul className="text-sm text-blue-800 mt-2 list-disc list-inside">
          <li>Semantic heading levels for proper document structure</li>
          <li>WCAG 2.1 AA color contrast compliance</li>
          <li>High contrast mode support</li>
          <li>Proper focus management</li>
          <li>Screen reader friendly markup</li>
          <li>Keyboard navigation support</li>
        </ul>
      </div>
      
      <article>
        <Heading level={1} size="xlarge" weight="bold">
          Article Title: Accessibility Best Practices
        </Heading>
        
        <Heading level={2} size="large" variant="enterprise">
          Introduction to Web Accessibility
        </Heading>
        <p className="text-gray-700 mb-4">
          Web accessibility ensures that websites and applications are usable by everyone, 
          including people with disabilities.
        </p>
        
        <Heading level={3} size="medium">
          WCAG Guidelines
        </Heading>
        <p className="text-gray-700 mb-4">
          The Web Content Accessibility Guidelines provide comprehensive standards for accessible design.
        </p>
        
        <Heading level={4} size="medium" weight="medium">
          Color Contrast Requirements
        </Heading>
        <p className="text-gray-700 mb-4">
          Text must maintain sufficient contrast ratios for readability.
        </p>
        
        <Heading level={5} size="small">
          Minimum Ratios
        </Heading>
        <p className="text-gray-700 mb-4">
          Normal text requires a 4.5:1 contrast ratio for AA compliance.
        </p>
        
        <Heading level={6} size="small" weight="normal">
          Testing Tools
        </Heading>
        <p className="text-gray-700">
          Use automated tools like axe-core to verify accessibility compliance.
        </p>
      </article>
    </div>
  ),
};

// Content Examples
export const ContentExamples: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world content examples showcasing various heading use cases.',
      },
    },
  },
  render: () => (
    <div className="space-y-8">
      <section>
        <Heading level={1} size="xlarge" weight="bold">
          Product Documentation
        </Heading>
        
        <Heading level={2} size="large" variant="enterprise">
          Getting Started Guide
        </Heading>
        
        <Heading level={3} size="medium">
          Installation Requirements
        </Heading>
        
        <Heading level={4} size="medium" weight="medium">
          System Prerequisites
        </Heading>
        
        <Heading level={5} size="small">
          Minimum Hardware Specifications
        </Heading>
        
        <Heading level={6} size="small" weight="normal">
          CPU Requirements
        </Heading>
      </section>
      
      <section>
        <Heading level={1} size="xlarge" weight="bold">
          API Reference
        </Heading>
        
        <Heading level={2} size="large">
          Authentication
        </Heading>
        
        <Heading level={3} size="medium" variant="enterprise">
          OAuth 2.0 Implementation
        </Heading>
        
        <Heading level={4} size="medium" weight="medium">
          Authorization Code Flow
        </Heading>
      </section>
    </div>
  ),
};

// Performance Example
export const PerformanceExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Performance demonstration with multiple headings and efficient rendering.',
      },
    },
  },
  render: () => {
    const sections = Array.from({ length: 20 }, (_, i) => i + 1);
    
    return (
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <Heading level={1} size="large" weight="bold">
          Performance Test: {sections.length} Sections
        </Heading>
        
        {sections.map((section) => (
          <div key={section} className="border-b border-gray-200 pb-2">
            <Heading level={2} size="medium" variant="enterprise">
              Section {section}: Performance Metrics
            </Heading>
            <p className="text-sm text-gray-600 mt-1">
              This section demonstrates efficient rendering of multiple heading components
              with consistent styling and accessibility features.
            </p>
          </div>
        ))}
      </div>
    );
  },
};