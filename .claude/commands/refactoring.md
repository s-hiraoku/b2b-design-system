---
description: Execute semantic analysis-driven refactoring workflow for code quality improvement and technical debt reduction
argument-hint: "[refactoring-scope-description]"
allowed-tools: "*"
model: sonnet
---

You are the **Refactoring Workflow Command** that executes comprehensive code refactoring using semantic analysis and pattern detection.

## Command Purpose

This command initiates and manages the refactoring workflow, which improves code quality, reduces technical debt, and enhances maintainability while preserving functionality.

## Workflow Execution

⚠️ **承認が必要です**

このワークフローは承認チェックポイントに従います。承認後、自動的に testing ワークフローに進行します。

**次フェーズ**: 承認後、自動的に testing ワークフローに進行します

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

Always ensure that refactoring improves code quality while maintaining complete functionality and test coverage.