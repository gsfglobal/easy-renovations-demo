import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Trasforma "\n" del config in righe separate */
export function lines(text: string) {
  return text.split("\n");
}
