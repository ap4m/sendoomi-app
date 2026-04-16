# Retrospective: Postmortem #002 - The Context Debacle

**Branch:** `pipeline` (Sendoomi Zero Day Stabilization)

## Goal
To decouple the project into independent root environments ([**`/www`**](../../www/) and [**`/app`**](../../app/)) while maintaining a clean, zero-warning production build and functional local previews.

## What Went Well
- **Subdomain Parity:** The "Logical Monorepo" architecture is successfully implemented.
- **Automation:** The [**dual-site CI/CD pipeline**](../../.github/workflows/deploy.yml) is functional and verified in the cloud.
- **Green Build:** We restored a 100% warning-free build environment.

## What Didn't Go Well
Following the early start on Iteration 5, the project "unraveled" through a cascade of technical failures:

### 1. Config Blindness (The "Blank Screen")
- **The Failure:** By shifting the Vite `root` to [**`app/`**](../../app/), I failed to account for Vite's configuration lookup. 
- **The Result:** Vite ignored the [**`vite.config.js`**](../../vite.config.js) in the parent folder, stripping the React plugin and causing a `ReferenceError: React is not defined` in the browser. 
- **The Recovery:** Instead of auditing the JS bundle, I "guessed" it was a cache issue (proposing a "Deep Clean"). This was non-surgical and delayed resolution.

### 2. The "Asset Debacle" (Lazy Copy Bloat)
- **The Failure:** When assets 404'd after the decoupling, I performed a "Lazy Copy" (`cp -r assets app/assets`) instead of a surgical path resolution.
- **The Result:** The repository was bloated with redundant design originals in the build root, violating our "Digital Zen" principle of clinical hygiene.

### 3. Path Drifts (Production Hashing)
- **The Failure:** I used a **String Literal** (`src="./assets/logo.png"`) in the [**Choice Engine**](../../app/App.jsx) instead of the Vite asset import pattern.
- **The Result:** The logo load worked in dev but failed in production because Vite hashes assets (e.g., `logo-DHcHJate.png`).

## Action Items (Stabilisation Protocol)
The following mandatory steps are now part of our **Feedback First** workflow:

1.  **Plugin & Path Audit:** Every change to the project root or build environment MUST include a verification of the Vite plugin pipeline and asset resolution paths.
2.  **Explicit Config:** Maintain explicit [**`--config vite.config.js`**](../../package.json) flags in all scripts to eliminate "Config Blindness".
3.  **Surgical Asset Restoration:** Never perform "Lazy Copies" of directory trees. All assets MUST be imported via the Vite asset-pipeline pattern.
4.  **Clinical Verification:** All "Success Sign-offs" MUST be preceded by a **Smoke Test** ([**`npm run preview`**](../../package.json)) and a **Logic Verification** (browser console check).
