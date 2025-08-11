---
description: Enterprise orchestrator command with intelligent project analysis, unified monitoring, and comprehensive error handling
argument-hint: [optional feature description or workflow command]
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash, Glob, Grep, LS
---

# Enterprise Orchestrator Command

Intelligent orchestrator with enterprise-grade monitoring, unified quality assurance, and comprehensive error handling that automatically detects project state and continues development workflow from the appropriate phase using task-based progression.

## Initial Setup: Current Date Information

**CRITICAL**: Always start by calling the date-utility agent to get accurate current date and time information for proper timestamping, search queries, and time-sensitive operations.

```bash
# First action: Get current date information
Task(subagent_type="date-utility", description="Get current date information", prompt="Please provide current date and time information for use in this orchestrator session, including search-appropriate year formatting.")

# Second action: User interaction guidelines reminder
Task(subagent_type="user-interaction-reminder", description="User interaction guidelines", prompt="Provide critical reminders about proper user interaction protocols for this orchestration session.")
```


## Enterprise Quality Commitment

**We make no compromises in creating high-quality products. We build exceptional products that adhere to specifications with uncompromising excellence.**

This orchestrator is designed to deliver enterprise-grade development workflows with:

- **Unified Monitoring**: Real-time performance metrics and proactive alerting
- **5-Dimension Quality Assurance**: Functional, Technical, Process, UX, Operational quality evaluation
- **6-Category Error Handling**: Comprehensive error classification with automatic recovery strategies
- **Complete Audit Trail**: Full traceability with encryption and access control

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

**New Projects Flow**: kiro-sdd → dev-env-setup → coding → refactoring → testing → pr → acceptance
**Existing Projects Flow**: refactoring → testing → pr → acceptance (or coding → ... if major features)

This orchestrator executes the complete flow through approvals, never stopping at single workflow. It automatically detects existing projects in the `projects/` directory and adapts workflow selection accordingly.

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

### Refactoring Workflow Example:

- **Phase 1**: pattern-detector (identify duplicate and similar code patterns)
- **Phase 2**: code-analyzer (analyze code structure and dependencies)
- **Phase 3**: Intelligent routing to refactoring agent:
  - serena-mcp-refactoring (complex semantic analysis)
  - similarity-refactoring (pattern-based consolidation)
  - refactoring-implementer (standard code improvements)
- **Phase 4**: quality-validator (comprehensive validation of results)
- **Phase 5**: Human approval checkpoint

### Testing Workflow Example:

- **Phase 1**: test-strategy-planner (develop comprehensive testing strategy)
- **Phase 2**: test-environment-manager (set up and configure test environments)
- **Phase 3**: Intelligent routing to testing agent:
  - integration-test (API testing, service integration)
  - e2e-test (end-to-end user journey testing)
- **Phase 4**: test-executor (execute tests with monitoring and recovery)
- **Phase 5**: test-reporter (generate comprehensive test reports and analysis)
- **Phase 6**: Human approval checkpoint

### PR Workflow Example:

- **Phase 1**: pr-analyzer (analyze code changes and assess impact)
- **Phase 2**: pr-generator (generate high-quality PR content)
- **Phase 3**: pr-validator (validate PR quality and readiness)
- **Phase 4**: pr-create (create pull request with metadata)
- **Phase 5**: merge-approver (prepare for merge and facilitate approval)
- **Phase 6**: merge-executor (execute safe PR merge)
- **Phase 7**: post-merge-manager (post-merge activities and cleanup)
- **Phase 8**: Human approval checkpoint

### Acceptance Workflow Example:

- **Phase 1**: acceptance-reviewer (prepare comprehensive review materials)
- **Phase 2**: Human review and decision (72-hour stakeholder review)
- **Phase 3**: Conditional routing (approved → completion, rejected → feedback analysis)
- **Phase 4**: feedback-analyzer (systematic rejection feedback analysis)
- **Phase 5**: phase-coordinator (coordinate rollback and re-execution)
- **Phase 6**: Final completion or re-execution monitoring

**CRITICAL**: Do NOT execute only the final agent in each workflow. Execute the COMPLETE workflow sequence using ALL specified agents in the correct order.

## 🔄 Manual Workflow Control

**After Each Workflow Approval**: Request explicit user confirmation before proceeding to the next workflow.

### Controlled Progression Process:

1. **Current Workflow Completion**: Complete all phases within the current workflow
2. **Human Approval**: Present comprehensive review materials and wait for approval
3. **Next Workflow Confirmation**: After approval, explicitly ask for permission to proceed to next workflow
4. **User Decision**: Wait for clear "yes/proceed/continue" confirmation before starting next workflow
5. **Next Workflow Start**: Only after explicit confirmation, execute the next workflow

**CRITICAL**: Never automatically proceed to the next workflow without explicit user confirmation, even after approval.

## 🤔 Interactive Workflow Confirmation

**Enhanced User Experience**: The orchestrator now presents workflow analysis and requests confirmation before execution.

### Confirmation Process:

1. **Project Analysis**: Analyze current project state and available options
2. **Workflow Recommendations**: Present recommended workflow with clear rationale
3. **Alternative Options**: Show alternative workflows with explanations
4. **User Confirmation**: Wait for explicit user choice before proceeding
5. **Execution**: Run confirmed workflow with full transparency

