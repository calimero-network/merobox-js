#!/usr/bin/env node

/**
 * Test script for @calimero/merobox
 * Run with: npm test
 */

const { isMeroboxAvailable, getMeroboxPath } = require('../dist/index.js');

async function runTests() {
  console.log('Running tests for @calimero/merobox...\n');
  
  // Test 1: Check if platform detection works
  console.log('1. Testing platform detection...');
  try {
    const { detectPlatform, isPlatformSupported } = require('../dist/platform.js');
    const platform = detectPlatform();
    const supported = isPlatformSupported();
    
    console.log(`   Platform: ${platform.os}-${platform.arch} (libc: ${platform.libc})`);
    console.log(`   Supported: ${supported ? 'Yes' : 'No'}`);
  } catch (error) {
    console.log(`   Platform detection failed: ${error.message}`);
  }
  
  // Test 2: Check binary path
  console.log('\n2. Testing binary path resolution...');
  try {
    const binPath = getMeroboxPath();
    console.log(`   Binary path: ${binPath}`);
    console.log('   Binary path resolved');
  } catch (error) {
    console.log(`   Binary path resolution failed: ${error.message}`);
  }
  
  // Test 3: Check availability
  console.log('\n3. Testing merobox availability...');
  try {
    const available = await isMeroboxAvailable();
    console.log(`   Available: ${available ? 'Yes' : 'No'}`);
    if (!available) {
      console.log('   This is expected during development when no binary is installed');
    }
  } catch (error) {
    console.log(`   Availability check failed: ${error.message}`);
  }
  
  console.log('\nTests completed!');
}

runTests().catch(console.error);
