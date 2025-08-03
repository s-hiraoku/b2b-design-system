---
description: Human approval workflow for GitHub issues with progress tracking and next-step automation
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash, Glob, Grep, LS
---

# Check Issues Command

Human approval workflow system that analyzes GitHub issues, facilitates approval processes, and automatically progresses to next workflow steps upon approval.

## Purpose

Provide structured human oversight and approval for development workflows:

1. **Issue Analysis** - Analyze created GitHub issues and their completion status
2. **Progress Assessment** - Evaluate overall progress and quality gates
3. **Human Approval** - Facilitate structured approval processes
4. **Workflow Progression** - Automatically advance to next steps upon approval
5. **Quality Assurance** - Ensure quality standards before progression

## Usage

```bash
# Check issues for specific feature and prompt for approval
/check-issues user-auth-system

# Check all pending issues and approvals
/check-issues

# Check specific workflow phase completion
/check-issues user-auth-system --phase implementation

# Review and approve with detailed analysis
/check-issues user-auth-system --detailed
```

## Implementation Strategy

### 1. Sub-Agent Orchestration

Delegate specialized approval tasks to expert sub-agents:

- **Primary Agent**: `Check Issues` - Main orchestrator for approval workflow
- **Issue Analyzer**: `Issue Analyzer` - GitHub issue analysis and status checking
- **Approval Manager**: `Approval Manager` - Human approval process management
- **Progress Tracker**: `Progress Tracker` - Progress monitoring and quality assessment
- **Workflow Controller**: `Workflow Controller` - Next-step automation and control

### 2. Approval Workflow Phases

#### Phase 1: Issue Analysis
- Retrieve and analyze GitHub issues for the feature
- Check completion status and quality metrics
- Identify blockers, dependencies, and risks
- Generate comprehensive status report

#### Phase 2: Progress Assessment
- Evaluate overall feature development progress
- Check quality gates and acceptance criteria
- Assess test coverage and code quality
- Identify any gaps or concerns

#### Phase 3: Human Approval Process
- Present structured approval request with context
- Provide clear approval criteria and options
- Capture approval decision and reasoning
- Record approval metadata for tracking

#### Phase 4: Workflow Progression
- Execute next workflow steps upon approval
- Handle rejection with feedback and recommendations
- Manage approval deferrals and re-review scheduling
- Integrate with overall development workflow

## Approval Decision Points

### Issue Completion Approval
```bash
# Criteria for issue completion approval
- All assigned issues are closed
- Code review requirements met
- Test coverage thresholds achieved
- Documentation requirements satisfied
- Security and performance standards met
```

### Feature Phase Approval
```bash
# Criteria for feature phase progression
- Requirements phase: All requirements documented and validated
- Design phase: Architecture approved and documented
- Tasks phase: Implementation plan complete and feasible
- Implementation phase: All features developed and tested
```

### Quality Gate Approval
```bash
# Criteria for quality gate passage
- Code quality metrics within acceptable range
- Test coverage above minimum threshold
- Security vulnerabilities addressed
- Performance benchmarks met
- Documentation completeness verified
```

## Interactive Approval Process

### Approval Request Format

```markdown
## Approval Request: {Feature Name} - {Phase}

### Summary
- **Feature**: {feature-name}
- **Phase**: {current-phase}
- **Issues**: {completed}/{total} completed
- **Quality Score**: {quality-percentage}%
- **Ready for**: {next-phase}

### Completion Status
✅ Requirements documented and approved
✅ Technical design completed
✅ Implementation tasks generated
🔄 5/8 GitHub issues completed
⏳ 3 issues in progress
❌ 0 blocked issues

### Quality Metrics
- **Test Coverage**: 94% (Target: 90%+)
- **Code Quality**: 8.7/10 (Target: 8.0+)
- **Documentation**: 96% complete
- **Security**: All checks passed
- **Performance**: Within targets

### Outstanding Items
1. Issue #123: User login validation (In Progress)
2. Issue #124: Password reset flow (In Progress)  
3. Issue #125: Session management (In Progress)

### Risks and Concerns
- None identified

### Approval Options
1. **Approve** - Proceed to next phase
2. **Approve with Conditions** - Proceed with specific requirements
3. **Defer** - Request specific improvements before approval
4. **Reject** - Significant issues require resolution

**Decision**: [Pending Human Input]
```

### Approval Response Handling

```bash
# Handle different approval responses
handle_approval_response() {
  case $APPROVAL_DECISION in
    "approve")
      echo "✅ Approved: Proceeding to next workflow phase"
      execute_next_workflow_step
      ;;
    "approve_with_conditions")
      echo "✅ Conditionally Approved: Implementing conditions"
      implement_approval_conditions "$CONDITIONS"
      execute_next_workflow_step
      ;;
    "defer")
      echo "⏳ Deferred: Addressing feedback"
      record_deferral_feedback "$FEEDBACK"
      schedule_re_review "$SCHEDULE"
      ;;
    "reject")
      echo "❌ Rejected: Resolving issues"
      record_rejection_reasons "$REASONS"
      provide_resolution_guidance "$GUIDANCE"
      ;;
  esac
}
```

