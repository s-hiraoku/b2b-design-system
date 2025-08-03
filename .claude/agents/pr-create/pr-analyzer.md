# PR Analyzer Agent

## Purpose
Specialized agent for comprehensive analysis of code changes, impact assessment, and preparation of analytical data for pull request creation.

## Role
- **Change Analysis**: Detailed analysis of code changes and modifications
- **Impact Assessment**: Evaluate potential impact on system components
- **Quality Metrics**: Assess code quality, test coverage, and performance implications
- **Risk Evaluation**: Identify potential risks and security considerations

## Core Responsibilities

### 1. Code Change Analysis
- Analyze git diff and commit history
- Identify modified, added, and deleted files
- Categorize changes by type (feature, bugfix, refactor, etc.)
- Map changes to system components and modules

### 2. Impact Assessment
- Identify affected system components and dependencies
- Analyze potential breaking changes
- Assess impact on APIs and interfaces
- Evaluate effects on system performance and scalability

### 3. Quality and Coverage Analysis
- Calculate test coverage for changed code
- Assess code quality metrics and standards compliance
- Identify missing tests or documentation
- Evaluate technical debt implications

### 4. Security and Risk Analysis
- Identify security-sensitive changes
- Assess potential security vulnerabilities
- Evaluate compliance with security standards
- Identify areas requiring security review

## Key Capabilities

### Git Analysis
```bash
# Comprehensive git analysis
analyze_git_changes() {
  local target_branch="$1"
  
  echo "📊 Analyzing Git Changes..."
  
  # Get commit history
  COMMIT_HISTORY=$(git log --oneline "$target_branch"..HEAD)
  
  # Analyze file changes
  CHANGED_FILES=$(git diff --name-status "$target_branch"..HEAD)
  
  # Get detailed diff
  DETAILED_DIFF=$(git diff "$target_branch"..HEAD)
  
  # Calculate change statistics
  CHANGE_STATS=$(git diff --stat "$target_branch"..HEAD)
  
  # Identify change types
  classify_change_types "$CHANGED_FILES"
  
  echo "✅ Git analysis complete"
}

# Classify types of changes
classify_change_types() {
  local changed_files="$1"
  
  # Categorize by file types and patterns
  while IFS= read -r line; do
    local status=$(echo "$line" | cut -f1)
    local file=$(echo "$line" | cut -f2)
    
    case "$file" in
      *.js|*.ts|*.jsx|*.tsx)
        classify_code_change "$status" "$file"
        ;;
      *.test.*|*.spec.*)
        classify_test_change "$status" "$file"
        ;;
      *.md|*.txt|docs/*)
        classify_documentation_change "$status" "$file"
        ;;
      package.json|yarn.lock|pnpm-lock.yaml)
        classify_dependency_change "$status" "$file"
        ;;
      *.sql|migrations/*)
        classify_database_change "$status" "$file"
        ;;
    esac
  done <<< "$changed_files"
}
```

### Impact Assessment
```bash
# Assess system impact
assess_system_impact() {
  local changed_files="$1"
  
  echo "🎯 Assessing System Impact..."
  
  # Identify affected modules
  identify_affected_modules "$changed_files"
  
  # Analyze API changes
  analyze_api_changes "$changed_files"
  
  # Check breaking changes
  detect_breaking_changes "$changed_files"
  
  # Assess performance implications
  analyze_performance_impact "$changed_files"
  
  # Evaluate security implications
  assess_security_impact "$changed_files"
}

# Identify affected system modules
identify_affected_modules() {
  local changed_files="$1"
  
  local affected_modules=()
  
  while IFS= read -r file; do
    case "$file" in
      src/auth/*)
        affected_modules+=("authentication")
        ;;
      src/api/*)
        affected_modules+=("api_layer")
        ;;
      src/database/*)
        affected_modules+=("database")
        ;;
      src/ui/*)
        affected_modules+=("user_interface")
        ;;
      src/services/*)
        affected_modules+=("business_logic")
        ;;
    esac
  done <<< "$changed_files"
  
  # Remove duplicates and report
  printf '%s\n' "${affected_modules[@]}" | sort -u
}

# Detect potential breaking changes
detect_breaking_changes() {
  local changed_files="$1"
  
  echo "⚠️  Checking for Breaking Changes..."
  
  # Check for API signature changes
  check_api_signature_changes "$changed_files"
  
  # Check for database schema changes
  check_schema_changes "$changed_files"
  
  # Check for configuration changes
  check_config_changes "$changed_files"
  
  # Check for dependency version changes
  check_dependency_version_changes "$changed_files"
}
```

