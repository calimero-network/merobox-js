"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectPlatform = detectPlatform;
exports.makeAssetName = makeAssetName;
exports.getExpectedAssetName = getExpectedAssetName;
exports.isPlatformSupported = isPlatformSupported;
const node_os_1 = __importDefault(require("node:os"));
const node_child_process_1 = require("node:child_process");
/**
 * Detect the current platform information
 * @returns Platform information including OS, architecture, and libc
 */
function detectPlatform() {
    const osPlat = node_os_1.default.platform();
    const arch = node_os_1.default.arch();
    let libc = null;
    // Only support darwin and linux
    if (osPlat !== 'darwin' && osPlat !== 'linux') {
        throw new Error(`Unsupported platform: ${osPlat}. Only macOS and Linux are supported.`);
    }
    if (osPlat === 'linux') {
        try {
            const ldd = (0, node_child_process_1.execSync)('ldd --version || ldd /bin/sh || true', {
                stdio: ['ignore', 'pipe', 'ignore']
            }).toString();
            libc = /musl/i.test(ldd) ? 'musl' : 'glibc';
        }
        catch {
            // Default to glibc if we can't detect
            libc = 'glibc';
        }
    }
    return { os: osPlat, arch, libc };
}
/**
 * Generate the asset name for the current platform
 * @param version The merobox version
 * @param platform Platform information
 * @returns The asset name for download
 */
function makeAssetName(version, platform) {
    const { os: osName, arch } = platform;
    const plat = osName === 'darwin' ? `darwin-${arch}` :
        osName === 'linux' ? `linux-${arch}` :
            (() => { throw new Error(`Unsupported platform ${osName}/${arch}`); })();
    return `merobox-${version}-${plat}`;
}
/**
 * Get the expected asset name for the current platform
 * @param version The merobox version (defaults to v0.1.0)
 * @returns The expected asset name
 */
function getExpectedAssetName(version = 'v0.1.0') {
    const platform = detectPlatform();
    return makeAssetName(version, platform);
}
/**
 * Check if the current platform is supported
 * @returns true if the platform is supported
 */
function isPlatformSupported() {
    try {
        const platform = detectPlatform();
        return ['darwin', 'linux'].includes(platform.os) &&
            ['x64', 'arm64'].includes(platform.arch);
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=platform.js.map