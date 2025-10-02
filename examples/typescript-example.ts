/**
 * TypeScript example: Building a merobox service manager
 * 
 * This example demonstrates:
 * - Creating a TypeScript class that wraps merobox functionality
 * - Using type safety and IntelliSense
 * - Error handling and resource management
 * - Building a service manager for applications
 * 
 * Run with: npx tsx examples/typescript-example.ts
 */

import { 
  ensureMerobox, 
  runMerobox, 
  getMeroboxVersion, 
  isMeroboxAvailable,
  getMeroboxPath 
} from '../dist/index.js';

interface MeroboxConfig {
  profile: string;
  reset?: boolean;
  verbose?: boolean;
}

class MeroboxServiceManager {
  private binPath?: string;
  private isInitialized = false;
  
  async initialize(): Promise<boolean> {
    try {
      this.binPath = await ensureMerobox();
      console.log('merobox initialized at:', this.binPath);
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize merobox:', error);
      return false;
    }
  }
  
  async getVersion(): Promise<string> {
    if (!this.isInitialized) {
      throw new Error('merobox not initialized. Call initialize() first.');
    }
    return await getMeroboxVersion();
  }
  
  async runCommand(args: string[], options?: { cwd?: string; env?: NodeJS.ProcessEnv }) {
    if (!this.isInitialized) {
      throw new Error('merobox not initialized. Call initialize() first.');
    }
    return await runMerobox(args, options);
  }
  
  async checkHealth(): Promise<void> {
    console.log('Checking merobox health...');
    await this.runCommand(['health']);
    console.log('Health check completed');
  }
  
  async listNodes(): Promise<void> {
    console.log('Listing merobox nodes...');
    await this.runCommand(['list']);
    console.log('Nodes listed');
  }
  
  async startServices(): Promise<void> {
    console.log('Starting merobox services...');
    await this.runCommand(['run']);
    console.log('Services started');
  }
  
  async stopServices(): Promise<void> {
    console.log('Stopping services...');
    await this.runCommand(['stop']);
    console.log('Services stopped');
  }
  
  isReady(): boolean {
    return this.isInitialized;
  }
}

// Example usage
async function main() {
  console.log('TypeScript merobox service manager example\n');
  
  const manager = new MeroboxServiceManager();
  
  // Check availability
  console.log('1. Checking merobox availability...');
  const available = await isMeroboxAvailable();
  if (!available) {
    console.log('   merobox not available');
    console.log('   This is expected if no binary has been downloaded yet');
    return;
  }
  console.log('   merobox is available\n');
  
  try {
    // Initialize
    console.log('2. Initializing merobox service manager...');
    const initialized = await manager.initialize();
    if (!initialized) {
      console.log('   Failed to initialize merobox');
      return;
    }
    console.log('   Service manager initialized\n');
    
    // Get version
    console.log('3. Getting merobox version...');
    const version = await manager.getVersion();
    console.log(`   Version: ${version}\n`);
    
    // Check health
    console.log('4. Checking merobox health...');
    await manager.checkHealth();
    console.log('   Health check complete\n');
    
    // List nodes
    console.log('5. Listing merobox nodes...');
    await manager.listNodes();
    console.log('   Nodes listed\n');
    
    console.log('Service manager example completed!');
    console.log('The service manager is ready for use in your applications.');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Cleanup
    if (manager.isReady()) {
      try {
        console.log('\n6. Cleaning up...');
        await manager.stopServices();
        console.log('   Cleanup complete');
      } catch (error) {
        console.warn('   Cleanup error:', error);
      }
    }
  }
}

// Run the example
main().catch(console.error);
