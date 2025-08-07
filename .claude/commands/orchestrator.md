---
description: Orchestrator command that intelligently analyzes project state and delegates to appropriate development phase
argument-hint: [optional feature description or workflow command]
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash, Glob, Grep, LS
---

# Orchestrator Command

Intelligent orchestrator that automatically detects project state and continues development workflow from the appropriate phase using task-based progression.

## Quality Commitment

**We make no compromises in creating high-quality products. We build exceptional products that adhere to specifications with uncompromising excellence.**

This orchestrator is designed to deliver enterprise-grade development workflows with the highest standards of quality, testing, and architectural integrity.

## Purpose

This command serves as the single entry point for all development workflows by:

1. **Analyzing project state** (checking existing specifications, tasks.md files, code)
2. **Determining next phase** (identifying what needs to be done next)  
3. **Enforcing human approval checkpoints** (NEVER bypassing approval gates)
4. **Delegating to appropriate agent** (executing the right workflow)
5. **Maintaining continuity** (preserving context between phases)

## 🚨 Approval Management

**Core Rule**: Never proceed to implementation or next workflow without explicit human approval.

### Approval Requirements:

1. **Before TDD Implementation**: Implementation task approval required
2. **Before Next Workflow**: Current workflow completion approval required  
3. **Implementation Directory**: All code must be created in `projects/{project-name}/src/` directory

### Approval Process:
- Check if current phase requires approval
- Present comprehensive review materials to user
- Wait for explicit "yes" or "approved" confirmation
- Proceed only after receiving approval
- Log all approval decisions for audit trail

## 🔄 Complete Workflow Management

**Full Development Flow**: kiro-sdd → coding → refactoring → testing → pr → acceptance

This orchestrator executes the complete flow through approvals, never stopping at single workflow.

1. **Workflow Completion Detection**: Detect approval completion of each phase
2. **Multi-Agent Phase Execution**: Execute ALL defined phases within each workflow using appropriate agents
3. **Automatic Next Phase Start**: Execute next workflow immediately after approval
4. **Progress Visualization**: Display current position and remaining phases
5. **Continue Until Acceptance**: Never stop before final acceptance approval

## 🤖 Multi-Agent Execution Strategy

**Within Each Workflow**: Execute ALL defined phases sequentially using the specified agents:

### Coding Workflow Example:
- **Phase 1**: research-agent (technology research using MCP integrations)
- **Phase 2**: planning-agent (architecture and implementation strategy)
- **Phase 3**: serena-onboarding-agent (Serena MCP initialization)
- **Phase 4**: tdd-agent (TDD Red-Green-Refactor cycles)
- **Phase 5**: implementation-agent (complete TDD-based implementation)
- **Phase 6**: testing-agent (comprehensive testing strategy)
- **Phase 7**: documentation-agent (generate comprehensive documentation)
- **Phase 8**: Human approval checkpoint

**CRITICAL**: Do NOT execute only tdd-agent. Execute the COMPLETE workflow sequence using ALL specified agents in the correct order.

### Agent Selection Criteria:

**When to use research-agent**:
- New features requiring technology research
- Need to evaluate libraries, frameworks, or best practices
- Complex projects requiring architectural decisions

**When to use planning-agent**:
- After research phase completion
- Need to create implementation strategy
- Architecture design required

**When to use serena-onboarding-agent**:
- Before any implementation begins
- Need to establish project context in Serena MCP
- Setting up TDD development environment

**When to use tdd-agent**:
- After Serena onboarding completion
- Implementing core functionality using Red-Green-Refactor cycles
- Building test-driven foundation

**When to use implementation-agent**:
- After TDD cycles create foundation
- Need to complete full production implementation
- Expanding functionality while maintaining tests

**When to use testing-agent**:
- After implementation completion
- Need comprehensive testing strategy beyond TDD
- Integration and E2E test requirements

**When to use documentation-agent**:
- After implementation and testing completion
- Need API documentation, tutorials, examples
- Final documentation before approval

```
🎯 Flow Progress: [✅ kiro-sdd] [✅ coding] [🔄 refactoring] [ ] testing [ ] pr [ ] acceptance
```

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
# Continue from where you left off - executes complete flow
/orchestrator

# Force specific phase
/orchestrator "continue coding user-auth-system"

# Start new feature - automatically executes kiro-sdd → coding → refactoring → testing → pr → acceptance
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

## CC-Deck Workflow Engine Integration

