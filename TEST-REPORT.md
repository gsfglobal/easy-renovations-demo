# Report test — RENOVATION v1.0 (20/11/2026)

Tutti i risultati sono stati misurati in questo ambiente (Node 22, Next.js 16.4, Chrome headless).

| Controllo | Esito |
|---|---|
| `npm install` | OK, 0 vulnerabilità |
| `npm run validate` (demo) | 0 errori, 2 avvisi attesi (contatti non configurati nella demo) |
| `npm run validate:prod` sulla demo | Blocca correttamente: immagini/testi dimostrativi, servizi non revisionati, policy e contatti mancanti |
| `tsc --noEmit` | 0 errori |
| `eslint .` | 0 errori, 0 avvisi |
| `next build` demo | OK, 25 pagine statiche |
| `next build` produzione (copia di prova con contatti fittizi) | OK |
| Link interni e risorse (`check:links`) | 19 pagine e 45 risorse: 0 errori |
| Pagine dinamiche servizi (6) e progetti (6 demo / 1 in prova produzione) | 200; progetti demo → 404 in produzione |
| Menu mobile (apertura, blocco scroll, navigazione, Esc) | OK |
| Slider prima/dopo (trascinamento, tastiera) | OK |
| Filtro progetti | OK |
| Modulo: preselezione servizio da URL, validazione, apertura WhatsApp con dati precompilati | OK (produzione); invio disattivato in demo senza numero |
| CTA sticky mobile, WhatsApp flottante, click-to-call (`tel:+39…`) | OK |
| Demo: banner, `noindex`, robots `Disallow` | OK |
| Produzione: indicizzabile, sitemap, canonical, JSON-LD GeneralContractor | OK |
| Responsive 375 / 390 / 430 / 820 / 1440 / 1920 px | Nessuno scroll orizzontale, nessun errore console |

## Lighthouse (home, profilo mobile simulato)

| | Performance | Accessibilità | Best practices | SEO |
|---|---|---|---|---|
| Demo | 90 | 100 | 100 | 69 (atteso: `noindex` voluto in demo) |
| Produzione (prova) | 87 | 100 | 100 | 100 |
| Demo, profilo desktop (prima delle correzioni di contrasto) | 100 | 96 | 100 | 69 |

LCP mobile 3,2–3,4 s, CLS 0. Il dato performance mobile varia tra esecuzioni; resta sotto 90 in produzione di poco.

## Non verificato qui
- Deploy reale su Vercel (nessun progetto/credenziali configurati).
- Dispositivi fisici (test su emulazione Chrome).
