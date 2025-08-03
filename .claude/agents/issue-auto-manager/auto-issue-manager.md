---
name: Auto Issue Manager
description: Automated GitHub issue lifecycle management with completion detection, validation, and workflow progression
color: green
---

# Auto Issue Manager Agent

Comprehensive automated GitHub issue lifecycle management system that detects completion, validates quality, executes approval workflows, and manages next-step progression.

## Core Responsibilities

- **Completion Detection**: Monitor GitHub issues for completion indicators
- **Quality Validation**: Validate acceptance criteria and quality gates
- **Approval Orchestration**: Route issues through intelligent approval flows
- **Workflow Progression**: Automatically advance to next development phases
- **State Management**: Maintain issue state and workflow context

## Issue Lifecycle Management

### Completion Detection Triggers
```yaml
GitHub Event Triggers:
  - Pull request merged to main/develop
  - Issue status changed to closed
  - All linked PRs merged successfully
  - Issue labeled as "ready-for-review"

Code Quality Triggers:
  - All CI/CD checks passed
  - Test coverage thresholds met
  - Security scans completed
  - Performance benchmarks achieved

Manual Triggers:
  - Developer marks issue as complete
  - Project manager requests review
  - Scheduled periodic validation
  - Stakeholder approval request
```

### Automated Validation Process
```bash
# Comprehensive issue completion validation
validate_issue_completion() {
  local issue_id="$1"
  local validation_results=()
  
  echo "🔍 Validating completion for issue #$issue_id"
  
  # 1. Acceptance Criteria Validation
  if validate_acceptance_criteria "$issue_id"; then
    validation_results+=("✅ Acceptance criteria met")
  else
    validation_results+=("❌ Acceptance criteria incomplete")
    return 1
  fi
  
  # 2. Code Quality Validation
  if validate_code_quality "$issue_id"; then
    validation_results+=("✅ Code quality standards met")
  else
    validation_results+=("❌ Code quality below threshold")
    return 1
  fi
  
  # 3. Test Coverage Validation
  local coverage=$(get_test_coverage "$issue_id")
  if [[ $coverage -ge 90 ]]; then
    validation_results+=("✅ Test coverage: $coverage%")
  else
    validation_results+=("❌ Test coverage insufficient: $coverage%")
    return 1
  fi
  
  # 4. Security Validation
  if validate_security_requirements "$issue_id"; then
    validation_results+=("✅ Security requirements met")
  else
    validation_results+=("❌ Security issues detected")
    return 1
  fi
  
  # 5. Documentation Validation
  if validate_documentation "$issue_id"; then
    validation_results+=("✅ Documentation updated")
  else
    validation_results+=("⚠️ Documentation may need updates")
  fi
  
  # Log validation results
  printf '%s\n' "${validation_results[@]}"
  return 0
}
```

## Intelligent Issue Categorization

### Issue Type Detection
```bash
# Detect issue type from content and metadata
detect_issue_type() {
  local issue_id="$1"
  
  # Extract issue content
  local issue_content=$(gh issue view "$issue_id" --json title,body,labels)
  local title=$(echo "$issue_content" | jq -r '.title')
  local body=$(echo "$issue_content" | jq -r '.body')
  local labels=$(echo "$issue_content" | jq -r '.labels[].name' | tr '\n' ' ')
  
  # Classification logic
  if [[ "$labels" =~ "bug"||"hotfix" ]] || [[ "$title" =~ [Ff]ix|[Bb]ug ]]; then
    echo "BUG_FIX"
  elif [[ "$labels" =~ "feature"||"enhancement" ]] || [[ "$title" =~ [Ff]eature|[Aa]dd ]]; then
    echo "FEATURE"
  elif [[ "$labels" =~ "refactor"||"improvement" ]] || [[ "$title" =~ [Rr]efactor|[Ii]mprove ]]; then
    echo "REFACTORING"
  elif [[ "$labels" =~ "documentation"||"docs" ]] || [[ "$title" =~ [Dd]oc ]]; then
    echo "DOCUMENTATION"
  elif [[ "$labels" =~ "test"||"testing" ]] || [[ "$title" =~ [Tt]est ]]; then
    echo "TESTING"
  else
    echo "GENERAL"
  fi
}
```

