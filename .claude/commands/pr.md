---
description: Execute comprehensive pull request workflow including creation, analysis, validation, and safe merging
argument-hint: "[pr-description or merge-instruction]"
allowed-tools: "*"
---

You are the **Pull Request Workflow Command** that executes complete PR lifecycle management from creation through safe merging and post-merge activities.

## Initial Setup: Current Date Information

**CRITICAL**: Always start by calling the date-utility agent to get accurate current date and time information for proper timestamping, search queries, and time-sensitive operations.

```bash
# First action: Get current date information
Task(subagent_type="date-utility", description="Get current date information", prompt="Please provide current date and time information for use in this PR workflow session, including search-appropriate year formatting.")

# Second action: User interaction guidelines reminder
Task(subagent_type="user-interaction-reminder", description="User interaction guidelines", prompt="Provide critical reminders about proper user interaction protocols for this PR workflow session.")
```

## Command Purpose

This command initiates and manages the PR workflow, which automates pull request creation, comprehensive analysis, validation, and safe merging with post-merge cleanup.

## Workflow Execution

⚠️ **Approval Required**

This workflow follows approval checkpoints defined in `.cc-deck/config/workflows/pr.yaml`.

**After Each Workflow Approval**: Immediately proceed to the next workflow as defined in the YAML configuration.

### Implementation Logic:

1. **Complete Current Workflow**: Execute all PR phases
2. **Wait for Human Approval**: Present comprehensive review materials
3. **Upon Approval**: Ask user for explicit permission to proceed to next workflow
4. **Request Confirmation**: "Proceed to acceptance workflow? (yes/no)"
5. **Wait for Permission**: Only continue after clear user confirmation

```bash
# After pr workflow completion and approval:
# 1. Read .cc-deck/config/workflows/pr.yaml
# 2. Find "next_workflow: acceptance" in the approval section
# 3. Immediately execute the next workflow command: /acceptance
# 4. Continue until acceptance workflow completes
```

### Execution Steps:

**CRITICAL**: Execute ALL phases sequentially using the specified agents. Do NOT skip phases.

1. **Phase 1**: pr-analyzer (Analyze code changes and assess impact for PR creation)
2. **Phase 2**: pr-generator (Generate high-quality PR content based on change analysis)
3. **Phase 3**: pr-validator (Validate PR quality and readiness for review)
4. **Phase 4**: pr-create (Create pull request with generated content and metadata)
5. **Phase 5**: merge-approver (Prepare for merge and facilitate human approval process)
6. **Phase 6**: merge-executor (Execute safe PR merge with comprehensive validation)
7. **Phase 7**: post-merge-manager (Comprehensive post-merge activities and cleanup)
8. **Phase 8**: Human approval checkpoint - Review completed workflow

**Important**: Each phase must be completed by the designated agent before proceeding to the next phase.

## PR Workflow Phases

### Phase 1: Change Analysis

- **Agent**: pr-analyzer
- **Purpose**: Comprehensive analysis of code changes and impact assessment
- **Analysis Scope**:
  - **Code Change Analysis**: Line-by-line diff analysis and change categorization
  - **Impact Assessment**: Dependency analysis and affected system components
  - **Risk Evaluation**: Security implications and potential regression risks
  - **Complexity Metrics**: Change complexity and review effort estimation
- **Outputs**: Change analysis report, impact assessment, risk classification

### Phase 2: PR Content Generation

- **Agent**: pr-generator
- **Purpose**: Generate high-quality PR titles, descriptions, and metadata
- **Generation Capabilities**:
  - **Smart Titles**: Descriptive, convention-compliant PR titles
  - **Comprehensive Descriptions**: Detailed change summaries and context
  - **Test Plan Generation**: Recommended testing procedures and validation steps
  - **Review Guidelines**: Specific review focus areas and validation criteria
- **Outputs**: PR title, description, test plan, review checklist

### Phase 3: PR Validation

- **Agent**: pr-validator
- **Purpose**: Comprehensive PR quality validation before creation
- **Validation Checks**:
  - **Code Quality**: Static analysis, formatting, and convention compliance
  - **Test Coverage**: Ensure adequate test coverage for changes
  - **Documentation**: Verify documentation updates match code changes
  - **Security Scan**: Basic security vulnerability detection
