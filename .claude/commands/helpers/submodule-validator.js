#!/usr/bin/env node

/**
 * Submodule Setup Validator
 * Validates project names, GitHub URLs, and other inputs for submodule setup
 */

class SubmoduleValidator {
  /**
   * Validate project name format
   * @param {string} projectName - The project name to validate
   * @returns {Object} Validation result with isValid and message
   */
  static validateProjectName(projectName) {
    if (!projectName) {
      return {
        isValid: false,
        message: "Project name is required"
      };
    }

    // Check length
    if (projectName.length < 2) {
      return {
        isValid: false,
        message: "Project name must be at least 2 characters long"
      };
    }

    if (projectName.length > 50) {
      return {
        isValid: false,
        message: "Project name must be less than 50 characters long"
      };
    }

    // Check format (lowercase letters, numbers, hyphens only)
    const nameRegex = /^[a-z0-9-]+$/;
    if (!nameRegex.test(projectName)) {
      return {
        isValid: false,
        message: "Project name can only contain lowercase letters, numbers, and hyphens"
      };
    }

    // Check that it doesn't start or end with hyphen
    if (projectName.startsWith('-') || projectName.endsWith('-')) {
      return {
        isValid: false,
        message: "Project name cannot start or end with a hyphen"
      };
    }

    // Check for consecutive hyphens
    if (projectName.includes('--')) {
      return {
        isValid: false,
        message: "Project name cannot contain consecutive hyphens"
      };
    }

    // Reserved names
    const reservedNames = [
      'node_modules', 'package', 'npm', 'git', 'github', 'docs', 'test', 'tests',
      'src', 'dist', 'build', 'public', 'assets', 'static', 'config', 'bin',
      'lib', 'node', 'react', 'next', 'vue', 'angular', 'svelte'
    ];

    if (reservedNames.includes(projectName)) {
      return {
        isValid: false,
        message: `"${projectName}" is a reserved name and cannot be used`
      };
    }

    return {
      isValid: true,
      message: "Project name is valid"
    };
  }

  /**
   * Validate GitHub URL format
   * @param {string} githubUrl - The GitHub URL to validate
   * @returns {Object} Validation result with isValid, message, and extracted info
   */
  static validateGithubUrl(githubUrl) {
    if (!githubUrl) {
      return {
        isValid: false,
        message: "GitHub URL is required"
      };
    }

    // Basic URL format validation
    try {
      const url = new URL(githubUrl);
      
      // Must be GitHub
      if (url.hostname !== 'github.com') {
        return {
          isValid: false,
          message: "URL must be a GitHub repository (github.com)"
        };
      }

      // Extract path parts
      const pathParts = url.pathname.split('/').filter(part => part);
      
      if (pathParts.length < 2) {
        return {
          isValid: false,
          message: "GitHub URL must include username and repository name"
        };
      }

      const [username, repository] = pathParts;
      
      // Validate username and repository format
      const githubNameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?$/;
      
      if (!githubNameRegex.test(username)) {
        return {
          isValid: false,
          message: "Invalid GitHub username format"
        };
      }

      // Remove .git suffix if present
      const repoName = repository.replace(/\.git$/, '');
      
      if (!githubNameRegex.test(repoName)) {
        return {
          isValid: false,
          message: "Invalid GitHub repository name format"
        };
      }

      return {
        isValid: true,
        message: "GitHub URL is valid",
        username,
        repository: repoName,
        fullUrl: `https://github.com/${username}/${repoName}.git`
      };

    } catch (error) {
      return {
        isValid: false,
        message: "Invalid URL format"
      };
    }
  }

  /**
   * Validate project type
   * @param {string} projectType - The project type to validate
   * @returns {Object} Validation result
   */
  static validateProjectType(projectType) {
    const validTypes = ['next-js', 'react', 'vue', 'vanilla', 'basic', 'other'];
    
    if (!projectType) {
      return {
        isValid: true,
        message: "Using default project type",
        projectType: 'next-js'
      };
    }

    if (!validTypes.includes(projectType)) {
      return {
        isValid: false,
        message: `Invalid project type. Valid types: ${validTypes.join(', ')}`
      };
    }

    return {
      isValid: true,
      message: "Project type is valid",
      projectType
    };
  }

  /**
   * Check if project directory already exists
   * @param {string} projectName - The project name to check
   * @returns {Object} Validation result
   */
  static checkProjectDirectoryExists(projectName) {
    const fs = require('fs');
    const path = require('path');
    
    const projectPath = path.join(process.cwd(), 'projects', projectName);
    
    if (fs.existsSync(projectPath)) {
      return {
        exists: true,
        message: `Project directory already exists: projects/${projectName}/`,
        path: projectPath
      };
    }

    return {
      exists: false,
      message: `Project directory is available: projects/${projectName}/`,
      path: projectPath
    };
  }

  /**
   * Validate all inputs at once
   * @param {Object} inputs - Object containing projectName, githubUrl, projectType
   * @returns {Object} Combined validation result
   */
  static validateAll(inputs) {
    const { projectName, githubUrl, projectType } = inputs;
    
    const results = {
      projectName: this.validateProjectName(projectName),
      githubUrl: this.validateGithubUrl(githubUrl),
      projectType: this.validateProjectType(projectType),
      directory: this.checkProjectDirectoryExists(projectName)
    };

    const allValid = Object.values(results).every(result => 
      result.isValid !== false && result.exists !== true
    );

    return {
      isValid: allValid,
      results,
      summary: {
        projectName: results.projectName.isValid ? projectName : null,
        githubUrl: results.githubUrl.isValid ? results.githubUrl.fullUrl : null,
        projectType: results.projectType.isValid ? results.projectType.projectType : 'next-js',
        projectPath: results.directory.path
      }
    };
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SubmoduleValidator;
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node submodule-validator.js <projectName> <githubUrl> [projectType]');
    console.log('Example: node submodule-validator.js my-blog-app https://github.com/user/my-blog-app.git next-js');
    process.exit(1);
  }

  const [projectName, githubUrl, projectType] = args;
  const result = SubmoduleValidator.validateAll({ projectName, githubUrl, projectType });
  
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.isValid ? 0 : 1);
}