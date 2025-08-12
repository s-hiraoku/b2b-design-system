---
description: Execute enterprise-grade TDD-unified coding workflow with comprehensive monitoring, error handling, and quality assurance
argument-hint: "[implementation-description]"
allowed-tools: "*"
---

You are the **Enterprise-Grade Coding Workflow Command** that executes the complete TDD-unified development process following t-wada methodology with enterprise monitoring, unified quality assurance, and comprehensive error handling.

## Initial Setup: Current Date Information

**CRITICAL**: Always call the following agent first to execute the command correctly.

```bash
# First action: Get current date information
Task(subagent_type="date-utility", description="Get current date information", prompt="Please provide current date and time information for use in this coding workflow session, including search-appropriate year formatting.")

# Second action: User interaction guidelines reminder
Task(subagent_type="user-interaction-reminder", description="User interaction guidelines", prompt="Provide critical reminders about proper user interaction protocols for this coding workflow session.")


```

## Command Purpose

This command initiates and manages the enterprise coding workflow, which transforms specifications into high-quality, test-driven implementation with 95%+ test coverage, real-time monitoring, and enterprise security compliance.

## Project-Specific Workflow Loading

**Dynamic Configuration**: This command automatically detects and loads project-specific merged workflow configurations:

1. **First Priority**: `.cc-deck/runtime/projects/{project-id}/workflows/generated/coding-merged.yaml`
2. **Fallback**: `.cc-deck/config/workflows/coding.yaml`

### Automatic Project Detection:

The command detects the current project context using:

- Dynamic workflow directories (`.cc-deck/runtime/projects/*`)
- Active projects (`projects/*`)
- Kiro specifications (`.kiro/specs/*`)

When a project-specific merged workflow is found, it automatically uses enhanced configurations with:

- **Project-Specific MCP Agents**: Custom agents for the specific technology stack
- **Enhanced Monitoring**: Project-tailored performance metrics and alerts
- **Specialized Quality Gates**: Requirements specific to the project domain
- **Custom Error Handling**: Project-specific recovery strategies

## TDD-First Development Policy

**ALL development must follow Test-Driven Development** - no exceptions. Every implementation goes through:

1. **serena-onboarding-agent**: TDD environment setup and pattern establishment
2. **tdd-agent**: Strict Red-Green-Refactor cycle execution
3. **implementation-agent**: TDD-foundation completion and optimization

## Multi-Agent Collaboration

### Supporting Agents in Full Implementation Phase

The coding workflow leverages specialized supporting agents for comprehensive code optimization:

- **research-agent**: Real-time technical research and best practices discovery
- **deepwiki-research-solver**: Implementation problem solving and pattern analysis
- **github-mcp-code-optimizer**: GitHub repository analysis and optimized code solutions based on existing codebase patterns
- **code-quality-validator**: Continuous quality monitoring and validation

### GitHub MCP Code Optimizer Integration

The `github-mcp-code-optimizer` agent provides:

- **Repository Analysis**: Deep understanding of existing codebase structure and patterns
- **Context-Aware Solutions**: Code generation that seamlessly integrates with existing architecture
- **Pattern Recognition**: Identification and adherence to established coding conventions
- **Optimization Focus**: Performance, maintainability, and consistency improvements
- **Quality Assurance**: Verification of compatibility and impact assessment

This agent is automatically available during the full implementation phase and should be used when:
- Adding new features to existing codebases
- Optimizing existing code while maintaining consistency
- Understanding and extending established patterns
- Ensuring new implementations follow project conventions

## Workflow Execution

⚠️ **Enterprise Approval & Monitoring Required**

This workflow follows enterprise approval checkpoints with real-time monitoring, quality gates, and comprehensive error recovery as defined in:

- `.cc-deck/config/workflows/coding.yaml` (main workflow)
- `.cc-deck/config/monitoring/unified-monitoring-standard.yaml` (monitoring)
- `.cc-deck/config/quality/unified-quality-assurance-standard.yaml` (quality gates)
- `.cc-deck/config/error-handling/unified-error-recovery-standard.yaml` (error handling)

**After Each Workflow Approval**: Immediately proceed to the next workflow as defined in the project-specific YAML configuration.

### Implementation Logic:

