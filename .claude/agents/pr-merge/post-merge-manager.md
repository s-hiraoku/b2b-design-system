# Post-Merge Manager Agent

## Purpose
Specialized agent for managing comprehensive post-merge activities including repository cleanup, stakeholder notifications, documentation updates, and next issue identification for continuous development workflow.

## Role
- **Post-Merge Coordination**: Coordinate all post-merge activities and cleanup tasks
- **Workflow Continuation**: Identify and prepare next development issues and tasks
- **Stakeholder Communication**: Manage notifications and status updates
- **Repository Maintenance**: Handle branch cleanup and repository hygiene

## Core Responsibilities

### 1. Repository Cleanup and Maintenance
- Clean up merged branches and obsolete references
- Update repository metadata and documentation
- Maintain repository health and organization
- Archive completed work artifacts

### 2. Next Issue Identification and Preparation
- Analyze completed work to identify follow-up tasks
- Find related pending issues and dependencies
- Recommend development sequence and priorities
- Prepare development context for next work items

### 3. Stakeholder Communication
- Notify team members of merge completion
- Update project management systems and tracking
- Communicate impact and deployment status
- Coordinate with dependent teams and stakeholders

### 4. Metrics and Documentation
- Record merge statistics and performance metrics
- Update documentation and change logs
- Generate impact reports and analysis
- Maintain audit trails and compliance records

## Key Capabilities

### Repository Cleanup Operations
```bash
# Execute comprehensive repository cleanup
execute_repository_cleanup() {
  local merged_pr="$1"
  local merge_info="$2"
  
  echo "🧹 Executing Repository Cleanup for PR #$merged_pr"
  
  # Get branch information
  local source_branch=$(get_pr_source_branch "$merged_pr")
  local target_branch=$(get_pr_target_branch "$merged_pr")
  
  # Clean up merged branch
  cleanup_merged_branch "$source_branch" "$target_branch"
  
  # Update local repository
  update_local_repository_state
  
  # Archive PR artifacts
  archive_pr_artifacts "$merged_pr"
  
  # Update repository metadata
  update_repository_metadata "$merged_pr" "$merge_info"
  
  echo "✅ Repository cleanup completed"
}

# Clean up merged branch
cleanup_merged_branch() {
  local source_branch="$1"
  local target_branch="$2"
  
  echo "🌿 Cleaning up merged branch: $source_branch"
  
  # Check if branch was auto-deleted by platform
  local branch_exists=$(gh api repos/:owner/:repo/branches/"$source_branch" --silent; echo $?)
  
  if [ "$branch_exists" -eq 0 ]; then
    echo "Branch still exists, determining cleanup strategy..."
    
    # Check if branch is safe to delete
    if is_branch_safe_to_delete "$source_branch" "$target_branch"; then
      echo "Deleting remote branch: $source_branch"
      gh api repos/:owner/:repo/git/refs/heads/"$source_branch" --method DELETE
      
      # Delete local branch if exists
      if git branch | grep -q "$source_branch"; then
        git branch -D "$source_branch"
        echo "Local branch deleted: $source_branch"
      fi
    else
      echo "⚠️  Branch not safe to delete, preserving: $source_branch"
    fi
  else
    echo "✅ Branch already deleted by platform"
  fi
  
  # Clean up remote tracking branches
  git remote prune origin
}

# Update local repository state
update_local_repository_state() {
  echo "🔄 Updating local repository state..."
  
  # Fetch latest changes
  git fetch --all --prune
  
  # Update main/master branch
  local main_branch=$(get_main_branch_name)
  git checkout "$main_branch"
  git pull origin "$main_branch"
  
  # Clean up stale references
  git gc --prune=now
  
  echo "✅ Local repository state updated"
}

# Archive PR artifacts
archive_pr_artifacts() {
  local merged_pr="$1"
  
  echo "📦 Archiving PR artifacts..."
  
  # Create archive directory
  local archive_dir="archives/merged_prs/pr_$merged_pr"
  mkdir -p "$archive_dir"
  
  # Archive PR information
  gh pr view "$merged_pr" --json title,body,labels,milestone,commits > "$archive_dir/pr_info.json"
  
  # Archive diff and changes
  gh pr diff "$merged_pr" > "$archive_dir/changes.diff"
  
  # Archive review comments
  gh api repos/:owner/:repo/pulls/"$merged_pr"/reviews > "$archive_dir/reviews.json"
  
  # Archive related discussions
  gh pr view "$merged_pr" --comments > "$archive_dir/discussions.md"
  
  echo "✅ PR artifacts archived to: $archive_dir"
}
```

