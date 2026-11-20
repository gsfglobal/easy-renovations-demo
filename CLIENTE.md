# Easy Renovations — versione DEMO

Fonte dati: scheda Google Maps pubblica, verificata il 20/11/2026 (https://maps.google.com/?cid=2733615356743733555).

## Dati inseriti
- EASY RENOVATIONS S.R.L.S — Corso Vittorio Emanuele 641, Napoli
- Telefono e WhatsApp: +39 393 037 8006
- Valutazione Google: 4,7 su 12 recensioni (con data di verifica)
- 4 estratti di recensioni Google, solo iniziali del cliente
- Posizionamento: ristrutturazioni d'interni chiavi in mano, case d'epoca e immobili vincolati (dalle recensioni di architetti), bagni, case vacanze, piccoli condomini

## Foto (provvisorie)
Le foto in `public/images/foto/` sono foto d'archivio gratuite di Pexels (licenza Pexels: uso commerciale consentito, nessuna attribuzione obbligatoria).
Nel sito sono etichettate "Foto d'archivio" e vanno sostituite con le foto dei lavori di Easy Renovations prima della produzione.
ID Pexels usati: 4857757, 5691530, 6312353, 9718895, 9908376, 6527029, 6588599, 16476336, 6492399, 6980656, 7019013, 7535076, 15108551, 21792127, 1743227, 6934189, 4756490, 6758534, 7005268, 7227647, 6301168, 10486139.

## Da verificare con l'impresa prima della produzione
1. **Legame con "Edil Cirillo" / sig. Cirillo**: molte recensioni e il logo su una foto citano questo nome. Sul sito demo non compare.
2. Orari: su Google risulta "aperto 24 ore su 24, sabato chiuso" (probabile errore). Nel sito: "Su appuntamento".
3. CAP: Google indica 80100; nel sito è 80121 (CAP della zona). Confermare.
4. Servizi e testi (poi `contentReviewed: true`)
5. Foto dei lavori autorizzate (31 foto sulla scheda Google; alcune sembrano render)
6. Logo, Partita IVA, email, conferma WhatsApp
7. Privacy e Cookie Policy, dominio

Poi: `NEXT_PUBLIC_SITE_MODE=production` e `npm run validate:prod` con 0 errori.

## Pubblicazione demo (GitHub Pages)
- Sito: https://gsfglobal.github.io/easy-renovations-demo/
- Branch `main` = sorgente, branch `gh-pages` = sito statico generato.
- Aggiornare: `STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/easy-renovations-demo NEXT_PUBLIC_SITE_URL=https://gsfglobal.github.io/easy-renovations-demo npm run build:pages`, poi pubblicare `out/` sul branch `gh-pages` (con `.nojekyll`).