- **Outputs**: Validation report, quality metrics, approval readiness assessment

### Phase 4: PR Creation

- **Integration**: GitHub CLI (`gh`) for PR creation
- **Process**: Automated PR creation with generated content
- **Features**: Label assignment, reviewer suggestions, milestone linking

## PR Merging Workflow

### Phase 5: Merge Approval Process

- **Agent**: merge-approver
- **Purpose**: Facilitate human approval process for PR merging
- **Approval Features**:
  - **Merge Readiness Assessment**: All checks passed, conflicts resolved
  - **Stakeholder Coordination**: Notify appropriate reviewers and approvers
  - **Approval Collection**: Structured approval decision gathering
  - **Risk Communication**: Clear communication of merge risks and benefits

### Phase 6: Safe Merge Execution

- **Agent**: merge-executor
- **Purpose**: Execute safe PR merge with comprehensive validation
- **Safety Measures**:
  - **Pre-merge Validation**: Final checks before merge execution
  - **Conflict Resolution**: Automatic conflict detection and resolution guidance
  - **Rollback Preparation**: Backup and rollback procedure establishment
  - **Merge Strategy Selection**: Appropriate merge strategy (merge, squash, rebase)
- **Outputs**: Merge execution results, rollback procedures, success confirmation

### Phase 7: Post-Merge Management

- **Agent**: post-merge-manager
- **Purpose**: Comprehensive post-merge activities and cleanup
- **Activities**:
  - **Repository Cleanup**: Branch deletion and tag management
  - **Stakeholder Notification**: Merge completion notifications
  - **Documentation Updates**: Automatic documentation refresh
  - **Next Issue Identification**: Analysis for subsequent development opportunities
- **Outputs**: Cleanup reports, notifications, next development recommendations

## Usage Examples

```bash
# Create PR for feature branch
/pr "Create pull request for user authentication system implementation"

# Analyze and improve existing PR
/pr "Analyze current PR #123 and suggest improvements"

# Complete PR workflow including merge
/pr "Create and merge PR for bug fix in payment processing"

# Safe merge with validation
/pr "Safely merge approved authentication feature PR with full validation"

# Post-merge cleanup and analysis
/pr "Complete post-merge activities for dashboard enhancement PR"
```

## Quality Assurance Features

### Pre-Creation Validation

- **Code Quality Checks**: Automated linting, formatting, and convention validation
- **Test Coverage Analysis**: Ensure new code has adequate test coverage
- **Documentation Consistency**: Verify docs match code changes
- **Security Scanning**: Basic vulnerability and security issue detection

### Merge Safety Measures

- **Comprehensive Validation**: All CI/CD checks must pass before merge
- **Conflict Detection**: Automatic identification and resolution guidance
- **Rollback Readiness**: Prepared rollback procedures for every merge
- **Stakeholder Approval**: Human approval required for all merges

### Post-Merge Quality

- **Integration Verification**: Post-merge integration testing
- **Performance Monitoring**: Performance impact assessment
- **Documentation Updates**: Automatic documentation synchronization
- **Issue Tracking**: Integration with issue management systems

## GitHub Integration

### PR Creation Features

- **Smart Templates**: Intelligent PR template selection and population
- **Automated Labels**: Automatic label assignment based on change analysis
- **Reviewer Suggestions**: AI-powered reviewer recommendation
- **Milestone Linking**: Automatic milestone and project board integration

### Merge Management

- **Branch Protection**: Integration with GitHub branch protection rules
- **Status Checks**: Coordination with CI/CD pipeline status checks
- **Review Requirements**: Enforcement of review and approval requirements
- **Merge Queue**: Integration with GitHub merge queue when available

## Error Handling and Recovery

- **Validation Failures**: Clear error reporting with specific resolution steps
- **Merge Conflicts**: Detailed conflict resolution guidance and automation
- **Failed Merges**: Automatic rollback and recovery procedures
- **Quality Gate Failures**: Integration with feedback loop for quality improvements

Always ensure that PRs meet quality standards and that merges are executed safely with appropriate approvals and validations.
