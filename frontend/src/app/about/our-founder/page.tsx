import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Photo } from "@/components/Photo";
import { Section, SectionTitle } from "@/components/Section";
import { awards, founder, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Our founder, Sr Magda Kleyn",
  description: "The story of Sister Magda Kleyn, who founded Tehillah Community Collaborative in Elsies River in 1996.",
};

export default function FounderPage() {
  return (
    <>
      <section className="grid bg-charcoal-800 md:grid-cols-2">
        <div className="flex items-center justify-end px-6 py-16 md:py-20 md:pl-20 md:pr-16">
          <div className="flex max-w-[560px] flex-col gap-5">
            <div className="text-sm font-bold tracking-[0.16em] text-brand">OUR FOUNDER</div>
            <h1 className="text-4xl font-bold leading-[1.1] text-white md:text-[52px]">{founder.name}</h1>
            <p className="text-xl leading-relaxed text-[#e8e8e8]">{founder.intro}</p>
          </div>
        </div>
        <Photo
          src="/images/house-of-magda.jpg"
          alt="House of Magda, Tehillah's safe haven in the old Avonwood Primary School building"
          className="min-h-[300px] md:min-h-[420px]"
          sizes="(min-width: 768px) 50vw, 100vw"
          priority
        />
      </section>

      <Section>
        <div className="mx-auto flex max-w-[760px] flex-col gap-6">
          <SectionTitle title="Her story" />
          {founder.story.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-[18px] leading-relaxed text-ink-soft">
              {paragraph}
            </p>
          ))}
          <p className="rounded-xl bg-brand px-8 py-6 text-[28px] font-bold leading-tight text-charcoal-950 md:text-[34px]">
            &ldquo;{founder.message}&rdquo;
          </p>
        </div>
      </Section>

      <Section tone="cream">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-5">
            <SectionTitle title="Qualifications" />
            <ul className="flex list-disc flex-col gap-2.5 pl-6 text-[17px] leading-relaxed text-ink-soft">
              {founder.qualifications.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <SectionTitle title="Service and recognition" />
            <ul className="flex list-disc flex-col gap-2.5 pl-6 text-[17px] leading-relaxed text-ink-soft">
              {founder.roles.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-5">
          <SectionTitle title="Awards" />
          <ul className="flex flex-col gap-2.5 text-[17px] leading-snug">
            {awards.map((award) => (
              <li key={award.year + award.name}>
                <strong className="mr-3 text-brand-dark">{award.year}</strong>
                {award.name}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="dark" className="py-14 md:py-16">
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-[28px] font-bold md:text-4xl">The work she started</h2>
          <p className="max-w-[640px] text-lg leading-relaxed text-[#dadada]">
            {site.short} began as one woman&apos;s vision in 1996. Today it runs a safe haven, a rehabilitation centre, a
            feeding scheme, a crèche, home-based care and youth programmes in Elsies River.
          </p>
          <ButtonLink href="/work">Explore our work</ButtonLink>
        </div>
      </Section>
    </>
  );
}
