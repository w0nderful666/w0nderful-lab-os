# Release Notes

## v0.5.1

- Added Detail Focus Mode for Projects.app, Blog.app, and Timeline.app with a Focus/Restore toggle button that widens the detail panel to 85% for a clearer reading surface.
- Added scroll alignment so clicking a list item automatically scrolls the detail panel into the current viewport with smooth or instant behavior based on motion preferences.
- Added localStorage persistence for Detail Focus Mode state across page reloads and navigation.
- Added responsive degradation so the Focus toggle is hidden on mobile and detail panels use full-width single-column layout.
- Improved detail panel header controls with accessible aria-label, aria-pressed, and focus-visible states.

## v0.5.0

- Added Desktop Workspace app launcher shortcuts on the home page with icon, label, status, hover lift, and real navigation to Projects.app, Blog.app, Timeline.app, Settings.app, and About.app.
- Enhanced System Bar to display current app name, palette name, background name, version (clickable to Settings), and local time with mobile-friendly folding.
- Enhanced About.app into a System Info page with Lab Specs, Tech Stack, Core Features, and real-time System Health checks for localStorage, reduced motion, palette, background, command palette, and client navigation.
- Added centralized Keyboard Shortcuts system with G+H (Home), G+P (Projects), G+B (Blog), G+T (Timeline), G+S (Settings) navigation, respecting input fields and lifecycle-safe after ClientRouter navigation.
- Added Command Palette Chinese aliases (xiangmu, wenzhang, shijianxian, shezhi, guanyu) and quick actions including Toggle Theme Mode and Go Home.
- Added System Bar status pills showing current palette, background, and app name with live CSS variable sync.
- Added Desktop shortcut grid CSS with responsive 5-column (desktop), 3-column (tablet), and 2-column (mobile) layouts.
- Added System Health CSS with ok/warn status badges for real-time environment checks.
- Added toggle-theme command action for light/dark switching from Command Palette.
- Updated Settings.app keyboard shortcuts section with G+X navigation shortcuts.
- Improved mobile responsiveness for Desktop shortcuts, System Bar status pills, and toolbar layouts.

## v0.4.2

- Enhanced Dock active state with glow, indicator, icon lift, and unified hover / active / focus-visible feedback while keeping the mobile Dock overflow-safe.
- Refined AppWindow, Detail Panel, and Settings Panel depth with restrained borders, shadows, backdrop blur, and inner highlights for a more realistic OS-like Web Experience.
- Polished page-level smooth transitions on top of Astro View Transitions and ClientRouter with subtle entering / leaving feedback, Persistent OS shell continuity, Performance mode reductions, and reduced-motion support.
- Upgraded Command Palette into a more launcher-like surface with backdrop depth, grouped Pages / Actions / Settings / Recent / History results, current-page badges, and lifecycle-safe bindings after ClientRouter navigation.
- Added Settings Preview Card so Palette, Background Presets, Theme, Experience Mode, and Motion Speed changes are visible immediately through the existing System State variables.
- Added unified OS-style Empty State surfaces for Projects.app, Blog.app, and Timeline.app search/filter misses.
- Added a static 404 System Notice with return-home and Command Palette actions for GitHub Pages friendly error handling.
- Added a dismissible Welcome / Quick Start prompt stored in localStorage for first-time guidance around Dock, Command Palette, Theme, Background, and Motion.

## v0.4.1

- Added page-level smooth transitions with Astro View Transitions and ClientRouter for SPA-like Navigation while preserving static routes, GitHub Pages deployment, and SEO-friendly HTML.
- Added Persistent OS shell transition names so System Bar, Dock, Command Palette host, and footer feel continuous across internal page navigation.
- Made scripts lifecycle-safe for ClientRouter by initializing System State, Command Palette, Terminal.app, and Master-Detail apps through `astro:page-load` compatible controllers.
- Improved focused Master-Detail layout from roughly 36/64 to 27/73 so the detail panel becomes the main reading surface.
- Added sticky desktop detail panels with internal scrolling for Projects.app, Blog.app, and Timeline.app.
- Added Theme Palette options: Aurora, Graphite, Ubuntu, Mint, and Neon Terminal.
- Added Background Presets: Aurora Mist, Desktop Grid, Terminal Glow, Paper Light, and Space Lab.
- Refined Projects.app, Blog.app, and Timeline.app toolbar and filter UX with clearer wrapping, stronger active states, search priority, and Clear Filters actions.

## v0.4.0

- Added the Control Layer Release foundation with shared System State for current app, selected project/post/timeline item, layout state, preferences, Recent Items, and command history.
- Added a global Command Palette with Ctrl/Cmd + K, keyboard navigation, executable app/project/post/timeline/settings/utility commands, and shared Global Search results.
- Added Terminal.app with real local commands for help, clear, whoami, status, version, app navigation, project opening, settings changes, local search, history recall, and GitHub profile launch.
- Added Global Search reused by Command Palette and Terminal.app across projects, posts, timeline entries, and commands.
- Added Recent Items rendering on Home.app, Command Palette, and Settings.app, with clear/reset actions backed by System State.
- Connected Project / Blog / Timeline related content through System State events instead of hard page-only jumps.
- Upgraded Settings.app with Recent Items management, Keyboard Shortcuts, and System State-backed preferences.
- Updated self-test and preflight coverage for Command Palette, Terminal.app, System State, Global Search, Recent Items, docs, and v0.4.0 release strings.

## v0.3.0

- Added OS-style Master-Detail layout states for Projects.app, Blog.app, and Timeline.app with `idle`, `focused`, and `expanded` modes.
- Added Motion Speed settings with `slow`, `normal`, and `fast` profiles persisted in localStorage and reflected in the footer.
- Strengthened app enter/exit motion, detail panel slide-in, paragraph reveal, and desktop stagger loading while keeping animation on transform and opacity.
- Improved Dock and System Bar active indicators with stronger feedback and smoother transitions.
- Preserved Performance, Balanced, and Quality experience behavior, with Performance mode reducing motion and disabling blur.
- Kept mobile layouts single-column, with list-to-full-detail behavior for Master-Detail apps.

## v0.2.0

- Upgraded Blog.app into an in-app reader with category filters, tag filters, search, back-to-list navigation, reading progress, article body blocks, related articles, and roadmap rendering.
- Upgraded Projects.app into a project matrix with search, category filters, status filters, detail panels, versions, core features, links, related articles, and roadmap slots.
- Made Experience Mode materially affect motion, blur, shadows, card lift, and Dock feedback across Performance, Balanced, and Quality profiles.
- Tightened OS motion so app entry, Dock hover, click feedback, and card hover use transform and opacity only.
- Improved mobile behavior for bottom Dock navigation, single-column app layouts, readable article bodies, touch targets, and overflow prevention.
- Kept the project static, local-first, no-backend, privacy-friendly, and GitHub Pages ready.

## v0.1.0

- Initial A-Level Lab OS foundation
- Astro static site
- System Bar
- Dock
- Desktop Workspace
- Projects.app
- Blog.app
- Timeline.app
- About.app
- Settings.app
- Experience Mode
- Motion system
- GitHub Pages workflow
- self-test / preflight
