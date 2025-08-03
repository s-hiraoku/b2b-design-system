---
description: Orchestrator command that intelligently analyzes project state and delegates to appropriate development phase
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash, Glob, Grep, LS
---

# Orchestrator Command

Intelligent orchestrator that automatically detects project state and continues development workflow from the appropriate phase.

## Purpose

This command serves as the single entry point for all development workflows by:

1. **Analyzing project state** (checking existing specifications, issues, code)
2. **Determining next phase** (identifying what needs to be done next)
3. **Delegating to appropriate agent** (executing the right workflow)
4. **Maintaining continuity** (preserving context between phases)

## Intelligent State Detection

### Automatic Project Analysis

When invoked without specific parameters, orchestrator will:

1. **Check for existing specifications** in `specs/` directory
2. **Analyze GitHub issues** for active development tasks
3. **Review code changes** and PR status
4. **Determine current phase** and recommend next steps

```bash
# Automatic state detection and continuation
/orchestrator

# Example output:
# 🔍 Analyzing project state...
# ✅ Found feature: user-auth-system
# 📋 Current phase: Design completed
# 🎯 Next recommended: Generate implementation tasks
# ▶️  Proceeding with: /orchestrator "kiro:spec-tasks user-auth-system"
```

### State Detection Logic

```yaml
Project State Analysis:
  1. Check Specifications:
     - No specs → Start with Kiro Steering
     - Incomplete spec → Resume from last phase
     - Complete spec → Check implementation status
  
  2. Check Implementation:
     - No issues → Create issues from tasks
     - Open issues → Check development progress
     - Completed issues → Validate and test
  
  3. Check Quality:
     - No tests → Generate tests
     - Failed tests → Debug and fix
     - Passing tests → Check acceptance status
  
  4. Check Deployment:
     - Not ready → Complete prerequisites
     - Ready → Create PR
     - PR open → Check merge readiness
```

## Implementation Strategy

### Smart Workflow Continuation

1. **State Analysis Phase**
   ```bash
   # Analyze project structure
   - Check specs/ directory for feature specifications
   - Read kiro_status.json for phase tracking
   - Query GitHub for issue and PR status
   - Determine optimal next action
   ```

2. **Context Preservation**
   ```bash
   # Maintain workflow context
   - Feature name from existing specs
   - Current phase from status files
   - Completed work from git history
   - Next steps from workflow logic
   ```

3. **Intelligent Delegation**
   ```bash
   # Delegate to appropriate phase
   - Missing specs → Kiro workflow
   - Missing issues → Create issues
   - Open issues → Development assistance
   - Complete code → Testing and validation
   - Tested code → PR and deployment
   ```

## Usage Examples

### Basic Continuation
```bash
# Continue from where you left off
/orchestrator

# Force specific phase
/orchestrator "continue coding user-auth-system"

# Start new feature
/orchestrator "Build a real-time chat application"
```

### Phase-Specific Execution
```bash
# Jump to specific phase
/orchestrator "kiro:spec-design user-auth"      # Continue with design
/orchestrator "create-issues payment-system"    # Create issues for existing spec
/orchestrator "coding authentication-module"    # Start implementation
/orchestrator "acceptance user-management"      # Run acceptance tests
/orchestrator "pr-merge 123"                   # Merge approved PR
```

## Workflow State Management

### State Files and Tracking

The orchestrator maintains project state through several mechanisms:

```yaml
State Storage:
  specs/{feature}/kiro_status.json:
    - current_phase: "design|requirements|tasks|etc"
    - completed_phases: ["steering", "init", "requirements"]
    - last_updated: "2024-01-15T10:00:00Z"
    - next_recommended: "tasks"
  
  .claude/workflow-state.json:
    - active_feature: "user-auth-system"
    - active_issues: [123, 124, 125]
    - completed_issues: [120, 121, 122]
    - current_pr: 456
    - workflow_phase: "implementation"
```

### Automatic Next Step Detection

When `/orchestrator` is called without parameters:

1. **Scan for Active Features**
   ```bash
   # Check specs directory
   ls specs/*/kiro_status.json
   # Identify features in progress
   # Select most recently updated
   ```

2. **Determine Current Phase**
   ```bash
   # Read kiro_status.json
   # Check completed vs pending phases
   # Identify blockers or dependencies
   ```

3. **Recommend Next Action**
   ```bash
   # Based on phase completion:
   - Steering done → Requirements
   - Requirements done → Design
   - Design done → Tasks
   - Tasks done → Create Issues
   - Issues created → Implementation
   - Implementation done → Testing
   - Testing done → Acceptance
   - Acceptance done → PR Creation
   - PR created → Merge
   - Merged → Next Issue
   ```

### Example Workflow Continuation

