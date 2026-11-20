import { z } from "zod";

/**
 * Schema di validazione del template RENOVATION.
 * Ogni dato mostrato dal sito passa da qui: se un campo è sbagliato,
 * `npm run validate` e la build lo segnalano.
 */

const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Colore esadecimale a 6 cifre, es. #B39770");
const localPath = z.string().regex(/^\/[^\s]*$/, "Percorso locale che inizia con /, es. /images/hero/hero.webp");
const optionalPath = z.union([localPath, z.literal("")]);
const optionalUrl = z.union([z.url(), z.literal("")]);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug minuscolo con trattini, es. ristrutturazione-bagni");

export const iconNames = [
  "phone",
  "ruler",
  "hammer",
  "key",
  "message",
  "clipboard",
  "home",
  "sparkles",
  "shield",
  "clock",
  "leaf",
  "wrench",
] as const;
export const iconSchema = z.enum(iconNames);

export const imageSchema = z.object({
  src: localPath,
  alt: z.string().min(3, "Testo alternativo obbligatorio (accessibilità)"),
  /** true = immagine dimostrativa: in PRODUCTION viene segnalata dal validatore */
  demo: z.boolean().default(false),
});
export type SiteImage = z.infer<typeof imageSchema>;

export const siteConfigSchema = z.object({
  /** Modalità predefinita. La variabile d'ambiente NEXT_PUBLIC_SITE_MODE ha la precedenza. */
  mode: z.enum(["demo", "production"]),
  siteUrl: z.url(),
  locale: z.string().default("it_IT"),

  company: z.object({
    name: z.string().min(2),
    legalName: z.string().default(""),
    tagline: z.string(),
    description: z.string().min(20),
    city: z.string().min(2),
    province: z.string().default(""),
    region: z.string().default(""),
    serviceAreas: z.array(z.string()).min(1),
    vatNumber: z
      .string()
      .regex(/^(IT)?\d{11}$|^$/, "Partita IVA italiana: 11 cifre (opzionale prefisso IT)")
      .default(""),
    /** Numeri mostrati SOLO se `verified` è true (dati reali verificati). */
    stats: z.object({
      verified: z.boolean(),
      yearsExperience: z.number().int().positive().nullable(),
      projectsCompleted: z.number().int().positive().nullable(),
    }),
  }),

  contact: z.object({
    phone: z.string().default(""),
    whatsapp: z.string().default(""),
    whatsappDefaultMessage: z.string().default("Buongiorno, vorrei informazioni per una ristrutturazione."),
    email: z.union([z.email(), z.literal("")]).default(""),
    address: z.object({
      street: z.string().default(""),
      postalCode: z.string().default(""),
      city: z.string().default(""),
      province: z.string().default(""),
      country: z.string().default("IT"),
    }),
    openingHours: z.array(z.string()).default([]),
    mapsUrl: optionalUrl.default(""),
  }),

  branding: z.object({
    /** Logo per sfondi chiari. Vuoto = wordmark testuale con il nome impresa. */
    logo: optionalPath,
    /** Logo per sfondi scuri (hero, footer). Vuoto = usa `logo` oppure il wordmark. */
    logoLight: optionalPath,
    favicon: optionalPath.default(""),
    primaryColor: hex,
    accentColor: hex,
    backgroundColor: hex,
    mutedColor: hex,
  }),

  hero: z.object({
    eyebrow: z.string().default(""),
    title: z.string().min(3),
    subtitle: z.string().default(""),
    description: z.string().default(""),
    image: imageSchema,
    imageMobile: imageSchema.optional(),
    /** Video MP4/WebM autorizzato. Su mobile e con risparmio dati viene usata l'immagine. */
    video: optionalPath,
    ctaPrimary: z.string().default("Richiedi un preventivo"),
    ctaSecondary: z.string().default("Scopri i nostri progetti"),
  }),

  intro: z.object({
    eyebrow: z.string().default(""),
    title: z.string(),
    paragraphs: z.array(z.string()).min(1),
    image: imageSchema,
  }),

  about: z.object({
    title: z.string(),
    lead: z.string(),
    paragraphs: z.array(z.string()).min(1),
    image: imageSchema,
    values: z.array(z.object({ title: z.string(), text: z.string(), icon: iconSchema })).default([]),
  }),

  method: z.object({
    title: z.string(),
    intro: z.string().default(""),
    steps: z
      .array(z.object({ title: z.string(), description: z.string(), icon: iconSchema }))
      .min(2)
      .max(6),
  }),

  beforeAfter: z.object({
    title: z.string(),
    intro: z.string().default(""),
    items: z
      .array(
        z.object({
          label: z.string(),
          before: imageSchema,
          after: imageSchema,
          caption: z.string().default(""),
          /** Esempio dimostrativo: mostrato solo in DEMO MODE con etichetta esplicita. */
          demo: z.boolean(),
        }),
      )
      .default([]),
  }),

  /** Riepilogo valutazioni da fonte pubblica (es. Google). Mostrato con data di verifica. */
  reviewsSummary: z
    .object({
      rating: z.number().min(1).max(5),
      count: z.number().int().positive(),
      sourceName: z.string(),
      url: z.url(),
      /** Data in cui il dato è stato verificato (AAAA-MM-GG) */
      checkedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    })
    .nullable()
    .default(null),

  cta: z.object({
    title: z.string(),
    text: z.string(),
  }),

  social: z.object({
    instagram: optionalUrl.default(""),
    facebook: optionalUrl.default(""),
    linkedin: optionalUrl.default(""),
    youtube: optionalUrl.default(""),
    tiktok: optionalUrl.default(""),
  }),

  seo: z.object({
    defaultTitle: z.string().min(10).max(70),
    titleTemplate: z.string().includes("%s"),
    description: z.string().min(50).max(170),
    keywords: z.array(z.string()).default([]),
    /** Tipo schema.org per i dati strutturati. */
    businessType: z.enum(["GeneralContractor", "HomeAndConstructionBusiness", "HousePainter", "Plumber", "Electrician"]),
  }),

  legal: z.object({
    /** URL esterno della policy (es. generatore professionale). Se presente ha la precedenza sul testo. */
    privacyPolicyUrl: optionalUrl.default(""),
    cookiePolicyUrl: optionalUrl.default(""),
    /** Testo fornito dal titolare/consulente. Vuoto = pagina segnaposto (non pubblicabile in produzione). */
    privacySections: z.array(z.object({ title: z.string(), body: z.array(z.string()) })).default([]),
    cookieSections: z.array(z.object({ title: z.string(), body: z.array(z.string()) })).default([]),
    /** Il sito base non usa cookie di profilazione: aggiornare se si aggiungono strumenti di tracciamento. */
    usesTrackingCookies: z.boolean().default(false),
  }),

  features: z.object({
    testimonials: z.boolean(),
    beforeAfter: z.boolean(),
    threeD: z.boolean(),
    quoteForm: z.boolean(),
    floatingWhatsapp: z.boolean().default(true),
    mobileStickyCta: z.boolean().default(true),
  }),

  threeD: z.object({
    /** Modello .glb autorizzato in /public (es. /models/progetto.glb). Senza modello la sezione non appare. */
    modelUrl: optionalPath.default(""),
    title: z.string().default(""),
    caption: z.string().default(""),
  }),

  leads: z.object({
    /** "whatsapp" = template base. "endpoint" = adattatore per backend email/CRM futuro. */
    adapter: z.enum(["whatsapp", "endpoint"]),
    endpointUrl: optionalUrl.default(""),
  }),
});

