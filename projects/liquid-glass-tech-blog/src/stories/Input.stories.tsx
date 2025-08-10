import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/ui/input';
import { Search, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof Input> = {
  title: 'Liquid Glass/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Input component with Liquid Glass styling for forms and user input.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'search', 'tel', 'url', 'number'],
      description: 'Input type',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const LiquidGlassStyle: Story = {
  args: {
    placeholder: 'Your email address',
    className: 'bg-white/10 backdrop-blur-md border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-2 focus:ring-white/20',
  },
};

export const SearchInput: Story = {
  render: () => (
    <div className="relative w-80">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
      <Input
        type="search"
        placeholder="Search articles..."
        className="pl-10 bg-white/10 backdrop-blur-md border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-2 focus:ring-white/20"
      />
    </div>
  ),
};

export const EmailInput: Story = {
  render: () => (
    <div className="relative w-80">
      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
      <Input
        type="email"
        placeholder="your.email@example.com"
        className="pl-10 bg-white/10 backdrop-blur-md border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-2 focus:ring-white/20"
      />
    </div>
  ),
};

export const PasswordInput: Story = {
  render: () => {
    const [showPassword, setShowPassword] = React.useState(false);
    
    return (
      <div className="relative w-80">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          className="pl-10 pr-10 bg-white/10 backdrop-blur-md border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-2 focus:ring-white/20"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 text-white/50 hover:text-white/80 hover:bg-white/10"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </Button>
      </div>
    );
  },
};

export const BlogSubscribeForm: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
        <Input
          placeholder="Your name"
          className="pl-10 bg-white/10 backdrop-blur-md border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-2 focus:ring-white/20"
        />
      </div>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
        <Input
          type="email"
          placeholder="your.email@example.com"
          className="pl-10 bg-white/10 backdrop-blur-md border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-2 focus:ring-white/20"
        />
      </div>
      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
        Subscribe to Blog
      </Button>
    </div>
  ),
};

export const CommentForm: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
        <Input
          placeholder="Your name"
          className="pl-10 bg-white/10 backdrop-blur-md border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-2 focus:ring-white/20"
        />
      </div>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
        <Input
          type="email"
          placeholder="your.email@example.com"
          className="pl-10 bg-white/10 backdrop-blur-md border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-2 focus:ring-white/20"
        />
      </div>
      <textarea
        placeholder="Your comment..."
        rows={4}
        className="w-full bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-2 focus:ring-white/20 rounded-md px-3 py-2 resize-none focus:outline-none"
      />
      <div className="flex gap-2">
        <Button 
          variant="outline"
          className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300"
        >
          Cancel
        </Button>
        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
          Post Comment
        </Button>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
    className: 'bg-white/10 backdrop-blur-md border-white/30 text-white placeholder:text-white/50',
  },
};