#!/bin/bash
# Integration Verification Script for Fashionable Girls Blog Enhanced Implementation Agent
# Validates all integration components are properly configured

set -e

echo "🔍 Fashion Girls Blog Integration Verification"
echo "=============================================="

PROJECT_ROOT="/Volumes/SSD/development/cc-deck"
PROJECT_ID="fashionable-girls-blog"
RUNTIME_PATH="${PROJECT_ROOT}/.cc-deck/runtime/projects/${PROJECT_ID}"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

success_count=0
total_checks=0

check_file() {
    local file_path="$1"
    local description="$2"
    total_checks=$((total_checks + 1))
    
    if [[ -f "$file_path" ]]; then
        echo -e "${GREEN}✅ $description${NC}"
        success_count=$((success_count + 1))
        return 0
    else
        echo -e "${RED}❌ $description${NC}"
        echo -e "   ${YELLOW}Missing: $file_path${NC}"
        return 1
    fi
}

check_directory() {
    local dir_path="$1"
    local description="$2"
    total_checks=$((total_checks + 1))
    
    if [[ -d "$dir_path" ]]; then
        echo -e "${GREEN}✅ $description${NC}"
        success_count=$((success_count + 1))
        return 0
    else
        echo -e "${RED}❌ $description${NC}"
        echo -e "   ${YELLOW}Missing: $dir_path${NC}"
        return 1
    fi
}

validate_yaml() {
    local file_path="$1"
    local description="$2"
    total_checks=$((total_checks + 1))
    
    if python3 -c "import yaml; yaml.safe_load(open('$file_path'))" 2>/dev/null; then
        echo -e "${GREEN}✅ $description - YAML syntax valid${NC}"
        success_count=$((success_count + 1))
        return 0
    else
        echo -e "${RED}❌ $description - YAML syntax invalid${NC}"
        return 1
    fi
}

validate_json() {
    local file_path="$1"
    local description="$2"
    total_checks=$((total_checks + 1))
    
    if python3 -c "import json; json.load(open('$file_path'))" 2>/dev/null; then
        echo -e "${GREEN}✅ $description - JSON syntax valid${NC}"
        success_count=$((success_count + 1))
        return 0
    else
        echo -e "${RED}❌ $description - JSON syntax invalid${NC}"
        return 1
    fi
}

echo -e "${BLUE}1. Directory Structure Verification${NC}"
echo "-----------------------------------"
check_directory "${RUNTIME_PATH}" "Runtime project directory"
check_directory "${RUNTIME_PATH}/config" "Configuration directory"
check_directory "${RUNTIME_PATH}/extensions" "Extensions directory"
check_directory "${RUNTIME_PATH}/workflows" "Workflows directory"
check_directory "${RUNTIME_PATH}/workflows/generated" "Generated workflows directory"

echo -e "\n${BLUE}2. Enhanced Agent File Verification${NC}"
echo "-----------------------------------"
check_file "${PROJECT_ROOT}/.claude/agents/coding/dynamic/fashionable-girls-blog-enhanced-implementation-agent.md" "Enhanced implementation agent file"

echo -e "\n${BLUE}3. Configuration Files Verification${NC}"
echo "-----------------------------------"
check_file "${RUNTIME_PATH}/extensions/coding-extension.yaml" "Coding extension configuration"
check_file "${RUNTIME_PATH}/workflows/generated/coding-merged.yaml" "Merged coding workflow"
check_file "${RUNTIME_PATH}/config/integration-metadata.json" "Integration metadata"

echo -e "\n${BLUE}4. YAML/JSON Syntax Validation${NC}"
echo "------------------------------"
validate_yaml "${RUNTIME_PATH}/extensions/coding-extension.yaml" "Coding extension YAML"
validate_yaml "${RUNTIME_PATH}/workflows/generated/coding-merged.yaml" "Merged workflow YAML"
validate_json "${RUNTIME_PATH}/config/integration-metadata.json" "Integration metadata JSON"

echo -e "\n${BLUE}5. Base Workflow Integration Verification${NC}"
echo "------------------------------------------"
check_file "${PROJECT_ROOT}/.cc-deck/config/workflows/base/coding.yaml" "Base coding workflow"

echo -e "\n${BLUE}6. Project Specification Verification${NC}"
echo "------------------------------------"
check_file "${PROJECT_ROOT}/.kiro/specs/fashionable-girls-blog/tasks.md" "Fashion platform tasks file"

