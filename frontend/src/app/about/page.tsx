import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { Photo } from "@/components/Photo";
import { Section, SectionTitle } from "@/components/Section";
import { awards, founder, mission, objectives, site, team, values, vision } from "@/content/site";

export const metadata: Metadata = {
  title: "About us",
  description: "Tehillah's vision, mission, values and the recognition our director has received for community work.",
};

export default function AboutPage() {
  return (
    <>
      <section className="grid bg-charcoal-800 md:grid-cols-2">
        <div className="flex items-center justify-end px-6 py-16 md:py-20 md:pl-20 md:pr-16">
          <div className="flex max-w-[560px] flex-col gap-5">
            <div className="text-sm font-bold tracking-[0.16em] text-brand">ABOUT US</div>
            <h1 className="text-4xl font-bold leading-[1.1] text-white md:text-[52px]">{site.tagline}</h1>
            <p className="text-xl leading-relaxed text-[#e8e8e8]">
              Since 1996, Tehillah has walked alongside the poor, the vulnerable and those with special needs in Elsies
              River, helping people become self-reliant.
            </p>
            <p className="text-xl font-semibold italic leading-relaxed text-brand">&ldquo;{site.motto}&rdquo;</p>
          </div>
        </div>
        <Photo
          src="/images/smiling-woman.jpg"
          alt="A smiling woman sitting in front of a red brick wall"
          className="min-h-[300px] md:min-h-[420px]"
          sizes="(min-width: 768px) 50vw, 100vw"
          position="30% 40%"
          priority
        />
      </section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-[32px] font-bold leading-[1.15] md:text-4xl">Our vision</h2>
            <p className="text-xl leading-relaxed">{vision}</p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-[32px] font-bold leading-[1.15] md:text-4xl">Our mission</h2>
            <ul className="flex list-disc flex-col gap-3 pl-6 text-[17px] leading-relaxed text-ink-soft">
              {mission.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="dark" className="py-14 md:py-16">
        <div className="flex max-w-[760px] flex-col items-start gap-5">
          <div className="text-sm font-bold tracking-[0.16em] text-brand">OUR FOUNDER</div>
          <h2 className="text-[28px] font-bold md:text-4xl">{founder.name}</h2>
          <p className="text-lg leading-relaxed text-[#dadada]">{founder.intro}</p>
          <ButtonLink href="/about/our-founder">Read her story</ButtonLink>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-9">
          <SectionTitle title="Our leadership" intro="The management team and board who lead Tehillah." />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((person) => (
              <li key={person.name} className="rounded-xl border border-line bg-white p-6">
                <div className="text-xl font-bold">{person.name}</div>
                <div className="pt-1 text-base text-ink-soft">{person.role}</div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="cream">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-5">
            <SectionTitle title="What we are working towards" />
            <ul className="flex list-disc flex-col gap-2.5 pl-6 text-[17px] leading-relaxed text-ink-soft">
              {objectives.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <SectionTitle title="What we stand for" />
            <ul className="flex flex-wrap gap-2.5" aria-label="Our values">
              {values.map((value) => (
                <li key={value} className="rounded-full bg-white px-4 py-2 text-[15px] font-semibold">
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid items-start gap-10 md:grid-cols-[1fr_380px] md:gap-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-[32px] font-bold leading-[1.15] md:text-4xl">Recognised for our work</h2>
            <p className="text-[17px] leading-relaxed text-ink-soft">
              Our director, Sr Magda Kleyn, has received many awards for her work in the community.
            </p>
            <ul className="flex flex-col gap-2.5 text-[17px] leading-snug">
              {awards.map((award) => (
                <li key={award.year + award.name}>
                  <strong className="mr-3 text-brand-dark">{award.year}</strong>
                  {award.name}
                </li>
              ))}
            </ul>
            <Link href="/about/our-founder" className="py-2 text-base font-bold text-brand-dark underline">
              Read Sr Magda Kleyn&apos;s story
            </Link>
          </div>
          <div className="flex flex-col gap-2.5 rounded-xl border border-line bg-cream p-8">
            <div className="text-[44px] font-bold leading-none text-brand-dark">Level 1</div>
            <div className="text-[22px] font-bold">B-BBEE company</div>
            <p className="text-base leading-relaxed text-ink-soft">
              We hold ourselves to the highest ethical standards, both financially and in how we serve people.
            </p>
            <p className="text-base leading-relaxed text-ink-soft">
              Our annual financial statements are independently audited, with no irregular audit findings. Registered
              non-profit organisation {site.npoNumber}.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="dark" className="py-14 md:py-16">
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-[28px] font-bold md:text-4xl">See the work up close</h2>
          <p className="max-w-[640px] text-lg leading-relaxed text-[#dadada]">
            Our work is organised into six clusters: Social Services, Spiritual, Labour &amp; Skills, Education, Health and
            Youth.
          </p>
          <ButtonLink href="/work">Explore our work</ButtonLink>
        </div>
      </Section>
    </>
  );
}
