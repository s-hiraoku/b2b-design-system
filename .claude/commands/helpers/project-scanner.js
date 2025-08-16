#!/usr/bin/env node

/**
 * CC-Deck Project Scanner
 * Discovers and analyzes all projects in the CC-Deck environment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ProjectScanner {
  constructor(basePath = '/Volumes/SSD/development/cc-deck') {
    this.basePath = basePath;
    this.projectsPath = path.join(basePath, 'projects');
    this.specsPath = path.join(basePath, '.kiro', 'specs');
  }

  /**
   * Scan all projects in CC-Deck
   * @returns {Object} Complete project scan results
   */
  async scanAllProjects() {
    console.log('🔍 Scanning CC-Deck projects...');
    
    const results = {
      timestamp: new Date().toISOString(),
      summary: {
        total: 0,
        submodules: 0,
        specifications: 0,
        active: 0,
        issues: 0
      },
      submodules: [],
      specifications: [],
      health: {
        overall: 0,
        issues: []
      }
    };

    try {
      // Scan submodule projects
      if (fs.existsSync(this.projectsPath)) {
        results.submodules = await this.scanSubmoduleProjects();
        results.summary.submodules = results.submodules.length;
      }

      // Scan specification projects
      if (fs.existsSync(this.specsPath)) {
        results.specifications = await this.scanSpecificationProjects();
        results.summary.specifications = results.specifications.length;
      }

      // Calculate summary statistics
      results.summary.total = results.summary.submodules + results.summary.specifications;
      results.summary.active = this.countActiveProjects(results);
      results.summary.issues = this.countProjectsWithIssues(results);

      // Calculate overall health
      results.health = this.calculateOverallHealth(results);

      console.log(`✅ Scan complete: ${results.summary.total} projects found`);
      return results;

    } catch (error) {
      console.error(`❌ Scan failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Scan submodule projects in projects/ directory
   * @returns {Array} Array of submodule project information
   */
  async scanSubmoduleProjects() {
    const submodules = [];
    
    if (!fs.existsSync(this.projectsPath)) {
      return submodules;
    }

    const projectDirs = fs.readdirSync(this.projectsPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const projectName of projectDirs) {
      try {
        const projectPath = path.join(this.projectsPath, projectName);
        const projectInfo = await this.analyzeSubmoduleProject(projectName, projectPath);
        submodules.push(projectInfo);
      } catch (error) {
        console.error(`❌ Error scanning submodule ${projectName}: ${error.message}`);
        submodules.push({
          name: projectName,
          type: 'submodule',
          status: 'error',
          error: error.message,
          health: { score: 0, issues: [error.message] }
        });
      }
    }

    return submodules;
  }

  /**
   * Analyze a specific submodule project
   * @param {string} projectName - Name of the project
   * @param {string} projectPath - Full path to the project
   * @returns {Object} Project analysis results
   */
  async analyzeSubmoduleProject(projectName, projectPath) {
    const analysis = {
      name: projectName,
      type: 'submodule',
      path: projectPath,
      status: 'unknown',
      lastActivity: null,
      git: {},
      build: {},
      dependencies: {},
      health: { score: 0, issues: [] },
      metadata: {}
    };

    // Check if it's a git repository
    const gitPath = path.join(projectPath, '.git');
    if (fs.existsSync(gitPath)) {
      analysis.git = await this.analyzeGitStatus(projectPath);
    }

    // Check for package.json (Node.js project)
    const packageJsonPath = path.join(projectPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      analysis.metadata = this.analyzePackageJson(packageJsonPath);
      analysis.dependencies = this.analyzeDependencies(projectPath);
      analysis.build = await this.analyzeBuildStatus(projectPath);
    }

    // Determine project status
    analysis.status = this.determineProjectStatus(analysis);
    
    // Calculate health score
    analysis.health = this.calculateProjectHealth(analysis);

    // Get last activity
    analysis.lastActivity = this.getLastActivity(analysis);

    return analysis;
  }

  /**
   * Scan Kiro SDD specification projects
   * @returns {Array} Array of specification project information
   */
  async scanSpecificationProjects() {
    const specifications = [];
    
    if (!fs.existsSync(this.specsPath)) {
      return specifications;
    }

    const specDirs = fs.readdirSync(this.specsPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const specName of specDirs) {
      try {
        const specPath = path.join(this.specsPath, specName);
        const specInfo = await this.analyzeSpecification(specName, specPath);
        specifications.push(specInfo);
      } catch (error) {
        console.error(`❌ Error scanning specification ${specName}: ${error.message}`);
        specifications.push({
          name: specName,
          type: 'specification',
          status: 'error',
          error: error.message,
          health: { score: 0, issues: [error.message] }
        });
      }
    }

    return specifications;
  }

  /**
   * Analyze a Kiro SDD specification
   * @param {string} specName - Name of the specification
   * @param {string} specPath - Full path to the specification
   * @returns {Object} Specification analysis results
   */
  async analyzeSpecification(specName, specPath) {
    const analysis = {
      name: specName,
      type: 'specification',
      path: specPath,
      status: 'unknown',
      phase: 'unknown',
      progress: 0,
      tasks: { completed: 0, total: 0 },
      lastUpdate: null,
      health: { score: 0, issues: [] },
      files: {}
    };

    // Check for standard Kiro SDD files
    const standardFiles = [
      'requirements.md',
      'design.md', 
      'tasks.md',
      'acceptance.md',
      'kiro_status.json'
    ];

    for (const fileName of standardFiles) {
      const filePath = path.join(specPath, fileName);
      if (fs.existsSync(filePath)) {
        analysis.files[fileName] = {
          exists: true,
          size: fs.statSync(filePath).size,
          lastModified: fs.statSync(filePath).mtime
        };
      } else {
        analysis.files[fileName] = { exists: false };
      }
    }

    // Analyze Kiro status if available
    const statusPath = path.join(specPath, 'kiro_status.json');
    if (fs.existsSync(statusPath)) {
      try {
        const statusContent = fs.readFileSync(statusPath, 'utf8');
        const status = JSON.parse(statusContent);
        analysis.phase = status.current_phase || 'unknown';
        analysis.progress = this.calculatePhaseProgress(status);
      } catch (error) {
        analysis.health.issues.push('Invalid kiro_status.json format');
      }
    }

    // Analyze tasks if available
    const tasksPath = path.join(specPath, 'tasks.md');
    if (fs.existsSync(tasksPath)) {
      analysis.tasks = this.analyzeTasksFile(tasksPath);
    }

    // Determine status and health
    analysis.status = this.determineSpecificationStatus(analysis);
    analysis.health = this.calculateSpecificationHealth(analysis);
    analysis.lastUpdate = this.getSpecificationLastUpdate(analysis);

    return analysis;
  }

  /**
   * Analyze Git status for a project
   * @param {string} projectPath - Path to the project
   * @returns {Object} Git status information
   */
  async analyzeGitStatus(projectPath) {
    const git = {
      isRepo: true,
      branch: 'unknown',
      status: 'unknown',
      commits: 0,
      lastCommit: null,
      remote: null,
      issues: []
    };

    try {
      const originalCwd = process.cwd();
      process.chdir(projectPath);

      // Get current branch
      try {
        git.branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
      } catch (error) {
        git.issues.push('Cannot determine current branch');
      }

      // Get status
      try {
        const status = execSync('git status --porcelain', { encoding: 'utf8' });
        git.status = status.trim() === '' ? 'clean' : 'dirty';
        git.uncommittedChanges = status.trim().split('\n').filter(line => line.trim()).length;
      } catch (error) {
        git.issues.push('Cannot get git status');
      }

      // Get remote information
      try {
        git.remote = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
      } catch (error) {
        git.issues.push('No remote origin configured');
      }

      // Get last commit
      try {
        const lastCommit = execSync('git log -1 --format="%H|%s|%an|%ad" --date=iso', { encoding: 'utf8' }).trim();
        const [hash, message, author, date] = lastCommit.split('|');
        git.lastCommit = {
          hash: hash.substring(0, 7),
          message,
          author,
          date: new Date(date)
        };
      } catch (error) {
        git.issues.push('Cannot get last commit information');
      }

      // Count commits
      try {
        git.commits = parseInt(execSync('git rev-list --count HEAD', { encoding: 'utf8' }).trim());
      } catch (error) {
        git.commits = 0;
      }

      process.chdir(originalCwd);
    } catch (error) {
      git.isRepo = false;
      git.issues.push(`Git analysis failed: ${error.message}`);
    }

    return git;
  }

  /**
   * Analyze package.json for Node.js projects
   * @param {string} packageJsonPath - Path to package.json
   * @returns {Object} Package metadata
   */
  analyzePackageJson(packageJsonPath) {
    try {
      const content = fs.readFileSync(packageJsonPath, 'utf8');
      const pkg = JSON.parse(content);
      
      return {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
        scripts: Object.keys(pkg.scripts || {}),
        dependencies: Object.keys(pkg.dependencies || {}),
        devDependencies: Object.keys(pkg.devDependencies || {}),
        framework: this.detectFramework(pkg)
      };
    } catch (error) {
      return { error: `Cannot parse package.json: ${error.message}` };
    }
  }

  /**
   * Detect project framework from package.json
   * @param {Object} pkg - Parsed package.json
   * @returns {string} Detected framework
   */
  detectFramework(pkg) {
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    
    if (deps.next) return 'Next.js';
    if (deps.react) return 'React';
    if (deps.vue) return 'Vue.js';
    if (deps.angular) return 'Angular';
    if (deps.svelte) return 'Svelte';
    if (deps.express) return 'Express.js';
    
    return 'Unknown';
  }

  /**
   * Analyze project dependencies
   * @param {string} projectPath - Path to the project
   * @returns {Object} Dependency information
   */
  analyzeDependencies(projectPath) {
    const deps = {
      installed: false,
      lockFile: null,
      issues: []
    };

    // Check for node_modules
    const nodeModulesPath = path.join(projectPath, 'node_modules');
    deps.installed = fs.existsSync(nodeModulesPath);

    // Check for lock files
    const lockFiles = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'];
    for (const lockFile of lockFiles) {
      if (fs.existsSync(path.join(projectPath, lockFile))) {
        deps.lockFile = lockFile;
        break;
      }
    }

    if (!deps.installed) {
      deps.issues.push('Dependencies not installed (missing node_modules)');
    }

    if (!deps.lockFile) {
      deps.issues.push('No lock file found');
    }

    return deps;
  }

  /**
   * Analyze build status
   * @param {string} projectPath - Path to the project
   * @returns {Object} Build status information
   */
  async analyzeBuildStatus(projectPath) {
    const build = {
      canBuild: false,
      lastBuild: null,
      issues: []
    };

    try {
      // Check if build directory exists
      const buildDirs = ['.next', 'build', 'dist'];
      for (const dir of buildDirs) {
        const buildPath = path.join(projectPath, dir);
        if (fs.existsSync(buildPath)) {
          build.lastBuild = fs.statSync(buildPath).mtime;
          break;
        }
      }

      // TODO: Could try running build command, but that might be too expensive
      build.canBuild = true; // Assume it can build unless we detect issues

    } catch (error) {
      build.issues.push(`Build analysis failed: ${error.message}`);
    }

    return build;
  }

  /**
   * Determine project status based on analysis
   * @param {Object} analysis - Project analysis data
   * @returns {string} Project status
   */
  determineProjectStatus(analysis) {
    if (analysis.git.issues.length > 0 || analysis.dependencies.issues.length > 0) {
      return 'issues';
    }
    
    if (analysis.dependencies.installed && analysis.git.status === 'clean') {
      return 'active';
    }
    
    if (analysis.git.lastCommit && this.isRecentActivity(analysis.git.lastCommit.date)) {
      return 'active';
    }
    
    return 'idle';
  }

  /**
   * Determine specification status
   * @param {Object} analysis - Specification analysis data
   * @returns {string} Specification status
   */
  determineSpecificationStatus(analysis) {
    if (analysis.health.issues.length > 0) {
      return 'issues';
    }
    
    if (analysis.phase === 'implementation' || analysis.phase === 'testing') {
      return 'active';
    }
    
    if (analysis.progress > 80) {
      return 'near-complete';
    }
    
    if (analysis.progress > 0) {
      return 'in-progress';
    }
    
    return 'idle';
  }

  /**
   * Calculate project health score
   * @param {Object} analysis - Project analysis data
   * @returns {Object} Health score and issues
   */
  calculateProjectHealth(analysis) {
    let score = 100;
    const issues = [];

    // Git health (25 points)
    if (analysis.git.status !== 'clean') {
      score -= 5;
      issues.push('Uncommitted changes detected');
    }
    if (!analysis.git.remote) {
      score -= 10;
      issues.push('No remote repository configured');
    }
    if (analysis.git.issues.length > 0) {
      score -= 10;
      issues.push(...analysis.git.issues);
    }

    // Dependencies health (25 points)
    if (!analysis.dependencies.installed) {
      score -= 15;
      issues.push('Dependencies not installed');
    }
    if (!analysis.dependencies.lockFile) {
      score -= 10;
      issues.push('No package lock file');
    }

    // Build health (25 points)
    if (analysis.build.issues.length > 0) {
      score -= 15;
      issues.push(...analysis.build.issues);
    }

    // Activity health (25 points)
    if (!analysis.lastActivity || !this.isRecentActivity(analysis.lastActivity)) {
      score -= 10;
      issues.push('No recent activity');
    }

    return {
      score: Math.max(0, score),
      issues: issues
    };
  }

  /**
   * Calculate specification health score
   * @param {Object} analysis - Specification analysis data
   * @returns {Object} Health score and issues
   */
  calculateSpecificationHealth(analysis) {
    let score = 100;
    const issues = [];

    // Required files (40 points)
    const requiredFiles = ['requirements.md', 'design.md', 'tasks.md'];
    for (const file of requiredFiles) {
      if (!analysis.files[file] || !analysis.files[file].exists) {
        score -= 13;
        issues.push(`Missing required file: ${file}`);
      }
    }

    // Progress health (30 points)
    if (analysis.progress === 0) {
      score -= 20;
      issues.push('No progress recorded');
    } else if (analysis.progress < 25) {
      score -= 10;
      issues.push('Low progress (< 25%)');
    }

    // Task completion (20 points)
    if (analysis.tasks.total > 0) {
      const completionRate = analysis.tasks.completed / analysis.tasks.total;
      if (completionRate < 0.5) {
        score -= 15;
        issues.push('Low task completion rate');
      }
    } else {
      score -= 10;
      issues.push('No tasks defined');
    }

    // Recent activity (10 points)
    if (!analysis.lastUpdate || !this.isRecentActivity(analysis.lastUpdate)) {
      score -= 10;
      issues.push('No recent updates');
    }

    return {
      score: Math.max(0, score),
      issues: issues
    };
  }

  /**
   * Check if date represents recent activity (within last 7 days)
   * @param {Date} date - Date to check
   * @returns {boolean} True if recent
   */
  isRecentActivity(date) {
    if (!date) return false;
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(date) > weekAgo;
  }

  /**
   * Count active projects
   * @param {Object} results - Scan results
   * @returns {number} Number of active projects
   */
  countActiveProjects(results) {
    let count = 0;
    count += results.submodules.filter(p => p.status === 'active').length;
    count += results.specifications.filter(s => s.status === 'active').length;
    return count;
  }

  /**
   * Count projects with issues
   * @param {Object} results - Scan results
   * @returns {number} Number of projects with issues
   */
  countProjectsWithIssues(results) {
    let count = 0;
    count += results.submodules.filter(p => p.status === 'issues' || p.health.issues.length > 0).length;
    count += results.specifications.filter(s => s.status === 'issues' || s.health.issues.length > 0).length;
    return count;
  }

  /**
   * Calculate overall health score
   * @param {Object} results - Scan results
   * @returns {Object} Overall health information
   */
  calculateOverallHealth(results) {
    const allProjects = [...results.submodules, ...results.specifications];
    
    if (allProjects.length === 0) {
      return { overall: 100, issues: [] };
    }

    const totalScore = allProjects.reduce((sum, project) => sum + project.health.score, 0);
    const averageScore = Math.round(totalScore / allProjects.length);

    const allIssues = allProjects.reduce((issues, project) => {
      return issues.concat(project.health.issues.map(issue => ({
        project: project.name,
        issue: issue
      })));
    }, []);

    return {
      overall: averageScore,
      issues: allIssues
    };
  }

  /**
   * Get last activity date for a project
   * @param {Object} analysis - Project analysis
   * @returns {Date|null} Last activity date
   */
  getLastActivity(analysis) {
    if (analysis.git.lastCommit) {
      return analysis.git.lastCommit.date;
    }
    return null;
  }

  /**
   * Get last update date for a specification
   * @param {Object} analysis - Specification analysis
   * @returns {Date|null} Last update date
   */
  getSpecificationLastUpdate(analysis) {
    let lastUpdate = null;
    
    for (const file of Object.values(analysis.files)) {
      if (file.exists && file.lastModified) {
        if (!lastUpdate || file.lastModified > lastUpdate) {
          lastUpdate = file.lastModified;
        }
      }
    }
    
    return lastUpdate;
  }

  /**
   * Analyze tasks.md file
   * @param {string} tasksPath - Path to tasks.md
   * @returns {Object} Task analysis
   */
  analyzeTasksFile(tasksPath) {
    try {
      const content = fs.readFileSync(tasksPath, 'utf8');
      const lines = content.split('\n');
      
      let completed = 0;
      let total = 0;
      
      for (const line of lines) {
        const taskMatch = line.match(/^- \[([ x])\]/);
        if (taskMatch) {
          total++;
          if (taskMatch[1] === 'x') {
            completed++;
          }
        }
      }
      
      return { completed, total };
    } catch (error) {
      return { completed: 0, total: 0, error: error.message };
    }
  }

  /**
   * Calculate phase progress from kiro_status.json
   * @param {Object} status - Parsed kiro status
   * @returns {number} Progress percentage
   */
  calculatePhaseProgress(status) {
    // This is a simplified calculation
    // In practice, you'd want more sophisticated progress tracking
    const phases = ['requirements', 'design', 'implementation', 'testing', 'deployment'];
    const currentPhaseIndex = phases.indexOf(status.current_phase);
    
    if (currentPhaseIndex === -1) return 0;
    
    return Math.round(((currentPhaseIndex + 1) / phases.length) * 100);
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProjectScanner;
}

// CLI usage
if (require.main === module) {
  const scanner = new ProjectScanner();
  
  scanner.scanAllProjects()
    .then(results => {
      console.log('\n📊 CC-Deck Project Scan Results:');
      console.log(JSON.stringify(results, null, 2));
    })
    .catch(error => {
      console.error('❌ Scan failed:', error);
      process.exit(1);
    });
}