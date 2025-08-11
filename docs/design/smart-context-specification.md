# Smart Context System Specification

**CC-Deck Workflow Engine Core Component**

## 🎯 Overview

Smart Context is the central state management system for CC-Deck Workflow Engine, enabling seamless context sharing between workflows, agents, and execution phases. It provides persistent state storage, intelligent context propagation, and workflow resumption capabilities.

## 🏗️ Architecture Design

### Core Principles

1. **Cross-Workflow State Continuity**: Maintain context across workflow boundaries
2. **Agent-Agnostic Context Sharing**: Any agent can read/write relevant context data
3. **Intelligent Context Filtering**: Only relevant context is propagated to specific agents
4. **Fault-Tolerant Persistence**: Graceful handling of context file corruption
5. **Human-Readable Format**: JSON-based storage for transparency and debugging

### System Architecture

```mermaid
graph TB
    subgraph "Smart Context System"
        ContextManager[Context Manager]
        StateStorage[State Storage]
        ContextPropagation[Context Propagation]
        SchemaValidator[Schema Validator]
    end
    
    subgraph "Workflow Layer"
        Orchestrator[Orchestrator]
        KiroSDD[/kiro-sdd]
        DevEnvSetup[/dev-env-setup]
        Coding[/coding]
        Refactoring[/refactoring]
    end
    
    subgraph "Agent Layer"
        ProjectAnalyzer[project-state-analyzer]
        SpecAnalyzer[spec-analyzer]
        TDDAgent[tdd-agent]
        ImplementationAgent[implementation-agent]
    end
    
    subgraph "Storage Layer"
        ContextFiles[.cc-deck/context/]
        Checkpoints[.cc-deck/checkpoints/]
        WorkflowState[workflow-state.json]
    end
    
    Orchestrator --> ContextManager
    KiroSDD --> ContextManager
    DevEnvSetup --> ContextManager
    Coding --> ContextManager
    Refactoring --> ContextManager
    
    ProjectAnalyzer --> ContextManager
    SpecAnalyzer --> ContextManager
    TDDAgent --> ContextManager
    ImplementationAgent --> ContextManager
    
    ContextManager --> StateStorage
    ContextManager --> ContextPropagation
    ContextManager --> SchemaValidator
    
    StateStorage --> ContextFiles
    StateStorage --> Checkpoints
    StateStorage --> WorkflowState
```

## 📊 Data Structure Design

### 1. Master Context Schema

