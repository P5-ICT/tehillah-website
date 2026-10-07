import type { ReactNode } from "react";

const tones = {
  white: "bg-white text-charcoal-900",
  cream: "bg-cream text-charcoal-900",
  dark: "bg-charcoal-900 text-white",
  brand: "bg-brand text-charcoal-950",
} as const;

type SectionProps = {
  id?: string;
  tone?: keyof typeof tones;
  className?: string;
  children: ReactNode;
};

/** A full-width band with the page's standard side spacing and a maximum content width. */
export function Section({ id, tone = "white", className = "py-16 md:py-24", children }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-4 px-6 md:px-20 ${tones[tone]} ${className}`}>
      <div className="mx-auto max-w-[1240px]">{children}</div>
    </section>
  );
}

export function SectionTitle({
  title,
  intro,
  dark = false,
  as: Tag = "h2",
}: {
  title: string;
  intro?: string;
  dark?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div className="flex max-w-[720px] flex-col gap-3">
      <Tag className="text-[32px] font-bold leading-[1.15] md:text-[42px]">{title}</Tag>
      {intro ? (
        <p className={`text-lg leading-relaxed ${dark ? "text-[#dadada]" : "text-ink-soft"}`}>{intro}</p>
      ) : null}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="text-[13px] font-bold tracking-[0.14em] text-brand-dark">{children}</div>;
}
