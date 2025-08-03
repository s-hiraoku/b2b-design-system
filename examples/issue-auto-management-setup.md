# Issue自動管理システム - 設定例とサンプル

## 基本設定例

### 1. 環境変数設定（.env）

```bash
# GitHub設定
GITHUB_TOKEN=ghp_your_github_token_here
GITHUB_OWNER=your-username
GITHUB_REPO=your-repository-name

# Slack設定
SLACK_BOT_TOKEN=xoxb-your-slack-bot-token
SLACK_SIGNING_SECRET=your-slack-signing-secret
SLACK_DEFAULT_CHANNEL=#cc-deck-notifications
SLACK_APPROVAL_CHANNEL=#cc-deck-approvals
SLACK_ALERTS_CHANNEL=#cc-deck-alerts

# Email設定
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_NAME="CC-DECK Issue Manager"
SMTP_FROM_EMAIL=noreply@yourcompany.com

# 承認設定
AUTO_APPROVAL_THRESHOLD=0.8
CONDITIONAL_APPROVAL_TIMEOUT=2h
HUMAN_REVIEW_THRESHOLD=0.3
QUALITY_GATE_COVERAGE_MIN=90
QUALITY_GATE_SCORE_MIN=8

# システム設定
LOG_LEVEL=info
METRICS_RETENTION_DAYS=30
BACKUP_INTERVAL=24h
```

### 2. 承認ルール設定（approval-rules.json）

```json
{
  "risk_assessment_weights": {
    "lines_changed": 0.2,
    "files_changed": 0.15,
    "critical_files": 0.3,
    "test_coverage": 0.15,
    "security_impact": 0.2
  },
  "auto_approval_criteria": {
    "max_risk_score": 3,
    "min_test_coverage": 90,
    "min_quality_score": 8,
    "required_labels": ["tested", "reviewed"],
    "excluded_patterns": ["breaking-change", "security", "database"]
  },
  "conditional_approval_criteria": {
    "max_risk_score": 6,
    "min_test_coverage": 80,
    "timeout_hours": 2,
    "required_approvers": ["project-manager", "tech-lead"]
  },
  "human_review_criteria": {
    "security_keywords": ["auth", "password", "token", "vulnerability"],
    "database_keywords": ["migration", "schema", "alter table"],
    "breaking_change_keywords": ["breaking", "deprecated", "removed"],
    "critical_files": [
      "package.json",
      "Dockerfile",
      "docker-compose.yml",
      ".github/workflows/*"
    ]
  }
}
```

### 3. 通知設定（notification-config.json）

```json
{
  "templates": {
    "auto_approval": {
      "slack": {
        "title": "✅ Issue Auto-Approved",
        "color": "good",
        "fields": ["issue_id", "type", "coverage", "quality_score"]
      },
      "email": {
        "subject": "[CC-DECK] Issue #{issue_id} Auto-Approved",
        "template": "auto_approval_email.html"
      }
    },
    "conditional_approval": {
      "slack": {
        "title": "⏰ Conditional Approval - Review Required",
        "color": "warning",
        "timeout_hours": 2,
        "interactive": true
      },
      "email": {
        "subject": "[CC-DECK] Issue #{issue_id} - Conditional Approval",
        "template": "conditional_approval_email.html"
      }
    },
    "human_review": {
      "slack": {
        "title": "🚨 Human Review Required",
        "color": "danger",
        "mention_users": true
      },
      "email": {
        "subject": "[URGENT] Issue #{issue_id} Requires Human Review",
        "template": "human_review_email.html",
        "priority": "high"
      }
    }
  },
  "stakeholder_groups": {
    "developers": {
      "slack_channels": ["#development"],
      "notifications": ["issue_completed", "quality_issues", "approval_results"],
      "urgency_filter": 2
    },
    "project_managers": {
      "slack_channels": ["#project-updates"],
      "email_addresses": ["pm@company.com"],
      "notifications": ["high_risk_approval", "weekly_summary", "system_alerts"],
      "urgency_filter": 3
    },
    "tech_leads": {
      "slack_channels": ["#tech-leadership"],
      "email_addresses": ["tech-lead@company.com"],
      "notifications": ["human_review", "security_issues", "architecture_changes"],
      "urgency_filter": 4
    }
  }
}
```

