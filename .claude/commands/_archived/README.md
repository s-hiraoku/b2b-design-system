# Archived Custom Slash Commands

This directory contains the original custom slash commands that have been consolidated into the unified `/orchestrator` command.

## Purpose

These files serve as:
- **Reference documentation** for sub-agent implementations
- **Detailed specifications** for each workflow phase
- **Historical context** for the evolution of the system

## Architecture Decision

All user interactions now go through the single `/orchestrator` command, which:
- Automatically detects project state
- Determines the appropriate next phase
- Delegates to the correct sub-agent
- Maintains workflow continuity

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