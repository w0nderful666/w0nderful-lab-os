# w0nderful-lab-os

OS-themed personal blog, open-source lab, and project showcase hub for w0nderful666.

Current version: `v0.6.0`

Live demo: https://w0nderful666.github.io/w0nderful-lab-os/

## Positioning

`w0nderful-lab-os` is an A-Level static site that presents a personal blog and project hub through a MacOS / Linux desktop metaphor. The Control Layer turns the site into an operable personal lab: projects become Apps, posts become Docs, timeline entries become System Log records, settings become System Settings, and shared commands can control them. v0.6.0 adds Astro Content Collections for Markdown blog publishing with an Article Style System.

## A-Level Standard

This project is designed as a long-term personal brand hub, not a disposable demo. The baseline follows the local `open-tools-starter` discipline:

- Clear `src / data / components / scripts` structure.
- Centralized project, post, timeline, navigation, and site metadata.
- Real local-first interactions with no dead controls.
- Complete README, release notes, license, contribution, and security files.
- GitHub Pages Ready deployment workflow.
- `self-test` and `preflight` release gates.

## Features

- Desktop Workspace home page with System Bar, Dock, terminal widget, featured projects, latest posts from Markdown, system log, quick actions, and Experience Mode controls.
- Projects.app matrix with search, category filtering, status filtering, selectable project cards, Master-Detail layout states, details, core features, versions, Live Demo links, GitHub links, related articles, and roadmap slots.
- Blog.app reader with Astro Content Collections, Markdown rendering, Article Style System (6 styles), Reader Style switcher, category filtering, tag filtering, search, Master-Detail layout, Copy Link, Table of Contents, and deep linking.
- Timeline.app with System Log entries, type filtering, and Master-Detail detail inspection.
- About.app with version, author, positioning, project count, post count, tech stack, and real-time System Health checks.
- Settings.app with Theme, Experience Mode, Motion Speed, Language, Reader Style, Recent Items management, Reset local settings, and Keyboard Shortcuts.
- Article Style System with 6 distinct styles: system (OS documentation), paper (long-form reading), terminal (deployment logs), magazine (showcase articles), notebook (learning notes), minimal (clean tech blog).
- Reader Style override allowing users to choose a global article display style or follow each article's author-chosen default.
- Markdown blog publishing with frontmatter support for title, slug, date, summary, tags, category, status, articleStyle, readerDensity, toc, and relatedProject.
- Settings Preview Card for live theme, palette, background, motion, button, and window depth feedback.
- Command Palette opened with Ctrl/Cmd + K for grouped Pages, Actions, Settings, Recent Items, projects, posts, timeline entries, utility actions, and Global Search with Chinese Aliases and quick actions.
- Terminal.app with real local commands for navigation, project opening, settings changes, search, status, version, and GitHub profile launch.
- System State shared by Dock, System Bar, Command Palette, Terminal.app, Settings.app, and Master-Detail apps.
- Desktop Workspace with app launcher shortcuts for Projects.app, Blog.app, Timeline.app, Settings.app, and About.app with real navigation.
- Enhanced System Bar showing current app, palette, background, clickable version, and local time with mobile folding.
- System Info / About.app with Lab Specs, Tech Stack, Core Features, and real-time System Health checks for localStorage, reduced motion, palette, background, command palette, and client navigation.
- Keyboard Shortcuts with centralized G+H/P/B/T/S navigation, input field respect, and lifecycle-safe bindings.
- Dock active indicators with glow, open-window feedback, bottom/side indicators, and unified hover/focus-visible states.
- SPA-like Navigation powered by Astro View Transitions and ClientRouter, keeping the OS shell visually continuous while preserving static routes.
- Welcome / Quick Start prompt for first-time visitors, persisted through localStorage after dismissal.
- Unified OS-style Empty State and 404 System Notice with return-home and Command Palette actions.
- Recent Items for recently opened projects, posts, timeline entries, and important commands.
- Project / Blog / Timeline Linking so related projects, articles, and log entries open through the same control layer.
- Sticky Detail Panel and focused Master-Detail layout so details become the primary reading surface on desktop.
- Theme Palette and Background Presets controlled from Settings.app through CSS variables.
- Toolbar / Filter UX for Projects.app, Blog.app, and Timeline.app search and filters.
- Local First, No Backend, Privacy Friendly, GitHub Pages Ready.

