---
description: Orchestrator command that delegates spec-driven development to specialized sub-agent
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash, Glob, Grep, LS
---

# Orchestrator Command

Simple orchestrator that delegates spec-driven development execution to the specialized Kiro Spec Driven sub-agent.

## Purpose

This command demonstrates sub-agent invocation patterns by:

1. **Receiving user input** (project descriptions, parameters)
2. **Delegating to specialized agent** (Kiro Spec Driven)
3. **Returning results** to user

## Execution Strategy

### Primary Delegation

- **Sub-agent**: `Kiro Spec Driven`
- **Responsibility**: Complete spec-driven development workflow orchestration
- **Benefits**: Separation of concerns, specialized expertise, maintainable architecture

### Input Handling

- **No parameters**: Execute basic project analysis and workflow
- **Project description**: Pass description to sub-agent for spec initialization
- **Feature requests**: Forward to appropriate workflow

## Implementation

1. **Analyze Input**

   - Determine if project description provided
   - Prepare parameters for sub-agent

2. **Call Sub-Agent**

   - Invoke `Kiro Spec Driven` agent
   - Pass all relevant context and parameters
   - Handle response appropriately

3. **Return Results**
   - Report sub-agent execution results
   - Provide any additional orchestration feedback

## Usage Examples

```bash
# Basic orchestration
/orchestrator

# With project description
/orchestrator "Build a real-time chat application with WebSocket support"

# Feature addition
/orchestrator "Add user authentication to existing project"
```

## Sub-Agent Architecture Benefits

- **Focused Responsibility**: Orchestrator handles delegation, sub-agent handles execution
- **Testability**: Can verify sub-agent invocation patterns
- **Maintainability**: Changes to spec-driven logic isolated to sub-agent
- **Reusability**: Sub-agent can be called from multiple orchestrators

This pattern demonstrates how complex workflows can be broken down into orchestration and execution layers.

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
