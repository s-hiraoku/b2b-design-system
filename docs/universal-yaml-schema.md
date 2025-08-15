# CC-Deck YAML Meta-Schema Definition

## 概要

このドキュメントは、CC-Deck Workflow Engineで使用される全てのYAMLファイルを定義するための**メタスキーマ**を提供します。メタスキーマとは「スキーマのスキーマ」であり、ワークフロー、エージェント、コマンドなど、あらゆるYAML定義の構造的基盤となる抽象的なフレームワークです。

既存の7つのワークフロー、サブエージェント定義、カスタムコマンド定義から抽出された全パターンを網羅し、将来の拡張にも対応可能な包括的なメタスキーマ体系を定義します。

## 1. Meta-Schema Architecture

### 1.1 Core Entity Meta-Schema

このメタスキーマは、全てのCC-Deckエンティティ（ワークフロー、エージェント、コマンド等）が継承すべき基本構造を定義します。

```yaml
# CC-Deck エンティティ・メタスキーマ
# 全てのワークフロー、エージェント、コマンドが継承すべき基本構造
cc_deck_entity_meta_schema:
  # === 必須メタデータ ===
  name: string                    # エンティティ名
  description: string | multiline # エンティティの説明
  version: string                 # バージョン番号 (semantic versioning)
  
  # === オプショナルメタデータ ===
  type: enum[workflow, agent, command, config, template]
  category: string                # カテゴリ分類
  tags: array[string]             # タグ付け
  author: string                  # 作成者
  created_at: datetime            # 作成日時
  updated_at: datetime            # 更新日時
  deprecated: boolean             # 非推奨フラグ
  experimental: boolean           # 実験的フラグ
```

### 1.2 Context Meta-Schema Framework

```yaml
# CC-Deck コンテキスト・メタスキーマ
# 全エンティティのコンテキスト情報を定義するための抽象フレームワーク
cc_deck_context_meta_schema:
  # === プロジェクト情報 ===
  project:
    name: string
    type: enum[web, mobile, desktop, api, library, tool, system]
    complexity: enum[trivial, low, medium, high, critical]
    technology_stack: array[string]
    framework: string
    language: array[string]
    domain: string
    scale: enum[prototype, small, medium, large, enterprise]
    
  # === 実行状態 ===
  execution:
    current_phase: string
    completed_phases: array[string]
    failed_phases: array[string]
    skipped_phases: array[string]
    phase_history: array[object]
    checkpoint_data: object
    
  # === 品質情報 ===
  quality:
    current_score: float
    target_score: float
    quality_metrics: object
    compliance_status: object
    
  # === 環境情報 ===
  environment:
    target_env: enum[development, staging, production]
    setup_status: enum[pending, configuring, ready, failed]
    requirements: array[string]
    constraints: array[string]
    
  # === 動的拡張フィールド ===
  custom_context: object          # プロジェクト固有の追加コンテキスト
  external_integrations: object   # 外部統合情報
  user_preferences: object        # ユーザー設定
```

### 1.3 Phase Meta-Schema Framework

