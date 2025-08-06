---
description: Orchestrator command that intelligently analyzes project state and delegates to appropriate development phase
argument-hint: [optional feature description or workflow command]
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash, Glob, Grep, LS
model: sonnet
---

# Orchestrator Command

Intelligent orchestrator that automatically detects project state and continues development workflow from the appropriate phase using task-based progression.

## Purpose

This command serves as the single entry point for all development workflows by:

1. **Analyzing project state** (checking existing specifications, tasks.md files, code)
2. **Determining next phase** (identifying what needs to be done next)
3. **Delegating to appropriate agent** (executing the right workflow)
4. **Maintaining continuity** (preserving context between phases)

## Intelligent State Detection & Dynamic Agent Selection

### Automatic Project Analysis

When invoked without specific parameters, orchestrator will:

1. **Check for existing specifications** in `.kiro/specs/` directory
2. **Analyze tasks.md files** for active development tasks and completion status
3. **Review code changes** and implementation progress
4. **Determine current phase** and recommend next steps
5. **Select optimal agent** based on context and complexity

```bash
# Automatic state detection and continuation
/orchestrator

# Example output:
# 🔍 Analyzing project state...
# ✅ Found feature: user-auth-system
# 📋 Current phase: Implementation (7/12 tasks completed)
# 🧠 Context analysis: High complexity, security-critical
# 🎯 Agent selection: tdd-agent (TDD approach for security)
# ▶️  Proceeding with TDD implementation...
```

### Context-Based Agent Selection

Intelligent agent selection based on project context and requirements:

Based on project analysis, the orchestrator selects the most appropriate workflow agent:

- **Security-critical development**: Use `tdd-agent` for comprehensive security testing with TDD approach
- **Complex refactoring needs**: Use `refactoring` agent for systematic code improvement workflows
- **API or service development**: Use `integration-test` agent for comprehensive API testing
- **New feature development**: Use `coding` agent for full development lifecycle management
- **Documentation requirements**: Use `documentation-agent` for comprehensive documentation generation
- **Structured development**: Use `kiro-spec-orchestrator` for specification-driven development workflow

### Agent Selection Criteria

The orchestrator analyzes project characteristics to determine optimal delegation:

1. **Code complexity analysis**: Assess existing codebase complexity and maintenance needs
2. **Security requirements**: Identify authentication, authorization, and security-sensitive code
3. **Integration patterns**: Detect APIs, external services, and integration requirements
4. **Development phase**: Determine whether project needs research, implementation, testing, or documentation
5. **Quality status**: Assess current code quality and improvement opportunities

### Workflow Coordination

For complex scenarios requiring multiple workflows:

- **Refactoring + Testing**: Coordinate code improvement with comprehensive testing
- **Documentation + PR Creation**: Ensure documentation updates are included in pull requests
- **Implementation + Quality Assurance**: Combine development with continuous quality validation
- **Research + Planning**: Integrate technology research with strategic planning

The orchestrator ensures proper sequencing and context sharing between different workflow phases.

### State Detection Logic

```yaml
Project State Analysis:
  0. Check Serena MCP Status:
    - New project → Initialize Serena MCP with mcp__serena__initial_instructions
    - Existing project → Load context with mcp__serena__list_memories
    - Context stale → Refresh project understanding

  1. Check Specifications:
    - No specs → Start with Kiro Steering
    - Incomplete spec → Resume from last phase
    - Complete spec → Check tasks.md status

  2. Validate State Consistency:
    - Compare kiro_status.json with actual project state
    - Detect implementation ahead of kiro status
    - Detect approval blocks preventing progression
    - Auto-sync status when implementation detected

  3. Check Implementation (tasks.md):
    - No tasks.md → Create tasks from specs
    - Incomplete tasks → Continue with next uncompleted task
    - All tasks completed → Ready for next feature/enhancement
    - Implementation exists but tasks unmarked → Auto-update task progress

  4. Auto-Resolve Status Inconsistencies:
    - Detect created files/code vs task completion status
    - Auto-approve completed phases when implementation verified
    - Update kiro_status.json current_phase to match reality
    - Trigger TDD-agent completion when implementation done

  5. Check Next Work:
    - All tasks complete → Analyze for new features or improvements
    - Tasks in progress → Focus on current implementation
    - Blocked tasks → Identify and resolve blockers

  6. Check Quality:
    - Implementation complete → Run tests and validation
    - Tests failing → Debug and fix issues
    - Tests passing → Mark tasks as completed

  7. Check Documentation:
    - Code complete → Update documentation
    - Documentation ready → Final validation
    - All complete → Ready for new work cycle
```

## Implementation Strategy

### Smart Workflow Continuation

1. **State Analysis Phase**

   ```bash
   # Analyze project structure
   - Check .kiro/specs/ directory for feature specifications
   - Read tasks.md files for implementation progress
   - Analyze task completion status (checkboxes)
   - Determine optimal next action
   ```

2. **Context Preservation**

   ```bash
   # Maintain workflow context
   - Feature name from existing specs
   - Current task from tasks.md progress
   - Completed tasks from checkbox status
   - Next logical task from task hierarchy
   ```

