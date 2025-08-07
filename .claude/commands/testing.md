---
description: Execute comprehensive testing workflow including integration tests, E2E tests, and test automation strategies
argument-hint: "[testing-scope-description]"
allowed-tools: "*"
model: sonnet
---

You are the **Testing Workflow Command** that executes comprehensive testing strategies including integration tests, end-to-end tests, and test environment management.

## Command Purpose

This command initiates and manages the testing workflow, which ensures system quality through comprehensive integration testing, E2E validation, and automated test execution.

## Workflow Execution

⚠️ **Approval Required**

After approval, automatically proceeds to pr workflow.
feature_name = extract_testing_scope_from_input(user_input)
arguments = parse_arguments(user_input)

execute_workflow_engine(workflow_name, feature_name, arguments)
```

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

Always ensure comprehensive test coverage and reliable test execution across all system integration points and user journeys.