```yaml
# CC-Deck フェーズ・メタスキーマ
# ワークフロー内の実行単位を定義するための抽象フレームワーク
cc_deck_phase_meta_schema:
  # === 基本情報 ===
  name: string                    # フェーズ名
  description: string | multiline # フェーズ説明
  type: enum[
    agent_execution,              # エージェント実行
    human_interaction,            # 人間との相互作用
    validation,                   # 検証プロセス
    multi_agent_execution,        # 複数エージェント実行
    conditional_execution,        # 条件付き実行
    parallel_execution,           # 並列実行
    loop_execution,              # ループ実行
    external_integration,         # 外部統合
    data_processing,             # データ処理
    notification,                # 通知
    checkpoint,                  # チェックポイント
    rollback,                    # ロールバック
    cleanup                      # クリーンアップ
  ]
  
  # === 実行制御 ===
  execution_control:
    agent: string                 # 実行エージェント
    condition: string | object    # 実行条件
    timeout: duration             # タイムアウト
    retry_policy: object          # リトライポリシー
    dependencies: array[string]   # 依存関係
    prerequisites: array[string]  # 前提条件
    concurrent: boolean           # 並列実行可能
    
  # === データフロー ===
  data_flow:
    inputs: array[object]         # 入力データ
    outputs: array[object]        # 出力データ
    transformations: array[object] # データ変換
    validation_rules: array[object] # データ検証ルール
    
  # === 成功・失敗基準 ===
  criteria:
    success_criteria: object      # 成功基準
    failure_criteria: object      # 失敗基準
    completion_signals: array[string] # 完了シグナル
    quality_gates: object         # 品質ゲート
    
  # === フロー制御 ===
  flow_control:
    next_phase: string | object   # 次のフェーズ
    on_success: string | object   # 成功時のアクション
    on_failure: string | object   # 失敗時のアクション
    fallback_strategy: object     # フォールバック戦略
    escalation_path: array[string] # エスカレーションパス
    
  # === 外部統合 ===
  integrations:
    mcp_integrations: array[string] # MCP統合
    external_services: array[object] # 外部サービス
    apis: array[object]           # API統合
    webhooks: array[object]       # Webhook設定
    
  # === 監視・ログ ===
  observability:
    metrics: array[string]        # メトリクス
    logs: object                  # ログ設定
    traces: object                # トレース設定
    alerts: array[object]         # アラート設定
    
  # === 人間相互作用設定 ===
  human_interaction:
    approval_scope: array[string] # 承認範囲
    review_materials: array[object] # レビュー資料
    decision_options: array[string] # 決定オプション
    stakeholders: object          # ステークホルダー
    notification_settings: object # 通知設定
    
  # === 動的設定 ===
  dynamic_config: object          # 動的設定
  environment_specific: object    # 環境固有設定
  feature_flags: object           # フィーチャーフラグ
```

### 1.4 Agent Meta-Schema Framework

```yaml
# CC-Deck エージェント・メタスキーマ
# サブエージェントの構造と機能を定義するための抽象フレームワーク
cc_deck_agent_meta_schema:
  # === 基本情報 ===
  name: string                    # エージェント名（kebab-case）
  description: string | multiline # エージェント説明
  
  # === 機能定義 ===
  capabilities:
    primary_purpose: string       # 主要目的
    secondary_purposes: array[string] # 副次的目的
    specializations: array[string] # 専門分野
    use_cases: array[string]      # 使用ケース
    proactive_triggers: array[string] # プロアクティブ発動条件
    
  # === 技術設定 ===
  technical:
    model: enum[sonnet, haiku, opus] # 使用モデル
    tools: array[string]          # 利用可能ツール
    permissions: array[string]    # 権限設定
    resource_limits: object       # リソース制限
    
  # === UI/UX設定 ===
  presentation:
    color: enum[blue, green, red, yellow, purple, pink, orange, cyan]
    icon: string                  # アイコン識別子
    category: string              # カテゴリ
    priority: integer             # 優先度
    
  # === 協調設定 ===
  collaboration:
    delegation_patterns: array[object] # 委譲パターン
    coordination_rules: array[object] # 連携ルール
    communication_protocols: object   # 通信プロトコル
    
  # === 品質・パフォーマンス ===
  quality:
    performance_expectations: object # パフォーマンス期待値
    quality_standards: object     # 品質基準
    validation_rules: array[object] # 検証ルール
    
  # === 学習・適応 ===
  learning:
    feedback_integration: boolean # フィードバック統合
    adaptation_rules: array[object] # 適応ルール
    knowledge_base: object        # 知識ベース参照
```

### 1.5 Command Meta-Schema Framework

