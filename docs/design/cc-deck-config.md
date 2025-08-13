# .cc-deck/config ディレクトリ詳細ドキュメント

## 概要

`.cc-deck/config` ディレクトリは、CC-Deck Workflow Engine の設定ファイルを格納する中央管理場所です。このディレクトリには、ワークフローの定義、エンジンの実装詳細、および各開発フェーズの設定が含まれています。

## ディレクトリ構造

```
.cc-deck/config/
├── engine/                    # ワークフローエンジンの実装詳細
│   └── workflow-engine.md     # エンジンの実装仕様とコード例
└── workflows/                 # ワークフロー定義ファイル
    ├── acceptance.yaml        # 受け入れワークフロー
    ├── coding.yaml            # コーディングワークフロー
    ├── dev-env-setup.yaml     # 開発環境セットアップワークフロー ✨ NEW
    ├── kiro-sdd.yaml          # Kiro SDD ワークフロー
    ├── pr.yaml                # プルリクエストワークフロー
    ├── refactoring.yaml       # リファクタリングワークフロー
    └── testing.yaml           # テストワークフロー
```

## engine/ ディレクトリ

### workflow-engine.md

CC-Deck Workflow Engine の完全な実装仕様を定義するドキュメントです。

**主要コンポーネント:**

1. **Workflow Definition Loader**
   - YAML ワークフロー定義の読み込みと解析
   - `.kiro/workflows/{workflow_name}.yaml` からの設定取得

2. **Smart Context Manager**
   - ワークフロー間でのコンテキスト共有とデータ永続化
   - フェーズ間の入出力管理
   - `.kiro/context/{workflow_name}-{feature_name}.json` への状態保存

3. **Task-Driven Execution Engine**
   - `tasks.md` ファイルベースの実装実行
   - 並列・順次実行戦略のサポート
   - エージェント自動選択とタスク実行

4. **Workflow Executor**
   - メインワークフロー実行エンジン
   - エラーハンドリングと復旧戦略
   - チェックポイント機能

**技術的特徴:**
- Python ベースの実装例
- エラーハンドリングと復旧戦略
- tasks.md ファイルとの統合
- チェックボックス自動更新機能

## workflows/ ディレクトリ

各ワークフロー定義ファイルは YAML 形式で記述され、以下の共通構造を持ちます：

### 共通 YAML 構造

```yaml
name: workflow-name
description: ワークフローの説明
version: "1.0.0"

context_schema:          # Smart Context のスキーマ定義
  # コンテキストデータ構造

phases:                  # ワークフローフェーズ定義
  - name: phase_name
    agent: agent-name
    description: "フェーズの説明"
    inputs: []           # 入力データ
    outputs: []          # 出力データ
    success_criteria: {} # 成功基準
    next_phase: next     # 次のフェーズ

error_handling: {}       # エラーハンドリング設定
monitoring: {}           # モニタリング設定
```

### kiro-sdd.yaml

**Kiro SDD (Specification-Driven Development) ワークフロー**

完全な仕様駆動開発プロセスを定義。

**主要フェーズ:**
1. `steering` - プロジェクトステアリング文書生成
2. `init` - 仕様ディレクトリ初期化
3. `requirements` - 要件定義（EARS形式）
4. `design` - 技術設計
5. `tasks` - 実装タスク生成
6. `human_approval_tasks` - タスク承認
7. `implementation` - タスク駆動実装
8. `validation` - 最終検証
9. `human_approval_kiro_sdd` - 最終承認 → **次: dev-env-setup**

**特徴:**
- タスク駆動実装（`tasks.md` 統合）
- 人間承認ポイント
- エラーハンドリングと復旧戦略
- 進捗チェックポイント
- **ワークフローチェーン**: `kiro-sdd` → `dev-env-setup` → `coding`

### dev-env-setup.yaml ✨ NEW

**開発環境セットアップワークフロー**

Kiro SDD完了後とCoding開始前の橋渡しフェーズ。プロジェクト固有のMCP SubAgentを動的生成し、技術スタックに最適化された開発環境を構築。

**主要フェーズ:**
1. `spec_analysis` - 仕様分析（spec-analyzer）
2. `mcp_recommendation` - MCP推奨（mcp-recommender）
3. `user_approval` - ユーザー承認（人間インタラクション）
4. `agent_generation` - エージェント生成（agent-generator）
5. `workflow_integration` - ワークフロー統合（workflow-integrator）
6. `human_approval_dev_env` - 最終承認 → **次: coding**

