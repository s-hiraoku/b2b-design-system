---
description: CC-Deck intelligent orchestrator for project state analysis and continuous workflow execution
argument-hint: [optional feature description or workflow specification]
allowed-tools: Task, Bash
---

# CC-Deck Orchestrator

Main entry point for CC-Deck Workflow Engine. Automatically analyzes current project state, selects optimal workflows with user confirmation, and ensures continuous execution from start to completion.

## 🎯 Core Mission

**Detect Current Flow → Identify Incomplete Flows → Execute to Completion**

This orchestrator has clear and focused responsibilities:

1. **Project State Analysis**: Comprehensive analysis using specialized agents
2. **Interactive Workflow Selection**: User-confirmed optimal workflow selection
3. **Workflow Command Delegation**: Proper delegation to specialized commands
4. **Continuous Flow Management**: Automatic progression to next workflow upon completion

## 🚀 Essential Setup

**CRITICAL**: Always call these agents in sequence at the start of every execution.

```bash
# 1. Initialize Smart Context system (graceful degradation if unavailable)
Bash: "node .cc-deck/src/cli/smart-context-cli.js init $(basename $(pwd)) orchestrator || echo 'Smart Context unavailable, continuing with standard analysis'"

# 2. Get current date information
Task(subagent_type="date-utility", description="Get current date information", prompt="Please provide current date and time information for use in this orchestrator session, including search-appropriate year formatting.")

# 3. User interaction guidelines reminder
Task(subagent_type="user-interaction-reminder", description="User interaction guidelines", prompt="Provide critical reminders about proper user interaction protocols for this orchestration session.")

# 4. Comprehensive project state analysis with Smart Context integration
Task(subagent_type="project-state-analyzer", description="Comprehensive project state analysis", prompt="Perform comprehensive project state analysis with Smart Context integration. Load existing Smart Context from .cc-deck/runtime/global/context/ if available to avoid redundant analysis and build upon previous insights. If Smart Context is unavailable, perform complete analysis and provide workflow recommendations based on current project state. Include Kiro specs status, implementation progress, task completion analysis, and Interactive Workflow selection recommendations.")
```

## 🤔 Interactive Workflow Selection

Based on the project-state-analyzer results, present workflow recommendations with clear rationale and user confirmation.

### Selection Process:

1. **Display Project Analysis**: Current state, detected files, completion status
2. **Present Recommendations**: Primary recommendation with clear rationale
3. **Show Alternatives**: Alternative workflows with explanations
4. **User Confirmation**: Wait for explicit user choice
5. **Execute Workflow**: Run confirmed workflow command

### Example Workflow Selection Format:

```
📊 Project Analysis Complete

Current State:
- Projects detected: stylish-cafe-website/
- Kiro specs: 1 active specification (user-auth-system)
- Implementation: 67% complete (8/12 tasks)
- Code quality: Assessment needed

🎯 Recommended Workflow: CODING
Rationale: Active implementation tasks found with 33% remaining work.
Continuing TDD-based development will complete the authentication system.

Alternative Options:
1. REFACTORING - Improve existing code quality first
2. TESTING - Focus on comprehensive testing coverage  
3. KIRO-SDD - Create new specification for additional features

❓ Which workflow would you like to execute?
[1] Proceed with CODING (recommended)
[2] Use REFACTORING workflow
[3] Use TESTING workflow
[4] Use KIRO-SDD workflow

Please select 1-4:
```

## 🔄 Workflow Command Execution

After user confirmation, save workflow selection to Smart Context and execute the appropriate specialized workflow command:

```bash
# Save workflow selection and execution start to Smart Context (graceful fallback)
Bash: "node .cc-deck/src/cli/smart-context-cli.js update-workflow $(basename $(pwd)) [selected_workflow] '{\"status\":\"started\"}' || echo 'Workflow started: [selected_workflow] (Smart Context unavailable)'"
```

### CC-Deck Workflow Commands:

```bash
# Execute based on user selection and CC-Deck workflow chain
/kiro-sdd        # Specification-driven development workflow
/dev-env-setup   # Dynamic MCP agent generation (NEW)
/coding          # TDD-unified comprehensive development
/refactoring     # Semantic analysis and code improvement  
/testing         # Integration and E2E testing workflows
/pr              # Pull request creation and merge management
/acceptance      # Human approval and feedback-driven improvement
```

### Workflow Chain Execution:

After each workflow completion with human approval, automatically proceed to the next workflow according to CC-Deck specifications:

