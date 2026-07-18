# Implementation Plan: Visual and Motion Polish

This document outlines the design and technical steps required to implement the requested premium visual and interaction enhancements for the Meridian Systems codebase.

## Overview
We are updating the UI from a flat design to a highly polished, interactive, and modern digital interface using Framer Motion, custom CSS variables, and SVG animations.

---

## Progress Checklist

### 1. Background Depth System
- [x] **Drifting Accent Orbs**
  - Implement 3 floating radial gradient orbs (behind Hero, Credibility, and Final CTA).
  - Configure keyframe animations or Framer Motion loops (20–28s alternate ease-in-out, moving 40–80px).
  - Set opacity: accent blue (`#4A6FA5`) at 6–8%, warm amber (`#F59E0B` or similar) at 4%.
- [x] **Dot Grid Overlay**
  - Add a fixed full-page overlay with a 1px dot grid on a 32px spacing.
  - Apply CSS radial mask (`mask-image: radial-gradient(...)`) so it dissolves smoothly at the viewport edges.
- [x] **Film Grain Layer**
  - Create a lightweight SVG turbulence noise filter (`feTurbulence` with ~3–4% opacity).
  - Set it as a fixed overlay above background layers to soften color banding.

### 2. Hero Treatment
- [x] **Gradient Text Headline**
  - Apply CSS text gradient transition (White → Light Gray → Accent Blue) specifically on the phrase `"more manual than they need to be."`.
- [x] **Line-by-Line Mask Reveal**
  - Split the hero headline into lines and wrap each in a clip mask (`overflow-hidden`).
  - Animate them sliding up sequentially with a 60ms stagger using Framer Motion.
- [x] **Animated Eyebrow Underline**
  - Add an underline below the hero eyebrow label.
  - Animate its width drawing from left-to-right (`0px` to `32px`) on mount.
- [x] **Subtle Parallax**
  - Integrate scroll-linked transforms using `useScroll` and `useTransform`.
  - Apply subtle scroll parallax: headline moves up ~20px slower than scroll; hero accent orb moves ~40px slower.

### 3. Credibility Count-Up
- [x] **Interactive Count-Up Components**
  - Create a reusable `<Counter />` component using Framer Motion's `useMotionValue`, `useTransform`, and `animate()`.
  - Use `useInView` to trigger the animation once when scrolled into view (duration ~1.2s, ease-out).
  - Keep suffixes (`+`, `%`) fixed and static.

### 4. Card Interactions
- [x] **Cursor Spotlight**
  - Track pointer coordinates on mouse move (`onMouseMove`) inside `AutomationExamples` and `FitAssessment` cards.
  - Map coordinates to local CSS variables (`--mouse-x`, `--mouse-y`).
  - Render a radial spot gradient background that follows the cursor inside the card boundaries.
- [x] **Hover Lift & Border Glow**
  - Implement hover transition: lift card (`translateY(-2px)`) and change border color from `#242424` to `#4A6FA5` (40% opacity) over 200ms.
- [x] **Icon Micro-Animations**
  - Add group hover styles: on card hover, transition icon border to accent blue and translate the icon slightly (`~2px`).

### 5. Section-Level Motion
- [x] **Accent Underline Eyebrow Draw**
  - For section eyebrows ("Honest Fit Assessment", "The Process", "Free Automation Audit"), add an SVG path underline.
  - Trigger `pathLength` animation from `0` to `1` when the header enters the viewport.
- [x] **Step Circles Sequential Fill**
  - In `HowItWorks` and `WhatHappensNext` timelines, animate circle backgrounds from outline-only (`border-line`) to fill (`bg-accent` / `text-white`) as they scroll into view.
- [x] **Top Scroll Progress Bar**
  - Add a 2px fixed bar at the very top of the page.
  - Bind width to `scrollYProgress` using Framer Motion.

### 6. Form Polish
- [x] **Floating Labels**
  - Re-structure form inputs in `AuditForm.tsx` to use relative styling.
  - Animate label transitioning to small/floating status when the input has focus or holds a value.
- [x] **Focus Glow Ring**
  - Style input fields on focus: 1px accent border and a soft glow ring (`box-shadow: 0 0 0 4px rgba(74,111,165,0.12)`).
- [x] **Optional Textarea Character Counter**
  - Display a live counter (`0 / 500`) for the bottleneck field.
  - Highlight counter text in accent blue when length exceeds 80% (400 characters).
- [x] **Submit Button Sweep & Morph**
  - Add a sliding gradient shimmer sweep effect on hover (`::after` translation).
  - Morph submit button into a success checkmark status with a Framer Motion layout animation.

### 7. Micro-Interactions
- [x] **Magnetic CTA Buttons**
  - Add a magnetic pull script/animation to primary buttons so they drift up to `6px` towards the cursor on hover and spring back.
- [x] **Link Underline Grow**
  - Set up center-outward expanding underline effect (`scale-x-0` -> `scale-x-100`) on footer email link and header CTA button.
- [x] **Smooth Scroll Offsets**
  - Verify and set appropriate `scroll-margin-top` values on sections to prevent header overlap.

---

## Technical Details & Code Guidelines

### Background Depth Layers
In `App.tsx` or a new background component, we will layer:
1. **Base Color:** `#0A0A0A`
2. **Accent Orbs (Framer Motion):**
   ```tsx
   <motion.div
     animate={{ x: [0, 40, -20, 0], y: [0, -30, 40, 0] }}
     transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
     className="absolute rounded-full filter blur-[120px] bg-accent/8 opacity-[0.06] pointer-events-none"
   />
   ```
3. **Dot Grid Overlay:**
   ```css
   .dot-grid {
     background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
     background-size: 32px 32px;
     mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
   }
   ```
4. **SVG Film Grain:**
   ```html
   <svg className="fixed inset-0 pointer-events-none opacity-[0.03] z-50">
     <filter id="noise">
       <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
     </filter>
     <rect width="100%" height="100%" filter="url(#noise)" />
   </svg>
   ```

### Cursor Spotlight Card Effect
Update card hover structure using a custom React ref or state tracking the cursor relative position:
```tsx
const cardRef = useRef<HTMLDivElement>(null);
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  if (!cardRef.current) return;
  const rect = cardRef.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  cardRef.current.style.setProperty('--mouse-x', `${x}px`);
  cardRef.current.style.setProperty('--mouse-y', `${y}px`);
};
```
Styled via background gradient using CSS vars inside `src/index.css`:
```css
.spotlight-card {
  background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(74, 111, 165, 0.06), transparent 40%), #141414;
}
```

### Counter Component
A simple, robust custom hook or component utilizing Framer Motion's utilities to avoid standard looping issues:
```tsx
import { useEffect, useRef } from "react";
import { useMotionValue, useTransform, animate, useInView } from "framer-motion";

export function Counter({ value, duration = 1.2 }: { value: number, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, count, value, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
```

---

## Verification Plan

### Automated Tests
- Run `npm run typecheck` to verify no TypeScript compilation errors.
- Run `npm run build` to verify production bundles compile without warnings.

### Manual Verification
- Test all scroll effects across Desktop (Chrome, Safari, Firefox) and Mobile (Chrome, Safari) viewports.
- Check card spotlight on trackpad/mouse moves.
- Validate validation/character count in the optional text area.
- Verify submit morph layout handles height transitions smoothly.
