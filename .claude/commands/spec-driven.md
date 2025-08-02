---
description: Kiro-style Spec-Driven Development workflow with streamlined commands
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash, Glob, Grep, LS
---

# Kiro 仕様書駆動開発

CLAUDE.md の仕様書駆動開発指針に基づき、プロジェクトの種類に応じて適切な開発ワークフローを実行します。

## プロジェクト分析

### 現在のプロジェクト状態

- 既存の仕様: !`if [ -d ".kiro/specs" ]; then ls -la .kiro/specs/; else echo "仕様ディレクトリが見つかりません"; fi`
- ステアリングファイル: !`if [ -d ".kiro/steering" ]; then ls -la .kiro/steering/; else echo "ステアリングディレクトリが見つかりません"; fi`
- プロジェクトファイル: !`find . -maxdepth 2 \( -name "package.json" -o -name "requirements.txt" -o -name "pyproject.toml" -o -name "Cargo.toml" -o -name "go.mod" \) 2>/dev/null || echo "設定ファイルが見つかりません"`

## CLAUDE.md コンテキスト

### 仕様書駆動開発の原則

- **英語で思考、日本語で生成**: Think in English, but generate responses in Japanese
- **フェーズ別承認ワークフロー**: Requirements → Design → Tasks → Implementation
- **承認必須**: 各フェーズで人間によるレビューが必要（インタラクティブプロンプトまたは手動）
- **フェーズスキップ禁止**: Design requires approved requirements; Tasks require approved design
- **ステアリング更新**: 重要な変更後は `/kiro:steering` を実行
- **仕様準拠確認**: `/kiro:spec-status` でアライメント確認

### プロジェクト構造

- **Steering**: `.kiro/steering/` - プロジェクト全体のルールとコンテキスト
- **仕様**: `.kiro/specs/` - 個別機能の開発プロセス
- **コマンド**: `.claude/commands/` - カスタムスラッシュコマンド

## ワークフロー選択

### 1. 新規プロジェクトの場合

プロジェクトにソースファイルがほとんどない、または全く新しい機能を追加する場合：

```markdown
**推奨ワークフロー（新規プロジェクト）:**

1. **オプション: プロジェクトステアリング生成**
   /kiro:steering

2. **ステップ 1: 新機能の仕様作成開始（詳細な説明を含める）**
   /kiro:spec-init "詳細なプロジェクト説明をここに記述"

3. **ステップ 2: 要件定義（自動生成された feature-name を使用）**
   /kiro:spec-requirements {feature-name}

4. **ステップ 3: 技術設計（インタラクティブ承認）**
   /kiro:spec-design {feature-name}

5. **ステップ 4: タスク生成（インタラクティブ承認）**
   /kiro:spec-tasks {feature-name}

6. **ステップ 5: 実装開始**
```

### 2. 既存プロジェクトへの機能追加

既存のコードベースに新しい機能を追加、または既存機能を拡張する場合：

```markdown
**推奨ワークフロー（既存プロジェクト）:**

1. **オプション: ステアリング作成・更新**
   /kiro:steering

2. **ステップ 1: 新機能の仕様作成開始**
   /kiro:spec-init "新しい機能の詳細な説明をここに記述"

3. **ステップ 2-5: 新規プロジェクトと同じ手順**
```

## タスク実行方針

### プロジェクト分析による自動選択

現在のプロジェクト状態を分析して、適切なワークフローを実行：

1. **プロジェクト状態の判定**

   - ソースファイルの存在確認
   - 既存の仕様書の確認
   - ステアリングファイルの確認

2. **コンテキスト依存の実行**

   - 新規プロジェクト: ステアリングから開始を推奨
   - 既存プロジェクト: 直接仕様作成も可能
   - 複雑なプロジェクト: 必ずステアリング更新

3. **CLAUDE.md コンテキストの活用**
   - プロジェクト全体のコンテキストを保持
   - 開発ガイドラインの遵守
   - 日本語での応答生成

## 実装手順

### 基本実行フロー

1. **プロジェクト分析実行**

   ```bash
   find . -name "*.js" -o -name "*.ts" -o -name "*.py" -o -name "*.go" | head -10
   ls -la .kiro/specs/ 2>/dev/null || echo "仕様なし"
   ls -la .kiro/steering/ 2>/dev/null || echo "ステアリングなし"
   ```

2. **適切なステアリングエージェント呼び出し**

   - 新規: `steering` エージェント
   - 既存: `steering` エージェント（更新モード）

3. **仕様作成エージェント連鎖呼び出し**

   - `spec-init` → `spec-requirements` → `spec-design` → `spec-tasks`

4. **CLAUDE.md コンテキスト統合**
   - 各エージェントに CLAUDE.md の内容を渡す
   - 日本語応答の徹底
   - 承認ワークフローの実装

## エラーハンドリング

### 一般的な問題への対処

1. **仕様ディレクトリが存在しない**
   → 自動作成して新規プロジェクトワークフローを実行

2. **ステアリングファイルが古い**
   → 自動更新を提案

3. **承認待ちの仕様がある**
   → `/kiro:spec-status` でステータス確認を促す

## 使用方法

```bash
# 基本的な使用方法
/spec-driven

# プロジェクト説明付きで実行
/spec-driven "PDFアップロード機能とAI図表解析を追加したい"
```

このコマンドは、CLAUDE.md の指針に従って、プロジェクトの状態を分析し、適切な仕様書駆動開発ワークフローを自動的に実行します。

## サブエージェント実行

### 専門エージェント呼び出し戦略

各フェーズで専門的なサブエージェントを呼び出し、CLAUDE.mdのコンテキストを確実に適用します：

1. **ステアリング生成**: `Kiro Steering` サブエージェント
2. **カスタムステアリング**: `Kiro Steering Custom` サブエージェント（必要に応じて）
3. **仕様初期化**: `Kiro Spec Init` サブエージェント  
4. **要件定義**: `Kiro Spec Requirements` サブエージェント
5. **設計**: `Kiro Spec Design` サブエージェント
6. **タスク分解**: `Kiro Spec Tasks` サブエージェント
7. **ステータス確認**: `Kiro Spec Status` サブエージェント

### サブエージェントの利点

- **専門性**: 各フェーズに特化した高品質な支援
- **自動選択**: Claude Codeが適切なタイミングでエージェントを自動選択
- **プロアクティブ実行**: 条件に応じた自動実行
- **一貫性**: CLAUDE.mdルールの統一的適用
- **保守性**: モジュラー構造で個別更新が容易

### 利用可能なサブエージェント

```
.claude/agents/
├── kiro-steering.md           # プロジェクトステアリング管理
├── kiro-steering-custom.md    # カスタムステアリング作成
├── kiro-spec-init.md         # 仕様初期化
├── kiro-spec-requirements.md # 要件定義（EARS形式）
├── kiro-spec-design.md       # 技術設計
├── kiro-spec-tasks.md        # 実装タスク分解
└── kiro-spec-status.md       # 仕様ステータス確認
```

各サブエージェントには、CLAUDE.mdの完全なコンテキストと仕様書駆動開発の原則が組み込まれており、一貫した高品質な開発支援を提供します。
