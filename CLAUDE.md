# CC-Deck Project

## Overview

This is the CC-Deck (Claude Code Deck) project implementing the Kiro SDD (Specification-Driven Development) process. The project provides an AI-driven development platform with intelligent orchestration, task management, and comprehensive development workflows.

## Active Steering Files

The following steering documents are active and provide project context (stored in `.kiro/steering/`):

- `.kiro/steering/product.md` - Product overview, features, and value proposition
- `.kiro/steering/tech.md` - Technology stack, development environment, and architecture
- `.kiro/steering/structure.md` - Project structure, code organization, and development guidelines

## Attribution

This project substantially references:

- **gotalab/claude-code-spec** - Core SDD methodology and workflow patterns
- **mizchi/similarity** - Code similarity analysis tools (MIT License)
- **t-wada** - TDD methodology and best practices

See [docs/ATTRIBUTION.md](docs/ATTRIBUTION.md) for detailed acknowledgments.

## Active Specifications

All specifications are stored in the `.kiro/specs/` directory:

- **fashionable-girls-blog** - Modern fashion-focused blog platform for young women with visual-first content, social features, and e-commerce integration
- **artistic-blog-site** - Art-focused blog platform integrating Japanese aesthetics (Ma, Wabi-sabi, Kanso) with modern web technologies for immersive art appreciation and cultural exchange
- **kawaii-reading-blog** - Cute illustration-style reading blog with emphasis on animations, illustrations, and images for book-loving community

## Project Structure

- `.kiro/` - Kiro SDD working directory
  - `specs/` - Active feature specifications and implementations
  - `steering/` - Project steering documents
- `projects/` - Generated project implementations

- `docs/` - Project documentation
  - `claude-code/` - Claude Code specific documentation and guides
  - `kiro/` - Kiro SDD examples and references
- `README.md` - Main project workflow

## Development Workflow

The project follows the Kiro SDD (Specification-Driven Development) process with automated orchestration and TDD-first approach:

1. Kiro SDD specification creation in `.kiro/specs/`
2. **Enterprise-Grade Coding Workflow**: Enhanced with unified monitoring, error handling, and quality assurance
3. Test-Driven Development (TDD) using t-wada methodology with Red-Green-Refactor cycle
4. Task-based implementation with progress tracking through tasks.md
5. Human approval workflows for quality assurance
6. Comprehensive testing and deployment with full observability

## TDD-First Development Policy

This project mandates Test-Driven Development for ALL implementations following t-wada's rigorous methodology:

- **TDD-Only Policy**: ALL code must be developed using strict TDD approach
- **Dedicated TDD Agent**: `tdd-agent` enforces Red-Green-Refactor cycles
- **No Shortcuts Allowed**: Test-first development is mandatory
- **Enhanced Quality Guarantee**: 95%+ test coverage (line coverage 95%+, branch coverage 90%+, function coverage 95%+)
- **Unified Workflow**: Single TDD-based implementation path for consistency
- **Multi-Agent TDD**: serena-onboarding → tdd-agent → implementation-agent sequence
- **Real-time Quality Monitoring**: Continuous TDD compliance tracking and quality metrics collection

## Enterprise-Grade Workflow Enhancements

### 🎛️ Unified Monitoring System

- **Real-time Metrics**: Phase performance, TDD compliance, quality scores, MCP integration status
- **Proactive Alerts**: Quality degradation (>5% drop), performance anomalies (>150% baseline), TDD violations (<95%)
- **Comprehensive Reporting**: HTML dashboards, JSON APIs, Markdown documentation, CSV exports

### ⚡ Advanced Error Handling & Recovery

- **Checkpoint System**: Before each phase with 72h retention
- **Circuit Breakers**: MCP services, quality gates, human approval processes
- **Automatic Recovery**: Service fallbacks, data restoration, workflow continuation
- **Escalation Management**: Technical lead → Engineering manager → CTO office

### 🔒 Quality Assurance Integration

- **5-Dimension Quality Framework**: Functional, Technical, Process, UX, Operational quality
- **Unified Quality Gates**: Entry gates, progress gates, exit gates with blocking enforcement
- **Automated Validation**: Static analysis, dynamic testing, compliance checking
- **Human Quality Reviews**: Peer review, expert review, stakeholder validation

## Main Command

Use `/orchestrator` for all development workflows - it provides intelligent state detection and workflow continuation.