## サンプルコード

### 1. 基本的な使用例

```bash
#!/bin/bash
# basic-usage-example.sh

# Issue自動管理システムの基本的な使用例

# 1. システム初期化
echo "🚀 Initializing Issue Auto Management System"
source scripts/init_auto_management.sh

# 2. 特定のIssueを手動で処理
issue_id="123"
echo "📋 Processing issue #$issue_id"

# Issue完了チェック
if validate_issue_completion "$issue_id"; then
  echo "✅ Issue #$issue_id validation passed"
  
  # リスク評価
  risk_level=$(assess_issue_risk "$issue_id")
  echo "🎯 Risk level: $risk_level"
  
  # 承認フローに送信
  route_to_approval_flow "$issue_id" "$risk_level"
else
  echo "❌ Issue #$issue_id validation failed"
  handle_validation_failure "$issue_id"
fi

# 3. システム状態確認
echo "📊 System status:"
show_system_metrics
```

### 2. カスタム承認ワークフロー

```bash
#!/bin/bash
# custom-approval-workflow.sh

# カスタム承認ワークフローの例

custom_approval_workflow() {
  local issue_id="$1"
  local custom_criteria="$2"
  
  echo "🔧 Starting custom approval workflow for issue #$issue_id"
  
  # カスタム評価基準適用
  case "$custom_criteria" in
    "security_focus")
      # セキュリティ重視の評価
      local security_score=$(run_security_assessment "$issue_id")
      if [[ $security_score -lt 9 ]]; then
        route_to_human_review "$issue_id" "Security concerns detected"
        return
      fi
      ;;
    "performance_focus")
      # パフォーマンス重視の評価
      local perf_impact=$(assess_performance_impact "$issue_id")
      if [[ "$perf_impact" == "significant" ]]; then
        route_to_conditional_approval "$issue_id" "Performance impact review needed"
        return
      fi
      ;;
    "quick_approval")
      # 緊急時の迅速承認
      if validate_emergency_criteria "$issue_id"; then
        force_approve_issue "$issue_id" "Emergency approval"
        return
      fi
      ;;
  esac
  
  # 標準フローにフォールバック
  route_to_standard_approval "$issue_id"
}

# 使用例
custom_approval_workflow "456" "security_focus"
custom_approval_workflow "789" "performance_focus"
custom_approval_workflow "101" "quick_approval"
```

### 3. 通知カスタマイズ例

```bash
#!/bin/bash
# notification-customization.sh

# プロジェクト固有の通知カスタマイズ

# カスタム通知テンプレート
send_custom_notification() {
  local issue_id="$1"
  local notification_type="$2"
  local custom_data="$3"
  
  case "$notification_type" in
    "milestone_achievement")
      local message="🎉 Milestone Achievement! Issue #$issue_id completed
      
Feature: $(get_feature_name "$issue_id")
Milestone: $(get_milestone_name "$issue_id")
Team: $(get_team_members "$issue_id")
Impact: $(get_business_impact "$issue_id")

Next milestone: $(get_next_milestone "$issue_id")"
      
      send_slack_notification "#achievements" "$message" "good" "Milestone Achieved"
      ;;
      
    "quality_improvement")
      local improvement_data=$(echo "$custom_data" | jq -r '.improvement')
      local message="📈 Quality Improvement Detected!
      
Issue #$issue_id showed significant quality improvements:
$improvement_data

This demonstrates effective development practices!"
      
      send_slack_notification "#quality-metrics" "$message" "good" "Quality Improvement"
      ;;
      
    "bottleneck_detected")
      local bottleneck_info=$(echo "$custom_data" | jq -r '.bottleneck')
      local message="⚠️ Process Bottleneck Detected
      
Issue #$issue_id experienced delays:
$bottleneck_info

Recommended actions:
$(generate_bottleneck_recommendations "$issue_id")"
      
      send_slack_notification "#process-improvement" "$message" "warning" "Bottleneck Alert"
      ;;
  esac
}

# チーム別カスタマイズ
setup_team_notifications() {
  local team="$1"
  
  case "$team" in
    "frontend")
      # フロントエンド特化通知
      register_custom_trigger "ui_change_detected" "send_ui_review_notification"
      register_custom_trigger "accessibility_check_failed" "send_accessibility_alert"
      ;;
    "backend")
      # バックエンド特化通知
      register_custom_trigger "api_change_detected" "send_api_review_notification"
      register_custom_trigger "database_migration" "send_dba_notification"
      ;;
    "devops")
      # DevOps特化通知
      register_custom_trigger "infrastructure_change" "send_infra_review_notification"
      register_custom_trigger "security_vulnerability" "send_security_alert"
      ;;
  esac
}
```

