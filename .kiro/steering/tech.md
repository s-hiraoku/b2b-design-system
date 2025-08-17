# Technology Stack

## Architecture
Next.js 15を基盤とした最新のフルスタックアーキテクチャ。高品質なアート画像の表示に最適化されたSSG（Static Site Generation）とISR（Incremental Static Regeneration）を活用し、日本の美学原理（間・侘寂・簡素）を反映したミニマルで洗練されたアート体験プラットフォーム。

## Frontend Framework
- **Next.js**: 15.x (App Router, Server Components)
- **React**: 19.x with TypeScript 5.x
- **State Management**: Zustand + React Query (TanStack Query)
- **Styling**: Tailwind CSS 4 with Japanese aesthetics custom theme
- **Animation**: Framer Motion + CSS Animations (Ma - 間の表現)
- **Image Handling**: Next.js Image + Sharp + Cloudinary (高品質アート画像)
- **UI Components**: Radix UI + shadcn/ui + Custom Art Components
- **3D Rendering**: Three.js + React Three Fiber (バーチャル展示)
- **Form Management**: React Hook Form + Zod validation
- **Testing**: Vitest + React Testing Library + Playwright
- **Linting**: ESLint + Prettier + TypeScript strict mode

## Content Management & Media
- **CMS**: Sanity Studio with custom art schemas + Git-based workflow
- **Blog Content**: MDX files with art-specific frontmatter metadata
- **Art Assets**: PostgreSQL + Cloudinary for optimized art image delivery
- **Gallery Management**: Custom gallery engine with zoom, lightbox, IIIF support
- **Video Content**: Cloudinary Video + adaptive streaming for tutorials
- **Search**: Algolia with art-specific indexing and visual search
- **Analytics**: Vercel Analytics + Custom art engagement tracking
- **Database**: PostgreSQL (Supabase) for user profiles, collections, comments
- **File Storage**: Cloudinary + AWS S3 for high-resolution art assets
- **Real-time Features**: Pusher for live gallery tours and discussions

## Art-Specific Technologies
- **Color Analysis**: Canvas API + TinyColor2 for palette extraction
- **Image Zoom**: React Image Gallery + Pan/Zoom controls
- **Lightbox**: PhotoSwipe 5 for immersive art viewing
- **3D Gallery**: Three.js for virtual exhibition spaces
- **Audio Guide**: Web Audio API + MP3 streaming
- **IIIF Integration**: OpenSeadragon for deep zoom museum-quality viewing
- **AR Features**: WebXR + AR.js for augmented art experiences
- **Print Optimization**: CSS Print styles for art catalog generation

## Development Environment
- **Package Manager**: pnpm (高速、ディスク効率)
- **Node.js**: v20+ (LTS)
- **Development Server**: Next.js dev server with Turbopack
- **Hot Reload**: Next.js Fast Refresh
- **Design System**: Storybook for art component development
- **Visual Testing**: Chromatic for visual regression testing
- **Color Management**: Culori.js for accurate color representation

## Common Commands

### 初期セットアップ
```bash
# Next.js 15 + TypeScript + Tailwind CSS 4プロジェクト作成
npx create-next-app@latest artistic-blog-site --typescript --tailwind --app
cd artistic-blog-site

# 基本依存関係インストール
pnpm install

# アート特化依存関係追加
pnpm add framer-motion @tailwindcss/typography next-mdx-remote
pnpm add @radix-ui/react-dialog @radix-ui/react-dropdown-menu
pnpm add react-hook-form @hookform/resolvers zod
pnpm add @supabase/supabase-js next-auth
pnpm add three @react-three/fiber @react-three/drei
pnpm add photoswipe react-image-gallery tinycolor2
pnpm add openseadragon culori.js
pnpm add -D @next/mdx @types/mdx vitest @vitejs/plugin-react
pnpm add -D @types/three storybook @storybook/nextjs
```

