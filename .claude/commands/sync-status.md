---
description: Automatically detect and resolve Kiro SDD state inconsistencies between status tracking and actual implementation progress
argument-hint: [feature-name] | --dry-run | --type <task-progress|phase-approval|tdd-completion>
allowed-tools: Task, Read, Write, Edit, Bash, Glob, Grep, LS
---

# Sync Status Command

Automatically detect and resolve state inconsistencies between Kiro SDD status tracking and actual implementation progress to prevent workflow blocks.

## Initial Setup: Current Date Information

**CRITICAL**: Always call the following agent first to execute the command correctly.

```bash
# First action: Get current date information
Task(subagent_type="date-utility", description="Get current date information", prompt="Please provide current date and time information for use in this sync-status session, including search-appropriate year formatting.")

# Second action: User interaction guidelines reminder
Task(subagent_type="user-interaction-reminder", description="User interaction guidelines", prompt="Provide critical reminders about proper user interaction protocols for this sync-status session.")
```

## Purpose

This command addresses common issues where:

- Implementation has proceeded ahead of status tracking
- kiro_status.json doesn't reflect actual project state
- TDD-agent continues running due to state inconsistencies
- Approval blocks prevent workflow progression despite completed work

## Automatic Detection and Resolution

### State Inconsistency Detection

1. **Implementation vs Status Check**

   ```bash
   # Compare actual code files with kiro_status.json current_phase
   - Check if code exists but phase is still "design" or "requirements"
   - Detect completed tasks that are unmarked in tasks.md
   - Identify approval blocks for objectively completed work
   ```

2. **Task Progress Validation**

   ```bash
   # Scan tasks.md for completion vs actual implementation
   - Detect implemented features with unchecked task boxes
   - Validate acceptance criteria against existing code
   - Check test coverage for claimed task completion
   ```

3. **TDD State Analysis**
   ```bash
   # Identify TDD workflow blocks
   - Detect TDD-agent continuous operation without progression
   - Check if tests exist and pass but tasks remain incomplete
   - Validate Red-Green-Refactor cycle completion
   ```

### Automatic Resolution Actions

1. **Status Synchronization**

   ```bash
   # Auto-update kiro_status.json to match reality
   - Update current_phase to reflect actual implementation state
   - Mark completed phases as approved when implementation verified
   - Set appropriate timestamps for phase transitions
   ```

2. **Task Progress Update**

   ```bash
   # Auto-update tasks.md checkboxes
   - Mark completed tasks based on implementation verification
   - Update acceptance criteria status
   - Sync task progress with actual code state
   ```

3. **Approval Auto-Resolution**
   ```bash
   # Auto-approve objectively completed phases
   - Approve phases when implementation meets all criteria
   - Generate approval notes based on implementation verification
   - Trigger next phase progression automatically
   ```

## Usage Examples

### Basic Status Sync

```bash
# Detect and resolve all state inconsistencies
/sync-status

# Sync specific feature
/sync-status "todo-app"

# Dry-run mode (detect only, no changes)
/sync-status --dry-run
```

### Targeted Resolution

```bash
# Focus on specific type of inconsistency
/sync-status --type task-progress
/sync-status --type phase-approval
/sync-status --type tdd-completion

# Force sync even with minor inconsistencies
/sync-status --force
```

## Resolution Strategy

### Phase 1: Detection

1. **Scan Project Structure**

   - Check .kiro/specs/ directory for active features
   - Read kiro_status.json files for current state tracking
   - Analyze tasks.md files for completion status

2. **Implementation Analysis**

   - Scan actual code files and directory structure
   - Check test files for coverage and passing status
   - Validate build and runtime functionality

3. **Inconsistency Identification**
   - Compare status tracking with implementation reality
   - Identify specific types of inconsistencies
   - Prioritize resolution actions by impact

### Phase 2: Resolution

1. **Status Update**

   - Update kiro_status.json current_phase appropriately
   - Mark completed phases with proper approval status
   - Set accurate timestamps for state transitions

2. **Task Synchronization**

   - Update tasks.md checkboxes to reflect implementation
   - Add completion notes and timestamps
   - Update acceptance criteria status

3. **Workflow Unblocking**
   - Signal TDD-agent completion when appropriate
   - Trigger next phase progression
   - Clear approval blocks for completed work

### Phase 3: Validation

1. **Consistency Verification**

   - Confirm all status tracking matches implementation
   - Validate workflow can proceed normally
   - Check for any remaining inconsistencies

2. **Workflow Testing**
   - Verify TDD-agent stops continuous operation
   - Confirm orchestrator can detect proper next steps
   - Test approval workflows function correctly

## Integration with Existing Workflows

### Orchestrator Integration

- Automatically called by orchestrator when state inconsistencies detected
- Provides clean state for proper workflow continuation
- Enables intelligent next-step determination

### TDD Workflow Integration

- Resolves TDD-agent continuous operation issues
- Properly signals TDD cycle completion
- Enables smooth transition between development phases

### Approval Workflow Integration

- Auto-resolves approval blocks for objectively completed work
- Maintains human oversight for subjective decisions
- Streamlines progression for clear completion criteria

## Quality Assurance

### Safety Measures

- Dry-run mode for preview of changes
- Backup of original status files before modification
- Rollback capability if issues are detected

### Validation Criteria

- Implementation must meet acceptance criteria before auto-approval
- Tests must pass before marking tasks as complete
- Code quality standards must be maintained

### Audit Trail

- Log all automatic status changes with justification
- Maintain history of resolved inconsistencies
- Generate reports on common inconsistency patterns

Execute comprehensive state synchronization to maintain workflow integrity and prevent development blocks caused by status tracking inconsistencies.
