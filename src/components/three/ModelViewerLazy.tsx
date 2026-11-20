"use client";

import dynamic from "next/dynamic";

/** three.js viene scaricato solo quando la sezione 3D è attiva. */
export const ModelViewerLazy = dynamic(() => import("./ModelViewer"), {
  ssr: false,
  loading: () => <div className="aspect-[16/9] w-full animate-pulse bg-charcoal/10" aria-label="Caricamento modello 3D" />,
});
