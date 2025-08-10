import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/components/ui/badge';

const meta: Meta<typeof Badge> = {
  title: 'Liquid Glass/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badge component for categorizing and labeling content in the blog.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'Badge variant',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const LiquidGlassStyle: Story = {
  args: {
    children: 'Featured',
    className: 'bg-white/10 text-white/80 border-white/20 backdrop-blur-sm',
  },
};

export const CategoryBadges: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
        React
      </Badge>
      <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
        TypeScript
      </Badge>
      <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
        Next.js
      </Badge>
      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">
        JavaScript
      </Badge>
      <Badge className="bg-red-500/20 text-red-300 border-red-400/30">
        CSS
      </Badge>
    </div>
  ),
};

export const BlogPostTags: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="outline" className="text-xs border-white/30 text-white/80">
        Frontend
      </Badge>
      <Badge variant="outline" className="text-xs border-white/30 text-white/80">
        Tutorial
      </Badge>
      <Badge variant="outline" className="text-xs border-white/30 text-white/80">
        Advanced
      </Badge>
      <Badge variant="outline" className="text-xs border-white/30 text-white/80">
        Best Practices
      </Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap items-center">
      <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
        Published
      </Badge>
      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">
        Draft
      </Badge>
      <Badge className="bg-red-500/20 text-red-300 border-red-400/30">
        Archive
      </Badge>
      <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
        Featured
      </Badge>
    </div>
  ),
};

export const TechStackBadges: Story = {
  render: () => (
    <div className="space-y-3">
      <div>
        <p className="text-white/70 text-sm mb-2">Frontend</p>
        <div className="flex gap-2 flex-wrap">
          <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30">
            Next.js 15
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30">
            React 19
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30">
            TypeScript 5.x
          </Badge>
        </div>
      </div>
      <div>
        <p className="text-white/70 text-sm mb-2">Design</p>
        <div className="flex gap-2 flex-wrap">
          <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30">
            Tailwind CSS
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30">
            shadcn/ui
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30">
            Liquid Glass
          </Badge>
        </div>
      </div>
      <div>
        <p className="text-white/70 text-sm mb-2">Platform</p>
        <div className="flex gap-2 flex-wrap">
          <Badge className="bg-green-500/20 text-green-200 border-green-400/30">
            Vercel
          </Badge>
          <Badge className="bg-green-500/20 text-green-200 border-green-400/30">
            MDX
          </Badge>
          <Badge className="bg-green-500/20 text-green-200 border-green-400/30">
            AI Integration
          </Badge>
        </div>
      </div>
    </div>
  ),
};