"use client";

import { motion, useReducedMotion } from "motion/react";

/** Linea della timeline che si disegna all'ingresso nel viewport. */
export function MethodLine() {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className="absolute top-0 left-0 hidden h-px w-full origin-left bg-charcoal/20 lg:block"
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
