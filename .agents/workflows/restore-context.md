---
description: Restore full project context for an AI Agent
---

# Sendoomi Onboarding Workflow

**Run this workflow immediately upon entering a new session to restore technical, philosophical, and procedural context.**

1. **Understand the Mission & Philosophy**
    - READ [**`README.md`**](file:///home/richardarpino/Dev/ap4m/sendoomi-app/README.md) for the high-level elevator pitch.
    - READ [**`docs/product_vision.md`**](file:///home/richardarpino/Dev/ap4m/sendoomi-app/docs/product_vision.md) for the core SEND audience needs.
    - READ [**`docs/design_principles.md`**](file:///home/richardarpino/Dev/ap4m/sendoomi-app/docs/design_principles.md) for "Digital Zen" / Calm UI rules.

2. **Understand Personal Working Patterns (CRITICAL)**
    - READ [**`docs/workflow.md`**](file:///home/richardarpino/Dev/ap4m/sendoomi-app/docs/workflow.md).
    - **RULE 1:** Use strict **RED-GREEN-REFACTOR**. Agent writes Red/Green; User leads Refactor.
    - **RULE 2 (Human-Led Commits):** The Agent must **NEVER** run `git commit` or `git push`. The User performs all commits as a final sign-off.

3. **Understand the Tech Stack**
    - READ [**`docs/technical_spec.md`**](file:///home/richardarpino/Dev/ap4m/sendoomi-app/docs/technical_spec.md).
    - Check [**`package.json`**](file:///home/richardarpino/Dev/ap4m/sendoomi-app/package.json) for current dependencies (Vite, PWA, Vitest).
    - Check [**`.github/workflows/deploy.yml`**](file:///home/richardarpino/Dev/ap4m/sendoomi-app/.github/workflows/deploy.yml) for current deployment automation (Actions source).

4. **Synchronize Current State**
    - Check for an existing `task.md` in the brain cache/local directory.
    - Run `git status` to see uncommitted changes.
    - Run `git log -n 5` to see the most recent architectural decisions.

---
*Follow this sequence to ensure 100% alignment with the Sendoomi mission and the User's preferred partnership model.*
