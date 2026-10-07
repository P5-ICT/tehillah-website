import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsImage } from "@/components/NewsCard";
import { Section } from "@/components/Section";
import { formatDate, getNewsPost } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  return post ? { title: post.title, description: post.summary } : {};
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  if (!post) notFound();

  // Stories are plain text. A blank line starts a new paragraph.
  const paragraphs = post.body.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);

  return (
    <Section className="py-12 md:py-20">
      <article className="mx-auto flex max-w-[760px] flex-col gap-6">
        <Link href="/news" className="w-fit py-1 text-base font-bold text-brand-dark underline">
          All news
        </Link>
        <time dateTime={post.publishedAt} className="text-sm font-bold text-brand-dark">
          {formatDate(post.publishedAt)}
        </time>
        <h1 className="text-4xl font-bold leading-[1.1] md:text-5xl">{post.title}</h1>
        <p className="text-xl leading-relaxed text-ink-soft">{post.summary}</p>
        <NewsImage post={post} className="h-72 w-full rounded-xl md:h-[420px]" />
        <div className="flex flex-col gap-5">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="whitespace-pre-line text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </Section>
  );
}
