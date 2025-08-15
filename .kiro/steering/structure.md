# Project Structure

## Root Directory Organization
```
fashionable-girls-blog/
├── app/                    # Next.js 15 App Router
│   ├── (auth)/             # Authentication route group
│   ├── (main)/             # Main content route group  
│   ├── blog/               # Blog routes and layouts
│   ├── user/               # User profiles and content
│   ├── trends/             # Trend showcase and galleries
│   ├── shopping/           # Shopping guides and reviews
│   └── api/                # API routes (auth, search, affiliate)
├── components/             # React components
│   ├── fashion/            # Fashion-specific components
│   ├── blog/               # Blog-specific components
│   ├── social/             # Social and community components
│   ├── ui/                 # Reusable UI components
│   └── layout/             # Layout components
├── content/                # MDX blog content and data
├── lib/                    # Utility functions and configurations
├── public/                 # Static assets (images, icons)
├── styles/                 # Global styles and theme configuration
├── .kiro/                  # Kiro SDD configuration
├── package.json            # Dependencies and scripts
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## App Router Structure (`app/`)
```
app/
├── globals.css             # Global styles, Tailwind imports, custom fashion styles
├── layout.tsx              # Root layout with responsive navigation
├── page.tsx                # Homepage with featured trends and hero section
├── loading.tsx             # Global loading component with fashion animations
├── not-found.tsx           # 404 page with stylish design
├── error.tsx               # Error boundary with graceful fashion imagery
├── (auth)/                 # Authentication pages route group
│   ├── layout.tsx          # Auth layout (minimal design)
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   └── profile-setup/      # Initial profile setup for new users
├── (main)/                 # Main content route group
│   ├── layout.tsx          # Main layout with full navigation
│   ├── about/              # About page and team
│   ├── contact/            # Contact and collaboration page
│   └── privacy/            # Privacy policy and terms
├── blog/                   # Blog routes
│   ├── layout.tsx          # Blog layout with sidebar and categories
│   ├── page.tsx            # Blog index with post listings and filters
│   ├── [slug]/             # Individual blog post pages
│   │   ├── page.tsx        # Blog post display with social features
│   │   └── loading.tsx     # Post loading skeleton
│   ├── category/           # Category pages
│   │   └── [category]/     # Dynamic category routes (fashion, beauty, lifestyle)
│   ├── author/             # Author profile pages
│   │   └── [author]/       # Dynamic author routes
│   └── search/             # Search results page
├── user/                   # User-related pages
│   ├── layout.tsx          # User layout with profile navigation
│   ├── [username]/         # User profile pages
│   │   ├── page.tsx        # User profile display
│   │   ├── posts/          # User's style posts
│   │   ├── favorites/      # Saved articles and styles
│   │   └── following/      # Following/followers
│   ├── settings/           # User settings
│   │   ├── page.tsx        # Account settings
│   │   ├── profile/        # Profile customization
│   │   ├── privacy/        # Privacy settings
│   │   └── notifications/  # Notification preferences
│   └── upload/             # Style upload page
├── trends/                 # Trend showcase
│   ├── layout.tsx          # Trends layout with filter sidebar
│   ├── page.tsx            # Trending fashion gallery
│   ├── [trend]/            # Individual trend pages
│   │   └── page.tsx        # Detailed trend analysis and styling tips
│   ├── seasonal/           # Seasonal trends
│   │   └── [season]/       # Spring, Summer, Fall, Winter trends
│   └── street-style/       # Street style photography
├── shopping/               # Shopping guides
│   ├── layout.tsx          # Shopping layout with price filters
│   ├── page.tsx            # Shopping guide index
│   ├── reviews/            # Product reviews
│   │   ├── page.tsx        # Review listings
│   │   └── [product]/      # Individual product reviews
│   ├── guides/             # Buying guides
│   │   └── [guide]/        # Category-specific buying guides
│   └── deals/              # Sales and deals aggregation
└── api/                    # API routes
    ├── auth/               # Authentication endpoints
    ├── posts/              # Blog post CRUD operations
    ├── users/              # User management
    ├── uploads/            # Image upload handling
    ├── search/             # Full-text search endpoint
    ├── affiliates/         # Affiliate link management
    ├── notifications/      # Push notification management
    └── analytics/          # Custom analytics tracking
