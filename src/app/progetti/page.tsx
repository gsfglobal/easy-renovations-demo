import { PageHero } from "@/components/layout/PageHero";
import { CtaQuote } from "@/components/home/CtaQuote";
import { ProjectsFilter } from "@/components/projects/ProjectsFilter";
import { getProjects, getServices, isDemo, site } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `Progetti realizzati — ${site.company.name}`,
  description: `Portfolio dei lavori di ristrutturazione di ${site.company.name} a ${site.company.serviceAreas.join(", ")}.`,
  path: "/progetti",
});

export default function ProjectsPage() {
  const projects = getProjects();
  const used = new Set(projects.map((p) => p.service));
  const categories = getServices().filter((s) => used.has(s.slug)).map((s) => ({ slug: s.slug, label: s.shortTitle }));
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={"Progetti\nrealizzati."}
        intro={isDemo ? "In questa anteprima i progetti sono dimostrativi: nella versione definitiva verranno mostrati solo lavori reali dell'impresa." : "Una selezione dei nostri interventi."}
        image={projects[0]?.cover}
        crumbs={[{ href: "/progetti", label: "Progetti" }]}
      />
      <section className="py-20 sm:py-28">
        <div className="container-x">
          {projects.length ? (
            <ProjectsFilter projects={projects} categories={categories} />
          ) : (
            <p className="lead max-w-xl text-stone">Il portfolio è in aggiornamento. Contattaci per vedere esempi dei nostri lavori.</p>
          )}
        </div>
      </section>
      <CtaQuote />
    </>
  );
}
