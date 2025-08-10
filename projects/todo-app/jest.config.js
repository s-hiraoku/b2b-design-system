/** @type {import('jest').Config} */
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': '<rootDir>/src/tests/utilities/__mocks__/style-mock.js',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
    }],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/tests/**/*',
    '!src/main.tsx',
    '!src/vite-env.d.ts'
  ],
  coverageThreshold: {
    global: {
      lines: 95,
      branches: 90,
      functions: 95,
      statements: 95
    }
  },
  testMatch: [
    '<rootDir>/src/**/*.test.{ts,tsx}',
    '<rootDir>/src/tests/**/*.test.{ts,tsx}'
  ],
  // Enhanced testing configuration - optimized for low disk space
  testTimeout: 10000,
  verbose: false,
  maxWorkers: 1,
  cache: false,
  clearMocks: true,
  restoreMocks: true,
  
  // Improved async handling
  testEnvironmentOptions: {
    url: 'http://localhost:3000'
  },
  
  // Enhanced test configuration without optional dependencies
  passWithNoTests: false,
  collectCoverage: false, // Enable only when needed
  
  // Error handling
  errorOnDeprecated: false,
  
  // Coverage reporting
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov',
    'json-summary'
  ],
  
  // Global setup for timezone consistency
  globals: {
    'ts-jest': {
      useESM: true,
      isolatedModules: true
    }
  }
};