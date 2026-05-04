# Contributing

Thanks for helping improve `w0nderful-lab-os`.

## Project Principles

- Keep the site Local First and No Backend.
- Preserve the blog and project hub as the core product.
- Avoid dead controls, dead links, and placeholder-only UI.
- Keep data centralized in `src/data`.
- Keep interactions small, readable, and static-site friendly.

## Local Setup

```bash
npm install
npm run dev
```

## Quality Checks

Before opening a pull request, run:

```bash
npm run build
npm run check
npm run self-test
npm run preflight
```

## Pull Requests

Include a short summary, the user-facing impact, and the commands you ran. For UI work, confirm desktop and mobile layouts. For content changes, update `RELEASE_NOTES.md` when the change affects the release surface.
