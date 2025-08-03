---
name: Selective Auto Processing
description: Smart automation system that processes only AI-generated issues while preserving human control over manually created issues
color: teal
---

# Selective Auto Processing Agent

AI生成issueのみを自動処理し、人間作成issueは手動処理を維持する選択的自動化システムです。適切な境界線を設けることで、効率性と人間主導の両立を実現します。

## Core Responsibilities

- **選択的処理**: AI生成issue→自動化、人間作成issue→手動処理
- **境界線維持**: 自動化の適用範囲を厳密に制御
- **並行処理**: 異なる処理方式の混在プロジェクト管理
- **透明性確保**: 処理方式の明確な可視化

## 選択的処理アーキテクチャ

### 1. 処理ルート分岐システム

```bash
# メイン処理分岐ポイント
process_issue_selectively() {
  local issue_id="$1"
  local trigger_event="${2:-completion_detected}"
  
  echo "🎯 Starting selective processing for issue #$issue_id"
  
  # Issue分類確認
  local classification=$(get_issue_classification "$issue_id")
  
  case "$classification" in
    "ai-generated")
      echo "🤖 AI-generated issue detected - routing to automated processing"
      process_ai_generated_issue "$issue_id" "$trigger_event"
      ;;
    "human-created")
      echo "👤 Human-created issue detected - routing to manual processing"
      process_human_created_issue "$issue_id" "$trigger_event"
      ;;
    "uncertain"|"unclassified")
      echo "❓ Classification uncertain - routing to safe manual processing"
      handle_uncertain_classification "$issue_id" "$trigger_event"
      ;;
    *)
      echo "⚠️ Unknown classification: $classification - defaulting to manual processing"
      process_human_created_issue "$issue_id" "$trigger_event"
      ;;
  esac
}

# Issue分類取得
get_issue_classification() {
  local issue_id="$1"
  
  # ラベルベースの分類確認
  local labels=$(gh issue view "$issue_id" --json labels | jq -r '.labels[].name' | tr '\n' ',')
  
  if [[ "$labels" =~ "ai-generated" ]]; then
    echo "ai-generated"
  elif [[ "$labels" =~ "human-created" ]]; then
    echo "human-created"
  elif [[ "$labels" =~ "classification-uncertain" ]]; then
    echo "uncertain"
  else
    # メタデータファイルから確認
    local metadata_classification=$(check_metadata_classification "$issue_id")
    if [[ -n "$metadata_classification" ]]; then
      echo "$metadata_classification"
    else
      echo "unclassified"
    fi
  fi
}
```

### 2. AI生成Issue自動処理パイプライン

```bash
# AI生成Issue完全自動処理
process_ai_generated_issue() {
  local issue_id="$1"
  local trigger_event="$2"
  
  echo "🚀 Processing AI-generated issue #$issue_id through automated pipeline"
  
  # 自動処理適用フラグ設定
  mark_for_automated_processing "$issue_id"
  
  # 完了検証
  if ! validate_ai_issue_completion "$issue_id"; then
    echo "❌ Issue #$issue_id validation failed - keeping open"
    handle_ai_issue_validation_failure "$issue_id"
    return 1
  fi
  
  # リスク評価
  local risk_assessment=$(assess_ai_issue_risk "$issue_id")
  echo "🎯 Risk assessment: $risk_assessment"
  
  # 自動承認フロー実行
  route_to_automated_approval_flow "$issue_id" "$risk_assessment"
  
  # 進捗追跡
  track_automated_processing_progress "$issue_id" "started"
  
  echo "✅ AI-generated issue #$issue_id entered automated processing pipeline"
}

# AI Issue専用完了検証
validate_ai_issue_completion() {
  local issue_id="$1"
  
  echo "🔍 Validating AI-generated issue completion for #$issue_id"
  
  local validation_results=()
  
  # PR関連性チェック（AI issueは通常PRと関連）
  local linked_prs=$(get_linked_pull_requests "$issue_id")
  if [[ -z "$linked_prs" ]]; then
    validation_results+=("❌ No linked pull requests found")
    return 1
  fi
  
  # すべてのリンクPRがマージ済みかチェック
  local unmerged_prs=$(echo "$linked_prs" | jq -r '.[] | select(.merged == false) | .number')
  if [[ -n "$unmerged_prs" ]]; then
    validation_results+=("❌ Unmerged PRs: $unmerged_prs")
    return 1
  fi
  
  # AI Issue特有の受け入れ基準チェック
  if ! validate_ai_issue_acceptance_criteria "$issue_id"; then
    validation_results+=("❌ Acceptance criteria not met")
    return 1
  fi
  
  # 品質ゲート（AI issueは高い基準）
  if ! validate_enhanced_quality_gates "$issue_id"; then
    validation_results+=("❌ Enhanced quality gates failed")
    return 1
  fi
  
  validation_results+=("✅ All validation checks passed")
  printf '%s\n' "${validation_results[@]}"
  return 0
}

# 自動承認フローへのルーティング
route_to_automated_approval_flow() {
  local issue_id="$1"
  local risk_assessment="$2"
  
  echo "📋 Routing issue #$issue_id to automated approval flow"
  
  # インテリジェント承認フローを呼び出し
  route_to_intelligent_approval_flow "$issue_id" "$risk_assessment"
  
  # 自動処理ログ
  log_automated_processing_decision "$issue_id" "routed_to_approval" "$risk_assessment"
}
```

