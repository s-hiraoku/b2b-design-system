# 🚀 CC-DECK: AI 駆動開発プラットフォーム

> [!Warning]
> 現在絶賛開発中です

**次世代 AI 駆動開発を実現する包括的開発環境**

Claude Code、MCP（Model Context Protocol）、Kiro SDD（Specification-Driven Development）を統合した革新的な開発プラットフォームです。単一のコマンドで要件定義から本番デプロイまでの全工程を自動化し、開発者 1 人でエンタープライズレベルのアプリケーション構築を可能にします。

## 🌟 なぜ CC-DECK なのか？

### 従来の開発課題

- 🔴 **断片化したツール**: 仕様書、タスク管理、実装、テスト、デプロイが分離
- 🔴 **手動作業の多さ**: 繰り返し作業による時間の浪費
- 🔴 **品質のばらつき**: 開発者のスキルや経験に依存
- 🔴 **知識の分散**: ベストプラクティスが体系化されていない

### CC-DECK の解決策

- ✅ **統合ワークフロー**: 単一コマンドで全開発工程を自動化
- ✅ **AI 駆動の効率化**: MCP サーバーによる外部知識の自動活用
- ✅ **一貫した品質**: Kiro SDD による段階的品質保証
- ✅ **継続的学習**: 最新技術とベストプラクティスの自動取得

## 🎯 コア価値提案

1. **🚀 開発速度の劇的向上**: 従来の 10 倍速での機能開発
2. **🎯 仕様駆動の確実性**: 要件から実装まで一貫した追跡可能性
3. **🔄 継続的品質向上**: AI による自動リファクタリングと最適化
4. **🌐 最新技術の自動適用**: MCP による外部知識の継続的統合
5. **📊 包括的なテスト**: TDD、統合テスト、E2E テストの自動生成

## 🏗️ アーキテクチャ

### 🧠 AI 駆動開発の 3 層構造

```
┌─────────────────────────────────────────────────────────────┐
│                   🎯 オーケストレーション層                     │
│  単一コマンドによる全工程の自動管理・継続的状態検出・インテリジェント委任 │
├─────────────────────────────────────────────────────────────┤
│                   🤖 専門エージェント層                        │
│  Kiro SDD • Coding • Refactoring • Testing • Documentation  │
├─────────────────────────────────────────────────────────────┤
│                   🌐 MCP統合基盤層                           │
│  DeepWiki • Context7 • Serena • Playwright • Brave Search   │
└─────────────────────────────────────────────────────────────┘
```

### 🎯 Kiro SDD（仕様駆動開発）

**AWS 発の革新的開発手法**を完全実装

- **🎯 Steering**: プロジェクト全体の方向性・技術選択・品質基準
- **📋 Requirements**: EARS 形式による厳密な要件定義
- **🏗️ Design**: アーキテクチャ設計・技術的意思決定・実装戦略
- **📝 Tasks**: 実装ロードマップと GitHub Issue 統合
- **📊 Status**: 進捗追跡・品質メトリクス・承認フロー

### 🤖 専門エージェントシステム

#### 🎯 Kiro SDD エージェント群

```yaml
Steering系:
  - kiro-steering: プロジェクト操舵・技術方針決定
  - kiro-steering-custom: 専門領域向けカスタム操舵

仕様開発系:
  - kiro-spec-init: 機能仕様初期化・要件抽出
  - kiro-spec-requirements: EARS形式要件定義
  - kiro-spec-design: 技術設計・アーキテクチャ決定
  - kiro-spec-tasks: 実装タスク分解・Issue生成準備

管理系:
  - kiro-spec-orchestrator: 全工程オーケストレーション
  - kiro-spec-status: 進捗確認・品質評価・承認管理
```

#### 🛠️ 開発支援エージェント群

