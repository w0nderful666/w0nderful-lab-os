import { appRoutes, commands, type Command } from "../data/commands";
import { posts } from "../data/posts";
import { projects } from "../data/projects";
import { site } from "../data/site";
import { timeline } from "../data/timeline";
import { navigate } from "astro:transitions/client";

export type LabOSApp =
  | "home"
  | "projects"
  | "blog"
  | "timeline"
  | "about"
  | "settings"
  | "terminal";

export type LayoutState = "idle" | "focused" | "expanded";
export type ThemeSetting = "light" | "dark" | "system";
export type ExperienceMode = "performance" | "balanced" | "quality";
export type MotionSpeed = "slow" | "normal" | "fast";
export type Language = "en" | "zh";
export type ThemePalette = "aurora" | "graphite" | "ubuntu" | "mint" | "terminal";
export type BackgroundPreset = "aurora" | "grid" | "terminal" | "paper" | "space";
export type RecentItemType = "app" | "project" | "post" | "timeline" | "command";

export type RecentItem = {
  id: string;
  type: RecentItemType;
  target: string;
  title: string;
  meta: string;
  timestamp: number;
};

export type LabOSState = {
  currentApp: LabOSApp;
  currentProject: string;
  currentPost: string;
  currentTimelineItem: string;
  layoutState: LayoutState;
  theme: ThemeSetting;
  experienceMode: ExperienceMode;
  motionSpeed: MotionSpeed;
  language: Language;
  palette: ThemePalette;
  background: BackgroundPreset;
  recentItems: RecentItem[];
  commandHistory: string[];
};

type OpenOptions = {
  navigate?: boolean;
};

type PersistedSettings = {
  theme?: ThemeSetting;
  experience?: ExperienceMode;
  experienceMode?: ExperienceMode;
  motionSpeed?: MotionSpeed;
  language?: Language;
  palette?: ThemePalette;
  background?: BackgroundPreset;
  recentItems?: RecentItem[];
  commandHistory?: string[];
};

type LabOSApi = {
  getState: () => LabOSState;
  setState: (partial: Partial<LabOSState>) => LabOSState;
  openApp: (app: LabOSApp, options?: OpenOptions) => void;
  openProject: (slug: string, options?: OpenOptions) => void;
  openPost: (slug: string, options?: OpenOptions) => void;
  openTimeline: (id: string, options?: OpenOptions) => void;
  setTheme: (theme: ThemeSetting) => void;
  setExperienceMode: (mode: ExperienceMode) => void;
  setMotionSpeed: (speed: MotionSpeed) => void;
  setLanguage: (language: Language) => void;
  setPalette: (palette: ThemePalette) => void;
  setBackground: (background: BackgroundPreset) => void;
  addRecentItem: (item: Omit<RecentItem, "id" | "timestamp">) => void;
  clearRecentItems: () => void;
  addCommandHistory: (label: string) => void;
  executeCommand: (commandOrId: Command | string, historyLabel?: string) => Promise<void>;
  resetLocalSettings: () => void;
  copySiteUrl: () => Promise<void>;
};

declare global {
  interface Window {
    labOS: LabOSApi;
  }
}

const appIds = new Set<LabOSApp>([
  "home",
  "projects",
  "blog",
  "timeline",
  "about",
  "settings",
  "terminal"
]);

const storageKey = site.storageKey;
const welcomeStorageKey = `${storageKey}.welcome-dismissed`;
const listLimit = 10;
const defaultSettings = {
  theme: "system" as ThemeSetting,
  experienceMode: "balanced" as ExperienceMode,
  motionSpeed: "normal" as MotionSpeed,
  language: "en" as Language,
  palette: "aurora" as ThemePalette,
  background: "aurora" as BackgroundPreset
};

const paletteLabels: Record<ThemePalette, string> = {
  aurora: "Aurora",
  graphite: "Graphite",
  ubuntu: "Ubuntu",
  mint: "Mint",
  terminal: "Neon Terminal"
};

const backgroundLabels: Record<BackgroundPreset, string> = {
  aurora: "Aurora Mist",
  grid: "Desktop Grid",
  terminal: "Terminal Glow",
  paper: "Paper Light",
  space: "Space Lab"
};

