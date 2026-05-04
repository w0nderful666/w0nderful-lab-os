# System State

`src/scripts/system-state.ts` is the lightweight global state layer for v0.4.0.

## State Shape

System State tracks:

- `currentApp`
- `currentProject`
- `currentPost`
- `currentTimelineItem`
- `layoutState`
- `theme`
- `experienceMode`
- `motionSpeed`
- `language`
- `recentItems`
- `commandHistory`

The implementation uses vanilla TypeScript and browser APIs. No Redux, Zustand, Pinia, backend, database, or login system is required.

## Persistence

The existing `w0nderful-lab-os.settings` localStorage key is preserved. v0.4.0 stores only lightweight preferences and metadata:

- theme
- Experience Mode
- Motion Speed
- language
- Recent Items
- command history

Article bodies and project content stay in static source data and are not copied into localStorage.

## DOM Sync

Every state update syncs attributes to `html` and `body`:

- `data-theme`
- `data-theme-setting`
- `data-experience`
- `data-motion-speed`
- `data-current-app`
- `data-layout-state`
- `data-current-project`
- `data-current-post`
- `data-current-timeline-item`

This lets CSS, Dock, System Bar, Settings.app, and footer labels react without a heavy client framework.

## Events

System State dispatches custom events for app and content changes:

- `labos:state-change`
- `labos:app-change`
- `labos:project-open`
- `labos:post-open`
- `labos:timeline-open`
- `labos:settings-change`
- `labos:command-execute`
- `labos:recent-change`
- `labos:command-history-change`

The older `lab-os-settings-change` event is still emitted for preference changes so previous settings behavior migrates smoothly.

## Recent Items

Recent Items keep the latest 10 opened projects, posts, timeline entries, or major commands. Entries are deduplicated by type and target, newest first, and can be opened again from Home.app, Settings.app, or the Command Palette.
