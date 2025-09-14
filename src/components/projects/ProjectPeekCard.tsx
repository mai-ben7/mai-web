"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function ProjectPeekCard({ p }: { p: Project }) {
  const { t } = useI18n();
  const [isHovered, setIsHovered] = React.useState(false);
  const [cursorPos, setCursorPos] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });

  return (
    <article
      className={`group relative w-[75vw] sm:w-[55vw] lg:w-[420px] xl:w-[460px]
                 snap-start shrink-0 overflow-hidden rounded-3xl p-[2px] bg-gradient-to-b from-pink-500 via-rose-500 to-purple-600
                 ${isHovered ? "cursor-none" : "cursor-pointer"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setCursorPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      style={{ cursor: isHovered ? "none" as const : "pointer" as const }}
    >
      {p.href ? (
        <Link href={p.href} aria-label={`${t("projects.viewProject")}: ${p.title}`} className="absolute inset-0 z-20" style={{ cursor: isHovered ? "none" : "pointer" }} />
      ) : null}
      
      {/* Force hide cursor on all children while hovered */}
      {isHovered && (
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
            {t(p.title)}
          </h3>
          <p className="text-base text-slate-700 mb-4 leading-relaxed">
            {t(p.oneLiner)}
          </p>
          {p.outcomes?.length ? (
            <ul className="space-y-1 text-slate-600 text-sm mb-4">
              {p.outcomes.slice(0,2).map(x => (
                <li key={x} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600" />
                  {t(x)}
                </li>
              ))}
            </ul>
          ) : null}
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
      {isHovered && (
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
  );
}
