import type { Metadata } from "next";
import { NewsCard } from "@/components/NewsCard";
import { Section, SectionTitle } from "@/components/Section";
import { site } from "@/content/site";
import { getNews } from "@/lib/api";

// Render on each request, so news never goes missing after a deploy (see app/page.tsx).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "News",
  description: "News and updates from Tehillah Community Collaborative.",
};

export default async function NewsPage() {
  const posts = await getNews();

  return (
    <Section>
      <div className="flex flex-col gap-11">
        <SectionTitle as="h1" title="News" intro="Stories and updates from the people and projects of Tehillah." />
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="max-w-[640px] rounded-xl bg-cream p-8 text-lg leading-relaxed text-ink-soft">
            No news yet. Please check back soon, or call us on {site.contact.phone}.
          </p>
        )}
      </div>
    </Section>
  );
}
