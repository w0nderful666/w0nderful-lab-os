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
  if (packageJson.version === "0.2.0") {
    pass("package.json version is 0.2.0");
  } else {
    fail(`package.json version is ${packageJson.version}, expected 0.2.0`);
  }
}

async function checkReadme() {
  const readme = await readRootFile("README.md");
  const required = [
    "https://w0nderful666.github.io/w0nderful-lab-os/",
    "GitHub Pages",
    "Local First",
    "No Backend"
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
  if (releaseNotes.includes("v0.2.0")) {
    pass("RELEASE_NOTES contains v0.2.0");
  } else {
    fail("RELEASE_NOTES contains v0.2.0");
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
