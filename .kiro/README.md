# Kiro SDD Project Structure

This directory contains all Kiro Specification-Driven Development files and documents.

## Directory Structure

- `specs/` - Feature specifications and implementation plans
  - `{feature-name}/` - Individual feature specification directory
    - `requirements.md` - Feature requirements and user stories
    - `design.md` - Technical design and architecture
    - `tasks.md` - Implementation task breakdown
    - `kiro_status.json` - Phase tracking and status

- `steering/` - Project steering documents
  - `product.md` - Product overview and features
  - `tech.md` - Technology stack and architecture
  - `structure.md` - Project structure and guidelines

## Usage

All Kiro SDD workflows automatically create and manage files in this directory structure.

Use the `/orchestrator` command to work with specifications:

```bash
# Initialize new feature specification
/orchestrator "kiro:spec-init feature-name"

# Continue existing specification workflow
/orchestrator
```