const labels = {
  en: {
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.timeline": "Timeline",
    "nav.about": "About",
    "nav.settings": "Settings",
    "nav.terminal": "Terminal",
    "settings.title": "System Settings",
    "settings.theme": "Theme",
    "settings.light": "Light",
    "settings.dark": "Dark",
    "settings.system": "System",
    "settings.experience": "Experience Mode",
    "settings.performance": "Performance",
    "settings.balanced": "Balanced",
    "settings.quality": "Quality",
    "settings.motionSpeed": "Motion Speed",
    "settings.slow": "Slow",
    "settings.normal": "Normal",
    "settings.fast": "Fast",
    "settings.language": "Language",
    "settings.reset": "Reset local settings",
    "settings.storage": "Saved to localStorage",
    "settings.recent": "Recent Items",
    "settings.clearRecent": "Clear recent items",
    "settings.shortcuts": "Keyboard Shortcuts",
    "settings.palette": "Theme Palette",
    "settings.background": "Background Preset"
  },
  zh: {
    "nav.home": "\u9996\u9875",
    "nav.projects": "\u9879\u76ee",
    "nav.blog": "\u535a\u5ba2",
    "nav.timeline": "\u65e5\u5fd7",
    "nav.about": "\u5173\u4e8e",
    "nav.settings": "\u8bbe\u7f6e",
    "nav.terminal": "\u7ec8\u7aef",
    "settings.title": "\u7cfb\u7edf\u8bbe\u7f6e",
    "settings.theme": "\u4e3b\u9898",
    "settings.light": "\u6d45\u8272",
    "settings.dark": "\u6df1\u8272",
    "settings.system": "\u8ddf\u968f\u7cfb\u7edf",
    "settings.experience": "\u4f53\u9a8c\u6a21\u5f0f",
    "settings.performance": "\u6027\u80fd",
    "settings.balanced": "\u5e73\u8861",
    "settings.quality": "\u9ad8\u8d28\u91cf",
    "settings.motionSpeed": "\u52a8\u753b\u901f\u7387",
    "settings.slow": "\u6162",
    "settings.normal": "\u6b63\u5e38",
    "settings.fast": "\u5feb",
    "settings.language": "\u8bed\u8a00",
    "settings.reset": "\u91cd\u7f6e\u672c\u5730\u8bbe\u7f6e",
    "settings.storage": "\u5df2\u4fdd\u5b58\u5230 localStorage",
    "settings.recent": "\u6700\u8fd1\u8bbf\u95ee",
    "settings.clearRecent": "\u6e05\u7a7a\u6700\u8fd1\u8bb0\u5f55",
    "settings.shortcuts": "\u952e\u76d8\u5feb\u6377\u952e",
    "settings.palette": "\u914d\u8272\u65b9\u6848",
    "settings.background": "\u80cc\u666f\u9884\u8bbe"
  }
} as const;

const normalizeApp = (value: string | undefined | null): LabOSApp => {
  return value && appIds.has(value as LabOSApp) ? (value as LabOSApp) : "home";
};

const readCurrentApp = () => {
  return normalizeApp(document.body.dataset.currentApp || document.documentElement.dataset.currentApp);
};

const readPersistedSettings = (): PersistedSettings => {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as PersistedSettings) : {};
  } catch {
    return {};
  }
};

const isTheme = (value: unknown): value is ThemeSetting => value === "light" || value === "dark" || value === "system";
const isExperience = (value: unknown): value is ExperienceMode =>
  value === "performance" || value === "balanced" || value === "quality";
const isMotionSpeed = (value: unknown): value is MotionSpeed => value === "slow" || value === "normal" || value === "fast";
const isLanguage = (value: unknown): value is Language => value === "en" || value === "zh";
const isPalette = (value: unknown): value is ThemePalette =>
  value === "aurora" || value === "graphite" || value === "ubuntu" || value === "mint" || value === "terminal";
const isBackground = (value: unknown): value is BackgroundPreset =>
  value === "aurora" || value === "grid" || value === "terminal" || value === "paper" || value === "space";

