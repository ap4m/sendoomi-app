import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // envDir: '../' is correct when 'root' is set to app/ or www/ folders
  // to pick up the shared .env file from the project root.
  envDir: '../',       
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
