import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { CtaQuote } from "@/components/home/CtaQuote";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Reveal } from "@/components/ui/Reveal";
import { getProject, getProjects, getServiceTitle } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: `${p.title} — ${getServiceTitle(p.service)} a ${p.city}`, description: p.excerpt, path: `/progetti/${p.slug}`, image: p.cover.src });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const all = getProjects();
  const next = all[(all.findIndex((x) => x.slug === p.slug) + 1) % all.length];
  const meta = [
    { label: "Località", value: p.city },
    { label: "Intervento", value: getServiceTitle(p.service) },
    ...(p.year ? [{ label: "Anno", value: String(p.year) }] : []),
    ...p.details,
  ];

  return (
    <>
      <PageHero
        eyebrow={getServiceTitle(p.service)}
        title={p.title}
        intro={p.excerpt}
        image={p.cover}
        crumbs={[{ href: "/progetti", label: "Progetti" }, { href: `/progetti/${p.slug}`, label: p.title }]}
      />
      <section className="py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 self-start border-t border-charcoal/15 pt-8 lg:col-span-4 lg:grid-cols-1">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="eyebrow text-stone">{m.label}</dt>
                <dd className="mt-2 font-display text-2xl">{m.value}</dd>
              </div>
            ))}
            {p.demo && <DemoBadge label="Progetto dimostrativo" className="col-span-2 w-fit lg:col-span-1" />}
          </dl>
          <div className="space-y-6 text-stone lg:col-span-7 lg:col-start-6">
            {p.description.map((d, i) => (
              <Reveal key={i} delay={i * 0.05}><p className="lead">{d}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      {p.gallery.length > 0 && (
        <section className="pb-24 sm:pb-32">
          <div className="container-x grid gap-6 md:grid-cols-12">
            {p.gallery.map((g, i) => (
              <Reveal key={g.src} delay={(i % 2) * 0.08} className={i % 3 === 0 ? "md:col-span-7" : i % 3 === 1 ? "md:col-span-5 md:mt-24" : "md:col-span-12"}>
                <figure className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image src={g.src} alt={g.alt} fill sizes="(min-width:768px) 60vw, 100vw" className="object-cover" />
                  {g.demo && <DemoBadge className="absolute bottom-3 left-3" />}
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {p.beforeAfter && (
        <section className="bg-paper py-24 sm:py-32">
          <div className="container-x">
            <Reveal><h2 className="display-3 mb-10">Prima e dopo</h2></Reveal>
            <BeforeAfterSlider before={p.beforeAfter.before} after={p.beforeAfter.after} label={p.title} />
          </div>
        </section>
      )}

      {next && next.slug !== p.slug && (
        <section className="border-t border-charcoal/10">
          <Link href={`/progetti/${next.slug}`} className="group container-x flex items-center justify-between gap-6 py-14 sm:py-20">
            <span>
              <span className="eyebrow block text-stone">Progetto successivo</span>
              <span className="mt-3 block font-display text-4xl transition-colors group-hover:text-champagne sm:text-6xl">{next.title}</span>
            </span>
            <span className="relative hidden aspect-[4/3] w-56 overflow-hidden bg-sand sm:block">
              <Image src={next.cover.src} alt="" fill sizes="224px" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
            </span>
          </Link>
        </section>
      )}
      <CtaQuote />
    </>
  );
}