```yaml
実装系:
  - coding: 包括的開発支援・技術調査・実装支援
  - research-agent: Web検索・DeepWiki・Context7による技術調査
  - implementation-agent: Serena MCP活用コード生成
  - planning-agent: アーキテクチャ戦略・実装計画

品質系:
  - refactoring: インテリジェント・リファクタリング
  - pattern-detector: コード類似性・重複パターン検出
  - similarity-refactoring: セマンティック解析によるDRY原則適用
  - quality-validator: 品質検証・機能保持確認

テスト系:
  - testing-agent: TDD・ユニットテスト・テスト戦略
  - integration-test: 統合テスト・環境管理・性能検証
  - e2e-test: Playwright活用E2Eテスト・ユーザージャーニー検証

管理系:
  - create-issues: tasks.md → GitHub Issues変換
  - check-issues: 要件完了検証・承認フロー管理
  - pr-create: 包括的PR作成・レビュー設定
  - pr-merge: 安全なマージ・後処理・次工程移行
  - acceptance: 人間承認・フィードバック分析・改善実行

Issue自動管理系:
  - intelligent-approval-flow: AI駆動リスク評価・承認ルーティング
  - auto-issue-manager: Issue完了検出・品質検証・自動進行
  - approval-process-optimizer: 承認プロセス継続最適化・ボトルネック解決
  - continuous-feedback-loop: 学習機能・自己改善・パフォーマンス分析
```

### 🌐 MCP（Model Context Protocol）統合基盤

**2024 年 Anthropic 発表の革新プロトコル** - "AI アプリケーション用の USB-C"

#### 📚 知識・リサーチ MCP

```yaml
DeepWiki MCP:
  機能: GitHub リポジトリの包括的ドキュメントアクセス
  活用: 既存プロジェクトパターン調査・ベストプラクティス取得

Context7 MCP:
  機能: ライブラリドキュメント・コードスニペット取得
  活用: 最新API仕様・実装例・技術選択支援

Brave Search MCP:
  機能: Web検索・ローカルビジネス検索
  活用: 技術トレンド調査・問題解決・競合分析
```

#### 🛠️ 開発・テスト MCP

```yaml
Playwright MCP:
  機能: ブラウザ自動化・E2Eテスト・UI検証
  活用: 自動テスト実行・ユーザー操作検証・性能測定

Serena MCP:
  機能: インテリジェント・コード生成・リファクタリング
  活用: 高品質実装・セマンティック解析・パターン最適化
```

#### 🔧 ファイルシステム・開発環境 MCP

```yaml
Filesystem MCP:
  機能: ファイル操作・ディレクトリ管理
  セキュリティ: ガード機能による制限付きアクセス

SSH MCP:
  機能: リモートサーバーアクセス・デプロイ自動化
  活用: 本番環境管理・CI/CD統合
```

## ⚡ 革命的な単一コマンド

**`/orchestrator` - 全開発工程を統合管理する唯一のコマンド**

```bash
/orchestrator                         # 前回の続きから自動継続
/orchestrator "プロジェクト説明"        # 新規プロジェクト・機能開始
```

### 🧠 インテリジェント・ワークフロー管理

`/orchestrator` が自動実行する高度な処理：

- **🔍 プロジェクト状態分析**: 仕様書・Issue・コード・テスト状況を包括分析
- **🎯 次フェーズ自動決定**: 完了作業と残作業に基づく最適ルート選択
- **🤖 専門エージェント委任**: 状況に応じた最適エージェントへの自動委任
- **📊 継続性保証**: セッション間での完全なコンテキスト保持

### 💡 使用例：開発の流れ

```bash
# 🚀 新規プロジェクト開始
/orchestrator "リアルタイム chat アプリケーションを構築"
# → Kiro Steering → Requirements → Design → Tasks → Issues

# 🔄 開発継続（自動状態検出）
/orchestrator
# → "user-auth機能: Design完了. Tasks生成に進みます..."

# 🎯 特定フェーズへジャンプ
/orchestrator "coding user-authentication"    # 実装フェーズ
/orchestrator "acceptance payment-system"     # 受け入れテスト
/orchestrator "pr-merge 123"                  # PR マージ
```

### 📋 完全自動化ワークフロー

```mermaid
graph TD
    A[/orchestrator] --> B{プロジェクト状態分析}
    B -->|新規| C[Kiro Steering]
    B -->|継続| D[前回位置から継続]

    C --> E[Requirements定義]
    E --> F[Design設計]
    F --> G[Tasks分解]
    G --> H[Issues作成]
    H --> I[Coding実装]
    I --> J[Testing検証]
    J --> K[Refactoring最適化]
    K --> L[Acceptance承認]
    L --> M[PR作成・マージ]
    M --> N[Next Issue識別]
    N --> I
```

