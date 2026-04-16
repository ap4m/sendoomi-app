import { describe, it, expect } from 'vitest';
import { parseSharedData } from './ingest';

describe('parseSharedData', () => {
  it('should return null if searchString is empty', () => {
    expect(parseSharedData(null)).toBeNull();
    expect(parseSharedData('')).toBeNull();
    expect(parseSharedData('?')).toBeNull();
  });

  it('should return null if no relevant parameters are present', () => {
    expect(parseSharedData('?foo=bar')).toBeNull();
  });

  it('should parse standard PWA share target parameters', () => {
    const search = '?title=Toy&text=Description&link=https://example.com';
    const result = parseSharedData(search);
    
    expect(result).toEqual({
      title: 'Toy',
      text: 'Description',
      link: 'https://example.com'
    });
  });

  it('should handle legacy "url" parameter as a fallback for "link"', () => {
    const search = '?title=Toy&url=https://legacy.com';
    const result = parseSharedData(search);
    
    expect(result.link).toBe('https://legacy.com');
  });

  it('should prefer "link" over "url" if both are present', () => {
    const search = '?link=https://new.com&url=https://old.com';
    const result = parseSharedData(search);
    
    expect(result.link).toBe('https://new.com');
  });

  it('should extract a URL from the "text" field if "link" is missing (Amazon/Android style)', () => {
    const search = '?title=Amazon&text=Check+out+https://amzn.eu/d/xyz+for+details';
    const result = parseSharedData(search);
    
    expect(result.link).toBe('https://amzn.eu/d/xyz');
  });

  it('should not overwrite an existing link with one extracted from text', () => {
    const search = '?link=https://explicit.com&text=Check+out+https://text.com';
    const result = parseSharedData(search);
    
    expect(result.link).toBe('https://explicit.com');
  });

  it('should return empty strings for missing fields rather than null', () => {
    const search = '?link=https://only-link.com';
    const result = parseSharedData(search);
    
    expect(result).toEqual({
      title: '',
      text: '',
      link: 'https://only-link.com'
    });
  });
});
