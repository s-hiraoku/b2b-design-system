# Project Structure

## Root Directory Organization
```
liquid-glass-tech-blog/
├── app/                    # Next.js 15 App Router
│   ├── (marketing)/        # Route groups for layout organization  
│   ├── blog/              # Blog routes and layouts
│   ├── showcase/          # Liquid Glass showcase gallery
│   ├── docs/              # Documentation and tutorials
│   └── api/               # API routes (search, analytics)
├── components/            # React components
│   ├── liquid-glass/      # Liquid Glass effect components
│   ├── blog/              # Blog-specific components
│   ├── ui/                # Reusable UI components
│   └── layout/            # Layout components
├── content/               # MDX blog content and data
├── lib/                   # Utility functions and configurations
├── public/                # Static assets
├── styles/                # Global styles and Tailwind config
├── .kiro/                 # Kiro SDD configuration
├── package.json           # Dependencies and scripts
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## App Router Structure (`app/`)
```
app/
├── globals.css            # Global styles and Tailwind imports
├── layout.tsx             # Root layout with Liquid Glass theme
├── page.tsx               # Homepage with hero Liquid Glass effects
├── loading.tsx            # Global loading component
├── not-found.tsx          # 404 page with animated Liquid Glass
├── error.tsx              # Error boundary with glass effects
├── (marketing)/           # Marketing pages route group
│   ├── layout.tsx         # Marketing layout
│   ├── about/             # About page
│   └── contact/           # Contact page
├── blog/                  # Blog routes
│   ├── layout.tsx         # Blog layout with sidebar
│   ├── page.tsx           # Blog index with post listings
│   ├── [slug]/            # Individual blog post pages
│   │   ├── page.tsx       # Blog post display
│   │   └── loading.tsx    # Post loading skeleton
│   ├── category/          # Category pages
│   │   └── [category]/    # Dynamic category routes
│   └── tag/               # Tag pages
│       └── [tag]/         # Dynamic tag routes
├── showcase/              # Liquid Glass showcase
│   ├── layout.tsx         # Showcase layout
│   ├── page.tsx           # Showcase gallery
│   ├── [effect]/          # Individual effect demos
│   │   └── page.tsx       # Interactive effect page
│   └── playground/        # Live effect playground
│       └── page.tsx       # Real-time effect editor
├── docs/                  # Documentation
│   ├── layout.tsx         # Docs navigation layout
│   ├── page.tsx           # Documentation index
│   └── [...slug]/         # Dynamic nested docs routes
└── api/                   # API routes
    ├── search/            # Full-text search endpoint
    ├── og/                # Dynamic OG image generation
    └── revalidate/        # On-demand revalidation
```

## Components Structure (`components/`)
```
components/
├── liquid-glass/          # Core Liquid Glass components
│   ├── LiquidGlassCard.tsx     # Base glass card component
│   ├── LiquidGlassButton.tsx   # Interactive glass buttons
│   ├── LiquidGlassModal.tsx    # Glass modal dialogs
│   ├── LiquidGlassNavbar.tsx   # Navigation with glass effects
│   ├── GlassmorphismText.tsx   # Text with glass backgrounds
│   ├── FluidGradient.tsx       # Animated gradient backgrounds
│   ├── InteractiveGlass.tsx    # Mouse-responsive glass effects
│   └── EffectProvider.tsx      # Context for effect parameters
├── blog/                  # Blog-specific components
│   ├── PostCard.tsx       # Blog post preview cards
│   ├── PostContent.tsx    # MDX content renderer
│   ├── PostNavigation.tsx # Previous/next post navigation
│   ├── CategoryFilter.tsx # Category filtering interface
│   ├── TagCloud.tsx       # Animated tag cloud
│   └── ShareButtons.tsx   # Social sharing with glass styling
├── showcase/              # Showcase components
│   ├── EffectDemo.tsx     # Interactive effect demonstrations
│   ├── CodePreview.tsx    # Syntax-highlighted code display
│   ├── ParameterControls.tsx # Real-time parameter adjustment
│   ├── EffectGallery.tsx  # Grid layout for effects
│   └── LiveEditor.tsx     # Live code editor with preview
├── ui/                    # Reusable UI components
│   ├── Button.tsx         # Base button variants
│   ├── Input.tsx          # Form input components
│   ├── Card.tsx           # Card component variants
│   ├── Modal.tsx          # Modal component system
│   ├── Tooltip.tsx        # Tooltip with glass styling
│   ├── Badge.tsx          # Status badges and labels
│   ├── Loader.tsx         # Loading spinners and skeletons
│   └── SearchBox.tsx      # Search input with autocomplete
├── layout/                # Layout components
│   ├── Header.tsx         # Site header with glass navigation
│   ├── Footer.tsx         # Site footer
│   ├── Sidebar.tsx        # Blog/docs sidebar navigation
│   ├── Breadcrumb.tsx     # Breadcrumb navigation
│   └── TableOfContents.tsx # Auto-generated TOC for posts
└── effects/               # Visual effect utilities
    ├── ParticleSystem.tsx # Particle animations
    ├── GlassOrbs.tsx      # Floating glass orb animations  
    └── BackgroundEffects.tsx # Ambient background effects
