# CC-Deck: AI-Driven Development Platform

**Claude Code Deck** - AI 駆動開発プラットフォーム

## 概要

CC-Deck は、Claude Code を中心とした包括的な開発ワークフローを自動化する AI 駆動開発プラットフォームです。Kiro SDD（Specification-Driven Development）プロセスを採用し、要件定義から実装まで一貫した開発体験を提供します。

## ✨ 主要機能

### 🎯 インテリジェント・オーケストレーション

- **自動ワークフロー管理**: プロジェクト状態を自動検出し、適切な次のステップを提案
- **状態ベース実行**: 現在のプロジェクト状態に基づいて最適な開発アクションを選択
- **スマートな委任**: 専門エージェントへのタスク自動振り分け

### 📋 タスクベース開発

- **進捗トラッキング**: `.kiro/specs/{feature}/tasks.md`による詳細な進捗管理
- **段階的実装**: 要件定義 → 設計 → タスク分解 → 実装の構造化されたフロー
- **品質ゲート**: 各フェーズでの承認プロセスによる品質保証

### 🤖 人間承認ワークフロー

- **AI 駆動リスク評価**: 変更内容の自動リスク分析
- **3 段階承認システム**: 低リスク（自動）、中リスク（条件付き）、高リスク（人間必須）
- **学習機能**: 人間の判断パターンを学習し、承認精度を継続的に向上

### 🔍 次のタスク自動検出

- **タスク分析**: .kiro/specs/{feature}/tasks.md の進捗状況を自動分析
- **完了検出**: チェックボックスによるタスク完了の自動判定と品質検証
- **自動進行**: 未完了タスクの自動特定と次の実装ステップの提案

### 🔗 MCP 統合

- **DeepWiki**: GitHub リポジトリの包括的ドキュメント分析
- **Context7**: 最新ライブラリドキュメントの自動取得
- **Serena**: セマンティック解析による高度なコードリファクタリング

### 🤖 専門サブエージェント

現在のプロジェクトには以下の専門エージェントが統合されています：

#### Kiro SDD エージェント

- **Kiro Steering** - プロジェクト操舵文書作成
- **Kiro Spec Init** - 仕様初期化
- **Kiro Spec Requirements** - 要件定義 (EARS 形式)
- **Kiro Spec Design** - 技術設計書作成
- **Kiro Spec Tasks** - 実装タスク生成 (tasks.md)
- **Kiro Spec Status** - 仕様進捗管理
- **Kiro Spec Orchestrator** - 仕様駆動開発統合管理

#### 開発・実装エージェント

- **Coding** - 包括的コーディングワークフロー管理
- **Research Agent** - 技術リサーチ (Web/DeepWiki/Context7)
- **Planning Agent** - 戦略的実装計画策定
- **Implementation Agent** - Serena MCP 統合高品質コード生成
- **Testing Agent** - 包括的テスト戦略実装
- **Documentation Agent** - API 文書・チュートリアル作成
- **TDD Agent** - Test-Driven Development (t-wada 方法論)

#### リファクタリング・品質エージェント

- **Refactoring** - セマンティック解析リファクタリング統合管理
- **Serena MCP Refactoring** - Serena MCP 専用リファクタリング
- **Similarity Refactoring** - 重複コードパターン検出・統合
- **Code Analyzer** - コード構造・依存関係分析
- **Pattern Detector** - 重複・類似パターン特定
- **Quality Validator** - リファクタリング結果品質検証
- **Refactoring Implementer** - 体系的変換実行

#### テスト・品質保証エージェント

- **Integration Test** - 統合テストワークフロー管理
- **Test Strategy Planner** - 統合テスト戦略策定
- **Test Environment Manager** - テスト環境・インフラ管理
- **Test Executor** - テスト実行・監視・リトライ機能
- **Test Reporter** - テスト結果分析・レポート生成
- **E2E Test** - エンドツーエンドテスト最小限対応
- **E2E Test Planner** - E2E テストシナリオ生成
- **E2E Test Runner** - E2E テストファイル・設定生成

#### 承認・品質管理エージェント

- **Acceptance** - 人間承認ワークフロー管理
- **Acceptance Reviewer** - 人間レビュープロセス支援
- **Feedback Analyzer** - 却下フィードバック分析・根本原因特定
- **Phase Coordinator** - フィードバックベース開発フェーズ巻き戻し

#### GitHub 統合・PR エージェント

