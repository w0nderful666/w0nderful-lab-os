import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const failures = [];
const warnings = [];

const ignoredDirs = new Set(["node_modules", "dist", ".git", ".astro"]);
const ignoredFiles = new Set(["package-lock.json", "scripts/preflight.mjs"]);
const textExtensions = new Set([
  ".astro",
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".ts",
  ".yml",
  ".yaml"
]);

async function exists(filePath) {
  try {
    await stat(path.join(root, filePath));
    return true;
  } catch {
    return false;
  }
}

async function collectTextFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const rel = path.relative(root, fullPath).replaceAll(path.sep, "/");

    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        files.push(...(await collectTextFiles(fullPath)));
      }
      continue;
    }

    if (!ignoredFiles.has(rel) && textExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function relative(filePath) {
  return path.relative(root, filePath).replaceAll(path.sep, "/");
}

function pass(message) {
  console.log(`PASS ${message}`);
}

function warn(message) {
  warnings.push(message);
  console.warn(`WARN ${message}`);
}

function fail(message) {
  failures.push(message);
  console.error(`FAIL ${message}`);
}

async function readRootFile(filePath) {
  return readFile(path.join(root, filePath), "utf8");
}

async function checkPackageVersion() {
  const packageJson = JSON.parse(await readRootFile("package.json"));
  if (packageJson.version === "0.7.1") {
    pass("package.json version is 0.7.1");
  } else {
    fail(`package.json version is ${packageJson.version}, expected 0.7.1`);
  }
}

async function checkReadme() {
  const readme = await readRootFile("README.md");
  const required = [
    "https://w0nderful666.github.io/w0nderful-lab-os/",
    "GitHub Pages",
    "Local First",
    "No Backend",
    "Control Layer",
    "Command Palette",
    "Terminal.app",
    "System State",
    "Ctrl/Cmd + K",
    "Recent Items",
    "Global Search",
    "Project / Blog / Timeline Linking",
    "SPA-like Navigation",
    "Astro View Transitions",
    "Persistent OS Shell",
    "Sticky Detail Panel",
    "Theme Palette",
    "Background Presets",
    "Toolbar / Filter UX",
    "Motion Speed",
    "Master-Detail",
    "OS-like Experience Enhancements",
    "Settings Preview Card",
    "Welcome / Quick Start",
    "Empty State",
    "404 System Notice",
    "Dock active state",
    "Desktop Workspace",
    "System Health",
    "Keyboard Shortcuts",
    "Chinese Aliases",
    "Toggle Theme",
    "Blog Publishing",
    "Article Template",
    "articleStyle",
    "Article Composer"
  ];

  for (const value of required) {
    if (readme.includes(value)) {
      pass(`README contains ${value}`);
    } else {
      fail(`README contains ${value}`);
    }
  }
}

async function checkReleaseNotes() {
  const releaseNotes = await readRootFile("RELEASE_NOTES.md");
  if (releaseNotes.includes("v0.4.2")) {
    pass("RELEASE_NOTES contains v0.4.2");
  } else {
    fail("RELEASE_NOTES contains v0.4.2");
  }

  const required = [
    "page-level smooth transitions",
    "ClientRouter",
    "Persistent OS shell",
    "lifecycle-safe",
    "Theme Palette",
    "Background Presets",
    "Dock active state",
    "Settings Preview Card",
    "Welcome / Quick Start",
    "Empty State",
    "404 System Notice",
    "grouped Pages / Actions / Settings"
  ];

  for (const value of required) {
    if (releaseNotes.includes(value)) {
      pass(`RELEASE_NOTES contains ${value}`);
    } else {
      fail(`RELEASE_NOTES contains ${value}`);
    }
  }
}

async function checkControlLayer() {
  const required = [
    "src/components/os/CommandPalette.astro",
    "src/components/apps/TerminalApp.astro",
    "src/pages/terminal/index.astro",
    "src/data/commands.ts",
    "src/scripts/system-state.ts",
    "src/scripts/search-index.ts",
    "src/scripts/command-palette.ts",
    "src/scripts/terminal.ts",
    "src/scripts/shortcuts.ts",
    "docs/COMMAND_SYSTEM.md",
    "docs/MOTION_GUIDE.md",
    "docs/INTERACTION_RULES.md",
    "docs/APP_LAYOUT_STANDARD.md",
    "docs/SYSTEM_STATE.md",
    "docs/THEME_SYSTEM.md",
    "docs/TERMINAL_COMMANDS.md"
  ];

  for (const file of required) {
    if (await exists(file)) {
      pass(`${file} exists`);
    } else {
      fail(`${file} exists`);
    }
  }

  const layout = await readRootFile("src/layouts/BaseLayout.astro");
  if (layout.includes("CommandPalette") && layout.includes("system-state") && layout.includes("command-palette")) {
    pass("BaseLayout wires Command Palette and System State");
  } else {
    fail("BaseLayout wires Command Palette and System State");
  }

  const navigation = await readRootFile("src/data/navigation.ts");
  const dock = await readRootFile("src/components/os/Dock.astro");
  if (navigation.includes("terminal") && dock.includes("data-app-link")) {
    pass("Dock contains Terminal entry through navigation data");
  } else {
    fail("Dock contains Terminal entry through navigation data");
  }

  const settings = await readRootFile("src/components/apps/SettingsApp.astro");
  if (settings.includes("Keyboard Shortcuts") && settings.includes("data-clear-recent-items")) {
    pass("Settings contains Keyboard Shortcuts and Recent Items management");
  } else {
    fail("Settings contains Keyboard Shortcuts and Recent Items management");
  }

  const commands = await readRootFile("src/data/commands.ts");
  const commandRequirements = [
    "Open Terminal",
    "Clear Recent Items",
    "Reset Local Settings",
    "Search projects",
    "set-motion-speed"
  ];

  for (const value of commandRequirements) {
    if (commands.includes(value)) {
      pass(`commands.ts contains ${value}`);
    } else {
      fail(`commands.ts contains ${value}`);
    }
  }
}

async function checkInteractionPolish() {
  const layout = await readRootFile("src/layouts/BaseLayout.astro");
  if (layout.includes("ClientRouter") && layout.includes("astro:transitions")) {
    pass("BaseLayout uses Astro ClientRouter / View Transitions");
  } else {
    fail("BaseLayout uses Astro ClientRouter / View Transitions");
  }

  if (layout.includes("transition:name") && layout.includes("lab-main") && layout.includes("transition:persist")) {
    pass("BaseLayout contains transition names and persistent shell markers");
  } else {
    fail("BaseLayout contains transition names and persistent shell markers");
  }

  if (layout.includes("shortcuts")) {
    pass("BaseLayout wires keyboard shortcuts");
  } else {
    fail("BaseLayout wires keyboard shortcuts");
  }

  const systemState = await readRootFile("src/scripts/system-state.ts");
  if (systemState.includes("astro:page-load") && systemState.includes("astro:transitions/client") && systemState.includes("dataset.palette")) {
    pass("system-state is lifecycle-safe and palette-aware");
  } else {
    fail("system-state is lifecycle-safe and palette-aware");
  }

  if (systemState.includes("dataset.background") && systemState.includes("setBackground")) {
    pass("system-state contains background preset logic");
  } else {
    fail("system-state contains background preset logic");
  }

  if (systemState.includes("toggle-theme")) {
    pass("system-state handles toggle-theme action");
  } else {
    fail("system-state handles toggle-theme action");
  }

  const tokens = await readRootFile("src/styles/tokens.css");
  if (tokens.includes('html[data-palette="graphite"]') && tokens.includes('html[data-background="space"]')) {
    pass("tokens.css contains palette and background presets");
  } else {
    fail("tokens.css contains palette and background presets");
  }

  const osTheme = await readRootFile("src/styles/os-theme.css");
  if (osTheme.includes("flex-basis: 27%") && osTheme.includes("flex-basis: 73%")) {
    pass("focused Master-Detail ratio is optimized");
  } else {
    fail("focused Master-Detail ratio is optimized");
  }

  if (osTheme.includes("position: sticky") && osTheme.includes("--detail-panel-max-height")) {
    pass("Sticky Detail Panel CSS exists");
  } else {
    fail("Sticky Detail Panel CSS exists");
  }

  if (osTheme.includes("shortcut-grid") && osTheme.includes("desktop-shortcut")) {
    pass("Desktop shortcuts CSS exists");
  } else {
    fail("Desktop shortcuts CSS exists");
  }

  if (osTheme.includes("system-health") && osTheme.includes("health-item")) {
    pass("System health CSS exists");
  } else {
    fail("System health CSS exists");
  }

  if (osTheme.includes("detail-focus-toggle") && osTheme.includes("data-detail-mode")) {
    pass("Detail focus mode CSS exists");
  } else {
    fail("Detail focus mode CSS exists");
  }

  const motionCss = await readRootFile("src/styles/motion.css");
  if (motionCss.includes("detail-content-out") && motionCss.includes("detail-content-in") && motionCss.includes("detail-os-out")) {
    pass("Detail transition keyframes exist in motion.css");
  } else {
    fail("Detail transition keyframes exist in motion.css");
  }

  if (motionCss.includes("data-detail-swapping") && motionCss.includes("data-detail-transition")) {
    pass("Detail transition CSS selectors exist");
  } else {
    fail("Detail transition CSS selectors exist");
  }

  if (await exists("src/pages/composer/index.astro")) {
    pass("Composer page exists");
  } else {
    fail("Composer page exists");
  }

  const composerPage = await readRootFile("src/pages/composer/index.astro");
  if (composerPage.includes("data-composer-title") && composerPage.includes("data-composer-slug") && composerPage.includes("data-composer-summary")) {
    pass("Composer includes frontmatter fields");
  } else {
    fail("Composer includes frontmatter fields");
  }

  if (composerPage.includes("data-composer-body")) {
    pass("Composer includes Markdown textarea");
  } else {
    fail("Composer includes Markdown textarea");
  }

  if (composerPage.includes("data-composer-preview")) {
    pass("Composer includes preview area");
  } else {
    fail("Composer includes preview area");
  }

  if (composerPage.includes("data-composer-copy") && composerPage.includes("data-composer-download")) {
    pass("Composer includes Copy and Download buttons");
  } else {
    fail("Composer includes Copy and Download buttons");
  }

  if (composerPage.includes("lab-composer-draft")) {
    pass("Composer uses localStorage draft key");
  } else {
    fail("Composer uses localStorage draft key");
  }

  if (composerPage.includes("data-composer-import")) {
    pass("Composer includes Import .md");
  } else {
    fail("Composer includes Import .md");
  }

  const forbiddenInComposer = ["github-token", "ghp_", "auto-commit", "auto-push"];
  const composerHasForbidden = forbiddenInComposer.some((f) => composerPage.toLowerCase().includes(f));
  if (!composerHasForbidden) {
    pass("Composer contains no GitHub Token / auto push logic");
  } else {
    fail("Composer contains no GitHub Token / auto push logic");
  }

  if (composerPage.includes("draft-notice")) {
    pass("Composer includes Draft Notice UI");
  } else {
    fail("Composer includes Draft Notice UI");
  }

  if (composerPage.includes("save-status")) {
    pass("Composer includes Save Status indicator");
  } else {
    fail("Composer includes Save Status indicator");
  }

  if (composerPage.includes("validation-errors")) {
    pass("Composer includes Validation Errors display");
  } else {
    fail("Composer includes Validation Errors display");
  }

  if (composerPage.includes("draft-continue") || composerPage.includes("Continue Draft")) {
    pass("Composer includes Continue Draft functionality");
  } else {
    fail("Composer includes Continue Draft functionality");
  }

  if (composerPage.includes("manual upload to src/content/blog") || composerPage.includes("manual commit to GitHub")) {
    pass("Composer includes manual publish instructions");
  } else {
    fail("Composer includes manual publish instructions");
  }

  if (composerPage.includes("Slug must use lowercase") || composerPage.includes("hyphens")) {
    pass("Composer includes slug format validation");
  } else {
    fail("Composer includes slug format validation");
  }

  const readme = await readRootFile("README.md");
  if (readme.includes("lab-composer-draft") && readme.includes("localStorage")) {
    pass("README documents Composer draft localStorage");
  } else {
    fail("README documents Composer draft localStorage");
  }

  if (readme.includes("manual") && readme.includes("GitHub")) {
    pass("README documents manual GitHub publish");
  } else {
    fail("README documents manual GitHub publish");
  }

  const home = await readRootFile("src/components/apps/HomeApp.astro");
  if (home.includes("desktop-shortcut") && home.includes("shortcut-grid")) {
    pass("HomeApp contains desktop shortcuts");
  } else {
    fail("HomeApp contains desktop shortcuts");
  }

  const about = await readRootFile("src/components/apps/AboutApp.astro");
  if (about.includes("system-health") && about.includes("health-item")) {
    pass("AboutApp contains system health checks");
  } else {
    fail("AboutApp contains system health checks");
  }

  const settings = await readRootFile("src/components/apps/SettingsApp.astro");
  if (settings.includes("Theme Palette") && settings.includes("Background Preset")) {
    pass("Settings contains Palette and Background Preset");
  } else {
    fail("Settings contains Palette and Background Preset");
  }

  if (settings.includes("G</kbd> then") && settings.includes("Go Home")) {
    pass("Settings contains keyboard shortcut guide with G+X shortcuts");
  } else {
    fail("Settings contains keyboard shortcut guide with G+X shortcuts");
  }

  const projectsApp = await readRootFile("src/components/apps/ProjectsApp.astro");
  const blogApp = await readRootFile("src/components/apps/BlogApp.astro");
  const blogPage = await readRootFile("src/pages/blog/index.astro");
  const timelineApp = await readRootFile("src/components/apps/TimelineApp.astro");
  if (projectsApp.includes("data-detail-focus-toggle") && blogApp.includes("data-detail-focus-toggle") && timelineApp.includes("data-detail-focus-toggle")) {
    pass("Projects / Blog / Timeline include detail focus toggle");
  } else {
    fail("Projects / Blog / Timeline include detail focus toggle");
  }

  if (projectsApp.includes("detail-swap-body") && timelineApp.includes("detail-swap-body")) {
    pass("Projects / Timeline include detail swap body wrapper");
  } else {
    fail("Projects / Timeline include detail swap body wrapper");
  }

  if ((projectsApp.includes("data-detail-swapping") || projectsApp.includes("detailSwapping")) && (blogPage.includes("data-detail-swapping") || blogPage.includes("detailSwapping")) && (timelineApp.includes("data-detail-swapping") || timelineApp.includes("detailSwapping"))) {
    pass("Projects / Blog / Timeline include detail transition hooks");
  } else {
    fail("Projects / Blog / Timeline include detail transition hooks");
  }

  if (projectsApp.includes("scrollIntoView") && blogApp.includes("scrollIntoView") && timelineApp.includes("scrollIntoView")) {
    pass("Projects / Blog / Timeline include scroll alignment");
  } else {
    fail("Projects / Blog / Timeline include scroll alignment");
  }

  const systemStateFile = await readRootFile("src/scripts/system-state.ts");
  if (systemStateFile.includes("syncDetailMode") && systemStateFile.includes("w0nderful-lab-os.detail-mode")) {
    pass("system-state handles detail mode persistence");
  } else {
    fail("system-state handles detail mode persistence");
  }

  if (systemStateFile.includes("setOsEffects") && systemStateFile.includes("setMotionIntensity") && systemStateFile.includes("setDetailTransition")) {
    pass("system-state handles OS motion settings");
  } else {
    fail("system-state handles OS motion settings");
  }

  if (systemStateFile.includes("syncMotionSettings")) {
    pass("system-state syncs motion settings");
  } else {
    fail("system-state syncs motion settings");
  }

  const commands = await readRootFile("src/data/commands.ts");
  if (commands.includes("toggle-theme") && commands.includes("Toggle Theme Mode")) {
    pass("commands.ts contains toggle-theme quick action");
  } else {
    fail("commands.ts contains toggle-theme quick action");
  }

  if (commands.includes("xiangmu") && commands.includes("wenzhang") && commands.includes("shezhi")) {
    pass("commands.ts contains Chinese aliases");
  } else {
    fail("commands.ts contains Chinese aliases");
  }

  if (projectsApp.includes("data-project-clear-filters") && blogApp.includes("data-post-clear-filters") && timelineApp.includes("data-log-clear-filters")) {
    pass("Projects / Blog / Timeline include toolbar clear filters");
  } else {
    fail("Projects / Blog / Timeline include toolbar clear filters");
  }
}

async function checkBlogContentSystem() {
  const blogFiles = [
    "src/content/blog/web-os-project-review.md",
    "src/content/blog/local-first-no-backend.md",
    "src/content/blog/github-pages-deployment-log.md",
    "src/content/blog/lightweight-web-os.md"
  ];

  for (const file of blogFiles) {
    if (await exists(file)) {
      pass(`${file} exists`);
    } else {
      fail(`${file} exists`);
    }
  }

  if (await exists("src/content.config.ts")) {
    pass("content config exists");
  } else {
    fail("content config exists");
  }

  if (await exists("src/components/blog/ArticleShell.astro")) {
    pass("ArticleShell component exists");
  } else {
    fail("ArticleShell component exists");
  }

  if (await exists("src/components/blog/ArticleStyleSwitcher.astro")) {
    pass("ArticleStyleSwitcher component exists");
  } else {
    fail("ArticleStyleSwitcher component exists");
  }

  if (await exists("src/styles/article-styles.css")) {
    pass("article-styles.css exists");
  } else {
    fail("article-styles.css exists");
  }

  if (await exists("docs/ARTICLE_TEMPLATE.md")) {
    pass("ARTICLE_TEMPLATE.md exists");
  } else {
    fail("ARTICLE_TEMPLATE.md exists");
  }

  const articleFiles = [
    "src/content/blog/web-os-project-review.md",
    "src/content/blog/local-first-no-backend.md",
    "src/content/blog/github-pages-deployment-log.md",
    "src/content/blog/lightweight-web-os.md"
  ];
  let articleCount = 0;
  const validStyles = ["system", "paper", "terminal", "magazine", "notebook", "minimal"];
  const slugs = [];

  for (const file of articleFiles) {
    if (await exists(file)) {
      articleCount++;
      const content = await readRootFile(file);
      const hasTitle = content.includes("title:");
      const hasDate = content.includes("date:");
      const hasSummary = content.includes("summary:");
      const hasTags = content.includes("tags:");
      const hasStatus = content.includes("status:");
      const hasStyle = content.includes("articleStyle:");
      if (hasTitle && hasDate && hasSummary && hasTags && hasStatus && hasStyle) {
        pass(`${file} has required frontmatter`);
      } else {
        fail(`${file} has required frontmatter`);
      }
      const slugMatch = content.match(/slug:\s*["']?([^"'\n]+)/);
      if (slugMatch) slugs.push(slugMatch[1].trim());
      const styleMatch = content.match(/articleStyle:\s*["']?([^"'\n]+)/);
      if (styleMatch && !validStyles.includes(styleMatch[1].trim())) {
        fail(`${file} has valid articleStyle`);
      }
    }
  }

  if (articleCount >= 4) {
    pass(`At least 4 articles exist (${articleCount})`);
  } else {
    fail(`At least 4 articles exist (${articleCount})`);
  }

  const uniqueSlugs = new Set(slugs);
  if (uniqueSlugs.size === slugs.length) {
    pass("Article slugs are unique");
  } else {
    fail("Article slugs are unique");
  }

  const blogPage = await readRootFile("src/pages/blog/index.astro");
  if (blogPage.includes("getCollection") && blogPage.includes("data-article-style")) {
    pass("Blog page uses Content Collections with article styles");
  } else {
    fail("Blog page uses Content Collections with article styles");
  }

  if (blogPage.includes("data-copy-article-link")) {
    pass("Blog page includes Copy Link button");
  } else {
    fail("Blog page includes Copy Link button");
  }

  if (blogPage.includes("article-toc")) {
    pass("Blog page includes TOC support");
  } else {
    fail("Blog page includes TOC support");
  }

  const homePage = await readRootFile("src/components/apps/HomeApp.astro");
  if (homePage.includes("getCollection") && homePage.includes("Latest Posts")) {
    pass("HomeApp uses Content Collections for Latest Posts");
  } else {
    fail("HomeApp uses Content Collections for Latest Posts");
  }

  const settings = await readRootFile("src/components/apps/SettingsApp.astro");
  if (settings.includes("data-setting-reader-style")) {
    pass("Settings includes Reader Style setting");
  } else {
    fail("Settings includes Reader Style setting");
  }

  if (settings.includes("data-setting-os-effects") && settings.includes("data-setting-motion-intensity") && settings.includes("data-setting-detail-transition")) {
    pass("Settings includes OS Motion controls");
  } else {
    fail("Settings includes OS Motion controls");
  }

  const systemState = await readRootFile("src/scripts/system-state.ts");
  if (systemState.includes("lab-reader-style")) {
    pass("system-state handles reader style persistence");
  } else {
    fail("system-state handles reader style persistence");
  }

  const readme = await readRootFile("README.md");
  if (readme.includes("articleStyle") && readme.includes("Markdown")) {
    pass("README documents article style system");
  } else {
    fail("README documents article style system");
  }
}

async function checkAstroConfig() {
  const config = await readRootFile("astro.config.mjs");
  if (config.includes('site: "https://w0nderful666.github.io"')) {
    pass("astro.config.mjs contains correct site");
  } else {
    fail("astro.config.mjs contains correct site");
  }

  if (config.includes('base: "/w0nderful-lab-os"')) {
    pass("astro.config.mjs contains correct base");
  } else {
    fail("astro.config.mjs contains correct base");
  }
}

async function checkWorkflow() {
  if (await exists(".github/workflows/pages.yml")) {
    pass("pages.yml exists");
  } else {
    fail("pages.yml exists");
  }

  const workflow = await readRootFile(".github/workflows/pages.yml");
  const commands = [
    "npm ci",
    "npm run build",
    "npm run check",
    "npm run self-test",
    "npm run preflight",
    "actions/upload-pages-artifact",
    "actions/deploy-pages"
  ];

  for (const command of commands) {
    if (workflow.includes(command)) {
      pass(`pages.yml contains ${command}`);
    } else {
      fail(`pages.yml contains ${command}`);
    }
  }
}

async function checkDist() {
  if (await exists("dist")) {
    pass("dist exists after build");
  } else {
    fail("dist exists after build");
  }
}

async function checkForbiddenContent() {
  const forbidden = [
    { label: "href=\"#\"", pattern: /href=["']#["']/i },
    { label: "TODO: implement", pattern: /TODO:\s*implement/i },
    { label: "example.com", pattern: /example\.com/i },
    { label: "empty button", pattern: /<button\b[^>]*>\s*<\/button>/i },
    { label: "fake button", pattern: /fake\s+button|coming\s+soon|not\s+implemented/i }
  ];

  const files = await collectTextFiles(root);
  for (const file of files) {
    const rel = relative(file);
    const content = await readFile(file, "utf8");
    for (const item of forbidden) {
      if (item.pattern.test(content)) {
        fail(`forbidden content found: ${item.label} in ${rel}`);
      }
    }
  }

  pass("forbidden placeholder scan completed");
}

async function checkPrivacyBoundary() {
  const files = await collectTextFiles(path.join(root, "src"));
  const suspicious = [];
  const patterns = [
    /fetch\s*\(/i,
    /XMLHttpRequest/i,
    /new\s+WebSocket/i,
    /navigator\.sendBeacon/i
  ];

  for (const file of files) {
    const rel = relative(file);
    const content = await readFile(file, "utf8");
    if (patterns.some((pattern) => pattern.test(content))) {
      suspicious.push(rel);
    }
  }

  if (suspicious.length === 0) {
    pass("no client network calls found in src");
  } else {
    warn(`manual review recommended for network call(s): ${suspicious.join(", ")}`);
  }
}

console.log("w0nderful Lab OS preflight");
console.log("--------------------------------");

await checkPackageVersion();
await checkReadme();
await checkReleaseNotes();
await checkAstroConfig();
await checkWorkflow();
await checkControlLayer();
await checkInteractionPolish();
await checkBlogContentSystem();
await checkForbiddenContent();
await checkPrivacyBoundary();
await checkDist();

console.log("--------------------------------");

if (warnings.length > 0) {
  console.warn(`Preflight WARN: ${warnings.length} warning(s).`);
}

if (failures.length > 0) {
  console.error(`Preflight FAIL: ${failures.length} issue(s).`);
  process.exit(1);
}

console.log("Preflight passed.");