```yaml
# CC-Deck コマンド・メタスキーマ
# カスタムスラッシュコマンドを定義するための抽象フレームワーク
cc_deck_command_meta_schema:
  # === 基本情報 ===
  description: string | multiline # コマンド説明
  
  # === 実行設定 ===
  execution:
    model: enum[sonnet, haiku, opus] # 使用モデル
    allowed_tools: array[string]  # 許可ツール
    timeout: duration             # タイムアウト
    resource_limits: object       # リソース制限
    
  # === 引数・パラメータ ===
  parameters:
    argument_hint: string         # 引数ヒント
    required_args: array[object]  # 必須引数
    optional_args: array[object]  # オプション引数
    validation_rules: array[object] # 引数検証ルール
    default_values: object        # デフォルト値
    
  # === 使用制御 ===
  access_control:
    permissions: array[string]    # 必要権限
    rate_limits: object          # レート制限
    usage_quotas: object         # 使用量制限
    
  # === 動作制御 ===
  behavior:
    interactive: boolean          # インタラクティブモード
    streaming: boolean            # ストリーミング出力
    async_execution: boolean      # 非同期実行
    background_capable: boolean   # バックグラウンド実行可能
    
  # === 統合設定 ===
  integrations:
    workflow_integration: object  # ワークフロー統合
    agent_delegation: array[string] # エージェント委譲
    external_hooks: array[object] # 外部フック
```

## 2. Specialized Meta-Schema Extensions

以下のメタスキーマ拡張は、特定の機能領域に特化した抽象的な構造を提供します。

### 2.1 Error Handling Meta-Schema

```yaml
# CC-Deck エラーハンドリング・メタスキーマ
# エラー処理と復旧機能を定義するための抽象フレームワーク
cc_deck_error_handling_meta_schema:
  # === リトライポリシー ===
  retry_policy:
    max_retries: integer          # 最大リトライ回数
    retry_delay: duration         # リトライ間隔
    exponential_backoff: boolean  # 指数バックオフ
    jitter: boolean              # ジッター追加
    backoff_multiplier: float    # バックオフ倍率
    max_delay: duration          # 最大遅延
    
  # === サーキットブレーカー ===
  circuit_breaker:
    failure_threshold: integer    # 失敗閾値
    timeout: duration            # タイムアウト
    recovery_timeout: duration   # 回復タイムアウト
    half_open_requests: integer  # ハーフオープン時のリクエスト数
    
  # === チェックポイントシステム ===
  checkpoint_system:
    enabled: boolean             # チェックポイント有効
    frequency: duration          # 作成頻度
    retention_period: duration   # 保持期間
    compression: boolean         # 圧縮
    encryption: boolean          # 暗号化
    
  # === エスカレーション ===
  escalation:
    escalation_matrix: object    # エスカレーション行列
    notification_channels: array[object] # 通知チャネル
    severity_levels: array[string] # 重要度レベル
    
  # === グレースフル劣化 ===
  graceful_degradation:
    fallback_strategies: array[object] # フォールバック戦略
    service_dependencies: object # サービス依存関係
    critical_path_protection: object # クリティカルパス保護
    
  # === エラーカテゴリ ===
  error_categories:
    transient_errors: object     # 一時的エラー
    configuration_errors: object # 設定エラー
    data_errors: object          # データエラー
    business_logic_errors: object # ビジネスロジックエラー
    integration_errors: object   # 統合エラー
    critical_system_errors: object # 重要システムエラー
    user_errors: object          # ユーザーエラー
    security_errors: object      # セキュリティエラー
```

### 2.2 Quality Gates Meta-Schema

