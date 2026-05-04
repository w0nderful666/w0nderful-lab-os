# w0nderful-lab-os

OS-themed personal blog, open-source lab, and project showcase hub for w0nderful666.

Live demo: https://w0nderful666.github.io/w0nderful-lab-os/

## Positioning

`w0nderful-lab-os` is an A-Level static site that presents a personal blog and project hub through a MacOS / Linux desktop metaphor. The blog remains the core product, while projects become Apps, posts become Docs, timeline entries become System Log records, and settings become System Settings.

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
- Projects.app with search, type filtering, selectable project cards, details, Live Demo links, and GitHub links.
- Blog.app with static post data, category filtering, tags, selected post preview, and article roadmap.
- Timeline.app with System Log entries and type filtering.
- About.app with version, author, positioning, project count, post count, and tech stack.
- Settings.app with Theme, Experience Mode, Language, and Reset local settings.
- Local First, No Backend, Privacy Friendly, GitHub Pages Ready.

## OS Style

The interface uses a fixed System Bar, Dock navigation, framed app windows, compact widgets, terminal-style code blocks, restrained glass panels, and responsive mobile behavior. The site does not pretend to be a real operating system; the OS layer is a navigation and storytelling system for the blog and project hub.

## Experience Mode

Experience Mode is stored in `localStorage` under `w0nderful-lab-os.settings` and applied on the `html` element:

- `data-experience="performance"` reduces animation, blur, and shadows.
- `data-experience="balanced"` is the default profile.
- `data-experience="quality"` increases visual depth and Dock feedback.

Theme and language settings are also persisted in the same local settings object.

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

The workflow at `.github/workflows/pages.yml` runs on pushes to `main` and manual `workflow_dispatch`. It uses Node.js 20, installs dependencies with `npm ci`, runs build/check/self-test/preflight, uploads `dist`, and deploys to GitHub Pages.

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
      site.ts
      projects.ts
      posts.ts
      timeline.ts
      navigation.ts
    layouts/
    pages/
    styles/
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

`self-test` checks required files and the built homepage for key product strings. `preflight` checks version consistency, documentation requirements, GitHub Pages config, forbidden placeholders, privacy boundaries, and build output.

## Roadmap

- Add Astro content collections for full article pages.
- Add screenshots after the first GitHub Pages deployment.
- Add project detail pages when individual projects need deeper case studies.
- Mirror deployment to Cloudflare Pages after the GitHub Pages release is stable.

## License

MIT License. See [LICENSE](LICENSE).
