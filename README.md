# 🚀 CC-Deck: Enterprise AI-Driven Development Platform

**Claude Code を使ったエンタープライズグレード統合開発ワークフローシステム**

## 🎯 概要

CC-Deck は **要件定義から本番デプロイまでの開発プロセス全体** を AI が管理するエンタープライズグレード統合開発プラットフォームです。一つのコマンドで、仕様策定・TDD 実装・品質改善・テスト・PR 作成・承認までの完全な開発フローを自動実行します。

### 🌟 機能

- **🔄 Enterprise-Grade 統合ワークフロー**: 要件定義 → 設計 → 実装 → テスト → デプロイの一貫自動化
- **🤖 37 専門 AI エージェント**: 各工程に特化したエキスパート AI が協働
- **🔴 TDD 統一品質保証**: 全コードが 100%テスト駆動開発で作成（95%+カバレッジ）
- **📊 統一監視・品質保証**: リアルタイム品質監視・予防的アラート・包括的レポート
- **⚡ 高可用性エラーハンドリング**: 自動復旧・チェックポイント・サーキットブレーカー
- **🔒 エンタープライズセキュリティ**: 暗号化・アクセス制御・完全監査証跡

## 🛠️ セットアップ

### 前提条件

- **Claude Code 環境**: このプラットフォーム用に設計
- **Node.js**: 18+ (TypeScript プロジェクト用)

### インストール

```bash
# 1. プロジェクトクローン
git clone https://github.com/your-org/cc-deck.git
cd cc-deck

# 2. 依存関係インストール
npm install

# 3. セットアップ完了！
/orchestrator
```

## 🎮 基本的な使い方

### メインコマンド: `/orchestrator`

最も重要なコマンドです。プロジェクト状況を自動分析し、最適なワークフローを提案・実行します。

```bash
# インテリジェント自動分析
/orchestrator

# 具体的な機能開発
/orchestrator "ユーザー認証システムを作りたい"

# 既存プロジェクトの改善
/orchestrator "パフォーマンスを改善したい"

# GitHub issue ベースの開発
/orchestrator "GitHub issue #123の実装: ユーザー認証システムの追加"
/orchestrator "issue #456で報告されたバグを修正"
```

## 🤔 インテリジェント ワークフロー選択

プロジェクト状況を自動分析し、最適なワークフローを **提案・確認** してから実行します。

### 📊 自動プロジェクト分析の例

```
📊 Project Analysis Complete

Current State:
- Existing projects detected: stylish-cafe-website
- Project files found: package.json, tailwind.config.js, next.config.js
- Kiro specs: 1 active specification
- Code quality: Assessment needed

🎯 Recommended Workflow: REFACTORING
Rationale: 既存プロジェクトが検出されました。新機能追加前に
コード品質評価とベースライン確立から始めることを推奨します。

Alternative Options:
1. CODING - 新機能をすぐに追加（品質評価をスキップ）
2. KIRO-SDD - 大型機能追加用の新仕様を作成
3. TESTING - まず包括的テストに焦点を当てる

❓ Which workflow would you like to execute?
[1] Proceed with REFACTORING (recommended)
[2] Use CODING workflow
[3] Use KIRO-SDD workflow
[4] Use TESTING workflow
[5] Show detailed analysis
```

### 🎯 ワークフロー推奨システム

| プロジェクト状況         | 推奨ワークフロー | 実行内容                             |
| ------------------------ | ---------------- | ------------------------------------ |
| **既存プロジェクト有り** | `REFACTORING`    | コード品質分析 → 改善 → 新機能準備   |
| **未完了タスク有り**     | `CODING`         | TDD 実装継続 → テスト → ドキュメント |
| **新規プロジェクト**     | `KIRO-SDD`       | 要件定義 → 設計 → 実装計画           |
| **品質検証要求**         | `TESTING`        | 統合テスト →E2E→ パフォーマンス検証  |

## 🔄 7 つの専用ワークフロー ✨ UPDATED

各ワークフローは複数の専門 AI エージェントが順次実行し、人間承認を経て次のワークフローに自動進行します。

### 📋 KIRO-SDD ワークフロー

**新規プロジェクト・大型機能の要件定義と設計**

```bash
/kiro-sdd "ECサイトのカート機能"
```

- 要件分析エージェント → 設計エージェント → タスク生成エージェント
- 出力: 要件仕様書、技術設計書、実装タスクリスト

### 🛠️ DEV-ENV-SETUP ワークフロー ✨ NEW

**プロジェクト特化型開発環境の動的構築**

革新的な技術スタック最適化システム。Kiro SDD完了後、プロジェクト固有のMCP SubAgentを自動生成し、開発効率を最大化します。

