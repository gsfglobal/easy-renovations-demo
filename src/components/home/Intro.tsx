import { ButtonLink } from "@/components/ui/Button";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { getVerifiedStats, site } from "@/lib/content";
import { lines } from "@/lib/utils";

export function Intro() {
  const i = site.intro;
  const stats = getVerifiedStats();
  return (
    <section id="introduzione" className="scroll-mt-20 py-24 sm:py-32 lg:py-44">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:col-start-1 lg:pt-16">
          {i.eyebrow && (
            <Reveal>
              <p className="eyebrow mb-6 flex items-center gap-3 text-champagne-deep">
                <span className="h-px w-8 bg-current" aria-hidden />
                {i.eyebrow}
              </p>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h2 className="display-2">
              {lines(i.title).map((l, k) => (
                <span key={k} className={k === 1 ? "block italic text-stone" : "block"}>{l}</span>
              ))}
            </h2>
          </Reveal>
          <div className="mt-10 space-y-5 text-stone">
            {i.paragraphs.map((p, k) => (
              <Reveal key={k} delay={0.1 + k * 0.05}>
                <p className="lead">{p}</p>
              </Reveal>
            ))}
          </div>
          {stats.length > 0 && (
            <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-charcoal/10 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-5xl text-charcoal">{s.value}</span>
                    <span className="eyebrow mt-2 block text-stone">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          )}
          <Reveal delay={0.2}>
            <ButtonLink href="/chi-siamo" variant="outline-dark" className="mt-12">Scopri chi siamo</ButtonLink>
          </Reveal>
        </div>
        <div className="relative lg:col-span-6 lg:col-start-7">
          <ParallaxImage image={i.image} sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/5] w-full" />
          <div className="absolute -bottom-6 -left-6 hidden h-40 w-40 border border-champagne/50 lg:block" aria-hidden />
        </div>
      </div>
    </section>
  );
}
