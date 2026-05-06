# OS Motion Contract

> Every animation in the project MUST go through the OS motion system. No independent animations. No animations that Settings cannot control. Master–Detail apps share one unified motion contract.

## 1. Motion Token Hierarchy

All motion values derive from CSS custom properties in `src/styles/tokens.css`. The hierarchy is:

```
Motion Speed Setting (html[data-motion-speed])
  -> --app-duration, --panel-duration, --detail-duration

Motion Intensity Setting (html[data-motion-intensity])
  -> --motion-distance, --card-lift, --dock-lift, --dock-scale

Experience Mode (html[data-experience])
  -> performance: all durations = 1ms, all transforms = 0

OS Effects (html[data-os-effects])
  -> off: disables all detail animations
```

### Duration Tokens

| Token | Default | Usage |
|-------|---------|-------|
| `--motion-fast` | 120ms | Micro-interactions |
| `--motion-normal` | 190ms | Standard transitions |
| `--motion-slow` | 420ms | Emphasized transitions |
| `--app-duration` | var(--motion-normal) | App enter/exit, page transitions |
| `--panel-duration` | var(--motion-normal) | Panel transitions, component transitions |
| `--motion-duration` | var(--panel-duration) | General-purpose transition duration |
| `--detail-duration` | 220ms | Detail panel content swap |
| `--os-motion-layout-duration` | var(--panel-duration) | Master-Detail shell flex-basis changes |
| `--os-motion-content-duration` | var(--detail-duration) | Master-Detail surface first-open slide |

### Motion Speed Mapping

| Speed | --app-duration | --panel-duration | --detail-duration |
|-------|---------------|-----------------|-------------------|
| fast | 120ms | 120ms | 120ms |
| normal | 190ms | 190ms | 220ms |
| slow | 420ms | 420ms | 360ms |
| slower | 600ms | 600ms | 520ms |
| cinematic | 820ms | 820ms | 720ms |

### Motion Intensity Mapping

| Intensity | --motion-distance | --card-lift | --dock-lift | --dock-scale |
|-----------|------------------|-------------|-------------|--------------|
| minimal | 4px | 0px | 0px | 1.01 |
| balanced | 8px | -2px | -2px | 1.04 |
| expressive | 14px | -3px | -3px | 1.06 |

### Distance Tokens

| Token | Default | Usage |
|-------|---------|-------|
| `--motion-distance` | 8px | Component enter distance |
| `--page-transition-distance` | 10px | Page transition distance |
| `--page-transition-scale` | 0.992 | Page transition scale |

### Scale Tokens

| Token | Default | Usage |
|-------|---------|-------|
| `--card-lift` | -2px | Card hover lift |
| `--dock-lift` | -2px | Dock item hover lift |
| `--dock-scale` | 1.04 | Dock item hover scale |
| `--app-enter-scale` | 1 | App window enter scale |
| `--app-exit-scale` | 0.985 | App window exit scale |

## 2. Standard Animation Classes

### 2.1 Component Enter

```css
.motion-enter {
  animation: window-enter var(--app-duration) ease both;
}
```

Used for: app windows, desktop widgets, staggered content.

### 2.2 Interactive Card Hover

```css
.interactive-card {
  transition: ... var(--panel-duration) ease;
}
.interactive-card:hover {
  transform: translateY(var(--card-lift));
  box-shadow: var(--shadow-soft);
}
```

### 2.3 Dock Item Hover

```css
.dock-item {
  transition: transform var(--motion-duration) ease, ...;
}
.dock-item:hover {
  transform: translateY(var(--dock-lift)) scale(var(--dock-scale));
}
.dock-item:active {
  transform: translateY(1px) scale(0.96);
}
```

### 2.4 Detail Panel Content Swap

Detail transitions are defined in `src/styles/motion.css` and controlled by `data-detail-transition` on the `.master-detail` container:

| Mode | Animation |
|------|-----------|
| `os` | Exit: translateX(-10px) scale(0.995) blur(1px) / Enter: translateX(24px) scale(0.985) blur(2px) |
| `slide` | Exit: translateX(-8px) / Enter: translateX(16px) |
| `fade` | Opacity only |
| `off` | No animation |

### 2.4.1 OS Master-Detail Shell