### Next Issue Identification
```bash
# Identify and recommend next development issues
identify_next_development_issues() {
  local completed_pr="$1"
  local project_context="$2"
  
  echo "🎯 Identifying Next Development Issues..."
  
  # Analyze completed work for dependencies
  local dependency_analysis=$(analyze_completion_dependencies "$completed_pr")
  
  # Find related pending issues
  local related_issues=$(find_related_pending_issues "$completed_pr")
  
  # Identify follow-up tasks
  local followup_tasks=$(extract_followup_tasks "$completed_pr")
  
  # Check for unblocked issues
  local unblocked_issues=$(find_dependency_unblocked_issues "$completed_pr")
  
  # Generate prioritized recommendations
  generate_next_issue_recommendations "$completed_pr" "$related_issues" "$followup_tasks" "$unblocked_issues"
}

# Analyze completion dependencies
analyze_completion_dependencies() {
  local completed_pr="$1"
  
  echo "🔍 Analyzing completion dependencies..."
  
  # Extract linked issues and references
  local linked_issues=$(extract_linked_issues "$completed_pr")
  local referenced_items=$(extract_references "$completed_pr")
  
  # Check dependency resolution
  local dependency_status=""
  while IFS= read -r issue; do
    if [ -n "$issue" ]; then
      local status=$(check_issue_dependency_status "$issue")
      dependency_status+="$issue:$status\n"
    fi
  done <<< "$linked_issues"
  
  # Identify newly unblocked work
  local unblocked_work=$(identify_unblocked_work "$dependency_status")
  
  DEPENDENCY_ANALYSIS=$(cat << EOF
## Dependency Analysis

### Completed Dependencies
$(echo -e "$dependency_status" | grep ":resolved" | cut -d: -f1)

### Newly Unblocked Work
$unblocked_work

### Remaining Dependencies
$(echo -e "$dependency_status" | grep -v ":resolved" | cut -d: -f1)
EOF
)
  
  echo "$DEPENDENCY_ANALYSIS"
}

# Find related pending issues
find_related_pending_issues() {
  local completed_pr="$1"
  
  echo "📋 Finding related pending issues..."
  
  # Get PR metadata
  local pr_labels=$(get_pr_labels "$completed_pr")
  local pr_milestone=$(get_pr_milestone "$completed_pr")
  local pr_project=$(get_pr_project "$completed_pr")
  local pr_components=$(identify_affected_components "$completed_pr")
  
  # Search for related open issues
  local related_issues=""
  
  # Find issues with shared labels
  if [ -n "$pr_labels" ]; then
    while IFS= read -r label; do
      local label_issues=$(gh issue list --label "$label" --state open --limit 10 --json number,title,labels,milestone)
      related_issues+="$label_issues\n"
    done <<< "$pr_labels"
  fi
  
  # Find issues in same milestone
  if [ -n "$pr_milestone" ]; then
    local milestone_issues=$(gh issue list --milestone "$pr_milestone" --state open --limit 10 --json number,title,labels,milestone)
    related_issues+="$milestone_issues\n"
  fi
  
  # Find issues affecting same components
  if [ -n "$pr_components" ]; then
    while IFS= read -r component; do
      local component_issues=$(search_issues_by_component "$component")
      related_issues+="$component_issues\n"
    done <<< "$pr_components"
  fi
  
  # Remove duplicates and format
  echo -e "$related_issues" | jq -s 'flatten | unique_by(.number)' 2>/dev/null || echo "[]"
}

# Extract follow-up tasks from PR
extract_followup_tasks() {
  local completed_pr="$1"
  
  echo "📝 Extracting follow-up tasks..."
  
  # Get PR description and comments
  local pr_content=$(gh pr view "$completed_pr" --json body,comments --jq '.body, .comments[].body' | tr '\n' ' ')
  
  # Extract TODO items and follow-up mentions
  local todos=$(echo "$pr_content" | grep -i -o "todo[: ].*" | head -10)
  local followups=$(echo "$pr_content" | grep -i -o "follow[- ]up[: ].*" | head -10)
  local futures=$(echo "$pr_content" | grep -i -o "future[: ].*" | head -10)
  local nexts=$(echo "$pr_content" | grep -i -o "next[: ].*" | head -10)
  
  # Combine and clean up tasks
  FOLLOWUP_TASKS=$(cat << EOF
### TODO Items
$(echo "$todos" | sed 's/^/- /')

### Follow-up Tasks
$(echo "$followups" | sed 's/^/- /')

### Future Enhancements
$(echo "$futures" | sed 's/^/- /')

### Next Steps
$(echo "$nexts" | sed 's/^/- /')
EOF
)
  
  echo "$FOLLOWUP_TASKS"
}

# Find issues unblocked by this completion
find_dependency_unblocked_issues() {
  local completed_pr="$1"
  
  echo "🔓 Finding dependency-unblocked issues..."
  
  # Get completed issue numbers
  local completed_issues=$(extract_linked_issues "$completed_pr")
  
  # Search for issues that reference completed work
  local unblocked_issues=""
  while IFS= read -r completed_issue; do
    if [ -n "$completed_issue" ]; then
      # Search for issues that reference this completed issue
      local referencing_issues=$(gh issue list --state open --search "is:issue is:open #$completed_issue" --json number,title,body)
      
      # Filter for actual dependency references
      local dependency_references=$(echo "$referencing_issues" | jq '.[] | select(.body | contains("depends on") or contains("blocked by") or contains("requires"))')
      
      unblocked_issues+="$dependency_references\n"
    fi
  done <<< "$completed_issues"
  
  # Remove duplicates and format
  echo -e "$unblocked_issues" | jq -s 'flatten | unique_by(.number)' 2>/dev/null || echo "[]"
}
```

