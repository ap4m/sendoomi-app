import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import * as storage from './services/storage';

// Mock storage service
vi.mock('./services/storage', () => ({
  saveLink: vi.fn(),
  getAllLinks: vi.fn(() => Promise.resolve([])),
}));

describe('App Ingestion UI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset location and history mocks before each test
    vi.stubGlobal('location', { search: '', pathname: '/' });
    vi.stubGlobal('history', { replaceState: vi.fn() });
    
    // Default mock for storage
    storage.getAllLinks.mockResolvedValue([]);
  });

  it('should render the welcome screen with no shared data', async () => {
    render(<App />);
    expect(screen.getByText(/Welcome to the Choice Engine/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(/Item Received/i)).not.toBeInTheDocument();
    });
  });

  it('should display persistent items from storage on mount', async () => {
    const mockItems = [
      { id: 1, title: 'Saved Item 1', link: 'https://link1.com' },
      { id: 2, title: 'Saved Item 2', link: 'https://link2.com' },
    ];
    storage.getAllLinks.mockResolvedValue(mockItems);

    render(<App />);

    // Wait for async load
    await waitFor(() => {
      expect(screen.getByText('Saved Item 1')).toBeInTheDocument();
      expect(screen.getByText('Saved Item 2')).toBeInTheDocument();
    });
  });

  it('should save a newly ingested item to storage and update the list', async () => {
    const mockSearch = '?title=New+Toy&link=https://toy.com';
    vi.stubGlobal('location', { search: mockSearch, pathname: '/' });
    
    storage.saveLink.mockResolvedValue({ id: 3, title: 'New Toy', link: 'https://toy.com' });
    // In actual app, ingestion will trigger a re-fetch or state update
    storage.getAllLinks.mockResolvedValue([
      { id: 3, title: 'New Toy', link: 'https://toy.com' }
    ]);

    render(<App />);

    // Verify saveLink called
    await waitFor(() => {
      expect(storage.saveLink).toHaveBeenCalledWith(expect.objectContaining({
        title: 'New Toy',
        link: 'https://toy.com'
      }));
    });

    // Verify UI updated
    await waitFor(() => {
      expect(screen.getByText('New Toy')).toBeInTheDocument();
    });
  });

  it('should cleanup the URL history immediately after ingestion', async () => {
    const mockSearch = '?title=Test';
    vi.stubGlobal('location', {
      search: mockSearch,
      pathname: '/'
    });

    render(<App />);

    // Verify cleanup was called
    await waitFor(() => {
      expect(window.history.replaceState).toHaveBeenCalledWith(
        {},
        expect.any(String),
        '/'
      );
    });
  });
});
