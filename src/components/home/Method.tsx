import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";
import { MethodLine } from "./MethodLine";

export function Method({ tone = "sand" }: { tone?: "sand" | "ivory" }) {
  const m = site.method;
  const cols = { 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-6" }[m.steps.length] ?? "lg:grid-cols-4";
  return (
    <section className={cn("py-24 sm:py-32 lg:py-40", tone === "sand" ? "bg-sand/60" : "bg-ivory")}>
      <div className="container-x">
        <SectionHeading eyebrow="Metodo" title={m.title} intro={m.intro} />
        <div className="relative mt-16 lg:mt-24">
          <MethodLine />
          <ol className={cn("grid gap-12 sm:grid-cols-2 lg:gap-8", cols)}>
            {m.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.12} className="relative lg:pt-12">
                <span className="absolute top-0 left-0 hidden size-2.5 -translate-y-1/2 rounded-full bg-champagne lg:block" aria-hidden />
                <div className="flex items-center justify-between border-b border-charcoal/10 pb-6 lg:border-0 lg:pb-0">
                  <span className="font-display text-6xl leading-none text-champagne/80">{String(i + 1).padStart(2, "0")}</span>
                  <Icon name={s.icon} className="size-7 text-stone" />
                </div>
                <h3 className="mt-6 font-display text-[1.7rem] leading-tight">{s.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone">{s.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
