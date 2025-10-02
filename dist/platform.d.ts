export interface PlatformInfo {
    os: 'darwin' | 'linux';
    arch: 'x64' | 'arm64';
    libc: 'glibc' | 'musl' | null;
}
/**
 * Detect the current platform information
 * @returns Platform information including OS, architecture, and libc
 */
export declare function detectPlatform(): PlatformInfo;
/**
 * Generate the asset name for the current platform
 * @param version The merobox version
 * @param platform Platform information
 * @returns The asset name for download
 */
export declare function makeAssetName(version: string, platform: PlatformInfo): string;
/**
 * Get the expected asset name for the current platform
 * @param version The merobox version (defaults to v0.1.0)
 * @returns The expected asset name
 */
export declare function getExpectedAssetName(version?: string): string;
/**
 * Check if the current platform is supported
 * @returns true if the platform is supported
 */
export declare function isPlatformSupported(): boolean;
//# sourceMappingURL=platform.d.ts.map