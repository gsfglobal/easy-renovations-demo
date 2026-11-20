import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/content";
import { ModelViewerLazy } from "./ModelViewerLazy";

/**
 * Sezione 3D OPZIONALE. Appare solo se features.threeD = true E se è
 * configurato un modello .glb reale (threeD.modelUrl). Nessun tour fittizio.
 */
export function ModelSection() {
  const t = site.threeD;
  if (!site.features.threeD || !t.modelUrl) return null;
  return (
    <section className="bg-sand/60 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="3D" title={t.title || "Esplora il progetto"} intro={t.caption} />
        <Reveal className="mt-12">
          <ModelViewerLazy url={t.modelUrl} label={t.title || "Modello 3D del progetto"} />
        </Reveal>
      </div>
    </section>
  );
}
