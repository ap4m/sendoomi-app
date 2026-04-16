import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import { parseSharedData } from './services/ingest';

function App() {
  const [sharedData, setSharedData] = useState(null);

  useEffect(() => {
    const data = parseSharedData(window.location.search);

    if (data) {
      setSharedData(data);
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
        <p className="subtitle">Digital Zen is loading...</p>
        
        {sharedData && (
          <div className="share-echo-card" style={{ 
            background: '#f0fdf4', 
            border: '1px solid #bbf7d0', 
            padding: '1rem', 
            borderRadius: '8px',
            marginBottom: '1rem',
            textAlign: 'left',
            overflowWrap: 'anywhere'
          }}>
            <h3 style={{ color: '#166534', margin: '0 0 0.5rem 0' }}>🎁 Item Received</h3>
            <p><strong>Title:</strong> {sharedData.title || 'N/A'}</p>
            <p><strong>Text:</strong> {sharedData.text || 'N/A'}</p>
            <p><strong>URL:</strong> <a href={sharedData.link} target="_blank" rel="noreferrer">{sharedData.link}</a></p>
          </div>
        )}

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
