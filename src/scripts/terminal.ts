import { site } from "../data/site";
import { projects } from "../data/projects";
import { searchLabIndex, type SearchResult } from "./search-index";
import type { ExperienceMode, Language, MotionSpeed, ThemeSetting } from "./system-state";

const root = document.querySelector("[data-terminal-root]");
const output = root?.querySelector("[data-terminal-output]");
const form = root?.querySelector("[data-terminal-form]");
const input = root?.querySelector("[data-terminal-input]");

const projectAliases = new Map<string, string>([
  ["lab", "w0nderful-lab-os"],
  ["w0nderful-lab-os", "w0nderful-lab-os"],
  ...projects.flatMap((project) => [
    [project.slug.toLowerCase(), project.slug],
    [project.name.toLowerCase(), project.slug]
  ] as const)
]);

const navigationCommands = new Set(["home", "projects", "blog", "timeline", "about", "settings", "terminal"]);
const themeCommands = new Set<ThemeSetting>(["light", "dark", "system"]);
const modeCommands = new Set<ExperienceMode>(["performance", "balanced", "quality"]);
const speedCommands = new Set<MotionSpeed>(["slow", "normal", "fast"]);
const languageCommands = new Set<Language>(["en", "zh"]);

if (root instanceof HTMLElement && output instanceof HTMLElement && form instanceof HTMLFormElement && input instanceof HTMLInputElement) {
  let historyIndex = -1;

  const timestamp = () =>
    new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(new Date());

  const printLine = (text: string, kind = "info") => {
    const line = document.createElement("div");
    line.className = "terminal-line";
    line.dataset.lineKind = kind;

    const time = document.createElement("span");
    time.className = "terminal-time";
    time.textContent = timestamp();
    const body = document.createElement("span");
    body.textContent = text;
    line.append(time, body);
    output.append(line);
    output.scrollTop = output.scrollHeight;
  };

  const printPrompt = (command: string) => {
    printLine(`w0nderful@lab-os % ${command}`, "prompt");
  };

  const printSearchResults = (query: string, results: SearchResult[]) => {
    if (results.length === 0) {
      printLine(`No local results for "${query}".`, "warn");
      return;
    }

    const wrap = document.createElement("div");
    wrap.className = "terminal-search-results";

    results.slice(0, 6).forEach((result) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "terminal-result";
      button.dataset.searchSource = result.source;
      button.dataset.searchTarget = result.target;
      if (result.commandId) button.dataset.commandId = result.commandId;

      const title = document.createElement("strong");
      title.textContent = result.title;
      const detail = document.createElement("span");
      detail.textContent = `${result.source} / ${result.description}`;
      button.append(title, detail);
      wrap.append(button);
    });

    output.append(wrap);
    output.scrollTop = output.scrollHeight;
  };

  const help = () => {
    [
      "help, clear, whoami, status, version",
      "home, projects, blog, timeline, about, settings, terminal",
      "open fxxkpdf, open image-limit-helper, open open-tools-starter, open lab",
      "theme light|dark|system, mode performance|balanced|quality",
      "speed slow|normal|fast, lang zh|en",
      "search pdf, search github, search prompt, search blog, search tool, search local",
      "github"
    ].forEach((line) => printLine(line));
  };

  const runNavigation = (command: string) => {
    window.labOS.openApp(command as Parameters<typeof window.labOS.openApp>[0]);
    printLine(`Opening ${command}.app`);
  };

  const runOpen = (target: string) => {
    const slug = projectAliases.get(target.toLowerCase());
    if (!slug) {
      printLine(`Unknown project "${target}". Try help.`, "warn");
      return;
    }

    const project = projects.find((item) => item.slug === slug);
    window.labOS.openProject(slug);
    printLine(`Opening Projects.app -> ${project?.name || slug}`);
  };

  const runSettings = (kind: string, value: string) => {
    if (kind === "theme" && themeCommands.has(value as ThemeSetting)) {
      window.labOS.setTheme(value as ThemeSetting);
      printLine(`Theme set to ${value}.`);
      return;
    }
    if (kind === "mode" && modeCommands.has(value as ExperienceMode)) {
      window.labOS.setExperienceMode(value as ExperienceMode);
      printLine(`Experience Mode set to ${value}.`);
      return;
    }
    if (kind === "speed" && speedCommands.has(value as MotionSpeed)) {
      window.labOS.setMotionSpeed(value as MotionSpeed);
      printLine(`Motion Speed set to ${value}.`);
      return;
    }
    if (kind === "lang" && languageCommands.has(value as Language)) {
      window.labOS.setLanguage(value as Language);
      printLine(`Language set to ${value}.`);
      return;
    }

    printLine(`Invalid ${kind} value. Try help.`, "warn");
  };

  const runCommand = (rawCommand: string) => {
    const command = rawCommand.trim();
    if (!command) return;

    window.labOS.addCommandHistory(command);
    printPrompt(command);

    const [base, ...rest] = command.toLowerCase().split(/\s+/);
    const value = rest.join(" ");

    if (base === "help") {
      help();
      return;
    }
    if (base === "clear") {
      output.textContent = "";
      return;
    }
    if (base === "whoami") {
      printLine(`${site.author} / A-Level local-first lab operator`);
      return;
    }
    if (base === "status") {
      const state = window.labOS.getState();
      printLine(`app=${state.currentApp} theme=${state.theme} mode=${state.experienceMode} speed=${state.motionSpeed}`);
      printLine(`recent=${state.recentItems.length} history=${state.commandHistory.length}`);
      return;
    }
    if (base === "version") {
      printLine(`${site.displayVersion} / Control Layer Release`);
      return;
    }
    if (base === "github") {
      window.open("https://github.com/w0nderful666", "_blank", "noopener,noreferrer");
      printLine("Opening GitHub profile.");
      return;
    }
    if (navigationCommands.has(base)) {
      runNavigation(base);
      return;
    }
    if (base === "open") {
      runOpen(value);
      return;
    }
    if (base === "theme" || base === "mode" || base === "speed" || base === "lang") {
      runSettings(base, value);
      return;
    }
    if (base === "search") {
      const query = value || "local";
      const results = searchLabIndex(query, 8);
      printLine(`Search "${query}" returned ${results.length} local match${results.length === 1 ? "" : "es"}.`);
      printSearchResults(query, results);
      return;
    }

    printLine(`Command "${command}" was not recognized. Type help for available commands.`, "warn");
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const command = input.value;
    input.value = "";
    historyIndex = -1;
    runCommand(command);
  });

  input.addEventListener("keydown", (event) => {
    const history = window.labOS.getState().commandHistory;
    if (event.key === "ArrowUp") {
      event.preventDefault();
      historyIndex = Math.min(history.length - 1, historyIndex + 1);
      input.value = history[historyIndex] || input.value;
      input.setSelectionRange(input.value.length, input.value.length);
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      historyIndex = Math.max(-1, historyIndex - 1);
      input.value = historyIndex >= 0 ? history[historyIndex] || "" : "";
      input.setSelectionRange(input.value.length, input.value.length);
    }
  });

  output.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const result = target.closest("[data-search-source][data-search-target]");
    if (!(result instanceof HTMLElement)) return;

    const source = result.dataset.searchSource;
    const targetValue = result.dataset.searchTarget || "";
    if (source === "Project") window.labOS.openProject(targetValue);
    if (source === "Post") window.labOS.openPost(targetValue);
    if (source === "Timeline") window.labOS.openTimeline(targetValue);
    if (source === "Command" && result.dataset.commandId) void window.labOS.executeCommand(result.dataset.commandId);
  });

  printLine("Terminal.app ready. Type help to inspect real commands.");
  printLine("Try: status, open lab, theme dark, search pdf, github.");
}
