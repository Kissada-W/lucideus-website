# Product Guidelines

## Design Principles
- **Mathematical Consistency:** Enforce a strict 4px/8px baseline grid for all spacing, margins, and padding to eliminate visual noise and ensure rhythm.
- **Clean & Airy:** Prioritize generous whitespace to enhance readability and focus. Avoid clutter; if an element doesn't serve a clear purpose, remove it.
- **Optical Harmony:** While respecting the grid, ensure optical alignment of icons, text, and containers so the UI feels balanced.

## Code Quality Standards
- **Component Modularity:** UI components should be small, single-purpose, and composed together. Avoid large, monolithic "god components."
- **Semantic HTML:** Use correct semantic tags (`<nav>`, `<header>`, `<main>`, `<article>`) to ensure accessibility and proper document structure.
- **Strict Typing:** All TypeScript code must be strictly typed. Avoid `any` and infer types where possible.
- **Dry & Maintainable:** Extract repetitive logic into hooks and repetitive styles into reusable utility classes or components.

## Development Workflow
- **Mobile-First:** Design and implement for mobile constraints first, then enhance for tablet and desktop.
- **Accessibility (a11y):** Ensure all interactive elements are keyboard accessible and have proper ARIA attributes.
- **Performance:** Optimize images, code-split heavy components, and minimize layout shifts (CLS).
