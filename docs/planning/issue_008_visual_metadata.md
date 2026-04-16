# Planning: Visual Data Extraction (Metadata) (Issue #8)

Implement a server-side metadata extraction pipeline using Cloudflare Pages Functions to fetch and parse "visual data" (images) from ingested links.

## 🎯 Final Goal
A rich, high-contrast preview for the Choice Engine that displays product images extracted from shared links (Open Graph/Twitter).

## 🗣 Ubiquitous Language (DDD)
- **Metadata Extractor:** The server-side logic responsible for parsing HTML for visual hints.
- **Proxy Function:** A Cloudflare Pages Function that fetches external content to bypass CORS.
- **Echo Card:** The visual component displaying the ingested item and its image.

## 🔄 Iterations

### Iteration 1: The Metadata Function (Backend)
- **Goal:** Create a Cloudflare Pages Function at `/functions/metadata.js`.
- **Logic:** Use `HTMLRewriter` to extract `og:image` and `twitter:image`.
- **Status:** [ ] TODO.

### Iteration 2: Persistence & Integration (Frontend)
- **Goal:** Update `storage.js` to persist `imageUrl` and update `App.jsx` to trigger extraction.
- **TDD:** Update `storage.test.js` to ensure the new field is persisted.
- **Status:** [ ] TODO.

### Iteration 3: Visual Polish
- **Goal:** Update the UI to render images on neutral backgrounds.
- **Behavior:** Hide image container if no image is found; keep description visible.
- **Status:** [ ] TODO.

## 🚦 Decision (Go/No-Go)
- [x] **Plan Approved:** 2026-04-16
- [ ] **Go (Iteration 1):** Backend Function Verified.
- [ ] **Go (Iteration 2):** Integration Verified.
- [ ] **Go (Iteration 3):** UI Polish Verified.
- [ ] **Go:** Issue graduation confirmed.
