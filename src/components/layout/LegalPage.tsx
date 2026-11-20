import { PageHero } from "./PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { isDemo, site } from "@/lib/content";

/**
 * Struttura configurabile per le pagine legali. Il template NON contiene testi
 * legali definitivi: vanno forniti dal titolare o dal suo consulente
 * (in site.config.ts → legal) oppure collegati a un servizio esterno.
 */
export function LegalPage({
  title, path, externalUrl, sections,
}: { title: string; path: string; externalUrl: string; sections: { title: string; body: string[] }[] }) {
  return (
    <>
      <PageHero eyebrow="Informazioni legali" title={title} crumbs={[{ href: path, label: title }]} />
      <section className="py-20 sm:py-28">
        <div className="container-x max-w-3xl">
          {externalUrl ? (
            <div>
              <p className="lead text-stone">Il documento completo è disponibile al seguente collegamento.</p>
              <ButtonLink href={externalUrl} className="mt-8">Leggi la {title}</ButtonLink>
            </div>
          ) : sections.length ? (
            <div className="space-y-12">
              {sections.map((s) => (
                <section key={s.title}>
                  <h2 className="display-3">{s.title}</h2>
                  <div className="mt-5 space-y-4 text-stone">
                    {s.body.map((p, i) => <p key={i} className="leading-relaxed">{p}</p>)}
                  </div>
                </section>
              ))}
              <p className="text-sm text-stone">Titolare: {site.company.legalName || site.company.name}{site.company.vatNumber && ` — P.IVA ${site.company.vatNumber}`}</p>
            </div>
          ) : (
            <div className="border border-champagne/50 bg-paper p-8">
              <p className="eyebrow text-champagne-deep">{isDemo ? "Anteprima" : "Documento in aggiornamento"}</p>
              <p className="lead mt-4 text-stone">
                {isDemo
                  ? "In questa anteprima il testo non è presente. Il documento definitivo verrà fornito dal titolare del sito o dal suo consulente prima della pubblicazione."
                  : "Il documento è in fase di aggiornamento. Per informazioni sul trattamento dei dati contatta il titolare tramite la pagina contatti."}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
