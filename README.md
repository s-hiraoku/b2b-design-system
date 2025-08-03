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

## Available Command

CC-DECK uses a single, intelligent command that automatically manages your entire development workflow:

```bash
/orchestrator                         # Continue from where you left off
/orchestrator "Project description"   # Start new project or feature
```

### Intelligent Workflow Management

The `/orchestrator` command automatically:
- **Detects project state** by analyzing specifications, issues, and code
- **Determines next phase** based on completed work and pending tasks
- **Delegates to appropriate agents** for specialized execution
- **Maintains continuity** across development sessions

### Usage Examples

```bash
# Start a new project
/orchestrator "Build a real-time chat application"

# Continue development (auto-detects current phase)
/orchestrator

# Jump to specific phase if needed
/orchestrator "coding user-authentication"
/orchestrator "acceptance payment-system"
/orchestrator "pr-merge 123"
```

### Workflow Phases

The orchestrator manages all development phases:
1. **Specification** - Project steering and requirements
2. **Design** - Technical architecture and decisions
3. **Tasks** - Implementation planning
4. **Issues** - GitHub issue creation and tracking
5. **Coding** - Implementation with AI assistance
6. **Testing** - Comprehensive test coverage
7. **Refactoring** - Code quality improvement
8. **Acceptance** - Human approval workflows
9. **PR Management** - Creation and merge workflows
10. **Next Steps** - Continuous workflow progression

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

### Getting Started

Simply run `/orchestrator` and the system will guide you through the entire development process:

```bash
# First time - starts project setup
/orchestrator
# → "No active features found. Starting with project steering..."

# Subsequent runs - continues from last phase
/orchestrator
# → "Feature 'user-auth' at Design phase. Continuing with task generation..."
```

### Automatic Workflow Progression

The orchestrator automatically manages phase transitions:

1. **Project Setup** → Steering document creation
2. **Feature Planning** → Requirements and design
3. **Task Generation** → Implementation roadmap
4. **Development** → Coding with AI assistance
5. **Quality Assurance** → Testing and refactoring
6. **Deployment** → PR creation and merge
7. **Continuation** → Next issue identification

### Manual Phase Control (Optional)

While the orchestrator handles progression automatically, you can jump to specific phases:

```bash
# Force specific workflow phase
/orchestrator "kiro:spec-design user-auth"
/orchestrator "coding authentication-module"
/orchestrator "acceptance user-management"
/orchestrator "pr-merge 123"
```

## Project Structure

```
.claude/
├── commands/              # Custom slash commands
│   ├── orchestrator.md    # Single intelligent workflow orchestrator
│   └── _archived/         # Archived individual commands (reference only)
├── agents/                # Specialized sub-agents
│   ├── acceptance/        # Human approval workflows
│   ├── check-issues/      # Issue validation and approval
│   ├── coding/            # Development assistance agents
│   ├── create-issues/     # Issue management agents
│   ├── e2e-test/         # End-to-end testing agents
│   ├── integration-test/  # Integration testing agents
│   ├── kiro/             # Spec-driven development agents
│   ├── pr-create/        # PR creation agents
│   ├── pr-merge/         # PR merge workflow agents
│   └── refactor/         # Code refactoring agents
└── settings.local.json    # MCP server configuration

docs/
├── ARCHITECTURE.md        # System architecture documentation
└── kiro/                 # Spec-driven development examples

specs/                    # Feature specifications (auto-generated)
└── {feature}/           # Individual feature specs and status
```

## Getting Started

1. **Start Your Project**
   ```bash
   /orchestrator
   ```
   That's it! The system will guide you through the entire process.

2. **Continue Development**
   ```bash
   /orchestrator
   ```
   Automatically picks up where you left off.

3. **Start New Feature**
   ```bash
   /orchestrator "Build user authentication system"
   ```
   Begins a new feature workflow with intelligent phase management.

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
