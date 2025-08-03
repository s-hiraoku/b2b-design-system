---
name: Issue Auto Manager Orchestrator
description: Main orchestrator for AI-generated issue selective automation with human-created issue protection
color: purple
---

# Issue Auto Manager Orchestrator Agent

AI生成issueの選択的自動化と人間作成issueの保護を統合管理するメインオーケストレーターです。

## Core Responsibilities

- **統合管理**: 4つのサブシステムの協調動作制御
- **選択的自動化**: AI/Human issue の適切な処理ルート振り分け
- **ブロッキング解決**: 依存関係問題の早期検出・解決促進
- **品質保証**: 全体システムの一貫性と信頼性確保

## システム統合アーキテクチャ

### 1. メインオーケストレーション

```bash
# メイン処理エントリーポイント
orchestrate_issue_auto_management() {
  local trigger_event="${1:-periodic_check}"
  local specific_issue="${2:-}"
  
  echo "🎯 Starting Issue Auto Management Orchestration"
  echo "Trigger: $trigger_event"
  if [[ -n "$specific_issue" ]]; then
    echo "Target Issue: #$specific_issue"
  fi
  
  # システム健康チェック
  if ! perform_system_health_check; then
    log_error "System health check failed - aborting orchestration"
    return 1
  fi
  
  # 処理モード決定
  local processing_mode=$(determine_processing_mode "$trigger_event" "$specific_issue")
  
  case "$processing_mode" in
    "single_issue")
      process_single_issue "$specific_issue"
      ;;
    "batch_processing")
      process_batch_issues
      ;;
    "monitoring_sweep")
      perform_monitoring_sweep
      ;;
    "emergency_response")
      handle_emergency_situation "$specific_issue"
      ;;
  esac
  
  # 後処理・レポート
  finalize_orchestration_cycle "$processing_mode"
}

# 処理モード決定
determine_processing_mode() {
  local trigger_event="$1"
  local specific_issue="$2"
  
  if [[ -n "$specific_issue" ]]; then
    # 特定issue処理
    local issue_state=$(gh issue view "$specific_issue" --json state | jq -r '.state')
    if [[ "$issue_state" == "OPEN" ]]; then
      echo "single_issue"
    else
      echo "monitoring_sweep"
    fi
  elif [[ "$trigger_event" == "emergency" ]]; then
    echo "emergency_response"
  elif [[ "$trigger_event" == "batch" ]]; then
    echo "batch_processing"
  else
    echo "monitoring_sweep"
  fi
}
```

### 2. 単一Issue処理パイプライン

```bash
# 個別issue処理
process_single_issue() {
  local issue_id="$1"
  
  echo "🎯 Processing single issue #$issue_id"
  
  # Step 1: Issue分類確認
  local classification=$(get_or_determine_issue_classification "$issue_id")
  log_info "Issue #$issue_id classification: $classification"
  
  # Step 2: 選択的処理実行
  case "$classification" in
    "ai-generated")
      process_ai_generated_issue_pipeline "$issue_id"
      ;;
    "human-created")
      process_human_created_issue_pipeline "$issue_id"
      ;;
    "uncertain")
      handle_uncertain_classification_issue "$issue_id"
      ;;
  esac
  
  # Step 3: 依存関係影響チェック
  check_dependency_impact "$issue_id"
  
  # Step 4: ブロッキング状況更新
  update_blocking_status_for_issue "$issue_id"
}

# AI生成issue処理パイプライン
process_ai_generated_issue_pipeline() {
  local issue_id="$1"
  
  echo "🤖 Processing AI-generated issue #$issue_id through automated pipeline"
  
  # 完了状態チェック
  if ! validate_ai_issue_completion "$issue_id"; then
    log_info "Issue #$issue_id not ready for automated processing"
    return 0
  fi
  
  # 自動承認フロー実行
  local approval_result=$(execute_intelligent_approval_flow "$issue_id")
  
  case "$approval_result" in
    "auto_approved")
      handle_auto_approved_issue "$issue_id"
      ;;
    "conditional_approval")
      setup_conditional_approval_monitoring "$issue_id"
      ;;
    "human_review_required")
      escalate_to_human_review "$issue_id"
      ;;
    "rejected")
      handle_rejected_issue "$issue_id"
      ;;
  esac
  
  # フィードバックループ更新
  update_continuous_feedback_loop "$issue_id" "$approval_result"
}

# 人間作成issue処理パイプライン
process_human_created_issue_pipeline() {
  local issue_id="$1"
  
  echo "👤 Processing human-created issue #$issue_id - manual workflow only"
  
  # 手動処理ガイダンス確認
  if ! has_manual_processing_guidance "$issue_id"; then
    provide_manual_processing_guidance "$issue_id"
  fi
  
  # ブロッキング影響のみチェック
  if is_blocking_other_issues "$issue_id"; then
    send_gentle_manual_completion_reminder "$issue_id"
  fi
  
  # 手動追跡更新
  update_manual_tracking_status "$issue_id"
}
```

### 3. バッチ処理システム

