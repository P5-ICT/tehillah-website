import { Router } from "express";
import rateLimit from "express-rate-limit";
import { requireAdmin } from "../middleware/auth.js";
import { HttpError, parse } from "../errors.js";
import { enquiryStatusSchema, newsCreateSchema, newsUpdateSchema } from "../schemas.js";
import type { Store } from "../store.js";

export function adminRoutes(store: Store): Router {
  const router = Router();

  // Slows down anyone guessing the admin password.
  router.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 200,
      standardHeaders: "draft-8",
      legacyHeaders: false,
      message: { error: "Too many attempts. Please wait a few minutes." },
    }),
    requireAdmin,
  );

  // The admin page calls this to check the password is right.
  router.get("/session", (_req, res) => {
    res.json({ ok: true });
  });

  // ---- News ----
  router.get("/news", (_req, res) => {
    res.json({ items: store.listAllNews() });
  });

  router.post("/news", async (req, res) => {
    const data = parse(newsCreateSchema, req.body);
    const post = await store.createNews(data);
    res.status(201).json({ item: post });
  });

  router.put("/news/:id", async (req, res) => {
    const data = parse(newsUpdateSchema, req.body);
    const post = await store.updateNews(String(req.params.id), data);
    if (!post) throw new HttpError(404, "Story not found.");
    res.json({ item: post });
  });

  router.delete("/news/:id", async (req, res) => {
    const removed = await store.deleteNews(String(req.params.id));
    if (!removed) throw new HttpError(404, "Story not found.");
    res.status(204).end();
  });

  // ---- Enquiries ----
  router.get("/enquiries", (_req, res) => {
    res.json({ items: store.listEnquiries() });
  });

  router.patch("/enquiries/:id", async (req, res) => {
    const { status } = parse(enquiryStatusSchema, req.body);
    const enquiry = await store.setEnquiryStatus(String(req.params.id), status);
    if (!enquiry) throw new HttpError(404, "Enquiry not found.");
    res.json({ item: enquiry });
  });

  return router;
}
