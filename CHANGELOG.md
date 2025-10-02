## [0.0.2](https://github.com/calimero-network/merobox-js/compare/v0.0.1...v0.0.2) (2025-10-02)


### Bug Fixes

* add explicit npm authentication configuration ([f697044](https://github.com/calimero-network/merobox-js/commit/f697044c8b48847e28e845f4ec7a52f9b85b8457))
* add GitHub permissions for semantic-release ([de463cf](https://github.com/calimero-network/merobox-js/commit/de463cf9ba644ca8e6095336a4f5d4b3c5e9218f))
* configure npm authentication for semantic-release ([299537b](https://github.com/calimero-network/merobox-js/commit/299537b10cbe5f1f6088f88d5914bf035083ddf7))
* optimize postinstall script for ES modules and performance ([764b0bb](https://github.com/calimero-network/merobox-js/commit/764b0bb8f0b6ada5f62683b00022cf58ad0adc01))
* restore proper semantic-release workflow ([55f1bfb](https://github.com/calimero-network/merobox-js/commit/55f1bfb940534c3ab97e408914a367c2f289bb16))
* simplify npm authentication configuration ([7f4d0d5](https://github.com/calimero-network/merobox-js/commit/7f4d0d55642766c8c5263c26ae2c2b63edeae828))
* use setup-node action for npm authentication ([08cb870](https://github.com/calimero-network/merobox-js/commit/08cb87002b7b2ac89f8ccc66a69f78d7ec67e584))

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
