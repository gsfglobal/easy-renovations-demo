"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import type { SiteImage } from "@/config/schema";
import { cn } from "@/lib/utils";

/**
 * Confronto PRIMA / DOPO accessibile:
 * mouse, touch (pointer events), tastiera (frecce, PagSu/PagGiù, Home/Fine).
 */
export function BeforeAfterSlider({
  before, after, label, className, initial = 50,
}: { before: SiteImage; after: SiteImage; label: string; className?: string; initial?: number }) {
  const [pos, setPos] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  const setFromX = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey || e.key.startsWith("Page") ? 10 : 2;
    const map: Record<string, number> = {
      ArrowLeft: pos - step, ArrowDown: pos - step, PageDown: pos - step,
      ArrowRight: pos + step, ArrowUp: pos + step, PageUp: pos + step,
      Home: 0, End: 100,
    };
    if (e.key in map) {
      e.preventDefault();
      setPos(Math.min(100, Math.max(0, map[e.key]!)));
    }
  };

  return (
    <div
      ref={box}
      className={cn("relative aspect-[16/11] w-full touch-pan-y overflow-hidden bg-sand select-none", dragging ? "cursor-grabbing" : "cursor-ew-resize", className)}
      onPointerDown={(e) => {
        (e.target as Element).setPointerCapture?.(e.pointerId);
        setDragging(true);
        setFromX(e.clientX);
      }}
      onPointerMove={(e) => dragging && setFromX(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <Image src={before.src} alt={before.alt} fill sizes="(min-width: 1024px) 80vw, 100vw" className="pointer-events-none object-cover" draggable={false} />
      <div
        className={cn("absolute inset-0", !dragging && "transition-[clip-path] duration-300 ease-out")}
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <Image src={after.src} alt={after.alt} fill sizes="(min-width: 1024px) 80vw, 100vw" className="pointer-events-none object-cover" draggable={false} />
      </div>

      <span className="pointer-events-none absolute top-4 left-4 bg-charcoal/80 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-paper backdrop-blur-sm transition-opacity" style={{ opacity: pos > 12 ? 1 : 0 }}>
        Prima
      </span>
      <span className="pointer-events-none absolute top-4 right-4 bg-paper/90 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-charcoal backdrop-blur-sm transition-opacity" style={{ opacity: pos < 88 ? 1 : 0 }}>
        Dopo
      </span>

      <div className={cn("absolute inset-y-0 w-px bg-paper/90", !dragging && "transition-[left] duration-300 ease-out")} style={{ left: `${pos}%` }} aria-hidden />
      <div
        role="slider"
        tabIndex={0}
        aria-label={`Confronto prima e dopo: ${label}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% prima, ${100 - Math.round(pos)}% dopo`}
        onKeyDown={onKey}
        className={cn(
          "absolute top-1/2 inline-flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/80 bg-charcoal/40 text-paper shadow-lg backdrop-blur-md",
          "transition-transform duration-300 hover:scale-105",
          !dragging && "transition-[left,transform]",
        )}
        style={{ left: `${pos}%` }}
      >
        <ChevronsLeftRight className="size-5" strokeWidth={1.25} aria-hidden />
      </div>
    </div>
  );
}