const normalizeRecentItems = (items: unknown): RecentItem[] => {
  if (!Array.isArray(items)) return [];
  return items
    .filter((item): item is RecentItem => {
      if (!item || typeof item !== "object") return false;
      const candidate = item as RecentItem;
      return Boolean(candidate.type && candidate.target && candidate.title);
    })
    .slice(0, listLimit);
};

const normalizeHistory = (items: unknown): string[] => {
  if (!Array.isArray(items)) return [];
  return items.filter((item): item is string => typeof item === "string" && item.trim().length > 0).slice(0, listLimit);
};

const createInitialState = (): LabOSState => {
  const persisted = readPersistedSettings();
  const experience = persisted.experienceMode || persisted.experience;

  return {
    currentApp: readCurrentApp(),
    currentProject: "",
    currentPost: "",
    currentTimelineItem: "",
    layoutState: "idle",
    theme: isTheme(persisted.theme) ? persisted.theme : defaultSettings.theme,
    experienceMode: isExperience(experience) ? experience : defaultSettings.experienceMode,
    motionSpeed: isMotionSpeed(persisted.motionSpeed) ? persisted.motionSpeed : defaultSettings.motionSpeed,
    language: isLanguage(persisted.language) ? persisted.language : defaultSettings.language,
    palette: isPalette(persisted.palette) ? persisted.palette : defaultSettings.palette,
    background: isBackground(persisted.background) ? persisted.background : defaultSettings.background,
    recentItems: normalizeRecentItems(persisted.recentItems),
    commandHistory: normalizeHistory(persisted.commandHistory)
  };
};

let state = createInitialState();
let welcomeDismissedThisSession = false;

const getAppliedTheme = (theme: ThemeSetting) => {
  if (theme !== "system") return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const getStateSnapshot = (): LabOSState => ({
  ...state,
  recentItems: [...state.recentItems],
  commandHistory: [...state.commandHistory]
});

const writePersistedSettings = () => {
  const persisted = {
    theme: state.theme,
    experience: state.experienceMode,
    experienceMode: state.experienceMode,
    motionSpeed: state.motionSpeed,
    language: state.language,
    palette: state.palette,
    background: state.background,
    recentItems: state.recentItems,
    commandHistory: state.commandHistory
  };

  try {
    localStorage.setItem(storageKey, JSON.stringify(persisted));
  } catch {
    // localStorage can be unavailable in private contexts; the UI still works for the current session.
  }
};

const dispatch = (name: string, detail: Record<string, unknown> = {}) => {
  document.dispatchEvent(
    new CustomEvent(name, {
      detail: {
        ...detail,
        state: getStateSnapshot()
      }
    })
  );
};

const labelFor = (key: keyof typeof labels.en) => {
  return labels[state.language][key] || labels.en[key];
};

const syncI18n = () => {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n") as keyof typeof labels.en | null;
    if (!key) return;
    const value = labels[state.language][key] || labels.en[key];
    if (value) node.textContent = value;
  });
};

const syncSettingsControls = () => {
  document.querySelectorAll("[data-current-experience]").forEach((node) => {
    const key = `settings.${state.experienceMode}` as keyof typeof labels.en;
    node.textContent = labelFor(key);
  });

  document.querySelectorAll("[data-current-motion-speed]").forEach((node) => {
    const key = `settings.${state.motionSpeed}` as keyof typeof labels.en;
    node.textContent = labelFor(key);
  });

  document.querySelectorAll("[data-setting-theme]").forEach((node) => {
    if (node instanceof HTMLSelectElement) node.value = state.theme;
  });

  document.querySelectorAll("[data-setting-motion-speed]").forEach((node) => {
    if (node instanceof HTMLSelectElement) node.value = state.motionSpeed;
  });

  document.querySelectorAll("[data-setting-language]").forEach((node) => {
    if (node instanceof HTMLSelectElement) node.value = state.language;
  });

  document.querySelectorAll("[data-setting-palette]").forEach((node) => {
    if (node instanceof HTMLSelectElement) node.value = state.palette;
  });

  document.querySelectorAll("[data-setting-background]").forEach((node) => {
    if (node instanceof HTMLSelectElement) node.value = state.background;
  });

  document.querySelectorAll("[data-current-palette]").forEach((node) => {
    node.textContent = paletteLabels[state.palette];
  });

  document.querySelectorAll("[data-current-background]").forEach((node) => {
    node.textContent = backgroundLabels[state.background];
  });

  document.querySelectorAll("[data-system-palette-label]").forEach((node) => {
    node.textContent = paletteLabels[state.palette];
  });

  document.querySelectorAll("[data-system-background-label]").forEach((node) => {
    node.textContent = backgroundLabels[state.background];
  });

  document.querySelectorAll("[data-exp-choice]").forEach((node) => {
    const active = node.getAttribute("data-exp-choice") === state.experienceMode;
    node.toggleAttribute("aria-pressed", active);
    node.classList.toggle("is-active", active);
  });

  document.querySelectorAll("[data-mode-note]").forEach((node) => {
    if (node instanceof HTMLElement) {
      node.hidden = node.getAttribute("data-mode-note") !== state.experienceMode;
    }
  });
};

