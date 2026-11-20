# RENOVATION — Premium Website Template

Template proprietario per siti di **imprese di ristrutturazione**: Next.js (App Router) + TypeScript + Tailwind CSS 4 + Motion.
Un solo codice, infinite imprese: ogni cliente si crea modificando **solo i file di configurazione e le immagini**.

---

## 1. Avvio rapido

```bash
npm install
cp .env.example .env.local      # modalità e URL del sito
npm run dev                     # http://localhost:3000
```

| Comando | A cosa serve |
|---|---|
| `npm run dev` | Sviluppo locale |
| `npm run validate` | Controlla configurazione, file immagini, numeri, link (modalità attiva) |
| `npm run validate:prod` | Controlli **di pubblicazione**: blocca immagini/testi dimostrativi, policy mancanti, contatti assenti |
| `npm run validate -- --online` | Verifica anche che i link esterni (social, policy, recensioni) rispondano |
| `npm run typecheck` | Verifica TypeScript |
| `npm run lint` | ESLint |
| `npm run build` / `npm run start` | Build e server di produzione |
| `npm run check:links -- http://localhost:3000` | Con il sito avviato: controlla link interni e risorse |
| `npm run qa` | validate + typecheck + lint + build in sequenza |

Requisiti: Node.js ≥ 20.9.

---

## 2. Dove si modifica cosa

```
src/config/site.config.ts   ← IMPRESA: nome, contatti, colori, logo, hero, testi, SEO, policy, funzioni attive
src/config/theme.config.ts  ← font (titoli / testi) e raggio angoli
src/data/services.ts        ← servizi (attiva/disattiva, testi, FAQ, SEO, immagini)
src/data/projects.ts        ← progetti realizzati
src/data/testimonials.ts    ← recensioni REALI con fonte verificabile
public/images/...           ← fotografie (brand, hero, services, projects)
public/videos/...           ← video hero (opzionale)
```

I componenti non contengono dati dell'impresa: **nessun riferimento al cliente precedente** può restare nel codice delle pagine.
Lo schema `src/config/schema.ts` (Zod) definisce e valida ogni campo: se un dato è sbagliato la build si ferma con un messaggio chiaro.

---

## 3. Procedura: nuovo sito per una nuova impresa

1. **Duplica il template** in una nuova cartella/repository (es. `edil-rossi-napoli`).
2. **Nome e dati commerciali** → `site.config.ts › company` (nome, ragione sociale, P.IVA, città, zone servite).
   Le statistiche (anni, progetti) appaiono **solo** con `stats.verified: true` e numeri forniti dall'impresa.
3. **Logo** → file in `public/images/brand/` e percorsi in `branding.logo` (sfondi chiari) e `branding.logoLight` (sfondi scuri).
   Senza logo il sito mostra un wordmark elegante con il nome. Favicon e immagine social si generano da soli.
4. **Palette** → `branding.primaryColor / accentColor / backgroundColor / mutedColor`.
5. **Contatti** → `contact.phone`, `contact.whatsapp` (cellulare, es. `+39 333 1234567`), `email`, indirizzo, orari, link Maps.
   Il pulsante di invio del modulo funziona **solo** con un numero WhatsApp valido.
6. **Servizi** → `src/data/services.ts`: `enabled: false` per quelli non offerti (spariscono da home, menu, footer, sitemap).
   Adatta i testi con l'impresa e imposta `contentReviewed: true`.
7. **Immagini** → foto autorizzate in `public/images/...`, aggiornando i percorsi e togliendo `demo: true`.
   Consigliato: WebP/JPG, lato lungo 2000–2400 px per hero, 1600 px per il resto. Next/Image ottimizza in automatico.
8. **Progetti** → `src/data/projects.ts`: solo lavori reali (`demo: false`), con galleria ed eventuale prima/dopo autentico.
9. **Recensioni** → solo reali, con `source.url` verificabile; poi `features.testimonials: true`.
10. **SEO** → `seo` (titolo, descrizione, parole chiave locali), `siteUrl`, e i campi `seo` di ogni servizio.
    Evita pagine duplicate cambiando solo la città: ogni servizio deve descrivere il lavoro reale dell'impresa.
