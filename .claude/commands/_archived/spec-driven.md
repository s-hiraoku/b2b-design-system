---
description: Kiro-style Spec-Driven Development workflow with streamlined commands
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash, Glob, Grep, LS
---

# Kiro Spec-Driven Development

Executes appropriate development workflows based on project type, following CLAUDE.md spec-driven development guidelines.

## Project Analysis

### Current Project State

- Existing specs: !`if [ -d ".kiro/specs" ]; then ls -la .kiro/specs/; else echo "Specs directory not found"; fi`
- Steering files: !`if [ -d ".kiro/steering" ]; then ls -la .kiro/steering/; else echo "Steering directory not found"; fi`
- Project files: !`find . -maxdepth 2 \( -name "package.json" -o -name "requirements.txt" -o -name "pyproject.toml" -o -name "Cargo.toml" -o -name "go.mod" \) 2>/dev/null || echo "Configuration files not found"`

## CLAUDE.md Context

### Spec-Driven Development Principles

- **Think in English, generate in Japanese**: Think in English, but generate responses in Japanese
- **Phase-based approval workflow**: Requirements → Design → Tasks → Implementation
- **Approval required**: Human review needed at each phase (interactive prompts or manual)
- **No phase skipping**: Design requires approved requirements; Tasks require approved design
- **Steering updates**: Execute `/kiro:steering` after significant changes
- **Spec compliance check**: Verify alignment with `/kiro:spec-status`

### Project Structure

- **Steering**: `.kiro/steering/` - Project-wide rules and context
- **Specs**: `.kiro/specs/` - Individual feature development processes
- **Commands**: `.claude/commands/` - Custom slash commands

## Best Practices

### ✅ Required
- **Always start with `/kiro:steering`** | **Never skip phases** | **Use `/kiro:spec-status` regularly** | **Keep steering current**

### ❌ Forbidden  
- **Skip confirmations** | **Neglect steering updates** | **Leave task status unupdated**

## Workflow Selection

### 1. New Project Case

When project has few source files or adding completely new features:

```markdown
**Mandatory Workflow (New Project):**

1. **REQUIRED: Generate project steering**
   /kiro:steering
   ⚠️ NEVER SKIP - Essential for project context

2. **Step 1: Start new feature specification (include detailed description)**
   /kiro:spec-init "Detailed project description here"

3. **Step 2: Requirements definition (use auto-generated feature-name)**
   /kiro:spec-requirements {feature-name}
   ✋ **MANDATORY REVIEW**: Confirm completion before design

4. **Step 3: Technical design (interactive approval)**
   /kiro:spec-design {feature-name}
   ✋ **MANDATORY REVIEW**: Confirm requirements AND design before tasks

5. **Step 4: Task generation (interactive approval)**
   /kiro:spec-tasks {feature-name}
   ✋ **MANDATORY REVIEW**: Confirm all phases before implementation

6. **Step 5: Start implementation**
   💡 Regular status checks with /kiro:spec-status
```

### 2. Adding Features to Existing Project

When adding new features to existing codebase or extending existing functionality:

```markdown
**Mandatory Workflow (Existing Project):**

1. **REQUIRED: Update steering context**
   /kiro:steering
   ⚠️ ALWAYS EXECUTE - Ensures current project context

2. **Step 1: Start new feature specification**
   /kiro:spec-init "Detailed description of new feature here"

3. **Step 2: Requirements definition (use auto-generated feature-name)**
   /kiro:spec-requirements {feature-name}
   ✋ **MANDATORY REVIEW**: Confirm completion before design

4. **Step 3: Technical design (interactive approval)**
   /kiro:spec-design {feature-name}
   ✋ **MANDATORY REVIEW**: Confirm requirements AND design before tasks

5. **Step 4: Task generation (interactive approval)**
   /kiro:spec-tasks {feature-name}
   ✋ **MANDATORY REVIEW**: Confirm all phases before implementation

6. **Step 5: Start implementation**
   💡 Regular status checks with /kiro:spec-status
```

