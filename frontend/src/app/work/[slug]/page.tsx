import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { Photo } from "@/components/Photo";
import { Eyebrow, Section } from "@/components/Section";
import { clusters } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return clusters.map((cluster) => ({ slug: cluster.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cluster = clusters.find((item) => item.slug === slug);
  return cluster ? { title: cluster.title, description: cluster.summary } : {};
}

export default async function ClusterPage({ params }: Props) {
  const { slug } = await params;
  const cluster = clusters.find((item) => item.slug === slug);
  if (!cluster) notFound();

  const others = clusters.filter((item) => item.slug !== cluster.slug);

  return (
    <>
      <section className="grid bg-charcoal-800 md:grid-cols-[1.1fr_0.9fr]">
        <div className="flex items-center justify-end px-6 py-14 md:py-20 md:pl-20 md:pr-16">
          <div className="flex max-w-[580px] flex-col gap-5">
            <Link href="/work" className="py-1 text-sm font-bold tracking-[0.16em] text-brand no-underline hover:underline">
              OUR WORK
            </Link>
            <h1 className="text-4xl font-bold leading-[1.1] text-white md:text-[52px]">{cluster.title}</h1>
            <p className="text-xl leading-relaxed text-[#e8e8e8]">{cluster.intro}</p>
            {cluster.beneficiaries ? (
              <div className="text-lg font-bold text-brand">{cluster.beneficiaries} beneficiaries</div>
            ) : null}
          </div>
        </div>
        <Photo
          src={cluster.image}
          alt={cluster.imageAlt}
          className="min-h-[300px] md:min-h-[440px]"
          sizes="(min-width: 768px) 45vw, 100vw"
          position={cluster.imagePosition}
          priority
        />
      </section>

      {cluster.sections.length > 1 ? (
        <nav aria-label={`${cluster.title} sections`} className="border-b border-line bg-cream px-6 md:px-20">
          <ul className="mx-auto flex max-w-[1240px] flex-wrap gap-x-7 gap-y-1 py-2">
            {cluster.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="inline-block py-2.5 text-base font-semibold text-charcoal-900 no-underline hover:text-brand-dark">
                  {section.heading.split(":")[0]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      {cluster.sections.map((section, index) => (
        <Section key={section.id} id={section.id} tone={index % 2 === 0 ? "white" : "cream"}>
          <div className={`grid items-start gap-10 md:gap-16 ${section.image ? "md:grid-cols-2" : "md:grid-cols-[minmax(0,760px)]"}`}>
            <div className={`flex flex-col gap-4 ${index % 2 === 1 && section.image ? "md:order-2" : ""}`}>
              <Eyebrow>{section.label}</Eyebrow>
              <h2 className="text-[30px] font-bold leading-[1.15] md:text-[38px]">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="text-[17px] leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}
              {section.points ? (
                <ul className="flex list-disc flex-col gap-2.5 pl-6 text-[17px] leading-relaxed text-ink-soft">
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </div>
            {section.image ? (
              <Photo
                src={section.image}
                alt={section.imageAlt ?? ""}
                className="h-72 w-full rounded-xl md:sticky md:top-6 md:h-[440px]"
                sizes="(min-width: 768px) 600px, 100vw"
                position={section.imagePosition}
              />
            ) : null}
          </div>
        </Section>
      ))}

      <Section tone="dark" className="py-14 md:py-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-[28px] font-bold md:text-4xl">Help us do more</h2>
            <p className="max-w-[640px] text-lg leading-relaxed text-[#dadada]">
              Give, volunteer or partner with us, and help {cluster.title.toLowerCase()} reach more people.
            </p>
            <ButtonLink href="/get-involved">Get involved</ButtonLink>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-charcoal-700 pt-5 text-base">
            <span className="py-2.5 text-[#c4c4c8]">More from Tehillah:</span>
            {others.map((item) => (
              <Link key={item.slug} href={`/work/${item.slug}`} className="py-2.5 font-semibold text-white underline hover:text-brand">
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
