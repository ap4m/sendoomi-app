/**
 * Parses shared data from a query string.
 * Handles standard PWA share targets, legacy fallbacks, and content-bundled URLs.
 * 
 * @param {string} searchString - The window.location.search string
 * @returns {object|null} - The parsed shared data or null if no relevant data found
 */
export function parseSharedData(searchString) {
  if (!searchString) return null;

  const params = new URLSearchParams(searchString);
  const title = params.get('title');
  const text = params.get('text');
  
  // Check both 'link' (v0.1.1+) and 'url' (legacy fallback)
  const link = params.get('link') || params.get('url');

  if (!title && !text && !link) {
    return null;
  }

  let finalLink = link;

  // If link is missing, try to extract it from the text (common on Android/Amazon/Chrome)
  if (!finalLink && text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const found = text.match(urlRegex);
    if (found) {
      finalLink = found[0];
    }
  }

  return {
    title: title || '',
    text: text || '',
    link: finalLink || ''
  };
}
