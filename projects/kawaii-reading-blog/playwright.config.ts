import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright Configuration for Kawaii Reading Blog E2E Tests
 * Optimized for visual regression testing and performance validation
 */
export default defineConfig({
  testDir: './e2e',
  
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
    ['json', { outputFile: 'test-results/results.json' }],
    process.env.CI ? ['github'] : ['list']
  ],
  
  /* Shared settings for all the projects below. */
  use: {
    /* Base URL for tests */
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    
    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',
    
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Video recording */
    video: 'retain-on-failure',
    
    /* Ignore HTTPS errors */
    ignoreHTTPSErrors: true,
    
    /* Set viewport size */
    viewport: { width: 1280, height: 720 }
  },

  /* Configure projects for major browsers */
  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile devices
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    // Tablet
    {
      name: 'Tablet',
      use: { ...devices['iPad Pro'] },
    }
  ],

  /* Performance and reliability settings */
  timeout: 30000, // 30 seconds per test
  expect: {
    /* Timeout for expect() calls */
    timeout: 10000,
    
    /* Visual comparison threshold */
    toHaveScreenshot: { 
      threshold: 0.2,
      mode: 'non-zero-diff'
    },
    
    /* Animation handling */
    toMatchSnapshot: { 
      animations: 'disabled' 
    }
  },

  /* Global setup and teardown */
  globalSetup: require.resolve('./e2e/global-setup.ts'),
  
  /* Test directory patterns */
  testMatch: [
    '**/e2e/**/*.spec.ts',
    '**/tests/**/*.e2e.ts'
  ],

  /* Ignore patterns */
  testIgnore: [
    '**/node_modules/**',
    '**/.next/**',
    '**/build/**'
  ],

  /* Web server for development */
  webServer: process.env.CI ? undefined : {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 2 minutes
    stdout: 'ignore',
    stderr: 'pipe'
  },

  /* Output directory for test artifacts */
  outputDir: 'test-results/',
  
  /* Metadata for reporting */
  metadata: {
    project: 'kawaii-reading-blog',
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'test',
    buildId: process.env.BUILD_ID,
    kawaii: '🌸'
  }
})