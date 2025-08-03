# Slack・Email通知システム実装ガイド

Issue自動管理システムにおけるSlack・Email通知の実装方法を説明します。

## 概要

CC-DECKのIssue自動管理システムは、以下の場面で自動通知を送信します：

- **Issue完了検出時**: 承認者への通知
- **承認決定時**: ステークホルダーへの結果通知  
- **条件付き承認時**: 異議申し立て期間の通知
- **高リスク案件時**: 人間レビュー要求通知
- **システム異常時**: 管理者への緊急通知

## Slack通知システム

### 1. Slack App設定

```bash
# Slack App作成とBot Token取得
# https://api.slack.com/apps にアクセス
# 1. "Create New App" → "From scratch"
# 2. App名: "CC-DECK Issue Manager"
# 3. OAuth & Permissions で以下のスコープを追加：
#    - chat:write
#    - channels:read
#    - users:read
#    - reactions:write
```

### 2. 環境変数設定

```bash
# .env ファイルに設定
SLACK_BOT_TOKEN=xoxb-your-bot-token-here
SLACK_SIGNING_SECRET=your-signing-secret-here
SLACK_DEFAULT_CHANNEL=#cc-deck-notifications
SLACK_APPROVAL_CHANNEL=#cc-deck-approvals
SLACK_ALERTS_CHANNEL=#cc-deck-alerts
```

### 3. Slack通知実装

```bash
# slack_notifier.sh
#!/bin/bash

SLACK_BOT_TOKEN="${SLACK_BOT_TOKEN}"
SLACK_API_URL="https://slack.com/api/chat.postMessage"

# 基本的なSlack通知関数
send_slack_notification() {
  local channel="$1"
  local message="$2"
  local color="${3:-good}"  # good, warning, danger
  local title="${4:-CC-DECK Notification}"
  
  # Slack Block Kit format for rich notifications
  local payload=$(cat <<EOF
{
  "channel": "$channel",
  "attachments": [
    {
      "color": "$color",
      "title": "$title",
      "text": "$message",
      "footer": "CC-DECK Issue Auto Manager",
      "ts": $(date +%s)
    }
  ]
}
EOF
)
  
  curl -X POST "$SLACK_API_URL" \
    -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
    -H "Content-type: application/json" \
    -d "$payload"
}

# Issue承認通知
send_approval_notification() {
  local issue_id="$1"
  local approval_status="$2"
  local approver="$3"
  
  local color="good"
  if [[ "$approval_status" == "rejected" ]]; then
    color="danger"
  elif [[ "$approval_status" == "conditional" ]]; then
    color="warning"
  fi
  
  local message="Issue #$issue_id has been $approval_status by $approver"
  
  send_slack_notification "$SLACK_APPROVAL_CHANNEL" "$message" "$color" "Issue Approval Update"
}

# 条件付き承認通知（異議申し立て期間）
send_conditional_approval_notification() {
  local issue_id="$1"
  local timeout_hours="$2"
  
  local message=$(cat <<EOF
📋 **Conditional Approval - Issue #$issue_id**

This issue has been marked for conditional approval.
Stakeholders have $timeout_hours hours to raise objections.

**Issue Details:**
$(get_issue_summary "$issue_id")

**Quality Metrics:**
- Test Coverage: $(get_test_coverage "$issue_id")%
- Code Quality: $(get_code_quality "$issue_id")/10
- Security Status: $(get_security_status "$issue_id")

**Actions:**
• React with ❌ to object
• React with ✅ to explicitly approve
• Reply with concerns or questions

*Auto-approval in $timeout_hours hours if no objections*
EOF
)
  
  send_slack_notification "$SLACK_APPROVAL_CHANNEL" "$message" "warning" "Conditional Approval Required"
}

# 高リスク案件の人間レビュー要求
send_human_review_request() {
  local issue_id="$1"
  local risk_factors="$2"
  local assigned_reviewer="$3"
  
  local message=$(cat <<EOF
🚨 **Human Review Required - Issue #$issue_id**

This issue has been classified as HIGH RISK and requires human review.

**Risk Factors:**
$risk_factors

**Assigned Reviewer:** @$assigned_reviewer

**Issue Summary:**
$(get_issue_summary "$issue_id")

**Review Package:** 
View detailed analysis: $(generate_review_package_link "$issue_id")

**Please review and approve/reject within 24 hours**
EOF
)
  
  send_slack_notification "$SLACK_APPROVAL_CHANNEL" "$message" "danger" "High Risk - Human Review Required"
}

# システム異常アラート
send_system_alert() {
  local alert_type="$1"
  local alert_message="$2"
  local severity="${3:-warning}"
  
  local message=$(cat <<EOF
🔧 **System Alert - $alert_type**

$alert_message

**Timestamp:** $(date)
**Severity:** $severity

**Recommended Actions:**
$(get_recommended_actions "$alert_type")
EOF
)
  
  send_slack_notification "$SLACK_ALERTS_CHANNEL" "$message" "$severity" "System Alert"
}
```

