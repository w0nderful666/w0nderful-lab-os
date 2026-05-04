# Release Notes

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
