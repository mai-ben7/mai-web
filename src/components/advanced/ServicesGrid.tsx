"use client";

import * as React from "react";
import clsx from "clsx";
import { useI18n } from "@/components/i18n/I18nProvider";

export type ServiceCard = {
  id: string;
  title: string;        // e.g., "SEO מתקדם"
  description: string[];  // array of bullet points
  corner: "br" | "bl" | "tr" | "tl"; // which corner the circle starts from (like the CodePen)
  textSide: "left" | "right"; // which side the text should be on (opposite to circle)
  imageUrl?: string;    // optional bg image for the circular layer (desktop only)
  accent?: string;      // optional hex for overlay (default indigo-600)
};

export interface ServicesGridProps {
  items: ServiceCard[];
  eyebrow?: string;     // small line above H1
  heading?: string;     // main heading
  className?: string;
}

export default function ServicesGrid({
  items,
  eyebrow,
  heading,
  className
}: ServicesGridProps) {
  const { t, locale } = useI18n();
  
  // For Hebrew, switch the content between columns (swap items 0↔1 and 2↔3)
  const isRTL = locale === "he";
  const reorderedItems = isRTL ? [
    items[1], // design (was index 1, now index 0)
    items[0], // seo (was index 0, now index 1)
    items[3], // performance (was index 3, now index 2)
    items[2]  // motion (was index 2, now index 3)
  ] : items;
  
  return (
    <section
      data-theme
      data-lang={locale}
      data-stop1="#bfdbfe"
      data-stop2="#dbeafe"
      data-stop3="#fbcfe8"
      data-o1-x="22%" data-o1-y="160rem" data-o1-size="36rem" data-o1-color="rgba(96,165,250,.45)" data-o1-alpha=".95"
      data-o2-x="80%" data-o2-y="190rem" data-o2-size="44rem" data-o2-color="rgba(167,139,250,.35)" data-o2-alpha=".9"
      className={clsx(
        "min-h-screen py-20 px-8 xl:px-0 flex flex-col justify-center relative",
        className
      )}
    >
      <span className="text-slate-700 text-lg max-w-lg mx-auto mb-2 capitalize flex items-center gap-3 text-center">
        {eyebrow || t("services.eyebrow")}
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>
      </span>

      <h1 className="text-slate-900 text-4xl md:text-5xl xl:text-6xl font-semibold max-w-3xl mx-auto mb-16 leading-snug text-center">
        {heading || t("services.title")}
      </h1>

             <div className="grid text-left grid-cols-1 sm:grid-cols-2 gap-5 max-w-5xl mx-auto">
         {reorderedItems.map((item, idx) => {
           return <Card key={`${item.id}-${idx}`} idx={idx} {...item} />;
         })}
       </div>

      {/* styled-jsx: pure CSS to replicate the CodePen circle/clip-path choreography */}
      <style jsx global>{`
        .svc-card {
          position: relative;
        }
        .svc-card .overlay {
          position: absolute;
          inset: 0;
          z-index: 0;
          transition: clip-path 0.6s ease, transform 0.6s ease, background-color 0.3s ease;
          background-color: var(--overlay, #4f46e5); /* indigo-600 */
          opacity: 0.9;
 
        }
        /* Initial small circles from the four corners, like nth-child rules in the Pen */
        /* English version - original positions */
        [data-lang="en"] .svc-card.br .overlay { clip-path: circle(calc(6.25rem + 7.5vw) at 100% 100%); }
        [data-lang="en"] .svc-card.bl .overlay { clip-path: circle(calc(6.25rem + 7.5vw) at   0% 100%); }
        [data-lang="en"] .svc-card.tr .overlay { clip-path: circle(calc(6.25rem + 7.5vw) at 100%   0%); }
        [data-lang="en"] .svc-card.tl .overlay { clip-path: circle(calc(6.25rem + 7.5vw) at   0%   0%); }
        
        /* Hebrew version - switched positions */
        [data-lang="he"] .svc-card.br .overlay { clip-path: circle(calc(6.25rem + 7.5vw) at   0% 100%); }
        [data-lang="he"] .svc-card.bl .overlay { clip-path: circle(calc(6.25rem + 7.5vw) at 100% 100%); }
        [data-lang="he"] .svc-card.tr .overlay { clip-path: circle(calc(6.25rem + 7.5vw) at   0%   0%); }
        [data-lang="he"] .svc-card.tl .overlay { clip-path: circle(calc(6.25rem + 7.5vw) at 100%   0%); }

        /* On hover/focus-within, expand to (almost) full card */
        /* English version hover - expand from bottom right */
        [data-lang="en"] .svc-card:hover .overlay,
        [data-lang="en"] .svc-card:focus-within .overlay {
          clip-path: circle(110vw at 100% 100%); /* large enough to cover */
        }
        
        /* Hebrew version hover - expand from center to cover all corners */
        [data-lang="he"] .svc-card:hover .overlay,
        [data-lang="he"] .svc-card:focus-within .overlay {
          clip-path: circle(110vw at 50% 50%); /* large enough to cover from center */
        }

        /* Desktop-only circular image layer that matches the corner & size */
        @media (min-width: 1000px) {
          .svc-card .bgCircle {
            position: absolute;
            inset: 0;
            z-index: 0;
            background-repeat: no-repeat;
            background-position: 50% 50%;
            background-size: cover;
          }
          
          /* English version - original positions */
          [data-lang="en"] .svc-card.br .bgCircle { clip-path: circle(calc(6.25rem + 7.5vw) at 100% 100%); }
          [data-lang="en"] .svc-card.bl .bgCircle { clip-path: circle(calc(6.25rem + 7.5vw) at   0% 100%); }
          [data-lang="en"] .svc-card.tr .bgCircle { clip-path: circle(calc(6.25rem + 7.5vw) at 100%   0%); }
          [data-lang="en"] .svc-card.tl .bgCircle { 
            clip-path: circle(calc(6.25rem + 7.5vw) at   0%   0%); 
            background-position: top right;
          }
          
          /* Hebrew version - switched positions */
          [data-lang="he"] .svc-card.br .bgCircle { clip-path: circle(calc(6.25rem + 7.5vw) at   0% 100%); }
          [data-lang="he"] .svc-card.bl .bgCircle { clip-path: circle(calc(6.25rem + 7.5vw) at 100% 100%); }
          [data-lang="he"] .svc-card.tr .bgCircle { clip-path: circle(calc(6.25rem + 7.5vw) at   0%   0%); }
          [data-lang="he"] .svc-card.tl .bgCircle { 
            clip-path: circle(calc(6.25rem + 7.5vw) at 100%   0%); 
            background-position: top left;
          }
        }
      `}</style>
    </section>
  );
}

