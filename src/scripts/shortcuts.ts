import { type ActiveApp } from "../data/navigation";

let boundShortcuts = false;
let pendingKey: string | null = null;
let pendingTimeout: ReturnType<typeof setTimeout> | null = null;

const shortcutMap: Record<string, ActiveApp> = {
  h: "home",
  p: "projects",
  b: "blog",
  t: "timeline",
  s: "settings"
};

const isInputElement = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
};

const handleKeydown = (event: KeyboardEvent) => {
  if (isInputElement(event.target)) return;
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.key === "Escape") {
    if (pendingKey) {
      clearTimeout(pendingTimeout!);
      pendingKey = null;
      return;
    }
    const palette = document.querySelector("[data-command-palette]");
    if (palette instanceof HTMLElement && !palette.hidden) return;
    const welcome = document.querySelector("[data-welcome-toast]");
    if (welcome instanceof HTMLElement && !welcome.hidden) {
      const closeBtn = welcome.querySelector("[data-welcome-close]");
      if (closeBtn instanceof HTMLButtonElement) closeBtn.click();
      return;
    }
    return;
  }

  if (pendingKey) {
    const combo = pendingKey + event.key.toLowerCase();
    clearTimeout(pendingTimeout!);
    pendingKey = null;

    const targetApp = shortcutMap[combo.split("")[1]];
    if (targetApp && window.labOS) {
      event.preventDefault();
      window.labOS.openApp(targetApp);
    }
    return;
  }

  if (event.key.toLowerCase() === "g") {
    pendingKey = "g";
    pendingTimeout = setTimeout(() => {
      pendingKey = null;
    }, 800);
    return;
  }
};

export function initKeyboardShortcuts() {
  if (boundShortcuts) return;
  boundShortcuts = true;
  document.addEventListener("keydown", handleKeydown);
}

initKeyboardShortcuts();
document.addEventListener("astro:page-load", initKeyboardShortcuts);
