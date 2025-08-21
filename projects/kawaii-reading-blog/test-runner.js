#!/usr/bin/env node

/**
 * Comprehensive Test Runner for Kawaii Reading Blog
 * Runs all test suites with proper reporting
 */

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

class TestRunner {
  constructor() {
    this.results = {
      unit: null,
      coverage: null,
      lint: null,
      typeCheck: null,
      performance: null
    };
    this.startTime = Date.now();
  }

  async runCommand(command, description) {
    return new Promise((resolve) => {
      console.log(`\n🧪 ${description}...`);
      console.log(`📝 Running: ${command}\n`);
      
      const child = exec(command, { 
        cwd: process.cwd(),
        maxBuffer: 1024 * 1024 * 10 // 10MB buffer
      });
      
      let stdout = '';
      let stderr = '';
      
      child.stdout?.on('data', (data) => {
        stdout += data;
        process.stdout.write(data);
      });
      
      child.stderr?.on('data', (data) => {
        stderr += data;
        process.stderr.write(data);
      });
      
      child.on('close', (code) => {
        resolve({
          code,
          stdout,
          stderr,
          success: code === 0
        });
      });

      child.on('error', (error) => {
        resolve({
          code: 1,
          stdout,
          stderr: error.message,
          success: false
        });
      });
    });
  }

  async runUnitTests() {
    const result = await this.runCommand(
      'npm test -- --run --reporter=verbose',
      'Running Unit Tests'
    );
    this.results.unit = result;
    return result;
  }

  async runCoverageTests() {
    const result = await this.runCommand(
      'npm run test:coverage -- --run --reporter=verbose',
      'Running Coverage Analysis'
    );
    this.results.coverage = result;
    return result;
  }

  async runLinting() {
    const result = await this.runCommand(
      'npm run lint',
      'Running ESLint Code Quality Check'
    );
    this.results.lint = result;
    return result;
  }

  async runTypeCheck() {
    const result = await this.runCommand(
      'npm run type-check',
      'Running TypeScript Type Check'
    );
    this.results.typeCheck = result;
    return result;
  }

  generateReport() {
    const duration = ((Date.now() - this.startTime) / 1000).toFixed(2);
    
    console.log('\n' + '='.repeat(80));
    console.log('🌸 KAWAII READING BLOG - COMPREHENSIVE TEST REPORT 🌸');
    console.log('='.repeat(80));
    console.log(`⏱️  Total Duration: ${duration}s`);
    console.log(`📅 Generated: ${new Date().toISOString()}`);
    
    const sections = [
      { name: 'Unit Tests', key: 'unit', emoji: '🧪' },
      { name: 'Coverage Analysis', key: 'coverage', emoji: '📊' },
      { name: 'Code Quality (ESLint)', key: 'lint', emoji: '🔍' },
      { name: 'Type Checking', key: 'typeCheck', emoji: '📝' }
    ];

    let allPassed = true;
    
    sections.forEach(({ name, key, emoji }) => {
      const result = this.results[key];
      if (result) {
        const status = result.success ? '✅ PASS' : '❌ FAIL';
        console.log(`${emoji} ${name}: ${status}`);
        if (!result.success) {
          allPassed = false;
          console.log(`   └─ Exit Code: ${result.code}`);
        }
      } else {
        console.log(`${emoji} ${name}: ⏭️  SKIPPED`);
      }
    });

    console.log('\n' + '-'.repeat(80));
    
    if (allPassed) {
      console.log('🎉 ALL TESTS PASSED! Kawaii Reading Blog is production ready! 🎉');
      console.log('✨ Ready for Phase 6.2: Execution Verification');
    } else {
      console.log('💔 Some tests failed. Please review the output above.');
      console.log('🔧 Fix issues before proceeding to execution verification.');
    }
    
    console.log('-'.repeat(80));
    
    // Extract coverage information if available
    if (this.results.coverage?.stdout) {
      const coverageMatch = this.results.coverage.stdout.match(/All files\s+\|\s+([0-9.]+)\s+\|\s+([0-9.]+)\s+\|\s+([0-9.]+)\s+\|\s+([0-9.]+)/);
      if (coverageMatch) {
        console.log('\n📊 COVERAGE METRICS:');
        console.log(`   Lines: ${coverageMatch[1]}%`);
        console.log(`   Functions: ${coverageMatch[2]}%`);
        console.log(`   Branches: ${coverageMatch[3]}%`);
        console.log(`   Statements: ${coverageMatch[4]}%`);
      }
    }

    return allPassed;
  }
}

async function main() {
  const runner = new TestRunner();
  
  console.log('🌸 Starting Comprehensive Test Suite for Kawaii Reading Blog 🌸\n');
  
  try {
    // Run all test suites
    await runner.runUnitTests();
    await runner.runCoverageTests();
    await runner.runLinting();
    await runner.runTypeCheck();
    
    // Generate final report
    const allPassed = runner.generateReport();
    
    // Exit with appropriate code
    process.exit(allPassed ? 0 : 1);
    
  } catch (error) {
    console.error('\n❌ Test runner encountered an error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { TestRunner };