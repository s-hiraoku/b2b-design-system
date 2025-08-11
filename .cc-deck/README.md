# CC-Deck Workflow Engine

## Overview
CC-Deck (Claude Code Deck) workflow orchestration system implementing Workflow Composition Pattern + Smart Context Propagation to realize the ARCHITECTURE.md design.

## Directory Structure

```
.cc-deck/
├── README.md                    # This file - system overview
├── config/                      # System Configuration (Git tracked)
│   ├── schemas/                 # Data validation schemas
│   │   └── context-schema.json  # Smart Context schema
│   ├── standards/               # Unified system standards
│   │   ├── error-recovery.yaml  # Error handling standards
│   │   ├── monitoring.yaml      # Monitoring & metrics
│   │   ├── quality-assurance.yaml # Quality assurance
│   │   └── workflow-engine.yaml # Workflow engine spec
│   └── workflows/               # Workflow definitions
│       ├── base/                # Base workflows (7 files)
│       ├── dynamic/             # Dynamic project workflows
│       └── templates/           # Creation templates
├── src/                         # Source Code Components (Git tracked)
│   ├── cli/                     # Command-line tools
│   │   └── smart-context-cli.js # Smart Context management
│   ├── runtime/                 # Runtime management system
│   │   ├── context-aware-agent-base.js
│   │   └── smart-context-manager.js
│   └── utils/                   # Utility functions
└── runtime/                     # Runtime Execution Data (Git ignored)
    ├── global/                  # System-wide runtime data
    │   ├── context/             # Smart Context data
    │   ├── checkpoints/         # Recovery checkpoints
    │   ├── logs/                # Execution logs
    │   └── sessions/            # CLI session data
    ├── projects/                # Project-specific data
    └── temp/                    # Temporary files
```

## Purpose

This directory contains the CC-Deck Workflow Engine that enables:

1. **Workflow Orchestration**: Base workflow definitions with extensible templates
2. **Smart Context System**: Advanced context management with cross-workflow state sharing  
3. **Unified Standards**: Consistent error handling, monitoring, and quality assurance
4. **Dynamic Agent Support**: Project-specific MCP agent generation and integration
5. **Development Tools**: CLI tools and runtime management for workflow execution

## Key Features

### 🔧 Smart Context Management
- **Cross-workflow state persistence**: Context preserved across sessions
- **Agent memory sharing**: Agents communicate and learn from each other  
- **User preference learning**: System adapts to user choices and patterns
- **Quality metrics tracking**: Continuous improvement through measurement

### 🎯 Workflow Engine
- **Template-based creation**: Standardized workflow and agent generation
- **Project-agnostic design**: Scalable architecture for multiple projects
- **Error recovery**: Automatic checkpoints and recovery mechanisms
- **Quality gates**: Integrated quality assurance throughout execution

## Integration with Kiro SDD

The CC-Deck workflow engine integrates with Kiro SDD by:

- Respecting the `.kiro/` directory structure for specifications
- Reading and updating `tasks.md` files for implementation tracking
- Using `kiro_status.json` for phase management
- Maintaining separation between SDD process and orchestration logic

## Usage

### Command Line Interface

```bash
# Smart Context management
node .cc-deck/src/cli/smart-context-cli.js init <project-id> <workflow>
node .cc-deck/src/cli/smart-context-cli.js show <project-id>
node .cc-deck/src/cli/smart-context-cli.js stats

# Workflow execution via orchestrator
/orchestrator                    # Intelligent workflow selection
/orchestrator "resume project"   # Resume interrupted workflow  
/orchestrator "coding feature"   # Specific workflow execution
```

### Integration Points

The CC-Deck Workflow Engine integrates with:

- **`/orchestrator` command**: Main entry point for workflow execution
- **Claude Code agents**: Enhanced with Smart Context awareness
- **Kiro SDD process**: Seamless `.kiro/specs/*/tasks.md` integration
- **MCP services**: Advanced service integration and optimization

For detailed architecture information, see `docs/design/ARCHITECTURE.md` and `docs/design/smart-context-specification.md`.