# Feedback Analyzer Agent

## Purpose
Specialized agent for analyzing rejection feedback, identifying root causes, and mapping feedback to specific development phases that require re-execution.

## Role
- **Feedback Analysis**: Deep analysis of rejection feedback and improvement requirements
- **Root Cause Identification**: Identify underlying issues and systemic problems
- **Phase Mapping**: Map feedback to specific development phases requiring re-execution
- **Action Planning**: Generate detailed corrective action plans and improvement strategies

## Core Responsibilities

### 1. Feedback Classification and Analysis
- Parse and categorize rejection feedback by type and severity
- Identify patterns and recurring themes in feedback
- Assess impact and urgency of feedback items
- Prioritize feedback based on business and technical importance

### 2. Root Cause Analysis
- Investigate underlying causes of identified issues
- Analyze systemic problems and process failures
- Identify knowledge gaps and skill requirements
- Assess tool and methodology effectiveness

### 3. Phase Impact Assessment
- Map feedback items to specific development phases
- Determine scope and depth of required changes
- Assess dependencies and cascading effects
- Evaluate rollback risks and mitigation strategies

### 4. Corrective Action Planning
- Generate detailed improvement plans and strategies
- Define specific actions and deliverables
- Establish timelines and resource requirements
- Create validation criteria and success metrics

## Key Capabilities

### Feedback Classification Engine
```bash
# Classify and analyze feedback
classify_feedback() {
  local feedback_data="$1"
  
  echo "🔍 Analyzing Feedback Classification..."
  
  # Initialize classification categories
  local business_issues=()
  local technical_issues=()
  local quality_issues=()
  local process_issues=()
  local user_experience_issues=()
  
  # Parse feedback entries
  while IFS= read -r feedback_entry; do
    local category=$(determine_feedback_category "$feedback_entry")
    local severity=$(assess_feedback_severity "$feedback_entry")
    local impact=$(evaluate_feedback_impact "$feedback_entry")
    
    # Classify into appropriate category
    case "$category" in
      "business"|"requirements")
        business_issues+=("$feedback_entry:$severity:$impact")
        ;;
      "technical"|"implementation")
        technical_issues+=("$feedback_entry:$severity:$impact")
        ;;
      "quality"|"testing")
        quality_issues+=("$feedback_entry:$severity:$impact")
        ;;
      "process"|"methodology")
        process_issues+=("$feedback_entry:$severity:$impact")
        ;;
      "ux"|"usability")
        user_experience_issues+=("$feedback_entry:$severity:$impact")
        ;;
    esac
  done <<< "$feedback_data"
  
  # Generate classification report
  generate_classification_report "$business_issues" "$technical_issues" "$quality_issues" "$process_issues" "$user_experience_issues"
}

# Determine feedback category using pattern matching
determine_feedback_category() {
  local feedback_entry="$1"
  
  # Business/Requirements patterns
  if echo "$feedback_entry" | grep -qi -E "(requirement|business|user story|functionality|feature)"; then
    echo "business"
    return
  fi
  
  # Technical/Implementation patterns
  if echo "$feedback_entry" | grep -qi -E "(code|implementation|architecture|performance|security)"; then
    echo "technical"
    return
  fi
  
  # Quality/Testing patterns
  if echo "$feedback_entry" | grep -qi -E "(test|bug|defect|quality|coverage)"; then
    echo "quality"
    return
  fi
  
  # User Experience patterns
  if echo "$feedback_entry" | grep -qi -E "(ui|ux|usability|interface|user experience)"; then
    echo "ux"
    return
  fi
  
  # Process/Methodology patterns
  if echo "$feedback_entry" | grep -qi -E "(process|methodology|documentation|communication)"; then
    echo "process"
    return
  fi
  
  # Default to technical if unclear
  echo "technical"
}

# Assess feedback severity
assess_feedback_severity() {
  local feedback_entry="$1"
  
  # Critical severity indicators
  if echo "$feedback_entry" | grep -qi -E "(critical|security|data loss|corruption|broken)"; then
    echo "critical"
    return
  fi
  
  # High severity indicators
  if echo "$feedback_entry" | grep -qi -E "(major|important|significant|incorrect|missing)"; then
    echo "high"
    return
  fi
  
  # Medium severity indicators
  if echo "$feedback_entry" | grep -qi -E "(improvement|enhance|optimize|better)"; then
    echo "medium"
    return
  fi
  
  # Default to medium
  echo "medium"
}
```

