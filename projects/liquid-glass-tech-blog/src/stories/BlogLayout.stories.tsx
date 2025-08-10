import type { Meta, StoryObj } from '@storybook/react';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, User, Tag, ArrowRight, Heart, Share2, MessageCircle } from 'lucide-react';

const meta: Meta = {
  title: 'Blog/Layout Components',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Blog-specific layout components using Liquid Glass design system.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BlogPostCard: Story = {
  render: () => (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="max-w-md mx-auto">
        <GlassCard variant="medium" interactive>
          <GlassCardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Tag className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <GlassCardTitle className="text-lg">
                    Advanced React Patterns
                  </GlassCardTitle>
                  <div className="flex items-center gap-2 text-sm text-white/60 mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>March 15, 2024</span>
                    <Clock className="w-3 h-3 ml-2" />
                    <span>8 min read</span>
                  </div>
                </div>
              </div>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                Tutorial
              </Badge>
            </div>
          </GlassCardHeader>
          <GlassCardContent>
            <GlassCardDescription className="text-white/70 mb-4">
              Dive deep into advanced React patterns including compound components, render props,
              and custom hooks. Learn how to build scalable and maintainable React applications.
            </GlassCardDescription>
            <div className="flex gap-2 mb-4">
              <Badge variant="outline" className="text-xs border-white/30 text-white/60">React</Badge>
              <Badge variant="outline" className="text-xs border-white/30 text-white/60">JavaScript</Badge>
              <Badge variant="outline" className="text-xs border-white/30 text-white/60">Frontend</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-white/60">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>24</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>5</span>
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </div>
              </div>
              <Button 
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Read More
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </GlassCardContent>
        </GlassCard>
      </div>
    </div>
  ),
};

export const AuthorCard: Story = {
  render: () => (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="max-w-sm mx-auto">
        <GlassCard variant="medium">
          <GlassCardHeader className="text-center">
            <Avatar className="h-16 w-16 mx-auto mb-4">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg">
                JD
              </AvatarFallback>
            </Avatar>
            <GlassCardTitle className="text-xl mb-2">John Doe</GlassCardTitle>
            <GlassCardDescription className="text-white/70">
              Senior Frontend Developer
            </GlassCardDescription>
          </GlassCardHeader>
          <GlassCardContent>
            <p className="text-white/60 text-sm mb-4 text-center">
              Passionate about React, TypeScript, and modern web development. 
              Building scalable applications for the next generation of the web.
            </p>
            <div className="flex gap-2 justify-center mb-4">
              <Badge variant="outline" className="text-xs border-white/30 text-white/60">React Expert</Badge>
              <Badge variant="outline" className="text-xs border-white/30 text-white/60">TypeScript</Badge>
            </div>
            <div className="flex gap-2 justify-center">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300"
              >
                Follow
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300"
              >
                Message
              </Button>
            </div>
          </GlassCardContent>
        </GlassCard>
      </div>
    </div>
  ),
};

export const CategoryGrid: Story = {
  render: () => (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Blog Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'React', count: 24, color: 'blue', icon: '⚛️' },
            { name: 'TypeScript', count: 18, color: 'green', icon: '📘' },
            { name: 'Next.js', count: 15, color: 'purple', icon: '🚀' },
            { name: 'CSS', count: 22, color: 'pink', icon: '🎨' },
            { name: 'JavaScript', count: 31, color: 'yellow', icon: '⚡' },
            { name: 'Web Dev', count: 28, color: 'cyan', icon: '🌐' },
          ].map((category) => (
            <GlassCard key={category.name} variant="medium" interactive>
              <GlassCardContent className="p-6 text-center">
                <div className="text-3xl mb-3">{category.icon}</div>
                <GlassCardTitle className="text-lg mb-2">
                  {category.name}
                </GlassCardTitle>
                <p className="text-white/60 text-sm mb-3">
                  {category.count} articles
                </p>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300"
                >
                  Explore
                </Button>
              </GlassCardContent>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const NewsletterSignup: Story = {
  render: () => (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen flex items-center">
      <div className="max-w-md mx-auto w-full">
        <GlassCard variant="medium">
          <GlassCardHeader className="text-center">
            <div className="text-4xl mb-4">📧</div>
            <GlassCardTitle className="text-xl mb-2">
              Stay Updated
            </GlassCardTitle>
            <GlassCardDescription className="text-white/70">
              Get the latest articles and tutorials delivered to your inbox.
            </GlassCardDescription>
          </GlassCardHeader>
          <GlassCardContent>
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-2 focus:ring-white/20 rounded-md focus:outline-none"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-2 focus:ring-white/20 rounded-md focus:outline-none"
                />
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Subscribe Now
              </Button>
              <p className="text-xs text-white/50 text-center">
                Unsubscribe at any time. No spam, ever.
              </p>
            </div>
          </GlassCardContent>
        </GlassCard>
      </div>
    </div>
  ),
};