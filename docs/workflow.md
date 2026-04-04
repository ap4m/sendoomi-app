# Workflow: RED-GREEN-REFACTOR

Sendoomi is developed using strict **Test-Driven Development (TDD)** and **Domain-Driven Design (DDD)**. 

## 🔄 The Cycle

### 1. RED (Antigravity's Turn)
- **Goal:** Define a new requirement with a failing test.
- **Action:** Antigravity writes a `*.test.js` or `*.spec.js` file using **Vitest**. 
- **Requirement:** The test must accurately describe the domain behavior (e.g., `should_add_item_to_curation_list_on_share`).
- **Wait:** Antigravity shows the test failing (RED) and waits for a "GO" signal if needed, or proceeds to Green if an autonomous turn is in progress.

### 2. GREEN (Antigravity's Turn)
- **Goal:** Make the test pass with minimal implementation.
- **Action:** Antigravity implements the logic in the target source file.
- **Constraint:** No "over-engineering." Only enough code to satisfy the test.

### 3. REFACTOR (User & Antigravity Partnership)
- **Goal:** Clean up the "Green" mess, rename variables, and ensure DDD alignment.
- **Action:** **The User leads the refactor.** 
- **Focus:** 
    - Is the "Language" of the code (Ubiquitous Language) matching our `docs`? 
    - Are we leaking infrastructure (IndexedDB) into our domain logic?
    - Are we keeping the "Calm UI" principles?

## 🧩 DDD Concepts in Sendoomi
- **Aggregate:** `CurationList` (The collection of items).
- **Entity:** `CurationItem` (The Individual link/picture).
- **Value Object:** `Choice` (The binary Yes/No result).
- **Service:** `LinkExtractor` (The logic that turns a URL into a `CurationItem`).

---
*If regression occurs, we revert to smaller, manual RED-wait-GREEN steps.*
