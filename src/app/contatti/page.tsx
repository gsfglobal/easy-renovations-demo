import { Suspense } from "react";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { QuoteForm } from "@/components/contact/QuoteForm";
import { WhatsappIcon } from "@/components/ui/WhatsappIcon";
import { getServices, isDemo, site } from "@/lib/content";
import { emailHref, formattedAddress, phoneHref, whatsappHref } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `Contatti e preventivi — ${site.company.name}`,
  description: `Richiedi un preventivo per la tua ristrutturazione a ${site.company.serviceAreas.join(", ")}. ${site.company.name}.`,
  path: "/contatti",
});

export default function ContactPage() {
  const wa = whatsappHref();
  const address = formattedAddress();
  const services = getServices().map((s) => ({ slug: s.slug, title: s.title }));
  const items = [
    phoneHref && { icon: <Phone className="size-5" strokeWidth={1.25} />, label: "Telefono", value: site.contact.phone, href: phoneHref },
    wa && { icon: <WhatsappIcon className="size-5" />, label: "WhatsApp", value: "Scrivici su WhatsApp", href: wa },
    emailHref && { icon: <Mail className="size-5" strokeWidth={1.25} />, label: "Email", value: site.contact.email, href: emailHref },
    address && { icon: <MapPin className="size-5" strokeWidth={1.25} />, label: "Indirizzo", value: address, href: site.contact.mapsUrl || null },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string; href: string | null }[];

  return (
    <>
      <PageHero
        eyebrow="Contatti"
        title={"Raccontaci\nil tuo progetto."}
        intro="Compila il modulo: ti ricontatteremo per approfondire la richiesta e fissare un sopralluogo."
        crumbs={[{ href: "/contatti", label: "Contatti" }]}
      />
      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
          {site.features.quoteForm && (
            <div className="lg:col-span-7">
              <h2 className="display-3 mb-12">Richiedi un preventivo</h2>
              <Suspense fallback={null}>
                <QuoteForm services={services} adapter={site.leads.adapter} isDemo={isDemo} />
              </Suspense>
            </div>
          )}
          <aside className={site.features.quoteForm ? "lg:col-span-4 lg:col-start-9" : "lg:col-span-8"}>
            <div className="bg-charcoal p-8 text-paper sm:p-10 lg:sticky lg:top-28">
              <p className="eyebrow text-champagne">{site.company.name}</p>
              <ul className="mt-8 space-y-7">
                {items.map((it) => (
                  <li key={it.label} className="flex gap-4">
                    <span className="mt-1 text-champagne" aria-hidden>{it.icon}</span>
                    <span>
                      <span className="block text-[0.68rem] uppercase tracking-[0.2em] text-paper/50">{it.label}</span>
                      {it.href ? (
                        <a href={it.href} {...(it.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="mt-1 block text-lg hover:text-champagne">{it.value}</a>
                      ) : (
                        <span className="mt-1 block text-lg">{it.value}</span>
                      )}
                    </span>
                  </li>
                ))}
                {site.contact.openingHours.length > 0 && (
                  <li className="flex gap-4">
                    <Clock className="mt-1 size-5 text-champagne" strokeWidth={1.25} aria-hidden />
                    <span>
                      <span className="block text-[0.68rem] uppercase tracking-[0.2em] text-paper/50">Orari</span>
                      {site.contact.openingHours.map((h) => <span key={h} className="mt-1 block">{h}</span>)}
                    </span>
                  </li>
                )}
                {items.length === 0 && (
                  <li className="text-paper/60">{isDemo ? "Telefono, WhatsApp, email e indirizzo compariranno qui nella versione definitiva." : "Utilizza il modulo per contattarci."}</li>
                )}
              </ul>
              <div className="mt-10 border-t border-paper/10 pt-6">
                <span className="block text-[0.68rem] uppercase tracking-[0.2em] text-paper/50">Zone servite</span>
                <p className="mt-2 font-display text-2xl">{site.company.serviceAreas.join(" · ")}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