1. **Load Project-Specific Workflow**: Automatically detect and load merged workflow configuration if available (e.g., `coding-merged.yaml`)
2. **Complete Current Workflow**: Execute all coding phases using project-specific agents and configuration
3. **Wait for Human Approval**: Present comprehensive review materials
4. **Upon Approval**: Ask user for explicit permission to proceed to next workflow
5. **Request Confirmation**: "Proceed to refactoring workflow? (yes/no)"
6. **Wait for Permission**: Only continue after clear user confirmation

```bash
# After coding workflow completion and approval:
# 1. Present completion summary to user
# 2. Ask: "Coding workflow completed successfully. Proceed to refactoring workflow? (yes/no)"
# 3. Wait for explicit user confirmation
# 4. Only if user confirms: execute /refactoring command
```

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

**CRITICAL**: Execute ALL phases sequentially using the agents specified in the loaded workflow configuration. Do NOT skip phases.

**Project-Specific Execution**:

```python
# Automatic workflow loading with project detection
def load_coding_workflow():
    project_id = detect_project_id()

    if project_id:
        merged_path = f".cc-deck/runtime/projects/{project_id}/workflows/generated/coding-merged.yaml"
        if file_exists(merged_path):
            print(f"🎯 Using project-specific coding workflow: {merged_path}")
            return load_workflow_from_yaml(merged_path)

    # Fallback to base workflow
    base_path = ".cc-deck/config/workflows/coding.yaml"
    print(f"📋 Using base coding workflow: {base_path}")
    return load_workflow_from_yaml(base_path)

# Execute workflow phases based on loaded configuration
workflow_config = load_coding_workflow()
execute_workflow_phases(workflow_config)
```

**Standard Phases** (when using base workflow):

1. **Phase 1**: research-agent (Technology research using MCP integrations)
2. **Phase 2**: planning-agent (Develop architecture and implementation strategy)
3. **Phase 3**: serena-onboarding-agent (Initialize Serena MCP and establish TDD environment)
4. **Phase 4**: tdd-agent (Execute strict TDD Red-Green-Refactor cycles)
5. **Phase 5**: implementation-agent (Build complete implementation on TDD foundation)
6. **Phase 6**: testing-agent (Comprehensive testing strategy)
7. **Phase 6.5**: acceptance-reviewer (Specification compliance check with rollback capability)
8. **Phase 7**: documentation-agent (Generate comprehensive documentation)
9. **Phase 8**: Human approval checkpoint - Review completed workflow

**Enhanced Phases** (when using project-specific merged workflow):

- All standard phases **PLUS** project-specific sub-agents integrated into Phase 5:
  - `{project-id}-vercel-optimizer`: Deployment optimization
  - `{project-id}-ai-image-manager`: AI content generation
  - `{project-id}-playwright-tester`: E2E testing automation
  - `{project-id}-performance-monitor`: Real-time performance tracking

**Important**: Each phase must be completed by the designated agent(s) before proceeding to the next phase.

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

### Phase 5: Enhanced Multi-Agent Implementation (Dynamic)

**IMPORTANT**: Phase 5 uses a dynamic multi-agent approach that adapts to project-specific configurations.

**⚠️ Anthropic Claude Code Limitation Note**: Due to current Claude Code specifications, sub-agents cannot directly call other sub-agents. Therefore, this implementation uses a **Sequential Agent Pattern** where each supporting agent is executed as a separate phase in sequence, rather than parallel collaboration. This ensures full compliance with Anthropic's sub-agent architecture while achieving the desired multi-agent functionality.

#### Dynamic Phase 5 Execution Strategy:

1. **Load Merged Workflow Configuration**: Read the `coding-merged.yaml` to identify available supporting agents
2. **Parse Supporting Agents**: Extract all agents from `supporting_agents` section  
3. **Execute Sequential Sub-Phases**: Convert each supporting agent into a sequential phase

#### Implementation Logic:

```python
# Dynamic phase 5 execution
def execute_phase_5_dynamically():
    workflow_config = load_merged_workflow()
    supporting_agents = workflow_config['phases'][4]['agent_orchestration']['supporting_agents']
    
    # Execute each supporting agent as sequential sub-phase
    for agent_name, agent_description in supporting_agents.items():
        execute_sub_phase(
            name=f"phase_5_{agent_name.replace('-', '_')}",
            agent=agent_name,
            description=agent_description,
            inputs=previous_phase_outputs
        )
    
    # Finally execute primary implementation agent
    execute_sub_phase(
        name="phase_5_primary_implementation", 
        agent="implementation-agent",
        inputs=all_supporting_agent_outputs
    )
```

