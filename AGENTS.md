# AGENTS.md

Guidance for AI coding agents working in this repo.

## What this is

Personal landing page for Hélder Gonçalves — a single-page React + TypeScript
site that mirrors the printed CV. Deployed as static HTML to GitHub Pages at
[helderjgoncalves.github.io](https://helderjgoncalves.github.io). The home
page is pre-rendered to static markup at build time so search engines and
crawlers see real content before hydration.

## Stack

- **React 19** + **TypeScript 7** (strict; `tsc -b` is the lint step)
- **Vite 8** (dev server, client build, SSR build)
- **SASS** with the modern `@use` module system — never reintroduce `node-sass`
  or `@import` for partials
- **Inline SVG** icons via `src/components/Icon.tsx` — do not add an icon library
- **Node ≥ 24** (matches CI; `package.json` `engines.node`)

TypeScript 7 is the native compiler: `tsc` is a Go binary delivered through
per-platform `@typescript/typescript-<os>-<arch>` optional dependencies. Never
install with `--no-optional` or `--omit=optional` — that leaves no `tsc` to run,
and CI resolves `typescript-linux-x64` from the lockfile. The old JavaScript
compiler API is also gone: `import 'typescript'` now yields only version fields,
with the real surface behind `typescript/unstable/*` subpaths. Nothing here uses
it, and it shouldn't need to.

## Common commands

```bash
npm install
npm run dev      # vite dev server at http://localhost:5173 (CSR-only)
npm run build    # tsc -b → vite build → vite SSR build → prerender → dist/
npm run preview  # serve ./dist at http://localhost:4173 (matches production)
npm run lint     # tsc -b --noEmit (no ESLint configured)
npm run cards    # re-render public/og-*.png from scripts/og-cards/ (manual)
```

There is no test runner. Verification = `npm run lint` and a manual
`npm run preview` check after non-trivial changes.

## Build pipeline (important)

`npm run build` runs four steps in order — preserve this order if you touch
`package.json` or `scripts/prerender.mjs`:

1. `tsc -b` — type-check the project references
2. `vite build` — client bundle into `dist/`
3. `vite build --ssr src/entry-server.tsx --outDir dist/server` — SSR bundle
4. `node scripts/prerender.mjs` — imports `dist/server/entry-server.js`,
   renders `<App />` to a string, and replaces the literal
   `<div id="root"></div>` placeholder in `dist/index.html` with the rendered
   markup, then deletes `dist/server/`

Step 4 also owns all per-route `<head>` metadata and **generates
`dist/sitemap.xml`** from its own `pages` table — that table is the single
source of truth for which routes exist, so there is no committed sitemap to
keep in step. Its tag rewrites throw if a tag they target disappears from
`index.html`, rather than silently shipping a page that describes the wrong
route. The CI checkout uses `fetch-depth: 0` because `lastmod` and the case
study's `dateModified` come from commit dates.

`src/main.tsx` checks `rootElement.hasChildNodes()` and calls `hydrateRoot`
in production (markup present) or `createRoot().render()` in dev (root empty).
Don't break that branching when editing `main.tsx`.

## Repository layout

```
src/
  App.tsx                 # composes Nav + Hero + section components
  main.tsx                # client entry; hydrate-or-render based on root contents
  entry-server.tsx        # SSR entry; renderToString(<App />)
  types.ts                # CvData and related interfaces
  data/cv.ts              # ALL CV content lives here
  components/             # one component per CV section + Nav, Hero, Pill, Icon, Section, ThemeToggle
  hooks/useReveal.ts      # IntersectionObserver scroll-reveal
  styles/                 # SASS partials (see below)
  vite-env.d.ts
public/                   # static assets copied verbatim (favicon, portrait, og cards, robots, 404)
scripts/prerender.mjs     # post-build SSR injection + head metadata + sitemap
scripts/og-cards/         # HTML sources for the social cards + `npm run cards`
.github/workflows/deploy.yml  # GitHub Pages deploy on push to main
index.html                # source entry (loaded by `vite dev`); pre-rendered at build
vite.config.ts            # base = '/' (user/org GitHub Pages site)
```

`dist/` is the build output and is git-ignored. Never edit it by hand.

## Editing content

**All CV copy lives in `src/data/cv.ts`** as a single typed `CvData` object.
To update a bullet, tag, role, award, etc., edit only that file. The
components in `src/components/` are presentation-only and shouldn't carry
hard-coded copy.

The shape is defined in `src/types.ts` — the compiler will catch missing
fields when adding new entries. If you genuinely need a new field, update
`types.ts` first, then `cv.ts`, then the component that renders it.

### Downloadable CV (`public/helder-goncalves-cv.pdf`)

The Nav exposes a "Download CV" button that links to
`/helder-goncalves-cv.pdf`, served verbatim from `public/`. **`cv.ts` is the
canonical source**; the PDF is a printable mirror of it. When the content of
`cv.ts` changes in any user-visible way, regenerate or replace the PDF so
both stay in sync. Keep the filename stable (`helder-goncalves-cv.pdf`) —
versioned names like `CV-2026-v2.pdf` would break the saved download URL.

### Social cards (`public/og-home.png`, `public/og-homelab.png`)

Both are 1200×630 and committed. Their sources are plain HTML in
`scripts/og-cards/`, rendered by `npm run cards`, which screenshots them with
an already-installed Chrome (override with `CHROME=/path/to/binary`). This is
deliberately *not* part of `npm run build`: no headless-browser dependency gets
added for an asset that changes a few times a year. The card copy duplicates a
little of `cv.ts` / `homelab.ts` by necessity — when a name, role, or thesis
changes there, update the template and re-run `npm run cards`.

## Styling rules

SASS partials in `src/styles/`:

- `_variables.scss` — raw palette + theme tokens as CSS custom properties
  (light by default, dark via `[data-theme='dark']` or `prefers-color-scheme`)
- `_mixins.scss`, `_reset.scss`, `_layout.scss`, `_components.scss`
- `main.scss` — entry; uses `@use` for partials

Conventions:

- Use `@use 'variables' as *;` at the top of partials. Do not use `@import`.
- Colours that change with theme should reference the CSS custom properties
  (e.g. `var(--color-text)`) or the SASS aliases at the bottom of
  `_variables.scss` (`$color-text`, `$color-accent`, …). Reach for raw palette
  vars (`$blue-700`, `$ink-900`, …) only when the colour is intentionally
  fixed across themes (hero gradient, focus-ring `rgba()`, `::selection`,
  print overrides).
- The brand blue is `$blue-600` (primary) / `$blue-700` (accent-dark) — change
  these to rebrand; the rest cascades.
- Print stylesheet (in `main.scss`) forces the light palette regardless of
  `data-theme`. Don't break that when adjusting dark-mode tokens.

## Theming

- `index.html` runs a tiny synchronous script in `<head>` that reads
  `localStorage.theme` and sets `data-theme` on `<html>` **before first paint**
  to avoid a flash of the wrong theme. Don't move it out of `<head>` or make
  it async.
- `ThemeToggle.tsx` cycles auto → light → dark and persists to `localStorage`.
- The hero gradient stays brand-blue across themes by design.

## Deployment

`.github/workflows/deploy.yml` builds on push to `main` (or
`workflow_dispatch`) and publishes `./dist` via the GitHub Pages action.
Repo Pages source must be **GitHub Actions** (not "Deploy from a branch") —
the legacy mode would serve the source `index.html` referencing `/src/main.tsx`,
which only resolves under `vite dev`, producing a blank page in production.

`vite.config.ts` has `base: '/'` because this is a user/org GitHub Pages
repo (`helderjgoncalves.github.io`). Only change `base` if migrating to a
project-page repo.

## Conventions for agents

- Prefer editing existing files over creating new ones.
- Components are functional, typed, and named-export (`export function Foo`).
- Keep components presentation-only; data flows from `cv.ts` through `App.tsx`.
- Don't add runtime dependencies casually — the bundle is intentionally tiny
  (React + ReactDOM only). No icon libraries, no CSS-in-JS, no UI kits.
- Run `npm run lint` after non-trivial TypeScript edits.
- Run `npm run build` before claiming a change is production-ready — the SSR
  step will fail loudly if `<App />` throws during render (e.g. browser-only
  APIs accessed at module top level).
- Respect `prefers-reduced-motion` when adding animations (see `useReveal`
  and existing CSS for the pattern).
