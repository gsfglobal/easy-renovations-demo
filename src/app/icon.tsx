import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const dynamic = "force-static";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon automatica: iniziale dell'impresa sui colori del brand. */
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: site.branding.primaryColor, color: site.branding.accentColor, fontSize: 44, fontFamily: "serif" }}>
        {site.company.name.trim().charAt(0).toUpperCase()}
      </div>
    ),
    size,
  );
}
