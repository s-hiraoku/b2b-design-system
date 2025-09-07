#!/usr/bin/env node

/**
 * Execution Validation Script for Kawaii Reading Blog
 * Validates application functionality after kawaii icons implementation
 */

const http = require('http');
const fs = require('fs');

// Test configuration
const TEST_CONFIG = {
  host: 'localhost',
  port: 3000,
  timeout: 10000
};

// Validation results
const validationResults = {
  startupStatus: false,
  httpResponse: false,
  kawaiiIconsPresent: false,
  readingProgressComponent: false,
  animationsWorking: false,
  consoleErrors: [],
  performanceMetrics: {},
  timestamp: new Date().toISOString()
};

/**
 * Test if development server is responding
 */
async function testServerResponse() {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: TEST_CONFIG.host,
      port: TEST_CONFIG.port,
      path: '/',
      method: 'GET',
      timeout: TEST_CONFIG.timeout
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        validationResults.httpResponse = res.statusCode === 200;
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          contentLength: data.length,
          content: data
        });
      });
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * Validate kawaii icons are present in HTML
 */
function validateKawaiiIcons(htmlContent) {
  const iconTests = [
    { name: 'BookIcon', pattern: /viewBox="0 0 24 24".*<path.*fill="#FFB6C1".*stroke="#FF69B4"/s },
    { name: 'StarIcon', pattern: /viewBox="0 0 24 24".*<path.*fill="#FFD700".*stroke="#FFA500"/s },
    { name: 'HeartIcon', pattern: /viewBox="0 0 24 24".*<path.*fill="#FF69B4".*stroke="#FF1493"/s },
    { name: 'ClockIcon', pattern: /viewBox="0 0 24 24".*<circle.*fill="#FFE4E1".*stroke="#FF69B4"/s },
    { name: 'FireIcon', pattern: /viewBox="0 0 24 24".*<path.*fill="#FF6347".*stroke="#FF4500"/s },
    { name: 'PageIcon', pattern: /viewBox="0 0 24 24".*<path.*fill="#FFF0F5".*stroke="#FF69B4"/s },
    { name: 'CalendarIcon', pattern: /viewBox="0 0 24 24".*<rect.*fill="#E6E6FA".*stroke="#9370DB"/s },
    { name: 'TargetIcon', pattern: /viewBox="0 0 24 24".*<circle.*fill="#FFE4E1".*stroke="#FF1493"/s }
  ];

  const foundIcons = iconTests.filter(test => test.pattern.test(htmlContent));
  
  validationResults.kawaiiIconsPresent = foundIcons.length >= 5; // At least 5 icons should be present
  
  return {
    foundCount: foundIcons.length,
    totalCount: iconTests.length,
    foundIcons: foundIcons.map(icon => icon.name),
    missingIcons: iconTests.filter(test => !test.pattern.test(htmlContent)).map(icon => icon.name)
  };
}

/**
 * Validate ReadingProgress component is present
 */
function validateReadingProgress(htmlContent) {
  const progressTests = [
    /data-testid="reading-progress"/,
    /Reading Progress/,
    /Books Read/,
    /Pages Read/,
    /Hours Read/,
    /Day Streak/,
    /Weekly Goal/,
    /Monthly Goal/,
    /Yearly Goal/
  ];

  const foundElements = progressTests.filter(test => test.test(htmlContent));
  validationResults.readingProgressComponent = foundElements.length >= 7; // Most elements should be present
  
  return {
    foundCount: foundElements.length,
    totalCount: progressTests.length
  };
}

/**
 * Check for animations in HTML
 */
function validateAnimations(htmlContent) {
  const animationTests = [
    /style="transform:/,
    /transition-all/,
    /animate-pulse/,
    /duration-/,
    /ease-/
  ];

  const foundAnimations = animationTests.filter(test => test.test(htmlContent));
  validationResults.animationsWorking = foundAnimations.length >= 3;
  
  return {
    foundCount: foundAnimations.length,
    totalCount: animationTests.length
  };
}

/**
 * Main validation function
 */