## SPA-like Navigation

Astro View Transitions and `<ClientRouter />` provide page-level smooth transitions without turning the project into a React or Vue SPA. Every route still builds as static HTML, remains GitHub Pages friendly, and keeps SEO-friendly page structure. Internal page navigation feels like switching apps inside one Persistent OS Shell: the main content fades and lifts, while System Bar, Dock, Command Palette host, and footer use persistent transition names to avoid distracting reload flashes.

The OS control layer still owns app state. Command Palette and Terminal.app use System State plus Astro client navigation for real route changes, while repeated clicks on the current route are guarded so they update app state without forcing another transition.

## Control Layer

The Control Layer is built from small vanilla TypeScript modules:

- `src/scripts/system-state.ts` owns current app, selected project/post/timeline entry, layout state, theme, Experience Mode, Motion Speed, language, Recent Items, and command history.
- `src/scripts/command-palette.ts` powers the global Command Palette and keyboard controls.
- `src/scripts/terminal.ts` powers Terminal.app command input, output, and command history recall.
- `src/scripts/search-index.ts` provides shared Global Search across projects, posts, timeline entries, and commands.
- `src/data/commands.ts` keeps command data centralized so commands are discoverable and executable.

State changes sync to `html` and `body` data attributes, persist lightweight preferences to `localStorage`, and dispatch `labos:*` custom events for app changes, settings changes, command execution, and content opening.

The v0.6.x release series keeps the same static architecture while adding Markdown blog publishing, Article Style System, and Reader Style override. The OS surface continues to improve with Dock active state, grouped Command Palette results, Settings.app visual preview, first-visit guidance, empty states, and the 404 notice.

## Keyboard Shortcuts

- `Ctrl/Cmd + K`: open Command Palette.
- `Esc`: close Command Palette, Welcome Toast, or dismissible panels.
- `Enter`: execute the selected command or terminal input.
- `ArrowUp` / `ArrowDown`: move through Command Palette results or Terminal.app history.
- `G then H`: Go Home.
- `G then P`: Go Projects.
- `G then B`: Go Blog.
- `G then T`: Go Timeline.
- `G then S`: Go Settings.

## OS Style

The interface uses a fixed System Bar, Dock navigation, framed app windows, desktop app launcher shortcuts, compact widgets, terminal-style code blocks, restrained layered panels, and responsive mobile behavior. The site does not pretend to be a real operating system; the OS layer is a navigation and storytelling system for the blog and project hub.

Animations are intentionally small and use `transform` and `opacity`. App windows fade in with a slight upward motion, page transitions preserve the shell, Dock items scale on hover, active Dock items show an open-window indicator, and cards lift on hover. `prefers-reduced-motion` is respected.

## OS-like Experience Enhancements

v0.5.0 focused on systemization of the OS experience:

- Desktop Workspace with app launcher shortcuts that behave like OS desktop icons with hover lift and real navigation.
- Enhanced System Bar showing current app, palette, background, clickable version, and local time.
- System Info / About.app with real-time System Health checks for environment capabilities.
- Centralized Keyboard Shortcuts with G+X navigation for quick app switching.
- Command Palette with Chinese Aliases, Toggle Theme quick action, and Go Home shortcut.
- System Bar status pills that sync with CSS variables across palette, background, and app changes.

