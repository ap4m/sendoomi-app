import { useState, useEffect } from 'react';
import logo from './assets/logo.png';

function App() {
  const [sharedData, setSharedData] = useState(null);
  const [debugQuery, setDebugQuery] = useState('');

  useEffect(() => {
    const rawSearch = window.location.search;
    const params = new URLSearchParams(rawSearch);
    const title = params.get('title');
    const text = params.get('text');
    // Check both 'link' (new) and 'url' (old/fallback) to handle cached manifests
    const link = params.get('link') || params.get('url');

    if (title || text || link) {
      setDebugQuery(rawSearch);
      setSharedData({ title, text, link });
      // Clear URL parameters to prevent re-capturing on refresh
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <img src={logo} alt="Sendoomi" className="logo" style={{ mixBlendMode: 'multiply' }} />
      </header>
      <main className="app-main">
        <h1>Welcome to the Choice Engine</h1>
        <p className="subtitle">Digital Zen is loading...</p>
        
        {sharedData && (
          <div className="share-echo-card" style={{ 
            background: '#f0fdf4', 
            border: '1px solid #bbf7d0', 
            padding: '1rem', 
            borderRadius: '8px',
            marginBottom: '1rem',
            textAlign: 'left'
          }}>
            <h3 style={{ color: '#166534', margin: '0 0 0.5rem 0' }}>🎁 Item Received</h3>
            <p><strong>Title:</strong> {sharedData.title || 'N/A'}</p>
            <p><strong>Text:</strong> {sharedData.text || 'N/A'}</p>
            <p><strong>URL:</strong> <a href={sharedData.link} target="_blank" rel="noreferrer">{sharedData.link}</a></p>
            
            {/* Zen Debug Bar */}
            <div style={{ marginTop: '1rem', fontSize: '10px', color: '#666', borderTop: '1px solid #eee', paddingTop: '0.5rem' }}>
              <strong>Raw Debug:</strong> {debugQuery || 'No query params captured'}
            </div>
          </div>
        )}

        <div className="status-card">
          <div className="status-dot"></div>
          <span>Local Storage: Ready (IndexedDB)</span>
        </div>
      </main>
      <footer className="app-footer">
        <p>Sendoomi Build v0.1.1-alpha</p>
      </footer>
    </div>
  );
}

export default App;
