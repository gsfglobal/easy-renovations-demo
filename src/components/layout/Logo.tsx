import Image from "next/image";
import { cn } from "@/lib/utils";

export type LogoData = { name: string; logo: string; logoLight: string };

/** Logo dell'impresa: immagine se configurata, altrimenti wordmark tipografico. */
export function Logo({ data, tone, className }: { data: LogoData; tone: "light" | "dark"; className?: string }) {
  const src = tone === "light" ? data.logoLight || data.logo : data.logo || data.logoLight;
  if (src) {
    return <Image src={src} alt={data.name} width={180} height={48} className={cn("h-9 w-auto sm:h-10", className)} priority />;
  }
  const [first, ...rest] = data.name.split(" ");
  return (
    <span className={cn("flex flex-col leading-none", tone === "light" ? "text-paper" : "text-charcoal", className)}>
      <span className="font-display text-[1.45rem] tracking-[0.04em] sm:text-[1.6rem]">{first}</span>
      {rest.length > 0 && (
        <span className="mt-1 text-[0.56rem] font-semibold uppercase tracking-[0.42em] opacity-70">{rest.join(" ")}</span>
      )}
    </span>
  );
}
