# Phase Coordinator Agent

## Purpose
Specialized agent for coordinating development phase rollback and re-execution based on feedback analysis, managing dependencies, and ensuring systematic improvement implementation.

## Role
- **Phase Management**: Coordinate rollback and re-execution of development phases
- **Dependency Coordination**: Manage inter-phase dependencies and sequencing
- **Progress Tracking**: Monitor re-execution progress and quality validation
- **Quality Assurance**: Ensure feedback requirements are addressed in re-execution

## Core Responsibilities

### 1. Rollback Planning and Execution
- Determine optimal rollback points based on feedback analysis
- Plan safe rollback strategies with minimal disruption
- Execute controlled rollback to specified development phases
- Preserve essential artifacts and maintain version control integrity

### 2. Re-execution Coordination
- Sequence phase re-execution based on dependencies and priorities
- Coordinate resource allocation and timeline management
- Monitor phase execution progress and quality gates
- Ensure feedback requirements are systematically addressed

### 3. Dependency Management
- Map inter-phase dependencies and requirements
- Coordinate parallel and sequential phase execution
- Manage artifact handoffs between phases
- Ensure consistency across re-executed phases

### 4. Quality Validation and Progress Tracking
- Validate that feedback requirements are addressed
- Monitor quality improvements throughout re-execution
- Track progress against corrective action plans
- Ensure readiness for subsequent acceptance review

## Key Capabilities

### Rollback Strategy Planning
```bash
# Plan comprehensive rollback strategy
plan_rollback_strategy() {
  local feedback_analysis="$1"
  local current_phase="$2"
  local rollback_depth="$3"
  
  echo "🔄 Planning Rollback Strategy..."
  
  # Determine rollback target phase
  local target_phase=$(determine_rollback_target "$rollback_depth")
  
  # Identify affected artifacts and components
  local affected_artifacts=$(identify_affected_artifacts "$target_phase" "$current_phase")
  
  # Plan artifact preservation strategy
  plan_artifact_preservation "$affected_artifacts"
  
  # Generate rollback execution plan
  generate_rollback_execution_plan "$target_phase" "$current_phase"
  
  # Validate rollback safety
  validate_rollback_safety "$target_phase" "$affected_artifacts"
  
  echo "✅ Rollback strategy planned"
}

# Determine optimal rollback target phase
determine_rollback_target() {
  local rollback_depth="$1"
  
  case "$rollback_depth" in
    "full_rollback")
      echo "kiro_specification"
      ;;
    "design_rollback")
      echo "design"
      ;;
    "implementation_rollback")
      echo "coding"
      ;;
    "testing_rollback")
      echo "testing"
      ;;
    "integration_rollback")
      echo "integration"
      ;;
    *)
      echo "testing"  # Default to testing phase
      ;;
  esac
}

# Execute controlled rollback
execute_controlled_rollback() {
  local target_phase="$1"
  local preservation_plan="$2"
  
  echo "⏪ Executing Controlled Rollback to: $target_phase"
  
  # Create rollback checkpoint
  create_rollback_checkpoint
  
  # Preserve critical artifacts
  execute_artifact_preservation "$preservation_plan"
  
  # Rollback version control state
  rollback_version_control_state "$target_phase"
  
  # Clean up phase-specific artifacts
  cleanup_phase_artifacts "$target_phase"
  
  # Validate rollback completion
  validate_rollback_completion "$target_phase"
  
  echo "✅ Rollback completed successfully"
}

# Create rollback checkpoint
create_rollback_checkpoint() {
  echo "📍 Creating Rollback Checkpoint..."
  
  # Create git branch for rollback point
  local checkpoint_branch="rollback-checkpoint-$(date +%Y%m%d-%H%M%S)"
  git checkout -b "$checkpoint_branch"
  
  # Tag current state
  local checkpoint_tag="rollback-point-$(date +%Y%m%d-%H%M%S)"
  git tag "$checkpoint_tag"
  
  # Document checkpoint
  CHECKPOINT_INFO=$(cat << EOF
# Rollback Checkpoint Information

**Created:** $(date)
**Branch:** $checkpoint_branch
**Tag:** $checkpoint_tag
**Reason:** Acceptance feedback requires rollback
**Status:** Active

## Preserved State
- All development artifacts
- Version control history
- Configuration and documentation
- Test results and reports
EOF
)
  
  echo "$CHECKPOINT_INFO" > ".rollback/checkpoint_info.md"
  
  echo "✅ Checkpoint created: $checkpoint_tag"
}
```

