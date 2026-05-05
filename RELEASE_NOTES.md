# Release Notes

## v0.8.3

Reader Controls + Detail Transition Polish — right-docked floating controls, hidden scrollbar, Composer floating preview, restored slide-in animation.

### Improved

- Floating reader controls now right-docked at `right: 12px; top: 35vh`, collapsed by default with `+` toggle.
- Left master list uses `scrollbar-width: none` and `::-webkit-scrollbar { width: 0 }` to hide visible scrollbar while preserving scroll functionality.
- Composer preview width controls converted to floating control pattern, collapsed by default with `W` toggle.
- Detail slide-in animation strengthened: `translateX(24px)` entry, `translateX(-16px)` exit for more visible right-slide effect.
- Preview width values updated: narrow=360px, article=640px, wide=820px, full=100% (from ch-based to px-based for more predictable sizing).

### Validation

- All OS Motion preserved.
- Theme flash fix preserved.
- i18n coverage preserved.
- Composer functionality unchanged.

## v0.8.2

Shell Interaction + Theme/i18n Polish — floating reader controls, sticky master list, Composer notice isolation, theme flash fix, new backgrounds, contrast and i18n polish.

### Added

- Floating reader controls: Back/Focus/Expand/Reader Style now appear as a right-side floating toolbar with minimize/expand toggle.
- 4 new Background Presets: Frosted Mint, Glacier Glass, Sakura Haze, Graphite Mesh.
- Expanded i18n dictionary: Master-Detail controls, Composer fields, Settings labels, filter/result labels — all with EN/ZH translations.
- Master list sticky behavior: left panel follows scroll in focused/expanded states.

### Improved

- Theme flash fix: early boot script now sets both html and body data attributes, preventing dark flash on light mode switch.
- Composer Draft Notice repositioned as absolute floating overlay, no longer disrupts grid layout.
- Form element contrast: explicit color/background rules for select, option, input, textarea across all themes.
- Floating controls have OS-style glass appearance with backdrop blur, border, and shadow.

### Validation

- self-test / preflight / build / check all pass.
- All OS Motion preserved.
- Composer functionality unchanged.
- Blog/Projects/Timeline detail transition preserved.

## v0.8.1

Motion & Reading Bugfix — restores detail transition animation, removes inner scrollbar, fixes Composer layout, and improves narrow card display.

### Fixed

- Detail transition animation restored: motion.css selectors now use descendant combinator so `data-detail-swapping` on detail-panel correctly triggers animations defined by `data-detail-transition` on parent `.master-detail`.
- Inner vertical scrollbar removed: detail-panel no longer has `overflow: auto` or `max-height`, enabling true single-scroll reading where page handles all vertical scrolling.
- Composer "Saved locally" repositioned as absolute overlay in top-right corner, no longer participates in grid layout or creates empty space.
- Composer Preview Width buttons now scoped to `.preview-width-controls [data-preview-width]`, no longer accidentally toggle the preview card's own `data-preview-width` attribute.
- Narrow card text overflow: added `overflow: hidden`, `text-overflow: ellipsis`, `white-space: nowrap` for card headings in focused/expanded states. Hidden secondary meta, badges, and actions in narrow mode.
- Focus mode (15%/85%) further compresses cards with smaller font, hidden badges, and hidden meta.

### Validation

- self-test / preflight / build / check all pass.
- Detail transition works with OS, Fade, Slide, Off modes.
- OS Effects Off and Performance mode correctly disable animations.
- Single-scroll reading confirmed for Blog, Projects, Timeline.

## v0.8.0

Stable OS Baseline — deep style unification, Master-Detail grid layout, Composer stabilization, single-scroll reading, and comprehensive test gates.

### Added

- Blog reading progress bar now tracks detail-panel scroll position for single-scroll reading.
- Timeline entry for v0.8.0 Stable OS Baseline release.

### Improved