```yaml
# CC-Deck 品質ゲート・メタスキーマ
# 品質保証と検証機能を定義するための抽象フレームワーク
cc_deck_quality_gates_meta_schema:
  # === 機能品質 ===
  functional_quality:
    requirement_coverage: percentage # 要件カバレッジ
    edge_case_handling: quality_level # エッジケース処理
    user_story_completion: percentage # ユーザーストーリー完了
    acceptance_criteria_met: boolean # 受入れ基準達成
    
  # === 技術品質 ===
  technical_quality:
    test_coverage: object        # テストカバレッジ
    code_quality_score: float    # コード品質スコア
    technical_debt_ratio: percentage # 技術的負債比率
    performance_benchmarks: object # パフォーマンスベンチマーク
    maintainability_index: float # 保守性指標
    complexity_metrics: object   # 複雑度メトリクス
    
  # === セキュリティ品質 ===
  security_quality:
    vulnerability_scan: object   # 脆弱性スキャン
    security_compliance: object  # セキュリティコンプライアンス
    access_control_validation: boolean # アクセス制御検証
    data_protection_compliance: boolean # データ保護コンプライアンス
    
  # === パフォーマンス品質 ===
  performance_quality:
    response_time_targets: object # レスポンス時間目標
    throughput_requirements: object # スループット要件
    resource_utilization: object # リソース使用率
    scalability_metrics: object  # スケーラビリティメトリクス
    
  # === ユーザー体験品質 ===
  user_experience_quality:
    usability_score: float       # ユーザビリティスコア
    accessibility_compliance: object # アクセシビリティコンプライアンス
    user_satisfaction: object    # ユーザー満足度
    interface_consistency: boolean # インターフェース一貫性
    
  # === 運用品質 ===
  operational_quality:
    deployment_readiness: boolean # デプロイ準備完了
    monitoring_coverage: percentage # 監視カバレッジ
    documentation_completeness: percentage # ドキュメント完成度
    disaster_recovery_readiness: boolean # 災害復旧準備
    
  # === プロセス品質 ===
  process_quality:
    workflow_compliance: boolean # ワークフローコンプライアンス
    review_completion: boolean   # レビュー完了
    approval_status: enum[pending, approved, rejected] # 承認状況
    audit_trail_completeness: boolean # 監査証跡完全性
    
  # === 品質検証設定 ===
  validation_config:
    entry_gates: array[string]   # エントリーゲート
    progress_gates: array[string] # プログレスゲート
    exit_gates: array[string]    # エグジットゲート
    blocking_criteria: array[string] # ブロッキング基準
    warning_criteria: array[string] # 警告基準
```

### 2.3 Monitoring Meta-Schema

```yaml
# CC-Deck 監視・分析・メタスキーマ
# モニタリングと分析機能を定義するための抽象フレームワーク
cc_deck_monitoring_meta_schema:
  # === メトリクス定義 ===
  metrics:
    # パフォーマンスメトリクス
    performance_metrics:
      execution_time: object     # 実行時間
      resource_usage: object     # リソース使用量
      throughput: object         # スループット
      latency: object           # レイテンシ
      error_rate: object        # エラー率
      
    # 品質メトリクス
    quality_metrics:
      quality_score_trend: object # 品質スコア推移
      regression_detection: object # 回帰検出
      compliance_rate: object    # コンプライアンス率
      
    # ビジネスメトリクス
    business_metrics:
      completion_rate: object    # 完了率
      user_satisfaction: object  # ユーザー満足度
      business_value_delivered: object # ビジネス価値提供
      
    # 運用メトリクス
    operational_metrics:
      availability: object       # 可用性
      reliability: object        # 信頼性
      recovery_time: object      # 復旧時間
      
  # === アラート設定 ===
  alerts:
    # 閾値ベースアラート
    threshold_alerts:
      performance_degradation: string # パフォーマンス劣化
      quality_regression: string # 品質回帰
      error_spike: string        # エラー急増
      resource_exhaustion: string # リソース枯渇
      
    # トレンドベースアラート
    trend_alerts:
      declining_performance: object # パフォーマンス低下傾向
      increasing_complexity: object # 複雑度増加傾向
      
    # 異常検知アラート
    anomaly_alerts:
      behavior_anomaly: object   # 動作異常
      pattern_deviation: object  # パターン逸脱
      
  # === レポート設定 ===
  reporting:
    # リアルタイムレポート
    real_time:
      dashboard_config: object   # ダッシュボード設定
      live_metrics: array[string] # ライブメトリクス
      
    # 定期レポート
    scheduled:
      daily_reports: object      # 日次レポート
      weekly_reports: object     # 週次レポート
      monthly_reports: object    # 月次レポート
      
    # 特別レポート
    special:
      incident_reports: object   # インシデントレポート
      audit_reports: object      # 監査レポート
      compliance_reports: object # コンプライアンスレポート
      
  # === データ収集 ===
  data_collection:
    sampling_strategy: object    # サンプリング戦略
    retention_policy: object     # 保持ポリシー
    data_privacy: object         # データプライバシー
    export_formats: array[string] # エクスポート形式
```

