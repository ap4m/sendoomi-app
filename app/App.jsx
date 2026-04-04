function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <img src="../assets/logo.png" alt="Sendoomi" className="logo" style={{ mixBlendMode: 'multiply' }} />
      </header>
      <main className="app-main">
        <h1>Welcome to the Choice Engine</h1>
        <p className="subtitle">Digital Zen is loading...</p>
        
        <div className="status-card">
          <div className="status-dot"></div>
          <span>Local Storage: Ready (IndexedDB)</span>
        </div>
      </main>
      <footer className="app-footer">
        <p>Sendoomi Build v0.1.0-alpha</p>
      </footer>
    </div>
  );
}

export default App;