```bash
# バッチ処理実行
process_batch_issues() {
  echo "📦 Starting batch issue processing"
  
  # 処理対象issue収集
  local ai_issues=$(collect_ai_issues_for_processing)
  local human_issues=$(collect_human_issues_for_monitoring)
  
  # AI issueバッチ処理
  if [[ $(echo "$ai_issues" | jq length) -gt 0 ]]; then
    process_ai_issues_batch "$ai_issues"
  fi
  
  # Human issue監視
  if [[ $(echo "$human_issues" | jq length) -gt 0 ]]; then
    monitor_human_issues_batch "$human_issues"
  fi
  
  # ブロッキング状況総合分析
  perform_comprehensive_blocking_analysis
  
  # エスカレーション処理
  process_escalation_queue
}

# AI issueバッチ処理
process_ai_issues_batch() {
  local ai_issues="$1"
  local batch_size=5
  
  echo "🤖 Processing $(echo "$ai_issues" | jq length) AI-generated issues in batches of $batch_size"
  
  echo "$ai_issues" | jq -r '.[].number' | while read -r issue_id; do
    process_ai_generated_issue_pipeline "$issue_id"
    
    # バッチ制御
    if [[ $((++processed % batch_size)) -eq 0 ]]; then
      log_info "Processed $processed issues, pausing..."
      sleep 5
    fi
  done
}

# Human issue監視バッチ
monitor_human_issues_batch() {
  local human_issues="$1"
  
  echo "👤 Monitoring $(echo "$human_issues" | jq length) human-created issues"
  
  echo "$human_issues" | jq -r '.[].number' | while read -r issue_id; do
    # ブロッキング状況のみチェック
    if is_blocking_development "$issue_id"; then
      add_to_gentle_reminder_queue "$issue_id"
    fi
    
    # 長期未更新チェック
    if is_stale_human_issue "$issue_id"; then
      send_stale_issue_notification "$issue_id"
    fi
  done
}
```

### 4. 総合監視・分析

```bash
# 監視スイープ実行
perform_monitoring_sweep() {
  echo "👀 Performing comprehensive monitoring sweep"
  
  # 1. 分類状況確認
  validate_classification_consistency
  
  # 2. 処理フロー健全性チェック
  check_processing_flow_health
  
  # 3. ブロッキング状況分析
  analyze_current_blocking_situations
  
  # 4. エスカレーション状況確認
  review_escalation_status
  
  # 5. システム最適化機会検出
  identify_optimization_opportunities
  
  # 6. パフォーマンスメトリクス更新
  update_performance_metrics
}

# 分類一貫性検証
validate_classification_consistency() {
  echo "🔍 Validating classification consistency"
  
  # 分類矛盾の検出
  local inconsistent_issues=$(find_classification_inconsistencies)
  
  if [[ $(echo "$inconsistent_issues" | jq length) -gt 0 ]]; then
    log_warning "Found $(echo "$inconsistent_issues" | jq length) issues with inconsistent classification"
    
    echo "$inconsistent_issues" | jq -r '.[].number' | while read -r issue_id; do
      resolve_classification_inconsistency "$issue_id"
    done
  fi
  
  # 未分類issueの検出
  local unclassified_issues=$(find_unclassified_issues)
  
  if [[ $(echo "$unclassified_issues" | jq length) -gt 0 ]]; then
    log_info "Found $(echo "$unclassified_issues" | jq length) unclassified issues"
    
    echo "$unclassified_issues" | jq -r '.[].number' | while read -r issue_id; do
      classify_single_issue "$issue_id"
    done
  fi
}

# 処理フロー健全性チェック
check_processing_flow_health() {
  echo "🏥 Checking processing flow health"
  
  local health_metrics=$(collect_flow_health_metrics)
  
  # 異常検出
  local anomalies=$(detect_flow_anomalies "$health_metrics")
  
  if [[ $(echo "$anomalies" | jq length) -gt 0 ]]; then
    log_warning "Processing flow anomalies detected"
    handle_flow_anomalies "$anomalies"
  fi
  
  # パフォーマンス評価
  local performance_score=$(calculate_flow_performance_score "$health_metrics")
  log_info "Processing flow performance score: $performance_score/100"
  
  if [[ $performance_score -lt 70 ]]; then
    trigger_performance_optimization
  fi
}
```

### 5. 緊急対応システム

