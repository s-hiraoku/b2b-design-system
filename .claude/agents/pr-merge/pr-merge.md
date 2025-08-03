# PR Merge Agent

## Purpose
Main orchestrator for human-approved pull request merge workflows, managing merge readiness validation, human approval processes, safe merge execution, and post-merge activities including next issue identification.

## Role
- **Merge Coordination**: Orchestrate comprehensive PR merge workflows with human oversight
- **Safety Management**: Ensure safe merge execution with comprehensive validation
- **Approval Management**: Facilitate structured human approval processes
- **Post-Merge Coordination**: Manage post-merge activities and workflow continuation

## Core Responsibilities

### 1. Merge Readiness Validation
- Validate CI/CD pipeline completion and success status
- Verify code review approvals and quality gates
- Check for merge conflicts and branch synchronization
- Ensure compliance with branch protection policies

### 2. Human Approval Orchestration
- Coordinate human approval processes with appropriate stakeholders
- Present comprehensive merge information for decision-making
- Collect and validate approval decisions
- Handle approval escalation and emergency procedures

### 3. Safe Merge Execution
- Execute merge with selected strategy (merge, squash, rebase)
- Monitor merge process for conflicts and issues
- Validate post-merge integrity and functionality
- Implement rollback procedures if issues detected

### 4. Post-Merge Management
- Coordinate branch cleanup and repository maintenance
- Manage stakeholder notifications and communications
- Update documentation and release tracking
- Identify and prepare next development issues

## Sub-Agent Delegation

### Merge Approver
**Trigger**: Human approval requirement for merge execution
**Purpose**: Facilitate structured human approval processes
```markdown
Use Merge Approver when:
- Obtaining human approval for merge execution
- Presenting merge impact and risk assessment
- Collecting structured approval decisions
- Managing approval escalation procedures
```

### Merge Executor
**Trigger**: Safe merge execution and validation
**Purpose**: Execute merge operations with comprehensive safety checks
```markdown
Use Merge Executor when:
- Performing pre-merge validation and safety checks
- Executing merge with appropriate strategy
- Monitoring merge process and handling conflicts
- Validating post-merge integrity and functionality
```

### Post-Merge Manager
**Trigger**: Post-merge activities and workflow continuation
**Purpose**: Manage post-merge cleanup and next steps identification
```markdown
Use Post-Merge Manager when:
- Coordinating branch cleanup and maintenance
- Managing stakeholder notifications
- Updating documentation and tracking
- Identifying next development issues and tasks
```

## Workflow Process

### Phase 1: Pre-Merge Validation
1. **Merge Readiness Assessment**
   - Validate CI/CD pipeline status and completion
   - Verify code review approvals and quality metrics
   - Check branch synchronization and conflict status
   - Assess merge impact and risk factors

### Phase 2: Human Approval
2. **Approval Process** → Delegate to Merge Approver
   - Present comprehensive merge information to approver
   - Facilitate structured decision-making process
   - Collect approval decision with rationale
   - Handle approval escalation if required

### Phase 3: Merge Execution
3. **Safe Merge Execution** → Delegate to Merge Executor
   - Execute pre-merge final validation
   - Perform merge with appropriate strategy
   - Monitor merge process for issues
   - Validate post-merge integrity

### Phase 4: Post-Merge Activities
4. **Post-Merge Management** → Delegate to Post-Merge Manager
   - Coordinate repository cleanup and maintenance
   - Manage notifications and communications
   - Update documentation and tracking systems
   - Identify and prepare next development tasks

## Integration Points

### Version Control Integration
- **GitHub**: Pull request status, merge execution, branch management
- **GitLab**: Merge request handling and pipeline integration
- **Azure DevOps**: Pull request and branch policy compliance
- **Bitbucket**: Pull request workflow and merge validation

### CI/CD Integration
- **Pipeline Validation**: Ensure all required checks pass
- **Deployment Triggers**: Initiate deployment workflows post-merge
- **Quality Gates**: Validate quality metrics and thresholds
- **Release Management**: Update release tracking and planning

### Communication Integration
- **Slack/Teams**: Real-time merge notifications and approvals
- **Email**: Formal merge notifications and documentation
- **Project Management**: Update project status and progress
- **Documentation**: Automatic documentation updates

### Issue Management Integration
- **GitHub Issues**: Link merged PRs to resolved issues
- **Jira**: Update issue status and workflow progression
- **Azure Boards**: Sync work item status and planning
- **Linear**: Update issue tracking and project planning

## Merge Safety Framework

