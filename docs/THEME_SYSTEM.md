# Theme System

The theme system is driven by data attributes and CSS variables.

## Attributes

- `data-theme="light|dark"` is the applied color scheme.
- `data-theme-setting="light|dark|system"` is the saved user choice.
- `data-palette="aurora|graphite|ubuntu|mint|terminal"` selects the accent palette.
- `data-background="aurora|grid|terminal|paper|space"` selects the background preset.
- `data-experience` and `data-motion-speed` continue to control motion and visual density.

## Palette Rules

Each Theme Palette updates:

- accent color,
- strong accent,
- accent-soft backgrounds,
- borders,
- active indicator glow,
- button hover treatment.

The palettes must stay readable in light and dark modes.

## Background Presets

Background Presets use CSS gradients and lightweight patterns only:

- Aurora Mist
- Desktop Grid
- Terminal Glow
- Paper Light
- Space Lab

No image uploads, videos, remote assets, or backend storage are used.
