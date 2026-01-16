# GEMINI.md

> **Project Context & Operational Guide**
> This document defines the architectural context, development conventions, and
> operational rules for the `lucideus-website` project.

---

## 1. Project Overview

**Lucideus Website** is a modern web application built with **Next.js 16 (App Router)** and **React 19**. It leverages a component-driven architecture using **shadcn/ui** and **Tailwind CSS v4** for styling, with **Framer Motion** for animations.

### Key Technologies
- **Framework:** Next.js 16.1.2
- **Runtime:** React 19.2.3
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, CSS Variables
- **UI Library:** shadcn/ui (Radix UI primitives), Lucide React (Icons)
- **Animations:** Framer Motion
- **Theme:** `next-themes` (Dark/Light mode support)

---

## 2. Building and Running

This project uses **Bun** as the preferred package manager and runtime for development scripts.

### Core Commands

| Action | Command | Description |
| :--- | :--- | :--- |
| **Install** | `bun install` | Install dependencies (respects `bun.lock`) |
| **Dev** | `bun dev` | Start development server on `http://localhost:3000` |
| **Build** | `bun run build` | Compile the application for production |
| **Start** | `bun run start` | Run the built production application |
| **Lint** | `bun run lint` | Run ESLint checks |

---

## 3. Development Conventions

### 3.1 File Structure & Aliases
- **Source Root:** `src/`
- **Path Alias:** `@/*` resolves to `./src/*`
- **Components:**
  - `src/components/ui`: Reusable UI primitives (shadcn/ui)
  - `src/components/layouts`: Layout-specific components (headers, footers)
  - `src/components/common`: Shared domain components
- **Pages:** `src/app` (Next.js App Router)

### 3.2 Styling (Tailwind CSS v4)
- **Configuration:** Uses CSS variables for theming (defined in `src/app/globals.css`).
- **Utility Libraries:**
  - `clsx`: For conditional class application.
  - `tailwind-merge`: For resolving class conflicts (essential for reusable components).
  - Use the `cn()` utility (located in `src/lib/utils.ts`) for combining classes.

### 3.3 Component Architecture
- **Shadcn/ui:** Follows the "New York" style.
- **Radix UI:** Used for accessible interactive primitives (Dialog, Popover, etc.).
- **Client Components:** Add `"use client"` directive only when strictly necessary (e.g., hooks, event listeners).

### 3.4 Strict TypeScript
- `strict: true` is enabled in `tsconfig.json`.
- `noEmit: true` ensures type checking is handled by the compiler/editor, not the build output (Next.js handles emitting).
- Prefer **Interfaces** for object definitions and **Types** for unions/intersections.

---

## 4. Operational Rules (Agent)

1.  **Package Manager:** Always use `bun` for installing packages or running scripts.
2.  **File Modification:**
    - When modifying UI components, respect the existing `cva` (Class Variance Authority) patterns.
    - Ensure all new dependencies are added to `package.json` via `bun add`.
3.  **Linting:** Ensure code passes `bun run lint` before considering a task complete.
