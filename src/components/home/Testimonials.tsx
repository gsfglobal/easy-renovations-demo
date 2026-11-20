import { Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTestimonials, site } from "@/lib/content";

const fmt = (d: string) => {
  if (!d) return "";
  const [y, m] = d.split("-");
  return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString("it-IT", { month: "long", year: "numeric" });
};

/** Solo recensioni reali con fonte verificabile. Senza dati la sezione non viene renderizzata. */
export function Testimonials() {
  const list = getTestimonials();
  if (!list.length) return null;
  return (
    <section className="py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Recensioni" title="Cosa dicono i nostri clienti" />
          {site.reviewsSummary && (
            <Reveal>
              <a href={site.reviewsSummary.url} target="_blank" rel="noopener noreferrer" className="group flex items-baseline gap-4">
                <span className="font-display text-6xl leading-none">{site.reviewsSummary.rating.toLocaleString("it-IT")}</span>
                <span className="text-sm text-stone">
                  <span className="block tracking-[0.3em] text-champagne-deep" aria-hidden>★★★★★</span>
                  <span className="underline-offset-4 group-hover:underline">
                    {site.reviewsSummary.count} recensioni su {site.reviewsSummary.sourceName}
                  </span>
                  <span className="block text-xs">
                    aggiornato al {new Date(site.reviewsSummary.checkedAt).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                </span>
              </a>
            </Reveal>
          )}
        </div>
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((t, i) => (
            <Reveal as="li" key={i} delay={(i % 3) * 0.08} className="flex flex-col border border-charcoal/10 bg-paper p-8 lg:p-10">
              <Quote className="size-7 text-champagne" strokeWidth={1} aria-hidden />
              {t.rating && (
                <p className="mt-6 text-sm tracking-[0.3em] text-champagne-deep" aria-label={`Valutazione ${t.rating} su 5`}>
                  {"★".repeat(Math.round(t.rating))}
                </p>
              )}
              <blockquote className="mt-4 flex-1 font-display text-xl leading-snug">“{t.text}”</blockquote>
              <footer className="mt-8 border-t border-charcoal/10 pt-5 text-sm">
                <p className="font-semibold">{t.authorized ? t.author : "Cliente privato"}</p>
                <p className="mt-1 text-stone">
                  {fmt(t.date)}
                  {t.date && " · "}
                  <a href={t.source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-champagne">
                    Fonte: {t.source.name}
                  </a>
                </p>
              </footer>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
