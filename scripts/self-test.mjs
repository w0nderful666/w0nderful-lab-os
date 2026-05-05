import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const failures = [];

const requiredFiles = [
  "package.json",
  "src/pages/index.astro",
  "src/pages/terminal/index.astro",
  "src/data/projects.ts",
  "src/data/timeline.ts",
  "src/data/commands.ts",
  "src/scripts/system-state.ts",
  "src/scripts/search-index.ts",
  "src/scripts/command-palette.ts",
  "src/scripts/terminal.ts",
  "src/scripts/shortcuts.ts",
  "src/components/common/EmptyState.astro",
  "src/components/os/CommandPalette.astro",
  "src/components/os/WelcomeToast.astro",
  "src/components/apps/TerminalApp.astro",
  "src/pages/404.astro",
  "src/pages/composer/index.astro",
  "docs/COMMAND_SYSTEM.md",
  "docs/MOTION_GUIDE.md",
  "docs/INTERACTION_RULES.md",
  "docs/APP_LAYOUT_STANDARD.md",
  "docs/SYSTEM_STATE.md",
  "docs/THEME_SYSTEM.md",
  "docs/TERMINAL_COMMANDS.md",
  "docs/ARTICLE_TEMPLATE.md",
  "src/styles/motion.css",
  "README.md",
  "RELEASE_NOTES.md",
  ".github/workflows/pages.yml"
];

const requiredPageStrings = [
  "w0nderful Lab OS",
  "v0.8.5",
  "Local First",
  "No Backend",
  "GitHub Pages Ready",
  "Control Layer",
  "Command Palette",
  "Terminal",
  "System State",
  "data-palette",
  "Recent Activity",
  "Recent Items",
  "Palette",
  "Ctrl",
  "Performance",
  "Balanced",
  "Quality",
  "Motion",
  "Normal",
  "Projects",
  "Blog",
  "Timeline",
  "Settings",
  "Quick Start",
  "Welcome to Lab OS",
  "Desktop",
  "desktop-shortcut",
  "shortcut-grid"
];

async function exists(filePath) {
  try {
    await stat(path.join(root, filePath));
    return true;
  } catch {
    return false;
  }
}

function pass(message) {
  console.log(`PASS ${message}`);
}

function fail(message) {
  failures.push(message);
  console.error(`FAIL ${message}`);
}

console.log("w0nderful Lab OS self-test");
console.log("--------------------------------");

for (const file of requiredFiles) {
  if (await exists(file)) {
    pass(`${file} exists`);
  } else {
    fail(`${file} exists`);
  }
}

const distIndex = path.join(root, "dist", "index.html");
let pageSource = "";

try {
  pageSource = await readFile(distIndex, "utf8");
  pass("dist/index.html exists");
} catch {
  fail("dist/index.html exists after npm run build");
}

for (const value of requiredPageStrings) {
  if (pageSource.includes(value)) {
    pass(`page source contains ${value}`);
  } else {
    fail(`page source contains ${value}`);
  }
}

console.log("--------------------------------");

if (failures.length > 0) {
  console.error(`Self-test FAIL: ${failures.length} issue(s).`);
  process.exit(1);
}

console.log("Self-test passed.");