3. **Intelligent Delegation**
   ```bash
   # Delegate to appropriate phase (with Serena MCP integration)
   - New project → Serena MCP initialization → Kiro workflow
   - Missing specs → Kiro workflow (Steering → Requirements → Design → Tasks)
   - Missing tasks.md → Generate implementation tasks
   - Incomplete tasks → Continue implementation (with Serena context)
   - All tasks complete → Identify next feature/enhancement
   - Code complete → Testing and validation
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
  .kiro/specs/{feature}/kiro_status.json:
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
   ls .kiro/specs/*/kiro_status.json
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
   - Tasks created → Implementation
   - All tasks complete → Next Issue Selection
   - Issue selected → New Kiro Workflow
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
# Output: "Found 3 incomplete tasks for 'user-auth'. Checking implementation progress..."
```

## Sub-Agent Architecture Benefits

- **Focused Responsibility**: Orchestrator handles state detection and delegation
- **Intelligent Continuation**: Automatically resumes from last successful phase
- **Context Preservation**: Maintains workflow state across sessions
- **Flexible Progression**: Allows jumping to specific phases when needed
- **Progress Visibility**: Clear indication of current state and next steps

This pattern enables seamless workflow continuation without manual state tracking.

## Tasks.md Progress Tracking Integration

### Task-Based Development Workflow

The orchestrator focuses on .kiro/specs/{feature}/tasks.md files for tracking implementation progress:

```bash
# Continue from current task progress
/orchestrator

# Update specific task completion
/orchestrator "complete-task feature-name 1.1"

# Work on next uncompleted task
/orchestrator "next-task feature-name"
```

### Core Task Management

- **Primary Focus**: Track progress through tasks.md checkbox completion
- **Automatic Detection**: Identify next uncompleted task automatically
- **Progress Visualization**: Display current completion status
- **Smart Continuation**: Resume from last incomplete task

### Tasks.md File Structure and Format

.kiro/specs/{feature}/tasks.md files follow a hierarchical checkbox format for tracking implementation progress:

```markdown
# 実装計画

## 概要

ダイエット管理アプリの実装を、承認された要件仕様書と技術設計書に基づいて段階的に実行するためのタスクリスト。

## 実装フェーズ

### Phase 1: プロジェクト基盤・環境構築

- [ ] 1.1 React Native 開発環境のセットアップ

  - React Native 0.72+のプロジェクト初期化
  - TypeScript、ESLint、Prettier 設定の構成
  - _要件: 7.1, 8.1_

- [x] 1.2 プロジェクト構造とディレクトリ構成
  - src/配下のレイヤー別ディレクトリ作成
  - 共通型定義ファイル（types/）の作成
  - _要件: すべての要件に対応_
```

### Task Progress Update Process

#### Automatic Task Completion Detection

The orchestrator automatically detects task completion by:

1. **Analyzing Code Changes**: Comparing implemented functionality against task requirements
2. **Checking Test Coverage**: Verifying tests exist for completed tasks
3. **Validating Requirements**: Ensuring task acceptance criteria are met
4. **Updating Checkboxes**: Automatically updating `[ ]` to `[x]` for completed tasks

#### Manual Task Progress Updates

```bash
# Update specific task completion
/orchestrator "complete-task feature-name 1.1"

# Mark multiple tasks as completed
/orchestrator "complete-tasks feature-name 1.1,1.2,2.3"

# Update task progress with validation
/orchestrator "update-progress feature-name --validate"
```

#### Progress Tracking Commands

```bash
# Check current task progress
/orchestrator "task-status feature-name"

# Generate progress report
/orchestrator "progress-report feature-name"

# Identify next tasks to work on
/orchestrator "next-tasks feature-name"
```

### Progress Visualization and Reporting

#### Progress Status Display

```bash
# Example progress output
Feature: user-authentication-system
Progress: 7/12 tasks completed (58%)

├── [x] 1.1 React Native環境セットアップ (完了)
├── [x] 1.2 プロジェクト構造作成 (完了)
├── [ ] 1.3 依存関係インストール (次のタスク)
├── [ ] 2.1 SQLiteデータベース初期化
├── [ ] 2.2 データモデル実装
└── [ ] 2.3 Repository層実装
```

#### Integration with Development Workflow

The tasks.md progress tracking integrates seamlessly with the development workflow:

1. **Task Selection**: Automatically identifies next logical task to implement
2. **Context Preservation**: Maintains task context across development sessions
3. **Dependency Management**: Ensures prerequisite tasks are completed first
4. **Progress Continuity**: Resumes development from the last completed task

### Task Completion and Next Feature Workflow

#### Automatic Next Feature Identification

When all tasks in a tasks.md file are completed, the orchestrator automatically:

1. **Validates Complete Task Completion**: Ensures all checkboxes are marked as completed
2. **Analyzes Project State**: Reviews current codebase and documentation
3. **Identifies Improvements**: Suggests enhancements, optimizations, or new features
4. **Presents Options**: Shows potential next development areas
5. **Requests User Decision**: Waits for user direction on next focus area

