import Link from "next/link";
import { getServices, isDemo, site } from "@/lib/content";
import { emailHref, formattedAddress, phoneHref, socialLinks, whatsappHref } from "@/lib/contact";
import { Logo } from "./Logo";
import { CurrentYear } from "./CurrentYear";

const nav = [
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/servizi", label: "Servizi" },
  { href: "/progetti", label: "Progetti" },
  { href: "/contatti", label: "Contatti" },
];

export function Footer() {
  const wa = whatsappHref();
  const address = formattedAddress();
  return (
    <footer className="bg-charcoal pb-28 text-paper/70 lg:pb-0">
      <div className="container-x grid gap-14 py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <div className="lg:col-span-4">
          <Logo data={{ name: site.company.name, logo: site.branding.logo, logoLight: site.branding.logoLight }} tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">{site.company.description}</p>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-paper/45">
            Zone servite · {site.company.serviceAreas.join(" · ")}
          </p>
        </div>

        <FooterCol title="Menu" className="lg:col-span-2">
          {nav.map((n) => (
            <li key={n.href}><Link className="transition-colors hover:text-champagne" href={n.href}>{n.label}</Link></li>
          ))}
        </FooterCol>

        <FooterCol title="Servizi" className="lg:col-span-3">
          {getServices().map((s) => (
            <li key={s.slug}><Link className="transition-colors hover:text-champagne" href={`/servizi/${s.slug}`}>{s.title}</Link></li>
          ))}
        </FooterCol>

        <FooterCol title="Contatti" className="lg:col-span-3">
          {phoneHref && <li><a className="hover:text-champagne" href={phoneHref}>{site.contact.phone}</a></li>}
          {wa && <li><a className="hover:text-champagne" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>}
          {emailHref && <li><a className="break-all hover:text-champagne" href={emailHref}>{site.contact.email}</a></li>}
          {address && <li>{address}</li>}
          {!phoneHref && !wa && !emailHref && (
            <li className="text-paper/45">{isDemo ? "Recapiti disponibili nella versione definitiva." : "Scrivici dalla pagina contatti."}</li>
          )}
          {socialLinks.length > 0 && (
            <li className="flex flex-wrap gap-x-5 gap-y-2 pt-3">
              {socialLinks.map(([label, url]) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-[0.18em] hover:text-champagne">
                  {label}
                </a>
              ))}
            </li>
          )}
        </FooterCol>
      </div>
      <div className="border-t border-paper/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {site.company.legalName || site.company.name}
            {site.company.vatNumber && <> · P.IVA {site.company.vatNumber}</>}
          </p>
          <ul className="flex gap-6">
            <li><Link className="hover:text-paper" href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link className="hover:text-paper" href="/cookie-policy">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="eyebrow mb-6 font-sans text-paper">{title}</h2>
      <ul className="space-y-3 text-sm">{children}</ul>
    </div>
  );
}
