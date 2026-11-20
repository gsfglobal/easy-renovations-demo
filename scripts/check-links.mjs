/**
 * Controllo link interni e immagini su un sito in esecuzione.
 *   npm run build && npm run start   (in un altro terminale)
 *   npm run check:links              (default http://localhost:3000)
 *   npm run check:links -- http://localhost:3100
 */
const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const seen = new Map();
const queue = [process.argv[3] || "/"];
const assets = new Set();
const broken = [];

const attr = (html, tag, name) =>
  [...html.matchAll(new RegExp(`<${tag}\\b[^>]*\\s${name}="([^"]+)"`, "gi"))].map((m) => m[1].replace(/&amp;/g, "&"));

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  const res = await fetch(base + path, { redirect: "manual" });
  seen.set(path, res.status);
  if (res.status >= 400) { broken.push(`${res.status}  pagina ${path}`); continue; }
  const html = await res.text();
  for (const href of attr(html, "a", "href")) {
    if (href.startsWith("#") || /^(https?:|tel:|mailto:)/.test(href)) continue;
    const clean = href.split("#")[0].split("?")[0] || "/";
    if (!seen.has(clean)) queue.push(clean);
  }
  for (const src of [...attr(html, "img", "src"), ...attr(html, "link", "href")]) {
    if (src.startsWith("/")) assets.add(src);
  }
}
const prefix = (process.argv[3] || "/").replace(/\/$/, "");
for (const extra of ["/sitemap.xml", "/robots.txt", "/opengraph-image", "/icon"]) assets.add(prefix + extra);
for (const a of assets) {
  const r = await fetch(base + a);
  if (r.status >= 400) broken.push(`${r.status}  risorsa ${a}`);
}
console.log(`\nPagine controllate: ${seen.size}`);
[...seen].forEach(([p, s]) => console.log(`  ${s}  ${p}`));
console.log(`Risorse controllate: ${assets.size}`);
if (broken.length) { console.log(`\n✗ ${broken.length} problemi:`); broken.forEach((b) => console.log("  " + b)); process.exit(1); }
console.log("\n✓ Nessun link interno o risorsa non funzionante\n");