- Master-Detail uses CSS Grid layout with toolbar as a full-width grid row across Blog, Projects, and Timeline.
- Detail panel uses `visibility: hidden` in idle state for complete initial hiding.
- Single-scroll reading: reader-body no longer has nested max-height/overflow.
- Composer save-status and draft-notice use `align-self: start` to prevent grid stretching.
- Composer preview width isolated to `[data-composer-preview-card]` selectors only.
- Composer i18n binding for Dock entry (EN: Composer, ZH: 创作).
- Unified `.md-reader-toolbar` styling with sticky positioning inside detail-panel scroll context.

### Fixed

- CSS: removed duplicate `.master-detail { display: block }` rule in mobile section.
- CSS: removed empty `.reader-body {}` rule in mobile section.
- Blog scroll progress bar now correctly tracks reading position.

### Validation

- self-test: 58+ checks covering file existence, page strings, and product capabilities.
- preflight: 120+ checks covering version consistency, control layer, interaction polish, blog content, forbidden content, and privacy boundaries.
- build / check / self-test / preflight all pass.

### Known Issues

- `projectData` declared but never read hint in blog/index.astro (unused variable, no runtime impact).
- `document.execCommand` deprecated warning in system-state.ts (fallback clipboard copy, no runtime impact).

## v0.7.2.1

- Fixed Composer preview width isolation: preview width controls now only affect the preview card, not the outer layout grid.
- Fixed Composer left-side blank space caused by preview width affecting the composer workspace grid.
- Added Composer i18n binding: Composer Dock entry now properly follows the language system (English/Chinese).
- Unified Master-Detail reader toolbar across Blog, Projects, and Timeline with consistent visual language.
- Fixed detail panel initial visibility: detail panel is now completely hidden in idle state using visibility:hidden.
- Fixed single-scroll reading: removed nested scroll from reader-body, detail panel now serves as the single scroll container.
- Added sticky toolbar behavior for reader toolbar within the detail panel scroll context.
- Mobile-friendly toolbar with static positioning on small screens.

## v0.7.2

- Added Composer letter icon "C" to Dock, unified with other app icons.
- Unified Master-Detail reader toolbar across Blog, Projects, and Timeline using shared .md-reader-toolbar class.
- Added sticky reader toolbar that stays visible while scrolling through long articles.
- Fixed detail panel single-scroll reading: overrode master-detail overflow with !important rules.
- Fixed detail panel initial hiding: added width: 0 and explicit overflow: hidden for idle state.
- Added Composer Preview Width controls with 4 presets: Narrow (48ch), Article (72ch), Wide (90ch), Full.
- Preview Width uses data-preview-width attribute on preview card only, not on outer layout grid.
- Preview Width persists in localStorage (lab-composer-preview-width) across page reloads.
- Made save-status more compact with width: fit-content and smaller padding.
- Added backdrop-filter fallback for performance mode.
- Mobile-friendly toolbar with flex-wrap.

## v0.7.1

- Added Draft Notice with OS-style banner showing local draft detection with timestamp, Continue Draft and Clear Draft buttons, and confirmation before clearing.
- Added auto-save status indicator showing "Saved locally", "Saving...", "Unsaved changes", and "Draft cleared" with 500ms debounce.
- Enhanced field validation with clear error messages for title, slug, slug format (lowercase letters, numbers, hyphens), summary, tags, articleStyle, status, and body content.
- Improved Copy Markdown button feedback: button text changes to "Copied!" for 1.5s after success.
- Improved Download .md button feedback: button text changes to "Downloaded!" for 1.5s after success, with slug validation before download.
- Added validation error display panel above export buttons showing all current validation issues.
- Added "Generated .md file needs manual upload to src/content/blog/ and commit to GitHub." hint below export buttons.
- Removed Load Draft button (replaced by automatic draft detection and restore on page load).
- Draft data now includes _savedAt timestamp for display in draft notice.
- All draft operations persist to localStorage only, never uploaded to any server.

## v0.7.0