```

## Content Structure (`content/`)
```
content/
├── blog/                  # Blog post MDX files
│   ├── 2024/              # Organized by year
│   │   ├── 01-liquid-glass-fundamentals.mdx
│   │   ├── 02-glassmorphism-design-principles.mdx
│   │   └── 03-performance-optimization.mdx
│   └── meta.json          # Blog metadata and configuration
├── showcase/              # Showcase effect definitions
│   ├── effects.json       # Effect metadata and parameters
│   ├── glass-card/        # Individual effect documentation
│   │   ├── index.mdx      # Effect description and guide
│   │   ├── demo.tsx       # Live demo component
│   │   └── variants.json  # Parameter variations
│   └── templates/         # Reusable effect templates
├── docs/                  # Documentation pages
│   ├── getting-started/   # Getting started guides
│   ├── components/        # Component documentation
│   ├── effects/           # Effect implementation guides
│   └── best-practices/    # Design and development best practices
└── data/                  # Structured data
    ├── authors.json       # Author profiles
    ├── categories.json    # Blog categories
    └── tags.json          # Tag definitions and metadata
```

## Code Organization Patterns

### Liquid Glass Component Pattern
```typescript
// components/liquid-glass/LiquidGlassCard.tsx
interface LiquidGlassCardProps {
  variant?: 'subtle' | 'medium' | 'intense';
  blur?: number;
  opacity?: number;
  saturation?: number;
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  variant = 'medium',
  blur = 15,
  opacity = 0.1,
  saturation = 1.8,
  children,
  className = '',
  interactive = false,
  ...props
}) => {
  const glassStyles = useLiquidGlass({
    blur,
    opacity, 
    saturation,
    interactive
  });
  
  return (
    <div 
      className={cn(glassStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
};
```

### Custom Hook Pattern for Effects
```typescript
// lib/hooks/useLiquidGlass.ts
interface LiquidGlassConfig {
  blur: number;
  opacity: number;
  saturation: number;
  interactive?: boolean;
  animation?: 'subtle' | 'flowing' | 'intense';
}

export const useLiquidGlass = (config: LiquidGlassConfig) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const glassStyles = useMemo(() => ({
    backdropFilter: `blur(${config.blur}px) saturate(${config.saturation}) brightness(1.1)`,
    backgroundColor: `rgba(255, 255, 255, ${config.opacity})`,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    ...(config.interactive && {
      transform: `translate3d(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px, 0)`,
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }),
  }), [config, mousePosition]);
  
  return glassStyles;
};
```

### MDX Component Embedding Pattern
```typescript
// lib/mdx-components.tsx
import { LiquidGlassCard, EffectDemo, CodePreview } from '@/components';

export const MDXComponents = {
  // Custom components for interactive content
  LiquidGlassCard,
  EffectDemo,
  CodePreview,
  
  // Enhanced standard components
  h1: ({ children, ...props }) => (
    <h1 className="text-4xl font-bold mb-6 liquid-glass-text" {...props}>
      {children}
    </h1>
  ),
  
  pre: ({ children, ...props }) => (
    <LiquidGlassCard variant="subtle" className="p-4 my-6">
      <pre {...props}>{children}</pre>
    </LiquidGlassCard>
  ),
};
```

## File Naming Conventions
- **Components**: PascalCase (例: `LiquidGlassCard.tsx`)
- **Pages**: kebab-case for routes (例: `glass-effects/`)
- **Hooks**: camelCase with "use" prefix (例: `useLiquidGlass.ts`)
- **Utilities**: camelCase (例: `glassEffects.ts`)
- **Types**: PascalCase with Type suffix (例: `LiquidGlassType.ts`)
- **Constants**: SCREAMING_SNAKE_CASE (例: `GLASS_VARIANTS`)

## Import Organization
```typescript
// 1. Next.js and React imports
import { Metadata } from 'next';
import { useState, useEffect } from 'react';

// 2. Third-party libraries  
import { motion } from 'framer-motion';
import { cn } from 'class-variance-authority';

// 3. Internal modules (absolute paths)
import { LiquidGlassCard } from '@/components/liquid-glass';
import { useLiquidGlass } from '@/lib/hooks';
import type { EffectConfig } from '@/types/effects';

// 4. Relative imports
import './component-styles.css';
```

## Key Architectural Principles

### Component Composition Pattern
- **Atomic Design**: 基本的なLiquid Glass効果から複雑なレイアウトまで段階的構築
- **Props Drilling Prevention**: Context APIとZustandによる状態管理
- **Render Optimization**: React.memoとuseMemoによるパフォーマンス最適化

### Performance-First Development
- **Bundle Splitting**: ルートレベルでのJavaScript分割
- **Effect Lazy Loading**: 必要時にのみLiquid Glass効果を読み込み
- **Image Optimization**: Next.js Imageコンポーネントによる自動最適化

### Type Safety & Developer Experience
- **Strict TypeScript**: 全コンポーネントとエフェクトの型安全性
- **Design Tokens**: Tailwind configによる一貫したデザインシステム
- **Developer Tools**: 開発時のLive effectプレビューとデバッグ支援

### Accessibility & Usability
- **Semantic HTML**: WAI-ARIA準拠のマークアップ
- **Keyboard Navigation**: 全インタラクティブ要素のキーボード対応
- **Reduced Motion**: prefers-reduced-motionメディアクエリ対応
- **Screen Reader Support**: 視覚効果の代替テキストとラベル

### SEO & Content Strategy
- **Static Generation**: ブログコンテンツの事前生成とCDN配信
- **Structured Data**: JSON-LDによる検索エンジン最適化
- **Social Media**: Open Graph/Twitter Cards対応
- **Performance Metrics**: Core Web Vitalsの継続的モニタリング