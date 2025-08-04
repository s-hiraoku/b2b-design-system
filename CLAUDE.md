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

## Core Features

- **Intelligent Orchestration**: Automated workflow management and state detection
- **Task-Based Development**: Progress tracking through .kiro/specs/{feature}/tasks.md
- **Human Approval Workflows**: Quality gates with structured decision making
- **Next Issue Detection**: Automatic GitHub issue analysis and prioritization
- **MCP Integration**: Enhanced development with up-to-date documentation and tools
