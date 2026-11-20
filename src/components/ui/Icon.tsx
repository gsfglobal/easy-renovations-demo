import {
  ClipboardList, Clock, Hammer, Home, KeyRound, Leaf, MessageCircle, Phone, Ruler, ShieldCheck, Sparkles, Wrench,
  type LucideProps,
} from "lucide-react";
import type { iconNames } from "@/config/schema";

const map = {
  phone: Phone, ruler: Ruler, hammer: Hammer, key: KeyRound, message: MessageCircle, clipboard: ClipboardList,
  home: Home, sparkles: Sparkles, shield: ShieldCheck, clock: Clock, leaf: Leaf, wrench: Wrench,
} satisfies Record<(typeof iconNames)[number], unknown>;

export function Icon({ name, ...props }: { name: (typeof iconNames)[number] } & LucideProps) {
  const C = map[name];
  return <C strokeWidth={1.25} aria-hidden {...props} />;
}
