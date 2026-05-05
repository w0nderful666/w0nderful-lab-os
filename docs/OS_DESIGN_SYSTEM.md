# OS Design System Contract

> Every new component, page, and feature MUST follow this contract. No hardcoded colors, shadows, radii, or transitions. No independent style systems. No Backend, No Token, No Auto Push.

## 1. Design Tokens

All visual values come from CSS custom properties defined in `src/styles/tokens.css`. These tokens are the single source of truth for the entire OS surface.

### Color Tokens

| Token | Usage |
|-------|-------|
| `--bg` | Page background |
| `--bg-elevated` | System Bar, Dock, floating surfaces |
| `--bg-panel` | App windows, panels, setting panels |
| `--bg-soft` | Subtle card backgrounds, input backgrounds |
| `--text` | Primary text |
| `--text-muted` | Secondary text, labels, descriptions |
| `--border` | Default borders |
| `--border-strong` | Emphasized borders, input borders |
| `--accent` | Primary accent color |
| `--accent-strong` | Hover/active accent |
| `--accent-soft` | Accent background tint |
| `--accent-text` | Text on accent background (dark) |
| `--warning` | Warning state |
| `--danger` | Error/danger state |
| `--success` | Success state |
| `--code` | Code block background |
| `--active-glow` | Dock active glow, accent glow |

### Shadow Tokens

| Token | Usage |
|-------|-------|
| `--shadow` | Panel/app window depth |
| `--shadow-soft` | Card hover, subtle depth |

### Shape Tokens

| Token | Usage |
|-------|-------|
| `--radius` | Standard border radius (8px) |
| `--radius-sm` | Small border radius (6px) |

### Typography Tokens

| Token | Usage |
|-------|-------|
| `--font-sans` | Body text |
| `--font-mono` | Code, terminal, technical text |

## 2. Required CSS Classes

### 2.1 Buttons

Use the shared `.button` class from `global.css`. Variants:

| Class | Usage |
|-------|-------|
| `.button` | Default OS button |
| `.button-primary` | Primary action (accent background) |
| `.button-secondary` | Secondary action |
| `.button-danger` | Destructive action |

**NEVER** create custom button styles. All buttons MUST use these classes.

### 2.2 Panels and Cards

| Class | Usage |
|-------|-------|
| `.app-window` | Framed app surface |
| `.setting-panel` | Settings section card |
| `.detail-panel` | Master–Detail right panel |
| `.desktop-widget` | Home page widget |
| `.interactive-card` | Hoverable card with lift |
| `.project-card` | Project list card |
| `.post-card` | Blog list card |
| `.timeline-entry` | Timeline list entry |

### 2.3 Inputs and Selects

| Class | Usage |
|-------|-------|
| `.search-field` | Search input with label |
| `.select-field` | Select/input with label |

### 2.4 Toolbars

| Class | Usage |
|-------|-------|
| `.toolbar` | Standard toolbar row |
| `.toolbar-stacked` | Multi-row toolbar with search priority |
| `.toolbar-compact` | Compact single-row toolbar |
| `.filter-group` | Filter button group |
| `.filter-button` | Individual filter chip |
| `.segmented-control` | Segmented button control |
| `.segment-button` | Individual segment |

### 2.5 Badges and Pills

| Class | Usage |
|-------|-------|
| `.badge` | Default badge |
| `.badge-accent` | Accent badge |
| `.badge-success` | Success badge |
| `.badge-warning` | Warning badge |
| `.meta-pill` | Metadata pill |
| `.eyebrow` | Section label |
| `.command-badge` | Command palette badge |

### 2.6 Empty States

| Class | Usage |
|-------|-------|
| `.empty-state` | Default empty state |
| `.empty-state-os` | OS-style empty state with icon |

### 2.7 Floating Controls

| Class | Usage |
|-------|-------|
| `.md-reader-toolbar` | Floating control toolbar |
| `.md-reader-toolbar-toggle` | Toggle button for floating controls |
| `.md-reader-toolbar-body` | Control body container |

## 3. Prohibited Patterns

### 3.1 NEVER Hardcode Colors

**FORBIDDEN:**
```css
color: #07120f;
color: #bdf6d9;
color: #a8c8bd;
background: rgba(114, 215, 183, 0.24);
border-color: rgba(255, 255, 255, 0.1);
```

**REQUIRED:**
```css
color: var(--text);
color: var(--accent);
color: var(--accent-text);
background: var(--accent-soft);
border-color: var(--border);
```

Exception: Window control dots (`.control-close`, `.control-minimize`, `.control-maximize`) use semantic colors for macOS metaphor.

### 3.2 NEVER Hardcode Shadows

**FORBIDDEN:**
```css
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
box-shadow: 0 0 16px rgba(114, 215, 183, 0.38);
```

**REQUIRED:**
```css
box-shadow: var(--shadow);
box-shadow: var(--shadow-soft);
box-shadow: 0 0 14px var(--active-glow);
```

### 3.3 NEVER Hardcode Border Radius

**FORBIDDEN:**
```css
border-radius: 7px;
border-radius: 4px;
```

**REQUIRED:**
```css
border-radius: var(--radius);
border-radius: var(--radius-sm);
```

### 3.4 NEVER Hardcode Transitions

**FORBIDDEN:**
```css
transition: opacity 0.3s ease;
transition: all 0.2s;
animation: fadeIn 0.5s;
```

**REQUIRED:**
```css
transition: opacity var(--motion-duration) ease;
transition: transform var(--panel-duration) ease;
```

See `OS_MOTION_CONTRACT.md` for animation rules.

### 3.5 NEVER Create Independent Style Systems

New components MUST reuse existing OS classes. Do not invent new button styles, card styles, panel styles, or badge styles.

## 4. New Feature Checklist

Before adding any new UI:

- [ ] Uses OS tokens (`--bg`, `--text`, `--accent`, `--border`, etc.)
- [ ] Uses OS classes (`.button`, `.setting-panel`, `.badge`, etc.)
- [ ] Uses OS motion tokens (see `OS_MOTION_CONTRACT.md`)
- [ ] Uses OS layout patterns (see `OS_LAYOUT_CONTRACT.md`)
- [ ] Respects `prefers-reduced-motion`
- [ ] Respects `data-experience="performance"`
- [ ] Respects `data-os-effects="off"`
- [ ] No hardcoded colors, shadows, radii, or transitions
- [ ] Mobile responsive using existing breakpoint conventions (760px, 1020px)
