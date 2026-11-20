import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Plus } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CtaQuote } from "@/components/home/CtaQuote";
import { Method } from "@/components/home/Method";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Reveal } from "@/components/ui/Reveal";
import { getProjects, getService, getServices, getServiceTitle, isDemo, site } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMetadata({ title: s.seo.title, description: s.seo.description, path: `/servizi/${s.slug}`, image: s.image.src });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const related = getProjects().filter((p) => p.service === s.slug).slice(0, 2);
  const faqJsonLd =
    !isDemo && s.faqs.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
        }
      : null;

  return (
    <>
      <PageHero
        eyebrow={`${site.company.serviceAreas[0]} · Servizi`}
        title={s.heroTitle}
        intro={s.excerpt}
        image={s.image}
        crumbs={[{ href: "/servizi", label: "Servizi" }, { href: `/servizi/${s.slug}`, label: s.shortTitle }]}
      />

      <section className="py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal><h2 className="display-3">Il servizio</h2></Reveal>
            <div className="mt-8 space-y-6 text-stone">
              {s.description.map((p, i) => (
                <Reveal key={i} delay={0.05 * i}><p className="lead">{p}</p></Reveal>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border border-charcoal/10 bg-paper p-8 lg:sticky lg:top-28">
              <p className="eyebrow text-champagne-deep">Zone servite</p>
              <p className="mt-3 font-display text-2xl">{site.company.serviceAreas.join(" · ")}</p>
              <p className="mt-6 text-sm text-stone">Raccontaci il tuo progetto: organizzeremo un sopralluogo per valutarlo insieme.</p>
              <ButtonLink href={`/contatti?servizio=${s.slug}`} className="mt-8 w-full">Richiedi un preventivo</ButtonLink>
            </div>
          </aside>
        </div>
      </section>

      {s.gallery.length > 0 && (
        <section className="pb-24 sm:pb-32">
          <div className="container-x grid gap-6 md:grid-cols-2">
            {s.gallery.map((g, i) => (
              <Reveal key={g.src} delay={i * 0.08} className={s.gallery.length === 1 ? "md:col-span-2" : ""}>
                <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                  <Image src={g.src} alt={g.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
                  {g.demo && <DemoBadge className="absolute bottom-3 left-3" />}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {s.benefits.length > 0 && (
        <section className="bg-charcoal py-24 text-paper sm:py-32">
          <div className="container-x">
            <Reveal><h2 className="display-2 max-w-2xl">Perché sceglierci per questo intervento</h2></Reveal>
            <ul className="mt-16 grid gap-10 md:grid-cols-3">
              {s.benefits.map((b, i) => (
                <Reveal as="li" key={b.title} delay={i * 0.08} className="border-t border-paper/15 pt-8">
                  <span className="font-display text-4xl text-champagne">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 font-display text-2xl">{b.title}</h3>
                  <p className="mt-3 text-paper/65">{b.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Method tone="ivory" />

      {s.faqs.length > 0 && (
        <section className="bg-paper py-24 sm:py-32">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4"><h2 className="display-2">Domande frequenti</h2></Reveal>
            <div className="lg:col-span-7 lg:col-start-6">
              {s.faqs.map((f) => (
                <details key={f.question} className="group border-b border-charcoal/10 py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-2xl">
                    {f.question}
                    <Plus className="size-5 shrink-0 text-champagne transition-transform duration-500 group-open:rotate-45" strokeWidth={1.25} aria-hidden />
                  </summary>
                  <p className="mt-4 max-w-2xl text-stone">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="py-24 sm:py-32">
          <div className="container-x">
            <Reveal><h2 className="display-3">Progetti correlati</h2></Reveal>
            <ul className="mt-12 grid gap-12 md:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug}><ProjectCard project={p} category={getServiceTitle(p.service)} /></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaQuote />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />}
    </>
  );
}