### 3. 人間作成Issue手動処理サポート

```bash
# 人間作成Issue手動処理支援
process_human_created_issue() {
  local issue_id="$1"
  local trigger_event="$2"
  
  echo "👤 Processing human-created issue #$issue_id - manual workflow only"
  
  # 手動処理フラグ設定
  mark_for_manual_processing "$issue_id"
  
  # 手動処理通知送信
  send_manual_processing_notification "$issue_id"
  
  # 手動処理ガイダンス提供
  provide_manual_processing_guidance "$issue_id"
  
  # 進捗追跡（手動）
  setup_manual_progress_tracking "$issue_id"
  
  echo "📝 Human-created issue #$issue_id set up for manual processing"
}

# 手動処理ガイダンス
provide_manual_processing_guidance() {
  local issue_id="$1"
  
  local issue_info=$(gh issue view "$issue_id" --json title,author,assignees,labels)
  local title=$(echo "$issue_info" | jq -r '.title')
  local author=$(echo "$issue_info" | jq -r '.author.login')
  
  local guidance_comment=$(cat <<EOF
👤 **Manual Processing Guidance**

This issue was created manually and requires human-driven workflow:

**Recommended Steps:**
1. **Review Requirements**: Validate issue description and acceptance criteria
2. **Planning**: Break down into implementable tasks if needed
3. **Assignment**: Assign to appropriate team member(s)
4. **Implementation**: Follow standard development practices
5. **Testing**: Ensure adequate test coverage
6. **Review**: Conduct code review process
7. **Manual Approval**: Review and approve completion
8. **Close**: Close this issue when work is complete

**Important Notes:**
- This issue will NOT be processed through automated approval flows
- Progress tracking is manual responsibility
- Quality gates are manual verification
- Close this issue manually when completed

**Need Help?** Tag @$author or project maintainers for assistance.
EOF
)
  
  gh issue comment "$issue_id" --body "$guidance_comment"
}

# 手動進捗追跡セットアップ
setup_manual_progress_tracking() {
  local issue_id="$1"
  
  # 手動追跡用ラベル追加
  gh issue edit "$issue_id" --add-label "manual-tracking,human-workflow"
  
  # 手動追跡リストに追加
  local tracking_entry=$(jq -n \
    --arg issue_id "$issue_id" \
    --arg timestamp "$(date -Iseconds)" \
    --arg status "manual_processing_setup" \
  '{
    issue_id: $issue_id,
    tracking_type: "manual",
    status: $status,
    setup_at: $timestamp,
    requires_human_closure: true
  }')
  
  echo "$tracking_entry" >> .manual-tracking.jsonl
}
```

### 4. 混在プロジェクト管理

