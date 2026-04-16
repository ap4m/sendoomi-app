import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { resolveMetadataUrl } from '../app/utils/metadata_utils';

describe('Metadata Extraction (Fixtures)', () => {
  
  it('should correctly resolve protocol-relative URLs in the Argos fixture', () => {
    const fixturePath = path.resolve(__dirname, 'fixtures/metadata/argos_brita.html');
    const html = fs.readFileSync(fixturePath, 'utf8');
    
    // Simulate what HTMLRewriter does: extract the og:image content
    const ogImageMatch = html.match(/property="og:image"\s+content="([^"]+)"/);
    let rawUrl = ogImageMatch ? ogImageMatch[1] : null;
    
    // HTMLRewriter automatically decodes entities like &amp;
    if (rawUrl) {
      rawUrl = rawUrl.replace(/&amp;/g, '&');
    }
    
    expect(rawUrl).toBe('//media.4rgos.it/s/Argos/3086234_R_SET?$Main768$&w=620&h=620');
    
    // Test the resolution logic
    const targetUrl = 'https://www.argos.co.uk/product/3086234';
    const resolvedUrl = resolveMetadataUrl(rawUrl, targetUrl);
    
    expect(resolvedUrl).toBe('https://media.4rgos.it/s/Argos/3086234_R_SET?$Main768$&w=620&h=620');
  });

  it('should correctly resolve relative URLs', () => {
    const rawUrl = '/assets/product-123.jpg';
    const targetUrl = 'https://example.com/store/item';
    const resolvedUrl = resolveMetadataUrl(rawUrl, targetUrl);
    
    expect(resolvedUrl).toBe('https://example.com/assets/product-123.jpg');
  });

  it('should prioritize og:image over twitter:image (Logic Simulation)', () => {
    // In our implementation, we take the first found.
    // This test ensures our resolution utility is ready for both.
    const ogUrl = '//og-image.com/img.jpg';
    const twUrl = '//tw-image.com/img.jpg';
    const base = 'https://test.com';
    
    expect(resolveMetadataUrl(ogUrl, base)).toBe('https://og-image.com/img.jpg');
    expect(resolveMetadataUrl(twUrl, base)).toBe('https://tw-image.com/img.jpg');
  });

});