```
kiro-sdd → dev-env-setup → coding → refactoring → testing → pr → acceptance
```

## 🔄 Continuous Flow Management

### Automatic Workflow Progression:

1. **Current Workflow Completion**: Wait for specialized command completion
2. **Context Update**: Save completion status to Smart Context (graceful fallback)
   ```bash
   Bash: "node .cc-deck/src/cli/smart-context-cli.js complete-workflow --project-id=$(basename $(pwd)) --workflow=[completed_workflow] --success=true || echo 'Workflow completed: [completed_workflow] (Smart Context unavailable)'"
   ```
3. **Human Approval**: Present approval options (Y/R/S format)
4. **Next Workflow Detection**: Determine next workflow from CC-Deck chain
5. **User Confirmation**: Explicit confirmation before proceeding
6. **Next Workflow Execution**: Execute next specialized command with Smart Context

### Approval Format (Y/R/S):

```
✅ [Workflow Name] completed successfully!
Ready to [next action]?

[Y] Yes, [proceed with next workflow]
[R] Review [current workflow] (regenerate/revise current phase)  
[S] Save and resume later (auto-detect with next /orchestrator)
```

## 📊 State Management

### Project State Detection:

- **Kiro Specifications**: `.kiro/specs/*/` status and completion
- **Implementation Progress**: `tasks.md` checkbox analysis
- **Existing Projects**: `projects/*/` directory analysis
- **Code Quality**: Automated quality assessment
- **Workflow Context**: Previous execution state

### Context Preservation:

- **Smart Context**: Active cross-workflow state sharing via `.cc-deck/runtime/global/context/`
  - Project state persistence and analysis caching
  - Workflow history and transition tracking  
  - Agent memory and cross-agent communication
  - User preference learning and adaptation
  - Quality metrics and continuous improvement
- **Progress Tracking**: Real-time task completion monitoring via Smart Context
- **Resume Capability**: Automatic detection of interrupted workflows from context state
- **Audit Trail**: Complete execution history and decision tracking in Smart Context

## 🎯 Usage Examples

### Basic Usage:
```bash
# Intelligent workflow selection with project analysis
/orchestrator

# Explicit workflow with feature specification  
/orchestrator "kiro-sdd user-authentication-system"

# Resume interrupted workflow
/orchestrator "resume user-auth-system"
```

### Advanced Usage:
```bash
# New feature development (Smart Context creates new project context)
/orchestrator "Build user management system with authentication"

# Existing project enhancement (Smart Context loads existing state)
/orchestrator "Improve performance and add real-time features"

# Specific workflow continuation (Smart Context resumes from saved state)
/orchestrator "continue coding user-auth-system"

# Resume from exact interruption point using Smart Context
/orchestrator "resume"
```

### Smart Context Integration Points:

```bash
# Check Smart Context status
Bash: "node .cc-deck/src/cli/smart-context-cli.js list"

# Load specific context data for analysis  
Bash: "node .cc-deck/src/cli/smart-context-cli.js show $(basename $(pwd)) project"

# Update user preferences based on selection
Bash: "node .cc-deck/src/cli/smart-context-cli.js update-preferences --project-id=$(basename $(pwd)) --workflow-choice=[user_choice] --recommended=[ai_recommendation]"
```

## 🛡️ Quality Assurance

### Human Approval Integration:
- **Mandatory Checkpoints**: Never bypass human approval gates
- **Comprehensive Reviews**: AI-prepared materials for human decision
- **Structured Decisions**: Clear Y/R/S options with explanations
- **Audit Trail**: Complete record of all approval decisions

### Error Handling:
- **Graceful Degradation**: Continue execution when non-critical components fail
- **Recovery Mechanisms**: Automatic retry and fallback strategies  
- **User Escalation**: Clear error reporting and resolution guidance
- **State Preservation**: Maintain context across error scenarios

## 🏗️ Implementation Notes

### Agent Responsibilities:
- **date-utility**: Provides current timestamp for search queries
- **user-interaction-reminder**: Ensures proper human-AI interaction protocols
- **project-state-analyzer**: Comprehensive project analysis and recommendations

### Command Delegation:
- **Specialized Commands**: Each workflow has dedicated implementation command
- **Context Sharing**: State preserved between command executions  
- **Clean Separation**: Orchestrator handles flow, commands handle execution
- **Consistent Interface**: All commands follow CC-Deck standards

This refactored orchestrator maintains the essential functionality while dramatically simplifying the implementation and ensuring clean separation of concerns according to CC-Deck Workflow Engine specifications.