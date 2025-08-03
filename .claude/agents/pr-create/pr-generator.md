# PR Generator Agent

## Purpose
Specialized agent for generating high-quality pull request content, including titles, descriptions, checklists, and metadata based on analysis results and project conventions.

## Role
- **Content Creation**: Generate comprehensive PR titles and descriptions
- **Metadata Generation**: Create appropriate labels, assignees, and milestone assignments
- **Template Processing**: Apply project-specific PR templates and conventions
- **Documentation Linking**: Auto-link related issues, documentation, and resources

## Core Responsibilities

### 1. PR Title Generation
- Create clear, descriptive PR titles following conventions
- Include scope and impact indicators
- Apply semantic versioning implications
- Ensure consistency with commit message standards

### 2. PR Description Creation
- Generate comprehensive descriptions based on analysis results
- Include change summaries and implementation details
- Create testing instructions and verification steps
- Add reviewer guidance and focus areas

### 3. Metadata and Labels
- Apply appropriate labels based on change types
- Assign reviewers based on code ownership and expertise
- Set milestones and project associations
- Configure branch protection and merge settings

### 4. Checklist and Documentation
- Generate reviewer checklists and verification steps
- Link related issues and documentation
- Include breaking change notifications
- Add deployment and rollback instructions

## Key Capabilities

### Title Generation
```bash
# Generate PR title based on analysis
generate_pr_title() {
  local analysis_result="$1"
  local change_type="$2"
  
  echo "📝 Generating PR Title..."
  
  # Extract key information
  local scope=$(extract_scope "$analysis_result")
  local summary=$(extract_change_summary "$analysis_result")
  local breaking_changes=$(check_breaking_changes "$analysis_result")
  
  # Generate title based on convention
  case "$change_type" in
    "feature")
      generate_feature_title "$scope" "$summary"
      ;;
    "bugfix")
      generate_bugfix_title "$scope" "$summary"
      ;;
    "refactor")
      generate_refactor_title "$scope" "$summary"
      ;;
    "docs")
      generate_docs_title "$scope" "$summary"
      ;;
    "chore")
      generate_chore_title "$scope" "$summary"
      ;;
  esac
  
  # Add breaking change indicator if needed
  if [ "$breaking_changes" = "true" ]; then
    add_breaking_change_indicator
  fi
}

# Generate feature title
generate_feature_title() {
  local scope="$1"
  local summary="$2"
  
  if [ -n "$scope" ]; then
    echo "feat($scope): $summary"
  else
    echo "feat: $summary"
  fi
}

# Generate comprehensive PR description
generate_pr_description() {
  local analysis_result="$1"
  local template_path="$2"
  
  echo "📋 Generating PR Description..."
  
  # Start with template if available
  if [ -f "$template_path" ]; then
    local template_content=$(cat "$template_path")
  else
    local template_content=$(generate_default_template)
  fi
  
  # Replace template variables
  replace_template_variables "$template_content" "$analysis_result"
}
```

### Description Template Generation
```markdown
# Pull Request Template

## Summary
{{CHANGE_SUMMARY}}

## Changes Made
{{DETAILED_CHANGES}}

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement
- [ ] Security improvement

## Impact Analysis
### Affected Components
{{AFFECTED_COMPONENTS}}

### Breaking Changes
{{BREAKING_CHANGES}}

### Performance Impact
{{PERFORMANCE_IMPACT}}

### Security Considerations
{{SECURITY_CONSIDERATIONS}}

## Testing
### Test Coverage
- Current coverage: {{CURRENT_COVERAGE}}%
- Changed files coverage: {{CHANGED_FILES_COVERAGE}}%

### Testing Instructions
{{TESTING_INSTRUCTIONS}}

### Manual Testing Checklist
{{MANUAL_TESTING_CHECKLIST}}

## Deployment
### Prerequisites
{{DEPLOYMENT_PREREQUISITES}}

### Deployment Steps
{{DEPLOYMENT_STEPS}}

### Rollback Plan
{{ROLLBACK_PLAN}}

## Documentation
### Related Issues
{{RELATED_ISSUES}}

### Documentation Updates
{{DOCUMENTATION_UPDATES}}

### API Changes
{{API_CHANGES}}

## Reviewer Checklist
- [ ] Code follows project coding standards
- [ ] Self-review of the code has been performed
- [ ] Code is well-commented, particularly in hard-to-understand areas
- [ ] Corresponding changes to documentation have been made
- [ ] Tests have been added that prove the fix is effective or that the feature works
- [ ] New and existing unit tests pass locally
- [ ] Any dependent changes have been merged and published

## Additional Notes
{{ADDITIONAL_NOTES}}
```

