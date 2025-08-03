# CC-Deck Project

## Overview

This is a development documentation project implementing the Kiro SDD (Specification-Driven Development) process. The project focuses on task management, issue creation, and development workflow optimization using Claude Code.

## Project Structure

- `docs/` - Project documentation
  - `claude-code/` - Claude Code specific documentation and guides
  - `kiro/` - Kiro SDD examples and specifications
- `README.md` - Main project workflow

## Development Workflow

The project follows a structured development process:

1. Implement Kiro SDD process
2. Break down tasks into GitHub issues
3. Execute issues with testing and implementation
4. Use orchestration, MCP, and similarity-ts tools
5. Perform refactoring and maintain code quality
6. Create and run E2E tests
7. Merge PRs and update documentation

## Commands

No specific build/test commands defined yet - this appears to be a documentation-focused project.

## Technologies

- Kiro SDD (Specification-Driven Development)
- Claude Code integration
- MCP (Model Context Protocol)
- similarity-ts for code analysis

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