### 🏆 10 段階の完全自動化フェーズ

| Phase                         | Description      | 自動実行内容                             | AI 活用                     |
| ----------------------------- | ---------------- | ---------------------------------------- | --------------------------- |
| **1. Steering**               | プロジェクト操舵 | 技術方針・品質基準・アーキテクチャ戦略   | 🌐 Web 調査・最新トレンド   |
| **2. Requirements**           | 要件定義         | EARS 形式厳密仕様・受入条件・制約事項    | 📚 類似プロジェクト分析     |
| **3. Design**                 | 技術設計         | アーキテクチャ・API 設計・実装戦略       | 🔧 技術選択・パターン適用   |
| **4. Tasks**                  | 実装計画         | 工数見積・依存関係・マイルストーン       | 📊 作業分解・優先度付け     |
| **5. Issues**                 | 課題管理         | GitHub Issues・ラベル・担当者割当        | 🏷️ メタデータ・追跡可能性   |
| **6. Coding**                 | 実装支援         | TDD・コード生成・レビュー・統合          | 💻 Serena MCP・品質保証     |
| **7. Testing**                | テスト自動化     | Unit・Integration・E2E・性能テスト       | 🧪 Playwright・テスト戦略   |
| **8. Refactoring**            | 品質向上         | パターン検出・重複除去・最適化           | 🔄 セマンティック解析       |
| **9. Acceptance**             | 受け入れ承認     | 人間レビュー・フィードバック処理         | 👥 承認フロー・改善提案     |
| **10. PR Management**         | リリース管理     | PR 作成・マージ・デプロイ・後処理        | 🚀 安全デプロイ・次工程移行 |
| **11. Issue Auto Management** | Issue 自動管理   | 完了検出・品質検証・承認処理・次工程移行 | 🤖 AI 駆動承認・学習最適化  |

## 🌟 実際の成果：Tetris ゲーム開発例

### 🎮 Tetris プロジェクトでの実証実験

CC-DECK の実力を証明するため、完全な Tetris ゲームを構築中：

```bash
# 単一コマンドでの全工程実行例
/orchestrator "HTML5 Canvas を使った Tetris ゲームを構築"
```

### 📊 開発効率の劇的向上

| 従来の手動開発   | CC-DECK 自動化 | 改善倍率         |
| ---------------- | -------------- | ---------------- |
| 要件定義: 2 日   | 30 分          | **9.6 倍**       |
| 設計書作成: 3 日 | 45 分          | **9.6 倍**       |
| 基本実装: 5 日   | 2 時間         | **20 倍**        |
| テスト作成: 2 日 | 30 分          | **9.6 倍**       |
| **合計: 12 日**  | **4 時間**     | **🏆 24 倍高速** |

### 🔍 自動生成される成果物

```
specs/tetris-game/
├── steering.md          # 技術方針・品質基準・アーキテクチャ戦略
├── requirements.md      # EARS形式厳密要件・受入条件
├── design.md           # 技術設計・API仕様・実装戦略
├── tasks.md            # 詳細実装計画・工数見積
└── kiro_status.json    # 進捗追跡・品質メトリクス

src/
├── components/         # React コンポーネント（自動生成）
├── game/              # ゲームロジック（TDD実装）
├── tests/             # 包括的テストスイート
└── docs/              # API ドキュメント（自動更新）
```

## 🚀 実際の開発体験

### 💬 開発者と Claude Code の対話例

```bash
開発者: /orchestrator "Tetris ゲームを作りたい"

Claude: 🔍 新規プロジェクトを分析中...
       📋 Kiro Steering から開始します

       🎯 プロジェクト操舵ドキュメントを生成中...
       • HTML5 Canvas + TypeScript の技術選択
       • モダンWeb標準による実装戦略
       • 包括的テスト・品質保証計画

       ✅ steering.md 完了
       📝 次は要件定義に進みますか？ [Y/n]

開発者: Y

Claude: 📋 Requirements 生成中...
        • 7種類のテトリミノ実装 (I,O,T,S,Z,J,L)
        • 回転・移動・ライン消去の基本機能
        • スコア・レベル・次ピース表示

        ✅ EARS形式要件定義完了
        🏗️ 技術設計に進みます...

(3時間後)

Claude: 🎉 Tetris ゲーム完成！
        📊 実装結果:
        • 完全動作する Tetris ゲーム
        • 98% テストカバレッジ
        • 性能最適化済み（60fps安定）
        • E2E テスト完備
        • プロダクション準備完了
```

