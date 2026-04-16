# Planning: Ingested Link Persistence (Issue #6)

Transition Sendoomi from a single-item display to a persistent, local-first "Ingestion Queue" using IndexedDB. 

## 🎯 Final Goal
A dashboard that remembers and displays a list of all shared items, enabling parents to review multiple product picks without requiring a login or internet connection (local-first).

## 🗣 Ubiquitous Language (DDD)
- **Ingestion Queue:** The historical list of items shared with the app.
- **Local-First Storage:** Using client-side databases (IndexedDB) as the primary source of truth.
- **Persistence Layer:** The decoupled service responsible for persistence and retrieval of shared links.

## 🔄 Iterations

### Iteration 1: Persistence Infrastructure (TDD)
- **Goal:** Create the `storage.js` service using the `idb` library.
- **TDD Requirement:** Define a full Vitest suite (`storage.test.js`) in the **RED** phase before implementing any logic.
- **Mocking:** Integrate `fake-indexeddb` to ensure stable CI/CD verification.
- **Status:** [x] Done.

### Iteration 2: Dashboard Integration
- **Goal:** Update `App.jsx` to synchronize its state with IndexedDB.
- **Behavior:** Load all items on mount; append and persist item on each new ingestion.

### Iteration 3: The "Zen" Queue UI
- **Goal:** Replace the single-item "Echo" card with a list-based view.
- **UI State:** Implement a clean "Ready for your first item" message (no loading spinners).
- **Out of Scope:** Individual item deletion (Deferred to future issue).

## 🚦 Decision (Go/No-Go)
- [x] **Go (Iteration 1):** Persistence Infrastructure / TDD Approved.
- [ ] **Go (Iteration 2):** Dashboard Integration (Seeking Approval for RED Phase).
- [ ] **Go (Iteration 3):** UI Refinement (Deferred).
- [ ] **Go:** Full mission graduation confirmed.