```bash
# Automatic flow when tasks complete
/orchestrator
# Output: "All tasks completed for 'user-auth-system'!"
# Output: "Analyzing project for potential improvements..."
# Output: "Suggested next development areas:"
# Output: "1. Performance optimizations"
# Output: "2. UI/UX enhancements"
# Output: "3. Additional security features"
# Output: "4. New feature development"
# Output: "What would you like to focus on next?"
```

#### Manual Next Feature Selection

```bash
# Force next feature analysis
/orchestrator "next-feature feature-name"

# Suggest improvements for specific area
/orchestrator "suggest-improvements authentication"

# Start new feature development
/orchestrator "new-feature user-profile-management"
```

### Quality Gates for Task Completion

```yaml
Task Completion Criteria:
  1. Functional Implementation:
    - Core functionality implemented
    - Edge cases handled
    - Error handling included

  2. Code Quality:
    - Follows project conventions
    - Proper error handling
    - Performance considerations

  3. Testing Coverage:
    - Unit tests written and passing
    - Integration tests where applicable
    - Manual testing completed

  4. Documentation:
    - Code properly commented
    - Implementation notes updated
    - Usage examples provided
```

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

### TDD-First Development Integration

```bash
# Test-Driven Development with t-wada methodology (delegates to coding agent with TDD approach)
/orchestrator "tdd 'Implement OAuth2 authentication'"

# TDD with specific testing framework (coding agent manages TDD internally)
/orchestrator "tdd 'Build payment processing' --framework jest"

# Complete TDD cycle with Red-Green-Refactor (coding agent orchestrates with tdd-agent)
/orchestrator "tdd 'Create user management system' --full-cycle"
```

### TDD Integration Architecture

- **Primary Orchestrator**: `coding` - Manages complete implementation workflow and delegates TDD practices internally
- **TDD Specialist**: `tdd-agent` (formerly tdd-t-wada-agent) - Provides TDD guidance when invoked by coding agent
- **Responsibility**: Coding agent handles implementation planning and orchestration, using tdd-agent for TDD methodology
- **Benefits**: Proper separation of concerns between implementation orchestration and TDD practices

### Coding Integration Points

```bash
# Research-driven development
/orchestrator "coding 'Implement OAuth2 authentication' --research-first"

# Implementation with TDD approach (coding agent automatically uses tdd-agent internally)
/orchestrator "coding 'Build payment processing' --tdd-approach"

# Documentation-heavy development
/orchestrator "coding 'Create public API' --comprehensive-docs"
```

### Coding Benefits

- **Research Integration**: Web search, DeepWiki, and Context7 MCP for best practices
- **Strategic Planning**: Architecture and implementation strategy development
- **Quality Implementation**: Serena MCP integration for high-quality code generation
- **Test-Driven Development**: Automatic integration with tdd-agent for test-first implementation when TDD approach is requested
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
# Check and approve task completion
/orchestrator "check-tasks user-auth-system"

# Automated approval integration in workflows
/orchestrator "Build authentication system with approval gates"
```

### Check Tasks Sub-Agent

- **Sub-agent**: `Check Tasks`
- **Responsibility**: Human approval workflow management and task progress validation
- **Benefits**: Quality assurance through structured human oversight

### Approval Integration Points

```bash
# Complete workflow with approval gates
/orchestrator "Complete feature development with approval checkpoints"

# Approval-driven progression
/orchestrator "check-tasks feature-name --auto-progress"
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

## Self-Check Integration (Task Requirements Validation)

### Automated Requirements Validation

Enable self-checking capabilities to validate task requirements completion and ensure quality before progression:

```bash
# Self-check task requirements completion
/orchestrator "check-tasks user-auth-system"

# Automated validation with progression
/orchestrator "check-tasks payment-api --auto-progress"

# Complete development workflow with self-validation
/orchestrator "Build feature with automated self-check and approval gates"
```

### Check Tasks Sub-Agent

- **Sub-agent**: `Check Tasks`
- **Responsibility**: Human approval workflow management and automated task requirements validation
- **Benefits**: Quality assurance through structured validation and human oversight

### Self-Check Integration Points

```bash
# Development cycle with self-validation
/orchestrator "Build authentication system with automated requirement validation"

# Post-implementation validation
/orchestrator "check-tasks feature-implementation --validate-requirements"

# Quality gate enforcement
/orchestrator "check-tasks microservices --enforce-quality-gates"
```

### Self-Check Benefits

- **Requirements Validation**: Automated verification of task completion against acceptance criteria
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
/orchestrator "pr-merge microservices-refactor --approver tech-lead --identify-next-tasks"
```

### PR Merge Benefits

- **Human Oversight**: Structured approval processes with comprehensive merge information
- **Safety Validation**: Comprehensive pre-merge checks and post-merge integrity validation
- **Risk Management**: Emergency procedures, rollback capabilities, and safety mechanisms
- **Workflow Continuation**: Next task identification and development workflow management
- **Stakeholder Communication**: Automated notifications and project management integration
- **Quality Assurance**: Merge strategy selection and comprehensive validation framework
