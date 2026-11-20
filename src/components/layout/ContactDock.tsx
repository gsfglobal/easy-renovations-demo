import Link from "next/link";
import { Phone } from "lucide-react";
import { WhatsappIcon } from "@/components/ui/WhatsappIcon";

/**
 * - Desktop: pulsante WhatsApp flottante (solo se il numero è valido).
 * - Mobile: barra sticky con Chiama / WhatsApp / Preventivo.
 */
export function ContactDock({
  whatsappHref, phoneHref, floating, sticky,
}: { whatsappHref: string | null; phoneHref: string | null; floating: boolean; sticky: boolean }) {
  return (
    <>
      {floating && whatsappHref && (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Scrivici su WhatsApp"
          className="group fixed right-6 bottom-6 z-40 hidden size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-(--ease-luxe) hover:-translate-y-1 lg:inline-flex"
        >
          <WhatsappIcon className="size-7" />
        </a>
      )}
      {sticky && (
        <nav
          aria-label="Contatti rapidi"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-paper/10 bg-charcoal/95 pb-[env(safe-area-inset-bottom)] text-paper backdrop-blur-md lg:hidden"
        >
          <ul className="flex divide-x divide-paper/10">
            {phoneHref && (
              <li className="flex-1">
                <a href={phoneHref} className="flex h-15 flex-col items-center justify-center gap-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em]">
                  <Phone className="size-4.5" strokeWidth={1.5} aria-hidden /> Chiama
                </a>
              </li>
            )}
            {whatsappHref && (
              <li className="flex-1">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex h-15 flex-col items-center justify-center gap-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em]">
                  <WhatsappIcon className="size-4.5 text-[#25D366]" /> WhatsApp
                </a>
              </li>
            )}
            <li className="flex-[1.4]">
              <Link href="/contatti" className="flex h-15 items-center justify-center bg-champagne text-[0.7rem] text-charcoal font-semibold uppercase tracking-[0.18em]">
                Richiedi preventivo
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
