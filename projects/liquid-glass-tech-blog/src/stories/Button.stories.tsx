import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Heart, Share2, Settings, Plus } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Liquid Glass/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button component with Liquid Glass styling for various use cases in the blog.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'Button variant',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Button size',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'default',
  },
};

export const LiquidGlassStyle: Story = {
  args: {
    children: 'Liquid Glass Button',
    className: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300',
  },
};

export const GlassOutline: Story = {
  args: {
    children: 'Glass Outline',
    variant: 'outline',
    className: 'bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:border-white/50 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        Get Started
        <ArrowRight className="ml-2 w-4 h-4" />
      </>
    ),
    className: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300',
  },
};

export const IconButton: Story = {
  args: {
    variant: 'outline',
    size: 'icon',
    children: <Heart className="w-4 h-4" />,
    className: 'bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:border-white/50 hover:scale-110 transition-all duration-300',
  },
};

export const GhostButton: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
    className: 'text-white hover:bg-white/10 hover:text-white transition-all duration-300',
  },
};

export const BlogActionButtons: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-none shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
        <Plus className="w-4 h-4 mr-2" />
        New Post
      </Button>
      <Button 
        variant="outline"
        className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:border-white/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        <Download className="w-4 h-4 mr-2" />
        Export
      </Button>
      <Button 
        variant="ghost"
        className="text-white hover:bg-white/10 hover:text-white hover:scale-105 transition-all duration-300"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
      <Button 
        variant="outline"
        size="icon"
        className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:border-white/50 hover:scale-110 transition-all duration-300"
      >
        <Settings className="w-4 h-4" />
      </Button>
    </div>
  ),
};

export const CallToAction: Story = {
  args: {
    size: 'lg',
    children: (
      <>
        Start Writing Today
        <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
      </>
    ),
    className: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group px-8 py-3 text-lg',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-3 items-center">
      <Button 
        size="sm"
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        Small
      </Button>
      <Button 
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        Default
      </Button>
      <Button 
        size="lg"
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        Large
      </Button>
    </div>
  ),
};