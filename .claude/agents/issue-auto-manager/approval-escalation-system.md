---
name: Approval Escalation System
description: Comprehensive escalation management for overdue approvals with intelligent routing and stakeholder engagement
color: red
---

# Approval Escalation System Agent

承認の遅延を検出し、段階的エスカレーションを通じて迅速な問題解決を促進する包括的管理システムです。

## Core Responsibilities

- **遅延検出**: 承認期限の監視と遅延アラート
- **段階的エスカレーション**: 重要度に応じた適切なエスカレーション実行
- **ステークホルダー管理**: 関係者への効果的な通知とフォローアップ
- **解決促進**: 承認プロセスの障害除去と迅速化

## エスカレーション管理システム

### 1. 承認遅延検出・監視

```bash
# 承認遅延監視システム
monitor_approval_delays() {
  echo "⏰ Starting approval delay monitoring"
  
  # 承認待ちissueの取得
  local pending_approvals=$(get_pending_approval_issues)
  
  echo "$pending_approvals" | jq -r '.[].number' | while read -r issue_id; do
    analyze_approval_delay "$issue_id"
  done
  
  # 全体的な遅延状況レポート
  generate_delay_summary_report
}

# 承認待ちissue取得
get_pending_approval_issues() {
  # 各種承認待ち状態のissueを収集
  local awaiting_approval=$(gh issue list --state=open --label="awaiting-approval" --json number,title,createdAt,labels,assignees)
  local conditional_approval=$(gh issue list --state=open --label="conditional-approval" --json number,title,createdAt,labels,assignees)
  local human_review=$(gh issue list --state=open --label="human-review-required" --json number,title,createdAt,labels,assignees)
  
  # 統合して返す
  jq -n --argjson awaiting "$awaiting_approval" \
        --argjson conditional "$conditional_approval" \
        --argjson human "$human_review" \
  '($awaiting + $conditional + $human) | unique_by(.number)'
}

# 個別issue承認遅延分析
analyze_approval_delay() {
  local issue_id="$1"
  
  # Issue詳細情報取得
  local issue_data=$(gh issue view "$issue_id" --json number,title,createdAt,updatedAt,labels,assignees,author)
  local created_at=$(echo "$issue_data" | jq -r '.createdAt')
  local updated_at=$(echo "$issue_data" | jq -r '.updatedAt')
  local labels=$(echo "$issue_data" | jq -r '.labels[].name' | tr '\n' ',')
  
  # 承認開始時刻を特定
  local approval_start_time=$(determine_approval_start_time "$issue_id" "$created_at")
  
  # 経過時間計算
  local elapsed_hours=$(calculate_elapsed_hours "$approval_start_time")
  
  # 期限と重要度評価
  local deadline_info=$(get_approval_deadline "$issue_id" "$labels")
  local severity=$(assess_delay_severity "$elapsed_hours" "$deadline_info")
  
  echo "📊 Issue #$issue_id delay analysis:"
  echo "  Elapsed: ${elapsed_hours}h"
  echo "  Deadline: $(echo "$deadline_info" | jq -r '.deadline_hours')h"
  echo "  Severity: $severity"
  
  # 遅延の場合はエスカレーション判定
  if [[ "$severity" != "on_time" ]]; then
    determine_escalation_action "$issue_id" "$severity" "$elapsed_hours" "$deadline_info"
  fi
}

# 承認開始時刻特定
determine_approval_start_time() {
  local issue_id="$1"
  local created_at="$2"
  
  # GitHubタイムライン解析で承認フロー開始時刻を特定
  local timeline=$(gh issue view "$issue_id" --json timelineItems)
  
  # 承認関連ラベルが追加された時刻を検索
  local approval_start=$(echo "$timeline" | jq -r '
    .timelineItems[] | 
    select(.type == "LABELED_EVENT") |
    select(.label.name | test("awaiting-approval|conditional-approval|human-review")) |
    .createdAt' | head -1)
  
  if [[ -n "$approval_start" && "$approval_start" != "null" ]]; then
    echo "$approval_start"
  else
    echo "$created_at"
  fi
}

# 遅延重要度評価
assess_delay_severity() {
  local elapsed_hours="$1"
  local deadline_info="$2"
  
  local deadline_hours=$(echo "$deadline_info" | jq -r '.deadline_hours')
  local priority=$(echo "$deadline_info" | jq -r '.priority')
  
  if [[ $elapsed_hours -le $deadline_hours ]]; then
    echo "on_time"
  elif [[ $elapsed_hours -le $(( deadline_hours + 24 )) ]]; then
    if [[ "$priority" == "critical" ]]; then
      echo "critical_overdue"
    else
      echo "minor_overdue"
    fi
  elif [[ $elapsed_hours -le $(( deadline_hours + 72 )) ]]; then
    echo "significant_overdue"
  else
    echo "severe_overdue"
  fi
}
```

