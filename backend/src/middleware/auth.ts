import { createHash, timingSafeEqual } from "node:crypto";
import type { RequestHandler } from "express";
import { adminEnabled, config } from "../config.js";
import { HttpError } from "../errors.js";

const digest = (value: string): Buffer => createHash("sha256").update(value).digest();

/** Admin routes need the header  Authorization: Bearer <ADMIN_TOKEN>  */
export const requireAdmin: RequestHandler = (req, _res, next) => {
  if (!adminEnabled) {
    throw new HttpError(503, "Admin is switched off. Set ADMIN_TOKEN (16+ characters) in backend/.env.");
  }
  const header = req.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  // Compare hashes so the check takes the same time whatever is typed.
  if (!token || !timingSafeEqual(digest(token), digest(config.adminToken))) {
    throw new HttpError(401, "Wrong or missing admin password.");
  }
  next();
};
