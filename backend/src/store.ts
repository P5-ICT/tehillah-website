import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

export type NewsPost = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  imageUrl: string | null;
  published: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type EnquiryType = "help" | "give" | "volunteer" | "partner" | "other";
export type EnquiryStatus = "new" | "handled";

export type Enquiry = {
  id: string;
  createdAt: string;
  name: string;
  contact: string;
  type: EnquiryType;
  message: string;
  status: EnquiryStatus;
};

export type NewsInput = {
  title: string;
  summary: string;
  body: string;
  imageUrl?: string | null;
  published?: boolean;
  publishedAt?: string;
};

type Db = { news: NewsPost[]; enquiries: Enquiry[] };

export function slugify(text: string): string {
  const slug = text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return slug || "post";
}

function seed(): Db {
  const now = new Date().toISOString();
  return {
    enquiries: [],
    news: [
      {
        id: randomUUID(),
        slug: "example-news-post",
        title: "Example news post (edit or delete me)",
        summary: "This is a draft so you can see how news works. It is not shown on the website.",
        body: "Write your story here. Leave the blank lines between paragraphs.\n\nTick 'Published' when it is ready to show on the website.",
        imageUrl: null,
        published: false,
        publishedAt: now,
        createdAt: now,
        updatedAt: now,
      },
    ],
  };
}

/**
 * A tiny JSON-file database. It is simple on purpose: no database server to install.
 * When the site grows, replace this file with PostgreSQL or MySQL and keep the same method names.
 */
export class Store {
  private db: Db = { news: [], enquiries: [] };
  private queue: Promise<void> = Promise.resolve();

  constructor(private file: string) {}

  async load(): Promise<void> {
    try {
      const parsed = JSON.parse(await fs.readFile(this.file, "utf8")) as Partial<Db>;
      this.db = { news: parsed.news ?? [], enquiries: parsed.enquiries ?? [] };
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
      this.db = seed();
      await this.save();
    }
  }

  // Writes happen one at a time, to a temporary file first, so a crash cannot leave a half-written file.
  private save(): Promise<void> {
    const snapshot = JSON.stringify(this.db, null, 2);
    const run = this.queue
      .catch(() => undefined)
      .then(async () => {
        await fs.mkdir(path.dirname(this.file), { recursive: true });
        const tmp = `${this.file}.tmp`;
        await fs.writeFile(tmp, snapshot);
        await fs.rename(tmp, this.file);
      });
    this.queue = run;
    return run;
  }

  // ---- News ----

  private uniqueSlug(title: string, excludeId?: string): string {
    const base = slugify(title);
    let slug = base;
    let n = 2;
    while (this.db.news.some((post) => post.slug === slug && post.id !== excludeId)) {
      slug = `${base}-${n++}`;
    }
    return slug;
  }

  private sortedNews(posts: NewsPost[]): NewsPost[] {
    return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }

  listPublishedNews(limit?: number): NewsPost[] {
    const posts = this.sortedNews(this.db.news.filter((post) => post.published));
    return limit ? posts.slice(0, limit) : posts;
  }

  listAllNews(): NewsPost[] {
    return this.sortedNews(this.db.news);
  }

  getPublishedBySlug(slug: string): NewsPost | undefined {
    return this.db.news.find((post) => post.slug === slug && post.published);
  }

  async createNews(input: NewsInput): Promise<NewsPost> {
    const now = new Date().toISOString();
    const post: NewsPost = {
      id: randomUUID(),
      slug: this.uniqueSlug(input.title),
      title: input.title,
      summary: input.summary,
      body: input.body,
      imageUrl: input.imageUrl ?? null,
      published: input.published ?? false,
      publishedAt: input.publishedAt ?? now,
      createdAt: now,
      updatedAt: now,
    };
    this.db.news.push(post);
    await this.save();
    return post;
  }

  async updateNews(id: string, patch: Partial<NewsInput>): Promise<NewsPost | undefined> {
    const post = this.db.news.find((item) => item.id === id);
    if (!post) return undefined;
    if (patch.title !== undefined) post.title = patch.title;
    if (patch.summary !== undefined) post.summary = patch.summary;
    if (patch.body !== undefined) post.body = patch.body;
    if (patch.imageUrl !== undefined) post.imageUrl = patch.imageUrl;
    if (patch.published !== undefined) post.published = patch.published;
    if (patch.publishedAt !== undefined) post.publishedAt = patch.publishedAt;
    post.updatedAt = new Date().toISOString();
    await this.save();
    return post;
  }

  async deleteNews(id: string): Promise<boolean> {
    const before = this.db.news.length;
    this.db.news = this.db.news.filter((post) => post.id !== id);
    if (this.db.news.length === before) return false;
    await this.save();
    return true;
  }

  // ---- Enquiries ----

  async addEnquiry(input: Pick<Enquiry, "name" | "contact" | "type" | "message">): Promise<Enquiry> {
    const enquiry: Enquiry = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...input,
      status: "new",
    };
    this.db.enquiries.push(enquiry);
    await this.save();
    return enquiry;
  }

  listEnquiries(): Enquiry[] {
    return [...this.db.enquiries].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async setEnquiryStatus(id: string, status: EnquiryStatus): Promise<Enquiry | undefined> {
    const enquiry = this.db.enquiries.find((item) => item.id === id);
    if (!enquiry) return undefined;
    enquiry.status = status;
    await this.save();
    return enquiry;
  }
}
