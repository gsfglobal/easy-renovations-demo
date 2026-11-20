import { getImageProps } from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { site } from "@/lib/content";
import { HeroVideo } from "./HeroVideo";

/**
 * Hero cinematografica. L'immagine è l'elemento LCP (priority, art direction
 * desktop/mobile); le animazioni sono CSS pure per non ritardare il caricamento.
 */
export function Hero() {
  const h = site.hero;
  const common = { alt: h.image.alt, sizes: "100vw", priority: true, quality: 80 } as const;
  const { props: desktop } = getImageProps({ ...common, src: h.image.src, width: 2400, height: 1500 });
  const mobileSrc = h.imageMobile?.src ?? h.image.src;
  const {
    props: { srcSet: mobileSet },
  } = getImageProps({ ...common, src: mobileSrc, width: 1080, height: 1620 });
  const titleLines = [h.title, h.subtitle].filter(Boolean);

  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-charcoal text-paper">
      <div className="absolute inset-0 -z-10 animate-hero-zoom">
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileSet} />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt fornito da getImageProps */}
          <img {...desktop} className="size-full object-cover" />
        </picture>
        {h.video && <HeroVideo src={h.video} />}
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/85 via-charcoal/35 to-charcoal/30" aria-hidden />

      <div className="container-x pt-40 pb-24 sm:pb-28 lg:pb-32">
        {h.eyebrow && (
          <p className="eyebrow mb-7 flex animate-fade-up items-center gap-3 text-champagne [animation-delay:200ms]">
            <span className="h-px w-10 bg-current" aria-hidden />
            {h.eyebrow}
          </p>
        )}
        <h1 className="display-1 max-w-5xl">
          {titleLines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.08em]">
              <span
                className={i === 1 ? "block animate-reveal-line italic text-paper/85" : "block animate-reveal-line"}
                style={{ animationDelay: `${350 + i * 180}ms` }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>
        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          {h.description && (
            <p className="lead max-w-md animate-fade-up text-paper/75 [animation-delay:900ms]">{h.description}</p>
          )}
          <div className="flex animate-fade-up flex-col gap-3 [animation-delay:1050ms] sm:flex-row">
            <ButtonLink href="/contatti" variant="accent">{h.ctaPrimary}</ButtonLink>
            <ButtonLink href="/progetti" variant="outline-light" arrow={false}>{h.ctaSecondary}</ButtonLink>
          </div>
        </div>
      </div>

      <a
        href="#introduzione"
        className="absolute right-5 bottom-8 hidden flex-col items-center gap-3 text-[0.6rem] uppercase tracking-[0.3em] text-paper/60 sm:right-8 md:flex lg:right-12"
        aria-label="Scorri alla sezione successiva"
      >
        <span className="[writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-paper/20">
          <span className="absolute inset-0 animate-scroll-cue bg-paper" />
        </span>
      </a>
      {h.image.demo && <DemoBadge className="absolute bottom-6 left-5 hidden sm:left-8 md:inline-flex lg:left-12" />}
    </section>
  );
}
