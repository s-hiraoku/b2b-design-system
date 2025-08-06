# CC-Deck Workflow Engine

## Overview
CC-Deck (Claude Code Deck) workflow orchestration system implementing Workflow Composition Pattern + Smart Context Propagation to realize the ARCHITECTURE.md design.

## Directory Structure

```
.cc-deck/
├── workflows/          # Workflow definition files
│   ├── kiro-sdd.yaml   # Kiro SDD integration workflow
│   ├── coding.yaml     # Comprehensive coding workflow
│   ├── refactoring.yaml
│   └── testing.yaml
├── context/            # Smart Context storage
│   ├── workflow-states.json
│   └── feature-contexts/
├── checkpoints/        # Recovery checkpoints
├── engine/             # Workflow engine implementation
│   ├── workflow-engine.md
│   └── task-integration.md
└── README.md
```

## Purpose

This directory contains the workflow orchestration system that enables:

1. **Workflow Composition**: Hierarchical workflow definitions with phase management
2. **Smart Context Propagation**: Context sharing between agents and phases  
3. **Kiro SDD Integration**: Seamless integration with `.kiro/specs/*/tasks.md` files
4. **Agent Orchestration**: Intelligent agent selection and delegation
5. **State Management**: Persistent workflow state and recovery capabilities

## Integration with Kiro SDD

The CC-Deck workflow engine integrates with Kiro SDD by:

- Respecting the `.kiro/` directory structure for specifications
- Reading and updating `tasks.md` files for implementation tracking
- Using `kiro_status.json` for phase management
- Maintaining separation between SDD process and orchestration logic

## Usage

The workflow engine is integrated into `/orchestrator` command and operates transparently to provide the advanced orchestration capabilities described in `docs/ARCHITECTURE.md`.