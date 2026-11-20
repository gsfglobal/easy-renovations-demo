"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { SiteImage } from "@/config/schema";
import { cn } from "@/lib/utils";
import { DemoBadge } from "./DemoBadge";

/** Fotografia con parallax leggero (disattivato con prefers-reduced-motion). */
export function ParallaxImage({
  image, sizes, className, strength = 8, priority = false, showDemo = true,
}: { image: SiteImage; sizes: string; className?: string; strength?: number; priority?: boolean; showDemo?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-sand", className)}>
      <motion.div className="absolute -inset-y-[10%] inset-x-0" style={reduce ? undefined : { y }}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
      {showDemo && image.demo && <DemoBadge className="absolute bottom-3 left-3" />}
    </div>
  );
}