#### Dynamic Sub-Phase Generation:

The system will automatically create sequential sub-phases based on the `supporting_agents` found in the merged workflow:

- **Phase 5a**: First supporting agent (e.g., `research-agent`)
- **Phase 5b**: Second supporting agent (e.g., `deepwiki-research-solver`) 
- **Phase 5c**: Third supporting agent (e.g., `project-specific-optimizer`)
- **Phase 5n**: Final primary implementation (`implementation-agent`)

**Purpose**: Build complete implementation on TDD foundation with project-specific optimization
**Focus**: Maintain ALL existing tests while expanding functionality with specialized agent support
**Activities**: Edge case handling, performance optimization, production readiness via multi-agent collaboration
**Outputs**: Complete production code with 95%+ test coverage and project-specific enhancements

This approach ensures compatibility with any project-specific agents added via the workflow merging process.

### Phase 6: Comprehensive Testing

- **Agent**: testing-agent
- **Purpose**: Add integration and E2E testing to TDD foundation
- **Test Types**: Integration tests, E2E tests (conditional)
- **Outputs**: Complete test suite, coverage reports

### Phase 6.5: Specification Compliance Check

- **Agent**: acceptance-reviewer
- **Purpose**: Verify implementation compliance with specifications and detect missing features
- **Verification Process**:
  - **Specification Analysis**: Parse .kiro/specs/ directory for requirements
  - **Implementation Verification**: Compare code against specification requirements
  - **Tasks Completion Check**: Verify tasks.md completion status
  - **Gap Analysis**: Identify missing features and implementation deviations
- **Decision Logic**: 
  - **✅ Success**: Compliance ≥90% + No critical gaps → Proceed to Phase 7
  - **❌ Failure**: Compliance <90% OR critical gaps → Rollback to Phase 4 (TDD Cycle)
- **Quality Gates**:
  - Mandatory features: 100% complete
  - Optional features: ≥80% complete  
  - Tasks completion: ≥95%
  - Specification alignment: ≥90%
- **Rollback Context**: Preserves all tests and completed components while focusing on specification gaps
- **Outputs**: Compliance report, specification gaps, missing features list, implementation completeness score

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

## Enterprise TDD Quality Guarantees

- **100% TDD Coverage**: Every line of production code driven by tests
- **95%+ Test Coverage**: Comprehensive test suite with high coverage metrics (Line 95%+, Branch 90%+, Function 95%+)
- **t-wada Methodology**: Strict adherence to proven TDD principles with Red-Green-Refactor documentation
- **5-Dimension Quality**: Functional (100%), Technical (8.0/10+), Process (95%+), UX (8.5/10+), Operational (99.9%+)
- **Real-time Monitoring**: Performance metrics, quality trends, TDD compliance tracking
- **Error Recovery**: 6-category error handling with automatic retry, checkpoint rollback, circuit breaker
- **Security Compliance**: Encryption, access control, complete audit trail

## Integration Points

- **Post-Kiro SDD**: Seamlessly continues from approved specifications
- **Task-Driven**: Integrates with `.kiro/specs/{feature}/tasks.md` for progress tracking
- **Smart Context**: Maintains context across all development phases
- **Human Approval**: Quality gates ensure stakeholder approval before proceeding

## Enterprise Error Handling & Recovery

- **TDD Violation Prevention**: Strict enforcement of test-first development with compliance monitoring
- **6-Category Error Classification**: Transient, Configuration, Data, Business Logic, Integration, Critical System
- **Automatic Recovery Strategies**: Retry with exponential backoff, checkpoint rollback, circuit breaker, fallback services
- **Quality Checkpoints**: 5-dimension quality gates with automated validation at each phase
- **Proactive Monitoring**: Real-time alerts for performance degradation, quality regression, TDD violations
- **Human Escalation**: Structured escalation path (Technical Lead → Engineering Manager → CTO)
- **Rollback Support**: Comprehensive checkpoint system with 72-hour retention

Always ensure that enterprise TDD principles are strictly followed with comprehensive monitoring, unified quality assurance, and robust error handling. All code must be driven by well-designed tests with real-time quality tracking and proactive issue prevention.
