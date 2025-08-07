# Project Structure

## アーキテクチャ原則

CC-Deckは**Kiro SDD（Specification-Driven Development）**を中核とした階層型アーキテクチャを採用しており、以下の設計原則に基づいています：

### 1. 仕様駆動設計
- すべての機能は`.kiro/specs/`での仕様定義から開始
- 実装前の包括的な要件分析と設計検討
- 仕様・実装・テストの完全なトレーサビリティ

### 2. マルチエージェント協調
- 専門特化されたサブエージェントによる分業
- `/orchestrator`による インテリジェントなワークフロー管理
- CC-Deck Workflow Engineによる状態管理

### 3. 品質ファースト
- TDD-Only Policy: すべてのコードは厳格なTDD で開発
- 95%+ テストカバレッジの維持
- 人間承認による品質保証プロセス

## ルートディレクトリ構造

```
cc-deck/                      # プロジェクトルート
├── .kiro/                    # Kiro SDD 作業ディレクトリ
│   ├── specs/                # アクティブな機能仕様（※核心）
│   └── steering/             # プロジェクト指針文書
├── .claude/                  # Claude Code 設定
│   ├── agents/               # カスタムサブエージェント定義
│   │   ├── coding/           # 実装系エージェント
│   │   ├── analysis/         # 分析系エージェント  
│   │   └── management/       # 管理系エージェント
│   └── commands/             # カスタムスラッシュコマンド
├── .cc-deck/                 # CC-Deck Workflow Engine
│   ├── workflows/            # YAML ワークフロー定義
│   └── context/              # 永続状態管理
├── docs/                     # プロジェクトドキュメント
│   ├── claude-code/          # Claude Code 専用ガイド
│   └── kiro/                 # Kiro SDD 参考資料・例
├── package.json              # Node.js プロジェクト設定
├── CLAUDE.md                 # メインプロジェクト指示書
└── README.md                 # プロジェクトワークフロー概要
```

## コード組織パターン

### Kiro SDD 仕様構造
```
.kiro/specs/{feature}/        # 機能別仕様ディレクトリ
├── README.md                 # 機能概要・要件定義
├── tasks.md                  # 実装タスク・進捗管理（※重要）
├── DESIGN.md                 # 技術設計・アーキテクチャ
├── API.md                    # API仕様・インターフェース定義
├── TEST.md                   # テスト戦略・受入条件
└── CHANGELOG.md              # 変更履歴・バージョン管理
```

### 機能実装構造
```
{feature}/                    # 実装コードベース
├── src/                      # ソースコード
│   ├── components/           # UIコンポーネント
│   ├── services/             # ビジネスロジック
│   ├── utils/                # ユーティリティ関数
│   └── types/                # 型定義
├── tests/                    # テストコード
│   ├── unit/                 # ユニットテスト
│   ├── integration/          # 統合テスト
│   └── e2e/                  # E2Eテスト
├── docs/                     # 機能別ドキュメント
└── package.json              # 機能別依存関係
```

## ファイル命名規則

### 基本原則
- **kebab-case**: ディレクトリ・設定ファイルは小文字ハイフン区切り
- **PascalCase**: React コンポーネント・TypeScript型定義
- **camelCase**: JavaScript/TypeScript関数・変数
- **SCREAMING_SNAKE_CASE**: 定数・環境変数

### 具体例
```
# ディレクトリ
user-authentication/
blog-management/
api-integration/

# ファイル
UserProfile.tsx              # React コンポーネント
userService.ts               # サービスクラス
api-client.ts                # API クライアント
constants.ts                 # 定数定義
user-profile.test.ts         # テストファイル
```

### 特殊ファイル
```
README.md                    # 各ディレクトリの概要
CLAUDE.md                    # Claude Code プロジェクト指示
tasks.md                     # Kiro SDD タスク管理
DESIGN.md                    # 技術設計書
API.md                       # API 仕様書
```

## インポート設定

### 絶対パス設定
```typescript
// tsconfig.json または jsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@services/*": ["src/services/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"]
    }
  }
}
```

### インポート順序
```typescript
// 1. 外部ライブラリ
import React from 'react';
import axios from 'axios';

// 2. 内部モジュール（絶対パス）
import { UserService } from '@services/userService';
import { ApiClient } from '@utils/api-client';

// 3. 相対パス（同一階層）
import './ComponentName.css';
import { helperFunction } from './helpers';
```

## 開発ガイドライン

### TDD開発プロセス
1. **Red**: 失敗するテストを先に作成
2. **Green**: テストを通す最小限の実装
3. **Refactor**: コード品質向上とリファクタリング
4. **Repeat**: 機能完成まで繰り返し

### Git ブランチ戦略
```bash
main                         # 本番対応ブランチ
├── feature/{feature-name}   # 機能開発ブランチ
├── bugfix/{issue-number}    # バグ修正ブランチ
├── hotfix/{critical-fix}    # 緊急修正ブランチ
└── refactor/{improvement}   # リファクタリングブランチ
```

### コミットメッセージ規則
```bash
feat: add user authentication system
fix: resolve login validation bug  
refactor: optimize database queries
test: add unit tests for user service
docs: update API documentation
style: format code with prettier
```

## エージェント協調パターン

### 階層型エージェント構造
```
/orchestrator                # メインオーケストレーター
├── serena-onboarding        # プロジェクト初期化
├── kiro-spec-init           # 仕様初期化
├── tdd-agent                # TDD実装（必須）
├── implementation-agent     # コード実装
├── refactoring-agent        # コード改善
└── review-agent             # コードレビュー
```

### ワークフローパターン
1. **仕様駆動フロー**: 仕様 → 設計 → TDD実装 → レビュー
2. **リファクタリングフロー**: 分析 → 改善案 → TDD実装 → 検証
3. **機能追加フロー**: 既存分析 → 仕様拡張 → 実装 → 統合テスト

## 品質保証体制

### 自動化チェック
- **Pre-commit hooks**: コード品質・形式チェック  
- **CI/CD pipeline**: 自動テスト・ビルド・デプロイ
- **Security scanning**: 脆弱性・ライセンスチェック

### 人間承認プロセス
- **仕様レビュー**: ステークホルダーによる要件確認
- **設計レビュー**: 技術リードによるアーキテクチャ検討
- **実装レビュー**: コードレビューとQA確認
- **リリース承認**: プロダクトオーナー最終判断

### 継続的改善
- **技術的負債管理**: 定期的なリファクタリング計画
- **パフォーマンス監視**: メトリクス収集と最適化
- **セキュリティ更新**: 定期的な依存関係アップデート

## 設定ファイル管理

### 環境別設定
```
config/
├── development.json         # 開発環境設定
├── staging.json             # ステージング環境設定
├── production.json          # 本番環境設定
└── test.json                # テスト環境設定
```

### 機密情報管理
```bash
.env                         # 環境変数（Git対象外）
.env.example                 # 環境変数テンプレート
.gitignore                   # Git除外ファイル
```

この構造により、Kiro SDD プロセスを通じた高品質で保守性の高いソフトウェア開発を実現します。