```bash
# First time - starts from beginning
/orchestrator
# Output: "No active features found. Starting with Kiro Steering..."

# After steering completed
/orchestrator
# Output: "Found project context. Proceeding with feature initialization..."

# After several phases completed
/orchestrator
# Output: "Feature 'user-auth' at Design phase. Continuing with task generation..."

# With active development
/orchestrator
# Output: "Found 3 open issues for 'user-auth'. Checking implementation progress..."
```

## Sub-Agent Architecture Benefits

- **Focused Responsibility**: Orchestrator handles state detection and delegation
- **Intelligent Continuation**: Automatically resumes from last successful phase
- **Context Preservation**: Maintains workflow state across sessions
- **Flexible Progression**: Allows jumping to specific phases when needed
- **Progress Visibility**: Clear indication of current state and next steps

This pattern enables seamless workflow continuation without manual state tracking.

## Issue Creation Integration

### Post-Tasks Phase Workflow

After tasks.md generation, optionally convert tasks to GitHub issues for implementation tracking:

```bash
# Convert tasks to GitHub issues (optional)
/orchestrator "create-issues feature-name"

# Or using the direct command
/create-issues feature-name
```

### Create Issues Sub-Agent

- **Sub-agent**: `Create Issues`
- **Responsibility**: Transform tasks.md into trackable GitHub issues
- **Benefits**: Bridge specification and implementation phases, improve project management

### Usage Examples

```bash
# Complete workflow with issue creation
/orchestrator "Build user authentication system and create implementation issues"

# Post-completion issue generation
/orchestrator "create-issues user-auth-system"
```

### Integration Benefits

- **Implementation Tracking**: Convert spec-driven tasks to GitHub issues
- **Team Coordination**: Assign tasks to team members via GitHub
- **Progress Visibility**: Track implementation progress through issue management
- **Traceability**: Maintain links between specifications and implementation work

## Comprehensive Coding Integration

### End-to-End Development Workflow

Execute complete development workflows with research, planning, implementation, testing, and documentation:

```bash
# Comprehensive coding workflow
/orchestrator "coding 'Build a REST API with authentication'"

# Development with specific technology focus
/orchestrator "coding 'Create microservices architecture' --focus backend"

# Complete feature development cycle
/orchestrator "Build user management system with comprehensive coding workflow"
```

### Coding Sub-Agent

- **Sub-agent**: `Coding`
- **Responsibility**: Complete development workflow orchestration from research to documentation
- **Benefits**: End-to-end development automation with MCP integration and best practices

### Coding Integration Points

```bash
# Research-driven development
/orchestrator "coding 'Implement OAuth2 authentication' --research-first"

# Implementation with testing focus
/orchestrator "coding 'Build payment processing' --tdd-approach"

# Documentation-heavy development
/orchestrator "coding 'Create public API' --comprehensive-docs"
```

### Coding Benefits

- **Research Integration**: Web search, DeepWiki, and Context7 MCP for best practices
- **Strategic Planning**: Architecture and implementation strategy development
- **Quality Implementation**: Serena MCP integration for high-quality code generation
- **Comprehensive Testing**: TDD approach with automated test generation
- **Complete Documentation**: API docs, tutorials, and usage examples
- **Technology Expertise**: Current library documentation and framework best practices

## Refactoring Integration

### Post-Coding Quality Improvement

Automatically execute refactoring workflows after coding completion to improve code quality and maintainability:

```bash
# Complete development cycle with automatic refactoring
/orchestrator "Build authentication system with post-coding refactoring"

# Coding followed by comprehensive refactoring
/orchestrator "coding 'Create user management' && refactoring user-management"

# Development workflow with quality improvement
/orchestrator "Implement payment processing with automatic code optimization"
```

### Refactoring Sub-Agent

- **Sub-agent**: `Refactoring`
- **Responsibility**: Intelligent code refactoring using semantic analysis and pattern detection
- **Benefits**: Improved code maintainability, reduced duplication, and enhanced quality

### Post-Coding Refactoring Integration

```bash
# Automatic refactoring after implementation
/orchestrator "coding 'Build REST API' --auto-refactor"

# Similarity-based refactoring post-coding
/orchestrator "Implement microservices with duplicate pattern consolidation"

# Quality-focused development cycle
/orchestrator "Build feature with coding, refactoring, and validation cycle"
```

### Refactoring Benefits

- **Code Quality Enhancement**: Systematic improvement of code structure and readability
- **Duplication Elimination**: Serena MCP semantic analysis for pattern detection
- **Maintainability Improvement**: Better code organization and design patterns
- **Performance Optimization**: Identification and resolution of performance bottlenecks
- **Technical Debt Reduction**: Proactive addressing of code quality issues
- **Consistency Enforcement**: Standardization of coding patterns across codebase

