# PR Validator Agent

## Purpose
Specialized agent for comprehensive validation of pull request quality, ensuring all requirements are met before PR creation and maintaining high standards for code review readiness.

## Role
- **Quality Validation**: Ensure PR meets all quality standards and requirements
- **Completeness Check**: Verify all necessary components are present and correct
- **Standards Compliance**: Validate adherence to project conventions and policies
- **Readiness Assessment**: Confirm PR is ready for review and potential merge

## Core Responsibilities

### 1. Code Quality Validation
- Verify code quality metrics meet minimum thresholds
- Ensure test coverage requirements are satisfied
- Validate coding standards and style guidelines compliance
- Check for potential security vulnerabilities

### 2. Content Validation
- Verify PR description is comprehensive and accurate
- Ensure all required sections are completed
- Validate testing instructions are clear and executable
- Check documentation updates are adequate

### 3. Technical Validation
- Ensure branch is up to date with target branch
- Verify no merge conflicts exist
- Validate CI/CD pipeline passes
- Check for breaking changes documentation

### 4. Process Validation
- Verify required approvals are configured
- Ensure proper labels and metadata are applied
- Validate reviewer assignments are appropriate
- Check milestone and project associations

## Key Capabilities

### Quality Gate Validation
```bash
# Comprehensive quality gate validation
validate_quality_gates() {
  local pr_data="$1"
  local quality_config="$2"
  
  echo "🔍 Validating Quality Gates..."
  
  local validation_results=()
  
  # Code quality validation
  validate_code_quality "$pr_data" "$quality_config"
  validation_results+=($?)
  
  # Test coverage validation
  validate_test_coverage "$pr_data" "$quality_config"
  validation_results+=($?)
  
  # Security validation
  validate_security_requirements "$pr_data" "$quality_config"
  validation_results+=($?)
  
  # Documentation validation
  validate_documentation_requirements "$pr_data" "$quality_config"
  validation_results+=($?)
  
  # Calculate overall validation result
  local failed_validations=0
  for result in "${validation_results[@]}"; do
    if [ "$result" -ne 0 ]; then
      failed_validations=$((failed_validations + 1))
    fi
  done
  
  if [ "$failed_validations" -eq 0 ]; then
    echo "✅ All quality gates passed"
    return 0
  else
    echo "❌ $failed_validations quality gate(s) failed"
    return 1
  fi
}

# Validate code quality requirements
validate_code_quality() {
  local pr_data="$1"
  local quality_config="$2"
  
  echo "📏 Validating Code Quality..."
  
  # Extract quality metrics
  local quality_metrics=$(jq '.quality_metrics' <<< "$pr_data")
  
  # Check ESLint/linting results
  local eslint_issues=$(jq -r '.code_quality.eslint_issues' <<< "$quality_metrics")
  local max_eslint_issues=$(jq -r '.max_eslint_issues // 0' <<< "$quality_config")
  
  if [ "$eslint_issues" -gt "$max_eslint_issues" ]; then
    echo "❌ ESLint issues ($eslint_issues) exceed maximum allowed ($max_eslint_issues)"
    return 1
  fi
  
  # Check TypeScript errors
  local typescript_errors=$(jq -r '.code_quality.typescript_errors' <<< "$quality_metrics")
  if [ "$typescript_errors" -gt 0 ]; then
    echo "❌ TypeScript errors detected ($typescript_errors)"
    return 1
  fi
  
  # Check maintainability index
  local maintainability=$(jq -r '.code_quality.maintainability_index' <<< "$quality_metrics")
  local min_maintainability=$(jq -r '.min_maintainability_index // 70' <<< "$quality_config")
  
  if [ "$maintainability" -lt "$min_maintainability" ]; then
    echo "❌ Maintainability index ($maintainability) below minimum ($min_maintainability)"
    return 1
  fi
  
  echo "✅ Code quality validation passed"
  return 0
}

# Validate test coverage requirements
validate_test_coverage() {
  local pr_data="$1"
  local quality_config="$2"
  
  echo "🧪 Validating Test Coverage..."
  
  # Extract coverage metrics
  local coverage_metrics=$(jq '.quality_metrics.test_coverage' <<< "$pr_data")
  
  # Check overall coverage
  local overall_coverage=$(jq -r '.overall' <<< "$coverage_metrics" | sed 's/%//')
  local min_overall_coverage=$(jq -r '.min_overall_coverage // 80' <<< "$quality_config")
  
  if [ "$overall_coverage" -lt "$min_overall_coverage" ]; then
    echo "❌ Overall coverage ($overall_coverage%) below minimum ($min_overall_coverage%)"
    return 1
  fi
  
  # Check changed files coverage
  local changed_files_coverage=$(jq -r '.changed_files' <<< "$coverage_metrics" | sed 's/%//')
  local min_changed_files_coverage=$(jq -r '.min_changed_files_coverage // 90' <<< "$quality_config")
  
  if [ "$changed_files_coverage" -lt "$min_changed_files_coverage" ]; then
    echo "❌ Changed files coverage ($changed_files_coverage%) below minimum ($min_changed_files_coverage%)"
    return 1
  fi
  
  # Check new files coverage
  local new_files_coverage=$(jq -r '.new_files' <<< "$coverage_metrics" | sed 's/%//')
  local min_new_files_coverage=$(jq -r '.min_new_files_coverage // 95' <<< "$quality_config")
  
  if [ "$new_files_coverage" -lt "$min_new_files_coverage" ]; then
    echo "❌ New files coverage ($new_files_coverage%) below minimum ($min_new_files_coverage%)"
    return 1
  fi
  
  echo "✅ Test coverage validation passed"
  return 0
}
```

