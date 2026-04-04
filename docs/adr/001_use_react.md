# ADR 001: Use React for Application Shell

## Status
Accepted

## Context
Sendoomi requires a robust, component-based architecture for its local-first "Choice Engine." While Vanilla JS is possible, we need to balance speed of development with long-term maintainability and access to high-quality existing packages (PWA, UI, state management).

## Decision
We will use **React** for the application source code located in [**`/app`**](../../app/). 
- We will leverage the **Vite React Plugin** for the build pipeline.
- We will maintain a **Multi-Page App (MPA)** structure to keep the marketing site ([**`/www`**](../../www/)) decoupled and lightweight.

## Consequences
- **Positive:** Increased developer velocity, access to modern hook-based state management (useful for IndexedDB integration), and industry-standard component patterns.
- **Negative:** Increased build complexity and larger bundle size for the application (mitigated by keeping the marketing site Vanilla JS).