### 2.4 Integration Meta-Schema

```yaml
# CC-Deck 外部統合・メタスキーマ
# 外部システムとの統合を定義するための抽象フレームワーク
cc_deck_integration_meta_schema:
  # === MCP統合 ===
  mcp_integrations:
    # サービス定義
    services:
      deepwiki:
        enabled: boolean
        configuration: object
        fallback_strategy: object
        rate_limits: object
        
      context7:
        enabled: boolean
        configuration: object
        cache_settings: object
        
      brave_search:
        enabled: boolean
        query_optimization: object
        result_filtering: object
        
      playwright:
        enabled: boolean
        browser_config: object
        automation_settings: object
        
      vercel:
        enabled: boolean
        deployment_config: object
        monitoring_integration: object
        
    # フォールバック戦略
    fallback_strategies:
      service_unavailable: object
      timeout_handling: object
      graceful_degradation: object
      
  # === 外部API統合 ===
  external_apis:
    authentication:
      oauth2: object             # OAuth2設定
      api_keys: object           # APIキー管理
      jwt: object               # JWT設定
      
    rate_limiting:
      requests_per_minute: integer
      burst_limit: integer
      backoff_strategy: object
      
    data_transformation:
      request_mapping: array[object] # リクエストマッピング
      response_mapping: array[object] # レスポンスマッピング
      validation: array[object]  # データ検証
      
  # === Webhook統合 ===
  webhooks:
    inbound:
      endpoints: array[object]   # 受信エンドポイント
      security: object          # セキュリティ設定
      processing: object        # 処理設定
      
    outbound:
      targets: array[object]     # 送信先
      retry_policy: object      # リトライポリシー
      payload_templates: array[object] # ペイロードテンプレート
      
  # === 通知統合 ===
  notifications:
    channels:
      email: object             # メール通知
      slack: object             # Slack通知
      teams: object             # Teams通知
      sms: object               # SMS通知
      push: object              # プッシュ通知
      
    routing:
      escalation_rules: array[object] # エスカレーションルール
      filtering_rules: array[object] # フィルタリングルール
      
  # === データストア統合 ===
  data_stores:
    databases:
      relational: array[object]  # リレーショナルDB
      nosql: array[object]       # NoSQLDB
      cache: array[object]       # キャッシュ
      
    file_systems:
      local: object             # ローカルファイルシステム
      cloud: array[object]      # クラウドストレージ
      
    message_queues:
      async_processing: array[object] # 非同期処理
      event_streaming: array[object] # イベントストリーミング
```

## 3. Meta-Schema Composition Patterns

メタスキーマの合成パターンは、異なるメタスキーマ要素を組み合わせて特定のユースケースに特化したスキーマを構築する方法を定義します。

### 3.1 Meta-Schema Inheritance & Composition

