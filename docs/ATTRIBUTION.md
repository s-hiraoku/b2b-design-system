# Attribution and Acknowledgments

## Core Methodologies

### Kiro SDD (Specification-Driven Development)
This project's SDD implementation is heavily based on **[gotalab/claude-code-spec](https://github.com/gotalab/claude-code-spec)**.

**What we've adopted:**
- `.kiro/` directory structure and organization
- Phase-based development workflow (requirements → design → tasks → implementation)
- Specification file formats and naming conventions
- Task management and progress tracking approaches
- Approval and review processes

**Our additions:**
- Claude Code integration with custom slash commands
- Multi-agent orchestration system (43 specialized agents)
- MCP service integrations (DeepWiki, Context7, Serena, Playwright)
- AI-driven approval workflows
- Automated state synchronization

**Note**: We are in the process of contacting the original author to ensure proper attribution and usage compliance.

### Code Similarity Analysis
The similarity-refactoring functionality uses **[mizchi/similarity](https://github.com/mizchi/similarity)**.

**Usage:**
- Installed via `cargo install similarity-ts`
- Called as command-line tool by AI agents
- Used for detecting duplicate patterns and refactoring opportunities

**License**: MIT License (see LICENSES.md for full text)

### TDD Methodology
Test-Driven Development implementation follows **[t-wada](https://github.com/t-wada)**'s rigorous TDD practices.

**Key principles adopted:**
- Strict Red-Green-Refactor cycle
- Test-first development
- No shortcuts or compromises
- Tests as design drivers

## Technology Stack

### Claude Code
- Official Anthropic CLI for Claude
- Sub-agent specifications and patterns
- MCP (Model Context Protocol) integration

### MCP Services
- **DeepWiki**: GitHub repository documentation analysis
- **Context7**: Library documentation retrieval
- **Serena**: Semantic code analysis and refactoring
- **Playwright**: Browser automation for E2E testing

## Community Contributions

We acknowledge the broader open-source community that makes this project possible:

1. **Anthropic** - For Claude Code and comprehensive documentation
2. **gotalab** - For pioneering the SDD approach in Claude Code context
3. **mizchi** - For the similarity analysis tools
4. **t-wada** - For TDD methodology and best practices

## Future Collaboration

We are committed to:
- Proper attribution of all referenced work
- Contributing improvements back to original projects
- Maintaining transparent communication with original authors
- Building collaborative relationships in the Claude Code ecosystem

## Contact

If you have questions about attribution or would like to discuss collaboration:
- Create an issue in our GitHub repository
- Contact project maintainers directly

---

Last updated: 2025-08-06