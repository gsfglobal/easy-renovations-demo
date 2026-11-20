"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Project } from "@/config/schema";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

export function ProjectsFilter({ projects, categories }: { projects: Project[]; categories: { slug: string; label: string }[] }) {
  const [active, setActive] = useState("tutti");
  const reduce = useReducedMotion();
  const list = active === "tutti" ? projects : projects.filter((p) => p.service === active);
  const label = (slug: string) => categories.find((c) => c.slug === slug)?.label ?? slug;

  return (
    <>
      {categories.length > 1 && (
        <div role="group" aria-label="Filtra per categoria" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {[{ slug: "tutti", label: "Tutti" }, ...categories].map((c) => (
            <button
              key={c.slug}
              type="button"
              aria-pressed={active === c.slug}
              onClick={() => setActive(c.slug)}
              className={cn(
                "min-h-11 shrink-0 border px-5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300",
                active === c.slug ? "border-charcoal bg-charcoal text-paper" : "border-charcoal/15 text-charcoal hover:border-charcoal",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}
      <p className="sr-only" aria-live="polite">{list.length} progetti mostrati</p>
      <motion.ul layout={!reduce} className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.li
              key={p.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={i % 2 === 1 ? "md:mt-24" : ""}
            >
              <ProjectCard project={p} category={label(p.service)} aspect={i % 4 === 0 || i % 4 === 3 ? "aspect-[4/5]" : "aspect-[4/3]"} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
