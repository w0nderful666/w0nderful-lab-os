# Interaction Rules

The project remains an Astro static site, not a framework SPA.

## Navigation

- Internal links use Astro ClientRouter for SPA-like Navigation.
- Current-route clicks are guarded to avoid duplicate transitions.
- Command Palette and Terminal.app use System State first, then client navigation when a route change is needed.

## Script Lifecycle

ClientRouter can swap pages without a full reload. DOM controllers must:

- expose an initialization function,
- run once on first script load,
- listen for `astro:page-load`,
- mark initialized roots with a `data-*` flag,
- avoid binding duplicate controls on the same DOM.

## Real Controls

Buttons must execute real behavior. Hash-only links, placeholder controls, or pretend controls are not allowed.

## Toolbar UX

Toolbars prioritize search, wrap filters, expose the active filter state, and provide a real Clear Filters action where filters exist.
