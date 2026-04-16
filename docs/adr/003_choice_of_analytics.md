# ADR 003: Choice of Cloudflare Web Analytics (Privacy First)

## Status
Accepted

## Context
Sendoomi targets children with Special Educational Needs (SEND). Privacy and the absence of predatory tracking are paramount. We require basic observability (Impressions and PWA Installs) to validate the "Feedback First" loop, but we must do so without cookies or personal data collection.

## Decision
We will use **Cloudflare Web Analytics** as our primary observability engine.
- It is **cookieless** and collects no personal data.
- It integrates natively with our Cloudflare Pages hosting.
- We will use the **Custom Events** API to track PWA-specific lifecycle events (e.g., Installations).

## Consequences
- **Positive:** 100% "Digital Zen" privacy compliance. No cookie banners required. Minimal performance impact.
- **Negative:** Limited demographic depth compared to GA4 (a trade-off we accept for privacy).