### 2. 段階的エスカレーション実行

```bash
# エスカレーション判定・実行
determine_escalation_action() {
  local issue_id="$1"
  local severity="$2"
  local elapsed_hours="$3"
  local deadline_info="$4"
  
  echo "🚨 Determining escalation for issue #$issue_id (severity: $severity)"
  
  case "$severity" in
    "critical_overdue")
      execute_immediate_escalation "$issue_id" "$elapsed_hours"
      ;;
    "significant_overdue")
      execute_standard_escalation "$issue_id" "$elapsed_hours"
      ;;
    "severe_overdue")
      execute_management_escalation "$issue_id" "$elapsed_hours"
      ;;
    "minor_overdue")
      execute_gentle_reminder "$issue_id" "$elapsed_hours"
      ;;
  esac
  
  # エスカレーション記録
  record_escalation_event "$issue_id" "$severity" "$elapsed_hours"
}

# 即座のエスカレーション（クリティカル遅延）
execute_immediate_escalation() {
  local issue_id="$1"
  local elapsed_hours="$2"
  
  echo "🚨 IMMEDIATE: Executing critical escalation for #$issue_id"
  
  # クリティカル遅延通知
  local critical_message=$(generate_critical_delay_message "$issue_id" "$elapsed_hours")
  
  # マルチチャネル緊急通知
  send_slack_notification "#critical-approvals" "$critical_message" "danger" "CRITICAL APPROVAL DELAY"
  send_emergency_email_notification "$issue_id" "$critical_message"
  send_sms_notification_if_configured "$issue_id" "$critical_message"
  
  # 承認者への直接コンタクト試行
  attempt_direct_approver_contact "$issue_id"
  
  # 代替承認者の起動
  activate_backup_approvers "$issue_id"
  
  # 30分後の自動フォローアップ予約
  schedule_followup "$issue_id" "30m" "critical_followup"
  
  # Issue緊急フラグ
  gh issue edit "$issue_id" --add-label "critical-delay,immediate-attention"
  gh issue comment "$issue_id" --body "$critical_message"
}

# 標準エスカレーション
execute_standard_escalation() {
  local issue_id="$1"
  local elapsed_hours="$2"
  
  echo "⚠️ STANDARD: Executing standard escalation for #$issue_id"
  
  local escalation_message=$(generate_standard_escalation_message "$issue_id" "$elapsed_hours")
  
  # 承認者・関係者通知
  notify_approvers_and_stakeholders "$issue_id" "$escalation_message"
  
  # チームリード・マネージャー通知
  notify_team_leads "$issue_id" "$escalation_message"
  
  # 2時間後のフォローアップ予約
  schedule_followup "$issue_id" "2h" "standard_followup"
  
  gh issue edit "$issue_id" --add-label "escalated,requires-attention"
  gh issue comment "$issue_id" --body "$escalation_message"
}

# 管理者エスカレーション
execute_management_escalation() {
  local issue_id="$1"
  local elapsed_hours="$2"
  
  echo "📈 MANAGEMENT: Executing management escalation for #$issue_id"
  
  local mgmt_message=$(generate_management_escalation_message "$issue_id" "$elapsed_hours")
  
  # 上級管理者通知
  notify_senior_management "$issue_id" "$mgmt_message"
  
  # プロダクトオーナー通知
  notify_product_owners "$issue_id" "$mgmt_message"
  
  # エスカレーション会議の提案
  propose_escalation_meeting "$issue_id"
  
  # 24時間後の最終フォローアップ
  schedule_followup "$issue_id" "24h" "final_followup"
  
  gh issue edit "$issue_id" --add-label "management-escalation,executive-attention"
  gh issue comment "$issue_id" --body "$mgmt_message"
}

# 穏やかなリマインダー
execute_gentle_reminder() {
  local issue_id="$1"
  local elapsed_hours="$2"
  
  echo "📋 GENTLE: Sending gentle reminder for #$issue_id"
  
  local reminder_message=$(generate_gentle_reminder_message "$issue_id" "$elapsed_hours")
  
  # 承認者への穏やかな通知
  send_slack_notification "#approval-reminders" "$reminder_message" "warning" "Approval Reminder"
  
  # 4時間後の再リマインダー予約
  schedule_followup "$issue_id" "4h" "gentle_followup"
  
  gh issue edit "$issue_id" --add-label "reminder-sent"
}
```

