/**
 * CI/CD Test Configuration
 * Enhanced test configuration for continuous integration
 */

/**
 * Jest configuration for CI environments
 */
const ciConfig = {
  // Enhanced reporting for CI
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './coverage/junit',
      outputName: 'junit.xml',
      usePathForSuiteName: true,
      suiteNameTemplate: '{filepath}',
      classNameTemplate: '{classname}',
      titleTemplate: '{title}',
    }]
  ],
  
  // Coverage configuration for CI
  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov',
    'cobertura',
    'json-summary'
  ],
  
  // Enforce coverage thresholds in CI
  coverageThreshold: {
    global: {
      lines: 95,
      branches: 90,
      functions: 95,
      statements: 95
    }
  },
  
  // Performance optimization for CI
  maxWorkers: process.env.CI ? 2 : '50%',
  cache: !process.env.CI,
  
  // Enhanced error reporting
  verbose: process.env.CI ? false : true,
  silent: process.env.CI ? false : false,
  
  // Fail fast in CI
  bail: process.env.CI ? 1 : 0,
  
  // Timeout configuration for CI
  testTimeout: process.env.CI ? 30000 : 10000,
  
  // Retry configuration for CI
  retry: process.env.CI ? 2 : 0,
};

/**
 * Test environment detection
 */
const isCI = process.env.CI === 'true';
const isLocal = !isCI;
const isWatch = process.argv.includes('--watch');

/**
 * Quality gates configuration
 */
const qualityGates = {
  // Test success rate threshold (95%)
  minTestSuccessRate: 95,
  
  // Performance thresholds
  maxTestDuration: 30000, // 30 seconds max per test
  maxSuiteDuration: 300000, // 5 minutes max per test suite
  
  // Memory usage thresholds
  maxMemoryUsage: 512 * 1024 * 1024, // 512MB
  
  // Coverage enforcement
  enforceThresholds: isCI,
  
  // Flaky test detection
  maxRetries: isCI ? 2 : 0,
  flakyTestThreshold: 0.1, // 10% failure rate indicates flaky test
};

/**
 * Test environment configuration
 */
const testEnvironmentConfig = {
  // Environment detection
  environment: {
    isCI,
    isLocal,
    isWatch,
    isCoverage: process.argv.includes('--coverage'),
    isDebug: process.env.DEBUG_TESTS === 'true',
  },
  
  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || (isCI ? 'error' : 'info'),
    enableTestLogs: !isCI,
    enablePerformanceLogs: isCI,
  },
  
  // Resource management
  resources: {
    timeouts: {
      test: isCI ? 30000 : 10000,
      hook: isCI ? 15000 : 5000,
      async: isCI ? 20000 : 10000,
    },
    
    memory: {
      limit: qualityGates.maxMemoryUsage,
      warning: qualityGates.maxMemoryUsage * 0.8,
    },
    
    workers: {
      max: isCI ? 2 : 4,
      min: 1,
    },
  },
  
  // Error handling
  errorHandling: {
    captureConsoleErrors: true,
    captureUnhandledRejections: true,
    failOnConsoleError: isCI,
    suppressWarnings: isCI,
  },
};

/**
 * CI-specific test setup
 */
const setupCI = () => {
  if (!isCI) return;
  
  // Suppress console output in CI
  const originalLog = console.log;
  const originalWarn = console.warn;
  
  console.log = (...args) => {
    if (args[0]?.includes?.('[TEST]') || process.env.DEBUG_TESTS) {
      originalLog.apply(console, args);
    }
  };
  
  console.warn = (...args) => {
    if (!args[0]?.includes?.('act')) {
      originalWarn.apply(console, args);
    }
  };
  
  // Set up performance monitoring
  const testStartTimes = new Map();
  
  global.beforeEach = ((originalBeforeEach) => {
    return (fn) => {
      originalBeforeEach(() => {
        const testName = expect.getState().currentTestName;
        testStartTimes.set(testName, Date.now());
        return fn();
      });
    };
  })(global.beforeEach);
  
  global.afterEach = ((originalAfterEach) => {
    return (fn) => {
      originalAfterEach(() => {
        const testName = expect.getState().currentTestName;
        const startTime = testStartTimes.get(testName);
        if (startTime) {
          const duration = Date.now() - startTime;
          if (duration > qualityGates.maxTestDuration) {
            console.warn(`[PERFORMANCE WARNING] Test "${testName}" took ${duration}ms`);
          }
          testStartTimes.delete(testName);
        }
        return fn();
      });
    };
  })(global.afterEach);
};

/**
 * Test reporting utilities
 */
const testReporting = {
  /**
   * Generate test summary report
   */
  generateSummary: (results) => {
    const summary = {
      timestamp: new Date().toISOString(),
      environment: testEnvironmentConfig.environment,
      results: {
        total: results.numTotalTests,
        passed: results.numPassedTests,
        failed: results.numFailedTests,
        skipped: results.numPendingTests,
        successRate: (results.numPassedTests / results.numTotalTests) * 100,
      },
      coverage: results.coverageMap ? {
        lines: results.coverageMap.getCoverageSummary().lines.pct,
        branches: results.coverageMap.getCoverageSummary().branches.pct,
        functions: results.coverageMap.getCoverageSummary().functions.pct,
        statements: results.coverageMap.getCoverageSummary().statements.pct,
      } : null,
      performance: {
        duration: results.testResults.reduce((sum, test) => sum + test.duration, 0),
        slowestTests: results.testResults
          .sort((a, b) => b.duration - a.duration)
          .slice(0, 5)
          .map(test => ({
            name: test.testFilePath,
            duration: test.duration,
          })),
      },
    };
    
    return summary;
  },
  
  /**
   * Check if test results meet quality gates
   */
  checkQualityGates: (summary) => {
    const failures = [];
    
    // Check success rate
    if (summary.results.successRate < qualityGates.minTestSuccessRate) {
      failures.push(`Test success rate ${summary.results.successRate}% is below threshold ${qualityGates.minTestSuccessRate}%`);
    }
    
    // Check coverage if available
    if (summary.coverage && qualityGates.enforceThresholds) {
      const thresholds = ciConfig.coverageThreshold.global;
      
      Object.entries(thresholds).forEach(([metric, threshold]) => {
        if (summary.coverage[metric] < threshold) {
          failures.push(`Coverage ${metric} ${summary.coverage[metric]}% is below threshold ${threshold}%`);
        }
      });
    }
    
    return {
      passed: failures.length === 0,
      failures,
    };
  },
};

// Initialize CI setup
setupCI();

module.exports = {
  ciConfig,
  qualityGates,
  testEnvironmentConfig,
  testReporting,
};