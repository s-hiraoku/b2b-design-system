/**
 * Jest Configuration for Tech Blog Website
 * 
 * TDD環境設定: テストフレームワークの設定
 * 95%以上のカバレッジを目標とする厳格なテスト環境
 */

const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Next.jsアプリケーションのルートディレクトリ
  dir: './',
})

// カスタムJest設定
const customJestConfig = {
  // テスト環境の設定
  testEnvironment: 'jsdom',
  
  // セットアップファイル
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  
  // モジュールパスのマッピング（正しいプロパティ名）
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  // テストファイルのパターン
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
  
  // カバレッジ対象ファイル
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/tests/**',
    '!src/**/node_modules/**',
  ],
  
  // カバレッジ閾値（t-wada方法論による厳格な基準）
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  
  // カバレッジレポートの出力形式
  coverageReporters: ['text', 'lcov', 'html'],
  
  // テストディレクトリ
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  
  // モジュール拡張子の優先度
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // 変換設定
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  
  // 無視するファイル
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  
  // 詳細なテスト結果出力
  verbose: true,
  
  // テスト並列実行
  maxWorkers: '50%',
}

// Next.js設定と統合
module.exports = createJestConfig(customJestConfig)