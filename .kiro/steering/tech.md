# Technology Stack

## Architecture
Next.js 15を基盤としたモダンなフルスタックアーキテクチャ。SSG（Static Site Generation）とISR（Incremental Static Regeneration）を活用した高性能ファッションブログプラットフォーム。モバイルファーストの視覚的に魅力的なUIと高速なコンテンツ配信に最適化されたスタック構成。

## Frontend Framework
- **Next.js**: 15.x (App Router, Server Components)
- **React**: 19.x with TypeScript 5.x
- **State Management**: Zustand + React Query (TanStack Query)
- **Styling**: Tailwind CSS 4 + Styled Components
- **Animation**: Framer Motion + CSS Animations
- **Image Handling**: Next.js Image + Cloudinary
- **UI Components**: Radix UI + Custom Fashion Components
- **Form Management**: React Hook Form + Zod validation
- **Testing**: Vitest + React Testing Library + Playwright
- **Linting**: ESLint + Prettier + TypeScript strict mode

## Content Management & Data
- **CMS**: Headless CMS (Contentful/Sanity) + Git-based workflow
- **Blog Content**: MDX files with frontmatter metadata for fashion articles
- **User Generated Content**: PostgreSQL + S3 for user style posts
- **Search**: Algolia for content and product search
- **Analytics**: Vercel Analytics + Google Analytics 4 + Fashion-specific metrics
- **Database**: PostgreSQL (Supabase) for user profiles, comments, follows
- **File Storage**: AWS S3 + Cloudinary for optimized fashion image delivery
- **Push Notifications**: Web Push API for sale alerts and new content

## E-commerce & Social Integration
- **Affiliate Management**: Custom affiliate link management system
- **Price Tracking**: Third-party APIs for real-time price comparison
- **Social Authentication**: NextAuth.js (Google, Instagram, TikTok)
- **Image Upload**: Direct S3 upload with client-side compression
- **Real-time Features**: Pusher for live comments and reactions
- **Email Service**: SendGrid for newsletters and notifications

## Development Environment
- **Package Manager**: pnpm (高速、ディスク効率)
- **Node.js**: v20+ (LTS)
- **Development Server**: Next.js dev server with Turbopack
- **Hot Reload**: Next.js Fast Refresh
- **Mobile Testing**: Browser DevTools + Real device testing
- **Design System**: Storybook for component development

## Common Commands

### 初期セットアップ
```bash
# Next.js 15プロジェクト作成 (App Router + TypeScript)
npx create-next-app@latest fashionable-girls-blog --typescript --tailwind --app
cd fashionable-girls-blog

# 依存関係インストール
pnpm install

# ファッションブログ専用依存関係追加
pnpm add framer-motion @tailwindcss/typography next-mdx-remote
pnpm add @radix-ui/react-dialog @radix-ui/react-dropdown-menu
pnpm add react-hook-form @hookform/resolvers zod
pnpm add @supabase/supabase-js next-auth
pnpm add pusher-js cloudinary
pnpm add -D @next/mdx @types/mdx vitest @vitejs/plugin-react
```

### 開発・テスト・ビルド
```bash
# 開発サーバー起動（Turbopack使用）
pnpm dev --turbo

# Storybook起動（コンポーネント開発）
pnpm storybook

# 本番ビルド（静的最適化）
pnpm build

# 本番確認（ローカル）
pnpm start

# テスト実行（Vitest + Playwright）
pnpm test
pnpm test:e2e

# モバイルテスト（デバイス別）
pnpm test:mobile

# コード品質チェック
pnpm lint
pnpm lint:fix
pnpm type-check
```

### ファッションブログ専用コマンド
```bash
# 新記事テンプレート生成
pnpm generate:article "spring-fashion-trends-2024"

# 画像最適化バッチ処理
pnpm optimize:images

# コンテンツ検証（MDX、画像、リンク）
pnpm validate:content

# アフィリエイトリンク検証
pnpm validate:affiliate-links

# SEO監査
pnpm audit:seo
```

### デプロイ・運用
```bash
# Vercel本番デプロイ
vercel --prod

# 静的エクスポート（CDN配信用）
pnpm export

# データベースマイグレーション
pnpm db:migrate

# キャッシュクリア
pnpm cache:clear
```