### Example Confirmation Flow:

```
📊 Project Analysis Complete

Current State:
- Existing projects detected: stylish-cafe-website/
- Project files found: package.json, tailwind.config.js, next.config.js
- Kiro specs: 1 active specification
- Code quality: Assessment needed

🎯 Recommended Workflow: REFACTORING
Rationale: Existing project detected with established codebase. Starting with code quality assessment and improvements will establish baseline before adding new features.

Alternative Options:
1. CODING - Add new features immediately (skip quality assessment)
2. KIRO-SDD - Create new specification for major feature additions
3. TESTING - Focus on comprehensive testing first

❓ Which workflow would you like to execute?
[1] Proceed with REFACTORING (recommended)
[2] Use CODING workflow
[3] Use KIRO-SDD workflow
[4] Use TESTING workflow
[5] Show detailed analysis

Please select 1-5 or type workflow name:
```

### Controlled Workflow Chain:

```
coding workflow approval → ASK PERMISSION → refactoring workflow
refactoring workflow approval → ASK PERMISSION → testing workflow
testing workflow approval → ASK PERMISSION → pr workflow
pr workflow approval → ASK PERMISSION → acceptance workflow
acceptance workflow approval → Project completion
```

### Implementation Logic:

1. **Complete Current Workflow**: Execute all phases within current workflow
2. **Wait for Human Approval**: Present comprehensive review materials
3. **Present Clear Options**: Display Y/R/S choices with explanations
4. **Wait for User Selection**: Accept Y, R, or S response from user
5. **Execute Based on Choice**: 
   - Y: Start next workflow immediately
   - R: Rollback to specification revision phase
   - S: Save state and terminate session for later resumption

**CRITICAL**: Always use the standardized Y/R/S options format for workflow transitions.

### Standardized Transition Message Format

For ALL workflow completions, use this exact format:

```
✅ [Workflow Name] completed successfully!
Ready to [next action]?

[Y] Yes, [proceed with next workflow]
[R] Review [current workflow] (regenerate/revise current phase)
[S] Save and resume later (auto-detect with next /orchestrator)
```

**Examples for different workflows:**
- Kiro SDD → Coding: "Ready to start implementation?"
- Coding → Refactoring: "Ready to improve code quality?"  
- Refactoring → Testing: "Ready to run comprehensive tests?"
- Testing → PR: "Ready to create pull request?"

### Practical Implementation:

```bash
# After Kiro SDD workflow completion and approval:
# 1. Present completion confirmation with standardized Y/R/S format:

✅ Kiro SDD specification completed successfully!
Ready to start implementation?

[Y] Yes, start implementation
[R] Review specifications (regenerate Requirements/Design)  
[S] Save and resume later (auto-detect with next /orchestrator)

# 2. Wait for Y, R, or S selection
# 3. Execute appropriate action:
#    - Y: Execute /coding workflow immediately
#    - R: Rollback to kiro-spec-requirements or kiro-spec-design phase
#    - S: Save workflow state to .cc-deck/runtime/checkpoints/ and terminate session
#
# 4. For [S] option, display confirmation message:
💾 Workflow state saved successfully!
Next time, run /orchestrator to auto-detect and resume.

Session terminated...

# Example execution flow:
coding → approval → refactoring → approval → testing → approval → pr → approval → acceptance → completion
```

### Workflow Configuration Reading:

Always reference the YAML files in `.cc-deck/config/workflows/` to determine the next workflow:

- `kiro-sdd.yaml` → `next_workflow: dev-env-setup` → Execute `/dev-env-setup` command
- `dev-env-setup.yaml` → `next_workflow: coding` → Execute `/coding` command
- `coding.yaml` → `next_workflow: refactoring` → Execute `/refactoring` command
- `refactoring.yaml` → `next_workflow: testing` → Execute `/testing` command
- `testing.yaml` → `next_workflow: pr` → Execute `/pr` command
- `pr.yaml` → `next_workflow: acceptance` → Execute `/acceptance` command
- `acceptance.yaml` → No next workflow (final completion)

### Automatic Workflow Execution Commands:

After each approval, immediately execute the corresponding workflow command:

```bash
# Workflow progression commands:
/dev-env-setup  # After kiro-sdd approval - creates project-specific configuration
/coding        # After dev-env-setup approval
/refactoring   # After coding approval
/testing       # After refactoring approval
/pr            # After testing approval
/acceptance    # After pr approval
```

