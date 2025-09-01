"use client";

import * as React from "react";

function supportsScrollTimeline() {
  // Detect support for scroll/ view timelines
  return CSS?.supports?.("animation-timeline: scroll()") ?? false;
}

/**
 * Usage:
 *  - Add data-parallax-panel to any <section> (or div) that should drive a parallax.
 *  - Inside, add one or more elements with data-parallax (img or absolutely-positioned wrappers).
 *  - Drop <EnableSectionParallax/> once near the top of the page (after Nav).
 */
export default function EnableSectionParallax() {
  React.useEffect(() => {
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const supported = supportsScrollTimeline();

    const panels = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax-panel]")
    );

    panels.forEach((panel, idx) => {
      // Assign a unique timeline name to each panel
      const vtName = `--panel${idx + 1}`;

      // Set CSS properties via style so we don't depend on Tailwind arbitrary props
      panel.style.setProperty("view-timeline-name", vtName);
      panel.style.setProperty("view-timeline-axis", "block");
      panel.style.position ||= "relative";
      panel.style.overflow ||= "hidden";
      // If you want each to be full screen like the Pen, uncomment:
      // panel.style.height ||= "100vh";

      // Hook all media inside this panel
      const mediaEls = panel.querySelectorAll<HTMLElement>("[data-parallax]");
      mediaEls.forEach((el) => {
        // Base styles (behind content, covers panel)
        el.style.position ||= "absolute";
        el.style.inset ||= "0";
        el.style.zIndex ||= "-1";
        el.style.willChange ||= "transform";

        if (!reduce && supported) {
          // Keyframes name is 'section-parallax' (we'll inject it globally below)
          el.style.setProperty("animation-name", "section-parallax");
          el.style.setProperty("animation-duration", "1s"); // duration is ignored; timeline drives it
          el.style.setProperty("animation-timing-function", "linear");
          el.style.setProperty("animation-fill-mode", "both");
          el.style.setProperty("animation-timeline", vtName);
          // Animate across the whole view range of the panel (entry→exit)
          el.style.setProperty("animation-range", "entry 0% exit 100%");
        } else {
          // Fallback: no transform/animation
          el.style.removeProperty("animation-name");
          el.style.removeProperty("animation-timeline");
          el.style.removeProperty("animation-range");
          el.style.transform = "translateY(0)";
        }
      });
    });

    // Inject global keyframes once
    const KEY = "parallax-keyframes-style-tag";
    if (!document.getElementById(KEY)) {
      const style = document.createElement("style");
      style.id = KEY;
      style.textContent = `
        @keyframes section-parallax {
          from { transform: translateY(-50%); }
          to   { transform: translateY( 50%); }
        }

        /* Hard fallback for browsers without scroll-linked animation support */
        @supports not (animation-timeline: scroll()) {
          [data-parallax] {
            transform: translateY(0) !important;
            animation: none !important;
          }
        }

        /* Always honor reduced motion */
        @media (prefers-reduced-motion: reduce) {
          [data-parallax] {
            transform: none !important;
            animation: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return null;
}