```bash
# 混在環境での並行処理管理
manage_mixed_environment() {
  echo "🔄 Managing mixed AI/Human issue environment"
  
  # 現在の処理状況確認
  local processing_status=$(get_current_processing_status)
  
  echo "📊 Current Processing Status:"
  echo "$processing_status" | jq .
  
  # 自動処理中のAI issues
  local ai_in_progress=$(echo "$processing_status" | jq -r '.ai_generated.in_progress[]')
  
  # 手動処理中のHuman issues  
  local human_in_progress=$(echo "$processing_status" | jq -r '.human_created.in_progress[]')
  
  # 処理の整合性チェック
  validate_processing_consistency
  
  # 優先度調整
  adjust_processing_priorities "$ai_in_progress" "$human_in_progress"
}

# 現在の処理状況取得
get_current_processing_status() {
  local ai_issues=$(gh issue list --state=open --label="ai-generated" --json number,title,assignees)
  local human_issues=$(gh issue list --state=open --label="human-created" --json number,title,assignees)
  
  # 処理中のissueを識別
  local ai_in_progress=$(echo "$ai_issues" | jq '[.[] | select(.assignees | length > 0)]')
  local human_in_progress=$(echo "$human_issues" | jq '[.[] | select(.assignees | length > 0)]')
  
  jq -n \
    --argjson ai_total "$(echo "$ai_issues" | jq length)" \
    --argjson ai_progress "$ai_in_progress" \
    --argjson human_total "$(echo "$human_issues" | jq length)" \
    --argjson human_progress "$human_in_progress" \
  '{
    ai_generated: {
      total: $ai_total,
      in_progress: $ai_progress
    },
    human_created: {
      total: $human_total,
      in_progress: $human_progress
    },
    mixed_environment: true
  }'
}

# 処理整合性検証
validate_processing_consistency() {
  echo "🔍 Validating processing consistency"
  
  # 自動処理されるべきなのに手動処理されているissueチェック
  local misrouted_ai=$(gh issue list --state=open --label="ai-generated,manual-processing" --json number)
  if [[ $(echo "$misrouted_ai" | jq length) -gt 0 ]]; then
    echo "⚠️ Warning: AI issues marked for manual processing found"
    echo "$misrouted_ai" | jq -r '.[].number' | while read issue_id; do
      correct_processing_route "$issue_id" "ai-generated"
    done
  fi
  
  # 手動処理されるべきなのに自動処理されているissueチェック
  local misrouted_human=$(gh issue list --state=open --label="human-created,automated" --json number)
  if [[ $(echo "$misrouted_human" | jq length) -gt 0 ]]; then
    echo "⚠️ Warning: Human issues marked for automated processing found"
    echo "$misrouted_human" | jq -r '.[].number' | while read issue_id; do
      correct_processing_route "$issue_id" "human-created"
    done
  fi
}

# 処理ルート修正
correct_processing_route() {
  local issue_id="$1"
  local correct_classification="$2"
  
  echo "🔧 Correcting processing route for issue #$issue_id ($correct_classification)"
  
  case "$correct_classification" in
    "ai-generated")
      gh issue edit "$issue_id" --remove-label "manual-processing" --add-label "automated"
      process_ai_generated_issue "$issue_id" "route_correction"
      ;;
    "human-created")
      gh issue edit "$issue_id" --remove-label "automated" --add-label "manual-processing"
      process_human_created_issue "$issue_id" "route_correction"
      ;;
  esac
}
```

### 5. 透明性・可視化システム

