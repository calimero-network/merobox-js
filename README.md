# @calimero/merobox

JavaScript wrapper for the merobox CLI tool. This package automatically downloads the appropriate merobox binary for your platform and provides both CLI access and a programmatic API.

## Installation

```bash
npm install @calimero/merobox
```

## Usage

### CLI Usage

After installation, you can use merobox directly from the command line:

```bash
npx @calimero/merobox --version
npx @calimero/merobox health
npx @calimero/merobox list
```

### Programmatic API

```typescript
import { ensureMerobox, runMerobox, getMeroboxVersion } from '@calimero/merobox';

// Ensure merobox is available
const binPath = await ensureMerobox();
console.log('merobox binary at:', binPath);

// Run merobox commands
await runMerobox(['health']);
await runMerobox(['list']);

// Get version
const version = await getMeroboxVersion();
console.log('merobox version:', version);
```

### Example with Testing Frameworks

```typescript
import { test } from '@playwright/test';
import { ensureMerobox, runMerobox } from '@calimero/merobox';

test.beforeAll(async () => {
  await ensureMerobox();
  await runMerobox(['run']);
});

test.afterAll(async () => {
  await runMerobox(['stop', '--all']);
});

test('e2e test', async ({ page }) => {
  await page.goto('http://localhost:3000');
  // ... your test code
});
```

## API Reference

### `ensureMerobox(): Promise<string>`

Ensures merobox is available and working. Returns the path to the merobox binary.

### `runMerobox(args: string[], opts?: RunOptions): Promise<any>`

Runs merobox with the given arguments.

**Options:**
- `cwd?: string` - Working directory
- `env?: NodeJS.ProcessEnv` - Environment variables
- `stdio?: 'inherit' | 'pipe' | 'ignore'` - Standard I/O handling
- `timeout?: number` - Execution timeout

### `getMeroboxVersion(): Promise<string>`

Returns the version of the installed merobox binary.

### `isMeroboxAvailable(): Promise<boolean>`

Checks if merobox is available without throwing an error.

### `getMeroboxPath(): string`

Returns the path to the merobox binary (synchronous).

## Supported Platforms

- **macOS**: x64, arm64
- **Linux**: x64, arm64

Note: Windows is not currently supported by merobox releases.

## How It Works

1. During `npm install`, the postinstall script detects your platform
2. Downloads the appropriate merobox binary from GitHub Releases
3. Verifies the binary using SHA256 checksums
4. Places the binary in `node_modules/@calimero/merobox/bin/`
5. Creates a CLI shim for direct command-line access

## Environment Variables

- `MEROBOX_VERSION`: Override the merobox version to download (default: v0.1.23)

## Troubleshooting

### Binary not found

If you get "merobox binary not found", try:

```bash
npm install @calimero/merobox --force
```

### Platform not supported

This package supports the platforms listed above. If you're on an unsupported platform, you may need to build merobox from source.

### Checksum verification failed

If the binary download fails checksum verification, the postinstall script will fail. This usually indicates a corrupted download or a problem with the release assets.

## Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Test the package
npm test
```

## License

MIT
