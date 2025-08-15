# CC-Deck YAML Schema Documentation

## 概要

本ドキュメントでは、CC-Deck Workflow Engineで使用されるYAMLファイルのスキーマ定義を包括的にまとめます。プロジェクトで定義される7つの基本ワークフロー、サブエージェント定義、カスタムコマンド定義のYAMLスキーマを詳細に解説します。

## 1. 基本ワークフロー YAML スキーマ

### 1.1 共通ワークフロー構造

```yaml
# 基本ワークフロー定義構造
name: string                    # 必須: ワークフロー名
description: string             # 必須: ワークフローの説明
version: string                 # 必須: バージョン番号

context_schema:                 # Smart Context スキーマ定義
  project:
    name: string
    type: string
    complexity: enum[low, medium, high]
  current_phase: string
  completed_phases: array[string]

phases:                         # ワークフローフェーズ定義
  - name: string               # フェーズ名
    agent: string              # 実行エージェント
    description: string        # フェーズ説明
    type: enum[agent_execution, human_interaction, validation]
    inputs: array              # 入力データ
    outputs: array             # 出力データ
    success_criteria: object   # 成功基準
    next_phase: string         # 次のフェーズ
    fallback_strategy: object  # フォールバック戦略

error_handling:                 # エラーハンドリング設定
  retry_policy:
    max_retries: integer
    retry_delay: string
    exponential_backoff: boolean
  circuit_breaker:
    failure_threshold: integer
    timeout: string
    recovery_timeout: string

monitoring:                     # モニタリング設定
  metrics: array[string]
  alerts: object
  quality_gates: object

quality_gates:                  # 品質ゲート設定
  functional_quality: string
  technical_quality: string
  process_quality: string
  user_experience_quality: string
  operational_quality: string
```

### 1.2 kiro-sdd.yaml スキーマ

```yaml
name: "kiro-sdd"
description: "Kiro SDD (Specification-Driven Development) Workflow"
version: "1.0.0"

context_schema:
  project:
    name: string
    type: string
    complexity: enum[low, medium, high]
  specification:
    feature_name: string
    requirements_status: enum[pending, draft, approved]
    design_status: enum[pending, draft, approved]
    tasks_status: enum[pending, generated, approved]

phases:
  - name: "steering"
    agent: "project-steerer"
    description: "プロジェクトステアリング文書生成・更新"
    type: agent_execution
    
  - name: "init" 
    agent: "kiro-spec-init"
    description: "仕様ディレクトリとメタデータの初期化"
    type: agent_execution
    
  - name: "requirements"
    agent: "requirements-analyst"
    description: "EARS形式による包括的要件定義"
    type: agent_execution
    
  - name: "design"
    agent: "design-architect"
    description: "承認された要件に基づく包括的技術設計"
    type: agent_execution
    
  - name: "tasks"
    agent: "task-generator"
    description: "設計に基づく詳細実装タスクの生成"
    type: agent_execution
    
  - name: "human_approval_tasks"
    type: human_interaction
    approval_scope:
      - "実装タスクの適切性"
      - "タスクの優先順位と依存関係"
      - "実装戦略の妥当性"
    
  - name: "implementation"
    agent: "task-executor"
    description: "進捗追跡付きタスク駆動実装"
    type: agent_execution
    
  - name: "validation"
    agent: "completion-validator"
    description: "完了の検証とプロジェクトステータスの更新"
    type: validation
    
  - name: "human_approval_kiro_sdd"
    type: human_interaction
    next_workflow: "dev-env-setup"

error_handling:
  retry_policy:
    max_retries: 3
    retry_delay: "5s"
    exponential_backoff: true

quality_gates:
  requirements_completeness: ">= 95%"
  design_coverage: ">= 100%"
  task_granularity: "appropriate"
```

### 1.3 dev-env-setup.yaml スキーマ

