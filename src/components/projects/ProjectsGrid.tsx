import * as React from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";

export default function ProjectsGrid({ items }: { items: Project[] }) {
  return (
    <section id="all-projects" className="min-h-screen py-20 px-8 xl:px-0 relative overflow-hidden">
      {/* Colorful background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-xl animate-pulse animation-delay-2000"></div>
        
        {/* Animated circles */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-blue-400/30 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-12 h-12 border-2 border-indigo-400/30 rounded-full animate-spin-slow-reverse"></div>
        <div className="absolute top-1/2 left-1/2 w-20 h-20 border-2 border-cyan-400/30 rounded-full animate-spin-slow"></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-blue-200 text-lg max-w-lg mx-auto mb-2 capitalize flex items-center gap-3 justify-center">
            עוד עבודות
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </span>
          <h2 className="text-white text-4xl md:text-5xl xl:text-6xl font-extrabold max-w-3xl mx-auto leading-snug bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
            עוד עבודות
          </h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {items.map(p => (
            <article key={p.id}
              className="group rounded-2xl border border-white/20 bg-transparent overflow-hidden hover:bg-white/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/25 backdrop-blur-sm">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image 
                  src={p.cover} 
                  alt={p.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {p.tags?.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/25 text-white/90 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-white/90 mb-4">{p.oneLiner}</p>
                {p.outcomes?.length ? (
                  <ul className="space-y-2 text-white/85 text-sm mb-6">
                    {p.outcomes.slice(0,3).map(x => (
                      <li key={x} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-white/70" />
                        {x}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="flex gap-3">
                  {p.href && (
                    <a href={p.href} className="btn-primary rounded-full flex-1 text-center">
                      צפו בפרויקט
                    </a>
                  )}
                  <a href="#contact" className="btn-secondary rounded-full flex-1 text-center">
                    צור קשר
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