## Environment Variables
開発・本番環境設定（`.env.local`、`.env.production`）:
```bash
# Next.js基本設定
NEXT_PUBLIC_SITE_URL=https://fashionable-girls-blog.vercel.app
NEXT_PUBLIC_SITE_NAME=Fashionable Girls Blog

# CMS設定
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token

# データベース（Supabase）
DATABASE_URL=your_supabase_postgres_url
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# 認証（NextAuth.js）
NEXTAUTH_URL=https://fashionable-girls-blog.vercel.app
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_oauth_id
GOOGLE_CLIENT_SECRET=your_google_oauth_secret
INSTAGRAM_CLIENT_ID=your_instagram_app_id
INSTAGRAM_CLIENT_SECRET=your_instagram_app_secret

# 画像・ファイル管理
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
AWS_S3_BUCKET_NAME=your_s3_bucket
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key

# 検索・解析
NEXT_PUBLIC_ALGOLIA_APP_ID=your_algolia_app_id
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your_search_key
ALGOLIA_ADMIN_KEY=your_admin_key
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# リアルタイム機能
PUSHER_APP_ID=your_pusher_app_id
PUSHER_KEY=your_pusher_key
PUSHER_SECRET=your_pusher_secret
PUSHER_CLUSTER=your_pusher_cluster

# メール・通知
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@fashionable-girls-blog.com

# アフィリエイト・E-commerce
RAKUTEN_AFFILIATE_ID=your_rakuten_id
AMAZON_ASSOCIATE_TAG=your_amazon_tag
PRICE_API_KEY=your_price_comparison_api_key
```

## Port Configuration
- **Development Server**: 3000 (Next.js default)
- **Storybook**: 6006 (コンポーネント開発)
- **Test Server**: 3001 (E2Eテスト用)
- **Database Local**: 5432 (PostgreSQL)

## Architecture Decisions

### Next.js 15 App Router選択理由
- **Server Components**: 優れたパフォーマンスとSEO最適化（ファッション記事の検索可視性）
- **Static Generation**: ブログコンテンツの高速配信
- **Image Optimization**: 自動画像最適化とWebP変換（ファッション写真の高速表示）
- **Built-in Performance**: Core Web Vitalsの自動最適化（モバイル体験向上）

### Mobile-First Design選択理由
- **ターゲット行動**: 10-20代女性の90%以上がスマートフォンでファッション情報を閲覧
- **SNS連携**: Instagram、TikTok等のモバイルプラットフォームとの親和性
- **コンテンツ消費**: 通勤・通学時間での記事閲覧に最適化
- **写真体験**: 縦型画像とスワイプ操作に特化した設計

### Headless CMS + MDX選択理由
- **編集体験**: ファッションエディターに最適化されたビジュアル重視の編集環境
- **画像管理**: 大量のファッション写真の効率的な管理とCDN配信
- **SEO最適化**: 構造化データとメタデータの自動生成
- **コンテンツ戦略**: 多様なコンテンツタイプ（記事、ギャラリー、商品レビュー）への対応

### Real-time Features選択理由
- **エンゲージメント**: リアルタイムコメントとリアクションによるコミュニティ活性化
- **通知システム**: セール情報やトレンドアラートの即座配信
- **ソーシャル体験**: フォロー機能と活動フィードのリアルタイム更新
- **ユーザー維持**: プッシュ通知による再訪問促進

### TypeScript Strict Mode選択理由
- **型安全性**: ユーザーデータとコンテンツの整合性保証
- **開発効率**: 大規模なコンテンツ管理での開発生産性向上
- **品質保証**: コンパイル時エラー検出とランタイムエラー削減
- **チーム開発**: 複数エディターとの協業での一貫したAPI設計

## Fashion-Specific Technical Requirements

### Image Optimization Strategy
- **Fashion Photography**: 高解像度ファッション写真の効率的配信
- **Multiple Formats**: WebP, AVIF対応による転送量削減
- **Responsive Images**: デバイス別最適サイズの自動配信
- **Lazy Loading**: スクロール連動の段階的画像読み込み
- **Compression**: 品質を保った圧縮による高速表示

### Mobile Performance Optimization
- **Critical CSS**: Above-the-fold写真の優先ロード
- **Bundle Splitting**: ページ別JavaScriptの分割読み込み
- **Prefetching**: ユーザー行動予測による先読み機能
- **Offline Support**: PWA対応による一部コンテンツのオフライン閲覧

### Social Media Integration
- **Open Graph**: 各SNSプラットフォーム最適化画像の自動生成
- **Share Optimization**: プラットフォーム別シェア体験の最適化
- **Embed Support**: Instagram、TikTok投稿の記事内埋め込み
- **User Generated Content**: ユーザー投稿写真の安全な取り込み機能

### E-commerce Integration
- **Real-time Pricing**: 複数ECサイトの価格情報リアルタイム取得
- **Deep Linking**: 商品ページへの直接遷移最適化
- **Conversion Tracking**: アフィリエイト成果の詳細追跡
- **Inventory Sync**: 在庫状況のリアルタイム反映

### SEO & Content Discovery
- **Fashion Keywords**: ファッション専門用語の検索最適化
- **Seasonal SEO**: シーズントレンドに合わせたSEO戦略
- **Image SEO**: ファッション写真のalt text自動生成
- **Local SEO**: 地域別トレンド情報の最適化

## Browser Support Strategy
- **Modern Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Desktop Support**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Progressive Enhancement**: 古いブラウザでの基本機能保証
- **Feature Detection**: 写真機能やプッシュ通知の段階的対応

この技術スタックは、ファッションに敏感な若い女性ユーザーのモバイル中心の利用パターンと、視覚的に豊富なコンテンツの効率的配信に最適化されています。