## Task Execution Policy

### Automatic Selection Based on Project Analysis

Analyze current project state and execute appropriate workflow:

1. **Project State Assessment**

   - Check for source file existence
   - Verify existing specifications
   - Confirm steering file presence

2. **Context-Dependent Execution**

   - New projects: **MANDATORY** steering before any spec work
   - Existing projects: **MANDATORY** steering update before spec work
   - All projects: **NO EXCEPTIONS** - steering is required

3. **CLAUDE.md Context Utilization**
   - Maintain project-wide context
   - Enforce development guidelines
   - Generate Japanese responses


## Implementation Procedure

### Basic Execution Flow

1. **Execute Project Analysis**

   ```bash
   find . -name "*.js" -o -name "*.ts" -o -name "*.py" -o -name "*.go" | head -10
   ls -la .kiro/specs/ 2>/dev/null || echo "No specs"
   ls -la .kiro/steering/ 2>/dev/null || echo "No steering"
   ```

2. **Call Appropriate Steering Agent**

   - New: `steering` agent
   - Existing: `steering` agent (update mode)

3. **Chain Spec Creation Agent Calls**

   - `spec-init` → `spec-requirements` → `spec-design` → `spec-tasks`

4. **CLAUDE.md Context Integration**
   - Pass CLAUDE.md content to each agent
   - Enforce Japanese responses
   - Implement approval workflow

## Steering Updates

**Required**: Before any spec work | After major changes | Monthly maintenance  
**Auto-detects**: New dependencies, structure changes, outdated files (30+ days)

## Error Handling

### Common Problem Resolution

1. **Specs directory does not exist**
   → Auto-create and execute new project workflow

2. **Steering files are outdated**
   → Suggest automatic update

3. **Specs pending approval**
   → Prompt status check with `/kiro:spec-status`

## Progress Tracking

**Mandatory**: `/kiro:spec-status` after each phase | Weekly reviews | Update task completion immediately  
**Accountability**: Status must be current before requesting help | No "dark" specifications

## Usage

```bash
# Basic usage
/spec-driven

# Execute with project description
/spec-driven "Want to add PDF upload functionality and AI chart analysis"
```

This command analyzes project state following CLAUDE.md guidelines and automatically executes appropriate spec-driven development workflows.

## Sub-Agent Execution

### Specialized Agent Invocation Strategy

Invoke specialized sub-agents for each phase, ensuring reliable application of CLAUDE.md context:

1. **Steering Generation**: `Kiro Steering` sub-agent
2. **Custom Steering**: `Kiro Steering Custom` sub-agent (as needed)
3. **Spec Initialization**: `Kiro Spec Init` sub-agent
4. **Requirements Definition**: `Kiro Spec Requirements` sub-agent
5. **Design**: `Kiro Spec Design` sub-agent
6. **Task Breakdown**: `Kiro Spec Tasks` sub-agent
7. **Status Check**: `Kiro Spec Status` sub-agent

### Sub-Agent Benefits

- **Specialization**: High-quality support specialized for each phase
- **Automatic Selection**: Claude Code automatically selects agents at appropriate timing
- **Proactive Execution**: Automatic execution based on conditions
- **Consistency**: Unified application of CLAUDE.md rules
- **Maintainability**: Modular structure enables easy individual updates

### Available Sub-Agents

```
.claude/agents/kiro/
├── kiro-steering.md           # Project steering management
├── kiro-steering-custom.md    # Custom steering creation
├── kiro-spec-init.md         # Spec initialization
├── kiro-spec-requirements.md # Requirements definition (EARS format)
├── kiro-spec-design.md       # Technical design
├── kiro-spec-tasks.md        # Implementation task breakdown
└── kiro-spec-status.md       # Spec status verification
```

Each sub-agent incorporates complete CLAUDE.md context and spec-driven development principles, providing consistent high-quality development support.

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
