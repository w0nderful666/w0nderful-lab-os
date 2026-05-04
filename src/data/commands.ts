import { posts } from "./posts";
import { projects } from "./projects";
import { site, withBase } from "./site";
import { timeline } from "./timeline";

export type CommandKind = "app" | "project" | "post" | "timeline" | "settings" | "utility" | "search";

export type CommandAction =
  | "open-app"
  | "open-project"
  | "open-post"
  | "open-timeline"
  | "set-theme"
  | "set-experience"
  | "set-motion-speed"
  | "set-language"
  | "open-external"
  | "copy-site-url"
  | "clear-recent"
  | "reset-settings"
  | "toggle-theme"
  | "search";

export type Command = {
  id: string;
  title: string;
  description: string;
  kind: CommandKind;
  action: CommandAction;
  target?: string;
  href?: string;
  keywords: string[];
};

const appCommands: Command[] = [
  { id: "open-home", title: "Open Home", description: "Open Home.app desktop workspace.", kind: "app", action: "open-app", target: "home", keywords: ["home", "desktop", "workspace", "shouye"] },
  { id: "open-projects", title: "Open Projects", description: "Open Projects.app matrix.", kind: "app", action: "open-app", target: "projects", keywords: ["projects", "matrix", "apps", "xiangmu", "project"] },
  { id: "open-blog", title: "Open Blog", description: "Open Blog.app reader.", kind: "app", action: "open-app", target: "blog", keywords: ["blog", "posts", "reader", "wenzhang", "boke"] },
  { id: "open-timeline", title: "Open Timeline", description: "Open Timeline.app system log.", kind: "app", action: "open-app", target: "timeline", keywords: ["timeline", "log", "history", "shijianxian", "rizhi"] },
  { id: "open-about", title: "Open About", description: "Open About.app identity panel.", kind: "app", action: "open-app", target: "about", keywords: ["about", "identity", "guanyu", "system", "info", "xitong"] },
  { id: "open-settings", title: "Open Settings", description: "Open Settings.app controls.", kind: "app", action: "open-app", target: "settings", keywords: ["settings", "preferences", "controls", "shezhi", "zhuti", "beijing"] },
  { id: "open-terminal", title: "Open Terminal", description: "Open Terminal.app command console.", kind: "app", action: "open-app", target: "terminal", keywords: ["terminal", "console", "command", "zhongduan"] }
];

const projectCommands: Command[] = projects.map((project) => ({
  id: `open-project-${project.slug}`,
  title: `Open ${project.name}`,
  description: project.summary,
  kind: "project",
  action: "open-project",
  target: project.slug,
  href: project.liveUrl,
  keywords: [project.name, project.slug, project.type, project.category, project.status, ...project.tags]
}));

const settingsCommands: Command[] = [
  { id: "theme-light", title: "Theme Light", description: "Switch the interface to light theme.", kind: "settings", action: "set-theme", target: "light", keywords: ["theme", "light", "qianse"] },
  { id: "theme-dark", title: "Theme Dark", description: "Switch the interface to dark theme.", kind: "settings", action: "set-theme", target: "dark", keywords: ["theme", "dark", "shense"] },
  { id: "theme-system", title: "Theme System", description: "Follow the system color scheme.", kind: "settings", action: "set-theme", target: "system", keywords: ["theme", "system", "gensui"] },
  { id: "experience-performance", title: "Experience Performance", description: "Use the leanest motion and depth profile.", kind: "settings", action: "set-experience", target: "performance", keywords: ["experience", "performance", "mode", "xingneng"] },
  { id: "experience-balanced", title: "Experience Balanced", description: "Use the balanced desktop profile.", kind: "settings", action: "set-experience", target: "balanced", keywords: ["experience", "balanced", "mode", "pingheng"] },
  { id: "experience-quality", title: "Experience Quality", description: "Use the richest visual depth profile.", kind: "settings", action: "set-experience", target: "quality", keywords: ["experience", "quality", "mode", "gaozhiliang"] },
  { id: "motion-slow", title: "Motion Slow", description: "Slow down interaction motion.", kind: "settings", action: "set-motion-speed", target: "slow", keywords: ["motion", "speed", "slow", "man"] },
  { id: "motion-normal", title: "Motion Normal", description: "Use default interaction motion.", kind: "settings", action: "set-motion-speed", target: "normal", keywords: ["motion", "speed", "normal", "zhengchang"] },
  { id: "motion-fast", title: "Motion Fast", description: "Speed up interaction motion.", kind: "settings", action: "set-motion-speed", target: "fast", keywords: ["motion", "speed", "fast", "kuai"] },
  { id: "language-zh", title: "Language Chinese", description: "Switch interface labels to Chinese.", kind: "settings", action: "set-language", target: "zh", keywords: ["language", "chinese", "zh", "zhongwen"] },
  { id: "language-en", title: "Language English", description: "Switch interface labels to English.", kind: "settings", action: "set-language", target: "en", keywords: ["language", "english", "en", "yingwen"] }
];

