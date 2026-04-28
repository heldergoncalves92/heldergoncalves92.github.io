// Renders <App /> to static HTML and injects it into dist/index.html so
// visitors (and crawlers) see real markup before the JS bundle hydrates.
//
// Pipeline (driven by `npm run build`):
//   1. vite build                                    → dist/ (client assets + index.html)
//   2. vite build --ssr src/entry-server.tsx ...     → dist/server/entry-server.js
//   3. node scripts/prerender.mjs                    → patches dist/index.html, removes dist/server

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const ssrDir = path.join(distDir, 'server');
const indexPath = path.join(distDir, 'index.html');
const ssrEntry = path.join(ssrDir, 'entry-server.js');

const ROOT_PLACEHOLDER = '<div id="root"></div>';

const { render } = await import(pathToFileURL(ssrEntry).href);
const appHtml = render();

const template = await fs.readFile(indexPath, 'utf-8');
if (!template.includes(ROOT_PLACEHOLDER)) {
  throw new Error(
    `Expected ${ROOT_PLACEHOLDER} placeholder in dist/index.html. ` +
      'Did the client build skip the root div, or did its markup change?',
  );
}

const html = template.replace(ROOT_PLACEHOLDER, `<div id="root">${appHtml}</div>`);
await fs.writeFile(indexPath, html);

await fs.rm(ssrDir, { recursive: true, force: true });

const sizeKb = (Buffer.byteLength(appHtml, 'utf-8') / 1024).toFixed(1);
console.log(`✓ Pre-rendered dist/index.html (${sizeKb} KB of inlined markup)`);
