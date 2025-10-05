# B2B Design System - Project Structure

## Root Directory Organization
```
b2b-design-system/
├── src/                      # Source code
│   ├── components/           # Component library
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utilities and helpers
│   ├── styles/               # Global styles and design tokens
│   ├── types/                # TypeScript type definitions
│   └── stories/              # Storybook stories
├── .storybook/               # Storybook configuration
├── docs/                     # Documentation
├── tests/                    # Test files
├── public/                   # Static assets
├── scripts/                  # Build and utility scripts
├── .kiro/                    # Kiro SDD configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── vite.config.ts            # Vite configuration
└── README.md                 # Project documentation
```

## Components Structure (`src/components/`)
```
components/
├── data-display/             # Data presentation components
│   ├── Table/                # Data tables with sorting, filtering
│   │   ├── Table.tsx
│   │   ├── TableHeader.tsx
│   │   ├── TableBody.tsx
│   │   ├── TableRow.tsx
│   │   ├── TableCell.tsx
│   │   ├── TablePagination.tsx
│   │   ├── TableFilter.tsx
│   │   ├── Table.stories.tsx
│   │   └── index.ts
│   ├── DataGrid/             # Advanced data grid
│   ├── Card/                 # Information cards
│   ├── List/                 # List components
│   ├── Badge/                # Status badges
│   ├── Timeline/             # Timeline displays
│   └── KpiCard/              # KPI/metric cards
├── forms/                    # Form components
│   ├── Input/                # Text inputs
│   │   ├── Input.tsx
│   │   ├── Input.stories.tsx
│   │   └── index.ts
│   ├── Select/               # Dropdown selects
│   ├── Checkbox/             # Checkboxes
│   ├── Radio/                # Radio buttons
│   ├── Switch/               # Toggle switches
│   ├── DatePicker/           # Date selection
│   ├── TimePicker/           # Time selection
│   ├── FileUpload/           # File upload
│   ├── FormField/            # Form field wrapper
│   ├── FormWizard/           # Multi-step forms
│   └── Validation/           # Form validation
├── navigation/               # Navigation components
│   ├── Navbar/               # Top navigation
│   ├── Sidebar/              # Side navigation
│   ├── Breadcrumb/           # Breadcrumb navigation
│   ├── Tabs/                 # Tab navigation
│   ├── Menu/                 # Dropdown menus
│   ├── Pagination/           # Page navigation
│   └── Steps/                # Step indicators
├── feedback/                 # User feedback components
│   ├── Alert/                # Alert messages
│   ├── Toast/                # Toast notifications
│   ├── Modal/                # Modal dialogs
│   ├── Drawer/               # Slide-out panels
│   ├── Popover/              # Popovers
│   ├── Tooltip/              # Tooltips
│   ├── Progress/             # Progress indicators
│   ├── Spinner/              # Loading spinners
│   └── Skeleton/             # Loading skeletons
├── charts/                   # Data visualization
│   ├── LineChart/            # Line charts
│   ├── BarChart/             # Bar charts
│   ├── PieChart/             # Pie charts
│   ├── AreaChart/            # Area charts
│   ├── ScatterChart/         # Scatter plots
│   ├── Heatmap/              # Heat maps
│   └── Dashboard/            # Dashboard layouts
├── layout/                   # Layout components
│   ├── Container/            # Container wrapper
│   ├── Grid/                 # Grid system
│   ├── Stack/                # Stack layouts
│   ├── Divider/              # Dividers
│   ├── Spacer/               # Spacing utilities
│   └── Panel/                # Panel containers
├── typography/               # Text components
│   ├── Heading/              # Headings
│   ├── Text/                 # Body text
│   ├── Label/                # Form labels
│   ├── Link/                 # Links
│   └── Code/                 # Code display
├── buttons/                  # Button components
│   ├── Button/               # Primary buttons
│   ├── IconButton/           # Icon buttons
│   ├── ButtonGroup/          # Button groups
│   └── FloatingActionButton/ # FAB buttons
└── utilities/                # Utility components
    ├── Avatar/               # User avatars
    ├── Icon/                 # Icon system
    ├── Logo/                 # Logo component
    ├── SearchBox/            # Search input
    └── ThemeToggle/          # Theme switcher
```

