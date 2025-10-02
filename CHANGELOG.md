# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-10-02

### Added

- Initial release of @calimero-network/merobox
- Automatic binary download for supported platforms (macOS, Linux)
- SHA256 checksum verification for security
- CLI access via `npx @calimero-network/merobox`
- TypeScript API for programmatic use
- Platform detection utilities
- Support for merobox v0.1.23

### Features

- **ensureMerobox()**: Ensures merobox is available and working
- **runMerobox()**: Execute merobox commands programmatically
- **getMeroboxVersion()**: Get the installed merobox version
- **isMeroboxAvailable()**: Check availability without throwing
- **getMeroboxPath()**: Get binary path synchronously
- **detectPlatform()**: Detect current platform information
- **isPlatformSupported()**: Check if platform is supported

### Supported Platforms

- macOS: x64, arm64
- Linux: x64, arm64

### Documentation

- Comprehensive README with usage examples
- API documentation with TypeScript interfaces
- Integration examples for Playwright, Vitest, and Node.js
- Troubleshooting guide
- Deployment guide for maintainers

### Security

- SHA256 checksum verification for all downloaded binaries
- Secure download from GitHub Releases
- Platform-specific binary selection

### Development

- TypeScript support with full type definitions
- Comprehensive test suite
- GitHub Actions workflow for releases
- Proper npm package configuration
