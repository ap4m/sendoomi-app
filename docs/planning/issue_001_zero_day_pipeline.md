# Planning: Zero Day Pipeline (Issue #1)

Establish the 'Feedback First' engineering foundation for Sendoomi, transitioning from a static marketing prototype to a robust Multi-Page React application with automated CI/CD.

## 🎯 Final Goal
A production-ready repository where every push is verified by a test gate and every feature branch gets a unique **Cloudflare Preview URL**.

## 🗣 Ubiquitous Language (DDD)
- **Choice Engine:** The core React-powered portion of Sendoomi where kids interact.
- **Marketing Site (Zen Site):** The promotional root domain site.
- **Environment Fidelity:** Ensuring local feedback matches the production Cloudflare runtime.
- **Test Gate:** A mandatory CI step that blocks deployments if unit tests fail.

## 🔄 Iterations

### Iteration 1: The Governance Foundation
- **Goal:** Codify the 'Feedback First' philosophy and Documentation Hub.
- **Status:** [x] Done

### Iteration 2: Multi-Page Architecture (MPA)
- **Goal:** Shift to Vite 5 and React. Separate the Marketing Site from the Choice Engine.
- **Status:** [x] Done

### Iteration 3: CI/CD Hardening (The Test Gate)
- **Goal:** Add Vitest and mandate `npm test` success before any deployment.
- **Status:** [x] Done

### Iteration 4: Cloudflare Alignment (Environment Fidelity)
- **Goal:** Move deployment to Cloudflare Pages. Introduce **Wrangler** for local parity and **Branch Previews** for cloud feedback.
- **Status:** [x] Done

### Iteration 5: Observability (Privacy-First)
- **Goal:** Track traffic impressions and PWA lifecycle events (Installs) using Cloudflare Web Analytics.
- **Status:** [x] Done

### Iteration 6: Subdomain Parity (Environment Decoupling)
- **Goal:** Decouple Marketing ([**sendoomi.com**](https://sendoomi.com)) and App ([**app.sendoomi.com**](https://app.sendoomi.com)).
- **TDD Requirement:** Independent build outputs that both serve from the Root (`/`).
- **Status:** [x] Done

## 🚦 Decision (Go/No-Go)
- [x] **Go (1-4):** Foundation approved.
- [x] **Go (6):** Proceed with Subdomain Parity implementation.
