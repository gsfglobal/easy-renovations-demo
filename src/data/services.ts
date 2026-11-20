import type { z } from "zod";
import type { serviceSchema } from "@/config/schema";

type ServiceInput = z.input<typeof serviceSchema>;

/**
 * Servizi di Easy Renovations ricavati da recensioni e foto della scheda Google
 * (ristrutturazioni complete di appartamenti, case d'epoca e immobili vincolati,
 * bagni, case vacanze, lavori in piccoli condomini).
 * contentReviewed: false → da confermare con l'impresa prima della produzione.
 */
const img = (file: string, alt: string) => ({ src: `/images/foto/${file}.webp`, alt: `Foto d'archivio: ${alt}`, demo: true });

export const services: ServiceInput[] = [
  {
    slug: "ristrutturazione-appartamenti",
    title: "Ristrutturazione appartamenti chiavi in mano",
    shortTitle: "Appartamenti",
    excerpt: "Ristrutturiamo casa dalla A alla Z: demolizioni, impianti, bagni, pavimenti e finiture, con un solo coordinamento.",
    heroTitle: "Ristrutturazione di appartamenti a Napoli, chiavi in mano",
    description: [
      "Seguiamo la ristrutturazione completa dell'appartamento: demolizioni, rifacimento degli impianti, bagni, pavimenti, rivestimenti, pitture e finiture.",
      "Un unico riferimento coordina squadre, forniture e tempistiche, e ti guida nella scelta delle soluzioni più adatte, anche quando la casa è piccola e ogni metro conta.",
    ],
    image: img("appartamenti", "soggiorno ristrutturato con divano e tende"),
    gallery: [img("appartamenti-2", "soggiorno open space con angolo pranzo")],
    benefits: [
      { title: "Dalla A alla Z", text: "Dalle demolizioni alle finiture, senza dover coordinare ditte diverse." },
      { title: "Scelte guidate", text: "Ti aiutiamo a scegliere soluzioni e materiali adatti alla tua casa." },
      { title: "Tempi rispettati", text: "Cronoprogramma condiviso e consegna nei tempi concordati." },
    ],
    faqs: [
      { question: "Fate anche lavori parziali?", answer: "Sì: possiamo intervenire su singoli ambienti o singole lavorazioni. Lo valutiamo insieme al sopralluogo." },
      { question: "Come si richiede un preventivo?", answer: "Chiamaci o scrivici su WhatsApp: fissiamo un sopralluogo e poi ti presentiamo un preventivo dettagliato." },
    ],
    seo: {
      title: "Ristrutturazione appartamenti chiavi in mano a Napoli",
      description: "Ristrutturazione completa di appartamenti a Napoli: impianti, bagni, pavimenti e finiture con un unico coordinamento. Easy Renovations.",
    },
    enabled: true,
    contentReviewed: false,
  },
  {
    slug: "case-epoca-immobili-vincolati",
    title: "Case d'epoca e immobili vincolati",
    shortTitle: "Case d'epoca",
    excerpt: "Ristrutturazioni in edifici storici e immobili sottoposti a vincolo, nel rispetto dei dettagli originali.",
    heroTitle: "Ristrutturazione di case d'epoca e immobili vincolati a Napoli",
    description: [
      "Napoli è fatta di palazzi storici, volte, soffitti decorati e pavimenti d'epoca. Ristrutturiamo questi spazi con un approccio attento, che preserva l'identità dell'immobile e la rende più comoda da vivere.",
      "Lavoriamo a fianco dell'architetto e del committente anche su immobili sottoposti a vincolo della Soprintendenza, con precisione artigianale e rispetto delle tecniche costruttive tradizionali.",
    ],
    image: img("epoca", "stanza d'epoca con soffitti alti"),
    gallery: [img("epoca-2", "scalone storico con ringhiera in ferro battuto")],
    benefits: [
      { title: "Rispetto del contesto storico", text: "Interventi pensati per preservare il carattere dell'edificio." },
      { title: "Al fianco dell'architetto", text: "Collaborazione stretta con il progettista e la direzione lavori." },
      { title: "Precisione artigianale", text: "Cura dei dettagli e tecniche costruttive tradizionali." },
    ],
    faqs: [
      { question: "Lavorate su immobili vincolati?", answer: "Sì, anche in collaborazione con il tecnico che segue le autorizzazioni. Le pratiche e il progetto restano a cura del professionista incaricato." },
      { question: "Collaborate con il mio architetto?", answer: "Volentieri: molti nostri lavori nascono proprio dalla collaborazione con architetti e studi tecnici." },
    ],
    seo: {
      title: "Ristrutturazione case d'epoca e immobili vincolati a Napoli",
      description: "Ristrutturazioni in edifici storici e immobili vincolati a Napoli, in collaborazione con architetti. Easy Renovations, Corso Vittorio Emanuele.",
    },
    enabled: true,
    contentReviewed: false,
  },
  {
    slug: "ristrutturazione-bagni",
    title: "Ristrutturazione bagni",
    shortTitle: "Bagni",
    excerpt: "Bagni rinnovati da zero: impianti, rivestimenti, docce a filo pavimento e sanitari sospesi.",
    heroTitle: "Ristrutturazione bagni a Napoli",
    description: [
      "Rifacciamo il bagno completamente: rimozione dei vecchi rivestimenti, impianti idrici e di scarico, massetti, rivestimenti, sanitari e rubinetterie.",
      "Studiamo la distribuzione anche nei bagni piccoli, con docce a filo pavimento, sanitari sospesi e soluzioni salvaspazio.",
    ],
    image: img("bagni", "bagno con lavabo sospeso e doccia"),
    gallery: [img("bagni-2", "bagno in marmo con doccia in cristallo")],
    benefits: [
      { title: "Impianti rifatti", text: "Adduzioni e scarichi nuovi dove necessario." },
      { title: "Spazio ottimizzato", text: "Soluzioni pensate anche per bagni piccoli o ciechi." },
      { title: "Finiture curate", text: "Posa precisa di rivestimenti e sanitari." },
    ],
    faqs: [
      { question: "Quanto dura la ristrutturazione di un bagno?", answer: "Dipende dalle lavorazioni: dopo il sopralluogo ti indichiamo i tempi nel preventivo." },
    ],
    seo: {
      title: "Ristrutturazione bagni a Napoli",
      description: "Ristrutturazione completa del bagno a Napoli: impianti, rivestimenti, docce a filo pavimento e sanitari sospesi. Easy Renovations.",
    },
    enabled: true,
    contentReviewed: false,
  },
  {
    slug: "case-vacanze",
    title: "Case vacanze e affitti brevi",
    shortTitle: "Case vacanze",
    excerpt: "Appartamenti pronti per ospitare: spazi funzionali, finiture resistenti e tempi certi per partire con la stagione.",
    heroTitle: "Ristrutturazione di case vacanze e affitti brevi a Napoli",
    description: [
      "Rinnoviamo appartamenti destinati a casa vacanze e affitti brevi: distribuzione degli spazi, bagni, impianti e finiture pensate per l'uso intensivo.",
      "Rispettare la data di consegna è fondamentale per chi affitta: per questo pianifichiamo il cantiere e coordiniamo ogni lavorazione per arrivare pronti.",
    ],
    image: img("vacanze", "monolocale con cucina e zona giorno"),
    gallery: [img("vacanze-2", "cucina moderna con tavolo in vetro")],
    benefits: [
      { title: "Tempi certi", text: "Cantiere pianificato per non perdere la stagione." },
      { title: "Spazi funzionali", text: "Ogni metro sfruttato per accogliere gli ospiti." },
      { title: "Finiture resistenti", text: "Materiali scelti per durare con un uso intenso." },
    ],
    faqs: [],
    seo: {
      title: "Ristrutturazione case vacanze e affitti brevi a Napoli",
      description: "Ristrutturazione di appartamenti per casa vacanze e affitti brevi a Napoli, con tempi certi e finiture resistenti. Easy Renovations.",
    },
    enabled: true,
    contentReviewed: false,
  },
  {
    slug: "piccoli-condomini",
    title: "Lavori in piccoli condomini",
    shortTitle: "Condomini",
    excerpt: "Interventi sulle parti comuni di piccoli condomini, con un cantiere ordinato e un riferimento unico.",
    heroTitle: "Lavori in piccoli condomini a Napoli",
    description: [
      "Eseguiamo lavori nelle parti comuni di piccoli condomini: androni, scale, finiture e manutenzioni.",
      "Organizziamo il cantiere per limitare i disagi ai residenti e teniamo aggiornati amministratore e tecnici sull'avanzamento.",
    ],
    image: img("condomini", "vano scala condominiale con ringhiera"),
    gallery: [img("condomini-2", "facciata di un palazzo storico")],
    benefits: [
      { title: "Cantiere ordinato", text: "Meno disagi per chi abita nel palazzo." },
      { title: "Un solo riferimento", text: "Per amministratore, tecnici e condòmini." },
      { title: "Aggiornamenti costanti", text: "Sai sempre a che punto sono i lavori." },
    ],
    faqs: [],
    seo: {
      title: "Lavori in piccoli condomini a Napoli",
      description: "Lavori sulle parti comuni di piccoli condomini a Napoli, con cantiere ordinato e riferimento unico per l'amministratore. Easy Renovations.",
    },
    enabled: true,
    contentReviewed: false,
  },
];
