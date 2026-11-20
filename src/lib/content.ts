import { z } from "zod";
import { siteConfig } from "@/config/site.config";
import { projectSchema, serviceSchema, siteConfigSchema, testimonialSchema } from "@/config/schema";
import { services as rawServices } from "@/data/services";
import { projects as rawProjects } from "@/data/projects";
import { testimonials as rawTestimonials } from "@/data/testimonials";

/** Valida e restituisce i dati, oppure interrompe la build con un errore leggibile. */
function parse<T extends z.ZodType>(schema: T, data: unknown, label: string): z.output<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `  • ${label}.${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`Configurazione non valida:\n${issues}\nEsegui "npm run validate" per i dettagli.`);
  }
  return result.data;
}

export const site = parse(siteConfigSchema, siteConfig, "siteConfig");
const allServices = parse(z.array(serviceSchema), rawServices, "services");
const allProjects = parse(z.array(projectSchema), rawProjects, "projects");
const allTestimonials = parse(z.array(testimonialSchema), rawTestimonials, "testimonials");

export type SiteMode = "demo" | "production";

/** La variabile d'ambiente ha la precedenza sul valore in site.config.ts */
export function resolveMode(): SiteMode {
  const env = process.env.NEXT_PUBLIC_SITE_MODE;
  if (env === "demo" || env === "production") return env;
  return site.mode;
}
export const siteMode: SiteMode = resolveMode();
export const isDemo = siteMode === "demo";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || site.siteUrl).replace(/\/$/, "");

/* ---------------- Servizi ---------------- */
export function getServices() {
  return allServices.filter((s) => s.enabled);
}
export function getService(slug: string) {
  return getServices().find((s) => s.slug === slug);
}

/* ---------------- Progetti ---------------- */
export function getProjects() {
  const enabled = new Set(getServices().map((s) => s.slug));
  return allProjects.filter((p) => (isDemo || !p.demo) && enabled.has(p.service));
}
export function getProject(slug: string) {
  return getProjects().find((p) => p.slug === slug);
}
export function getFeaturedProjects(max = 6) {
  const list = getProjects();
  const featured = list.filter((p) => p.featured);
  return (featured.length >= 3 ? featured : list).slice(0, max);
}
export function getServiceTitle(slug: string) {
  return allServices.find((s) => s.slug === slug)?.shortTitle ?? slug;
}

/* ---------------- Recensioni (solo reali) ---------------- */
export function getTestimonials() {
  return site.features.testimonials ? allTestimonials : [];
}

/* ---------------- Prima / Dopo ---------------- */
export function getBeforeAfterItems() {
  if (!site.features.beforeAfter) return [];
  return site.beforeAfter.items.filter((i) => isDemo || !i.demo);
}

/* ---------------- Statistiche (solo se verificate) ---------------- */
export function getVerifiedStats() {
  const s = site.company.stats;
  if (!s.verified) return [];
  return [
    s.yearsExperience ? { value: s.yearsExperience, label: "anni di esperienza" } : null,
    s.projectsCompleted ? { value: s.projectsCompleted, label: "progetti realizzati" } : null,
  ].filter((x): x is { value: number; label: string } => x !== null);
}

/** Dati grezzi per il validatore */
export const rawContent = { services: allServices, projects: allProjects, testimonials: allTestimonials };
