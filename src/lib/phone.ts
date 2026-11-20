/** Funzioni pure (usate anche dal validatore, senza dipendenze dal config). */

/**
 * Normalizza un numero per wa.me: solo cifre con prefisso internazionale.
 * Accetta "+39 333 1234567", "333 1234567", "0039...". Restituisce null se non valido.
 */
export function normalizeWhatsapp(input: string): string | null {
  if (!input) return null;
  let digits = input.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  else if (digits.startsWith("00")) digits = digits.slice(2);
  else if (/^3\d{8,9}$/.test(digits)) digits = `39${digits}`; // cellulare italiano senza prefisso
  if (digits.includes("+")) return null;
  if (digits.startsWith("39")) return /^393\d{8,9}$/.test(digits) ? digits : null; // WhatsApp IT: cellulari
  return /^[1-9]\d{7,14}$/.test(digits) ? digits : null;
}

export function normalizePhone(input: string): string | null {
  if (!input) return null;
  let digits = input.replace(/[^\d+]/g, "");
  if (digits.startsWith("00")) digits = `+${digits.slice(2)}`;
  if (!digits.startsWith("+")) digits = `+39${digits}`;
  return /^\+\d{8,15}$/.test(digits) ? digits : null;
}
