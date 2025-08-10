# Technology Stack

## Architecture
モダンなフロントエンドフレームワークを使用したSPA（Single Page Application）アーキテクチャ。ローカルストレージによるデータ永続化を採用し、サーバーサイドの依存関係を排除したシンプルな構成。

## Frontend
- **Framework**: React 18 with TypeScript
- **State Management**: React Hooks (useState, useEffect, useReducer)
- **Styling**: CSS Modules または Styled Components
- **Build Tool**: Vite (高速ビルドとHMR)
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier
- **Type Safety**: TypeScript strict mode

## Data Storage
- **Primary**: Browser LocalStorage API
- **Backup**: SessionStorage (fallback)
- **Data Format**: JSON serialization
- **Migration**: Version-aware data migration support

## Development Environment
- **Package Manager**: npm または yarn
- **Node.js**: v18+ (LTS)
- **Development Server**: Vite dev server
- **Hot Reload**: Vite HMR

## Common Commands

### 初期セットアップ
```bash
# プロジェクト作成 (Vite + React + TypeScript)
npm create vite@latest todo-app -- --template react-ts
cd todo-app

# 依存関係インストール
npm install

# 開発用依存関係追加
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D @types/jest vitest jsdom
```

### 開発・テスト
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー（ビルド確認）
npm run preview

# テスト実行
npm run test

# テスト（ウォッチモード）
npm run test:watch

# コード品質チェック
npm run lint
npm run format
```

### デプロイ
```bash
# 本番ビルド
npm run build

# 静的ファイルサーバーでの確認
npm run preview
```

## Environment Variables
開発環境用の設定（`.env.local`）:
```bash
# 開発モード設定
VITE_APP_TITLE=TODO App
VITE_APP_VERSION=1.0.0
VITE_DEV_MODE=true
```

## Port Configuration
- **Development Server**: 5173 (Vite default)
- **Preview Server**: 4173 (ビルド確認用)

## Architecture Decisions

### フロントエンドのみの選択理由
- **シンプルな要件**: 基本的なCRUD操作のみ
- **高速開発**: バックエンドAPIの開発・デプロイ工程を削減
- **コスト効率**: サーバー運用コスト不要
- **オフライン対応**: ローカルストレージによる完全なオフライン動作

### React + TypeScriptの選択理由
- **型安全性**: TypeScriptによるコンパイル時エラー検出
- **保守性**: 豊富なエコシステムと長期サポート
- **開発体験**: 優れたツーリングとHot Reload
- **テストしやすさ**: React Testing Libraryとの親和性

### Viteの選択理由
- **高速ビルド**: esbuildベースの超高速バンドリング
- **モダン開発体験**: ES modules native support
- **設定簡素**: Create React Appと比較して軽量な設定
- **将来性**: 次世代フロントエンドツールチェイン

### LocalStorageの選択理由
- **シンプルさ**: 追加の依存関係なしでデータ永続化
- **高速アクセス**: 同期的なデータ読み書き
- **ブラウザサポート**: モダンブラウザでの広範囲サポート
- **プライバシー**: ユーザーデータがローカルに保存される安全性