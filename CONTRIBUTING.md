# Contributing to @calimero-network/merobox-js

Thank you for your interest in contributing to @calimero-network/merobox-js! This document provides guidelines for contributing to the project.

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/calimero-network/merobox-js.git
   cd merobox-js
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Run tests**
   ```bash
   npm test
   ```

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. This enables automatic versioning and changelog generation.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

### Scopes

- **api**: API changes
- **cli**: CLI-related changes
- **docs**: Documentation changes
- **build**: Build system changes
- **deps**: Dependency updates
- **ci**: CI/CD changes

### Examples

```bash
# Feature
feat(api): add support for custom merobox profiles

# Bug fix
fix(cli): resolve binary path resolution on Windows

# Documentation
docs: update API documentation with new examples

# Breaking change
feat(api): remove deprecated runMeroboxSync function

BREAKING CHANGE: runMeroboxSync has been removed. Use runMerobox instead.
```

## Using Commitizen

We use Commitizen to help create conventional commits:

```bash
npm run commit
```

This will guide you through creating a properly formatted commit message.

## Release Process

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) for automated versioning and publishing.

### How it works

1. **Automatic versioning**: Based on commit messages, semantic-release determines the next version
2. **Automatic changelog**: Generates changelog from commit messages
3. **Automatic publishing**: Publishes to npm and creates GitHub releases

### Version Bumping

- **feat**: Bumps minor version (1.0.0 → 1.1.0)
- **fix**: Bumps patch version (1.0.0 → 1.0.1)
- **BREAKING CHANGE**: Bumps major version (1.0.0 → 2.0.0)

### Release Branches

- **master**: Production releases
- **beta**: Pre-release versions

### Manual Release

To trigger a release manually:

```bash
npm run release
```

## Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes**
   - Write tests for new features
   - Update documentation
   - Follow the commit convention

3. **Commit your changes**
   ```bash
   npm run commit
   ```

4. **Push your branch**
   ```bash
   git push origin feat/your-feature-name
   ```

5. **Create a Pull Request**
   - Use a descriptive title
   - Reference any related issues
   - Ensure all checks pass

## Testing

Before submitting a PR, ensure:

- [ ] All tests pass: `npm test`
- [ ] Code builds successfully: `npm run build`
- [ ] Examples work: `node examples/basic-usage.js`
- [ ] Documentation is updated
- [ ] Commit messages follow the convention

## Code Style

- Use TypeScript for type safety
- Follow existing code patterns
- Add JSDoc comments for public APIs
- Use meaningful variable and function names

## Release Notes

When creating a PR that should be included in release notes:

1. Use conventional commit format
2. Include a clear description in the commit body
3. Reference any breaking changes
4. Link to related issues

## Questions?

If you have questions about contributing, please:

1. Check existing issues and discussions
2. Create a new issue with the "question" label
3. Reach out to the maintainers

Thank you for contributing to @calimero-network/merobox-js!