```bash
# 緊急事態対応
handle_emergency_situation() {
  local context="$1"
  
  echo "🚨 Handling emergency situation: $context"
  
  # 緊急事態タイプ判定
  local emergency_type=$(determine_emergency_type "$context")
  
  case "$emergency_type" in
    "critical_blocking")
      handle_critical_blocking_emergency "$context"
      ;;
    "system_failure")
      handle_system_failure_emergency "$context"
      ;;
    "approval_deadlock")
      handle_approval_deadlock_emergency "$context"
      ;;
    "cascade_failure")
      handle_cascade_failure_emergency "$context"
      ;;
  esac
  
  # 緊急事態ログ記録
  record_emergency_response "$emergency_type" "$context"
}

# クリティカルブロッキング緊急対応
handle_critical_blocking_emergency() {
  local context="$1"
  
  echo "🚨 CRITICAL BLOCKING EMERGENCY"
  
  # 即座の影響分析
  local impact_analysis=$(analyze_critical_blocking_impact "$context")
  
  # 緊急承認委員会起動
  activate_emergency_approval_committee "$context"
  
  # 最高優先度エスカレーション
  execute_executive_escalation "$context" "$impact_analysis"
  
  # 代替解決パス検討
  explore_alternative_resolution_paths "$context"
  
  # 30分後の強制レビュー予約
  schedule_emergency_review "$context" "30m"
}

# システム障害緊急対応
handle_system_failure_emergency() {
  local context="$1"
  
  echo "🚨 SYSTEM FAILURE EMERGENCY"
  
  # 安全モードへの切り替え
  switch_to_safe_mode
  
  # 自動処理の一時停止
  pause_automated_processing
  
  # 手動フォールバックモード起動
  activate_manual_fallback_mode
  
  # システム管理者緊急通知
  notify_system_administrators "$context"
}
```

### 6. レポート・統計システム

```bash
# オーケストレーション完了処理
finalize_orchestration_cycle() {
  local processing_mode="$1"
  
  echo "📊 Finalizing orchestration cycle ($processing_mode)"
  
  # 処理統計収集
  local cycle_stats=$(collect_cycle_statistics "$processing_mode")
  
  # パフォーマンスメトリクス更新
  update_orchestration_metrics "$cycle_stats"
  
  # 状況レポート生成
  generate_cycle_summary_report "$processing_mode" "$cycle_stats"
  
  # 次回実行計画
  plan_next_orchestration_cycle "$cycle_stats"
  
  log_success "Orchestration cycle completed successfully"
}

# 総合統計レポート生成
generate_comprehensive_status_report() {
  local report_period="${1:-24h}"
  
  echo "📈 Generating comprehensive status report (last $report_period)"
  
  local report=$(cat <<EOF
# Issue Auto Management Status Report
Generated: $(date)
Period: Last $report_period

## Executive Summary
$(generate_executive_summary "$report_period")

## Processing Statistics
$(generate_processing_statistics "$report_period")

## Classification Status
$(generate_classification_status "$report_period")

## Blocking Analysis
$(generate_blocking_analysis "$report_period")

## Escalation Summary
$(generate_escalation_summary "$report_period")

## Performance Metrics
$(generate_performance_metrics "$report_period")

## Recommendations
$(generate_system_recommendations "$report_period")

## Next Actions
$(generate_next_actions "$report_period")
EOF
)
  
  # レポート保存・送信
  local report_file="issue-auto-mgmt-report-$(date +%Y%m%d_%H%M%S).md"
  echo "$report" > "$report_file"
  
  send_slack_notification "#management-reports" "Daily Issue Auto Management Report" "good" "Status Report"
  
  log_success "Comprehensive report saved to $report_file"
}

# 継続的オーケストレーション
continuous_orchestration() {
  echo "🔄 Starting continuous issue auto management orchestration"
  
  while true; do
    echo "🎯 Starting orchestration cycle..."
    
    # メインオーケストレーション実行
    orchestrate_issue_auto_management "periodic_check"
    
    # 時間ベースの特別処理
    local current_hour=$(date +%H)
    case "$current_hour" in
      "09")
        # 朝の総合レポート
        generate_comprehensive_status_report "24h"
        ;;
      "17")
        # 夕方の進捗レポート
        generate_progress_update_report
        ;;
      "00")
        # 深夜のメンテナンス
        perform_system_maintenance
        ;;
    esac
    
    echo "✅ Orchestration cycle completed - sleeping for 10 minutes"
    sleep 600  # 10分間隔
  done
}
```

### 7. システム統合・起動

```bash
# システム起動
start_issue_auto_management_system() {
  echo "🚀 Starting Issue Auto Management System"
  
  # 初期化チェック
  if ! initialize_system_components; then
    log_error "System initialization failed"
    exit 1
  fi
  
  # 既存issue分類（初回のみ）
  if [[ ! -f ".classification-completed" ]]; then
    log_info "First run detected - classifying existing issues"
    ./scripts/classify-existing-issues.sh
    touch ".classification-completed"
  fi
  
  # システム健康チェック
  if ! perform_comprehensive_health_check; then
    log_error "System health check failed"
    exit 1
  fi
  
  # 継続的オーケストレーション開始
  continuous_orchestration
}

# システム初期化
initialize_system_components() {
  echo "🔧 Initializing system components"
  
  # 必要なディレクトリ作成
  mkdir -p .issue-auto-mgmt/{logs,metrics,reports,temp}
  
  # 設定ファイル検証
  validate_configuration_files
  
  # 外部依存関係チェック
  check_external_dependencies
  
  # サブシステム初期化
  initialize_classification_system
  initialize_selective_processing
  initialize_blocking_detector
  initialize_escalation_system
  
  log_success "System components initialized successfully"
  return 0
}
```

このオーケストレーターにより、AI生成issueの効率的な自動処理と人間作成issueの適切な手動管理が統合的に実現され、開発フローの最適化と品質保証が両立されます。