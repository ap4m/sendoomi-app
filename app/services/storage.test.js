import { describe, it, expect, beforeEach } from 'vitest';
import { saveLink, getAllLinks, updateLink, deleteLink, clearAllLinks } from './storage';

describe('Storage Service (IndexedDB)', () => {
  beforeEach(async () => {
    await clearAllLinks();
  });

  it('should save and retrieve a link with an optional imageUrl', async () => {
    const mockLink = {
      title: 'Amazon Product',
      text: 'Check this out!',
      link: 'https://amzn.eu/d/123',
      imageUrl: 'https://images.com/product.jpg'
    };

    await saveLink(mockLink);
    const allLinks = await getAllLinks();

    expect(allLinks).toHaveLength(1);
    expect(allLinks[0]).toMatchObject(mockLink);
    expect(allLinks[0].timestamp).toBeDefined();
    expect(allLinks[0].id).toBeDefined();
  });

  it('should update an existing link with an imageUrl', async () => {
    const id = await saveLink({ title: 'Original', link: 'https://test.com' });
    const allLinks = await getAllLinks();
    const original = allLinks.find(i => i.id === id);

    await updateLink({ ...original, imageUrl: 'https://test.com/img.jpg' });
    
    const updatedLinks = await getAllLinks();
    const updated = updatedLinks.find(i => i.id === id);
    expect(updated.imageUrl).toBe('https://test.com/img.jpg');
    expect(updated.title).toBe('Original');
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