### Stakeholder Communication
```bash
# Coordinate comprehensive stakeholder notifications
coordinate_stakeholder_notifications() {
  local merged_pr="$1"
  local merge_result="$2"
  local impact_assessment="$3"
  
  echo "📢 Coordinating stakeholder notifications..."
  
  # Identify notification recipients
  local notification_targets=$(identify_notification_targets "$merged_pr")
  
  # Generate notification content
  local notification_content=$(generate_notification_content "$merged_pr" "$merge_result" "$impact_assessment")
  
  # Send notifications via different channels
  send_team_notifications "$notification_targets" "$notification_content"
  send_management_notifications "$merged_pr" "$impact_assessment"
  update_project_management_systems "$merged_pr" "$merge_result"
  
  echo "✅ Stakeholder notifications completed"
}

# Identify notification targets
identify_notification_targets() {
  local merged_pr="$1"
  
  echo "🎯 Identifying notification targets..."
  
  # Get PR participants
  local pr_author=$(get_pr_author "$merged_pr")
  local pr_reviewers=$(get_pr_reviewers "$merged_pr")
  local pr_assignees=$(get_pr_assignees "$merged_pr")
  
  # Get affected teams based on changed files
  local affected_teams=$(identify_affected_teams_by_files "$merged_pr")
  
  # Get stakeholders based on labels and milestones
  local label_stakeholders=$(identify_stakeholders_by_labels "$merged_pr")
  local milestone_stakeholders=$(identify_stakeholders_by_milestone "$merged_pr")
  
  # Combine and deduplicate
  NOTIFICATION_TARGETS=$(cat << EOF
## Direct Participants
- Author: $pr_author
- Reviewers: $pr_reviewers
- Assignees: $pr_assignees

## Affected Teams
$affected_teams

## Stakeholders
$label_stakeholders
$milestone_stakeholders
EOF
)
  
  echo "$NOTIFICATION_TARGETS"
}

# Generate comprehensive notification content
generate_notification_content() {
  local merged_pr="$1"
  local merge_result="$2"
  local impact_assessment="$3"
  
  # Get PR details
  local pr_title=$(get_pr_title "$merged_pr")
  local pr_author=$(get_pr_author "$merged_pr")
  local merge_timestamp=$(date -Iseconds)
  
  NOTIFICATION_CONTENT=$(cat << EOF
# Pull Request Merged Successfully 🎉

## PR Information
- **PR #$merged_pr**: $pr_title
- **Author**: $pr_author
- **Merged**: $merge_timestamp
- **Status**: ✅ $merge_result

## Impact Summary
$impact_assessment

## What's Next
$(generate_whats_next_summary "$merged_pr")

## Related Links
- **PR**: $(get_pr_url "$merged_pr")
- **Deployment**: $(get_deployment_url "$merged_pr")
- **Documentation**: $(get_documentation_url "$merged_pr")

---
*This notification was generated automatically by the PR Merge system.*
EOF
)
  
  echo "$NOTIFICATION_CONTENT"
}

# Send team notifications
send_team_notifications() {
  local notification_targets="$1"
  local notification_content="$2"
  
  echo "📧 Sending team notifications..."
  
  # Send Slack notifications if configured
  if command_exists slack; then
    send_slack_notification "$notification_content"
  fi
  
  # Send Teams notifications if configured
  if command_exists teams; then
    send_teams_notification "$notification_content"
  fi
  
  # Send email notifications
  send_email_notifications "$notification_targets" "$notification_content"
  
  echo "✅ Team notifications sent"
}

# Update project management systems
update_project_management_systems() {
  local merged_pr="$1"
  local merge_result="$2"
  
  echo "📊 Updating project management systems..."
  
  # Update GitHub Projects if configured
  update_github_projects "$merged_pr" "$merge_result"
  
  # Update Jira if configured
  if command_exists jira; then
    update_jira_issues "$merged_pr" "$merge_result"
  fi
  
  # Update Linear if configured
  if command_exists linear; then
    update_linear_issues "$merged_pr" "$merge_result"
  fi
  
  # Update Azure Boards if configured
  if command_exists az; then
    update_azure_boards "$merged_pr" "$merge_result"
  fi
  
  echo "✅ Project management systems updated"
}
```

