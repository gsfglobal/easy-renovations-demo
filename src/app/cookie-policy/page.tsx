import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Cookie Policy", description: `Informativa sull'uso dei cookie di ${site.company.name}.`, path: "/cookie-policy" });

export default function CookiePage() {
  return <LegalPage title="Cookie Policy" path="/cookie-policy" externalUrl={site.legal.cookiePolicyUrl} sections={site.legal.cookieSections} />;
}