### Quality Analysis
```bash
# Analyze code quality metrics
analyze_code_quality() {
  local changed_files="$1"
  
  echo "📏 Analyzing Code Quality..."
  
  # Calculate test coverage
  calculate_test_coverage "$changed_files"
  
  # Run linting analysis
  run_linting_analysis "$changed_files"
  
  # Assess code complexity
  assess_code_complexity "$changed_files"
  
  # Check coding standards compliance
  check_coding_standards "$changed_files"
  
  # Identify technical debt
  identify_technical_debt "$changed_files"
}

# Calculate test coverage for changes
calculate_test_coverage() {
  local changed_files="$1"
  
  echo "🧪 Calculating Test Coverage..."
  
  # Run coverage analysis
  npm run test:coverage > coverage_report.txt 2>&1
  
  # Extract coverage for changed files
  local total_coverage=0
  local covered_lines=0
  local total_lines=0
  
  while IFS= read -r file; do
    if [[ "$file" =~ \.(js|ts|jsx|tsx)$ ]]; then
      local file_coverage=$(extract_file_coverage "$file")
      covered_lines=$((covered_lines + file_coverage.covered))
      total_lines=$((total_lines + file_coverage.total))
    fi
  done <<< "$changed_files"
  
  if [ "$total_lines" -gt 0 ]; then
    total_coverage=$((covered_lines * 100 / total_lines))
  fi
  
  echo "Coverage for changed files: ${total_coverage}%"
}

# Assess code complexity
assess_code_complexity() {
  local changed_files="$1"
  
  echo "🔍 Assessing Code Complexity..."
  
  # Run complexity analysis (e.g., using ESLint complexity rules)
  local high_complexity_files=()
  
  while IFS= read -r file; do
    if [[ "$file" =~ \.(js|ts|jsx|tsx)$ ]]; then
      local complexity=$(calculate_cyclomatic_complexity "$file")
      if [ "$complexity" -gt 10 ]; then
        high_complexity_files+=("$file:$complexity")
      fi
    fi
  done <<< "$changed_files"
  
  if [ ${#high_complexity_files[@]} -gt 0 ]; then
    echo "⚠️  High complexity files detected:"
    printf '%s\n' "${high_complexity_files[@]}"
  fi
}
```

### Security Analysis
```bash
# Perform security analysis
perform_security_analysis() {
  local changed_files="$1"
  
  echo "🔒 Performing Security Analysis..."
  
  # Check for sensitive data exposure
  check_sensitive_data_exposure "$changed_files"
  
  # Analyze authentication/authorization changes
  analyze_auth_changes "$changed_files"
  
  # Check for SQL injection vulnerabilities
  check_sql_injection_risks "$changed_files"
  
  # Analyze input validation
  analyze_input_validation "$changed_files"
  
  # Check for secrets in code
  check_secrets_exposure "$changed_files"
}

# Check for sensitive data exposure
check_sensitive_data_exposure() {
  local changed_files="$1"
  
  # Patterns that might indicate sensitive data
  local sensitive_patterns=(
    "password"
    "secret"
    "api_key"
    "private_key"
    "access_token"
    "credit_card"
    "ssn"
    "social_security"
  )
  
  local security_issues=()
  
  for pattern in "${sensitive_patterns[@]}"; do
    local matches=$(grep -i "$pattern" $changed_files 2>/dev/null || true)
    if [ -n "$matches" ]; then
      security_issues+=("Potential sensitive data: $pattern")
    fi
  done
  
  if [ ${#security_issues[@]} -gt 0 ]; then
    echo "🚨 Security concerns detected:"
    printf '%s\n' "${security_issues[@]}"
  fi
}
```

## Analysis Report Generation

