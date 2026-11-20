/**
 * Tema grafico. I colori principali arrivano da site.config.ts → branding
 * (così ogni impresa ha un solo punto di modifica). Qui si scelgono i font
 * tra quelli già ottimizzati con next/font e alcune preferenze visive.
 */
export type HeadingFont = "cormorant" | "playfair" | "fraunces";
export type BodyFont = "manrope" | "inter" | "dmsans";

export const themeConfig: {
  fonts: { heading: HeadingFont; body: BodyFont };
  /** Raggio degli angoli in px (0 = stile architettonico rigoroso) */
  radius: number;
  /** Bianco puro usato per testi su sfondi scuri e superfici */
  white: string;
} = {
  fonts: { heading: "playfair", body: "manrope" },
  radius: 0,
  white: "#FFFFFF",
};