### 3. ステークホルダー管理・通知

```bash
# 承認者・ステークホルダー特定
identify_stakeholders_for_issue() {
  local issue_id="$1"
  
  echo "👥 Identifying stakeholders for issue #$issue_id"
  
  local issue_data=$(gh issue view "$issue_id" --json assignees,author,labels)
  local assignees=$(echo "$issue_data" | jq -r '.assignees[].login')
  local author=$(echo "$issue_data" | jq -r '.author.login')
  local labels=$(echo "$issue_data" | jq -r '.labels[].name' | tr '\n' ',')
  
  local stakeholders=$(jq -n '{
    primary_approvers: [],
    secondary_approvers: [],
    stakeholders: [],
    escalation_contacts: []
  }')
  
  # ラベルベースのステークホルダー特定
  stakeholders=$(identify_label_based_stakeholders "$labels" "$stakeholders")
  
  # 直接割り当て者
  if [[ -n "$assignees" ]]; then
    stakeholders=$(echo "$stakeholders" | jq --argjson assignees "$(echo "$assignees" | jq -R . | jq -s .)" \
      '.primary_approvers += $assignees')
  fi
  
  # プロジェクト固有のステークホルダー
  stakeholders=$(add_project_specific_stakeholders "$issue_id" "$stakeholders")
  
  echo "$stakeholders" > ".stakeholders-$issue_id.json"
  echo "$stakeholders"
}

# ラベルベースステークホルダー特定
identify_label_based_stakeholders() {
  local labels="$1"
  local stakeholders="$2"
  
  # Phase別ステークホルダー
  if [[ "$labels" =~ "phase-" ]]; then
    local phase_leads=$(get_phase_leads "$labels")
    stakeholders=$(echo "$stakeholders" | jq --argjson leads "$phase_leads" \
      '.primary_approvers += $leads')
  fi
  
  # 要件別ステークホルダー
  if [[ "$labels" =~ "requirements-" ]]; then
    local req_owners=$(get_requirement_owners "$labels")
    stakeholders=$(echo "$stakeholders" | jq --argjson owners "$req_owners" \
      '.stakeholders += $owners')
  fi
  
  # セキュリティ関連
  if [[ "$labels" =~ "security" ]]; then
    local security_team=$(get_security_team_contacts)
    stakeholders=$(echo "$stakeholders" | jq --argjson security "$security_team" \
      '.primary_approvers += $security')
  fi
  
  echo "$stakeholders"
}

# 承認者・ステークホルダー通知
notify_approvers_and_stakeholders() {
  local issue_id="$1"
  local message="$2"
  
  local stakeholders_file=".stakeholders-$issue_id.json"
  if [[ ! -f "$stakeholders_file" ]]; then
    identify_stakeholders_for_issue "$issue_id" > /dev/null
  fi
  
  local stakeholders=$(cat "$stakeholders_file")
  
  # 主要承認者への通知
  local primary_approvers=$(echo "$stakeholders" | jq -r '.primary_approvers[]')
  echo "$primary_approvers" | while IFS= read -r approver; do
    if [[ -n "$approver" ]]; then
      send_direct_approver_notification "$approver" "$issue_id" "$message"
    fi
  done
  
  # 二次承認者への通知
  local secondary_approvers=$(echo "$stakeholders" | jq -r '.secondary_approvers[]')
  echo "$secondary_approvers" | while IFS= read -r approver; do
    if [[ -n "$approver" ]]; then
      send_secondary_notification "$approver" "$issue_id" "$message"
    fi
  done
  
  # ステークホルダーへの情報共有
  local general_stakeholders=$(echo "$stakeholders" | jq -r '.stakeholders[]')
  echo "$general_stakeholders" | while IFS= read -r stakeholder; do
    if [[ -n "$stakeholder" ]]; then
      send_stakeholder_update "$stakeholder" "$issue_id" "$message"
    fi
  done
}

# 直接承認者通知
send_direct_approver_notification() {
  local approver="$1"
  local issue_id="$2"
  local message="$3"
  
  # Slack DM送信
  local dm_channel=$(get_slack_dm_channel "$approver")
  if [[ -n "$dm_channel" ]]; then
    send_slack_notification "$dm_channel" "$message" "warning" "Approval Required"
  fi
  
  # Email送信
  local email=$(get_user_email "$approver")
  if [[ -n "$email" ]]; then
    send_targeted_email_notification "$email" "$issue_id" "$message"
  fi
  
  # GitHub mention
  gh issue comment "$issue_id" --body "@$approver - Your approval is required for this issue. $message"
}
```