```bash
/dev-env-setup "Next.js + Vercel + Supabaseプロジェクトの最適化"
```

**🔍 自動検出・最適化技術:**
- **Next.js + Vercel** → `{project}-vercel-agent` + `{project}-nextjs-optimizer` 生成
- **Tailwind CSS** → `{project}-tailwind-helper` 最適化エージェント生成  
- **Supabase** → `{project}-supabase-integration` データベース最適化
- **TypeScript** → `{project}-typescript-enhancer` 型システム最適化

**📊 処理フロー:**
- 仕様分析 → MCP推奨 → ユーザー承認 → 動的エージェント生成 → Coding統合
- 出力: プロジェクト専用MCPエージェント、最適化されたCodingワークフロー

**🚀 効果:** 開発効率3倍向上・MCP統合強化・Dynamic Agent Generation

### 💻 CODING ワークフロー

**TDD 統一開発プロセス（研究 → 設計 → 実装 → テスト → 文書化）**

```bash
/coding "ユーザー認証システムの実装"
```

- リサーチ → 設計 → Serena 環境初期化 → TDD 実装 → 統合 → テスト → 文書化
- 出力: 95%+カバレッジの完全実装、API 仕様書

### 🔧 REFACTORING ワークフロー

**セマンティック解析によるコード品質改善**

```bash
/refactoring "技術的負債の解消とパフォーマンス改善"
```

- パターン検出 → 構造解析 → リファクタリング実行 → 品質検証
- 出力: 改善されたコード、品質メトリクス、変更ログ

### 🧪 TESTING ワークフロー

**包括的テスト戦略（統合・E2E・パフォーマンス）**

```bash
/testing "統合テストとE2Eテストの実装"
```

- テスト戦略策定 → 環境構築 → テスト実行 → レポート生成
- 出力: 統合テスト、E2E テスト、カバレッジレポート

### 📤 PR ワークフロー

**プルリクエスト作成・レビュー・マージ管理**

```bash
/pr "認証機能のPR作成とマージ"
```

- 変更分析 → PR 作成 → 品質検証 → マージ実行 → 後処理
- 出力: 高品質 PR、マージ完了、ブランチクリーンアップ

### ✅ ACCEPTANCE ワークフロー

**ステークホルダー承認・品質保証・プロジェクト完了**

```bash
/acceptance "最終的な機能承認とリリース準備"
```

- レビュー準備 → 人間承認プロセス → フィードバック分析 → 完了処理
- 出力: 承認済み機能、品質証明書、次期開発提案

## 🔄 自動ワークフロー連鎖

承認完了後、ユーザー確認を経て次のワークフローに進行します：

```
KIRO-SDD → [確認] → DEV-ENV-SETUP → [確認] → CODING → [確認] → REFACTORING → [確認] → TESTING → [確認] → PR → [確認] → ACCEPTANCE
   ↓       ASK          ↓          ASK        ↓       ASK         ↓           ASK         ↓       ASK      ↓       ASK       ↓
 要件設計   許可     開発環境構築     許可   TDD実装   許可      品質改善      許可      テスト    許可     PR      許可   最終承認
```

各段階で人間承認を経て、さらに **次ワークフローへの明示的な許可** を求めて進行します。

## 🏗️ プロジェクト構造

```
cc-deck/
├── .cc-deck/                    # CC-Deck Workflow Engine
│   ├── config/
│   │   └── workflows/           # ワークフロー定義（YAML）
│   └── context/                 # Smart Context（状態管理）
├── .claude/
│   ├── commands/                # カスタムスラッシュコマンド (8個)
│   └── agents/                  # 37専門AIエージェント
├── .kiro/                       # Kiro SDD作業ディレクトリ
│   ├── specs/                   # 機能仕様とタスク
│   └── steering/                # プロジェクト指針文書
├── projects/                    # 実装プロジェクト
│   ├── tech-blog-website/       # ブログサイト実装
│   └── stylish-cafe-website/    # カフェサイト実装
└── docs/                        # プロジェクトドキュメント
```

## ⚡ 実行例

### 新規プロジェクト作成

```bash
$ /orchestrator "TODOアプリを作りたい"

📊 Enterprise Analysis: 新規プロジェクト検出
🎯 Recommended: KIRO-SDD (要件定義から)
✅ 要件書・設計書・タスク生成 → 承認 → TDD実装開始
📈 監視: リアルタイム品質メトリクス・予防的アラート有効化
```

### GitHub Issue ベースの開発

