#!/usr/bin/env node

/**
 * Setup script for semantic-release configuration
 * This script helps configure the semantic-release process
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up semantic-release for @calimero-network/merobox-js...\n');

// Check if .releaserc.json exists
const releasercPath = path.join(__dirname, '..', '.releaserc.json');
if (fs.existsSync(releasercPath)) {
  console.log('✅ .releaserc.json already exists');
} else {
  console.log('❌ .releaserc.json not found');
}

// Check if package.json has semantic-release scripts
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const requiredScripts = ['semantic-release', 'commit', 'release'];
const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);

if (missingScripts.length === 0) {
  console.log('✅ All required scripts are present in package.json');
} else {
  console.log(`❌ Missing scripts: ${missingScripts.join(', ')}`);
}

// Check if commitizen config exists
if (packageJson.config && packageJson.config.commitizen) {
  console.log('✅ Commitizen configuration found');
} else {
  console.log('❌ Commitizen configuration missing');
}

// Check if semantic-release dependencies are installed
const requiredDeps = [
  'semantic-release',
  'commitizen',
  'cz-conventional-changelog',
  '@semantic-release/changelog',
  '@semantic-release/git'
];

const missingDeps = requiredDeps.filter(dep => !packageJson.devDependencies[dep]);

if (missingDeps.length === 0) {
  console.log('✅ All required dependencies are present');
} else {
  console.log(`❌ Missing dependencies: ${missingDeps.join(', ')}`);
}

console.log('\n📋 Next steps:');
console.log('1. Install dependencies: npm install');
console.log('2. Test commitizen: npm run commit');
console.log('3. Test semantic-release: npm run release --dry-run');
console.log('4. Configure GitHub secrets: GITHUB_TOKEN, NPM_TOKEN');
console.log('5. Push to master to trigger first release');

console.log('\n🎯 Semantic-release is configured for:');
console.log('- Conventional commits');
console.log('- Automatic versioning');
console.log('- Automatic changelog generation');
console.log('- Automatic npm publishing');
console.log('- Automatic GitHub releases');

console.log('\n✨ Setup complete!');
