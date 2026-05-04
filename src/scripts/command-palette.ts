import { commands, type Command } from "../data/commands";
import { executeSearchResult, searchLabIndex, type SearchResult } from "./search-index";
import type { RecentItem } from "./system-state";

type PaletteItem = {
  id: string;
  title: string;
  description: string;
  source: string;
  run: () => void | Promise<void>;
};

const root = document.querySelector("[data-command-palette]");
const input = root?.querySelector("[data-command-input]");
const results = root?.querySelector("[data-command-results]");
const status = root?.querySelector("[data-command-status]");

if (root instanceof HTMLElement && input instanceof HTMLInputElement && results instanceof HTMLElement) {
  const paletteRoot = root;
  const commandInput = input;
  const resultList = results;
  const statusNode = status;
  let items: PaletteItem[] = [];
  let selectedIndex = 0;

  const commandToItem = (command: Command): PaletteItem => ({
    id: command.id,
    title: command.title,
    description: command.description,
    source: command.kind,
    run: () => window.labOS.executeCommand(command)
  });

  const searchToItem = (result: SearchResult): PaletteItem => ({
    id: result.id,
    title: result.title,
    description: result.description,
    source: result.source,
    run: () => executeSearchResult(result)
  });

  const recentToItem = (item: RecentItem): PaletteItem => ({
    id: item.id,
    title: item.title,
    description: item.meta,
    source: `Recent ${item.type}`,
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
    run: () => {
      commandInput.value = entry;
      render();
    }
  });

  const setOpen = (open: boolean) => {
    paletteRoot.hidden = !open;
    document.body.dataset.commandPaletteOpen = String(open);
    if (open) {
      commandInput.value = "";
      selectedIndex = 0;
      render();
      window.setTimeout(() => commandInput.focus(), 0);
    }
  };

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  const buildItems = () => {
    const query = commandInput.value.trim();
    if (query) return searchLabIndex(query, 14).map(searchToItem);

    const state = window.labOS.getState();
    const recentItems = state.recentItems.slice(0, 5).map(recentToItem);
    const historyItems = state.commandHistory.slice(0, 4).map(historyToItem);
    const launchItems = commands
      .filter((command) => command.kind === "app" || command.kind === "settings" || command.kind === "utility")
      .slice(0, 9)
      .map(commandToItem);

    return [...recentItems, ...historyItems, ...launchItems].slice(0, 14);
  };

  const updateSelection = () => {
    resultList.querySelectorAll("[data-command-option]").forEach((node, index) => {
      const active = index === selectedIndex;
      node.classList.toggle("is-active", active);
      node.setAttribute("aria-selected", String(active));
    });
  };

  function render() {
    items = buildItems();
    selectedIndex = Math.min(selectedIndex, Math.max(0, items.length - 1));
    resultList.textContent = "";

    if (statusNode) {
      statusNode.textContent = commandInput.value.trim()
        ? `${items.length} result${items.length === 1 ? "" : "s"}`
        : "Recent Items and commands";
    }

    if (items.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "No matching commands or local content.";
      resultList.append(empty);
      return;
    }

    items.forEach((item, index) => {
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

      const source = document.createElement("em");
      source.textContent = item.source;
      button.append(content, source);

      button.addEventListener("mouseenter", () => {
        selectedIndex = index;
        updateSelection();
      });
      button.addEventListener("click", () => {
        void item.run();
        if (!item.id.startsWith("history:")) close();
      });

      resultList.append(button);
    });

    updateSelection();
  }

  const runSelected = () => {
    const selected = items[selectedIndex];
    if (!selected) return;
    void selected.run();
    if (!selected.id.startsWith("history:")) close();
  };

  commandInput.addEventListener("input", () => {
    selectedIndex = 0;
    render();
  });

  paletteRoot.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest("[data-command-palette-close]")) {
      close();
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest("[data-command-palette-open]")) {
      event.preventDefault();
      open();
    }
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      open();
      return;
    }

    if (paletteRoot.hidden) return;

    if (event.key === "Escape") {
      event.preventDefault();
      close();
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

  document.addEventListener("labos:recent-change", render);
  document.addEventListener("labos:command-history-change", render);
  document.addEventListener("labos:announce", (event) => {
    if (!(event instanceof CustomEvent) || !statusNode) return;
    const message = event.detail?.message;
    if (typeof message === "string") statusNode.textContent = message;
  });

  render();
}
