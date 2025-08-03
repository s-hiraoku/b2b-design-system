---
description: Comprehensive coding assistance with research, planning, implementation, testing, and documentation using MCP tools
allowed-tools: Task, Read, Write, Edit, MultiEdit, Bash, Glob, Grep, LS, WebSearch, mcp__brave-search__brave_web_search, mcp__deepwiki__read_wiki_structure, mcp__deepwiki__read_wiki_contents, mcp__deepwiki__ask_question, mcp__context7__resolve-library-id, mcp__context7__get-library-docs, mcp__playwright__browser_navigate, mcp__playwright__browser_snapshot, mcp__playwright__browser_click
---

# Coding Command

Comprehensive coding assistance system that leverages research, planning, implementation, testing, and documentation through specialized sub-agents and MCP integrations.

## Purpose

Provide end-to-end coding support with intelligent automation:

1. **Research & Discovery** - Find relevant information, libraries, and best practices
2. **Strategic Planning** - Develop implementation strategy and architecture
3. **Code Implementation** - Generate high-quality, maintainable code
4. **Testing & Validation** - Ensure code quality and functionality
5. **Documentation** - Create comprehensive project documentation

## Usage

```bash
# General coding assistance
/coding "Build a REST API with authentication"

# Specific feature implementation
/coding "Add real-time notifications to existing chat app"

# Technology research and planning
/coding "Compare React vs Vue for new dashboard project"

# Code review and improvement
/coding "Review and optimize this database query performance"
```

## Implementation Strategy

### 1. Sub-Agent Orchestration

Delegate specialized tasks to expert sub-agents:

- **Primary Agent**: `Coding` - Main orchestrator for development workflow
- **Research Agent**: `Research Agent` - Information gathering and technology analysis
- **Planning Agent**: `Planning Agent` - Architecture design and implementation strategy
- **Implementation Agent**: `Implementation Agent` - Code generation and development
- **Testing Agent**: `Testing Agent` - Test strategy and quality assurance
- **Documentation Agent**: `Documentation Agent` - Project documentation and examples

### 2. MCP Integration Strategy

#### DeepWiki MCP Integration
- **Repository Analysis**: Understand existing codebases and patterns
- **Documentation Mining**: Extract implementation insights from GitHub repos
- **Best Practice Discovery**: Learn from successful open-source projects

#### Context7 MCP Integration
- **Library Research**: Get up-to-date documentation for any library
- **API Documentation**: Access current API specifications and examples
- **Framework Guidance**: Understand framework capabilities and best practices

#### Serena MCP Integration
- **Code Generation**: Intelligent code creation and modification
- **Symbol Management**: Precise code editing and refactoring
- **Memory Integration**: Learn and remember project patterns

### 3. Web Search Integration

Comprehensive information gathering:
- **Technology Trends**: Latest developments and best practices
- **Problem Solutions**: Specific implementation guidance
- **Community Insights**: Real-world usage patterns and gotchas
- **Performance Benchmarks**: Optimization opportunities and comparisons

## Workflow Architecture

### Phase 1: Research & Analysis

1. **Technology Research**
   - Web search for latest best practices
   - DeepWiki analysis of relevant repositories
   - Context7 documentation gathering

2. **Requirements Analysis**
   - Understand project context and constraints
   - Identify technical requirements and dependencies
   - Assess existing codebase patterns

### Phase 2: Strategic Planning

1. **Architecture Design**
   - Technology stack selection
   - System architecture planning
   - Integration strategy development

2. **Implementation Planning**
   - Break down into manageable tasks
   - Identify dependencies and prerequisites
   - Plan testing and validation approach

### Phase 3: Implementation

1. **Code Generation**
   - Use Serena MCP for intelligent code creation
   - Apply learned patterns and best practices
   - Ensure consistency with existing codebase

2. **Quality Assurance**
   - Code review and optimization
   - Error handling and edge case coverage
   - Performance consideration integration

### Phase 4: Testing & Validation