const syncActiveApp = () => {
  const appLabelMap: Record<string, string> = {
    home: "Home",
    projects: "Projects",
    blog: "Blog",
    timeline: "Timeline",
    about: "About",
    settings: "Settings",
    terminal: "Terminal"
  };

  document.querySelectorAll("[data-app-link]").forEach((node) => {
    const active = node.getAttribute("data-app-link") === state.currentApp;
    node.classList.toggle("is-active", active);
    if (node instanceof HTMLAnchorElement) {
      if (active) {
        node.setAttribute("aria-current", "page");
      } else {
        node.removeAttribute("aria-current");
      }
    }
  });

  document.querySelectorAll("[data-system-app-label]").forEach((node) => {
    node.textContent = appLabelMap[state.currentApp] || "Home";
  });
};

const renderRecentItems = () => {
  document.querySelectorAll("[data-recent-items-list]").forEach((wrap) => {
    wrap.textContent = "";

    if (state.recentItems.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "Recent Items will appear after opening projects, posts, timeline entries, or major commands.";
      wrap.append(empty);
      return;
    }

    state.recentItems.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "compact-row recent-row";
      button.dataset.recentType = item.type;
      button.dataset.recentTarget = item.target;

      const label = document.createElement("span");
      label.textContent = item.title;
      const meta = document.createElement("small");
      meta.textContent = item.meta;
      button.append(label, meta);
      wrap.append(button);
    });
  });
};

const isWelcomeDismissed = () => {
  if (welcomeDismissedThisSession) return true;
  try {
    return localStorage.getItem(welcomeStorageKey) === "true";
  } catch {
    return false;
  }
};

const syncWelcomeToast = () => {
  const dismissed = isWelcomeDismissed();
  document.querySelectorAll("[data-welcome-toast]").forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    node.hidden = dismissed;
    node.dataset.welcomeState = dismissed ? "dismissed" : "ready";
  });
};

const dismissWelcomeToast = () => {
  welcomeDismissedThisSession = true;
  try {
    localStorage.setItem(welcomeStorageKey, "true");
  } catch {
    // The close action still applies for this session when persistent storage is unavailable.
  }
  syncWelcomeToast();
  dispatch("labos:welcome-dismiss");
};

const syncDocument = () => {
  const html = document.documentElement;
  const body = document.body;

  html.dataset.theme = getAppliedTheme(state.theme);
  html.dataset.themeSetting = state.theme;
  html.dataset.experience = state.experienceMode;
  html.dataset.motionSpeed = state.motionSpeed;
  html.dataset.palette = state.palette;
  html.dataset.background = state.background;
  html.dataset.currentApp = state.currentApp;
  html.dataset.layoutState = state.layoutState;
  html.lang = state.language === "zh" ? "zh-CN" : "en";

  body.dataset.theme = getAppliedTheme(state.theme);
  body.dataset.themeSetting = state.theme;
  body.dataset.experience = state.experienceMode;
  body.dataset.motionSpeed = state.motionSpeed;
  body.dataset.palette = state.palette;
  body.dataset.background = state.background;
  body.dataset.currentApp = state.currentApp;
  body.dataset.layoutState = state.layoutState;
  body.dataset.currentProject = state.currentProject;
  body.dataset.currentPost = state.currentPost;
  body.dataset.currentTimelineItem = state.currentTimelineItem;

  syncI18n();
  syncSettingsControls();
  syncActiveApp();
  renderRecentItems();
  syncWelcomeToast();
  syncDetailMode();
};