11. **Policy** → `legal.privacyPolicyUrl / cookiePolicyUrl` (servizio esterno) **oppure** `privacySections / cookieSections`
    con il testo fornito dal titolare o dal consulente. Il template non contiene testi legali definitivi.
12. **Verifica** → `npm run validate:prod` deve dare **0 errori**, poi `npm run build`.

> Tempo tipico: 30–60 minuti con materiali pronti.

---

## 4. Modalità DEMO e PRODUZIONE

Si imposta con `NEXT_PUBLIC_SITE_MODE=demo|production` (ha la precedenza) oppure `mode` in `site.config.ts`.

| | DEMO | PRODUZIONE |
|---|---|---|
| Banner "Anteprima dimostrativa" | sì | no |
| Indicizzazione | `noindex`, robots `Disallow: /` | indicizzabile, sitemap nel robots |
| Progetti `demo: true` | visibili con etichetta | esclusi (404) |
| Prima/Dopo dimostrativo | visibile con etichetta | escluso (sezione nascosta se non ci sono confronti reali) |
| Dati strutturati LocalBusiness / FAQ | no | sì, solo con i dati presenti |
| Contatti non configurati | pulsanti disattivati con avviso | pulsanti nascosti; il validatore blocca la pubblicazione |

Per mostrare un'anteprima a un potenziale cliente: deploy con `NEXT_PUBLIC_SITE_MODE=demo` e condividi l'URL.

---

## 5. Funzioni (`features`)

- `quoteForm` — modulo preventivo. Adattatore in `src/lib/leads.ts`:
  - `whatsapp` (base): apre WhatsApp con messaggio precompilato; nessun dato salvato dal sito.
  - `endpoint`: POST JSON a `leads.endpointUrl` (per un futuro backend email/CRM). Senza URL il form **non** finge l'invio.
- `beforeAfter` — slider prima/dopo (mouse, touch, tastiera).
- `testimonials` — recensioni reali.
- `floatingWhatsapp` / `mobileStickyCta` — pulsante WhatsApp desktop e barra contatti mobile.
- `threeD` — sezione 3D opzionale (React Three Fiber, caricata solo se attiva). Richiede un modello `.glb` reale in `threeD.modelUrl`.

Video hero: `hero.video` (MP4/WebM autorizzato). Viene caricato solo su schermi ≥ 768 px, senza risparmio dati e senza "riduci movimento"; altrimenti resta l'immagine.

---

## 6. Font

In `theme.config.ts`: titoli `cormorant | playfair | fraunces`, testi `manrope | inter | dmsans`.
Se cambi il font predefinito, in `src/lib/fonts.ts` imposta `preload: true` sul nuovo e `false` sul precedente.

---

## 7. Deploy su Vercel

1. Importa il repository in Vercel (framework rilevato automaticamente).
2. Variabili d'ambiente: `NEXT_PUBLIC_SITE_MODE` e `NEXT_PUBLIC_SITE_URL` (es. `https://www.edilrossi.it`).
3. Deploy. Per il dominio dell'impresa: Settings › Domains.

---

## 8. Scelte tecniche

- **Animazioni**: Motion (reveal, parallax, menu, filtri) + CSS per la hero (nessun JS sul percorso critico). GSAP non è incluso perché non necessario: si può aggiungere per timeline complesse.
- **Accessibilità**: skip link, focus visibile, `prefers-reduced-motion` rispettato ovunque, slider con ruolo `slider` e tastiera, form con errori associati ai campi, contrasti AA.
- **SEO**: metadata e canonical per pagina, Open Graph generato, sitemap, robots, LocalBusiness e FAQPage in produzione.
- **Immagini dimostrative**: `public/images/demo/` contiene illustrazioni astratte generate (non fotografie di lavori reali), etichettate "Immagine dimostrativa". Vanno sostituite per ogni cliente.

---

## 9. Pronto per automazioni

Tutti i contenuti sono dati tipizzati: uno script futuro può generare `site.config.ts` e `src/data/*.ts` da un modulo, un foglio o un CRM, lanciare `npm run validate:prod` e creare il deploy.
