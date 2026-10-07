import path from "node:path";

// Load backend/.env if it exists. On a real host, set the variables there instead.
try {
  process.loadEnvFile();
} catch {
  // no .env file, use the real environment
}

const list = (value: string | undefined, fallback: string): string[] =>
  (value ?? fallback)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const config = {
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? "development",
  adminToken: process.env.ADMIN_TOKEN ?? "",
  corsOrigins: list(process.env.CORS_ORIGINS, "http://localhost:3000"),
  dataFile: path.resolve(process.env.DATA_FILE ?? "data/db.json"),
  trustProxy: process.env.TRUST_PROXY === "1",
};

export const adminEnabled = config.adminToken.length >= 16;