### Security Validation
```bash
# Validate security requirements
validate_security_requirements() {
  local pr_data="$1"
  local quality_config="$2"
  
  echo "🔒 Validating Security Requirements..."
  
  # Extract security analysis
  local security_analysis=$(jq '.security_analysis' <<< "$pr_data")
  
  # Check for vulnerabilities
  local vulnerabilities=$(jq -r '.vulnerabilities_found' <<< "$security_analysis")
  if [ "$vulnerabilities" -gt 0 ]; then
    echo "❌ Security vulnerabilities detected ($vulnerabilities)"
    return 1
  fi
  
  # Check security hotspots
  local hotspots=$(jq -r '.security_hotspots | length' <<< "$security_analysis")
  local max_hotspots=$(jq -r '.max_security_hotspots // 5' <<< "$quality_config")
  
  if [ "$hotspots" -gt "$max_hotspots" ]; then
    echo "❌ Too many security hotspots ($hotspots > $max_hotspots)"
    return 1
  fi
  
  # Validate authentication/authorization changes require review
  local auth_changes=$(jq -r '.authentication_changes or .authorization_changes' <<< "$security_analysis")
  if [ "$auth_changes" = "true" ]; then
    local security_review_assigned=$(check_security_review_assigned "$pr_data")
    if [ "$security_review_assigned" = "false" ]; then
      echo "❌ Authentication/authorization changes require security team review"
      return 1
    fi
  fi
  
  echo "✅ Security validation passed"
  return 0
}

# Check if security review is assigned
check_security_review_assigned() {
  local pr_data="$1"
  
  # Check if security team is assigned as reviewer
  local reviewers=$(jq -r '.metadata.reviewers[]?' <<< "$pr_data")
  local teams=$(jq -r '.metadata.teams[]?' <<< "$pr_data")
  
  # Check for security team in teams
  if echo "$teams" | grep -q "security"; then
    echo "true"
    return 0
  fi
  
  # Check for security-related reviewers
  if echo "$reviewers" | grep -q -E "(security|sec-)"; then
    echo "true"
    return 0
  fi
  
  echo "false"
  return 1
}
```

