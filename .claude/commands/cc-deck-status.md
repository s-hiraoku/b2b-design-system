---
description: "Interactive CC-Deck project management - list, edit, and delete projects"
argument-hint: "[action] [project-name]"
allowed-tools: ["Bash", "Write", "Read", "Edit", "LS", "Glob", "Grep"]
model: "sonnet"
---

# CC-Deck Project Management Dashboard 📊

Welcome to the CC-Deck Project Management interface! This command helps you manage all projects within the CC-Deck platform.

## Main Dashboard

Let me scan your CC-Deck environment and show you the current project status...

### Scanning Projects

🔍 **Scanning for projects...**

Looking for projects in:
- `projects/` directory (submodules)
- `.kiro/specs/` directory (specifications)

### Project Status Overview

I'll display a comprehensive status table showing:

| Project | Type | Status | Last Activity | Git Status | Health |
|---------|------|--------|---------------|------------|--------|
| ... | ... | ... | ... | ... | ... |

**Status Legend:**
- 🟢 **Active** - Project is running and healthy
- 🟡 **Idle** - Project exists but not currently active
- 🔴 **Issues** - Project has problems or errors
- ⚪ **Unknown** - Status cannot be determined
- 🔵 **In Development** - Project is being actively developed

**Type Legend:**
- 📱 **Submodule** - Git submodule project
- 📋 **Specification** - Kiro SDD specification
- 🔧 **Configuration** - Configuration or utility project

## Interactive Menu

Please select an action:

**1. 📊 List Projects** - Show detailed project information
**2. ✏️ Edit Project** - Modify project settings or configuration  
**3. 🗑️ Delete Project** - Remove a project from CC-Deck
**4. 🔄 Refresh Status** - Re-scan and update project status
**5. 📁 Open Project** - Navigate to project directory
**6. 🚀 Quick Actions** - Common project operations
**7. ❓ Help** - Show detailed help information
**8. 🚪 Exit** - Exit the management interface

**Enter your choice (1-8):** _{waiting for input}_

---

## Action: List Projects (Option 1)

### Detailed Project Information

For each project, I'll show:

#### 📱 Submodule Projects
```
Project: liquid-glass-tech-blog
├── Type: Next.js 15 Application
├── Status: 🟢 Active
├── Location: projects/liquid-glass-tech-blog/
├── Repository: https://github.com/s-hiraoku/liquid-glass-tech-blog.git
├── Last Commit: 2f9d625 - Add comprehensive testing documentation
├── Branch: main (up to date)
├── Dependencies: ✅ Installed (node_modules exists)
├── Dev Server: ❌ Not running
├── Build Status: ✅ Can build successfully
├── Tests: ✅ All tests passing
└── Health Score: 95/100
```

#### 📋 Specification Projects
```
Project: fashionable-girls-blog
├── Type: Kiro SDD Specification
├── Status: 🟡 Specification Phase
├── Location: .kiro/specs/fashionable-girls-blog/
├── Current Phase: Implementation
├── Progress: 75% (6/8 phases complete)
├── Last Update: 2 days ago
├── Tasks: 12 completed, 3 remaining
└── Health Score: 88/100
```

**Filter Options:**
- Show only active projects
- Show only submodules
- Show only specifications
- Show projects with issues
- Sort by last activity
- Sort by health score

---

## Action: Edit Project (Option 2)

### Edit Project Configuration

**Available edit actions:**

#### For Submodule Projects:
1. **Update Remote URL** - Change GitHub repository URL
2. **Sync Submodule** - Update to latest remote commits
3. **Change Branch** - Switch to different branch
4. **Update Dependencies** - Run npm/yarn install
5. **Configure Environment** - Edit .env files
6. **Update Package.json** - Modify project metadata
7. **Rebuild Project** - Clean and rebuild
8. **Reset to Clean State** - Discard local changes

#### For Specification Projects:
1. **Edit Requirements** - Modify requirements.md
2. **Update Design** - Edit design.md  
3. **Modify Tasks** - Edit tasks.md
4. **Change Phase** - Move to different phase
5. **Update Metadata** - Edit project metadata
6. **Reset Progress** - Reset phase progress
7. **Archive Specification** - Move to archived state

### Edit Workflow Example:

```
Selected Project: liquid-glass-tech-blog
Current Configuration:
├── Remote: https://github.com/s-hiraoku/liquid-glass-tech-blog.git
├── Branch: main
├── Dependencies: Up to date
└── Environment: Development

What would you like to edit?
1. Remote URL
2. Dependencies
3. Environment Variables
4. Project Settings

Enter choice: _
```

---

## Action: Delete Project (Option 3)

### Project Deletion Options

**⚠️ DANGER ZONE ⚠️**

Select deletion type:

#### 1. **Soft Delete** (Recommended)
- Remove from CC-Deck tracking
- Keep all files intact
- Can be easily restored
- Archive project information

#### 2. **Remove Submodule**
- Remove Git submodule configuration
- Keep project files locally
- Remove from .gitmodules
- Preserve project history

#### 3. **Complete Removal**
- Delete all project files
- Remove from Git tracking
- Remove submodule configuration
- **⚠️ IRREVERSIBLE ⚠️**

#### 4. **Archive Project**
- Move to archived state
- Compress project files
- Keep metadata for reference
- Can be restored later

### Deletion Safety Checks:

Before any deletion, I'll verify:
- ✅ Project has recent backups
- ✅ No uncommitted changes
- ✅ Remote repository is up to date
- ✅ No active development processes
- ✅ User confirmation with project name