const utilityCommands: Command[] = [
  { id: "open-github-profile", title: "Open GitHub Profile", description: "Open the w0nderful666 GitHub profile.", kind: "utility", action: "open-external", href: "https://github.com/w0nderful666", keywords: ["github", "profile", "external"] },
  { id: "copy-site-url", title: "Copy Site URL", description: "Copy the public Lab OS URL.", kind: "utility", action: "copy-site-url", target: site.liveUrl, keywords: ["copy", "site", "url"] },
  { id: "clear-recent-items", title: "Clear Recent Items", description: "Clear recently opened items.", kind: "utility", action: "clear-recent", keywords: ["recent", "clear", "history"] },
  { id: "reset-local-settings", title: "Reset Local Settings", description: "Reset local preferences and lightweight metadata.", kind: "utility", action: "reset-settings", keywords: ["reset", "settings", "localStorage"] },
  { id: "toggle-theme", title: "Toggle Theme Mode", description: "Switch between light and dark theme.", kind: "utility", action: "toggle-theme", keywords: ["toggle", "theme", "dark", "light", "qiehuan", "zhuti"] },
  { id: "go-home", title: "Go Home", description: "Navigate to the desktop workspace.", kind: "utility", action: "open-app", target: "home", keywords: ["go", "home", "fanhui", "shouye"] }
];

const searchCommands: Command[] = [
  { id: "search-projects", title: "Search projects", description: "Open Projects.app for project search.", kind: "search", action: "search", target: "projects", keywords: ["search", "projects"] },
  { id: "search-posts", title: "Search posts", description: "Open Blog.app for post search.", kind: "search", action: "search", target: "blog", keywords: ["search", "posts", "blog"] },
  { id: "search-timeline", title: "Search timeline", description: "Open Timeline.app for log search.", kind: "search", action: "search", target: "timeline", keywords: ["search", "timeline", "log"] }
];

const postCommands: Command[] = posts.map((post) => ({
  id: `open-post-${post.slug}`,
  title: `Open ${post.title}`,
  description: post.summary,
  kind: "post",
  action: "open-post",
  target: post.slug,
  keywords: [post.title, post.category, post.relatedProject, ...post.tags]
}));

const timelineCommands: Command[] = timeline.map((entry) => ({
  id: `open-timeline-${entry.id}`,
  title: `Open ${entry.title}`,
  description: entry.description,
  kind: "timeline",
  action: "open-timeline",
  target: entry.id,
  keywords: [entry.title, entry.type, entry.relatedProject, entry.date]
}));

export const commands: Command[] = [
  ...appCommands,
  ...projectCommands,
  ...postCommands,
  ...timelineCommands,
  ...settingsCommands,
  ...utilityCommands,
  ...searchCommands
];

export const appRoutes = {
  home: withBase(""),
  projects: withBase("projects/"),
  blog: withBase("blog/"),
  timeline: withBase("timeline/"),
  about: withBase("about/"),
  settings: withBase("settings/"),
  terminal: withBase("terminal/")
} as const;