### 4. 統合テストスイート

```bash
#!/bin/bash
# integration-test-suite.sh

# Issue自動管理システムの統合テスト

run_integration_tests() {
  echo "🧪 Starting Issue Auto Management Integration Tests"
  
  # テスト環境セットアップ
  setup_test_environment
  
  # テスト1: 低リスクIssueの自動承認
  test_auto_approval() {
    echo "Test 1: Auto Approval for Low Risk Issue"
    
    local test_issue_id="test-001"
    create_test_issue "$test_issue_id" "low_risk"
    
    # 処理実行
    process_issue_completion "$test_issue_id"
    
    # 結果検証
    local approval_status=$(get_approval_status "$test_issue_id")
    if [[ "$approval_status" == "auto_approved" ]]; then
      echo "✅ Test 1 PASSED"
    else
      echo "❌ Test 1 FAILED: Expected auto_approved, got $approval_status"
    fi
  }
  
  # テスト2: 高リスクIssueの人間レビュー
  test_human_review() {
    echo "Test 2: Human Review for High Risk Issue"
    
    local test_issue_id="test-002"
    create_test_issue "$test_issue_id" "high_risk"
    
    process_issue_completion "$test_issue_id"
    
    local approval_status=$(get_approval_status "$test_issue_id")
    if [[ "$approval_status" == "human_review_required" ]]; then
      echo "✅ Test 2 PASSED"
    else
      echo "❌ Test 2 FAILED: Expected human_review_required, got $approval_status"
    fi
  }
  
  # テスト3: 条件付き承認
  test_conditional_approval() {
    echo "Test 3: Conditional Approval for Medium Risk Issue"
    
    local test_issue_id="test-003"
    create_test_issue "$test_issue_id" "medium_risk"
    
    process_issue_completion "$test_issue_id"
    
    local approval_status=$(get_approval_status "$test_issue_id")
    if [[ "$approval_status" == "conditional_approval" ]]; then
      echo "✅ Test 3 PASSED"
    else
      echo "❌ Test 3 FAILED: Expected conditional_approval, got $approval_status"
    fi
  }
  
  # テスト4: 通知システム
  test_notification_system() {
    echo "Test 4: Notification System"
    
    local test_issue_id="test-004"
    create_test_issue "$test_issue_id" "medium_risk"
    
    # 通知カウンター初期化
    reset_notification_counter
    
    process_issue_completion "$test_issue_id"
    
    # 通知が送信されたか確認
    local notification_count=$(get_notification_count)
    if [[ $notification_count -gt 0 ]]; then
      echo "✅ Test 4 PASSED: $notification_count notifications sent"
    else
      echo "❌ Test 4 FAILED: No notifications sent"
    fi
  }
  
  # テスト5: フィードバックループ
  test_feedback_loop() {
    echo "Test 5: Feedback Loop Learning"
    
    local test_issue_id="test-005"
    create_test_issue "$test_issue_id" "medium_risk"
    
    # 初期予測を記録
    local initial_prediction=$(predict_approval_outcome "$test_issue_id")
    
    # 人間の決定をシミュレート
    simulate_human_decision "$test_issue_id" "approved"
    
    # フィードバック処理
    process_approval_feedback "$test_issue_id" "approved" "human_override"
    
    # 学習効果を確認
    local updated_prediction=$(predict_approval_outcome "$test_issue_id")
    
    if [[ "$updated_prediction" != "$initial_prediction" ]]; then
      echo "✅ Test 5 PASSED: Learning detected"
    else
      echo "❌ Test 5 FAILED: No learning detected"
    fi
  }
  
  # 全テスト実行
  test_auto_approval
  test_human_review  
  test_conditional_approval
  test_notification_system
  test_feedback_loop
  
  # テスト環境クリーンアップ
  cleanup_test_environment
  
  echo "🏁 Integration tests completed"
}

# テスト実行
run_integration_tests
```