```

## Components Structure (`components/`)
```
components/
├── fashion/                # Fashion-specific components
│   ├── TrendCard.tsx       # Individual trend display cards
│   ├── OutfitGallery.tsx   # Grid layout for outfit photos
│   ├── StyleCollage.tsx    # Pinterest-style image collages
│   ├── ColorPalette.tsx    # Color scheme display for trends
│   ├── SizeGuide.tsx       # Interactive size guide component
│   ├── FitPreview.tsx      # Virtual fit preview component
│   └── StyleQuiz.tsx       # Personal style quiz component
├── blog/                   # Blog-specific components
│   ├── PostCard.tsx        # Blog post preview cards with images
│   ├── PostContent.tsx     # MDX content renderer with fashion styling
│   ├── PostNavigation.tsx  # Previous/next post navigation
│   ├── CategoryFilter.tsx  # Category filtering interface
│   ├── TagCloud.tsx        # Animated tag cloud for fashion topics
│   ├── ShareButtons.tsx    # Social sharing with platform-specific styling
│   ├── RelatedPosts.tsx    # Related articles recommendation
│   └── ReadingProgress.tsx # Reading progress indicator
├── social/                 # Social and community components
│   ├── UserProfile.tsx     # User profile display component
│   ├── FollowButton.tsx    # Follow/unfollow interaction
│   ├── CommentSection.tsx  # Comment thread with moderation
│   ├── LikeButton.tsx      # Like/heart interaction with animations
│   ├── UserAvatar.tsx      # Styled user avatar with status
│   ├── ActivityFeed.tsx    # Real-time activity updates
│   ├── NotificationBell.tsx # Notification dropdown component
│   └── ChatBubble.tsx      # Real-time chat components
├── shopping/               # Shopping and e-commerce components
│   ├── ProductCard.tsx     # Product preview with pricing
│   ├── PriceComparison.tsx # Multi-site price comparison
│   ├── AffiliateLink.tsx   # Styled affiliate links with disclosure
│   ├── WishlistButton.tsx  # Add to wishlist functionality
│   ├── PriceAlert.tsx      # Price drop notification setup
│   ├── ReviewStars.tsx     # Star rating display and input
│   └── SizeSelector.tsx    # Size selection with availability
├── ui/                     # Reusable UI components
│   ├── Button.tsx          # Button variants with fashion styling
│   ├── Input.tsx           # Form input components with validation
│   ├── Card.tsx            # Card component variants
│   ├── Modal.tsx           # Modal component system
│   ├── Tooltip.tsx         # Tooltip with smooth animations
│   ├── Badge.tsx           # Status badges and labels
│   ├── Loader.tsx          # Loading spinners and skeletons
│   ├── SearchBox.tsx       # Search input with autocomplete
│   ├── ImageUpload.tsx     # Drag-and-drop image upload
│   ├── ToggleSwitch.tsx    # Styled toggle switches
│   └── ProgressBar.tsx     # Progress indicators
├── layout/                 # Layout components
│   ├── Header.tsx          # Site header with responsive navigation
│   ├── Footer.tsx          # Site footer with links and social
│   ├── Sidebar.tsx         # Blog/trends sidebar navigation
│   ├── MobileNav.tsx       # Mobile-specific navigation
│   ├── Breadcrumb.tsx      # Breadcrumb navigation
│   ├── TableOfContents.tsx # Auto-generated TOC for posts
│   └── SearchOverlay.tsx   # Full-screen search interface
└── animations/             # Animation components
    ├── FadeInView.tsx      # Intersection observer fade-in
    ├── SlideCarousel.tsx   # Touch-friendly image carousel
    ├── ParallaxImage.tsx   # Parallax scrolling effects
    ├── HoverEffects.tsx    # Interactive hover animations
    └── LoadingSpinner.tsx  # Fashion-themed loading animations
