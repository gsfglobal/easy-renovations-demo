import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getFeaturedProjects, getServiceTitle } from "@/lib/content";

/** Griglia editoriale asimmetrica: proporzioni e colonne alternate. */
const layout = [
  { col: "lg:col-span-7", aspect: "aspect-[4/3]", sizes: "(min-width:1024px) 55vw, 100vw" },
  { col: "lg:col-span-4 lg:col-start-9 lg:mt-40", aspect: "aspect-[4/5]", sizes: "(min-width:1024px) 32vw, 100vw" },
  { col: "lg:col-span-5 lg:col-start-2", aspect: "aspect-[4/5]", sizes: "(min-width:1024px) 40vw, 100vw" },
  { col: "lg:col-span-6 lg:col-start-7 lg:mt-28", aspect: "aspect-[3/2]", sizes: "(min-width:1024px) 48vw, 100vw" },
  { col: "lg:col-span-6", aspect: "aspect-[3/2]", sizes: "(min-width:1024px) 48vw, 100vw" },
  { col: "lg:col-span-5 lg:col-start-8 lg:mt-20", aspect: "aspect-[4/5]", sizes: "(min-width:1024px) 40vw, 100vw" },
];

export function ProjectsShowcase() {
  const projects = getFeaturedProjects(6);
  if (!projects.length) return null;
  return (
    <section className="bg-charcoal py-24 text-paper sm:py-32 lg:py-44">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Portfolio" title={"Progetti che\nraccontano il nostro lavoro."} tone="light" />
          <Reveal>
            <ButtonLink href="/progetti" variant="outline-light">Tutti i progetti</ButtonLink>
          </Reveal>
        </div>
        <ul className="mt-16 grid gap-16 sm:grid-cols-2 lg:mt-28 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-24">
          {projects.map((p, i) => {
            const odd = projects.length % 2 === 1 && projects.length > 1 && i === projects.length - 1;
            const l = odd
              ? { col: "lg:col-span-8 lg:col-start-3", aspect: "aspect-[16/9]", sizes: "(min-width:1024px) 65vw, 100vw" }
              : layout[i % layout.length]!;
            return (
              <Reveal as="li" key={p.slug} className={l.col} delay={(i % 2) * 0.1}>
                <ProjectCard project={p} category={getServiceTitle(p.service)} tone="dark" aspect={l.aspect} sizes={l.sizes} />
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
