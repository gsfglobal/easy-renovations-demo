import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getBeforeAfterItems, site } from "@/lib/content";

/** In produzione mostra solo confronti autentici; senza dati la sezione non appare. */
export function BeforeAfterSection() {
  const items = getBeforeAfterItems();
  if (!items.length) return null;
  return (
    <section className="py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <SectionHeading eyebrow="Trasformazioni" title={site.beforeAfter.title} intro={site.beforeAfter.intro} />
        <div className="mt-14 space-y-16 lg:mt-20">
          {items.map((item) => (
            <Reveal key={item.label}>
              <figure>
                <BeforeAfterSlider before={item.before} after={item.after} label={item.label} />
                <figcaption className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-display text-2xl">{item.label}</span>
                  <span className="flex flex-col gap-2 text-sm text-stone sm:items-end">
                    {item.demo && <DemoBadge label="Esempio dimostrativo" className="w-fit" />}
                    {item.caption}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
