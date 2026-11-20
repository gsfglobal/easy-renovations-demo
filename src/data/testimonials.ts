import type { z } from "zod";
import type { testimonialSchema } from "@/config/schema";

/**
 * Estratti di recensioni pubbliche da Google Maps (verificate il 20/11/2026).
 * Nomi non mostrati finché i clienti non autorizzano (authorized: false → "Cliente privato").
 * Gli estratti omettono il nome "Edil Cirillo" citato in alcune recensioni: confermare con l'impresa.
 * Data: Google indica "un anno fa" / "2 anni fa", quindi la data precisa non è riportata.
 */
const source = { name: "Google", url: "https://maps.google.com/?cid=2733615356743733555" };

export const testimonials: z.input<typeof testimonialSchema>[] = [
  {
    author: "Serena P.",
    authorized: false,
    text: "Ho affidato a questa impresa i lavori di ristrutturazione del mio appartamento e poi di una casa vacanze, non potevo fare scelta migliore. Professionali, puntuali e sempre disponibili a chiarire ogni dubbio. Il risultato finale è stato impeccabile, curato nei dettagli e consegnato nei tempi stabiliti.",
    date: "",
    rating: 5,
    source,
  },
  {
    author: "Titti M., architetto",
    authorized: false,
    text: "La sfida principale di questo progetto era rispettare rigorosamente le normative della Soprintendenza, preservando al contempo l'integrità storica dell'unità immobiliare. […] Ogni intervento è stato eseguito con una precisione artigianale.",
    date: "",
    rating: 5,
    source,
  },
  {
    author: "Filomena M.",
    authorized: false,
    text: "Abbiamo ristrutturato casa dalla A alla Z. La ditta oltre ad eseguire le lavorazioni previste, ci ha anche guidati nella scelta di soluzioni più adatte alle nostre esigenze, essendo casa nostra molto piccola e di origine storica.",
    date: "",
    rating: 5,
    source,
  },
  {
    author: "Adelaide E.",
    authorized: false,
    text: "Seri e competenti gli operai hanno completato i lavori rispettando i tempi di consegna. […] Consiglio vivamente questa ditta.",
    date: "",
    rating: 5,
    source,
  },
];
