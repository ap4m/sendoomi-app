import { resolveMetadataUrl } from '../app/utils/metadata_utils';

/**
 * Cloudflare Pages Function: Metadata Extractor
 * Endpoint: /metadata?url=...
 * 
 * Fetches the target URL and extracts visual metadata (og:image, twitter:image).
 */
export async function onRequestGet(context) {
  const { searchParams } = new URL(context.request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'Missing url parameter' }), {
      status: 400,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Allow local dev access
      }
    });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ imageUrl: null, error: `External site returned ${response.status}` }), {
        status: 200, // Return 200 so the app doesn't crash, just no image
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let imageUrl = null;

    // 2. Use HTMLRewriter to extract meta tags
    // We prioritize og:image, then twitter:image as a fallback
    const rewriter = new HTMLRewriter()
      .on('meta[property="og:image"]', {
        element(element) {
          const content = element.getAttribute('content');
          if (content && !imageUrl) {
            imageUrl = resolveMetadataUrl(content, targetUrl);
          }
        }
      })
      .on('meta[name="twitter:image"]', {
        element(element) {
          const content = element.getAttribute('content');
          if (content && !imageUrl) {
            imageUrl = resolveMetadataUrl(content, targetUrl);
          }
        }
      });

    // Transformation to trigger handlers
    await rewriter.transform(response).arrayBuffer();

    // 3. Return the extracted data
    return new Response(JSON.stringify({ imageUrl }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ imageUrl: null, error: error.message }), {
      status: 200, // Safe fallback
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
