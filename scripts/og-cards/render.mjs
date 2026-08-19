// Renders the social-card templates in this folder to public/og-*.png at
// 1200x630 (the size LinkedIn, Slack, and X expect for a large image card).
//
// Deliberately shells out to an already-installed Chrome rather than adding
// Playwright/Puppeteer: this runs by hand a few times a year, and the bundle is
// meant to stay React + ReactDOM only. Not part of `npm run build` — the PNGs
// are committed assets.
//
// Usage: npm run cards   (override the binary with CHROME=/path/to/chrome)

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '../..');
const publicDir = path.join(projectRoot, 'public');

const CANDIDATES = [
  process.env.CHROME,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

const chrome = CANDIDATES.find((bin) => fs.existsSync(bin));

if (!chrome) {
  console.error(
    'No Chrome/Chromium found. Set CHROME=/path/to/binary and re-run.\nLooked in:\n  ' +
      CANDIDATES.join('\n  '),
  );
  process.exit(1);
}

const cards = [
  { template: 'home.html', out: 'og-home.png' },
  { template: 'homelab.html', out: 'og-homelab.png' },
];

for (const card of cards) {
  const src = path.join(__dirname, card.template);
  const dest = path.join(publicDir, card.out);
  execFileSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--window-size=1200,630',
      // Lets the webfont arrive before the frame is captured; without it the
      // card can render in a fallback face.
      '--virtual-time-budget=9000',
      `--screenshot=${dest}`,
      `file://${src}`,
    ],
    { stdio: ['ignore', 'ignore', 'ignore'] },
  );

  const { size } = fs.statSync(dest);
  console.log(`✓ ${card.out} (${(size / 1024).toFixed(0)} KB)`);
}