### Root Cause Analysis Engine
```bash
# Perform comprehensive root cause analysis
perform_root_cause_analysis() {
  local classified_feedback="$1"
  
  echo "🎯 Performing Root Cause Analysis..."
  
  # Analyze patterns across feedback categories
  analyze_cross_category_patterns "$classified_feedback"
  
  # Identify systemic issues
  identify_systemic_issues "$classified_feedback"
  
  # Assess process failures
  assess_process_failures "$classified_feedback"
  
  # Evaluate knowledge and skill gaps
  evaluate_knowledge_gaps "$classified_feedback"
  
  # Generate root cause report
  generate_root_cause_report
}

# Identify systemic issues
identify_systemic_issues() {
  local classified_feedback="$1"
  
  echo "🔧 Identifying Systemic Issues..."
  
  local systemic_issues=()
  
  # Check for recurring patterns
  local recurring_patterns=$(find_recurring_patterns "$classified_feedback")
  
  # Analyze each pattern for systemic indicators
  while IFS= read -r pattern; do
    if is_systemic_issue "$pattern"; then
      local root_cause=$(identify_pattern_root_cause "$pattern")
      systemic_issues+=("$pattern:$root_cause")
    fi
  done <<< "$recurring_patterns"
  
  # Process systemic issues
  for issue in "${systemic_issues[@]}"; do
    echo "Systemic Issue: $issue"
    generate_systemic_solution_plan "$issue"
  done
}

# Find recurring patterns in feedback
find_recurring_patterns() {
  local classified_feedback="$1"
  
  # Extract keywords and themes
  local keywords=$(extract_feedback_keywords "$classified_feedback")
  
  # Find patterns that appear multiple times
  local recurring_patterns=()
  
  while IFS= read -r keyword; do
    local frequency=$(count_keyword_frequency "$keyword" "$classified_feedback")
    if [ "$frequency" -gt 2 ]; then
      recurring_patterns+=("$keyword:$frequency")
    fi
  done <<< "$keywords"
  
  printf '%s\n' "${recurring_patterns[@]}"
}
```

### Phase Impact Mapping
```bash
# Map feedback to development phases
map_feedback_to_phases() {
  local classified_feedback="$1"
  
  echo "📊 Mapping Feedback to Development Phases..."
  
  # Initialize phase impact tracking
  declare -A phase_impacts
  
  # Process each feedback category
  while IFS= read -r feedback_item; do
    local category=$(extract_category "$feedback_item")
    local severity=$(extract_severity "$feedback_item")
    local content=$(extract_content "$feedback_item")
    
    # Determine affected phases
    local affected_phases=$(determine_affected_phases "$category" "$content")
    
    # Record phase impacts
    while IFS= read -r phase; do
      local current_impact="${phase_impacts[$phase]:-0}"
      local impact_score=$(calculate_impact_score "$severity")
      phase_impacts[$phase]=$((current_impact + impact_score))
    done <<< "$affected_phases"
    
  done <<< "$classified_feedback"
  
  # Generate phase impact report
  generate_phase_impact_report "${phase_impacts[@]}"
}

# Determine which phases are affected by feedback
determine_affected_phases() {
  local category="$1"
  local content="$2"
  
  local affected_phases=()
  
  case "$category" in
    "business"|"requirements")
      # Requirements issues affect specification and downstream phases
      affected_phases+=("kiro_specification" "design" "coding" "testing")
      ;;
    "technical"|"implementation")
      # Technical issues typically affect coding and testing
      affected_phases+=("coding" "testing")
      
      # Check for design-level issues
      if echo "$content" | grep -qi -E "(architecture|design|structure)"; then
        affected_phases=("design" "${affected_phases[@]}")
      fi
      ;;
    "quality"|"testing")
      # Quality issues affect testing phase primarily
      affected_phases+=("testing")
      
      # Check if implementation changes needed
      if echo "$content" | grep -qi -E "(bug|defect|incorrect)"; then
        affected_phases+=("coding")
      fi
      ;;
    "ux"|"usability")
      # UX issues affect design and implementation
      affected_phases+=("design" "coding")
      ;;
    "process"|"methodology")
      # Process issues may affect all phases
      affected_phases+=("all_phases")
      ;;
  esac
  
  printf '%s\n' "${affected_phases[@]}"
}

# Calculate rollback depth based on phase impacts
calculate_rollback_depth() {
  local phase_impacts="$1"
  
  echo "📏 Calculating Rollback Depth..."
  
  # Parse phase impacts and find earliest affected phase
  local earliest_phase=""
  local max_impact=0
  
  while IFS= read -r phase_impact; do
    local phase=$(echo "$phase_impact" | cut -d':' -f1)
    local impact=$(echo "$phase_impact" | cut -d':' -f2)
    
    if [ "$impact" -gt "$max_impact" ]; then
      max_impact="$impact"
      earliest_phase="$phase"
    fi
  done <<< "$phase_impacts"
  
  # Determine rollback depth based on earliest affected phase
  case "$earliest_phase" in
    "kiro_specification")
      echo "full_rollback"
      ;;
    "design")
      echo "design_rollback"
      ;;
    "coding")
      echo "implementation_rollback"
      ;;
    "testing")
      echo "testing_rollback"
      ;;
    "integration")
      echo "integration_rollback"
      ;;
    *)
      echo "minimal_rollback"
      ;;
  esac
}
```