**革新的特徴:**
- **動的MCP SubAgent生成**: プロジェクト固有の最適化エージェント作成
- **技術スタック分析**: Next.js、Vercel、Supabase等の自動検出と最適化
- **ハイブリッドファイル生成**: Extensions + Generated設定管理
- **Smart Context Propagation**: エージェント間のインテリジェントなコンテキスト共有
- **Graceful Degradation**: MCPサービス障害時の優雅な縮退動作

**動的ディレクトリ構造:**
```bash
.cc-deck/runtime/projects/{project_id}/
├── extensions/                    # 拡張設定
│   └── coding-extension.yaml     # Codingワークフロー拡張
├── generated/                     # 統合設定
│   └── coding-merged.yaml        # 最終統合ワークフロー
└── config/                       # MCP設定
    └── mcp-setup-complete.json  # MCP設定完了ステータス

# Enhanced agents are now in:
.claude/agents/coding/dynamic/{project_id}/
└── enhanced-implementation-agent.md  # 統合エンハンスドエージェント
```

**MCP統合戦略:**
- **Brave Search**: 最新MCP技術・ツール調査
- **DeepWiki MCP**: 成功プロジェクトパターン分析
- **Context7 MCP**: 公式ツールドキュメント検証
- **Triple MCP Research**: 包括的な技術調査による最適推奨

**エラーハンドリング & Graceful Degradation:**
```yaml
graceful_degradation:
  mcp_service_failures:
    brave_search_failure: "Context7とDeepWikiで研究継続"
    all_mcp_failures: "組み込み推奨テンプレート使用"
  agent_generation_failures:
    partial_generation: "成功したエージェントで継続"
    complete_failure: "標準Codingワークフローで実行"
```

### coding.yaml

**包括的コーディングワークフロー**

MCP統合とTDD重視の完全開発ワークフロー。

**主要フェーズ:**
1. `research` - 技術調査（MCP統合）
2. `planning` - 戦略企画
3. `serena_onboarding` - Serena MCP初期化
4. `tdd_cycle` - TDDサイクル実行
5. `full_implementation` - **強化版マルチエージェント実装**
6. `testing` - テスト実行
7. `documentation` - ドキュメント生成
8. `human_approval_coding` - コーディング承認

**技術特徴:**
- **TDD First Policy**: 全コード開発でTDD必須
- **Enhanced Multi-Agent Implementation**: 4エージェント協調実装システム
- **Triple MCP統合**: DeepWiki、Context7、WebSearch完全活用
- **Enhanced Test Coverage**: 品質保証（line: 95%+, branch: 90%+, function: 95%+）
- **t-wada方法論**: 厳格なRed-Green-Refactorサイクル
- **リアルタイム品質監視**: 連続的品質ゲート・セキュリティスキャン
- **Enterprise-Grade Error Handling**: チェックポイント、サーキットブレーカー、6カテゴリエラー復旧戦略
- **統一監視システム**: リアルタイムメトリクス、予防的アラート、包括的レポート
- **5次元品質保証**: Functional、Technical、Security、Performance、Documentation品質統一評価
- **並列実行最適化**: Research/Planning並列、MCP services並列処理

#### 強化版Implementationフェーズ詳細

**マルチエージェント協調システム:**
1. **research-agent**: リアルタイム技術調査・ベストプラクティス収集
2. **deepwiki-research-solver**: 実装問題解決・パターン分析
3. **implementation-agent**: メインTDD実装担当
4. **code-quality-validator**: 継続的品質監視・改善提案

**4段階実装プロセス:**
1. **Pre-Implementation Research**: 実装戦略検証・ライブラリ推奨・セキュリティ考慮
2. **Implementation Support**: 継続的問題解決・パターンガイダンス
3. **Core Implementation**: TDDベース実装・継続的品質監視
4. **Quality Validation**: 包括的品質検証・改善

**Triple MCP統合戦略:**
- **Context7**: ライブラリドキュメント・API検証・バージョン互換性
- **DeepWiki**: リポジトリパターン分析・エラー解決・アーキテクチャ検証
- **WebSearch**: 最新ベストプラクティス・セキュリティ更新・パフォーマンス最適化

**継続的品質保証:**
- **Entry Gate**: TDD基盤検証・調査完了・実装戦略承認
- **Progress Gates**: 増分テストカバレッジ・品質維持・セキュリティ回帰なし
- **Exit Gate**: 全テスト通過・95%+カバレッジ・セキュリティ監査・パフォーマンス基準・文書完成

