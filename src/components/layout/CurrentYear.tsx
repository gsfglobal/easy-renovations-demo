"use client";

/** Anno corrente calcolato nel browser: il copyright resta aggiornato anche su pagine statiche. */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
