import { z } from "zod";

const looksLikeEmailOrPhone = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value.replace(/\D/g, "").length >= 7;

export const enquiryTypes = ["help", "give", "volunteer", "partner", "other"] as const;

export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Please tell us your name").max(100),
  contact: z
    .string()
    .trim()
    .max(120)
    .refine(looksLikeEmailOrPhone, "Please enter an email address or a phone number"),
  type: z.enum(enquiryTypes, "Please choose what this is about"),
  message: z.string().trim().min(1, "Please write a short message").max(2000),
  // Hidden field. Real people never fill it in, bots usually do.
  website: z.string().max(200).optional(),
});

const imageUrl = z
  .string()
  .trim()
  .max(300)
  .refine((value) => value === "" || /^(\/|https?:\/\/)/.test(value), "Use a link that starts with / or https://")
  .transform((value) => (value === "" ? null : value))
  .nullable();

const newsBase = z.object({
  title: z.string().trim().min(1, "Title is required").max(140),
  summary: z.string().trim().min(1, "A short summary is required").max(300),
  body: z.string().trim().min(1, "The story text is required").max(10000),
  imageUrl: imageUrl.optional(),
  publishedAt: z.iso.datetime("Use a full date and time").optional(),
});

export const newsCreateSchema = newsBase.extend({
  published: z.boolean().default(false),
});

export const newsUpdateSchema = newsBase.partial().extend({
  published: z.boolean().optional(),
});

export const enquiryStatusSchema = z.object({
  status: z.enum(["new", "handled"], "Status must be new or handled"),
});
