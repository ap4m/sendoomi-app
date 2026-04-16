import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import { parseSharedData } from './services/ingest';
import * as storage from './services/storage';
import { fetchMetadata } from './services/metadata';

function App() {
  const [items, setItems] = useState([]);

  // Load items from storage on mount
  useEffect(() => {
    const loadItems = async () => {
      const savedItems = await storage.getAllLinks();
      setItems(savedItems);
    };
    loadItems();
  }, []);

  // Handle URL ingestion
  useEffect(() => {
    const data = parseSharedData(window.location.search);

    if (data) {
      const persistAndSync = async () => {
        // 1. Persist the basic link info first (minimal viable data)
        const id = await storage.saveLink(data);
        
        // Initial sync of the item from storage to get the ID and timestamp
        let savedItems = await storage.getAllLinks();
        setItems(savedItems);

        // 2. Attempt to enrich with metadata (visuals) if a link exists
        if (data.link) {
          const metadata = await fetchMetadata(data.link);
          if (metadata.imageUrl) {
            const currentItem = savedItems.find(i => i.id === id);
            if (currentItem) {
              await storage.updateLink({ ...currentItem, imageUrl: metadata.imageUrl });
              
              // 3. Final sync to show the image
              const enrichedItems = await storage.getAllLinks();
              setItems(enrichedItems);
            }
          }
        }
      };
      
      persistAndSync();
      
      // Clear URL parameters to prevent re-capturing on refresh
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const gitHash = import.meta.env.VITE_GIT_HASH 
    ? ` [${import.meta.env.VITE_GIT_HASH.substring(0, 7)}]` 
    : '';

  return (
    <div className="app-container">
      <header className="app-header">
        <img src={logo} alt="Sendoomi" className="logo" style={{ mixBlendMode: 'multiply' }} />
      </header>
      <main className="app-main">
        <h1>Welcome to the Choice Engine</h1>
        <p className="subtitle">Choice Engine is loading...</p>
        
        <div className="ingestion-list">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="share-echo-card">
                <h3>🎁 Item Received</h3>
                {item.imageUrl && (
                  <div className="product-preview">
                    <img src={item.imageUrl} alt={item.title || 'Product'} />
                  </div>
                )}
                <div className="item-details">
                  <p><strong>Title:</strong> {item.title || 'N/A'}</p>
                  <p><strong>Text:</strong> {item.text || 'N/A'}</p>
                  <p><strong>URL:</strong> <a href={item.link} target="_blank" rel="noreferrer" className="truncate">{item.link}</a></p>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              Ready for your first item...
            </div>
          )}
        </div>

        <div className="status-card">
          <div className="status-dot"></div>
          <span>Local Storage: Ready (IndexedDB)</span>
        </div>
      </main>
      <footer className="app-footer">
        <p>Sendoomi Build v0.1.1-alpha{gitHash}</p>
      </footer>
    </div>
  );
}

export default App;
