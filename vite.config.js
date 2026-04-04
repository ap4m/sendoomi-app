import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Note: Root and Build output are now controlled via package.json scripts
  // to ensure 'Subdomain Parity' (running as / in both environments).
  build: {
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
});
