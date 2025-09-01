"use client";
import * as React from "react";
import ProjectPeekCard from "./ProjectPeekCard";
import type { Project } from "@/data/projects";

export default function ProjectsHero({ featured }: { featured: Project[] }) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);

  const scrollBy = (dx: number) => {
    scrollerRef.current?.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <section className="min-h-screen py-20 px-8 xl:px-0 flex flex-col justify-center relative overflow-hidden">
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
            Selected Work
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
              onClick={() => scrollBy(-480)} 
              className="rounded-full border border-cyan-400/30 bg-cyan-400/10 p-3 hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm" 
              aria-label="גלול שמאלה"
            >
              <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button 
              onClick={() => scrollBy(+480)} 
              className="rounded-full border border-pink-400/30 bg-pink-400/10 p-3 hover:bg-pink-400/20 hover:border-pink-400/50 transition-all duration-300 backdrop-blur-sm" 
              aria-label="גלול ימינה"
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
            {featured.map(p => <ProjectPeekCard key={p.id} p={p} />)}
          </div>
        </div>

        {/* Secondary CTA */}
        <div className="mt-12 text-center">
          <a href="#all-projects" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25">
            כל הפרויקטים
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
