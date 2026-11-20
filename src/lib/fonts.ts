import { Cormorant_Garamond, DM_Sans, Fraunces, Inter, Manrope, Playfair_Display } from "next/font/google";
import { themeConfig } from "@/config/theme.config";

/*
 * Font ottimizzati e self-hosted da next/font (i valori devono essere letterali).
 * Il font usato è quello scelto in theme.config.ts. Se cambi font predefinito,
 * imposta qui `preload: true` sul nuovo font e `false` sul precedente.
 */
const sel = themeConfig.fonts;

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap", preload: false });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-playfair", display: "swap", preload: true });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", preload: false });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap", preload: true });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: false });
const dmsans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans", display: "swap", preload: false });

const headingMap = { cormorant, playfair, fraunces };
const bodyMap = { manrope, inter, dmsans };

export const fontVariables = [headingMap[sel.heading].variable, bodyMap[sel.body].variable].join(" ");
export const fontStack = {
  heading: `var(${({ cormorant: "--font-cormorant", playfair: "--font-playfair", fraunces: "--font-fraunces" } as const)[sel.heading]})`,
  body: `var(${({ manrope: "--font-manrope", inter: "--font-inter", dmsans: "--font-dmsans" } as const)[sel.body]})`,
};
