# Projects Documentation Structure

This directory organizes all project-specific documentation in a standardized structure.

## Directory Structure

```
docs/projects/
├── README.md                           # This file - structure overview
├── {project-name}/                     # Individual project documentation
│   ├── README.md                       # Project overview and quick start
│   ├── architecture/                   # System architecture and design
│   │   ├── system-design.md
│   │   ├── implementation-strategy.md
│   │   ├── technology-stack.md
│   │   └── performance-strategy.md
│   ├── api/                           # API documentation and references
│   │   ├── endpoints.md
│   │   ├── authentication.md
│   │   └── examples.md
│   ├── guides/                        # User and developer guides
│   │   ├── getting-started.md
│   │   ├── development-setup.md
│   │   ├── deployment.md
│   │   └── troubleshooting.md
│   ├── testing/                       # Testing documentation
│   │   ├── strategy.md
│   │   ├── coverage-reports.md
│   │   └── e2e-testing.md
│   ├── implementation/                # Implementation details
│   │   ├── phase-reports.md
│   │   ├── component-integration.md
│   │   └── performance-optimization.md
│   └── meta/                          # Project metadata
│       ├── changelog.md
│       ├── roadmap.md
│       └── decisions.md
└── templates/                         # Documentation templates
    ├── project-readme-template.md
    ├── architecture-template.md
    └── guide-template.md
```

## File Naming Conventions

- Use lowercase letters and hyphens for file names
- Include project name prefix for shared resources
- Use descriptive, specific names (e.g., `performance-optimization.md` not `performance.md`)

## Content Standards

- Each directory must contain a README.md explaining its purpose
- All documentation should follow markdown best practices
- Include table of contents for documents >500 words
- Use relative links for internal references
- Include last updated date and version information
