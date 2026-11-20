import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Privacy Policy", description: `Informativa sul trattamento dei dati personali di ${site.company.name}.`, path: "/privacy-policy" });

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" path="/privacy-policy" externalUrl={site.legal.privacyPolicyUrl} sections={site.legal.privacySections} />;
}