- Dock active state now combines border, glow, icon lift, and an indicator so the current route reads as an open app.
- AppWindow, Detail Panel, and Settings Panel use stronger but restrained border, shadow, backdrop blur, and inner highlight layering.
- Command Palette behaves more like a system launcher with backdrop depth, grouped Pages / Actions / Settings / Recent results, and subtle current or recommended badges.
- Settings.app includes a Preview Card that reacts immediately to Palette, Background, Theme, Experience Mode, and Motion Speed changes through existing CSS variables.
- Projects.app, Blog.app, and Timeline.app show a unified OS-style empty state when filters return no results.
- The static 404 page is an OS-style System Notice with return-home and Command Palette controls.
- First-time visitors get a dismissible Welcome / Quick Start prompt for Dock, Command Palette, Theme, Background, and Motion.

## Master-Detail

Projects.app, Blog.app, and Timeline.app use an OS-style Master-Detail layout with explicit state on the container:

- `data-layout="idle"` keeps the list at full width and hides the detail panel.
- `data-layout="focused"` shrinks the list to roughly 27% and gives the detail panel roughly 73% so the selected item becomes the visual subject.
- `data-layout="expanded"` gives list and detail equal space for side-by-side scanning.

### Detail Focus Mode

A Focus/Restore toggle button in the detail panel header allows users to widen the detail panel to 85% for a clearer reading surface. The focus mode state persists in localStorage and is restored across page loads. On mobile, the toggle is hidden and detail panels use full-width single-column layout.

### Scroll Alignment

When a list item is clicked, the detail panel automatically scrolls into the current viewport using smooth scroll (or instant for reduced-motion / performance mode), keeping the selected item and its detail in the same visual context.

On mobile, the same states become list or full-screen detail so the interface stays readable without horizontal scrolling.

Desktop detail panels use sticky positioning with their own scroll area. This keeps project, article, and timeline details visible while the master list scrolls.

## Experience Mode

Experience Mode is stored in `localStorage` under `w0nderful-lab-os.settings` and applied on the `html` element:

- `data-experience="performance"` uses almost no animation, disables blur, and keeps shadows minimal.
- `data-experience="balanced"` uses light animation and modest depth.
- `data-experience="quality"` increases visual depth, card lift, and Dock feedback.

Theme and language settings are also persisted in the same local settings object.

## Motion Speed

Motion Speed is stored in the same `localStorage` settings object and applied as `html[data-motion-speed]`:

- `slow` makes transitions more visible for demos and inspection.
- `normal` is the default.
- `fast` keeps the OS feedback crisp.

The CSS defines `--motion-fast`, `--motion-normal`, `--motion-slow`, `--app-duration`, and `--panel-duration`. Performance mode automatically reduces animation even if a slower speed is selected.

Page transitions reuse the same variables. Performance mode shortens transitions to near-instant, Balanced mode uses light fade and translate motion, Quality mode increases the OS-level lift, and `prefers-reduced-motion` disables complex transition timing.

## Theme Palette

Settings.app exposes five Theme Palette options through `data-palette` on `html` and `body`:

- `aurora`: default Aurora identity.
- `graphite`: professional low-saturation reading palette.
- `ubuntu`: Linux-inspired orange and purple accent system.
- `mint`: clean green and cyan reading palette.
- `terminal`: Neon Terminal accent palette with restrained glow.

Each palette updates CSS variables for accent color, borders, glow, active indicators, and button hover states.

## Background Presets

Settings.app also exposes five CSS-only Background Presets through `data-background`:

- `aurora`: Aurora Mist.
- `grid`: Desktop Grid.
- `terminal`: Terminal Glow.
- `paper`: Paper Light.
- `space`: Space Lab.

The backgrounds use gradients and lightweight patterns only. There are no uploaded images, videos, or backend dependencies.

## Toolbar / Filter UX

Projects.app, Blog.app, and Timeline.app use OS-style toolbars for search and filters. Search gets priority width on desktop, filter chips wrap cleanly, and each app has a real Clear Filters action. On mobile the toolbar stacks into readable rows instead of squeezing controls together.

## Tech Stack

- Astro
- TypeScript
- CSS
- Vanilla JavaScript
- GitHub Pages

No backend, database, login system, or heavy client framework is required.

## Blog Publishing

### Adding a New Article

