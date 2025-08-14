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

This command executes the complete 7-phase development environment setup workflow as defined in `.cc-deck/config/workflows/base/dev-env-setup.yaml`.

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
1. **CRITICAL FILE PATH**: Create {project_id}-enhanced-implementation-agent.md in .claude/agents/coding/dynamic/
2. **Claude Code System Agent**: Use .claude/agents/ directory for system recognition with unique project naming
3. **Unified MCP Integration**: Include all approved MCP tools in single agent
4. **Proper YAML frontmatter**: name: {project_id}-enhanced-implementation-agent, tools with all MCPs
5. **Fallback Mechanisms**: Graceful degradation when MCP tools unavailable
6. **Project-specific customization**: Align with actual technology stack

Agent Design:
- Single file: {project_id}-enhanced-implementation-agent.md
- Integrated MCP capabilities: Context7, DeepWiki, Serena, and approved tools
- Performance optimization: Efficient MCP usage patterns
- Error handling: Comprehensive fallback strategies
- Claude Code system compatibility: Full agent recognition and invocation

Directory Structure:
- Target: .claude/agents/coding/dynamic/{project_id}-enhanced-implementation-agent.md
- Create directory structure if needed: mkdir -p .claude/agents/coding/dynamic/
- Validate file creation in correct location for Claude Code recognition

Output: enhanced_implementation_agent, mcp_integration_summary, generation_results.")
```

### Phase 4.5: Workflow Integration

Creating merged workflow configuration with enhanced agents...

```bash
Task(subagent_type="workflow-integrator", description="Create merged workflow configuration", prompt="Integrate the generated {project_id}-enhanced-implementation-agent into the Coding workflow:

Integration Requirements:
1. **Base Workflow Loading**:
   - Load base coding.yaml from .cc-deck/config/workflows/base/
   - Extract phases, agents, and configurations
   - Identify integration points for enhanced agents

2. **Extension Configuration Creation**:
   - Create coding-extension.yaml with project-specific enhancements
   - Define enhanced agent integration points and MCP tool configurations
   - Configure fallback strategies for MCP unavailability

3. **Workflow Merging**:
   - Merge base coding.yaml with project extensions
   - Update agent selection logic to prioritize enhanced agents
   - Preserve all base workflow functionality with enhancements
   - Generate final coding-merged.yaml configuration

4. **File Generation**:
   - Extension config: .cc-deck/runtime/projects/{project_id}/extensions/coding-extension.yaml
   - Merged workflow: .cc-deck/runtime/projects/{project_id}/workflows/generated/coding-merged.yaml
   - Integration metadata: .cc-deck/runtime/projects/{project_id}/config/integration-metadata.json
   - Create directory structure if needed

5. **Validation**:
   - Verify all files created successfully
   - Validate YAML syntax and agent references
   - Confirm enhanced agent paths are correctly specified

Output: coding_extension_config, coding_merged_workflow, integration_metadata for next phase.")
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

### Phase 6: MCP Validation and Testing

Validating that all configured MCP tools are functioning correctly...

```bash
Task(subagent_type="mcp-validation-agent", description="Validate MCP tool functionality", prompt="Validate that all configured MCP tools are functioning correctly:

Validation Requirements:
1. **Connectivity Tests**:
   - Test each MCP server connection and authentication
   - Verify API endpoints respond within acceptable timeouts
   - Validate authentication tokens and permissions
   - Check service availability and rate limits

2. **Functionality Tests**:
   - Execute basic operations for each MCP tool
   - Test core functionality that enhanced-implementation-agent will use
   - Verify data formats and response structures
   - Validate error handling and fallback mechanisms

3. **Performance Tests**:
   - Measure response times for each MCP tool
   - Test concurrent usage scenarios
   - Validate timeout configurations
   - Check resource usage and memory impact

4. **Integration Verification**:
   - Verify enhanced-implementation-agent can access all MCP tools
   - Test agent recognition by Claude Code system
   - Validate workflow integration is complete
   - Confirm fallback mechanisms work properly

Output: mcp_validation_results, functional_mcp_tools, failed_mcp_tools, performance_metrics for final approval.")
```

### Phase 7: Human Approval (Final)

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
echo "❓ Final Approval Required"
echo ""
echo "🔍 Review Materials:"
echo "- Enhanced implementation agent functionality and MCP integration quality"
echo "- MCP setup completion and authentication status"
echo "- Development environment readiness and optimization potential"
echo "- Fallback strategies and error handling appropriateness"
echo ""

# CRITICAL: Execute human approval workflow
Task(subagent_type="acceptance-reviewer", 
     description="Human approval for enhanced development environment", 
     prompt="Facilitate human review and approval of the enhanced development environment:

Review Scope:
- Enhanced implementation agent functionality and MCP integration quality
- MCP setup completion and authentication status (.cc-deck/runtime/projects/{project_id}/config/mcp-setup-complete.json)
- Development environment readiness and optimization potential
- Fallback strategies and error handling appropriateness

Review Materials:
- Enhanced agent: .claude/agents/coding/dynamic/{project_id}-enhanced-implementation-agent.md
- Agent configuration summary and generation results
- MCP setup completion status and authentication results
- Fallback strategies and error handling implementation

Required Stakeholders: [developer, technical_lead]
Optional Stakeholders: [project_owner]

Decision Options:
- APPROVED: Proceed to enhanced CODING workflow
- APPROVED_WITH_CONDITIONS: Proceed with noted conditions
- REJECTED: Return to agent_generation phase with feedback
- DEFERRED: Save setup and continue later

Upon APPROVAL: Ready to proceed to Coding workflow with enhanced capabilities
Upon REJECTION: Provide feedback for regeneration and return to Phase 4

Please collect structured approval decision and prepare transition to next workflow.")
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

- **Specification Analysis**: Technology stack extracted and analyzed successfully
- **MCP Recommendations**: Optimal MCP agents researched and recommended 
- **User Approval**: MCP agent recommendations approved by user
- **Enhanced Agent Generation**: {project_id}-enhanced-implementation-agent.md created in .claude/agents/coding/dynamic/
- **Workflow Integration**: coding-merged.yaml and extension configs generated successfully
- **MCP Setup**: All approved MCP tools configured and authenticated
- **MCP Validation**: All MCP tools tested and validated as functional
- **Final Approval**: Enhanced development environment approved for use

## Human Approval Required

**⚠️ IMPORTANT**: Development environment setup is complete, but **human approval is required** before proceeding to the Coding workflow.

✅ **Completed Setup:**
1. **Enhanced Coding Workflow Ready**: coding-merged.yaml with {project_id}-enhanced-implementation-agent integration
2. **Claude Code System Recognition**: Enhanced agent available as system agent
3. **Smart Context Updated**: All setup information and configuration stored
4. **MCP Tools Validated**: All approved MCP tools tested and ready for use

🔍 **Pending Human Review**: 
- Enhanced implementation agent functionality and MCP integration quality
- MCP setup completion and authentication status
- Development environment readiness and optimization potential
- Fallback strategies and error handling appropriateness

⏱️ **Next Action**: Await human stakeholder approval decision (timeout: 24 hours)

**Only after approval**: Ready to proceed to Coding workflow with enhanced capabilities

---

**This command bridges the gap between Kiro SDD completion and TDD-driven implementation by creating a customized development environment tailored to your project's specific needs.**