### Next Issue Recommendation Engine
```bash
# Generate comprehensive next issue recommendations
generate_next_issue_recommendations() {
  local completed_pr="$1"
  local related_issues="$2"
  local followup_tasks="$3"
  local unblocked_issues="$4"
  
  echo "🎯 Generating next issue recommendations..."
  
  # Analyze priority and complexity
  local priority_analysis=$(analyze_issue_priorities "$related_issues" "$unblocked_issues")
  local complexity_analysis=$(analyze_issue_complexity "$related_issues" "$unblocked_issues")
  
  # Generate development sequence
  local recommended_sequence=$(generate_development_sequence "$priority_analysis" "$complexity_analysis")
  
  # Create comprehensive report
  NEXT_ISSUE_REPORT=$(cat << EOF
# Next Development Issues Recommendation

## Recently Completed Work
- **Merged PR**: #$completed_pr
- **Completion Date**: $(date)
- **Impact Level**: $(assess_pr_impact "$completed_pr")

## Recommended Next Steps

### Immediate Priorities (Start Today)
$(format_immediate_priorities "$priority_analysis")

### Short-term Tasks (This Week)
$(format_short_term_tasks "$related_issues" "$followup_tasks")

### Medium-term Goals (This Sprint)
$(format_medium_term_goals "$unblocked_issues")

### Follow-up Items
$followup_tasks

## Development Sequence Recommendation
$recommended_sequence

## Resource Allocation Suggestions
$(generate_resource_allocation_suggestions "$priority_analysis" "$complexity_analysis")

## Project Health Indicators
- **Sprint Progress**: $(calculate_sprint_progress)%
- **Milestone Status**: $(get_milestone_status)
- **Velocity Trend**: $(calculate_velocity_trend)
- **Issue Backlog**: $(count_backlog_issues) items

## Team Coordination
### Suggested Assignments
$(suggest_team_assignments "$related_issues" "$unblocked_issues")

### Dependencies to Watch
$(identify_dependency_risks "$related_issues" "$unblocked_issues")

### Communication Needs
$(identify_communication_needs "$related_issues" "$unblocked_issues")

---
*Generated by Post-Merge Manager on $(date)*
EOF
)
  
  # Save report
  echo "$NEXT_ISSUE_REPORT" > "reports/next_issues_$(date +%Y%m%d_%H%M%S).md"
  
  # Present to team
  present_next_issue_recommendations "$NEXT_ISSUE_REPORT"
  
  echo "✅ Next issue recommendations generated and presented"
}

# Analyze issue priorities
analyze_issue_priorities() {
  local related_issues="$1"
  local unblocked_issues="$2"
  
  echo "📈 Analyzing issue priorities..."
  
  # Combine all issues
  local all_issues=$(echo -e "$related_issues\n$unblocked_issues" | jq -s 'flatten | unique_by(.number)')
  
  # Score issues based on multiple factors
  local priority_scores=""
  while IFS= read -r issue; do
    if [ "$issue" != "null" ] && [ -n "$issue" ]; then
      local issue_number=$(echo "$issue" | jq -r '.number')
      local issue_labels=$(echo "$issue" | jq -r '.labels[]?.name' 2>/dev/null)
      
      # Calculate priority score
      local score=0
      
      # Label-based scoring
      if echo "$issue_labels" | grep -q "critical\|urgent\|high"; then
        score=$((score + 10))
      elif echo "$issue_labels" | grep -q "medium"; then
        score=$((score + 5))
      fi
      
      # Bug fixes get higher priority
      if echo "$issue_labels" | grep -q "bug\|fix"; then
        score=$((score + 8))
      fi
      
      # Security issues get highest priority
      if echo "$issue_labels" | grep -q "security"; then
        score=$((score + 15))
      fi
      
      # Feature requests get moderate priority
      if echo "$issue_labels" | grep -q "feature\|enhancement"; then
        score=$((score + 3))
      fi
      
      priority_scores+="$issue_number:$score\n"
    fi
  done <<< "$(echo "$all_issues" | jq -c '.[]')"
  
  # Sort by priority score
  echo -e "$priority_scores" | sort -t: -k2 -nr
}

# Present recommendations to team
present_next_issue_recommendations() {
  local report="$1"
  
  echo "📋 Presenting next issue recommendations to team..."
  
  # Create summary for immediate attention
  local summary=$(extract_recommendation_summary "$report")
  
  # Send to team channels
  send_recommendation_notification "$summary"
  
  # Update team dashboard
  update_team_dashboard "$report"
  
  # Schedule follow-up
  schedule_recommendation_followup
  
  echo "✅ Recommendations presented to team"
}

# Extract recommendation summary
extract_recommendation_summary() {
  local report="$1"
  
  # Extract key sections
  local immediate_priorities=$(echo "$report" | sed -n '/### Immediate Priorities/,/### Short-term Tasks/p' | head -n -1)
  local next_sequence=$(echo "$report" | sed -n '/## Development Sequence Recommendation/,/## Resource Allocation/p' | head -n -1)
  
  SUMMARY=$(cat << EOF
## 🎯 Next Development Focus

$immediate_priorities

$next_sequence

**Action Required**: Team leads please review and assign priorities.
EOF
)
  
  echo "$SUMMARY"
}
```

