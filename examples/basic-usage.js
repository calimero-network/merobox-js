#!/usr/bin/env node

/**
 * Basic usage example for @calimero/merobox
 * 
 * This example demonstrates:
 * - Checking if merobox is available
 * - Getting the binary path and version
 * - Running basic merobox commands
 * 
 * Run with: node examples/basic-usage.js
 */

const { ensureMerobox, runMerobox, getMeroboxVersion, isMeroboxAvailable } = require('../dist/index.js');

async function main() {
  console.log('Basic @calimero/merobox usage example\n');
  
  // Check availability
  console.log('1. Checking merobox availability...');
  const available = await isMeroboxAvailable();
  if (!available) {
    console.log('   merobox is not available');
    console.log('   This is expected if no binary has been downloaded yet');
    return;
  }
  console.log('   merobox is available\n');
  
  try {
    // Get binary path
    console.log('2. Getting merobox binary path...');
    const binPath = await ensureMerobox();
    console.log(`   Binary path: ${binPath}\n`);
    
    // Get version
    console.log('3. Getting merobox version...');
    const version = await getMeroboxVersion();
    console.log(`   Version: ${version}\n`);
    
    // Run a simple command
    console.log('4. Running merobox --help...');
    await runMerobox(['--help'], { stdio: 'pipe' });
    console.log('   Command completed successfully\n');
    
    console.log('Basic usage example completed!');
    console.log('You can now use merobox in your applications.');
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);