### 4. 自動化された代替承認システム

```bash
# 代替承認者システム
activate_backup_approvers() {
  local issue_id="$1"
  
  echo "🔄 Activating backup approvers for issue #$issue_id"
  
  # 代替承認者特定
  local backup_approvers=$(identify_backup_approvers "$issue_id")
  
  if [[ -n "$backup_approvers" ]]; then
    echo "$backup_approvers" | jq -r '.[]' | while IFS= read -r backup_approver; do
      notify_backup_approver "$backup_approver" "$issue_id"
    done
    
    # 代替承認モード有効化
    gh issue edit "$issue_id" --add-label "backup-approval-active"
    
    # 元の承認者への情報共有
    notify_original_approvers_of_backup_activation "$issue_id"
  else
    echo "⚠️ No backup approvers found for issue #$issue_id"
    escalate_to_management_due_to_no_backup "$issue_id"
  fi
}

# 代替承認者特定
identify_backup_approvers() {
  local issue_id="$1"
  
  local issue_data=$(gh issue view "$issue_id" --json labels)
  local labels=$(echo "$issue_data" | jq -r '.labels[].name' | tr '\n' ',')
  
  local backup_approvers=$(jq -n '[]')
  
  # Phase別代替承認者
  if [[ "$labels" =~ "phase-" ]]; then
    local phase_backups=$(get_phase_backup_approvers "$labels")
    backup_approvers=$(echo "$backup_approvers" | jq ". + $phase_backups")
  fi
  
  # 技術領域別代替承認者
  if [[ "$labels" =~ "backend" ]]; then
    local backend_backups=$(get_backend_team_leads)
    backup_approvers=$(echo "$backup_approvers" | jq ". + $backend_backups")
  fi
  
  if [[ "$labels" =~ "frontend" ]]; then
    local frontend_backups=$(get_frontend_team_leads)
    backup_approvers=$(echo "$backup_approvers" | jq ". + $frontend_backups")
  fi
  
  # 重複除去
  echo "$backup_approvers" | jq 'unique'
}

# 代替承認者通知
notify_backup_approver() {
  local backup_approver="$1"
  local issue_id="$2"
  
  local backup_message=$(cat <<EOF
🔄 **Backup Approval Request**

You have been designated as a backup approver for issue #$issue_id due to primary approver unavailability.

**Issue:** $(gh issue view "$issue_id" --json title | jq -r '.title')
**Original Timeline:** Exceeded standard approval timeframe
**Your Role:** Backup approval authority

**Actions Available:**
1. ✅ Review and approve if ready
2. 🔄 Reassign to another qualified approver
3. ⏸️ Request extension with justification
4. ❌ Reject with detailed feedback

**Priority:** This issue may be blocking other development work.

Issue Link: $(gh issue view "$issue_id" --json url | jq -r '.url')
EOF
)
  
  send_direct_approver_notification "$backup_approver" "$issue_id" "$backup_message"
  
  # バックアップ承認者としてIssueに記録
  gh issue comment "$issue_id" --body "🔄 Backup approver activated: @$backup_approver"
}
```

### 5. 自動解決・フォローアップ

