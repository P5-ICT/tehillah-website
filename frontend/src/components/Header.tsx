import Link from "next/link";
import { nav } from "@/content/site";
import { ButtonLink } from "./ButtonLink";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="bg-charcoal-900 px-6 md:px-20">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-8 py-4">
        <Logo />

        {/* Laptop and larger */}
        <nav aria-label="Main" className="hidden items-center gap-x-9 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="py-3 text-base font-medium text-white no-underline hover:text-brand">
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/get-involved" className="min-h-11 py-2.5! px-6! text-base!">
            Support us
          </ButtonLink>
        </nav>

        {/* Small screens: a simple menu that works without JavaScript */}
        <details className="relative md:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-md border-2 border-white px-4 text-base font-bold text-white">
            Menu
          </summary>
          <nav aria-label="Main" className="absolute right-0 z-20 mt-2 flex w-56 flex-col rounded-md bg-charcoal-800 p-2 shadow-lg">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded px-3 py-3 text-base font-medium text-white no-underline hover:bg-charcoal-700">
                {item.label}
              </Link>
            ))}
            <Link href="/get-involved" className="mt-1 rounded bg-brand px-3 py-3 text-base font-bold text-charcoal-950 no-underline">
              Support us
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