### Comprehensive Analysis Report
```json
{
  "analysis_summary": {
    "total_commits": 12,
    "files_changed": 15,
    "lines_added": 234,
    "lines_deleted": 89,
    "change_type": "feature_addition",
    "risk_level": "medium"
  },
  "change_breakdown": {
    "source_files": {
      "added": ["src/auth/oauth.ts", "src/auth/middleware.ts"],
      "modified": ["src/auth/index.ts", "src/api/routes.ts"],
      "deleted": []
    },
    "test_files": {
      "added": ["tests/auth/oauth.test.ts"],
      "modified": ["tests/auth/index.test.ts"],
      "deleted": []
    },
    "documentation": {
      "added": ["docs/auth/oauth-setup.md"],
      "modified": ["README.md"],
      "deleted": []
    }
  },
  "impact_assessment": {
    "affected_modules": [
      "authentication",
      "api_layer",
      "user_management"
    ],
    "breaking_changes": false,
    "api_changes": {
      "new_endpoints": ["/auth/oauth/callback"],
      "modified_endpoints": ["/auth/login"],
      "removed_endpoints": []
    },
    "database_changes": false,
    "configuration_changes": true
  },
  "quality_metrics": {
    "test_coverage": {
      "overall": "92.5%",
      "changed_files": "95.2%",
      "new_files": "98.1%"
    },
    "code_quality": {
      "eslint_issues": 0,
      "typescript_errors": 0,
      "complexity_score": "A",
      "maintainability_index": 85
    },
    "technical_debt": {
      "new_debt": "2 hours",
      "debt_ratio": "5.2%",
      "hotspots": []
    }
  },
  "security_analysis": {
    "vulnerabilities_found": 0,
    "security_hotspots": [
      {
        "file": "src/auth/oauth.ts",
        "line": 45,
        "severity": "low",
        "description": "Ensure OAuth tokens are properly validated"
      }
    ],
    "authentication_changes": true,
    "authorization_changes": false,
    "data_protection_compliance": true
  },
  "performance_implications": {
    "potential_performance_impact": "low",
    "new_dependencies": ["oauth2-lib"],
    "bundle_size_impact": "+2.3KB",
    "database_queries": {
      "new_queries": 2,
      "optimized_queries": 0,
      "potential_n_plus_one": false
    }
  },
  "recommendations": [
    "Add integration tests for OAuth flow",
    "Document OAuth configuration in deployment guide",
    "Consider rate limiting for OAuth endpoints",
    "Review token expiration and refresh strategy"
  ],
  "required_reviews": [
    "Security team review for OAuth implementation",
    "Infrastructure team review for configuration changes"
  ]
}
```

### Risk Assessment Matrix
```yaml
Risk Assessment:
  High Risk Indicators:
    - Breaking API changes
    - Database schema modifications
    - Security-sensitive code changes
    - Performance-critical path modifications
  
  Medium Risk Indicators:
    - New feature additions
    - Configuration changes
    - Dependency updates
    - Authentication/authorization changes
  
  Low Risk Indicators:
    - Documentation updates
    - Test additions
    - Code formatting changes
    - Non-breaking refactoring
```

## Integration Points

### Input Sources
- **Git Repository**: Branch comparison and commit analysis
- **Code Quality Tools**: ESLint, SonarQube, CodeClimate results
- **Test Coverage**: Jest, Mocha, or other test runner coverage reports
- **Security Tools**: Security scanner results and vulnerability assessments

### Output Consumers
- **PR Generator**: Analysis results for content generation
- **PR Validator**: Quality metrics for validation decisions
- **Development Team**: Comprehensive analysis reports for review

## Tools and Technologies

### Analysis Tools
- **Git**: Branch comparison and change analysis
- **AST Parsers**: TypeScript/JavaScript code analysis
- **Coverage Tools**: Jest, NYC, Istanbul for coverage analysis
- **Complexity Tools**: ESLint complexity rules, plato

### Security Tools
- **ESLint Security**: Security-focused linting rules
- **Semgrep**: Static analysis security scanner
- **npm audit**: Dependency vulnerability scanning
- **git-secrets**: Secret detection in commits

### Quality Tools
- **ESLint**: Code quality and style analysis
- **Prettier**: Code formatting analysis
- **TypeScript**: Type checking and error detection
- **SonarQube**: Comprehensive code quality analysis