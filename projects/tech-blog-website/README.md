# Tech Blog Website

エンジニア向けの技術ブログWebサイト。記事管理、Markdownエディタ、SEO最適化機能を備えたモダンなブログプラットフォーム。

## 技術スタック

- **フロントエンド**: Next.js 14 + React 18 + TypeScript + Tailwind CSS
- **バックエンド**: Node.js + GraphQL + REST API
- **データベース**: PostgreSQL + Redis + Elasticsearch
- **認証**: OAuth 2.0 + JWT + MFA
- **テスト**: Jest + Playwright + Testing Library
- **デプロイ**: Docker + CI/CD (GitHub Actions)

## プロジェクト構造

```
src/
├── components/     # React components
├── pages/         # Next.js pages
├── api/          # API routes
├── lib/          # Utility libraries
├── styles/       # CSS/styling
├── tests/        # Test files
└── types/        # TypeScript types
```

## 主要機能

- 記事管理: Markdownエディタ、プレビュー、バージョン管理
- ユーザー管理: 役割ベース権限（管理者・執筆者・読者）
- 高度な検索: Elasticsearch活用の全文検索
- コメントシステム: モデレーション機能付き
- SEO最適化: メタデータ自動生成、構造化データ
- レスポンシブデザイン: ダークモード対応
- RSS配信: 自動フィード生成

## 開発

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# テスト実行
npm test

# ビルド
npm run build
```

## 仕様書

関連する仕様書は `.kiro/specs/tech-blog-website/` にあります：
- `requirements.md` - 要件仕様書
- `design.md` - 技術設計書  
- `tasks.md` - 実装タスク