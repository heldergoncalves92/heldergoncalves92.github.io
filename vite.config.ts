import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// If this repo is `<username>.github.io` (a user/org page), keep base = '/'.
// If you publish under a project repo (e.g. github.com/you/cv), set base = '/cv/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