### Enhanced Workflow Orchestration

The orchestrator now integrates with the CC-Deck Workflow Engine to provide advanced workflow composition and smart context propagation capabilities as designed in `docs/CC-DECK-DESIGN.md`.

#### Workflow-Driven Execution

When complex workflows are detected or explicitly requested, the orchestrator leverages workflow definitions from `.cc-deck/config/workflows/` to execute sophisticated multi-agent processes:

```bash
# Workflow-driven execution examples
/orchestrator                              # Intelligent workflow selection
/orchestrator "kiro-sdd user authentication"  # Explicit Kiro SDD workflow
/orchestrator "coding REST API service"        # Coding workflow
/orchestrator "refactoring legacy-system"      # Refactoring workflow
```

#### Smart Context Propagation

The orchestrator maintains workflow context across agent executions using the Smart Context system:

- **Context Persistence**: Workflow state saved in `.cc-deck/runtime/context/`
- **Cross-Agent Communication**: Results propagated between agents automatically
- **Resume Capability**: Interrupted workflows can be resumed from checkpoints
- **Progress Tracking**: Real-time visibility into workflow progression

### Workflow Selection Logic

The orchestrator uses intelligent analysis to select appropriate workflows:

```yaml
Workflow Selection Rules:
  project_analysis:
    - has_kiro_specs: kiro-sdd-workflow
    - code_quality_issues: refactoring-workflow
    - test_coverage_low: testing-workflow
    - new_development: coding-workflow
    - pr_creation_needed: pr-workflow
    - stakeholder_review_required: acceptance-workflow

  explicit_keywords:
    - "kiro|sdd|spec": kiro-sdd-workflow
    - "code|coding|implement": coding-workflow
    - "refactor|clean|optimize": refactoring-workflow
    - "test|testing|quality": testing-workflow
    - "pr|pull.request|merge": pr-workflow
    - "accept|approval|review": acceptance-workflow
```

### Implementation Strategy

The CC-Deck integration follows a **gradual enhancement approach**:

#### Phase 1: Basic Workflow Engine (Current)

- Load and parse workflow definitions from `.cc-deck/config/workflows/`
- Implement Smart Context for state management
- Basic sequential phase execution with agent delegation

#### Phase 2: Advanced Features (Next)

- Task-driven execution with `tasks.md` integration
- Conditional workflow branching and parallel execution
- Error handling and recovery mechanisms

#### Phase 3: Full Integration (Future)

- Advanced monitoring and analytics
- Workflow visualization and debugging
- Performance optimization and caching

### Workflow Engine Implementation

When workflow execution is triggered, the orchestrator implements the following core logic:

```python
def execute_workflow_engine(workflow_name, feature_name, arguments):
    # 1. Load workflow definition
    workflow_def = load_workflow_definition(f".cc-deck/config/workflows/{workflow_name}.yaml")

    # 2. Initialize or load Smart Context
    context = SmartContext(workflow_name, feature_name)
    context.load_existing_state()

    # 3. Determine starting phase
    current_phase = determine_current_phase(workflow_def, context)

    # 4. Execute workflow phases
    while current_phase:
        phase_def = workflow_def.phases[current_phase]

        # Phase-specific execution
        if phase_def.type == "task_driven":
            result = execute_task_driven_phase(phase_def, context)
        elif phase_def.type == "conditional":
            current_phase = evaluate_conditional_branch(phase_def, context)
            continue
        elif phase_def.type == "interactive_selection":
            current_phase = execute_interactive_selection(phase_def, context)
            continue
        else:
            result = execute_standard_phase(phase_def, context)

        # Update context and handle results
        context.update_phase_output(current_phase, result)

        # Handle approvals if required
        if phase_def.approval_required:
            approval = handle_approval_workflow(current_phase, result)
            if not approval.approved:
                return handle_rejection_feedback(approval, context)

        # Progress to next phase
        current_phase = determine_next_phase(phase_def, context)
        context.save_state()

    return generate_completion_report(context)

def execute_interactive_selection(phase_def, context):
    """Execute interactive selection phase with user prompts"""
    if not phase_def.get("prompt_user", False):
        # If auto-select conditions are met, use automatic selection
        auto_select = phase_def.get("auto_select", {})
        if auto_select.get("condition") and evaluate_condition(auto_select["condition"], context):
            selected_option = auto_select["selection"]
            # Find the matching option
            for option in phase_def.options:
                if option["id"] == selected_option:
                    context.update_selection_result(phase_def["name"], option)
                    return option["next_phase"]
    
    # Build interactive prompt
    prompt = f"\n{'='*60}\n"
    prompt += f"📋 {phase_def['description']}\n"
    prompt += f"{'='*60}\n\n"
    
    # Add context-based recommendations
    selection_context = phase_def.get("selection_context", {})
    for key, condition in selection_context.items():
        if evaluate_condition(condition, context):
            if key == "tdd_recommended":
                prompt += "🔴 TDD approach is RECOMMENDED for this project based on:\n"
                prompt += "   • High complexity or security-critical requirements detected\n\n"
            elif key == "standard_suitable":
                prompt += "⚡ Standard approach is SUITABLE for this project based on:\n"
                prompt += "   • Rapid prototyping or simple CRUD requirements detected\n\n"
    
    # Display options
    prompt += "Available implementation approaches:\n\n"
    for i, option in enumerate(phase_def.options, 1):
        prompt += f"{i}. **{option['name']}**\n"
        prompt += f"   {option['description']}\n"
        
        if option.get("recommended_when"):
            prompt += f"   📌 Recommended when:\n"
            for item in option["recommended_when"]:
                prompt += f"      • {item}\n"
        
        if option.get("benefits"):
            prompt += f"   ✅ Benefits:\n"
            for item in option["benefits"]:
                prompt += f"      • {item}\n"
        prompt += "\n"
    
    prompt += "Please select an approach (1 or 2): "
    
    # Present to user and get selection
    print(prompt)
    try:
        selection = int(input()) - 1
        if 0 <= selection < len(phase_def.options):
            selected_option = phase_def.options[selection]
            context.update_selection_result(phase_def["name"], selected_option)
            
            print(f"\n✅ Selected: {selected_option['name']}")
            print(f"Proceeding to: {selected_option['next_phase']}")
            
            return selected_option["next_phase"]
        else:
            print("❌ Invalid selection. Defaulting to first option.")
            selected_option = phase_def.options[0]
            context.update_selection_result(phase_def["name"], selected_option)
            return selected_option["next_phase"]
    except (ValueError, KeyboardInterrupt):
        print("❌ Invalid input. Defaulting to first option.")
        selected_option = phase_def.options[0]
        context.update_selection_result(phase_def["name"], selected_option)
        return selected_option["next_phase"]

def execute_task_driven_phase(phase_def, context):
    """Execute tasks.md based implementation phase"""
    tasks_file = phase_def.source.replace("${feature_name}", context.feature_name)

    if not file_exists(tasks_file):
        return {"error": f"Tasks file not found: {tasks_file}"}

    tasks = parse_tasks_md(tasks_file)
    incomplete_tasks = [t for t in tasks if not t.completed]

    execution_strategy = phase_def.execution_strategy
    if execution_strategy.type == "sequential_with_parallel_groups":
        return execute_parallel_task_groups(incomplete_tasks, phase_def, context)
    else:
        return execute_sequential_tasks(incomplete_tasks, phase_def, context)

def execute_sequential_tasks(tasks, phase_def, context):
    """Execute tasks sequentially with agent selection"""
    results = []

    for task in tasks:
        # Intelligent agent selection based on task content
        selected_agent = select_agent_for_task(task, phase_def)

        # Prepare task context
        task_context = {
            "task_id": task.id,
            "task_description": task.description,
            "requirements": task.requirements,
            "project_context": context.get_relevant_context(),
            "previous_results": results[-3:]  # Last 3 results for context
        }

        # Execute task with selected agent
        task_result = Task(
            subagent_type=selected_agent,
            description=f"Execute task {task.id}",
            prompt=build_task_prompt(task, task_context)
        )

        # Process results and update task status
        if task_result.success:
            update_task_checkbox(tasks_file, task.id, completed=True)
            results.append({
                "task_id": task.id,
                "agent": selected_agent,
                "result": task_result,
                "files_created": task_result.files_created,
                "timestamp": datetime.now().isoformat()
            })

            # Create checkpoint every 5 tasks
            if len(results) % 5 == 0:
                create_workflow_checkpoint(context, f"task_{task.id}_completed")
        else:
            return handle_task_failure(task, task_result, context)

    return {
        "phase": "implementation",
        "status": "completed",
        "tasks_completed": len(results),
        "results": results
    }

def select_agent_for_task(task, phase_def):
    """Select appropriate agent based on task content"""
    agent_rules = phase_def.task_execution.agent_selection_rules
    task_desc_lower = task.description.lower()

    for rule in agent_rules:
        if "pattern" in rule:
            import re
            if re.search(rule.pattern, task_desc_lower):
                return rule.agent

    return phase_def.task_execution.default_agent

def evaluate_condition(condition_str, context):
    """Evaluate a condition string against the context"""
    try:
        # Simple condition evaluation - in production this should be more secure
        # Replace context references with actual values
        context_data = context.data.get("context_data", {})
        
        # Replace common patterns
        condition_str = condition_str.replace("context.complexity === 'high'", 
                                            str(context_data.get("complexity") == "high"))
        condition_str = condition_str.replace("context.security_critical === true",
                                            str(context_data.get("security_critical") == True))
        condition_str = condition_str.replace("context.financial_system === true",
                                            str(context_data.get("financial_system") == True))
        condition_str = condition_str.replace("context.rapid_prototype === true",
                                            str(context_data.get("rapid_prototype") == True))
        condition_str = condition_str.replace("context.simple_crud === true",
                                            str(context_data.get("simple_crud") == True))
        condition_str = condition_str.replace("context.implementation_approach !== undefined",
                                            str(context_data.get("implementation_approach") is not None))
        condition_str = condition_str.replace("context.implementation_approach",
                                            f"'{context_data.get('implementation_approach', '')}'")
        
        # Handle OR conditions
        condition_str = condition_str.replace(" OR ", " or ")
        
        # Evaluate the condition
        return eval(condition_str)
    except Exception as e:
        print(f"Warning: Failed to evaluate condition '{condition_str}': {e}")
        return False

def load_workflow_definition(workflow_path):
    """Load and validate workflow definition"""
    if not file_exists(workflow_path):
        raise WorkflowDefinitionError(f"Workflow definition not found: {workflow_path}")

    try:
        import yaml
        with open(workflow_path, 'r') as f:
            workflow_def = yaml.safe_load(f)

        # Basic validation
        validate_workflow_definition(workflow_def)
        return workflow_def

    except Exception as e:
        raise WorkflowDefinitionError(f"Invalid workflow definition: {e}")

class SmartContext:
    """Smart Context management for workflow state and agent communication"""

    def __init__(self, workflow_name, feature_name=None):
        self.workflow_name = workflow_name
        self.feature_name = feature_name or "default"
        self.workflow_id = f"{workflow_name}-{self.feature_name}-{datetime.now().strftime('%Y%m%d')}"
        self.context_file = f".cc-deck/runtime/context/{self.workflow_id}.json"
        self.data = {
            "workflow_name": workflow_name,
            "feature_name": self.feature_name,
            "workflow_id": self.workflow_id,
            "created_at": datetime.now().isoformat(),
            "current_phase": None,
            "completed_phases": [],
            "phase_outputs": {},
            "task_progress": {},
            "context_data": {}
        }

    def load_existing_state(self):
        """Load existing workflow state if available"""
        if file_exists(self.context_file):
            try:
                with open(self.context_file, 'r') as f:
                    import json
                    loaded_data = json.load(f)
                    self.data.update(loaded_data)
                    return True
            except Exception as e:
                # If context file is corrupted, start fresh but log the issue
                log_warning(f"Could not load existing context: {e}")
        return False

    def save_state(self):
        """Persist current workflow state"""
        ensure_directory_exists(os.path.dirname(self.context_file))
        self.data["updated_at"] = datetime.now().isoformat()

        try:
            with open(self.context_file, 'w') as f:
                import json
                json.dump(self.data, f, indent=2)
        except Exception as e:
            log_error(f"Failed to save workflow context: {e}")

    def update_phase_output(self, phase_name, output):
        """Update context with phase execution results"""
        self.data["phase_outputs"][phase_name] = output
        if phase_name not in self.data["completed_phases"]:
            self.data["completed_phases"].append(phase_name)
        self.data["current_phase"] = phase_name

    def get_relevant_context(self):
        """Get context relevant for current task execution"""
        return {
            "project_info": {
                "feature_name": self.feature_name,
                "workflow_type": self.workflow_name
            },
            "previous_outputs": self.data["phase_outputs"],
            "completed_phases": self.data["completed_phases"],
            "task_progress": self.data.get("task_progress", {})
        }

    def update_selection_result(self, phase_name, selected_option):
        """Update context with user selection results"""
        if "user_selections" not in self.data:
            self.data["user_selections"] = {}
        
        self.data["user_selections"][phase_name] = {
            "selected_id": selected_option["id"],
            "selected_name": selected_option["name"],
            "next_phase": selected_option["next_phase"],
            "timestamp": datetime.now().isoformat()
        }
        
        # Update context data for future condition evaluations
        if selected_option["id"] == "tdd_approach":
            self.data["context_data"]["implementation_approach"] = "tdd"
        elif selected_option["id"] == "standard_approach":
            self.data["context_data"]["implementation_approach"] = "standard"
```