### Phase Re-execution Orchestration
```bash
# Orchestrate phase re-execution
orchestrate_phase_reexecution() {
  local target_phase="$1"
  local feedback_requirements="$2"
  local corrective_plan="$3"
  
  echo "🚀 Orchestrating Phase Re-execution from: $target_phase"
  
  # Plan phase execution sequence
  local execution_sequence=$(plan_execution_sequence "$target_phase")
  
  # Prepare phase execution environment
  prepare_execution_environment "$target_phase" "$feedback_requirements"
  
  # Execute phases in sequence
  execute_phase_sequence "$execution_sequence" "$corrective_plan"
  
  # Validate re-execution completion
  validate_reexecution_completion "$execution_sequence"
  
  echo "✅ Phase re-execution completed"
}

# Plan phase execution sequence
plan_execution_sequence() {
  local starting_phase="$1"
  
  echo "📋 Planning Execution Sequence from: $starting_phase"
  
  local phases=()
  
  case "$starting_phase" in
    "kiro_specification")
      phases=("kiro_specification" "design" "coding" "testing" "integration" "pr_create")
      ;;
    "design")
      phases=("design" "coding" "testing" "integration" "pr_create")
      ;;
    "coding")
      phases=("coding" "refactoring" "testing" "integration" "pr_create")
      ;;
    "testing")
      phases=("testing" "integration" "pr_create")
      ;;
    "integration")
      phases=("integration" "pr_create")
      ;;
  esac
  
  printf '%s\n' "${phases[@]}"
}

# Execute individual phase with feedback integration
execute_phase_with_feedback() {
  local phase="$1"
  local feedback_requirements="$2"
  local phase_config="$3"
  
  echo "⚙️  Executing Phase: $phase"
  
  # Apply feedback requirements to phase configuration
  local enhanced_config=$(apply_feedback_to_config "$phase_config" "$feedback_requirements")
  
  # Execute phase with enhanced configuration
  case "$phase" in
    "kiro_specification")
      execute_kiro_specification_phase "$enhanced_config"
      ;;
    "design")
      execute_design_phase "$enhanced_config"
      ;;
    "coding")
      execute_coding_phase_with_tdd "$enhanced_config"
      ;;
    "refactoring")
      execute_refactoring_phase "$enhanced_config"
      ;;
    "testing")
      execute_comprehensive_testing "$enhanced_config"
      ;;
    "integration")
      execute_integration_testing "$enhanced_config"
      ;;
    "pr_create")
      execute_pr_creation "$enhanced_config"
      ;;
  esac
  
  # Validate phase completion against feedback
  validate_phase_against_feedback "$phase" "$feedback_requirements"
  
  echo "✅ Phase $phase completed with feedback integration"
}

# Apply feedback requirements to phase configuration
apply_feedback_to_config() {
  local base_config="$1"
  local feedback_requirements="$2"
  
  echo "🔧 Applying Feedback to Phase Configuration..."
  
  # Parse feedback requirements for this phase
  local phase_feedback=$(extract_phase_feedback "$feedback_requirements")
  
  # Enhanced configuration with feedback integration
  ENHANCED_CONFIG=$(cat << EOF
$base_config

## Feedback Integration Requirements
$(echo "$phase_feedback" | while IFS= read -r requirement; do
  echo "- $requirement"
done)

## Additional Quality Gates
- Feedback requirement validation
- Enhanced testing for identified issues
- Stakeholder review checkpoints
- Progress tracking and reporting

## Success Criteria Enhancement
- All feedback items addressed
- Quality improvements demonstrated
- No regression in existing functionality
- Ready for subsequent acceptance review
EOF
)
  
  echo "$ENHANCED_CONFIG"
}
```

