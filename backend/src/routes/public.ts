import { Router } from "express";
import rateLimit from "express-rate-limit";
import { HttpError, parse } from "../errors.js";
import { enquirySchema } from "../schemas.js";
import type { Store } from "../store.js";

export type PublicOptions = { enquiryLimit: number };

export function publicRoutes(store: Store, options: PublicOptions): Router {
  const router = Router();

  // Stops one person or bot from flooding the inbox: 10 messages per hour per address.
  const enquiryLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: options.enquiryLimit,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { error: "You have sent a lot of messages. Please try again later or phone us." },
  });

  router.get("/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  router.get("/news", (req, res) => {
    const raw = Number.parseInt(String(req.query.limit ?? ""), 10);
    const limit = Number.isFinite(raw) ? Math.min(Math.max(raw, 1), 50) : undefined;
    res.json({ items: store.listPublishedNews(limit) });
  });

  router.get("/news/:slug", (req, res) => {
    const post = store.getPublishedBySlug(String(req.params.slug));
    if (!post) throw new HttpError(404, "That story was not found.");
    res.json({ item: post });
  });

  router.post("/enquiries", enquiryLimiter, async (req, res) => {
    const data = parse(enquirySchema, req.body);
    // Bots fill the hidden field. Pretend it worked and save nothing.
    if (data.website && data.website.trim() !== "") {
      res.status(201).json({ ok: true });
      return;
    }
    await store.addEnquiry({
      name: data.name,
      contact: data.contact,
      type: data.type,
      message: data.message,
    });
    res.status(201).json({ ok: true });
  });

  return router;
}
