/**
 * Resolves a metadata URL (relative or protocol-relative) against a base URL.
 * 
 * @param {string} url - The URL to resolve (e.g. //example.com/img.jpg or /img.jpg)
 * @param {string} base - The base URL (e.g. https://site.com/product)
 * @returns {string} - The absolute URL
 */
export function resolveMetadataUrl(url, base) {
  if (!url || !base) return url;
  try {
    return new URL(url, base).href;
  } catch (e) {
    return url;
  }
}
