# App Layout Standard

This document defines layout behavior for OS-style apps.

## Master-Detail States

- `idle`: master list is 100%, detail panel is hidden.
- `focused`: master list is about 27%, detail panel is about 73%.
- `expanded`: master and detail are both 50%.

Focused mode makes the right detail panel the primary surface. Master cards become compact: summaries clamp, secondary metadata is reduced, and active selection remains clear.

## Sticky Detail Panel

On desktop, detail panels use:

- `position: sticky`
- `top: var(--system-bar-offset)`
- `max-height: var(--detail-panel-max-height)`
- `overflow: auto`

This keeps the selected project, article, or timeline entry visible while browsing the master list. On mobile, sticky behavior is disabled and focused mode becomes a full-detail view.

## Window Controls

AppWindow supports close, close detail, and maximize/restore controls. It does not implement draggable windows or a multi-window z-index system.