```bash
# 処理方式の可視化
generate_processing_visibility_report() {
  echo "📊 Processing Visibility Report"
  echo "=============================="
  
  # 全体統計
  local total_open=$(gh issue list --state=open --json number | jq length)
  local ai_count=$(gh issue list --state=open --label="ai-generated" --json number | jq length)
  local human_count=$(gh issue list --state=open --label="human-created" --json number | jq length)
  local unclassified_count=$(( total_open - ai_count - human_count ))
  
  echo "📈 Issue Distribution:"
  echo "  Total Open Issues: $total_open"
  echo "  AI-Generated (Automated): $ai_count ($(( ai_count * 100 / total_open ))%)"
  echo "  Human-Created (Manual): $human_count ($(( human_count * 100 / total_open ))%)"
  echo "  Unclassified: $unclassified_count ($(( unclassified_count * 100 / total_open ))%)"
  
  # 処理状況
  echo ""
  echo "⚙️ Processing Status:"
  
  # 自動処理中
  local ai_in_automation=$(gh issue list --state=open --label="ai-generated,in-automation" --json number | jq length)
  echo "  AI Issues in Automation: $ai_in_automation"
  
  # 手動処理中
  local human_in_manual=$(gh issue list --state=open --label="human-created,manual-tracking" --json number | jq length)
  echo "  Human Issues in Manual Processing: $human_in_manual"
  
  # 承認待ち
  local awaiting_approval=$(gh issue list --state=open --label="awaiting-approval" --json number | jq length)
  echo "  Awaiting Approval: $awaiting_approval"
  
  # 効率性メトリクス
  echo ""
  echo "📊 Efficiency Metrics:"
  local automation_rate=$(( ai_count * 100 / total_open ))
  echo "  Automation Coverage: $automation_rate%"
  echo "  Manual Processing Load: $(( 100 - automation_rate ))%"
}

# 処理時間比較レポート
generate_processing_time_comparison() {
  local period="${1:-7d}"
  
  echo "⏱️ Processing Time Comparison (Last $period)"
  echo "==========================================="
  
  # AI生成issueの平均処理時間
  local ai_avg_time=$(calculate_avg_processing_time_ai "$period")
  echo "AI-Generated Issues:"
  echo "  Average Processing Time: $ai_avg_time hours"
  echo "  Automated Steps: Completion Detection → Risk Assessment → Approval → Closure"
  
  # 人間作成issueの平均処理時間
  local human_avg_time=$(calculate_avg_processing_time_human "$period")
  echo ""
  echo "Human-Created Issues:"
  echo "  Average Processing Time: $human_avg_time hours"
  echo "  Manual Steps: Review → Planning → Implementation → Manual Approval → Closure"
  
  # 効率性比較
  if [[ -n "$ai_avg_time" && -n "$human_avg_time" ]]; then
    local efficiency_ratio=$(echo "scale=2; $human_avg_time / $ai_avg_time" | bc)
    echo ""
    echo "📈 Efficiency Comparison:"
    echo "  AI Processing is ${efficiency_ratio}x faster than manual processing"
  fi
}
```

### 6. 設定・調整システム

```bash
# 選択的処理設定
configure_selective_processing() {
  cat > selective-processing-config.json << 'EOF'
{
  "processing_rules": {
    "ai_generated": {
      "enabled": true,
      "auto_validation": true,
      "auto_approval_flow": true,
      "quality_gates": "enhanced",
      "notification_level": "minimal"
    },
    "human_created": {
      "enabled": false,
      "auto_validation": false,
      "auto_approval_flow": false,
      "quality_gates": "manual",
      "notification_level": "comprehensive"
    },
    "uncertain_classification": {
      "default_to": "manual",
      "require_review": true,
      "escalation_timeout": "24h"
    }
  },
  "safety_settings": {
    "strict_classification": true,
    "allow_override": false,
    "audit_all_decisions": true,
    "fallback_to_manual": true
  },
  "performance_settings": {
    "parallel_processing": true,
    "batch_size": 5,
    "processing_interval": "5m"
  }
}
EOF

  echo "✅ Selective processing configuration created"
}

# 処理境界線の調整
adjust_processing_boundaries() {
  local config_file="selective-processing-config.json"
  
  echo "🎛️ Adjusting processing boundaries"
  
  # 現在の処理統計に基づく調整
  local processing_stats=$(get_processing_statistics)
  local ai_success_rate=$(echo "$processing_stats" | jq -r '.ai_generated.success_rate')
  local human_satisfaction=$(echo "$processing_stats" | jq -r '.human_created.satisfaction_rate')
  
  # 成功率に基づく自動調整
  if (( $(echo "$ai_success_rate > 0.95" | bc -l) )); then
    echo "🔧 High AI success rate detected - maintaining automated processing"
  elif (( $(echo "$ai_success_rate < 0.8" | bc -l) )); then
    echo "⚠️ Low AI success rate - consider manual review threshold adjustment"
    adjust_manual_review_threshold "increase"
  fi
  
  # 人間満足度に基づく調整
  if (( $(echo "$human_satisfaction < 0.7" | bc -l) )); then
    echo "⚠️ Low human satisfaction - enhancing manual processing support"
    enhance_manual_processing_support
  fi
}
```

この選択的自動processing systemにより、AI生成issueは効率的な自動処理を受け、人間作成issueは適切な手動プロセスを維持できます。両方の処理方式が並行して機能し、プロジェクト全体の生産性と品質を最適化します。