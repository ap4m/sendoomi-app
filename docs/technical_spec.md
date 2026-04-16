# Technical Specification: Sendoomi

## 🏗 High-Level Architecture
Sendoomi is a **Local-First, Offline-Capable PWA** designed for mobile deployment.

### 🔌 V1: Single-Device Focus
V1 exists *only* on the parent's device. No cloud synchronization, no user accounts, no identity providers.

| Feature | Implementation | Notes |
| :--- | :--- | :--- |
| **Hosting** | Cloudflare Pages | Fast, simple, CDN-backed. |
| **PWA Engine** | Vite PWA Plugin | Handles Service Workers & Offline Caching. |
| **Storage** | **IndexedDB** | Used for local link data, metadata, and images. |
| **Share Target** | Web Share Target API | Allows external apps (Amazon, browser) to share to Sendoomi. |
| **Data Extraction** | Open Graph / Scraping | Extracting image and title from shared links locally. |

## 📦 Tech Stack
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Core:** HTML/CSS/JS (React-based for component state management)
- **Testing:** [Vitest](https://vitest.dev/)
- **Styling:** CSS Modules or Tailwind (TBD based on accessibility needs)

## 🔒 The "Kid View" Lock
To prevent accidental escapes, the V1 lock will be a **Dead-End View**:
- **Design:** No "Back" buttons, no navigation bars, no browser interface (PWA `display: standalone`).
- **Exit Strategy:** The parent must restart the app or use a device-level "Home" action to return to the curator view.
- **Goal:** Simple enough for a child to use without triggering accidental "Parent Mode" functions.

## 📱 PWA Capabilities & Compatibility

Sendoomi leverages Progressive Web App standards to provide an "App-like" feel and a streamlined ingestion pipeline.

### 🎁 Web Share Target API & Manual Ingestion
The "Choice Engine" acts as a native share target. This allows parents to "Share" items directly from browsers or other apps into Sendoomi.

- **Ingestion Endpoint:** `/`
- **Parameters:**
    - `title`: (Optional) The name of the item.
    - `link`: (Recommended) The URL to the product or experience.
    - `text`: (Optional) Description or note. Also searched for a URL if `link` is missing.
    - `url`: (Legacy) Fallback for `link`.

**Example Manual Ingestion URL:**
```text
https://app.sendoomi.com/?title=Amazon+Toy&link=https://amzn.eu/d/123&text=Birthday+Gift
```

- **Use Case:** Effortless curation of gifts, toys, or experiences via the native "Share" menu or manual link building.

### 🌐 Browser Compatibility Matrix

| Feature | Chrome / Edge | Firefox Desktop | Safari (macOS) | Mobile (iOS/Android) |
| :--- | :--- | :--- | :--- | :--- |
| **"Install" Prompt** | ✅ Native | ❌ Not Supported | ✅ "Add to Dock" | ✅ Fully Supported |
| **Share Target** | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Fully Supported |
| **Offline Support** | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Fully Supported |

> [!NOTE]
> **Firefox Desktop** intentionally discontinued support for native site installation. To verify the "Install" flow locally, use Chrome or a Chromium-based browser.

## 💾 Storage Strategy (IndexedDB)
Why **IndexedDB** over LocalStorage?
1. **Blob Storage:** Ability to store images directly (for screenshot fallbacks or cached product photos).
2. **Persistence:** Better for larger, unstructured data like curation lists.
3. **No-Auth:** All data belongs to the device.
