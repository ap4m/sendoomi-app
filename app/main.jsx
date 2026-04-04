import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './app.css';
// import './services/analytics.js'; // Isolated for diagnostic recovery

console.log('Sendoomi Shell: Bootstrapping...');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