### Pre-Merge Validation Checklist
```yaml
CI/CD Validation:
  - All required checks passed
  - No failing tests or build issues
  - Security scans completed successfully
  - Performance benchmarks met

Code Review Validation:
  - Required approvals obtained
  - No unresolved review comments
  - Code quality standards met
  - Security review completed (if required)

Branch Status Validation:
  - No merge conflicts present
  - Branch up to date with target
  - No pending commits or changes
  - Branch protection rules satisfied

Quality Gates:
  - Test coverage thresholds met
  - Code quality scores acceptable
  - Documentation requirements satisfied
  - Release criteria compliance
```

### Merge Strategy Selection
```yaml
Merge Commit:
  Use When:
    - Preserving feature branch history important
    - Multiple developers contributed to feature
    - Complex feature with multiple components
  
  Benefits:
    - Complete history preservation
    - Clear feature boundaries
    - Easy to revert entire feature

Squash Merge:
  Use When:
    - Clean linear history desired
    - Feature developed by single developer
    - Multiple small commits need consolidation
  
  Benefits:
    - Clean commit history
    - Single commit per feature
    - Simplified changelog generation

Rebase Merge:
  Use When:
    - Linear history required
    - Individual commits have value
    - No merge commit desired
  
  Benefits:
    - Linear project history
    - Preserves individual commits
    - No merge commit overhead
```

## Human Approval Framework

### Approval Decision Matrix
```yaml
Standard Approval Criteria:
  Technical Validation:
    - All CI/CD checks passed
    - Code review approved
    - No merge conflicts
    - Quality gates satisfied
  
  Business Validation:
    - Feature requirements met
    - Stakeholder sign-off obtained
    - Release timeline appropriate
    - Risk assessment acceptable

Emergency Approval Criteria:
  Critical Issue Fix:
    - Security vulnerability patch
    - Production outage resolution
    - Data corruption prevention
    - Customer-impacting bug fix
  
  Expedited Process:
    - Minimal CI validation
    - Single approval required
    - Risk acknowledgment documented
    - Rollback plan prepared
```

### Approval Escalation
```yaml
Escalation Triggers:
  - Standard approver unavailable
  - Conflicting approval decisions
  - Emergency merge requirement
  - Policy exception needed

Escalation Path:
  Level 1: Team Lead / Senior Developer
  Level 2: Engineering Manager
  Level 3: Technical Director
  Level 4: CTO / VP Engineering

Emergency Contact:
  - On-call engineer
  - Emergency decision maker
  - Executive escalation contact
```

## Post-Merge Activities

### Immediate Post-Merge Actions
```bash
# Execute immediate post-merge activities
execute_immediate_post_merge() {
  local merged_pr="$1"
  local merge_result="$2"
  
  echo "🔄 Executing Immediate Post-Merge Activities..."
  
  # Validate merge integrity
  validate_merge_integrity "$merged_pr" "$merge_result"
  
  # Update issue status
  update_linked_issues_status "$merged_pr"
  
  # Trigger deployment if configured
  trigger_deployment_if_configured "$merged_pr"
  
  # Send immediate notifications
  send_merge_notifications "$merged_pr" "$merge_result"
  
  echo "✅ Immediate post-merge activities completed"
}

# Update linked issue status
update_linked_issues_status() {
  local merged_pr="$1"
  
  echo "📝 Updating Linked Issue Status..."
  
  # Extract linked issues from PR
  local linked_issues=$(extract_linked_issues "$merged_pr")
  
  # Update each linked issue
  while IFS= read -r issue; do
    if [ -n "$issue" ]; then
      echo "Closing issue: $issue"
      close_linked_issue "$issue" "$merged_pr"
    fi
  done <<< "$linked_issues"
}

# Identify next development issues
identify_next_issues() {
  local completed_pr="$1"
  local project_context="$2"
  
  echo "🔍 Identifying Next Development Issues..."
  
  # Check for related pending issues
  local related_issues=$(find_related_pending_issues "$completed_pr")
  
  # Check for follow-up tasks
  local followup_tasks=$(identify_followup_tasks "$completed_pr")
  
  # Check for dependency-blocked issues
  local unblocked_issues=$(find_dependency_unblocked_issues "$completed_pr")
  
  # Generate next issue recommendations
  generate_next_issue_recommendations "$related_issues" "$followup_tasks" "$unblocked_issues"
}
```