const syncDetailMode = () => {
  let savedMode = "default";
  try {
    savedMode = localStorage.getItem("w0nderful-lab-os.detail-mode") || "default";
  } catch {}

  document.querySelectorAll(".master-detail").forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    node.dataset.detailMode = savedMode;
  });

  document.querySelectorAll("[data-detail-focus-toggle]").forEach((node) => {
    if (!(node instanceof HTMLButtonElement)) return;
    const isFocus = savedMode === "focus";
    node.setAttribute("aria-pressed", String(isFocus));
    node.textContent = isFocus ? "Restore" : "Focus";
  });
};

const commit = (partial: Partial<LabOSState>, eventName?: string, eventDetail: Record<string, unknown> = {}) => {
  const previousApp = state.currentApp;
  state = {
    ...state,
    ...partial
  };

  writePersistedSettings();
  syncDocument();

  if (eventName) {
    dispatch(eventName, eventDetail);
  }

  if (previousApp !== state.currentApp && eventName !== "labos:app-change") {
    dispatch("labos:app-change", { app: state.currentApp });
  }

  dispatch("labos:state-change");
  return getStateSnapshot();
};

const routeForApp = (app: LabOSApp) => appRoutes[app] || appRoutes.home;

const navigateTo = (href: string) => {
  const url = new URL(href, window.location.origin);
  const current = new URL(window.location.href);

  if (url.pathname === current.pathname) {
    if (url.search !== current.search || url.hash !== current.hash) {
      window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
    }
    return;
  }

  void navigate(url.toString());
};

const routeWithParam = (route: string, key: string, value: string) => {
  const url = new URL(route, window.location.origin);
  url.searchParams.set(key, value);
  return url.toString();
};

const findProject = (slug: string) => projects.find((project) => project.slug.toLowerCase() === slug.toLowerCase());
const findPost = (slug: string) => posts.find((post) => post.slug.toLowerCase() === slug.toLowerCase());
const findTimeline = (id: string) => timeline.find((entry) => entry.id.toLowerCase() === id.toLowerCase());

const setState = (partial: Partial<LabOSState>) => commit(partial);

const openApp = (app: LabOSApp, options: OpenOptions = {}) => {
  commit(
    {
      currentApp: app,
      layoutState: "idle"
    },
    "labos:app-change",
    { app }
  );

  if (options.navigate !== false) {
    navigateTo(routeForApp(app));
  }
};

const openProject = (slug: string, options: OpenOptions = {}) => {
  const project = findProject(slug);
  const target = project?.slug || slug;
  commit(
    {
      currentApp: "projects",
      currentProject: target,
      layoutState: "focused"
    },
    "labos:project-open",
    { projectSlug: target, project }
  );
  addRecentItem({
    type: "project",
    target,
    title: project?.name || target,
    meta: project?.type || "Project"
  });

  if (options.navigate !== false) {
    navigateTo(routeWithParam(appRoutes.projects, "project", target));
  }
};

const openPost = (slug: string, options: OpenOptions = {}) => {
  const post = findPost(slug);
  const target = post?.slug || slug;
  commit(
    {
      currentApp: "blog",
      currentPost: target,
      layoutState: "focused"
    },
    "labos:post-open",
    { postSlug: target, post }
  );
  addRecentItem({
    type: "post",
    target,
    title: post?.title || target,
    meta: post?.category || "Post"
  });

  if (options.navigate !== false) {
    navigateTo(routeWithParam(appRoutes.blog, "post", target));
  }
};

const openTimeline = (id: string, options: OpenOptions = {}) => {
  const entry = findTimeline(id);
  const target = entry?.id || id;
  commit(
    {
      currentApp: "timeline",
      currentTimelineItem: target,
      layoutState: "focused"
    },
    "labos:timeline-open",
    { timelineId: target, entry }
  );
  addRecentItem({
    type: "timeline",
    target,
    title: entry?.title || target,
    meta: entry ? `${entry.type} / ${entry.date}` : "Timeline"
  });

  if (options.navigate !== false) {
    navigateTo(routeWithParam(appRoutes.timeline, "entry", target));
  }
};

