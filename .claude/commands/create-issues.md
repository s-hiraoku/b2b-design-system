---
description: Create GitHub issues from tasks.md hierarchical tasks using gh commands
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash, Glob, Grep, LS
---

# Create Issues Command

Parse tasks.md from spec-driven development workflow and create individual GitHub issues for each task using gh commands.

## Purpose

Transform hierarchical implementation tasks into trackable GitHub issues:

1. **Parse tasks.md structure** - Extract hierarchical tasks (1, 1.1, 1.2, 2, 2.1)
2. **Create individual issues** - Each task becomes a separate GitHub issue
3. **Add metadata** - Include labels, requirements mapping, and dependencies
4. **Track progress** - Enable issue-based project management

## Usage

```bash
# Create issues for specific feature
/create-issues user-auth-system

# Create issues for feature in current directory
/create-issues

# Create issues with custom separation settings
/create-issues user-auth-system --label-prefix "auto-task" --title-prefix "[Auto]"

# Create issues and assign to specific project board
/create-issues user-auth-system --project-board "Implementation Tasks"

# Create issues with custom namespace for separation
/create-issues user-auth-system --namespace "tasks-md"
```

## Implementation Strategy

### 1. Task Parsing

Parse `.kiro/specs/{feature-name}/tasks.md` format:

```markdown
- [ ] 1. Set up project structure and core interfaces
  - Create directory structure for models, services, repositories
  - Define interfaces that will be implemented in subsequent tasks
  - _Requirements: 1.1_

- [ ] 1.1 Create basic model functionality
  - First create tests for basic model behavior
  - Implement base Entity class to pass tests
  - _Requirements: 2.1, 2.2_
```

### 2. Issue Generation

For each task, create GitHub issue with:

**Title Format**: `{title-prefix} {number}: {task-title}`
- Default: "Phase 1.1: Create basic model functionality"
- With separation: "[Auto] 1.1: Create basic model functionality"

**Body Format**:
```markdown
## Task Description
{task-details}

## Requirements Mapping
{requirements-list}

## Dependencies
{previous-phase-reference}

## Acceptance Criteria
- [ ] {extracted-subtasks}

---
Generated from: .kiro/specs/{feature-name}/tasks.md
```

**Labels**:
- `{label-prefix}` - Identifies as implementation task (default: "task")
- `auto-generated` - Marks as tasks.md generated issue for separation
- `phase-{major}` - Major phase number (phase-1, phase-2)
- `requirements-{req}` - Requirements mapping (requirements-1.1, requirements-2.2)
- `namespace-{namespace}` - Custom namespace for filtering (optional)

### 3. GitHub Integration

Use `gh issue create` command:

```bash
# Default behavior
gh issue create \
  --title "Phase 1.1: Create basic model functionality" \
  --body "$(cat issue-body.md)" \
  --label "task,auto-generated,phase-1,requirements-2.1,requirements-2.2"

# With separation settings
gh issue create \
  --title "[Auto] 1.1: Create basic model functionality" \
  --body "$(cat issue-body.md)" \
  --label "auto-task,auto-generated,phase-1,requirements-2.1,requirements-2.2,namespace-tasks-md" \
  --project "Implementation Tasks"
```

## Error Handling

### Pre-flight Checks

1. **Feature validation**:
   ```bash
   if [ ! -d ".kiro/specs/$feature_name" ]; then
     echo "Error: Feature spec directory not found"
     exit 1
   fi
   ```

2. **tasks.md existence**:
   ```bash
   if [ ! -f ".kiro/specs/$feature_name/tasks.md" ]; then
     echo "Error: tasks.md not found. Run spec-tasks first."
     exit 1
   fi
   ```

3. **GitHub authentication**:
   ```bash
   if ! gh auth status &>/dev/null; then
     echo "Error: GitHub CLI not authenticated"
     exit 1
   fi
   ```

### Recovery

- **Duplicate issue detection**: Check existing issues before creation
- **Partial failure recovery**: Track successfully created issues
- **Rollback capability**: Option to close issues if needed

## Implementation Details

### Task Extraction Logic

1. **Parse markdown checkboxes**: Extract `- [ ]` items
2. **Identify hierarchy**: Parse numbering (1, 1.1, 1.2, 2, 2.1)
3. **Extract requirements**: Parse `_Requirements: X.X, Y.Y_` patterns
4. **Build dependencies**: Map task sequence and prerequisites

### Issue Creation Workflow

1. **Batch validation**: Verify all tasks before creating any issues
2. **Sequential creation**: Create issues in dependency order
3. **Progress tracking**: Report creation status for each issue
4. **Summary report**: List all created issues with URLs

### Metadata Management

- **Consistent labeling**: Standardized label format across issues
- **Traceability**: Link back to original tasks.md
- **Project integration**: Optional project board assignment

## Advanced Features

### Optional Parameters

- `--dry-run`: Preview issues without creating them
- `--project PROJECT_NAME`: Assign to specific GitHub project
- `--assignee @username`: Auto-assign issues to team member
- `--milestone MILESTONE`: Group issues under milestone

### Issue Separation Parameters

- `--label-prefix PREFIX`: Custom label prefix (default: "task")
- `--title-prefix PREFIX`: Custom title prefix (default: "Phase")
- `--namespace NAMESPACE`: Custom namespace for filtering
- `--project-board PROJECT`: Dedicated project board for separation
- `--auto-label LABEL`: Additional label for auto-generated issues (default: "auto-generated")

### Integration Points

- **Spec status tracking**: Update completion status in tasks.md
- **Cross-reference**: Link related issues automatically
- **Template customization**: Support custom issue templates

## Example Output

### Default Behavior
```
Creating GitHub issues from .kiro/specs/user-auth-system/tasks.md...

✅ Created: Phase 1: Set up project structure (#123)
✅ Created: Phase 1.1: Create basic model functionality (#124)
✅ Created: Phase 1.2: Implement User model with validation (#125)
✅ Created: Phase 2: Implement data access layer (#126)

Summary: 4 issues created successfully
Labels: task, auto-generated, phase-X, requirements-X.X
```

### With Separation Settings
```
Creating GitHub issues with separation settings...
Label prefix: auto-task
Title prefix: [Auto]
Namespace: tasks-md
Project board: Implementation Tasks

✅ Created: [Auto] 1: Set up project structure (#127)
✅ Created: [Auto] 1.1: Create basic model functionality (#128)
✅ Created: [Auto] 1.2: Implement User model with validation (#129)
✅ Created: [Auto] 2: Implement data access layer (#130)

Summary: 4 issues created successfully
Project board: https://github.com/owner/repo/projects/2
Filtering: Use 'gh issue list --label auto-task' to see only auto-generated issues
```

## Issue Filtering Examples

```bash
# View only auto-generated issues
gh issue list --label auto-generated

# View only manual issues (exclude auto-generated)
gh issue list --label -auto-generated

# Filter by namespace
gh issue list --label namespace-tasks-md

# Filter by custom prefix
gh issue list --label auto-task
```

This command bridges the gap between spec-driven development completion and practical implementation tracking through GitHub's issue management system.