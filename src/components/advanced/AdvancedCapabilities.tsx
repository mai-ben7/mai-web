"use client";

import * as React from "react";
import { CAPABILITIES, type Capability } from "@/data/advanced";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

/** Hook: reduced-motion */
function usePrefersReducedMotion() {
  const [prefers, setPrefers] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setPrefers(mq.matches);
    handler();
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return prefers;
}

/** Props */
export interface AdvancedCapabilitiesProps {
  items?: Capability[];       // defaults to CAPABILITIES
  defaultId?: string;         // default active
  className?: string;
  title?: string;
  subtitle?: string;
  rtl?: boolean;              // support RTL layout tweak (optional)
}

export default function AdvancedCapabilities({
  items = CAPABILITIES,
  defaultId,
  className,
  title = "יכולות מתקדמות",
  subtitle = "מה הסטודיו מספק בפרויקט שלך",
  rtl = true,
}: AdvancedCapabilitiesProps) {
  const prefersReduced = usePrefersReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  const [activeId, setActiveId] = React.useState<string>("");

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
    setActiveId(defaultId ?? items[0]?.id ?? "");
  }, [defaultId, items]);

  const active = items.find(i => i.id === activeId) ?? items[0];

  // keyboard navigation within list
  const onKeyDownList = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const idx = items.findIndex(i => i.id === activeId);
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setActiveId(items[(idx + 1) % items.length].id);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveId(items[(idx - 1 + items.length) % items.length].id);
    }
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <section
        id="advanced"
        dir={rtl ? "rtl" : "ltr"}
        className={clsx("relative", className)}
        aria-label="Advanced capabilities"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header className={clsx("mb-10", rtl ? "text-right" : "text-left")}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">{title}</h2>
            {subtitle && <p className="mt-3 text-base text-white/70">{subtitle}</p>}
          </header>
          <div className="grid gap-6 md:gap-10 items-start md:grid-cols-[minmax(260px,360px),1fr]">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-2 text-white" style={{ maxHeight: 520 }}>
              <div className="relative z-10 flex flex-col gap-2">
                {items.map((cap) => (
                  <div key={cap.id} className="w-full text-left px-4 py-3 rounded-2xl">
                    <div className="text-xs opacity-70">{cap.label}</div>
                    <div className="text-base sm:text-lg font-medium leading-tight text-white/70">{cap.title}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 sm:p-8 text-white">
              <h3 className="text-2xl font-semibold">{items[0]?.title || ""}</h3>
              <p className="mt-2 text-white/80">{items[0]?.blurb || ""}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="advanced"
      dir={rtl ? "rtl" : "ltr"}
      className={clsx("relative", className)}
      aria-label="Advanced capabilities"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <header className={clsx("mb-10", rtl ? "text-right" : "text-left")}>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">{title}</h2>
          {subtitle && <p className="mt-3 text-base text-white/70">{subtitle}</p>}
        </header>

        {/* Layout: list (left/rtl-right) + content panel */}
        <div className={clsx(
          "grid gap-6 md:gap-10 items-start",
          "md:grid-cols-[minmax(260px,360px),1fr]"
        )}>
          {/* Feature list with sliding highlight */}
          <FeatureList
            items={items}
            activeId={activeId}
            onChange={setActiveId}
            onKeyDown={onKeyDownList}
            rtl={rtl}
          />

          {/* Content panel */}
          <div className={clsx("relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 sm:p-8 text-white")}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: rtl ? 8 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: rtl ? -8 : -8 }}
                transition={{ duration: prefersReduced ? 0.15 : 0.28, ease: "easeOut" }}
              >
                <h3 className="text-2xl font-semibold">{active.title}</h3>
                <p className="mt-2 text-white/80">{active.blurb}</p>
                <ul className={clsx("mt-5 grid gap-3", "sm:grid-cols-2")}>
                  {active.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="text-sm leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Sidebar feature list with a sliding active highlight bar */
function FeatureList({
  items,
  activeId,
  onChange,
  onKeyDown,
  rtl
}: {
  items: Capability[];
  activeId: string;
  onChange: (id: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  rtl: boolean;
}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [indicatorStyle, setIndicatorStyle] = React.useState<React.CSSProperties>({});

  // Recompute highlight position when active changes or on resize
  React.useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const btn = el.querySelector<HTMLButtonElement>(`[data-id="${activeId}"]`);
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const crect = el.getBoundingClientRect();
    const top = rect.top - crect.top + el.scrollTop;
    setIndicatorStyle({ top, height: rect.height });
  }, [activeId]);

  React.useEffect(() => {
    const onResize = () => {
      // trigger relayout
      setTimeout(() => {
        const el = containerRef.current;
        if (!el) return;
        const btn = el.querySelector<HTMLButtonElement>(`[data-id="${activeId}"]`);
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const crect = el.getBoundingClientRect();
        const top = rect.top - crect.top + el.scrollTop;
        setIndicatorStyle({ top, height: rect.height });
      }, 0);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeId]);

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label="Feature list"
      onKeyDown={onKeyDown}
      className={clsx(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur",
        "p-2 text-white"
      )}
      style={{ maxHeight: 520 }}
    >
      {/* Sliding highlight (like CodePen): absolute bar that moves to active item */}
      <motion.div
        aria-hidden
        className={clsx(
          "absolute left-2 right-2 rounded-2xl bg-white/10 border border-white/10",
          rtl && "right-2 left-2" // symmetric for RTL
        )}
        animate={{ top: indicatorStyle.top ?? 8, height: indicatorStyle.height ?? 48 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
      />

      <ul className="relative z-10 flex flex-col gap-2">
        {items.map((cap) => {
          const active = cap.id === activeId;
          return (
            <li key={cap.id}>
                             <button
                 data-id={cap.id}
                 role="tab"
                 aria-selected={active}
                 aria-controls={`panel-${cap.id}`}
                 onClick={() => onChange(cap.id)}
                 suppressHydrationWarning
                 className={clsx(
                   "w-full text-left px-4 py-3 rounded-2xl outline-none transition",
                   "focus-visible:ring-2 ring-offset-2 ring-offset-[#0B0F14] focus-visible:ring-white/60",
                   active ? "text-white" : "text-white/70 hover:text-white"
                 )}
               >
                <div className="text-xs opacity-70">{cap.label}</div>
                <div className="text-base sm:text-lg font-medium leading-tight">{cap.title}</div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
