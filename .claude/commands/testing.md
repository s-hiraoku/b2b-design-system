---
description: Execute enterprise-grade comprehensive testing workflow with unified monitoring, error handling, and test automation strategies
argument-hint: "[testing-scope-description]"
allowed-tools: "*"
---

You are the **Enterprise Testing Workflow Command** that executes comprehensive testing strategies with enterprise monitoring, unified quality assurance, and comprehensive error handling including integration tests, end-to-end tests, and test environment management.

## Initial Setup: Current Date Information

**CRITICAL**: Always start by calling the date-utility agent to get accurate current date and time information for proper timestamping, search queries, and time-sensitive operations.

```bash
# First action: Get current date information
Task(subagent_type="date-utility", description="Get current date information", prompt="Please provide current date and time information for use in this testing workflow session, including search-appropriate year formatting.")

# Second action: User interaction guidelines reminder
Task(subagent_type="user-interaction-reminder", description="User interaction guidelines", prompt="Provide critical reminders about proper user interaction protocols for this testing workflow session.")
```

# Third action: Comprehensive project state analysis
Task(subagent_type="project-state-analyzer", description="Project state analysis", prompt="Perform comprehensive project state analysis including Kiro specs status, implementation progress, task completion, and workflow recommendations for this testing workflow session.")

## Command Purpose

This command initiates and manages the testing workflow, which ensures system quality through comprehensive integration testing, E2E validation, and automated test execution.

## Workflow Execution

⚠️ **Enterprise Approval & Monitoring Required**

This workflow follows enterprise approval checkpoints with real-time monitoring and comprehensive error recovery:
- `.cc-deck/config/workflows/testing.yaml` (main workflow)
- `.cc-deck/config/monitoring/unified-monitoring-standard.yaml` (monitoring)
- `.cc-deck/config/quality/unified-quality-assurance-standard.yaml` (quality gates)
- `.cc-deck/config/error-handling/unified-error-recovery-standard.yaml` (error handling)

**After Each Workflow Approval**: Immediately proceed to the next workflow as defined in the YAML configuration.

### Implementation Logic:

1. **Complete Current Workflow**: Execute all testing phases
2. **Wait for Human Approval**: Present comprehensive review materials
3. **Upon Approval**: Ask user for explicit permission to proceed to next workflow
4. **Request Confirmation**: "Proceed to PR workflow? (yes/no)"
5. **Wait for Permission**: Only continue after clear user confirmation

```bash
# After testing workflow completion and approval:
# 1. Read .cc-deck/config/workflows/testing.yaml
# 2. Find "next_workflow: pr" in the approval section
# 3. Immediately execute the next workflow command: /pr
# 4. Continue until acceptance workflow completes
```

### Execution Steps:

**CRITICAL**: Execute ALL phases sequentially using the specified agents. Do NOT skip phases.

1. **Phase 1**: test-strategy-planner (Develop comprehensive testing strategy)
2. **Phase 2**: test-environment-manager (Set up and configure test environments)
3. **Phase 3**: Intelligent routing to appropriate testing agent:
   - integration-test (API testing, service integration testing)
   - e2e-test (End-to-end user journey testing)
4. **Phase 4**: test-executor (Execute tests with monitoring and recovery)
5. **Phase 5**: test-reporter (Generate comprehensive test reports and analysis)
6. **Phase 6**: Human approval checkpoint - Review completed workflow

**Important**: Each phase must be completed by the designated agent before proceeding to the next phase.

## Testing Workflow Types

The workflow intelligently routes to appropriate testing strategies based on requirements:

### 🔗 Integration Testing Path

- **Use Case**: System integration validation, API testing, service interaction testing
- **Agents**: integration-test cluster (5 agents)
- **Focus**: Component integration, data flow validation, service communication

### 🎭 E2E Testing Path

- **Use Case**: User journey validation, UI automation, end-to-end workflows
- **Agents**: e2e-test cluster (3 agents)
- **Focus**: User experience validation, complete workflow testing, browser automation

## Integration Testing Workflow

### Phase 1: Test Strategy Planning

- **Agent**: test-strategy-planner
- **Purpose**: Develop comprehensive integration testing strategy
- **Activities**:
  - Test scope definition and boundary identification
  - Integration point mapping and dependency analysis
  - Test data requirements and environment specifications
