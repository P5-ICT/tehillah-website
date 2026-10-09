import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { ClusterCard } from "@/components/ClusterCard";
import { NewsCard } from "@/components/NewsCard";
import { Photo } from "@/components/Photo";
import { Eyebrow, Section, SectionTitle } from "@/components/Section";
import { awards, clusters, featured, gallery, involvement, site, stats, values, vision } from "@/content/site";
import { getNews } from "@/lib/api";

export default async function HomePage() {
  const news = await getNews(3);

  return (
    <>
      {/* Hero */}
      <section className="grid bg-charcoal-800 md:grid-cols-[1.15fr_0.85fr]">
        <div className="flex items-center justify-end px-6 py-16 md:py-20 md:pl-20 md:pr-16">
          <div className="flex max-w-[600px] flex-col gap-6">
            <div className="text-sm font-bold tracking-[0.16em] text-brand">{site.tagline.toUpperCase()}</div>
            <h1 className="text-4xl font-bold leading-[1.07] text-white md:text-[62px]">
              Transforming communities. Building a self-reliant society.
            </h1>
            <p className="text-xl leading-relaxed text-[#e8e8e8]">
              Tehillah Community Collaborative walks alongside the poor, the vulnerable and those with special needs in
              Elsies River, so that families can govern their own lives well.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <ButtonLink href="/get-involved">Support our work</ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Get help
              </ButtonLink>
            </div>
          </div>
        </div>
        <Photo
          src="/images/hero-wheelchair.jpg"
          alt="A smiling elderly woman in a wheelchair on the veranda at House of Magda"
          className="min-h-[340px] md:min-h-[620px]"
          sizes="(min-width: 768px) 45vw, 100vw"
          position="50% 30%"
          priority
        />
      </section>

      {/* Numbers */}
      <Section tone="brand" className="py-10 md:py-12">
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-[40px] font-bold leading-none md:text-[52px]">{stat.value}</dt>
              <dd className="pt-2 text-[17px] leading-snug">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Clusters */}
      <Section>
        <div className="flex flex-col gap-11">
          <SectionTitle
            title="Four clusters, one purpose"
            intro="We asked the community what it needs, and shaped our work around the answers."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {clusters.map((cluster) => (
              <ClusterCard key={cluster.slug} cluster={cluster} />
            ))}
          </div>
        </div>
      </Section>

      {/* Programmes */}
      <Section tone="cream">
        <div className="flex flex-col gap-11">
          <SectionTitle
            title="What we do every day"
            intro="Practical help, offered with respect, from a team that has served Elsies River for decades."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((item) => (
              <article key={item.title} className="flex flex-col overflow-hidden rounded-xl bg-white">
                <Photo src={item.image} alt={item.imageAlt} className="h-60 w-full" sizes="(min-width: 768px) 600px, 100vw" position={item.position} />
                <div className="flex flex-col gap-2.5 p-7 md:px-8 md:pb-8">
                  <Eyebrow>{item.label}</Eyebrow>
                  <h3 className="text-[26px] font-bold">{item.title}</h3>
                  <p className="text-[17px] leading-relaxed text-ink-soft">{item.body}</p>
                  <Link href={item.href} className="py-2 text-base font-bold text-brand-dark underline">
                    Learn more about {item.title}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* Gallery */}
      <Section className="pb-12 pt-16 md:pb-16 md:pt-24">
        <div className="flex flex-col gap-9">
          <h2 className="text-[32px] font-bold leading-[1.15] md:text-[42px]">Life at Tehillah</h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {gallery.map((item) => (
              <figure key={item.caption} className="flex flex-col gap-2.5">
                <Photo src={item.image} alt={item.alt} className="h-56 w-full rounded-xl md:h-64" sizes="(min-width: 768px) 25vw, 50vw" position={item.position} />
                <figcaption className="text-base font-semibold">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      {/* Vision */}
      <Section className="pb-16 pt-8 md:pb-24">
        <div className="grid items-stretch gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <Photo
            src="/images/wheelchair-exercise.jpg"
            alt="Residents in wheelchairs raising their arms during an exercise session at the safe haven"
            className="min-h-[320px] rounded-xl md:min-h-[480px]"
            sizes="(min-width: 768px) 45vw, 100vw"
            position="45% 80%"
          />
          <div className="flex flex-col justify-center gap-5">
            <h2 className="text-[32px] font-bold leading-[1.15] md:text-[42px]">Our vision</h2>
            <p className="text-xl leading-relaxed">{vision}</p>
            <ul className="flex flex-wrap gap-2.5" aria-label="Our values">
              {values.map((value) => (
                <li key={value} className="rounded-full bg-sand px-4 py-2 text-[15px] font-semibold">
                  {value}
                </li>
              ))}
            </ul>
            <div>
              <ButtonLink href="/about" variant="outlineDark">
                About Tehillah
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Latest news (only when there are published stories) */}
      {news.length > 0 ? (
        <Section tone="cream">
          <div className="flex flex-col gap-11">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionTitle title="Latest news" />
              <Link href="/news" className="py-2 text-base font-bold text-brand-dark underline">
                All news
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {news.map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {/* Get involved */}
      <Section tone="dark">
        <div className="flex flex-col gap-11">
          <div className="grid items-end gap-8 md:grid-cols-2 md:gap-12">
            <SectionTitle title="Walk with us" intro="Your time, skills and support help Tehillah reach more people and keep the doors open." dark />
            <Photo
              src="/images/community-laugh.jpg"
              alt="A Tehillah team member laughing during a community session"
              className="h-52 w-full rounded-xl"
              sizes="(min-width: 768px) 600px, 100vw"
              position="50% 30%"
            />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {involvement.map((item) => (
              <div key={item.key} className="flex flex-col gap-3.5 rounded-xl bg-charcoal-800 p-8">
                <h3 className="text-[26px] font-bold">{item.title}</h3>
                <p className="text-[17px] leading-relaxed text-[#e4e4e4]">{item.body}</p>
                <div className="mt-auto pt-3">
                  <ButtonLink href={`/get-involved?type=${item.key}#enquire`} variant={item.primary ? "primary" : "outline"}>
                    {item.cta}
                  </ButtonLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Recognition */}
      <Section tone="cream" className="py-14 md:py-20">
        <div className="grid items-start gap-10 md:grid-cols-[1fr_380px] md:gap-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-[28px] font-bold leading-[1.15] md:text-4xl">Recognised for our work</h2>
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
          <div className="flex flex-col gap-2.5 rounded-xl border border-line bg-white p-8">
            <div className="text-[44px] font-bold leading-none text-brand-dark">Level 1</div>
            <div className="text-[22px] font-bold">B-BBEE company</div>
            <p className="text-base leading-relaxed text-ink-soft">
              We hold ourselves to the highest ethical standards, both financially and in how we serve people.
            </p>
          </div>
        </div>
      </Section>

      {/* Contact strip */}
      <Section>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-6">
            <h2 className="text-[32px] font-bold leading-[1.15] md:text-[42px]">Need help or have a question?</h2>
            <p className="text-lg leading-relaxed text-ink-soft">{site.contact.hours}</p>
            <div className="flex flex-col gap-4 text-lg leading-snug">
              <div>
                <Eyebrow>VISIT</Eyebrow>
                {site.contact.address}
              </div>
              <div>
                <Eyebrow>CALL</Eyebrow>
                <a href={site.contact.phoneHref} className="text-charcoal-900 no-underline hover:text-brand-dark">
                  {site.contact.phone}
                </a>
              </div>
              <div>
                <Eyebrow>{site.contact.person.name.toUpperCase()}</Eyebrow>
                <a href={site.contact.person.phoneHref} className="text-charcoal-900 no-underline hover:text-brand-dark">
                  {site.contact.person.phone}
                </a>
                {" · "}
                <a href={site.contact.person.whatsappHref} className="font-bold text-brand-dark">
                  WhatsApp
                </a>
              </div>
              {site.contact.email ? (
                <div>
                  <Eyebrow>EMAIL</Eyebrow>
                  <a href={`mailto:${site.contact.email}`} className="text-charcoal-900 no-underline hover:text-brand-dark">
                    {site.contact.email}
                  </a>
                </div>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href={site.contact.phoneHref}>Call us</ButtonLink>
              <ButtonLink href="/contact" variant="outlineDark">
                Send a message
              </ButtonLink>
            </div>
          </div>
          <Photo
            src="/images/signboard.jpg"
            alt="The Tehillah Community Collaborative signboard outside the building"
            className="h-72 w-full rounded-xl md:h-[400px]"
            sizes="(min-width: 768px) 560px, 100vw"
          />
        </div>
      </Section>
    </>
  );
}
