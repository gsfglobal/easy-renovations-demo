import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsappIcon } from "@/components/ui/WhatsappIcon";
import { isDemo, site } from "@/lib/content";
import { whatsappHref } from "@/lib/contact";
import { lines } from "@/lib/utils";

export function CtaQuote({ title = site.cta.title, text = site.cta.text }: { title?: string; text?: string }) {
  const wa = whatsappHref();
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 text-paper sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute -top-1/2 left-1/2 size-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--brand-champagne)_22%,transparent),transparent_60%)]" aria-hidden />
      <div className="container-x relative text-center">
        <Reveal>
          <p className="eyebrow mb-8 text-champagne">Preventivo</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display-1 mx-auto max-w-5xl">
            {lines(title).map((l, i) => (
              <span key={i} className={i === 1 ? "block italic text-paper/70" : "block"}>{l}</span>
            ))}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="lead mx-auto mt-8 max-w-xl text-paper/70">{text}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contatti" variant="accent">Richiedi un preventivo</ButtonLink>
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonClass("outline-light")}>
                <WhatsappIcon className="size-4" /> Scrivici su WhatsApp
              </a>
            ) : isDemo ? (
              <span className={buttonClass("outline-light", "cursor-not-allowed opacity-45")} aria-disabled="true" title="Numero WhatsApp non configurato">
                <WhatsappIcon className="size-4" /> Scrivici su WhatsApp
              </span>
            ) : null}
          </div>
          {!wa && isDemo && (
            <p className="mt-4 text-xs text-paper/45">WhatsApp si attiva con il numero dell&apos;impresa nella versione definitiva.</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
