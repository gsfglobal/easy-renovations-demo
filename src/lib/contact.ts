import { site } from "./content";
import { normalizePhone, normalizeWhatsapp } from "./phone";

export { normalizePhone, normalizeWhatsapp };

export const whatsappNumber = normalizeWhatsapp(site.contact.whatsapp);
export const phoneNumber = normalizePhone(site.contact.phone);

export function whatsappHref(message = site.contact.whatsappDefaultMessage): string | null {
  if (!whatsappNumber) return null;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
export const phoneHref = phoneNumber ? `tel:${phoneNumber}` : null;
export const emailHref = site.contact.email ? `mailto:${site.contact.email}` : null;

export function formattedAddress() {
  const a = site.contact.address;
  return [a.street, [a.postalCode, a.city, a.province ? `(${a.province})` : ""].filter(Boolean).join(" ")]
    .filter((x) => x.trim())
    .join(", ");
}

export const socialLinks = (
  [
    ["Instagram", site.social.instagram],
    ["Facebook", site.social.facebook],
    ["LinkedIn", site.social.linkedin],
    ["YouTube", site.social.youtube],
    ["TikTok", site.social.tiktok],
  ] as const
).filter(([, url]) => !!url);
