---
description: Dynamic MCP agent generation and development environment setup for project-specific optimization
argument-hint: [optional feature description]
allowed-tools: Task, Read, Write, Edit, Bash, Glob, Grep, LS
---

# Development Environment Setup Command

Intelligent development environment setup workflow that analyzes Kiro SDD specifications and generates a unified enhanced-implementation-agent with integrated MCP capabilities to optimize the development process.

## Initial Setup: Current Date Information

**CRITICAL**: Always call the following agent first to execute the command correctly.

```bash
# First action: Get current date information
Task(subagent_type="date-utility", description="Get current date information", prompt="Please provide current date and time information for use in this dev-env-setup workflow session, including search-appropriate year formatting.")

# Second action: User interaction guidelines reminder
Task(subagent_type="user-interaction-reminder", description="User interaction guidelines", prompt="Provide critical reminders about proper user interaction protocols for this dev-env-setup workflow session.")
```

## 🚀 DEV-ENV-SETUP WORKFLOW EXECUTION

This command executes the complete 6-phase development environment setup workflow as defined in `.cc-deck/config/workflows/base/dev-env-setup.yaml`.

### Phase 1: Specification Analysis

Analyzing Kiro SDD specifications to extract technology stack and development requirements...

```bash
Task(subagent_type="spec-analyzer", description="Analyze Kiro SDD specifications", prompt="Analyze the Kiro SDD specifications in .kiro/specs/ directory to extract:

1. Project identification and technology stack analysis
2. Integration opportunities with MCP services
3. Development context and requirements
4. Framework-specific optimization possibilities

Focus on:
- Primary technology stack (Next.js, React, TypeScript, etc.)
- Build tools and development dependencies
- Deployment and hosting requirements
- Content management and data flow needs
- Performance and optimization requirements

Output project_analysis, technology_stack, integration_opportunities, and development_context for next phase.")
```

### Phase 2: MCP Recommendation Research

Researching and recommending optimal MCP agents based on technology stack analysis...

```bash
Task(subagent_type="mcp-recommender", description="Research optimal MCP integrations", prompt="Based on the project analysis from spec-analyzer, research and recommend optimal MCP-based SubAgents:

Research Requirements:
- Use web search to find latest MCP tools and integrations
- Analyze successful project patterns using DeepWiki MCP
- Validate tool documentation and compatibility using Context7 MCP
- Focus on project-specific technology stack needs

Recommendation Criteria:
- Relevance to identified technology stack
- Development efficiency impact
- Resource usage considerations
- Integration complexity assessment
- Community adoption and support

Provide:
1. Prioritized list of recommended MCP agents (3-8 recommendations)
2. Detailed rationale for each recommendation
3. Implementation complexity assessment
4. Expected benefits and ROI analysis
5. Research confidence level and sources

Output: recommended_mcp_agents, usage_rationale, research_summary for user approval.")
```

### Phase 3: User Approval Process

```bash
# Present recommendations for user approval
echo "🎯 MCP Agent Recommendations - Approval Required"
echo ""
echo "Based on comprehensive research and analysis, the following MCP agents are recommended:"
echo ""
# (Recommendations will be displayed by mcp-recommender output)
echo ""
echo "❓ Agent Generation Approval"
echo ""
echo "Please select your preference:"
echo "[A] approved - Generate all recommended agents"
echo "[M] approved_with_modifications - Select specific agents"
echo "[R] rejected - Skip agent generation, use standard workflow"
echo "[D] deferred - Save state and decide later"
echo ""
echo "Your choice:"
```

### Phase 4: Enhanced Implementation Agent Generation

Based on user approval, generating unified enhanced-implementation-agent...

