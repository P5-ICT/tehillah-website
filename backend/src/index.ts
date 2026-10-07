import { createApp } from "./app.js";
import { adminEnabled, config } from "./config.js";
import { Store } from "./store.js";

const store = new Store(config.dataFile);
await store.load();

const app = createApp(store);
const server = app.listen(config.port, () => {
  console.log(`Tehillah API running on http://localhost:${config.port}`);
  console.log(`Data file: ${config.dataFile}`);
  if (!adminEnabled) {
    console.warn("Admin is OFF. Set ADMIN_TOKEN (16+ characters) in backend/.env to turn it on.");
  }
});

function shutdown() {
  server.close(() => process.exit(0));
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
