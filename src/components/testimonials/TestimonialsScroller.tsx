"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import clsx from "clsx";

/** ====== Types ====== */
export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  role?: string;
};

export interface TestimonialsScrollerProps {
  items: Testimonial[];
  title?: string;
  subtitle?: string;
  className?: string;
  /** Height per card in viewport units (vh). Increase if swaps feel too fast. */
  vhPerCard?: number; // default 120
  /** Top offset (px) for sticky container (e.g., to clear a fixed navbar). */
  stickyTop?: number; // default 96
}

/** ====== Utils ====== */
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

function useIsSmallScreen(breakpointPx = 640) {
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${breakpointPx - 1}px)`);
    const update = () => setIsSmall(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, [breakpointPx]);
  return isSmall;
}

/** Accessible dot */
function Dot({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? "true" : undefined}
      onClick={onClick}
             className={clsx(
         "h-2 w-2 rounded-full transition-all",
         active ? "scale-125 bg-blue-600" : "bg-slate-300 hover:bg-slate-400"
       )}
      suppressHydrationWarning
    />
  );
}

/** ====== Component ====== */
export default function TestimonialsScroller({
  items,
  title = "מה הלקוחות אומרים",
  subtitle = "תוצאות אמיתיות מלקוחות מרוצים",
  className,
  vhPerCard = 120,
  stickyTop = 96,
}: TestimonialsScrollerProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isSmall = useIsSmallScreen(640);

  return (
    <section id="testimonials" className={clsx("relative", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {isSmall ? (
          <>
            <header className="mb-10 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{title}</h2>
              {subtitle ? <p className="mt-3 text-base text-slate-600">{subtitle}</p> : null}
            </header>
            <MobileSwipe items={items} prefersReducedMotion={prefersReducedMotion} />
          </>
        ) : (
          <DesktopPinned
            items={items}
            title={title}
            subtitle={subtitle}
            vhPerCard={vhPerCard}
            stickyTop={stickyTop}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
      </div>
    </section>
  );
}

/** ====== Desktop pinned variant ====== */
function DesktopPinned({
  items,
  title,
  subtitle,
  vhPerCard,
  stickyTop,
  prefersReducedMotion,
}: {
  items: Testimonial[];
  title: string;
  subtitle?: string;
  vhPerCard: number;
  stickyTop: number;
  prefersReducedMotion: boolean;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const totalVh = Math.max(120, Math.floor(items.length * vhPerCard));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end start"],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = clamp(Math.round(p * (items.length - 1)), 0, items.length - 1);
    setActiveIndex(idx);
  });

  const ranges = useMemo(() => {
    const n = items.length;
    return items.map((_, i) => {
      const start = i / n;
      const end = (i + 1) / n;
      const mid = (start + end) / 2;
      return { start, mid, end };
    });
  }, [items]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${totalVh}vh` }}
      aria-roledescription="Scroll area for testimonials"
    >
      <div className="sticky" style={{ top: stickyTop }} aria-live="polite">
        <div className="relative mx-auto max-w-2xl">
          {/* Header */}
          <header className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{title}</h2>
            {subtitle ? <p className="mt-3 text-base text-slate-600">{subtitle}</p> : null}
          </header>
          
          {/* Dots */}
          <div className="mb-6 flex items-center justify-center gap-3">
            {items.map((t, i) => (
                             <Dot key={t.id} active={i === activeIndex} label={`עבור לעדות ${i + 1}: ${t.name}`} />
            ))}
          </div>

          {/* Stage */}
          <div className="relative h-[360px] sm:h-[400px] md:h-[420px]">
            {items.map((t, i) => {
              const { start, mid, end } = ranges[i];
              const opacity = prefersReducedMotion
                ? 1
                : useTransform(scrollYProgress, [start, start + 0.08, mid, end - 0.08, end], [0, 1, 1, 1, 0]);
              const y = prefersReducedMotion ? 0 : useTransform(scrollYProgress, [start, mid, end], [40, 0, -40]);
              const scale = prefersReducedMotion ? 1 : useTransform(scrollYProgress, [start, mid, end], [0.98, 1, 0.98]);
              const z = i === activeIndex ? 30 : 20 - Math.abs(i - activeIndex);

              return (
                <motion.article
                  key={t.id}
                  role="group"
                  aria-roledescription="testimonial"
                  aria-label={`Testimonial by ${t.name}`}
                                                         className={clsx(
                      "pointer-events-none absolute inset-0 rounded-3xl border-0",
                      "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 shadow-2xl p-8 sm:p-10 text-slate-900",
                      "flex flex-col justify-between backdrop-blur-sm"
                    )}
                  style={{ opacity: opacity as any, y: y as any, scale: scale as any, zIndex: z }}
                  transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.4 }}
                >
                                     <div className="text-right">
                                           <div className="text-sm uppercase tracking-widest text-blue-600 font-semibold">
                        עדות {i + 1} / {items.length}
                      </div>
                   </div>
                   <div className="flex-1 flex items-center">
                                           <blockquote className="text-lg sm:text-xl leading-relaxed text-slate-800 text-center w-full font-medium">"{t.quote}"</blockquote>
                   </div>
                   <div className="text-right">
                     <div className="flex items-center gap-3 justify-end">
                       <div className="text-sm">
                         <div className="font-semibold text-indigo-900">{t.name}</div>
                         {t.role ? <div className="text-purple-700">{t.role}</div> : null}
                       </div>
                       <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" aria-hidden />
                     </div>
                   </div>
                </motion.article>
              );
            })}
          </div>

                     <p className="mt-4 text-center text-xs text-slate-500">
             גלול כדי לעבור בין העדויות. המיקום הנוכחי שלך: {activeIndex + 1} מתוך {items.length}.
           </p>
        </div>
      </div>
    </div>
  );
}