Blog, Projects, and Timeline use `.os-master-detail` with v0.6-style real `flex-basis` changes. The shell animation uses `--os-motion-layout-duration` and `--os-motion-ease`; the inner `.os-detail-surface` provides the first-open slide. Switching between already-open items MUST NOT replay the panel-open slide, but MAY use a text-only `data-content-switch` fade/settle transition driven by `--os-motion-content-duration`. Do not use `scale()` as the primary split-view animation.

### 2.5 Reader Body Sections

```css
.reader-body section {
  animation: content-fade-up var(--panel-duration) ease both;
  animation-delay: calc(var(--stagger-index, 0) * 35ms);
}
```

### 2.6 Desktop Stagger

```css
.desktop-stagger {
  animation: content-fade-up var(--app-duration) ease both;
  animation-delay: calc(var(--stagger-index, 0) * 70ms);
}
```

## 3. Component-Specific Motion

### 3.1 Detail Transition (Projects / Blog / Timeline)

All three apps use the shared OS Master-Detail shell pattern:

1. First open: animate real shell layout with `flex-basis`
2. Detail pane appears with the v0.6-style right-to-left slide
3. Switching between already-open items does not replay the panel-open slide
4. Text changes may use the shared `data-content-switch` fade/settle transition

The goal is OS split-view pressure and live text reflow, with only a restrained content-settle cue during item switches.

### 3.2 Floating Controls (md-reader-toolbar)

```css
.md-reader-toolbar {
  transition:
    opacity var(--motion-duration) ease,
    transform var(--motion-duration) ease;
}
```

### 3.3 Composer Controls

Composer preview width buttons use the same transition pattern:
```css
.preview-width-btn {
  transition:
    border-color var(--motion-duration) ease,
    background var(--motion-duration) ease,
    color var(--motion-duration) ease;
}
```

### 3.4 Command Palette

```css
.command-palette-overlay {
  animation: content-fade-up var(--app-duration) ease both;
}
.command-palette-panel {
  animation: window-enter var(--app-duration) ease both;
}
.command-option {
  transition: transform var(--motion-duration) ease, ...;
}
.command-option:hover {
  transform: translateY(-1px);
}
```

### 3.5 Welcome Toast

```css
.welcome-toast {
  animation: content-fade-up var(--app-duration) ease both;
}
```

### 3.6 Page Transitions

```css
::view-transition-old(lab-main) {
  animation: lab-page-out var(--app-duration) ease;
}
::view-transition-new(lab-main) {
  animation: lab-page-in var(--app-duration) ease;
}
```

## 4. Motion Override Layers

### 4.1 Performance Mode

`html[data-experience="performance"]` disables ALL animations:

- All durations become 1ms
- All transforms become 0
- All backdrop-filter becomes none
- All shadows become minimal

### 4.2 OS Effects Off

`html[data-os-effects="off"]` disables detail transition animations only.

### 4.3 Reduced Motion

`@media (prefers-reduced-motion: reduce)` disables ALL animations globally:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## 5. Prohibited Motion Patterns

### 5.1 NEVER Write Uncontrolled Animations

**FORBIDDEN:**
```css
animation: myCustomAnimation 0.5s ease;
transition: all 0.3s;
```

**REQUIRED:**
```css
animation: window-enter var(--app-duration) ease both;
transition: opacity var(--motion-duration) ease;
```

### 5.2 NEVER Remove Animations to Fix Layout

**FORBIDDEN:** Removing animation properties because they cause layout issues.

**REQUIRED:** Fix the layout issue while preserving the animation contract.

### 5.3 NEVER Animate Detail Text Instead Of The Split Layout

The Master-Detail effect must come from real layout change (`flex-basis`, width, or equivalent layout track movement). Do not replace it with text fade/slide choreography.

When the detail panel is already open, switching content should not replay the panel-open animation. A token-driven text-only transition is allowed when it supports readability and respects reduced motion, Performance mode, and OS Effects Off.

## 6. Adding New Animated Components

Before adding animation to a new component:

1. Use existing keyframes (`window-enter`, `content-fade-up`, `detail-enter`) when possible
2. Use `var(--app-duration)` or `var(--panel-duration)` for timing
3. Use `var(--motion-distance)` for translate values
4. Add performance mode override in `motion.css`
5. Verify `prefers-reduced-motion` disables the animation
6. Verify `data-os-effects="off"` disables detail animations
7. Do NOT create new keyframe names unless absolutely necessary
