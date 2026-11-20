import { cn, lines } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow, title, intro, align = "left", tone = "dark", as: Tag = "h2", className,
}: {
  eyebrow?: string; title: string; intro?: string; align?: "left" | "center"; tone?: "dark" | "light";
  as?: "h1" | "h2"; className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal>
          <p className={cn("eyebrow mb-5 flex items-center gap-3", align === "center" && "justify-center", tone === "light" ? "text-champagne" : "text-champagne-deep")}>
            <span className="h-px w-8 bg-current" aria-hidden />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <Tag className={cn("display-2", tone === "light" ? "text-paper" : "text-charcoal")}>
          {lines(title).map((l, i) => (
            <span key={i} className="block">{l}</span>
          ))}
        </Tag>
      </Reveal>
      {intro && (
        <Reveal delay={0.12}>
          <p className={cn("lead mt-6 max-w-xl", align === "center" && "mx-auto", tone === "light" ? "text-paper/70" : "text-stone")}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