**高度成功基準:**
- **Functional**: 100%要件満足・包括的エッジケース処理
- **Technical**: 95%+カバレッジ・8.5+品質スコア・5%以下技術的負債
- **Security**: 0件クリティカル・認証認可検証
- **Performance**: ベンチマーク達成・メモリ最適化・応答時間目標
- **Production**: 包括的エラーハンドリング・ログ監視・設定管理

### refactoring.yaml

**システマチックリファクタリングワークフロー**

セマンティック分析とパターン検出による包括的コードリファクタリング。

**主要フェーズ:**
1. `pattern_analysis` - パターン検出
2. `code_analysis` - コード構造分析
3. `refactoring_selection` - リファクタリング戦略選択
4. `serena_refactoring` / `similarity_refactoring` / `standard_refactoring` - 実行
5. `quality_validation` - 品質検証
6. `human_approval_refactoring` - リファクタリング承認

**リファクタリング戦略:**
- **Serena MCP**: セマンティックリファクタリング
- **Similarity-Based**: 重複パターン統合
- **Standard**: 標準的変換

### testing.yaml

**包括的テストワークフロー**

統合テストとE2Eテストオーケストレーション。

**主要フェーズ:**
1. `strategy_planning` - テスト戦略企画
2. `environment_setup` - テスト環境構築
3. `test_type_selection` - テストタイプ選択
4. `integration_testing` / `e2e_testing` - テスト実行
5. `test_reporting` - レポート生成
6. `human_approval_testing` - テスト承認

**テスト機能:**
- **並列実行**: 最大5つの統合テストスイート
- **環境分離**: 複数環境での並列テスト
- **品質ゲート**: カバレッジ85%+、パス率95%+
- **パフォーマンステスト**: APIレスポンス200ms未満

### pr.yaml

**プルリクエスト自動化ワークフロー**

PR作成からマージまでの完全自動化。

**主要フェーズ:**
1. `pr_analysis` - 変更分析
2. `pr_content_generation` - PR内容生成
3. `pr_validation` - PR品質検証
4. `pr_creation` - PR作成
5. `merge_preparation` - マージ準備
6. `pr_merge` - マージ実行
7. `post_merge_activities` - マージ後処理
8. `human_approval_pr` - PR承認

**自動化機能:**
- **変更影響分析**: 包括的影響評価
- **PR内容自動生成**: 高品質PR説明
- **品質検証**: リント、テスト、セキュリティ
- **マージ戦略**: Squash、Merge Commit、Rebase

### acceptance.yaml

**受け入れワークフロー**

人間承認プロセスとフィードバック分析による自動フェーズ再実行。

**主要フェーズ:**
1. `review_preparation` - レビュー準備
2. `human_review` - 人間レビュー
3. `decision_processing` - 決定処理
4. `feedback_analysis` - フィードバック分析
5. `phase_coordination` - フェーズ調整
6. `re_execution_monitoring` - 再実行監視
7. `acceptance_completion` - 受け入れ完了
8. `human_approval_acceptance` - 最終承認

**フィードバック処理:**
- **自動分析**: 根本原因特定
- **フェーズマッピング**: 修正が必要なフェーズ特定
- **自動ロールバック**: 問題のあるフェーズへの復帰
- **再実行管理**: 系統的な修正プロセス

## Supplementary Agents

### Supplementary Agents 強化システム

coding.yamlでは3つの補助エージェントが連携してImplementation フェーズを強化：

#### deepwiki-research-solver
主に実装フェーズで技術問題の解決に使用される専門エージェント。

**主要使用場面:**
- **Implementation Phase**: コンパイルエラートラブルシューティング、実装問題の解決
- **TDD Phase**: テスト実装問題、フレームワーク固有の課題
- **Pattern Analysis**: 成功したリポジトリの実装パターン分析
- **MCP統合**: DeepWiki（リポジトリ分析）+ Context7（フレームワーク文書）

#### research-agent
包括的技術調査を担当する多目的エージェント。

**主要使用場面:**
- **Pre-Implementation Research**: 実装前技術スタック検証
- **Real-time Research**: 実装中のベストプラクティス調査
- **Security Analysis**: セキュリティ考慮事項・脆弱性分析
- **Performance Research**: パフォーマンス最適化技術調査
- **Triple MCP統合**: Context7（公式文書）+ DeepWiki（コミュニティパターン）+ WebSearch（最新情報）

