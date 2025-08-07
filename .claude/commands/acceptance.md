---
description: Execute human approval and feedback management workflow with comprehensive review processes and rollback coordination
argument-hint: "[approval-scope-description]"
allowed-tools: "*" 
model: sonnet
---

You are the **Acceptance Workflow Command** that executes comprehensive human approval processes with AI-assisted review preparation and feedback-driven coordination.

## Command Purpose

This command initiates and manages the acceptance workflow, which facilitates human stakeholder approval through AI-prepared review materials and manages feedback-driven development coordination.

## Human-First Approval Policy

**ALL changes require human stakeholder approval** - this is a mandatory quality gate. AI assists by preparing comprehensive review materials, but humans make all final decisions.

## Workflow Execution

⚠️ **最終承認が必要です**

このワークフローは完全な開発フローの最終段階です。承認により、全プロジェクトが正式に完了となります。

**最終フェーズ**: 承認により、完全なプロジェクト開発サイクルが完了します 🎉

```python
# Execute Acceptance Workflow
workflow_name = "acceptance"
feature_name = extract_acceptance_scope_from_input(user_input)
arguments = parse_arguments(user_input)

execute_workflow_engine(workflow_name, feature_name, arguments)
```

## Acceptance Workflow Phases

### Phase 1: Review Preparation
- **Agent**: acceptance-reviewer
- **Purpose**: Prepare comprehensive review materials for human stakeholders
- **Preparation Scope**:
  - **Feature Demonstration**: Interactive demos and usage examples
  - **Quality Assessment**: Code quality metrics and test coverage analysis
  - **Documentation Package**: Complete feature documentation and API specs
  - **Risk Assessment**: Security, performance, and integration risk evaluation
- **Outputs**: Review package, quality metrics, demonstration materials, risk reports

### Phase 2: Human Review Process
- **Type**: human_interaction (72-hour window)
- **Purpose**: Structured human review with stakeholder participation
- **Review Process**:
  - **Stakeholder Presentation**: Scheduled demo and feature walkthrough
  - **Interactive Q&A**: Facilitated discussion and clarification session
  - **Decision Collection**: Structured voting and feedback gathering
- **Decision Options**: Approved, Approved with Conditions, Rejected, Deferred
- **Participants**: Product Owner (required), Technical Lead (required), QA Lead (optional)

### Phase 3: Decision Processing
- **Type**: Conditional routing based on approval decision
- **Routing Logic**:
  - **Approved**: → Acceptance Completion
  - **Approved with Conditions**: → Condition Addressing  
  - **Rejected**: → Feedback Analysis
  - **Deferred**: → Deferral Management

## Rejection Handling Workflow

### Phase 4: Feedback Analysis
- **Agent**: feedback-analyzer
- **Purpose**: Systematic analysis of rejection feedback and root cause identification
- **Analysis Categories**:
  - **Functional Issues**: Requirements gaps and implementation problems
  - **Quality Concerns**: Technical debt and code quality issues
  - **User Experience**: Interface design and usability problems
  - **Performance Issues**: Optimization needs and scalability concerns
  - **Security Concerns**: Vulnerability identification and mitigation needs
- **Outputs**: Categorized feedback, root cause analysis, phase impact mapping

### Phase 5: Phase Coordination
- **Agent**: phase-coordinator
- **Purpose**: Coordinate rollback and re-execution of development phases
- **Coordination Activities**:
  - **Rollback Planning**: Systematic phase rollback strategy
  - **Re-execution Strategy**: Updated implementation approach
  - **Resource Reallocation**: Efficient resource redistribution
  - **Timeline Adjustment**: Realistic schedule updates
- **Rollback Strategies**:
  - Requirements Issues → Rollback to `kiro-sdd-workflow`
  - Implementation Problems → Rollback to `coding-workflow`
  - Quality Issues → Rollback to `refactoring-workflow` or `testing-workflow`

### Phase 6: Re-execution Monitoring
- **Agent**: phase-coordinator
- **Purpose**: Monitor and guide re-execution of development phases
- **Monitoring Scope**:
  - **Progress Tracking**: Real-time phase execution monitoring
  - **Quality Metrics**: Continuous quality assessment and improvement
  - **Stakeholder Communication**: Regular progress updates and risk communication
- **Outputs**: Progress reports, quality improvements, completion status

## Approval Path Workflows

### Conditional Approval Path
- **Phase**: Condition Addressing
- **Agent**: acceptance-reviewer
- **Purpose**: Address specific conditions for conditional approval
- **Activities**: Condition resolution planning, implementation timeline, validation criteria
- **Outcome**: → Acceptance Completion

### Deferral Management Path
- **Phase**: Deferral Management
- **Agent**: acceptance-reviewer
- **Purpose**: Manage deferred acceptance with follow-up scheduling
- **Activities**: Follow-up scheduling, preparation requirements, stakeholder communication
- **Outcome**: Rescheduled review process

### Acceptance Completion
- **Phase**: Final completion and documentation
- **Agent**: acceptance-reviewer
- **Purpose**: Complete acceptance process and document outcomes
- **Activities**: Final documentation, stakeholder notification, process metrics capture
- **Outputs**: Acceptance certificate, lessons learned, next recommendations

## Usage Examples

```bash
# Feature acceptance review
/acceptance "Review and approve user authentication system implementation"

# Post-development quality approval
/acceptance "Stakeholder approval for e-commerce checkout enhancement"

# Security feature acceptance
/acceptance "Security review and approval for payment processing integration"

# API acceptance review
/acceptance "Review and approve REST API design and implementation"

# Performance enhancement approval
/acceptance "Stakeholder approval for database optimization improvements"
```

## Human Interaction Management

### Stakeholder Coordination
- **Required Participants**: Product Owner, Technical Lead
- **Optional Participants**: QA Lead, Business Stakeholders (conditional)
- **Review Format**: Structured demo, comprehensive documentation, facilitated Q&A
- **Decision Criteria**: Functional completeness, quality standards, user experience, performance

### Review Timeline
- **Initial Review Window**: 72 hours for stakeholder review
- **Escalation Process**: Project management notification if delayed
- **Reminder Schedule**: 24h, 48h, 60h automated reminders
- **Extension Options**: Deadline extension for complex reviews

## Quality Tracking and Improvement

### Acceptance Metrics
- **Acceptance Rate**: Percentage of approvals vs rejections
- **Feedback Volume**: Average feedback items per review
- **Resolution Time**: Time from feedback to resolution
- **Re-review Success**: Second attempt approval rates

### Process Improvement
- **Feedback Analysis**: Systematic analysis of rejection patterns
- **Process Optimization**: Continuous improvement of review processes
- **Stakeholder Satisfaction**: Regular satisfaction surveys and feedback
- **Quality Enhancement**: Measurable quality improvements over time

## Integration with Development Flow

- **Quality Gates**: Mandatory approval before release or next development cycle
- **Feedback Loop**: Seamless integration with development phase re-execution
- **Documentation**: Complete traceability of all approval decisions
- **Continuous Improvement**: Learning from approval patterns for better preparation

Always ensure that human stakeholders have comprehensive information for informed decision-making and that feedback is systematically addressed through appropriate development phase coordination.