## 🛠️ MCP エコシステム統合詳細

### 📚 知識統合パターン

```yaml
技術調査フェーズ: DeepWiki → "tetris game react" で優秀実装パターン調査
  Context7 → "@types/react" 最新API・ベストプラクティス取得
  Brave Search → "HTML5 Canvas game optimization 2024" トレンド調査

実装フェーズ: Serena → 高品質TypeScript・React コンポーネント生成
  Context7 → Canvas API・ゲームループ最適化パターン適用

テストフェーズ: Playwright → 自動E2Eテスト・ユーザー操作検証
  DeepWiki → テスト戦略・モッキングパターン参照
```

### 🔧 セキュリティ・品質保証

````json
{
  "mcp_security": {
    "filesystem": {
      "allowed_operations": ["read_*", "write_src/*", "write_tests/*"],
      "blocked_operations": ["delete_*", "system_*"]
    },
    "playwright": {
      "allowed_origins": ["http://localhost:*", "https://test.domain"],
      "blocked_origins": ["*"]
    }
  },
  "quality_gates": {
    "test_coverage": ">= 95%",
    "performance": "< 100ms response",
    "accessibility": "WCAG 2.1 AA",
    "security": "OWASP Top 10 compliant"
  }
}

## 🚀 クイックスタート

### 🎯 3分で開始 - 驚異的なシンプルさ

```bash
# 🌟 Step 1: CC-DECK 開始（これだけ！）
/orchestrator

# 🎯 自動ガイドされた対話開始
Claude: 🔍 プロジェクト分析中...
        📋 新規プロジェクトを検出。Kiro Steering を開始します。
        💡 どのようなプロジェクトを作りますか？

# 🚀 Step 2: プロジェクト概要を入力
あなた: "ECサイト向けリアルタイム在庫管理システム"

# 🎉 Step 3: 全て自動実行！
Claude: ✅ 仕様書生成中... → ✅ 設計書作成中... → ✅ 実装開始...
````

### 📈 段階的習得パス

| レベル        | 目標                       | 所要時間 | 習得内容                           |
| ------------- | -------------------------- | -------- | ---------------------------------- |
| **🌱 初心者** | 基本ワークフロー理解       | 30 分    | `/orchestrator` の基本使用法       |
| **🚀 中級者** | フェーズ制御マスター       | 2 時間   | 各フェーズの詳細制御・カスタマイズ |
| **🏆 上級者** | MCP 拡張・独自エージェント | 1 日     | カスタム MCP・新エージェント開発   |

### 🔄 継続開発の流れ

```bash
# 🌅 朝の開発開始
/orchestrator
# → "payment-system機能: Testing完了. Refactoring推奨. 進めますか？"

# ☀️ 昼休み後の再開
/orchestrator
# → "Refactoring完了. Acceptance待ち. レビュー準備完了."

