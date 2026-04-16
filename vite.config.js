import { defineConfig, loadEnv, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file from project root
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // envDir: '../' is correct when 'root' is set to app/ or www/ folders
    // to pick up the shared .env file from the project root.
    envDir: '../',       
    plugins: [
      react(),
      !process.env.VITEST && mkcert({
        hosts: ['localhost', 'dev.sendoomi.com'],
        savePath: './.devcerts'
      }),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true
        },
        manifest: {
          name: 'Sendoomi',
          short_name: 'Sendoomi',
          description: 'A calm, binary choice-engine for kids with SEND.',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: 'icons/logo-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'icons/logo-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            }
          ],
          share_target: {
            action: '/',
            method: 'GET',
            enctype: 'application/x-www-form-urlencoded',
            params: {
              title: 'title',
              text: 'text',
              link: 'url'
            }
          }
        }
      }),
      {
        name: 'analytics-injector',
        transformIndexHtml(html) {
          const token = env.VITE_CF_BEACON_TOKEN;
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
      https: true,
      strictPort: true,
      port: 443,
      fs: {
        // Allow serving files from the workspace root to pick up shared assets and config
        allow: [
          searchForWorkspaceRoot(process.cwd())
        ]
      }
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./app/setupTests.js'],
    },
  };
});
