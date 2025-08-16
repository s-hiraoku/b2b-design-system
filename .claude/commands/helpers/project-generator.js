#!/usr/bin/env node

/**
 * Project Generator for CC-Deck Submodules
 * Creates project structure based on templates
 */

const fs = require('fs');
const path = require('path');

class ProjectGenerator {
  /**
   * Generate project using official framework tools
   * @param {Object} config - Project configuration
   * @param {string} config.projectName - Name of the project
   * @param {string} config.projectType - Type of project (nextjs, react, vue, etc.)
   * @param {string} config.projectPath - Full path where project will be created
   * @param {string} config.githubUrl - GitHub repository URL
   */
  static async generateProject(config) {
    const { projectName, projectType, projectPath, githubUrl } = config;
    const { execSync } = require('child_process');
    
    console.log(`🏗️  Creating ${projectType} project: ${projectName}`);
    
    try {
      const projectsDir = path.dirname(projectPath);
      
      // Ensure projects directory exists
      fs.mkdirSync(projectsDir, { recursive: true });
      
      // Change to projects directory
      process.chdir(projectsDir);
      
      // Generate project using official tools
      const command = this.getCreateCommand(projectType, projectName);
      console.log(`Running: ${command}`);
      
      execSync(command, { stdio: 'inherit' });
      
      // Add CC-Deck specific files
      await this.addCCDeckIntegration(projectPath, { projectName, githubUrl, projectType });
      
      console.log(`✅ Project structure created successfully at: ${projectPath}`);
      return { success: true, path: projectPath };
      
    } catch (error) {
      console.error(`❌ Error creating project: ${error.message}`);
      
      // Clean up on error
      if (fs.existsSync(projectPath)) {
        fs.rmSync(projectPath, { recursive: true, force: true });
      }
      
      return { success: false, error: error.message };
    }
  }

  /**
   * Get the appropriate create command for project type
   * @param {string} projectType - Type of project (nextjs, react, vue, etc.)
   * @param {string} projectName - Name of the project
   * @returns {string} Command to create the project
   */
  static getCreateCommand(projectType, projectName) {
    const commands = {
      'nextjs': `npx create-next-app@latest ${projectName} --typescript --tailwind --eslint --app --src-dir`,
      'react': `npm create vite@latest ${projectName} -- --template react-ts`,
      'vue': `npm create vue@latest ${projectName} -- --typescript --jsx --router --pinia --vitest --eslint --prettier`,
      'astro': `npm create astro@latest ${projectName} -- --template minimal --typescript strict`,
      'express': `npm create express@latest ${projectName} -- --typescript`,
      'basic': `npm init -y ${projectName}`
    };
    
    return commands[projectType] || commands['nextjs']; // Default to Next.js
  }

  /**
   * Add CC-Deck specific integration files to the project
   * @param {string} projectPath - Path to the project
   * @param {Object} variables - Variables for replacement
   */
  static async addCCDeckIntegration(projectPath, variables) {
    const { projectName, githubUrl, projectType } = variables;
    
    // Add CC-Deck specific README section
    const readmePath = path.join(projectPath, 'README.md');
    if (fs.existsSync(readmePath)) {
      let readmeContent = fs.readFileSync(readmePath, 'utf8');
      
      const ccDeckSection = `

## Part of CC-Deck

This project is part of the CC-Deck development platform and is configured as a Git submodule for independent development and deployment.

- **Parent Project**: [CC-Deck](../../README.md)
- **Submodule Management**: [Documentation](../../docs/submodule-management.md)
- **Repository**: ${githubUrl}

### Development Workflow

This project follows the CC-Deck workflow with:
- Kiro SDD (Specification-Driven Development)
- Test-Driven Development (TDD)
- Enterprise-grade quality assurance
- Automated deployment pipelines

For more information, see the [CC-Deck documentation](../../docs/).
`;
      
      readmeContent += ccDeckSection;
      fs.writeFileSync(readmePath, readmeContent, 'utf8');
      console.log(`   📄 Updated: README.md with CC-Deck integration`);
    }
    
    // Add .vscode settings for CC-Deck workflow
    const vscodePath = path.join(projectPath, '.vscode');
    fs.mkdirSync(vscodePath, { recursive: true });
    
    const settingsContent = {
      "typescript.preferences.importModuleSpecifier": "relative",
      "editor.formatOnSave": true,
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
      },
      "files.associations": {
        "*.md": "markdown"
      }
    };
    
