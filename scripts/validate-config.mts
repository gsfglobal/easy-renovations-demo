/**
 * Validatore della configurazione RENOVATION.
 *
 *   npm run validate            → controlla in base alla modalità attiva
 *   npm run validate:prod       → simula i controlli di PRODUZIONE (prima della pubblicazione)
 *   npm run validate -- --online → verifica anche che i link esterni rispondano
 *
 * Esce con codice 1 se trova errori bloccanti.
 */
import { existsSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { siteConfig } from "../src/config/site.config";
import { projectSchema, serviceSchema, siteConfigSchema, testimonialSchema } from "../src/config/schema";
import { services } from "../src/data/services";
import { projects } from "../src/data/projects";
import { testimonials } from "../src/data/testimonials";
import { normalizePhone as normalizePhoneRaw, normalizeWhatsapp as normalizeWhatsappRaw } from "../src/lib/phone";

const online = process.argv.includes("--online");
const mode = (process.env.SITE_MODE || process.env.NEXT_PUBLIC_SITE_MODE || siteConfig.mode) as "demo" | "production";
const prod = mode === "production";

const errors: string[] = [];
const warnings: string[] = [];
const ok: string[] = [];
const err = (m: string) => errors.push(m);
const warn = (m: string) => warnings.push(m);

/* 1. Schema ------------------------------------------------------------ */
function check<T extends z.ZodType>(label: string, schema: T, data: unknown): z.output<T> | null {
  const r = schema.safeParse(data);
  if (!r.success) {
    r.error.issues.forEach((i) => err(`${label}.${i.path.join(".")}: ${i.message}`));
    return null;
  }
  ok.push(`Schema ${label} valido`);
  return r.data;
}
const cfg = check("siteConfig", siteConfigSchema, siteConfig);
const svc = check("services", z.array(serviceSchema), services) ?? [];
const prj = check("projects", z.array(projectSchema), projects) ?? [];
const tst = check("testimonials", z.array(testimonialSchema), testimonials) ?? [];

if (cfg) {
  const enabled = svc.filter((s) => s.enabled);
  const enabledSlugs = new Set(enabled.map((s) => s.slug));
  const visibleProjects = prj.filter((p) => (!prod || !p.demo) && enabledSlugs.has(p.service));

  /* 2. File locali esistenti ----------------------------------------- */
  const pub = path.join(process.cwd(), "public");
  const files: [string, string][] = [];
  const add = (label: string, p?: string) => p && files.push([label, p]);
  add("branding.logo", cfg.branding.logo);
  add("branding.logoLight", cfg.branding.logoLight);
  add("branding.favicon", cfg.branding.favicon);
  add("hero.image", cfg.hero.image.src);
  add("hero.imageMobile", cfg.hero.imageMobile?.src);
  add("hero.video", cfg.hero.video);
  add("intro.image", cfg.intro.image.src);
  add("about.image", cfg.about.image.src);
  add("threeD.modelUrl", cfg.threeD.modelUrl);
  cfg.beforeAfter.items.forEach((b, i) => { add(`beforeAfter.items[${i}].before`, b.before.src); add(`beforeAfter.items[${i}].after`, b.after.src); });
  svc.forEach((s) => { add(`services.${s.slug}.image`, s.image.src); s.gallery.forEach((g, i) => add(`services.${s.slug}.gallery[${i}]`, g.src)); });
  prj.forEach((p) => {
    add(`projects.${p.slug}.cover`, p.cover.src);
    p.gallery.forEach((g, i) => add(`projects.${p.slug}.gallery[${i}]`, g.src));
    if (p.beforeAfter) { add(`projects.${p.slug}.before`, p.beforeAfter.before.src); add(`projects.${p.slug}.after`, p.beforeAfter.after.src); }
  });
  const missing = files.filter(([, p]) => !existsSync(path.join(pub, p)));
  missing.forEach(([l, p]) => err(`${l}: file non trovato in /public${p}`));
  if (!missing.length) ok.push(`${files.length} file locali trovati`);

  /* 3. Coerenza dati -------------------------------------------------- */
  const dup = (arr: string[]) => arr.filter((x, i) => arr.indexOf(x) !== i);
  dup(svc.map((s) => s.slug)).forEach((s) => err(`services: slug duplicato "${s}"`));
  dup(prj.map((p) => p.slug)).forEach((s) => err(`projects: slug duplicato "${s}"`));
  prj.forEach((p) => {
    if (!svc.some((s) => s.slug === p.service)) err(`projects.${p.slug}.service: il servizio "${p.service}" non esiste`);
    else if (!enabledSlugs.has(p.service)) warn(`projects.${p.slug}: il servizio "${p.service}" è disattivato, il progetto non sarà visibile`);
  });
  if (!enabled.length) err("Nessun servizio attivo (enabled: true)");

  /* 4. Contatti ------------------------------------------------------- */
  const c = cfg.contact;
  if (c.whatsapp && !normalizeWhatsappRaw(c.whatsapp)) err(`contact.whatsapp: numero non valido "${c.whatsapp}" (usa un cellulare, es. +39 333 1234567)`);
  if (c.phone && !normalizePhoneRaw(c.phone)) err(`contact.phone: numero non valido "${c.phone}"`);
  const hasWa = !!normalizeWhatsappRaw(c.whatsapp);
  if (cfg.leads.adapter === "whatsapp" && !hasWa) (prod ? err : warn)("Modulo preventivo: manca un numero WhatsApp valido, il pulsante di invio resterà disattivato");
  if (cfg.leads.adapter === "endpoint" && !cfg.leads.endpointUrl) err("leads.endpointUrl: obbligatorio con adapter \"endpoint\"");
  if (!c.phone && !c.email && !hasWa) (prod ? err : warn)("Nessun recapito configurato (telefono, email o WhatsApp)");

  /* 5. Regole di PRODUZIONE ------------------------------------------ */
  if (prod) {
    if (/demo|esempio|example/i.test(cfg.siteUrl)) err(`siteUrl sembra un indirizzo dimostrativo: ${cfg.siteUrl}`);
    const demoImgs: string[] = [];
    const img = (l: string, i?: { demo: boolean; src: string }) => i?.demo && demoImgs.push(`${l} (${i.src})`);
    img("hero.image", cfg.hero.image); img("hero.imageMobile", cfg.hero.imageMobile); img("intro.image", cfg.intro.image); img("about.image", cfg.about.image);
    enabled.forEach((s) => { img(`services.${s.slug}.image`, s.image); s.gallery.forEach((g, i) => img(`services.${s.slug}.gallery[${i}]`, g)); });
    visibleProjects.forEach((p) => { img(`projects.${p.slug}.cover`, p.cover); p.gallery.forEach((g, i) => img(`projects.${p.slug}.gallery[${i}]`, g)); });
    demoImgs.forEach((d) => err(`Immagine dimostrativa in produzione: ${d}`));

    enabled.filter((s) => !s.contentReviewed).forEach((s) => err(`services.${s.slug}: testi non revisionati con l'impresa (contentReviewed: false)`));
    const demoProjects = prj.filter((p) => p.demo).length;
    if (demoProjects) warn(`${demoProjects} progetti dimostrativi verranno nascosti in produzione`);
    if (!visibleProjects.length) warn("Nessun progetto reale: la sezione portfolio della home sarà nascosta");
    if (cfg.features.beforeAfter && !cfg.beforeAfter.items.some((i) => !i.demo)) warn("Prima/Dopo attivo ma senza confronti reali: la sezione sarà nascosta");

    if (!cfg.legal.privacyPolicyUrl && !cfg.legal.privacySections.length) err("legal: manca la Privacy Policy (URL esterno o testo fornito dal titolare)");
    if (!cfg.legal.cookiePolicyUrl && !cfg.legal.cookieSections.length) err("legal: manca la Cookie Policy (URL esterno o testo fornito dal titolare)");
    if (!cfg.company.vatNumber) warn("company.vatNumber: Partita IVA assente (consigliata nel footer)");
    if (cfg.company.stats.verified && !cfg.company.stats.yearsExperience && !cfg.company.stats.projectsCompleted) warn("company.stats: verified true ma nessun valore inserito");

    // Testi segnaposto rimasti
    const placeholder = /dimostrativ|testo personalizzabile|suggerimento:|lorem ipsum|\bTODO\b|\bxxx\b/i;
    const scan = (label: string, v: unknown): void => {
      if (typeof v === "string") { if (placeholder.test(v)) err(`Testo segnaposto in ${label}: "${v.slice(0, 70)}…"`); }
      else if (Array.isArray(v)) v.forEach((x, i) => scan(`${label}[${i}]`, x));
      else if (v && typeof v === "object") {
        if ((v as { demo?: boolean }).demo === true) return; // già segnalato come contenuto dimostrativo
        Object.entries(v).forEach(([k, x]) => k !== "demo" && scan(`${label}.${k}`, x));
      }
    };
    const { beforeAfter, ...rest } = cfg;
    scan("siteConfig", rest);
    scan("siteConfig.beforeAfter", { ...beforeAfter, items: beforeAfter.items.filter((i) => !i.demo) });
    enabled.forEach((s) => scan(`services.${s.slug}`, s));
    visibleProjects.forEach((p) => scan(`projects.${p.slug}`, p));
  }

  if (cfg.features.testimonials && !tst.length) warn("features.testimonials attivo ma nessuna recensione: la sezione sarà nascosta");
  if (cfg.features.threeD && !cfg.threeD.modelUrl) warn("features.threeD attivo ma nessun modello .glb: la sezione 3D non apparirà");

  /* 6. Link esterni (opzionale) -------------------------------------- */
  if (online) {
    const urls = [
      ...Object.entries(cfg.social).filter(([, u]) => u).map(([k, u]) => [`social.${k}`, u] as const),
      ...(["privacyPolicyUrl", "cookiePolicyUrl"] as const).filter((k) => cfg.legal[k]).map((k) => [`legal.${k}`, cfg.legal[k]] as const),
      ...(cfg.contact.mapsUrl ? [["contact.mapsUrl", cfg.contact.mapsUrl] as const] : []),
      ...tst.map((t, i) => [`testimonials[${i}].source`, t.source.url] as const),
    ];
    for (const [label, url] of urls) {
      try {
        const res = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(10000) });
        if (res.status >= 400) err(`${label}: ${url} risponde ${res.status}`);
      } catch {
        warn(`${label}: impossibile raggiungere ${url}`);
      }
    }
    ok.push(`${urls.length} link esterni verificati`);
  }
}

/* Report --------------------------------------------------------------- */
const C = { red: "\x1b[31m", yellow: "\x1b[33m", green: "\x1b[32m", dim: "\x1b[2m", reset: "\x1b[0m", bold: "\x1b[1m" };
console.log(`\n${C.bold}RENOVATION · validazione configurazione${C.reset}  ${C.dim}(modalità: ${mode.toUpperCase()})${C.reset}\n`);
ok.forEach((m) => console.log(`${C.green}✓${C.reset} ${m}`));
warnings.forEach((m) => console.log(`${C.yellow}!${C.reset} ${m}`));
errors.forEach((m) => console.log(`${C.red}✗${C.reset} ${m}`));
console.log(`\n${errors.length ? C.red : C.green}${errors.length} errori${C.reset}, ${C.yellow}${warnings.length} avvisi${C.reset}\n`);
process.exit(errors.length ? 1 : 0);
