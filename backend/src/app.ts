import cors from "cors";
import express from "express";
import helmet from "helmet";
import { config } from "./config.js";
import { errorHandler, notFound } from "./errors.js";
import { adminRoutes } from "./routes/admin.js";
import { publicRoutes } from "./routes/public.js";
import type { Store } from "./store.js";

export type AppOptions = { enquiryLimit?: number };

export function createApp(store: Store, options: AppOptions = {}) {
  const app = express();

  app.disable("x-powered-by");
  if (config.trustProxy) app.set("trust proxy", 1);

  app.use(helmet());
  app.use(cors({ origin: config.corsOrigins }));
  app.use(express.json({ limit: "50kb" }));

  app.use("/api", publicRoutes(store, { enquiryLimit: options.enquiryLimit ?? 10 }));
  app.use("/api/admin", adminRoutes(store));

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