```

## Content Structure (`content/`)
```
content/
├── blog/                   # Blog post MDX files
│   ├── 2024/               # Organized by year
│   │   ├── 01-spring-trends-2024.mdx
│   │   ├── 02-sustainable-fashion-guide.mdx
│   │   ├── 03-budget-styling-tips.mdx
│   │   └── 04-work-wardrobe-essentials.mdx
│   └── meta.json           # Blog metadata and configuration
├── trends/                 # Trend documentation
│   ├── current-trends.json # Current trending items and styles
│   ├── seasonal/           # Seasonal trend reports
│   │   ├── spring-2024.mdx
│   │   ├── summer-2024.mdx
│   │   └── fall-2024.mdx
│   └── street-style/       # Street style collections
│       ├── tokyo-fashion.mdx
│       ├── ny-fashion-week.mdx
│       └── korean-style.mdx
├── shopping/               # Shopping guides and reviews
│   ├── product-reviews/    # Individual product reviews
│   │   ├── zara-blazer-review.mdx
│   │   ├── uniqlo-jeans-guide.mdx
│   │   └── nike-sneaker-comparison.mdx
│   ├── buying-guides/      # Category buying guides
│   │   ├── winter-coat-guide.mdx
│   │   ├── work-bag-selection.mdx
│   │   └── skincare-routine-guide.mdx
│   └── brand-spotlights/   # Brand feature articles
│       ├── sustainable-brands.mdx
│       ├── japanese-brands.mdx
│       └── affordable-luxury.mdx
├── style-guides/           # Style and how-to guides
│   ├── color-coordination/ # Color matching guides
│   ├── body-type-styling/  # Body type specific advice
│   ├── occasion-dressing/  # Event-specific styling
│   └── wardrobe-basics/    # Essential pieces guides
└── data/                   # Structured data
    ├── authors.json        # Author profiles and bios
    ├── categories.json     # Fashion categories and subcategories
    ├── brands.json         # Brand information and affiliate data
    ├── colors.json         # Fashion color palette definitions
    └── tags.json           # Tag definitions and fashion taxonomy
```

## Code Organization Patterns

### Fashion Component Pattern
```typescript
// components/fashion/TrendCard.tsx
interface TrendCardProps {
  trend: {
    id: string;
    title: string;
    description: string;
    images: string[];
    tags: string[];
    season: 'spring' | 'summer' | 'fall' | 'winter';
    popularity: number;
  };
  layout?: 'grid' | 'list' | 'featured';
  onClick?: (trendId: string) => void;
  className?: string;
}