## Storybook Structure (`.storybook/` & `src/stories/`)
```
.storybook/
├── main.ts                   # Main configuration
├── preview.tsx               # Global decorators and parameters
├── manager.ts                # UI customization
└── themes/                   # Custom Storybook themes
    ├── light.ts
    └── dark.ts

src/stories/
├── Introduction.stories.mdx   # Welcome page
├── Colors.stories.mdx        # Color documentation
├── Typography.stories.mdx    # Typography guide
├── Spacing.stories.mdx       # Spacing system
├── Icons.stories.mdx         # Icon library
├── Components/               # Component stories
│   ├── DataDisplay/          # Data display stories
│   ├── Forms/                # Form component stories
│   ├── Navigation/           # Navigation stories
│   ├── Feedback/             # Feedback stories
│   ├── Charts/               # Chart stories
│   └── Layout/               # Layout stories
├── Patterns/                 # Design patterns
│   ├── Authentication.stories.mdx
│   ├── DataEntry.stories.mdx
│   ├── Dashboard.stories.mdx
│   └── Settings.stories.mdx
└── Examples/                 # Full page examples
    ├── Dashboard.stories.tsx
    ├── UserManagement.stories.tsx
    ├── Analytics.stories.tsx
    └── Reports.stories.tsx
```

## Styles Structure (`src/styles/`)
```
styles/
├── tokens/                   # Design tokens
│   ├── colors.ts             # Color palette
│   ├── typography.ts         # Font system
│   ├── spacing.ts            # Spacing scale
│   ├── shadows.ts            # Shadow definitions
│   ├── borders.ts            # Border styles
│   ├── breakpoints.ts        # Responsive breakpoints
│   └── animations.ts         # Animation values
├── themes/                   # Theme definitions
│   ├── base.ts               # Base theme
│   ├── light.ts              # Light theme
│   ├── dark.ts               # Dark theme
│   └── high-contrast.ts     # Accessibility theme
├── globals.css               # Global CSS
├── tailwind.css              # Tailwind imports
└── utilities.css             # Utility classes
```

## Library Structure (`src/lib/`)
```
lib/
├── utils/                    # Utility functions
│   ├── cn.ts                 # Class name merger
│   ├── format.ts             # Formatters
│   ├── validation.ts         # Validators
│   └── helpers.ts            # Helper functions
├── hooks/                    # Custom React hooks
│   ├── useTheme.ts           # Theme hook
│   ├── useMediaQuery.ts      # Responsive hook
│   ├── useDebounce.ts        # Debounce hook
│   ├── useLocalStorage.ts    # Storage hook
│   └── useIntersection.ts    # Intersection observer
├── constants/                # Constants
│   ├── themes.ts             # Theme constants
│   ├── breakpoints.ts        # Breakpoint values
│   └── defaults.ts           # Default values
└── config/                   # Configuration
    ├── shadcn.ts             # shadcn/ui config
    ├── charts.ts             # Chart config
    └── forms.ts              # Form config
```

## Types Structure (`src/types/`)
```
types/
├── components/               # Component types
│   ├── table.types.ts
│   ├── form.types.ts
│   ├── chart.types.ts
│   └── common.types.ts
├── theme.types.ts            # Theme types
├── utils.types.ts            # Utility types
└── index.ts                  # Type exports
```

## Testing Structure (`tests/`)
```
tests/
├── unit/                     # Unit tests
│   ├── components/           # Component tests
│   ├── utils/                # Utility tests
│   └── hooks/                # Hook tests
├── integration/              # Integration tests
│   ├── forms/                # Form workflows
│   ├── tables/               # Table interactions
│   └── navigation/           # Navigation flows
├── e2e/                      # End-to-end tests
│   ├── dashboard.spec.ts
│   ├── forms.spec.ts
│   └── data-management.spec.ts
├── visual/                   # Visual regression tests
│   ├── components/
│   └── pages/
└── setup/                    # Test configuration
    ├── jest.setup.ts
    ├── vitest.setup.ts
    └── test-utils.tsx
```

## Documentation Structure (`docs/`)
```
docs/
├── getting-started/          # Getting started guides
│   ├── installation.md
│   ├── quick-start.md
│   └── migration.md
├── components/               # Component documentation
│   ├── overview.md
│   ├── data-display/
│   ├── forms/
│   ├── navigation/
│   └── feedback/
├── design/                   # Design guidelines
│   ├── principles.md
│   ├── colors.md
│   ├── typography.md
│   ├── spacing.md
│   └── accessibility.md
├── patterns/                 # Design patterns
│   ├── authentication.md
│   ├── data-entry.md
│   ├── error-handling.md
│   └── loading-states.md
├── api/                      # API documentation
│   ├── components.md
│   ├── hooks.md
│   └── utilities.md
└── contributing/             # Contribution guides
    ├── code-style.md
    ├── component-guidelines.md
    └── testing.md
```

## Component Structure Pattern