### Deletion Workflow:

```
⚠️ You are about to delete: project-name
Type: Submodule Project
Location: projects/project-name/
Size: 150 MB
Last Activity: 2 hours ago

Safety Checks:
✅ Remote is up to date
❌ Uncommitted changes detected
❌ Development server is running

Recommended Action: 
1. Commit changes first
2. Stop development server
3. Try deletion again

Proceed anyway? (type 'DELETE project-name' to confirm): _
```

---

## Action: Quick Actions (Option 6)

### Common Project Operations

#### Development Actions:
1. **🚀 Start Dev Server** - Launch development server
2. **🛑 Stop Dev Server** - Stop running development server
3. **📦 Install Dependencies** - Run npm/yarn install
4. **🔨 Build Project** - Run production build
5. **🧪 Run Tests** - Execute test suite
6. **📊 Check Health** - Run comprehensive health check

#### Git Actions:
7. **📥 Pull Latest** - Pull latest changes from remote
8. **📤 Push Changes** - Push local changes to remote
9. **🔄 Sync Submodule** - Update submodule to latest
10. **🌿 Check Branches** - Show available branches
11. **📋 Show Status** - Show git status
12. **📜 Show Log** - Show recent commits

#### Maintenance Actions:
13. **🧹 Clean Build** - Clean build artifacts
14. **🔧 Fix Dependencies** - Resolve dependency issues
15. **📈 Generate Report** - Create project health report
16. **💾 Backup Project** - Create project backup
17. **🏥 Health Check** - Run diagnostic checks
18. **📝 Update Documentation** - Update README and docs

### Quick Action Example:

```
Quick Actions for: liquid-glass-tech-blog

Select action:
1. 🚀 Start Dev Server
2. 🧪 Run Tests  
3. 📊 Check Health
4. 📥 Pull Latest

Enter choice: 1

🚀 Starting development server...
> cd projects/liquid-glass-tech-blog
> npm run dev

✅ Development server started successfully!
🌐 Available at: http://localhost:3000
📝 Logs: Use 'Ctrl+C' to stop

Continue with other actions? (y/n): _
```

---

## Health Check System

### Project Health Indicators

I evaluate project health based on:

#### Git Health (25 points)
- ✅ Clean working directory (5 pts)
- ✅ Up to date with remote (5 pts)
- ✅ Recent commits (5 pts)
- ✅ Proper branching (5 pts)
- ✅ No conflicts (5 pts)

#### Build Health (25 points)
- ✅ Dependencies installed (5 pts)
- ✅ No build errors (10 pts)
- ✅ Tests passing (10 pts)

#### Configuration Health (25 points)
- ✅ Valid package.json (5 pts)
- ✅ Proper .gitignore (5 pts)
- ✅ Environment configured (5 pts)
- ✅ Documentation present (5 pts)
- ✅ No security issues (5 pts)

#### CC-Deck Integration (25 points)
- ✅ Proper submodule config (10 pts)
- ✅ Kiro spec alignment (5 pts)
- ✅ Documentation updated (5 pts)
- ✅ Follows conventions (5 pts)

### Health Score Interpretation:
- **90-100**: 🟢 Excellent - Project is in perfect condition
- **70-89**: 🟡 Good - Minor issues that should be addressed
- **50-69**: 🟠 Fair - Several issues need attention
- **30-49**: 🔴 Poor - Significant problems require immediate action
- **0-29**: ❌ Critical - Project may be broken or corrupted

---

## Error Handling and Recovery

### Common Issues and Solutions:

#### 🔴 Submodule Issues
- **Detached HEAD**: Checkout proper branch
- **Merge Conflicts**: Interactive conflict resolution
- **Outdated Submodule**: Update to latest commits
- **Missing Remote**: Reconfigure remote URL

#### 🔴 Dependency Issues  
- **Missing node_modules**: Run fresh install
- **Version Conflicts**: Update or downgrade packages
- **Lock File Issues**: Delete and regenerate lock files
- **Security Vulnerabilities**: Run audit and fix

#### 🔴 Build Issues
- **TypeScript Errors**: Show and help fix type issues
- **Missing Files**: Identify and restore missing files
- **Configuration Errors**: Validate and fix config files
- **Environment Issues**: Check and fix environment variables

### Auto-Recovery Features:

When issues are detected, I can automatically:
1. **Backup current state** before making changes
2. **Suggest fix actions** with explanations
3. **Execute fixes** with user confirmation
4. **Verify fixes** worked correctly
5. **Rollback** if fixes cause new problems

---

## Integration with CC-Deck Workflow

### Workflow Integration Points:

#### With Kiro SDD:
- Show specification phase progress
- Highlight task completion status
- Display acceptance criteria status
- Integration with `/orchestrator` command

#### With Submodule Management:
- Coordinate with submodule operations
- Sync with parent project changes
- Monitor submodule health
- Integration with `/submodule-setup` command

#### With Development Tools:
- Monitor development server status
- Track build and test results
- Integration with IDE and tools
- Real-time status updates

### Command Relationships:

```
/cc-deck-status ←→ /orchestrator
     ↕                ↕
/submodule-setup ←→ Project Specs
     ↕                ↕
   Projects ←→ Documentation
```

This creates a unified ecosystem where all CC-Deck tools work together seamlessly.

---

**Ready to manage your CC-Deck projects!** 🚀

Select an option from the menu above to get started.