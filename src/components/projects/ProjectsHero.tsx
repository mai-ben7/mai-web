"use client";
import RevealText from "@/components/RevealText";
import BlobButton from "@/components/ui/BlobButton";
import * as React from "react";
import ProjectPeekCard from "./ProjectPeekCard";
import type { Project } from "@/data/projects";

export default function ProjectsHero({ featured }: { featured: Project[] }) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);

  const scrollBy = (dx: number) => {
    scrollerRef.current?.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <section className="min-h-screen py-20 px-8 xl:px-0 flex flex-col justify-center relative">
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Headline block */}
        <header className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-slate-700 text-lg max-w-lg mx-auto mb-2 capitalize flex items-center gap-3 justify-center">
            Selected Work
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </span>
          <h1 className="text-slate-900 text-4xl md:text-5xl xl:text-6xl font-extrabold max-w-3xl mx-auto mb-6 leading-snug bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
            פרויקטים שמדברים בעד עצמם
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
            תציצו בכמה עבודות — פחות קוד, יותר תוצאות: מהירות, בהירות חוויית משתמש ואסתטיקה.
          </p>
        </header>

        {/* Peek strip */}
        <div className="relative max-w-6xl mx-auto">

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
          <BlobButton 
            as="a"
            href="#all-projects" 
            variant="primary"
            className="inline-flex items-center text-lg"
          >
            כל הפרויקטים
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </BlobButton>
        </div>
      </div>
    </section>
  );
}