/** ====== Mobile swipe variant ====== */
function MobileSwipe({
  items,
  prefersReducedMotion,
}: {
  items: Testimonial[];
  prefersReducedMotion: boolean;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Snap to nearest card on drag end
  const onDragEnd = () => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card="true"]');
    if (!card) return;

    const trackRect = el.getBoundingClientRect();
    // Find the card with center closest to track center
    let best = 0;
    let bestDist = Infinity;
    const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-card="true"]'));
    cards.forEach((c, idx) => {
      const r = c.getBoundingClientRect();
      const center = r.left + r.width / 2;
      const dist = Math.abs(center - (trackRect.left + trackRect.width / 2));
      if (dist < bestDist) {
        bestDist = dist;
        best = idx;
      }
    });
    setActiveIndex(best);
  };

  return (
    <div className="mx-auto max-w-md">
      {/* Dots */}
      <div className="mb-4 flex items-center justify-center gap-3">
        {items.map((t, i) => (
                     <Dot
             key={t.id}
             active={i === activeIndex}
             label={`עבור לעדות ${i + 1}: ${t.name}`}
             onClick={() => setActiveIndex(i)}
           />
        ))}
      </div>

      {/* Swipe track */}
      <div className="relative overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex gap-4"
          drag={prefersReducedMotion ? false : "x"}
          dragConstraints={{ left: -9999, right: 9999 }} // allow free drag; we handle snapping logically
          onDragEnd={onDragEnd}
          animate={{ x: `calc(${activeIndex * -100}% - ${activeIndex * 1}rem)` }} // 1rem gaps * index
          transition={{ type: "spring", stiffness: 140, damping: 18, mass: 0.5 }}
          style={{
            // width ensures each card is full width minus padding
            // but we rely on card min-width to create snapping visual
          }}
        >
          {items.map((t, i) => (
            <article
              key={t.id}
              data-card="true"
              role="group"
              aria-roledescription="testimonial"
              aria-label={`Testimonial by ${t.name}`}
                             className={clsx(
                 "shrink-0 grow-0 basis-full",
                 "rounded-3xl border-0 bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 shadow-2xl",
                 "p-6 text-slate-900",
                 "flex flex-col justify-between min-h-[300px] backdrop-blur-sm"
               )}
            >
                             <div className="text-right">
                 <div className="text-xs uppercase tracking-widest text-pink-600 font-semibold">
                   עדות {i + 1} / {items.length}
                 </div>
               </div>
               <div className="flex-1 flex items-center">
                 <blockquote className="text-base leading-relaxed text-slate-800 text-center w-full font-medium">"{t.quote}"</blockquote>
               </div>
               <div className="text-right">
                 <div className="flex items-center gap-3 justify-end">
                   <div className="text-sm">
                     <div className="font-semibold text-rose-900">{t.name}</div>
                     {t.role ? <div className="text-orange-700">{t.role}</div> : null}
                   </div>
                   <div className="h-3 w-3 rounded-full bg-gradient-to-r from-pink-500 to-orange-500" aria-hidden />
                 </div>
               </div>
            </article>
          ))}
        </motion.div>
      </div>

             <p className="mt-3 text-center text-xs text-slate-500">
         החלק כדי לעבור בין העדויות. {activeIndex + 1} / {items.length}
       </p>
    </div>
  );
}
