---
description: Identify and refactor similar code patterns using semantic analysis for improved maintainability
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash, Glob, Grep, LS
---

# Similarity Refactoring Command

Analyze codebase for duplicate patterns and implement intelligent refactoring using Serena MCP's semantic analysis tools to improve code maintainability and reduce duplication.

## Purpose

Transform similar code patterns into maintainable, DRY implementations:

1. **Pattern Detection** - Find duplicate or similar code across the codebase
2. **Semantic Analysis** - Use symbol-level understanding for intelligent refactoring
3. **Safe Refactoring** - Implement changes while preserving functionality
4. **Quality Improvement** - Reduce technical debt and improve maintainability

## Usage

```bash
# Analyze entire codebase for similar patterns
/similarity-refactoring

# Focus on specific directory or file pattern
/similarity-refactoring src/components

# Target specific code pattern
/similarity-refactoring "duplicate validation logic"
```

## Implementation Strategy

### 1. Similarity Detection

Use Serena MCP tools for comprehensive pattern analysis:

- **Pattern Search**: `mcp__serena__search_for_pattern` for textual similarities
- **Symbol Analysis**: `mcp__serena__find_symbol` for structural similarities  
- **Code Overview**: `mcp__serena__get_symbols_overview` for organization understanding
- **Reference Tracking**: `mcp__serena__find_referencing_symbols` for impact analysis

### 2. Refactoring Strategy Development

Based on detected patterns, develop appropriate strategies:

**Extract Common Functions**:
- Identify repeated logic blocks
- Create shared utility functions
- Update all usages to use extracted functions

**Abstract Base Classes**:
- Find similar class structures
- Create abstract base classes or interfaces
- Implement inheritance hierarchy

**Template Methods**:
- Detect algorithm similarities with variations
- Implement template method pattern
- Parameterize differences

**Strategy Patterns**:
- Identify conditional logic variations
- Extract strategies into separate classes
- Use dependency injection or factory patterns

### 3. Safe Implementation

Execute refactoring with precision:

```bash
# Symbol-level refactoring
mcp__serena__replace_symbol_body

# Fine-grained changes
mcp__serena__replace_regex

# Add imports/declarations
mcp__serena__insert_before_symbol

# Add implementations
mcp__serena__insert_after_symbol
```

## Refactoring Workflow

### Phase 1: Analysis

1. **Memory Context**
   ```bash
   # Read project memories for context
   mcp__serena__list_memories
   mcp__serena__read_memory
   ```

2. **Pattern Discovery**
   ```bash
   # Search for similar code patterns
   mcp__serena__search_for_pattern
   # Analyze symbol structure
   mcp__serena__get_symbols_overview
   ```

3. **Impact Assessment**
   ```bash
   # Find all references before changes
   mcp__serena__find_referencing_symbols
   ```

### Phase 2: Planning

1. **Refactoring Strategy**
   - Group similar patterns by refactoring approach
   - Plan extraction targets (functions, classes, modules)
   - Design new abstractions and interfaces

2. **Implementation Order**
   - Start with leaf dependencies
   - Progress to higher-level abstractions
   - Minimize breaking changes

### Phase 3: Execution

1. **Create Abstractions**
   ```bash
   # Create new shared functions/classes
   mcp__serena__insert_after_symbol
   ```

2. **Update References**
   ```bash
   # Replace implementations with abstractions
   mcp__serena__replace_symbol_body
   mcp__serena__replace_regex
   ```

3. **Clean Up**
   - Remove duplicate code
   - Update imports and dependencies
   - Verify all references are updated

### Phase 4: Validation

1. **Reference Verification**
   ```bash
   # Ensure all usages are properly updated
   mcp__serena__find_referencing_symbols
   ```

2. **Structure Validation**
   ```bash
   # Verify refactored code organization
   mcp__serena__get_symbols_overview
   ```

3. **Functionality Testing**
   - Run existing tests
   - Verify no functionality lost
   - Check edge cases still work

## Advanced Features

### Memory-Based Learning

- **Pattern Recognition**: Remember common refactoring patterns
- **Project Context**: Understand codebase conventions and architecture
- **Best Practices**: Apply learned refactoring strategies

### Intelligent Detection

- **Semantic Similarity**: Beyond textual matching, understand code intent
- **Structural Analysis**: Identify similar algorithms with different implementations  
- **Cross-Language Patterns**: Detect similar patterns across different file types

### Safe Transformations

- **Reference Tracking**: Ensure all usages are updated correctly
- **Incremental Changes**: Apply refactoring in safe, verifiable steps
- **Rollback Support**: Maintain ability to undo changes if needed

## Quality Metrics

### Duplication Reduction

- **Before/After Analysis**: Measure code duplication reduction
- **Complexity Metrics**: Track cyclomatic complexity improvements
- **Maintainability Index**: Calculate overall maintainability gains

### Safety Verification

- **Reference Completeness**: All references properly updated
- **Test Coverage**: Existing tests still pass
- **Functionality Preservation**: No behavior changes introduced

## Error Handling

### Pre-Refactoring Validation

```bash
# Verify Serena MCP availability
if ! command -v mcp__serena__get_symbols_overview &> /dev/null; then
  echo "Error: Serena MCP not available"
  exit 1
fi

# Check for uncommitted changes
if ! git diff --quiet; then
  echo "Warning: Uncommitted changes detected"
  echo "Consider committing before refactoring"
fi
```

### Recovery Procedures

- **Git Integration**: Create commits before major refactoring
- **Backup Creation**: Save original implementations
- **Rollback Planning**: Provide clear rollback instructions

## Integration Points

### Development Workflow

- **Pre-commit Hooks**: Detect new duplication
- **Code Review**: Highlight refactoring opportunities
- **CI/CD Integration**: Automated duplication detection

### Project Management

- **Technical Debt Tracking**: Quantify and prioritize refactoring work
- **Progress Metrics**: Track code quality improvements over time
- **Team Communication**: Share refactoring insights and patterns

This command provides intelligent, safe refactoring capabilities using advanced semantic analysis to improve code maintainability while preserving functionality.