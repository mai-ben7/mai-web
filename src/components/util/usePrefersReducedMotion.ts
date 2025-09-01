"use client";
import * as React from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(!!mq.matches);
    set(); mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);
  return reduced;
}
