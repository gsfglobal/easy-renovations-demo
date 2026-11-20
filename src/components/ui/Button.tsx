import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline-light" | "outline-dark" | "link";

const styles: Record<Variant, string> = {
  primary: "bg-charcoal text-paper hover:bg-champagne",
  accent: "bg-champagne text-charcoal hover:bg-paper",
  "outline-light": "border border-paper/40 text-paper hover:border-paper hover:bg-paper hover:text-charcoal",
  "outline-dark": "border border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-paper",
  link: "px-0! py-0! text-charcoal underline-offset-[6px] hover:text-champagne",
};

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(
    "group inline-flex min-h-12 items-center justify-center gap-3 rounded-brand px-7 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.16em]",
    "transition-colors duration-500 ease-(--ease-luxe) disabled:pointer-events-none disabled:opacity-45",
    styles[variant],
    className,
  );
}

function Arrow() {
  return (
    <ArrowRight
      aria-hidden
      className="size-4 transition-transform duration-500 ease-(--ease-luxe) group-hover:translate-x-1"
      strokeWidth={1.5}
    />
  );
}

export function ButtonLink({
  href, variant = "primary", className, children, arrow = true, external, ...rest
}: { href: string; variant?: Variant; className?: string; children: ReactNode; arrow?: boolean; external?: boolean } & Omit<
  ComponentProps<"a">,
  "href"
>) {
  const cls = buttonClass(variant, className);
  if (external || /^(https?:|tel:|mailto:)/.test(href)) {
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
        {arrow && <Arrow />}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}