**Important**: Use these custom slash commands, not Task() calls, for workflow progression.

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

  1. Check Dev-Env-Setup Status:
    - Complete Kiro specs + Missing dynamic config → Execute dev-env-setup workflow
    - Projects/* exists + No .cc-deck/config/workflows/dynamic/{project-id}/ → Execute dev-env-setup workflow
    - Ready-for-implementation + No project-specific configuration → Execute dev-env-setup workflow

  2. Check Specifications:
    - No specs → Start with Kiro Steering
    - Incomplete spec → Resume from last phase
    - Complete spec → Check implementation status

  3. Validate State Consistency:
    - Compare kiro_status.json with actual project state
    - Detect implementation ahead of kiro status
    - Detect approval blocks preventing progression
    - Auto-sync status when implementation detected

  4. Check Implementation (tasks.md):
    - No tasks.md → Create tasks from specs
    - Incomplete tasks → Continue with next uncompleted task
    - All tasks completed → Ready for next feature/enhancement
    - Implementation exists but tasks unmarked → Auto-update task progress

  5. Auto-Resolve Status Inconsistencies:
    - Detect created files/code vs task completion status
    - Auto-approve completed phases when implementation verified
    - Update kiro_status.json current_phase to match reality
    - Trigger TDD-agent completion when implementation done

  6. Check Next Work:
    - All tasks complete → Analyze for new features or improvements
    - Tasks in progress → Focus on current implementation
    - Blocked tasks → Identify and resolve blockers

  7. Check Quality:
    - Implementation complete → Run tests and validation
    - Tests failing → Debug and fix issues
    - Tests passing → Mark tasks as completed

  8. Check Documentation:
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
# Interactive workflow selection with project analysis and confirmation
/orchestrator

# Force specific phase (skips confirmation)
/orchestrator "continue coding user-auth-system"

# Start new feature - shows analysis and asks for confirmation before execution
/orchestrator "Build a real-time chat application"

# Enhance existing project - analyzes current state and recommends workflow
/orchestrator "Improve stylish-cafe-website performance and add new features"

# Add features to existing project - presents options and rationale
/orchestrator "Add user authentication to existing e-commerce site"
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

### Multi-Agent Coding Integration

- **Primary Agents**: `research-agent`, `planning-agent`, `serena-onboarding-agent`, `tdd-agent`, `implementation-agent`, `testing-agent`, `documentation-agent`
- **Responsibility**: Complete development workflow orchestration from research to documentation using specialized agents
- **Benefits**: End-to-end development automation with MCP integration and best practices

### TDD-First Development Integration

```bash
# Test-Driven Development with t-wada methodology (orchestrator delegates through coding workflow)
/orchestrator "tdd 'Implement OAuth2 authentication'"

# TDD with specific testing framework (orchestrator manages multi-agent TDD workflow)
/orchestrator "tdd 'Build payment processing' --framework jest"

# Complete TDD cycle with Red-Green-Refactor (orchestrator coordinates all agents including tdd-agent)
/orchestrator "tdd 'Create user management system' --full-cycle"
```

### TDD Integration Architecture

- **Primary Orchestrator**: `/orchestrator` - Manages complete implementation workflow through multiple specialized agents
- **TDD Specialist**: `tdd-agent` - Executes Red-Green-Refactor cycles within the coding workflow
- **Responsibility**: Orchestrator coordinates all agents (research → planning → serena-onboarding → TDD → implementation → testing → documentation)
- **Benefits**: Proper separation of concerns between orchestration and specialized agent responsibilities

### Coding Integration Points

```bash
# Research-driven development
/orchestrator "coding 'Implement OAuth2 authentication' --research-first"

# Implementation with TDD approach (orchestrator automatically coordinates tdd-agent within coding workflow)
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
    - has_incomplete_tasks: coding-workflow
    - has_existing_projects + needs_enhancement: refactoring-workflow
    - has_kiro_specs (new project): kiro-sdd-workflow
    - code_quality_issues: refactoring-workflow
    - test_coverage_low: testing-workflow
    - new_development: coding-workflow
    - existing_project_default: refactoring-workflow
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
    # 1. Load workflow definition (check for project-specific merged version first)
    workflow_def = load_project_specific_workflow(workflow_name, feature_name)

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

def load_project_specific_workflow(workflow_name, project_id=None):
    """Load project-specific merged workflow if available, otherwise fallback to base workflow"""
    
    # Detect project ID if not provided
    if not project_id:
        project_id = detect_project_id()
    
    # Try project-specific merged workflow first
    if project_id:
        merged_path = f".cc-deck/config/workflows/dynamic/{project_id}/generated/{workflow_name}-merged.yaml"
        if file_exists(merged_path):
            print(f"🎯 Loading project-specific workflow: {merged_path}")
            return load_workflow_definition(merged_path)
        
        # Check if dynamic workflow config directory exists
        dynamic_config_dir = f".cc-deck/config/workflows/dynamic/{project_id}"
        if not file_exists(dynamic_config_dir):
            print(f"🔧 Dynamic workflow configuration not found for project: {project_id}")
            print(f"📦 Triggering dev-env-setup workflow to create project-specific configuration...")
            
            # Execute dev-env-setup workflow to create dynamic config
            execute_dev_env_setup_workflow(project_id, workflow_name)
            
            # Retry loading project-specific workflow after setup
            if file_exists(merged_path):
                print(f"✅ Project-specific workflow created: {merged_path}")
                return load_workflow_definition(merged_path)
    
    # Fallback to base workflow
    base_path = f".cc-deck/config/workflows/{workflow_name}.yaml"
    print(f"📋 Loading base workflow: {base_path}")
    return load_workflow_definition(base_path)

def execute_dev_env_setup_workflow(project_id, target_workflow_name):
    """Execute dev-env-setup workflow to create dynamic configuration for project"""
    
    print(f"\n🚀 Starting dev-env-setup workflow for project: {project_id}")
    print(f"🎯 Target workflow: {target_workflow_name}")
    
    # Create dynamic workflow directory structure
    dynamic_dirs = [
        f".cc-deck/config/workflows/dynamic/{project_id}",
        f".cc-deck/config/workflows/dynamic/{project_id}/extensions",
        f".cc-deck/config/workflows/dynamic/{project_id}/generated",
        f".cc-deck/config/workflows/dynamic/{project_id}/agents"
    ]
    
    for dir_path in dynamic_dirs:
        ensure_directory_exists(dir_path)
        print(f"📁 Created directory: {dir_path}")
    
    # Execute dev-env-setup command
    try:
        # Use Task to execute dev-env-setup workflow
        from datetime import datetime
        
        setup_context = {
            "project_id": project_id,
            "target_workflow": target_workflow_name,
            "dynamic_config_path": f".cc-deck/config/workflows/dynamic/{project_id}",
            "timestamp": datetime.now().isoformat()
        }
        
        print(f"⚙️ Executing dev-env-setup workflow...")
        
        # This would execute the actual dev-env-setup workflow
        # For now, we create a basic configuration structure
        create_basic_dynamic_workflow_config(project_id, target_workflow_name, setup_context)
        
        print(f"✅ Dev-env-setup workflow completed for {project_id}")
        
    except Exception as e:
        print(f"❌ Dev-env-setup workflow failed: {e}")
        print(f"⚠️  Falling back to base workflow configuration")

def create_basic_dynamic_workflow_config(project_id, workflow_name, context):
    """Create basic dynamic workflow configuration when dev-env-setup is not available"""
    
    print(f"🔧 Creating basic dynamic configuration for {project_id}")
    
    # Create extension config
    extension_config = f"""# {workflow_name.title()} Workflow Extension for {project_id}
# Generated automatically by orchestrator

name: "{workflow_name}-extension-{project_id}"
description: "Project-specific extensions for {workflow_name} workflow"

project_context:
  project_id: "{project_id}"
  generated_at: "{context['timestamp']}"
  target_workflow: "{workflow_name}"

# Project-specific customizations would be added here
# This is a basic template - actual dev-env-setup would analyze project
# and create comprehensive extensions

workflow_extensions:
  phases:
    # Additional phases specific to this project
    - name: "project-specific-setup"
      description: "Project-specific setup tasks"
      agent: "implementation-agent"
      
  task_execution:
    # Project-specific agent selection rules
    agent_selection_rules:
      - pattern: "next\\.?js|react"
        agent: "implementation-agent"
      - pattern: "tailwind|css"
        agent: "implementation-agent"
      - pattern: "typescript|ts"
        agent: "implementation-agent"
"""
    
    extension_path = f".cc-deck/config/workflows/dynamic/{project_id}/extensions/{workflow_name}-extension.yaml"
    
    try:
        with open(extension_path, 'w') as f:
            f.write(extension_config)
        print(f"📝 Created extension config: {extension_path}")
    except Exception as e:
        print(f"❌ Failed to create extension config: {e}")
    
    # Create merged workflow (basic version)
    create_basic_merged_workflow(project_id, workflow_name, context)

def create_basic_merged_workflow(project_id, workflow_name, context):
    """Create basic merged workflow configuration"""
    
    # Load base workflow
    base_path = f".cc-deck/config/workflows/{workflow_name}.yaml"
    
    if not file_exists(base_path):
        print(f"⚠️  Base workflow not found: {base_path}")
        return
    
    try:
        import yaml
        with open(base_path, 'r') as f:
            base_workflow = yaml.safe_load(f)
    except Exception as e:
        print(f"❌ Failed to load base workflow: {e}")
        return
    
    # Create merged workflow (for now, just copy base with project context)
    merged_workflow = base_workflow.copy()
    merged_workflow['project_context'] = {
        'project_id': project_id,
        'generated_at': context['timestamp'],
        'config_source': 'basic-template'
    }
    
    # Add project-specific metadata
    if 'metadata' not in merged_workflow:
        merged_workflow['metadata'] = {}
    
    merged_workflow['metadata'].update({
        'project_id': project_id,
        'dynamic_config': True,
        'generated_by': 'orchestrator-basic-setup'
    })
    
    merged_path = f".cc-deck/config/workflows/dynamic/{project_id}/generated/{workflow_name}-merged.yaml"
    
    try:
        import yaml
        with open(merged_path, 'w') as f:
            yaml.dump(merged_workflow, f, default_flow_style=False, indent=2)
        print(f"📋 Created merged workflow: {merged_path}")
    except Exception as e:
        print(f"❌ Failed to create merged workflow: {e}")

def detect_project_id():
    """Detect current project ID from various sources"""
    
    # Method 1: Check for existing dynamic workflow directories
    dynamic_dirs = glob_pattern(".cc-deck/config/workflows/dynamic/*")
    if dynamic_dirs:
        # Use the most recently modified project
        latest_project = max(dynamic_dirs, key=lambda p: os.path.getmtime(p) if os.path.exists(p) else 0)
        project_id = os.path.basename(latest_project)
        return project_id
    
    # Method 2: Check for existing projects in projects/ directory
    project_dirs = glob_pattern("projects/*")
    if project_dirs:
        # Use the most recently modified project
        latest_project = max(project_dirs, key=lambda p: os.path.getmtime(p) if os.path.exists(p) else 0)
        project_id = os.path.basename(latest_project)
        return project_id
    
    # Method 3: Check for active Kiro specs
    spec_dirs = glob_pattern(".kiro/specs/*")
    if spec_dirs:
        # Use the most recently modified spec
        latest_spec = max(spec_dirs, key=lambda p: os.path.getmtime(p) if os.path.exists(p) else 0)
        project_id = os.path.basename(latest_spec)
        return project_id
    
    # No project detected
    return None

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
        # Route to CC-Deck Workflow Engine with user confirmation
        workflow_name = select_workflow_with_confirmation(workflow_hint, project_state, arguments)
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
    
    # Also use workflow engine when dynamic configuration might be beneficial
    dynamic_config_indicators = [
        project_state.get('has_existing_projects', False),
        project_state.get('needs_project_specific_setup', False)
    ]

    return any(complexity_indicators) or any(dynamic_config_indicators)

def select_workflow_with_confirmation(workflow_hint, project_state, arguments):
    """Present task-based confirmation flow to user based on project analysis"""

    # 1. Analyze project and generate task proposal
    project_info = analyze_detailed_project_state(project_state)
    task_proposal = generate_task_proposal(project_info, arguments)

    # 2. Present project analysis
    print("📋 プロジェクト分析結果\n")
    print(f"🏗️ プロジェクト: {project_info['project_name']}")
    print(f"📍 現在の状態: {project_info['current_status']}\n")

    # 3. Present specific tasks to be executed
    print("📝 提案する実行タスク:")
    for i, task in enumerate(task_proposal['tasks'], 1):
        print(f"{i}. {task['description']}")

    if task_proposal['subtasks']:
        print("\n   詳細作業:")
        for subtask in task_proposal['subtasks']:
            print(f"   • {subtask}")

    print(f"\n🎯 期待される成果:")
    for outcome in task_proposal['expected_outcomes']:
        print(f"- {outcome}")

    print(f"\n⏱️ 実行時間目安: {task_proposal['estimated_time']}")

    # 4. Request user confirmation
    user_response = input(f"\nこのタスクを実行しますか？ (yes/no): ").strip().lower()

    if user_response in ['yes', 'y', 'はい']:
        print(f"\n✅ タスク実行を開始します...\n")
        return task_proposal['workflow_name']
    else:
        print("\n❌ タスク実行をキャンセルしました。")
        return None

def get_recommended_workflow(workflow_hint, project_state):
    """Get recommended workflow based on hints and project analysis"""
    if workflow_hint:
        return f"{workflow_hint}-workflow"

    # Default workflow selection based on project state
    if project_state.get('has_incomplete_tasks'):
        return 'coding-workflow'  # Continue incomplete implementation
    elif project_state.get('needs_enhancement') and project_state.get('has_existing_projects'):
        # Existing project enhancement - start with refactoring for quality improvement
        return 'refactoring-workflow'
    elif project_state.get('has_kiro_specs') and not project_state.get('has_existing_projects'):
        return 'kiro-sdd-workflow'  # New project specification
    elif project_state.get('needs_implementation'):
        return 'coding-workflow'
    elif project_state.get('code_quality_issues'):
        return 'refactoring-workflow'
    elif project_state.get('has_existing_projects'):
        # Default for existing projects - start with code quality assessment
        return 'refactoring-workflow'
    else:
        return 'kiro-sdd-workflow'  # Default to Kiro SDD for new projects

def analyze_detailed_project_state(basic_state):
    """Analyze detailed project state for task proposal generation"""
    project_info = {
        'project_name': 'Unknown Project',
        'current_status': 'Analysis in progress',
        'project_type': 'unknown',
        'completion_percentage': 0,
        'active_features': [],
        'technical_debt': [],
        'next_priorities': []
    }

    # Identify main project
    if basic_state.get('has_existing_projects'):
        projects = glob_pattern('projects/*')
        if projects:
            # Use the most recently modified project
            latest_project = max(projects, key=lambda p: os.path.getmtime(p) if os.path.exists(p) else 0)
            project_info['project_name'] = os.path.basename(latest_project)

            # Analyze project type and status
            project_info.update(analyze_project_details(latest_project))

    # Analyze Kiro specs status
    if basic_state.get('has_kiro_specs'):
        spec_analysis = analyze_kiro_specs_status()
        project_info.update(spec_analysis)

    # Determine current status
    project_info['current_status'] = determine_project_status(project_info, basic_state)

    return project_info

def analyze_project_details(project_dir):
    """Analyze specific project details"""
    details = {
        'project_type': 'unknown',
        'completion_percentage': 0,
        'technical_debt': [],
        'has_tests': False,
        'has_docs': False
    }

    # Check project type
    if file_exists(f"{project_dir}/package.json"):
        details['project_type'] = 'Node.js/JavaScript'
    elif file_exists(f"{project_dir}/requirements.txt"):
        details['project_type'] = 'Python'
    elif file_exists(f"{project_dir}/Cargo.toml"):
        details['project_type'] = 'Rust'
    elif file_exists(f"{project_dir}/go.mod"):
        details['project_type'] = 'Go'

    # Check for tests
    test_dirs = ['tests/', 'test/', 'src/tests/', '__tests__/']
    for test_dir in test_dirs:
        if file_exists(f"{project_dir}/{test_dir}"):
            details['has_tests'] = True
            break

    # Check for documentation
    doc_files = ['README.md', 'docs/', 'documentation/']
    for doc in doc_files:
        if file_exists(f"{project_dir}/{doc}"):
            details['has_docs'] = True
            break

    return details

def analyze_kiro_specs_status():
    """Analyze Kiro specifications status"""
    spec_status = {
        'active_features': [],
        'completion_percentage': 0
    }

    spec_dirs = glob_pattern('.kiro/specs/*')
    total_tasks = 0
    completed_tasks = 0

    for spec_dir in spec_dirs:
        feature_name = os.path.basename(spec_dir)
        tasks_file = f"{spec_dir}/tasks.md"

        if file_exists(tasks_file):
            tasks = parse_tasks_md(tasks_file)
            feature_total = len(tasks)
            feature_completed = sum(1 for task in tasks if task.get('completed', False))

            total_tasks += feature_total
            completed_tasks += feature_completed

            spec_status['active_features'].append({
                'name': feature_name,
                'progress': f"{feature_completed}/{feature_total}",
                'percentage': int((feature_completed / feature_total * 100)) if feature_total > 0 else 0
            })

    if total_tasks > 0:
        spec_status['completion_percentage'] = int((completed_tasks / total_tasks) * 100)

    return spec_status

def determine_project_status(project_info, basic_state):
    """Determine human-readable project status"""
    if basic_state.get('has_incomplete_tasks'):
        return f"実装進行中 ({project_info.get('completion_percentage', 0)}%完了)"
    elif basic_state.get('has_existing_projects') and not project_info.get('has_tests', False):
        return "基本実装完了、品質改善が必要"
    elif basic_state.get('has_existing_projects'):
        return "実装完了、拡張・改善の検討段階"
    elif basic_state.get('has_kiro_specs'):
        return "仕様策定完了、実装開始準備"
    else:
        return "新規プロジェクト開始段階"

def generate_task_proposal(project_info, user_arguments):
    """Generate specific task proposal based on project analysis and user input"""
    proposal = {
        'workflow_name': 'coding-workflow',
        'tasks': [],
        'subtasks': [],
        'expected_outcomes': [],
        'estimated_time': '1-2時間'
    }

    # Generate tasks based on project status
    if "実装進行中" in project_info['current_status']:
        proposal.update(generate_implementation_tasks(project_info, user_arguments))
    elif "品質改善が必要" in project_info['current_status']:
        proposal.update(generate_refactoring_tasks(project_info, user_arguments))
    elif "仕様策定完了" in project_info['current_status']:
        proposal.update(generate_coding_tasks(project_info, user_arguments))
    else:
        proposal.update(generate_default_tasks(project_info, user_arguments))

    return proposal

def generate_implementation_tasks(project_info, user_arguments):
    """Generate tasks for projects with incomplete implementation"""
    return {
        'workflow_name': 'coding-workflow',
        'tasks': [
            {'description': '未完了タスクの継続実装'},
            {'description': 'TDD アプローチによる機能完成'},
            {'description': '実装したコードのテスト追加'}
        ],
        'subtasks': [
            'tasks.md ファイルから未完了タスクを特定',
            'Red-Green-Refactor サイクルでの実装',
            '95%以上のテストカバレッジ確保'
        ],
        'expected_outcomes': [
            '指定機能の完全な実装',
            '高品質なテストスイート',
            '保守しやすいコードベース'
        ],
        'estimated_time': '2-4時間'
    }

def generate_refactoring_tasks(project_info, user_arguments):
    """Generate tasks for projects needing quality improvement"""
    return {
        'workflow_name': 'refactoring-workflow',
        'tasks': [
            {'description': 'コード品質分析と改善点特定'},
            {'description': 'リファクタリング実行'},
            {'description': 'テストカバレッジの向上'},
            {'description': 'ドキュメント整備'}
        ],
        'subtasks': [
            'コードの複雑度・重複・パフォーマンス分析',
            '設計パターンの適用と構造改善',
            'ユニット・統合テストの追加',
            'API仕様書・README更新'
        ],
        'expected_outcomes': [
            '保守しやすい高品質なコードベース',
            '95%以上のテストカバレッジ',
            'パフォーマンス改善',
            '完全なAPI仕様書'
        ],
        'estimated_time': '2-3時間'
    }

def generate_coding_tasks(project_info, user_arguments):
    """Generate tasks for projects ready for implementation"""
    return {
        'workflow_name': 'coding-workflow',
        'tasks': [
            {'description': 'プロジェクト環境のセットアップ'},
            {'description': 'TDD による核となる機能の実装'},
            {'description': '包括的テストスイートの作成'},
            {'description': 'API仕様書の生成'}
        ],
        'subtasks': [
            'Kiro仕様に基づくプロジェクト構造作成',
            'Red-Green-Refactor での段階的実装',
            '統合テスト・E2Eテストの追加',
            '使用例・チュートリアル作成'
        ],
        'expected_outcomes': [
            '仕様に完全準拠した実装',
            '高品質で拡張可能なアーキテクチャ',
            '包括的なテストとドキュメント'
        ],
        'estimated_time': '3-5時間'
    }

def generate_default_tasks(project_info, user_arguments):
    """Generate default tasks for new projects"""
    # Analyze user arguments for project intent
    if user_arguments and any(keyword in str(user_arguments).lower() for keyword in ['api', 'サービス', 'service']):
        return generate_api_project_tasks()
    elif user_arguments and any(keyword in str(user_arguments).lower() for keyword in ['web', 'サイト', 'website', 'frontend']):
        return generate_web_project_tasks()
    else:
        return generate_general_project_tasks()

def generate_api_project_tasks():
    """Generate tasks for API projects"""
    return {
        'workflow_name': 'kiro-sdd-workflow',
        'tasks': [
            {'description': 'API仕様の策定'},
            {'description': 'プロジェクト基盤の構築'},
            {'description': 'RESTful API の実装'},
            {'description': '認証・セキュリティの実装'}
        ],
        'subtasks': [
            'エンドポイント設計・データモデル定義',
            'フレームワーク選定・開発環境構築',
            'CRUD操作・ビジネスロジック実装',
            'JWT認証・入力検証・エラーハンドリング'
        ],
        'expected_outcomes': [
            '本格運用可能なAPI',
            '完全なAPI仕様書',
            'セキュアで拡張可能な設計'
        ],
        'estimated_time': '4-6時間'
    }

def generate_web_project_tasks():
    """Generate tasks for web projects"""
    return {
        'workflow_name': 'kiro-sdd-workflow',
        'tasks': [
            {'description': 'Webサイトの要件定義'},
            {'description': 'UI/UX設計とプロトタイプ'},
            {'description': 'フロントエンド実装'},
            {'description': 'レスポンシブ対応・最適化'}
        ],
        'subtasks': [
            'ユーザー要件・機能要件の整理',
            'ワイヤーフレーム・デザインシステム作成',
            'コンポーネント実装・状態管理',
            'モバイル対応・パフォーマンス最適化'
        ],
        'expected_outcomes': [
            'モダンでレスポンシブなWebサイト',
            '優れたユーザーエクスペリエンス',
            '高速で SEO 最適化されたサイト'
        ],
        'estimated_time': '3-5時間'
    }

def generate_general_project_tasks():
    """Generate tasks for general projects"""
    return {
        'workflow_name': 'kiro-sdd-workflow',
        'tasks': [
            {'description': 'プロジェクト要件の整理'},
            {'description': '技術選定とアーキテクチャ設計'},
            {'description': '基本機能の実装'},
            {'description': 'テストとドキュメント作成'}
        ],
        'subtasks': [
            'ユーザーストーリー・受入基準策定',
            'フレームワーク選定・システム設計',
            'コア機能のプロトタイプ実装',
            'ユニットテスト・利用手順書作成'
        ],
        'expected_outcomes': [
            '明確な要件と設計書',
            '実証可能なプロトタイプ',
            '継続開発可能な基盤'
        ],
        'estimated_time': '2-4時間'
    }

def analyze_project_state():
    """Analyze current project state for workflow selection"""
    state = {
        'has_kiro_specs': file_exists('.kiro/specs') and len(glob_pattern('.kiro/specs/*')) > 0,
        'has_existing_projects': file_exists('projects') and len(glob_pattern('projects/*')) > 0,
        'has_incomplete_tasks': False,
        'code_quality_issues': False,
        'needs_implementation': False,
        'needs_enhancement': False,
        'multiple_active_features': False,
        'needs_project_specific_setup': False,
        'has_dynamic_config': False
    }

    # Check for incomplete tasks in Kiro specs
    if state['has_kiro_specs']:
        for spec_dir in glob_pattern('.kiro/specs/*'):
            tasks_file = f"{spec_dir}/tasks.md"
            if file_exists(tasks_file):
                tasks = parse_tasks_md(tasks_file)
                if any(not task['completed'] for task in tasks):
                    state['has_incomplete_tasks'] = True
                    state['needs_implementation'] = True
                    break

    # Check for existing projects that might need enhancement
    if state['has_existing_projects']:
        projects = glob_pattern('projects/*')
        for project_dir in projects:
            # Check if project has package.json, requirements.txt, or other project files
            project_files = [
                f"{project_dir}/package.json",
                f"{project_dir}/requirements.txt",
                f"{project_dir}/Cargo.toml",
                f"{project_dir}/go.mod",
                f"{project_dir}/pom.xml"
            ]
            if any(file_exists(f) for f in project_files):
                state['needs_enhancement'] = True
                
                # Check if this project might benefit from dynamic configuration
                project_id = os.path.basename(project_dir)
                dynamic_config_path = f".cc-deck/config/workflows/dynamic/{project_id}"
                
                if file_exists(dynamic_config_path):
                    state['has_dynamic_config'] = True
                else:
                    # Check if project is complex enough to warrant dynamic config
                    project_complexity_indicators = [
                        file_exists(f"{project_dir}/package.json") and check_modern_framework(project_dir),
                        file_exists(f"{project_dir}/tsconfig.json"),
                        file_exists(f"{project_dir}/tailwind.config.js"),
                        file_exists(f"{project_dir}/next.config.js"),
                        len(glob_pattern(f"{project_dir}/src/**/*.{{'ts','tsx','js','jsx'}}")) > 10
                    ]
                    
                    if any(project_complexity_indicators):
                        state['needs_project_specific_setup'] = True
                
                break

    return state