### 4. インタラクティブSlack通知

```bash
# interactive_slack.sh
#!/bin/bash

# インタラクティブなボタン付き通知
send_interactive_approval_request() {
  local issue_id="$1"
  local approval_summary="$2"
  
  local payload=$(cat <<EOF
{
  "channel": "$SLACK_APPROVAL_CHANNEL",
  "blocks": [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "Issue #$issue_id Approval Request"
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "$approval_summary"
      }
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "✅ Approve"
          },
          "style": "primary",
          "value": "approve_$issue_id",
          "action_id": "approve_issue"
        },
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "❌ Reject"
          },
          "style": "danger",
          "value": "reject_$issue_id",
          "action_id": "reject_issue"
        },
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "📋 View Details"
          },
          "value": "details_$issue_id",
          "action_id": "view_details"
        }
      ]
    }
  ]
}
EOF
)

  curl -X POST "$SLACK_API_URL" \
    -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
    -H "Content-type: application/json" \
    -d "$payload"
}

# Slackボタンクリック処理（Webhook エンドポイント）
handle_slack_interaction() {
  local payload="$1"
  
  local action_id=$(echo "$payload" | jq -r '.actions[0].action_id')
  local value=$(echo "$payload" | jq -r '.actions[0].value')
  local user=$(echo "$payload" | jq -r '.user.username')
  
  case "$action_id" in
    "approve_issue")
      local issue_id=$(echo "$value" | sed 's/approve_//')
      process_approval_decision "$issue_id" "approved" "$user"
      ;;
    "reject_issue")
      local issue_id=$(echo "$value" | sed 's/reject_//')
      process_approval_decision "$issue_id" "rejected" "$user"
      ;;
    "view_details")
      local issue_id=$(echo "$value" | sed 's/details_//')
      send_detailed_issue_info "$issue_id" "$user"
      ;;
  esac
}
```

## Email通知システム

### 1. SMTP設定

```bash
# メール送信設定（.env ファイル）
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_NAME="CC-DECK Issue Manager"
SMTP_FROM_EMAIL=noreply@yourcompany.com
```

### 2. Email通知実装

