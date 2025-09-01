"use client";

import * as React from "react";

/**
 * Parallax section inspired by:
 * "Parallax 1 (Tailwind v4)" CodePen by sfearl1.
 * Each panel sets a unique view-timeline; its image animates along that timeline.
 */
export type ParallaxSlide = {
  id: string;
  title: string;
  src: string;   // e.g. "/images/seo.jpg"
  alt?: string;
};

export interface ParallaxSectionsProps {
  slides: ParallaxSlide[];
  /** If true, use the page's scroll instead of a nested scroller. */
  usePageScroll?: boolean;
  /** Set to false to hide big "Parallax N" headings. */
  showTitles?: boolean;
  /** Optional className for the outer wrapper. */
  className?: string;
}

export default function ParallaxSections({
  slides,
  usePageScroll = false,
  showTitles = true,
  className = "",
}: ParallaxSectionsProps) {
  // Reduced-motion preference
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq?.addEventListener?.("change", onChange);
    return () => mq?.removeEventListener?.("change", onChange);
  }, []);

  // When usePageScroll=false, we render our own 100vh scroller (like the Pen).
  // When true, panels fill the normal page flow (no nested scroller).
  const Wrapper: React.ElementType = usePageScroll ? "div" : "div";
  const wrapperProps = usePageScroll
    ? { className: `relative ${className}` }
    : {
        className:
          `relative ${className} ` +
          // vertical snap container + nested scroller
          "absolute inset-0 overflow-y-auto snap-y snap-mandatory scroll-smooth",
      };

  return (
    <Wrapper {...wrapperProps}>
      {slides.map((s, i) => {
        const sectionName = `--section${i + 1}`;
        return (
          <div
            key={s.id}
            // each panel is full-viewport height
            className={
              "relative grid place-content-center w-full h-screen overflow-hidden " +
              // define the view-timeline (tailwind arbitrary properties)
              `[view-timeline-name:${sectionName}] [view-timeline-axis:block] ` +
              // snap behavior (works if nested scroller variant)
              "snap-start"
            }
          >
            {/* The moving layer (background image) */}
            <img
              src={s.src}
              alt={s.alt ?? s.title}
              data-parallax
              className={
                "absolute -z-10 inset-0 w-full h-full object-cover " +
                // hook the animation to the section's timeline
                `animate-[var(--parallax)] [animation-timeline:${sectionName}] [animation-range:entry_exit]`
              }
              // If reduced motion, we neutralize via CSS below.
            />

            {showTitles && (
              <h2 className="text-[10vw] text-white mix-blend-exclusion text-center px-4">
                {s.title}
              </h2>
            )}
          </div>
        );
      })}

      {/* Styles that mirror the CodePen's @keyframes + fallbacks */}
      <style jsx global>{`
        @layer parallax {
          @keyframes parallax {
            from {
              transform: translate(0%, -50%);
            }
            to {
              transform: translate(0%, 50%);
            }
          }
          :root {
            /* connect Tailwind's arbitrary animate-[var(--parallax)] to these keyframes */
            --parallax: parallax linear;
          }
          /* Fallback if scroll-linked animations aren't supported OR reduced motion requested */
          @supports not (animation-timeline: scroll()) {
            img[data-parallax] {
              transform: translate(0%, 0%) !important;
              animation: none !important;
            }
          }
        }

        /* Also disable motion if user prefers reduced motion */
        ${reduced ? `img[data-parallax]{ transform: translate(0,0)!important; animation:none!important; }` : ""}
      `}</style>
    </Wrapper>
  );
}
