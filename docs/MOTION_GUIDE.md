# Motion Guide

The Lab OS motion system stays small and static-site friendly. It uses CSS variables, transform, opacity, and Astro View Transitions.

## Page-Level Navigation

`BaseLayout.astro` uses Astro `<ClientRouter />` from `astro:transitions`. The main desktop shell and app window receive transition names, while System Bar, Dock, Command Palette host, and footer are persistent OS shell elements.

## Experience Mode

- Performance: transitions are near-instant, blur is disabled, and complex motion is removed.
- Balanced: page changes use light fade and translate motion.
- Quality: page changes use a stronger OS-level lift and scale.

## Motion Speed

`data-motion-speed="slow|normal|fast"` controls `--app-duration`, `--panel-duration`, and page transition timing.

## Reduced Motion

`prefers-reduced-motion: reduce` clamps animation and transition duration to near-instant values. No feature depends on animation to work.
