# Planning: PWA & Web Share Target (Issue #3)

Transform Sendoomi into a Progressive Web App (PWA) to enable "App-like" installability and a seamless "Send To" ingestion pipeline for parents.

## 🎯 Final Goal
A high-fidelity PWA that can be installed on Android/iOS, allowing parents to share product links directly from their mobile browsers into the Choice Engine.

## 🗣 Ubiquitous Language (DDD)
- **Share Target:** The PWA capability that allows Sendoomi to appear in the native "Send To" menu.
- **Ingestion Pipeline:** The logic that captures shared data and displays it on the user dashboard.
- **Maskable Icon:** A specialized icon format required by Android for premium splash screens.
- **Asset Drift:** The risk of icons or manifests becoming out of sync with the build root.

## 🔄 Iterations

### Iteration 1: PWA Infrastructure
- **Goal:** Integrate `vite-plugin-pwa` and configure a standalone manifest.
- **Hurdle:** Resolved the `403 Restricted` error by renaming the share parameter from `url` to `link` (bypassing Vite's internal query reserved words).

### Iteration 2: Visual High-Fidelity
- **Goal:** Integrate 192x192 and 512x512 icons with maskable support.
- **Check:** Verified manifest validity via Chrome DevTools Application tab.

### Iteration 3: Ingestion Logic (Echo)
- **Goal:** Update `App.jsx` to parse `title`, `text`, and `link` from the share target intent.
- **Discovery:** Implemented "Intelligent Extraction" to handle Android apps (like Amazon) that bundle URLs inside the description text.

### Iteration 4: Traceability & Stability
- **Goal:** Back-fill unit tests for the ingestion handler and inject Git commit hashes into the footer for deployment verification.

## 🚦 Decision (Go/No-Go)
- [x] **Go:** PWA readiness confirmed.
- [x] **Go:** Share Target logic verified on Android hardware.
- [x] **Go:** Git Traceability and Testing Gate operational.