```yaml
name: "dev-env-setup"
description: "プロジェクト固有の開発最適化のための動的MCPエージェント生成"
version: "1.0.0"

context_schema:
  project:
    technology_stack: array[string]
    mcp_recommendations: array[object]
    generated_agents: array[object]
  environment:
    setup_status: enum[pending, analyzing, recommending, generating, complete]

phases:
  - name: "spec_analysis"
    agent: "spec-analyzer"
    description: "Kiro SDD仕様の分析と技術スタックの抽出"
    type: agent_execution
    
  - name: "mcp_recommendation"
    agent: "mcp-recommender"
    description: "プロジェクト技術スタックに最適なMCPエージェントの調査と推奨"
    type: agent_execution
    mcp_integrations:
      - "brave-search"
      - "deepwiki"
      - "context7"
    
  - name: "user_approval"
    type: human_interaction
    approval_scope:
      - "推奨MCPエージェントの承認"
      - "カスタマイゼーション要件"
    
  - name: "agent_generation"
    agent: "agent-generator" 
    description: "承認されたMCP SubAgentの動的生成"
    type: agent_execution
    
  - name: "workflow_integration"
    agent: "workflow-integrator"
    description: "基本Codingワークフローとの拡張設定の統合"
    type: agent_execution
    
  - name: "human_approval_dev_env"
    type: human_interaction
    next_workflow: "coding"

graceful_degradation:
  mcp_service_failures:
    brave_search_failure: "Context7とDeepWikiで研究継続"
    all_mcp_failures: "組み込み推奨テンプレート使用"
  agent_generation_failures:
    partial_generation: "成功したエージェントで継続"
    complete_failure: "標準Codingワークフローで実行"
```

### 1.4 coding.yaml スキーマ

```yaml
name: "coding"
description: "MCP統合とTDD重視の完全開発ワークフロー"
version: "1.0.0"

context_schema:
  implementation:
    tdd_compliance: boolean
    test_coverage: float
    quality_score: float
    mcp_integration_status: object
  agents:
    primary_agent: string
    supporting_agents: array[string]

phases:
  - name: "research"
    agent: "research-agent"
    description: "技術調査（MCP統合）"
    type: agent_execution
    mcp_integrations:
      - "context7"
      - "deepwiki" 
      - "websearch"
    
  - name: "planning"
    agent: "planning-agent"
    description: "戦略企画"
    type: agent_execution
    
  - name: "serena_onboarding"
    agent: "serena-onboarding"
    description: "Serena MCP初期化"
    type: agent_execution
    
  - name: "tdd_cycle"
    agent: "tdd-agent"
    description: "TDDサイクル実行"
    type: agent_execution
    success_criteria:
      tdd_compliance: ">= 100%"
      test_coverage: ">= 95%"
    
  - name: "full_implementation"
    type: "multi_agent_execution"
    description: "強化版マルチエージェント実装"
    agent_orchestration:
      primary_agent: "enhanced-implementation-agent"
      fallback_agent: "impersonator-agent"
      final_fallback: "implementation-agent"
      supporting_agents:
        - "research-agent"
        - "deepwiki-research-solver"
        - "code-quality-validator"
    execution_strategy: "dynamic_agent_resolution_with_fallback"
    
  - name: "testing"
    agent: "testing-agent"
    description: "テスト実行"
    type: agent_execution
    
  - name: "documentation"
    agent: "documentation-agent"
    description: "ドキュメント生成"
    type: agent_execution
    
  - name: "human_approval_coding"
    type: human_interaction

quality_gates:
  functional_quality: ">= 100% requirement_coverage"
  technical_quality: ">= 8.0/10 + 95% test_coverage"
  security_quality: "0 critical + <= 2 medium vulnerabilities"
  performance_quality: "benchmark_achieved + memory_optimized"
  documentation_quality: ">= 90% completeness"

tdd_requirements:
  test_first_percentage: 100
  red_green_refactor_cycles: "fully_documented"
  minimal_implementation: "verified"
```

### 1.5 refactoring.yaml スキーマ

```yaml
name: "refactoring"
description: "セマンティック分析とパターン検出による体系的コードリファクタリング"
version: "1.0.0"

context_schema:
  analysis:
    code_patterns: array[object]
    refactoring_candidates: array[object]
    selected_strategy: enum[serena, similarity, standard]

phases:
  - name: "pattern_analysis"
    agent: "pattern-analyzer"
    description: "重複と類似コードパターンの特定"
    type: agent_execution
    
  - name: "code_analysis"
    agent: "code-analyzer"
    description: "コード構造と依存関係の分析"
    type: agent_execution
    
  - name: "refactoring_selection"
    agent: "refactoring-selector"
    description: "適切なリファクタリングアプローチの選択"
    type: agent_execution
    
  - name: "serena_refactoring"
    agent: "serena-refactorer"
    condition: "strategy == 'serena'"
    description: "Serena MCPによるセマンティックリファクタリング"
    type: agent_execution
    
  - name: "similarity_refactoring"
    agent: "similarity-refactorer"
    condition: "strategy == 'similarity'"
    description: "類似パターン分析による重複コード排除"
    type: agent_execution
    
  - name: "standard_refactoring"
    agent: "standard-refactorer"
    condition: "strategy == 'standard'"
    description: "標準的なリファクタリング変換"
    type: agent_execution
    
  - name: "quality_validation"
    agent: "quality-validator"
    description: "リファクタリング結果と品質改善の検証"
    type: validation
    
  - name: "human_approval_refactoring"
    type: human_interaction

quality_gates:
  functionality_preservation: "100%"
  performance_impact: "<= 5% degradation"
  quality_improvement: ">= 10%"
  technical_debt_reduction: ">= 15%"
```

