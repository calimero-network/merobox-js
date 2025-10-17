import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const VERSION = process.env.MEROBOX_VERSION || "v0.1.27"; // pin to merobox release tag
const PLATFORM = detect(); // { os: 'darwin'|'linux'|'win32', arch: 'x64'|'arm64', libc: 'glibc'|'musl'|null }
const assetName = makeAssetName(VERSION, PLATFORM);
// e.g. merobox-v0.1.0-darwin-arm64 (add .exe on Windows)

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const destDir = path.join(__dirname, '..', 'bin');
const destPath = path.join(destDir, process.platform === 'win32' ? 'merobox.exe' : 'merobox');

(async () => {
  // Check if binary already exists and is valid
  if (fs.existsSync(destPath)) {
    try {
      // Test if the binary is executable and working
      execSync(`${destPath} --version`, { stdio: 'pipe' });
      console.log(`@calimero/merobox already installed: ${destPath}`);
      return;
    } catch (error) {
      // Binary exists but is corrupted, remove it
      console.log('Existing binary is corrupted, re-downloading...');
      fs.unlinkSync(destPath);
    }
  }

  console.log(`Installing merobox ${VERSION} for ${PLATFORM.os}-${PLATFORM.arch}...`);
  
  fs.mkdirSync(destDir, { recursive: true });

  // Use direct download URLs (faster than API call)
  const url = `https://github.com/calimero-network/merobox/releases/download/${VERSION}/${assetName}`;
  const shaUrl = `https://github.com/calimero-network/merobox/releases/download/${VERSION}/${assetName}.sha256`;

  console.log(`Downloading from: ${url}`);
  
  try {
    const [buf, sha] = await Promise.all([download(url), download(shaUrl, 'utf8')]);

    // verify checksum
    const hash = crypto.createHash('sha256').update(buf).digest('hex');
    const expected = sha.trim().split(/\s+/)[0];
    if (hash !== expected) {
      throw new Error(`Checksum mismatch for ${assetName}. Expected: ${expected}, Got: ${hash}`);
    }

    fs.writeFileSync(destPath, buf, { mode: 0o755 });

    // Create a tiny shim so `npx merobox` works from node_modules/.bin
    // (If "bin" points directly to bin/merobox we can skip; this ensures permissions are set)
    if (process.platform !== 'win32') {
      fs.chmodSync(destPath, 0o755);
    }
    console.log(`@calimero/merobox installed: ${destPath}`);
  } catch (error) {
    if (error.message.includes('HTTP 404')) {
      console.warn(`⚠️  Release ${VERSION} not found. This is expected during development.`);
      console.warn(`   The package will work once merobox releases are available.`);
      console.warn(`   For now, you can install merobox manually and place it in: ${destPath}`);
      
      // Create a placeholder file to prevent errors
      fs.writeFileSync(destPath, '#!/bin/sh\necho "merobox binary not found. Please install merobox manually."\nexit 1\n', { mode: 0o755 });
      if (process.platform !== 'win32') {
        fs.chmodSync(destPath, 0o755);
      }
    } else {
      throw error;
    }
  }
})().catch((e) => {
  console.warn(`Falling back – merobox not installed: ${e.message}`);
  process.exit(1);
});

function download(url, encoding) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, { 
      headers: { 'User-Agent': 'merobox-js-installer' },
      followRedirect: true
    }, (res) => {
      // Handle redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        const redirectUrl = res.headers.location;
        if (redirectUrl) {
          return download(redirectUrl, encoding).then(resolve).catch(reject);
        }
      }
      
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      const chunks = [];
      res.on('data', (d) => chunks.push(d));
      res.on('end', () => {
        const data = Buffer.concat(chunks);
        resolve(encoding ? data.toString(encoding) : data);
      });
    });
    
    request.on('error', reject);
  });
}

function detect() {
  const osPlat = os.platform(); // 'darwin'|'linux'
  const arch = os.arch();       // 'x64'|'arm64' etc.
  let libc = null;
  
  // Only support darwin and linux
  if (osPlat !== 'darwin' && osPlat !== 'linux') {
    throw new Error(`Unsupported platform: ${osPlat}. Only macOS and Linux are supported.`);
  }
  
  if (osPlat === 'linux') {
    try {
      const ldd = execSync('ldd --version || ldd /bin/sh || true', { stdio: ['ignore', 'pipe', 'ignore'] })
        .toString();
      libc = /musl/i.test(ldd) ? 'musl' : 'glibc';
    } catch {}
  }
  return { os: osPlat, arch, libc };
}

function makeAssetName(version, { os, arch, libc }) {
  const plat =
    os === 'darwin' ? `darwin-${arch}` :
    os === 'linux' ? `linux-${arch}` :
    (() => { throw new Error(`Unsupported platform ${os}/${arch}`)})();
  return `merobox-${version}-${plat}`;
}