- Added Article Composer (Composer.app) for local Markdown article creation with frontmatter form, Markdown textarea, and live preview.
- Added frontmatter form fields: title, slug, date, updated, summary, tags, category, status, articleStyle, readerDensity, toc.
- Added live preview using existing Article Style System with real-time articleStyle and readerDensity switching.
- Added Markdown generation with correct frontmatter format, escaped strings, and array/boolean serialization.
- Added Copy Markdown button using navigator.clipboard API.
- Added Download .md button with automatic filename from slug.
- Added Open GitHub Folder link to repository's src/content/blog directory.
- Added localStorage draft persistence with Save/Load/Clear buttons and key lab-composer-draft.
- Added Import .md file support with frontmatter parsing for title, slug, date, tags, status, articleStyle, and body content.
- Added basic validation for required fields before Copy/Download.
- Added composer route /composer/ with AppWindow, Dock entry, and Command Palette integration.
- Added composer CSS with responsive two-column layout, form styling, and mobile degradation.

## v0.6.3

- Added article template at docs/ARTICLE_TEMPLATE.md with complete frontmatter fields, example content, and publishing instructions.
- Enhanced README with Blog Publishing Quick Start, draft rules, publishing workflow, and template reference.
- Enhanced preflight with article content validation: checks required frontmatter fields, valid articleStyle values, unique slugs, and minimum article count.
- Added blog result count display showing number of matching articles when filtering.
- Added ARTICLE_TEMPLATE.md to self-test required files.
- Synced version to v0.6.3 across site.ts, package.json, projects.ts, timeline.ts, README, RELEASE_NOTES, self-test, and preflight.

## v0.6.2

- Added unified OS Motion Language for detail panel content transitions across Projects, Blog, and Timeline.
- Added Detail Transition modes: Off (instant), Fade (opacity), Slide (horizontal), OS Panel (opacity + translate + blur).
- Added OS Effects toggle (On/Off) to disable all custom animations globally.
- Added Motion Intensity control (Minimal/Balanced/Expressive) that adjusts transition duration, distance, and card lift.
- Added motion tokens: --detail-duration, --detail-ease, --motion-distance overrides per intensity level.
- Added data-detail-swapping and data-detail-transition CSS selectors for JS-driven content transitions.
- Added detail-swap-body wrapper in Projects and Timeline detail panels for consistent transition targeting.
- Added syncMotionSettings function to system-state.ts for persisting and applying motion preferences.
- Added motion intensity CSS overrides in tokens.css for minimal, balanced, and expressive profiles.
- Added preflight checks for OS motion settings, detail transition CSS, and detail swap body wrappers.
- Improved detail panel content switching to use exit/enter animation pattern instead of hard swap.
- Improved Settings.app with OS Motion section including OS Effects, Motion Intensity, and Detail Transition controls.

## v0.6.1

- Unified version numbers across site.ts, package.json, projects.ts, README, and RELEASE_NOTES.
- Updated w0nderful-lab-os project version in projects data from v0.4.0 to v0.6.1.
- Added timeline entries for v0.4.0, v0.4.2, v0.5.0, and v0.6.0 releases.
- Updated README positioning description to reflect current v0.6.x release series.
- Updated roadmap screenshot reference to v0.6.x deployment.

## v0.6.0

- Added Astro Content Collections for blog posts with Markdown support, frontmatter schema validation, and static rendering.
- Added Article Style System with 6 styles: system, paper, terminal, magazine, notebook, minimal. Each style applies distinct typography, spacing, and code block styling.
- Added Reader Style switcher allowing users to override article styles globally. Options include Follow Article (author default) and all 6 styles. Preference persists in localStorage.
- Added 4 example Markdown articles demonstrating different styles: system (project review), paper (local-first philosophy), terminal (deployment log), magazine (showcase).
- Added Copy Link button in article detail for sharing deep links via clipboard.
- Added Table of Contents (TOC) support for articles with toc: true frontmatter.
- Added Latest Posts widget on home page reading from Content Collections.
- Added Reader Style setting in Settings.app with Follow Article fallback.
- Added article-styles.css with complete typography coverage for h1-h4, paragraphs, links, lists, blockquotes, code, tables, images, and horizontal rules across all 6 styles.
- Improved Blog page to read from real Markdown content instead of hardcoded TypeScript data.
- Improved Blog detail rendering with template-based article switching for better performance.

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
