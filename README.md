# w0nderful-lab-os

OS-themed personal blog, open-source lab, and project showcase hub for w0nderful666.

Current version: `v0.4.0`

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
- Command Palette opened with Ctrl/Cmd + K for apps, projects, posts, timeline entries, settings, utility actions, and Global Search.
- Terminal.app with real local commands for navigation, project opening, settings changes, search, status, version, and GitHub profile launch.
- System State shared by Dock, System Bar, Command Palette, Terminal.app, Settings.app, and Master-Detail apps.
- Recent Items for recently opened projects, posts, timeline entries, and important commands.
- Project / Blog / Timeline Linking so related projects, articles, and log entries open through the same control layer.
- Local First, No Backend, Privacy Friendly, GitHub Pages Ready.

## Control Layer

The v0.4.0 Control Layer is built from small vanilla TypeScript modules:

- `src/scripts/system-state.ts` owns current app, selected project/post/timeline entry, layout state, theme, Experience Mode, Motion Speed, language, Recent Items, and command history.
- `src/scripts/command-palette.ts` powers the global Command Palette and keyboard controls.
- `src/scripts/terminal.ts` powers Terminal.app command input, output, and command history recall.
- `src/scripts/search-index.ts` provides shared Global Search across projects, posts, timeline entries, and commands.
- `src/data/commands.ts` keeps command data centralized so commands are discoverable and executable.

State changes sync to `html` and `body` data attributes, persist lightweight preferences to `localStorage`, and dispatch `labos:*` custom events for app changes, settings changes, command execution, and content opening.

## Keyboard Shortcuts

- `Ctrl/Cmd + K`: open Command Palette.
- `Esc`: close Command Palette.
- `Enter`: execute the selected command or terminal input.
- `ArrowUp` / `ArrowDown`: move through Command Palette results or Terminal.app history.

## OS Style

The interface uses a fixed System Bar, Dock navigation, framed app windows, compact widgets, terminal-style code blocks, restrained glass panels, and responsive mobile behavior. The site does not pretend to be a real operating system; the OS layer is a navigation and storytelling system for the blog and project hub.

Animations are intentionally small and use `transform` and `opacity`. App windows fade in with a slight upward motion, Dock items scale on hover, active Dock items are highlighted, and cards lift on hover. `prefers-reduced-motion` is respected.

## Master-Detail

Projects.app, Blog.app, and Timeline.app use an OS-style Master-Detail layout with explicit state on the container:

- `data-layout="idle"` keeps the list at full width and hides the detail panel.
- `data-layout="focused"` shrinks the list to roughly one third and slides the detail panel into the main view.
- `data-layout="expanded"` gives list and detail equal space for side-by-side scanning.

On mobile, the same states become list or full-screen detail so the interface stays readable without horizontal scrolling.

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
  docs/
    COMMAND_SYSTEM.md
    SYSTEM_STATE.md
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
- Add screenshots after the v0.4.0 GitHub Pages deployment.
- Add project detail pages when individual projects need deeper case studies.
- Expand terminal command aliases only after the core command surface stays stable.

## License

MIT License. See [LICENSE](LICENSE).