```json
{
  "context_id": "workflow-feature-20240811",
  "metadata": {
    "created_at": "2024-08-11T10:00:00Z",
    "updated_at": "2024-08-11T15:30:00Z",
    "version": "1.0.0",
    "project_id": "user-auth-system",
    "current_workflow": "coding",
    "schema_version": "1.0"
  },
  "project_state": {
    "project_name": "user-authentication-system",
    "project_type": "react-native-app",
    "complexity": "medium",
    "security_critical": true,
    "technology_stack": {
      "frontend": ["React Native", "TypeScript"],
      "backend": ["Node.js", "Express"],
      "database": ["SQLite", "Prisma"],
      "testing": ["Jest", "Detox"]
    },
    "analysis_timestamp": "2024-08-11T10:00:00Z"
  },
  "workflow_history": [
    {
      "workflow_name": "kiro-sdd",
      "status": "completed",
      "started_at": "2024-08-11T10:00:00Z",
      "completed_at": "2024-08-11T12:00:00Z",
      "human_approved": true,
      "approval_timestamp": "2024-08-11T12:00:00Z",
      "outputs": {
        "specifications_created": true,
        "requirements_file": ".kiro/specs/user-auth-system/requirements.md",
        "design_file": ".kiro/specs/user-auth-system/design.md",
        "tasks_file": ".kiro/specs/user-auth-system/tasks.md"
      }
    }
  ],
  "current_workflow_state": {
    "workflow_name": "coding",
    "status": "in_progress",
    "started_at": "2024-08-11T13:00:00Z",
    "current_phase": "tdd_cycle",
    "completed_phases": ["research", "planning", "serena_onboarding"],
    "phase_outputs": {
      "research": {
        "technology_recommendations": [],
        "security_considerations": [],
        "performance_guidelines": []
      },
      "planning": {
        "architecture_design": {},
        "implementation_strategy": {}
      },
      "serena_onboarding": {
        "project_context_established": true,
        "tdd_environment_ready": true
      }
    }
  },
  "task_progress": {
    "tasks_file": ".kiro/specs/user-auth-system/tasks.md",
    "total_tasks": 12,
    "completed_tasks": 7,
    "current_task": "1.3",
    "completion_percentage": 58,
    "last_updated": "2024-08-11T15:00:00Z",
    "task_details": [
      {
        "task_id": "1.1",
        "description": "React Native環境セットアップ",
        "completed": true,
        "completed_at": "2024-08-11T13:15:00Z",
        "agent": "implementation-agent",
        "files_created": ["package.json", "src/", "components/"]
      }
    ]
  },
  "agent_memory": {
    "project-state-analyzer": {
      "last_analysis": "2024-08-11T10:00:00Z",
      "analysis_results": {},
      "recommendations": []
    },
    "tdd-agent": {
      "test_coverage": 85,
      "current_cycle": "green",
      "red_green_refactor_history": []
    },
    "implementation-agent": {
      "files_created": [],
      "patterns_used": [],
      "dependencies_added": []
    }
  },
  "user_preferences": {
    "workflow_selections": [
      {
        "recommended": "coding",
        "selected": "coding",
        "timestamp": "2024-08-11T13:00:00Z",
        "reasoning": "Accepted AI recommendation"
      }
    ],
    "approval_history": [
      {
        "workflow": "kiro-sdd",
        "decision": "approved",
        "timestamp": "2024-08-11T12:00:00Z"
      }
    ],
    "tdd_preference": "always_use",
    "auto_progression": false
  },
  "quality_metrics": {
    "test_coverage": {
      "line_coverage": 85,
      "branch_coverage": 78,
      "function_coverage": 92,
      "last_measured": "2024-08-11T15:00:00Z"
    },
    "code_quality": {
      "complexity_score": 7.5,
      "maintainability_index": 8.2,
      "technical_debt_minutes": 45
    },
    "workflow_efficiency": {
      "average_phase_duration": "45min",
      "approval_response_time": "5min",
      "total_development_time": "5h30m"
    }
  },
  "integration_context": {
    "mcp_services": {
      "deepwiki_status": "active",
      "context7_status": "active",
      "serena_status": "active",
      "playwright_status": "inactive"
    },
    "generated_agents": [
      {
        "agent_name": "user-auth-system-vercel-agent",
        "generated_at": "2024-08-11T11:30:00Z",
        "status": "active",
        "file_path": ".cc-deck/config/workflows/dynamic/user-auth-system/agents/"
      }
    ]
  },
  "error_recovery": {
    "last_checkpoint": "2024-08-11T14:30:00Z",
    "checkpoint_file": ".cc-deck/checkpoints/coding-phase3-checkpoint.json",
    "recovery_points": []
  }
}
```

### 2. Context Categories

#### 2.1 Project Context
- Project metadata and classification
- Technology stack and dependencies
- Complexity and security assessments

#### 2.2 Workflow Context  
- Current and historical workflow states
- Phase progression and completions
- Human approval decisions and timestamps

#### 2.3 Agent Context
- Agent-specific memory and results
- Cross-agent data sharing
- Performance and execution metrics

#### 2.4 User Context
- Preference learning and patterns
- Decision history and reasoning
- Workflow selection patterns

## 🗂️ File Organization Strategy

### Directory Structure

```
.cc-deck/context/
├── active/                          # Active workflow contexts
│   ├── user-auth-system.json       # Current active context
│   └── payment-system.json         # Another active context
├── completed/                       # Completed workflow contexts
│   ├── 2024-08/                    # Monthly organization
│   │   ├── user-profile-system.json
│   │   └── notification-system.json
│   └── 2024-07/
├── checkpoints/                     # Recovery checkpoints
│   ├── user-auth-coding-phase3.json
│   └── payment-refactoring-phase1.json
├── templates/                       # Context templates
│   ├── project-context-template.json
│   └── workflow-context-template.json
└── schemas/                        # JSON schemas for validation
    ├── context-schema.json
    └── checkpoint-schema.json
```

