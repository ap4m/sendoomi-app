# ADR 002: Move to Cloudflare Pages (Environment Fidelity)

## Status
Accepted

## Context
Sendoomi's [**Technical Specification**](../../docs/technical_spec.md) targets a Cloudflare-driven stack for its performance, globally distributed CDN, and future Worker/D1/KV capabilities. To adhere to our **"Feedback First"** philosophy, we need our deployment environment to provide high-fidelity feedback on how the production runtime handles our Multi-Page App (MPA) and local assets.

## Decision
We will migrate from GitHub Pages to **Cloudflare Pages** for all production and preview deployments.
- We will integrate **Wrangler** into our local development environment for 100% runtime parity.
- We will leverage **Branch Previews** on every feature branch to enable visual sign-off before merging to the `main` trunk.

## Consequences
- **Positive:** High-fidelity environment feedback, automated branch previews (visual feedback loops), and a seamless path toward adding server-side V2 Worker logic (e.g., link scraping).
- **Negative:** Requires management of Cloudflare-specific secrets (`ACCOUNT_ID`, `API_TOKEN`) within our CI/CD pipeline.