const setTheme = (theme: ThemeSetting) => {
  commit({ theme }, "labos:settings-change", { setting: "theme", value: theme });
  document.dispatchEvent(new CustomEvent("lab-os-settings-change", { detail: getStateSnapshot() }));
};

const setExperienceMode = (experienceMode: ExperienceMode) => {
  commit({ experienceMode }, "labos:settings-change", { setting: "experienceMode", value: experienceMode });
  document.dispatchEvent(new CustomEvent("lab-os-settings-change", { detail: getStateSnapshot() }));
};

const setMotionSpeed = (motionSpeed: MotionSpeed) => {
  commit({ motionSpeed }, "labos:settings-change", { setting: "motionSpeed", value: motionSpeed });
  document.dispatchEvent(new CustomEvent("lab-os-settings-change", { detail: getStateSnapshot() }));
};

const setLanguage = (language: Language) => {
  commit({ language }, "labos:settings-change", { setting: "language", value: language });
  document.dispatchEvent(new CustomEvent("lab-os-settings-change", { detail: getStateSnapshot() }));
};

const setPalette = (palette: ThemePalette) => {
  commit({ palette }, "labos:settings-change", { setting: "palette", value: palette });
  document.dispatchEvent(new CustomEvent("lab-os-settings-change", { detail: getStateSnapshot() }));
};

const setBackground = (background: BackgroundPreset) => {
  commit({ background }, "labos:settings-change", { setting: "background", value: background });
  document.dispatchEvent(new CustomEvent("lab-os-settings-change", { detail: getStateSnapshot() }));
};

function addRecentItem(item: Omit<RecentItem, "id" | "timestamp">) {
  const id = `${item.type}:${item.target}`;
  const nextItem: RecentItem = {
    ...item,
    id,
    timestamp: Date.now()
  };
  const next = [nextItem, ...state.recentItems.filter((recent) => recent.id !== id)].slice(0, listLimit);
  commit({ recentItems: next }, "labos:recent-change", { item: nextItem });
}

const clearRecentItems = () => {
  commit({ recentItems: [] }, "labos:recent-change", { cleared: true });
};

const addCommandHistory = (label: string) => {
  const normalized = label.trim();
  if (!normalized) return;
  const next = [normalized, ...state.commandHistory.filter((entry) => entry.toLowerCase() !== normalized.toLowerCase())].slice(
    0,
    listLimit
  );
  commit({ commandHistory: next }, "labos:command-history-change", { command: normalized });
};

const copyText = async (value: string) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "true");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.append(input);
  input.select();
  document.execCommand("copy");
  input.remove();
};

const announce = (message: string) => {
  document.querySelectorAll("[data-labos-status]").forEach((node) => {
    node.textContent = message;
  });
  dispatch("labos:announce", { message });
};

const copySiteUrl = async () => {
  const url = window.location.origin ? new URL(appRoutes.home, window.location.origin).toString() : site.liveUrl;
  await copyText(url);
  announce("Site URL copied.");
};

const resetLocalSettings = () => {
  try {
    localStorage.removeItem(storageKey);
  } catch {
    // Ignore storage failures; state below restores the session.
  }

  state = {
    ...state,
    ...defaultSettings,
    recentItems: [],
    commandHistory: []
  };
  writePersistedSettings();
  syncDocument();
  dispatch("labos:settings-change", { reset: true });
  dispatch("labos:recent-change", { cleared: true });
  dispatch("labos:state-change");
  document.dispatchEvent(new CustomEvent("lab-os-settings-change", { detail: getStateSnapshot() }));
};

