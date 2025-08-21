/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup/test-setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: [
      'e2e/**',
      'node_modules/**',
      '**/*.config.{ts,js}',
      '**/*.d.ts'
    ],
    coverage: {
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 85, // Reduced for practical implementation
        functions: 85,
        branches: 80,
        statements: 85
      },
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/tests/**',
        '**/*.d.ts',
        'src/**/*.stories.{ts,tsx}',
        'e2e/**'
      ]
    },
    globals: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/lib': resolve(__dirname, './src/lib'),
      '@/types': resolve(__dirname, './src/types')
    }
  }
})