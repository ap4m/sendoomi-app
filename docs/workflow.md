# Development Philosophy: Feedback First

Sendoomi is developed with **Feedback as a First-Class Citizen**. We believe that building "Feedback Loops" into the process allows us to maintain a linear, predictable, and robust development pace.

## 🔄 The Feedback Lifecycle

Every feature or bugfix follows this strict sequence to minimize risk and maximize "Developer Zen."

### 1. The Context (Issue & Branch)
- **Action:** A GitHub Issue defines the problem/goal.
- **Mapping:** One Issue = One Branch.
- **Sign-off:** The User performs the final merge and sign-off.

### 2. The Feedback Loop (Planning)
- **Action:** A **Planning Document** is created based on the Issue.
- **DDD Focus:** Establish the **Ubiquitous Language** and domain model here. The names we use in the plan MUST be the names we use in the code.
- **Decision:** The plan ends with a "Go/No-Go" decision:
    - **Go:** Proceed with the implementation.
    - **Postpone:** Move to a future milestone.
    - **Ditch:** The issue is invalid or better solved elsewhere.
- **Iteration:** Complex goals are broken into small, low-risk iterations.

### 3. The Execution (RED-GREEN-REFACTOR)
We use strict **TDD** (Test-Driven Development) to ensure the code *always* provides feedback on its own correctness.
- **RED:** Define the requirement with a failing Vitest test using our agreed domain language.
- **GREEN:** Implement the minimal code to pass.
- **REFACTOR (User-Led):** Technical cleanup and structural optimization (the domain model should already be correct).

### 4. The Verification (Pipeline & Previews)
- **Action:** Every push must trigger a **Working Deployment Pipeline**.
- **Visibility:** Code changes must be verifiable via automated tests and (where applicable) marketing/UI previews.

#### 4.1 Logic & Path Audit (Surgical Standard)
To prevent "Config Blindness" and "Asset Drift," every change to the project root or build environment MUST include:
- **Explicit Config:** Verify that Vite explicitly points to its central [**`vite.config.js`**](../vite.config.js) to ensure plugin integrity.
- **Surgical Asset Import:** Avoid "Lazy Copies" of assets. All assets MUST be imported via the Vite asset-pipeline (e.g., `import logo from './assets/logo.png'`) to ensure production hashing correctness.
- **Mandatory Smoke Test:** Every sign-off must be preceded by a local [**`npm run preview`**](../package.json) and a browser console audit for runtime errors.

### 5. The Closing Loop (ADR & Retro)
- **ADR (Architectural Decision Records):** Any decision that changes the system's shape is documented using the [**ADR Template**](../.github/templates/adr_template.md).
- **Retrospective:** Performed after every branch merge using the [**Retrospective Template**](../.github/templates/retrospective_template.md).

### 6. Audience-Centric Handover
Before a branch is closed, we must provide documentation tailored to our distinct audiences:
- **For Parents (End Users):** A "What it does" guide focused on functionality, accessibility, and the "Calm UI" experience.
- **For Engineers (Agents & Humans):** A "How it works and Why" technical breakdown of the implementation, trade-offs, and future extensibility.

## ⚠️ The "Deviation" Principle
If an implementation becomes non-linear (e.g., unexpected hurdles, agent confusion, or abandoned paths), we **STOP** and document the deviation.
- **Action:** Create a **Postmortem/Deviation Document** using the [**Deviation Template**](../.github/templates/deviation_template.md).
- **Goal:** Capture the problem, circumstances, and remediation steps to prevent recurrence.

---
*By following this workflow, we ensure that Sendoomi remains a robust, reliable, and "Audience Dependent" (User, Agent, Engineer) product.*