### Documentation Validation
```bash
# Validate documentation requirements
validate_documentation_requirements() {
  local pr_data="$1"
  local quality_config="$2"
  
  echo "📚 Validating Documentation Requirements..."
  
  # Check if API changes have documentation
  local api_changes=$(jq '.impact_assessment.api_changes' <<< "$pr_data")
  local has_api_changes=$(jq -r '.new_endpoints + .modified_endpoints + .removed_endpoints | length > 0' <<< "$api_changes")
  
  if [ "$has_api_changes" = "true" ]; then
    local api_docs_updated=$(check_api_documentation_updated "$pr_data")
    if [ "$api_docs_updated" = "false" ]; then
      echo "❌ API changes detected but no API documentation updates found"
      return 1
    fi
  fi
  
  # Check if breaking changes have migration guide
  local breaking_changes=$(jq -r '.impact_assessment.breaking_changes' <<< "$pr_data")
  if [ "$breaking_changes" = "true" ]; then
    local migration_guide_present=$(check_migration_guide_present "$pr_data")
    if [ "$migration_guide_present" = "false" ]; then
      echo "❌ Breaking changes detected but no migration guide provided"
      return 1
    fi
  fi
  
  # Check README updates for significant changes
  local change_significance=$(assess_change_significance "$pr_data")
  if [ "$change_significance" = "high" ]; then
    local readme_updated=$(check_readme_updated "$pr_data")
    if [ "$readme_updated" = "false" ]; then
      echo "⚠️  Significant changes detected - consider updating README"
    fi
  fi
  
  echo "✅ Documentation validation passed"
  return 0
}

# Check if API documentation is updated
check_api_documentation_updated() {
  local pr_data="$1"
  
  # Check for documentation file changes
  local doc_files=$(jq -r '.change_breakdown.documentation.added[], .change_breakdown.documentation.modified[]' <<< "$pr_data")
  
  # Look for API documentation patterns
  if echo "$doc_files" | grep -q -E "(api|swagger|openapi|docs/api)"; then
    echo "true"
  else
    echo "false"
  fi
}

# Assess significance of changes
assess_change_significance() {
  local pr_data="$1"
  
  local lines_changed=$(jq -r '.analysis_summary.lines_added + .analysis_summary.lines_deleted' <<< "$pr_data")
  local files_changed=$(jq -r '.analysis_summary.files_changed' <<< "$pr_data")
  local breaking_changes=$(jq -r '.impact_assessment.breaking_changes' <<< "$pr_data")
  local api_changes=$(jq -r '.impact_assessment.api_changes.new_endpoints + .impact_assessment.api_changes.modified_endpoints | length > 0' <<< "$pr_data")
  
  # High significance criteria
  if [ "$lines_changed" -gt 500 ] || [ "$files_changed" -gt 20 ] || [ "$breaking_changes" = "true" ] || [ "$api_changes" = "true" ]; then
    echo "high"
  elif [ "$lines_changed" -gt 100 ] || [ "$files_changed" -gt 5 ]; then
    echo "medium"
  else
    echo "low"
  fi
}
```

### Branch and CI Validation
```bash
# Validate branch status and CI
validate_branch_and_ci() {
  local pr_data="$1"
  local branch_name="$2"
  local target_branch="$3"
  
  echo "🌿 Validating Branch and CI Status..."
  
  # Check if branch is up to date
  local branch_status=$(check_branch_status "$branch_name" "$target_branch")
  if [ "$branch_status" != "up_to_date" ]; then
    echo "❌ Branch is not up to date with $target_branch"
    return 1
  fi
  
  # Check for merge conflicts
  local merge_conflicts=$(check_merge_conflicts "$branch_name" "$target_branch")
  if [ "$merge_conflicts" = "true" ]; then
    echo "❌ Merge conflicts detected"
    return 1
  fi
  
  # Check CI status
  local ci_status=$(check_ci_status "$branch_name")
  case "$ci_status" in
    "passing")
      echo "✅ CI checks passing"
      ;;
    "failing")
      echo "❌ CI checks failing"
      return 1
      ;;
    "pending")
      echo "⏳ CI checks pending - waiting for completion"
      return 1
      ;;
    "not_run")
      echo "⚠️  CI checks not yet run"
      return 1
      ;;
  esac
  
  echo "✅ Branch and CI validation passed"
  return 0
}

# Check branch status against target
check_branch_status() {
  local branch_name="$1"
  local target_branch="$2"
  
  # Fetch latest changes
  git fetch origin "$target_branch" >/dev/null 2>&1
  
  # Check if branch can be fast-forwarded to target
  local merge_base=$(git merge-base "$branch_name" "origin/$target_branch")
  local target_commit=$(git rev-parse "origin/$target_branch")
  
  if [ "$merge_base" = "$target_commit" ]; then
    echo "up_to_date"
  else
    echo "behind"
  fi
}

# Check for merge conflicts
check_merge_conflicts() {
  local branch_name="$1"
  local target_branch="$2"
  
  # Try a test merge
  git merge-tree "$(git merge-base "$branch_name" "origin/$target_branch")" "$branch_name" "origin/$target_branch" | grep -q "<<<<<<< "
  
  if [ $? -eq 0 ]; then
    echo "true"
  else
    echo "false"
  fi
}

# Check CI status
check_ci_status() {
  local branch_name="$1"
  
  # This would integrate with actual CI system (GitHub Actions, Jenkins, etc.)
  # For example, using GitHub API:
  # gh api repos/:owner/:repo/commits/$branch_name/status --jq '.state'
  
  # Placeholder implementation
  echo "passing"
}
```