```bash
$ /orchestrator "GitHub issue #123の実装: ユーザー認証機能の追加"

📊 Enterprise Analysis: issue #123 内容解析
🎯 Recommended: CODING (機能実装)
✅ TDD実装 → テスト → ドキュメント → PR作成
🔗 Issue連携: 進捗状況をコメントで更新・完了時自動クローズ
```

### 既存プロジェクト改善

```bash
$ /orchestrator "既存サイトのパフォーマンス改善"

📊 Enterprise Analysis: stylish-cafe-website 検出
🎯 Recommended: REFACTORING (品質改善から)
✅ 品質分析→リファクタリング→テスト→PR→承認
🔒 品質保証: 5次元品質評価・統一基準適用
⚡ エラーハンドリング: 6カテゴリ分類・自動復旧戦略
```

### 継続開発

```bash
$ /orchestrator "認証機能の実装を続ける"

📊 Enterprise Analysis: 未完了タスク67%検出
🎯 Recommended: CODING (TDD継続)
✅ 前回の続きから自動継続→完成→テスト→デプロイ
🛡️ セキュリティ: 暗号化・アクセス制御・完全監査証跡
```

## 🎯 主要機能詳細

### インテリジェント分析エンジン

- **既存プロジェクト検出**: `projects/` ディレクトリの自動スキャン
- **プロジェクトファイル認識**: package.json、requirements.txt 等の識別
- **タスク完了状況**: `.kiro/specs/*/tasks.md` のチェックボックス解析
- **品質状態評価**: コードメトリクス、テストカバレッジの分析

### 設計思想

- **単一プロジェクト集中**: 1つのプロジェクトに集中することで高品質を実現
- **シンプルな操作**: 複雑な設定不要で即座に開発開始
- **プロジェクト切り替え**: 必要に応じて明示的なプロジェクト指定

```bash
# プロジェクト指定の例
/orchestrator "tech-blog-website のパフォーマンス改善"
/orchestrator "stylish-cafe-website に新機能追加"
```

### TDD 統一品質保証

- **t-wada 方式**: 厳格な Red-Green-Refactor サイクル
- **Serena MCP 統合**: 高度なコンテキスト理解とコード生成
- **自動テスト生成**: 単体・統合・E2E テストの包括実装
- **95%+カバレッジ**: 妥協のない品質基準

### Enterprise Smart Context システム

- **ワークフロー間連携**: 前段階の成果物を次段階で活用・統一標準による一貫性保証
- **状態永続化**: 中断・再開に対応した進捗管理・チェックポイント自動作成
- **エージェント間通信**: 37 エージェントの効率的な情報共有・コンテキスト暗号化
- **統一監視**: リアルタイムメトリクス・予防的アラート・包括的レポート
- **エラーハンドリング**: 6 カテゴリ分類・自動復旧・サーキットブレーカー

## 📚 詳細ドキュメント

### 技術仕様

- **[Interactive Workflow Guide](docs/design/INTERACTIVE-WORKFLOW.md)**: インテリジェントワークフロー選択システム完全ガイド
- **[System Architecture](docs/design/ARCHITECTURE.md)**: 37 エージェント・6 エンタープライズワークフローの技術仕様
- **[CC-Deck Workflow Engine](docs/design/cc-deck-config.md)**: YAML 定義・統一標準・Smart Context 詳細
- **[Design Documentation Index](docs/design/)**: 全設計書一覧とナビゲーション

### 開発者リソース

- **[Installation Guide](docs/setup/INSTALLATION.md)**: 詳細インストール手順・環境構築
- **[API Reference](docs/API.md)**: 全コマンド・エージェント仕様
- **[Custom Workflow](docs/CUSTOM-WORKFLOW.md)**: 独自ワークフロー作成ガイド
- **[Integration Guide](docs/INTEGRATION.md)**: 既存プロジェクト統合手順

## 🚀 今すぐ始める

### 1 分で体験

```bash
# Claude Code環境で実行
/orchestrator "簡単なTODOアプリを作って"
```

### 既存プロジェクトで試す

```bash
# 既存コードの改善から
/orchestrator "コード品質を改善したい"
```

### 本格的な開発

```bash
# 大型システムの設計から
/orchestrator "ECサイトを一から設計・実装したい"
```

---

## 🔗 参考・謝辞

- **[gotalab/claude-code-spec](https://github.com/gotalab/claude-code-spec)** - Kiro SDD 仕様駆動開発の基盤
- **[t-wada](https://github.com/t-wada)** - TDD 方法論とベストプラクティス
- **[mizchi/similarity](https://github.com/mizchi/similarity)** - コード類似性解析ツール

**ライセンス**: MIT License - 詳細は [ATTRIBUTION.md](ATTRIBUTION.md) 参照
