import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/config/schema";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project, category, tone = "light", aspect = "aspect-[4/3]", sizes = "(min-width: 1024px) 45vw, 100vw",
}: { project: Project; category: string; tone?: "light" | "dark"; aspect?: string; sizes?: string }) {
  return (
    <Link href={`/progetti/${project.slug}`} className="group block">
      <div className={cn("relative overflow-hidden bg-sand", aspect)}>
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1600ms] ease-(--ease-luxe) group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" aria-hidden />
        <span className="absolute right-5 bottom-5 translate-y-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-paper opacity-0 transition-all duration-700 ease-(--ease-luxe) group-hover:translate-y-0 group-hover:opacity-100">
          Vedi progetto →
        </span>
        {project.demo && <DemoBadge className="absolute top-3 left-3" label="Progetto dimostrativo" />}
      </div>
      <div className={cn("mt-5 flex items-baseline justify-between gap-4", tone === "dark" ? "text-paper" : "text-charcoal")}>
        <h3 className="font-display text-2xl leading-tight sm:text-[1.9rem]">{project.title}</h3>
        <p className={cn("shrink-0 text-[0.68rem] font-semibold uppercase tracking-[0.2em]", tone === "dark" ? "text-paper/50" : "text-stone")}>
          {project.city}
        </p>
      </div>
      <p className={cn("mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em]", tone === "dark" ? "text-champagne" : "text-champagne-deep")}>{category}</p>
    </Link>
  );
}
