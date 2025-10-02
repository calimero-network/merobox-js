"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureMerobox = ensureMerobox;
exports.runMerobox = runMerobox;
exports.getMeroboxVersion = getMeroboxVersion;
exports.isMeroboxAvailable = isMeroboxAvailable;
exports.getMeroboxPath = getMeroboxPath;
const node_path_1 = __importDefault(require("node:path"));
const execa_1 = require("execa");
const node_fs_1 = __importDefault(require("node:fs"));
/**
 * Get the path to the merobox binary
 * @returns The absolute path to the merobox binary
 * @throws Error if the binary is not found
 */
function binPath() {
    const here = __dirname;
    const candidate = node_path_1.default.resolve(here, '..', 'bin', process.platform === 'win32' ? 'merobox.exe' : 'merobox');
    if (!node_fs_1.default.existsSync(candidate)) {
        throw new Error('merobox binary not found. Did postinstall run? Run npm install to download the binary.');
    }
    return candidate;
}
/**
 * Ensure merobox is available and working
 * @returns The path to the merobox binary
 * @throws Error if merobox is not available or not working
 */
async function ensureMerobox() {
    const bin = binPath();
    try {
        await (0, execa_1.execa)(bin, ['--version']);
        return bin;
    }
    catch (error) {
        throw new Error(`merobox binary found but not working: ${error}`);
    }
}
/**
 * Run merobox with the given arguments
 * @param args Command line arguments to pass to merobox
 * @param opts Execution options (cwd, env, etc.)
 * @returns Promise that resolves when merobox completes
 */
async function runMerobox(args, opts = {}) {
    const bin = await ensureMerobox();
    return (0, execa_1.execa)(bin, args, {
        stdio: 'inherit',
        ...opts
    });
}
/**
 * Get the version of the installed merobox binary
 * @returns The version string
 */
async function getMeroboxVersion() {
    const bin = await ensureMerobox();
    const result = await (0, execa_1.execa)(bin, ['--version'], { stdio: 'pipe' });
    return result.stdout.trim();
}
/**
 * Check if merobox is available without throwing
 * @returns true if merobox is available and working
 */
async function isMeroboxAvailable() {
    try {
        await ensureMerobox();
        return true;
    }
    catch {
        return false;
    }
}
/**
 * Get the path to the merobox binary (synchronous)
 * @returns The absolute path to the merobox binary
 * @throws Error if the binary is not found
 */
function getMeroboxPath() {
    return binPath();
}
//# sourceMappingURL=index.js.map