const executeCommand = async (commandOrId: Command | string, historyLabel?: string) => {
  const command = typeof commandOrId === "string" ? commands.find((item) => item.id === commandOrId) : commandOrId;
  if (!command) {
    announce("Command not found.");
    return;
  }

  addCommandHistory(historyLabel || command.title);
  dispatch("labos:command-execute", { command });

  switch (command.action) {
    case "open-app":
      openApp(normalizeApp(command.target));
      break;
    case "open-project":
      if (command.target) openProject(command.target);
      break;
    case "open-post":
      if (command.target) openPost(command.target);
      break;
    case "open-timeline":
      if (command.target) openTimeline(command.target);
      break;
    case "set-theme":
      if (isTheme(command.target)) setTheme(command.target);
      break;
    case "set-experience":
      if (isExperience(command.target)) setExperienceMode(command.target);
      break;
    case "set-motion-speed":
      if (isMotionSpeed(command.target)) setMotionSpeed(command.target);
      break;
    case "set-language":
      if (isLanguage(command.target)) setLanguage(command.target);
      break;
    case "open-external":
      if (command.href) window.open(command.href, "_blank", "noopener,noreferrer");
      break;
    case "copy-site-url":
      await copySiteUrl();
      break;
    case "toggle-theme": {
      const currentTheme = getAppliedTheme(state.theme);
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
      announce(`Theme toggled to ${nextTheme}.`);
      break;
    }
    case "clear-recent":
      clearRecentItems();
      announce("Recent Items cleared.");
      break;
    case "reset-settings":
      resetLocalSettings();
      announce("Local settings reset.");
      break;
    case "search":
      if (command.target) openApp(normalizeApp(command.target));
      break;
  }
};

const openRecentItem = (type: RecentItemType, target: string) => {
  if (type === "project") openProject(target);
  if (type === "post") openPost(target);
  if (type === "timeline") openTimeline(target);
  if (type === "app") openApp(normalizeApp(target));
  if (type === "command") void executeCommand(target);
};