```bash
# 自動フォローアップシステム
execute_scheduled_followup() {
  local issue_id="$1"
  local followup_type="$2"
  
  echo "📞 Executing scheduled followup for issue #$issue_id (type: $followup_type)"
  
  # Issue現在状態確認
  local current_state=$(gh issue view "$issue_id" --json state | jq -r '.state')
  
  if [[ "$current_state" != "OPEN" ]]; then
    echo "✅ Issue #$issue_id resolved - canceling followup"
    cancel_followup "$issue_id" "$followup_type"
    return
  fi
  
  case "$followup_type" in
    "critical_followup")
      execute_critical_followup "$issue_id"
      ;;
    "standard_followup")
      execute_standard_followup "$issue_id"
      ;;
    "final_followup")
      execute_final_followup "$issue_id"
      ;;
    "gentle_followup")
      execute_gentle_followup "$issue_id"
      ;;
  esac
}

# クリティカルフォローアップ
execute_critical_followup() {
  local issue_id="$1"
  
  echo "🚨 CRITICAL: Executing critical followup for #$issue_id"
  
  # 状況再評価
  local current_delay=$(get_current_approval_delay "$issue_id")
  
  if [[ $current_delay -gt 72 ]]; then
    # 72時間超過 - 緊急事態
    declare_approval_emergency "$issue_id"
  else
    # 追加のエスカレーション
    escalate_further "$issue_id" "critical"
  fi
}

# 承認緊急事態宣言
declare_approval_emergency() {
  local issue_id="$1"
  
  echo "🚨 EMERGENCY: Declaring approval emergency for #$issue_id"
  
  local emergency_message=$(cat <<EOF
🚨 **APPROVAL EMERGENCY DECLARED**

Issue #$issue_id has exceeded critical timeframes and is now classified as an approval emergency.

**Emergency Actions Initiated:**
1. 🚨 Executive leadership notification
2. 🔄 Emergency approval committee activation
3. ⚡ Expedited resolution process
4. 📊 Immediate process review

**Business Impact:** Critical development blockage
**Required Action:** Immediate executive intervention

This situation requires immediate resolution to prevent significant project delays.
EOF
)
  
  # 最高レベル通知
  send_slack_notification "#executive-alerts" "$emergency_message" "danger" "APPROVAL EMERGENCY"
  send_executive_email_notification "$issue_id" "$emergency_message"
  
  # 緊急承認委員会起動
  activate_emergency_approval_committee "$issue_id"
  
  gh issue edit "$issue_id" --add-label "approval-emergency,executive-intervention"
  gh issue comment "$issue_id" --body "$emergency_message"
}

# エスカレーション効果測定
measure_escalation_effectiveness() {
  local period="${1:-7d}"
  
  echo "📊 Measuring escalation effectiveness (last $period)"
  
  # エスカレーション統計収集
  local escalation_stats=$(collect_escalation_statistics "$period")
  
  # 解決時間分析
  local resolution_analysis=$(analyze_resolution_times "$period")
  
  # 効果レポート生成
  local effectiveness_report=$(cat <<EOF
# Escalation Effectiveness Report
Period: Last $period
Generated: $(date)

## Escalation Statistics
$(echo "$escalation_stats" | jq .)

## Resolution Time Analysis
$(echo "$resolution_analysis" | jq .)

## Key Metrics
- Average resolution time after escalation: $(calculate_avg_resolution_time "$period")
- Escalation success rate: $(calculate_escalation_success_rate "$period")%
- Management intervention rate: $(calculate_mgmt_intervention_rate "$period")%

## Recommendations
$(generate_escalation_improvement_recommendations)
EOF
)
  
  echo "$effectiveness_report" > "escalation-effectiveness-$(date +%Y%m%d).md"
  send_slack_notification "#escalation-reports" "Weekly Escalation Effectiveness Report" "good" "Escalation Report"
}

# 継続的エスカレーション管理
continuous_escalation_management() {
  echo "🔄 Starting continuous escalation management"
  
  while true; do
    echo "🔍 Checking for escalation requirements..."
    
    # 遅延監視・エスカレーション判定
    monitor_approval_delays
    
    # スケジュールされたフォローアップ実行
    process_scheduled_followups
    
    # 緊急事態確認
    check_for_emergency_situations
    
    # エスカレーション効果測定（日次）
    if [[ $(date +%H) == "09" ]]; then
      measure_escalation_effectiveness "24h"
    fi
    
    echo "✅ Escalation management cycle completed - sleeping for 30 minutes"
    sleep 1800  # 30分間隔
  done
}
```

この承認促進・エスカレーションシステムにより、承認の遅延を早期検出し、段階的で効果的なエスカレーションを通じて迅速な問題解決を促進します。ステークホルダーとの適切なコミュニケーションと代替承認メカニズムにより、開発フローの継続性を確保します。