#!/usr/bin/env node

/**
 * Integration example: Using @calimero/merobox in a Node.js application
 * 
 * This example demonstrates:
 * - Integrating merobox into a real application
 * - Error handling and graceful degradation
 * - Environment setup and teardown
 * - Using merobox for development workflows
 * 
 * Run with: node examples/integration-example.js
 */

import { ensureMerobox, runMerobox, isMeroboxAvailable } from '../dist/index.js';

class Application {
  constructor() {
    this.meroboxAvailable = false;
    this.meroboxPath = null;
  }

  async initialize() {
    console.log('Initializing application...');
    
    // Check if merobox is available
    this.meroboxAvailable = await isMeroboxAvailable();
    
    if (this.meroboxAvailable) {
      try {
        this.meroboxPath = await ensureMerobox();
        console.log('merobox integration enabled');
        console.log(`merobox binary: ${this.meroboxPath}`);
      } catch (error) {
        console.warn('merobox integration disabled:', error.message);
        this.meroboxAvailable = false;
      }
    } else {
      console.log('merobox not available - running in standalone mode');
    }
  }

  async setupDevelopmentEnvironment() {
    if (!this.meroboxAvailable) {
      console.log('Skipping merobox setup - not available');
      return;
    }

    try {
      console.log('Setting up development environment with merobox...');
      
      // Check health status
      await runMerobox(['health'], { stdio: 'pipe' });
      console.log('merobox health check completed');
      
      // List running nodes
      await runMerobox(['list'], { stdio: 'pipe' });
      console.log('merobox nodes listed');
      
    } catch (error) {
      console.error('Failed to setup merobox environment:', error.message);
      this.meroboxAvailable = false;
    }
  }

  async runApplication() {
    console.log('Running application...');
    
    if (this.meroboxAvailable) {
      console.log('Application running with merobox integration');
      console.log('Blockchain services are available');
    } else {
      console.log('Application running in standalone mode');
      console.log('Blockchain services are not available');
    }
    
    // Simulate application work
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Application work completed');
  }

  async cleanup() {
    if (!this.meroboxAvailable) {
      console.log('No cleanup needed - merobox not used');
      return;
    }

    try {
      console.log('Cleaning up merobox environment...');
      await runMerobox(['stop'], { stdio: 'pipe' });
      console.log('merobox environment cleaned up');
    } catch (error) {
      console.warn('Failed to cleanup merobox environment:', error.message);
    }
  }

  getStatus() {
    return {
      meroboxAvailable: this.meroboxAvailable,
      meroboxPath: this.meroboxPath,
      mode: this.meroboxAvailable ? 'integrated' : 'standalone'
    };
  }
}

// Main application flow
async function main() {
  console.log('Node.js application with merobox integration example\n');
  
  const app = new Application();
  
  try {
    // Initialize application
    await app.initialize();
    
    // Setup development environment
    await app.setupDevelopmentEnvironment();
    
    // Run application
    await app.runApplication();
    
    // Show final status
    const status = app.getStatus();
    console.log('\nApplication status:');
    console.log(`  Mode: ${status.mode}`);
    console.log(`  merobox available: ${status.meroboxAvailable}`);
    if (status.meroboxPath) {
      console.log(`  merobox path: ${status.meroboxPath}`);
    }
    
  } catch (error) {
    console.error('Application error:', error);
  } finally {
    // Cleanup
    await app.cleanup();
    console.log('\nApplication shutdown complete');
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\nReceived SIGINT, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nReceived SIGTERM, shutting down gracefully...');
  process.exit(0);
});

// Run the application
main().catch(console.error);