### Integration with Existing Systems

The CC-Deck Workflow Engine maintains full compatibility with existing orchestrator functionality:

#### Kiro SDD Integration

- **Preserves** existing `.kiro/` directory structure
- **Enhances** tasks.md parsing and checkbox management
- **Maintains** compatibility with kiro_status.json
- **Extends** with Smart Context for cross-phase communication

#### Agent Integration

- **Utilizes** existing sub-agent definitions without modification
- **Enhances** with intelligent agent selection based on task content
- **Provides** richer context to agents through Smart Context
- **Maintains** existing Task() delegation patterns

### Error Handling and Recovery

The workflow engine includes comprehensive error handling:

```python
def handle_workflow_error(error, phase_name, context):
    """Handle workflow execution errors with recovery strategies"""

    # Log error details
    log_error(f"Workflow error in phase {phase_name}: {error}")

    # Create error checkpoint
    create_error_checkpoint(context, phase_name, error)

    # Determine recovery strategy
    if isinstance(error, AgentExecutionError):
        return retry_agent_execution(phase_name, context)
    elif isinstance(error, TaskFailureError):
        return handle_task_failure_recovery(error, context)
    elif isinstance(error, ApprovalTimeoutError):
        return handle_approval_timeout(error, context)
    else:
        return escalate_to_user(error, context)

def create_workflow_checkpoint(context, checkpoint_name):
    """Create recovery checkpoint for workflow state"""
    checkpoint_data = {
        "checkpoint_name": checkpoint_name,
        "timestamp": datetime.now().isoformat(),
        "workflow_context": context.data.copy(),
        "file_state": capture_file_checksums()
    }

    checkpoint_file = f".cc-deck/runtime/checkpoints/{context.workflow_id}-{checkpoint_name}.json"
    ensure_directory_exists(os.path.dirname(checkpoint_file))

    with open(checkpoint_file, 'w') as f:
        json.dump(checkpoint_data, f, indent=2)
```