#### code-quality-validator
継続的品質監視と改善提案を担当する品質保証エージェント。

**品質監視領域:**
- **Functional Quality**: 要件カバレッジ・エッジケース処理
- **Technical Quality**: コード複雑性・保守性・テストカバレッジ
- **Security Quality**: 脆弱性スキャン・ベストプラクティス準拠
- **Performance Quality**: ベンチマーク検証・最適化機会
- **Documentation Quality**: APIドキュメント・コメント完全性

**強化されたエージェント協調システム:**
```yaml
agent_orchestration:
  primary_agent: implementation-agent
  supporting_agents:
    - research-agent: "Real-time technical research and best practices"
    - deepwiki-research-solver: "Implementation problem solving and pattern analysis" 
    - code-quality-validator: "Continuous quality monitoring and validation"
  execution_strategy: "collaborative_with_checkpoints"
  coordination_method: shared_context
  quality_gates_integration: continuous
```

## Smart Context Propagation

すべてのワークフローで共通する Smart Context システム：

### Context Schema
各ワークフローは `context_schema` でデータ構造を定義：
```yaml
context_schema:
  project:
    name: string
    type: string
    complexity: enum[low, medium, high]
  current_phase: string
  completed_phases: array[string]
```

### Context 管理
- **永続化**: `.cc-deck/runtime/global/context/{workflow}-{feature}.json`
- **共有**: フェーズ間でのデータ受け渡し
- **継承**: ワークフロー間でのコンテキスト継承

## Human Approval Points

すべてのワークフローに組み込まれた人間承認ポイント：

### 承認構造
```yaml
type: human_interaction
approval_scope:
  - "承認項目1"
  - "承認項目2"
review_materials: []
decision_options: [approved, approved_with_conditions, rejected, deferred]
stakeholders:
  required: [technical_lead]
  optional: [product_owner]
timeout: 72 # hours
```

### 承認フロー
1. **レビュー資料準備**
2. **ステークホルダー通知**
3. **構造化意思決定**
4. **条件対応または却下処理**

## Enterprise-Grade 拡張機能

### 統一監視システム
全ワークフローで一貫した監視パターン：
```yaml
monitoring:
  metrics:
    - phase_duration_{phase_name}
    - quality_score_trend
    - error_rate
    - mcp_service_response_time
  alerts:
    - performance_degradation: "> 150% of baseline"
    - quality_regression: "> 10% drop"
    - integration_issues: "> 5s response time"
```

### 品質保証統一基準
5次元品質評価フレームワーク：
```yaml
quality_gates:
  functional_quality: ">= 100% requirement_coverage"
  technical_quality: ">= 8.0/10 + 95% test_coverage"  
  process_quality: ">= 95% workflow_compliance"
  user_experience_quality: ">= 8.5/10 + WCAG 2.1 AA"
  operational_quality: ">= 99.9% reliability"
```

## Error Handling & Recovery

エンタープライズグレード共通エラーハンドリング戦略：

### Retry Policy
```yaml
retry_policy:
  max_retries: 3
  retry_delay: 5s
  exponential_backoff: true
```

### 6カテゴリエラー分類システム
```yaml
error_categories:
  transient_errors: automatic_retry_with_exponential_backoff
  configuration_errors: immediate_human_escalation
  data_errors: data_correction_or_rollback
  business_logic_errors: process_correction_required
  integration_errors: fallback_or_circuit_breaker
  critical_system_errors: immediate_halt_and_escalate
```

### Enterprise Recovery Strategies
- **Automatic Retry**: 指数バックオフ・ジッター付きリトライ
- **Checkpoint & Rollback**: フェーズ前チェックポイント・72時間保持
- **Circuit Breaker**: 障害閾値5回・30秒タイムアウト・60秒半開放復旧
- **Fallback Service**: 階層的フォールバック（代替→キャッシュ→オフライン）
- **Human Escalation**: 技術リード→エンジニアリングマネージャー→CTO

## Quality Gates

エンタープライズグレード統一品質ゲート：

### Enhanced Code Quality Standards
- **Test Coverage**: Line 95%+, Branch 90%+, Function 95%+
- **Code Quality Score**: 8.0/10以上
- **Technical Debt Ratio**: 5%以下
- **Security**: Critical 0件、Medium 2件以下
- **Architecture Compliance**: 100%

### TDD Compliance (Coding Workflow)
- **Test First Percentage**: 100%
- **Red-Green-Refactor Cycles**: 完全文書化
- **Minimal Implementation**: 検証済み