export const TrendCard: React.FC<TrendCardProps> = ({
  trend,
  layout = 'grid',
  onClick,
  className = ''
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <Card 
      className={cn(
        'trend-card overflow-hidden cursor-pointer transition-all duration-300',
        'hover:shadow-lg hover:scale-105',
        layout === 'featured' && 'col-span-2 row-span-2',
        className
      )}
      onClick={() => onClick?.(trend.id)}
    >
      <div className="relative aspect-square">
        <Image
          src={trend.images[0]}
          alt={trend.title}
          fill
          className={cn(
            'object-cover transition-opacity duration-300',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
        />
        <LikeButton 
          isLiked={isLiked}
          onToggle={setIsLiked}
          className="absolute top-2 right-2"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{trend.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{trend.description}</p>
        <div className="flex justify-between items-center">
          <TagList tags={trend.tags} maxDisplay={3} />
          <PopularityIndicator score={trend.popularity} />
        </div>
      </div>
    </Card>
  );
};
```

### Hook Pattern for Fashion Data
```typescript
// lib/hooks/useFashionData.ts
interface FashionDataConfig {
  category?: string;
  season?: string;
  priceRange?: [number, number];
  brands?: string[];
  sortBy?: 'popularity' | 'newest' | 'price' | 'rating';
}

export const useFashionData = (config: FashionDataConfig) => {
  const [data, setData] = useState<FashionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(config);
  
  const { data: fashionItems, isLoading, error } = useQuery({
    queryKey: ['fashion-data', filters],
    queryFn: () => fetchFashionData(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const addToWishlist = useMutation({
    mutationFn: (itemId: string) => addItemToWishlist(itemId),
    onSuccess: () => {
      toast.success('Added to wishlist!');
    },
  });
  
  return {
    items: fashionItems || [],
    loading: isLoading,
    error,
    filters,
    setFilters,
    addToWishlist: addToWishlist.mutate,
  };
};
```

### User Generated Content Pattern
```typescript
// components/social/StyleUpload.tsx
interface StyleUploadProps {
  onUpload: (styleData: StylePostData) => void;
  maxImages?: number;
}

export const StyleUpload: React.FC<StyleUploadProps> = ({
  onUpload,
  maxImages = 5
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleImageUpload = useCallback((acceptedFiles: File[]) => {
    const newImages = [...images, ...acceptedFiles].slice(0, maxImages);
    setImages(newImages);
  }, [images, maxImages]);
  
  const handleSubmit = async () => {
    setIsUploading(true);
    try {
      const uploadedUrls = await uploadImagesToS3(images);
      const styleData: StylePostData = {
        images: uploadedUrls,
        description,
        tags,
        createdAt: new Date(),
      };
      onUpload(styleData);
    } catch (error) {
      toast.error('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <Card className="p-6">
      <ImageUpload
        onFilesAccepted={handleImageUpload}
        maxFiles={maxImages}
        accept="image/*"
        className="mb-4"
      />
      <Input
        placeholder="Describe your style..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-4"
      />
      <TagInput
        tags={tags}
        onTagsChange={setTags}
        suggestions={FASHION_TAGS}
        className="mb-4"
      />
      <Button
        onClick={handleSubmit}
        disabled={images.length === 0 || isUploading}
        className="w-full"
      >
        {isUploading ? 'Uploading...' : 'Share Style'}
      </Button>
    </Card>
  );
};
```

## File Naming Conventions
- **Components**: PascalCase (例: `TrendCard.tsx`, `StyleUpload.tsx`)
- **Pages**: kebab-case for routes (例: `street-style/`, `buying-guides/`)
- **Hooks**: camelCase with "use" prefix (例: `useFashionData.ts`, `useUserProfile.ts`)
- **Utilities**: camelCase (例: `fashionHelpers.ts`, `imageUtils.ts`)
- **Types**: PascalCase with Type suffix (例: `FashionItemType.ts`, `UserProfileType.ts`)
- **Constants**: SCREAMING_SNAKE_CASE (例: `FASHION_CATEGORIES`, `COLOR_PALETTE`)

## Import Organization
```typescript
// 1. Next.js and React imports
import { Metadata } from 'next';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

// 2. Third-party libraries  
import { motion } from 'framer-motion';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

// 3. Internal modules (absolute paths)
import { TrendCard } from '@/components/fashion';
import { useFashionData } from '@/lib/hooks';
import { Button, Card } from '@/components/ui';
import type { FashionItem, StylePost } from '@/types/fashion';

// 4. Relative imports
import './component-styles.css';
```

## Key Architectural Principles

### Component Composition Pattern
- **Fashion-First Design**: すべてのコンポーネントが視覚的魅力とモバイル体験を重視
- **Responsive Grid System**: 複数のデバイスサイズに対応した柔軟なレイアウト
- **Image-Centric Components**: ファッション写真を効果的に表示するコンポーネント設計

### Performance-First Development
- **Image Optimization**: Next.js Imageコンポーネントによる自動最適化
- **Lazy Loading**: スクロール連動でのコンテンツ読み込み
- **Bundle Splitting**: ページ別およびフィーチャー別のJavaScript分割
- **Critical CSS**: Above-the-foldコンテンツの優先スタイリング

### User Experience Focus
- **Mobile-First**: スマートフォンでの使いやすさを最優先
- **Touch Interactions**: スワイプ、ピンチズーム等のタッチジェスチャー対応
- **Visual Feedback**: インタラクションへの即座な視覚的フィードバック
- **Accessibility**: 視覚障害者向けのalt textとキーボードナビゲーション

### Social Features Integration
- **Real-time Updates**: コメント、いいね、フォローのリアルタイム反映
- **User Generated Content**: 安全で簡単なユーザー投稿システム
- **Community Moderation**: 不適切コンテンツの自動検出と人間による審査
- **Social Sharing**: 各SNSプラットフォーム最適化された共有機能

### Content Management Strategy
- **Fashion Taxonomy**: ファッション特有のカテゴリとタグシステム
- **Seasonal Organization**: 季節ごとのコンテンツ整理とアーカイブ
- **Trend Tracking**: トレンドの人気度と持続性の追跡
- **Editorial Calendar**: コンテンツ公開スケジュールとイベント連動

### E-commerce Integration
- **Affiliate Revenue**: 複数のアフィリエイトプログラムとの統合
- **Price Monitoring**: 商品価格の変動追跡とアラート機能
- **Product Discovery**: AI推薦システムによる関連商品提案
- **Purchase Analytics**: 購入傾向とROI分析

### SEO & Discoverability
- **Fashion Keywords**: ファッション専門用語とトレンドキーワードの最適化
- **Image SEO**: ファッション写真のalt textとメタデータ最適化
- **Structured Data**: 商品情報とレビューの構造化データマークアップ
- **Social Media SEO**: Instagram、Pinterest等での検索最適化

この構造は、ファッションに特化したコンテンツ管理と、若い女性ユーザーのモバイル中心の利用パターンに最適化されています。視覚的魅力、ソーシャル機能、そしてコマース統合を核とした現代的なファッションプラットフォームの構築を支援します。