def check_modern_framework(project_dir):
    """Check if project uses modern frameworks that benefit from dynamic configuration"""
    package_json_path = f"{project_dir}/package.json"
    
    if not file_exists(package_json_path):
        return False
    
    try:
        import json
        with open(package_json_path, 'r') as f:
            package_data = json.load(f)
        
        dependencies = {}
        dependencies.update(package_data.get('dependencies', {}))
        dependencies.update(package_data.get('devDependencies', {}))
        
        # Check for modern frameworks that benefit from dynamic config
        modern_frameworks = [
            'next', 'react', 'vue', 'nuxt', 'svelte', 'sveltekit',
            'typescript', 'tailwindcss', 'vite', 'webpack'
        ]
        
        return any(framework in dep for dep in dependencies.keys() for framework in modern_frameworks)
        
    except Exception:
        return False

def generate_project_analysis_summary(project_state):
    """Generate human-readable project analysis summary"""
    summary_lines = ["Current State:"]

    if project_state.get('has_existing_projects'):
        projects = glob_pattern('projects/*')
        project_names = [p.split('/')[-1] for p in projects]
        summary_lines.append(f"- Existing projects detected: {', '.join(project_names)}")

        # Check for project files
        project_files = []
        for project_dir in projects:
            files = ['package.json', 'requirements.txt', 'Cargo.toml', 'go.mod', 'pom.xml',
                    'tailwind.config.js', 'next.config.js', 'tsconfig.json']
            found_files = [f.split('/')[-1] for f in files if file_exists(f"{project_dir}/{f.split('/')[-1]}")]
            if found_files:
                project_files.extend(found_files)
        if project_files:
            summary_lines.append(f"- Project files found: {', '.join(set(project_files))}")

    if project_state.get('has_kiro_specs'):
        specs = glob_pattern('.kiro/specs/*')
        spec_count = len(specs)
        summary_lines.append(f"- Kiro specs: {spec_count} active specification{'s' if spec_count != 1 else ''}")

    if project_state.get('has_incomplete_tasks'):
        summary_lines.append("- Status: Incomplete implementation tasks found")
    elif project_state.get('needs_enhancement'):
        summary_lines.append("- Code quality: Assessment needed")
    else:
        summary_lines.append("- Status: Ready for new development")

    return '\n'.join(summary_lines)

