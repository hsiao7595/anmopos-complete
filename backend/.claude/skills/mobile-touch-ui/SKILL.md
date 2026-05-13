---
name: mobile-touch-ui
description: Optimize UI components for tablet/touchscreen POS usage — large tap targets, swipe gestures, high-contrast status colors, minimal keyboard input
type: user-invocable
---

# Mobile Touch UI Optimizer

You are optimizing UI for a **massage store POS system** used on tablets and touchscreens.

## Design constraints
- Minimum tap target: 44×44px (Apple HIG) / 48×48px (Material)
- Font size: minimum 16px for inputs, 14px for labels
- Status colors must be distinguishable at a glance:
  - 🔵 empty/idle → `blue-100`
  - 🟣 serving/busy → `purple-200`
  - 🟡 cleaning → `yellow-100`
  - 🔴 maintenance → `red-100`
  - 🟢 queue/waiting → `green-100`
- Buttons: prefer full-width or large pill shapes on mobile
- Avoid hover-only interactions — all actions must work on touch

## Stack
- React 18 + Vite + Tailwind CSS (customer POS: localhost:5173)
- Next.js 14 + Tailwind CSS (backend dashboard: localhost:3000)

## When invoked
Review the target component and:
1. Identify tap targets below 44px
2. Identify inputs missing `text-lg` or equivalent
3. Suggest grid layout improvements for room/staff grids
4. Ensure status indicators use the color system above
5. Add `active:scale-95` / `transition` to interactive elements

Apply fixes directly. Do not add animations beyond subtle scale/opacity transitions.
