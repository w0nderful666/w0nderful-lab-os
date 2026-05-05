# OS Layout Contract

> Every Master–Detail, floating control, and reading surface MUST follow this contract. No independent layout systems. All motion must respect reduced-motion and Motion Speed settings.

## 1. Master–Detail Standard Structure

All apps using Master–Detail (Projects, Blog, Timeline) MUST use this structure:

```html
<div class="master-detail" data-layout="idle" data-detail-transition="os">
  <!-- Floating Controls (always present, visibility controlled by layout state) -->
  <div class="detail-actions md-reader-toolbar is-collapsed" data-reader-controls>
    <button class="md-reader-toolbar-toggle" data-controls-toggle>+</button>
    <div class="md-reader-toolbar-body">
      <!-- Close / Expand / Focus buttons -->
    </div>
  </div>

  <!-- Master Panel (left list) -->
  <section class="master-panel" aria-label="...">
    <!-- Search, filters, card list -->
  </section>

  <!-- Detail Panel (right content) -->
  <aside class="detail-panel" data-...-detail aria-live="polite">
    <div class="detail-swap-body">
      <!-- Detail content, wrapped for transition targeting -->
    </div>
  </aside>
</div>
```

### Layout States

| State | `data-layout` | Master | Detail | Grid |
|-------|--------------|--------|--------|------|
| Idle | `"idle"` | Full width | Hidden (visibility: hidden, width: 0) | `1fr` |
| Focused | `"focused"` | 27% (sticky) | 73% (scrollable) | `27% 73%` |
| Expanded | `"expanded"` | 50% | 50% | `1fr 1fr` |

### Focus Mode

| Mode | `data-detail-mode` | Master | Detail |
|------|-------------------|--------|--------|
| Default | `"default"` | 27% | 73% |
| Focus | `"focus"` | 15% | 85% |

Focus mode persists in `localStorage` under `w0nderful-lab-os.detail-mode`.

### Data Attributes on `.master-detail`

| Attribute | Source | Purpose |
|-----------|--------|---------|
| `data-layout` | JS state | idle / focused / expanded |
| `data-detail-transition` | system-state.ts | off / fade / slide / os |
| `data-motion-intensity` | system-state.ts | minimal / balanced / expressive |
| `data-detail-mode` | system-state.ts | default / focus |

## 2. Floating Reader Controls Standard

All Master–Detail apps use the `.md-reader-toolbar` pattern for floating controls:

```html
<div class="detail-actions md-reader-toolbar is-collapsed" data-reader-controls>
  <button class="md-reader-toolbar-toggle" data-controls-toggle
    aria-label="Toggle controls" aria-expanded="false" title="Controls">+</button>
  <div class="md-reader-toolbar-body">
    <button class="button button-secondary" data-...-close>Close detail</button>
    <button class="button button-secondary" data-...-expand>Expand list</button>
    <button class="detail-focus-toggle" data-detail-focus-toggle
      aria-label="Focus detail panel" aria-pressed="false">Focus</button>
  </div>
</div>
```

### Positioning

- Desktop: `position: fixed; right: 12px; top: 35vh; z-index: 40`
- Mobile: `position: fixed; right: 10px; left: 10px; bottom: 90px; flex-direction: row`

### Collapse State

- Default: collapsed (`is-collapsed` class), showing only `+` toggle
- Expanded: shows full control body
- Toggle text: `+` when collapsed, `☰` when expanded

### Visibility by Layout State

- `data-layout="idle"`: `display: none`
- `data-layout="focused"`: `display: flex`
- `data-layout="expanded"`: `display: flex`

## 3. Left Master List: Sticky / Compact Mode

### Sticky Behavior

In focused/expanded states, the master panel uses sticky positioning:

```css
.master-detail[data-layout="focused"] > .master-panel,
.master-detail[data-layout="expanded"] > .master-panel {
  position: sticky;
  top: var(--system-bar-offset);
  max-height: calc(100vh - var(--system-bar-offset) - 28px);
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
}
```