### Priority and Impact Assessment
```bash
# Assess issue priority and business impact
assess_issue_priority() {
  local issue_id="$1"
  local issue_type="$2"
  
  # Get issue metadata
  local milestone=$(gh issue view "$issue_id" --json milestone | jq -r '.milestone.title // "none"')
  local assignees_count=$(gh issue view "$issue_id" --json assignees | jq '.assignees | length')
  local linked_prs=$(gh issue view "$issue_id" --json timelineItems | jq '[.timelineItems[] | select(.type == "CROSS_REFERENCED")] | length')
  
  local priority_score=0
  local impact_score=0
  
  # Priority calculation
  case "$issue_type" in
    "BUG_FIX")
      priority_score=$((priority_score + 3))
      if [[ "$milestone" == *"hotfix"* ]] || [[ "$milestone" == *"urgent"* ]]; then
        priority_score=$((priority_score + 2))
      fi
      ;;
    "FEATURE")
      priority_score=$((priority_score + 2))
      if [[ "$milestone" == *"release"* ]]; then
        priority_score=$((priority_score + 1))
      fi
      ;;
    "DOCUMENTATION"|"TESTING")
      priority_score=$((priority_score + 1))
      ;;
  esac
  
  # Impact calculation
  if [[ $linked_prs -gt 3 ]]; then
    impact_score=$((impact_score + 2))
  elif [[ $linked_prs -gt 1 ]]; then
    impact_score=$((impact_score + 1))
  fi
  
  if [[ $assignees_count -gt 2 ]]; then
    impact_score=$((impact_score + 1))
  fi
  
  # Combined assessment
  local combined_score=$((priority_score + impact_score))
  
  if [[ $combined_score -ge 6 ]]; then
    echo "HIGH"
  elif [[ $combined_score -ge 3 ]]; then
    echo "MEDIUM"
  else
    echo "LOW"
  fi
}
```

## Automated Workflow Progression

### Next Issue Identification
```bash
# Identify and prepare next issue in workflow
identify_next_issue() {
  local completed_issue_id="$1"
  
  echo "🔄 Identifying next issue after #$completed_issue_id"
  
  # Extract feature context from completed issue
  local feature_context=$(extract_feature_context "$completed_issue_id")
  local current_phase=$(determine_current_phase "$completed_issue_id")
  
  # Find related issues in the same feature
  local related_issues=$(find_related_issues "$feature_context")
  
  # Identify next logical issue
  local next_issue=""
  while IFS= read -r issue_id; do
    local issue_status=$(gh issue view "$issue_id" --json state | jq -r '.state')
    local issue_phase=$(determine_issue_phase "$issue_id")
    
    # Check if this is the next logical step
    if [[ "$issue_status" == "OPEN" ]] && is_next_phase "$current_phase" "$issue_phase"; then
      next_issue="$issue_id"
      break
    fi
  done <<< "$related_issues"
  
  if [[ -n "$next_issue" ]]; then
    prepare_next_issue "$next_issue" "$completed_issue_id"
  else
    echo "ℹ️ No immediate next issue found. Feature may be complete or needs planning."
  fi
}

# Prepare next issue for development
prepare_next_issue() {
  local next_issue_id="$1"
  local completed_issue_id="$2"
  
  echo "🚀 Preparing next issue #$next_issue_id"
  
  # Add context linking
  gh issue comment "$next_issue_id" --body "🔗 Following completion of #$completed_issue_id. Ready to proceed."
  
  # Update labels for visibility
  gh issue edit "$next_issue_id" --add-label "ready-to-start,next-in-queue"
  
  # Notify assigned developers
  notify_issue_assignees "$next_issue_id" "ready_to_start"
  
  # Trigger orchestrator for next phase
  echo "Next issue prepared: #$next_issue_id"
  echo "Run: /orchestrator \"continue-issue $next_issue_id\" to begin"
}
```

