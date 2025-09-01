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
      {/* Colorful animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {/* Static gradient orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-400/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-cyan-400/30 rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-emerald-400/30 rounded-full animate-pulse animation-delay-2000"></div>
      </div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

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
          {/* gradient edges */}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-indigo-900 to-transparent z-10" />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-pink-900 to-transparent z-10" />

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
                           snap-start shrink-0 overflow-hidden rounded-3xl border border-white/20 bg-white/10
                           transition-all duration-500 ease-out backdrop-blur-sm
                           hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-500/30 hover:border-cyan-400/50
                           hover:bg-white/20"
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
                  {/* Enhanced gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/70" />
                  
                  {/* Colorful overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Enhanced Content */}
                <div className="relative h-full p-8 flex flex-col justify-end">
                  {/* Enhanced Tags */}
                  <div className="flex items-center gap-3 mb-4">
                    {p.tags?.slice(0, 2).map(tag => (
                      <span key={tag} className="px-4 py-2 rounded-full bg-cyan-600/40 border border-cyan-400/60 text-cyan-100 text-sm font-semibold backdrop-blur-sm shadow-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Enhanced Title */}
                  <h3 className="text-3xl font-black text-white mb-3 drop-shadow-2xl group-hover:text-cyan-100 transition-colors duration-300">
                    {p.title}
                  </h3>
                  
                  {/* Enhanced Description */}
                  <p className="text-lg text-cyan-100 mb-6 drop-shadow-lg leading-relaxed">
                    {p.oneLiner}
                  </p>

                  {/* Enhanced Outcomes */}
                  {p.outcomes && (
                    <ul className="mb-8 space-y-3">
                      {p.outcomes.slice(0, 3).map((x) => (
                        <li key={x} className="flex items-center gap-3 text-cyan-200 text-base font-medium">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 flex-shrink-0 shadow-lg" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Enhanced CTAs */}
                  <div className="flex items-center gap-4">
                    {p.href && (
                      <Link 
                        href={p.href} 
                        className="btn-primary rounded-2xl px-6 py-3 text-base font-bold shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
                      >
                        צפו בפרויקט
                      </Link>
                    )}
                    <Link
                      href="/projects"
                      className="px-6 py-3 rounded-2xl border-2 border-cyan-400/50 bg-cyan-400/10 text-cyan-200 font-bold hover:bg-cyan-400/20 hover:border-cyan-400/70 transition-all duration-300 backdrop-blur-sm hover:scale-105"
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
