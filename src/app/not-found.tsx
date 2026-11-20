import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-charcoal text-paper">
      <div className="container-x pt-24">
        <p className="eyebrow text-champagne">Errore 404</p>
        <h1 className="display-1 mt-6">Pagina non trovata.</h1>
        <p className="lead mt-6 max-w-md text-paper/70">La pagina che cerchi non esiste o è stata spostata.</p>
        <ButtonLink href="/" variant="accent" className="mt-10">Torna alla home</ButtonLink>
      </div>
    </section>
  );
}
