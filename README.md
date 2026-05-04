# w0nderful-lab-os

OS-themed personal blog, open-source lab, and project showcase hub for w0nderful666.

Current version: `v0.4.2`

Live demo: https://w0nderful666.github.io/w0nderful-lab-os/

## Positioning

`w0nderful-lab-os` is an A-Level static site that presents a personal blog and project hub through a MacOS / Linux desktop metaphor. The v0.4.0 Control Layer turns the site into an operable personal lab: projects become Apps, posts become Docs, timeline entries become System Log records, settings become System Settings, and shared commands can control them.

## A-Level Standard

This project is designed as a long-term personal brand hub, not a disposable demo. The baseline follows the local `open-tools-starter` discipline:

- Clear `src / data / components / scripts` structure.
- Centralized project, post, timeline, navigation, and site metadata.
- Real local-first interactions with no dead controls.
- Complete README, release notes, license, contribution, and security files.
- GitHub Pages Ready deployment workflow.
- `self-test` and `preflight` release gates.

## Features

- Desktop Workspace home page with System Bar, Dock, terminal widget, featured projects, latest posts, system log, quick actions, and Experience Mode controls.
- Projects.app matrix with search, category filtering, status filtering, selectable project cards, Master-Detail layout states, details, core features, versions, Live Demo links, GitHub links, related articles, and roadmap slots.
- Blog.app reader with category filtering, tag filtering, simple search, Master-Detail layout states, in-app article view, back-to-list flow, reading progress, paragraph reveal, related articles, and article roadmap.
- Timeline.app with System Log entries, type filtering, and Master-Detail detail inspection.
- About.app with version, author, positioning, project count, post count, and tech stack.
- Settings.app with Theme, Experience Mode, Motion Speed, Language, Recent Items management, Reset local settings, and Keyboard Shortcuts.
- Settings Preview Card for live theme, palette, background, motion, button, and window depth feedback.
- Command Palette opened with Ctrl/Cmd + K for grouped Pages, Actions, Settings, Recent Items, projects, posts, timeline entries, utility actions, and Global Search.
- Terminal.app with real local commands for navigation, project opening, settings changes, search, status, version, and GitHub profile launch.
- System State shared by Dock, System Bar, Command Palette, Terminal.app, Settings.app, and Master-Detail apps.
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

The v0.4.0 Control Layer is built from small vanilla TypeScript modules:

- `src/scripts/system-state.ts` owns current app, selected project/post/timeline entry, layout state, theme, Experience Mode, Motion Speed, language, Recent Items, and command history.
- `src/scripts/command-palette.ts` powers the global Command Palette and keyboard controls.
- `src/scripts/terminal.ts` powers Terminal.app command input, output, and command history recall.
- `src/scripts/search-index.ts` provides shared Global Search across projects, posts, timeline entries, and commands.
- `src/data/commands.ts` keeps command data centralized so commands are discoverable and executable.

State changes sync to `html` and `body` data attributes, persist lightweight preferences to `localStorage`, and dispatch `labos:*` custom events for app changes, settings changes, command execution, and content opening.

The v0.4.2 experience pass keeps the same static architecture while improving the feeling of one continuous OS surface: Dock active state, grouped Command Palette results, Settings.app visual preview, first-visit guidance, empty states, and the 404 notice all use the same System State and transition lifecycle.

## Keyboard Shortcuts

- `Ctrl/Cmd + K`: open Command Palette.
- `Esc`: close Command Palette.
- `Enter`: execute the selected command or terminal input.
- `ArrowUp` / `ArrowDown`: move through Command Palette results or Terminal.app history.

## OS Style

The interface uses a fixed System Bar, Dock navigation, framed app windows, compact widgets, terminal-style code blocks, restrained layered panels, and responsive mobile behavior. The site does not pretend to be a real operating system; the OS layer is a navigation and storytelling system for the blog and project hub.

Animations are intentionally small and use `transform` and `opacity`. App windows fade in with a slight upward motion, page transitions preserve the shell, Dock items scale on hover, active Dock items show an open-window indicator, and cards lift on hover. `prefers-reduced-motion` is respected.

## OS-like Experience Enhancements

v0.4.2 focuses on detail rather than broad new features:

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
- Add screenshots after the v0.4.2 GitHub Pages deployment.
- Add project detail pages when individual projects need deeper case studies.
- Expand terminal command aliases only after the core command surface stays stable.

## License

MIT License. See [LICENSE](LICENSE).
