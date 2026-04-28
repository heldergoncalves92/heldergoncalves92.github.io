import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles/main.scss';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element #root not found in index.html');
}

const tree = (
  <StrictMode>
    <App />
  </StrictMode>
);

// In production the HTML is pre-rendered by scripts/prerender.mjs, so we
// hydrate the existing markup. In dev (`vite dev`) the root is empty, so
// fall back to a fresh client render to avoid a hydration-mismatch warning.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, tree);
} else {
  createRoot(rootElement).render(tree);
}