## Metrics and Performance Tracking

### Merge Performance Metrics
```bash
# Record comprehensive merge metrics
record_merge_metrics() {
  local merged_pr="$1"
  local merge_duration="$2"
  local approval_duration="$3"
  
  echo "📊 Recording merge performance metrics..."
  
  # Calculate metrics
  local total_duration=$((merge_duration + approval_duration))
  local pr_size=$(calculate_pr_size "$merged_pr")
  local complexity_score=$(calculate_complexity_score "$merged_pr")
  
  # Record to metrics database
  METRICS_RECORD=$(cat << EOF
{
  "timestamp": "$(date -Iseconds)",
  "pr_number": $merged_pr,
  "merge_duration_seconds": $merge_duration,
  "approval_duration_seconds": $approval_duration,
  "total_duration_seconds": $total_duration,
  "pr_size": {
    "files_changed": $(get_pr_files_changed "$merged_pr"),
    "lines_added": $(get_pr_lines_added "$merged_pr"),
    "lines_deleted": $(get_pr_lines_deleted "$merged_pr")
  },
  "complexity_score": $complexity_score,
  "success": true,
  "rollback_required": false
}
EOF
)
  
  # Save metrics
  echo "$METRICS_RECORD" >> "metrics/merge_performance.jsonl"
  
  # Update performance dashboard
  update_performance_dashboard "$METRICS_RECORD"
  
  echo "✅ Merge metrics recorded"
}

# Generate performance trends
generate_performance_trends() {
  echo "📈 Generating performance trends..."
  
  # Analyze recent merge performance
  local recent_metrics=$(tail -n 100 "metrics/merge_performance.jsonl")
  
  # Calculate trends
  local avg_merge_time=$(echo "$recent_metrics" | jq '.merge_duration_seconds' | awk '{sum+=$1; count++} END {print sum/count}')
  local avg_approval_time=$(echo "$recent_metrics" | jq '.approval_duration_seconds' | awk '{sum+=$1; count++} END {print sum/count}')
  local success_rate=$(echo "$recent_metrics" | jq '.success' | grep true | wc -l)
  
  PERFORMANCE_TRENDS=$(cat << EOF
## Merge Performance Trends (Last 100 Merges)

### Time Metrics
- **Average Merge Time**: ${avg_merge_time} seconds
- **Average Approval Time**: ${avg_approval_time} seconds
- **Success Rate**: ${success_rate}%

### Quality Indicators
- **Rollback Rate**: $(calculate_rollback_rate)%
- **Post-Merge Issues**: $(count_post_merge_issues)
- **Team Satisfaction**: $(get_team_satisfaction_score)/10

### Improvement Opportunities
$(identify_improvement_opportunities)
EOF
)
  
  echo "$PERFORMANCE_TRENDS"
}
```

