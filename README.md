# CC-DECK: Claude Code Development Environment

A comprehensive development environment powered by Claude Code with intelligent sub-agent orchestration and MCP integrations.

## Overview

CC-DECK provides a structured approach to software development through:

1. **Spec-driven development** using Kiro methodology
2. **Task decomposition** into manageable GitHub issues  
3. **Intelligent implementation** with AI-powered assistance
4. **Comprehensive testing** and quality assurance
5. **Automated documentation** and project management

## Architecture

### Core Components

#### Spec-Driven Development (Kiro)
- **Steering Documents**: Project context and guidelines
- **Requirements**: EARS-format specifications  
- **Design**: Technical architecture and decisions
- **Tasks**: Implementation roadmap with GitHub integration

#### Task Management
- **Create Issues**: Transform tasks.md into GitHub issues
- **Progress Tracking**: Issue-based development workflow
- **Quality Gates**: Automated validation and review

#### Development Tools
- **Coding**: Comprehensive development assistance
- **Refactoring**: Intelligent code improvement
- **Testing**: Multi-level test generation and validation
- **Documentation**: Automated documentation generation

## Available Commands

### Spec-Driven Development
```bash
/spec-driven "Project description"     # Complete spec-driven workflow
/kiro:steering                         # Generate project steering
/kiro:spec-init "Feature description"  # Initialize feature specification
/kiro:spec-requirements {feature}      # Generate requirements
/kiro:spec-design {feature}           # Create technical design  
/kiro:spec-tasks {feature}            # Generate implementation tasks
/kiro:spec-status                     # Check specification status
```

### Task and Issue Management
```bash
/create-issues {feature-name}         # Convert tasks to GitHub issues
/orchestrator "Project request"       # Orchestrate development workflow
```

### Development Assistance
```bash
/coding "Development request"         # Comprehensive coding assistance
/refactoring                         # Intelligent code refactoring
/similarity-refactoring              # Duplicate code detection and refactoring
```

## Sub-Agent Architecture

### Kiro Agents (Spec-Driven Development)
- **Kiro Steering**: Project context management
- **Kiro Spec Init**: Feature initialization
- **Kiro Spec Requirements**: Requirements definition
- **Kiro Spec Design**: Technical design
- **Kiro Spec Tasks**: Implementation planning
- **Kiro Spec Status**: Progress monitoring

### Issue Management Agents  
- **Create Issues**: Main orchestrator
- **Task Parser**: Parse tasks.md structure
- **Issue Generator**: Create GitHub issues
- **Metadata Manager**: Apply labels and dependencies

### Coding Agents
- **Coding**: Main development orchestrator
- **Research Agent**: Technology research (Web, DeepWiki, Context7)
- **Planning Agent**: Architecture and strategy planning
- **Implementation Agent**: Code generation (Serena MCP)
- **Testing Agent**: Test strategy and implementation
- **Documentation Agent**: Documentation generation

### Refactoring Agents
- **Refactoring**: Main refactoring orchestrator
- **Pattern Detector**: Code similarity detection
- **Code Analyzer**: Structure and dependency analysis
- **Refactoring Implementer**: Safe code transformations
- **Quality Validator**: Validation and verification

## MCP Integrations

### Research and Documentation
- **DeepWiki MCP**: GitHub repository analysis and documentation
- **Context7 MCP**: Library and framework documentation
- **Brave Search**: Web search for best practices and solutions

### Code Development
- **Serena MCP**: Intelligent code generation, editing, and refactoring
- **Playwright**: Browser automation for testing and validation

## Development Workflow

### 1. Specification Phase
```bash
# Create project steering
/kiro:steering

# Initialize feature specification
/kiro:spec-init "User authentication system"

# Generate requirements
/kiro:spec-requirements user-auth-system

# Create technical design  
/kiro:spec-design user-auth-system

# Generate implementation tasks
/kiro:spec-tasks user-auth-system
```

### 2. Task Management Phase
```bash
# Convert tasks to GitHub issues
/create-issues user-auth-system

# Check progress
/kiro:spec-status
```

### 3. Implementation Phase
```bash
# Comprehensive development assistance
/coding "Implement JWT authentication with OAuth 2.0"

# Code quality improvement
/refactoring

# Duplicate code cleanup
/similarity-refactoring
```

### 4. Quality Assurance
- Automated testing at multiple levels
- Code quality validation
- Security and performance verification
- Documentation generation and validation

## Project Structure

```
.claude/
├── commands/           # Custom slash commands
│   ├── coding.md
│   ├── create-issues.md
│   ├── refactoring.md
│   └── similarity-refactoring.md
├── agents/            # Specialized sub-agents
│   ├── coding/        # Development assistance agents
│   ├── create-issues/ # Issue management agents
│   ├── kiro/         # Spec-driven development agents
│   └── refactor/     # Code refactoring agents
└── settings.local.json

docs/
├── ARCHITECTURE.md    # System architecture documentation
└── kiro/             # Spec-driven development examples
```

## Getting Started

1. **Initialize Project Steering**
   ```bash
   /kiro:steering
   ```

2. **Create Feature Specification**
   ```bash
   /kiro:spec-init "Your feature description"
   ```

3. **Follow Spec-Driven Workflow**
   ```bash
   /spec-driven "Complete feature implementation"
   ```

4. **Convert to Implementation Tasks**
   ```bash
   /create-issues {feature-name}
   ```

5. **Implement with AI Assistance**
   ```bash
   /coding "Implementation request"
   ```

## Quality Standards

- **Test Coverage**: Comprehensive multi-level testing
- **Code Quality**: Automated quality validation and improvement
- **Documentation**: Automated generation and maintenance
- **Security**: Built-in security best practices and validation
- **Performance**: Performance considerations and optimization

## Contributing

This project follows the spec-driven development methodology:

1. Create specifications using Kiro workflow
2. Generate implementation tasks
3. Convert tasks to GitHub issues
4. Implement with comprehensive testing
5. Validate quality and functionality
6. Update documentation

See [ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed system documentation.
