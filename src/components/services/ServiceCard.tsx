import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/config/schema";
import { DemoBadge } from "@/components/ui/DemoBadge";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link href={`/servizi/${service.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-(--ease-luxe) group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 group-hover:bg-charcoal/25" aria-hidden />
        <span className="absolute top-5 left-5 font-display text-lg text-paper/90">{String(index + 1).padStart(2, "0")}</span>
        <span className="absolute top-4 right-4 inline-flex size-11 translate-y-2 items-center justify-center rounded-full bg-paper text-charcoal opacity-0 transition-all duration-500 ease-(--ease-luxe) group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-5" strokeWidth={1.25} aria-hidden />
        </span>
        {service.image.demo && <DemoBadge className="absolute bottom-3 left-3" />}
      </div>
      <div className="flex items-start justify-between gap-6 border-b border-charcoal/10 pt-6 pb-6 transition-colors duration-500 group-hover:border-champagne">
        <div>
          <h3 className="font-display text-[1.75rem] leading-tight">{service.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-stone">{service.excerpt}</p>
        </div>
      </div>
    </Link>
  );
}