## Validation Configuration

### Quality Configuration Schema
```json
{
  "quality_gates": {
    "code_quality": {
      "max_eslint_issues": 0,
      "max_typescript_errors": 0,
      "min_maintainability_index": 70,
      "max_complexity_score": 10
    },
    "test_coverage": {
      "min_overall_coverage": 80,
      "min_changed_files_coverage": 90,
      "min_new_files_coverage": 95
    },
    "security": {
      "max_vulnerabilities": 0,
      "max_security_hotspots": 5,
      "require_security_review_for_auth": true
    },
    "documentation": {
      "require_api_docs_for_api_changes": true,
      "require_migration_guide_for_breaking_changes": true,
      "require_readme_update_for_significant_changes": false
    },
    "branch_requirements": {
      "require_up_to_date_branch": true,
      "require_passing_ci": true,
      "allow_merge_conflicts": false
    }
  },
  "validation_rules": {
    "required_labels": ["type", "size"],
    "required_reviewers": {
      "min_count": 1,
      "require_codeowner_approval": true
    },
    "required_content_sections": [
      "summary",
      "testing_instructions",
      "reviewer_checklist"
    ]
  }
}
```

### Validation Report Generation
```json
{
  "validation_summary": {
    "overall_status": "passed",
    "total_checks": 15,
    "passed_checks": 15,
    "failed_checks": 0,
    "warnings": 1
  },
  "validation_results": {
    "code_quality": {
      "status": "passed",
      "checks": {
        "eslint_issues": "passed",
        "typescript_errors": "passed",
        "maintainability_index": "passed"
      }
    },
    "test_coverage": {
      "status": "passed",
      "checks": {
        "overall_coverage": "passed",
        "changed_files_coverage": "passed",
        "new_files_coverage": "passed"
      }
    },
    "security": {
      "status": "passed",
      "checks": {
        "vulnerabilities": "passed",
        "security_hotspots": "passed",
        "security_review": "passed"
      }
    },
    "documentation": {
      "status": "warning",
      "checks": {
        "api_documentation": "passed",
        "migration_guide": "n/a",
        "readme_update": "warning"
      }
    },
    "branch_and_ci": {
      "status": "passed",
      "checks": {
        "branch_up_to_date": "passed",
        "merge_conflicts": "passed",
        "ci_status": "passed"
      }
    }
  },
  "warnings": [
    "Consider updating README for significant changes"
  ],
  "recommendations": [
    "Add performance test for new API endpoint",
    "Consider adding integration test for authentication flow"
  ],
  "blocking_issues": [],
  "next_steps": [
    "PR is ready for creation",
    "Assign reviewers based on CODEOWNERS",
    "Monitor CI completion"
  ]
}
```

## Integration Points

### Input Sources
- **PR Analyzer**: Analysis results and metrics
- **PR Generator**: Generated content for validation
- **Quality Configuration**: Project-specific quality standards
- **CI/CD Systems**: Build and test status information

### Output Consumers
- **PR Create Orchestrator**: Validation results for decision making
- **Development Team**: Validation feedback and recommendations
- **Quality Dashboard**: Validation metrics and trends

## Tools and Technologies

### Validation Tools
- **ESLint**: Code quality and style validation
- **Jest/Coverage**: Test coverage analysis
- **SonarQube**: Comprehensive code quality assessment
- **Security scanners**: Vulnerability and security validation

### Integration APIs
- **GitHub API**: CI status and branch information
- **GitLab API**: Merge request validation
- **Jenkins API**: Build status verification
- **Quality tool APIs**: Metric collection and validation