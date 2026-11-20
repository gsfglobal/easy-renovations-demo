import type { SiteConfigInput } from "./schema";

/**
 * ============================================================
 *  CLIENTE: EASY RENOVATIONS S.R.L.S — Napoli
 *  Fonte dati: scheda Google Maps pubblica (verificata il 20/11/2026)
 *  https://maps.google.com/?cid=2733615356743733555
 *
 *  Stato: DEMO (anteprima da mostrare al titolare prima dell'acquisto).
 *  Nota: diverse recensioni citano "Edil Cirillo" e il "sig. Cirillo":
 *  confermare il legame con il marchio prima della produzione.
 * ============================================================
 */
export const siteConfig = {
  mode: "demo",
  siteUrl: "https://easy-renovations-demo.vercel.app",
  locale: "it_IT",

  company: {
    name: "Easy Renovations",
    legalName: "EASY RENOVATIONS S.R.L.S",
    tagline: "Ristrutturazioni d'interni a Napoli",
    description:
      "Impresa di ristrutturazioni a Napoli, in Corso Vittorio Emanuele: appartamenti chiavi in mano, case d'epoca e immobili vincolati, bagni, case vacanze e lavori in piccoli condomini, anche in collaborazione con architetti.",
    city: "Napoli",
    province: "NA",
    region: "Campania",
    serviceAreas: ["Napoli", "Provincia di Napoli"],
    vatNumber: "",
    stats: { verified: false, yearsExperience: null, projectsCompleted: null },
  },

  contact: {
    phone: "+39 393 037 8006",
    // Stesso cellulare della scheda Google: confermare che è attivo su WhatsApp.
    whatsapp: "+39 393 037 8006",
    whatsappDefaultMessage: "Buongiorno, vorrei informazioni per ristrutturare casa.",
    email: "",
    address: { street: "Corso Vittorio Emanuele, 641", postalCode: "80121", city: "Napoli", province: "NA", country: "IT" },
    // Gli orari della scheda Google non sono attendibili (24 ore su 24): da confermare con l'impresa.
    openingHours: ["Su appuntamento", "Chiamaci o scrivici su WhatsApp per fissare un sopralluogo"],
    mapsUrl: "https://maps.google.com/?cid=2733615356743733555",
  },

  branding: {
    logo: "",
    logoLight: "",
    favicon: "",
    primaryColor: "#152230",
    accentColor: "#9DBBCF",
    backgroundColor: "#F3F1EC",
    mutedColor: "#66707A",
  },

  hero: {
    eyebrow: "Ristrutturazioni d'interni · Napoli",
    title: "La storia resta.",
    subtitle: "La casa rinasce.",
    description:
      "Appartamenti, case d'epoca e immobili vincolati a Napoli: ristrutturazioni chiavi in mano, con un coordinamento unico del cantiere e consegna nei tempi concordati.",
    image: { src: "/images/demo/hero/hero.webp", alt: "Immagine dimostrativa: interno con archi e luce calda", demo: true },
    imageMobile: { src: "/images/demo/hero/hero-mobile.webp", alt: "Immagine dimostrativa: interno con archi e luce calda", demo: true },
    video: "",
    ctaPrimary: "Richiedi un sopralluogo",
    ctaSecondary: "Guarda i lavori",
  },

  intro: {
    eyebrow: "Easy Renovations",
    title: "Case piccole, case d'epoca,\ncase da reinventare.",
    paragraphs: [
      "Ristrutturiamo appartamenti dalla A alla Z: demolizioni, impianti, bagni, pavimenti e finiture, con un unico riferimento che coordina squadre e tempi.",
      "Negli edifici storici lavoriamo nel rispetto dei vincoli e dei dettagli originali, a fianco dell'architetto e del committente.",
    ],
    image: { src: "/images/demo/intro/intro.webp", alt: "Immagine dimostrativa: soggiorno luminoso con panca in pietra", demo: true },
  },

  about: {
    title: "Chi siamo",
    lead: "Un'impresa napoletana di ristrutturazioni che unisce cura artigianale, organizzazione del cantiere e rispetto dei tempi.",
    paragraphs: [
      "Easy Renovations ha sede in Corso Vittorio Emanuele, a Napoli. Ci occupiamo di ristrutturazioni d'interni: appartamenti, case vacanze, bagni e lavori in piccoli condomini.",
      "Chi ci ha scelto parla di lavori consegnati nei tempi, di un coordinamento attento del cantiere e di una squadra seria e competente. Collaboriamo spesso con architetti, anche su immobili sottoposti a vincolo della Soprintendenza.",
    ],
    image: { src: "/images/demo/about/about.webp", alt: "Immagine dimostrativa: sequenza di archi in un interno caldo", demo: true },
    values: [
      { title: "Un unico coordinamento", text: "Una sola regia per squadre, forniture e tempistiche: tu hai un solo interlocutore.", icon: "clipboard" },
      { title: "Cura artigianale", text: "Precisione nei dettagli e rispetto delle tecniche costruttive tradizionali.", icon: "hammer" },
      { title: "Tempi rispettati", text: "Un cronoprogramma condiviso e la consegna nei tempi stabiliti.", icon: "clock" },
    ],
  },

  method: {
    title: "Come lavoriamo",
    intro: "Dal primo sopralluogo alla consegna delle chiavi, sai sempre chi segue il tuo cantiere e a che punto è.",
    steps: [
      { title: "Sopralluogo", description: "Veniamo a vedere la casa, ascoltiamo le tue esigenze e valutiamo lo stato dei luoghi.", icon: "ruler" },
      { title: "Soluzioni e preventivo", description: "Ti guidiamo nella scelta delle soluzioni più adatte e prepariamo un preventivo dettagliato.", icon: "clipboard" },
      { title: "Cantiere coordinato", description: "Organizziamo squadre e forniture con un cronoprogramma, anche insieme al tuo architetto.", icon: "hammer" },
      { title: "Consegna", description: "Verifichiamo insieme ogni dettaglio e ti consegniamo la casa finita, nei tempi concordati.", icon: "key" },
    ],
  },

  beforeAfter: {
    title: "Prima e dopo",
    intro: "Trascina il cursore per confrontare lo stato iniziale e il risultato finale.",
    items: [
      {
        label: "Esempio dimostrativo",
        before: { src: "/images/demo/before-after/prima.webp", alt: "Esempio dimostrativo: ambiente prima dell'intervento", demo: true },
        after: { src: "/images/demo/before-after/dopo.webp", alt: "Esempio dimostrativo: ambiente dopo l'intervento", demo: true },
        caption: "Illustrazione dimostrativa, non un lavoro di Easy Renovations. Nella versione definitiva: foto reali dello stesso intervento.",
        demo: true,
      },
    ],
  },

  reviewsSummary: {
    rating: 4.7,
    count: 12,
    sourceName: "Google",
    url: "https://maps.google.com/?cid=2733615356743733555",
    checkedAt: "2026-11-20",
  },

  cta: {
    title: "La tua casa merita\nil giusto inizio.",
    text: "Raccontaci cosa vuoi realizzare: fissiamo un sopralluogo e ti proponiamo le soluzioni più adatte.",
  },

  social: { instagram: "", facebook: "", linkedin: "", youtube: "", tiktok: "" },

  seo: {
    defaultTitle: "Easy Renovations — Ristrutturazioni d'interni a Napoli",
    titleTemplate: "%s | Easy Renovations Napoli",
    description:
      "Ristrutturazioni di appartamenti a Napoli chiavi in mano, case d'epoca e immobili vincolati, bagni e case vacanze. Easy Renovations, Corso Vittorio Emanuele.",
    keywords: [
      "ristrutturazione appartamenti Napoli",
      "impresa ristrutturazioni Napoli",
      "ristrutturazione casa d'epoca Napoli",
      "ristrutturazione bagno Napoli",
      "ristrutturazione chiavi in mano Napoli",
    ],
    businessType: "GeneralContractor",
  },

  legal: {
    privacyPolicyUrl: "",
    cookiePolicyUrl: "",
    privacySections: [],
    cookieSections: [],
    usesTrackingCookies: false,
  },

  features: {
    testimonials: true,
    beforeAfter: true,
    threeD: false,
    quoteForm: true,
    floatingWhatsapp: true,
    mobileStickyCta: true,
  },

  threeD: { modelUrl: "", title: "", caption: "" },

  leads: { adapter: "whatsapp", endpointUrl: "" },
} satisfies SiteConfigInput;