### Usage Examples

#### Basic Workflow Execution

```bash
# Intelligent workflow selection based on project state
/orchestrator

# Explicit workflow with feature specification
/orchestrator "kiro-sdd user-authentication-system"

# Resume interrupted workflow
/orchestrator "resume user-authentication-system"
```

#### Advanced Workflow Control

```bash
# Force specific workflow regardless of project state
/orchestrator "workflow:coding feature:payment-api"

# Execute specific phase of workflow
/orchestrator "phase:implementation feature:user-auth"

# Workflow with custom parameters
/orchestrator "kiro-sdd mobile-app --tdd-approach --parallel-tasks=3"
```

The CC-Deck Workflow Engine integration represents a significant enhancement to the orchestrator's capabilities while maintaining full backward compatibility with existing functionality.

### Utility Functions and Helpers

The following utility functions support the CC-Deck Workflow Engine integration:

```python
def parse_tasks_md(tasks_file):
    """Parse tasks.md file and extract task information with checkbox status"""
    try:
        with open(tasks_file, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        return []

    tasks = []
    current_task = None

    for line_num, line in enumerate(content.split('\n'), 1):
        # Match task lines with checkbox format: - [x] or - [ ]
        task_match = re.match(r'^(\s*)- \[([ x])\]\s*(.+)', line)
        if task_match:
            indent = task_match.group(1)
            completed = task_match.group(2).lower() == 'x'
            description = task_match.group(3).strip()

            # Extract task ID if present (format: "1.1 Description" or "Phase 1: Description")
            task_id_match = re.match(r'^(\d+(?:\.\d+)*)\s+(.+)', description)
            if task_id_match:
                task_id = task_id_match.group(1)
                description = task_id_match.group(2)
            else:
                task_id = str(len(tasks) + 1)

            # Extract requirements references (_要件: X.Y_)
            requirements = []
            req_match = re.search(r'_要件:\s*([^_]+)_', description)
            if req_match:
                requirements = [req.strip() for req in req_match.group(1).split(',')]

            task = {
                'id': task_id,
                'description': description,
                'completed': completed,
                'line_number': line_num,
                'indent_level': len(indent) // 2,
                'requirements': requirements,
                'subtasks': []
            }

            tasks.append(task)
            current_task = task

    return tasks

def update_task_checkbox(tasks_file, task_id, completed=True):
    """Update specific task checkbox status in tasks.md file"""
    try:
        with open(tasks_file, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except FileNotFoundError:
        return False

    checkbox = '[x]' if completed else '[ ]'
    updated = False

    for i, line in enumerate(lines):
        # Match task line with the specific task ID
        if re.match(rf'^(\s*)- \[[x ]\]\s*{re.escape(task_id)}\s', line):
            # Replace checkbox while preserving formatting
            lines[i] = re.sub(r'^(\s*)- \[[x ]\]', rf'\1- {checkbox}', line)
            updated = True
            break

    if updated:
        try:
            with open(tasks_file, 'w', encoding='utf-8') as f:
                f.writelines(lines)
            return True
        except Exception as e:
            log_error(f"Failed to update task checkbox: {e}")

    return False

def build_task_prompt(task, task_context):
    """Build comprehensive prompt for task execution"""
    prompt = f"""# Task Execution: {task.id}

## Task Description
{task.description}

## Context Information
- **Feature**: {task_context['project_context']['project_info']['feature_name']}
- **Workflow**: {task_context['project_context']['project_info']['workflow_type']}
- **Task ID**: {task.id}

## Requirements
{', '.join(task.requirements) if task.requirements else 'No specific requirements referenced'}

## Project Context
### Completed Phases
{', '.join(task_context['project_context']['completed_phases']) if task_context['project_context']['completed_phases'] else 'None'}

### Previous Task Results (Last 3)
"""

    for result in task_context.get('previous_results', [])[-3:]:
        prompt += f"\n- **{result['task_id']}**: {result['result'].get('summary', 'Task completed')}"

    prompt += f"""

## Instructions
1. Execute this task according to the description above
2. Consider the project context and previous task results
3. Ensure your implementation aligns with the overall feature requirements
4. Create or modify files as needed for this specific task
5. Run any necessary tests to validate your implementation
6. Provide a summary of what was accomplished

## Expected Output
- **Files created/modified**: List any files you create or modify
- **Tests run**: Describe any tests executed and their results
- **Summary**: Brief description of what was accomplished
- **Next recommendations**: Any suggestions for subsequent tasks

Please proceed with implementing this task.
"""

    return prompt

def determine_current_phase(workflow_def, context):
    """Determine the current phase based on workflow definition and context"""
    completed_phases = context.data.get('completed_phases', [])

    if not completed_phases:
        # Start with first phase
        return workflow_def['phases'][0]['name']

    # Find next uncompleted phase
    for phase in workflow_def['phases']:
        if phase['name'] not in completed_phases:
            return phase['name']

    # All phases completed
    return None

def determine_next_phase(phase_def, context):
    """Determine next phase based on current phase definition and context"""
    if 'next_phase' in phase_def:
        return phase_def['next_phase']

    # Find current phase in workflow and return next one
    workflow_def = context.workflow_def
    current_phase_name = phase_def['name']

    for i, phase in enumerate(workflow_def['phases']):
        if phase['name'] == current_phase_name:
            if i + 1 < len(workflow_def['phases']):
                return workflow_def['phases'][i + 1]['name']

    return None

def file_exists(file_path):
    """Check if file exists"""
    import os
    return os.path.exists(file_path)

def ensure_directory_exists(directory_path):
    """Ensure directory exists, create if necessary"""
    import os
    os.makedirs(directory_path, exist_ok=True)

def log_error(message):
    """Log error message"""
    print(f"ERROR: {message}")

def log_warning(message):
    """Log warning message"""
    print(f"WARNING: {message}")

def validate_workflow_definition(workflow_def):
    """Basic validation of workflow definition structure"""
    required_fields = ['name', 'phases']
    for field in required_fields:
        if field not in workflow_def:
            raise ValueError(f"Missing required field: {field}")

    if not isinstance(workflow_def['phases'], list) or len(workflow_def['phases']) == 0:
        raise ValueError("Workflow must have at least one phase")

    for phase in workflow_def['phases']:
        if 'name' not in phase:
            raise ValueError("Each phase must have a name")

class WorkflowDefinitionError(Exception):
    """Exception raised for workflow definition errors"""
    pass
```