    fs.writeFileSync(
      path.join(vscodePath, 'settings.json'),
      JSON.stringify(settingsContent, null, 2),
      'utf8'
    );
    console.log(`   📄 Created: .vscode/settings.json`);
  }

  /**
   * Initialize git repository in project
   * @param {string} projectPath - Path to the project
   * @param {string} githubUrl - GitHub repository URL
   * @param {string} projectName - Name of the project
   */
  static async initializeGitRepository(projectPath, githubUrl, projectName) {
    const { execSync } = require('child_process');
    
    console.log('🔧 Initializing Git repository...');
    
    try {
      // Change to project directory
      process.chdir(projectPath);
      
      // Initialize git repository
      execSync('git init', { stdio: 'inherit' });
      
      // Add remote origin
      execSync(`git remote add origin ${githubUrl}`, { stdio: 'inherit' });
      
      // Stage all files
      execSync('git add .', { stdio: 'inherit' });
      
      // Create initial commit
      const commitMessage = `Initial project setup for ${projectName}

- Add basic project structure
- Configure development environment
- Set up gitignore and configuration files
- Ready for CC-Deck submodule integration

🚀 Generated with CC-Deck submodule-setup command`;

      execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
      
      // Set main branch and push
      execSync('git branch -M main', { stdio: 'inherit' });
      execSync('git push -u origin main', { stdio: 'inherit' });
      
      console.log('✅ Git repository initialized and pushed to GitHub');
      return { success: true };
      
    } catch (error) {
      console.error(`❌ Error initializing Git repository: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  /**
   * Configure submodule in parent project
   * @param {string} projectName - Name of the project
   * @param {string} githubUrl - GitHub repository URL
   * @param {string} parentPath - Path to parent project
   */
  static async configureSubmodule(projectName, githubUrl, parentPath) {
    const { execSync } = require('child_process');
    
    console.log('🔗 Configuring submodule in parent project...');
    
    try {
      // Change to parent directory
      process.chdir(parentPath);
      
      // Update .gitmodules file
      const gitmodulesPath = path.join(parentPath, '.gitmodules');
      const submoduleConfig = `
[submodule "projects/${projectName}"]
    path = projects/${projectName}
    url = ${githubUrl}`;
      
      let gitmodulesContent = '';
      if (fs.existsSync(gitmodulesPath)) {
        gitmodulesContent = fs.readFileSync(gitmodulesPath, 'utf8');
      }
      
      // Append new submodule configuration
      gitmodulesContent += submoduleConfig;
      fs.writeFileSync(gitmodulesPath, gitmodulesContent.trim() + '\n', 'utf8');
      
      // Sync submodule configuration
      execSync(`git submodule sync projects/${projectName}`, { stdio: 'inherit' });
      execSync(`git submodule init projects/${projectName}`, { stdio: 'inherit' });
      
      // Set remote HEAD in submodule
      process.chdir(path.join(parentPath, 'projects', projectName));
      execSync('git remote set-head origin main', { stdio: 'inherit' });
      
      // Return to parent and commit changes
      process.chdir(parentPath);
      execSync('git add .gitmodules', { stdio: 'inherit' });
      
      const commitMessage = `Add ${projectName} as Git submodule

- New submodule: projects/${projectName}
- Repository: ${githubUrl}
- Configured for independent development and deployment

🔗 Added with CC-Deck submodule-setup command`;

      execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
      
      // Add submodule reference
      execSync(`git add projects/${projectName}`, { stdio: 'inherit' });
      execSync(`git commit -m "Initialize ${projectName} submodule reference"`, { stdio: 'inherit' });
      
      console.log('✅ Submodule configured in parent project');
      return { success: true };
      
    } catch (error) {
      console.error(`❌ Error configuring submodule: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  /**
   * Complete project setup process
   * @param {Object} config - Complete project configuration
   */
  static async setupCompleteProject(config) {
    const { projectName, projectType, githubUrl } = config;
    const parentPath = '/Volumes/SSD/development/cc-deck';
    const projectPath = path.join(parentPath, 'projects', projectName);
    
    console.log(`🚀 Starting complete setup for ${projectName}...`);
    
    try {
      // Step 1: Generate project structure
      const projectResult = await this.generateProject({
        projectName,
        projectType,
        projectPath,
        githubUrl
      });
      
      if (!projectResult.success) {
        throw new Error(`Project generation failed: ${projectResult.error}`);
      }
      
      // Step 2: Initialize Git repository
      const gitResult = await this.initializeGitRepository(projectPath, githubUrl, projectName);
      
      if (!gitResult.success) {
        throw new Error(`Git initialization failed: ${gitResult.error}`);
      }
      
      // Step 3: Configure submodule
      const submoduleResult = await this.configureSubmodule(projectName, githubUrl, parentPath);
      
      if (!submoduleResult.success) {
        throw new Error(`Submodule configuration failed: ${submoduleResult.error}`);
      }
      
      console.log('🎉 Complete project setup finished successfully!');
      
      return {
        success: true,
        projectPath,
        message: `Project ${projectName} created and configured as submodule`
      };
      
    } catch (error) {
      console.error(`❌ Setup failed: ${error.message}`);
      
      // Clean up on failure
      if (fs.existsSync(projectPath)) {
        console.log('🧹 Cleaning up failed setup...');
        fs.rmSync(projectPath, { recursive: true, force: true });
      }
      
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProjectGenerator;
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.log('Usage: node project-generator.js <projectName> <githubUrl> <projectType>');
    console.log('Example: node project-generator.js my-blog-app https://github.com/user/my-blog-app.git nextjs');
    process.exit(1);
  }

  const [projectName, githubUrl, projectType] = args;
  
  ProjectGenerator.setupCompleteProject({
    projectName,
    githubUrl,
    projectType: projectType || 'nextjs'
  }).then(result => {
    console.log('\n' + JSON.stringify(result, null, 2));
    process.exit(result.success ? 0 : 1);
  }).catch(error => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
}