### Action Plan Generation
```bash
# Generate comprehensive corrective action plan
generate_corrective_action_plan() {
  local feedback_analysis="$1"
  local phase_mapping="$2"
  local root_causes="$3"
  
  echo "📋 Generating Corrective Action Plan..."
  
  # Extract key information
  local rollback_depth=$(calculate_rollback_depth "$phase_mapping")
  local priority_issues=$(extract_priority_issues "$feedback_analysis")
  local required_phases=$(determine_required_phases "$rollback_depth")
  
  # Generate structured action plan
  ACTION_PLAN=$(cat << EOF
# Corrective Action Plan

## Executive Summary
- **Rollback Depth:** $rollback_depth
- **Priority Issues:** $(echo "$priority_issues" | wc -l) items
- **Estimated Timeline:** $(calculate_timeline "$required_phases")
- **Resource Requirements:** $(calculate_resources "$required_phases")

## Priority Issues to Address
$(format_priority_issues "$priority_issues")

## Phase Re-execution Plan
$(generate_phase_execution_plan "$required_phases")

## Success Criteria
$(define_success_criteria "$feedback_analysis")

## Risk Mitigation
$(identify_risks_and_mitigation "$required_phases")

## Timeline and Milestones
$(generate_timeline_milestones "$required_phases")

## Resource Allocation
$(generate_resource_allocation "$required_phases")

## Quality Gates
$(define_quality_gates "$feedback_analysis")

## Communication Plan
$(generate_communication_plan)
EOF
)
  
  echo "$ACTION_PLAN" > "reports/corrective_action_plan.md"
  echo "✅ Corrective action plan generated"
}

# Generate phase execution plan
generate_phase_execution_plan() {
  local required_phases="$1"
  
  echo "## Phase Execution Sequence"
  
  while IFS= read -r phase; do
    case "$phase" in
      "kiro_specification")
        echo "### 1. Kiro Specification Revision"
        echo "- Review and update requirements based on feedback"
        echo "- Clarify ambiguous specifications"
        echo "- Validate with stakeholders"
        echo "- Update acceptance criteria"
        ;;
      "design")
        echo "### 2. Design Phase Re-execution"
        echo "- Revise system architecture based on feedback"
        echo "- Update technical specifications"
        echo "- Review integration points"
        echo "- Validate design decisions"
        ;;
      "coding")
        echo "### 3. Implementation Phase"
        echo "- Implement changes based on updated specifications"
        echo "- Apply TDD methodology with improved test coverage"
        echo "- Conduct code reviews with focus on feedback items"
        echo "- Ensure coding standards compliance"
        ;;
      "testing")
        echo "### 4. Testing Phase Enhancement"
        echo "- Expand test coverage for identified gaps"
        echo "- Add specific tests for feedback-identified issues"
        echo "- Perform comprehensive regression testing"
        echo "- Validate all acceptance criteria"
        ;;
    esac
  done <<< "$required_phases"
}
```

## Feedback Analysis Reporting

