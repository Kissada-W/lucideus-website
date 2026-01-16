# Specification: Restructure and Polish Navigation Components

## 1. Overview
This track focuses on refactoring the existing navigation components in `@src/components/navigation` to align with the new product guidelines. The goal is to achieve better modularity, code cleanliness, and "pixel-perfect" visual fidelity using a strict 4/8pt grid and semantic color tokens.

## 2. Goals
- **Refactor:** Decompose complex components (like `MegaPanel` and `Navbar`) into smaller, single-purpose sub-components.
- **Visual Polish:** Audit and update all margins, paddings, and alignments to strictly follow the 4px/8px grid.
- **Design System:** Replace hardcoded utility classes (e.g., `text-muted-foreground`, `bg-accent/50`) with a consistent set of semantic tokens where applicable, or strictly consistent utility usage.
- **Typography:** Ensure font sizes and weights adhere to a consistent scale.
- **Animation:** Tune Framer Motion transitions for smoothness (`gentle`, `responsive`, `snappy` configs).

## 3. Scope
- **Files:** All files within `src/components/navigation/`.
- **Global Config:** Updates to `src/app/globals.css` if new variables are needed for the refactor.
- **Testing:** Verify responsiveness (Mobile vs. Desktop) and accessibility (keyboard nav).

## 4. Technical Details
- **Grid System:** Use Tailwind's spacing scale (`1` = 4px).
  - Example: `p-2` (8px), `gap-4` (16px), `m-6` (24px).
  - Avoid arbitrary values like `mt-1.5` (6px) unless strictly necessary for optical alignment.
- **Component Structure:**
  - `Navbar`: Main container.
  - `DesktopNav`: Desktop-specific logic.
  - `MobileNav`: Mobile sheet and logic.
  - `MegaMenu`: The large dropdown panels.
  - `NavLinks`: Reusable link atoms (`SimpleLink`, `RichLink`, `MegaLink`).

## 5. Success Criteria
- Codebase is modular; `navbar.tsx` is significantly smaller.
- Visual inspection confirms consistent spacing (no "magic numbers").
- Navigation works flawlessly on Mobile and Desktop.
- No regression in accessibility or animation quality.
