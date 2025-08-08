# 🏗️ CC-Deck Design Documentation

**CC-Deck システム設計書一覧とナビゲーション**

## 📑 設計書一覧

### 🎯 システム全体設計
- **[ARCHITECTURE.md](ARCHITECTURE.md)**: システムアーキテクチャ・40+エージェント・6ワークフロー仕様
- **[CC-DECK-DESIGN.md](CC-DECK-DESIGN.md)**: CC-Deck Workflow Engine・YAML定義・Smart Context詳細

### 🤔 ユーザーインタラクション設計  
- **[INTERACTIVE-WORKFLOW.md](INTERACTIVE-WORKFLOW.md)**: インテリジェントワークフロー選択システム完全ガイド

## 🗺️ 設計書ナビゲーション

### 新規開発者向け学習パス
1. **[ARCHITECTURE.md](ARCHITECTURE.md)** → システム全体の理解
2. **[CC-DECK-DESIGN.md](CC-DECK-DESIGN.md)** → ワークフローエンジンの詳細
3. **[INTERACTIVE-WORKFLOW.md](INTERACTIVE-WORKFLOW.md)** → ユーザーインタラクション

### 機能別アクセス

#### 🤖 エージェントシステム
- **エージェント仕様**: [ARCHITECTURE.md](ARCHITECTURE.md#agents-specification)
- **エージェント間通信**: [CC-DECK-DESIGN.md](CC-DECK-DESIGN.md#smart-context-propagation)
- **マルチエージェント実行**: [ARCHITECTURE.md](ARCHITECTURE.md#multi-agent-orchestration)

#### 🔄 ワークフローシステム
- **ワークフロー定義**: [CC-DECK-DESIGN.md](CC-DECK-DESIGN.md#workflow-composition-pattern)
- **YAML設定**: [CC-DECK-DESIGN.md](CC-DECK-DESIGN.md#yaml-workflow-definitions)
- **自動進行ロジック**: [INTERACTIVE-WORKFLOW.md](INTERACTIVE-WORKFLOW.md#workflow-recommendation-logic)

#### 🎯 品質保証システム
- **TDD統合**: [ARCHITECTURE.md](ARCHITECTURE.md#tdd-integration)
- **人間承認**: [CC-DECK-DESIGN.md](CC-DECK-DESIGN.md#human-approval-workflows)
- **品質ゲート**: [ARCHITECTURE.md](ARCHITECTURE.md#quality-gates)

#### 🧠 インテリジェントシステム
- **プロジェクト分析**: [INTERACTIVE-WORKFLOW.md](INTERACTIVE-WORKFLOW.md#project-analysis-engine)
- **ワークフロー推奨**: [INTERACTIVE-WORKFLOW.md](INTERACTIVE-WORKFLOW.md#workflow-recommendation-logic)
- **学習効果**: [INTERACTIVE-WORKFLOW.md](INTERACTIVE-WORKFLOW.md#learning-benefits)

## 🔍 設計書の読み方

### 初回読者
1. **概要理解**: 各ドキュメントの「Overview/概要」セクションから開始
2. **実用例**: 「Usage Examples/使用例」で具体的な動作を理解
3. **詳細仕様**: 必要に応じて技術詳細セクションを参照

### 実装者・開発者
1. **技術仕様**: 「Technical Specifications/技術仕様」セクションを重点的に
2. **実装例**: コードサンプルと設定例を確認
3. **API仕様**: 関数・メソッド・設定値の詳細を参照

### システム管理者・運用者
1. **設定関連**: YAML設定・環境設定の詳細を確認
2. **モニタリング**: 品質ゲート・メトリクス・ログ設計を理解
3. **トラブルシューティング**: エラーハンドリング・復旧手順を把握

## 📝 設計書メンテナンス

### 更新頻度
- **ARCHITECTURE.md**: システム構造変更時
- **CC-DECK-DESIGN.md**: ワークフローエンジン機能追加時
- **INTERACTIVE-WORKFLOW.md**: UI/UX・推奨ロジック変更時

### 更新ルール
1. **下位互換性**: 既存設計との整合性維持
2. **実装との同期**: コード変更と設計書更新の同期
3. **例の最新化**: 使用例・設定例の定期的な検証更新

---

**💡 Tips**: 
- 設計書は相互参照されています。リンクを辿って関連情報を確認してください
- 実装時は最新のmain ブランチの設計書を参照してください
- 不明点があれば GitHub Issues で質問してください