### 1.6 testing.yaml スキーマ

```yaml
name: "testing"
description: "統合テストとE2Eテストオーケストレーションによる包括的テストワークフロー"
version: "1.0.0"

context_schema:
  testing:
    strategy: enum[integration, e2e, performance]
    environment: string
    coverage_results: object
    performance_metrics: object

phases:
  - name: "strategy_planning"
    agent: "test-strategist"
    description: "プロジェクト仕様に基づく包括的テスト戦略の開発"
    type: agent_execution
    
  - name: "environment_setup"
    agent: "test-env-manager"
    description: "テスト環境のセットアップと設定"
    type: agent_execution
    
  - name: "test_type_selection"
    agent: "test-type-selector"
    description: "プロジェクトニーズに基づく適切なテストアプローチの選択"
    type: agent_execution
    
  - name: "integration_testing"
    agent: "integration-tester"
    condition: "test_type == 'integration'"
    description: "包括的な統合テスト"
    type: agent_execution
    parallel_execution:
      max_suites: 5
      environment_isolation: true
    
  - name: "e2e_testing"
    agent: "e2e-tester"
    condition: "test_type == 'e2e'"
    description: "エンドツーエンドテスト"
    type: agent_execution
    frameworks:
      - "playwright"
      - "cypress"
    
  - name: "test_reporting"
    agent: "test-reporter"
    description: "包括的テストレポートと分析の生成"
    type: agent_execution
    
  - name: "human_approval_testing"
    type: human_interaction

quality_gates:
  test_coverage: ">= 85%"
  test_pass_rate: ">= 95%"
  performance_benchmarks:
    api_response_time: "< 200ms"
    page_load_time: "< 3s"
```

### 1.7 pr.yaml スキーマ

```yaml
name: "pr"
description: "包括的検証と人間承認を含む完全なプルリクエストワークフロー"
version: "1.0.0"

context_schema:
  pull_request:
    analysis_results: object
    content: object
    validation_status: enum[pending, validated, failed]
    merge_strategy: enum[squash, merge_commit, rebase]

phases:
  - name: "pr_analysis"
    agent: "pr-analyzer"
    description: "コード変更の分析とPR作成のためのインパクト評価"
    type: agent_execution
    
  - name: "pr_content_generation"
    agent: "pr-content-generator"
    description: "変更分析に基づく高品質PRコンテンツの生成"
    type: agent_execution
    
  - name: "pr_validation"
    agent: "pr-validator"
    description: "PR品質とレビュー準備状況の検証"
    type: validation
    checks:
      - "lint_check"
      - "test_execution"
      - "security_scan"
    
  - name: "pr_creation"
    agent: "pr-creator"
    description: "生成されたコンテンツとメタデータでのプルリクエスト作成"
    type: agent_execution
    
  - name: "merge_preparation"
    type: human_interaction
    description: "マージ準備と人間承認プロセスの促進"
    
  - name: "pr_merge"
    agent: "pr-merger"
    description: "検証付き安全なプルリクエストマージの実行"
    type: agent_execution
    merge_strategies:
      - "squash"
      - "merge_commit"
      - "rebase"
    
  - name: "post_merge_activities"
    agent: "post-merge-processor"
    description: "マージ後のクリーンアップと通知処理"
    type: agent_execution
    
  - name: "human_approval_pr"
    type: human_interaction

automation_features:
  reviewer_assignment: "automatic"
  label_application: "automatic"
  ci_cd_integration: "required"
  emergency_merge: "supported"
```

### 1.8 acceptance.yaml スキーマ

