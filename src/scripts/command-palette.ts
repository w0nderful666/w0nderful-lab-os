import { commands, type Command } from "../data/commands";
import { executeSearchResult, searchLabIndex, type SearchResult } from "./search-index";
import type { RecentItem } from "./system-state";

type PaletteItem = {
  id: string;
  title: string;
  description: string;
  source: string;
  group: "Pages" | "Content" | "Actions" | "Settings" | "Recent" | "History";
  badge?: string;
  run: () => void | Promise<void>;
};

let boundGlobalEvents = false;
let items: PaletteItem[] = [];
let selectedIndex = 0;
let previousFocus: HTMLElement | null = null;
let cachedLaunchItems: PaletteItem[] | null = null;

const groupRank: Record<PaletteItem["group"], number> = {
  Recent: 0,
  History: 1,
  Pages: 2,
  Content: 3,
  Settings: 4,
  Actions: 5
};

const getNodes = () => {
  const root = document.querySelector("[data-command-palette]");
  const input = root?.querySelector("[data-command-input]");
  const results = root?.querySelector("[data-command-results]");
  const status = root?.querySelector("[data-command-status]");

  if (!(root instanceof HTMLElement) || !(input instanceof HTMLInputElement) || !(results instanceof HTMLElement)) {
    return null;
  }

  return {
    root,
    input,
    results,
    status: status instanceof HTMLElement ? status : null
  };
};

const commandGroup = (command: Command): PaletteItem["group"] => {
  if (command.kind === "app" || command.action === "open-app") return "Pages";
  if (command.kind === "settings" || command.action.startsWith("set-")) return "Settings";
  if (command.kind === "project" || command.kind === "post" || command.kind === "timeline") return "Content";
  return "Actions";
};

const commandBadge = (command: Command) => {
  const state = window.labOS?.getState();
  if (!state) return command.id === "open-terminal" ? "Recommended" : undefined;
  if (command.action === "open-app" && command.target === state.currentApp) return "Current";
  if (command.action === "set-theme" && command.target === state.theme) return "Current";
  if (command.action === "set-experience" && command.target === state.experienceMode) return "Current";
  if (command.action === "set-motion-speed" && command.target === state.motionSpeed) return "Current";
  if (command.action === "set-language" && command.target === state.language) return "Current";
  if (command.id === "open-terminal" || command.id === "open-settings") return "Recommended";
  return undefined;
};

const commandToItem = (command: Command): PaletteItem => ({
  id: command.id,
  title: command.title,
  description: command.description,
  source: command.kind,
  group: commandGroup(command),
  badge: commandBadge(command),
  run: () => window.labOS.executeCommand(command)
});

const searchToItem = (result: SearchResult): PaletteItem => ({
  id: result.id,
  title: result.title,
  description: result.description,
  source: result.source,
  group: result.source === "Command" ? "Actions" : "Content",
  badge: result.source === "Command" ? "Command" : result.source,
  run: () => executeSearchResult(result)
});

const recentToItem = (item: RecentItem): PaletteItem => ({
  id: item.id,
  title: item.title,
  description: item.meta,
  source: `Recent ${item.type}`,
  group: "Recent",
  badge: item.type,
  run: () => {
    if (item.type === "project") window.labOS.openProject(item.target);
    if (item.type === "post") window.labOS.openPost(item.target);
    if (item.type === "timeline") window.labOS.openTimeline(item.target);
    if (item.type === "app") window.labOS.openApp(item.target as Parameters<typeof window.labOS.openApp>[0]);
    if (item.type === "command") void window.labOS.executeCommand(item.target);
  }
});

const historyToItem = (entry: string): PaletteItem => ({
  id: `history:${entry}`,
  title: entry,
  description: "Recent command",
  source: "History",
  group: "History",
  run: () => {
    const nodes = getNodes();
    if (!nodes) return;
    nodes.input.value = entry;
    renderCommandPalette();
  }
});

const buildItems = () => {
  const nodes = getNodes();
  if (!nodes) return [];

  const query = nodes.input.value.trim();
  const orderItems = (nextItems: PaletteItem[]) =>
    nextItems
      .map((item, index) => ({ item, index }))
      .sort((a, b) => groupRank[a.item.group] - groupRank[b.item.group] || a.index - b.index)
      .map((entry) => entry.item);

  if (query) return orderItems(searchLabIndex(query, 14).map(searchToItem));

  const state = window.labOS.getState();
  const recentItems = state.recentItems.slice(0, 5).map(recentToItem);
  const historyItems = state.commandHistory.slice(0, 4).map(historyToItem);
  if (!cachedLaunchItems) {
    cachedLaunchItems = commands
      .filter((command) => command.kind === "app" || command.kind === "settings" || command.kind === "utility")
      .slice(0, 9)
      .map(commandToItem);
  }

  return orderItems([...recentItems, ...historyItems, ...cachedLaunchItems]).slice(0, 14);
};

