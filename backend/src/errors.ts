import type { ErrorRequestHandler, RequestHandler } from "express";
import { z } from "zod";

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: { field: string; message: string }[],
  ) {
    super(message);
  }
}

/** Check data against a zod schema, or throw a 400 that lists what is wrong. */
export function parse<S extends z.ZodType>(schema: S, data: unknown): z.output<S> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new HttpError(
      400,
      "Please check the form and try again.",
      result.error.issues.map((issue) => ({
        field: issue.path.join(".") || "body",
        message: issue.message,
      })),
    );
  }
  return result.data;
}

export const notFound: RequestHandler = (_req, res) => {
  res.status(404).json({ error: "Not found" });
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message, details: err.details });
    return;
  }
  // express.json() throws this for broken JSON
  if (typeof err === "object" && err !== null && (err as { type?: string }).type === "entity.parse.failed") {
    res.status(400).json({ error: "The request was not valid JSON." });
    return;
  }
  if (typeof err === "object" && err !== null && (err as { type?: string }).type === "entity.too.large") {
    res.status(413).json({ error: "That request is too large." });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "Something went wrong on our side." });
};