```yaml
# CC-Deck メタスキーマ合成パターン
# YAML anchors/referencesを使用したメタスキーマ継承と合成
cc_deck_meta_schema_composition:
  # === YAML Anchors & References ===
  yaml_anchors:
    base_definitions: &base
      common_field: value
      
    specialized_definitions:
      <<: *base              # 継承
      additional_field: value # 追加
      
  # === Template Composition ===
  templates:
    base_workflow_template: &base_workflow
      name: string
      description: string
      context_schema: *cc_deck_context_meta_schema
      error_handling: *cc_deck_error_handling_meta_schema
      
    specialized_workflow:
      <<: *base_workflow
      specialized_phases: array[object]
      
  # === Mixin Patterns ===
  mixins:
    quality_mixin: &quality_mixin
      quality_gates: *cc_deck_quality_gates_meta_schema
      validation: *cc_deck_validation_meta_schema
      
    monitoring_mixin: &monitoring_mixin
      monitoring: *cc_deck_monitoring_meta_schema
      alerts: *cc_deck_alerts_meta_schema
      
    integration_mixin: &integration_mixin
      integrations: *cc_deck_integration_meta_schema
      
  # === Conditional Composition ===
  conditional_composition:
    environment_specific:
      development: &dev_config
        debug: true
        verbose_logging: true
        
      production: &prod_config
        debug: false
        performance_optimized: true
        
    feature_flags:
      experimental_features: &experimental
        new_feature_enabled: true
        
      stable_features: &stable
        proven_features_only: true
```

### 3.2 Configuration Overrides

```yaml
# 設定オーバーライドパターン
override_patterns:
  # === 環境別オーバーライド ===
  environment_overrides:
    base_config: &base_config
      timeout: 30s
      retries: 3
      
    development:
      <<: *base_config
      timeout: 60s           # 開発環境では長めのタイムアウト
      debug_mode: true
      
    production:
      <<: *base_config
      retries: 5             # 本番環境では多めのリトライ
      monitoring_level: detailed
      
  # === プロジェクト別オーバーライド ===
  project_overrides:
    default_project: &default_project
      quality_threshold: 8.0
      test_coverage: 95
      
    high_criticality_project:
      <<: *default_project
      quality_threshold: 9.5  # より高い品質要求
      test_coverage: 98
      security_level: maximum
      
  # === 段階的設定 ===
  progressive_configuration:
    phase1: &phase1
      basic_features: enabled
      
    phase2:
      <<: *phase1
      intermediate_features: enabled
      
    phase3:
      <<: *phase2
      advanced_features: enabled
```

## 4. Meta-Schema Validation & Documentation

### 4.1 Meta-Schema Validation Rules

```yaml
# CC-Deck メタスキーマ検証ルール
# メタスキーマの構造的整合性と一貫性を保証するための検証フレームワーク
cc_deck_meta_schema_validation:
  # === 必須フィールド検証 ===
  required_fields:
    entity_level: [name, description, version]
    phase_level: [name, type, description]
    agent_level: [name, description]
    
  # === データ型検証 ===
  type_validation:
    string_fields:
      pattern_validation: true
      length_limits: object
      
    numeric_fields:
      range_validation: true
      precision_limits: object
      
    array_fields:
      element_validation: true
      size_limits: object
      
  # === 関係性検証 ===
  relationship_validation:
    dependency_cycles: forbidden
    reference_integrity: required
    constraint_satisfaction: required
    
  # === ビジネスルール検証 ===
  business_rules:
    workflow_completeness: required
    phase_dependencies: validated
    quality_gate_consistency: required
```

### 4.2 Meta-Schema Documentation Standards

```yaml
# CC-Deck メタスキーマドキュメント標準
# メタスキーマの文書化要件と品質標準
cc_deck_meta_schema_documentation_standards:
  # === スキーマドキュメント ===
  schema_documentation:
    field_descriptions: required
    example_values: provided
    constraint_explanations: detailed
    usage_guidelines: comprehensive
    
  # === 変更管理 ===
  change_management:
    version_history: tracked
    breaking_changes: highlighted
    migration_guides: provided
    deprecation_notices: clear
    
  # === 使用例 ===
  usage_examples:
    basic_examples: multiple
    advanced_examples: provided
    anti_patterns: documented
    best_practices: outlined
```

## 5. Meta-Schema Usage Examples