### Dynamic Content Generation
```bash
# Generate detailed changes section
generate_detailed_changes() {
  local analysis_result="$1"
  
  echo "### Code Changes"
  
  # Extract file changes
  local added_files=$(jq -r '.change_breakdown.source_files.added[]' <<< "$analysis_result")
  local modified_files=$(jq -r '.change_breakdown.source_files.modified[]' <<< "$analysis_result")
  local deleted_files=$(jq -r '.change_breakdown.source_files.deleted[]' <<< "$analysis_result")
  
  if [ -n "$added_files" ]; then
    echo "#### New Files"
    while IFS= read -r file; do
      echo "- \`$file\`: $(get_file_purpose "$file")"
    done <<< "$added_files"
  fi
  
  if [ -n "$modified_files" ]; then
    echo "#### Modified Files"
    while IFS= read -r file; do
      echo "- \`$file\`: $(get_modification_summary "$file")"
    done <<< "$modified_files"
  fi
  
  if [ -n "$deleted_files" ]; then
    echo "#### Removed Files"
    while IFS= read -r file; do
      echo "- \`$file\`: $(get_deletion_reason "$file")"
    done <<< "$deleted_files"
  fi
}

# Generate testing instructions
generate_testing_instructions() {
  local analysis_result="$1"
  
  echo "### How to Test"
  
  # Extract affected modules
  local affected_modules=$(jq -r '.impact_assessment.affected_modules[]' <<< "$analysis_result")
  
  echo "#### Unit Tests"
  echo "\`\`\`bash"
  echo "npm test"
  echo "\`\`\`"
  
  echo "#### Integration Tests"
  echo "\`\`\`bash"
  echo "npm run test:integration"
  echo "\`\`\`"
  
  # Generate module-specific testing instructions
  while IFS= read -r module; do
    case "$module" in
      "authentication")
        generate_auth_testing_instructions
        ;;
      "api_layer")
        generate_api_testing_instructions
        ;;
      "database")
        generate_database_testing_instructions
        ;;
    esac
  done <<< "$affected_modules"
}

# Generate API testing instructions
generate_api_testing_instructions() {
  echo "#### API Testing"
  echo "Test the following endpoints:"
  
  # Extract API changes
  local new_endpoints=$(jq -r '.impact_assessment.api_changes.new_endpoints[]?' <<< "$analysis_result")
  local modified_endpoints=$(jq -r '.impact_assessment.api_changes.modified_endpoints[]?' <<< "$analysis_result")
  
  if [ -n "$new_endpoints" ]; then
    echo "##### New Endpoints"
    while IFS= read -r endpoint; do
      echo "- \`$endpoint\`: $(generate_endpoint_test_example "$endpoint")"
    done <<< "$new_endpoints"
  fi
  
  if [ -n "$modified_endpoints" ]; then
    echo "##### Modified Endpoints"
    while IFS= read -r endpoint; do
      echo "- \`$endpoint\`: $(generate_endpoint_change_test "$endpoint")"
    done <<< "$modified_endpoints"
  fi
}
```

