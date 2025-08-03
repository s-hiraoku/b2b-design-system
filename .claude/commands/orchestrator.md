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

## MCP Integration

### Utilize deepwiki, context7, and serena MCP Servers

To enhance the spec-driven development process, leverage the following MCP (Model Context Protocol) servers:

#### DeepWiki MCP

- **Purpose**: Access comprehensive GitHub repository documentation and knowledge
- **Usage**: Read repository documentation structure, access up-to-date project information, ask specific questions about GitHub repositories
- **Integration**: Use during requirements gathering and design phases to understand existing patterns and documentation

#### Context7 MCP

- **Purpose**: Retrieve current library documentation and code examples
- **Usage**: Resolve library IDs for accurate documentation, access up-to-date documentation for any library or framework, get focused documentation on specific topics
- **Integration**: Utilize during design and implementation phases to ensure best practices and current API usage

#### Serena MCP

- **Purpose**: Enhanced development capabilities and workflow automation
- **Usage**: Access specialized development tools and resources, streamline development workflows with automated assistance
- **Integration**: Apply throughout all phases for enhanced code quality and development efficiency

These MCP servers should be integrated into the spec-driven development workflow to provide comprehensive, up-to-date context and ensure implementations follow current best practices and documentation standards.