```bash
# email_notifier.sh
#!/bin/bash

# メール送信関数
send_email_notification() {
  local to_email="$1"
  local subject="$2"
  local html_body="$3"
  local text_body="$4"
  
  # Pythonでメール送信（より柔軟なHTML対応）
  python3 << EOF
import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

smtp_host = os.getenv('SMTP_HOST')
smtp_port = int(os.getenv('SMTP_PORT'))
smtp_user = os.getenv('SMTP_USER')
smtp_password = os.getenv('SMTP_PASSWORD')
from_name = os.getenv('SMTP_FROM_NAME')
from_email = os.getenv('SMTP_FROM_EMAIL')

msg = MIMEMultipart('alternative')
msg['Subject'] = "$subject"
msg['From'] = f"{from_name} <{from_email}>"
msg['To'] = "$to_email"

# テキスト版
text_part = MIMEText("""$text_body""", 'plain')
msg.attach(text_part)

# HTML版
html_part = MIMEText("""$html_body""", 'html')
msg.attach(html_part)

# 送信
with smtplib.SMTP(smtp_host, smtp_port) as server:
    server.starttls()
    server.login(smtp_user, smtp_password)
    server.send_message(msg)

print("Email sent successfully")
EOF
}

# Issue承認要求メール
send_approval_request_email() {
  local approver_email="$1"
  local issue_id="$2"
  local issue_summary="$3"
  local approval_link="$4"
  
  local subject="[CC-DECK] Issue #$issue_id Approval Required"
  
  local html_body=$(cat <<EOF
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #4CAF50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .issue-details { background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .button { display: inline-block; padding: 12px 24px; background: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
        .button.danger { background: #f44336; }
        .footer { background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Issue #$issue_id Approval Required</h2>
    </div>
    
    <div class="content">
        <p>Hello,</p>
        
        <p>An issue has been completed and requires your approval:</p>
        
        <div class="issue-details">
            <h3>Issue Summary</h3>
            <p>$issue_summary</p>
            
            <h4>Quality Metrics</h4>
            <ul>
                <li>Test Coverage: $(get_test_coverage "$issue_id")%</li>
                <li>Code Quality: $(get_code_quality "$issue_id")/10</li>
                <li>Security Status: $(get_security_status "$issue_id")</li>
            </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="$approval_link&action=approve" class="button">✅ Approve</a>
            <a href="$approval_link&action=reject" class="button danger">❌ Reject</a>
            <a href="$approval_link" class="button" style="background: #2196F3;">📋 View Details</a>
        </div>
        
        <p><strong>Please review and approve within 24 hours.</strong></p>
        
        <p>If you have any questions, please contact the development team.</p>
    </div>
    
    <div class="footer">
        <p>This is an automated message from CC-DECK Issue Auto Manager</p>
        <p>Generated at $(date)</p>
    </div>
</body>
</html>
EOF
)
  
  local text_body=$(cat <<EOF
Issue #$issue_id Approval Required

An issue has been completed and requires your approval:

$issue_summary

Quality Metrics:
- Test Coverage: $(get_test_coverage "$issue_id")%
- Code Quality: $(get_code_quality "$issue_id")/10
- Security Status: $(get_security_status "$issue_id")

Please review: $approval_link

Approve: $approval_link&action=approve
Reject: $approval_link&action=reject

Please review and approve within 24 hours.

---
This is an automated message from CC-DECK Issue Auto Manager
Generated at $(date)
EOF
)
  
  send_email_notification "$approver_email" "$subject" "$html_body" "$text_body"
}

# 定期的なサマリーメール
send_weekly_summary_email() {
  local stakeholder_email="$1"
  local week_start="$2"
  local week_end="$3"
  
  local stats=$(generate_weekly_stats "$week_start" "$week_end")
  
  local subject="[CC-DECK] Weekly Issue Management Summary"
  
  local html_body=$(cat <<EOF
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #2196F3; color: white; padding: 20px; text-align: center; }
        .metrics { display: flex; justify-content: space-around; margin: 20px 0; }
        .metric { text-align: center; padding: 15px; background: #f5f5f5; border-radius: 5px; }
        .metric h3 { margin: 0; color: #2196F3; }
        .chart { margin: 20px 0; text-align: center; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Weekly Issue Management Summary</h2>
        <p>$week_start - $week_end</p>
    </div>
    
    <div class="content">
        <div class="metrics">
            <div class="metric">
                <h3>$(echo "$stats" | jq -r '.total_processed')</h3>
                <p>Issues Processed</p>
            </div>
            <div class="metric">
                <h3>$(echo "$stats" | jq -r '.auto_approved')%</h3>
                <p>Auto-Approved</p>
            </div>
            <div class="metric">
                <h3>$(echo "$stats" | jq -r '.avg_processing_time')</h3>
                <p>Avg Processing Time</p>
            </div>
            <div class="metric">
                <h3>$(echo "$stats" | jq -r '.quality_score')</h3>
                <p>Quality Score</p>
            </div>
        </div>
        
        <h3>Top Achievements</h3>
        <ul>
            $(echo "$stats" | jq -r '.achievements[]' | sed 's/^/<li>/' | sed 's/$/<\/li>/')
        </ul>
        
        <h3>Areas for Improvement</h3>
        <ul>
            $(echo "$stats" | jq -r '.improvements[]' | sed 's/^/<li>/' | sed 's/$/<\/li>/')
        </ul>
    </div>
</body>
</html>
EOF
)
  
  send_email_notification "$stakeholder_email" "$subject" "$html_body" "Weekly summary text version"
}
```

### 3. 通知設定とパーソナライゼーション

