"use client";

import * as React from "react";
import clsx from "clsx";

export type ServiceCard = {
  id: string;
  title: string;        // e.g., "SEO מתקדם"
  description: string;  // short paragraph
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
  eyebrow = "מה אני מציעה",
  heading = "שירותים שנבנו במיוחד עבור העסק שלך",
  className
}: ServicesGridProps) {
  return (
    <section
      className={clsx(
        "min-h-screen bg-gray-900 py-20 px-8 xl:px-0 flex flex-col justify-center",
        className
      )}
    >
      <span className="text-gray-400 text-lg max-w-lg mx-auto mb-2 capitalize flex items-center gap-3 text-center">
        {eyebrow}
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>
      </span>

      <h1 className="text-white text-4xl md:text-5xl xl:text-6xl font-semibold max-w-3xl mx-auto mb-16 leading-snug text-center">
        {heading}
      </h1>

             <div className="grid text-left grid-cols-1 sm:grid-cols-2 gap-5 max-w-5xl mx-auto">
         {items.map((item, idx) => {
           // Switch right and left columns by swapping even and odd indices
           const adjustedIdx = idx % 2 === 0 ? idx + 1 : idx - 1;
           const adjustedItem = items[adjustedIdx] || item;
           return <Card key={adjustedItem.id} idx={adjustedIdx} {...adjustedItem} />;
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
        }
        /* Initial small circles from the four corners, like nth-child rules in the Pen */
        .svc-card.br .overlay { clip-path: circle(calc(6.25rem + 7.5vw) at 100% 100%); }
        .svc-card.bl .overlay { clip-path: circle(calc(6.25rem + 7.5vw) at   0% 100%); }
        .svc-card.tr .overlay { clip-path: circle(calc(6.25rem + 7.5vw) at 100%   0%); }
        .svc-card.tl .overlay { clip-path: circle(calc(6.25rem + 7.5vw) at   0%   0%); }

        /* On hover/focus-within, expand to (almost) full card */
        .svc-card:hover .overlay,
        .svc-card:focus-within .overlay {
          clip-path: circle(110vw at 100% 100%); /* large enough to cover */
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
          .svc-card.br .bgCircle { clip-path: circle(calc(6.25rem + 7.5vw) at 100% 100%); }
          .svc-card.bl .bgCircle { clip-path: circle(calc(6.25rem + 7.5vw) at   0% 100%); }
          .svc-card.tr .bgCircle { clip-path: circle(calc(6.25rem + 7.5vw) at 100%   0%); }
          .svc-card.tl .bgCircle { clip-path: circle(calc(6.25rem + 7.5vw) at   0%   0%); }
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
  const cornerClass =
    corner === "br" ? "br" :
    corner === "bl" ? "bl" :
    corner === "tr" ? "tr" : "tl";

  return (
    <div
      className={clsx(
        "svc-card group bg-gray-800 p-10 relative overflow-hidden rounded-lg",
        cornerClass
      )}
      style={{ "--overlay": accent ?? "#4f46e5" } as React.CSSProperties}
    >
      {/* overlay circle (expands on hover) */}
      <div className="overlay" aria-hidden />

      {/* optional image circle (desktop only) */}
      {imageUrl ? (
        <div
          className="bgCircle hidden lg:block"
          style={{ backgroundImage: `url(${imageUrl})` }}
          aria-hidden
        />
      ) : null}

             {/* content */}
       <div className={clsx("relative z-10", textSide === "right" ? "lg:pr-52" : "lg:pl-48")}>
        <h2 className="capitalize text-white mb-4 text-2xl xl:text-3xl font-serif">
          {title}
        </h2>
        <p className="text-gray-400 transition-colors duration-700 group-hover:text-white">
          {description}
        </p>
      </div>

      {/* subtle hover shadow like the pen */}
      <div className="absolute inset-0 pointer-events-none transition-shadow duration-200 group-hover:shadow-[0.063rem_0.063rem_1.25rem_0.375rem_rgba(0,0,0,0.53)]" />
    </div>
  );
}
