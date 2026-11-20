import type { Metadata } from "next";
import { getServices, isDemo, site, siteUrl } from "./content";
import { emailHref, phoneNumber, socialLinks } from "./contact";

export function pageMetadata(opts: { title?: string; description?: string; path: string; image?: string }): Metadata {
  const url = `${siteUrl}${opts.path === "/" ? "" : opts.path}`;
  const description = opts.description ?? site.seo.description;
  const title = opts.title ?? site.seo.defaultTitle;
  return {
    title: opts.title ? opts.title : { absolute: site.seo.defaultTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: site.locale,
      url,
      siteName: site.company.name,
      title,
      description,
      ...(opts.image ? { images: [{ url: opts.image }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
    robots: isDemo ? { index: false, follow: false } : { index: true, follow: true },
  };
}

/** Dati strutturati LocalBusiness: generati solo in produzione e solo con dati reali. */
export function localBusinessJsonLd() {
  if (isDemo) return null;
  const a = site.contact.address;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": site.seo.businessType,
    name: site.company.legalName || site.company.name,
    description: site.company.description,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    areaServed: site.company.serviceAreas.map((name) => ({ "@type": "Place", name })),
    makesOffer: getServices().map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })),
  };
  if (phoneNumber) data.telephone = phoneNumber;
  if (emailHref) data.email = site.contact.email;
  if (site.company.vatNumber) data.vatID = site.company.vatNumber;
  if (a.street && a.city) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: a.street,
      postalCode: a.postalCode,
      addressLocality: a.city,
      addressRegion: a.province,
      addressCountry: a.country,
    };
  }
  if (socialLinks.length) data.sameAs = socialLinks.map(([, u]) => u);
  return data;
}