## Acceptance Integration

### Human Approval and Feedback-Driven Improvement

Enable comprehensive acceptance workflows with human oversight and automated feedback-driven phase re-execution:

```bash
# Human acceptance review with feedback processing
/orchestrator "acceptance user-authentication"

# Acceptance with specific reviewer and auto-retry
/orchestrator "acceptance payment-api --reviewer product-owner --auto-retry"

# Complete development workflow with acceptance gates
/orchestrator "Build feature with comprehensive acceptance and feedback-driven improvement"
```

### Acceptance Sub-Agent

- **Sub-agent**: `Acceptance`
- **Responsibility**: Human approval workflows with feedback analysis and automated phase re-execution
- **Benefits**: Quality assurance through structured human oversight and intelligent feedback processing

### Acceptance Integration Points

```bash
# Development cycle with acceptance validation
/orchestrator "Build authentication system with human acceptance and feedback integration"

# Post-development acceptance with detailed review
/orchestrator "acceptance feature-implementation --detailed --auto-retry"

# Quality-focused development with acceptance gates
/orchestrator "acceptance microservices-refactor --reviewer tech-lead"
```

### Acceptance Benefits

- **Human Oversight**: Structured stakeholder review and approval processes
- **Feedback Analysis**: Intelligent analysis of rejection feedback and root cause identification
- **Automated Re-execution**: Smart phase rollback and re-execution based on feedback
- **Quality Improvement**: Systematic addressing of feedback requirements and quality enhancement
- **Process Learning**: Continuous improvement through feedback pattern analysis
- **Stakeholder Engagement**: Enhanced communication and collaboration in acceptance processes

## Human Approval Integration

### Structured Approval Workflow

Enable human oversight at critical decision points with intelligent approval management:

```bash
# Check and approve issue completion
/orchestrator "check-issues user-auth-system"

# Automated approval integration in workflows
/orchestrator "Build authentication system with approval gates"
```

### Check Issues Sub-Agent

- **Sub-agent**: `Check Issues`
- **Responsibility**: Human approval workflow management and progress validation
- **Benefits**: Quality assurance through structured human oversight

### Approval Integration Points

```bash
# Complete workflow with approval gates
/orchestrator "Complete feature development with approval checkpoints"

# Approval-driven progression
/orchestrator "check-issues feature-name --auto-progress"
```

### Approval Benefits

- **Quality Assurance**: Human validation of critical milestones
- **Risk Mitigation**: Structured decision making at key points
- **Process Control**: Automated progression based on approval outcomes
- **Audit Trail**: Complete record of approval decisions and reasoning

## Integration Testing Integration

### Comprehensive Testing Workflow

Execute end-to-end integration testing with comprehensive environment management and reporting:

```bash
# Run integration tests for a project
/orchestrator "integration-test user-auth-system"

# Integration testing with specific configuration
/orchestrator "integration-test payment-api --include-db --env staging"

# Complete development workflow with integration testing
/orchestrator "Build API with comprehensive integration testing"
```

### Integration Test Sub-Agent

- **Sub-agent**: `Integration Test`
- **Responsibility**: Comprehensive integration testing workflow orchestration
- **Benefits**: Automated testing pipeline with environment management and detailed reporting

### Testing Integration Points

```bash
# Complete development cycle with testing
/orchestrator "Build feature with comprehensive integration testing and approval gates"

# Testing-focused workflow
/orchestrator "integration-test microservices --services auth,payment,notification --parallel"
```

### Integration Testing Benefits

- **Quality Assurance**: Comprehensive integration testing across all system components
- **Environment Management**: Automated test environment provisioning and cleanup
- **Performance Validation**: Load testing and performance benchmarking
- **Automated Reporting**: Detailed test reports with actionable insights and recommendations

## E2E Testing Integration

### Minimal End-to-End Testing

Generate basic E2E test scenarios and framework setup for essential user journey validation:

```bash
# Generate basic E2E tests for a project
/orchestrator "e2e-test user-auth-system"

# E2E testing for specific user journey
/orchestrator "e2e-test checkout-flow --journey 'user registration to purchase'"

# Complete development workflow with E2E testing
/orchestrator "Build feature with basic E2E test coverage"
```

### E2E Test Sub-Agent

- **Sub-agent**: `E2E Test`
- **Responsibility**: Minimal E2E test generation and framework setup guidance
- **Benefits**: Basic user journey coverage with framework configuration

### E2E Testing Integration Points

```bash
# Development cycle with E2E testing
/orchestrator "Build authentication system with basic E2E coverage"

# Testing-focused workflow
/orchestrator "e2e-test main-features --framework playwright"
```

### E2E Testing Benefits

