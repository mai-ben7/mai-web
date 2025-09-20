"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import BlobButton from "@/components/ui/BlobButton";
import type { Project } from "@/data/projects";
import RevealText from "@/components/RevealText";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function HomeProjectsPreview({
  items,
  title,
  subtitle,
  ctaHref = "/projects",
  ctaLabel,
  id = "projects-preview",
  rtl = true,
}: {
  items: Project[];
  title?: string;
  subtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
  id?: string;
  rtl?: boolean;
}) {
  const { t, dir } = useI18n();
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const scrollBy = (dx: number) => {
    const step = dx * (dir === "rtl" ? -1 : 1);
    scrollerRef.current?.scrollBy({ left: step, behavior: "smooth" });
  };
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const [cursorPos, setCursorPos] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });

  return (
    <section id={id} className="min-h-screen py-20 flex flex-col justify-center relative" dir={rtl ? "rtl" : "ltr"}>

      <div className="container relative z-10">
        {/* Headline block */}
        <header className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-indigo-700 text-lg max-w-lg mx-auto mb-2 capitalize flex items-center gap-3 justify-center">
            {title || t("projects.title")}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </span>
          <RevealText as="h1" className="text-white text-4xl md:text-5xl xl:text-6xl font-extrabold max-w-3xl mx-auto mb-6 leading-snug" splitBy="word" stagger={0.06}>
            {t("projects.title")}
          </RevealText>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
            {subtitle || t("projects.subtitle")}
          </p>
        </header>

        {/* Peek strip */}
        <div className="relative max-w-6xl mx-auto">

          {/* arrows (desktop) */}
          <div className="hidden md:flex absolute right-4 -top-12 items-center gap-2 z-20">
            <button 
              onClick={() => scrollBy(-480)} 
              className="rounded-full border border-cyan-400/30 bg-cyan-400/10 p-3 hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm" 
              aria-label={t("projects.scrollLeft")}
              suppressHydrationWarning
            >
              <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <button 
              onClick={() => scrollBy(+480)} 
              className="rounded-full border border-pink-400/30 bg-pink-400/10 p-3 hover:bg-pink-400/20 hover:border-pink-400/50 transition-all duration-300 backdrop-blur-sm" 
              aria-label={t("projects.scrollRight")}
              suppressHydrationWarning
            >
              <svg className="w-5 h-5 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <div
            ref={scrollerRef}
            className="snap-x snap-mandatory overflow-x-auto no-scrollbar flex gap-4 pe-4"
          >
            {items.map((p) => (
              <article
                key={p.id}
                className={`group relative w-[75vw] sm:w-[55vw] lg:w-[420px] xl:w-[460px]
                           snap-start shrink-0 overflow-hidden rounded-3xl p-[2px] bg-gradient-to-b from-pink-500 via-rose-500 to-purple-600
                           ${hoveredId === String(p.id) ? "cursor-none" : "cursor-pointer"}`}
                onMouseEnter={() => setHoveredId(String(p.id))}
                onMouseLeave={() => setHoveredId(null)}
                onMouseMove={(e) => {
                  const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  setCursorPos({ x: e.clientX - r.left, y: e.clientY - r.top });
                }}
                style={{ cursor: hoveredId === String(p.id) ? "none" as const : "pointer" as const }}
              >
                {p.href ? (
                  <Link href={p.href} aria-label={`${t("projects.viewProject")}: ${p.title}`} className="absolute inset-0 z-20" style={{ cursor: hoveredId === String(p.id) ? "none" : "pointer" }} />
                ) : null}
                {/* Force hide cursor on all children while hovered */}
                {hoveredId === String(p.id) && (
                  <style>{`.cursor-none *{ cursor: none !important }`}</style>
                )}
                {/* Inner card surface */}
                <div className="relative rounded-[22px] bg-white/90 backdrop-blur-sm">
                  {/* Framed device-style preview */}
                  <div className="px-4 pt-5">
                    <div className="relative rounded-3xl bg-gradient-to-b from-pink-500 via-rose-500 to-purple-600 p-[2px] shadow-xl transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.06] group-hover:rotate-[-2deg]">
                      <div className="rounded-[22px] bg-black p-3">
                        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
                          <Image
                            src={p.cover}
                            alt={p.title}
                            fill
                            sizes="(min-width:1280px) 540px, (min-width:1024px) 500px, 65vw"
                            className="object-cover"
                            priority={false}
                          />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Text content below image */}
                  <div className="p-5 pb-4">
                    <div className="flex items-center gap-3 mb-4">
                      {p.tags?.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-slate-700 text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">
                      {p.title}
                    </h3>
                    <p className="text-base text-slate-700 mb-4 leading-relaxed">
                      {p.oneLiner}
                    </p>
                    <div className="flex items-center gap-3">
                      {p.href && (
                        <Link 
                          href={p.href} 
                          className="btn-primary rounded-2xl px-5 py-2.5 text-sm font-bold"
                        >
                          {t("projects.viewProject")}
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Subtle finish highlight */}
                  <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[22px] bg-gradient-to-b from-white/30 via-transparent to-white/25" />
                </div>
                {/* Custom playful hover cursor (applies to entire card area) */}
                {hoveredId === String(p.id) && (
                  <div
                    className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2 select-none"
                    style={{ left: cursorPos.x, top: cursorPos.y }}
                  >
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-pink-500/90 to-purple-600/90 text-white flex items-center justify-center shadow-2xl ring-2 ring-white/30 backdrop-blur-md">
                      <span className="text-[11px] font-extrabold tracking-wider">{t("projects.viewProject")} ↗</span>
                      <div className="absolute inset-0 rounded-full border-2 border-white/40 border-dashed animate-spin-slow" />
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* Secondary CTA */}
        <div className="mt-12 text-center">
          <BlobButton
            href={ctaHref}
            variant="primary"
            className="inline-flex items-center text-lg"
          >
            {ctaLabel || t("projects.viewAllProjects")}
            <svg className="w-5 h-5 me-2 flip-x-rtl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </BlobButton>
        </div>
      </div>
    </section>
  );
}