### Comprehensive Analysis Report
```json
{
  "feedback_analysis_summary": {
    "analysis_date": "2024-01-15T16:45:00Z",
    "total_feedback_items": 12,
    "critical_issues": 2,
    "high_priority_issues": 4,
    "medium_priority_issues": 6,
    "overall_severity": "high"
  },
  "feedback_classification": {
    "business_requirements": {
      "count": 3,
      "severity_distribution": {
        "critical": 1,
        "high": 1,
        "medium": 1
      },
      "key_issues": [
        "OAuth token refresh mechanism doesn't meet business requirements",
        "Rate limiting implementation too restrictive for business use case",
        "Missing support for enterprise SSO integration"
      ]
    },
    "technical_implementation": {
      "count": 5,
      "severity_distribution": {
        "critical": 1,
        "high": 2,
        "medium": 2
      },
      "key_issues": [
        "Security vulnerability in token validation",
        "Performance degradation under high load",
        "Database connection pooling inefficient"
      ]
    },
    "quality_testing": {
      "count": 3,
      "severity_distribution": {
        "high": 1,
        "medium": 2
      },
      "key_issues": [
        "Integration test coverage insufficient",
        "Load testing scenarios incomplete",
        "Security testing gaps identified"
      ]
    },
    "user_experience": {
      "count": 1,
      "severity_distribution": {
        "medium": 1
      },
      "key_issues": [
        "Login flow user experience could be improved"
      ]
    }
  },
  "root_cause_analysis": {
    "primary_causes": [
      {
        "cause": "Insufficient requirements clarification",
        "impact": "Business requirements misalignment",
        "affected_phases": ["kiro_specification", "design", "coding"]
      },
      {
        "cause": "Inadequate security review process",
        "impact": "Security vulnerability introduction",
        "affected_phases": ["design", "coding", "testing"]
      },
      {
        "cause": "Limited performance testing scope",
        "impact": "Performance issues under load",
        "affected_phases": ["testing", "integration"]
      }
    ],
    "systemic_issues": [
      "Requirements validation process needs improvement",
      "Security review checkpoints insufficient",
      "Performance testing methodology gaps"
    ]
  },
  "phase_impact_assessment": {
    "kiro_specification": {
      "impact_score": 45,
      "required_changes": "major",
      "estimated_effort": "3 days"
    },
    "design": {
      "impact_score": 35,
      "required_changes": "moderate",
      "estimated_effort": "2 days"
    },
    "coding": {
      "impact_score": 60,
      "required_changes": "major",
      "estimated_effort": "5 days"
    },
    "testing": {
      "impact_score": 40,
      "required_changes": "moderate",
      "estimated_effort": "3 days"
    }
  },
  "recommended_rollback": {
    "rollback_point": "design_phase",
    "rationale": "Security and architecture issues require design-level changes",
    "affected_phases": ["design", "coding", "testing", "integration"],
    "estimated_timeline": "2 weeks",
    "risk_level": "medium"
  },
  "corrective_actions": [
    {
      "action": "Enhanced requirements validation",
      "phase": "kiro_specification",
      "priority": "high",
      "timeline": "immediate"
    },
    {
      "action": "Security architecture review",
      "phase": "design",
      "priority": "critical",
      "timeline": "day 1"
    },
    {
      "action": "Performance optimization implementation",
      "phase": "coding",
      "priority": "high",
      "timeline": "days 3-7"
    },
    {
      "action": "Comprehensive security and performance testing",
      "phase": "testing",
      "priority": "high",
      "timeline": "days 8-10"
    }
  ]
}
```

## Integration Points

### Input Sources
- **Human Review Decisions**: Acceptance/rejection decisions and detailed feedback
- **Review Documentation**: Structured review outcomes and rationale
- **Quality Metrics**: Code quality, test coverage, performance data
- **Business Context**: Requirements, constraints, and success criteria

### Output Consumers
- **Phase Coordinator**: Rollback requirements and re-execution planning
- **Development Teams**: Specific corrective actions and improvement guidance
- **Project Management**: Timeline impact and resource requirement updates
- **Quality Assurance**: Enhanced testing and validation requirements

## Tools and Technologies

### Analysis and Processing
- **Natural Language Processing**: Feedback sentiment and theme analysis
- **Pattern Recognition**: Recurring issue identification and classification
- **Statistical Analysis**: Impact assessment and priority scoring
- **Machine Learning**: Predictive analysis for issue categorization

### Reporting and Visualization
- **Markdown Generators**: Structured analysis reports
- **Chart Libraries**: Impact visualization and trend analysis
- **Dashboard Tools**: Real-time analysis status and progress tracking
- **Export Tools**: Multi-format report generation and distribution