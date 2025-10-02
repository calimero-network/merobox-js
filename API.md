# API Documentation

## Overview

The `@calimero/merobox` package provides a JavaScript wrapper for the merobox CLI tool. It automatically downloads the appropriate binary for your platform and provides both CLI access and a programmatic API.

## Installation

```bash
npm install @calimero/merobox
```

## API Reference

### Core Functions

#### `ensureMerobox(): Promise<string>`

Ensures merobox is available and working. Returns the path to the merobox binary.

**Returns:** Promise that resolves to the absolute path of the merobox binary.

**Throws:** Error if merobox is not available or not working.

**Example:**
```typescript
import { ensureMerobox } from '@calimero/merobox';

const binPath = await ensureMerobox();
console.log('merobox binary at:', binPath);
```

#### `runMerobox(args: string[], opts?: RunOptions): Promise<any>`

Runs merobox with the given arguments.

**Parameters:**
- `args: string[]` - Command line arguments to pass to merobox
- `opts?: RunOptions` - Execution options

**RunOptions:**
- `cwd?: string` - Working directory
- `env?: NodeJS.ProcessEnv` - Environment variables
- `stdio?: 'inherit' | 'pipe' | 'ignore'` - Standard I/O handling
- `timeout?: number` - Execution timeout

**Returns:** Promise that resolves when merobox completes.

**Example:**
```typescript
import { runMerobox } from '@calimero/merobox';

await runMerobox(['health']);
await runMerobox(['list'], { cwd: '/path/to/project' });
```

#### `getMeroboxVersion(): Promise<string>`

Returns the version of the installed merobox binary.

**Returns:** Promise that resolves to the version string.

**Example:**
```typescript
import { getMeroboxVersion } from '@calimero/merobox';

const version = await getMeroboxVersion();
console.log('merobox version:', version);
```

#### `isMeroboxAvailable(): Promise<boolean>`

Checks if merobox is available without throwing an error.

**Returns:** Promise that resolves to true if merobox is available, false otherwise.

**Example:**
```typescript
import { isMeroboxAvailable } from '@calimero/merobox';

const available = await isMeroboxAvailable();
if (available) {
  console.log('merobox is ready to use');
} else {
  console.log('merobox is not available');
}
```

#### `getMeroboxPath(): string`

Returns the path to the merobox binary (synchronous).

**Returns:** The absolute path to the merobox binary.

**Throws:** Error if the binary is not found.

**Example:**
```typescript
import { getMeroboxPath } from '@calimero/merobox';

const binPath = getMeroboxPath();
console.log('merobox binary at:', binPath);
```

## Platform Detection

### `detectPlatform(): PlatformInfo`

Detects the current platform information.

**Returns:** Platform information including OS, architecture, and libc.

**PlatformInfo:**
```typescript
interface PlatformInfo {
  os: 'darwin' | 'linux';
  arch: 'x64' | 'arm64';
  libc: 'glibc' | 'musl' | null;
}
```

**Example:**
```typescript
import { detectPlatform } from '@calimero/merobox';

const platform = detectPlatform();
console.log(`Platform: ${platform.os}-${platform.arch}`);
```

### `isPlatformSupported(): boolean`

Checks if the current platform is supported.

**Returns:** true if the platform is supported, false otherwise.

**Example:**
```typescript
import { isPlatformSupported } from '@calimero/merobox';

if (isPlatformSupported()) {
  console.log('Platform is supported');
} else {
  console.log('Platform is not supported');
}
```

## Supported Platforms

- **macOS**: x64, arm64
- **Linux**: x64, arm64

Note: Windows is not currently supported by merobox releases.

## Error Handling

The package provides clear error messages for common issues:

- **Binary not found**: "merobox binary not found. Did postinstall run? Run npm install to download the binary."
- **Platform not supported**: "Unsupported platform: [platform]. Only macOS and Linux are supported."
- **Binary not working**: "merobox binary found but not working: [error]"

## Environment Variables

- `MEROBOX_VERSION`: Override the merobox version to download (default: v0.1.23)

## CLI Usage

After installation, you can use merobox directly from the command line:

```bash
npx @calimero/merobox --version
npx @calimero/merobox health
npx @calimero/merobox list
```

## Integration Examples

### Playwright Tests

```typescript
import { test } from '@playwright/test';
import { ensureMerobox, runMerobox } from '@calimero/merobox';

test.beforeAll(async () => {
  await ensureMerobox();
  await runMerobox(['health']);
  await runMerobox(['list']);
});

test.afterAll(async () => {
  await runMerobox(['down']);
});

test('e2e test', async ({ page }) => {
  await page.goto('http://localhost:3000');
  // Your test code here
});
```

### Vitest Tests

```typescript
import { describe, it, beforeAll, afterAll } from 'vitest';
import { ensureMerobox, runMerobox } from '@calimero/merobox';

describe('merobox integration', () => {
  beforeAll(async () => {
    await ensureMerobox();
    await runMerobox(['health']);
    await runMerobox(['list']);
  });

  afterAll(async () => {
    await runMerobox(['down']);
  });

  it('should work with merobox', async () => {
    // Your test code here
  });
});
```

### Node.js Application

```javascript
const { ensureMerobox, runMerobox } = require('@calimero/merobox');

async function startApp() {
  try {
    await ensureMerobox();
    await runMerobox(['run']);
    console.log('Application started with merobox');
  } catch (error) {
    console.error('Failed to start with merobox:', error);
    process.exit(1);
  }
}

startApp();
```

## Troubleshooting

### Binary not found

If you get "merobox binary not found", try:

```bash
npm install @calimero/merobox --force
```

### Platform not supported

This package supports macOS and Linux platforms. If you're on an unsupported platform, you may need to build merobox from source.

### Checksum verification failed

If the binary download fails checksum verification, the postinstall script will fail. This usually indicates a corrupted download or a problem with the release assets.
