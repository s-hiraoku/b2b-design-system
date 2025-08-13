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

## Enhanced Agent Integration

**Smart Agent Selection**: This command automatically detects and uses enhanced implementation capabilities:

1. **Enhanced Agent**: `.claude/agents/coding/dynamic/{project-id}/enhanced-implementation-agent.md`
2. **MCP Setup Status**: `.cc-deck/runtime/projects/{project-id}/config/mcp-setup-complete.json`
3. **Fallback**: Standard `implementation-agent` from base workflow

### Automatic Enhancement Detection:

The command detects enhanced capabilities using:

- Enhanced agent availability (`.claude/agents/coding/dynamic/{project-id}/`)
- Claude Code system recognition of enhanced agent
- MCP setup completion status (`.cc-deck/runtime/projects/{project-id}/config/`)
- Project context from Smart Context (current_project_id)

When enhanced capabilities are available, the workflow automatically provides:

- **MCP-Enhanced Implementation**: Integrated Context7, DeepWiki, Serena capabilities
- **Real-time Documentation Access**: Latest library and framework documentation
- **Pattern-Aware Development**: Repository analysis and best practices application
- **Advanced Code Generation**: Enhanced Serena integration with project context

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

**Phase Execution Instructions**:
- After Phase 6 (testing-agent) completes, you MUST execute Phase 6.5 (acceptance-reviewer)
- Use the Task tool to call: `Task(subagent_type="acceptance-reviewer", description="Specification compliance check", prompt="Verify implementation compliance with specifications and decide whether to proceed to documentation or rollback to TDD cycle")`
- Only proceed to Phase 7 (documentation-agent) after Phase 6.5 approves with PROCEED decision
- If Phase 6.5 returns ROLLBACK decision, return to Phase 4 (tdd-agent)

**Enhanced Agent Selection Logic**:

```python
# Automatic enhanced agent detection and selection
def select_implementation_agent():
    project_id = detect_project_id()

    if project_id:
        enhanced_agent_path = f".claude/agents/coding/dynamic/{project_id}/enhanced-implementation-agent.md"
        mcp_setup_path = f".cc-deck/runtime/projects/{project_id}/config/mcp-setup-complete.json"
        
        if file_exists(enhanced_agent_path) and file_exists(mcp_setup_path):
            print(f"✨ Using enhanced implementation agent with MCP capabilities")
            return "enhanced-implementation-agent"

    # Fallback to standard implementation
    print(f"📋 Using standard implementation agent (enhanced agent unavailable)")
    return "implementation-agent"

# Execute workflow with automatic agent selection
selected_agent = select_implementation_agent()
execute_workflow_phases_with_agent(selected_agent)
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

**Enhanced Implementation** (when enhanced-implementation-agent is available):

- All standard phases with **enhanced Phase 5 capabilities**:
  - **MCP-Enhanced Implementation**: Advanced code generation with real-time documentation
  - **Pattern-Aware Development**: Repository analysis for best practices
  - **Optimized Performance**: Automatic optimization using latest techniques
  - **Enhanced Quality Assurance**: Advanced security scanning and validation

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

### Phase 5: Enhanced Implementation

**Agent Selection**: Uses enhanced-implementation-agent if available, or falls back to standard implementation-agent

#### Automatic Agent Detection:

The system automatically selects the appropriate implementation agent based on dev-env-setup completion:

1. **Check for Enhanced Agent**: Look for `.claude/agents/coding/dynamic/{project_id}/enhanced-implementation-agent.md`
2. **Verify Claude Code Recognition**: Confirm enhanced agent appears in available agent list
3. **Verify MCP Setup**: Confirm `.cc-deck/runtime/projects/{project_id}/config/mcp-setup-complete.json` exists
4. **Agent Selection**:
   - **Enhanced Available**: Use enhanced-implementation-agent with MCP capabilities
   - **Enhanced Unavailable**: Fall back to standard implementation-agent

#### Enhanced Implementation Benefits:

**When enhanced-implementation-agent is available**:
- **MCP Integration**: Context7, DeepWiki, Serena, and other approved MCP tools
- **Real-time Documentation**: Latest library documentation and API validation
- **Pattern Analysis**: Repository pattern analysis from successful projects
- **Advanced Code Generation**: MCP-enhanced intelligent code generation
- **Performance Optimization**: Automatic optimization using latest best practices

**When falling back to implementation-agent**:
- **Standard TDD Implementation**: Reliable TDD-based implementation approach
- **Serena Integration**: Basic Serena MCP for code generation
- **Manual Research**: Standard research and documentation lookup
- **Proven Quality**: Established coding patterns and quality assurance

#### Implementation Process:

**Purpose**: Build complete implementation on TDD foundation with optional MCP enhancement
**Focus**: Maintain ALL existing tests while expanding functionality
**Activities**: Edge case handling, performance optimization, production readiness
**Outputs**: Complete production code with 95%+ test coverage

**Agent Execution Logic**:

Enhanced agent detection and selection is handled automatically by checking:
1. Enhanced agent file availability in `.cc-deck/runtime/projects/{project_id}/agents/`  
2. MCP setup completion status in `.cc-deck/runtime/projects/{project_id}/config/`
3. Automatic fallback to standard implementation-agent when enhanced unavailable

**Phase 4**: Execute TDD cycles using tdd-agent with strict Red-Green-Refactor methodology
**Phase 5**: Automatic agent selection based on availability:
- **Enhanced Available**: Use enhanced-implementation-agent for MCP-powered implementation
- **Enhanced Unavailable**: Use standard implementation-agent for reliable fallback

The system automatically handles agent selection without manual configuration.

**Critical Implementation Notes**:
- Enhanced agent is checked first and gets priority
- Automatic detection of enhanced agent availability
- TDD completion signal triggers automatic transition
- Graceful fallback ensures consistent quality

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