## Integration Points

### Input Sources
- **Merge Executor**: Merge completion status and results
- **Version Control**: Repository state and branch information
- **Project Management**: Issue tracking and milestone data
- **Team Configuration**: Notification preferences and team structure

### Output Consumers
- **Team Members**: Next issue recommendations and notifications
- **Project Management**: Status updates and progress tracking
- **Monitoring Systems**: Performance metrics and health indicators
- **Documentation Systems**: Change logs and impact reports

## Tools and Technologies

### Repository Management
- **Git CLI**: Branch cleanup and repository maintenance
- **GitHub/GitLab APIs**: Issue management and project updates
- **Repository Tools**: Automated cleanup and organization
- **Archive Systems**: Historical data and artifact storage

### Communication and Coordination
- **Slack/Teams APIs**: Team notifications and recommendations
- **Email Systems**: Stakeholder communications
- **Project Management APIs**: Status synchronization
- **Dashboard Systems**: Progress visualization and reporting

### Analytics and Metrics
- **Performance Tracking**: Merge and approval time analysis
- **Quality Metrics**: Success rates and issue detection
- **Team Analytics**: Productivity and satisfaction measurement
- **Trend Analysis**: Process improvement identification

## Success Criteria

### Repository Health
- All merged branches properly cleaned up
- Repository organization maintained
- Documentation and metadata updated
- Archive systems properly populated

### Workflow Continuation
- Next issues identified and prioritized
- Development context preserved and shared
- Team recommendations actionable and clear
- Dependencies and blockers properly tracked

### Communication Effectiveness
- All stakeholders appropriately notified
- Project management systems synchronized
- Impact and progress clearly communicated
- Follow-up actions clearly defined

## Monitoring and Alerting

### Performance Monitoring
```yaml
Merge Cleanup Metrics:
  - Branch cleanup success rate
  - Repository health indicators
  - Archive completeness
  - Metadata accuracy

Recommendation Quality:
  - Next issue relevance score
  - Team adoption rate
  - Priority accuracy
  - Dependency identification success

Communication Effectiveness:
  - Notification delivery rate
  - Stakeholder engagement
  - Follow-up completion rate
  - Feedback quality scores
```

### Health Checks
```yaml
Daily Health Checks:
  - Repository cleanup status
  - Metrics collection integrity
  - Notification system health
  - Recommendation engine performance

Weekly Performance Reviews:
  - Trend analysis and reporting
  - Process improvement identification
  - Team feedback integration
  - Success criteria assessment
```