```bash
Task(subagent_type="agent-generator", description="Generate enhanced-implementation-agent", prompt="Generate the unified enhanced-implementation-agent with the following requirements:

Input Context:
- Use all approved MCP tools from user selection
- Apply project analysis and technology stack information
- Create single unified agent integrating all MCP capabilities

Generation Requirements:
1. **CRITICAL FILE PATH**: Create enhanced-implementation-agent.md in .cc-deck/runtime/projects/{project_id}/agents/
2. **NEVER use .claude/agents/ directory**
3. **Unified MCP Integration**: Include all approved MCP tools in single agent
4. **Proper YAML frontmatter**: name: enhanced-implementation-agent, tools with all MCPs
5. **Fallback Mechanisms**: Graceful degradation when MCP tools unavailable
6. **Project-specific customization**: Align with actual technology stack

Agent Design:
- Single file: enhanced-implementation-agent.md
- Integrated MCP capabilities: Context7, DeepWiki, Serena, and approved tools
- Performance optimization: Efficient MCP usage patterns
- Error handling: Comprehensive fallback strategies

Directory Structure:
- Target: .claude/agents/coding/dynamic/{project_id}/enhanced-implementation-agent.md
- Create directory structure if needed
- Validate file creation in correct location

Output: enhanced_implementation_agent, mcp_integration_summary, generation_results.")
```

### Phase 5: MCP Setup and Configuration

Configuring and authenticating approved MCP tools for runtime usage...

```bash
Task(subagent_type="mcp-setup-manager", description="Configure MCP tools", prompt="Configure and authenticate approved MCP tools for runtime usage:

Setup Tasks:
1. **MCP Server Configuration**:
   - Parse approved MCP tool list from user approval
   - Configure each MCP server with appropriate settings
   - Set up authentication credentials where required
   - Test connectivity and basic functionality

2. **Authentication Management**:
   - Handle OAuth 2.0 flows for MCP servers requiring authentication
   - Store credentials securely using appropriate methods
   - Validate authentication tokens and refresh mechanisms
   - Document authentication status for each tool

3. **Setup Validation**:
   - Test each MCP server connection
   - Verify essential functions are working
   - Measure response times and reliability
   - Create fallback strategies for failed setups

4. **Setup Completion Documentation**:
   - Generate mcp-setup-complete.json in .cc-deck/runtime/projects/{project_id}/config/
   - Document successful configurations and any failures
   - Provide troubleshooting guidance for common issues

Output: mcp_setup_complete, authentication_status, configuration_results, fallback_strategies.")
```

### Phase 6: Human Approval (Final)

```bash
echo "✅ DEV-ENV-SETUP Complete!"
echo ""
echo "📋 Setup Summary:"
echo "- Technology stack analysis: ✅ Complete"
echo "- Enhanced implementation agent: ✅ Generated"
echo "- MCP setup and configuration: ✅ Complete"
echo "- Authentication status: ✅ Configured"
echo "- Development environment: ✅ Ready"
echo ""
echo "🎯 Enhanced Development Environment:"
echo "- Single unified enhanced-implementation-agent created"
echo "- All approved MCP tools configured and authenticated"
echo "- Fallback strategies in place for MCP failures"
echo "- Ready for enhanced CODING workflow execution"
echo ""
echo "❓ Final Approval"
echo ""
echo "Please review the enhanced development environment:"
echo "[Y] approved - Proceed to enhanced CODING workflow"
echo "[R] review - Review and modify configuration"
echo "[S] save - Save setup and continue later"
echo ""
echo "Your choice:"
```

## Error Handling

```bash
# Handle workflow failures gracefully
if [[ $? -ne 0 ]]; then
    echo "⚠️ Dev-env-setup encountered an error"
    echo "Falling back to standard Coding workflow without enhancements"
    echo "Error details have been logged for review"
fi
```

## Success Criteria

- Enhanced implementation agent generated successfully
- MCP tools configured and authenticated
- Setup completion status documented
- Fallback strategies established for MCP failures
- User approval obtained for final setup
- Enhanced Coding workflow ready for execution

## Next Steps

Upon successful completion:
1. Enhanced Coding workflow is ready with unified MCP-enhanced agent
2. Smart Context contains all setup information
3. Development environment optimized with MCP capabilities
4. Ready to begin TDD-driven implementation phase with enhanced tools

---

**This command bridges the gap between Kiro SDD completion and TDD-driven implementation by creating a customized development environment tailored to your project's specific needs.**