import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import { parseSharedData } from './services/ingest';
import { getAllLinks, saveLink } from './services/storage';

function App() {
  const [savedItems, setSavedItems] = useState([]);
  const [recentIngest, setRecentIngest] = useState(null);

  // Load history from IndexedDB on mount
  useEffect(() => {
    async function loadHistory() {
      const items = await getAllLinks();
      setSavedItems(items);
    }
    loadHistory();
  }, []);

  // Handle new shares/ingestions
  useEffect(() => {
    async function handleIngest() {
      const data = parseSharedData(window.location.search);

      if (data) {
        // Persist to IndexedDB
        await saveLink(data);
        
        // Update local state for immediate feedback
        setRecentIngest(data);
        
        // Refresh the historical list
        const items = await getAllLinks();
        setSavedItems(items);
        
        // Clear URL parameters to prevent re-capturing on refresh
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
    handleIngest();
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
        
        {recentIngest && (
          <div className="recent-success-card" style={{ 
            background: '#f0fdf4', 
            border: '1px solid #bbf7d0', 
            padding: '1rem', 
            borderRadius: '8px',
            marginBottom: '1.5rem',
            textAlign: 'left',
            animation: 'slideDown 0.3s ease-out'
          }}>
            <h3 style={{ color: '#166534', margin: '0 0 0.5rem 0' }}>🎁 Item Received</h3>
            <p style={{ margin: 0 }}><strong>{recentIngest.title || 'New Item'}</strong> added to your queue.</p>
          </div>
        )}

        <section className="history-section">
          <h2>Recently Received</h2>
          {savedItems.length === 0 ? (
            <p className="empty-message" style={{ color: '#666', fontStyle: 'italic', marginTop: '2rem' }}>
              Ready for your first item...
            </p>
          ) : (
            <div className="item-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              {savedItems.map((item) => (
                <div key={item.id} className="item-card" style={{ 
                  background: '#fff', 
                  border: '1px solid #eee', 
                  padding: '1rem', 
                  borderRadius: '8px',
                  textAlign: 'left',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  position: 'relative',
                  overflowWrap: 'anywhere'
                }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', paddingRight: '0.5rem' }}>{item.title || 'N/A'}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#555', margin: '0 0 0.5rem 0' }}>{item.text || 'N/A'}</p>
                  <a href={item.link} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: '#2563eb' }}>
                    {item.link}
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="status-card" style={{ marginTop: '2.5rem' }}>
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
