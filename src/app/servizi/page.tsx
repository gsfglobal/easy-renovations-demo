import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { CtaQuote } from "@/components/home/CtaQuote";
import { ButtonLink } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Reveal } from "@/components/ui/Reveal";
import { getServices, site } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: `Servizi di ristrutturazione a ${site.company.city}`,
  description: `Servizi di ${site.company.name}: ${getServices().map((s) => s.shortTitle.toLowerCase()).join(", ")}. Zone servite: ${site.company.serviceAreas.join(", ")}.`.slice(0, 160),
  path: "/servizi",
});

export default function ServicesPage() {
  const services = getServices();
  return (
    <>
      <PageHero
        eyebrow="Servizi"
        title={"Ogni intervento,\nseguito come un progetto."}
        intro={`Dalla singola lavorazione alla ristrutturazione completa a ${site.company.serviceAreas.join(", ")}.`}
        image={services[0]?.image}
        crumbs={[{ href: "/servizi", label: "Servizi" }]}
      />
      <section className="py-24 sm:py-32">
        <div className="container-x space-y-24 lg:space-y-36">
          {services.map((s, i) => (
            <article key={s.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
              <Reveal className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-2 lg:col-start-6")}>
                <Link href={`/servizi/${s.slug}`} className="group relative block aspect-[3/2] overflow-hidden bg-sand" tabIndex={-1} aria-hidden>
                  <Image src={s.image.src} alt="" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover transition-transform duration-[1400ms] ease-(--ease-luxe) group-hover:scale-105" />
                  {s.image.demo && <DemoBadge className="absolute bottom-3 left-3" />}
                </Link>
              </Reveal>
              <Reveal delay={0.1} className={cn("lg:col-span-4", i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-9")}>
                <p className="font-display text-5xl text-champagne/80">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="display-3 mt-4">{s.title}</h2>
                <p className="lead mt-5 text-stone">{s.excerpt}</p>
                <ButtonLink href={`/servizi/${s.slug}`} variant="outline-dark" className="mt-8">Scopri il servizio</ButtonLink>
              </Reveal>
            </article>
          ))}
        </div>
      </section>
      <CtaQuote />
    </>
  );
}
