import Link from "next/link";

/**
 * A simple text version of the Tehillah logo (the orange "!" is part of their brand).
 * Replace this with the real logo file once the client sends it: put it in public/ and use <Image>.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Tehillah Community Collaborative, home" className={`inline-flex flex-col gap-1 no-underline ${className}`}>
      <span className="text-[30px] font-normal leading-none tracking-[0.08em] text-white">
        TEH<span className="font-bold text-brand">!</span>LLAH
      </span>
      <span className="text-xs font-semibold tracking-[0.14em] text-[#d6d6d6]">COMMUNITY COLLABORATIVE</span>
    </Link>
  );
}
