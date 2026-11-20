import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import "./globals.css";
import { themeConfig } from "@/config/theme.config";
import { fontStack, fontVariables } from "@/lib/fonts";
import { isDemo, site, siteUrl } from "@/lib/content";
import { phoneHref, whatsappHref } from "@/lib/contact";
import { localBusinessJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactDock } from "@/components/layout/ContactDock";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.seo.defaultTitle, template: site.seo.titleTemplate },
  description: site.seo.description,
  keywords: site.seo.keywords,
  applicationName: site.company.name,
  robots: isDemo ? { index: false, follow: false, googleBot: { index: false, follow: false } } : { index: true, follow: true },
  ...(site.branding.favicon ? { icons: { icon: site.branding.favicon } } : {}),
};

export const viewport: Viewport = {
  themeColor: site.branding.primaryColor,
  width: "device-width",
  initialScale: 1,
};

const nav = [
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/servizi", label: "Servizi" },
  { href: "/progetti", label: "Progetti" },
  { href: "/contatti", label: "Contatti" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const b = site.branding;
  const vars = {
    "--brand-charcoal": b.primaryColor,
    "--brand-ivory": b.backgroundColor,
    "--brand-champagne": b.accentColor,
    "--brand-stone": b.mutedColor,
    "--brand-white": themeConfig.white,
    "--brand-radius": `${themeConfig.radius}px`,
    "--font-heading-stack": `${fontStack.heading}, Georgia, serif`,
    "--font-body-stack": `${fontStack.body}, system-ui, sans-serif`,
  } as CSSProperties;
  const jsonLd = localBusinessJsonLd();
  const wa = whatsappHref();

  return (
    <html lang="it" className={fontVariables} style={vars} data-mode={isDemo ? "demo" : "production"}>
      <body>
        <a href="#contenuto" className="sr-only z-[100] bg-charcoal px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Vai al contenuto
        </a>
        <Header
          nav={nav}
          logo={{ name: site.company.name, logo: b.logo, logoLight: b.logoLight }}
          phoneHref={phoneHref}
          whatsappHref={wa}
          isDemo={isDemo}
          tagline={site.company.tagline}
        />
        <main id="contenuto">{children}</main>
        <Footer />
        <ContactDock
          whatsappHref={wa}
          phoneHref={phoneHref}
          floating={site.features.floatingWhatsapp}
          sticky={site.features.mobileStickyCta}
        />
        {jsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        )}
      </body>
    </html>
  );
}
