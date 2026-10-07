// Runs the built API and website together in one process group, for hosts
// that give us a single server (Render). The website listens on PORT and
// forwards /api/... to the API on API_PORT, which is only reachable locally.
// If either one stops, the other is stopped too so the host restarts both.
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const webPort = process.env.PORT ?? "3000";
const apiPort = process.env.API_PORT ?? "4000";

const nextBin = createRequire(path.join(root, "frontend", "package.json")).resolve("next/dist/bin/next");

const children = [];
let stopping = false;

function stopAll(code) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill("SIGTERM");
  setTimeout(() => process.exit(code), 5000).unref();
}

function run(name, args, cwd, env) {
  const child = spawn(process.execPath, args, { cwd, env: { ...process.env, ...env }, stdio: "inherit" });
  child.on("exit", (code, signal) => {
    console.log(`[start-all] ${name} stopped (${signal ?? `code ${code}`})`);
    stopAll(code ?? 1);
    if (children.every((c) => c.exitCode !== null || c.signalCode !== null)) process.exit(code ?? 1);
  });
  children.push(child);
}

run("api", ["dist/index.js"], path.join(root, "backend"), { PORT: apiPort });
run("web", [nextBin, "start", "-p", webPort], path.join(root, "frontend"), {});

process.on("SIGTERM", () => stopAll(0));
process.on("SIGINT", () => stopAll(0));
