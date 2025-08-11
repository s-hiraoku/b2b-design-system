/**
 * Context-Aware Agent Base Class
 * 
 * Base class for all CC-Deck agents to provide Smart Context integration
 * and standardized context operations across the workflow engine.
 * 
 * @version 1.0.0
 */

const SmartContextManager = require('./smart-context-manager');

class ContextAwareAgentBase {
  constructor(agentType, projectId = null) {
    this.agentType = agentType;
    this.projectId = projectId;
    this.contextManager = new SmartContextManager();
    this.contextCache = new Map(); // Local cache for performance
    this.cacheTimeout = 60000; // 1 minute cache timeout
  }

  /**
   * Set the project ID for this agent session
   * @param {string} projectId - Project identifier
   */
  setProjectId(projectId) {
    this.projectId = projectId;
    this.contextCache.clear(); // Clear cache when project changes
  }

  /**
   * Get context relevant to this agent
   * @param {string} scope - Context scope (full, agent_specific, minimal)
   * @returns {Object|null} Filtered context data
   */
  async getMyContext(scope = 'agent_specific') {
    if (!this.projectId) {
      console.warn(`Agent ${this.agentType}: No project ID set`);
      return null;
    }

    // Check cache first
    const cacheKey = `${this.projectId}-${scope}`;
    const cached = this.contextCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
      return cached.data;
    }

    // Fetch fresh context
    const context = await this.contextManager.getRelevantContext(
      this.projectId,
      this.agentType,
      scope
    );

    // Update cache
    if (context) {
      this.contextCache.set(cacheKey, {
        data: context,
        timestamp: Date.now()
      });
    }

