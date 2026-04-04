# Sendoomi 🎁

**Sendoomi** (SEN + doomi / "to me") is a walled-garden shopping experience designed specifically for kids with Special Educational Needs (SEND). 

It empowers children to make independent choices from a parent-curated list of items or experiences, protecting them from the predatory and overwhelming interfaces of traditional e-commerce while helping parents "test-drive" their child's interests.

## 🌟 Core Mission
To provide a calm, binary, and accessible "choice engine" that bridges the communication gap between SEND children and their carers regarding real-world gifts and experiences.

## 🛠 Tech Stack
- **Framework:** Vite + Vanilla JS (PWA focus)
- **Deployment:** GitHub Pages (www) + Cloudflare Pages (app)
- **Architecture:** Local-first via IndexedDB (No-Auth V1).
- **Testing:** Vitest (Strict TDD: RED-GREEN-REFACTOR).

## 🤖 AI Agent Onboarding
**CRITICAL:** If you are an AI agent, you **MUST** run the following workflow before making any changes:
- **/restore-context**: [**.agents/workflows/restore-context.md**](file:///home/richardarpino/Dev/ap4m/sendoomi-app/.agents/workflows/restore-context.md)

This workflow verifies the mission, working patterns (TDD), and your "Read-Only" status for Git commits.

## 🤝 How We Work
We follow a disciplined **RED-GREEN-REFACTOR** pattern:
1.  **RED:** I (Antigravity) write a failing test case that defines a requirement.
2.  **GREEN:** I implement the minimal code required to make the test pass.
3.  **REFACTOR:** **You (the User) lead the refactor.** We discuss naming, domain modeling (DDD), and architectural cleanup to ensure the codebase remains intentional and clean.

## 📂 Project Structure
- `/docs`: Detailed product and technical documentation.
- `/src`: Application source code (Future).
- `/tests`: Vitest suites (Future).

---
*Built out in the open, one iteration at a time.*