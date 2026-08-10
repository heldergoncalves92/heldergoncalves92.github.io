// Renders each route to static HTML and injects it into the matching
// dist/*.html so visitors (and crawlers) see real markup before hydration.
//
// Pipeline (driven by `npm run build`):
//   1. vite build                                    → dist/ (client assets + index.html)
//   2. vite build --ssr src/entry-server.tsx ...     → dist/server/entry-server.js
//   3. node scripts/prerender.mjs                    → patches HTML per route, removes dist/server

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const ssrDir = path.join(distDir, 'server');
const ssrEntry = path.join(ssrDir, 'entry-server.js');
const templatePath = path.join(distDir, 'index.html');

const ROOT_PLACEHOLDER = '<div id="root"></div>';

/** @type {{ path: string, out: string, title: string, description: string, canonical: string, ogType?: string, keepJsonLd?: boolean }[]} */
const pages = [
  {
    path: '/',
    out: 'index.html',
    title: 'Hélder Gonçalves — Lead Software Engineer | Developer Tools & GenAI',
    description:
      'Lead Software Engineer at OutSystems with 10+ years building developer tools, integrating Generative AI, and architecting cloud-native React/AWS systems.',
    canonical: 'https://hgoncalves.uk/',
    ogType: 'profile',
    keepJsonLd: true,
  },
  {
    path: '/homelab',
    out: path.join('homelab', 'index.html'),
    title: 'Self-Hosted Home Lab · Hélder Gonçalves',
    description:
      'Case study of a NAS-based private cloud: Cloudflare Tunnel, zero-trust Access, Pi-hole, Immich, OpenCloud, and layered monitoring — all declarative in Git.',
    canonical: 'https://hgoncalves.uk/homelab/',
    ogType: 'website',
    keepJsonLd: false,
  },
];

const { render } = await import(pathToFileURL(ssrEntry).href);
const template = await fs.readFile(templatePath, 'utf-8');

if (!template.includes(ROOT_PLACEHOLDER)) {
  throw new Error(
    `Expected ${ROOT_PLACEHOLDER} placeholder in dist/index.html. ` +
      'Did the client build skip the root div, or did its markup change?',
  );
}

/**
 * @param {string} html
 * @param {{ title: string, description: string, canonical: string, ogType?: string, keepJsonLd?: boolean }} meta
 */
function applyMeta(html, meta) {
  let next = html;
  next = next.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
  next = next.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${meta.canonical}" />`,
  );
  next = next.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${meta.description}" />`,
  );
  next = next.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${meta.canonical}" />`,
  );
  next = next.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${meta.title}" />`,
  );
  next = next.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${meta.description}" />`,
  );
  next = next.replace(
    /<meta property="og:type" content="[^"]*" \/>/,
    `<meta property="og:type" content="${meta.ogType ?? 'website'}" />`,
  );
  next = next.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${meta.title}" />`,
  );
  next = next.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${meta.description}" />`,
  );
  if (meta.keepJsonLd === false) {
    // Only strip the ProfilePage JSON-LD block (and its own comment). Do not
    // match from an earlier <!-- … --> — a greedy/cross-comment match would
    // delete the theme anti-FOIT script and the rest of <head>.
    next = next.replace(
      /\s*<!--\s*\n\s*JSON-LD[\s\S]*?-->\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      '',
    );
  }
  return next;
}

for (const page of pages) {
  const appHtml = render(page.path);
  const withMeta = applyMeta(template, page);
  const html = withMeta.replace(ROOT_PLACEHOLDER, `<div id="root">${appHtml}</div>`);
  const outPath = path.join(distDir, page.out);
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, html);

  const sizeKb = (Buffer.byteLength(appHtml, 'utf-8') / 1024).toFixed(1);
  console.log(`✓ Pre-rendered ${page.out} (${sizeKb} KB of inlined markup)`);
}

await fs.rm(ssrDir, { recursive: true, force: true });
