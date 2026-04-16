import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // envDir: '../' is correct when 'root' is set to app/ or www/ folders
  // to pick up the shared .env file from the project root.
  envDir: '../',       
  plugins: [
    react(),
    {
      name: 'analytics-injector',
      transformIndexHtml(html) {
        const token = process.env.VITE_CF_BEACON_TOKEN;
        if (!token) return html;

        const beaconScript = `
    <!-- Cloudflare Web Analytics (Privacy First Injection) -->
    <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "${token}"}'></script>
  `;
        return html.replace('</body>', `${beaconScript}</body>`);
      }
    }
  ],
  // Note: Root and Build output are now controlled via package.json scripts
  // to ensure 'Subdomain Parity' (running as / in both environments).
  build: {
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
});