### Dependency Management and Coordination
```bash
# Manage inter-phase dependencies
manage_phase_dependencies() {
  local execution_sequence="$1"
  local feedback_context="$2"
  
  echo "🔗 Managing Phase Dependencies..."
  
  # Map dependencies for each phase
  while IFS= read -r phase; do
    local dependencies=$(get_phase_dependencies "$phase")
    local outputs=$(get_phase_outputs "$phase")
    
    # Validate dependencies are satisfied
    validate_phase_dependencies "$phase" "$dependencies"
    
    # Prepare phase outputs for downstream phases
    prepare_phase_outputs "$phase" "$outputs"
    
    # Update dependency tracking
    update_dependency_tracking "$phase" "$dependencies" "$outputs"
    
  done <<< "$execution_sequence"
  
  # Generate dependency report
  generate_dependency_report "$execution_sequence"
}

# Get phase dependencies
get_phase_dependencies() {
  local phase="$1"
  
  case "$phase" in
    "kiro_specification")
      echo "requirements_analysis user_feedback business_context"
      ;;
    "design")
      echo "kiro_specification system_requirements architecture_context"
      ;;
    "coding")
      echo "design technical_specifications test_strategy"
      ;;
    "refactoring")
      echo "coding test_results quality_metrics"
      ;;
    "testing")
      echo "coding refactoring test_environment"
      ;;
    "integration")
      echo "testing deployment_environment integration_config"
      ;;
    "pr_create")
      echo "integration code_quality test_results documentation"
      ;;
  esac
}

# Validate phase dependencies are satisfied
validate_phase_dependencies() {
  local phase="$1"
  local dependencies="$2"
  
  echo "✅ Validating Dependencies for: $phase"
  
  local missing_dependencies=()
  
  while IFS= read -r dependency; do
    if ! dependency_satisfied "$dependency"; then
      missing_dependencies+=("$dependency")
    fi
  done <<< "$dependencies"
  
  if [ ${#missing_dependencies[@]} -gt 0 ]; then
    echo "❌ Missing dependencies for $phase:"
    printf '%s\n' "${missing_dependencies[@]}"
    return 1
  fi
  
  echo "✅ All dependencies satisfied for $phase"
  return 0
}
```

### Progress Tracking and Quality Validation
```bash
# Track re-execution progress
track_reexecution_progress() {
  local execution_sequence="$1"
  local feedback_requirements="$2"
  
  echo "📊 Tracking Re-execution Progress..."
  
  # Initialize progress tracking
  initialize_progress_tracking "$execution_sequence"
  
  # Monitor phase execution
  while IFS= read -r phase; do
    monitor_phase_progress "$phase" "$feedback_requirements"
  done <<< "$execution_sequence"
  
  # Generate progress reports
  generate_progress_reports "$execution_sequence"
}

# Monitor individual phase progress
monitor_phase_progress() {
  local phase="$1"
  local feedback_requirements="$2"
  
  echo "📈 Monitoring Progress: $phase"
  
  # Track phase milestones
  local milestones=$(get_phase_milestones "$phase")
  local completed_milestones=0
  local total_milestones=$(echo "$milestones" | wc -l)
  
  while IFS= read -r milestone; do
    if milestone_completed "$milestone"; then
      completed_milestones=$((completed_milestones + 1))
    fi
  done <<< "$milestones"
  
  # Calculate progress percentage
  local progress_percentage=$((completed_milestones * 100 / total_milestones))
  
  # Validate feedback requirement addressing
  local feedback_addressed=$(validate_feedback_addressing "$phase" "$feedback_requirements")
  
  # Update progress tracking
  update_phase_progress "$phase" "$progress_percentage" "$feedback_addressed"
  
  echo "Progress for $phase: $progress_percentage% ($completed_milestones/$total_milestones milestones)"
}

# Validate feedback requirement addressing
validate_feedback_addressing() {
  local phase="$1"
  local feedback_requirements="$2"
  
  echo "🔍 Validating Feedback Addressing for: $phase"
  
  # Extract feedback items relevant to this phase
  local phase_feedback=$(extract_phase_specific_feedback "$phase" "$feedback_requirements")
  
  local addressed_count=0
  local total_count=0
  
  while IFS= read -r feedback_item; do
    total_count=$((total_count + 1))
    
    if feedback_item_addressed "$phase" "$feedback_item"; then
      addressed_count=$((addressed_count + 1))
    fi
  done <<< "$phase_feedback"
  
  if [ "$total_count" -eq 0 ]; then
    echo "No feedback items for this phase"
    return 0
  fi
  
  local addressed_percentage=$((addressed_count * 100 / total_count))
  echo "Feedback addressed: $addressed_percentage% ($addressed_count/$total_count items)"
  
  # Return success if 100% addressed
  [ "$addressed_count" -eq "$total_count" ]
}
```

## Re-execution Quality Gates