### 5. モニタリングダッシュボード設定

```bash
#!/bin/bash
# monitoring-dashboard-setup.sh

# モニタリングダッシュボードの設定例

setup_monitoring_dashboard() {
  echo "📊 Setting up monitoring dashboard"
  
  # メトリクス収集設定
  cat > monitoring-config.json << 'EOF'
{
  "metrics": {
    "approval_rate": {
      "auto_approved": 0,
      "conditional_approved": 0,
      "human_reviewed": 0,
      "rejected": 0
    },
    "processing_time": {
      "average_seconds": 0,
      "p95_seconds": 0,
      "p99_seconds": 0
    },
    "quality_metrics": {
      "average_test_coverage": 0,
      "average_quality_score": 0,
      "security_issues_prevented": 0
    },
    "system_health": {
      "uptime_percentage": 100,
      "error_rate": 0,
      "queue_length": 0
    }
  },
  "alerts": {
    "high_error_rate": {
      "threshold": 5,
      "action": "send_alert"
    },
    "long_queue": {
      "threshold": 10,
      "action": "scale_processing"
    },
    "low_approval_rate": {
      "threshold": 80,
      "action": "review_rules"
    }
  }
}
EOF

  # ダッシュボードHTML生成
  generate_dashboard_html
  
  # メトリクス更新スクリプト
  setup_metrics_collection
  
  echo "✅ Monitoring dashboard configured"
}

# メトリクス収集
collect_metrics() {
  local period="${1:-24h}"
  
  # 承認率計算
  local total_issues=$(count_processed_issues "$period")
  local auto_approved=$(count_auto_approved_issues "$period")
  local auto_approval_rate=$((auto_approved * 100 / total_issues))
  
  # 処理時間計算
  local avg_processing_time=$(calculate_avg_processing_time "$period")
  
  # 品質メトリクス
  local avg_coverage=$(calculate_avg_test_coverage "$period")
  local avg_quality=$(calculate_avg_quality_score "$period")
  
  # JSON出力
  jq -n --argjson total "$total_issues" \
        --argjson auto_rate "$auto_approval_rate" \
        --argjson avg_time "$avg_processing_time" \
        --argjson coverage "$avg_coverage" \
        --argjson quality "$avg_quality" \
  '{
    timestamp: now,
    period: "'"$period"'",
    metrics: {
      total_processed: $total,
      auto_approval_rate: $auto_rate,
      avg_processing_time: $avg_time,
      avg_test_coverage: $coverage,
      avg_quality_score: $quality
    }
  }' >> metrics-$(date +%Y%m%d).json
}

# 定期実行設定
setup_metrics_collection() {
  # 1時間ごとのメトリクス収集
  echo "0 * * * * cd $(pwd) && ./scripts/collect_metrics.sh 1h" | crontab -
  
  # 日次レポート生成
  echo "0 9 * * * cd $(pwd) && ./scripts/generate_daily_report.sh" | crontab -
  
  # 週次サマリー送信
  echo "0 9 * * 1 cd $(pwd) && ./scripts/send_weekly_summary.sh" | crontab -
}
```

### 6. デバッグ・トラブルシューティング

