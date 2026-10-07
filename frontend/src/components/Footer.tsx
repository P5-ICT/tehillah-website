import Link from "next/link";
import { nav, site } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  const { contact } = site;
  return (
    <footer className="bg-charcoal-900 px-6 pb-8 pt-14 text-[#d6d6d6] md:px-20">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-9">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="flex max-w-[440px] flex-col gap-3">
            <Logo />
            <p className="mt-2 text-base leading-relaxed">{site.purpose}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="py-2.5 text-base text-white no-underline hover:text-brand">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2 text-base leading-relaxed">
            <div className="text-[13px] font-bold tracking-[0.14em] text-brand">FIND US</div>
            <p>{contact.address}</p>
            <a href={contact.phoneHref} className="text-white no-underline hover:text-brand">
              {contact.phone}
            </a>
            {contact.email ? (
              <a href={`mailto:${contact.email}`} className="text-white no-underline hover:text-brand">
                {contact.email}
              </a>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-charcoal-700 pt-5 text-sm text-[#c4c4c8] md:flex-row">
          <span>{site.domain}</span>
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
