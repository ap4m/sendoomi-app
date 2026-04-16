import { describe, it, expect, vi } from 'vitest';
import { fetchMetadata } from './metadata';

describe('Metadata Client Service', () => {
  it('should fetch metadata and return imageUrl', async () => {
    // Mock the fetch call to the Cloudflare Function
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ imageUrl: 'https://example.com/image.png' })
    });

    const result = await fetchMetadata('https://example.com');
    expect(result).toEqual({ imageUrl: 'https://example.com/image.png' });
    expect(fetch).toHaveBeenCalledWith('/metadata?url=https%3A%2F%2Fexample.com');
  });

  it('should handle fetch errors gracefully', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    });

    const result = await fetchMetadata('https://example.com');
    expect(result).toEqual({ imageUrl: null, error: 'Failed to fetch metadata' });
  });

  it('should handle network exceptions', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network Error'));

    const result = await fetchMetadata('https://example.com');
    expect(result).toEqual({ imageUrl: null, error: 'Network Error' });
  });
});
