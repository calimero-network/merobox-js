/**
 * Ensure merobox is available and working
 * @returns The path to the merobox binary
 * @throws Error if merobox is not available or not working
 */
export declare function ensureMerobox(): Promise<string>;
/**
 * Run merobox with the given arguments
 * @param args Command line arguments to pass to merobox
 * @param opts Execution options (cwd, env, etc.)
 * @returns Promise that resolves when merobox completes
 */
export declare function runMerobox(args: string[], opts?: {
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    stdio?: 'inherit' | 'pipe' | 'ignore';
    timeout?: number;
}): Promise<any>;
/**
 * Get the version of the installed merobox binary
 * @returns The version string
 */
export declare function getMeroboxVersion(): Promise<string>;
/**
 * Check if merobox is available without throwing
 * @returns true if merobox is available and working
 */
export declare function isMeroboxAvailable(): Promise<boolean>;
/**
 * Get the path to the merobox binary (synchronous)
 * @returns The absolute path to the merobox binary
 * @throws Error if the binary is not found
 */
export declare function getMeroboxPath(): string;
//# sourceMappingURL=index.d.ts.map