#!/bin/bash

# Fix Sub-Agent Definitions Script
# Remove Task tool from agents and update descriptions to reflect orchestrator delegation

echo "🔧 Fixing sub-agent definitions..."

# List of agent files that need Task tool removal
AGENT_FILES=(
    ".claude/agents/refactor/refactoring.md"
    ".claude/agents/pr-create/pr-create.md"
    ".claude/agents/acceptance/acceptance.md"
    ".claude/agents/e2e-test/e2e-test.md"
    ".claude/agents/coding/planning-agent.md"
    ".claude/agents/pr-merge/pr-merge.md"
    ".claude/agents/integration-test/integration-test.md"
    ".claude/agents/coding/testing-agent.md"
    ".claude/agents/coding/documentation-agent.md"
    ".claude/agents/coding/research-agent.md"
    ".claude/agents/acceptance/phase-coordinator.md"
    ".claude/agents/coding/implementation-agent.md"
)

for file in "${AGENT_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Updating $file..."
        
        # Create backup
        cp "$file" "$file.backup"
        
        # Remove Task from tools line
        sed -i'' -e 's/Task, //g' "$file"
        sed -i'' -e 's/, Task//g' "$file"
        sed -i'' -e 's/tools: Task$/tools: Read/g' "$file"
        
        echo "✅ Updated $file"
    else
        echo "⚠️  File not found: $file"
    fi
done

echo "🎉 Sub-agent definitions updated!"
echo ""
echo "Summary of changes:"
echo "- Removed 'Task' from tools configuration"
echo "- Agents now work through orchestrator delegation"
echo "- Backup files created with .backup extension"
echo ""
echo "Next steps:"
echo "1. Review updated agent definitions"
echo "2. Test orchestrator integration"
echo "3. Remove backup files when satisfied"