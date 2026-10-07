import { ButtonLink } from "@/components/ButtonLink";
import { Section } from "@/components/Section";

export default function NotFound() {
  return (
    <Section>
      <div className="flex max-w-[600px] flex-col items-start gap-5">
        <h1 className="text-4xl font-bold">We could not find that page</h1>
        <p className="text-lg leading-relaxed text-ink-soft">
          The page may have moved, or the address may have a typing mistake.
        </p>
        <ButtonLink href="/">Back to the home page</ButtonLink>
      </div>
    </Section>
  );
}
