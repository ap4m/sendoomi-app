# Retrospective: PWA & Ingestion (Issue #3)

## Goal
Establish a high-fidelity Progressive Web App (PWA) with a robust "Send To" ingestion pipeline, backed by automated tests and CI-driven traceability.

## What Went Well
- **Environmental Discovery:** By using Cloudflare Previews and an on-screen "Debug Bar" early, we identified that mobile apps like Amazon bundle URLs inside descriptions—allowing us to build a robust parser instead of guessing.
- **"Zen" Refactoring:** Extracting the ingestion logic into a pure service (`ingest.js`) drastically simplified the `App.jsx` component and enabled 100% logic coverage.
- **CI-Driven Traceability:** Successfully injected the GitHub SHA into the build pipeline, providing absolute lineage for every Cloudflare preview.
- **Back-filled Quality:** Despite a "Green-first" start, we successfully back-filled 11/11 passing tests to secure the logic path.

## What Didn't Go Well
- **Parameter Collision:** Initial use of the `?url=` parameter triggered Vite's restricted access (403), requiring a mid-branch rename to `?link=`.
- **"Feedback First" Breach:** We initially implemented logic on-screen without a corresponding unit test, requiring a late-stage refactor to restore our RED-GREEN discipline.
- **Cache Persistence:** Mobile browser caching (Manifest/Service Worker) proved difficult to flush, necessitating a "Canary Version" (`v0.1.1-alpha`) to verify the code was actually updating on the device.

## Action Items
- **Issue #004 (Logger Service):** Move all debugging into a dedicated background service to keep the UI clean and leverage Chrome USB Remote Debugging.
- **Strict RED Phase:** Commit to extracting helpers and writing unit tests *before* deploying to Cloudflare for mobile discovery, especially when dealing with string parsing.
