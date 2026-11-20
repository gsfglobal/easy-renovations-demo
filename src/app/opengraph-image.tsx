import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const dynamic = "force-static";

export const alt = site.seo.defaultTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Immagine Open Graph generata automaticamente da nome, tagline e palette dell'impresa. */
export default function OgImage() {
  const b = site.branding;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: b.primaryColor, color: b.backgroundColor, padding: 80, fontFamily: "serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, color: b.accentColor, fontSize: 22, letterSpacing: 6, textTransform: "uppercase", fontFamily: "sans-serif" }}>
          <div style={{ width: 60, height: 2, background: b.accentColor }} />
          {site.company.serviceAreas[0]}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 1 }}>{site.company.name}</div>
          <div style={{ fontSize: 40, marginTop: 24, opacity: 0.75, fontStyle: "italic" }}>{site.company.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
