import { describe, it, expect, beforeEach } from 'vitest';
import { saveLink, getAllLinks, deleteLink, clearAllLinks } from './storage';

describe('Storage Service (IndexedDB)', () => {
  beforeEach(async () => {
    await clearAllLinks();
  });

  it('should save and retrieve a link', async () => {
    const mockLink = {
      title: 'Amazon Product',
      text: 'Check this out!',
      link: 'https://amzn.eu/d/123'
    };

    await saveLink(mockLink);
    const allLinks = await getAllLinks();

    expect(allLinks).toHaveLength(1);
    expect(allLinks[0]).toMatchObject(mockLink);
    expect(allLinks[0].timestamp).toBeDefined();
    expect(allLinks[0].id).toBeDefined();
  });

  it('should retrieve links in reverse-chronological order', async () => {
    await saveLink({ title: 'Oldest', link: 'https://old.com' });
    // Small delay to ensure timestamp difference
    await new Promise(resolve => setTimeout(resolve, 10));
    await saveLink({ title: 'Newest', link: 'https://new.com' });

    const allLinks = await getAllLinks();
    expect(allLinks[0].title).toBe('Newest');
    expect(allLinks[1].title).toBe('Oldest');
  });
});
