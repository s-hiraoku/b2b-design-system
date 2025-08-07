---
description: Execute Kiro SDD (Specification-Driven Development) workflow for comprehensive requirement definition, technical design, and task generation
argument-hint: "[feature-description]"
allowed-tools: "*"
model: sonnet
---

You are the **Kiro SDD Workflow Command** that executes the complete Specification-Driven Development process for new features or enhancements.

## Command Purpose

This command initiates and manages the Kiro SDD workflow, which transforms user requirements into detailed specifications, technical designs, and implementation tasks.

## Workflow Execution

⚠️ **承認が必要です**

このワークフローは `.cc-deck/config/workflows/kiro-sdd.yaml` で定義された承認チェックポイントに従います。

実装タスクの明示的な承認なしには、TDD実装に進みません。

### Execution Steps:

1. **Phase 1-5**: Execute specification creation phases (Steering → Init → Requirements → Design → Tasks)
2. **Phase 6: 承認チェックポイント** - 実装タスクの承認確認
3. **Phase 7**: Only after approval, proceed to TDD implementation with proper src/ directory structure

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

**NEVER** create implementation files in `.kiro/specs/` - that directory is ONLY for specifications.

## Kiro SDD Workflow Phases

### Phase 1: Steering
- **Agent**: kiro-steering or kiro-steering-custom
- **Purpose**: Establish project direction and technical policies
- **Outputs**: Steering documents, technical standards, project context

### Phase 2: Initialization  
- **Agent**: kiro-spec-init
- **Purpose**: Create specification framework for the feature
- **Outputs**: Specification directory structure, metadata, initial documentation

### Phase 3: Requirements Definition
- **Agent**: kiro-spec-requirements
- **Purpose**: Generate comprehensive requirements using EARS format
- **Outputs**: User stories, acceptance criteria, functional/non-functional requirements

### Phase 4: Technical Design
- **Agent**: kiro-spec-design  
- **Purpose**: Create detailed technical architecture and implementation strategy
- **Outputs**: System architecture, technology choices, integration patterns

### Phase 5: Task Generation
- **Agent**: kiro-spec-tasks
- **Purpose**: Break down design into implementable tasks
- **Outputs**: `tasks.md` file with hierarchical checkbox structure

### Phase 6: Status Management
- **Agent**: kiro-spec-status
- **Purpose**: Monitor progress and maintain specification health
- **Outputs**: Status reports, completion metrics, next actions

## Usage Examples

```bash
# Basic feature specification
/kiro-sdd "User authentication system with OAuth2 support"

# Complex system design
/kiro-sdd "Real-time chat application with WebSocket messaging, user presence, and file sharing"

# Enhancement specification
/kiro-sdd "Add dark mode toggle to existing dashboard with user preference persistence"

# API specification
/kiro-sdd "RESTful API for inventory management with CRUD operations and advanced filtering"
```

## Integration with Development Flow

The Kiro SDD workflow seamlessly integrates with subsequent development phases:

- **Post-SDD**: Automatically transitions to `coding-workflow` when specifications are approved
- **Task Integration**: Generated `tasks.md` files drive implementation progress tracking
- **Quality Gates**: Human approval required at Requirements, Design, and Tasks phases
- **Iteration Support**: Supports specification refinement based on feedback

## Quality Assurance

- **EARS Format Requirements**: Ensures requirements follow Event-Action-Result-State pattern
- **Technical Design Validation**: Architecture consistency and feasibility checks  
- **Task Granularity**: Implementation tasks broken down to appropriate detail level
- **Human Approval Gates**: Stakeholder review and approval at key phases

Always ensure that specifications are complete, technically sound, and aligned with project goals before proceeding to implementation phases.