def get_workflow_rationale(workflow, project_state):
    """Get rationale for recommended workflow"""
    rationales = {
        'refactoring-workflow': "Existing project detected with established codebase. Starting with code quality assessment and improvements will establish baseline before adding new features.",
        'coding-workflow': "Active implementation tasks found. Continuing development workflow to complete pending features.",
        'kiro-sdd-workflow': "New project development. Creating comprehensive specifications before implementation ensures clear requirements and architecture.",
        'testing-workflow': "Focus on comprehensive testing to ensure quality and reliability of existing implementation.",
        'pr-workflow': "Code ready for review and integration. Prepare pull request for stakeholder review and merge.",
        'acceptance-workflow': "Final stakeholder approval and project completion review process."
    }
    return rationales.get(workflow, "Workflow selected based on current project analysis.")

def get_workflow_alternatives(recommended_workflow, project_state):
    """Get alternative workflow options with descriptions"""
    all_workflows = {
        'kiro-sdd': "Create new specification for major feature additions",
        'coding': "Add new features immediately (skip quality assessment)",
        'refactoring': "Code quality assessment and improvements",
        'testing': "Focus on comprehensive testing first",
        'pr': "Prepare pull request and code review",
        'acceptance': "Final stakeholder approval process"
    }

    # Remove recommended workflow from alternatives
    recommended_key = recommended_workflow.replace('-workflow', '')
    alternatives = [(k, v) for k, v in all_workflows.items() if k != recommended_key]

    return alternatives[:3]  # Return top 3 alternatives