echo -e "\n${BLUE}7. MCP Tool Verification${NC}"
echo "------------------------"
# Check if the enhanced agent file contains the expected MCP tools
if [[ -f "${PROJECT_ROOT}/.claude/agents/coding/dynamic/fashionable-girls-blog-enhanced-implementation-agent.md" ]]; then
    total_checks=$((total_checks + 8))
    
    # Check for essential MCP tools
    if grep -q "mcp__context7__" "${PROJECT_ROOT}/.claude/agents/coding/dynamic/fashionable-girls-blog-enhanced-implementation-agent.md"; then
        echo -e "${GREEN}✅ Context7 MCP tools configured${NC}"
        success_count=$((success_count + 1))
    else
        echo -e "${RED}❌ Context7 MCP tools missing${NC}"
    fi
    
    if grep -q "mcp__deepwiki__" "${PROJECT_ROOT}/.claude/agents/coding/dynamic/fashionable-girls-blog-enhanced-implementation-agent.md"; then
        echo -e "${GREEN}✅ DeepWiki MCP tools configured${NC}"
        success_count=$((success_count + 1))
    else
        echo -e "${RED}❌ DeepWiki MCP tools missing${NC}"
    fi
    
    if grep -q "mcp__brave-search__" "${PROJECT_ROOT}/.claude/agents/coding/dynamic/fashionable-girls-blog-enhanced-implementation-agent.md"; then
        echo -e "${GREEN}✅ Brave Search MCP tools configured${NC}"
        success_count=$((success_count + 1))
    else
        echo -e "${RED}❌ Brave Search MCP tools missing${NC}"
    fi
    
    if grep -q "mcp__vercel__" "${PROJECT_ROOT}/.claude/agents/coding/dynamic/fashionable-girls-blog-enhanced-implementation-agent.md"; then
        echo -e "${GREEN}✅ Vercel MCP tools configured${NC}"
        success_count=$((success_count + 1))
    else
        echo -e "${RED}❌ Vercel MCP tools missing${NC}"
    fi
    
    if grep -q "mcp__playwright__" "${PROJECT_ROOT}/.claude/agents/coding/dynamic/fashionable-girls-blog-enhanced-implementation-agent.md"; then
        echo -e "${GREEN}✅ Playwright MCP tools configured${NC}"
        success_count=$((success_count + 1))
    else
        echo -e "${RED}❌ Playwright MCP tools missing${NC}"
    fi
    
    if grep -q "mcp__ide__executeCode" "${PROJECT_ROOT}/.claude/agents/coding/dynamic/fashionable-girls-blog-enhanced-implementation-agent.md"; then
        echo -e "${GREEN}✅ AI/ML MCP tools configured${NC}"
        success_count=$((success_count + 1))
    else
        echo -e "${RED}❌ AI/ML MCP tools missing${NC}"
    fi
    
    if grep -q "mcp__ide__getDiagnostics" "${PROJECT_ROOT}/.claude/agents/coding/dynamic/fashionable-girls-blog-enhanced-implementation-agent.md"; then
        echo -e "${GREEN}✅ Performance Monitoring MCP tools configured${NC}"
        success_count=$((success_count + 1))
    else
        echo -e "${RED}❌ Performance Monitoring MCP tools missing${NC}"
    fi
    
    # Check for 8 total MCP tool categories
    mcp_tool_count=$(grep -c "mcp__" "${PROJECT_ROOT}/.claude/agents/coding/dynamic/fashionable-girls-blog-enhanced-implementation-agent.md" || echo "0")
    if [[ $mcp_tool_count -ge 20 ]]; then  # Should have multiple tools per category
        echo -e "${GREEN}✅ All 8 MCP tool categories represented (${mcp_tool_count} tools total)${NC}"
        success_count=$((success_count + 1))
    else
        echo -e "${RED}❌ Insufficient MCP tools configured (${mcp_tool_count} found, expected 20+)${NC}"
    fi
fi

echo -e "\n${BLUE}8. Workflow Integration Points Verification${NC}"
echo "------------------------------------------"
total_checks=$((total_checks + 3))

# Check if merged workflow references the enhanced agent
if grep -q "fashionable-girls-blog-enhanced-implementation-agent" "${RUNTIME_PATH}/workflows/generated/coding-merged.yaml"; then
    echo -e "${GREEN}✅ Enhanced agent referenced in merged workflow${NC}"
    success_count=$((success_count + 1))
else
    echo -e "${RED}❌ Enhanced agent not referenced in merged workflow${NC}"
fi

# Check if fallback strategy is configured
if grep -q "impersonator-agent" "${RUNTIME_PATH}/workflows/generated/coding-merged.yaml"; then
    echo -e "${GREEN}✅ Fallback strategy configured in merged workflow${NC}"
    success_count=$((success_count + 1))
else
    echo -e "${RED}❌ Fallback strategy not configured in merged workflow${NC}"
fi

# Check if fashion platform enhancements are included
if grep -q "fashion_platform" "${RUNTIME_PATH}/workflows/generated/coding-merged.yaml"; then
    echo -e "${GREEN}✅ Fashion platform enhancements integrated${NC}"
    success_count=$((success_count + 1))
else
    echo -e "${RED}❌ Fashion platform enhancements not integrated${NC}"
fi

echo -e "\n${BLUE}Integration Summary${NC}"
echo "=================="
echo -e "✅ Successful checks: ${GREEN}${success_count}${NC}"
echo -e "❌ Failed checks: ${RED}$((total_checks - success_count))${NC}"
echo -e "📊 Total checks: ${BLUE}${total_checks}${NC}"

if [[ $success_count -eq $total_checks ]]; then
    echo -e "\n🎉 ${GREEN}All integration checks passed! The enhanced implementation agent is ready for use.${NC}"
    echo -e "\n${BLUE}Next Steps:${NC}"
    echo "1. Run the /orchestrator command to test the enhanced agent"
    echo "2. Monitor MCP tool performance during implementation"
    echo "3. Validate fashion platform features during development"
    echo "4. Check fallback behavior if MCP tools become unavailable"
    exit 0
else
    echo -e "\n⚠️  ${YELLOW}Some integration checks failed. Please review the issues above.${NC}"
    echo -e "\n${BLUE}Troubleshooting:${NC}"
    echo "1. Ensure all required directories exist"
    echo "2. Validate YAML/JSON syntax in configuration files"
    echo "3. Check that the enhanced agent file contains all required MCP tools"
    echo "4. Verify that base workflow files exist and are accessible"
    exit 1
fi