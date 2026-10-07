import Link from "next/link";
import { formatDate, type NewsPost } from "@/lib/api";
import { Photo } from "./Photo";

/** A news photo. Local photos (starting with /) are optimised, web links are shown as they are. */
export function NewsImage({ post, className }: { post: NewsPost; className: string }) {
  if (!post.imageUrl) return null;
  if (post.imageUrl.startsWith("/")) {
    return <Photo src={post.imageUrl} alt="" className={className} sizes="(min-width: 768px) 400px, 100vw" />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={post.imageUrl} alt="" className={`${className} object-cover`} loading="lazy" />;
}

export function NewsCard({ post }: { post: NewsPost }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-line bg-white">
      <NewsImage post={post} className="h-48 w-full" />
      <div className="flex flex-1 flex-col gap-2 p-6">
        <time dateTime={post.publishedAt} className="text-sm font-bold text-brand-dark">
          {formatDate(post.publishedAt)}
        </time>
        <h3 className="text-xl font-bold leading-snug">
          <Link href={`/news/${post.slug}`} className="text-charcoal-900 no-underline hover:text-brand-dark">
            {post.title}
          </Link>
        </h3>
        <p className="text-base leading-relaxed text-ink-soft">{post.summary}</p>
        <Link href={`/news/${post.slug}`} className="mt-auto py-2 text-base font-bold text-brand-dark underline">
          Read the story
        </Link>
      </div>
    </article>
  );
}
