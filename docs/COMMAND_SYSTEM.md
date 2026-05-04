# Command System

v0.4.0 adds a centralized command system for the Lab OS Control Layer.

## Files

- `src/data/commands.ts` defines app, project, post, timeline, settings, utility, and search commands.
- `src/components/os/CommandPalette.astro` renders the global command panel.
- `src/scripts/command-palette.ts` handles Ctrl/Cmd + K, filtering, selection, and execution.
- `src/scripts/system-state.ts` executes commands that change apps, settings, selected content, Recent Items, and command history.
- `src/scripts/search-index.ts` exposes shared Global Search results.

## Behavior

The Command Palette supports:

- Ctrl/Cmd + K to open.
- Escape to close.
- Enter to execute the highlighted command.
- ArrowUp / ArrowDown to move through results.
- Recent Items and command history when the search box is empty.
- Local search across commands, projects, posts, and timeline entries.

Commands are real actions. App commands navigate to the app route, project/post/timeline commands select the correct detail item, settings commands update `html` and `body` data attributes, utility commands copy the site URL or clear/reset local state, and external commands use real links.

## Command Groups

- App: Home, Projects, Blog, Timeline, About, Settings, Terminal.
- Project: every project in `src/data/projects.ts`.
- Post: every post in `src/data/posts.ts`.
- Timeline: every entry in `src/data/timeline.ts`.
- Settings: theme, Experience Mode, Motion Speed, and language.
- Utility: GitHub profile, Copy Site URL, Clear Recent Items, Reset Local Settings.
- Search: project, post, and timeline search launch commands.

## Event Flow

Command execution writes command history and dispatches `labos:command-execute`. Content-opening commands then dispatch one of:

- `labos:project-open`
- `labos:post-open`
- `labos:timeline-open`
- `labos:app-change`
- `labos:settings-change`

Projects.app, Blog.app, Timeline.app, Settings.app, Dock, System Bar, Command Palette, and Terminal.app all listen to this shared state instead of maintaining isolated control paths.
