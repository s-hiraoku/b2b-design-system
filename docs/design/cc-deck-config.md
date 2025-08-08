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
9. `human_approval_kiro_sdd` - 最終承認

**特徴:**
- タスク駆動実装（`tasks.md` 統合）
- 人間承認ポイント
- エラーハンドリングと復旧戦略
- 進捗チェックポイント

### coding.yaml

**包括的コーディングワークフロー**

MCP統合とTDD重視の完全開発ワークフロー。

**主要フェーズ:**
1. `research` - 技術調査（MCP統合）
2. `planning` - 戦略企画
3. `serena_onboarding` - Serena MCP初期化
4. `tdd_cycle` - TDDサイクル実行
5. `full_implementation` - 完全実装
6. `testing` - テスト実行
7. `documentation` - ドキュメント生成
8. `human_approval_coding` - コーディング承認

**技術特徴:**
- **TDD First Policy**: 全コード開発でTDD必須
- **MCP統合**: DeepWiki、Context7、Serena統合
- **95%+ テストカバレッジ**: 品質保証
- **t-wada方法論**: 厳格なRed-Green-Refactorサイクル

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
- **永続化**: `.cc-deck/context/{workflow}-{feature}.json`
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

## Error Handling & Recovery

共通のエラーハンドリング戦略：

### Retry Policy
```yaml
retry_policy:
  max_retries: 3
  retry_delay: 5s
  exponential_backoff: true
```

### Recovery Strategies
- **Checkpoint**: 復旧ポイント作成
- **Rollback**: 前のフェーズへの復帰
- **Escalation**: 上位者への通知
- **Manual Intervention**: 手動介入要求

## Quality Gates

各ワークフローに定義された品質ゲート：

### Code Quality
- **Test Coverage**: 85-95%+
- **Linting**: Pass必須
- **Security**: 脆弱性なし

### Process Quality
- **Approval Response Time**: 24-72時間
- **Error Rate**: 最小化
- **Completion Rate**: 高維持

## Integration Points

### MCP Integrations
- **DeepWiki**: GitHubリポジトリ分析
- **Context7**: ライブラリドキュメント
- **Serena**: セマンティックコード分析

### CI/CD Integration
- **Automatic Triggers**: 自動トリガー
- **Status Checks**: 必須チェック
- **Deployment**: 条件付きデプロイ

## Monitoring & Analytics

### Metrics Collection
- **Phase Duration**: フェーズ実行時間
- **Success Rate**: 成功率
- **Quality Improvement**: 品質改善度
- **Stakeholder Satisfaction**: ステークホルダー満足度

### Alerting
- **Deadline Approaching**: 期限接近
- **Quality Gate Failure**: 品質ゲート失敗
- **Manual Intervention Required**: 手動介入要求

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
rm .cc-deck/context/{workflow}-{feature}.json
/orchestrator "resume {feature}"
```

**ワークフロー停止**
```bash
# ステータス確認
/sync-status

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