# Technology Stack

## Architecture
Next.js 15を基盤としたモダンなフルスタックアーキテクチャ。SSG（Static Site Generation）とISR（Incremental Static Regeneration）を活用した高性能ブログプラットフォーム。Liquid Glass エフェクトに最適化されたCSS-in-JSとTailwind CSS 4の組み合わせによる革新的なスタイリング手法。

## Frontend Framework
- **Next.js**: 15.x (App Router, Server Components)
- **React**: 19.x with TypeScript 5.x
- **State Management**: Zustand + React Query (TanStack Query)
- **Styling**: Tailwind CSS 4 + CSS-in-JS (Styled-JSX)
- **Animation**: Framer Motion + Custom CSS Transforms
- **MDX**: Next-MDX-Remote for blog content
- **Testing**: Vitest + React Testing Library + Playwright
- **Linting**: ESLint + Prettier + TypeScript strict mode

## Content Management & Data
- **CMS**: Headless CMS (Contentful/Sanity) + Git-based workflow
- **Blog Content**: MDX files with frontmatter metadata
- **Search**: Algolia または ElasticSearch integration
- **Analytics**: Vercel Analytics + Google Analytics 4
- **Database**: PostgreSQL (Supabase) for dynamic features
- **File Storage**: Cloudinary for optimized image delivery

## Development Environment
- **Package Manager**: pnpm (高速、ディスク効率)
- **Node.js**: v20+ (LTS)
- **Development Server**: Next.js dev server with Turbopack
- **Hot Reload**: Next.js Fast Refresh

## Common Commands

### 初期セットアップ
```bash
# Next.js 15プロジェクト作成 (App Router + TypeScript)
npx create-next-app@latest liquid-glass-tech-blog --typescript --tailwind --app
cd liquid-glass-tech-blog

# 依存関係インストール
pnpm install

# Liquid Glass専用依存関係追加
pnpm add framer-motion @tailwindcss/typography next-mdx-remote
pnpm add -D @next/mdx @types/mdx vitest @vitejs/plugin-react
```

### 開発・テスト・ビルド
```bash
# 開発サーバー起動（Turbopack使用）
pnpm dev --turbo

# 本番ビルド（静的最適化）
pnpm build

# 本番確認（ローカル）
pnpm start

# テスト実行（Vitest + Playwright）
pnpm test
pnpm test:e2e

# コード品質チェック
pnpm lint
pnpm lint:fix
pnpm type-check
```

### Liquid Glass開発専用
```bash
# ライブエフェクト開発モード
pnpm dev:effects

# コンポーネント生成
pnpm generate:component ComponentName

# MDXコンテンツ検証
pnpm validate:content
```

### デプロイ
```bash
# Vercel本番デプロイ
vercel --prod

# 静的エクスポート（GitHub Pages等）
pnpm export
```

## Environment Variables
開発・本番環境設定（`.env.local`、`.env.production`）:
```bash
# Next.js基本設定
NEXT_PUBLIC_SITE_URL=https://liquid-glass-tech-blog.vercel.app
NEXT_PUBLIC_SITE_NAME=Liquid Glass Tech Blog

# CMS設定
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token

# 検索・解析
NEXT_PUBLIC_ALGOLIA_APP_ID=your_algolia_app_id
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your_search_key
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# パフォーマンス最適化
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Port Configuration
- **Development Server**: 3000 (Next.js default)
- **Storybook**: 6006 (コンポーネント開発)
- **Test Server**: 3001 (E2Eテスト用)

## Architecture Decisions

### Next.js 15 App Router選択理由
- **Server Components**: 優れたパフォーマンスとSEO最適化
- **Static Generation**: ブログコンテンツの高速配信
- **Image Optimization**: 自動画像最適化とWebP変換
- **Built-in Performance**: Core Web Vitalsの自動最適化

### Tailwind CSS 4 + CSS-in-JS選択理由
- **Liquid Glass最適化**: カスタムbackdrop-filterとblur効果の簡潔な実装
- **デザインシステム**: 一貫したLiquid Glassトークンとコンポーネント
- **パフォーマンス**: JITコンパイルによる最小限のCSS出力
- **開発体験**: 視覚的フィードバックとリアルタイムプレビュー

### Headless CMS + MDX選択理由
- **柔軟なコンテンツ管理**: 技術記事に最適化されたオーサリング体験
- **バージョン管理**: Git-basedワークフローによるコンテンツバージョニング
- **インタラクティブ要素**: MDX内でのLiveコンポーネント埋め込み
- **SEO最適化**: 構造化データとメタデータの自動生成

### TypeScript Strict Mode選択理由
- **型安全性**: Liquid Glassエフェクトパラメーターの型保証
- **開発効率**: インテリセンスとリファクタリング支援
- **品質保証**: コンパイル時エラー検出とランタイムエラー削減
- **チーム開発**: 一貫したコーディング規約と API設計

### パフォーマンス最適化戦略
- **Critical CSS**: Above-the-foldコンテンツの優先ロード
- **Lazy Loading**: Liquid Glassエフェクトの段階的読み込み
- **Bundle Splitting**: ルートベースでのJavaScript分割
- **Edge Computing**: Vercel Edge Functionsによる地理的最適化

## Liquid Glass技術仕様

### Core Effect Technologies
- **backdrop-filter**: `blur()`, `saturate()`, `brightness()`の組み合わせ
- **CSS Custom Properties**: 動的パラメーター制御
- **CSS Transforms**: 3Dエフェクトとアニメーション
- **Intersection Observer**: パフォーマンス最適化された表示制御

### Browser Support Strategy
- **Modern Browsers**: Chrome 76+, Firefox 103+, Safari 14+
- **Graceful Degradation**: Unsupported browsers用のfallback実装
- **Feature Detection**: CSS.supports()によるランタイム機能チェック
- **Progressive Enhancement**: ベース体験から段階的な機能向上