import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/services/ServiceCard";
import { getServices } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ServicesGrid() {
  const services = getServices();
  if (!services.length) return null;
  // 2 o 4 servizi: griglia a due colonne; altrimenti tre colonne
  const cols = services.length === 2 || services.length === 4 ? 2 : 3;
  return (
    <section className="bg-paper py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Servizi" title={"Competenze complete,\nun unico referente."} />
          <Reveal>
            <ButtonLink href="/servizi" variant="link" className="underline">Tutti i servizi</ButtonLink>
          </Reveal>
        </div>
        <ul className={cn("mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:mt-24", cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2 lg:gap-x-16")}>
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % cols) * 0.08} className={cn(i % cols === 1 && "lg:translate-y-20", cols === 2 && i % 2 === 1 && "lg:translate-y-32")}>
              <ServiceCard service={s} index={i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