1. **Test Strategy Development**
   - Unit testing approach
   - Integration testing requirements
   - End-to-end testing scenarios

2. **Test Implementation**
   - Automated test creation
   - Mock and fixture setup
   - Coverage analysis and improvement

### Phase 5: Documentation

1. **Code Documentation**
   - Inline comments and docstrings
   - API documentation generation
   - Usage examples and tutorials

2. **Project Documentation**
   - README creation and updates
   - Architecture documentation
   - Deployment and maintenance guides

## Advanced Features

### Intelligent Context Awareness

- **Project Memory**: Remember project patterns and preferences
- **Technology Alignment**: Ensure consistency with existing tech stack
- **Team Standards**: Adapt to team coding conventions and practices

### Multi-Language Support

- **Language-Specific Research**: Tailored information for target language
- **Framework Integration**: Deep understanding of framework ecosystems
- **Best Practice Application**: Language-specific optimization and patterns

### Real-Time Learning

- **Pattern Recognition**: Learn successful implementation patterns
- **Error Prevention**: Remember and avoid common pitfalls
- **Continuous Improvement**: Refine approach based on project feedback

## Error Handling and Recovery

### Research Phase Failures

```bash
# Handle web search failures
if ! web_search_available; then
  echo "Warning: Web search unavailable, using cached knowledge"
  fallback_to_local_research
fi

# Handle MCP connection issues
if ! mcp_deepwiki_available; then
  echo "Warning: DeepWiki MCP unavailable, using alternative sources"
  use_alternative_documentation_sources
fi
```

### Implementation Failures

- **Incremental Fallback**: Try simpler approaches if complex solutions fail
- **Alternative Strategies**: Multiple implementation paths for robustness
- **Rollback Capability**: Safe recovery from failed implementations

### Quality Assurance

- **Validation at Each Step**: Ensure each phase completes successfully
- **Dependency Checking**: Verify all requirements are met before proceeding
- **Progress Tracking**: Clear visibility into workflow status

## Integration Points

### Input Processing

- **Natural Language**: Process complex coding requests in natural language
- **Context Awareness**: Understand project context and existing codebase
- **Requirement Extraction**: Parse and clarify technical requirements

### Output Generation

- **Code Artifacts**: Generated code, tests, and documentation
- **Implementation Guides**: Step-by-step development instructions
- **Quality Reports**: Code quality metrics and improvement recommendations

### External Integrations

- **Version Control**: Git integration for change management
- **CI/CD Systems**: Integration with build and deployment pipelines
- **Development Tools**: IDE and editor integration capabilities

## Quality Metrics

### Research Quality
- **Information Accuracy**: Relevance and correctness of gathered information
- **Coverage Completeness**: Comprehensive analysis of available options
- **Source Diversity**: Multiple perspectives and approaches considered

### Implementation Quality
- **Code Quality**: Maintainability, readability, and performance
- **Test Coverage**: Comprehensive testing and validation
- **Documentation Quality**: Clear, complete, and helpful documentation

### Workflow Efficiency
- **Time to Implementation**: Speed from request to working code
- **Iteration Cycles**: Rapid feedback and improvement cycles
- **Success Rate**: Percentage of successful implementations

## Example Workflows

### API Development

```bash
# Research best practices for REST API design
# Plan authentication and data validation strategy
# Implement endpoints with proper error handling
# Create comprehensive test suite
# Generate API documentation and usage examples
```

### Frontend Component

```bash
# Research modern component patterns and accessibility
# Plan component architecture and state management
# Implement responsive, accessible component
# Create unit and integration tests
# Document component API and usage examples
```

### Database Integration

```bash
# Research database options and ORM choices
# Plan schema design and migration strategy
# Implement data models and queries
# Create database tests and performance benchmarks
# Document data architecture and query patterns
```

This command provides comprehensive coding assistance through intelligent sub-agent orchestration and advanced MCP integrations for research, planning, implementation, testing, and documentation.