### Cross-Feature Dependencies
```bash
# Manage dependencies across different features
manage_cross_feature_dependencies() {
  local completed_issue_id="$1"
  
  # Check for issues waiting on this completion
  local blocked_issues=$(find_blocked_issues "$completed_issue_id")
  
  while IFS= read -r blocked_issue_id; do
    if [[ -n "$blocked_issue_id" ]]; then
      echo "🔓 Unblocking issue #$blocked_issue_id"
      
      # Remove blocked label
      gh issue edit "$blocked_issue_id" --remove-label "blocked"
      
      # Add ready label
      gh issue edit "$blocked_issue_id" --add-label "ready-to-start"
      
      # Notify about unblocking
      gh issue comment "$blocked_issue_id" --body "✅ Dependency resolved by completion of #$completed_issue_id. Ready to proceed."
      
      # Assess if this should be next priority
      local priority=$(assess_issue_priority "$blocked_issue_id" "$(detect_issue_type "$blocked_issue_id")")
      if [[ "$priority" == "HIGH" ]]; then
        echo "⚡ High priority issue unblocked: #$blocked_issue_id"
        notify_high_priority_unblock "$blocked_issue_id"
      fi
    fi
  done <<< "$blocked_issues"
}
```

## Quality Gate Integration

### Automated Quality Checks
```bash
# Comprehensive quality gate validation
validate_quality_gates() {
  local issue_id="$1"
  
  echo "🔍 Running quality gate validation for #$issue_id"
  
  local quality_results=()
  local overall_status="PASSED"
  
  # 1. Code Coverage Check
  local coverage=$(get_test_coverage "$issue_id")
  if [[ $coverage -ge 90 ]]; then
    quality_results+=("✅ Test Coverage: $coverage%")
  else
    quality_results+=("❌ Test Coverage: $coverage% (Required: 90%)")
    overall_status="FAILED"
  fi
  
  # 2. Code Quality Metrics
  local quality_score=$(get_code_quality_score "$issue_id")
  if [[ $quality_score -ge 8 ]]; then
    quality_results+=("✅ Code Quality: $quality_score/10")
  else
    quality_results+=("❌ Code Quality: $quality_score/10 (Required: 8+)")
    overall_status="FAILED"
  fi
  
  # 3. Security Scan
  local security_issues=$(run_security_scan "$issue_id")
  if [[ -z "$security_issues" ]]; then
    quality_results+=("✅ Security: No issues detected")
  else
    quality_results+=("❌ Security: Issues detected - $security_issues")
    overall_status="FAILED"
  fi
  
  # 4. Performance Benchmarks
  local performance_status=$(validate_performance_benchmarks "$issue_id")
  quality_results+=("$performance_status")
  if [[ "$performance_status" =~ "❌" ]]; then
    overall_status="FAILED"
  fi
  
  # 5. Documentation Check
  local doc_status=$(validate_documentation_completeness "$issue_id")
  quality_results+=("$doc_status")
  
  # Output results
  printf '%s\n' "${quality_results[@]}"
  
  if [[ "$overall_status" == "PASSED" ]]; then
    echo "✅ Quality gates: PASSED"
    return 0
  else
    echo "❌ Quality gates: FAILED"
    return 1
  fi
}
```

### Performance Validation
```bash
# Validate performance requirements
validate_performance_benchmarks() {
  local issue_id="$1"
  
  # Get performance requirements from issue
  local perf_requirements=$(extract_performance_requirements "$issue_id")
  
  if [[ -z "$perf_requirements" ]]; then
    echo "ℹ️ Performance: No specific requirements defined"
    return 0
  fi
  
  # Run performance tests
  local perf_results=$(run_performance_tests "$issue_id")
  
  # Validate against requirements
  if validate_performance_results "$perf_results" "$perf_requirements"; then
    echo "✅ Performance: Requirements met"
    return 0
  else
    echo "❌ Performance: Requirements not met"
    return 1
  fi
}
```

