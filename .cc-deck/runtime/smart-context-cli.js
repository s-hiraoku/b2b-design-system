#!/usr/bin/env node
/**
 * Smart Context CLI Tool
 * 
 * Command-line interface for Smart Context management and debugging
 * 
 * @version 1.0.0
 */

const SmartContextManager = require('./smart-context-manager');
const path = require('path');
const fs = require('fs').promises;

class SmartContextCLI {
  constructor() {
    this.manager = new SmartContextManager();
  }

  async run() {
    const [,, command, ...args] = process.argv;
    
    try {
      switch (command) {
        case 'init':
          await this.initializeContext(args[0], args[1]);
          break;
        case 'list':
          await this.listContexts();
          break;
        case 'show':
          await this.showContext(args[0], args[1]);
          break;
        case 'update-workflow':
          await this.updateWorkflow(args[0], args[1], JSON.parse(args[2] || '{}'));
          break;
        case 'update-task':
          await this.updateTask(args[0], args[1], JSON.parse(args[2] || '{}'));
          break;
        case 'update-agent':
          await this.updateAgent(args[0], args[1], JSON.parse(args[2] || '{}'));
          break;
        case 'checkpoint':
          await this.createCheckpoint(args[0], args[1]);
          break;
        case 'archive':
          await this.archiveContext(args[0]);
          break;
        case 'stats':
          await this.showStatistics();
          break;
        case 'cleanup':
          await this.cleanup(parseInt(args[0]) || 90);
          break;
        case 'export':
          await this.exportContext(args[0], args[1]);
          break;
        case 'import':
          await this.importContext(args[0]);
          break;
        case 'validate':
          await this.validateContext(args[0]);
          break;
        case 'monitor':
          await this.monitorContexts();
          break;
        case 'help':
        default:
          this.showHelp();
      }
    } catch (error) {
      console.error('Error:', error.message);
      if (process.env.DEBUG) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  }

  async initializeContext(projectId, workflowName) {
    if (!projectId || !workflowName) {
      console.error('Usage: smart-context-cli init <projectId> <workflowName>');
      process.exit(1);
    }

    console.log(`Initializing context for project: ${projectId}`);
    
    const context = await this.manager.createContext(projectId, workflowName);
    
    console.log(`✅ Context created successfully`);
    console.log(`   Context ID: ${context.context_id}`);
    console.log(`   Project: ${context.metadata.project_id}`);
    console.log(`   Workflow: ${context.metadata.current_workflow}`);
    console.log(`   Created: ${context.metadata.created_at}`);
  }

  async listContexts() {
    const contexts = await this.manager.listActiveContexts();
    
    console.log('📋 Active Contexts:');
    console.log('==================');
    
    if (contexts.length === 0) {
      console.log('No active contexts found.');
      return;
    }

    for (const projectId of contexts) {
      const context = await this.manager.loadContext(projectId);
      if (context) {
        const workflow = context.metadata.current_workflow || 'none';
        const updated = new Date(context.metadata.updated_at).toLocaleString();
        const progress = context.task_progress.completion_percentage || 0;
        
        console.log(`• ${projectId}`);
        console.log(`  Workflow: ${workflow}`);
        console.log(`  Progress: ${progress}% (${context.task_progress.completed_tasks}/${context.task_progress.total_tasks} tasks)`);
        console.log(`  Updated: ${updated}`);
        console.log();
      }
    }
  }

  async showContext(projectId, section = 'all') {
    if (!projectId) {
      console.error('Usage: smart-context-cli show <projectId> [section]');
      console.log('Sections: all, metadata, project, workflow, tasks, agents, quality');
      process.exit(1);
    }

    const context = await this.manager.loadContext(projectId);
    
    if (!context) {
      console.error(`Context not found for project: ${projectId}`);
      process.exit(1);
    }

    console.log(`📊 Context for ${projectId}:`);
    console.log('='.repeat(50));

    switch (section) {
      case 'metadata':
        this.displaySection('Metadata', context.metadata);
        break;
      case 'project':
        this.displaySection('Project State', context.project_state);
        break;
      case 'workflow':
        this.displaySection('Current Workflow', context.current_workflow_state);
        this.displaySection('Workflow History', context.workflow_history);
        break;
      case 'tasks':
        this.displaySection('Task Progress', context.task_progress);
        break;
      case 'agents':
        this.displaySection('Agent Memory', context.agent_memory);
        break;
      case 'quality':
        this.displaySection('Quality Metrics', context.quality_metrics);
        break;
      case 'all':
      default:
        console.log(JSON.stringify(context, null, 2));
    }
  }

  displaySection(title, data) {
    console.log(`\n${title}:`);
    console.log('-'.repeat(title.length + 1));
    console.log(JSON.stringify(data, null, 2));
  }

  async updateWorkflow(projectId, workflowName, updateData) {
    if (!projectId || !workflowName) {
      console.error('Usage: smart-context-cli update-workflow <projectId> <workflowName> <jsonData>');
      process.exit(1);
    }

    console.log(`Updating workflow ${workflowName} for project ${projectId}...`);
    
    const success = await this.manager.updateWorkflowState(projectId, workflowName, updateData);
    
    if (success) {
      console.log('✅ Workflow updated successfully');
    } else {
      console.error('❌ Failed to update workflow');
      process.exit(1);
    }
  }

  async updateTask(projectId, taskId, updateData) {
    if (!projectId || !taskId) {
      console.error('Usage: smart-context-cli update-task <projectId> <taskId> <jsonData>');
      process.exit(1);
    }

    console.log(`Updating task ${taskId} for project ${projectId}...`);
    
    const success = await this.manager.updateTaskProgress(projectId, taskId, updateData);
    
    if (success) {
      console.log('✅ Task updated successfully');
    } else {
      console.error('❌ Failed to update task');
      process.exit(1);
    }
  }

  async updateAgent(projectId, agentName, memoryData) {
    if (!projectId || !agentName) {
      console.error('Usage: smart-context-cli update-agent <projectId> <agentName> <jsonData>');
      process.exit(1);
    }

    console.log(`Updating agent memory for ${agentName} in project ${projectId}...`);
    
    const success = await this.manager.updateAgentMemory(projectId, agentName, memoryData);
    
    if (success) {
      console.log('✅ Agent memory updated successfully');
    } else {
      console.error('❌ Failed to update agent memory');
      process.exit(1);
    }
  }

  async createCheckpoint(projectId, checkpointName) {
    if (!projectId || !checkpointName) {
      console.error('Usage: smart-context-cli checkpoint <projectId> <checkpointName>');
      process.exit(1);
    }

    console.log(`Creating checkpoint ${checkpointName} for project ${projectId}...`);
    
    const success = await this.manager.createCheckpoint(projectId, checkpointName);
    
    if (success) {
      console.log('✅ Checkpoint created successfully');
    } else {
      console.error('❌ Failed to create checkpoint');
      process.exit(1);
    }
  }

  async archiveContext(projectId) {
    if (!projectId) {
      console.error('Usage: smart-context-cli archive <projectId>');
      process.exit(1);
    }

    console.log(`Archiving context for project ${projectId}...`);
    
    const success = await this.manager.archiveContext(projectId);
    
    if (success) {
      console.log('✅ Context archived successfully');
    } else {
      console.error('❌ Failed to archive context');
      process.exit(1);
    }
  }

  async showStatistics() {
    const stats = await this.manager.getStatistics();
    
    console.log('📈 Smart Context Statistics:');
    console.log('============================');
    console.log(JSON.stringify(stats, null, 2));
  }

  async cleanup(daysBefore) {
    console.log(`Cleaning up data older than ${daysBefore} days...`);
    
    const result = await this.manager.cleanupOldContexts(daysBefore);
    
    console.log('🧹 Cleanup Results:');
    console.log('==================');
    console.log(JSON.stringify(result, null, 2));
  }

  async exportContext(projectId, outputFile) {
    if (!projectId) {
      console.error('Usage: smart-context-cli export <projectId> [outputFile]');
      process.exit(1);
    }

    const context = await this.manager.loadContext(projectId);
    
    if (!context) {
      console.error(`Context not found for project: ${projectId}`);
      process.exit(1);
    }

    const fileName = outputFile || `${projectId}-context-export.json`;
    
    try {
      await fs.writeFile(fileName, JSON.stringify(context, null, 2));
      console.log(`✅ Context exported to ${fileName}`);
    } catch (error) {
      console.error(`❌ Failed to export context: ${error.message}`);
      process.exit(1);
    }
  }

  async importContext(inputFile) {
    if (!inputFile) {
      console.error('Usage: smart-context-cli import <inputFile>');
      process.exit(1);
    }

    try {
      const data = await fs.readFile(inputFile, 'utf8');
      const context = JSON.parse(data);
      
      if (!this.manager.validateContext(context)) {
        throw new Error('Invalid context format');
      }

      const projectId = context.metadata.project_id;
      const success = await this.manager.saveContext(projectId, context);
      
      if (success) {
        console.log(`✅ Context imported for project: ${projectId}`);
      } else {
        console.error('❌ Failed to import context');
        process.exit(1);
      }
    } catch (error) {
      console.error(`❌ Failed to import context: ${error.message}`);
      process.exit(1);
    }
  }

  async validateContext(projectId) {
    if (!projectId) {
      console.error('Usage: smart-context-cli validate <projectId>');
      process.exit(1);
    }

    const context = await this.manager.loadContext(projectId);
    
    if (!context) {
      console.error(`Context not found for project: ${projectId}`);
      process.exit(1);
    }

    const isValid = this.manager.validateContext(context);
    
    if (isValid) {
      console.log('✅ Context validation passed');
    } else {
      console.error('❌ Context validation failed');
      process.exit(1);
    }
  }

  async monitorContexts() {
    console.log('🔍 Monitoring active contexts...');
    console.log('Press Ctrl+C to stop monitoring\n');

    const monitor = async () => {
      const contexts = await this.manager.listActiveContexts();
      
      console.clear();
      console.log(`Smart Context Monitor - ${new Date().toLocaleTimeString()}`);
      console.log('='.repeat(50));
      
      if (contexts.length === 0) {
        console.log('No active contexts.');
        return;
      }

      for (const projectId of contexts) {
        const context = await this.manager.loadContext(projectId);
        if (context) {
          const workflow = context.metadata.current_workflow || 'none';
          const phase = context.current_workflow_state.current_phase || 'none';
          const progress = context.task_progress.completion_percentage || 0;
          const lastUpdate = new Date(context.metadata.updated_at).toLocaleTimeString();
          
          console.log(`📋 ${projectId}`);
          console.log(`   Workflow: ${workflow} (Phase: ${phase})`);
          console.log(`   Progress: ${progress}% | Last Update: ${lastUpdate}`);
          
          // Show agent activities
          const activeAgents = Object.keys(context.agent_memory || {});
          if (activeAgents.length > 0) {
            console.log(`   Active Agents: ${activeAgents.join(', ')}`);
          }
          console.log();
        }
      }
    };

    // Monitor every 5 seconds
    setInterval(monitor, 5000);
    await monitor(); // Initial run

    // Handle Ctrl+C gracefully
    process.on('SIGINT', () => {
      console.log('\nMonitoring stopped.');
      process.exit(0);
    });
  }

  showHelp() {
    console.log('Smart Context CLI - CC-Deck Workflow Engine');
    console.log('==========================================');
    console.log();
    console.log('Usage: smart-context-cli <command> [options]');
    console.log();
    console.log('Commands:');
    console.log('  init <projectId> <workflow>     Initialize new context');
    console.log('  list                            List all active contexts');
    console.log('  show <projectId> [section]      Show context details');
    console.log('  update-workflow <project> <workflow> <data>  Update workflow state');
    console.log('  update-task <project> <taskId> <data>        Update task progress');
    console.log('  update-agent <project> <agent> <data>        Update agent memory');
    console.log('  checkpoint <project> <name>     Create recovery checkpoint');
    console.log('  archive <projectId>             Archive completed context');
    console.log('  stats                           Show system statistics');
    console.log('  cleanup [days]                  Cleanup old data (default: 90 days)');
    console.log('  export <project> [file]         Export context to file');
    console.log('  import <file>                   Import context from file');
    console.log('  validate <project>              Validate context structure');
    console.log('  monitor                         Monitor active contexts (live)');
    console.log('  help                            Show this help message');
    console.log();
    console.log('Examples:');
    console.log('  smart-context-cli init user-auth-system kiro-sdd');
    console.log('  smart-context-cli show user-auth-system tasks');
    console.log('  smart-context-cli update-task user-auth "1.1" \'{"completed": true}\'');
    console.log('  smart-context-cli checkpoint user-auth phase3-complete');
    console.log('  smart-context-cli monitor');
  }
}

// Run CLI if executed directly
if (require.main === module) {
  const cli = new SmartContextCLI();
  cli.run().catch(error => {
    console.error('CLI Error:', error.message);
    process.exit(1);
  });
}

module.exports = SmartContextCLI;