    return context;
  }

  /**
   * Update this agent's memory with new data
   * @param {Object} memoryData - Data to store in agent memory
   * @returns {boolean} Success status
   */
  async updateMyMemory(memoryData) {
    if (!this.projectId) {
      console.warn(`Agent ${this.agentType}: No project ID set`);
      return false;
    }

    const success = await this.contextManager.updateAgentMemory(
      this.projectId,
      this.agentType,
      memoryData
    );

    // Clear cache to force refresh on next read
    this.contextCache.clear();

    return success;
  }

  /**
   * Record agent execution start
   * @param {string} taskDescription - Description of the task being executed
   * @param {Object} parameters - Task parameters
   */
  async recordExecutionStart(taskDescription, parameters = {}) {
    await this.updateMyMemory({
      current_task: {
        description: taskDescription,
        parameters: parameters,
        started_at: new Date().toISOString(),
        status: 'in_progress'
      },
      execution_history: await this.getExecutionHistory()
    });
  }

  /**
   * Record agent execution completion
   * @param {Object} results - Execution results
   * @param {string} status - Completion status (success, failed, partial)
   */
  async recordExecutionComplete(results, status = 'success') {
    const context = await this.getMyContext('agent_specific');
    const currentTask = context?.agent_memory?.[this.agentType]?.current_task;

    const completedTask = {
      ...currentTask,
      results: results,
      status: status,
      completed_at: new Date().toISOString(),
      duration: currentTask?.started_at 
        ? new Date() - new Date(currentTask.started_at)
        : null
    };

    await this.updateMyMemory({
      current_task: null,
      last_execution: completedTask,
      total_executions: (context?.agent_memory?.[this.agentType]?.total_executions || 0) + 1,
      success_rate: this.calculateSuccessRate(status, context)
    });
  }

  /**
   * Get execution history for this agent
   * @returns {Array} Array of past executions
   */
  async getExecutionHistory() {
    const context = await this.getMyContext('agent_specific');
    return context?.agent_memory?.[this.agentType]?.execution_history || [];
  }

  /**
   * Share data with other agents
   * @param {Array} targetAgentTypes - Array of agent types to share with
   * @param {Object} sharedData - Data to share
   * @param {string} dataType - Type of data being shared
   */
  async shareWithAgents(targetAgentTypes, sharedData, dataType = 'general') {
    if (!this.projectId) return false;

    const shareRecord = {
      shared_by: this.agentType,
      shared_at: new Date().toISOString(),
      data_type: dataType,
      data: sharedData,
      recipients: targetAgentTypes
    };

    // Store in each target agent's memory
    for (const targetAgent of targetAgentTypes) {
      await this.contextManager.updateAgentMemory(
        this.projectId,
        targetAgent,
        {
          shared_data_received: {
            [`from_${this.agentType}_${Date.now()}`]: shareRecord
          }
        }
      );
    }

    // Record in own memory
    await this.updateMyMemory({
      shared_data_sent: {
        [`to_${targetAgentTypes.join('_')}_${Date.now()}`]: shareRecord
      }
    });

    return true;
  }

  /**
   * Get data shared by other agents
   * @param {string} fromAgentType - Agent type that shared the data (optional)
   * @returns {Array} Array of shared data items
   */
  async getSharedData(fromAgentType = null) {
    const context = await this.getMyContext('agent_specific');
    const sharedDataReceived = context?.agent_memory?.[this.agentType]?.shared_data_received || {};

    const sharedItems = [];
    for (const [key, data] of Object.entries(sharedDataReceived)) {
      if (!fromAgentType || data.shared_by === fromAgentType) {
        sharedItems.push(data);
      }
    }

    // Sort by timestamp (most recent first)
    return sharedItems.sort((a, b) => new Date(b.shared_at) - new Date(a.shared_at));
  }

  /**
   * Update workflow state (for workflow-managing agents)
   * @param {string} workflowName - Workflow name
   * @param {Object} stateUpdate - State update data
   * @returns {boolean} Success status
   */
  async updateWorkflowState(workflowName, stateUpdate) {
    if (!this.projectId) return false;

    return await this.contextManager.updateWorkflowState(
      this.projectId,
      workflowName,
      stateUpdate
    );
  }

  /**
   * Update task progress (for implementation agents)
   * @param {string} taskId - Task identifier
   * @param {Object} taskUpdate - Task update data
   * @returns {boolean} Success status
   */
  async updateTaskProgress(taskId, taskUpdate) {
    if (!this.projectId) return false;

    const success = await this.contextManager.updateTaskProgress(
      this.projectId,
      taskId,
      taskUpdate
    );

    // Also record in agent memory for local tracking
    if (success) {
      await this.updateMyMemory({
        task_contributions: {
          [taskId]: {
            ...taskUpdate,
            contributed_at: new Date().toISOString()
          }
        }
      });
    }

    return success;
  }

  /**
   * Create a checkpoint for recovery
   * @param {string} checkpointName - Checkpoint identifier
   * @returns {boolean} Success status
   */
  async createCheckpoint(checkpointName) {
    if (!this.projectId) return false;

    return await this.contextManager.createCheckpoint(
      this.projectId,
      `${this.agentType}-${checkpointName}`
    );
  }

  /**
   * Get project state information
   * @returns {Object|null} Project state data
   */
  async getProjectState() {
    const context = await this.getMyContext('minimal');
    return context?.project_state || null;
  }

  /**
   * Get current workflow information
   * @returns {Object|null} Current workflow state
   */
  async getCurrentWorkflow() {
    const context = await this.getMyContext('minimal');
    return context?.current_workflow_state || null;
  }

  /**
   * Get task progress information
   * @returns {Object|null} Task progress data
   */
  async getTaskProgress() {
    const context = await this.getMyContext('minimal');
    return context?.task_progress || null;
  }

  /**
   * Log agent activity for debugging
   * @param {string} level - Log level (info, warn, error)
   * @param {string} message - Log message
   * @param {Object} data - Additional data to log
   */
  log(level, message, data = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      agent: this.agentType,
      project: this.projectId,
      level,
      message,
      data
    };

    console.log(`[${timestamp}] ${level.toUpperCase()} ${this.agentType}: ${message}`);
    
    if (Object.keys(data).length > 0) {
      console.log('  Data:', JSON.stringify(data, null, 2));
    }

    // Store in agent memory for audit trail
    this.updateMyMemory({
      logs: {
        [`${timestamp}_${level}`]: logEntry
      }
    }).catch(err => {
      console.warn('Failed to store log in agent memory:', err.message);
    });
  }

  /**
   * Calculate success rate for this agent
   * @param {string} currentStatus - Current execution status
   * @param {Object} context - Current context
   * @returns {number} Success rate percentage
   */
  calculateSuccessRate(currentStatus, context) {
    const agentMemory = context?.agent_memory?.[this.agentType];
    const totalExecutions = (agentMemory?.total_executions || 0) + 1;
    const previousSuccesses = agentMemory?.success_count || 0;
    const newSuccesses = currentStatus === 'success' 
      ? previousSuccesses + 1 
      : previousSuccesses;

    return Math.round((newSuccesses / totalExecutions) * 100);
  }

  /**
   * Get agent performance metrics
   * @returns {Object} Performance metrics
   */
  async getPerformanceMetrics() {
    const context = await this.getMyContext('agent_specific');
    const agentMemory = context?.agent_memory?.[this.agentType] || {};

    return {
      agent_type: this.agentType,
      project_id: this.projectId,
      total_executions: agentMemory.total_executions || 0,
      success_rate: agentMemory.success_rate || 0,
      average_duration: this.calculateAverageDuration(context),
      last_execution: agentMemory.last_execution?.completed_at || null,
      current_task: agentMemory.current_task?.description || null,
      context_cache_hits: this.contextCache.size,
      memory_usage: JSON.stringify(agentMemory).length
    };
  }

  /**
   * Calculate average execution duration
   * @param {Object} context - Current context
   * @returns {number} Average duration in milliseconds
   */
  calculateAverageDuration(context) {
    const history = context?.agent_memory?.[this.agentType]?.execution_history || [];
    if (history.length === 0) return 0;

    const durations = history
      .filter(exec => exec.duration != null)
      .map(exec => exec.duration);
    
    if (durations.length === 0) return 0;

    return durations.reduce((sum, duration) => sum + duration, 0) / durations.length;
  }

  /**
   * Cleanup agent resources and cache
   */
  cleanup() {
    this.contextCache.clear();
    this.projectId = null;
  }
}

module.exports = ContextAwareAgentBase;

// Example usage for testing
if (require.main === module) {
  async function testContextAwareAgent() {
    const agent = new ContextAwareAgentBase('test-agent', 'test-project');
    
    // Test basic operations
    await agent.recordExecutionStart('Test task execution', { param1: 'value1' });
    
    setTimeout(async () => {
      await agent.recordExecutionComplete({ result: 'success' }, 'success');
      
      const metrics = await agent.getPerformanceMetrics();
      console.log('Agent Performance Metrics:');
      console.log(JSON.stringify(metrics, null, 2));
      
      agent.cleanup();
    }, 1000);
  }
  
  testContextAwareAgent().catch(console.error);
}