### 開発・テスト・ビルド
```bash
# 開発サーバー起動（Turbopack使用）
pnpm dev --turbo

# Storybook起動（アートコンポーネント開発）
pnpm storybook

# 本番ビルド（画像最適化）
pnpm build

# 本番確認（ローカル）
pnpm start

# テスト実行（Vitest + Playwright）
pnpm test
pnpm test:e2e
pnpm test:visual

# アート画像最適化
pnpm optimize:art-images

# コード品質チェック
pnpm lint
pnpm lint:fix
pnpm type-check
```

### アート専用コマンド
```bash
# 新作品記事テンプレート生成
pnpm generate:artwork "japanese-calligraphy-techniques"

# アート画像バッチ最適化
pnpm optimize:gallery-images

# カラーパレット生成
pnpm extract:color-palette

# IIIFマニフェスト生成
pnpm generate:iiif-manifest

# 3Dギャラリー構築
pnpm build:virtual-gallery

# アートコンテンツ検証
pnpm validate:art-content

# アクセシビリティ監査
pnpm audit:accessibility
```

### デプロイ・運用
```bash
# Vercel本番デプロイ
vercel --prod

# 静的エクスポート（美術館CDN配信用）
pnpm export

# データベースマイグレーション
pnpm db:migrate

# アート画像キャッシュクリア
pnpm cache:clear:images
```

## Environment Variables
開発・本番環境設定（`.env.local`、`.env.production`）:
```bash
# Next.js基本設定
NEXT_PUBLIC_SITE_URL=https://artistic-blog-site.vercel.app
NEXT_PUBLIC_SITE_NAME=Artistic Blog Site

# CMS設定（Sanity）
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_token
SANITY_PREVIEW_SECRET=your_preview_secret

# データベース（Supabase）
DATABASE_URL=your_supabase_postgres_url
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# 認証（NextAuth.js）
NEXTAUTH_URL=https://artistic-blog-site.vercel.app
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_oauth_id
GOOGLE_CLIENT_SECRET=your_google_oauth_secret

# 画像・メディア管理（Cloudinary）
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=art_images

# 検索・解析
NEXT_PUBLIC_ALGOLIA_APP_ID=your_algolia_app_id
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your_search_key
ALGOLIA_ADMIN_KEY=your_admin_key
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# リアルタイム機能（Pusher）
PUSHER_APP_ID=your_pusher_app_id
PUSHER_KEY=your_pusher_key
PUSHER_SECRET=your_pusher_secret
PUSHER_CLUSTER=ap3

# メール・通知
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@artistic-blog-site.com

# アート専用サービス
IIIF_SERVER_URL=https://iiif.artistic-blog-site.com
MUSEUM_API_KEY=your_museum_api_key
ART_METADATA_API=your_art_metadata_api
```

## Port Configuration
- **Development Server**: 3000 (Next.js default)
- **Storybook**: 6006 (アートコンポーネント開発)
- **Test Server**: 3001 (E2Eテスト用)
- **Database Local**: 5432 (PostgreSQL)
- **IIIF Server**: 8080 (画像配信サーバー)

## Architecture Decisions

### Next.js 15 App Router選択理由
- **Server Components**: アート画像の効率的なサーバーサイド最適化
- **Static Generation**: 高品質画像を含むコンテンツの高速配信
- **Image Optimization**: 自動画像最適化とWebP/AVIF変換（美術品の鮮明表示）
- **Core Web Vitals**: アート体験に必要な優れたパフォーマンス指標

### Japanese Aesthetics Design選択理由
- **間（Ma）の実装**: コンポーネント間の適切な余白とレイアウト呼吸
- **侘寂（Wabi-sabi）の表現**: 自然な不完全性と時間の経過を表現するアニメーション
- **簡素（Kanso）の実践**: ミニマルUIによる作品への集中促進
- **季節感の反映**: 四季に応じたカラーパレットとテーマの自動切り替え

### High-Resolution Image Strategy選択理由
- **美術品質の保持**: オリジナル作品の色彩・細部の忠実な再現
- **段階的読み込み**: プログレッシブJPEGによる鑑賞体験の向上
- **IIIF準拠**: 美術館標準の深度ズーム機能と互換性
- **アクセシビリティ**: 視覚的詳細の拡大閲覧サポート

