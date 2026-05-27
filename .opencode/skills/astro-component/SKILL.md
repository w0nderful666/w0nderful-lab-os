---
name: astro-component
description: Create and modify Astro components, pages, scripts, and data for w0nderful-lab-os following project conventions
license: MIT
compatibility: opencode
metadata:
  project: w0nderful-lab-os
  framework: astro
  scope: component-development
---

## What I do

I provide patterns and conventions for creating components, pages, scripts, and data entries in the w0nderful-lab-os Astro project. Follow these rules exactly.

## When to use me

Use me when creating or modifying any `.astro` component, `.ts` script, page route, or data file in this project.

---

## Project Context

- **Framework:** Astro 5.x (static output, no SSR)
- **Language:** TypeScript (strict mode)
- **Styling:** Plain CSS with CSS custom properties (design tokens in `src/styles/tokens.css`)
- **Client JS:** Vanilla TypeScript only — no React, Vue, Svelte, or any UI framework
- **State:** `window.labOS` global API, `data-*` attributes on `<html>` / `<body>`, `labos:*` custom events
- **Routing:** Astro file-based routing under `src/pages/`
- **Content:** Astro Content Collections for blog (`src/content/blog/`), schema in `src/content.config.ts`
- **Base path:** `/w0nderful-lab-os/` — always use `withBase()` from `src/data/site.ts` for internal links

---

## Component Structure

### Astro Components (`.astro`)

All Astro components follow this structure:

```astro
---
// 1. Imports
import SomeComponent from "../path/to/Component.astro";
import { someData } from "../../data/someModule";

// 2. Props with explicit type
type Props = {
  title: string;
  subtitle?: string;
  variant?: "default" | "compact";
};

// 3. Destructure with defaults
const { title, subtitle, variant = "default" } = Astro.props;

// 4. Any server-side logic (data fetching, filtering, sorting)
const items = someData.filter(item => item.active);
---

<!-- Template with semantic HTML, aria labels, data-* attributes -->
<section class="my-component" aria-label={title} data-component-variant={variant}>
  <h2>{title}</h2>
  {subtitle && <p>{subtitle}</p>}
  <slot />
</section>
```

### Props typing — always use `type Props = { ... }`, never inline

### Component categories and locations

| Category | Path | Purpose |
|----------|------|---------|
| Apps | `src/components/apps/` | Page-level app components (HomeApp, BlogApp, ProjectsApp, etc.) |
| OS | `src/components/os/` | OS shell components (SystemBar, Dock, CommandPalette, AppWindow, etc.) |
| Common | `src/components/common/` | Shared primitives (Badge, EmptyState, PostCard, ProjectCard) |
| Blog | `src/components/blog/` | Blog-specific (ArticleShell, ArticleStyleSwitcher) |

### AppWindow wrapper

Every app page component should wrap its content in `<AppWindow>`:

```astro
---
import AppWindow from "../os/AppWindow.astro";
type Props = { /* ... */ };
const { } = Astro.props;
---

<AppWindow title="MyApp.app" subtitle="Description">
  <!-- app content -->
</AppWindow>
```

AppWindow props: `title` (required), `subtitle?`, `wide?`, `detailControls?`

---

## Page Routes

Pages live in `src/pages/` and follow this minimal pattern:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import MyAppComponent from "../../components/apps/MyAppComponent.astro";
---

<BaseLayout active="myapp" title="My App">
  <MyAppComponent />
</BaseLayout>
```

- `active` must match a route key in `src/data/navigation.ts`
- `title` is the page title
- Always use `BaseLayout` — it provides the OS shell (SystemBar, Dock, transitions)

---

## Client-Side TypeScript Scripts

Scripts live in `src/scripts/` and follow the controller initialization pattern:

```typescript
// src/scripts/my-feature.ts

const initMyFeature = () => {
  // 1. Guard against re-initialization
  const root = document.querySelector("[data-my-feature]");
  if (!(root instanceof HTMLElement)) return;
  if (root.dataset.controllerReady === "true") return;
  root.dataset.controllerReady = "true";

  // 2. Get DOM references
  const button = root.querySelector("[data-my-button]");
  if (!(button instanceof HTMLElement)) return;

  // 3. Bind events
  button.addEventListener("click", () => {
    // dispatch custom event for other components to listen
    root.dispatchEvent(new CustomEvent("labos:my-action", {
      bubbles: true,
      detail: { /* payload */ }
    }));
  });
};

// 4. Run immediately AND on Astro page transitions
initMyFeature();
document.addEventListener("astro:page-load", initMyFeature);
```

**Key rules:**
- Always check `dataset.controllerReady` to prevent double-init with View Transitions
- Use `astro:page-load` event for re-initialization after navigation
- Dispatch `labos:*` custom events for cross-component communication
- Never use `DOMContentLoaded` — use `astro:page-load` instead
- Import state from `src/scripts/system-state.ts` via `window.labOS` API

### Accessing global state

```typescript
// Read state
const state = window.labOS.getState();
const currentApp = state.currentApp;

