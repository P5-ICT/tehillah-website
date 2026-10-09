import Link from "next/link";
import type { Cluster } from "@/content/site";
import { Photo } from "./Photo";

export function ClusterCard({ cluster }: { cluster: Cluster }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-line bg-white">
      <Photo
        src={cluster.image}
        alt={cluster.imageAlt}
        className="h-48 w-full"
        sizes="(min-width: 1280px) 400px, (min-width: 768px) 45vw, 100vw"
        position={cluster.imagePosition}
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-2xl font-bold">{cluster.title}</h3>
        {cluster.beneficiaries ? (
          <div className="text-[15px] font-bold text-brand-dark">{cluster.beneficiaries} beneficiaries</div>
        ) : null}
        <p className="text-base leading-relaxed text-ink-soft">{cluster.summary}</p>
        <Link href={`/work/${cluster.slug}`} className="mt-auto py-2.5 text-base font-bold text-brand-dark underline">
          Explore {cluster.title}
        </Link>
      </div>
    </article>
  );
}