const updateSelection = () => {
  const nodes = getNodes();
  if (!nodes) return;

  nodes.results.querySelectorAll("[data-command-option]").forEach((node, index) => {
    const active = index === selectedIndex;
    node.classList.toggle("is-active", active);
    node.setAttribute("aria-selected", String(active));
  });
};

export function renderCommandPalette() {
  const nodes = getNodes();
  if (!nodes) return;

  items = buildItems();
  selectedIndex = Math.min(selectedIndex, Math.max(0, items.length - 1));
  nodes.results.textContent = "";

  if (nodes.status) {
    nodes.status.textContent = nodes.input.value.trim()
      ? `${items.length} result${items.length === 1 ? "" : "s"}`
      : "Recent Items and commands";
  }

  if (items.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No matching commands or local content.";
    nodes.results.append(empty);
    return;
  }

  let currentGroup = "";

  items.forEach((item, index) => {
    if (item.group !== currentGroup) {
      currentGroup = item.group;
      const group = document.createElement("div");
      group.className = "command-group-label";
      group.setAttribute("role", "presentation");
      group.textContent = currentGroup;
      nodes.results.append(group);
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "command-option";
    button.dataset.commandOption = String(index);
    button.setAttribute("role", "option");
    button.setAttribute("aria-selected", String(index === selectedIndex));

    const content = document.createElement("span");
    const title = document.createElement("strong");
    title.textContent = item.title;
    const description = document.createElement("small");
    description.textContent = item.description;
    content.append(title, description);

    const meta = document.createElement("span");
    meta.className = "command-option-meta";

    if (item.badge) {
      const badge = document.createElement("strong");
      badge.className = "command-badge";
      badge.textContent = item.badge;
      meta.append(badge);
    }

    const source = document.createElement("em");
    source.textContent = item.source;
    meta.append(source);
    button.append(content, meta);

    button.addEventListener("mouseenter", () => {
      selectedIndex = index;
      updateSelection();
    });
    button.addEventListener("click", () => {
      void item.run();
      if (!item.id.startsWith("history:")) closeCommandPalette();
    });

    nodes.results.append(button);
  });

  updateSelection();
}

const setOpen = (open: boolean) => {
  const nodes = getNodes();
  if (!nodes) return;

  if (open) {
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  }

  nodes.root.hidden = !open;
  document.body.dataset.commandPaletteOpen = String(open);
  document.body.style.overflow = open ? "hidden" : "";
  if (open) {
    nodes.input.value = "";
    selectedIndex = 0;
    renderCommandPalette();
    window.setTimeout(() => nodes.input.focus(), 0);
  } else if (previousFocus) {
    window.setTimeout(() => previousFocus?.focus(), 0);
    previousFocus = null;
  }
};

const openCommandPalette = () => setOpen(true);
const closeCommandPalette = () => setOpen(false);

const runSelected = () => {
  const selected = items[selectedIndex];
  if (!selected) return;
  void selected.run();
  if (!selected.id.startsWith("history:")) closeCommandPalette();
};

export function initCommandPalette() {
  const nodes = getNodes();
  if (!nodes) return;

  if (nodes.root.dataset.paletteController !== "ready") {
    nodes.root.dataset.paletteController = "ready";
    nodes.input.addEventListener("input", () => {
      selectedIndex = 0;
      renderCommandPalette();
    });

    nodes.root.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-command-palette-close]")) {
        closeCommandPalette();
        return;
      }
      if (target === nodes.root) {
        closeCommandPalette();
      }
    });
  }

  if (!boundGlobalEvents) {
    boundGlobalEvents = true;

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const trigger = target.closest("[data-command-palette-open]");
      if (trigger instanceof HTMLElement && trigger !== document.body) {
        event.preventDefault();
        openCommandPalette();
      }
    });

    document.addEventListener("keydown", (event) => {
      const currentNodes = getNodes();
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openCommandPalette();
        return;
      }

      if (!currentNodes || currentNodes.root.hidden) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeCommandPalette();
      }

      if (event.key === "Tab") {
        const panel = currentNodes.root.querySelector(".command-palette-panel");
        if (!(panel instanceof HTMLElement)) return;
        const focusable = panel.querySelectorAll<HTMLElement>('button, input, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        selectedIndex = Math.min(items.length - 1, selectedIndex + 1);
        updateSelection();
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        selectedIndex = Math.max(0, selectedIndex - 1);
        updateSelection();
      }

      if (event.key === "Enter") {
        event.preventDefault();
        runSelected();
      }
    });

    document.addEventListener("labos:recent-change", renderCommandPalette);
    document.addEventListener("labos:command-history-change", renderCommandPalette);
    document.addEventListener("labos:page-load", renderCommandPalette);
    document.addEventListener("labos:announce", (event) => {
      const currentNodes = getNodes();
      if (!(event instanceof CustomEvent) || !currentNodes?.status) return;
      const message = event.detail?.message;
      if (typeof message === "string") currentNodes.status.textContent = message;
    });
  }

  renderCommandPalette();
}

initCommandPalette();
document.addEventListener("astro:page-load", initCommandPalette);
