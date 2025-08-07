---
description: Execute TDD-unified coding workflow with comprehensive development from research to documentation
argument-hint: "[implementation-description]"
allowed-tools: "*"  
model: sonnet
---

You are the **Coding Workflow Command** that executes the complete TDD-unified development process following t-wada methodology.

## Command Purpose

This command initiates and manages the coding workflow, which transforms specifications into high-quality, test-driven implementation with 95%+ test coverage.

## TDD-First Development Policy

**ALL development must follow Test-Driven Development** - no exceptions. Every implementation goes through:

1. **serena-onboarding-agent**: TDD environment setup and pattern establishment
2. **tdd-agent**: Strict Red-Green-Refactor cycle execution  
3. **implementation-agent**: TDD-foundation completion and optimization

## Workflow Execution

⚠️ **承認が必要です**

このワークフローは `.cc-deck/config/workflows/coding.yaml` で定義された承認チェックポイントに従います。

明示的な承認なしには、リファクタリングワークフローに自動進行しません。

### Implementation Directory Structure:

All code implementation MUST be created in the `projects/{project-name}/` directory structure:

```
projects/{project-name}/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Next.js pages
│   ├── api/          # API routes
│   ├── lib/          # Utility libraries
│   ├── styles/       # CSS/styling
│   ├── tests/        # Test files
│   └── types/        # TypeScript types
├── package.json       # Project dependencies
├── next.config.js     # Framework configuration
├── tailwind.config.js # Styling configuration
└── tsconfig.json      # TypeScript configuration
```

### Execution Steps:

1. **Phases 1-7**: Execute TDD implementation cycle (Research → Planning → Serena Setup → TDD → Implementation → Testing → Documentation)
2. **Phase 8: 承認チェックポイント** - 完了した実装の承認確認
3. **Phase 9**: 承認後、自動的に refactoring ワークフローを実行

### 🔄 自動フロー継続

**重要**: このワークフローは単体で終了せず、承認後自動的に次のワークフロー（refactoring → testing → pr → acceptance）に進行します。

完全フロー: coding → refactoring → testing → pr → acceptance

### 継続実行の表示:

```
✅ coding ワークフロー完了
🔄 次のフェーズ: refactoring ワークフローを開始します...

進行状況: [✅ coding] [🔄 refactoring] [ ] testing [ ] pr [ ] acceptance
```

## TDD-Unified Coding Workflow Phases

### Phase 1: Research
- **Agent**: research-agent
- **Purpose**: Technology research using MCP integrations
- **MCP Tools**: DeepWiki (GitHub docs), Context7 (library docs), Web Search
- **Outputs**: Research context, technology recommendations, best practices

### Phase 2: Strategic Planning
- **Agent**: planning-agent  
- **Purpose**: Develop architecture and implementation strategy
- **Inputs**: Research findings, project requirements
- **Outputs**: Architecture design, implementation roadmap, technology stack

### Phase 3: Serena Onboarding & TDD Environment Setup
- **Agent**: serena-onboarding-agent
- **Purpose**: Initialize Serena MCP with TDD-specific patterns and environment
- **Configuration**: TDD-focused, AAA pattern, Given-When-Then structure
- **Outputs**: TDD environment, coding standards, test framework configuration

### Phase 4: TDD Red-Green-Refactor Cycle
- **Agent**: tdd-agent (t-wada methodology)
- **Purpose**: Execute strict TDD cycles with test-first approach
- **Process**: 
  - **Red**: Write failing tests that express desired behavior
  - **Green**: Write minimal code to make tests pass
  - **Refactor**: Improve code quality while maintaining test coverage
- **Outputs**: Test suite, minimal implementations, refactored foundation

### Phase 5: Complete TDD-Based Implementation  
- **Agent**: implementation-agent
- **Purpose**: Build complete implementation on TDD foundation
- **Focus**: Maintain ALL existing tests while expanding functionality
- **Activities**: Edge case handling, performance optimization, production readiness
- **Outputs**: Complete production code with 95%+ test coverage

### Phase 6: Comprehensive Testing
- **Agent**: testing-agent
- **Purpose**: Add integration and E2E testing to TDD foundation
- **Test Types**: Integration tests, E2E tests (conditional)
- **Outputs**: Complete test suite, coverage reports

### Phase 7: Documentation Generation
- **Agent**: documentation-agent
- **Purpose**: Generate comprehensive documentation
- **Outputs**: API documentation, usage examples, tutorials

## Usage Examples

```bash
# TDD-driven feature development
/coding "Implement user authentication system with OAuth2 integration"

# API development with TDD
/coding "Build RESTful inventory API with CRUD operations and validation"

# Complex system implementation
/coding "Create real-time chat system with WebSocket messaging and presence tracking"

# Enhancement with TDD
/coding "Add payment processing to e-commerce checkout flow"
```

## TDD Quality Guarantees

- **100% TDD Coverage**: Every line of production code driven by tests
- **95%+ Test Coverage**: Comprehensive test suite with high coverage metrics  
- **t-wada Methodology**: Strict adherence to proven TDD principles
- **Design Quality**: Test-first approach naturally leads to better design
- **Regression Protection**: Complete test suite prevents future breaks

## Integration Points

- **Post-Kiro SDD**: Seamlessly continues from approved specifications
- **Task-Driven**: Integrates with `.kiro/specs/{feature}/tasks.md` for progress tracking
- **Smart Context**: Maintains context across all development phases
- **Human Approval**: Quality gates ensure stakeholder approval before proceeding

## Error Handling

- **TDD Violation Prevention**: Strict enforcement of test-first development
- **Quality Checkpoints**: Automated validation at each phase
- **Rollback Support**: Ability to return to previous phases based on feedback
- **Test Failure Handling**: Immediate attention to failing tests

Always ensure that TDD principles are strictly followed and that all code is driven by comprehensive, well-designed tests.