Create a new Markdown file in `src/content/blog/`:

```markdown
---
title: "Your Article Title"
slug: "your-article-slug"
date: "2026-05-05"
summary: "A brief summary of your article."
tags: ["Tag1", "Tag2"]
category: "Category Name"
status: "published"
articleStyle: "system"
readerDensity: "comfortable"
toc: true
---

## Section Heading

Your content here...
```

### Frontmatter Fields

| Field | Required | Default | Description |
|-------|----------|---------|-------------|
| title | Yes | - | Article title |
| slug | No | filename | URL slug |
| date | Yes | - | Publication date |
| updated | No | - | Last update date |
| summary | Yes | - | Brief description |
| tags | No | [] | Array of tags |
| category | No | "General" | Article category |
| status | No | "published" | "published" or "draft" |
| articleStyle | No | "system" | Display style |
| readerDensity | No | "comfortable" | Reading density |
| toc | No | false | Show table of contents |
| cover | No | - | Cover image path |
| relatedProject | No | - | Related project slug |

### Article Styles

- **system**: OS documentation style, suitable for project reviews and technical notes
- **paper**: Paper reading style with indented paragraphs, suitable for long-form essays
- **terminal**: Terminal log style with highlighted code blocks, suitable for deployment records
- **magazine**: Magazine style with impactful headings, suitable for showcase articles
- **notebook**: Notebook style with dashed borders, suitable for learning notes
- **minimal**: Clean tech blog style, focused on reading efficiency

### Reader Style

Users can override article styles globally via Settings.app or the style switcher in article detail. Options:

- **Follow Article**: Use each article's author-chosen style
- **System / Paper / Terminal / Magazine / Notebook / Minimal**: Override all articles with chosen style

Preference persists in localStorage under `lab-reader-style`.

## System Health

About.app includes real-time System Health checks:

- localStorage availability detection
- Reduced motion preference detection
- Current palette and background status
- Command Palette availability
- Client navigation status

All checks read live environment state, not hardcoded values.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages Deployment

The workflow at `.github/workflows/pages.yml` runs on pushes to `main` and `dev`, plus manual `workflow_dispatch`. It uses Node.js 20, installs dependencies with `npm ci`, runs build/check/self-test/preflight, uploads `dist`, and deploys to GitHub Pages.

Astro is configured for:

```js
site: "https://w0nderful666.github.io"
base: "/w0nderful-lab-os"
```

## Project Structure

```txt
w0nderful-lab-os/
  .github/workflows/pages.yml
  public/
  scripts/
    self-test.mjs
    preflight.mjs
  src/
    components/
      apps/
      common/
      os/
    data/
      commands.ts
      site.ts
      projects.ts
      posts.ts
      timeline.ts
      navigation.ts
    layouts/
    pages/
      terminal/
    scripts/
      command-palette.ts
      search-index.ts
      system-state.ts
      terminal.ts
    styles/
      motion.css
      os-theme.css
      tokens.css
  docs/
    APP_LAYOUT_STANDARD.md
    COMMAND_SYSTEM.md
    INTERACTION_RULES.md
    MOTION_GUIDE.md
    SYSTEM_STATE.md
    THEME_SYSTEM.md
    TERMINAL_COMMANDS.md
  astro.config.mjs
  package.json
  README.md
  RELEASE_NOTES.md
  CONTRIBUTING.md
  SECURITY.md
  LICENSE
  self-test.html
```

## Self-Test

```bash
npm run build
npm run check
npm run self-test
npm run preflight
```

`self-test` checks required files and the built homepage for key product strings. `preflight` checks version consistency, Control Layer files, documentation requirements, GitHub Pages config, forbidden placeholders, privacy boundaries, and build output.

## Roadmap

- Move Blog.app body blocks into Astro content collections.
- Add screenshots after the v0.6.x GitHub Pages deployment.
- Add project detail pages when individual projects need deeper case studies.
- Expand terminal command aliases only after the core command surface stays stable.

## License

MIT License. See [LICENSE](LICENSE).
