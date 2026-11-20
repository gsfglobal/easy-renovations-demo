import Image from "next/image";
import Link from "next/link";
import type { SiteImage } from "@/config/schema";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { lines } from "@/lib/utils";

export function PageHero({
  eyebrow, title, intro, image, crumbs = [],
}: { eyebrow?: string; title: string; intro?: string; image?: SiteImage; crumbs?: { href: string; label: string }[] }) {
  return (
    <section className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-charcoal text-paper lg:min-h-[78svh]">
      {image && (
        <>
          <div className="absolute inset-0 -z-10 animate-hero-zoom">
            <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/90 via-charcoal/45 to-charcoal/35" aria-hidden />
          {image.demo && <DemoBadge className="absolute right-5 bottom-6 sm:right-8 lg:right-12" />}
        </>
      )}
      <div className="container-x pt-40 pb-16 lg:pb-24">
        <nav aria-label="Percorso" className="mb-8 animate-fade-up">
          <ol className="flex flex-wrap items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-paper/55">
            <li><Link href="/" className="hover:text-paper">Home</Link></li>
            {crumbs.map((c) => (
              <li key={c.href} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                <Link href={c.href} className="hover:text-paper">{c.label}</Link>
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && <p className="eyebrow mb-6 animate-fade-up text-champagne [animation-delay:120ms]">{eyebrow}</p>}
        <h1 className="display-1 max-w-5xl">
          {lines(title).map((l, i) => (
            <span key={i} className="block overflow-hidden pb-[0.08em]">
              <span className="block animate-reveal-line" style={{ animationDelay: `${200 + i * 160}ms` }}>{l}</span>
            </span>
          ))}
        </h1>
        {intro && <p className="lead mt-8 max-w-2xl animate-fade-up text-paper/75 [animation-delay:600ms]">{intro}</p>}
      </div>
    </section>
  );
}
