import { PageHero } from "@/components/layout/PageHero";
import { Method } from "@/components/home/Method";
import { CtaQuote } from "@/components/home/CtaQuote";
import { Icon } from "@/components/ui/Icon";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { getVerifiedStats, site } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `Chi siamo — ${site.company.name}`,
  description: `${site.about.lead} ${site.company.name}, ${site.company.city}.`.slice(0, 160),
  path: "/chi-siamo",
});

export default function AboutPage() {
  const a = site.about;
  const stats = getVerifiedStats();
  return (
    <>
      <PageHero eyebrow={site.company.tagline} title={a.title} intro={a.lead} image={a.image} crumbs={[{ href: "/chi-siamo", label: "Chi siamo" }]} />
      <section className="py-24 sm:py-32 lg:py-40">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <ParallaxImage image={site.intro.image} sizes="(min-width:1024px) 45vw, 100vw" className="aspect-[4/5]" />
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-20">
            <Reveal>
              <h2 className="display-3">{a.lead}</h2>
            </Reveal>
            <div className="mt-10 space-y-6 text-stone">
              {a.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.05 * i}><p className="lead">{p}</p></Reveal>
              ))}
            </div>
            {stats.length > 0 && (
              <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-charcoal/10 pt-8">
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col-reverse">
                    <dt className="eyebrow mt-2 text-stone">{s.label}</dt>
                    <dd className="font-display text-5xl">{s.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </section>
      {a.values.length > 0 && (
        <section className="bg-paper py-24 sm:py-32">
          <div className="container-x">
            <ul className="grid gap-12 md:grid-cols-3 md:gap-8">
              {a.values.map((v, i) => (
                <Reveal as="li" key={v.title} delay={i * 0.08} className="border-t border-charcoal/15 pt-8">
                  <Icon name={v.icon} className="size-8 text-champagne" />
                  <h3 className="mt-6 font-display text-3xl">{v.title}</h3>
                  <p className="mt-3 text-stone">{v.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}
      <Method />
      <CtaQuote />
    </>
  );
}
