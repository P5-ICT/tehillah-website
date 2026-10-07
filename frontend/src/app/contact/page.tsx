import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Photo } from "@/components/Photo";
import { Eyebrow, Section } from "@/components/Section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to find, call or write to Tehillah Community Collaborative in Elsies River, Cape Town.",
};

export default function ContactPage() {
  const { contact } = site;
  return (
    <Section>
      <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col gap-6">
          <h1 className="text-[32px] font-bold leading-[1.15] md:text-[42px]">Need help or have a question?</h1>
          <p className="text-lg leading-relaxed text-ink-soft">{contact.hours}</p>
          <div className="flex flex-col gap-4 text-lg leading-snug">
            <div>
              <Eyebrow>VISIT</Eyebrow>
              {contact.address}
            </div>
            <div>
              <Eyebrow>CALL</Eyebrow>
              <a href={contact.phoneHref} className="text-charcoal-900 no-underline hover:text-brand-dark">
                {contact.phone}
              </a>
            </div>
            <div>
              <Eyebrow>{contact.person.name.toUpperCase()}</Eyebrow>
              <a href={contact.person.phoneHref} className="text-charcoal-900 no-underline hover:text-brand-dark">
                {contact.person.phone}
              </a>
              {" · "}
              <a href={contact.person.whatsappHref} className="font-bold text-brand-dark">
                WhatsApp
              </a>
            </div>
            {contact.email ? (
              <div>
                <Eyebrow>EMAIL</Eyebrow>
                <a href={`mailto:${contact.email}`} className="text-charcoal-900 no-underline hover:text-brand-dark">
                  {contact.email}
                </a>
              </div>
            ) : null}
          </div>
          <div>
            <ButtonLink href={contact.phoneHref}>Call us</ButtonLink>
          </div>
          <Photo
            src="/images/signboard.jpg"
            alt="The Tehillah Community Collaborative signboard outside the building"
            className="mt-2 h-64 w-full rounded-xl"
            sizes="(min-width: 768px) 560px, 100vw"
          />
        </div>
        <EnquiryForm defaultType="help" />
      </div>
    </Section>
  );
}