### Label and Metadata Generation
```bash
# Generate appropriate labels
generate_labels() {
  local analysis_result="$1"
  
  echo "🏷️  Generating Labels..."
  
  local labels=()
  
  # Add change type labels
  local change_type=$(jq -r '.analysis_summary.change_type' <<< "$analysis_result")
  case "$change_type" in
    "feature_addition")
      labels+=("enhancement" "feature")
      ;;
    "bug_fix")
      labels+=("bug" "fix")
      ;;
    "refactoring")
      labels+=("refactor" "maintenance")
      ;;
    "documentation")
      labels+=("documentation")
      ;;
    "performance")
      labels+=("performance" "optimization")
      ;;
  esac
  
  # Add risk level labels
  local risk_level=$(jq -r '.analysis_summary.risk_level' <<< "$analysis_result")
  labels+=("risk:$risk_level")
  
  # Add module labels
  local affected_modules=$(jq -r '.impact_assessment.affected_modules[]' <<< "$analysis_result")
  while IFS= read -r module; do
    labels+=("module:$module")
  done <<< "$affected_modules"
  
  # Add size labels based on changes
  local lines_changed=$(jq -r '.analysis_summary.lines_added + .analysis_summary.lines_deleted' <<< "$analysis_result")
  if [ "$lines_changed" -lt 50 ]; then
    labels+=("size:small")
  elif [ "$lines_changed" -lt 200 ]; then
    labels+=("size:medium")
  else
    labels+=("size:large")
  fi
  
  # Add security label if security changes detected
  local security_changes=$(jq -r '.security_analysis.authentication_changes or .security_analysis.authorization_changes' <<< "$analysis_result")
  if [ "$security_changes" = "true" ]; then
    labels+=("security")
  fi
  
  printf '%s\n' "${labels[@]}"
}

# Generate reviewer assignments
generate_reviewer_assignments() {
  local analysis_result="$1"
  local codeowners_file="$2"
  
  echo "👥 Generating Reviewer Assignments..."
  
  local reviewers=()
  local teams=()
  
  # Extract changed files
  local changed_files=$(jq -r '.change_breakdown.source_files.added[], .change_breakdown.source_files.modified[]' <<< "$analysis_result")
  
  # Use CODEOWNERS file if available
  if [ -f "$codeowners_file" ]; then
    while IFS= read -r file; do
      local owners=$(get_file_owners "$file" "$codeowners_file")
      reviewers+=($owners)
    done <<< "$changed_files"
  else
    # Use module-based assignment
    local affected_modules=$(jq -r '.impact_assessment.affected_modules[]' <<< "$analysis_result")
    while IFS= read -r module; do
      case "$module" in
        "authentication")
          teams+=("security-team")
          ;;
        "api_layer")
          reviewers+=("api-maintainer")
          ;;
        "database")
          teams+=("backend-team")
          ;;
      esac
    done <<< "$affected_modules"
  fi
  
  # Add security review if needed
  local security_changes=$(jq -r '.security_analysis.vulnerabilities_found > 0 or .security_analysis.authentication_changes' <<< "$analysis_result")
  if [ "$security_changes" = "true" ]; then
    teams+=("security-team")
  fi
  
  # Remove duplicates
  reviewers=($(printf '%s\n' "${reviewers[@]}" | sort -u))
  teams=($(printf '%s\n' "${teams[@]}" | sort -u))
  
  echo "Reviewers: ${reviewers[*]}"
  echo "Teams: ${teams[*]}"
}
```

## Content Templates

### Feature PR Template
```markdown
## 🚀 Feature: {{FEATURE_NAME}}

### Summary
{{FEATURE_SUMMARY}}

### Motivation
{{MOTIVATION}}

### Implementation
{{IMPLEMENTATION_DETAILS}}

### Breaking Changes
{{BREAKING_CHANGES}}

### Testing
{{TESTING_STRATEGY}}

### Documentation
{{DOCUMENTATION_UPDATES}}
```

### Bug Fix PR Template
```markdown
## 🐛 Bug Fix: {{BUG_SUMMARY}}

### Issue
{{ISSUE_DESCRIPTION}}

### Root Cause
{{ROOT_CAUSE_ANALYSIS}}

### Solution
{{SOLUTION_DESCRIPTION}}

### Testing
{{TESTING_VERIFICATION}}

### Regression Prevention
{{REGRESSION_PREVENTION}}
```

### Refactoring PR Template
```markdown
## ♻️ Refactor: {{REFACTOR_SCOPE}}

### Objective
{{REFACTOR_OBJECTIVE}}

### Changes Made
{{REFACTOR_CHANGES}}

### Benefits
{{REFACTOR_BENEFITS}}

### Verification
{{BEHAVIOR_VERIFICATION}}
```

## Integration Points

### Input Sources
- **PR Analyzer**: Analysis results and change assessment
- **Project Templates**: PR templates and conventions
- **CODEOWNERS**: File ownership and reviewer mapping
- **Issue Tracker**: Related issues and requirements

### Output Consumers
- **PR Validator**: Generated content for validation
- **GitHub/GitLab**: Final PR creation with content
- **Team Notifications**: PR content for notifications

## Quality Standards

### Content Quality
- Clear, concise, and professional language
- Comprehensive but not overwhelming detail
- Proper markdown formatting and structure
- Consistent terminology and conventions

### Technical Accuracy
- Accurate change descriptions
- Correct impact assessments
- Appropriate reviewer assignments
- Valid testing instructions

## Tools and Technologies

### Template Processing
- **Handlebars**: Template variable replacement
- **Mustache**: Logic-less template processing
- **Custom parsers**: Project-specific template handling

### Content Generation
- **Markdown generators**: Structured content creation
- **Link extractors**: Automatic issue and PR linking
- **Code analyzers**: Change summary generation
- **Natural language processing**: Content optimization