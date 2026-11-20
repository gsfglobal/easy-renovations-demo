import { cn } from "@/lib/utils";

/** Etichetta visibile sui contenuti dimostrativi (immagini e progetti di esempio). */
export function DemoBadge({ className, label = "Immagine dimostrativa" }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        "pointer-events-none z-10 inline-flex items-center gap-1.5 bg-charcoal/75 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-paper backdrop-blur-sm",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-champagne" aria-hidden />
      {label}
    </span>
  );
}