const registerSettingEvents = () => {
  if (document.documentElement.dataset.systemStateEvents === "ready") return;
  document.documentElement.dataset.systemStateEvents = "ready";

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (target instanceof HTMLSelectElement && target.matches("[data-setting-theme]") && isTheme(target.value)) {
      setTheme(target.value);
    }
    if (target instanceof HTMLSelectElement && target.matches("[data-setting-language]") && isLanguage(target.value)) {
      setLanguage(target.value);
    }
    if (target instanceof HTMLSelectElement && target.matches("[data-setting-motion-speed]") && isMotionSpeed(target.value)) {
      setMotionSpeed(target.value);
    }
    if (target instanceof HTMLSelectElement && target.matches("[data-setting-palette]") && isPalette(target.value)) {
      setPalette(target.value);
    }
    if (target instanceof HTMLSelectElement && target.matches("[data-setting-background]") && isBackground(target.value)) {
      setBackground(target.value);
    }
    if (target instanceof HTMLSelectElement && target.matches("[data-setting-reader-style]")) {
      const value = target.value;
      try {
        localStorage.setItem("lab-reader-style", value);
      } catch {}
      document.dispatchEvent(new CustomEvent("labos:reader-style-change", { detail: { style: value } }));
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const modeButton = target.closest("[data-exp-choice]");
    if (modeButton instanceof HTMLButtonElement && isExperience(modeButton.dataset.expChoice)) {
      setExperienceMode(modeButton.dataset.expChoice);
      return;
    }

    const resetButton = target.closest("[data-reset-settings]");
    if (resetButton instanceof HTMLButtonElement) {
      resetLocalSettings();
      return;
    }

    const clearRecentButton = target.closest("[data-clear-recent-items]");
    if (clearRecentButton instanceof HTMLButtonElement) {
      clearRecentItems();
      return;
    }

    const welcomeCloseButton = target.closest("[data-welcome-close]");
    if (welcomeCloseButton instanceof HTMLButtonElement) {
      dismissWelcomeToast();
      return;
    }

    const projectLink = target.closest("[data-lab-open-project]");
    if (projectLink instanceof HTMLElement) {
      event.preventDefault();
      openProject(projectLink.dataset.labOpenProject || "");
      return;
    }

    const postLink = target.closest("[data-lab-open-post]");
    if (postLink instanceof HTMLElement) {
      event.preventDefault();
      openPost(postLink.dataset.labOpenPost || "");
      return;
    }

    const timelineLink = target.closest("[data-lab-open-timeline]");
    if (timelineLink instanceof HTMLElement) {
      event.preventDefault();
      openTimeline(timelineLink.dataset.labOpenTimeline || "");
      return;
    }

    const recentButton = target.closest("[data-recent-type][data-recent-target]");
    if (recentButton instanceof HTMLElement) {
      const type = recentButton.dataset.recentType as RecentItemType | undefined;
      const recentTarget = recentButton.dataset.recentTarget || "";
      if (type) openRecentItem(type, recentTarget);
      return;
    }

    const closeAppButton = target.closest("[data-window-close-app]");
    if (closeAppButton instanceof HTMLButtonElement) {
      const windowNode = closeAppButton.closest("[data-app-window]");
      windowNode?.classList.remove("is-maximized");
      if (state.currentApp !== "home") openApp("home");
      return;
    }

    const closeDetailButton = target.closest("[data-window-close-detail]");
    if (closeDetailButton instanceof HTMLButtonElement) {
      const windowNode = closeDetailButton.closest("[data-app-window]") || document;
      const detailClose = windowNode.querySelector("[data-project-close], [data-reader-back], [data-log-close]");
      if (detailClose instanceof HTMLButtonElement) detailClose.click();
      commit({ layoutState: "idle" }, "labos:layout-change", { layoutState: "idle" });
      return;
    }

    const maximizeButton = target.closest("[data-window-maximize]");
    if (maximizeButton instanceof HTMLButtonElement) {
      const windowNode = maximizeButton.closest("[data-app-window]");
      if (windowNode instanceof HTMLElement) {
        const maximized = !windowNode.classList.contains("is-maximized");
        windowNode.classList.toggle("is-maximized", maximized);
        maximizeButton.setAttribute("aria-pressed", String(maximized));
        maximizeButton.setAttribute("aria-label", maximized ? "Restore window" : "Maximize window");
      }
    }

    const focusToggle = target.closest("[data-detail-focus-toggle]");
    if (focusToggle instanceof HTMLButtonElement) {
      const masterDetail = focusToggle.closest(".master-detail");
      if (masterDetail instanceof HTMLElement) {
        const current = masterDetail.dataset.detailMode || "default";
        const next = current === "focus" ? "default" : "focus";
        masterDetail.dataset.detailMode = next;
        focusToggle.setAttribute("aria-pressed", String(next === "focus"));
        focusToggle.textContent = next === "focus" ? "Restore" : "Focus";
        try {
          localStorage.setItem("w0nderful-lab-os.detail-mode", next);
        } catch {}
      }
      return;
    }
  });
};

const registerNavigationTransition = () => {
  if (document.documentElement.dataset.navigationGuards === "ready") return;
  document.documentElement.dataset.navigationGuards = "ready";

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest("[data-command-palette-open], [data-window-maximize], [data-window-close-detail], [data-window-close-app]")) return;
    const link = target.closest("a");
    if (!(link instanceof HTMLAnchorElement)) return;
    if (link.target || link.hasAttribute("download") || link.origin !== window.location.origin) return;
    if (link.pathname !== window.location.pathname || link.search !== window.location.search) return;

    event.preventDefault();
    const app = link.dataset.appLink;
    if (app) {
      commit({ currentApp: normalizeApp(app), layoutState: "idle" }, "labos:app-change", { app });
    }
  });
};

window.labOS = {
  getState: getStateSnapshot,
  setState,
  openApp,
  openProject,
  openPost,
  openTimeline,
  setTheme,
  setExperienceMode,
  setMotionSpeed,
  setLanguage,
  setPalette,
  setBackground,
  addRecentItem,
  clearRecentItems,
  addCommandHistory,
  executeCommand,
  resetLocalSettings,
  copySiteUrl
};

syncDocument();
registerSettingEvents();
registerNavigationTransition();

document.addEventListener("astro:before-preparation", () => {
  document.body.dataset.appLeaving = "true";
});

document.addEventListener("astro:page-load", () => {
  state = {
    ...state,
    currentApp: readCurrentApp()
  };
  document.body.dataset.appLeaving = "false";
  syncDocument();
  dispatch("labos:page-load", { app: state.currentApp });
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  syncDocument();
});
