# Design Principles: Sendoomi Choice Engine

## 🎯 Core Goal: Cognitive Load Reduction
Sendoomi is a high-contrast, distraction-free interface designed for children with SEND, focusing on reducing cognitive load for both users and developers.

### 🚫 Non-Goals
1. **Minimize Sensory Overload:** Avoid rewards, stars, confetti, or "Good job!" animations. Sendoomi is a choice-engine for real-world items, not a source of digital entertainment.
2. **Minimal Branding:** Keep the "Kid View" free of store logos (Amazon, eBay) and even Sendoomi's own branding to prevent distraction.

## 🌈 Color Palette
Soft, high-contrast, but limited.

- **Background:** Neutral Gray or Off-White (`#F9F9F9`, `#E0E0E0`).
- **Choice (Positive):** Emerald Green (`#2ECC71`).
- **Choice (Negative):** Soft Coral/Red (`#E74C3C`).
- **Surface:** Clean White (`#FFFFFF`) with subtle shadows.

## 🖼 Iconography: The PECS Standard
**PECS (Picture Exchange Communication System)** is a widely used symbol language for children with SEND.
- Icons should be simple, bold line-art or clear stickers.
- **Binary Choice Icons:**
    - ✅ **Yes / This One:** Green Tick or Smiling Icon.
    - ❌ **No / Not This:** Red X or Neutral Icon.

## 📱 Interaction Guidelines
1. **Large Tapping Targets:** Buttons must be at least **48x48px** (ideally larger).
2. **Spacing:** Massive gutters between items to prevent accidental "Fat Finger" taps.
3. **No Horizontal Scroll:** Use vertical scrolling or single-item "swipe" styles to maintain path clarity.
4. **Haptics:** Simple haptic feedback on choice (if supported) to provide sensory confirmation.

## 🗣 Adaptable Communication Styles
Communication should be adaptable. The app should allow for choosing or discovering the communication style (visual, audio, etc.) that works best for the child.
- **Visual Primary:** High-res, clear product photos on neutral backgrounds.
- **Audio Augmentation (Future):** Ability to read item titles or play confirmation sounds based on child needs.

## 🛠 Features
- **Neutral Backgrounds:** Stored item images should be cropped or displayed on a plain surface.
- **Clear Images:** The Parent view should prioritize high-res, clear product photos.