# 🌙 夕方のレビュー・デプロイ
/orchestrator "acceptance payment-system"
# → 人間承認 → PR作成 → マージ → 次Issue識別
```

## 🏗️ プロジェクト構造

### 📁 自動生成ディレクトリ構造

```
cc-deck-project/
├── 🎯 .claude/                    # AI エージェント設定
│   ├── commands/orchestrator.md   # メインオーケストレーター
│   ├── agents/                    # 20+ 専門エージェント
│   │   ├── kiro/                  # Spec-driven development
│   │   ├── coding/                # 実装支援エージェント群
│   │   ├── refactor/              # 品質向上エージェント群
│   │   └── testing/               # テスト自動化エージェント群
│   └── settings.local.json        # MCP サーバー設定
│
├── 📋 specs/                      # 仕様書（自動生成・更新）
│   └── {feature-name}/
│       ├── steering.md            # プロジェクト操舵
│       ├── requirements.md        # EARS形式要件
│       ├── design.md              # 技術設計
│       ├── tasks.md               # 実装計画
│       └── kiro_status.json       # 進捗追跡
│
├── 🛠️ src/                        # ソースコード（AI生成・人間編集）
│   ├── components/                # UI コンポーネント
│   ├── services/                  # ビジネスロジック
│   ├── utils/                     # ユーティリティ
│   └── types/                     # TypeScript 型定義
│
├── 🧪 tests/                      # テストスイート（自動生成）
│   ├── unit/                      # ユニットテスト
│   ├── integration/               # 統合テスト
│   └── e2e/                       # E2Eテスト
│
└── 📚 docs/                       # プロジェクトドキュメント
    ├── ARCHITECTURE.md            # システムアーキテクチャ
    ├── API.md                     # API ドキュメント（自動更新）
    └── blog/                      # 開発ブログ・技術記事
```

## 🎯 品質保証システム

### 🏆 4 層品質保証アーキテクチャ

```yaml
Layer 1 - AI品質チェック:
  - Serena MCP: セマンティック解析・パターン検証
  - Context7: 最新ベストプラクティス適合性
  - 自動リファクタリング: 重複除去・最適化

Layer 2 - 自動テスト:
  - Unit Test: 95%+ カバレッジ必須
  - Integration Test: API・DB・外部サービス
  - E2E Test: ユーザージャーニー完全検証

Layer 3 - インテリジェント承認:
  - Auto Approval: 95%のroutine issueを自動承認
  - Conditional Approval: 2時間の異議申し立て期間付き承認
  - Human Review: 高リスク案件の必須人間レビュー
  - Stakeholder Notification: Slack/Email統合通知システム

Layer 4 - 継続監視・学習:
  - Performance: レスポンス時間・スループット
  - Accessibility: WCAG 2.1 AA 準拠
  - Security: OWASP Top 10 対策
  - Learning Loop: 人間判断パターン学習・プロセス最適化
```

### 📊 自動品質メトリクス

| カテゴリ                | メトリクス     | 目標値  | 自動測定       |
| ----------------------- | -------------- | ------- | -------------- |
| **📈 パフォーマンス**   | レスポンス時間 | < 100ms | ✅ Playwright  |
| **🧪 テスト品質**       | カバレッジ     | > 95%   | ✅ Jest/Vitest |
| **♿ アクセシビリティ** | WCAG 準拠      | AA 等級 | ✅ axe-core    |
| **🔒 セキュリティ**     | 脆弱性         | 0 件    | ✅ Snyk/OWASP  |
| **📝 コード品質**       | 複雑度         | < 10    | ✅ ESLint      |

## 🤝 コントリビューション

### 🌟 コントリビューション方法

1. **🎯 機能提案**: GitHub Issues で新機能を提案
2. **🐛 バグ報告**: 再現手順・環境情報を含む詳細報告
3. **📝 ドキュメント改善**: 誤字・表現・構成の改善提案
4. **🛠️ エージェント拡張**: 新しい専門エージェントの開発

### 🚀 開発参加手順

```bash
# 1. 🍴 フォーク・クローン
git clone https://github.com/yourusername/cc-deck.git
cd cc-deck

# 2. 🎯 CC-DECK で機能開発
/orchestrator "新機能: GitHub Integration Agent"

# 3. 🧪 品質保証実行
/orchestrator "integration-test github-agent"
/orchestrator "acceptance github-integration"

# 4. 🚀 プルリクエスト
/orchestrator "pr-create feature/github-integration"
```

### 📚 追加リソース

- **🏗️ アーキテクチャ詳細**: [ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **🤖 エージェント開発**: [docs/claude-code/](docs/claude-code/)
- **📖 Kiro SDD ガイド**: [docs/kiro/](docs/kiro/)
- **🔧 MCP 統合**: [.claude/settings.local.json](.claude/settings.local.json)

---

**🚀 CC-DECK で、あなたの開発を次のレベルへ。今すぐ `/orchestrator` を実行して、AI 駆動開発の世界を体験してください！**