### Standard Component Structure
```typescript
// components/forms/Input/Input.tsx
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', size = 'md', variant = 'default', error, ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-5 text-lg',
    };

    const variantClasses = {
      default: 'border-gray-300 focus:border-blue-500',
      error: 'border-red-500 focus:border-red-600',
      success: 'border-green-500 focus:border-green-600',
    };

    return (
      <input
        type={type}
        className={cn(
          'flex w-full rounded-md border bg-white px-3 py-2',
          'text-gray-900 placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'transition-colors duration-200',
          sizeClasses[size],
          error ? variantClasses.error : variantClasses[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
```

### Component Story Structure
```typescript
// components/forms/Input/Input.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Forms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component for B2B applications with multiple variants and sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input field',
    },
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Visual variant of the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="space-y-2">
      <label htmlFor="email" className="text-sm font-medium text-gray-700">
        Email Address
      </label>
      <Input id="email" type="email" {...args} />
    </div>
  ),
  args: {
    placeholder: 'john.doe@company.com',
  },
};

export const WithError: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Input {...args} />
      <p className="text-sm text-red-600">This field is required</p>
    </div>
  ),
  args: {
    variant: 'error',
    placeholder: 'Required field',
    error: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input (default)" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <Input placeholder="Default state" />
      <Input placeholder="Disabled state" disabled />
      <Input variant="error" placeholder="Error state" />
      <Input variant="success" placeholder="Success state" />
    </div>
  ),
};
```

## Import Organization Pattern
```typescript
// 1. React and Next.js imports
import { useState, useEffect, useCallback } from 'react';
import type { FC, ReactNode } from 'react';

// 2. Third-party libraries
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// 3. Internal components (absolute imports)
import { Button } from '@/components/buttons';
import { Input } from '@/components/forms';
import { Card } from '@/components/data-display';

// 4. Utilities and hooks
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/hooks';

// 5. Types
import type { TableProps, SortConfig } from '@/types/components';

// 6. Styles (if needed)
import styles from './Component.module.css';
```

## File Naming Conventions

- **Components**: PascalCase (`Button.tsx`, `DataTable.tsx`)
- **Stories**: PascalCase with `.stories.tsx` (`Button.stories.tsx`)
- **Tests**: PascalCase with `.test.tsx` (`Button.test.tsx`)
- **Hooks**: camelCase with `use` prefix (`useTheme.ts`)
- **Utilities**: camelCase (`formatDate.ts`, `validation.ts`)
- **Types**: camelCase with `.types.ts` (`button.types.ts`)
- **Constants**: SCREAMING_SNAKE_CASE in files (`API_ENDPOINTS.ts`)
- **Config files**: kebab-case (`tailwind.config.ts`)

## Key Development Principles

### Component Design Philosophy
- **Composition over Configuration**: Build complex UIs from simple, composable parts
- **Accessibility First**: WCAG 2.1 AA compliance by default
- **Type Safety**: Full TypeScript coverage with strict mode
- **Performance**: Optimized bundle size with tree-shaking
- **Customization**: shadcn/ui copy-paste philosophy for full control

### B2B-Specific Considerations
- **Data Density**: Components optimized for information-rich interfaces
- **Keyboard Navigation**: Full keyboard support for power users
- **Bulk Operations**: Support for multi-select and batch actions
- **Export Capabilities**: Built-in data export functionality
- **Permissions**: Role-based component rendering
- **Audit Trail**: Component state change tracking

### Testing Strategy
- **Unit Tests**: Component logic and utilities (>90% coverage)
- **Integration Tests**: User workflows and interactions
- **Visual Regression**: Chromatic or Percy for UI consistency
- **Accessibility Tests**: Automated WCAG compliance checks
- **Performance Tests**: Bundle size and render performance

### Documentation Standards
- **Component Documentation**: Props, usage examples, best practices
- **Storybook Stories**: Interactive examples for all states
- **API Documentation**: TypeScript interfaces and JSDoc
- **Design Guidelines**: When and how to use components
- **Migration Guides**: Version upgrade paths

### Performance Optimization
- **Code Splitting**: Lazy loading for large components
- **Bundle Optimization**: Tree-shaking and minification
- **CSS Optimization**: PurgeCSS for unused styles
- **Image Optimization**: Next/Image or lazy loading
- **Memoization**: React.memo for expensive components

### Internationalization (i18n)
- **Text Externalization**: All text in language files
- **RTL Support**: Bidirectional layout support
- **Date/Time Formatting**: Locale-aware formatting
- **Number Formatting**: Currency and number localization
- **Pluralization**: Proper plural forms for all languages

This structure provides a solid foundation for a professional B2B design system that scales with team and product growth while maintaining consistency and quality.