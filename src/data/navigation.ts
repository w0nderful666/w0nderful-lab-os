import { withBase } from "./site";

export type ActiveApp =
  | "home"
  | "projects"
  | "blog"
  | "timeline"
  | "about"
  | "settings"
  | "terminal";

export const topNavigation = [
  { id: "home", label: "Home", i18nKey: "nav.home", href: withBase("") },
  {
    id: "projects",
    label: "Projects",
    i18nKey: "nav.projects",
    href: withBase("projects/")
  },
  { id: "blog", label: "Blog", i18nKey: "nav.blog", href: withBase("blog/") },
  {
    id: "timeline",
    label: "Timeline",
    i18nKey: "nav.timeline",
    href: withBase("timeline/")
  },
  { id: "about", label: "About", i18nKey: "nav.about", href: withBase("about/") },
  {
    id: "terminal",
    label: "Terminal",
    i18nKey: "nav.terminal",
    href: withBase("terminal/")
  }
] as const;

export const dockNavigation = [
  ...topNavigation,
  {
    id: "settings",
    label: "Settings",
    i18nKey: "nav.settings",
    href: withBase("settings/")
  }
] as const;
