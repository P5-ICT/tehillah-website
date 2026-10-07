import type { Metadata } from "next";
import { EnquiryForm, type EnquiryType } from "@/components/EnquiryForm";
import { Photo } from "@/components/Photo";
import { Section, SectionTitle } from "@/components/Section";
import { involvement, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Get involved",
  description: "Give, volunteer or partner with Tehillah Community Collaborative.",
};

const types: EnquiryType[] = ["help", "give", "volunteer", "partner", "other"];

export default async function GetInvolvedPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const defaultType = types.find((item) => item === type) ?? "give";

  return (
    <>
      <Section tone="dark">
        <div className="flex flex-col gap-11">
          <div className="grid items-end gap-8 md:grid-cols-2 md:gap-12">
            <SectionTitle as="h1" title="Walk with us" intro="Your time, skills and support help Tehillah reach more people and keep the doors open." dark />
            <Photo
              src="/images/community-laugh.jpg"
              alt="A Tehillah team member laughing during a community session"
              className="h-52 w-full rounded-xl"
              sizes="(min-width: 768px) 600px, 100vw"
              position="50% 30%"
              priority
            />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {involvement.map((item) => (
              <div key={item.key} className="flex flex-col gap-3 rounded-xl bg-charcoal-800 p-8">
                <h2 className="text-[26px] font-bold">{item.title}</h2>
                <p className="text-[17px] leading-relaxed text-[#e4e4e4]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="enquire">
        <div className="grid items-start gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div className="flex flex-col gap-5">
            <h2 className="text-[30px] font-bold leading-[1.15] md:text-[38px]">Tell us how you would like to help</h2>
            <p className="text-lg leading-relaxed text-ink-soft">
              Send us a short message and someone from Tehillah will get back to you. We will explain how to give and
              where help is needed most.
            </p>
            <p className="text-lg leading-relaxed text-ink-soft">
              Prefer to talk? Call us on{" "}
              <a href={site.contact.phoneHref} className="font-bold text-brand-dark">
                {site.contact.phone}
              </a>
              .
            </p>
          </div>
          <EnquiryForm defaultType={defaultType} />
        </div>
      </Section>
    </>
  );
}
