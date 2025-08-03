# Tetris Game Project

## Overview

This is a Tetris game development project implementing the Kiro SDD (Specification-Driven Development) process. The project creates a fully functional web-based Tetris game with standard gameplay mechanics, modern interface, and comprehensive development documentation.

## Active Steering Files

The following steering documents are active and provide project context:

- `.kiro/steering/product.md` - Product overview, features, and value proposition
- `.kiro/steering/tech.md` - Technology stack, development environment, and architecture  
- `.kiro/steering/structure.md` - Project structure, code organization, and development guidelines

## Active Specifications

- `tetris-game` - Complete Tetris game implementation with standard gameplay mechanics, 7 tetromino pieces, scoring, and modern web interface

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

### Issue自動管理システム

Issue完了後の自動処理とAI駆動承認システム：

```bash
# Issue自動管理の有効化
/orchestrator "enable-auto-issue-management"

# 特定のIssueに対する承認処理
/orchestrator "approve-issue #123"

# 承認プロセスの最適化実行
/orchestrator "optimize-approval-process"

# フィードバックループの確認
/orchestrator "check-feedback-loop"
```

### 承認カテゴリと処理

- **低リスク（自動承認）**: ルーチンなバグ修正、ドキュメント更新、テスト改善
- **中リスク（条件付き承認）**: 新機能実装、パフォーマンス最適化、リファクタリング  
- **高リスク（人間承認必須）**: セキュリティ変更、データベース変更、API破壊的変更

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
