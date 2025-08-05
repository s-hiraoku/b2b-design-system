# Archived Custom Slash Commands

This directory contains the original custom slash commands that have been **consolidated into the unified `/orchestrator` command** for improved user experience and simplified workflow management.

## Why These Commands Were Archived

### Architecture Evolution
- **From**: Multiple specialized slash commands requiring users to know which command to use
- **To**: Single intelligent `/orchestrator` command that automatically detects project state

### Benefits of Consolidation
- **Simplified UX**: Users only need to remember `/orchestrator`
- **Intelligent Delegation**: Automatic state detection and appropriate sub-agent selection
- **Workflow Continuity**: Seamless progression between development phases
- **Reduced Cognitive Load**: No need to manually determine the next step

## Current Usage Pattern

Instead of:
```bash
/spec-driven "new feature"
/coding "implement feature"
/refactoring
/acceptance
/pr-create
```

Now simply:
```bash
/orchestrator
# or
/orchestrator "new feature description"
```

## Purpose of Archived Files

These files serve as:
- **Reference documentation** for sub-agent implementations
- **Detailed specifications** for each workflow phase
- **Historical context** for the evolution of the system

## Files in this Directory

- `acceptance.md` - Human approval and feedback workflow specifications
- `check-issues.md` - Issue validation and approval specifications
- `coding.md` - Comprehensive development workflow specifications
- `create-issues.md` - GitHub issue creation specifications
- `e2e-test.md` - End-to-end testing specifications
- `integration-test.md` - Integration testing specifications
- `pr-create.md` - Pull request creation specifications
- `pr-merge.md` - Pull request merge workflow specifications
- `refactoring.md` - Code refactoring specifications
- `spec-driven.md` - Kiro spec-driven development specifications

## Note

These commands are no longer directly accessible as slash commands. All functionality is available through `/orchestrator`.