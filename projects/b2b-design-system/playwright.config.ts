import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './src/tests/e2e',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/playwright-results.json' }],
    ['junit', { outputFile: 'test-results/junit-results.xml' }],
  ],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:6006', // Storybook URL for component testing
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Take screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Capture video on failure */
    video: 'retain-on-failure',
    
    /* Accessibility testing */
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    
    /* Test against desktop browsers */
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // B2B enterprise browser requirements
        viewport: { width: 1920, height: 1080 },
      },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
      dependencies: ['setup'],
    },

    /* Test against enterprise tablet viewports */
    {
      name: 'tablet-chrome',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1024, height: 768 },
      },
      dependencies: ['setup'],
    },

    {
      name: 'tablet-safari',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1024, height: 768 },
      },
      dependencies: ['setup'],
    },

    /* Accessibility testing project */
    {
      name: 'accessibility',
      use: { 
        ...devices['Desktop Chrome'],
        // High contrast mode testing
        colorScheme: 'dark',
        reducedMotion: 'reduce',
      },
      dependencies: ['setup'],
      testDir: './src/tests/e2e/accessibility',
    },

    /* Performance testing project */
    {
      name: 'performance',
      use: { 
        ...devices['Desktop Chrome'],
        // Performance monitoring
        extraHTTPHeaders: {
          'Accept-Encoding': 'gzip, deflate',
        },
      },
      dependencies: ['setup'],
      testDir: './src/tests/e2e/performance',
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: 'npm run storybook',
      url: 'http://localhost:6006',
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000, // 2 minutes
    },
  ],

  /* Global setup and teardown */
  globalSetup: require.resolve('./src/tests/e2e/global-setup.ts'),
  globalTeardown: require.resolve('./src/tests/e2e/global-teardown.ts'),

  /* Test result directories */
  outputDir: 'test-results/',

  /* Expect settings */
  expect: {
    /* Maximum time expect() should wait for the condition to be met */
    timeout: 5000,
    
    /* Screenshot comparison threshold */
    threshold: 0.2,
    
    /* Visual comparison mode */
    mode: 'default',
  },

  /* Configure timeout and other settings */
  timeout: 30 * 1000, // 30 seconds per test
  
  /* Global test timeout */
  globalTimeout: 60 * 60 * 1000, // 1 hour for all tests
  
  /* Preserve output on failure for debugging */
  preserveOutput: 'failures-only',
  
  /* Metadata for test reports */
  metadata: {
    'Test Suite': 'B2B Design System E2E Tests',
    'Environment': process.env.NODE_ENV || 'test',
    'Browser Requirements': 'Chrome 90+, Firefox 88+, Safari 14+, Edge 90+',
    'Accessibility Standard': 'WCAG 2.1 AA',
    'Performance Budget': '<50KB bundle, <16ms render time',
  },
});