async function runValidation() {
  console.log('🌸 Starting Kawaii Reading Blog Execution Validation...\n');

  try {
    // Test 1: Server Response
    console.log('1. Testing server response...');
    const response = await testServerResponse();
    validationResults.startupStatus = true;
    console.log(`✅ Server responding on port ${TEST_CONFIG.port}`);
    console.log(`   Status: ${response.statusCode}`);
    console.log(`   Content Length: ${response.contentLength} bytes\n`);

    // Test 2: Kawaii Icons Validation
    console.log('2. Validating kawaii icons...');
    const iconResults = validateKawaiiIcons(response.content);
    console.log(`${validationResults.kawaiiIconsPresent ? '✅' : '❌'} Icons found: ${iconResults.foundCount}/${iconResults.totalCount}`);
    console.log(`   Present: ${iconResults.foundIcons.join(', ')}`);
    if (iconResults.missingIcons.length > 0) {
      console.log(`   Missing: ${iconResults.missingIcons.join(', ')}`);
    }
    console.log('');

    // Test 3: ReadingProgress Component
    console.log('3. Validating ReadingProgress component...');
    const progressResults = validateReadingProgress(response.content);
    console.log(`${validationResults.readingProgressComponent ? '✅' : '❌'} Progress elements: ${progressResults.foundCount}/${progressResults.totalCount}\n`);

    // Test 4: Animations
    console.log('4. Validating animations...');
    const animationResults = validateAnimations(response.content);
    console.log(`${validationResults.animationsWorking ? '✅' : '❌'} Animation classes: ${animationResults.foundCount}/${animationResults.totalCount}\n`);

    // Test 5: Performance Metrics
    console.log('5. Collecting performance metrics...');
    validationResults.performanceMetrics = {
      htmlSize: response.contentLength,
      responseTime: Date.now(),
      iconCount: iconResults.foundCount,
      animationClasses: animationResults.foundCount
    };
    console.log(`📊 HTML Size: ${response.contentLength} bytes`);
    console.log(`📊 Icons Rendered: ${iconResults.foundCount}`);
    console.log(`📊 Animation Classes: ${animationResults.foundCount}\n`);

  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    validationResults.consoleErrors.push(error.message);
  }

  // Generate final report
  generateValidationReport();
}

/**
 * Generate final validation report
 */
function generateValidationReport() {
  console.log('=====================================');
  console.log('🎯 EXECUTION VALIDATION REPORT');
  console.log('=====================================\n');

  // Overall Status
  const overallSuccess = validationResults.startupStatus && 
                        validationResults.httpResponse && 
                        validationResults.kawaiiIconsPresent && 
                        validationResults.readingProgressComponent;

  console.log(`📋 Overall Status: ${overallSuccess ? '✅ PASS' : '❌ FAIL'}\n`);

  // Detailed Results
  console.log('📊 Detailed Results:');
  console.log(`   • Server Startup: ${validationResults.startupStatus ? '✅' : '❌'}`);
  console.log(`   • HTTP Response: ${validationResults.httpResponse ? '✅' : '❌'}`);
  console.log(`   • Kawaii Icons: ${validationResults.kawaiiIconsPresent ? '✅' : '❌'}`);
  console.log(`   • Reading Progress: ${validationResults.readingProgressComponent ? '✅' : '❌'}`);
  console.log(`   • Animations: ${validationResults.animationsWorking ? '✅' : '❌'}\n`);

  // Performance Summary
  console.log('⚡ Performance Summary:');
  console.log(`   • HTML Size: ${validationResults.performanceMetrics.htmlSize || 'N/A'} bytes`);
  console.log(`   • Icons Rendered: ${validationResults.performanceMetrics.iconCount || 0}`);
  console.log(`   • Animation Classes: ${validationResults.performanceMetrics.animationClasses || 0}\n`);

  // Errors
  if (validationResults.consoleErrors.length > 0) {
    console.log('🚨 Errors Detected:');
    validationResults.consoleErrors.forEach(error => console.log(`   • ${error}`));
    console.log('');
  }

  // Recommendations
  console.log('💡 Recommendations:');
  if (!validationResults.kawaiiIconsPresent) {
    console.log('   • Check kawaii icon components for proper rendering');
  }
  if (!validationResults.animationsWorking) {
    console.log('   • Verify Framer Motion and CSS animations are working');
  }
  if (validationResults.performanceMetrics.htmlSize > 100000) {
    console.log('   • Consider optimizing HTML size for better performance');
  }
  if (validationResults.consoleErrors.length === 0 && overallSuccess) {
    console.log('   • All systems operational - ready for Phase 6.5');
  }

  console.log('\n=====================================');
  console.log(`🎯 DECISION: ${overallSuccess ? 'PROCEED TO PHASE 6.5' : 'RETURN FOR BUG FIXES'}`);
  console.log('=====================================');

  // Save results to file
  fs.writeFileSync(
    '/Volumes/SSD/development/cc-deck/projects/kawaii-reading-blog/execution-validation-report.json',
    JSON.stringify(validationResults, null, 2)
  );
  console.log('\n📄 Report saved to execution-validation-report.json');
}

// Run validation
runValidation().catch(console.error);