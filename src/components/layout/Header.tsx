"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { buttonClass } from "@/components/ui/Button";
import { WhatsappIcon } from "@/components/ui/WhatsappIcon";
import { Logo, type LogoData } from "./Logo";

export type NavItem = { href: string; label: string };

export function Header({
  nav, logo, phoneHref, whatsappHref, isDemo, tagline,
}: { nav: NavItem[]; logo: LogoData; phoneHref: string | null; whatsappHref: string | null; isDemo: boolean; tagline: string }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Chiude il menu al cambio pagina
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled && !open;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {isDemo && (
        <div className="bg-champagne text-charcoal">
          <p className="container-x py-1.5 text-center text-[0.65rem] font-semibold uppercase tracking-[0.22em]">
            Anteprima dimostrativa · contenuti e immagini di esempio
          </p>
        </div>
      )}
      <div
        className={cn(
          "transition-[background-color,box-shadow,color] duration-500 ease-(--ease-luxe)",
          solid ? "bg-ivory/90 text-charcoal shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-md" : "bg-transparent text-paper",
        )}
      >
        <div className={cn("container-x flex items-center justify-between transition-[height] duration-500", solid ? "h-18" : "h-20 lg:h-24")}>
          <Link href="/" className="relative z-10">
            <Logo data={logo} tone={solid ? "dark" : "light"} />
          </Link>

          <nav aria-label="Principale" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group relative py-2 text-[0.78rem] font-medium uppercase tracking-[0.18em]"
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-champagne transition-transform duration-500 ease-(--ease-luxe)",
                        isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {phoneHref && (
              <a href={phoneHref} className="hidden items-center gap-2 text-sm font-medium xl:inline-flex" aria-label="Chiama">
                <Phone className="size-4" strokeWidth={1.5} aria-hidden />
                Chiama
              </a>
            )}
            <Link
              href="/contatti"
              className={cn(
                buttonClass(solid ? "primary" : "outline-light", "hidden min-h-11 px-5 py-2.5 sm:inline-flex"),
              )}
            >
              Preventivo
            </Link>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Chiudi menu" : "Apri menu"}
              className="relative z-10 inline-flex size-11 items-center justify-center lg:hidden"
            >
              {open ? <X className="size-6 text-paper" strokeWidth={1.25} /> : <Menu className="size-6" strokeWidth={1.25} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 -z-10 flex flex-col bg-charcoal text-paper lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center pt-24">
              <ul className="space-y-1">
                {[{ href: "/", label: "Home" }, ...nav].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex items-baseline gap-4 py-2 font-display text-[2.6rem] leading-tight aria-[current=page]:text-champagne"
                    >
                      <span className="font-sans text-xs tracking-widest text-paper/40">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="container-x grid gap-3 pb-10"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="mb-2 text-sm text-paper/50">{tagline}</p>
              <Link href="/contatti" onClick={() => setOpen(false)} className={buttonClass("accent", "w-full")}>
                Richiedi un preventivo
              </Link>
              <div className="grid grid-cols-2 gap-3">
                {phoneHref && (
                  <a href={phoneHref} className={buttonClass("outline-light", "w-full px-3")}>
                    <Phone className="size-4" strokeWidth={1.5} aria-hidden /> Chiama
                  </a>
                )}
                {whatsappHref && (
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={buttonClass("outline-light", "w-full px-3")}>
                    <WhatsappIcon className="size-4" /> WhatsApp
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