### 3D Virtual Gallery選択理由
- **没入体験**: 物理空間を超えた展示体験の提供
- **国際アクセス**: 地理的制約を超えた美術館・ギャラリー体験
- **教育効果**: インタラクティブな学習環境の構築
- **アーカイブ価値**: デジタル展示の永続的保存

### TypeScript Strict Mode選択理由
- **アート素材の整合性**: 作品メタデータと画像の型安全性保証
- **国際化対応**: 多言語コンテンツの型安全な管理
- **アクセシビリティ**: 支援技術との互換性確保
- **長期保守性**: 美術コンテンツの長期アーカイブ対応

## Art-Specific Technical Requirements

### High-Quality Image Rendering
- **Color Accuracy**: sRGB/P3色空間の正確な表示とキャリブレーション
- **Resolution Preservation**: オリジナル解像度の保持と段階的スケーリング
- **Format Optimization**: WebP/AVIF/JPEG XLによる品質と効率の最適化
- **Deep Zoom**: IIIF準拠のタイル化による詳細閲覧機能
- **Print Quality**: 300dpi相当の印刷品質画像への対応

### Japanese Aesthetic Implementation
- **Ma (間) Spacing**: CSS Grid/Flexboxによる適切な余白の数学的実装
- **Wabi-sabi Animation**: 自然な不規則性を表現するCSS/JS animation
- **Kanso Minimalism**: 不要な装飾を排除したクリーンなインターフェース
- **Seasonal Theming**: 季節ごとの自動カラーパレット変更システム
- **Typography**: 日本語・英語混在文章の美しい組版

### Interactive Art Experience
- **Gesture Controls**: タッチ・マウスによる直感的な作品操作
- **Audio Integration**: 作品解説とBGMの同期再生機能
- **Collaborative Viewing**: リアルタイム共有鑑賞体験
- **Personal Collections**: ユーザー独自のキュレーション機能
- **Social Annotations**: 作品に対するコメント・解釈の共有

### Performance Optimization for Art Content
- **Critical Art Loading**: Above-the-fold作品の優先表示
- **Progressive Enhancement**: 低速回線での段階的品質向上
- **Memory Management**: 大容量画像の効率的メモリ使用
- **CDN Strategy**: 地域別最適化による高速画像配信
- **Offline Gallery**: PWA対応による一部作品のオフライン鑑賞

### Museum Integration Standards
- **IIIF Compatibility**: 国際画像相互運用フレームワーク準拠
- **Dublin Core Metadata**: 美術館標準メタデータスキーマ対応
- **CIDOC-CRM Integration**: 文化遺産概念参照モデル準拠
- **API Standards**: RESTful API + GraphQLによる柔軟なデータ取得
- **Authentication**: 美術館システムとのSSO連携対応

### Accessibility & Internationalization
- **Screen Reader Support**: アート作品の詳細音声説明機能
- **High Contrast Mode**: 視覚的配慮が必要なユーザー向け表示
- **Keyboard Navigation**: マウスを使用しない完全操作対応
- **Multi-language**: 日英中韓対応のアート専門用語翻訳
- **Cultural Context**: 文化的背景を考慮したローカライゼーション

## Browser Support Strategy
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Optimized**: iOS Safari 14+, Chrome Mobile 90+ (Touch art experience)
- **Progressive Enhancement**: WebGL非対応環境での代替表示
- **Color Management**: Wide Color Gamut displayでの正確な色再現
- **Performance Budgets**: 高品質画像を含む3秒以内の初期表示

## Japanese Cultural Integration
- **Font Selection**: 游ゴシック、Noto Sans CJKによる美しい日本語表示
- **Reading Flow**: 縦書き・横書き対応の柔軟なレイアウト
- **Cultural Calendar**: 日本の年中行事・季節感を反映したコンテンツ配信
- **Traditional Color Palette**: 日本の伝統色（藍・朱・金など）のデジタル表現
- **Zen Philosophy**: 禅の思想を反映したシンプルで静寂なユーザー体験

この技術スタックは、アートの美的価値を最大限に引き出し、日本の美学原理をデジタル体験に昇華させ、国際的なアート愛好者に深い感動と学びを提供するプラットフォームの構築を支援します。