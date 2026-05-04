import { spawn } from "node:child_process";
import path from "node:path";

const command = process.argv[2];
const args = process.argv.slice(3);

if (!command) {
  console.error("Usage: node scripts/run-astro.mjs <dev|build|preview|check> [...args]");
  process.exit(1);
}

const astroBin = path.join(process.cwd(), "node_modules", "astro", "astro.js");
const child = spawn(process.execPath, [astroBin, command, ...args], {
  stdio: "inherit",
  env: {
    ...process.env,
    ASTRO_TELEMETRY_DISABLED: "1",
    TELEMETRY_DISABLED: "1"
  }
});

child.on("exit", (code, signal) => {
  if (signal) {
    console.error(`Astro ${command} stopped with signal ${signal}`);
    process.exit(1);
  }

  process.exit(code ?? 0);
});
