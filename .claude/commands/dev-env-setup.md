---
description: Dynamic MCP agent generation and development environment setup for project-specific optimization
argument-hint: [optional feature description]
allowed-tools: Task, Read, Write, Edit, Bash, Glob, Grep, LS
---

# Development Environment Setup Command

Intelligent development environment setup workflow that analyzes Kiro SDD specifications and dynamically generates project-specific MCP SubAgents to optimize the development process.

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

### Phase 4: Dynamic Agent Generation

Based on user approval, generating approved MCP SubAgents...

```bash
Task(subagent_type="agent-generator", description="Generate approved MCP SubAgents", prompt="Generate the user-approved MCP SubAgents with the following requirements:

Input Context:
- Use approved MCP agents from user selection
- Apply project analysis and technology stack information
- Follow CC-Deck naming convention: {project_id}-{agent_purpose}

Generation Requirements:
1. **CRITICAL FILE PATH**: Create files ONLY in .cc-deck/runtime/projects/{project_id}/agents/
2. **NEVER use .claude/agents/ directory**
3. **Proper YAML frontmatter**: name, description, tools, color
4. **MCP Integration**: Configure appropriate MCP tool integrations
5. **Smart Context Integration**: Define context reading/writing patterns
6. **Project-specific customization**: Align with actual technology stack

Naming Convention:
- Format: {project_id}-{agent_purpose}
- Example: liquid-glass-tech-blog-vercel-optimizer

Directory Structure:
- Target: .cc-deck/runtime/projects/{project_id}/agents/
- Create directory structure if needed
- Validate file creation in correct location

Output: generated_agents, agent_file_list, generation_summary for workflow integration.")
```

### Phase 5: Workflow Integration

Creating extension configuration and merging with base Coding workflow...

```bash
Task(subagent_type="workflow-integrator", description="Create workflow integration", prompt="Create extension configuration and merge with base Coding workflow:

Integration Tasks:
1. **Extension Configuration**:
   - Create coding-extension.yaml in .cc-deck/runtime/projects/{project_id}/extensions/
   - Define supporting_agents_additions for full_implementation phase
   - Include all generated agent names from agent-generator

2. **Workflow Merging**:
   - Read base .cc-deck/config/workflows/base/coding.yaml
   - Apply extension using array_addition merge strategy
   - Generate merged configuration in .cc-deck/runtime/projects/{project_id}/workflows/generated/coding-merged.yaml

3. **Validation**:
   - Ensure YAML syntax is valid
   - Verify all agent references are correct
   - Confirm proper directory structure
   - Validate no circular dependencies

Directory Structure:
- Extensions: .cc-deck/runtime/projects/{project_id}/extensions/
- Generated: .cc-deck/runtime/projects/{project_id}/workflows/generated/

Output: extension_configuration, merged_workflow_config, integration_summary for final approval.")
```

### Phase 6: Human Approval (Final)

```bash
echo "✅ DEV-ENV-SETUP Complete!"
echo ""
echo "📋 Setup Summary:"
echo "- Technology stack analysis: ✅ Complete"
echo "- MCP agent generation: ✅ Complete"
echo "- Workflow integration: ✅ Complete"
echo "- Extension configuration: ✅ Created"
echo "- Merged workflow: ✅ Generated"
echo ""
echo "🎯 Generated Development Environment:"
# (Details will be shown from integration summary)
echo ""
echo "❓ Final Approval"
echo ""
echo "Please review the generated development environment:"
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

- All approved MCP agents generated successfully
- Extension configuration created and validated  
- Merged workflow configuration functional
- User approval obtained for final setup
- Enhanced Coding workflow ready for execution

## Next Steps

Upon successful completion:
1. Enhanced Coding workflow is ready with project-specific agents
2. Smart Context contains all setup information
3. Development environment optimized for the specific project
4. Ready to begin TDD-driven implementation phase

---

**This command bridges the gap between Kiro SDD completion and TDD-driven implementation by creating a customized development environment tailored to your project's specific needs.**