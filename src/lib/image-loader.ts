/**
 * Loader usato solo nell'export statico (GitHub Pages): le immagini sono già
 * ottimizzate in WebP, quindi si aggiunge solo il basePath del sito.
 */
export default function staticLoader({ src }: { src: string; width: number; quality?: number }) {
  if (/^https?:\/\//.test(src)) return src;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
