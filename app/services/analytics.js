/**
 * Sendoomi Analytics Service (Privacy First)
 * Wraps Cloudflare Web Analytics Custom Events.
 */

const ANALYTICS_ENABLED = typeof window !== 'undefined' && !!import.meta.env.VITE_CF_BEACON_TOKEN;

/**
 * Track a custom event in Cloudflare Web Analytics.
 * @param {string} name - Event name (e.g., 'app_installed')
 * @param {string} [value] - Optional metadata
 */
export const trackEvent = (name, value = '') => {
  if (!ANALYTICS_ENABLED) return;

  try {
    // Cloudflare Custom Events syntax
    // This assumes the beacon script is loaded and cloudflare_web_analytics is on window
    if (window.cloudflare_web_analytics) {
      window.cloudflare_web_analytics.trackEvent(name, value);
      console.debug(`[Analytics] Tracked: ${name}`, value);
    }
  } catch (err) {
    console.warn('[Analytics] Failed to track event:', err);
  }
};

/**
 * Global Listeners for Sendoomi-wide events
 */
if (typeof window !== 'undefined') {
  // 1. PWA Install Tracking
  window.addEventListener('appinstalled', () => {
    trackEvent('pwa_installed', 'success');
  });
}
