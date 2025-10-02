# Deployment Guide for @calimero-network/merobox

This document outlines the deployment process for the merobox Node.js wrapper package.

## Prerequisites

1. **merobox Python project** must be set up with:
   - Single CLI entry point (e.g., `console_scripts: merobox=merobox.cli:main`)
   - `--version` flag that prints exact semver or tagged version
   - Release workflow that builds static executables

2. **GitHub repository** for merobox with releases containing:
   - Binary assets for each target platform
   - SHA256 checksums for verification

## Release Process

### 1. Prepare merobox Python Project

Ensure your merobox Python project has:

```python
# setup.py or pyproject.toml
[project.scripts]
merobox = "merobox.cli:main"
```

And a CLI that supports:
```bash
merobox --version  # prints exact version
```

### 2. Set up merobox Release Workflow

Create `.github/workflows/release.yml` in the merobox repository:

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    strategy:
      matrix:
        include:
          - os: macos-latest
            arch: x64
            target: darwin-x64
          - os: macos-latest
            arch: arm64
            target: darwin-arm64
          - os: ubuntu-latest
            arch: x64
            target: linux-x64-glibc
          - os: ubuntu-latest
            arch: arm64
            target: linux-arm64-glibc
          - os: windows-latest
            arch: x64
            target: windows-x64.exe

    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
          
      - name: Install uv
        run: pip install uv
        
      - name: Install dependencies
        run: uv sync --frozen
        
      - name: Build binary
        run: |
          uv run pyinstaller --onefile --name merobox merobox/cli.py
          
      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: merobox-${{ github.ref_name }}-${{ matrix.target }}
          path: dist/merobox*
```

### 3. Create merobox Release

1. Tag a version in the merobox repository:
   ```bash
   git tag v0.1.0
   git push origin v0.1.0
   ```

2. The GitHub Actions workflow will build binaries for all platforms

3. Create a GitHub Release with the built artifacts:
   - `merobox-v0.1.0-darwin-x64`
   - `merobox-v0.1.0-darwin-arm64`
   - `merobox-v0.1.0-linux-x64-glibc`
   - `merobox-v0.1.0-linux-arm64-glibc`
   - `merobox-v0.1.0-windows-x64.exe`

4. Generate SHA256 checksums:
   ```bash
   sha256sum merobox-v0.1.0-* > checksums.txt
   ```

### 4. Update @calimero-network/merobox

1. Update the version in `package.json`
2. Update the default version in `scripts/postinstall.js`
3. Test the package:
   ```bash
   npm run build
   npm test
   ```

### 5. Publish @calimero-network/merobox

1. Set up npm authentication:
   ```bash
   npm login
   ```

2. Publish the package:
   ```bash
   npm publish
   ```

## Testing the Integration

Once both packages are published:

```bash
# Test the npm package
npm install @calimero-network/merobox
npx @calimero-network/merobox --version

# Test programmatic usage
node -e "
const { ensureMerobox, runMerobox } = require('@calimero-network/merobox');
ensureMerobox().then(bin => console.log('Binary:', bin));
"
```

## CI/CD Integration

For projects using this package in CI:

```yaml
# .github/workflows/test.yml
- name: Cache merobox binary
  uses: actions/cache@v3
  with:
    path: node_modules/@calimero/merobox/bin/merobox*
    key: merobox-${{ hashFiles('package-lock.json') }}

- name: Install dependencies
  run: npm ci

- name: Run tests
  run: npm test
```

## Troubleshooting

### Binary not found during install
- Check that the merobox release exists
- Verify the asset naming matches the expected pattern
- Check network connectivity and GitHub API limits

### Checksum verification failed
- Regenerate checksums for the release assets
- Ensure the checksum file format is correct

### Platform not supported
- Add the platform to the build matrix
- Update the platform detection logic if needed

## Maintenance

- Keep the merobox version in sync with releases
- Update supported platforms as needed
- Monitor for security updates in dependencies
- Test on all supported platforms before releases
