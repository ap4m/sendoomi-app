import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Ingestion UI', () => {
  beforeEach(() => {
    // Reset location and history mocks before each test
    vi.stubGlobal('location', { search: '' });
    vi.stubGlobal('history', { replaceState: vi.fn() });
  });

  it('should render the welcome screen with no shared data', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to the Choice Engine/i)).toBeInTheDocument();
    expect(screen.queryByText(/Item Received/i)).not.toBeInTheDocument();
  });

  it('should display the "Item Received" card when valid share data is present in URL', async () => {
    // Simulate a share target request
    const mockSearch = '?title=Amazon+Toy&link=https://amzn.eu/d/123';
    vi.stubGlobal('location', { 
      search: mockSearch,
      pathname: '/'
    });

    render(<App />);

    // Verify card content
    expect(screen.getByText(/Item Received/i)).toBeInTheDocument();
    expect(screen.getByText(/Amazon Toy/i)).toBeInTheDocument();
    expect(screen.getByText(/https:\/\/amzn.eu\/d\/123/i)).toBeInTheDocument();
  });

  it('should cleanup the URL history immediately after ingestion', () => {
    const mockSearch = '?title=Test';
    vi.stubGlobal('location', { 
      search: mockSearch,
      pathname: '/'
    });

    render(<App />);

    // Verify cleanup was called
    expect(window.history.replaceState).toHaveBeenCalledWith(
      {},
      expect.any(String),
      '/'
    );
  });
});
