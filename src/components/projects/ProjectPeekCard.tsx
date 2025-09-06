"use client";
import * as React from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";

export default function ProjectPeekCard({ p }: { p: Project }) {
  return (
    <article
      className="group relative w-[82vw] sm:w-[60vw] lg:w-[480px] xl:w-[520px]
                 snap-start shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-transparent
                 transition-all duration-500 ease-[var(--ease-emphasis)]
                 hover:-translate-y-3 hover:shadow-2xl hover:shadow-black/25
                 backdrop-blur-sm"
    >
      {/* Cover kept clean without dark overlay */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <Image
          src={p.cover}
          alt={p.title}
          fill
          sizes="(min-width:1280px) 520px, (min-width:1024px) 480px, 60vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority={false}
        />
      </div>

      {/* Content moved below the image so the cover stays fully visible */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {p.tags?.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs leading-5 px-3 py-1 rounded-full bg-cyan-600/40 border border-cyan-400/60 text-cyan-100 font-medium backdrop-blur-sm">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{p.title}</h3>
        <p className="text-cyan-100 text-lg mb-4">{p.oneLiner}</p>

        {p.outcomes && (
          <ul className="mb-6 space-y-2">
            {p.outcomes.slice(0,3).map(x => (
              <li key={x} className="flex items-center gap-2 text-cyan-200 text-sm">
                <div className="w-2 h-2 rounded-full bg-cyan-300 flex-shrink-0 shadow-sm" />
                {x}
              </li>
            ))}
          </ul>
        )}

        {/* CTAs */}
        <div className="flex items-center gap-3">
          {p.href && (
            <a href={p.href} className="btn-primary rounded-full flex-1 text-center py-3 shadow-lg hover:shadow-cyan-500/25">
              צפו בפרויקט
            </a>
          )}
          <a href="#contact" className="btn-secondary rounded-full flex-1 text-center py-3 shadow-lg hover:shadow-blue-500/25">
            צרו קשר
          </a>
        </div>
      </div>
    </article>
  );
}