- **PR Create** - プルリクエスト自動作成統合管理
- **PR Analyzer** - コード変更・影響度分析
- **PR Generator** - 高品質 PR 内容生成
- **PR Validator** - PR 品質検証
- **PR Merge** - 人間承認 PR 安全マージ統合管理
- **Merge Approver** - 人間承認プロセス支援
- **Merge Executor** - 安全 PR 実行・競合解決・ロールバック
- **Post Merge Manager** - マージ後活動・次タスク特定

## 🏗️ アーキテクチャ

CC-Deck は 4 層アーキテクチャを採用しています：

```
┌─────────────────────────────────────────────────────────────┐
│              CC-Deck AI Driven Development システム          │
├─────────────────────────────────────────────────────────────┤
│                        UI・入力層                            │
│  ┌─────────────────┐    ┌─────────────────┐                 │
│  │   README.md     │    │  ユーザー入力   │                 │
│  │ ワークフロー定義  │    │ 自然言語指示     │                 │
│  └─────────────────┘    └─────────────────┘                 │
├─────────────────────────────────────────────────────────────┤
│                     メインコマンド層                         │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                /orchestrator                            │ │
│  │ インテリジェント・オーケストレーター                      │ │
│  │ ・プロジェクト状態自動検出                               │ │
│  │ ・適切なサブエージェントへの委任                         │ │
│  │ ・タスクベース進捗管理                                   │ │
│  │ ・Serena MCP統合コンテキスト管理                        │ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                   専門サブエージェント層                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐  │
│  │   Kiro SDD      │  │  開発・実装      │  │ テスト・品質  │  │
│  │ ・Orchestrator  │  │ ・Coding        │  │ ・Integration│  │
│  │ ・Steering      │  │ ・Research      │  │ ・E2E Test   │  │
│  │ ・Requirements  │  │ ・Planning      │  │ ・TDD        │  │
│  │ ・Design        │  │ ・Implementation│  │ ・Testing    │  │
│  │ ・Tasks         │  │ ・Documentation │  │ ・Acceptance │  │
│  │ ・Status        │  │                │  │              │  │
│  └─────────────────┘  └─────────────────┘  └──────────────┘  │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │ リファクタリング │  │  GitHub統合     │                   │
│  │ ・Refactoring   │  │ ・PR Create     │                   │
│  │ ・Serena MCP    │  │ ・PR Merge      │                   │
│  │ ・Similarity    │  │ ・Analyzer      │                   │
│  │ ・Code Analysis │  │ ・Generator     │                   │
│  │ ・Pattern Detect│  │ ・Validator     │                   │
│  │ ・Quality Valid │  │ ・Post Merge    │                   │
│  └─────────────────┘  └─────────────────┘                   │
├─────────────────────────────────────────────────────────────┤
│                       MCP統合・実行層                        │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐  │
│  │   MCP統合       │  │   出力生成       │  │ 状態管理     │  │
│  │ ・Serena        │  │ ・.kiro/specs/  │  │ ・tasks.md   │  │
│  │ ・DeepWiki      │  │ ・.kiro/steering│  │ ・進捗追跡    │  │
│  │ ・Context7      │  │ ・実装コード     │  │ ・品質ゲート  │  │
│  │ ・Playwright    │  │ ・テスト・文書   │  │ ・ワークフロー │  │
│  └─────────────────┘  └─────────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 クイックスタート

### 基本的な使用方法

1. **メインコマンドを実行**:
   ```bash
   /orchestrator
   ```
2. **プロジェクトを説明**:

   - 新機能の要件や改善したい点を自然言語で記述
   - システムが自動的に適切なワークフローを選択

3. **自動実行**:
   - AI が状態を分析し、必要なタスクを実行
   - 承認が必要な場合は人間に確認を求める

### カスタムスラッシュコマンド

現在利用可能なカスタムコマンド：

- **`/orchestrator`** - インテリジェント・オーケストレーター
  - プロジェクト状態を自動検出し、適切な開発フェーズに移行
  - タスクベース進捗管理とワークフロー継続
  - Serena MCP 統合による高度なコンテキスト管理

### アーカイブ済みコマンド

以下のコマンドは `/orchestrator` に統合されており、直接的な利用は推奨されません：

- `/acceptance` - 人間承認ワークフロー管理
- `/check-issues` - GitHub イシュー分析
- `/coding` - 包括的コーディングワークフロー
- `/create-issues` - GitHub イシュー自動作成
- `/e2e-test` - エンドツーエンドテスト生成
- `/integration-test` - 統合テスト実行
- `/pr-create` - プルリクエスト自動作成
- `/pr-merge` - プルリクエスト安全マージ
- `/refactoring` - セマンティックリファクタリング
- `/spec-driven` - 仕様駆動開発ワークフロー

## 📁 プロジェクト構造

```
cc-deck/
├── .kiro/                    # Kiro SDD作業ディレクトリ
│   ├── specs/               # アクティブな機能仕様
│   └── steering/            # プロジェクト操舵文書
├── docs/                    # プロジェクトドキュメント
│   ├── ARCHITECTURE.md      # アーキテクチャ仕様
│   ├── claude-code/         # Claude Code固有のドキュメント
│   └── kiro/               # Kiro SDD例とリファレンス
├── CLAUDE.md               # プロジェクトコンテキスト
└── README.md              # メインワークフロー
```

## 🔧 開発ワークフロー

CC-Deck は 8 段階の開発プロセスを自動化し、全段階で TDD（Test-Driven Development）を重視します：

1. **プロジェクト分析**: 現在の状態と次のアクションを特定
2. **操舵設定**: プロジェクトの方向性と技術方針を確立
3. **仕様初期化**: 新機能の仕様フレームワークを作成
4. **要件定義**: EARS 形式での詳細な要件記述
5. **技術設計**: アーキテクチャと実装戦略の策定
6. **タスク分解**: TDD 対応の実装可能な粒度でのタスク分割
7. **TDD 実装**: テストファースト・Red-Green-Refactor サイクルでのコード開発
8. **承認・進行**: 品質評価と次ステップの決定

## 🧪 TDD 実践

このプロジェクトでは t-wada 方法論による TDD を重視しています：

### TDD 特徴

- **専用エージェント**: `tdd-agent`による厳格な TDD ガイダンス
- **Red-Green-Refactor**: 妥協のない 3 段階サイクルの実施
- **テストファースト**: すべての実装は失敗テストから開始
- **設計 emergence**: TDD を通じた自然な設計パターンの発見

### TDD 実行方法

```bash
# TDDを使用した機能実装（coding経由でtdd-agentを自動呼び出し）
/orchestrator "Build OAuth2 authentication system using TDD approach"

