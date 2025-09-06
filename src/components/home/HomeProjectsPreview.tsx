"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

export default function HomeProjectsPreview({
  items,
  title = "פרויקטים נבחרים",
  subtitle = "קטעים קצרים, תוצאות ברורות — בלי טכני מסובך.",
  ctaHref = "/projects",
  ctaLabel = "צפו בכל הפרויקטים",
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
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const scrollBy = (dx: number) => scrollerRef.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <section id={id} className="min-h-screen py-20 px-8 xl:px-0 flex flex-col justify-center relative overflow-hidden" dir={rtl ? "rtl" : "ltr"}>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Headline block */}
        <header className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-indigo-200 text-lg max-w-lg mx-auto mb-2 capitalize flex items-center gap-3 justify-center">
            {title}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </span>
          <h1 className="text-white text-4xl md:text-5xl xl:text-6xl font-extrabold max-w-3xl mx-auto mb-6 leading-snug bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
            פרויקטים שמדברים בעד עצמם
          </h1>
          <p className="text-cyan-100 text-lg md:text-xl max-w-2xl mx-auto">
            תציצו בכמה עבודות — פחות קוד, יותר תוצאות: מהירות, בהירות חוויית משתמש ואסתטיקה.
          </p>
        </header>

        {/* Peek strip */}
        <div className="relative max-w-6xl mx-auto">

          {/* arrows (desktop) */}
          <div className="hidden md:flex absolute right-4 -top-12 items-center gap-2 z-20">
            <button 
              onClick={() => scrollBy(rtl ? +480 : -480)} 
              className="rounded-full border border-cyan-400/30 bg-cyan-400/10 p-3 hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm" 
              aria-label="גלול שמאלה"
              suppressHydrationWarning
            >
              <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <button 
              onClick={() => scrollBy(rtl ? -480 : +480)} 
              className="rounded-full border border-pink-400/30 bg-pink-400/10 p-3 hover:bg-pink-400/20 hover:border-pink-400/50 transition-all duration-300 backdrop-blur-sm" 
              aria-label="גלול ימינה"
              suppressHydrationWarning
            >
              <svg className="w-5 h-5 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <div
            ref={scrollerRef}
            className="snap-x snap-mandatory overflow-x-auto no-scrollbar flex gap-6 pr-6"
          >
            {items.map((p) => (
              <article
                key={p.id}
                className="group relative w-[85vw] sm:w-[65vw] lg:w-[500px] xl:w-[540px] aspect-[16/10]
                           snap-start shrink-0 overflow-hidden rounded-3xl border border-white/20 bg-transparent
                           transition-all duration-500 ease-out backdrop-blur-sm
                           hover:-translate-y-3 hover:shadow-2xl hover:shadow-black/25"
              >
                {/* Enhanced Cover Image */}
                <div className="absolute inset-0 -z-10">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(min-width:1280px) 540px, (min-width:1024px) 500px, 65vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority={false}
                  />
                  {/* No overlays to keep cover fully visible */}
                </div>

                {/* Content under image, neutral style */}
                <div className="relative h-full p-8 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-4">
                    {p.tags?.slice(0, 2).map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/10 border border-white/25 text-white/90 text-sm font-medium backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3">
                    {p.title}
                  </h3>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    {p.oneLiner}
                  </p>
                  {p.outcomes && (
                    <ul className="mb-8 space-y-3">
                      {p.outcomes.slice(0, 3).map((x) => (
                        <li key={x} className="flex items-center gap-3 text-white/85 text-base font-medium">
                          <div className="w-3 h-3 rounded-full bg-white/70 flex-shrink-0" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex items-center gap-4">
                    {p.href && (
                      <Link 
                        href={p.href} 
                        className="btn-primary rounded-2xl px-6 py-3 text-base font-bold"
                      >
                        צפו בפרויקט
                      </Link>
                    )}
                    <Link
                      href="/projects"
                      className="btn-secondary rounded-2xl px-6 py-3 text-base font-bold"
                    >
                      עוד פרויקטים
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Secondary CTA */}
        <div className="mt-12 text-center">
          <Link 
            href={ctaHref} 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
          >
            {ctaLabel}
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
