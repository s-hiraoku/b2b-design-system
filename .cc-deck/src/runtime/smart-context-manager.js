/**
 * Smart Context Manager - CC-Deck Workflow Engine Core Component
 * 
 * Provides cross-workflow state management, agent memory, and context propagation
 * for seamless workflow execution and intelligent resumption capabilities.
 * 
 * @version 1.0.0
 * @author CC-Deck Workflow Engine
 */

const fs = require('fs').promises;
const path = require('path');

class SmartContextManager {
  constructor() {
    this.contextDir = '.cc-deck/runtime/global/context';
    this.checkpointDir = '.cc-deck/runtime/global/checkpoints';
    this.schemaVersion = '1.0';
    
    // Ensure required directories exist
    this.initializeDirectories();
  }

  /**
   * Initialize required directory structure
   */
  async initializeDirectories() {
    const dirs = [
      `${this.contextDir}/active`,
      `${this.contextDir}/completed`,
      `${this.contextDir}/checkpoints`,
      `${this.contextDir}/templates`,
      '.cc-deck/config/schemas',
      this.checkpointDir
    ];

    for (const dir of dirs) {
      try {
        await fs.mkdir(dir, { recursive: true });
      } catch (error) {
        // Directory might already exist
        if (error.code !== 'EEXIST') {
          console.warn(`Warning: Could not create directory ${dir}:`, error.message);
        }
      }
    }
  }

  /**
   * Create new context for a project
   * @param {string} projectId - Unique project identifier
   * @param {string} workflowName - Initial workflow name
   * @param {Object} initialData - Initial context data
   * @returns {Object} Created context
   */
  async createContext(projectId, workflowName, initialData = {}) {
    const contextId = `${workflowName}-${projectId}-${new Date().toISOString().split('T')[0].replace(/-/g, '')}`;
    
    const context = {
      context_id: contextId,
      metadata: {
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        version: "1.0.0",
        project_id: projectId,
        current_workflow: workflowName,
        schema_version: this.schemaVersion
      },
      project_state: {
        project_name: projectId,
        project_type: "unknown",
        complexity: "medium",
        security_critical: false,
        technology_stack: {},
        analysis_timestamp: new Date().toISOString(),
        ...initialData.project_state
      },
      workflow_history: [],
      current_workflow_state: {
        workflow_name: workflowName,
        status: "initialized",
        started_at: new Date().toISOString(),
        current_phase: null,
        completed_phases: [],
        phase_outputs: {}
      },
      task_progress: {
        tasks_file: `.kiro/specs/${projectId}/tasks.md`,
        total_tasks: 0,
        completed_tasks: 0,
        current_task: null,
        completion_percentage: 0,
        last_updated: new Date().toISOString(),
        task_details: []
      },
      agent_memory: {},
      user_preferences: {
        workflow_selections: [],
        approval_history: [],
        tdd_preference: "always_use",
        auto_progression: false
      },
      quality_metrics: {
        test_coverage: {
          line_coverage: 0,
          branch_coverage: 0,
          function_coverage: 0,
          last_measured: new Date().toISOString()
        },
        code_quality: {
          complexity_score: 0,
          maintainability_index: 0,
          technical_debt_minutes: 0
        },
        workflow_efficiency: {
          average_phase_duration: "0min",
          approval_response_time: "0min",
          total_development_time: "0min"
        }
      },
      integration_context: {
        mcp_services: {
          deepwiki_status: "unknown",
          context7_status: "unknown",
          serena_status: "unknown",
          playwright_status: "unknown"
        },
        generated_agents: []
      },
      error_recovery: {
        last_checkpoint: null,
        checkpoint_file: null,
        recovery_points: []
      }
    };

    // Merge any additional initial data
    if (initialData && typeof initialData === 'object') {
      Object.assign(context, initialData);
    }

    await this.saveContext(projectId, context);
    return context;
  }