### Process Quality Enhanced
- **Workflow Compliance**: 95%以上
- **Documentation Completeness**: 90%以上（API 95%以上）
- **Approval Response Time**: 24-72時間
- **Milestone Adherence**: 90%以上

## Integration Points

### MCP Integrations
- **DeepWiki**: GitHubリポジトリ分析
- **Context7**: ライブラリドキュメント
- **Serena**: セマンティックコード分析

### CI/CD Integration
- **Automatic Triggers**: 自動トリガー
- **Status Checks**: 必須チェック
- **Deployment**: 条件付きデプロイ

## Enterprise Monitoring & Analytics

### 統一メトリクス収集
- **Phase Performance**: フェーズ実行時間・パフォーマンス異常検出
- **Quality Metrics**: 品質スコア推移・回帰検出・改善率追跡
- **TDD Compliance**: TDDサイクル効率・コンプライアンス率・リファクタリング頻度
- **MCP Integration**: サービス応答時間・可用性・エラー率
- **Human Interaction**: 承認応答時間・反復回数・フィードバック解決時間

### プロアクティブアラート
- **Performance Degradation**: 150%ベースライン超過・実装速度30%低下
- **Quality Regression**: 5%テストカバレッジ低下・0.5ポイント品質回帰
- **TDD Compliance Violation**: 95%未満コンプライアンス
- **Integration Issues**: 5秒超応答時間・MCPサービス劣化
- **Approval Timeout Risk**: 48時間超承認待機

### 包括的レポート
- **Real-time Dashboard**: HTML形式・Prometheus連携
- **API Integration**: JSON形式・継続的データエクスポート  
- **Executive Summaries**: 週次トレンド分析・月次戦略レビュー
- **Audit Reports**: 承認履歴・品質評価・エラー対応完全追跡

## 使用方法

### `/orchestrator` コマンド
CC-Deck Workflow Engine のメインエントリーポイント：

```bash
# インテリジェントワークフロー選択
/orchestrator

# 明示的ワークフロー指定
/orchestrator "kiro-sdd user-authentication"
/orchestrator "coding REST-API-service"
/orchestrator "refactoring legacy-system"

# 中断されたワークフローの再開
/orchestrator "resume user-authentication"
```

### ワークフロー選択ロジック
1. **プロジェクト状態分析**
2. **引数ベース選択**
3. **インテリジェント推奨**
4. **フィーチャー名抽出**
5. **ワークフロー実行**

## 設定カスタマイズ

### Repository-Specific Configuration
- **Quality Gates**: リポジトリ別設定
- **Approval Requirements**: 承認要件調整
- **Merge Strategies**: マージ戦略選択

### Team-Specific Customization
- **Stakeholder Mapping**: ステークホルダー設定
- **Timeout Configuration**: タイムアウト調整
- **Notification Preferences**: 通知設定

## ベストプラクティス

### ワークフロー設計
1. **明確なフェーズ分離**
2. **適切な入出力定義**
3. **現実的な成功基準**
4. **包括的エラーハンドリング**

### Context管理
1. **最小限のデータ転送**
2. **適切な永続化**
3. **セキュリティ考慮**
4. **バージョン管理**

### 品質保証
1. **自動化テスト**
2. **人間承認ポイント**
3. **継続的監視**
4. **改善フィードバック**

## トラブルシューティング

### 一般的な問題

**Context ファイル破損**
```bash
# Context ファイル再初期化
rm .cc-deck/runtime/global/context/{workflow}-{feature}.json
/orchestrator "resume {feature}"
```

**ワークフロー停止**
```bash
# 手動復旧
/orchestrator "resume"
```

**品質ゲート失敗**
1. ログ確認
2. 品質メトリクス検証
3. 修正実装
4. 再実行

### ログとモニタリング
- **実行ログ**: `.cc-deck/logs/`
- **メトリクス**: 自動収集
- **アラート**: 即座通知

## まとめ

`.cc-deck/config` ディレクトリは CC-Deck Workflow Engine の中心的な設定管理システムです。各ワークフロー定義ファイルは、特定の開発フェーズに最適化された包括的な自動化プロセスを提供し、人間の承認ポイント、エラーハンドリング、品質保証を統合した堅牢な開発環境を実現しています。

この設定システムにより、Kiro SDD プロセスの完全自動化と、高品質なソフトウェア開発ワークフローが可能になります。