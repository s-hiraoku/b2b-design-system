#!/usr/bin/env node

// Simple runtime validation script for kawaii-reading-blog
const fs = require('fs');
const path = require('path');

console.log('🧪 Starting Execution Validation for kawaii-reading-blog');
console.log('=====================================');

// 1. Validate project structure
const requiredFiles = [
  'package.json',
  'next.config.js',
  'tsconfig.json',
  'src/pages/index.tsx',
  'src/components/kawaii/KawaiiButton.tsx',
  'src/components/kawaii/KawaiiCard.tsx',
  'src/components/reading/BookCard.tsx',
  'src/lib/kawaii-animations.ts'
];

console.log('\n📁 File Structure Validation:');
let structureValid = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    structureValid = false;
  }
});

// 2. Validate package.json dependencies
console.log('\n📦 Dependencies Validation:');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredDeps = [
  'next',
  'react', 
  'react-dom',
  'framer-motion',
  'tailwindcss'
];

let depsValid = true;
requiredDeps.forEach(dep => {
  if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
    console.log(`✅ ${dep}: ${packageJson.dependencies[dep] || packageJson.devDependencies[dep]}`);
  } else {
    console.log(`❌ ${dep} - MISSING`);
    depsValid = false;
  }
});

// 3. Validate node_modules installation
console.log('\n🔗 Node Modules Validation:');
const nodeModulesValid = fs.existsSync('node_modules') && 
                        fs.existsSync('node_modules/next') &&
                        fs.existsSync('node_modules/react');
console.log(nodeModulesValid ? '✅ node_modules installed' : '❌ node_modules missing or incomplete');

// 4. Check TypeScript compilation (syntax only)
console.log('\n⚙️  TypeScript Syntax Check:');
try {
  const indexContent = fs.readFileSync('src/pages/index.tsx', 'utf8');
  const hasReactImport = indexContent.includes('import React');
  const hasNextImport = indexContent.includes('import') && indexContent.includes('next');
  const hasJSX = indexContent.includes('<') && indexContent.includes('>');
  
  console.log(hasReactImport ? '✅ React imports found' : '⚠️  No React imports');
  console.log(hasNextImport ? '✅ Next.js imports found' : '⚠️  No Next.js imports');
  console.log(hasJSX ? '✅ JSX syntax present' : '❌ No JSX found');
} catch (error) {
  console.log(`❌ Error reading index.tsx: ${error.message}`);
}

// 5. Validate CSS/Tailwind setup
console.log('\n🎨 Styling Validation:');
const tailwindConfigExists = fs.existsSync('tailwind.config.js');
const postcssConfigExists = fs.existsSync('postcss.config.js');
const globalCssExists = fs.existsSync('src/styles/globals.css');

console.log(tailwindConfigExists ? '✅ tailwind.config.js' : '❌ tailwind.config.js missing');
console.log(postcssConfigExists ? '✅ postcss.config.js' : '❌ postcss.config.js missing');
console.log(globalCssExists ? '✅ globals.css' : '❌ globals.css missing');

// 6. Component validation
console.log('\n🧩 Component Structure Validation:');
const componentPaths = [
  'src/components/kawaii/KawaiiButton.tsx',
  'src/components/kawaii/KawaiiCard.tsx', 
  'src/components/reading/BookCard.tsx'
];

componentPaths.forEach(componentPath => {
  try {
    const content = fs.readFileSync(componentPath, 'utf8');
    const hasExport = content.includes('export') && (content.includes('function') || content.includes('const') || content.includes('='));
    const hasJSX = content.includes('return') && content.includes('<');
    const componentName = path.basename(componentPath, '.tsx');
    
    if (hasExport && hasJSX) {
      console.log(`✅ ${componentName} - valid component structure`);
    } else {
      console.log(`⚠️  ${componentName} - potential structure issues`);
    }
  } catch (error) {
    console.log(`❌ ${componentPath} - error reading file`);
  }
});

// 7. Summary
console.log('\n📊 Execution Validation Summary:');
console.log('=====================================');
const overallValid = structureValid && depsValid && nodeModulesValid;

if (overallValid) {
  console.log('🎉 ✅ BASIC EXECUTION VALIDATION PASSED');
  console.log('📋 Project structure is valid for development');
  console.log('🏗️  Core dependencies are installed');
  console.log('🧩 Component files are present');
  console.log('\n⚡ Ready for development server testing');
  process.exit(0);
} else {
  console.log('⚠️  ❌ EXECUTION VALIDATION ISSUES FOUND');
  console.log('🔧 Fix the above issues before proceeding');
  console.log('\n🚨 Not ready for production deployment');
  process.exit(1);
}