## Workflow Integration

### Integration with Create-Issues
```bash
# After issue creation, check for completion
/create-issues user-auth-system
# ... issues created ...
/check-issues user-auth-system  # Check and approve issues
```

### Integration with Orchestrator
```bash
# Orchestrator calls check-issues at approval points
/orchestrator "Implement user authentication with approval gates"
# ... specification phase ...
# Automatic approval check before proceeding
# ... implementation phase ...
# Automatic approval check before deployment
```

### Integration with Kiro Workflow
```bash
# Check and approve at each Kiro phase
/kiro:spec-requirements user-auth
/check-issues user-auth --phase requirements

/kiro:spec-design user-auth  
/check-issues user-auth --phase design

/kiro:spec-tasks user-auth
/check-issues user-auth --phase tasks
```

## Advanced Features

### Automated Quality Validation

```bash
# Automated checks before human approval
validate_quality_gates() {
  local feature="$1"
  
  # Test coverage validation
  COVERAGE=$(get_test_coverage "$feature")
  if [ "$COVERAGE" -lt 90 ]; then
    echo "⚠️ Test coverage below threshold: $COVERAGE%"
  fi
  
  # Code quality validation
  QUALITY_SCORE=$(get_code_quality_score "$feature")
  if [ "$QUALITY_SCORE" -lt 80 ]; then
    echo "⚠️ Code quality below threshold: $QUALITY_SCORE/100"
  fi
  
  # Security validation
  SECURITY_ISSUES=$(run_security_scan "$feature")
  if [ -n "$SECURITY_ISSUES" ]; then
    echo "⚠️ Security issues detected: $SECURITY_ISSUES"
  fi
}
```

### Conditional Approval Logic

```bash
# Smart approval recommendations
generate_approval_recommendation() {
  local metrics="$1"
  local issues_status="$2"
  
  if all_critical_issues_resolved && quality_gates_met; then
    RECOMMENDATION="APPROVE"
    CONFIDENCE="HIGH"
  elif minor_issues_only && quality_mostly_met; then
    RECOMMENDATION="APPROVE_WITH_CONDITIONS"
    CONFIDENCE="MEDIUM"
  else
    RECOMMENDATION="DEFER"
    CONFIDENCE="HIGH"
  fi
  
  echo "Recommendation: $RECOMMENDATION (Confidence: $CONFIDENCE)"
}
```

### Approval History Tracking

```bash
# Track approval decisions and outcomes
record_approval_decision() {
  local feature="$1"
  local decision="$2"
  local reasoning="$3"
  
  APPROVAL_RECORD=$(cat << EOF
{
  "feature": "$feature",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "decision": "$decision", 
  "reasoning": "$reasoning",
  "approver": "$USER",
  "quality_metrics": $(get_quality_metrics "$feature"),
  "issues_status": $(get_issues_status "$feature")
}
EOF
)
  
  echo "$APPROVAL_RECORD" >> ".kiro/approvals/${feature}.json"
}
```

## Error Handling and Recovery

### Pre-Approval Validation

```bash
# Validate prerequisites before approval process
validate_approval_prerequisites() {
  local feature="$1"
  
  # Check if feature exists
  if [ ! -d ".kiro/specs/$feature" ]; then
    echo "Error: Feature specification not found"
    return 1
  fi
  
  # Check if issues exist
  if ! gh issue list --label "$feature" &>/dev/null; then
    echo "Error: No GitHub issues found for feature"
    return 1
  fi
  
  # Check GitHub authentication
  if ! gh auth status &>/dev/null; then
    echo "Error: GitHub CLI not authenticated"
    return 1
  fi
}
```

### Approval Process Recovery

```bash
# Handle interrupted approval processes
recover_approval_process() {
  local feature="$1"
  
  # Check for existing approval records
  if [ -f ".kiro/approvals/${feature}.json" ]; then
    echo "Found existing approval record"
    LAST_DECISION=$(jq -r '.decision' ".kiro/approvals/${feature}.json")
    
    case $LAST_DECISION in
      "pending")
        echo "Resuming interrupted approval process"
        resume_approval_process "$feature"
        ;;
      "deferred")
        echo "Previous approval was deferred"
        check_deferral_conditions "$feature"
        ;;
    esac
  fi
}
```

## Integration Points

### Input Sources
- **GitHub Issues**: Issue status and completion data
- **Quality Metrics**: Code quality, test coverage, security scans
- **Workflow State**: Current phase and progress information
- **Approval History**: Previous approval decisions and outcomes

### Output Effects
- **Workflow Progression**: Automatic advancement to next phases
- **Quality Gates**: Enforcement of quality standards
- **Decision Records**: Documented approval decisions and reasoning
- **Process Automation**: Streamlined development workflow

### Output Consumers
- **Development Team**: Approval status and feedback
- **Project Management**: Progress tracking and milestone completion
- **Quality Assurance**: Quality validation and compliance
- **CI/CD Systems**: Automated deployment triggers

This command provides structured human oversight while maintaining development velocity through intelligent automation and clear approval processes.