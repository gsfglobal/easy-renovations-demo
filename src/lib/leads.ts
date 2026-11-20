import { site } from "./content";
import { whatsappHref } from "./contact";

/**
 * Adattatore per l'invio delle richieste di preventivo.
 *
 * - "whatsapp" (template base): compone un messaggio precompilato e apre WhatsApp.
 *   Nessun dato viene salvato dal sito.
 * - "endpoint": predisposizione per un backend email/CRM futuro. Invia un POST JSON
 *   a `leads.endpointUrl`. Finché l'endpoint non è configurato il form NON finge l'invio.
 */
export type QuoteRequest = {
  name: string;
  phone: string;
  email: string;
  city: string;
  serviceType: string;
  message: string;
  privacyAccepted: boolean;
};

export type LeadResult =
  | { ok: true; kind: "redirect"; url: string }
  | { ok: true; kind: "sent" }
  | { ok: false; reason: "not-configured" | "network" | "rejected"; message: string };

export function buildWhatsappMessage(r: QuoteRequest) {
  return [
    `Buongiorno ${site.company.name}, vorrei richiedere un preventivo.`,
    "",
    `• Nome: ${r.name}`,
    `• Telefono: ${r.phone}`,
    r.email ? `• Email: ${r.email}` : null,
    `• Città dell'intervento: ${r.city}`,
    `• Tipo di intervento: ${r.serviceType}`,
    r.message ? `• Messaggio: ${r.message}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

export function isLeadChannelReady(): boolean {
  if (site.leads.adapter === "endpoint") return !!site.leads.endpointUrl;
  return !!whatsappHref();
}

export async function submitQuoteRequest(r: QuoteRequest): Promise<LeadResult> {
  if (site.leads.adapter === "endpoint") {
    if (!site.leads.endpointUrl) {
      return { ok: false, reason: "not-configured", message: "L'invio online non è ancora configurato." };
    }
    try {
      const res = await fetch(site.leads.endpointUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...r, source: "website", company: site.company.name }),
      });
      if (!res.ok) return { ok: false, reason: "rejected", message: "La richiesta non è stata accettata dal server." };
      return { ok: true, kind: "sent" };
    } catch {
      return { ok: false, reason: "network", message: "Connessione non riuscita. Riprova o contattaci su WhatsApp." };
    }
  }
  const url = whatsappHref(buildWhatsappMessage(r));
  if (!url) {
    return { ok: false, reason: "not-configured", message: "Il numero WhatsApp dell'impresa non è ancora configurato." };
  }
  return { ok: true, kind: "redirect", url };
}
