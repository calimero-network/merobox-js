import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execa } from 'execa';
import fs from 'node:fs';

/**
 * Get the path to the merobox binary
 * @returns The absolute path to the merobox binary
 * @throws Error if the binary is not found
 */
function binPath(): string {
  const here = path.dirname(new URL(import.meta.url).pathname);
  const candidate = path.resolve(here, '..', 'bin', process.platform === 'win32' ? 'merobox.exe' : 'merobox');
  if (!fs.existsSync(candidate)) {
    throw new Error('merobox binary not found. Did postinstall run? Run npm install to download the binary.');
  }
  return candidate;
}

/**
 * Ensure merobox is available and working
 * @returns The path to the merobox binary
 * @throws Error if merobox is not available or not working
 */
export async function ensureMerobox(): Promise<string> {
  const bin = binPath();
  try {
    await execa(bin, ['--version']);
    return bin;
  } catch (error) {
    throw new Error(`merobox binary found but not working: ${error}`);
  }
}

/**
 * Run merobox with the given arguments
 * @param args Command line arguments to pass to merobox
 * @param opts Execution options (cwd, env, etc.)
 * @returns Promise that resolves when merobox completes
 */
export async function runMerobox(
  args: string[], 
  opts: { 
    cwd?: string; 
    env?: NodeJS.ProcessEnv;
    stdio?: 'inherit' | 'pipe' | 'ignore';
    timeout?: number;
  } = {}
): Promise<any> {
  const bin = await ensureMerobox();
  return execa(bin, args, { 
    stdio: 'inherit', 
    ...opts 
  });
}

/**
 * Get the version of the installed merobox binary
 * @returns The version string
 */
export async function getMeroboxVersion(): Promise<string> {
  const bin = await ensureMerobox();
  const result = await execa(bin, ['--version'], { stdio: 'pipe' });
  return result.stdout.trim();
}

/**
 * Check if merobox is available without throwing
 * @returns true if merobox is available and working
 */
export async function isMeroboxAvailable(): Promise<boolean> {
  try {
    await ensureMerobox();
    return true;
  } catch {
    return false;
  }
}

/**
 * Get the path to the merobox binary (synchronous)
 * @returns The absolute path to the merobox binary
 * @throws Error if the binary is not found
 */
export function getMeroboxPath(): string {
  return binPath();
}
