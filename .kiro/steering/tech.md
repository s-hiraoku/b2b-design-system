# Technology Stack

## アーキテクチャ概要

CC-Deckは**マイクロサービス指向のAI統合開発プラットフォーム**として設計されており、Claude Code、MCP（Model Context Protocol）、Kiro SDD仕様を中核とした分散アーキテクチャを採用しています。

## 核心技術スタック

### AI・言語モデル
- **Claude Code**: メイン開発AI（Sonnet 4モデル）
- **Claude API**: プログラマティックAI連携
- **MCP (Model Context Protocol)**: 外部サービス統合プロトコル

### 開発プラットフォーム
- **Node.js**: >=16.0.0（JavaScriptランタイム）
- **GitHub**: バージョン管理・課題追跡・CI/CD
- **Git**: 分散バージョン管理システム

### MCP統合サーバー
- **DeepWiki**: GitHub リポジトリドキュメント分析
- **Context7**: 最新ライブラリドキュメント取得
- **Serena**: プロジェクトオンボーディング支援
- **Brave Search**: リアルタイム情報検索
- **Playwright**: ブラウザ自動化・テスト

## 開発環境

### 必要ソフトウェア
```bash
# Node.js環境
node --version  # >=16.0.0
npm --version   # Latest LTS

# Git設定
git --version
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Claude Code CLI
claude-code --version
```

### プロジェクト初期化
```bash
# リポジトリクローン
git clone https://github.com/your-username/cc-deck.git
cd cc-deck

# 依存関係インストール
npm install

# Kiro SDD初期化
mkdir -p .kiro/specs .kiro/steering
```

## プロジェクト構成

### ディレクトリ構造
```
cc-deck/
├── .kiro/                    # Kiro SDD作業ディレクトリ
│   ├── specs/                # アクティブな機能仕様
│   └── steering/             # プロジェクト指針文書
├── .claude/                  # Claude Code設定
│   ├── agents/               # カスタムサブエージェント
│   └── commands/             # カスタムスラッシュコマンド
├── .cc-deck/                 # CC-Deckワークフローエンジン
│   ├── workflows/            # YAML ワークフロー定義
│   └── context/              # 永続状態管理
├── docs/                     # プロジェクトドキュメント
│   ├── claude-code/          # Claude Code専用ガイド
│   └── kiro/                 # Kiro SDD参考資料
├── package.json              # Node.js プロジェクト設定
├── CLAUDE.md                 # プロジェクト指示書
└── README.md                 # メインワークフロー
```

## 主要コマンド

### 開発ワークフロー
```bash
# メインオーケストレーター
/orchestrator

# 具体的ワークフロー指定
/orchestrator "kiro-sdd user-authentication"
/orchestrator "coding REST API service"
/orchestrator "refactoring legacy-system"

# 中断されたワークフロー再開
/orchestrator "resume user-authentication"
```

### 状態管理コマンド
```bash
# Kiro SDD状態同期
/sync-status

# エージェント管理
/agents

# ヘルプ表示
/help
```

### 開発支援コマンド
```bash
# Git操作
git status
git add .
git commit -m "feat: implement feature"
git push origin feature-branch

# 品質チェック
npm test           # テスト実行
npm run lint       # コード品質チェック
npm run coverage   # カバレッジ測定
```

## 環境変数

### 基本設定
```bash
# Node.js設定
NODE_ENV=development
NODE_OPTIONS="--max-old-space-size=4096"

# GitHub統合（オプション）
GITHUB_TOKEN=your_github_token
GITHUB_USERNAME=your_username
GITHUB_REPOSITORY=cc-deck

# Claude API（オプション）
CLAUDE_API_KEY=your_api_key
```

### MCP設定
```json
{
  "mcpServers": {
    "deepwiki": {
      "command": "npx",
      "args": ["@deepwiki/mcp-server"],
      "env": {}
    },
    "context7": {
      "command": "npx", 
      "args": ["@context7/mcp-server"],
      "env": {}
    }
  }
}
```

## ポート設定

### 開発サーバー
- **3000**: メインアプリケーション開発サーバー
- **3001**: テストサーバー・E2Eテスト用
- **8080**: ドキュメントサーバー（オプション）

### MCP サーバー
- **自動割り当て**: MCPサーバーは自動的にポート割り当て
- **ログ確認**: Claude Code内でMCP接続状況確認可能

## 品質・セキュリティ

### コード品質
- **ESLint**: JavaScript/TypeScript静的解析
- **Prettier**: コードフォーマット自動化
- **Husky**: Git フック管理
- **Jest**: ユニットテストフレームワーク

### セキュリティ
- **npm audit**: 依存関係脆弱性チェック
- **GitHub Security**: 自動セキュリティアラート
- **環境変数分離**: 機密情報の適切な管理

## パフォーマンス最適化

### 開発効率
- **Hot Reload**: 開発時自動リロード
- **Incremental Build**: 差分ビルド最適化
- **Cache Strategy**: 適切なキャッシュ戦略

### AI応答最適化
- **Context窓最適化**: 効率的なコンテキスト管理
- **並列処理**: 複数MCPサーバー同時利用
- **結果キャッシュ**: 頻繁なクエリの結果保存

## トラブルシューティング

### よくある問題
```bash
# Node.js バージョン確認
node --version

# MCPサーバー再起動
claude-code restart

# Kiro SDD状態リセット
rm -rf .cc-deck/context/
/orchestrator
```

### ログ確認
- **Claude Code**: 内蔵ログビューアで詳細確認
- **Git**: `git log --oneline`で最近のコミット確認
- **npm**: `npm run test -- --verbose`で詳細テスト結果