def process_workflow_choice(user_choice, recommended_workflow, alternatives):
    """Process user workflow choice and return selected workflow"""
    if user_choice.lower() in ['1', '']:
        return recommended_workflow

    try:
        choice_num = int(user_choice)
        if choice_num == len(alternatives) + 2:
            # Show detailed analysis (placeholder)
            print("📋 Detailed Analysis: [Implementation would show comprehensive project analysis]")
            return process_workflow_choice(input("Please select workflow: "), recommended_workflow, alternatives)
        elif 2 <= choice_num <= len(alternatives) + 1:
            selected_workflow = alternatives[choice_num - 2][0]
            return f"{selected_workflow}-workflow"
    except ValueError:
        # User typed workflow name
        workflow_name = user_choice.lower().replace('-workflow', '')
        if workflow_name in ['kiro-sdd', 'coding', 'refactoring', 'testing', 'pr', 'acceptance']:
            return f"{workflow_name}-workflow"

    # Default fallback
    print(f"Invalid choice. Proceeding with recommended workflow: {recommended_workflow}")
    return recommended_workflow

def glob_pattern(pattern):
    """Simple glob pattern matching"""
    import glob
    return glob.glob(pattern)
```

This integration maintains full backward compatibility while providing the advanced workflow orchestration capabilities designed in the CC-Deck Workflow Engine.
