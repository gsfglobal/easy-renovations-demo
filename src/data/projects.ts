import type { z } from "zod";
import type { projectSchema } from "@/config/schema";

type ProjectInput = z.input<typeof projectSchema>;

/**
 * Progetti DIMOSTRATIVI per l'anteprima: nessuno è un lavoro reale di Easy Renovations.
 * Da sostituire con i lavori reali (foto autorizzate dal titolare).
 */
const pic = (slug: string, file: string, alt: string) => ({ src: `/images/demo/projects/${slug}/${file}.webp`, alt: `Immagine dimostrativa: ${alt}`, demo: true });

const demo = (slug: string, imgSlug: string, title: string, service: string, excerpt: string): ProjectInput => ({
  slug,
  title,
  service,
  city: "Napoli",
  year: null,
  excerpt,
  description: [
    "Progetto dimostrativo: questa pagina mostra come verrà presentato un lavoro reale di Easy Renovations, con foto, descrizione e dettagli dell'intervento.",
  ],
  cover: pic(imgSlug, "cover", `${title.toLowerCase()}, vista principale`),
  gallery: [pic(imgSlug, "02", `${title.toLowerCase()}, vista secondaria`), pic(imgSlug, "03", `${title.toLowerCase()}, dettaglio`)],
  details: [{ label: "Stato", value: "Esempio" }],
  beforeAfter: null,
  featured: true,
  demo: true,
});

export const projects: ProjectInput[] = [
  demo("appartamento-zona-giorno", "appartamento-chiaia", "Appartamento, zona giorno", "ristrutturazione-appartamenti", "Esempio di presentazione di una ristrutturazione chiavi in mano."),
  demo("casa-epoca-centro-storico", "villa-capri", "Casa d'epoca", "case-epoca-immobili-vincolati", "Esempio di presentazione di un intervento in un edificio storico."),
  demo("bagno-appartamento", "bagno-vomero", "Bagno con doccia a filo", "ristrutturazione-bagni", "Esempio di presentazione di un bagno rinnovato."),
  demo("casa-vacanze", "cucina-posillipo", "Casa vacanze", "case-vacanze", "Esempio di presentazione di un appartamento per affitti brevi."),
  demo("loft-soppalco", "loft-bagnoli", "Loft con soppalco", "ristrutturazione-appartamenti", "Esempio di presentazione di un loft con soppalco."),
  demo("androne-condominio", "boutique-centro", "Parti comuni di condominio", "piccoli-condomini", "Esempio di presentazione di un intervento in condominio."),
];