- **User Journey Validation**: Basic coverage of critical user workflows
- **Framework Setup**: Automated configuration for Playwright/Cypress
- **CI/CD Integration**: Basic workflow generation for automated testing
- **Minimal Scope**: Focused on essential scenarios with manual enhancement guidance

## Self-Check Integration (Issue Requirements Validation)

### Automated Requirements Validation

Enable self-checking capabilities to validate issue requirements completion and ensure quality before progression:

```bash
# Self-check issue requirements completion
/orchestrator "check-issues user-auth-system"

# Automated validation with progression
/orchestrator "check-issues payment-api --auto-progress"

# Complete development workflow with self-validation
/orchestrator "Build feature with automated self-check and approval gates"
```

### Check Issues Sub-Agent

- **Sub-agent**: `Check Issues`
- **Responsibility**: Human approval workflow management and automated requirements validation
- **Benefits**: Quality assurance through structured validation and human oversight

### Self-Check Integration Points

```bash
# Development cycle with self-validation
/orchestrator "Build authentication system with automated requirement validation"

# Post-implementation validation
/orchestrator "check-issues feature-implementation --validate-requirements"

# Quality gate enforcement
/orchestrator "check-issues microservices --enforce-quality-gates"
```

### Self-Check Benefits

- **Requirements Validation**: Automated verification of issue completion against acceptance criteria
- **Quality Assurance**: Structured validation before feature progression
- **Human Oversight**: Intelligent approval workflows with context-aware decision making
- **Audit Trail**: Complete record of validation decisions and quality assessments
- **Risk Mitigation**: Early detection of incomplete or incorrect implementations
- **Process Control**: Automated progression based on validation outcomes

## PR Creation Integration

### Automated Pull Request Creation

Streamline the pull request creation process with comprehensive analysis, content generation, and quality validation:

```bash
# Create PR with automated analysis and content generation
/orchestrator "pr-create feature/user-authentication"

# Create PR with custom target branch
/orchestrator "pr-create feature/payment-api --target develop"

# Complete development workflow with PR creation
/orchestrator "Build feature with automated PR creation and review setup"
```

### PR Create Sub-Agent

- **Sub-agent**: `PR Create`
- **Responsibility**: Automated pull request creation with comprehensive analysis and quality validation
- **Benefits**: High-quality PR content generation with automated reviewer assignment and CI/CD integration

### PR Creation Integration Points

```bash
# Development cycle with automated PR creation
/orchestrator "Build authentication system with automated PR creation and review setup"

# Post-development PR creation
/orchestrator "pr-create feature-implementation --auto-assign --include-tests"

# Quality-focused PR creation
/orchestrator "pr-create microservices-refactor --draft --link-issues"
```

### PR Creation Benefits

- **Comprehensive Analysis**: Automated code change analysis and impact assessment
- **Quality Content**: AI-generated PR descriptions with detailed change summaries
- **Automatic Validation**: Quality gate validation before PR creation
- **Smart Assignments**: Intelligent reviewer and label assignment based on changes
- **CI/CD Integration**: Automated test execution and pipeline triggering
- **Documentation Linking**: Automatic linking to related issues and documentation

## PR Merge Integration

### Human-Approved Pull Request Merge

Execute safe, human-approved pull request merges with comprehensive validation, approval workflows, and post-merge activities:

```bash
# Human-approved PR merge with safety validation
/orchestrator "pr-merge 123"

# Emergency merge with expedited approval
/orchestrator "pr-merge 456 --emergency --approver on-call-engineer"

# Complete development workflow with PR merge and next steps
/orchestrator "Build feature with automated PR merge and next issue identification"
```

### PR Merge Sub-Agent

- **Sub-agent**: `PR Merge`
- **Responsibility**: Human-approved merge workflows with safety validation and post-merge management
- **Benefits**: Safe merge execution with human oversight, comprehensive validation, and workflow continuation

### PR Merge Integration Points

```bash
# Development cycle with human-approved merge
/orchestrator "Build authentication system with safe PR merge and post-merge activities"

# Post-development merge workflow
/orchestrator "pr-merge feature-implementation --strategy squash --auto-delete-branch"

# Quality-focused merge with next steps
/orchestrator "pr-merge microservices-refactor --approver tech-lead --identify-next-issues"
```

### PR Merge Benefits

- **Human Oversight**: Structured approval processes with comprehensive merge information
- **Safety Validation**: Comprehensive pre-merge checks and post-merge integrity validation
- **Risk Management**: Emergency procedures, rollback capabilities, and safety mechanisms
- **Workflow Continuation**: Next issue identification and development workflow management
- **Stakeholder Communication**: Automated notifications and project management integration
- **Quality Assurance**: Merge strategy selection and comprehensive validation framework