function Card({
  idx,
  title,
  description,
  corner,
  textSide,
  imageUrl,
  accent
}: ServiceCard & { idx: number }) {
  const { t, locale } = useI18n();
  
  // For Hebrew, flip the image corner positions but keep text positioning as is
  const isRTL = locale === "he";
  const effectiveCorner = isRTL ? 
    (corner === "br" ? "bl" : 
     corner === "bl" ? "br" : 
     corner === "tr" ? "tl" : "tr") : corner;
  
  const cornerClass =
    effectiveCorner === "br" ? "br" :
    effectiveCorner === "bl" ? "bl" :
    effectiveCorner === "tr" ? "tr" : "tl";
  
  // Keep text positioning as originally defined
  const effectiveTextSide = textSide;

  return (
    <div
      className={clsx(
        "svc-card group bg-gray-800 p-10 relative overflow-hidden rounded-lg min-h-80 flex flex-col",
        cornerClass
      )}
      style={{ "--overlay": accent ?? "#4f46e5" } as React.CSSProperties}
    >
      {/* overlay circle (expands on hover) */}
      <div className="overlay" aria-hidden />

      {/* optional image circle (deskt op only) */}
      {imageUrl ? (
        <div
          className="bgCircle hidden lg:block"
          style={{ backgroundImage: `url(${imageUrl})` }}
          aria-hidden
        />
      ) : null}

             {/* content */}
        <div className={clsx("relative z-10 flex flex-col justify-between h-full", effectiveTextSide === "right" ? "lg:pr-40" : "lg:pl-40")}>
         <h2 className="capitalize text-white mb-4 text-2xl xl:text-3xl font-serif leading-tight">
            {t(title)}
          </h2>
        <ul className="text-gray-400 transition-colors duration-700 group-hover:text-white space-y-2 text-right flex-1">
          {description.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-pink-500 mt-1">•</span>
              <span>{t(point)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* subtle hover shadow like the pen */}
      <div className="absolute inset-0 pointer-events-none transition-shadow duration-200 group-hover:shadow-[0.063rem_0.063rem_1.25rem_0.375rem_rgba(0,0,0,0.53)]" />
    </div>
  );
}