// Update state
window.labOS.setState({ theme: "dark" });

// Open an app
window.labOS.openApp("projects");
```

### Loading scripts in components

Add script tags in the Astro component that needs them:

```astro
<script>
  import("../scripts/my-feature.ts");
</script>
```

Or load globally in `BaseLayout.astro` for features that need to run on every page.

---

## Data Layer

Data lives in `src/data/` as typed exported arrays/objects:

| File | Content |
|------|---------|
| `site.ts` | Site metadata, `withBase()` helper |
| `projects.ts` | Project records with types `Project`, `ProjectStatus`, `ProjectCategory` |
| `posts.ts` | Legacy blog post data (migrating to Content Collections) |
| `timeline.ts` | Timeline entries |
| `commands.ts` | Command palette registry |
| `navigation.ts` | Navigation definitions |

### Adding a new data entry

1. Define the type at the top of the file
2. Add to the exported array
3. Use explicit string literal unions for enums

```typescript
export type MyStatus = "active" | "archived" | "draft";

export type MyItem = {
  slug: string;
  name: string;
  status: MyStatus;
  tags: string[];
};

export const items: MyItem[] = [
  { slug: "example", name: "Example", status: "active", tags: ["demo"] },
];
```

---

## Content Collections (Blog)

Blog posts use Astro Content Collections. Schema is in `src/content.config.ts`:

```typescript
// Required frontmatter for blog posts:
{
  title: string;
  slug?: string;
  date: string;           // "YYYY-MM-DD"
  updated?: string;
  summary: string;
  tags: string[];
  category: string;       // default: "General"
  status: "published" | "draft";
  articleStyle: "system" | "paper" | "terminal" | "magazine" | "notebook" | "minimal";
  readerDensity: "comfortable" | "compact" | "wide";
  toc: boolean;
  cover?: string;
  relatedProject?: string; // must match a project slug in projects.ts
}
```

Files go in `src/content/blog/` as `.md` files.

---

## Design System Rules — MANDATORY

**NEVER hardcode colors, shadows, border-radius, transitions, or font families.** Always use CSS custom properties from `src/styles/tokens.css`.

### Color tokens (use these, nothing else)

```
--bg, --bg-elevated, --bg-panel, --bg-soft
--text, --text-muted
--border, --border-strong
--accent, --accent-strong, --accent-soft, --accent-text
--warning, --danger, --success
--code, --active-glow
```

### Shape tokens

```
--radius (8px), --radius-sm (6px)
--shadow, --shadow-soft
```

### Typography tokens

```
--font-sans, --font-mono
```

### Required CSS classes (never create custom button/card styles)

- Buttons: `.button`, `.button-primary`, `.button-secondary`, `.button-danger`
- Panels: `.app-window`, `.setting-panel`, `.detail-panel`, `.desktop-widget`
- Cards: `.interactive-card`, `.project-card`, `.post-card`, `.timeline-entry`
- Inputs: `.os-input`, `.os-select`

### State-driven styling

Use `data-*` attributes on `<html>` for theme-aware styles:

```css
/* Light/dark theme */
html[data-theme="light"] .my-component { /* light values */ }
html[data-theme="dark"] .my-component { /* dark values */ }

/* Or use the cascade — most tokens auto-adapt */
.my-component { color: var(--text); background: var(--bg-panel); }
```

### Motion rules

- Use `prefers-reduced-motion: reduce` media query to disable animations
- Respect `data-motion-speed` and `data-experience-mode` attributes
- Use transition classes from `motion.css`: `.motion-enter`, `.motion-exit`, `.motion-slide-in`

---

## Adding a New App (Step by Step)

1. Create `src/components/apps/NewApp.astro` following the component structure above
2. Create `src/pages/newapp/index.astro` using BaseLayout + NewApp
3. Add route to `src/data/navigation.ts` (for nav) and `src/data/commands.ts` (for command palette)
4. Add app type to `LabOSApp` union in `src/scripts/system-state.ts`
5. Add shortcut to HomeApp's `desktopShortcuts` array if desired
6. Register in Dock (`src/components/os/Dock.astro`) if it should appear in the dock

---

## Forbidden Patterns

- Hash-only hrefs — use real URLs or `withBase()` paths
- Placeholder TODOs — all features must be functional
- Placeholder domains — use real URLs
- Empty buttons or links — every interactive element must have text or `aria-label`
- `fetch()`, `XMLHttpRequest`, `WebSocket` — this is a local-first static site with no backend
- Hardcoded colors like `#fff`, `rgb()`, `hsl()` — use CSS custom properties
- Inline styles for colors/shadows — use CSS classes or custom properties
- `DOMContentLoaded` — use `astro:page-load`
- Any UI framework import (React, Vue, Svelte, Solid) — vanilla TS only

---

## Running and Verifying

```bash
# Dev server
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && npm run dev -- --host 0.0.0.0

# Type check
npm run check

# Self test
npm run self-test

# Full preflight quality gate
npm run preflight
```

Always run `npm run check` after making changes to verify TypeScript correctness.
