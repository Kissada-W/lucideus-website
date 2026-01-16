# Implementation Plan - Restructure and Polish Navigation Components

## Phase 1: Foundation & Design System Setup
- [ ] Task: Audit and Refactor `globals.css`
    - [ ] Update `src/app/globals.css` to define semantic color tokens (e.g., `--nav-bg`, `--nav-text`, `--nav-border`) based on existing Tailwind config.
    - [ ] Verify Tailwind v4 config picks up these variables correctly.
- [ ] Task: Create Reusable Navigation Atoms
    - [ ] Create `src/components/navigation/atoms/NavContainer.tsx` with correct max-width and padding.
    - [ ] Create `src/components/navigation/atoms/NavLink.tsx` (unifying `SimpleLink`, `RichLink`, etc.) with strict spacing.
    - [ ] Create `src/components/navigation/atoms/NavTrigger.tsx` for mega menu triggers.
    - [ ] Create `src/components/navigation/atoms/MobileToggle.tsx`.
    - [ ] Ensure all atoms use the new semantic tokens and 4/8pt grid.
- [ ] Task: Conductor - User Manual Verification 'Foundation & Design System Setup' (Protocol in workflow.md)

## Phase 2: Core Desktop Navigation
- [ ] Task: Refactor `Navbar.tsx` (Container)
    - [ ] Simplify `src/components/navigation/navbar.tsx` to use the new `NavContainer` and atoms.
    - [ ] Isolate state management (mobile open, mega menu open) into a custom hook `useNavState`.
- [ ] Task: Refactor Desktop Menu Logic
    - [ ] Move desktop-specific logic to `src/components/navigation/desktop/DesktopNav.tsx`.
    - [ ] Ensure focus management and keyboard navigation work correctly.
- [ ] Task: Refactor Mega Menus
    - [ ] Decompose `MegaPanel.tsx` into `src/components/navigation/desktop/MegaMenu.tsx`.
    - [ ] Create distinct sub-components for "Products" vs "Solutions" layouts if needed, sharing the same grid structure.
    - [ ] Apply "pixel-perfect" padding and shadow tokens.
- [ ] Task: Conductor - User Manual Verification 'Core Desktop Navigation' (Protocol in workflow.md)

## Phase 3: Mobile Navigation & Animation
- [ ] Task: Refactor Mobile Navigation
    - [ ] Move mobile logic to `src/components/navigation/mobile/MobileNav.tsx`.
    - [ ] Implement the sheet/drawer using `framer-motion` with the standard `spring` config.
    - [ ] Ensure strict 4px/8px spacing for mobile touch targets (min 44px).
- [ ] Task: Animation Tuning
    - [ ] Audit `animation-config.ts`.
    - [ ] Standardize transitions for open/close states across mobile and desktop.
    - [ ] Verify `prefers-reduced-motion` behavior.
- [ ] Task: Conductor - User Manual Verification 'Mobile Navigation & Animation' (Protocol in workflow.md)

## Phase 4: Integration & Polish
- [ ] Task: Final Integration
    - [ ] Replace the old navigation import in `src/app/layout.tsx` (or wherever used) with the new refactored `Navbar`.
    - [ ] Delete unused legacy files in `src/components/navigation/`.
- [ ] Task: Visual QA & Accessibility Check
    - [ ] Verify tab order and ARIA attributes.
    - [ ] Check color contrast ratios against semantic tokens.
    - [ ] Verify responsiveness on 320px, 768px, and 1440px viewports.
- [ ] Task: Conductor - User Manual Verification 'Integration & Polish' (Protocol in workflow.md)