### File Management Rules

1. **Active Context**: One file per active project/feature
2. **Archival Strategy**: Move to `completed/YYYY-MM/` after final approval
3. **Checkpoint Frequency**: Every major phase completion or 30min intervals
4. **Cleanup Policy**: Archive contexts older than 90 days
5. **Size Management**: Compress contexts larger than 1MB

## 🔄 Context Propagation Logic

### 1. Context Reading Strategy

```javascript
// Context reading priority order
function getRelevantContext(agentType, currentWorkflow, taskContext) {
  const contextLayers = [
    loadProjectContext(),              // Always available
    loadCurrentWorkflowContext(),      // Current workflow state
    loadAgentSpecificContext(agentType), // Agent's memory
    loadTaskSpecificContext(taskContext), // Current task context
    loadUserPreferences()             // User patterns and preferences
  ];
  
  return mergeContextLayers(contextLayers, agentType);
}
```

### 2. Context Writing Strategy

```javascript
// Context update with conflict resolution
function updateContext(agentType, newData, updateType) {
  const currentContext = loadCurrentContext();
  
  switch(updateType) {
    case 'merge':
      return deepMergeContext(currentContext, newData);
    case 'replace':
      return replaceContextSection(currentContext, newData);
    case 'append':
      return appendToContextArray(currentContext, newData);
  }
}
```

### 3. Cross-Agent Context Sharing

```javascript
// Agent context isolation and sharing
const contextSharingMatrix = {
  'project-state-analyzer': {
    reads: ['project_state', 'task_progress', 'quality_metrics'],
    writes: ['project_state', 'analysis_results'],
    shares_with: ['all_agents']
  },
  'tdd-agent': {
    reads: ['current_workflow_state', 'task_progress', 'agent_memory.implementation-agent'],
    writes: ['agent_memory.tdd-agent', 'quality_metrics.test_coverage'],
    shares_with: ['implementation-agent', 'testing-agent']
  },
  'implementation-agent': {
    reads: ['current_workflow_state', 'agent_memory.tdd-agent', 'project_state.technology_stack'],
    writes: ['agent_memory.implementation-agent', 'task_progress'],
    shares_with: ['tdd-agent', 'refactoring-agent']
  }
};
```

## 🛡️ Security & Data Integrity

### 1. Data Protection

```json
{
  "security_measures": {
    "sensitive_data_masking": {
      "api_keys": "***masked***",
      "passwords": "***masked***",
      "personal_info": "***masked***"
    },
    "access_control": {
      "read_permissions": ["orchestrator", "all_workflow_commands", "all_agents"],
      "write_permissions": ["orchestrator", "workflow_commands", "authorized_agents"]
    },
    "audit_trail": {
      "all_reads": true,
      "all_writes": true,
      "context_changes": true,
      "retention_days": 90
    }
  }
}
```

### 2. Data Validation

```javascript
// JSON Schema validation
const contextSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["context_id", "metadata", "project_state"],
  "properties": {
    "context_id": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9-]+$"
    },
    "metadata": {
      "type": "object",
      "required": ["created_at", "version", "project_id"],
      "properties": {
        "created_at": {"type": "string", "format": "date-time"},
        "version": {"type": "string"},
        "project_id": {"type": "string"}
      }
    }
  }
};
```

## 🚀 API Interface Design

### 1. Core Context Manager API

```javascript
class SmartContextManager {
  // Context lifecycle
  async createContext(projectId, workflowName, initialData)
  async loadContext(projectId)
  async saveContext(projectId, contextData)
  async archiveContext(projectId)
  
  // Context operations
  async updateWorkflowState(projectId, workflowName, phaseData)
  async updateTaskProgress(projectId, taskId, completion)
  async updateAgentMemory(projectId, agentName, memoryData)
  
  // Context queries
  async getRelevantContext(projectId, agentType, scope)
  async getWorkflowHistory(projectId)
  async getTaskProgress(projectId)
  async getUserPreferences(projectId)
  
  // Cross-workflow operations
  async propagateContext(fromWorkflow, toWorkflow, contextData)
  async createCheckpoint(projectId, checkpointName)
  async restoreFromCheckpoint(projectId, checkpointName)
  
  // Cleanup and maintenance
  async cleanupOldContexts(daysBefore)
  async validateContextIntegrity(projectId)
  async compressLargeContexts()
}
```

