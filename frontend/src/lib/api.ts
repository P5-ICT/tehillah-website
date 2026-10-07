// Talks to the Node.js API from server components (pages that run on the server).
// Browser code (the forms and admin page) calls /api/... on the same address instead.

const API_URL = process.env.API_URL ?? "http://localhost:4000";

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

/** Published news, newest first. Returns an empty list if the API is not reachable, so pages still load. */
export async function getNews(limit?: number): Promise<NewsPost[]> {
  try {
    const query = limit ? `?limit=${limit}` : "";
    const res = await fetch(`${API_URL}/api/news${query}`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = (await res.json()) as { items: NewsPost[] };
    return data.items;
  } catch {
    return [];
  }
}

export async function getNewsPost(slug: string): Promise<NewsPost | null> {
  try {
    const res = await fetch(`${API_URL}/api/news/${encodeURIComponent(slug)}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = (await res.json()) as { item: NewsPost };
    return data.item;
  } catch {
    return null;
  }
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
}