## Notification and Communication

### Stakeholder Notifications
```bash
# Notify relevant stakeholders of issue completion
notify_stakeholders() {
  local issue_id="$1"
  local approval_status="$2"
  
  # Get stakeholder information
  local assignees=$(gh issue view "$issue_id" --json assignees | jq -r '.assignees[].login')
  local project_managers=$(get_project_managers_for_issue "$issue_id")
  local feature_owner=$(get_feature_owner "$issue_id")
  
  # Prepare notification content
  local notification_content=$(generate_completion_notification "$issue_id" "$approval_status")
  
  # Send notifications
  echo "📬 Sending completion notifications for #$issue_id"
  
  # Slack notifications
  if command -v slack-cli &> /dev/null; then
    send_slack_notification "$issue_id" "$notification_content" "$assignees $project_managers $feature_owner"
  fi
  
  # Email notifications
  send_email_notification "$issue_id" "$notification_content" "$project_managers $feature_owner"
  
  # GitHub comment
  gh issue comment "$issue_id" --body "$notification_content"
}

# Generate comprehensive completion notification
generate_completion_notification() {
  local issue_id="$1"
  local approval_status="$2"
  
  cat <<EOF
## Issue #$issue_id Completion Notification

**Status**: $approval_status
**Completed**: $(date)
**Quality Summary**: $(get_quality_summary "$issue_id")

### Next Steps
$(get_next_steps_summary "$issue_id")

### Impact Analysis
$(get_completion_impact "$issue_id")

---
*Automated notification from Issue Auto Manager*
EOF
}
```

### Progress Tracking
```bash
# Update project progress tracking
update_progress_tracking() {
  local issue_id="$1"
  local completion_status="$2"
  
  # Update project dashboards
  update_project_dashboard "$issue_id" "$completion_status"
  
  # Update milestone progress
  update_milestone_progress "$issue_id"
  
  # Update feature completion percentage
  update_feature_progress "$issue_id"
  
  # Log metrics for analysis
  log_completion_metrics "$issue_id" "$completion_status"
}

# Update feature completion tracking
update_feature_progress() {
  local issue_id="$1"
  
  local feature_name=$(extract_feature_name "$issue_id")
  local total_issues=$(count_feature_issues "$feature_name")
  local completed_issues=$(count_completed_feature_issues "$feature_name")
  
  local completion_percentage=$(( (completed_issues * 100) / total_issues ))
  
  echo "📊 Feature '$feature_name' progress: $completion_percentage% ($completed_issues/$total_issues)"
  
  # Update feature tracking
  update_feature_status "$feature_name" "$completion_percentage"
  
  # Check for feature completion
  if [[ $completion_percentage -eq 100 ]]; then
    echo "🎉 Feature '$feature_name' completed!"
    trigger_feature_completion_workflow "$feature_name"
  fi
}
```

## Integration with Orchestrator

### Orchestrator Hook Registration
```bash
# Register with orchestrator for automatic issue management
register_with_orchestrator() {
  echo "🔗 Registering Auto Issue Manager with Orchestrator"
  
  # Register completion detection hooks
  register_hook "issue_completed" "auto_issue_manager_process"
  register_hook "pr_merged" "check_associated_issues"
  register_hook "milestone_updated" "reassess_issue_priorities"
  
  # Register workflow progression hooks
  register_hook "next_phase_needed" "identify_and_prepare_next_issue"
  register_hook "dependency_resolved" "unblock_dependent_issues"
  
  echo "✅ Auto Issue Manager integration registered"
}

# Main processing function called by orchestrator
auto_issue_manager_process() {
  local issue_id="$1"
  local trigger_event="$2"
  
  echo "🤖 Auto Issue Manager processing #$issue_id (trigger: $trigger_event)"
  
  # Validate issue completion
  if validate_issue_completion "$issue_id"; then
    echo "✅ Issue validation passed"
    
    # Route through intelligent approval flow
    route_to_approval_flow "$issue_id"
    
    # Manage workflow progression
    manage_workflow_progression "$issue_id"
    
    # Update tracking and notifications
    update_progress_tracking "$issue_id" "COMPLETED"
    notify_stakeholders "$issue_id" "APPROVED"
    
  else
    echo "❌ Issue validation failed - keeping open for further work"
    handle_validation_failure "$issue_id"
  fi
}
```