### Compact Mode (Focus Mode)

When `data-detail-mode="focus"`, cards in the master list are further compressed:

- Reduced padding: `8px`
- Reduced gap: `4px`
- Smaller eyebrow font: `0.68rem`
- Smaller heading font: `0.85rem`
- Hidden badge row
- Hidden card meta

### Card Text Overflow

In focused/expanded states, card headings use ellipsis overflow:

```css
.master-detail[data-layout="focused"] .project-card h3 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
```

## 4. Composer Preview Width Standard

Composer.app uses preview width controls on the preview card only:

| Width | Attribute Value | Max Width |
|-------|----------------|-----------|
| Narrow | `data-preview-width="narrow"` | 360px |
| Article | `data-preview-width="article"` | 640px |
| Wide | `data-preview-width="wide"` | 820px |
| Full | `data-preview-width="full"` | 100% |

### Selector Isolation

Preview width styles MUST target `[data-composer-preview-card]` only:

```css
[data-composer-preview-card][data-preview-width="narrow"] {
  max-width: 360px;
  margin: 0 auto;
}
```

The outer `.composer-workspace` grid MUST NOT be affected by preview width changes.

Preview width persists in `localStorage` under `lab-composer-preview-width`.

## 5. Single-Scroll Reading Standard

Detail panels use single-scroll reading: the page handles all vertical scrolling, not the detail panel.

### Rules

- `.detail-panel` MUST NOT have `overflow-y: auto` or `max-height` on desktop
- `.reader-body` MUST NOT have nested `max-height` or `overflow-y: auto`
- Reading progress is tracked from the detail panel's scroll position relative to the page
- The `.detail-panel` uses `position: sticky; top: var(--system-bar-offset)` to stay in viewport

### Exception: Composer Preview

The Composer preview panel uses its own scroll:

```css
.composer-preview-panel {
  position: sticky;
  top: var(--system-bar-offset);
  max-height: var(--detail-panel-max-height);
  overflow-y: auto;
}
```

This is the only exception to the single-scroll rule.

## 6. Mobile Degradation Rules

### Breakpoints

| Breakpoint | Target |
|------------|--------|
| `max-width: 1020px` | Tablet: collapse grids, remove sticky |
| `max-width: 760px` | Mobile: single column, bottom dock |
| `max-width: 680px` | Small mobile: reduce font sizes |

### Master–Detail Mobile (760px)

```css
.master-detail {
  display: block;
}
.master-detail[data-layout="focused"] > .master-panel {
  display: none;
}
.master-detail[data-layout="focused"] > .detail-panel {
  display: block;
  max-height: none;
  overflow: visible;
  opacity: 1;
  pointer-events: auto;
  visibility: visible;
  width: auto;
}
```

- Idle: show list only
- Focused/Expanded: show detail only, hide list
- Focus toggle hidden on mobile
- Floating toolbar becomes static, full-width at bottom

### Dock Mobile (760px)

- Moves from left sidebar to bottom bar
- `flex-direction: row`
- Horizontal scrolling with `overflow-x: clip`

### System Bar Mobile (760px)

- Nav links hidden
- Status pills hidden
- Compact button visible

### Composer Mobile (1020px)

- Two-column grid collapses to single column
- Preview panel loses sticky positioning
- Form rows collapse to single column at 760px

## 7. Adding New Layout Components

Before adding layout to a new component:

1. Check if existing `.master-detail`, `.toolbar`, `.setting-panel` classes work
2. Use OS tokens for all spacing (`--system-bar-offset`, `--detail-panel-max-height`)
3. Use CSS Grid over flexbox for page-level layout
4. Follow the same `data-layout` state pattern if implementing list/detail
5. Respect the single-scroll reading standard
6. Add mobile degradation at 760px breakpoint
7. Verify sticky behavior works with the System Bar offset