```yaml
name: "acceptance"
description: "人間による承認プロセスとフィードバック分析による開発フェーズの自動再実行"
version: "1.0.0"

context_schema:
  acceptance:
    review_materials: array[object]
    decision: enum[approved, approved_with_conditions, rejected, deferred]
    feedback: object
    phase_rollback_required: array[string]

phases:
  - name: "review_preparation"
    agent: "review-preparer"
    description: "包括的なレビュー資料の準備"
    type: agent_execution
    
  - name: "human_review"
    type: human_interaction
    description: "構造化された人間レビューと承認プロセス"
    approval_scope:
      - "機能要件の完全性"
      - "技術品質の妥当性"
      - "セキュリティ要件の充足"
      - "パフォーマンス要件の達成"
    timeout: 72 # hours
    
  - name: "decision_processing"
    agent: "decision-processor"
    description: "承認決定の処理と適切なアクションへのルーティング"
    type: agent_execution
    
  - name: "feedback_analysis"
    agent: "feedback-analyzer"
    condition: "decision == 'rejected'"
    description: "拒否フィードバックの分析と根本原因の特定"
    type: agent_execution
    
  - name: "phase_coordination"
    agent: "phase-coordinator"
    condition: "rollback_required == true"
    description: "開発フェーズのロールバックと再実行の調整"
    type: agent_execution
    
  - name: "re_execution_monitoring"
    agent: "re-execution-monitor"
    condition: "re_execution_started == true"
    description: "再実行プロセスの監視"
    type: agent_execution
    
  - name: "acceptance_completion"
    agent: "acceptance-finalizer"
    description: "受入れプロセスの完了と結果の文書化"
    type: agent_execution
    
  - name: "human_approval_acceptance"
    type: human_interaction

feedback_processing:
  automatic_analysis: "root_cause_identification"
  phase_mapping: "automatic"
  rollback_strategy: "phase_specific"
  re_execution_management: "systematic"

escalation_strategy:
  timeout_escalation:
    48_hours: "reminder_notification"
    72_hours: "manager_escalation"
    96_hours: "executive_escalation"
```

## 2. サブエージェント定義 YAML スキーマ

### 2.1 基本サブエージェント構造

```yaml
# サブエージェント定義構造 (.claude/agents/*.md)
---
name: string                    # 必須: エージェント名（小文字とハイフン）
description: string             # 必須: エージェントの説明
tools: array[string]            # オプション: 利用可能なツール
model: enum[sonnet, haiku]      # 推奨: 使用するモデル
color: enum[blue, green, red, yellow, purple, pink]  # オプション: UIでの表示色
---

# エージェントの詳細説明とプロンプト
```

### 2.2 プロアクティブエージェント

```yaml
---
name: "research-agent"
description: |
  包括的技術調査を担当する多目的エージェント。
  Real-time research, security analysis, performance research.
  Use proactively when technical research is needed.
tools:
  - Read
  - Write
  - Grep
  - Glob
  - WebSearch
  - mcp__context7__resolve-library-id
  - mcp__context7__get-library-docs
  - mcp__deepwiki__ask_question
model: sonnet
color: blue
---
```

### 2.3 特殊化エージェント

```yaml
---
name: "tdd-agent"
description: |
  厳格なTDD方法論実装エージェント。
  t-wada方法論による Red-Green-Refactor サイクルを強制。
tools:
  - Read
  - Write
  - Edit
  - MultiEdit
  - Bash
  - Grep
  - Glob
model: sonnet
color: green
---
```

## 3. カスタムコマンド定義 YAML スキーマ

### 3.1 基本コマンド構造

```yaml
# カスタムコマンド定義構造 (.claude/commands/*.md)
---
description: string             # 必須: コマンドの説明
allowed-tools: array[string]    # 必須: 許可されるツール
argument-hint: string           # 推奨: 引数のヒント
model: enum[sonnet, haiku]      # 推奨: 使用するモデル
---

# コマンドの詳細説明とプロンプト
```

### 3.2 オーケストレーターコマンド

```yaml
---
description: |
  CC-Deck Workflow Engine のメインエントリーポイント。
  インテリジェントワークフロー選択と状態検出。
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - Task
  - WebSearch
argument-hint: "feature-name or workflow-type"
model: sonnet
---
```

## 4. MCP統合設定スキーマ

### 4.1 MCP設定構造

```yaml
# MCP統合設定
mcp_integrations:
  deepwiki:
    enabled: boolean
    repositories: array[string]
    fallback_strategy: string
    
  context7:
    enabled: boolean
    libraries: array[string]
    cache_duration: string
    
  brave_search:
    enabled: boolean
    rate_limit: integer
    fallback_queries: array[string]

mcp_fallback_strategy:
  service_unavailable: string
  timeout_handling: string
  graceful_degradation: boolean
```

## 5. Human Approval スキーマ

### 5.1 承認ポイント構造

```yaml
# Human Approval定義
type: human_interaction
approval_scope: array[string]    # 承認項目
review_materials: array[object] # レビュー資料
decision_options:               # 決定オプション
  - approved
  - approved_with_conditions
  - rejected
  - deferred
stakeholders:                   # ステークホルダー
  required: array[string]
  optional: array[string]
timeout: integer                # タイムアウト（時間）
escalation:                     # エスカレーション
  48_hours: string
  72_hours: string
  96_hours: string
```

