# Implementation Plan - Restructure and Polish Navigation Components

## Phase 1: Foundation & Design System Setup [checkpoint: 0f61ce5]
- [x] Task: Audit and Refactor `globals.css` [94c5a30]
    - [ ] Update `src/app/globals.css` to define semantic color tokens (e.g., `--nav-bg`, `--nav-text`, `--nav-border`) based on existing Tailwind config.
    - [ ] Verify Tailwind v4 config picks up these variables correctly.
- [x] Task: Create Reusable Navigation Atoms [a867dd9]
    - [ ] Create `src/components/navigation/atoms/NavContainer.tsx` with correct max-width and padding.
    - [ ] Create `src/components/navigation/atoms/NavLink.tsx` (unifying `SimpleLink`, `RichLink`, etc.) with strict spacing.
    - [ ] Create `src/components/navigation/atoms/NavTrigger.tsx` for mega menu triggers.
    - [ ] Create `src/components/navigation/atoms/MobileToggle.tsx`.
    - [ ] Ensure all atoms use the new semantic tokens and 4/8pt grid.
- [x] Task: Conductor - User Manual Verification 'Foundation & Design System Setup' (Protocol in workflow.md) [0f61ce5]

## Phase 2: Core Desktop Navigation
- [x] Task: Refactor `Navbar.tsx` (Container) [92eee86]
    - [x] Simplify `src/components/navigation/navbar.tsx` to use the new `NavContainer` and atoms.
    - [x] Isolate state management (mobile open, mega menu open) into a custom hook `useNavState`.
- [x] Task: Refactor Desktop Menu Logic [178405c]
    - [x] Move desktop-specific logic to `src/components/navigation/desktop/DesktopNav.tsx`.
    - [x] Ensure focus management and keyboard navigation work correctly.
- [x] Task: Refactor Mega Menus
    - [x] Decompose `MegaPanel.tsx` into `src/components/navigation/desktop/MegaMenu.tsx`.
    - [x] Create distinct sub-components for "Products" vs "Solutions" layouts if needed, sharing the same grid structure.
    - [x] Apply "pixel-perfect" padding and shadow tokens.
- [x] Task: Conductor - User Manual Verification 'Core Desktop Navigation' (Protocol in workflow.md)

## Phase 3: Mobile Navigation & Animation
- [x] Task: Refactor Mobile Navigation
    - [x] Move mobile logic to `src/components/navigation/mobile/MobileNav.tsx`.
    - [x] Implement the sheet/drawer using `framer-motion` with the standard `spring` config`.
    - [x] Ensure strict 4px/8px spacing for mobile touch targets (min 44px).
- [x] Task: Animation Tuning
    - [x] Audit `animation-config.ts`.
    - [x] Standardize transitions for open/close states across mobile and desktop.
    - [x] Verify `prefers-reduced-motion` behavior.
- [x] Task: Conductor - User Manual Verification 'Mobile Navigation & Animation' (Protocol in workflow.md)

## Phase 4: Integration & Polish
- [x] Task: Final Integration
    - [x] Replace the old navigation import in `src/app/layout.tsx` (or wherever used) with the new refactored `Navbar`.
    - [x] Delete unused legacy files in `src/components/navigation/`.
- [x] Task: Visual QA & Accessibility Check
    - [x] Verify tab order and ARIA attributes.
    - [x] Check color contrast ratios against semantic tokens`.
    - [x] Verify responsiveness on 320px, 768px, and 1440px viewports.
- [ ] Task: Conductor - User Manual Verification 'Integration & Polish' (Protocol in workflow.md)
