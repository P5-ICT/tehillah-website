import Link from "next/link";
import type { ReactNode } from "react";

const styles = {
  primary: "bg-brand text-charcoal-950 hover:bg-brand-light",
  outline: "border-2 border-white text-white hover:bg-white/10",
  outlineDark: "border-2 border-charcoal-900 text-charcoal-900 hover:bg-charcoal-900/5",
} as const;

type Props = {
  href: string;
  variant?: keyof typeof styles;
  children: ReactNode;
  className?: string;
};

export function ButtonLink({ href, variant = "primary", children, className = "" }: Props) {
  const classes = `inline-flex min-h-12 items-center justify-center rounded-md px-7 py-3 text-[17px] font-bold no-underline transition-colors ${styles[variant]} ${className}`;
  // Phone and email links are plain links, pages inside the site use Next's Link
  if (href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
