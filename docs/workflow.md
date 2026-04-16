# Development Workflow: Predictable Delivery

Sendoomi is developed using tight feedback loops to ensure that every change is intentional, verified, and outcome-focused.

## 🔄 The Development Loop

Every change follows the **"One Outcome = One Change"** rule. A change is triggered by an Issue with a specific, outcome-focused Goal.

### 1. Planning Phase
- **Action:** A Planning Document is created to map the path to the Goal.
- **Outcome:** The plan defines the "Go/No-Go" gate. We only proceed once the outcome is clearly understood and approved.

### 2. Verified Implementation (RED-GREEN-REFACTOR)
We use strict **TDD** to ensure the code always meets the Goal:
- **RED:** Define the requirement with a failing test.
- **GREEN:** Implement the minimal code to pass.
- **REFACTOR (User-Led):** Technical cleanup and structural optimization.

### 3. Verification Checklist
Before any sign-off, the following must be verified:
- **Correctness:** All tests pass and the local build (`npm run preview`) is error-free.
- **Explicit Config:** Verify that Vite points correctly to its central config.
- **Asset Integrity:** All assets are imported via the Vite pipeline (no lazy copies).
- **Smoke Test:** Perform a manual audit of the browser console for runtime errors.

### 4. Actionable Retrospective
A retrospective is performed after every branch merge, focusing on **3 key takeaways**.
- **Rule:** If a retrospective identifies a necessary change to the project's logic or process, the **Core Documentation** (Design Principles, Workflow) MUST be updated immediately to reflect this. This prevents "parallel consideration" drift.

### 5. ADR (Architectural Decision Records)
ADRs are created only when a **Significant Decision** is made that changes the system's shape. They are not required for every branch.

---

## ⚠️ The "Stop" Principle
If an implementation becomes non-linear or hits an unexpected hurdle, the Agent must **STOP** and document the situation. 
- **Action:** Use a Deviation Document to capture the problem and remediate the path before resuming.

---

## 🛑 Agent Guardrails (Hard-Stop Protocol)

To ensure **User-Led Control**, the AI Agent must follow these strict rules:

1.  **Forbidden Git Actions:** The Agent is strictly **forbidden** from running `git commit` or `git push`. The User is the sole author of the project history.
2.  **Wait-State Approval:** The Agent must **STOP** and wait for an explicit **"Approved," "Go," "Execute," or "LGTM"** before running any code-changing tool or destructive Git command (e.g., `git rm`, `git add`, `git reset`).
3.  **No Emergency Bypasses:** Build failures or "obvious" fixes are NOT reasons to bypass the Wait-State. Every fix must be proposed and approved.
4.  **Sandbox Discipline:** The Agent is forbidden from modifying any file not explicitly listed in an approved Implementation Plan.

---
*By following this loop, we ensure that Sendoomi remains simple, robust, and user-driven.*