```bash
#!/bin/bash
# debug-troubleshooting.sh

# デバッグとトラブルシューティングのサンプル

debug_issue_processing() {
  local issue_id="$1"
  
  echo "🐛 Debugging issue #$issue_id processing"
  
  # 1. Issue基本情報確認
  echo "📋 Issue Information:"
  gh issue view "$issue_id" --json title,state,labels,assignees
  
  # 2. 完了検証の詳細チェック
  echo "✅ Completion Validation:"
  validate_issue_completion "$issue_id" --verbose
  
  # 3. リスク評価の詳細
  echo "🎯 Risk Assessment Details:"
  assess_issue_risk "$issue_id" --debug
  
  # 4. 品質ゲートの詳細
  echo "🛡️ Quality Gates:"
  validate_quality_gates "$issue_id" --detailed
  
  # 5. 承認フロー履歴
  echo "📊 Approval Flow History:"
  get_approval_history "$issue_id"
  
  # 6. 通知履歴
  echo "📧 Notification History:"
  get_notification_history "$issue_id"
  
  # 7. エラーログ
  echo "🔍 Error Logs:"
  grep "issue_$issue_id" logs/error.log | tail -20
}

# システム健康チェック
health_check() {
  echo "🏥 System Health Check"
  
  local health_score=0
  local max_score=10
  
  # GitHub API接続確認
  if gh auth status &>/dev/null; then
    echo "✅ GitHub API connection: OK"
    ((health_score++))
  else
    echo "❌ GitHub API connection: FAILED"
  fi
  
  # Slack API接続確認
  if curl -s -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
          "https://slack.com/api/auth.test" | jq -r '.ok' | grep -q "true"; then
    echo "✅ Slack API connection: OK"
    ((health_score++))
  else
    echo "❌ Slack API connection: FAILED"
  fi
  
  # SMTP接続確認
  if test_smtp_connection; then
    echo "✅ SMTP connection: OK"
    ((health_score++))
  else
    echo "❌ SMTP connection: FAILED"
  fi
  
  # データベース/ファイルシステム確認
  if [[ -d ".notifications" && -w ".notifications" ]]; then
    echo "✅ File system permissions: OK"
    ((health_score++))
  else
    echo "❌ File system permissions: FAILED"
  fi
  
  # プロセス確認
  if pgrep -f "auto_issue_manager" > /dev/null; then
    echo "✅ Auto issue manager process: RUNNING"
    ((health_score++))
  else
    echo "❌ Auto issue manager process: NOT RUNNING"
  fi
  
  # 総合健康スコア
  echo "🏆 Overall Health Score: $health_score/$max_score"
  
  if [[ $health_score -ge 8 ]]; then
    echo "✅ System is healthy"
    return 0
  elif [[ $health_score -ge 5 ]]; then
    echo "⚠️ System has minor issues"
    return 1
  else
    echo "❌ System has major issues"
    return 2
  fi
}

# トラブルシューティングガイド
show_troubleshooting_guide() {
  cat << 'EOF'
🔧 Issue Auto Management Troubleshooting Guide

Common Issues and Solutions:

1. 🚫 Issues not being processed automatically
   - Check GitHub webhook configuration
   - Verify GITHUB_TOKEN permissions
   - Check issue completion criteria

2. 📧 Notifications not being sent
   - Verify SLACK_BOT_TOKEN and channels
   - Check SMTP configuration
   - Review notification filters

3. 🎯 Incorrect risk assessment
   - Review approval-rules.json weights
   - Check issue labels and content
   - Examine recent learning data

4. ⏱️ Slow processing times
   - Check system resources
   - Review queue lengths
   - Consider scaling options

5. 🔄 Learning not improving
   - Verify feedback data collection
   - Check human decision variety
   - Review learning parameters

For detailed diagnostics, run:
./scripts/debug_issue_processing.sh <issue_id>
./scripts/health_check.sh
EOF
}
```

これらのサンプルコードと設定例により、Issue自動管理システムを実際のプロジェクトに適用・カスタマイズできるようになります。各例は実際の使用ケースに基づいており、プロジェクトの特性に応じて調整可能です。