- **Outputs**: Test strategy document, execution plan, resource requirements

### Phase 2: Test Environment Management

- **Agent**: test-environment-manager
- **Purpose**: Provision and configure testing infrastructure
- **Activities**:
  - Environment provisioning and service configuration
  - Test data setup and database initialization
  - Service mocking and external dependency management
- **Outputs**: Configured test environments, test data sets, infrastructure documentation

### Phase 3: Test Execution

- **Agent**: test-executor
- **Purpose**: Execute integration tests with monitoring and recovery
- **Capabilities**:
  - Parallel test execution with intelligent scheduling
  - Real-time monitoring and failure detection
  - Automatic retry mechanisms and recovery procedures
- **Outputs**: Test execution results, performance metrics, failure reports

### Phase 4: Test Reporting and Analysis

- **Agent**: test-reporter
- **Purpose**: Comprehensive analysis and actionable insights
- **Activities**:
  - Result aggregation and metrics computation
  - Trend analysis and quality assessment
  - Actionable recommendations and improvement suggestions
- **Outputs**: Test reports, quality dashboards, improvement recommendations

## E2E Testing Workflow

### Phase 1: E2E Test Planning

- **Agent**: e2e-test-planner
- **Purpose**: Design comprehensive user journey testing scenarios
- **Activities**:
  - User story mapping and scenario identification
  - Critical path analysis and coverage planning
  - Browser and device compatibility requirements
- **Outputs**: E2E test scenarios, coverage matrix, execution specifications

### Phase 2: E2E Test Execution

- **Agent**: e2e-test-runner
- **Purpose**: Execute browser-based end-to-end testing
- **Capabilities**:
  - Multi-browser testing with Playwright MCP integration
  - Visual regression testing and screenshot comparison
  - Performance monitoring during E2E execution
- **Outputs**: E2E test results, screenshots, performance data

## Usage Examples

```bash
# Comprehensive integration testing
/testing "Run full integration tests for user authentication and authorization system"

# API testing focus
/testing "Execute integration tests for REST API endpoints with database validation"

# E2E user journey testing
/testing "Perform end-to-end testing of e-commerce checkout flow from cart to payment"

# Performance and load testing
/testing "Execute integration tests with performance benchmarking for chat system"

# Cross-browser E2E validation
/testing "Run E2E tests across multiple browsers for responsive dashboard interface"

# Service integration testing
/testing "Validate microservice integration between user service and notification service"
```

## MCP Integration

### 🎭 Playwright MCP Integration

- **Purpose**: Advanced browser automation and E2E testing
- **Capabilities**: Multi-browser support, visual testing, performance monitoring
- **Use Cases**: UI automation, user journey validation, cross-browser compatibility

## Quality Metrics and Reporting

### Integration Testing Metrics

- **Test Coverage**: Component and integration coverage percentages
- **Pass Rate**: Test success rate and trend analysis
- **Performance**: Response times and throughput measurements
- **Reliability**: Test stability and flakiness metrics

### E2E Testing Metrics

- **User Journey Coverage**: Critical path validation completeness
- **Cross-Browser Compatibility**: Multi-browser test success rates
- **Visual Consistency**: Screenshot comparison and regression detection
- **Performance Impact**: User experience performance metrics

## Test Environment Management

### Environment Provisioning

- **Infrastructure**: Automated test environment setup
- **Configuration**: Service configuration and dependency management
- **Data Management**: Test data lifecycle and cleanup procedures
- **Isolation**: Environment isolation and parallel execution support

### Recovery and Monitoring

- **Failure Detection**: Real-time test failure identification
- **Automatic Recovery**: Intelligent retry mechanisms and error handling
- **Resource Monitoring**: Environment health and resource utilization
- **Cleanup Procedures**: Automated environment cleanup and reset

## Integration with Development Flow

- **Post-Development**: Natural follow-up to coding and refactoring phases
- **CI/CD Integration**: Seamless integration with continuous integration pipelines
- **Quality Gates**: Test results inform human approval decisions
- **Feedback Loop**: Test failures trigger development phase re-execution

Always ensure enterprise-grade comprehensive test coverage with unified monitoring, 5-dimension quality validation, and reliable test execution across all system integration points and user journeys with comprehensive error handling and real-time performance tracking.
