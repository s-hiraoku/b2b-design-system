#!/usr/bin/env node

/**
 * CC-Deck Project Deleter
 * Safe deletion functionality for projects with multiple safety options
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ProjectDeleter {
  constructor(basePath = '/Volumes/SSD/development/cc-deck') {
    this.basePath = basePath;
  }

  /**
   * Get available deletion options for a project
   * @param {Object} project - Project information
   * @returns {Array} Available deletion options
   */
  getDeletionOptions(project) {
    const options = [
      {
        id: 'soft-delete',
        name: 'Soft Delete (Recommended)',
        description: 'Remove from CC-Deck tracking, keep all files intact',
        safety: 'safe',
        reversible: true
      },
      {
        id: 'archive',
        name: 'Archive Project',
        description: 'Move to archived state, compress files, keep metadata',
        safety: 'safe',
        reversible: true
      }
    ];

    if (project.type === 'submodule') {
      options.push(
        {
          id: 'remove-submodule',
          name: 'Remove Submodule',
          description: 'Remove Git submodule configuration, keep project files',
          safety: 'moderate',
          reversible: true
        },
        {
          id: 'complete-removal',
          name: 'Complete Removal',
          description: 'Delete all project files and Git tracking',
          safety: 'dangerous',
          reversible: false
        }
      );
    } else if (project.type === 'specification') {
      options.push(
        {
          id: 'move-to-inactive',
          name: 'Mark as Inactive',
          description: 'Move specification to inactive state',
          safety: 'safe',
          reversible: true
        },
        {
          id: 'complete-removal',
          name: 'Complete Removal',
          description: 'Delete all specification files',
          safety: 'dangerous',
          reversible: false
        }
      );
    }

    return options;
  }

  /**
   * Perform safety checks before deletion
   * @param {Object} project - Project information
   * @param {string} deletionType - Type of deletion
   * @returns {Object} Safety check results
   */
  async performSafetyChecks(project, deletionType) {
    console.log(`🔍 Performing safety checks for ${project.name}...`);
    
    const checks = {
      hasBackup: false,
      noUncommittedChanges: false,
      remoteUpToDate: false,
      noActiveProcesses: false,
      confirmationRequired: true,
      warnings: [],
      blockers: [],
      canProceed: false
    };

    try {
      if (project.type === 'submodule') {
        await this.checkSubmoduleSafety(project, checks);
      } else if (project.type === 'specification') {
        await this.checkSpecificationSafety(project, checks);
      }

      // Determine if deletion can proceed
      checks.canProceed = checks.blockers.length === 0;

      if (deletionType === 'complete-removal') {
        checks.confirmationRequired = true;
        checks.warnings.push('This action is irreversible');
      }

    } catch (error) {
      checks.blockers.push(`Safety check failed: ${error.message}`);
    }

    return checks;
  }

  /**
   * Check safety for submodule projects
   * @param {Object} project - Project information
   * @param {Object} checks - Safety checks object
   */
  async checkSubmoduleSafety(project, checks) {
    const originalCwd = process.cwd();
    
    try {
      process.chdir(project.path);

      // Check for uncommitted changes
      try {
        const status = execSync('git status --porcelain', { encoding: 'utf8' });
        checks.noUncommittedChanges = status.trim() === '';
        if (!checks.noUncommittedChanges) {
          checks.blockers.push('Uncommitted changes detected');
        }
      } catch (error) {
        checks.warnings.push('Cannot check git status');
      }

      // Check if remote is up to date
      try {
        const localCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
        const remoteCommit = execSync('git rev-parse origin/main', { encoding: 'utf8' }).trim();
        checks.remoteUpToDate = localCommit === remoteCommit;
        if (!checks.remoteUpToDate) {
          checks.warnings.push('Local commits not pushed to remote');
        }
      } catch (error) {
        checks.warnings.push('Cannot verify remote sync status');
      }

      // Check for running development server
      try {
        const processes = execSync('ps aux | grep -E "(npm run dev|yarn dev|next dev)" | grep -v grep', { encoding: 'utf8' });
        const hasActiveDevServer = processes.includes(project.name);
        checks.noActiveProcesses = !hasActiveDevServer;
        if (hasActiveDevServer) {
          checks.blockers.push('Development server is running');
        }
      } catch (error) {
        // No active processes found, which is good
        checks.noActiveProcesses = true;
      }

      // Check for recent backup (simplified check)
      const backupIndicators = ['.git', 'package.json'];
      checks.hasBackup = backupIndicators.some(indicator => 
        fs.existsSync(path.join(project.path, indicator))
      );

    } finally {
      process.chdir(originalCwd);
    }
  }

  /**
   * Check safety for specification projects
   * @param {Object} project - Project information
   * @param {Object} checks - Safety checks object
   */
  async checkSpecificationSafety(project, checks) {
    // Check for recent modifications
    const importantFiles = ['requirements.md', 'design.md', 'tasks.md'];
    let hasRecentChanges = false;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    for (const file of importantFiles) {
      const filePath = path.join(project.path, file);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        if (stats.mtime > oneWeekAgo) {
          hasRecentChanges = true;
          break;
        }
      }
    }

    if (hasRecentChanges) {
      checks.warnings.push('Specification has recent modifications (within 7 days)');
    }

    // Check if specification is complete
    const tasksPath = path.join(project.path, 'tasks.md');
    if (fs.existsSync(tasksPath)) {
      const content = fs.readFileSync(tasksPath, 'utf8');
      const completedTasks = (content.match(/- \[x\]/g) || []).length;
      const totalTasks = (content.match(/- \[[x ]\]/g) || []).length;
      
      if (totalTasks > 0 && completedTasks < totalTasks) {
        checks.warnings.push(`Specification has ${totalTasks - completedTasks} incomplete tasks`);
      }
    }

    checks.hasBackup = true; // Specifications are typically backed up in git
    checks.noUncommittedChanges = true; // Not applicable for specifications
    checks.remoteUpToDate = true; // Not applicable for specifications
    checks.noActiveProcesses = true; // Not applicable for specifications
  }

  /**
   * Execute deletion with specified type
   * @param {Object} project - Project information
   * @param {string} deletionType - Type of deletion to perform
   * @param {Object} options - Deletion options
   * @returns {Object} Deletion result
   */
  async executeDeletion(project, deletionType, options = {}) {
    console.log(`🗑️ Executing ${deletionType} for project '${project.name}'...`);

    try {
      switch (deletionType) {
        case 'soft-delete':
          return await this.softDelete(project, options);
        case 'archive':
          return await this.archiveProject(project, options);
        case 'remove-submodule':
          return await this.removeSubmodule(project, options);
        case 'move-to-inactive':
          return await this.moveToInactive(project, options);
        case 'complete-removal':
          return await this.completeRemoval(project, options);
        default:
          throw new Error(`Unknown deletion type: ${deletionType}`);
      }
    } catch (error) {
      console.error(`❌ Deletion failed: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Soft delete - remove from tracking but keep files
   * @param {Object} project - Project information
   * @param {Object} options - Deletion options
   * @returns {Object} Deletion result
   */
  async softDelete(project, options) {
    const softDeleteDir = path.join(this.basePath, '.cc-deck', 'soft-deleted');
    const metadataPath = path.join(softDeleteDir, `${project.name}.json`);

    // Create soft delete directory
    fs.mkdirSync(softDeleteDir, { recursive: true });

    // Create metadata record
    const metadata = {
      name: project.name,
      type: project.type,
      originalPath: project.path,
      deletedDate: new Date().toISOString(),
      deletedBy: 'cc-deck-status',
      reason: options.reason || 'Soft deleted by user',
      canRestore: true
    };

    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

    return {
      success: true,
      message: `Project '${project.name}' soft deleted. Files remain at ${project.path}`,
      metadataPath,
      reversible: true
    };
  }

  /**
   * Archive project - compress and store
   * @param {Object} project - Project information
   * @param {Object} options - Archive options
   * @returns {Object} Archive result
   */
  async archiveProject(project, options) {
    const archiveDir = path.join(this.basePath, '.cc-deck', 'archives');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const archiveName = `${project.name}-${timestamp}`;
    const archivePath = path.join(archiveDir, `${archiveName}.tar.gz`);

    // Create archive directory
    fs.mkdirSync(archiveDir, { recursive: true });

    // Create tar archive
    const originalCwd = process.cwd();
    try {
      process.chdir(path.dirname(project.path));
      execSync(`tar -czf "${archivePath}" "${path.basename(project.path)}"`, { stdio: 'inherit' });
    } finally {
      process.chdir(originalCwd);
    }

    // Create metadata
    const metadataPath = path.join(archiveDir, `${archiveName}.json`);
    const metadata = {
      name: project.name,
      type: project.type,
      originalPath: project.path,
      archivePath: archivePath,
      archivedDate: new Date().toISOString(),
      archivedBy: 'cc-deck-status',
      reason: options.reason || 'Archived by user',
      canRestore: true,
      size: fs.statSync(archivePath).size
    };

    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

    return {
      success: true,
      message: `Project '${project.name}' archived to ${archivePath}`,
      archivePath,
      metadataPath,
      reversible: true
    };
  }

  /**
   * Remove submodule configuration
   * @param {Object} project - Project information
   * @param {Object} options - Removal options
   * @returns {Object} Removal result
   */
  async removeSubmodule(project, options) {
    const originalCwd = process.cwd();
    
    try {
      process.chdir(this.basePath);

      // Remove from .gitmodules
      const gitmodulesPath = path.join(this.basePath, '.gitmodules');
      if (fs.existsSync(gitmodulesPath)) {
        let content = fs.readFileSync(gitmodulesPath, 'utf8');
        
        // Remove the submodule section
        const submoduleRegex = new RegExp(
          `\\[submodule "${project.name}"\\][\\s\\S]*?(?=\\[|$)`,
          'g'
        );
        content = content.replace(submoduleRegex, '').trim();
        
        fs.writeFileSync(gitmodulesPath, content + '\n');
      }

      // Remove from git config
      try {
        execSync(`git config --remove-section submodule.${project.name}`, { stdio: 'pipe' });
      } catch (error) {
        // Config section might not exist
      }

      // Remove from .git/modules
      const gitModulesPath = path.join(this.basePath, '.git', 'modules', project.name);
      if (fs.existsSync(gitModulesPath)) {
        fs.rmSync(gitModulesPath, { recursive: true, force: true });
      }

      // Stage changes
      execSync('git add .gitmodules', { stdio: 'inherit' });
      execSync(`git commit -m "Remove ${project.name} submodule configuration"`, { stdio: 'inherit' });

      return {
        success: true,
        message: `Submodule configuration removed for '${project.name}'. Files remain at ${project.path}`,
        reversible: true
      };

    } finally {
      process.chdir(originalCwd);
    }
  }

  /**
   * Move specification to inactive state
   * @param {Object} project - Project information
   * @param {Object} options - Move options
   * @returns {Object} Move result
   */
  async moveToInactive(project, options) {
    const inactiveDir = path.join(this.basePath, '.kiro', 'inactive');
    const targetPath = path.join(inactiveDir, project.name);

    // Create inactive directory
    fs.mkdirSync(inactiveDir, { recursive: true });

    // Move specification
    execSync(`mv "${project.path}" "${targetPath}"`, { stdio: 'inherit' });

    // Update status
    const statusPath = path.join(targetPath, 'kiro_status.json');
    let status = {};
    if (fs.existsSync(statusPath)) {
      status = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
    }

    status.status = 'inactive';
    status.inactivated_date = new Date().toISOString();
    status.inactivated_by = 'cc-deck-status';
    status.reason = options.reason || 'Moved to inactive by user';

    fs.writeFileSync(statusPath, JSON.stringify(status, null, 2));

    return {
      success: true,
      message: `Specification '${project.name}' moved to inactive state at ${targetPath}`,
      newPath: targetPath,
      reversible: true
    };
  }

  /**
   * Complete removal - delete all files
   * @param {Object} project - Project information
   * @param {Object} options - Removal options
   * @returns {Object} Removal result
   */
  async completeRemoval(project, options) {
    // Create final backup before deletion
    if (options.createBackup !== false) {
      console.log('📦 Creating final backup before deletion...');
      await this.archiveProject(project, { reason: 'Final backup before complete removal' });
    }

    // Remove submodule configuration if applicable
    if (project.type === 'submodule') {
      await this.removeSubmodule(project, options);
    }

    // Delete project directory
    if (fs.existsSync(project.path)) {
      fs.rmSync(project.path, { recursive: true, force: true });
    }

    // Create deletion record
    const deletionRecordDir = path.join(this.basePath, '.cc-deck', 'deletion-records');
    fs.mkdirSync(deletionRecordDir, { recursive: true });

    const deletionRecord = {
      name: project.name,
      type: project.type,
      originalPath: project.path,
      deletedDate: new Date().toISOString(),
      deletedBy: 'cc-deck-status',
      reason: options.reason || 'Complete removal by user',
      reversible: false,
      backupCreated: options.createBackup !== false
    };

    const recordPath = path.join(deletionRecordDir, `${project.name}-${Date.now()}.json`);
    fs.writeFileSync(recordPath, JSON.stringify(deletionRecord, null, 2));

    return {
      success: true,
      message: `Project '${project.name}' completely removed from ${project.path}`,
      deletionRecordPath: recordPath,
      reversible: false
    };
  }

  /**
   * Restore a soft deleted or archived project
   * @param {string} projectName - Name of project to restore
   * @param {string} restoreType - Type of restore ('soft-delete' or 'archive')
   * @returns {Object} Restore result
   */
  async restoreProject(projectName, restoreType) {
    console.log(`🔄 Restoring project '${projectName}' from ${restoreType}...`);

    try {
      if (restoreType === 'soft-delete') {
        return await this.restoreFromSoftDelete(projectName);
      } else if (restoreType === 'archive') {
        return await this.restoreFromArchive(projectName);
      } else {
        throw new Error(`Unknown restore type: ${restoreType}`);
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Restore from soft delete
   * @param {string} projectName - Project name
   * @returns {Object} Restore result
   */
  async restoreFromSoftDelete(projectName) {
    const metadataPath = path.join(this.basePath, '.cc-deck', 'soft-deleted', `${projectName}.json`);
    
    if (!fs.existsSync(metadataPath)) {
      throw new Error(`No soft delete record found for '${projectName}'`);
    }

    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    
    // Verify original files still exist
    if (!fs.existsSync(metadata.originalPath)) {
      throw new Error(`Original files no longer exist at ${metadata.originalPath}`);
    }

    // Remove soft delete record
    fs.unlinkSync(metadataPath);

    return {
      success: true,
      message: `Project '${projectName}' restored from soft delete`,
      restoredPath: metadata.originalPath
    };
  }

  /**
   * Restore from archive
   * @param {string} projectName - Project name  
   * @returns {Object} Restore result
   */
  async restoreFromArchive(projectName) {
    const archiveDir = path.join(this.basePath, '.cc-deck', 'archives');
    
    // Find the most recent archive
    const archiveFiles = fs.readdirSync(archiveDir)
      .filter(file => file.startsWith(`${projectName}-`) && file.endsWith('.json'))
      .sort()
      .reverse();

    if (archiveFiles.length === 0) {
      throw new Error(`No archive found for project '${projectName}'`);
    }

    const metadataPath = path.join(archiveDir, archiveFiles[0]);
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    
    if (!fs.existsSync(metadata.archivePath)) {
      throw new Error(`Archive file not found: ${metadata.archivePath}`);
    }

    // Extract archive
    const originalCwd = process.cwd();
    try {
      process.chdir(path.dirname(metadata.originalPath));
      execSync(`tar -xzf "${metadata.archivePath}"`, { stdio: 'inherit' });
    } finally {
      process.chdir(originalCwd);
    }

    return {
      success: true,
      message: `Project '${projectName}' restored from archive`,
      restoredPath: metadata.originalPath,
      archivePath: metadata.archivePath
    };
  }

  /**
   * List all deleted/archived projects
   * @returns {Object} List of recoverable projects
   */
  async listRecoverableProjects() {
    const recoverable = {
      softDeleted: [],
      archived: []
    };

    // Check soft deleted projects
    const softDeleteDir = path.join(this.basePath, '.cc-deck', 'soft-deleted');
    if (fs.existsSync(softDeleteDir)) {
      const files = fs.readdirSync(softDeleteDir).filter(f => f.endsWith('.json'));
      for (const file of files) {
        try {
          const metadata = JSON.parse(fs.readFileSync(path.join(softDeleteDir, file), 'utf8'));
          recoverable.softDeleted.push(metadata);
        } catch (error) {
          // Skip invalid metadata files
        }
      }
    }

    // Check archived projects
    const archiveDir = path.join(this.basePath, '.cc-deck', 'archives');
    if (fs.existsSync(archiveDir)) {
      const files = fs.readdirSync(archiveDir).filter(f => f.endsWith('.json'));
      for (const file of files) {
        try {
          const metadata = JSON.parse(fs.readFileSync(path.join(archiveDir, file), 'utf8'));
          recoverable.archived.push(metadata);
        } catch (error) {
          // Skip invalid metadata files
        }
      }
    }

    return recoverable;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProjectDeleter;
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.log('Usage: node project-deleter.js <project-name> <project-type> <deletion-type> [options]');
    console.log('Example: node project-deleter.js my-project submodule soft-delete \'{"reason":"No longer needed"}\'');
    process.exit(1);
  }

  const [projectName, projectType, deletionType] = args;
  const options = args[3] ? JSON.parse(args[3]) : {};

  const deleter = new ProjectDeleter();
  const project = {
    name: projectName,
    type: projectType,
    path: path.join('/Volumes/SSD/development/cc-deck', projectType === 'submodule' ? 'projects' : '.kiro/specs', projectName)
  };

  deleter.executeDeletion(project, deletionType, options)
    .then(result => {
      console.log('\n🗑️ Deletion Result:');
      console.log(JSON.stringify(result, null, 2));
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Deletion failed:', error);
      process.exit(1);
    });
}