### 2. Agent Integration API

```javascript
class ContextAwareAgent {
  constructor(agentType, projectId) {
    this.context = new SmartContextManager();
    this.agentType = agentType;
    this.projectId = projectId;
  }
  
  async getMyContext() {
    return await this.context.getRelevantContext(
      this.projectId, 
      this.agentType, 
      'agent_specific'
    );
  }
  
  async updateMyMemory(newData) {
    return await this.context.updateAgentMemory(
      this.projectId,
      this.agentType,
      newData
    );
  }
  
  async shareWithAgents(agentTypes, data) {
    for (const targetAgent of agentTypes) {
      await this.context.shareContextData(
        this.projectId,
        this.agentType,
        targetAgent,
        data
      );
    }
  }
}
```

### 3. Workflow Command Integration

```javascript
// Example: Coding workflow command integration
class CodingWorkflowCommand {
  async execute(projectId, arguments) {
    const context = new SmartContextManager();
    
    // 1. Load relevant context
    const projectContext = await context.getRelevantContext(
      projectId, 
      'coding-workflow', 
      'full'
    );
    
    // 2. Update workflow state
    await context.updateWorkflowState(projectId, 'coding', {
      status: 'started',
      started_at: new Date().toISOString(),
      arguments: arguments
    });
    
    // 3. Execute phases with context sharing
    const phases = ['research', 'planning', 'tdd_cycle', 'implementation'];
    
    for (const phase of phases) {
      await context.updateWorkflowState(projectId, 'coding', {
        current_phase: phase,
        phase_start: new Date().toISOString()
      });
      
      const phaseResult = await this.executePhase(phase, projectContext);
      
      await context.updateWorkflowState(projectId, 'coding', {
        phase_outputs: {
          [phase]: phaseResult
        },
        completed_phases: [...previousPhases, phase]
      });
    }
    
    // 4. Mark workflow completion
    await context.updateWorkflowState(projectId, 'coding', {
      status: 'completed',
      completed_at: new Date().toISOString()
    });
  }
}
```

## 🧪 Implementation Plan

### Phase 1: Core Foundation (Week 1)
- [ ] Basic Context Manager class
- [ ] JSON file storage implementation
- [ ] Context schema definition and validation
- [ ] Basic CRUD operations for context data

### Phase 2: Agent Integration (Week 2)  
- [ ] Context-aware agent base class
- [ ] Agent-specific context filtering
- [ ] Cross-agent context sharing mechanisms
- [ ] Memory management for agents

### Phase 3: Workflow Integration (Week 3)
- [ ] Workflow command context integration
- [ ] Phase progression tracking
- [ ] Task progress synchronization
- [ ] Human approval state management

### Phase 4: Advanced Features (Week 4)
- [ ] Checkpoint and recovery system
- [ ] Context archival and cleanup
- [ ] Performance optimization
- [ ] Error handling and data integrity

### Phase 5: Testing & Documentation (Week 5)
- [ ] Comprehensive test suite
- [ ] Integration testing with existing workflows
- [ ] Performance benchmarking
- [ ] Documentation and usage examples

## 📋 Success Criteria

### Functional Requirements
- [x] Cross-workflow state persistence
- [x] Agent memory and context sharing
- [x] Workflow resumption after interruption
- [x] Task progress synchronization
- [x] Human preference learning

### Performance Requirements
- Context read/write operations < 50ms
- Memory usage < 10MB for typical projects
- File size < 1MB for standard contexts
- Startup overhead < 100ms

### Reliability Requirements
- 99.9% context data integrity
- Graceful handling of corrupted files
- Automatic backup and recovery
- Comprehensive audit trail

This Smart Context specification provides the foundation for seamless state management across the entire CC-Deck Workflow Engine, enabling true continuous workflow execution with intelligent context propagation.