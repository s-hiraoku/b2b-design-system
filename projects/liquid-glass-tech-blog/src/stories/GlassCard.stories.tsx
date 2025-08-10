import type { Meta, StoryObj } from '@storybook/react';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Palette, Zap, Globe } from 'lucide-react';

const meta: Meta<typeof GlassCard> = {
  title: 'Liquid Glass/GlassCard',
  component: GlassCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Liquid Glass design card component with glassmorphism effects and multiple variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['subtle', 'medium', 'intense'],
      description: 'Glass effect intensity',
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Enable hover interactions',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Subtle: Story = {
  args: {
    variant: 'subtle',
    interactive: false,
    children: (
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">Subtle Glass Card</h3>
        <p className="text-white/70">
          A subtle glass effect perfect for content that needs to blend into the background.
        </p>
      </div>
    ),
  },
};

export const Medium: Story = {
  args: {
    variant: 'medium',
    interactive: false,
    children: (
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">Medium Glass Card</h3>
        <p className="text-white/70">
          A balanced glass effect that provides good visibility while maintaining the glass aesthetic.
        </p>
      </div>
    ),
  },
};

export const Intense: Story = {
  args: {
    variant: 'intense',
    interactive: false,
    children: (
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">Intense Glass Card</h3>
        <p className="text-white/70">
          A strong glass effect that creates a prominent frosted glass appearance.
        </p>
      </div>
    ),
  },
};

export const Interactive: Story = {
  args: {
    variant: 'medium',
    interactive: true,
    children: (
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">Interactive Glass Card</h3>
        <p className="text-white/70">
          Hover over this card to see the interactive effects in action.
        </p>
      </div>
    ),
  },
};

export const WithStructuredContent: Story = {
  args: {
    variant: 'medium',
    interactive: true,
    children: (
      <div>
        <GlassCardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/10">
                <Palette className="w-5 h-5" />
              </div>
              <GlassCardTitle className="text-lg">
                Liquid Glass Design
              </GlassCardTitle>
            </div>
            <Badge className="bg-white/10 text-white/80 border-white/20">
              Featured
            </Badge>
          </div>
        </GlassCardHeader>
        <GlassCardContent>
          <GlassCardDescription className="text-white/70">
            Experience the beauty of glassmorphism with our carefully crafted Liquid Glass components.
            Perfect for modern web applications that need that premium feel.
          </GlassCardDescription>
        </GlassCardContent>
      </div>
    ),
  },
};

export const BlogPostCard: Story = {
  args: {
    variant: 'medium',
    interactive: true,
    children: (
      <div>
        <GlassCardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <GlassCardTitle className="text-lg">
                  Advanced React Patterns
                </GlassCardTitle>
                <p className="text-sm text-white/60 mt-1">March 15, 2024</p>
              </div>
            </div>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
              Tutorial
            </Badge>
          </div>
        </GlassCardHeader>
        <GlassCardContent>
          <GlassCardDescription className="text-white/70">
            Dive deep into advanced React patterns including compound components, render props,
            and custom hooks. Learn how to build scalable and maintainable React applications.
          </GlassCardDescription>
          <div className="flex gap-2 mt-4">
            <Badge variant="outline" className="text-xs border-white/30 text-white/60">React</Badge>
            <Badge variant="outline" className="text-xs border-white/30 text-white/60">JavaScript</Badge>
            <Badge variant="outline" className="text-xs border-white/30 text-white/60">Frontend</Badge>
          </div>
        </GlassCardContent>
      </div>
    ),
  },
};

export const FeatureCard: Story = {
  args: {
    variant: 'medium',
    interactive: true,
    children: (
      <div>
        <GlassCardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <GlassCardTitle className="text-xl">
              AI-Powered Features
            </GlassCardTitle>
          </div>
        </GlassCardHeader>
        <GlassCardContent>
          <GlassCardDescription className="text-white/70 mb-4">
            Leverage artificial intelligence to enhance your blogging experience with smart content
            suggestions and automated optimizations.
          </GlassCardDescription>
          <ul className="space-y-2 text-white/60 text-sm">
            <li>• Smart content generation</li>
            <li>• Automated SEO optimization</li>
            <li>• Intelligent tagging system</li>
            <li>• Content performance analytics</li>
          </ul>
        </GlassCardContent>
      </div>
    ),
  },
};