# 具体的なTDD指示（coding agent がtdd-agentに委任）
/orchestrator "Implement Payment API with strict Red-Green-Refactor cycle"

# TDD統合開発ワークフロー
/orchestrator "Create User Management system with comprehensive TDD and testing"
```

## 🛠️ 技術スタック

- **AI Platform**: Claude Code with Opus 4
- **Development Process**: Kiro SDD (Specification-Driven Development)
- **Integration**: MCP (Model Context Protocol) servers
- **Documentation**: Markdown-based specifications
- **Version Control**: Git with automated GitHub integration
- **Quality Assurance**: Multi-tier approval workflows

## 📖 ドキュメント

詳細なドキュメントは `docs/` ディレクトリにあります：

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)**: システムアーキテクチャの詳細
- **[claude-code/](docs/claude-code/)**: Claude Code 統合ガイド
- **[kiro/](docs/kiro/)**: Kiro SDD 方法論とサンプル

## 🎯 使用例

### 新機能の開発

```bash
# 状態自動検出でのワークフロー継続
/orchestrator

# 具体的な機能開発指示
/orchestrator "ユーザー認証システムにソーシャルログイン機能を追加したい"

# TDD approach での開発
/orchestrator "Build real-time chat system with comprehensive TDD implementation"
```

### 既存コードの改善・リファクタリング

```bash
# パフォーマンス改善・リファクタリング
/orchestrator "APIレスポンス時間を改善し、エラーハンドリングを強化したい"

# コード品質向上
/orchestrator "Refactor authentication module to eliminate code duplication and improve maintainability"

# セマンティック解析による改善
/orchestrator "Analyze and optimize database queries for better performance"
```

### テスト・品質保証

```bash
# 統合テスト実行
/orchestrator "Run comprehensive integration tests for payment system"

# E2E テスト生成
/orchestrator "Generate E2E tests for user registration flow"

# 受け入れテスト・承認ワークフロー
/orchestrator "Setup acceptance testing for authentication feature"
```

### PR・デプロイメント

```bash
# PR作成・マージワークフロー
/orchestrator "Create and merge PR for user-management feature"

# 安全なマージ実行
/orchestrator "Safely merge approved authentication PR with post-merge validation"
```

## 🤝 貢献

CC-Deck は継続的に進化するプラットフォームです。新しいエージェントの開発、ワークフローの改善、ドキュメントの拡充などを通じて、AI 駆動開発の可能性を広げていきます。

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

---

**CC-Deck** - AI と人間の協調による、次世代の開発体験を提供します。
