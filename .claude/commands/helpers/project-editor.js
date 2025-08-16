#!/usr/bin/env node

/**
 * CC-Deck Project Editor
 * Interactive editing functionality for projects
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ProjectEditor {
  constructor(basePath = '/Volumes/SSD/development/cc-deck') {
    this.basePath = basePath;
  }

  /**
   * Get available edit actions for a project
   * @param {Object} project - Project information
   * @returns {Array} Available edit actions
   */
  getAvailableActions(project) {
    const actions = [];

    if (project.type === 'submodule') {
      actions.push(
        { id: 'remote-url', name: 'Update Remote URL', description: 'Change GitHub repository URL' },
        { id: 'sync-submodule', name: 'Sync Submodule', description: 'Update to latest remote commits' },
        { id: 'change-branch', name: 'Change Branch', description: 'Switch to different branch' },
        { id: 'update-deps', name: 'Update Dependencies', description: 'Run npm/yarn install' },
        { id: 'env-config', name: 'Environment Config', description: 'Edit environment variables' },
        { id: 'package-json', name: 'Edit Package.json', description: 'Modify project metadata' },
        { id: 'rebuild', name: 'Rebuild Project', description: 'Clean and rebuild project' },
        { id: 'reset-clean', name: 'Reset to Clean', description: 'Discard local changes' }
      );
    } else if (project.type === 'specification') {
      actions.push(
        { id: 'requirements', name: 'Edit Requirements', description: 'Modify requirements.md' },
        { id: 'design', name: 'Update Design', description: 'Edit design.md' },
        { id: 'tasks', name: 'Modify Tasks', description: 'Edit tasks.md' },
        { id: 'change-phase', name: 'Change Phase', description: 'Move to different phase' },
        { id: 'metadata', name: 'Update Metadata', description: 'Edit project metadata' },
        { id: 'reset-progress', name: 'Reset Progress', description: 'Reset phase progress' },
        { id: 'archive', name: 'Archive Specification', description: 'Move to archived state' }
      );
    }

    return actions;
  }

  /**
   * Execute an edit action
   * @param {Object} project - Project information
   * @param {string} actionId - Action to perform
   * @param {Object} options - Action options
   * @returns {Object} Action result
   */
  async executeAction(project, actionId, options = {}) {
    console.log(`🔧 Executing action '${actionId}' for project '${project.name}'...`);

    try {
      switch (actionId) {
        case 'remote-url':
          return await this.updateRemoteUrl(project, options);
        case 'sync-submodule':
          return await this.syncSubmodule(project);
        case 'change-branch':
          return await this.changeBranch(project, options);
        case 'update-deps':
          return await this.updateDependencies(project);
        case 'env-config':
          return await this.editEnvironmentConfig(project, options);
        case 'package-json':
          return await this.editPackageJson(project, options);
        case 'rebuild':
          return await this.rebuildProject(project);
        case 'reset-clean':
          return await this.resetToClean(project);
        case 'requirements':
          return await this.editRequirements(project, options);
        case 'design':
          return await this.editDesign(project, options);
        case 'tasks':
          return await this.editTasks(project, options);
        case 'change-phase':
          return await this.changePhase(project, options);
        case 'metadata':
          return await this.editMetadata(project, options);
        case 'reset-progress':
          return await this.resetProgress(project);
        case 'archive':
          return await this.archiveSpecification(project);
        default:
          throw new Error(`Unknown action: ${actionId}`);
      }
    } catch (error) {
      console.error(`❌ Action failed: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Update remote URL for a submodule
   * @param {Object} project - Project information
   * @param {Object} options - Options containing new URL
   * @returns {Object} Action result
   */
  async updateRemoteUrl(project, options) {
    const { newUrl } = options;
    
    if (!newUrl) {
      throw new Error('New URL is required');
    }

    const originalCwd = process.cwd();
    
    try {
      // Change to project directory
      process.chdir(project.path);

      // Update remote URL
      execSync(`git remote set-url origin ${newUrl}`, { stdio: 'inherit' });

      // Update .gitmodules in parent project
      const gitmodulesPath = path.join(this.basePath, '.gitmodules');
      if (fs.existsSync(gitmodulesPath)) {
        let content = fs.readFileSync(gitmodulesPath, 'utf8');
        content = content.replace(
          new RegExp(`(\\[submodule "${project.name}"\\][\\s\\S]*?url\\s*=\\s*).*`, 'g'),
          `$1${newUrl}`
        );
        fs.writeFileSync(gitmodulesPath, content);

        // Commit changes to parent project
        process.chdir(this.basePath);
        execSync('git add .gitmodules', { stdio: 'inherit' });
        execSync(`git commit -m "Update ${project.name} remote URL to ${newUrl}"`, { stdio: 'inherit' });
      }

      return {
        success: true,
        message: `Remote URL updated to ${newUrl}`,
        newUrl
      };

    } finally {
      process.chdir(originalCwd);
    }
  }

  /**
   * Sync submodule with remote
   * @param {Object} project - Project information
   * @returns {Object} Action result
   */
  async syncSubmodule(project) {
    const originalCwd = process.cwd();
    
    try {
      process.chdir(project.path);
      
      // Pull latest changes
      execSync('git pull origin main', { stdio: 'inherit' });
      
      // Update parent project submodule reference
      process.chdir(this.basePath);
      execSync(`git add ${path.relative(this.basePath, project.path)}`, { stdio: 'inherit' });
      execSync(`git commit -m "Update ${project.name} submodule to latest"`, { stdio: 'inherit' });

      return {
        success: true,
        message: 'Submodule synced successfully'
      };

    } finally {
      process.chdir(originalCwd);
    }
  }

  /**
   * Change branch for a project
   * @param {Object} project - Project information
   * @param {Object} options - Options containing branch name
   * @returns {Object} Action result
   */
  async changeBranch(project, options) {
    const { branch } = options;
    
    if (!branch) {
      throw new Error('Branch name is required');
    }

    const originalCwd = process.cwd();
    
    try {
      process.chdir(project.path);
      
      // Check if branch exists remotely
      try {
        execSync(`git ls-remote --heads origin ${branch}`, { stdio: 'pipe' });
      } catch (error) {
        throw new Error(`Branch '${branch}' does not exist on remote`);
      }

      // Checkout branch
      execSync(`git checkout ${branch}`, { stdio: 'inherit' });
      execSync(`git pull origin ${branch}`, { stdio: 'inherit' });

      return {
        success: true,
        message: `Switched to branch '${branch}'`,
        currentBranch: branch
      };

    } finally {
      process.chdir(originalCwd);
    }
  }

  /**
   * Update project dependencies
   * @param {Object} project - Project information
   * @returns {Object} Action result
   */
  async updateDependencies(project) {
    const originalCwd = process.cwd();
    
    try {
      process.chdir(project.path);

      // Determine package manager
      let packageManager = 'npm';
      if (fs.existsSync(path.join(project.path, 'yarn.lock'))) {
        packageManager = 'yarn';
      } else if (fs.existsSync(path.join(project.path, 'pnpm-lock.yaml'))) {
        packageManager = 'pnpm';
      }

      // Run install command
      const installCommand = packageManager === 'yarn' ? 'yarn install' : 
                           packageManager === 'pnpm' ? 'pnpm install' : 'npm install';
      
      execSync(installCommand, { stdio: 'inherit' });

      return {
        success: true,
        message: `Dependencies updated using ${packageManager}`,
        packageManager
      };

    } finally {
      process.chdir(originalCwd);
    }
  }

  /**
   * Edit environment configuration
   * @param {Object} project - Project information
   * @param {Object} options - Environment options
   * @returns {Object} Action result
   */
  async editEnvironmentConfig(project, options) {
    const { variables } = options;
    
    const envPath = path.join(project.path, '.env.local');
    
    try {
      let envContent = '';
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
      }

      // Add or update environment variables
      if (variables) {
        for (const [key, value] of Object.entries(variables)) {
          const regex = new RegExp(`^${key}=.*$`, 'm');
          const newLine = `${key}=${value}`;
          
          if (regex.test(envContent)) {
            envContent = envContent.replace(regex, newLine);
          } else {
            envContent += `\n${newLine}`;
          }
        }
      }

      fs.writeFileSync(envPath, envContent.trim() + '\n');

      return {
        success: true,
        message: 'Environment configuration updated',
        envPath
      };

    } catch (error) {
      throw new Error(`Failed to update environment config: ${error.message}`);
    }
  }

  /**
   * Edit package.json
   * @param {Object} project - Project information
   * @param {Object} options - Package.json updates
   * @returns {Object} Action result
   */
  async editPackageJson(project, options) {
    const { updates } = options;
    
    const packagePath = path.join(project.path, 'package.json');
    
    if (!fs.existsSync(packagePath)) {
      throw new Error('package.json not found');
    }

    try {
      const packageContent = fs.readFileSync(packagePath, 'utf8');
      const packageJson = JSON.parse(packageContent);

      // Apply updates
      if (updates) {
        for (const [key, value] of Object.entries(updates)) {
          packageJson[key] = value;
        }
      }

      fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');

      return {
        success: true,
        message: 'package.json updated',
        updates
      };

    } catch (error) {
      throw new Error(`Failed to update package.json: ${error.message}`);
    }
  }

  /**
   * Rebuild project
   * @param {Object} project - Project information
   * @returns {Object} Action result
   */
  async rebuildProject(project) {
    const originalCwd = process.cwd();
    
    try {
      process.chdir(project.path);

      // Clean build directories
      const buildDirs = ['.next', 'build', 'dist'];
      for (const dir of buildDirs) {
        const dirPath = path.join(project.path, dir);
        if (fs.existsSync(dirPath)) {
          fs.rmSync(dirPath, { recursive: true, force: true });
        }
      }

      // Reinstall dependencies
      await this.updateDependencies(project);

      // Run build if script exists
      const packagePath = path.join(project.path, 'package.json');
      if (fs.existsSync(packagePath)) {
        const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        if (packageJson.scripts && packageJson.scripts.build) {
          execSync('npm run build', { stdio: 'inherit' });
        }
      }

      return {
        success: true,
        message: 'Project rebuilt successfully'
      };

    } finally {
      process.chdir(originalCwd);
    }
  }

  /**
   * Reset project to clean state
   * @param {Object} project - Project information
   * @returns {Object} Action result
   */
  async resetToClean(project) {
    const originalCwd = process.cwd();
    
    try {
      process.chdir(project.path);

      // Check for uncommitted changes
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      if (status.trim() === '') {
        return {
          success: true,
          message: 'Project is already clean'
        };
      }

      // Reset all changes
      execSync('git reset --hard HEAD', { stdio: 'inherit' });
      execSync('git clean -fd', { stdio: 'inherit' });

      return {
        success: true,
        message: 'Project reset to clean state'
      };

    } finally {
      process.chdir(originalCwd);
    }
  }

  /**
   * Edit specification requirements
   * @param {Object} project - Project information
   * @param {Object} options - Edit options
   * @returns {Object} Action result
   */
  async editRequirements(project, options) {
    const { content } = options;
    const requirementsPath = path.join(project.path, 'requirements.md');

    try {
      if (content) {
        fs.writeFileSync(requirementsPath, content);
      }

      return {
        success: true,
        message: 'Requirements updated',
        filePath: requirementsPath
      };

    } catch (error) {
      throw new Error(`Failed to update requirements: ${error.message}`);
    }
  }

  /**
   * Edit specification design
   * @param {Object} project - Project information
   * @param {Object} options - Edit options
   * @returns {Object} Action result
   */
  async editDesign(project, options) {
    const { content } = options;
    const designPath = path.join(project.path, 'design.md');

    try {
      if (content) {
        fs.writeFileSync(designPath, content);
      }

      return {
        success: true,
        message: 'Design updated',
        filePath: designPath
      };

    } catch (error) {
      throw new Error(`Failed to update design: ${error.message}`);
    }
  }

  /**
   * Edit specification tasks
   * @param {Object} project - Project information
   * @param {Object} options - Edit options
   * @returns {Object} Action result
   */
  async editTasks(project, options) {
    const { content, markCompleted } = options;
    const tasksPath = path.join(project.path, 'tasks.md');

    try {
      if (content) {
        fs.writeFileSync(tasksPath, content);
      }

      if (markCompleted && Array.isArray(markCompleted)) {
        // Mark specific tasks as completed
        let tasksContent = fs.readFileSync(tasksPath, 'utf8');
        
        for (const taskIndex of markCompleted) {
          tasksContent = tasksContent.replace(
            /^- \[ \]/gm,
            (match, offset) => {
              const lineNumber = tasksContent.substring(0, offset).split('\n').length;
              return lineNumber === taskIndex + 1 ? '- [x]' : match;
            }
          );
        }
        
        fs.writeFileSync(tasksPath, tasksContent);
      }

      return {
        success: true,
        message: 'Tasks updated',
        filePath: tasksPath
      };

    } catch (error) {
      throw new Error(`Failed to update tasks: ${error.message}`);
    }
  }

  /**
   * Change specification phase
   * @param {Object} project - Project information
   * @param {Object} options - Phase options
   * @returns {Object} Action result
   */
  async changePhase(project, options) {
    const { phase } = options;
    const statusPath = path.join(project.path, 'kiro_status.json');

    try {
      let status = {};
      if (fs.existsSync(statusPath)) {
        status = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
      }

      status.current_phase = phase;
      status.last_updated = new Date().toISOString();

      fs.writeFileSync(statusPath, JSON.stringify(status, null, 2));

      return {
        success: true,
        message: `Phase changed to '${phase}'`,
        newPhase: phase
      };

    } catch (error) {
      throw new Error(`Failed to change phase: ${error.message}`);
    }
  }

  /**
   * Reset specification progress
   * @param {Object} project - Project information
   * @returns {Object} Action result
   */
  async resetProgress(project) {
    const tasksPath = path.join(project.path, 'tasks.md');
    const statusPath = path.join(project.path, 'kiro_status.json');

    try {
      // Reset all tasks to uncompleted
      if (fs.existsSync(tasksPath)) {
        let content = fs.readFileSync(tasksPath, 'utf8');
        content = content.replace(/- \[x\]/g, '- [ ]');
        fs.writeFileSync(tasksPath, content);
      }

      // Reset status
      if (fs.existsSync(statusPath)) {
        const status = {
          current_phase: 'requirements',
          last_updated: new Date().toISOString(),
          progress: 0
        };
        fs.writeFileSync(statusPath, JSON.stringify(status, null, 2));
      }

      return {
        success: true,
        message: 'Progress reset successfully'
      };

    } catch (error) {
      throw new Error(`Failed to reset progress: ${error.message}`);
    }
  }

  /**
   * Archive a specification
   * @param {Object} project - Project information
   * @returns {Object} Action result
   */
  async archiveSpecification(project) {
    const archiveDir = path.join(this.basePath, '.kiro', 'archived');
    const archivePath = path.join(archiveDir, `${project.name}-${Date.now()}`);

    try {
      // Create archive directory
      fs.mkdirSync(archiveDir, { recursive: true });

      // Copy specification to archive
      execSync(`cp -r "${project.path}" "${archivePath}"`, { stdio: 'inherit' });

      // Add archive metadata
      const metadata = {
        original_path: project.path,
        archived_date: new Date().toISOString(),
        archived_by: 'cc-deck-status'
      };
      fs.writeFileSync(path.join(archivePath, 'archive_metadata.json'), JSON.stringify(metadata, null, 2));

      return {
        success: true,
        message: `Specification archived to ${archivePath}`,
        archivePath
      };

    } catch (error) {
      throw new Error(`Failed to archive specification: ${error.message}`);
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProjectEditor;
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.log('Usage: node project-editor.js <project-name> <project-type> <action> [options]');
    console.log('Example: node project-editor.js my-project submodule sync-submodule');
    process.exit(1);
  }

  const [projectName, projectType, action] = args;
  const options = args[3] ? JSON.parse(args[3]) : {};

  const editor = new ProjectEditor();
  const project = {
    name: projectName,
    type: projectType,
    path: path.join('/Volumes/SSD/development/cc-deck', projectType === 'submodule' ? 'projects' : '.kiro/specs', projectName)
  };

  editor.executeAction(project, action, options)
    .then(result => {
      console.log('\n📝 Edit Result:');
      console.log(JSON.stringify(result, null, 2));
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Edit failed:', error);
      process.exit(1);
    });
}