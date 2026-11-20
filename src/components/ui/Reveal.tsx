"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Comparsa morbida all'ingresso nel viewport. Rispetta prefers-reduced-motion. */
export function Reveal({
  children, delay = 0, y = 28, className, as = "div",
}: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "article" | "section" }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}