## Key Technologies

- **Kiro SDD (Specification-Driven Development)**: Complete specification-driven development process
- **Claude Code integration**: Custom slash commands with enterprise-grade functionality
- **MCP (Model Context Protocol) servers**: DeepWiki, Context7, Serena, Playwright with monitoring
- **Unified Standards**: Monitoring, Quality Assurance, Error Handling standardization
- **Enterprise Observability**: Real-time monitoring, alerting, comprehensive reporting
- **Advanced Error Recovery**: Multi-layer error handling with automatic recovery
- **Quality Assurance Framework**: 5-dimension quality evaluation with automated enforcement

## CC-Deck Workflow Engine

### Advanced Workflow Orchestration System

This project now includes the **CC-Deck Workflow Engine**, an advanced workflow orchestration system that realizes the ARCHITECTURE.md design through:

- **Enterprise-Grade Workflow Management**: Production-ready orchestration with monitoring and recovery
- **Unified Standards Compliance**: All workflows follow monitoring, quality, and error handling standards
- **Smart Context Propagation**: Advanced context sharing between agents and phases with audit trails
- **Kiro SDD Integration**: Seamless integration with `.kiro/specs/*/tasks.md` files
- **Intelligent Agent Orchestration**: Smart agent selection with performance monitoring

#### Key Features

- **Enhanced `/orchestrator`**: Main entry point with intelligent workflow selection and state management
- **Workflow Definitions**: YAML-based workflows in `.cc-deck/config/workflows/` with unified standards
- **Smart Context**: Persistent state management with checkpoints and rollback capabilities
- **Task-Driven Execution**: Automatic tasks.md parsing with real-time progress tracking
- **Advanced Error Recovery**: Multi-layer error handling with automatic recovery and escalation
- **Comprehensive Monitoring**: Real-time metrics, alerts, and reporting across all workflows
- **Quality Assurance Integration**: 5-dimension quality framework with automated enforcement

#### Usage Examples

```bash
# Intelligent workflow selection
/orchestrator

# Explicit workflow with feature
/orchestrator "kiro-sdd user-authentication-system"
/orchestrator "coding REST API service"
/orchestrator "refactoring legacy-system"

# Resume interrupted workflow
/orchestrator "resume user-authentication-system"
```

For detailed documentation, see `docs/design/ARCHITECTURE.md` and `docs/design/cc-deck-config.md`.

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

## ⚠️ IMPORTANT: Anthropic Specification Compliance

When creating or updating custom slash commands and sub-agents, **ALWAYS** verify compliance with Anthropic's official specifications:

- **Sub-Agents Documentation**: https://docs.anthropic.com/en/docs/claude-code/sub-agents
- **Custom Commands Documentation**: https://docs.anthropic.com/en/docs/claude-code/slash-commands
- **CLAUDE.md Specification**: https://docs.anthropic.com/en/docs/claude-code/claude-md

### Critical Requirements:

1. **✅ FIXED: No Task() calls within agents**: Sub-agents cannot directly call other sub-agents. All orchestration is handled by the `/orchestrator` command through CC-Deck Workflow Engine
2. **Proper description format**: Keep descriptions concise, specific, and action-oriented
3. **Correct YAML frontmatter**: Follow exact specification for name, description, tools, model, and color fields
4. **Valid delegation patterns**: Use CC-Deck Workflow Engine for complex multi-agent workflows

### ✅ Compliance Status

**All sub-agents have been updated to comply with Anthropic specifications**:

- Removed `Task` tool from all sub-agent definitions
- Updated agent descriptions to reflect orchestrator delegation
- All agent coordination now happens through CC-Deck Workflow Engine

**Always check official documentation before implementing new features to avoid specification violations.**

## Core Features

- **Intelligent Orchestration**: Automated workflow management and state detection
- **Task-Based Development**: Progress tracking through .kiro/specs/{feature}/tasks.md
- **Mandatory Human Approval**: ALL changes require human stakeholder approval for quality assurance
- **AI-Assisted Reviews**: AI prepares comprehensive review materials, humans make final decisions
- **Next Issue Detection**: Automatic GitHub issue analysis and prioritization
- **MCP Integration**: Enhanced development with up-to-date documentation and tools

# AI Development Platform Management

## Platform Development Commands

- **Main Workflow**: `/orchestrator` - Primary command for all development workflows
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