### Orchestrator Main Logic Integration

The orchestrator's main execution logic now incorporates workflow engine detection and routing:

```python
def main_orchestrator_logic(arguments=None):
    """Main orchestrator execution with CC-Deck Workflow Engine integration"""

    # Parse arguments for workflow hints
    workflow_hint, feature_name = parse_orchestrator_arguments(arguments)

    # Analyze project state
    project_state = analyze_project_state()

    # Determine if workflow engine should be used
    if should_use_workflow_engine(workflow_hint, project_state):
        # Route to CC-Deck Workflow Engine
        workflow_name = select_workflow(workflow_hint, project_state)
        return execute_workflow_engine(workflow_name, feature_name, arguments)
    else:
        # Use traditional orchestrator logic (existing functionality)
        return execute_traditional_orchestration(arguments, project_state)

def parse_orchestrator_arguments(arguments):
    """Parse orchestrator arguments for workflow and feature information"""
    if not arguments:
        return None, None

    args = str(arguments).lower()

    # Extract workflow hints
    workflow_hint = None
    if any(keyword in args for keyword in ['kiro', 'sdd', 'spec']):
        workflow_hint = 'kiro-sdd'
    elif any(keyword in args for keyword in ['code', 'coding', 'implement']):
        workflow_hint = 'coding'
    elif any(keyword in args for keyword in ['refactor', 'clean', 'optimize']):
        workflow_hint = 'refactoring'
    elif any(keyword in args for keyword in ['test', 'testing', 'quality']):
        workflow_hint = 'testing'

    # Extract feature name (simple heuristic)
    # Look for common feature naming patterns
    feature_patterns = [
        r'(?:feature[:\s]+)?([a-z][a-z0-9-]+(?:-[a-z][a-z0-9-]*)*)',
        r'([a-z][a-z0-9]+(?:[A-Z][a-z0-9]*)*)',  # camelCase
    ]

    feature_name = None
    for pattern in feature_patterns:
        match = re.search(pattern, arguments, re.IGNORECASE)
        if match:
            feature_name = match.group(1).lower().replace(' ', '-')
            break

    return workflow_hint, feature_name

def should_use_workflow_engine(workflow_hint, project_state):
    """Determine if workflow engine should be used based on context"""
    # Use workflow engine if explicitly requested
    if workflow_hint:
        return True

    # Use workflow engine for complex project states
    complexity_indicators = [
        project_state.get('has_kiro_specs', False),
        project_state.get('multiple_active_features', False),
        project_state.get('requires_multi_agent_coordination', False)
    ]

    return any(complexity_indicators)

def select_workflow(workflow_hint, project_state):
    """Select appropriate workflow based on hints and project analysis"""
    if workflow_hint:
        return f"{workflow_hint}-workflow"

    # Default workflow selection based on project state
    if project_state.get('has_kiro_specs'):
        return 'kiro-sdd-workflow'
    elif project_state.get('needs_implementation'):
        return 'coding-workflow'
    elif project_state.get('code_quality_issues'):
        return 'refactoring-workflow'
    else:
        return 'kiro-sdd-workflow'  # Default to Kiro SDD

def analyze_project_state():
    """Analyze current project state for workflow selection"""
    state = {
        'has_kiro_specs': file_exists('.kiro/specs') and len(glob_pattern('.kiro/specs/*')) > 0,
        'has_incomplete_tasks': False,
        'code_quality_issues': False,
        'needs_implementation': False,
        'multiple_active_features': False
    }

    # Check for incomplete tasks
    if state['has_kiro_specs']:
        for spec_dir in glob_pattern('.kiro/specs/*'):
            tasks_file = f"{spec_dir}/tasks.md"
            if file_exists(tasks_file):
                tasks = parse_tasks_md(tasks_file)
                if any(not task['completed'] for task in tasks):
                    state['has_incomplete_tasks'] = True
                    state['needs_implementation'] = True
                    break

    return state

def glob_pattern(pattern):
    """Simple glob pattern matching"""
    import glob
    return glob.glob(pattern)
```

This integration maintains full backward compatibility while providing the advanced workflow orchestration capabilities designed in the CC-Deck Workflow Engine.