### Phase-Specific Quality Gates
```yaml
Kiro Specification Phase:
  Quality Gates:
    - All feedback requirements incorporated
    - Stakeholder validation completed
    - Acceptance criteria updated and clear
    - No ambiguous or conflicting requirements
  
  Success Criteria:
    - 100% of specification feedback addressed
    - Stakeholder sign-off obtained
    - Clear and testable acceptance criteria
    - Traceability to original requirements maintained

Design Phase:
  Quality Gates:
    - Architecture addresses feedback concerns
    - Security and performance requirements integrated
    - Integration points clearly defined
    - Design review completed with approval
  
  Success Criteria:
    - All architectural feedback resolved
    - Non-functional requirements satisfied
    - Design patterns consistent and appropriate
    - Technical debt minimized

Coding Phase:
  Quality Gates:
    - TDD methodology followed with enhanced testing
    - Code quality metrics exceed baseline
    - All functional feedback implemented
    - Security vulnerabilities addressed
  
  Success Criteria:
    - 98%+ test coverage achieved
    - Code quality score A or above
    - All functional requirements implemented
    - Zero critical security issues

Testing Phase:
  Quality Gates:
    - Enhanced test coverage for feedback areas
    - All identified bugs fixed and verified
    - Performance benchmarks met or exceeded
    - Regression testing completed successfully
  
  Success Criteria:
    - 100% of feedback-identified gaps covered
    - Zero high-priority defects remaining
    - Performance within acceptable thresholds
    - All acceptance criteria validated
```

### Comprehensive Progress Report
```json
{
  "reexecution_summary": {
    "start_date": "2024-01-16T09:00:00Z",
    "current_date": "2024-01-22T15:30:00Z",
    "rollback_point": "design_phase",
    "target_completion": "2024-01-25T17:00:00Z",
    "overall_progress": "75%",
    "status": "on_track"
  },
  "phase_progress": {
    "design": {
      "status": "completed",
      "progress": "100%",
      "completion_date": "2024-01-17T16:00:00Z",
      "quality_gates_passed": true,
      "feedback_addressed": "100%"
    },
    "coding": {
      "status": "completed",
      "progress": "100%",
      "completion_date": "2024-01-20T14:30:00Z",
      "quality_gates_passed": true,
      "feedback_addressed": "100%"
    },
    "refactoring": {
      "status": "completed",
      "progress": "100%",
      "completion_date": "2024-01-21T11:00:00Z",
      "quality_gates_passed": true,
      "feedback_addressed": "100%"
    },
    "testing": {
      "status": "in_progress",
      "progress": "60%",
      "estimated_completion": "2024-01-23T16:00:00Z",
      "quality_gates_passed": false,
      "feedback_addressed": "80%"
    },
    "integration": {
      "status": "pending",
      "progress": "0%",
      "estimated_start": "2024-01-24T09:00:00Z",
      "dependencies_satisfied": true
    }
  },
  "feedback_addressing": {
    "total_feedback_items": 12,
    "addressed_items": 10,
    "remaining_items": 2,
    "addressing_rate": "83%",
    "critical_items_remaining": 0
  },
  "quality_improvements": {
    "code_quality_score": {
      "before": "B+",
      "current": "A",
      "improvement": "significant"
    },
    "test_coverage": {
      "before": "85%",
      "current": "96%",
      "improvement": "+11%"
    },
    "security_score": {
      "before": "7/10",
      "current": "9/10",
      "improvement": "+2 points"
    },
    "performance_score": {
      "before": "75/100",
      "current": "92/100",
      "improvement": "+17 points"
    }
  },
  "risks_and_issues": [
    {
      "issue": "Integration testing environment setup delayed",
      "impact": "low",
      "mitigation": "Alternative environment being prepared",
      "status": "mitigating"
    }
  ],
  "next_milestones": [
    {
      "milestone": "Complete enhanced testing phase",
      "due_date": "2024-01-23T16:00:00Z",
      "status": "on_track"
    },
    {
      "milestone": "Begin integration testing",
      "due_date": "2024-01-24T09:00:00Z",
      "dependencies": ["testing_completion", "environment_ready"]
    },
    {
      "milestone": "Ready for acceptance review",
      "due_date": "2024-01-25T17:00:00Z",
      "status": "projected"
    }
  ]
}
```

## Integration Points

### Input Sources
- **Feedback Analyzer**: Rollback requirements and corrective action plans
- **Phase Systems**: Individual development phase capabilities and outputs
- **Quality Systems**: Quality metrics and validation tools
- **Project Management**: Timeline, resource, and constraint information

### Output Consumers
- **Acceptance Orchestrator**: Re-execution completion and readiness status
- **Development Teams**: Phase execution plans and progress updates
- **Project Management**: Timeline updates and resource utilization
- **Quality Assurance**: Quality improvement tracking and validation

## Tools and Technologies

### Phase Management
- **Git**: Version control and state management
- **CI/CD Systems**: Automated phase execution and validation
- **Project Management**: Timeline and resource coordination
- **Quality Tools**: Automated quality gate validation

### Monitoring and Reporting
- **Dashboard Tools**: Real-time progress tracking and visualization
- **Notification Systems**: Stakeholder communication and alerts
- **Analytics**: Progress analysis and predictive insights
- **Documentation**: Automated report generation and distribution