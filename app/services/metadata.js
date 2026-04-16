/**
 * Fetches metadata for a given URL via the /metadata proxy endpoint.
 * 
 * @param {string} url - The target URL to analyze
 * @returns {Promise<object>} - { imageUrl: string|null, error?: string }
 */
export async function fetchMetadata(url) {
  if (!url) return { imageUrl: null };

  try {
    const response = await fetch(`/metadata?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
      return { imageUrl: null, error: 'Failed to fetch metadata' };
    }

    const data = await response.json();
    return { imageUrl: data.imageUrl || null };
  } catch (error) {
    return { imageUrl: null, error: error.message };
  }
}