  /**
   * Load context for a project
   * @param {string} projectId - Project identifier
   * @returns {Object|null} Context data or null if not found
   */
  async loadContext(projectId) {
    const contextFile = `${this.contextDir}/active/${projectId}.json`;
    
    try {
      const data = await fs.readFile(contextFile, 'utf8');
      const context = JSON.parse(data);
      
      // Validate context structure
      if (!this.validateContext(context)) {
        console.warn(`Warning: Context validation failed for ${projectId}`);
        return null;
      }
      
      return context;
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Context file doesn't exist
        return null;
      }
      
      console.error(`Error loading context for ${projectId}:`, error.message);
      return null;
    }
  }

  /**
   * Save context for a project
   * @param {string} projectId - Project identifier
   * @param {Object} contextData - Context data to save
   * @returns {boolean} Success status
   */
  async saveContext(projectId, contextData) {
    try {
      // Update metadata
      contextData.metadata.updated_at = new Date().toISOString();
      
      // Validate before saving
      if (!this.validateContext(contextData)) {
        throw new Error('Context validation failed before save');
      }
      
      const contextFile = `${this.contextDir}/active/${projectId}.json`;
      await fs.writeFile(contextFile, JSON.stringify(contextData, null, 2), 'utf8');
      
      return true;
    } catch (error) {
      console.error(`Error saving context for ${projectId}:`, error.message);
      return false;
    }
  }

  /**
   * Update workflow state
   * @param {string} projectId - Project identifier
   * @param {string} workflowName - Workflow name
   * @param {Object} stateUpdate - State update data
   * @returns {boolean} Success status
   */
  async updateWorkflowState(projectId, workflowName, stateUpdate) {
    const context = await this.loadContext(projectId);
    if (!context) {
      console.error(`Context not found for project: ${projectId}`);
      return false;
    }

    // Update current workflow state
    Object.assign(context.current_workflow_state, stateUpdate);
    context.current_workflow_state.workflow_name = workflowName;
    context.metadata.current_workflow = workflowName;

    // If workflow is completed, move to history
    if (stateUpdate.status === 'completed') {
      context.workflow_history.push({
        ...context.current_workflow_state,
        completed_at: new Date().toISOString()
      });
      
      // Reset current workflow state for next workflow
      context.current_workflow_state = {
        workflow_name: null,
        status: "ready",
        started_at: null,
        current_phase: null,
        completed_phases: [],
        phase_outputs: {}
      };
    }

    return await this.saveContext(projectId, context);
  }

  /**
   * Update task progress
   * @param {string} projectId - Project identifier
   * @param {string} taskId - Task identifier
   * @param {Object} taskUpdate - Task update data
   * @returns {boolean} Success status
   */
  async updateTaskProgress(projectId, taskId, taskUpdate) {
    const context = await this.loadContext(projectId);
    if (!context) return false;

    // Update or add task details
    const existingTaskIndex = context.task_progress.task_details.findIndex(
      task => task.task_id === taskId
    );

    if (existingTaskIndex >= 0) {
      Object.assign(context.task_progress.task_details[existingTaskIndex], taskUpdate);
    } else {
      context.task_progress.task_details.push({
        task_id: taskId,
        ...taskUpdate
      });
    }

    // Update progress statistics
    const completedTasks = context.task_progress.task_details.filter(
      task => task.completed === true
    ).length;
    
    context.task_progress.completed_tasks = completedTasks;
    context.task_progress.completion_percentage = context.task_progress.total_tasks > 0 
      ? Math.round((completedTasks / context.task_progress.total_tasks) * 100)
      : 0;
    context.task_progress.last_updated = new Date().toISOString();

    return await this.saveContext(projectId, context);
  }

  /**
   * Update agent memory
   * @param {string} projectId - Project identifier
   * @param {string} agentName - Agent name
   * @param {Object} memoryData - Memory data to store
   * @returns {boolean} Success status
   */
  async updateAgentMemory(projectId, agentName, memoryData) {
    const context = await this.loadContext(projectId);
    if (!context) return false;

    // Initialize agent memory if it doesn't exist
    if (!context.agent_memory[agentName]) {
      context.agent_memory[agentName] = {};
    }

    // Update agent memory with timestamp
    Object.assign(context.agent_memory[agentName], memoryData, {
      last_updated: new Date().toISOString()
    });

    return await this.saveContext(projectId, context);
  }

  /**
   * Get relevant context for an agent
   * @param {string} projectId - Project identifier
   * @param {string} agentType - Agent type/name
   * @param {string} scope - Context scope (full, agent_specific, etc.)
   * @returns {Object|null} Filtered context data
   */
  async getRelevantContext(projectId, agentType, scope = 'agent_specific') {
    const context = await this.loadContext(projectId);
    if (!context) return null;

    // Define what each agent type can access
    const contextSharingMatrix = {
      'project-state-analyzer': {
        reads: ['project_state', 'task_progress', 'quality_metrics', 'workflow_history'],
        agent_memory_access: ['all']
      },
      'orchestrator': {
        reads: ['all'],
        agent_memory_access: ['all']
      },
      'tdd-agent': {
        reads: ['current_workflow_state', 'task_progress', 'project_state.technology_stack'],
        agent_memory_access: ['tdd-agent', 'implementation-agent']
      },
      'implementation-agent': {
        reads: ['current_workflow_state', 'task_progress', 'project_state', 'quality_metrics'],
        agent_memory_access: ['implementation-agent', 'tdd-agent']
      },
      'default': {
        reads: ['project_state', 'current_workflow_state'],
        agent_memory_access: ['own']
      }
    };

    const permissions = contextSharingMatrix[agentType] || contextSharingMatrix['default'];
    
    if (scope === 'full' || agentType === 'orchestrator') {
      return context;
    }

    // Filter context based on permissions
    const filteredContext = {};
    
    for (const field of permissions.reads) {
      if (field === 'all') {
        return context;
      }
      if (context[field] !== undefined) {
        filteredContext[field] = context[field];
      }
    }

    // Add accessible agent memory
    filteredContext.agent_memory = {};
    if (permissions.agent_memory_access.includes('all')) {
      filteredContext.agent_memory = context.agent_memory;
    } else if (permissions.agent_memory_access.includes('own')) {
      if (context.agent_memory[agentType]) {
        filteredContext.agent_memory[agentType] = context.agent_memory[agentType];
      }
    } else {
      for (const agentName of permissions.agent_memory_access) {
        if (context.agent_memory[agentName]) {
          filteredContext.agent_memory[agentName] = context.agent_memory[agentName];
        }
      }
    }

    return filteredContext;
  }

  /**
   * Create checkpoint for recovery
   * @param {string} projectId - Project identifier
   * @param {string} checkpointName - Checkpoint identifier
   * @returns {boolean} Success status
   */
  async createCheckpoint(projectId, checkpointName) {
    const context = await this.loadContext(projectId);
    if (!context) return false;

    const checkpoint = {
      checkpoint_name: checkpointName,
      timestamp: new Date().toISOString(),
      project_id: projectId,
      context_snapshot: JSON.parse(JSON.stringify(context)) // Deep copy
    };

    const checkpointFile = `${this.checkpointDir}/${projectId}-${checkpointName}.json`;
    
    try {
      await fs.writeFile(checkpointFile, JSON.stringify(checkpoint, null, 2), 'utf8');
      
      // Update context with checkpoint info
      context.error_recovery.last_checkpoint = new Date().toISOString();
      context.error_recovery.checkpoint_file = checkpointFile;
      context.error_recovery.recovery_points.push({
        name: checkpointName,
        timestamp: checkpoint.timestamp,
        file: checkpointFile
      });

      await this.saveContext(projectId, context);
      return true;
    } catch (error) {
      console.error(`Error creating checkpoint ${checkpointName} for ${projectId}:`, error.message);
      return false;
    }
  }

  /**
   * Archive completed context
   * @param {string} projectId - Project identifier
   * @returns {boolean} Success status
   */
  async archiveContext(projectId) {
    const context = await this.loadContext(projectId);
    if (!context) return false;

    // Create archived directory structure
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const archiveDir = `${this.contextDir}/completed/${year}-${month}`;
    
    try {
      await fs.mkdir(archiveDir, { recursive: true });
      
      const archiveFile = `${archiveDir}/${projectId}.json`;
      await fs.writeFile(archiveFile, JSON.stringify(context, null, 2), 'utf8');
      
      // Remove from active
      const activeFile = `${this.contextDir}/active/${projectId}.json`;
      await fs.unlink(activeFile);
      
      return true;
    } catch (error) {
      console.error(`Error archiving context for ${projectId}:`, error.message);
      return false;
    }
  }

  /**
   * List all active contexts
   * @returns {Array} Array of active project IDs
   */
  async listActiveContexts() {
    try {
      const files = await fs.readdir(`${this.contextDir}/active`);
      return files
        .filter(file => file.endsWith('.json'))
        .map(file => file.replace('.json', ''));
    } catch (error) {
      console.error('Error listing active contexts:', error.message);
      return [];
    }
  }

  /**
   * Validate context structure
   * @param {Object} context - Context to validate
   * @returns {boolean} Validation result
   */
  validateContext(context) {
    if (!context || typeof context !== 'object') return false;
    
    // Check required top-level fields
    const requiredFields = ['context_id', 'metadata', 'project_state'];
    for (const field of requiredFields) {
      if (!context[field]) {
        console.warn(`Context validation failed: missing ${field}`);
        return false;
      }
    }

    // Check metadata structure
    const requiredMetadata = ['created_at', 'version', 'project_id'];
    for (const field of requiredMetadata) {
      if (!context.metadata[field]) {
        console.warn(`Context validation failed: missing metadata.${field}`);
        return false;
      }
    }

    return true;
  }

  /**
   * Clean up old contexts and checkpoints
   * @param {number} daysBefore - Number of days before current date
   * @returns {Object} Cleanup statistics
   */
  async cleanupOldContexts(daysBefore = 90) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysBefore);
    
    let deletedContexts = 0;
    let deletedCheckpoints = 0;

    try {
      // Cleanup old checkpoints
      const checkpointFiles = await fs.readdir(this.checkpointDir);
      for (const file of checkpointFiles) {
        if (!file.endsWith('.json')) continue;
        
        const filePath = `${this.checkpointDir}/${file}`;
        const stats = await fs.stat(filePath);
        
        if (stats.mtime < cutoffDate) {
          await fs.unlink(filePath);
          deletedCheckpoints++;
        }
      }

      // Cleanup old archived contexts could be implemented here
      // For now, we keep all archived contexts
      
    } catch (error) {
      console.error('Error during cleanup:', error.message);
    }

    return {
      deleted_contexts: deletedContexts,
      deleted_checkpoints: deletedCheckpoints,
      cleanup_date: new Date().toISOString()
    };
  }

  /**
   * Get context statistics
   * @returns {Object} Context system statistics
   */
  async getStatistics() {
    try {
      const activeContexts = await this.listActiveContexts();
      const checkpointFiles = await fs.readdir(this.checkpointDir);
      
      return {
        active_contexts: activeContexts.length,
        active_projects: activeContexts,
        total_checkpoints: checkpointFiles.filter(f => f.endsWith('.json')).length,
        context_directory: this.contextDir,
        checkpoint_directory: this.checkpointDir,
        schema_version: this.schemaVersion,
        last_updated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error getting statistics:', error.message);
      return {
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}

module.exports = SmartContextManager;

// Export for CLI usage
if (require.main === module) {
  const manager = new SmartContextManager();
  
  // CLI interface for testing and maintenance
  const command = process.argv[2];
  const args = process.argv.slice(3);
  
  switch (command) {
    case 'list':
      manager.listActiveContexts().then(contexts => {
        console.log('Active contexts:', contexts);
      });
      break;
      
    case 'stats':
      manager.getStatistics().then(stats => {
        console.log('Context Statistics:');
        console.log(JSON.stringify(stats, null, 2));
      });
      break;
      
    case 'cleanup':
      const days = parseInt(args[0]) || 90;
      manager.cleanupOldContexts(days).then(result => {
        console.log('Cleanup completed:');
        console.log(JSON.stringify(result, null, 2));
      });
      break;
      
    case 'create':
      const [projectId, workflow] = args;
      if (!projectId || !workflow) {
        console.log('Usage: node smart-context-manager.js create <projectId> <workflow>');
        process.exit(1);
      }
      manager.createContext(projectId, workflow).then(context => {
        console.log(`Context created for ${projectId}`);
        console.log(`Context ID: ${context.context_id}`);
      });
      break;
      
    default:
      console.log('Smart Context Manager CLI');
      console.log('Commands:');
      console.log('  list                     - List active contexts');
      console.log('  stats                    - Show system statistics');
      console.log('  cleanup [days]           - Cleanup old data (default: 90 days)');
      console.log('  create <project> <workflow> - Create new context');
  }
}