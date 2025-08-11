---
description: Execute enterprise-grade semantic analysis-driven refactoring workflow with unified monitoring and comprehensive error handling
argument-hint: "[refactoring-scope-description]"
allowed-tools: "*"
---

You are the **Enterprise Refactoring Workflow Command** that executes comprehensive code refactoring using semantic analysis and pattern detection with enterprise monitoring, unified quality assurance, and comprehensive error handling.

## Initial Setup: Current Date Information

**CRITICAL**: Always call the following agent first to execute the command correctly.

```bash
# First action: Get current date information
Task(subagent_type="date-utility", description="Get current date information", prompt="Please provide current date and time information for use in this refactoring workflow session, including search-appropriate year formatting.")

# Second action: User interaction guidelines reminder
Task(subagent_type="user-interaction-reminder", description="User interaction guidelines", prompt="Provide critical reminders about proper user interaction protocols for this refactoring workflow session.")
```

## Command Purpose

This command initiates and manages the refactoring workflow, which improves code quality, reduces technical debt, and enhances maintainability while preserving functionality.

## Workflow Execution

⚠️ **Enterprise Approval & Monitoring Required**

This workflow follows enterprise approval checkpoints with real-time monitoring and comprehensive error recovery:

- `.cc-deck/config/workflows/refactoring.yaml` (main workflow)
- `.cc-deck/config/monitoring/unified-monitoring-standard.yaml` (monitoring)
- `.cc-deck/config/quality/unified-quality-assurance-standard.yaml` (quality gates)
- `.cc-deck/config/error-handling/unified-error-recovery-standard.yaml` (error handling)

**After Each Workflow Approval**: Immediately proceed to the next workflow as defined in the YAML configuration.

### Implementation Logic:

1. **Complete Current Workflow**: Execute all refactoring phases
2. **Wait for Human Approval**: Present comprehensive review materials
3. **Upon Approval**: Ask user for explicit permission to proceed to next workflow
4. **Request Confirmation**: "Proceed to testing workflow? (yes/no)"
5. **Wait for Permission**: Only continue after clear user confirmation

```bash
# After refactoring workflow completion and approval:
# 1. Read .cc-deck/config/workflows/refactoring.yaml
# 2. Find "next_workflow: testing" in the approval section
# 3. Immediately execute the next workflow command: /testing
# 4. Continue until acceptance workflow completes
```

### Execution Steps:

**CRITICAL**: Execute ALL phases sequentially using the specified agents. Do NOT skip phases.

1. **Phase 1**: pattern-detector (Identify duplicate and similar code patterns)
2. **Phase 2**: code-analyzer (Analyze code structure and dependencies)
3. **Phase 3**: Intelligent routing to appropriate refactoring agent:
   - serena-mcp-refactoring (Complex semantic analysis)
   - similarity-refactoring (Pattern-based consolidation)
   - refactoring-implementer (Standard code improvements)
4. **Phase 4**: quality-validator (Comprehensive validation of results)
5. **Phase 5**: Human approval checkpoint - Review completed workflow

**Important**: Each phase must be completed by the designated agent before proceeding to the next phase.

## Refactoring Workflow Phases

### Phase 1: Code Analysis

- **Agents**: pattern-detector, code-analyzer
- **Purpose**: Comprehensive codebase analysis for refactoring opportunities
- **Analysis Types**:
  - **Pattern Detection**: Identify duplicate and similar code patterns
  - **Structure Analysis**: Evaluate code architecture and dependencies
  - **Quality Metrics**: Assess maintainability, complexity, and technical debt
- **Outputs**: Analysis reports, refactoring opportunities, impact assessments

### Phase 2: Refactoring Execution

- **Agent Selection**: Intelligent routing based on refactoring type
- **Execution Strategies**:
  - **Serena MCP Refactoring** (`serena-mcp-refactoring`): Advanced semantic analysis
  - **Similarity Refactoring** (`similarity-refactoring`): Pattern-based consolidation
  - **General Refactoring** (`refactoring-implementer`): Standard code improvements
- **Safety Measures**: Preserve all existing functionality and tests
- **Outputs**: Refactored code, transformation logs, change documentation

### Phase 3: Quality Validation

- **Agent**: quality-validator
- **Purpose**: Comprehensive validation of refactoring results
- **Validation Checks**:
  - **Functionality Preservation**: All tests must pass
  - **Quality Improvement**: Measurable enhancement in code metrics
  - **Performance Impact**: Ensure no performance degradation
  - **Integration Integrity**: Maintain all external interfaces
- **Outputs**: Validation reports, quality metrics, approval recommendations

## Refactoring Specializations

### 🤖 Serena MCP Refactoring

- **Use Case**: Complex semantic transformations
- **Capabilities**: Context-aware code understanding and improvement
- **Strengths**: Advanced pattern recognition, architectural improvements
- **Integration**: Full Serena MCP memory and symbol analysis

### 🔄 Similarity-Based Refactoring

- **Use Case**: Duplicate code consolidation and pattern extraction
- **Capabilities**: Identify and merge similar code structures
- **Strengths**: DRY principle enforcement, pattern abstraction
- **Reference**: Based on [mizchi/similarity](https://github.com/mizchi/similarity) concepts

### ⚙️ General Refactoring Implementation

- **Use Case**: Standard code quality improvements
- **Capabilities**: Code cleanup, naming improvements, structure optimization
- **Strengths**: Broad applicability, safe transformations

## Usage Examples

```bash
# General code quality improvement
/refactoring "Improve code quality and reduce technical debt in user authentication module"

# Duplicate code elimination
/refactoring "Consolidate similar API endpoint handlers and extract common patterns"

# Architecture improvement
/refactoring "Refactor data access layer to implement repository pattern"

# Performance optimization
/refactoring "Optimize database queries and improve caching in product catalog"

# Legacy code modernization
/refactoring "Modernize legacy payment processing code with current patterns and practices"
```

## Quality Assurance

### Safety Guarantees

- **Test Preservation**: All existing tests must continue to pass
- **Functionality Integrity**: No behavioral changes to external interfaces
- **Incremental Changes**: Small, reviewable transformations
- **Rollback Support**: Ability to revert changes if issues arise

### Quality Metrics

- **Maintainability Index**: Measurable improvement in code maintainability
- **Cyclomatic Complexity**: Reduction in code complexity metrics
- **Duplication Ratio**: Decreased code duplication percentage
- **Test Coverage**: Maintained or improved test coverage

## Integration Points

- **Post-Implementation**: Natural follow-up to development phases
- **Quality Gates**: Human approval required for significant changes
- **Documentation Updates**: Automatic documentation refresh after refactoring
- **CI/CD Integration**: Full test suite validation before approval

## Risk Management

- **Impact Analysis**: Thorough assessment of refactoring impact
- **Staged Execution**: Large refactorings broken into manageable phases
- **Validation Checkpoints**: Quality validation at each transformation step
- **Recovery Planning**: Clear rollback procedures for each refactoring type

Always ensure that enterprise refactoring improves code quality while maintaining complete functionality, test coverage, and comprehensive monitoring. All refactoring must comply with unified quality assurance standards and include proactive error handling with real-time performance tracking.