export type SiteConfigInput = z.input<typeof siteConfigSchema>;
export type SiteConfig = z.output<typeof siteConfigSchema>;

const faqSchema = z.object({ question: z.string(), answer: z.string() });

export const serviceSchema = z.object({
  slug,
  title: z.string(),
  /** Titolo breve per card e menu */
  shortTitle: z.string(),
  excerpt: z.string().max(180),
  heroTitle: z.string(),
  description: z.array(z.string()).min(1),
  image: imageSchema,
  gallery: z.array(imageSchema).default([]),
  benefits: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
  faqs: z.array(faqSchema).default([]),
  seo: z.object({ title: z.string().max(70), description: z.string().max(170) }),
  /** false = servizio non offerto dall'impresa: non appare da nessuna parte. */
  enabled: z.boolean(),
  /** I testi sono stati verificati con l'impresa? In produzione è obbligatorio. */
  contentReviewed: z.boolean(),
});
export type Service = z.output<typeof serviceSchema>;

export const projectSchema = z.object({
  slug,
  title: z.string(),
  /** Slug di un servizio (usato per i filtri e i collegamenti) */
  service: slug,
  city: z.string(),
  year: z.number().int().min(1950).max(2100).nullable().default(null),
  excerpt: z.string().max(200),
  description: z.array(z.string()).min(1),
  cover: imageSchema,
  gallery: z.array(imageSchema).default([]),
  details: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
  beforeAfter: z.object({ before: imageSchema, after: imageSchema }).nullable().default(null),
  featured: z.boolean().default(false),
  /** Progetto dimostrativo: visibile solo in DEMO MODE con etichetta. */
  demo: z.boolean(),
});
export type Project = z.output<typeof projectSchema>;

export const testimonialSchema = z.object({
  /** Nome mostrato solo se il cliente ha autorizzato. Altrimenti es. "Cliente privato". */
  author: z.string(),
  authorized: z.boolean(),
  text: z.string().min(10),
  date: z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/, "Formato AAAA-MM o AAAA-MM-GG").or(z.literal("")).default(""),
  rating: z.number().min(1).max(5).nullable().default(null),
  /** Fonte verificabile obbligatoria (es. scheda Google, Houzz, Facebook) */
  source: z.object({ name: z.string(), url: z.url() }),
});
export type Testimonial = z.output<typeof testimonialSchema>;