## 6. Quality Gates スキーマ

### 6.1 品質ゲート定義

```yaml
# 品質ゲート設定
quality_gates:
  functional_quality:           # 機能品質
    requirement_coverage: string
    edge_case_handling: string
    
  technical_quality:            # 技術品質
    test_coverage: string
    code_quality_score: string
    technical_debt_ratio: string
    
  security_quality:             # セキュリティ品質
    critical_vulnerabilities: integer
    medium_vulnerabilities: integer
    security_scan_status: string
    
  performance_quality:          # パフォーマンス品質
    benchmark_achievement: boolean
    memory_optimization: boolean
    response_time_targets: object
    
  documentation_quality:        # ドキュメント品質
    api_documentation: string
    code_comments: string
    user_documentation: string

quality_validation:
  entry_gates: array[string]
  progress_gates: array[string]
  exit_gates: array[string]
```

## 7. Error Handling & Recovery スキーマ

### 7.1 エラーハンドリング設定

```yaml
# エラーハンドリング設定
error_handling:
  retry_policy:
    max_retries: integer
    retry_delay: string
    exponential_backoff: boolean
    jitter: boolean
    
  circuit_breaker:
    failure_threshold: integer
    timeout: string
    recovery_timeout: string
    
  checkpoint_system:
    enabled: boolean
    retention_period: string
    
  escalation_matrix:
    technical_lead: array[string]
    engineering_manager: array[string]
    cto_office: array[string]

error_categories:
  transient_errors: string
  configuration_errors: string
  data_errors: string
  business_logic_errors: string
  integration_errors: string
  critical_system_errors: string
```

## 8. Monitoring & Analytics スキーマ

### 8.1 監視設定

```yaml
# 監視・分析設定
monitoring:
  metrics:
    phase_performance:
      - phase_duration
      - performance_anomaly_detection
    quality_metrics:
      - quality_score_trend
      - regression_detection
    tdd_compliance:
      - cycle_efficiency
      - compliance_rate
    mcp_integration:
      - response_time
      - availability
      - error_rate
    human_interaction:
      - approval_response_time
      - iteration_count
      
  alerts:
    performance_degradation: "> 150% baseline"
    quality_regression: "> 5% drop"
    tdd_compliance_violation: "< 95%"
    integration_issues: "> 5s response time"
    approval_timeout_risk: "> 48h pending"
    
  reporting:
    real_time_dashboard: "HTML format"
    api_integration: "JSON format"
    executive_summaries: "weekly/monthly"
    audit_reports: "complete tracking"
```

## 9. 設定カスタマイゼーション

### 9.1 プロジェクト固有設定

```yaml
# プロジェクト固有設定
project_customization:
  quality_gates:
    threshold_adjustments: object
    custom_metrics: array[object]
    
  approval_requirements:
    stakeholder_mapping: object
    timeout_configuration: object
    
  workflow_modifications:
    phase_customization: object
    agent_selection_rules: object
    
  environment_configuration:
    development: object
    staging: object
    production: object
```

## 10. 使用例とベストプラクティス

### 10.1 ワークフロー実行コマンド

```bash
# インテリジェントワークフロー選択
/orchestrator

# 明示的ワークフロー指定
/orchestrator "kiro-sdd user-authentication"
/orchestrator "coding REST-API-service"

# 中断されたワークフローの再開
/orchestrator "resume user-authentication"
```

### 10.2 設定ファイル配置

```
.cc-deck/config/
├── workflows/           # ワークフロー定義
│   ├── acceptance.yaml
│   ├── coding.yaml
│   ├── dev-env-setup.yaml
│   ├── kiro-sdd.yaml
│   ├── pr.yaml
│   ├── refactoring.yaml
│   └── testing.yaml
└── engine/             # エンジン設定
    └── workflow-engine.md

.claude/
├── agents/             # サブエージェント定義
└── commands/           # カスタムコマンド定義
```

## まとめ

CC-Deck Workflow Engineで使用されるYAMLスキーマは、以下の特徴を持つ統一された設計パターンに基づいています：

- **統一性**: 全ワークフローで共通の構造とパターン
- **拡張性**: プロジェクト固有のカスタマイゼーション対応
- **堅牢性**: エラーハンドリングと品質保証の統合
- **監視可能性**: 包括的なモニタリングとアナリティクス
- **人間中心**: 適切な承認ポイントとフィードバック処理

このスキーマ体系により、高品質で一貫性のある開発ワークフローが実現され、企業レベルの要件に対応可能な堅牢な開発環境を提供します。