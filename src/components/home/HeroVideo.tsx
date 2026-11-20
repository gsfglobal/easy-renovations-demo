"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Video di sfondo caricato solo su schermi ≥ 768px, senza risparmio dati
 * e senza preferenza di movimento ridotto. Altrimenti resta l'immagine.
 */
export function HeroVideo({ src }: { src: string }) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const ok =
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !conn?.saveData &&
      !["slow-2g", "2g", "3g"].includes(conn?.effectiveType ?? "");
    if (!ok) return;
    const id = window.setTimeout(() => setEnabled(true), 600);
    return () => window.clearTimeout(id);
  }, []);

  if (!enabled) return null;
  return (
    <video
      ref={ref}
      className="absolute inset-0 size-full object-cover transition-opacity duration-[1500ms]"
      style={{ opacity: ready ? 1 : 0 }}
      src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
      onCanPlay={() => setReady(true)}
    />
  );
}
