#!/bin/bash

# Classify Existing Issues Script
# このスクリプトは既存のissueをすべてAI生成として分類し、適切なラベルを追加します。

set -e

# カラー定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ログ関数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 設定
DRY_RUN=false
BACKUP_ENABLED=true
BATCH_SIZE=5

# コマンドライン引数解析
while [[ $# -gt 0 ]]; do
    case $1 in
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --no-backup)
            BACKUP_ENABLED=false
            shift
            ;;
        --batch-size)
            BATCH_SIZE="$2"
            shift 2
            ;;
        -h|--help)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --dry-run          Show what would be done without making changes"
            echo "  --no-backup        Skip creating backup of current issue state"
            echo "  --batch-size N     Process N issues at a time (default: 5)"
            echo "  -h, --help         Show this help message"
            exit 0
            ;;
        *)
            log_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

# 必要なツールの確認
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    if ! command -v gh &> /dev/null; then
        log_error "GitHub CLI (gh) is not installed or not in PATH"
        exit 1
    fi
    
    if ! gh auth status &> /dev/null; then
        log_error "GitHub CLI is not authenticated"
        exit 1
    fi
    
    if ! command -v jq &> /dev/null; then
        log_error "jq is not installed or not in PATH"
        exit 1
    fi
    
    log_success "Prerequisites check passed"
}

# バックアップ作成
create_backup() {
    if [[ "$BACKUP_ENABLED" == "false" ]]; then
        log_info "Backup disabled, skipping..."
        return
    fi
    
    log_info "Creating backup of current issue state..."
    
    local backup_dir="backup-$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$backup_dir"
    
    # 全issueの現在状態をバックアップ
    gh issue list --state=all --limit=1000 --json number,title,state,labels,assignees,author,createdAt > "$backup_dir/issues-backup.json"
    
    log_success "Backup created in $backup_dir/"
}

# 既存issue一覧取得
get_existing_issues() {
    log_info "Fetching existing issues..."
    
    local issues=$(gh issue list --state=all --limit=1000 --json number,title,state,labels,author,createdAt)
    local issue_count=$(echo "$issues" | jq length)
    
    log_info "Found $issue_count total issues"
    echo "$issues"
}

# AI生成issue識別
identify_ai_generated_issues() {
    local issues="$1"
    
    log_info "Identifying AI-generated issues..."
    
    # プロジェクト固有の識別ロジック
    # このプロジェクトでは既存のissueはすべてAI生成（ghコマンドで作成）
    local ai_issues=$(echo "$issues" | jq '[
        .[] | 
        select(.state == "OPEN") |
        select(.labels | map(.name) | index("ai-generated") == null) |
        select(.labels | map(.name) | index("human-created") == null) |
        . + {
            classification: "ai-generated",
            confidence: 0.9,
            reason: "Created via gh command in CC-DECK project"
        }
    ]')
    
    local ai_count=$(echo "$ai_issues" | jq length)
    log_info "Identified $ai_count issues as AI-generated"
    
    echo "$ai_issues"
}

# ラベル追加処理
add_ai_generated_labels() {
    local ai_issues="$1"
    
    log_info "Adding ai-generated labels to identified issues..."
    
    local processed=0
    local total=$(echo "$ai_issues" | jq length)
    
    echo "$ai_issues" | jq -r '.[].number' | while read -r issue_id; do
        ((processed++))
        
        log_info "Processing issue #$issue_id ($processed/$total)"
        
        if [[ "$DRY_RUN" == "true" ]]; then
            log_warning "[DRY RUN] Would add ai-generated label to issue #$issue_id"
        else
            # ラベル追加
            if gh issue edit "$issue_id" --add-label "ai-generated,automated" 2>/dev/null; then
                log_success "Added labels to issue #$issue_id"
                
                # AI生成マーカーコメント追加
                local marker_comment="🤖 **AI-Generated Issue Classification**

This issue has been automatically classified as AI-generated based on:
- Creation method: GitHub CLI (gh command)
- Project context: CC-DECK automated development system
- Classification date: $(date -Iseconds)

This issue will now be processed through the automated approval workflow system."
                
                gh issue comment "$issue_id" --body "$marker_comment" 2>/dev/null || log_warning "Failed to add comment to issue #$issue_id"
                
                # メタデータ記録
                record_classification_metadata "$issue_id" "ai-generated" "batch_classification"
                
            else
                log_error "Failed to add labels to issue #$issue_id"
            fi
        fi
        
        # バッチサイズ制御
        if [[ $((processed % BATCH_SIZE)) -eq 0 ]]; then
            log_info "Processed $processed issues, pausing for 2 seconds..."
            sleep 2
        fi
    done
}