以下の例は、CC-Deckメタスキーマを使用して実際のYAML定義を作成する方法を示しています。

### 5.1 Meta-Schema Based Workflow Creation

```yaml
# CC-Deckメタスキーマを使用したワークフロー作成例
name: "example-workflow"
description: "Example workflow using CC-Deck meta-schema"
version: "1.0.0"
type: workflow

# メタスキーマからの継承とカスタマイズ
context_schema:
  <<: *cc_deck_context_meta_schema
  # プロジェクト固有の追加コンテキスト
  custom_context:
    example_specific_field: string

phases:
  - name: "preparation"
    <<: *cc_deck_phase_meta_schema
    type: agent_execution
    execution_control:
      agent: "preparation-agent"
    criteria:
      success_criteria:
        preparation_complete: true

# メタスキーマからの合成
error_handling:
  <<: *cc_deck_error_handling_meta_schema

quality_gates:
  <<: *cc_deck_quality_gates_meta_schema

monitoring:
  <<: *cc_deck_monitoring_meta_schema
```

### 5.2 Meta-Schema Based Agent Creation

```yaml
# CC-Deckメタスキーマを使用したエージェント作成例
---
name: "example-agent"
description: |
  Example agent using CC-Deck agent meta-schema.
  Demonstrates specialized capabilities with standardized structure.

# メタスキーマからの継承と特化
capabilities:
  <<: *cc_deck_agent_meta_schema.capabilities
  primary_purpose: "specialized task execution"
  specializations: ["domain-specific", "performance-optimized"]

technical:
  <<: *cc_deck_agent_meta_schema.technical
  model: sonnet
  tools: ["Read", "Write", "Edit", "Bash"]

collaboration:
  <<: *cc_deck_agent_meta_schema.collaboration

quality:
  <<: *cc_deck_agent_meta_schema.quality
---
```

### 5.3 Meta-Schema Based Command Creation

```yaml
# CC-Deckメタスキーマを使用したコマンド作成例
---
description: |
  Example command using CC-Deck command meta-schema.
  Demonstrates parameter handling and integration capabilities.

# メタスキーマからの継承
execution:
  <<: *cc_deck_command_meta_schema.execution
  model: sonnet
  allowed_tools: ["Read", "Write", "Task", "Bash"]

parameters:
  <<: *cc_deck_command_meta_schema.parameters
  argument_hint: "feature-name [options]"
  required_args:
    - name: "feature_name"
      type: string
      description: "Name of the feature to process"

integrations:
  <<: *cc_deck_command_meta_schema.integrations
  workflow_integration:
    automatic_workflow_selection: true
---
```

## まとめ

このCC-Deck YAMLメタスキーマは以下の特徴を持ちます：

### メタスキーマの利点

- **完全抽象化**: 全エンティティタイプの統一的な抽象フレームワーク
- **完全網羅性**: 既存の全パターンとユースケースを網羅した包括的な構造
- **高い再利用性**: YAML anchors/referencesによるメタスキーマコンポーネントの効率的な合成
- **段階的特化**: 抽象メタスキーマから具体的実装までの段階的特化
- **構造的一貫性**: 全エンティティタイプで統一されたメタスキーマアーキテクチャ
- **将来対応性**: メタスキーマレベルでの拡張による新しい要件への容易な対応
- **品質保証**: メタスキーマレベルでの包括的な検証ルールと文書化標準
- **開発効率性**: メタスキーマベースの迅速なスキーマ定義とプロトタイピング

### アーキテクチャルインパクト

このメタスキーマアーキテクチャにより、CC-Deck Workflow Engineの全コンポーネントが統一されたメタスキーマ体系の下で開発・管理され、保守性、品質、拡張性が大幅に向上します。

これは単なるスキーマ定義ではなく、**スキーマのスキーマ**としてのCC-Deckプラットフォームの構造的基盤を提供し、将来のあらゆるYAMLベースの設定ファイルに対する統一的なアプローチを実現します。