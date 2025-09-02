import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup/test-setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/tests/**/*',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.stories.{ts,tsx}',
        'src/**/*.d.ts',
        'src/types/**/*',
        'node_modules/**',
        'dist/**',
        '.storybook/**',
        'storybook-static/**',
      ],
      thresholds: {
        global: {
          lines: 90,
          branches: 90,
          functions: 95,
          statements: 90,
        },
      },
      all: true,
    },
    // Performance testing configuration
    testTimeout: 10000,
    hookTimeout: 10000,
    // Test file patterns
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    exclude: [
      'node_modules/**',
      'dist/**',
      '.storybook/**',
      'storybook-static/**',
      'coverage/**',
      'playwright/**',
      'test-results/**',
      'playwright-report/**',
    ],
    // Browser-like environment configuration
    pool: 'forks',
    isolate: true,
    // Watch mode configuration
    watch: {
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['dist/**', 'coverage/**'],
    },
    // Reporter configuration
    reporter: ['verbose', 'json', 'html'],
    outputFile: {
      json: './test-results/vitest-results.json',
      html: './test-results/index.html',
    },
    // Mock configuration
    mockReset: true,
    clearMocks: true,
    restoreMocks: true,
  },
  // Vite-specific configuration for tests
  define: {
    'process.env.NODE_ENV': '"test"',
  },
  esbuild: {
    // Preserve JSX for better error messages in tests
    jsx: 'preserve',
  },
});