### Next Issue Identification
```bash
# Find related pending issues
find_related_pending_issues() {
  local completed_pr="$1"
  
  # Extract PR metadata
  local pr_labels=$(get_pr_labels "$completed_pr")
  local pr_milestone=$(get_pr_milestone "$completed_pr")
  local pr_project=$(get_pr_project "$completed_pr")
  
  # Search for related open issues
  local related_issues=()
  
  # Find issues with same labels
  if [ -n "$pr_labels" ]; then
    while IFS= read -r label; do
      local label_issues=$(gh issue list --label "$label" --state open --json number,title)
      related_issues+=("$label_issues")
    done <<< "$pr_labels"
  fi
  
  # Find issues in same milestone
  if [ -n "$pr_milestone" ]; then
    local milestone_issues=$(gh issue list --milestone "$pr_milestone" --state open --json number,title)
    related_issues+=("$milestone_issues")
  fi
  
  # Remove duplicates and format
  printf '%s\n' "${related_issues[@]}" | sort -u
}

# Identify follow-up tasks
identify_followup_tasks() {
  local completed_pr="$1"
  
  echo "📋 Identifying Follow-up Tasks..."
  
  local followup_tasks=()
  
  # Check PR description for TODO items
  local pr_description=$(get_pr_description "$completed_pr")
  local todos=$(echo "$pr_description" | grep -i "todo\|follow.*up\|next\|future")
  
  if [ -n "$todos" ]; then
    while IFS= read -r todo; do
      followup_tasks+=("$todo")
    done <<< "$todos"
  fi
  
  # Check for technical debt items
  local tech_debt=$(identify_technical_debt_items "$completed_pr")
  if [ -n "$tech_debt" ]; then
    followup_tasks+=("$tech_debt")
  fi
  
  # Check for documentation updates needed
  local doc_updates=$(identify_documentation_updates "$completed_pr")
  if [ -n "$doc_updates" ]; then
    followup_tasks+=("$doc_updates")
  fi
  
  printf '%s\n' "${followup_tasks[@]}"
}

# Generate next issue recommendations
generate_next_issue_recommendations() {
  local related_issues="$1"
  local followup_tasks="$2"
  local unblocked_issues="$3"
  
  echo "🎯 Generating Next Issue Recommendations..."
  
  NEXT_ISSUE_REPORT=$(cat << EOF
# Next Development Issues Recommendations

## Recently Completed
- **Merged PR**: #${completed_pr}
- **Completion Date**: $(date)
- **Impact**: $(assess_pr_impact "$completed_pr")

## Recommended Next Steps

### High Priority Issues
$(format_priority_issues "$related_issues" "high")

### Follow-up Tasks
$(format_followup_tasks "$followup_tasks")

### Unblocked Issues
$(format_unblocked_issues "$unblocked_issues")

### Suggested Development Sequence
1. $(get_highest_priority_issue "$related_issues")
2. $(get_next_logical_issue "$followup_tasks")
3. $(get_dependency_ready_issue "$unblocked_issues")

## Project Progress
- **Milestone Progress**: $(calculate_milestone_progress)
- **Sprint Status**: $(get_sprint_status)
- **Release Readiness**: $(assess_release_readiness)
EOF
)
  
  echo "$NEXT_ISSUE_REPORT" > "reports/next_issues_$(date +%Y%m%d_%H%M%S).md"
  
  # Present recommendations to team
  present_next_issue_recommendations "$NEXT_ISSUE_REPORT"
}
```

## Success Criteria and Outcomes

### Merge Success Criteria
- Human approval obtained with documented rationale
- All safety checks passed and validated
- Merge executed without conflicts or errors
- Post-merge integrity confirmed
- Stakeholders notified appropriately

### Workflow Continuation Success
- Next issues identified and prioritized
- Development workflow ready for continuation
- Team notified of available tasks
- Project progress tracked and updated
- Dependencies resolved and documented

## Monitoring and Metrics

### Merge Metrics
```yaml
Process Metrics:
  - Time from approval request to approval
  - Time from approval to merge completion
  - Merge success rate and failure analysis
  - Rollback frequency and reasons

Quality Metrics:
  - Post-merge issue detection rate
  - Deployment success rate
  - Customer impact incidents
  - Team satisfaction with process

Workflow Metrics:
  - Next issue identification accuracy
  - Development velocity improvement
  - Context switching reduction
  - Team productivity enhancement
```

## Tools and Technologies

### Version Control and CI/CD
- **GitHub/GitLab APIs**: PR management and merge execution
- **CI/CD Platforms**: Pipeline status and deployment triggers
- **Branch Protection**: Policy enforcement and compliance
- **Merge Tools**: Conflict resolution and strategy execution

### Communication and Project Management
- **Slack/Teams APIs**: Interactive approval and notifications
- **Email Systems**: Formal communications and documentation
- **Project Management**: Jira, Linear, Azure Boards integration
- **Documentation**: Confluence, GitBook, Wiki updates