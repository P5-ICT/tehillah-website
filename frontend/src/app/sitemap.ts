import type { MetadataRoute } from "next";
import { clusters } from "@/content/site";
import { getNews } from "@/lib/api";

// Render on each request, so news never goes missing after a deploy (see app/page.tsx).
export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/about", "/about/our-founder", "/work", "/news", "/get-involved", "/contact"];
  const news = await getNews();
  return [
    ...pages.map((path) => ({ url: `${siteUrl}${path}` })),
    ...clusters.map((cluster) => ({ url: `${siteUrl}/work/${cluster.slug}` })),
    ...news.map((post) => ({ url: `${siteUrl}/news/${post.slug}`, lastModified: post.updatedAt })),
  ];
}
