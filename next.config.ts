import type { NextConfig } from "next";

/**
 * Due modalità di build:
 * - normale (Vercel): ottimizzazione immagini e header di sicurezza
 * - STATIC_EXPORT=1 (GitHub Pages): sito statico in /out, con basePath opzionale
 */
const isExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = isExport
  ? {
      output: "export",
      trailingSlash: true,
      basePath,
      images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
    }
  : {
      images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2400],
      },
      poweredByHeader: false,
      async headers() {
        return [
          {
            source: "/:path*",
            headers: [
              { key: "X-Content-Type-Options", value: "nosniff" },
              { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
              { key: "X-Frame-Options", value: "SAMEORIGIN" },
              { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
            ],
          },
        ];
      },
    };

export default nextConfig;