# 分類メタデータ記録
record_classification_metadata() {
    local issue_id="$1"
    local classification="$2"
    local method="$3"
    
    local metadata=$(jq -n \
        --arg issue_id "$issue_id" \
        --arg classification "$classification" \
        --arg method "$method" \
        --arg timestamp "$(date -Iseconds)" \
        --arg hostname "$(hostname)" \
        --arg user "$(whoami)" \
    '{
        issue_id: $issue_id,
        classification: $classification,
        method: $method,
        timestamp: $timestamp,
        hostname: $hostname,
        user: $user
    }')
    
    echo "$metadata" >> .classification-batch-log.jsonl
}

# 分類結果検証
verify_classification_results() {
    log_info "Verifying classification results..."
    
    # AI生成ラベル付きissue数確認
    local ai_labeled_count=$(gh issue list --state=all --label="ai-generated" --json number | jq length)
    
    # 人間作成ラベル付きissue数確認
    local human_labeled_count=$(gh issue list --state=all --label="human-created" --json number | jq length)
    
    # 未分類issue数確認
    local unlabeled_count=$(gh issue list --state=all --json number,labels | \
        jq '[.[] | select((.labels | map(.name) | index("ai-generated") == null) and (.labels | map(.name) | index("human-created") == null))] | length')
    
    log_info "Classification Results:"
    log_info "  AI-Generated: $ai_labeled_count issues"
    log_info "  Human-Created: $human_labeled_count issues"
    log_info "  Unclassified: $unlabeled_count issues"
    
    if [[ $unlabeled_count -gt 0 ]]; then
        log_warning "$unlabeled_count issues remain unclassified"
        
        # 未分類issueをリスト表示
        local unclassified_issues=$(gh issue list --state=all --json number,title,labels | \
            jq -r '.[] | select((.labels | map(.name) | index("ai-generated") == null) and (.labels | map(.name) | index("human-created") == null)) | "#\(.number): \(.title)"')
        
        log_info "Unclassified issues:"
        echo "$unclassified_issues" | while IFS= read -r line; do
            log_info "  $line"
        done
    fi
}

# 分類統計生成
generate_classification_statistics() {
    log_info "Generating classification statistics..."
    
    local stats_file="classification-stats-$(date +%Y%m%d_%H%M%S).json"
    
    local stats=$(jq -n \
        --argjson ai_count "$(gh issue list --state=all --label="ai-generated" --json number | jq length)" \
        --argjson human_count "$(gh issue list --state=all --label="human-created" --json number | jq length)" \
        --argjson total_count "$(gh issue list --state=all --json number | jq length)" \
        --arg timestamp "$(date -Iseconds)" \
        --arg method "batch_classification" \
    '{
        timestamp: $timestamp,
        method: $method,
        statistics: {
            total_issues: $total_count,
            ai_generated: $ai_count,
            human_created: $human_count,
            ai_percentage: (($ai_count * 100) / $total_count),
            human_percentage: (($human_count * 100) / $total_count)
        }
    }')
    
    echo "$stats" > "$stats_file"
    
    log_success "Statistics saved to $stats_file"
    echo "$stats" | jq .
}

# 次の手順ガイド
show_next_steps() {
    log_info "Classification completed! Next steps:"
    echo ""
    echo "1. 🔍 Review classification results:"
    echo "   gh issue list --label='ai-generated'"
    echo ""
    echo "2. 🚀 Start automated processing system:"
    echo "   ./scripts/start-auto-issue-management.sh"
    echo ""
    echo "3. 📊 Monitor processing with:"
    echo "   ./scripts/monitoring-dashboard.sh"
    echo ""
    echo "4. 📝 Check logs in:"
    echo "   .classification-batch-log.jsonl"
    echo ""
    echo "For future issues created manually by humans, make sure to add 'human-created' label."
}

# メイン実行関数
main() {
    log_info "Starting existing issues classification process..."
    
    if [[ "$DRY_RUN" == "true" ]]; then
        log_warning "DRY RUN MODE - No changes will be made"
    fi
    
    # 前提条件チェック
    check_prerequisites
    
    # バックアップ作成
    create_backup
    
    # 既存issue取得
    local existing_issues=$(get_existing_issues)
    
    # AI生成issue識別
    local ai_issues=$(identify_ai_generated_issues "$existing_issues")
    
    # ラベル追加処理
    if [[ $(echo "$ai_issues" | jq length) -gt 0 ]]; then
        add_ai_generated_labels "$ai_issues"
    else
        log_info "No issues found for classification"
    fi
    
    if [[ "$DRY_RUN" == "false" ]]; then
        # 結果検証
        verify_classification_results
        
        # 統計生成
        generate_classification_statistics
        
        # 次の手順表示
        show_next_steps
    fi
    
    log_success "Classification process completed!"
}

# エラーハンドリング
trap 'log_error "Script interrupted"; exit 1' INT TERM

# スクリプト実行
main "$@"