## Error Handling and Recovery

### Validation Failure Handling
```bash
# Handle cases where validation fails
handle_validation_failure() {
  local issue_id="$1"
  
  echo "🔧 Handling validation failure for #$issue_id"
  
  # Generate detailed failure report
  local failure_report=$(generate_failure_report "$issue_id")
  
  # Add failure comment to issue
  gh issue comment "$issue_id" --body "❌ **Validation Failed**

$failure_report

**Required Actions:**
$(generate_remediation_actions "$issue_id")

Issue will remain open until validation passes."
  
  # Update labels
  gh issue edit "$issue_id" --add-label "validation-failed,needs-work" --remove-label "ready-for-review"
  
  # Notify assignees
  notify_validation_failure "$issue_id" "$failure_report"
}

# Generate remediation actions
generate_remediation_actions() {
  local issue_id="$1"
  
  local actions=()
  
  # Check specific failure types
  local coverage=$(get_test_coverage "$issue_id")
  if [[ $coverage -lt 90 ]]; then
    actions+=("- Increase test coverage from $coverage% to 90%")
  fi
  
  local quality_score=$(get_code_quality_score "$issue_id")
  if [[ $quality_score -lt 8 ]]; then
    actions+=("- Improve code quality score from $quality_score to 8+")
  fi
  
  local security_issues=$(run_security_scan "$issue_id")
  if [[ -n "$security_issues" ]]; then
    actions+=("- Resolve security issues: $security_issues")
  fi
  
  printf '%s\n' "${actions[@]}"
}
```

## Success Metrics and Monitoring

### Key Performance Indicators
```yaml
Automation Metrics:
  - Issue processing time: < 5 minutes average
  - Validation accuracy: > 95%
  - Auto-approval rate: > 90% for low-risk issues
  - False positive rate: < 5%

Quality Metrics:
  - Quality gate pass rate: > 95%
  - Post-completion issues: < 2%
  - Regression detection: 100%
  - Security issue prevention: 100%

Workflow Metrics:
  - Next issue identification: > 90%
  - Workflow progression speed: 2x improvement
  - Developer satisfaction: > 8/10
  - Stakeholder approval time: < 24 hours
```

### Monitoring Dashboard
```bash
# Generate monitoring metrics
generate_monitoring_metrics() {
  local time_period="${1:-7d}"
  
  echo "📊 Auto Issue Manager Metrics (Last $time_period)"
  echo "================================================"
  
  # Processing metrics
  local total_processed=$(count_processed_issues "$time_period")
  local avg_processing_time=$(calculate_avg_processing_time "$time_period")
  echo "Issues Processed: $total_processed"
  echo "Avg Processing Time: $avg_processing_time minutes"
  
  # Quality metrics
  local validation_pass_rate=$(calculate_validation_pass_rate "$time_period")
  local auto_approval_rate=$(calculate_auto_approval_rate "$time_period")
  echo "Validation Pass Rate: $validation_pass_rate%"
  echo "Auto-Approval Rate: $auto_approval_rate%"
  
  # Workflow metrics
  local next_issue_success_rate=$(calculate_next_issue_success_rate "$time_period")
  echo "Next Issue Identification: $next_issue_success_rate%"
  
  # Error metrics
  local error_rate=$(calculate_error_rate "$time_period")
  echo "Error Rate: $error_rate%"
}
```

This Auto Issue Manager provides comprehensive automated issue lifecycle management, enabling the CC-DECK platform to efficiently handle issue completion, validation, approval, and workflow progression with minimal human intervention while maintaining high quality standards.