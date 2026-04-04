---
description: Restore full project context for an AI Agent
---

# Sendoomi Onboarding Workflow

**Run this workflow immediately upon entering a new session to restore technical, philosophical, and procedural context.**

1. **Synchronize Mission & Map**
    - READ [**`README.md`**](../../README.md) for the high-level elevator pitch.
    - READ [**`docs/README.md`**](../../docs/README.md) to understand the full map of the knowledge base.

2. **Understand the "Feedback First" Pattern (CRITICAL)**
    - READ [**`docs/workflow.md`**](../../docs/workflow.md).
    - **RULE 1 (TDD):** Use strict **RED-GREEN-REFACTOR**. Agent writes Red/Green; User leads Refactor.
    - **RULE 2 (Human-Led Commits):** The Agent must **NEVER** run `git commit` or `git push`. The User performs all commits as a final sign-off.
    - **RULE 3 (Artifacts):** Adhere to the standardized templates linked in the [**Documentation Hub**](../../docs/README.md#5-standardized-templates).

3. **Technical Baseline**
    - Check [**`package.json`**](../../package.json) for current dependencies.
    - Check [**`.github/workflows/deploy.yml`**](../../.github/workflows/deploy.yml) for deployment automation status.

4. **Synchronize Current State**
    - Check for an existing `task.md` in the brain cache/local directory.
    - Run `git status` to see uncommitted changes.
    - Run `git log -n 5` to see recent architectural decisions.

---
*By following this sequence, you align with the "Feedback First" philosophy from your first turn.*