```bash
# notification_config.sh
#!/bin/bash

# 通知設定管理
configure_notifications() {
  local user="$1"
  local preferences="$2"
  
  # ユーザー別通知設定を保存
  echo "$preferences" > ".notifications/users/$user.json"
}

# パーソナライズされた通知送信
send_personalized_notification() {
  local user="$1"
  local notification_type="$2"
  local content="$3"
  
  # ユーザー設定を読み込み
  local user_config=".notifications/users/$user.json"
  
  if [[ -f "$user_config" ]]; then
    local slack_enabled=$(jq -r '.slack.enabled' "$user_config")
    local email_enabled=$(jq -r '.email.enabled' "$user_config")
    local urgency_filter=$(jq -r '.urgency_filter' "$user_config")
    
    # 緊急度フィルタリング
    local content_urgency=$(determine_urgency "$notification_type" "$content")
    if [[ "$content_urgency" -lt "$urgency_filter" ]]; then
      return 0  # フィルタされたため送信しない
    fi
    
    # Slack通知
    if [[ "$slack_enabled" == "true" ]]; then
      local slack_channel=$(jq -r '.slack.channel' "$user_config")
      send_slack_notification "$slack_channel" "$content"
    fi
    
    # Email通知
    if [[ "$email_enabled" == "true" ]]; then
      local email_address=$(jq -r '.email.address' "$user_config")
      send_email_notification "$email_address" "CC-DECK Notification" "$content"
    fi
  fi
}

# 通知設定例
setup_default_notifications() {
  # デフォルト設定を作成
  mkdir -p .notifications/users
  
  # プロジェクトマネージャー設定
  cat > .notifications/users/project-manager.json << 'EOF'
{
  "slack": {
    "enabled": true,
    "channel": "#project-updates"
  },
  "email": {
    "enabled": true,
    "address": "pm@yourcompany.com"
  },
  "urgency_filter": 3,
  "notification_types": {
    "high_risk_approval": true,
    "weekly_summary": true,
    "system_alerts": true,
    "approval_results": true
  }
}
EOF

  # 開発者設定
  cat > .notifications/users/developer.json << 'EOF'
{
  "slack": {
    "enabled": true,
    "channel": "#dev-notifications"
  },
  "email": {
    "enabled": false,
    "address": ""
  },
  "urgency_filter": 2,
  "notification_types": {
    "issue_completed": true,
    "approval_required": true,
    "quality_issues": true
  }
}
EOF
}
```

## 通知テンプレート

### Slack通知テンプレート例

```json
{
  "channel": "#cc-deck-approvals",
  "blocks": [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "🎯 Issue #123 Ready for Approval"
      }
    },
    {
      "type": "section",
      "fields": [
        {
          "type": "mrkdwn",
          "text": "*Type:* Feature Implementation"
        },
        {
          "type": "mrkdwn",
          "text": "*Risk Level:* Medium"
        },
        {
          "type": "mrkdwn",
          "text": "*Test Coverage:* 94%"
        },
        {
          "type": "mrkdwn",
          "text": "*Quality Score:* 8.7/10"
        }
      ]
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Summary:* Implement user authentication with OAuth2 integration"
      }
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "✅ Approve"
          },
          "style": "primary",
          "value": "approve_123"
        },
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "❌ Reject"
          },
          "style": "danger",
          "value": "reject_123"
        }
      ]
    }
  ]
}
```

## セットアップ手順

### 1. 環境設定

```bash
# 1. 必要なディレクトリ作成
mkdir -p .notifications/{templates,users,logs}

# 2. 環境変数ファイル作成
cp .env.example .env
# SLACK_BOT_TOKEN, SMTP設定などを記入

# 3. 依存関係インストール
# Python (メール送信用)
pip install secure-smtplib

# 4. 権限設定
chmod +x scripts/slack_notifier.sh
chmod +x scripts/email_notifier.sh
```

### 2. Webhook設定（Slackインタラクション用）

```bash
# Webhook受信用のシンプルなサーバー
python3 << 'EOF'
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import subprocess
import urllib.parse

class SlackWebhookHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/slack/interactions':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            # Slack payload parsing
            payload = urllib.parse.parse_qs(post_data.decode('utf-8'))
            payload_json = json.loads(payload['payload'][0])
            
            # 処理実行
            subprocess.run(['./scripts/handle_slack_interaction.sh', json.dumps(payload_json)])
            
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b'OK')

if __name__ == '__main__':
    server = HTTPServer(('localhost', 8080), SlackWebhookHandler)
    print('Webhook server running on port 8080')
    server.serve_forever()
EOF
```

### 3. 統合テスト

```bash
# 通知システムのテスト
./scripts/test_notifications.sh

# テストメール送信
send_email_notification "test@example.com" "Test Subject" "<h1>Test HTML</h1>" "Test text"

# テストSlack通知
send_slack_notification "#test-channel" "Test notification" "good" "Test Title"
```

この実装により、Issue自動管理システムは包括的なSlack・Email通知機能を提供し、ステークホルダーとの透明性の高いコミュニケーションを実現します。