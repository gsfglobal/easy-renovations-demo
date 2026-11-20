"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { WhatsappIcon } from "@/components/ui/WhatsappIcon";
import { isLeadChannelReady, submitQuoteRequest, type QuoteRequest } from "@/lib/leads";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<keyof QuoteRequest, string>>;

function validate(d: QuoteRequest): Errors {
  const e: Errors = {};
  if (d.name.trim().length < 2) e.name = "Inserisci nome e cognome.";
  if (!/^\+?[\d\s().-]{8,20}$/.test(d.phone.trim())) e.phone = "Inserisci un numero di telefono valido.";
  if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = "Indirizzo email non valido.";
  if (d.city.trim().length < 2) e.city = "Indica la città dell'intervento.";
  if (!d.serviceType) e.serviceType = "Seleziona il tipo di intervento.";
  if (!d.privacyAccepted) e.privacyAccepted = "Per inviare la richiesta è necessario accettare l'informativa.";
  return e;
}

export function QuoteForm({ services, adapter, isDemo }: { services: { slug: string; title: string }[]; adapter: "whatsapp" | "endpoint"; isDemo: boolean }) {
  const params = useSearchParams();
  const preset = services.find((s) => s.slug === params.get("servizio"))?.title ?? "";
  const ready = isLeadChannelReady();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ kind: "idle" | "ok" | "error"; message?: string }>({ kind: "idle" });
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const data: QuoteRequest = {
      name: String(f.get("name") ?? ""),
      phone: String(f.get("phone") ?? ""),
      email: String(f.get("email") ?? ""),
      city: String(f.get("city") ?? ""),
      serviceType: String(f.get("serviceType") ?? ""),
      message: String(f.get("message") ?? ""),
      privacyAccepted: f.get("privacy") === "on",
    };
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first === "privacyAccepted" ? "privacy" : first}"]`)?.focus();
      return;
    }
    setPending(true);
    const res = await submitQuoteRequest(data);
    setPending(false);
    if (!res.ok) return setStatus({ kind: "error", message: res.message });
    if (res.kind === "redirect") {
      window.open(res.url, "_blank", "noopener,noreferrer");
      setStatus({ kind: "ok", message: "Si è aperto WhatsApp con il messaggio già compilato: premi invia per completare la richiesta." });
    } else {
      setStatus({ kind: "ok", message: "Richiesta inviata. Ti ricontatteremo al più presto." });
      e.currentTarget.reset();
    }
  }

  const field = "peer w-full border-0 border-b border-charcoal/20 bg-transparent px-0 pt-6 pb-2.5 text-base text-charcoal outline-none transition-colors placeholder:text-transparent focus:border-champagne focus:ring-0 aria-[invalid=true]:border-red-700";
  const label = "pointer-events-none absolute top-0 left-0 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-stone";
  const err = (k: keyof QuoteRequest) =>
    errors[k] ? <p id={`${k}-error`} className="mt-2 text-sm text-red-700">{errors[k]}</p> : null;
  const aria = (k: keyof QuoteRequest) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-error` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8 sm:grid-cols-2">
      <div className="relative">
        <label htmlFor="name" className={label}>Nome e cognome *</label>
        <input id="name" name="name" autoComplete="name" required className={field} {...aria("name")} />
        {err("name")}
      </div>
      <div className="relative">
        <label htmlFor="phone" className={label}>Telefono *</label>
        <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={field} {...aria("phone")} />
        {err("phone")}
      </div>
      <div className="relative">
        <label htmlFor="email" className={label}>Email</label>
        <input id="email" name="email" type="email" autoComplete="email" className={field} {...aria("email")} />
        {err("email")}
      </div>
      <div className="relative">
        <label htmlFor="city" className={label}>Città dell&apos;intervento *</label>
        <input id="city" name="city" autoComplete="address-level2" required className={field} {...aria("city")} />
        {err("city")}
      </div>
      <div className="relative sm:col-span-2">
        <label htmlFor="serviceType" className={label}>Tipo di ristrutturazione *</label>
        <select id="serviceType" name="serviceType" defaultValue={preset} required className={cn(field, "appearance-none")} {...aria("serviceType")}>
          <option value="" disabled>Seleziona…</option>
          {services.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
          <option value="Altro">Altro</option>
        </select>
        {err("serviceType")}
      </div>
      <div className="relative sm:col-span-2">
        <label htmlFor="message" className={label}>Messaggio</label>
        <textarea id="message" name="message" rows={4} className={cn(field, "resize-y")} placeholder="Descrivi brevemente l'intervento" />
      </div>
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm text-stone">
          <input type="checkbox" name="privacy" className="mt-0.5 size-5 shrink-0 accent-[var(--brand-champagne)]" {...aria("privacyAccepted")} />
          <span>
            Ho letto l&apos;<Link href="/privacy-policy" className="underline underline-offset-4 hover:text-champagne" target="_blank">informativa privacy</Link> e acconsento
            al trattamento dei dati per ricevere una risposta alla mia richiesta. *
          </span>
        </label>
        {err("privacyAccepted")}
      </div>

      <div className="sm:col-span-2">
        <button type="submit" disabled={!ready || pending} className={buttonClass("primary", "w-full sm:w-auto")}>
          {adapter === "whatsapp" && <WhatsappIcon className="size-4" />}
          {pending ? "Invio…" : adapter === "whatsapp" ? "Invia richiesta su WhatsApp" : "Invia richiesta"}
        </button>
        {!ready && (
          <p className="mt-4 flex items-start gap-2 text-sm text-stone" role="note">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-champagne" aria-hidden />
            {isDemo
              ? "Anteprima: l'invio si attiva quando viene configurato il numero WhatsApp dell'impresa."
              : "Invio temporaneamente non disponibile. Contattaci telefonicamente o via email."}
          </p>
        )}
        {adapter === "whatsapp" && ready && (
          <p className="mt-4 text-xs text-stone">Il modulo apre WhatsApp con il messaggio precompilato: i dati non vengono salvati dal sito.</p>
        )}
        <div aria-live="polite" className="mt-4">
          {status.kind === "ok" && (
            <p className="flex items-start gap-2 text-sm text-charcoal"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-champagne" aria-hidden />{status.message}</p>
          )}
          {status.kind === "error" && (
            <p className="flex items-start gap-2 text-sm text-red-700"><AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />{status.message}</p>
          )}
        </div>
      </div>
    </form>
  );
}
