/**
 * Post-processing dell'export statico per GitHub Pages: Next non applica il
 * basePath ai link di favicon e immagine Open Graph generati da file.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const site = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
if (!base) process.exit(0);
const origin = site ? new URL(site).origin : "";

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : /\.(html|txt)$/.test(p) ? [p] : [];
  });

let n = 0;
for (const file of walk("out")) {
  const before = readFileSync(file, "utf8");
  let html = before
    .replaceAll('"/icon?', `"${base}/icon?`)
    .replaceAll('"/apple-icon?', `"${base}/apple-icon?`);
  if (origin) html = html.replaceAll(`${origin}/opengraph-image`, `${origin}${base}/opengraph-image`);
  if (html !== before) { writeFileSync(file, html); n++; }
}
console.log(`fix-pages: ${n} file aggiornati`);
