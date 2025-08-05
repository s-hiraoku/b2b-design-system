# CC-Deck Project

## Overview

This is the CC-Deck (Claude Code Deck) project implementing the Kiro SDD (Specification-Driven Development) process. The project provides an AI-driven development platform with intelligent orchestration, task management, and comprehensive development workflows.

## Active Steering Files

The following steering documents are active and provide project context (stored in `.kiro/steering/`):

- `.kiro/steering/product.md` - Product overview, features, and value proposition
- `.kiro/steering/tech.md` - Technology stack, development environment, and architecture
- `.kiro/steering/structure.md` - Project structure, code organization, and development guidelines

## Active Specifications

All specifications are stored in the `.kiro/specs/` directory:

- Currently no active specifications - new features will be created here automatically

## Project Structure

- `.kiro/` - Kiro SDD working directory
  - `specs/` - Active feature specifications and implementations
  - `steering/` - Project steering documents
- `docs/` - Project documentation
  - `claude-code/` - Claude Code specific documentation and guides
  - `kiro/` - Kiro SDD examples and references
- `README.md` - Main project workflow

## Development Workflow

The project follows the Kiro SDD (Specification-Driven Development) process with automated orchestration and TDD-first approach:

1. Kiro SDD specification creation in `.kiro/specs/`
2. Test-Driven Development (TDD) using t-wada methodology with Red-Green-Refactor cycle
3. Task-based implementation with progress tracking through tasks.md
4. Human approval workflows for quality assurance
5. Comprehensive testing and deployment

## TDD Practice

This project prioritizes Test-Driven Development following t-wada's rigorous methodology:

- **TDD Agent**: Dedicated `tdd-agent` for strict TDD guidance
- **Red-Green-Refactor**: Enforced cycle with no shortcuts allowed
- **Test-First**: All code implementation must start with failing tests
- **Quality Focus**: Tests as documentation and design drivers
- **Integration**: TDD automatically integrated into all development workflows

## Main Command

Use `/orchestrator` for all development workflows - it provides intelligent state detection and workflow continuation.

## Key Technologies

- Kiro SDD (Specification-Driven Development)
- Claude Code integration with custom slash commands
- MCP (Model Context Protocol) servers: DeepWiki, Context7, Serena
- Automated task management and progress tracking
- GitHub integration for issue management

## Custom Development Guidelines

### Creating Custom Slash Commands and Sub-Agents

When developing custom slash commands or sub-agents for this project, **always refer to Anthropic's official documentation** for best practices and implementation guidelines:

- **Slash Commands**: https://docs.anthropic.com/en/docs/claude-code/slash-commands
- **Sub-Agents**: https://docs.anthropic.com/en/docs/claude-code/sub-agents
- **CLAUDE.md Files**: https://docs.anthropic.com/en/docs/claude-code/memory

These official resources provide:
- Detailed configuration formats and requirements
- Best practices for agent design and tool allocation
- Examples of effective command and agent implementations
- Guidelines for optimal context management and performance
- CLAUDE.md structure and usage patterns for project instructions

All custom commands, agents, and CLAUDE.md files in this project should follow Anthropic's official patterns to ensure consistency, reliability, and maintainability.

## Core Features

- **Intelligent Orchestration**: Automated workflow management and state detection
- **Task-Based Development**: Progress tracking through .kiro/specs/{feature}/tasks.md
- **Human Approval Workflows**: Quality gates with structured decision making
- **Next Issue Detection**: Automatic GitHub issue analysis and prioritization
- **MCP Integration**: Enhanced development with up-to-date documentation and tools

# AI Development Platform Management

## Platform Development Commands
- **Main Workflow**: `/orchestrator` - Primary command for all development workflows
- **State Sync**: `/sync-status` - Resolve Kiro SDD state inconsistencies
- **Agent Management**: `/agents` - Create and manage sub-agents via interactive interface
- **Help**: `/help` - View all available commands and agents

## Sub-Agent Development Standards
- **Naming**: Use lowercase letters and hyphens (e.g., `tdd-agent`, `kiro-spec-init`)
- **Required Fields**: `name` and `description` in YAML frontmatter
- **Proactive Usage**: Include "use proactively" in descriptions for automatic delegation
- **Tool Access**: Limit to necessary tools only for security and focus
- **Model Specification**: Use `model: sonnet` for consistency across agents

## Custom Command Development Standards
- **File Location**: `.claude/commands/` for project-specific commands
- **Required Fields**: `description` and `allowed-tools` in YAML frontmatter
- **Recommended Fields**: `argument-hint` and `model` for better UX
- **Documentation**: Clear usage examples and parameter descriptions

## Project Structure Management
- **Active Specifications**: `.kiro/specs/` - Feature development tracking
- **Steering Documents**: `.kiro/steering/` - Project context and guidelines
- **Agent Organization**: Categorized in `.claude/agents/` subdirectories
- **Command Organization**: Main commands in `.claude/commands/`

## Quality Standards for Platform Components
- Follow Anthropic's official documentation patterns exactly
- Maintain consistency across all custom components
- Use hierarchical organization for related agents
- Regular review and updates of agent descriptions and capabilities
